import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../sections/Nav'
import Footer from '../sections/Footer'
import TintedBackdrop from '../components/TintedBackdrop'
import Lightbox from '../components/Lightbox'
import { GALLERY_IMAGES } from '../data/gallery'

function ExpandIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true" className="h-5 w-5">
      <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" />
    </svg>
  )
}

export default function Gallery() {
  const [zoomed, setZoomed] = useState<number | null>(null)

  useEffect(() => {
    document.title = 'Галерия — МИХАЛ ЕООД'
  }, [])

  return (
    <>
      <Nav />

      <div className="fixed inset-0 z-0 overflow-hidden bg-timber-bark">
        <TintedBackdrop src="/images/services.jpg" strength="dark" />
      </div>

      <main className="relative z-10 px-4 pb-20 pt-32 md:px-8 md:pb-28 md:pt-44">
        <div className="mx-auto max-w-[1400px]">
          <h1 className="sr-only">Галерия</h1>

          <p className="fade-up mb-8 text-center font-sans text-[0.66rem] uppercase tracking-[0.22em] text-timber-cream/45 md:mb-12">
            Натиснете снимка, за да я видите в по-голям размер
          </p>

          {/* Multi-column masonry: the set is 13 landscape and 11 portrait, so a
              uniform square grid would crop half of them badly. Columns keep
              every photo at its own proportions. */}
          <div className="columns-2 gap-3 sm:columns-3 md:gap-4 lg:columns-4">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={img.srcUrl}
                type="button"
                onClick={() => setZoomed(i)}
                aria-label={`Отвори ${img.alt}`}
                className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-white/5 ring-1 ring-inset ring-white/10 transition-shadow duration-500 hover:ring-white/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-sap md:mb-4"
              >
                <img
                  src={img.srcUrl}
                  alt={img.alt}
                  width={img.width}
                  height={img.height}
                  loading={i < 6 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="block w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />

                {/* Warm veil + expand mark, so a pointer gets a clear affordance */}
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-timber-bark/70 via-timber-bark/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-timber-cream/90 text-timber-bark opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                  <ExpandIcon />
                </span>
              </button>
            ))}
          </div>

          <div className="fade-up mt-14 flex justify-center md:mt-16" style={{ animationDelay: '0.2s' }}>
            <Link to="/" className="cta-button cta-button--sm font-sans uppercase tracking-[0.18em]">
              <span>Назад</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />

      <Lightbox
        images={GALLERY_IMAGES}
        index={zoomed}
        onClose={() => setZoomed(null)}
        onStep={(step) =>
          setZoomed((i) =>
            i === null ? i : (i + step + GALLERY_IMAGES.length) % GALLERY_IMAGES.length,
          )
        }
      />
    </>
  )
}
