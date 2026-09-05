const PHOTOS = [
  { src: '/images/new-1.jpg', alt: 'МИХАЛ ЕООД — дървен материал' },
  { src: '/images/new-2.jpg', alt: 'МИХАЛ ЕООД — складова база' },
  { src: '/images/new-4.jpg', alt: 'МИХАЛ ЕООД — сух дървен материал' },
  { src: '/images/new-5.jpg', alt: 'МИХАЛ ЕООД — производство' },
  { src: '/images/new-6.jpg', alt: 'МИХАЛ ЕООД — дървени материали' },
]

/**
 * Photo strip below the hero. Every image is lazy and carries its intrinsic
 * ratio, so the section costs nothing until it is scrolled to and reserves
 * its own height rather than shoving the footer around as photos arrive.
 */
export default function Showcase() {
  return (
    <section aria-label="Галерия" className="bg-timber-bark px-4 py-16 md:px-8 md:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
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
    </section>
  )
}
