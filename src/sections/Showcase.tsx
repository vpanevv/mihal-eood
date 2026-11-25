import { useState } from 'react'
import Lightbox from '../components/Lightbox'
import { ExpandIcon } from '../components/Icons'
import { smFor, thumbFor, type GalleryImage } from '../data/gallery'

type Line = { text: string; accent?: boolean }

type Feature = Omit<GalleryImage, 'thumbUrl' | 'smUrl'> & {
  /** Rendered one per line; the accented line picks up the deeper gold. */
  headline: Line[]
  /** Two lines of supporting copy under the headline. */
  text: string
  /** Where the photo is anchored when its frame crops it; centred if left out. */
  focus?: string
}

// "Пътят на дървото": the wood's way from the yard to the site, one step a
// row, in a checkerboard. Tapping a photo opens it full size, and the
// lightbox steps through the whole story.
const FEATURES: (Feature & { thumbUrl: string; smUrl: string })[] = ([
  {
    srcUrl: '/images/new-4.jpg',
    alt: 'МИХАЛ ЕООД — закритият склад с пакети дървен материал',
    width: 1200,
    height: 1600,
    headline: [{ text: 'Голям склад,' }, { text: 'голям избор.', accent: true }],
    text: 'Собствена складова база в Разлог — пакети сух материал под навес, готови за товарене.',
  },
  {
    srcUrl: '/images/services/sushene.jpg',
    alt: 'МИХАЛ ЕООД — камерата за сушене, пълна с дървен материал',
    width: 1200,
    height: 1600,
    headline: [{ text: 'Сушене' }],
    text: 'Контролирано сушене на дървения материал до оптимална влажност.',
  },
  {
    srcUrl: '/images/products/lamperia/lamperia-3.jpg',
    alt: 'МИХАЛ ЕООД — пакет рендосана ламперия в цеха',
    width: 1200,
    height: 1600,
    // The stack fills the lower half: keep it whole, from the top board to the beam.
    focus: '40% 72%',
    headline: [{ text: 'Рендосване' }],
    text: 'Прецизно рендосване за равна, гладка повърхност и точни размери.',
  },
  {
    srcUrl: '/images/new-5.jpg',
    alt: 'МИХАЛ ЕООД — камион, натоварен с дървен материал за доставка',
    width: 900,
    height: 1600,
    // A tall photo: keep the whole strapped load, with the trailer under it.
    focus: '50% 45%',
    headline: [{ text: 'Доставка' }],
    text: 'Товарим с подемна техника в базата и доставяме в цялата страна.',
  },
] satisfies Feature[]).map((feature) => ({
  ...feature,
  thumbUrl: thumbFor(feature.srcUrl),
  smUrl: smFor(feature.srcUrl),
}))

/**
 * Photo section below the hero. Every image is lazy and carries its intrinsic
 * ratio, so the section costs nothing until it is scrolled to and reserves its
 * own height rather than shoving what follows around as photos arrive.
 */
