import type { ComponentType } from 'react'
import type { Field } from '../utils/cubic'
import { BeamIcon, FloorIcon, GlulamIcon, LathsIcon, PanelIcon, PlanksIcon } from '../components/Icons'

export type Spec = {
  label: string
  /** Rendered as individual highlighted chips. */
  values: string[]
  unit: string
}

export type Group = {
  title?: string
  specs: Spec[]
}

/** A product photograph and the point of it that must stay in frame when it is cropped. */
export type Photo = {
  src: string
  /** CSS object-position — these are portrait shots shown in a wider frame. */
  focus?: string
}

export type Product = {
  id: string
  name: string
  /** The product's label on the Products page selector, where space is tight. */
  short: string
  /** One line under the name on cards. */
  summary: string
  Icon: ComponentType<{ className?: string }>
  /** Milled profile cross-section, shown in the detail dialog. */
  drawing?: string
  /** Photograph of the real product; leads both the card and its dialog. */
  photo?: string
  /** Where to centre `photo` when the card crops it. */
  photoFocus?: string
  /** More photographs, swiped through in the dialog; the first is `photo`. */
  photos?: Photo[]
  note?: string
  groups: Group[]
}

/** Sizes as given by the company (September 2026), in centimetres and metres. */
export const PRODUCTS: Product[] = [
  {
    id: 'suh-material',
    name: 'Сух дървен материал',
    short: 'Сух материал',
    summary: 'Бор, смърч, дъб, бук и липа · дебелини 1,8 – 12 см · ширини 8 – 23 см',
    Icon: PlanksIcon,
    drawing: '/images/drawing-2.png',
    photo: '/images/products/suh-material/suh-7.jpg',
    photoFocus: '50% 64%',
    photos: [
      { src: '/images/products/suh-material/suh-7.jpg', focus: '50% 64%' },
      { src: '/images/products/suh-material/suh-1.jpg', focus: '50% 72%' },
      { src: '/images/products/suh-material/suh-2.jpg' },
      { src: '/images/products/suh-material/suh-3.jpg', focus: '50% 80%' },
      { src: '/images/products/suh-material/suh-4.jpg', focus: '50% 70%' },
      { src: '/images/products/suh-material/suh-5.jpg', focus: '50% 95%' },
      { src: '/images/products/suh-material/suh-6.jpg', focus: '50% 90%' },
      { src: '/images/products/suh-material/suh-8.jpg', focus: '50% 60%' },
      { src: '/images/products/suh-material/suh-9.jpg', focus: '50% 65%' },
      { src: '/images/products/suh-material/suh-10.jpg', focus: '50% 60%' },
    ],
    note: 'От собствена сушилня. Материалът отлежава един месец след сушенето, преди да влезе в продажба.',
    groups: [
      {
        title: 'Иглолистна дървесина — бор и смърч',
        specs: [
          {
            label: 'дебелина',
            values: ['1,8', '2,2', '2,5', '3', '4', '5', '6', '7', '… до 12'],
            unit: 'см',
          },
          { label: 'ширина', values: ['8 – 23'], unit: 'см' },
          { label: 'дължина', values: ['от 4'], unit: 'м' },
        ],
      },
      {
        title: 'Широколистна дървесина — дъб, бук и липа',
        specs: [
          { label: 'дебелина', values: ['3 – 7'], unit: 'см' },
          { label: 'ширина', values: ['свободна'], unit: '' },
          { label: 'дължина', values: ['3'], unit: 'м' },
        ],
      },
    ],
  },
  {
    id: 'dyusheme',
    name: 'Дюшеме и декинг',
    short: 'Дюшеме',
    summary: 'Дебелина 2,5 – 4 см · ширина 8 – 22 см',
    Icon: FloorIcon,
    drawing: '/images/drawing-3.png',
    photo: '/images/products/dyusheme/dusheme-1.jpg',
    photoFocus: '50% 68%',
    photos: [
      { src: '/images/products/dyusheme/dusheme-1.jpg', focus: '50% 68%' },
      { src: '/images/products/dyusheme/dusheme-2.jpg', focus: '50% 80%' },
      { src: '/images/products/dyusheme/dusheme-3.jpg', focus: '50% 60%' },
    ],
    note: 'Дюшеме за вътрешна настилка и декинг за тераси — в едни и същи дебелини и ширини.',
    groups: [
      {
        specs: [
          { label: 'дебелина', values: ['2,5 – 4'], unit: 'см' },
          { label: 'ширина', values: ['8 – 22'], unit: 'см' },
        ],
      },
    ],
  },
  {
    id: 'lamperia',
    name: 'Ламперия /сачак/',
    short: 'Ламперия',
    summary: 'Дебелина 1,5 – 2,5 см · ширина 8 – 23 см · модел по избор',
    Icon: PanelIcon,
    drawing: '/images/drawing-1.png',
    photo: '/images/products/lamperia/lamperia-3.jpg',
    photoFocus: '50% 86%',
    photos: [
      { src: '/images/products/lamperia/lamperia-3.jpg', focus: '50% 86%' },
      { src: '/images/products/lamperia/lamperia.jpg', focus: '50% 55%' },
      { src: '/images/products/lamperia/lamperia-2.jpg', focus: '50% 60%' },
      { src: '/images/products/lamperia/lamperia-4.jpg', focus: '50% 55%' },
      { src: '/images/products/lamperia/lamperia-5.jpg', focus: '50% 65%' },
      { src: '/images/products/lamperia/lamperia-6.jpg', focus: '50% 60%' },
      { src: '/images/products/lamperia/lamperia-7.jpg' },
    ],
    note: 'Произведена от висококачествена иглолистна дървесина. Профилът се избира от клиента.',
    groups: [
      {
        specs: [
          { label: 'дебелина', values: ['1,5 – 2,5'], unit: 'см' },
          { label: 'ширина', values: ['8 – 23'], unit: 'см' },
        ],
      },
    ],
  },
  {
    id: 'slepeni-gredi',
    name: 'Слепени греди',
    short: 'Слепени греди',
    summary: 'Изработка по поръчка · дължини до 9,5 м',
    Icon: GlulamIcon,
    drawing: '/images/drawing-5.png',
    photo: '/images/products/slepeni-gredi/slepeni-gredi.jpg',
    photos: [
      { src: '/images/products/slepeni-gredi/slepeni-gredi.jpg' },
      { src: '/images/products/slepeni-gredi/slepeni.jpg', focus: '50% 55%' },
    ],
    note: 'Изработват се по поръчка. Разполагаме с камера за сушене на дървен материал с обем до 50 м³.',
    groups: [{ specs: [{ label: 'дължина', values: ['до 9,5'], unit: 'м' }] }],
  },
  {
    id: 'gredi-talpi',
    name: 'Греди и талпи',
    short: 'Греди и талпи',
    summary: 'Сухи греди във всякакъв размер · дължини 4 – 6 м',
    Icon: BeamIcon,
    photo: '/images/products/gredi-talpi/gredi-1.jpg',
    photoFocus: '50% 60%',
    photos: [
      { src: '/images/products/gredi-talpi/gredi-1.jpg', focus: '50% 60%' },
      { src: '/images/products/gredi-talpi/gredi-2.jpg', focus: '50% 55%' },
      { src: '/images/products/gredi-talpi/gredi-3.jpg', focus: '50% 60%' },
      { src: '/images/products/gredi-talpi/gredi-4.jpg', focus: '50% 65%' },
      { src: '/images/products/gredi-talpi/gredi-5.jpg', focus: '50% 65%' },
      { src: '/images/products/gredi-talpi/gredi-6.jpg', focus: '50% 55%' },
      { src: '/images/products/gredi-talpi/gredi-7.jpg', focus: '50% 60%' },
      { src: '/images/products/gredi-talpi/gredi-8.jpg' },
    ],
    note: 'Строителна дървесина за покриви и конструкции. Сеченията се режат по ваша спецификация.',
    groups: [
      {
        specs: [
          { label: 'сечение', values: ['всякакъв размер'], unit: '' },
          { label: 'дължина', values: ['4 – 6'], unit: 'м' },
        ],
      },
    ],
  },
  {
    id: 'chelni-daski',
    name: 'Челни дъски',
    short: 'Челни дъски',
    summary: 'Ширина 15 – 23 см',
    Icon: PlanksIcon,
    photo: '/images/products/chelni-daski/chelni-daski.jpg',
    note: 'Челни дъски за стрехи и покривни детайли.',
    groups: [{ specs: [{ label: 'ширина', values: ['15 – 23'], unit: 'см' }] }],
  },
  {
    id: 'letvi-daski',
    name: 'Летви и дъски',
    short: 'Летви и дъски',
    summary: 'Дървена обшивка — тясна и широка · летви по размер',
    Icon: LathsIcon,
    photo: '/images/products/letvi-daski/letvi-daski.jpg',
    note: 'Дървена обшивка — тясна и широка. Наличните размери се уточняват при запитване.',
    groups: [],
  },
]

export const inquiryHref = (productId?: string) =>
  productId ? `/contacts?material=${productId}#inquiry` : '/contacts#inquiry'

const SIZE_FIELDS: Record<string, { field: Field; unit: string }> = {
  дебелина: { field: 'thickness', unit: 'см' },
  ширина: { field: 'width', unit: 'см' },
  дължина: { field: 'length', unit: 'м' },
}

/**
 * Which calculator box a size chip fills — or null when it is not a single
 * number ("8 – 23", "от 4", "свободна" are ranges and wishes, not sizes).
 */
export function sizeField(spec: Spec, value: string): Field | null {
  const meta = SIZE_FIELDS[spec.label]
  if (!meta || spec.unit !== meta.unit || !/^\d+(?:,\d+)?$/.test(value)) return null
  return meta.field
}

/** "Иглолистна дървесина — бор и смърч" → "бор и смърч". */
export const variantOf = (group: Group): string | undefined => group.title?.split(' — ').pop()

/** What the dialog shows: the extra photographs if there are any, else the one. */
export const photosOf = (p: Product): Photo[] =>
  p.photos ?? (p.photo ? [{ src: p.photo, focus: p.photoFocus }] : [])
