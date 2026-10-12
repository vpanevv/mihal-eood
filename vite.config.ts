import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { BANNERS } from './src/data/banners.ts'
import { thumbFor } from './src/data/gallery.ts'

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

export default defineConfig({
  plugins: [react(), bannerPreload()],
})
