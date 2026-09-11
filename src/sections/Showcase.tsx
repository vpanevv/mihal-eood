type Line = { text: string; accent?: boolean }

type Feature = {
  src: string
  alt: string
  /** Rendered one per line; the accented line picks up the sap gold. */
  headline: Line[]
}

// Features lead the section full-width, each with its own headline. Anything
// not featured falls through to the grid below.
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
    <section aria-label="Галерия" className="white-wash relative bg-timber-bark px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        {FEATURES.map(({ src, alt, headline }, i) => (
          <div key={src} className={i === 0 ? '' : 'mt-16 md:mt-24'}>
            {/* The sources are portrait but the trucks sit across the middle of
                the frame, so a landscape crop keeps the subject and drops the sky. */}
            <figure className="group relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-white/5 ring-1 ring-inset ring-white/10 md:aspect-[16/9]">
              <img
                src={src}
                alt={alt}
                loading="lazy"
                decoding="async"
                width={900}
                height={1600}
                className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
              />
            </figure>

            <h2 className="mt-9 text-center font-display text-3xl font-bold uppercase leading-[1.05] tracking-[0.01em] text-white md:mt-12 md:text-5xl">
              {headline.map(({ text, accent }, line) => (
                <span key={text} className={accent ? 'text-timber-sap' : undefined}>
                  {line > 0 && <br />}
                  {text}
                </span>
              ))}
            </h2>
          </div>
        ))}

        <div className="mt-16 grid gap-4 sm:grid-cols-2 md:mt-24 md:gap-5 lg:grid-cols-3">
          {PHOTOS.map(({ src, alt }) => (
            <figure
              key={src}
              className="group relative aspect-[3/4] overflow-hidden rounded-xl bg-white/5 ring-1 ring-inset ring-white/10"
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
