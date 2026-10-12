import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex]'

/**
 * Keeps Tab and Shift+Tab inside a modal while it is open. `aria-modal` tells
 * a screen reader the page behind is inert, but it does nothing for the Tab
 * key: without this, a keyboard user pressing Tab on the last control walks
 * straight off the dialog into a page they cannot see.
 */
export function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active) return

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const root = ref.current
      if (!root) return

      const items = [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter(
        (el) => el.tabIndex >= 0 && !el.hasAttribute('hidden') && el.getClientRects().length > 0,
      )
      if (items.length === 0) {
        e.preventDefault()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement

      if (!root.contains(current)) {
        e.preventDefault()
        first.focus()
      } else if (e.shiftKey && current === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && current === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [ref, active])
}
