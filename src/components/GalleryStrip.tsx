import { useState } from 'react'
import { Link } from 'react-router-dom'
import Lightbox from './Lightbox'
import { ArrowIcon, ExpandIcon } from './Icons'
import { GALLERY_IMAGES } from '../data/gallery'

/** First photos of the gallery, as a swipeable strip on the landing page. */
const STRIP = GALLERY_IMAGES.slice(0, 8)

export default function GalleryStrip() {
  const [zoomed, setZoomed] = useState<number | null>(null)

  return (
    <>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:gap-5 md:px-8">
        {STRIP.map(({ thumbUrl, alt }, i) => (
          <button
            key={thumbUrl}
            type="button"
            onClick={() => setZoomed(i)}
            aria-label={`Отвори снимката: ${alt}`}
            className="group relative aspect-[4/3] w-[72vw] shrink-0 snap-center overflow-hidden rounded-2xl bg-timber-bark/5 ring-1 ring-timber-bark/10 transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold sm:w-[46vw] md:w-[30vw] lg:w-[23vw]"
          >
            <img
              src={thumbUrl}
              alt={alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
            />
            <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-timber-bark/55 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-timber-bark opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <ExpandIcon className="h-4 w-4" />
            </span>
          </button>
        ))}
      </div>

      <div className="mx-auto mt-8 max-w-[1200px] px-5 md:px-8">
        <Link
          to="/gallery"
          className="group/link inline-flex min-h-[44px] items-center gap-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-timber-ember transition-colors hover:text-timber-bark"
        >
          Цялата галерия
          <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
        </Link>
      </div>

      <Lightbox
        images={STRIP}
        index={zoomed}
        onClose={() => setZoomed(null)}
        onStep={(step) =>
          setZoomed((i) => (i === null ? i : (i + step + STRIP.length) % STRIP.length))
        }
      />
    </>
  )
}
