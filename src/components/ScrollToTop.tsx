import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * How long to wait for a lazy route to mount. A time budget, not a frame
 * count: this used to retry 30 frames, which is 500ms at 60Hz but ~200ms at
 * 144Hz, and a slow chunk load burns frames just as fast — so a shared
 * /contacts#inquiry link silently failed to scroll on a fast screen or a slow
 * network, and the caller never knew.
 */
const WAIT_MS = 6000

/**
 * Routers keep the scroll offset across navigations; pages should start at the
 * top — unless the link carried a hash, in which case the section it names
 * should come into view. Lazy routes mount a frame or two after the URL
 * changes, so the anchor is retried for a few frames before giving up.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const firstRender = useRef(true)

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)

      // A page change is silent to a screen reader: focus stays on the link
      // that was pressed, in a page that is gone. Moving it to <main> makes the
      // new page announce itself. Not on the first load, and lazy routes mount
      // a frame or two late, so wait for <main> to exist.
      if (firstRender.current) {
        firstRender.current = false
        return
      }
      let frame = 0
      const deadline = performance.now() + WAIT_MS
      const focusMain = () => {
        const main = document.getElementById('main')
        if (main) main.focus({ preventScroll: true })
        else if (performance.now() < deadline) frame = requestAnimationFrame(focusMain)
      }
      frame = requestAnimationFrame(focusMain)
      return () => cancelAnimationFrame(frame)
    }
    firstRender.current = false

    let frame = 0
    const deadline = performance.now() + WAIT_MS
    const find = () => {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
      if (performance.now() < deadline) frame = requestAnimationFrame(find)
    }
    frame = requestAnimationFrame(find)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
