import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Routers keep the scroll offset across navigations; pages should start at the
 * top — unless the link carried a hash, in which case the section it names
 * should come into view. Lazy routes mount a frame or two after the URL
 * changes, so the anchor is retried for a few frames before giving up.
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    let frame = 0
    let tries = 0
    const find = () => {
      const target = document.querySelector(hash)
      if (target) {
        target.scrollIntoView({ block: 'start' })
        return
      }
      if (tries++ < 30) frame = requestAnimationFrame(find)
    }
    frame = requestAnimationFrame(find)
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return null
}
