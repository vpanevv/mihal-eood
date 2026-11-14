import { useLayoutEffect, useRef, useState } from 'react'

type Props = {
  label: string
  items: { anchor: string; title: string }[]
  active: string
  onJump: (anchor: string) => void
}

/**
 * The gallery's chapter switch: a dark bar with one gold marker that slides to
 * whichever chapter is on screen. The marker is a single element moved with a
 * transform, so the change reads as travel between chapters rather than one
 * button going out as another lights up.
 */
export default function ChapterNav({ label, items, active, onJump }: Props) {
  const bar = useRef<HTMLDivElement>(null)
  const buttons = useRef(new Map<string, HTMLButtonElement>())
  const [marker, setMarker] = useState<{ left: number; width: number } | null>(null)

  // Measured, not assumed: the labels are different lengths, and their width
  // moves again when the web font arrives or the screen is turned.
  useLayoutEffect(() => {
    const measure = () => {
      const el = buttons.current.get(active)
      if (el) setMarker({ left: el.offsetLeft, width: el.offsetWidth })
    }
    measure()
    if (!bar.current || !('ResizeObserver' in window)) return
    const ro = new ResizeObserver(measure)
    ro.observe(bar.current)
    return () => ro.disconnect()
  }, [active])

  return (
    <nav aria-label={label} className="sticky top-[5.5rem] z-20 md:top-[7.25rem]">
      <div
        ref={bar}
        className="no-scrollbar relative flex w-fit max-w-full overflow-x-auto rounded-full bg-timber-bark p-1.5 shadow-[0_16px_34px_-16px_rgba(42,32,17,0.75)] ring-1 ring-white/10"
      >
        {marker && (
          <span
            aria-hidden="true"
            className="absolute bottom-1.5 left-0 top-1.5 rounded-full bg-timber-gold transition-[transform,width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
            style={{ width: marker.width, transform: `translateX(${marker.left}px)` }}
          />
        )}

        {items.map(({ anchor, title }) => {
          const on = active === anchor
          return (
            <button
              key={anchor}
              ref={(el) => {
                if (el) buttons.current.set(anchor, el)
                else buttons.current.delete(anchor)
              }}
              type="button"
              aria-current={on ? 'true' : undefined}
              onClick={() => onJump(anchor)}
              className={`relative min-h-[44px] shrink-0 rounded-full px-4 font-display text-[0.86rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:px-7 md:text-[0.95rem] ${
                on ? 'text-timber-bark' : 'text-white/75 hover:text-white'
              }`}
            >
              {title}
            </button>
          )
        })}
      </div>
    </nav>
  )
}
