import { useEffect, useRef } from 'react'
import { thumbFor } from '../data/gallery'

type Props = {
  before: string
  after: string
  title: string
}

/**
 * Drag to compare a board before and after the work. The control is a real
 * <input type="range"> stretched invisibly over the photograph, so dragging,
 * tapping, arrow keys and screen readers all work with no pointer code of
 * ours. The position lives in a CSS variable written straight to the node,
 * so a drag never re-renders React.
 */
export default function BeforeAfter({ before, after, title }: Props) {
  const root = useRef<HTMLDivElement>(null)
  const input = useRef<HTMLInputElement>(null)
  const touched = useRef(false)

  const move = (v: number) => root.current?.style.setProperty('--pos', String(v))

  // Once, as it scrolls into view, the handle sweeps a little to the left and
  // back — enough to show it is movable. It stops the moment anyone touches it,
  // and never runs for people who have asked for less motion.
  useEffect(() => {
    const el = root.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    const sweep = () => {
      const start = performance.now()
      const tick = (now: number) => {
        if (touched.current) return
        const t = Math.min((now - start) / 1500, 1)
        const v = 50 - 24 * Math.sin(Math.PI * t)
        move(v)
        if (input.current) input.current.value = String(v)
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        sweep()
      },
      { threshold: 0.7 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  const sizes = '(min-width: 768px) 33vw, (min-width: 640px) 50vw, 92vw'

  return (
    <div
      ref={root}
      style={{ '--pos': 50 } as React.CSSProperties}
      className="relative aspect-[4/3] w-full select-none overflow-hidden bg-timber-bark/5"
    >
      <img
        src={thumbFor(after)}
        srcSet={`${thumbFor(after)} 640w, ${after} 1200w`}
        sizes={sizes}
        alt={`${title} — след`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <img
        src={thumbFor(before)}
        srcSet={`${thumbFor(before)} 640w, ${before} 1200w`}
        sizes={sizes}
        alt={`${title} — преди`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className="ba-before absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Declared before the handle so the handle can show its focus ring. */}
      <input
        ref={input}
        type="range"
        min={0}
        max={100}
        step="any"
        defaultValue={50}
        onInput={(e) => move(Number(e.currentTarget.value))}
        onPointerDown={() => (touched.current = true)}
        onKeyDown={(e) => {
          touched.current = true
          // The browser's own arrow stride on a continuous range is a fraction
          // of a percent — hundreds of presses to cross the photo. Take 5% a
          // press, or 1% with Shift. Home, End and dragging stay native.
          const dir = e.key === 'ArrowRight' || e.key === 'ArrowUp' ? 1 : e.key === 'ArrowLeft' || e.key === 'ArrowDown' ? -1 : 0
          if (dir === 0) return
          e.preventDefault()
          const next = Math.min(100, Math.max(0, Number(e.currentTarget.value) + dir * (e.shiftKey ? 1 : 5)))
          e.currentTarget.value = String(next)
          move(next)
        }}
        onFocus={() => (touched.current = true)}
        aria-label={`Плъзнете, за да сравните преди и след — ${title}`}
        className="peer absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0 [touch-action:pan-y]"
      />

      <span
        aria-hidden="true"
        className="ba-handle pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white shadow-[0_0_14px_rgba(0,0,0,0.5)]"
      />
      <span
        aria-hidden="true"
        className="ba-handle pointer-events-none absolute top-1/2 z-10 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-timber-bark shadow-[0_6px_18px_rgba(0,0,0,0.35)] ring-1 ring-black/10 peer-focus-visible:ring-2 peer-focus-visible:ring-timber-gold"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
          <path d="m9 7-5 5 5 5M15 7l5 5-5 5" />
        </svg>
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-3 top-3 z-10 rounded-full bg-timber-bark/75 px-3 py-1 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white"
      >
        Преди
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-3 top-3 z-10 rounded-full bg-timber-bark/75 px-3 py-1 font-sans text-[0.62rem] font-medium uppercase tracking-[0.2em] text-white"
      >
        След
      </span>
    </div>
  )
}
