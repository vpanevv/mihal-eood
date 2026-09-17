export type GalleryTopic = 'yard' | 'material' | 'delivery'

export type GalleryImage = {
  srcUrl: string
  /** 640px-wide copy for grids; the lightbox loads srcUrl. */
  thumbUrl: string
  alt: string
  /** Intrinsic size, so the masonry grid reserves each tile before the
      image loads instead of reflowing on the way down. */
  width: number
  height: number
}

export type GalleryEntry = GalleryImage & { topic: GalleryTopic }

/** Every photo has a 640px copy under /images/thumbs with the same base name. */
export const thumbFor = (src: string) => src.replace(/^.*\/([^/]+)\.[a-z]+$/i, '/images/thumbs/$1.jpg')

export const GALLERY_TOPICS: { id: GalleryTopic | 'all'; label: string }[] = [
  { id: 'all', label: 'Всички' },
  { id: 'yard', label: 'Склад' },
  { id: 'material', label: 'Материал' },
  { id: 'delivery', label: 'Доставки' },
]

const g = (file: string) => `/images/gallery/${file}`
const LANDSCAPE = { width: 1000, height: 667 }
const PORTRAIT = { width: 667, height: 1000 }
const PHONE = { width: 1200, height: 1600 }

/** Yard, stock and delivery photography, tagged for the gallery filters. */
const ENTRIES: Omit<GalleryEntry, 'thumbUrl'>[] = [
  { srcUrl: g('mihal-razlog-2-min.jpeg'), alt: 'Складовата база в Разлог', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-3-min.jpeg'), alt: 'Подреден материал под навеса', topic: 'yard', ...LANDSCAPE, height: 666 },
  { srcUrl: g('mihal-razlog-4-min.jpeg'), alt: 'Пакети дъски под навеса', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-5-min.jpeg'), alt: 'Материал на открития склад', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-6-min.jpeg'), alt: 'Сух материал, подреден на пакети', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-7-min.jpeg'), alt: 'Пакети с различни сечения', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-8-min.jpeg'), alt: 'Дъски с разделителни летви', topic: 'material', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-9-min.jpeg'), alt: 'Челата на подредени дъски', topic: 'material', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-10-min.jpeg'), alt: 'Маркирани пакети дъски', topic: 'material', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-11-min.jpeg'), alt: 'Редици пакети на склада', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-12-min.jpeg'), alt: 'Дълга редица с материал', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-13-min.jpeg'), alt: 'Склад под открито небе', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('mihal-razlog-14-min.jpeg'), alt: 'Пакет дъски отблизо', topic: 'material', ...PORTRAIT },
  { srcUrl: g('mihal-razlog-15-min.jpeg'), alt: 'Материал под навеса', topic: 'yard', ...PORTRAIT },
  { srcUrl: g('mihal-razlog-16-min.jpeg'), alt: 'Високи пакети с материал', topic: 'yard', ...PORTRAIT },
  { srcUrl: g('mihal-razlog-17-min.jpeg'), alt: 'Пакет талпи', topic: 'material', ...PORTRAIT },
  { srcUrl: g('mihal-razlog-18-min.jpeg'), alt: 'Подредени сечения', topic: 'material', ...PORTRAIT },
  { srcUrl: g('mihal-razlog-19-min.jpeg'), alt: 'Дъски, подредени за сушене', topic: 'material', ...PORTRAIT },
  { srcUrl: g('mihal-razlog-21-min.jpeg'), alt: 'Пакети пред камерата за сушене', topic: 'yard', ...PORTRAIT },
  { srcUrl: g('mihal-razlog-23-min.jpeg'), alt: 'Редица пакети по склада', topic: 'yard', ...LANDSCAPE },
  { srcUrl: g('viber_image_2026-08-14_13-18-18-734.jpg'), alt: 'Складовата площадка', topic: 'yard', ...PHONE },
  { srcUrl: g('viber_image_2026-08-14_13-18-18-999.jpg'), alt: 'Материал на площадката', topic: 'yard', ...PHONE },
  { srcUrl: g('viber_image_2026-08-14_13-18-19-284.jpg'), alt: 'Пакети, готови за товарене', topic: 'yard', ...PHONE },
  { srcUrl: g('viber_image_2026-08-14_13-18-19-506.jpg'), alt: 'Площадка за товарене', topic: 'yard', ...PHONE },
  { srcUrl: '/images/new-4.jpg', alt: 'Закритият склад', topic: 'yard', ...PHONE },
  { srcUrl: '/images/new-5.jpg', alt: 'Натоварен камион с дървен материал', topic: 'delivery', width: 900, height: 1600 },
  { srcUrl: '/images/new-6.jpg', alt: 'Подготвена доставка', topic: 'delivery', ...PHONE },
  { srcUrl: '/images/new-1.jpg', alt: 'Камион с материал за доставка', topic: 'delivery', ...PHONE },
  { srcUrl: '/images/new-2.jpg', alt: 'Товарене на греди', topic: 'delivery', ...PHONE },
]

export const GALLERY_IMAGES: GalleryEntry[] = ENTRIES.map((entry) => ({
  ...entry,
  thumbUrl: thumbFor(entry.srcUrl),
}))
