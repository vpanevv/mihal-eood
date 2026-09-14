import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import { thumbFor, type GalleryImage } from '../data/gallery'

type Line = { text: string; accent?: boolean }

type Feature = Omit<GalleryImage, 'thumbUrl'> & {
  /** Rendered one per line; the accented line picks up the deeper brown. */
  headline: Line[]
}

// Four rows in a checkerboard, each photo with its own headline. Tapping a
// photo opens it full size, and the lightbox steps through all four.
const FEATURES: (Feature & { thumbUrl: string })[] = ([
  {
    srcUrl: '/images/new-5.jpg',
    alt: 'МИХАЛ ЕООД — натоварен камион с дървен материал',
    width: 900,
    height: 1600,
    headline: [{ text: 'Вашият проект.' }, { text: 'Нашият материал.', accent: true }],
  },
  {
    srcUrl: '/images/new-6.jpg',
    alt: 'МИХАЛ ЕООД — подготвена доставка дървен материал',
    width: 1200,
    height: 1600,
    headline: [{ text: 'Качеството започва от' }, { text: 'дървения материал.', accent: true }],
  },
  {
    srcUrl: '/images/new-1.jpg',
    alt: 'МИХАЛ ЕООД — камион с дървен материал за доставка',
    width: 1200,
    height: 1600,
    headline: [{ text: 'Собствен транспорт.' }, { text: 'Доставка в цялата страна.', accent: true }],
  },
  {
    srcUrl: '/images/new-2.jpg',
    alt: 'МИХАЛ ЕООД — товарене на греди',
    width: 1200,
    height: 1600,
    headline: [{ text: 'Големи обеми.' }, { text: 'Точни размери.', accent: true }],
  },
] satisfies Feature[]).map((feature) => ({ ...feature, thumbUrl: thumbFor(feature.srcUrl) }))

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="h-4 w-4 md:h-5 md:w-5">
      <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
    </svg>
  )
}

/**
 * Photo section below the hero. Every image is lazy and carries its intrinsic
 * ratio, so the section costs nothing until it is scrolled to and reserves its
 * own height rather than shoving the footer around as photos arrive.
 */
export default function Showcase() {
  const [zoomed, setZoomed] = useState<number | null>(null)

  return (
    <>
    <section aria-label="Галерия" className="relative isolate overflow-hidden px-3 py-12 sm:px-4 md:px-8 md:py-20">
      <div aria-hidden="true" className="showcase-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-[1200px]">
        {/* Checkerboard: photo left / headline right, then swapped. Two columns
            at every size — on phones too — so the rhythm survives the narrow
            screen instead of collapsing into a stack. */}
        {FEATURES.map(({ srcUrl, thumbUrl, alt, width, height, headline }, i) => {
          const flipped = i % 2 === 1
          return (
            <div
              key={srcUrl}
              className={`grid grid-cols-2 items-center gap-2.5 sm:gap-5 md:gap-8 ${i === 0 ? '' : 'mt-5 sm:mt-10 md:mt-14'}`}
            >
              {/* Photo on a cream mat; the whole mat is the tap target */}
              <button
                type="button"
                onClick={() => setZoomed(i)}
                aria-label={`Отвори снимката: ${alt}`}
                className={`group block rounded-lg bg-[#ebe0cf] p-1 text-left shadow-[0_10px_30px_-18px_rgba(64,45,24,0.55)] transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-ember focus-visible:ring-offset-2 focus-visible:ring-offset-timber-paper active:scale-[0.98] sm:p-2 md:rounded-xl md:p-3 ${flipped ? 'order-2' : ''}`}
              >
                <figure className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-timber-bark/5 ring-[1.5px] ring-timber-bark sm:aspect-[4/3] md:rounded-lg">
                  {/* Half the row wide: phones take the 640px copy, large
                      retina screens the full photo. */}
                  <img
                    src={thumbUrl}
                    srcSet={`${thumbUrl} 640w, ${srcUrl} ${width}w`}
                    sizes="(min-width: 1200px) 560px, 48vw"
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    width={width}
                    height={height}
                    className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                  <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-timber-bark/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="pointer-events-none absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-timber-cream/90 text-timber-bark opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:bottom-3 md:right-3 md:h-9 md:w-9">
                    <ExpandIcon />
                  </span>
                </figure>
              </button>

              {/* Headline, straight on the glow — no panel */}
              <div
                className={`flex items-center justify-center px-0.5 py-2 sm:px-3 md:px-6 ${flipped ? 'order-1' : ''}`}
              >
                <h2 className="text-center font-display text-[clamp(1.2rem,6.6vw,2.25rem)] font-bold uppercase leading-[1.05] tracking-[0.005em] text-timber-bark sm:text-4xl md:text-5xl lg:text-6xl">
                  {headline.map(({ text, accent }, line) => (
                    // The deeper accent: at phone sizes the type is no longer
                    // "large", and ember drops under AA where the honey glow sits.
                    <span key={text} className={accent ? 'text-[#7d5228]' : undefined}>
                      {line > 0 && <br />}
                      {text}
                    </span>
                  ))}
                </h2>
              </div>
            </div>
          )
        })}
      </div>
    </section>

    {/* Outside the section: its `isolate` makes a stacking context, and a
        z-70 viewer inside it would still sit beneath the fixed nav and footer. */}
    <Lightbox
      images={FEATURES}
      index={zoomed}
      onClose={() => setZoomed(null)}
      onStep={(step) =>
        setZoomed((i) => (i === null ? i : (i + step + FEATURES.length) % FEATURES.length))
      }
    />
    </>
  )
}
