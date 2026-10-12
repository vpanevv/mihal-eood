/**
 * The photograph behind each inner page's banner. One table, read by the pages
 * and by vite.config.ts, which uses it to start the download from the HTML —
 * before any script has run — so a direct visit to /contacts does not wait for
 * React to boot before it even asks for the picture it is going to show.
 */
export const BANNERS: Record<string, string> = {
  '/products': '/images/gallery/mihal-razlog-9-min.jpeg',
  '/delivery': '/images/new-1.jpg',
  '/gallery': '/images/gallery/mihal-razlog-12-min.jpeg',
  '/about-us': '/images/new-6.jpg',
  '/contacts': '/images/new-5.jpg',
  '/privacy': '/images/gallery/mihal-razlog-13-min.jpeg',
}
