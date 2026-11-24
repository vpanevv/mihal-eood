import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { usePageMeta } from '../utils/usePageMeta'
import PageBanner from '../components/PageBanner'
import { BANNERS } from '../data/banners'
import Lightbox from '../components/Lightbox'
import ChapterNav from '../components/ChapterNav'
import { ExpandIcon } from '../components/Icons'
import { GALLERY_CHAPTERS, GALLERY_IMAGES, type GalleryEntry } from '../data/gallery'
import { pack, S, type Placement, type Span } from '../utils/bento'

const isLandscape = (img: GalleryEntry) => img.width >= img.height

/** Spread the upright photos among the wide ones, so neither kind clumps. */
function interleave<T>(a: T[], b: T[]): T[] {
  const out: T[] = []
  let i = 0
  let j = 0
  while (i < a.length || j < b.length) {
    if (j >= b.length || (i < a.length && i / a.length <= j / b.length)) out.push(a[i++])
    else out.push(b[j++])
  }
  return out
}

/** Every fifth photo of the kind a layout can show large becomes a feature tile. */
const FEATURE_EVERY = 5

type Tile = { img: GalleryEntry; desktop: Placement; phone: Placement }

/**
 * A chapter's photographs in display order with a footprint for each layout.
 * Four landscape-leaning columns on a desktop: a wide photo fills one cell or,
 * as a feature, four; an upright one stands two cells tall. Two portrait-
 * leaning columns on a phone: a wide photo runs the full width, an upright one
 * takes a cell or, as a feature, four.
 */
function layOut(images: GalleryEntry[]): Tile[] {
  // A wide photo leads when there is one — it is what the big desktop tile suits.
  const ordered = interleave(images.filter(isLandscape), images.filter((img) => !isLandscape(img)))

  let wide = 0
  let upright = 0
  const desktop: Span[][] = []
  const phone: Span[][] = []
  for (const img of ordered) {
    if (isLandscape(img)) {
      const feature = wide++ % FEATURE_EVERY === 0
      desktop.push(feature ? [S.big, S.one, S.wide] : [S.one, S.wide, S.big])
      phone.push([S.wide, S.one])
    } else {
      const feature = upright++ % FEATURE_EVERY === 0
      desktop.push([S.tall, S.one, S.big])
      phone.push(feature ? [S.big, S.one, S.tall] : [S.one, S.big, S.tall])
    }
  }

  const d = pack(desktop, 4)
  const p = pack(phone, 2)
  return ordered.map((img, i) => ({ img, desktop: d[i], phone: p[i] }))
}

const line = ({ col, row, c, r }: Placement) => ({ column: `${col} / span ${c}`, row: `${row} / span ${r}` })

