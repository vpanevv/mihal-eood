import { useEffect, useId, useRef, useState } from 'react'

type Props = {
  label: string
  items: { anchor: string; title: string }[]
  active: string | null
  onPick: (anchor: string) => void
}

/**
 * The phone form of the Products picker: one bar that names the current
 * choice, with a menu button that opens the full list. Six labels in a bar
 * that scrolls sideways hide most of the choices off-screen; this shows all of
 * them at once, one tap away.
 */
export default function PickerMenu({ label, items, active, onPick }: Props) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const toggle = useRef<HTMLButtonElement>(null)
  const listId = useId()
  const current = items.find((i) => i.anchor === active)

  // A tap anywhere else, or Escape, closes the list; Escape hands focus back to the bar.
  useEffect(() => {
    if (!open) return
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      setOpen(false)
      toggle.current?.focus()
    }
    document.addEventListener('pointerdown', onDown)
    window.addEventListener('keydown', onKey)
    // Start where the visitor is: on the current choice, else the first.
    const list = root.current
    ;(list?.querySelector<HTMLButtonElement>('[aria-pressed="true"]') ?? list?.querySelector<HTMLButtonElement>('[data-item]'))?.focus()
    return () => {
      document.removeEventListener('pointerdown', onDown)
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const pick = (anchor: string) => {
    onPick(anchor)
    setOpen(false)
    toggle.current?.focus()
  }

  return (
    <div ref={root} className="relative" role="group" aria-label={label}>
      <button
        ref={toggle}
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex min-h-[56px] w-full items-center gap-4 rounded-full bg-timber-bark py-2 pl-6 pr-2 text-left shadow-[0_16px_34px_-16px_rgba(42,32,17,0.75)] ring-1 ring-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold"
      >
        <span className="min-w-0 grow">
          <span className="block font-sans text-[0.62rem] font-medium uppercase tracking-[0.22em] text-timber-sap">
            {current ? 'Продукт' : 'Изберете'}
          </span>
          <span className="block truncate font-display text-[1.05rem] font-medium uppercase tracking-[0.1em] text-white">
            {current ? current.title : 'Продукт'}
          </span>
        </span>
        {/* The three lines fold into a cross while the list is open. */}
        <span
          aria-hidden="true"
          className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-timber-gold text-timber-bark"
        >
          <span className={`absolute h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300 ${open ? 'rotate-45' : '-translate-y-[6px]'}`} />
          <span className={`absolute h-[2px] w-[18px] rounded-full bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
          <span className={`absolute h-[2px] w-[18px] rounded-full bg-current transition-transform duration-300 ${open ? '-rotate-45' : 'translate-y-[6px]'}`} />
        </span>
        <span className="sr-only">{open ? 'Затвори списъка' : 'Отвори списъка с продукти'}</span>
      </button>

      <div
        id={listId}
        hidden={!open}
        className="pop-in absolute inset-x-0 top-[calc(100%+0.5rem)] z-30 overflow-hidden rounded-3xl bg-timber-bark p-2 shadow-[0_24px_50px_-18px_rgba(42,32,17,0.85)] ring-1 ring-white/10"
      >
        <ul className="divide-y divide-white/8">
          {items.map(({ anchor, title }) => {
            const on = active === anchor
            return (
              <li key={anchor}>
                <button
                  type="button"
                  data-item
                  aria-pressed={on}
                  onClick={() => pick(anchor)}
                  className={`flex min-h-[52px] w-full items-center justify-between gap-3 rounded-2xl px-5 text-left font-display text-[1rem] font-medium uppercase tracking-[0.1em] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-timber-gold ${
                    on ? 'bg-timber-gold text-timber-bark' : 'text-white/85 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {title}
                  {on && <span aria-hidden="true" className="h-2 w-2 rounded-full bg-timber-bark" />}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
