import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { BANNERS } from './src/data/banners.ts'
import { GALLERY_IMAGES, thumbFor } from './src/data/gallery.ts'
import { ROUTES, ROUTE_META, SITE_URL, canonicalFor } from './src/data/seo.ts'

/**
 * Starts the banner photograph downloading from the HTML. The banner is the
 * largest thing on every inner page, but React only asks for it after the
 * bundle has downloaded, parsed and rendered the route — about 2s in on a
 * slow phone. This inline script knows the route from the URL and issues the
 * same srcset request the <img> will make, so by the time React asks the
 * answer is already on its way.
 */
function bannerPreload(): Plugin {
  const table = Object.fromEntries(
    Object.entries(BANNERS).map(([route, full]) => [route, { thumb: thumbFor(full), full }]),
  )
  const script = `<script>(function(){var t=${JSON.stringify(table)};var p=location.pathname.replace(/\\/+$/,'')||'/';var b=t[p];if(!b)return;var l=document.createElement('link');l.rel='preload';l.as='image';l.href=b.thumb;l.setAttribute('imagesrcset',b.thumb+' 640w, '+b.full+' 1200w');l.setAttribute('imagesizes','(max-width: 767px) 320px, 100vw');l.setAttribute('fetchpriority','high');document.head.appendChild(l)})()</script>`
  return {
    name: 'banner-preload',
    transformIndexHtml(html) {
      return html.replace('</head>', `    ${script}\n  </head>`)
    },
  }
}

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Replaces exactly one match, or fails the build: a silent miss would ship the wrong tags. */
function swap(html: string, pattern: RegExp, value: string, what: string) {
  const matches = html.match(new RegExp(pattern.source, 'g'))
  if (matches?.length !== 1) throw new Error(`route-heads: expected one ${what}, found ${matches?.length ?? 0}`)
  return html.replace(pattern, value)
}

/** The page's own title, description, canonical and preview tags, plus its breadcrumb trail. */
function headFor(template: string, path: string) {
  const { title, description, crumb } = ROUTE_META[path]
  const url = canonicalFor(path)
  let html = template
  html = swap(html, /<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`, 'title')
  html = swap(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
    `<meta name="description" content="${esc(description)}" />`,
    'description',
  )
  html = swap(html, /<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${url}" />`, 'canonical')
  html = swap(
    html,
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
    'og:url',
  )
  html = swap(
    html,
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${esc(title)}" />`,
    'og:title',
  )
  html = swap(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
    `<meta property="og:description" content="${esc(description)}" />`,
    'og:description',
  )
  html = swap(
    html,
    /<meta name="twitter:title" content="[^"]*" \/>/,
    `<meta name="twitter:title" content="${esc(title)}" />`,
    'twitter:title',
  )
  html = swap(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/>/,
    `<meta name="twitter:description" content="${esc(description)}" />`,
    'twitter:description',
  )

  if (path !== '/') {
    const trail = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: ROUTE_META['/'].crumb,
          item: canonicalFor('/'),
        },
        { '@type': 'ListItem', position: 2, name: crumb, item: url },
      ],
    }
    html = html.replace(
      '</head>',
      `    <script type="application/ld+json">${JSON.stringify(trail)}</script>\n  </head>`,
    )
  }
  return html
}

/**
 * A single-page app serves one index.html for every address, so without this
 * a crawler that does not run JavaScript — and every link preview — sees the
 * home page's title, description and canonical on /products or /contacts,
 * and the canonical tells search engines each page is a copy of the home
 * page. After the build this writes one HTML file per route with its own
 * head, the Netlify rules that serve them, and the sitemap — all from the
 * same table in src/data/seo.ts.
 */
function routeHeads(): Plugin {
  return {
    name: 'route-heads',
    apply: 'build',
    // After Vite's own HTML plugin has emitted the finished index.html.
    generateBundle: {
      order: 'post',
      handler(_options, bundle) {
        const page = bundle['index.html']
        if (page?.type !== 'asset') throw new Error('route-heads: index.html is not in the bundle')
        const template = String(page.source)
        const emit = (fileName: string, source: string) => this.emitFile({ type: 'asset', fileName, source })
        const fileFor = (path: string) => (path === '/' ? 'index.html' : `${path.slice(1)}.html`)
        page.source = headFor(template, '/')
        for (const path of ROUTES) if (path !== '/') emit(fileFor(path), headFor(template, path))

        // Each route its own file; anything else falls through to the app,
        // whose catch-all route sends the visitor home.
        const rules = ROUTES.filter((p) => p !== '/').map((p) => `${p}  /${fileFor(p)}  200`)
        emit(
          '_redirects',
          [
            '# Generated by vite.config.ts (route-heads) — edit src/data/seo.ts, not this file.',
          '# The netlify.app address is the same site; send it, and its search ranking, to the domain.',
          `https://mihal-eood.netlify.app/*  ${SITE_URL}/:splat  301!`,
            '# Each page is served its own HTML, with its own title and canonical;',
            '# every other path gets the app, which routes it.',
            ...rules,
            '/*  /index.html  200',
            '',
          ].join('\n'),
        )

        // The sitemap, with the gallery photographs listed for image search.
        const today = new Date().toISOString().slice(0, 10)
        const images: Record<string, string[]> = {
          '/': ['/og-image.jpg'],
          '/gallery': GALLERY_IMAGES.map((img) => img.srcUrl),
        }
        const urls = ROUTES.map((path) => {
          const pics = (images[path] ?? [])
            .map((src) => `\n    <image:image><image:loc>${SITE_URL}${encodeURI(src)}</image:loc></image:image>`)
            .join('')
          return `  <url>\n    <loc>${canonicalFor(path)}</loc>\n    <lastmod>${today}</lastmod>${pics}\n  </url>`
        })
        emit(
          'sitemap.xml',
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.join('\n')}\n</urlset>\n`,
        )
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), bannerPreload(), routeHeads()],
})
