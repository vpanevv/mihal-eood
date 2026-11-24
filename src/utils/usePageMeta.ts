import { useEffect } from 'react'
import { ROUTE_META, canonicalFor } from '../data/seo'

type Override = { title?: string; description?: string }

const setMeta = (selector: string, value: string) =>
  document.querySelector(selector)?.setAttribute('content', value)

/**
 * Each route owns its tab title, its search-result description and its
 * canonical address, all read from the table in data/seo.ts. The build writes
 * the same values into each route's HTML; this keeps them right as the
 * visitor moves between pages without a reload. `override` lets a page narrow
 * the title and description to what it is showing (one product, say) while
 * the canonical stays the route's own.
 */
export function usePageMeta(path: string, override: Override = {}) {
  const meta = ROUTE_META[path]
  const title = override.title ?? meta.title
  const description = override.description ?? meta.description

  useEffect(() => {
    const url = canonicalFor(path)
    document.title = title
    setMeta('meta[name="description"]', description)
    setMeta('meta[property="og:title"]', title)
    setMeta('meta[property="og:description"]', description)
    setMeta('meta[property="og:url"]', url)
    setMeta('meta[name="twitter:title"]', title)
    setMeta('meta[name="twitter:description"]', description)
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url)
  }, [path, title, description])
}
