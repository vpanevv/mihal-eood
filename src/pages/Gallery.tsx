import { useEffect, useMemo, useState } from 'react'
import PageBanner from '../components/PageBanner'
import Lightbox from '../components/Lightbox'
import { ExpandIcon } from '../components/Icons'
import { GALLERY_IMAGES, GALLERY_TOPICS, type GalleryTopic } from '../data/gallery'

export default function Gallery() {
  const [zoomed, setZoomed] = useState<number | null>(null)
  const [topic, setTopic] = useState<GalleryTopic | 'all'>('all')

  useEffect(() => {
    document.title = 'Галерия — МИХАЛ ЕООД'
  }, [])

  // The viewer steps through what is on screen, so it must see the same list.
  const shown = useMemo(
    () => (topic === 'all' ? GALLERY_IMAGES : GALLERY_IMAGES.filter((img) => img.topic === topic)),
    [topic],
  )

  const pick = (next: GalleryTopic | 'all') => {
    setZoomed(null)
    setTopic(next)
  }

  return (
    <main className="relative z-10">
      <PageBanner crumb="Галерия" title="От" accent="базата" image="/images/gallery/mihal-razlog-12-min.jpeg" />

      <section className="py-10 md:py-16">
        <div className="mx-auto max-w-[1400px] px-4 md:px-8">
          <div
            role="group"
            aria-label="Филтри по тема"
            className="no-scrollbar fade-up -mx-4 flex gap-2.5 overflow-x-auto px-4 md:mx-0 md:px-0"
          >
            {GALLERY_TOPICS.map(({ id, label }) => (
              <button key={id} type="button" className="chip" aria-pressed={topic === id} onClick={() => pick(id)}>
                {label}
              </button>
            ))}
          </div>

          <p className="fade-up mt-6 font-sans text-[0.8rem] uppercase tracking-[0.2em] text-timber-bark/70">
            Натиснете снимка, за да я видите в по-голям размер
          </p>

          {/* Multi-column masonry: the set mixes landscape and portrait, so a
              uniform square grid would crop half of them badly. Columns keep
              every photo at its own proportions. */}
          <div className="mt-6 columns-2 gap-3 sm:columns-3 md:mt-8 md:gap-4 lg:columns-4">
            {shown.map((img, i) => (
              <button
                key={img.srcUrl}
                type="button"
                onClick={() => setZoomed(i)}
                aria-label={`Отвори ${img.alt}`}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-timber-bark/5 ring-1 ring-timber-bark/10 transition-shadow duration-500 hover:ring-timber-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold md:mb-4"
              >
                {/* Tiles are a quarter to a half of the screen wide, so they
                    load the 640px copy; a large retina screen can still pick
                    the full photo, which the lightbox then has cached. */}
                <img
                  src={img.thumbUrl}
                  srcSet={`${img.thumbUrl} 640w, ${img.srcUrl} ${img.width}w`}
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />

                {/* Warm veil, caption and expand mark, so a pointer gets a clear affordance */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-timber-bark/80 via-timber-bark/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-3 bottom-3 translate-y-2 pr-11 text-left font-sans text-[0.72rem] uppercase tracking-[0.14em] text-white opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  {img.alt}
                </span>
                <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-timber-bark opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <ExpandIcon className="h-4 w-4" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Lightbox
        images={shown}
        index={zoomed}
        onClose={() => setZoomed(null)}
        onStep={(step) =>
          setZoomed((i) => (i === null ? i : (i + step + shown.length) % shown.length))
        }
      />
    </main>
  )
}
