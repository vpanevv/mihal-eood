import { useCallback, useEffect, useRef } from 'react'
import type { GalleryImage } from '../data/gallery'

type Props = {
  images: GalleryImage[]
  /** null closes the viewer. */
  index: number | null
  onClose: () => void
  /** Relative move, so rapid clicks compose instead of collapsing into one. */
  onStep: (step: number) => void
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="h-5 w-5">
      {dir === 'left' ? <polyline points="15 18 9 12 15 6" /> : <polyline points="9 18 15 12 9 6" />}
    </svg>
  )
}

const control =
  'absolute top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/30 bg-timber-bark/60 text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-timber-bark focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-sap md:h-14 md:w-14'

export default function Lightbox({ images, index, onClose, onStep }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<Element | null>(null)
  const open = index !== null
  const count = images.length

  // Deliberately does not read `index`: two clicks in one tick would both see
  // the same stale value and collapse into a single step.
  const go = useCallback((step: number) => onStep(step), [onStep])

  // Opening and closing: scroll lock and focus. Keyed on `open` alone, so
  // stepping between photos does not yank focus back to the close button.
  useEffect(() => {
    if (!open) return
    lastFocused.current = document.activeElement
    closeRef.current?.focus()
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
      ;(lastFocused.current as HTMLElement | null)?.focus?.()
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose, go])

  // Warm the neighbours so stepping is instant rather than waiting on a
  // lazy image that the grid never got around to fetching.
  useEffect(() => {
    if (index === null || count < 2) return
    for (const step of [1, -1]) {
      const img = new Image()
      img.src = images[(index + step + count) % count].srcUrl
    }
  }, [index, count, images])

  if (index === null) return null
  const image = images[index]

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center p-4 md:p-10"
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
    >
      {/* Click-away layer */}
      <button
        type="button"
        aria-label="Затвори"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-timber-bark/90 backdrop-blur-md"
      />

      <img
        key={image.srcUrl}
        src={image.srcUrl}
        alt={image.alt}
        width={image.width}
        height={image.height}
        className="fade-up relative max-h-full max-w-full rounded-xl object-contain shadow-[0_30px_90px_rgba(0,0,0,0.7)]"
      />

      {count > 1 && (
        <>
          <button type="button" onClick={() => go(-1)} aria-label="Предишна снимка" className={`${control} left-3 md:left-6`}>
            <Chevron dir="left" />
          </button>
          <button type="button" onClick={() => go(1)} aria-label="Следваща снимка" className={`${control} right-3 md:right-6`}>
            <Chevron dir="right" />
          </button>

          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-[0.72rem] uppercase tracking-[0.22em] text-timber-cream/60 md:bottom-8">
            {index + 1} / {count}
          </p>
        </>
      )}

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        aria-label="Затвори"
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-timber-bark/60 text-lg text-white backdrop-blur-sm transition-colors hover:border-white hover:bg-white hover:text-timber-bark md:right-8 md:top-8"
      >
        ✕
      </button>
    </div>
  )
}
