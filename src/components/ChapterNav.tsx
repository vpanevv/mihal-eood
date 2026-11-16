import { useLayoutEffect, useRef, useState } from 'react'
import PickerMenu from './PickerMenu'

type Props = {
  label: string
  items: { anchor: string; title: string }[]
  /** null before anything is chosen: no marker, every label at rest. */
  active: string | null
  onJump: (anchor: string) => void
  /**
   * 'nav' jumps between parts of one page and stays pinned under the site bar
   * while they scroll past. 'select' chooses what the page shows: the buttons
   * report pressed rather than current, and the bar stays where it is.
   */
  kind?: 'nav' | 'select'
}

/**
 * A dark bar with one gold marker that slides to the chosen item. The marker
 * is a single element moved with a transform, so a change reads as travel from
 * one item to the next rather than one button going out as another lights up.
 */
export default function ChapterNav({ label, items, active, onJump, kind = 'nav' }: Props) {
  const bar = useRef<HTMLDivElement>(null)
  const buttons = useRef(new Map<string, HTMLButtonElement>())
  const [marker, setMarker] = useState<{ left: number; width: number } | null>(null)

  // Measured, not assumed: the labels are different lengths, and their width
  // moves again when the web font arrives or the screen is turned.
  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? buttons.current.get(active) : undefined
      setMarker(el ? { left: el.offsetLeft, width: el.offsetWidth } : null)
    }
    measure()
    if (!bar.current || !('ResizeObserver' in window)) return
    const ro = new ResizeObserver(measure)
    ro.observe(bar.current)
    return () => ro.disconnect()
  }, [active])

  // On a phone the bar scrolls sideways; keep the chosen item in view. The
  // first time — a page opened from a link — it simply starts there; after
  // that it glides, so a tap visibly moves the bar.
  const settled = useRef(false)
  useLayoutEffect(() => {
    const el = active ? buttons.current.get(active) : undefined
    const strip = bar.current
    if (!el || !strip) return
    const first = !settled.current
    settled.current = true
    if (strip.scrollWidth <= strip.clientWidth) return
    const calm = first || window.matchMedia('(prefers-reduced-motion: reduce)').matches
    strip.scrollTo({ left: el.offsetLeft - (strip.clientWidth - el.offsetWidth) / 2, behavior: calm ? 'auto' : 'smooth' })
  }, [active])

  const select = kind === 'select'
  const Wrapper = select ? 'div' : 'nav'

  return (
    <>
      {/* A picker on a phone becomes a menu: one bar naming the choice, the list behind it. */}
      {select && (
        <div className="md:hidden">
          <PickerMenu label={label} items={items} active={active} onPick={onJump} />
        </div>
      )}
    <Wrapper
      aria-label={label}
      role={select ? 'group' : undefined}
      className={select ? 'relative hidden md:block' : 'sticky top-[5.5rem] z-20 md:top-[7.25rem]'}
    >
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
              aria-current={!select && on ? 'true' : undefined}
              aria-pressed={select ? on : undefined}
              onClick={() => onJump(anchor)}
              className={`relative min-h-[44px] shrink-0 rounded-full px-4 font-display text-[0.86rem] font-medium uppercase tracking-[0.12em] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white md:px-6 md:text-[0.95rem] ${
                on ? 'text-timber-bark' : 'text-white/75 hover:text-white'
              }`}
            >
              {title}
            </button>
          )
        })}
      </div>
    </Wrapper>
    </>
  )
}
