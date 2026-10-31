import { useRef, useState } from 'react'
import type { Photo } from '../data/products'

type Props = { photos: Photo[]; alt: string }

const mdFor = (src: string) => src.replace(/\.jpg$/, '-800.jpg')

const arrow = (dir: 'left' | 'right') => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
    {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
  </svg>
)

const control =
  'absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/40 bg-timber-bark/60 text-white transition-colors hover:bg-white hover:text-timber-bark focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold'

/**
 * The product photographs in the dialog. A row of full-width slides that snap
 * into place — the browser does the swiping, so it follows the finger on a
 * phone and works with a trackpad — plus arrows and dots for a mouse, and the
 * arrow keys. One photograph renders without any controls.
 */
export default function PhotoCarousel({ photos, alt }: Props) {
  const track = useRef<HTMLDivElement>(null)
  const [index, setIndex] = useState(0)
  const count = photos.length

  const goTo = (i: number) => {
    const el = track.current
    if (!el) return
    const next = Math.max(0, Math.min(count - 1, i))
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollTo({ left: next * el.clientWidth, behavior: calm ? 'auto' : 'smooth' })
  }

  const onScroll = () => {
    const el = track.current
    if (el) setIndex(Math.round(el.scrollLeft / el.clientWidth))
  }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault()
      goTo(index + (e.key === 'ArrowRight' ? 1 : -1))
    }
  }

  const many = count > 1

  return (
    <div className="relative overflow-hidden rounded-t-3xl bg-timber-bark/5">
      <div
        ref={track}
        onScroll={many ? onScroll : undefined}
        onKeyDown={many ? onKeyDown : undefined}
        tabIndex={many ? 0 : undefined}
        role={many ? 'group' : undefined}
        aria-roledescription={many ? 'carousel' : undefined}
        aria-label={many ? `Снимки — ${alt}` : undefined}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-timber-gold [&::-webkit-scrollbar]:hidden"
      >
        {photos.map(({ src, focus }, i) => (
          <div
            key={src}
            role={many ? 'group' : undefined}
            aria-roledescription={many ? 'slide' : undefined}
            aria-label={many ? `${i + 1} от ${count}` : undefined}
            className="relative aspect-square max-h-[68svh] w-full shrink-0 snap-center snap-always"
          >
            <img
              src={src}
              srcSet={`${mdFor(src)} 800w, ${src} 1200w`}
              sizes="(min-width: 640px) 512px, 92vw"
              alt={many ? `${alt} — снимка ${i + 1}` : alt}
              width={1200}
              height={1600}
              decoding="async"
              // The rest are small and one swipe away: fetch them now, behind the
              // first, so a swipe never lands on an empty frame.
              {...(i === 0 ? {} : { fetchpriority: 'low' })}
              draggable={false}
              style={{ objectPosition: focus ?? '50% 50%' }}
              className="h-full w-full select-none object-cover"
            />
          </div>
        ))}
      </div>

      {many && (
        <>
          {index > 0 && (
            <button type="button" onClick={() => goTo(index - 1)} aria-label="Предишна снимка" className={`${control} left-3`}>
              {arrow('left')}
            </button>
          )}
          {index < count - 1 && (
            <button type="button" onClick={() => goTo(index + 1)} aria-label="Следваща снимка" className={`${control} right-3`}>
              {arrow('right')}
            </button>
          )}
          <div className="pointer-events-none absolute inset-x-0 bottom-3 flex justify-center">
            <div className="pointer-events-auto flex items-center rounded-full bg-timber-bark/60 px-1.5">
              {photos.map(({ src }, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Снимка ${i + 1} от ${count}`}
                  aria-current={i === index}
                  className="group flex h-7 w-7 items-center justify-center rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold"
                >
                  <span
                    className={`block rounded-full transition-all duration-300 ${
                      i === index ? 'h-2 w-5 bg-white' : 'h-2 w-2 bg-white/55 group-hover:bg-white/80'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
