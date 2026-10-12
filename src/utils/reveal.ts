/**
 * Scroll reveal. Anything marked `.reveal` stays hidden until it is about to
 * scroll into view, then plays one short fade-up.
 *
 * It is an enhancement, not a dependency: the hidden state only exists under
 * `html.reveal-ready`, which is added here and only when the browser can do it
 * and the visitor has not asked for reduced motion. If this never runs, every
 * section is simply visible.
 *
 * The revealed state is a `data-in` attribute rather than a class. React
 * rewrites `className` wholesale whenever the string changes (the wood cards do
 * that), which would wipe a class added from outside and leave the element
 * hidden for good; React never touches attributes it does not own.
 */
export function startReveal() {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Hot reload re-runs the entry file; a second observer would only double the work.
  if (document.documentElement.classList.contains('reveal-ready')) return

  const container = document.getElementById('root')
  if (!container) return

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        entry.target.setAttribute('data-in', '')
        io.unobserve(entry.target)
      }
    },
    // A little inside the bottom edge, so a block starts to appear once it is
    // properly on screen rather than as its first pixel crosses the line.
    { rootMargin: '0px 0px -6% 0px', threshold: 0.05 },
  )

  const PENDING = '.reveal:not([data-in])'
  const watch = (node: Element) => {
    if (node.matches(PENDING)) io.observe(node)
    node.querySelectorAll(PENDING).forEach((el) => io.observe(el))
  }
  const forget = (node: Element) => {
    io.unobserve(node)
    node.querySelectorAll('.reveal').forEach((el) => io.unobserve(el))
  }

  // Pages mount and unmount as the route changes, and cards appear when a wood
  // is chosen, so new nodes are picked up as they arrive.
  new MutationObserver((records) => {
    for (const record of records) {
      record.addedNodes.forEach((n) => n.nodeType === 1 && watch(n as Element))
      record.removedNodes.forEach((n) => n.nodeType === 1 && forget(n as Element))
    }
  }).observe(container, { childList: true, subtree: true })

  watch(container)
  // Before React renders, so nothing paints visible and then snaps hidden.
  document.documentElement.classList.add('reveal-ready')
}
