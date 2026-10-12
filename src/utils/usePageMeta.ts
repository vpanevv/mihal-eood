import { useEffect } from 'react'

/**
 * Each route owns its tab title and its search-result description; without
 * the description, every page of the site was described as the landing page.
 */
export function usePageMeta(title: string, description: string) {
  useEffect(() => {
    document.title = title
    document.querySelector('meta[name="description"]')?.setAttribute('content', description)
  }, [title, description])
}
