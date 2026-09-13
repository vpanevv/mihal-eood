type Line = { text: string; accent?: boolean }

type Feature = {
  src: string
  alt: string
  /** Rendered one per line; the accented line picks up the sap gold. */
  headline: Line[]
}

// Features lead the section in a checkerboard, each with its own headline.
// Anything not featured falls through to the grid below.
const FEATURES: Feature[] = [
  {
    src: '/images/new-5.jpg',
    alt: 'МИХАЛ ЕООД — натоварен камион с дървен материал',
    headline: [{ text: 'Вашият проект.' }, { text: 'Нашият материал.', accent: true }],
  },
  {
    src: '/images/new-6.jpg',
    alt: 'МИХАЛ ЕООД — подготвена доставка дървен материал',
    headline: [{ text: 'Качеството започва от' }, { text: 'дървения материал.', accent: true }],
  },
]

const PHOTOS = [
  { src: '/images/new-1.jpg', alt: 'МИХАЛ ЕООД — дървен материал' },
  { src: '/images/new-2.jpg', alt: 'МИХАЛ ЕООД — слепени греди' },
  { src: '/images/new-4.jpg', alt: 'МИХАЛ ЕООД — сух дървен материал' },
]

/**
 * Photo section below the hero. Every image is lazy and carries its intrinsic
 * ratio, so the section costs nothing until it is scrolled to and reserves its
 * own height rather than shoving the footer around as photos arrive.
 */
export default function Showcase() {
  return (
    <section aria-label="Галерия" className="relative isolate overflow-hidden px-3 py-12 sm:px-4 md:px-8 md:py-20">
      <div aria-hidden="true" className="showcase-glow pointer-events-none absolute inset-0 -z-10" />
      <div className="mx-auto max-w-[1200px]">
        {/* Checkerboard: photo left / headline right, then swapped. Two columns
            at every size — on phones too — so the rhythm survives the narrow
            screen instead of collapsing into a stack. */}
        {FEATURES.map(({ src, alt, headline }, i) => {
          const flipped = i % 2 === 1
          return (
            <div
              key={src}
              className={`grid grid-cols-2 items-center gap-2.5 sm:gap-5 md:gap-8 ${i === 0 ? '' : 'mt-5 sm:mt-10 md:mt-14'}`}
            >
              {/* Photo on a cream mat, as in the reference */}
              <div
                className={`rounded-lg bg-[#ebe0cf] p-1 shadow-[0_10px_30px_-18px_rgba(64,45,24,0.55)] sm:p-2 md:rounded-xl md:p-3 ${flipped ? 'order-2' : ''}`}
              >
                <figure className="group relative aspect-[2/3] w-full overflow-hidden rounded-md bg-timber-bark/5 ring-[1.5px] ring-timber-bark sm:aspect-[4/3] md:rounded-lg">
                  <img
                    src={src}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    width={900}
                    height={1600}
                    className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </figure>
              </div>

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

        <div className="mt-10 grid gap-3 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-3">
          {PHOTOS.map(({ src, alt }) => (
            <figure
              key={src}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-timber-bark/5 ring-[1.5px] ring-timber-bark"
            >
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                width={1200}
                height={1600}
                className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