export default function Showcase() {
  const [zoomed, setZoomed] = useState<number | null>(null)

  return (
    <>
      <section aria-labelledby="story-heading" className="relative isolate overflow-hidden px-3 py-12 sm:px-4 md:px-8 md:py-20">
        <div aria-hidden="true" className="showcase-glow pointer-events-none absolute inset-0 -z-10" />
        <div className="mx-auto max-w-[1200px]">
          {/* The story's title, centred over the rows like the copy beside each photo. */}
          <header className="reveal mb-8 text-center sm:mb-12 md:mb-16">
            <span aria-hidden="true" className="mx-auto block h-[3px] w-12 rounded-full bg-timber-gold" />
            <h2
              id="story-heading"
              className="mt-4 font-display text-[clamp(1.75rem,7vw,3.5rem)] font-bold uppercase leading-[1] tracking-[0.005em] text-timber-bark"
            >
              Пътят на <span className="text-timber-ember">дървото</span>
            </h2>
          </header>

          {/* Checkerboard: photo left / headline right, then swapped. Two columns
              at every size — on phones too — so the rhythm survives the narrow
              screen instead of collapsing into a stack. An ordered list: the
              story is told in steps, and a screen reader counts them too. */}
          <ol className="list-none">
          {FEATURES.map(({ srcUrl, thumbUrl, smUrl, alt, width, height, headline, text, focus }, i) => {
            const flipped = i % 2 === 1
            return (
              <li
                key={srcUrl}
                className={`reveal grid grid-cols-2 items-center gap-2.5 sm:gap-5 md:gap-8 ${i === 0 ? '' : 'mt-5 sm:mt-10 md:mt-14'}`}
              >
                {/* Photo on a light mat; the whole mat is the tap target */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.currentTarget.focus()
                    setZoomed(i)
                  }}
                  aria-label={`Отвори снимката: ${alt}`}
                  className={`group block rounded-lg bg-white p-1 text-left shadow-[0_10px_30px_-18px_rgba(42,32,17,0.5)] transition-transform duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold focus-visible:ring-offset-2 focus-visible:ring-offset-timber-paper active:scale-[0.98] sm:p-2 md:rounded-xl md:p-3 ${flipped ? 'order-2' : ''}`}
                >
                  <figure className="relative aspect-[2/3] w-full overflow-hidden rounded-md bg-timber-bark/5 ring-1 ring-timber-bark/15 sm:aspect-[4/3] md:rounded-lg">
                    {/* Half the row wide: phones take the 640px copy, large
                        retina screens the full photo. */}
                    <img
                      src={thumbUrl}
                      srcSet={`${smUrl} 400w, ${thumbUrl} 640w, ${srcUrl} ${width}w`}
                      sizes="(min-width: 1200px) 560px, 48vw"
                      alt={alt}
                      loading="lazy"
                      decoding="async"
                      {...{ fetchpriority: 'low' }}
                      width={width}
                      height={height}
                      style={focus ? { objectPosition: focus } : undefined}
                      className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-timber-bark/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="pointer-events-none absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-timber-bark opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:bottom-3 md:right-3 md:h-9 md:w-9">
                      <ExpandIcon className="h-4 w-4 md:h-5 md:w-5" />
                    </span>
                  </figure>
                </button>

                {/* Headline and its two lines of copy, straight on the glow */}
                <div
                  className={`flex flex-col justify-center px-0.5 py-2 text-center sm:px-3 md:px-6 ${flipped ? 'order-1' : ''}`}
                >
                  {/* The step number: the list already counts for a screen reader. */}
                  <span
                    aria-hidden="true"
                    className="mx-auto mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-timber-bark font-display text-base font-bold leading-none text-timber-sap shadow-[0_8px_20px_-10px_rgba(42,32,17,0.8)] ring-4 ring-timber-gold/25 sm:h-11 sm:w-11 sm:text-lg md:mb-5 md:h-14 md:w-14 md:text-2xl"
                  >
                    {i + 1}
                  </span>
                  <h3 className="font-display text-[clamp(1.2rem,6.6vw,2.25rem)] font-bold uppercase leading-[1.05] tracking-[0.005em] text-timber-bark sm:text-4xl md:text-5xl lg:text-6xl">
                    {headline.map(({ text: line, accent }, index) => (
                      // The deepened gold: at phone sizes the type is no longer
                      // "large", and the bright gold drops under AA on paper.
                      <span key={line} className={accent ? 'text-timber-ember' : undefined}>
                        {index > 0 && <br />}
                        {line}
                      </span>
                    ))}
                  </h3>
                  <p className="mx-auto mt-3 max-w-[34ch] font-sans text-[0.78rem] font-light leading-[1.6] text-timber-bark/70 sm:text-[0.9rem] sm:leading-[1.7] md:mt-5 md:text-[0.98rem]">
                    {text}
                  </p>
                </div>
              </li>
            )
          })}
          </ol>
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