export default function Gallery() {
  const [zoomed, setZoomed] = useState<number | null>(null)
  const [active, setActive] = useState(GALLERY_CHAPTERS[0].anchor)

  usePageMeta('/gallery')

  const chapters = useMemo(() => {
    let start = 0
    return GALLERY_CHAPTERS.map((chapter) => {
      const tiles = layOut(GALLERY_IMAGES.filter((img) => img.topic === chapter.id))
      const out = { ...chapter, tiles, start }
      start += tiles.length
      return out
    })
  }, [])

  // The viewer steps through every photo in the order the page shows them,
  // straight across the chapter breaks.
  const all = useMemo(() => chapters.flatMap((chapter) => chapter.tiles.map((t) => t.img)), [chapters])

  // The menu marks the chapter that is crossing the middle of the screen.
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    for (const { anchor } of GALLERY_CHAPTERS) {
      const el = document.getElementById(anchor)
      if (el) io.observe(el)
    }
    return () => io.disconnect()
  }, [])

  const jump = (anchor: string) => {
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    document.getElementById(anchor)?.scrollIntoView({ behavior: calm ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <main id="main" tabIndex={-1} className="relative z-10">
      <PageBanner crumb="Галерия" title="От" accent="базата" image={BANNERS['/gallery']} />

      <section className="py-8 md:py-14">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <p className="reveal mb-5 flex items-center gap-3 font-sans text-[0.78rem] uppercase tracking-[0.18em] text-timber-bark/70">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-timber-gold/18 text-timber-ember">
              <ExpandIcon className="h-4 w-4" />
            </span>
            Натиснете снимка, за да я видите в цял размер
          </p>

          {/* Stays under the site bar while the chapters scroll past. */}
          <ChapterNav label="Раздели на галерията" items={chapters} active={active} onJump={jump} />

          {chapters.map(({ anchor, title, intro, tiles, start }, n) => (
            <section
              key={anchor}
              id={anchor}
              aria-labelledby={`${anchor}-title`}
              className={`scroll-mt-40 md:scroll-mt-48 ${n === 0 ? 'pt-7 md:pt-9' : 'pt-14 md:pt-24'}`}
            >
              <header className="reveal mb-5 flex flex-wrap items-end justify-between gap-x-10 gap-y-3 md:mb-8">
                <div>
                  <span aria-hidden="true" className="block h-[3px] w-12 rounded-full bg-timber-gold" />
                  <h2
                    id={`${anchor}-title`}
                    className="mt-4 font-display text-[clamp(2rem,7vw,3.5rem)] font-bold uppercase leading-[1.05] text-timber-bark"
                  >
                    {title}
                  </h2>
                </div>
                <p className="max-w-[44ch] font-serif text-[1rem] leading-[1.6] text-timber-bark/80 md:text-right md:text-[1.1rem]">
                  {intro}
                </p>
              </header>

              <div className="bento">
                {tiles.map(({ img, desktop, phone }, i) => {
                  const d = line(desktop)
                  const p = line(phone)
                  // The big desktop tiles are the only ones wide enough to need
                  // the full photograph; everything else is served a small copy.
                  const feature = desktop.c === 2
                  // A phone tile that spans the screen is under-reported on
                  // purpose: stated truthfully, a 3× screen would skip the 640px
                  // copy for the full file, a megabyte or more over the page.
                  const sizes = `(min-width: 1400px) ${desktop.c * 340}px, (min-width: 768px) ${desktop.c * 25}vw, ${phone.c === 2 ? 54 : 50}vw`
                  const first = n === 0 && i < 2
                  return (
                    <button
                      key={img.srcUrl}
                      type="button"
                      onClick={(e) => {
                        e.currentTarget.focus()
                        setZoomed(start + i)
                      }}
                      aria-label={`Отвори ${img.alt}`}
                      style={{ '--c': d.column, '--r': d.row, '--cm': p.column, '--rm': p.row } as CSSProperties}
                      className="group relative overflow-hidden rounded-xl bg-timber-bark/5 ring-1 ring-timber-bark/10 transition-shadow duration-500 hover:ring-timber-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold md:rounded-2xl"
                    >
                      <img
                        src={img.thumbUrl}
                        srcSet={`${img.smUrl} 400w, ${img.thumbUrl} 640w${feature ? `, ${img.srcUrl} ${img.width}w` : ''}`}
                        sizes={sizes}
                        alt={img.alt}
                        width={img.width}
                        height={img.height}
                        loading={first ? 'eager' : 'lazy'}
                        decoding="async"
                        {...(first ? {} : { fetchpriority: 'low' })}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                      />

                      {/* Warm veil, caption and expand mark, so a pointer gets a clear affordance */}
                      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-timber-bark/80 via-timber-bark/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                      <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 pr-11 text-left font-sans text-[0.72rem] uppercase tracking-[0.14em] text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        {img.alt}
                      </span>
                      <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-timber-bark opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                        <ExpandIcon className="h-4 w-4" />
                      </span>
                    </button>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </section>

      <Lightbox
        images={all}
        index={zoomed}
        thumbs
        onClose={() => setZoomed(null)}
        onStep={(step) => setZoomed((i) => (i === null ? i : (i + step + all.length) % all.length))}
      />
    </main>
  )
}
