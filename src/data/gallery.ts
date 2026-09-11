export type GalleryImage = {
  srcUrl: string
  alt: string
  /** Intrinsic size, so the masonry grid reserves each tile before the
      image loads instead of reflowing 24 times on the way down. */
  width: number
  height: number
}

/** Yard and product photography. Numbered files first, then later additions. */
export const GALLERY_IMAGES: GalleryImage[] = [
  { srcUrl: '/images/gallery/mihal-razlog-2-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 1', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-3-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 2', width: 1000, height: 666 },
  { srcUrl: '/images/gallery/mihal-razlog-4-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 3', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-5-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 4', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-6-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 5', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-7-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 6', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-8-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 7', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-9-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 8', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-10-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 9', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-11-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 10', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-12-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 11', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-13-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 12', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/mihal-razlog-14-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 13', width: 667, height: 1000 },
  { srcUrl: '/images/gallery/mihal-razlog-15-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 14', width: 667, height: 1000 },
  { srcUrl: '/images/gallery/mihal-razlog-16-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 15', width: 667, height: 1000 },
  { srcUrl: '/images/gallery/mihal-razlog-17-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 16', width: 667, height: 1000 },
  { srcUrl: '/images/gallery/mihal-razlog-18-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 17', width: 667, height: 1000 },
  { srcUrl: '/images/gallery/mihal-razlog-19-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 18', width: 667, height: 1000 },
  { srcUrl: '/images/gallery/mihal-razlog-21-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 19', width: 667, height: 1000 },
  { srcUrl: '/images/gallery/mihal-razlog-23-min.jpeg', alt: 'МИХАЛ ЕООД — снимка 20', width: 1000, height: 667 },
  { srcUrl: '/images/gallery/viber_image_2026-08-14_13-18-18-734.jpg', alt: 'МИХАЛ ЕООД — снимка 21', width: 1200, height: 1600 },
  { srcUrl: '/images/gallery/viber_image_2026-08-14_13-18-18-999.jpg', alt: 'МИХАЛ ЕООД — снимка 22', width: 1200, height: 1600 },
  { srcUrl: '/images/gallery/viber_image_2026-08-14_13-18-19-284.jpg', alt: 'МИХАЛ ЕООД — снимка 23', width: 1200, height: 1600 },
  { srcUrl: '/images/gallery/viber_image_2026-08-14_13-18-19-506.jpg', alt: 'МИХАЛ ЕООД — снимка 24', width: 1200, height: 1600 },
]
