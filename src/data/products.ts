import type { ComponentType } from 'react'
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

export type Filter = 'dry' | 'floor' | 'panel' | 'beams' | 'boards' | 'custom'

export type Product = {
  id: string
  name: string
  /** One line under the name on cards. */
  summary: string
  Icon: ComponentType<{ className?: string }>
  filters: Filter[]
  /** Milled profile cross-section, shown in the detail dialog. */
  drawing?: string
  /** Photograph of the real product; leads both the card and its dialog. */
  photo?: string
  note?: string
  groups: Group[]
}

/** Sizes as given by the company (September 2026), in centimetres and metres. */
export const PRODUCTS: Product[] = [
  {
    id: 'suh-material',
    name: 'Сух дървен материал',
    summary: 'Бор, смърч, дъб, бук и липа · дебелини 1,8 – 12 см · ширини 8 – 23 см',
    Icon: PlanksIcon,
    filters: ['dry'],
    drawing: '/images/drawing-2.png',
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
    summary: 'Дебелина 2,5 – 4 см · ширина 8 – 22 см',
    Icon: FloorIcon,
    filters: ['floor'],
    drawing: '/images/drawing-3.png',
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
    summary: 'Дебелина 1,5 – 2,5 см · ширина 8 – 23 см · модел по избор',
    Icon: PanelIcon,
    filters: ['panel'],
    drawing: '/images/drawing-1.png',
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
    summary: 'Изработка по поръчка · дължини до 9,5 м',
    Icon: GlulamIcon,
    filters: ['beams', 'custom'],
    drawing: '/images/drawing-5.png',
    note: 'Изработват се по поръчка. Разполагаме с камера за сушене на дървен материал с обем до 50 м³.',
    groups: [{ specs: [{ label: 'дължина', values: ['до 9,5'], unit: 'м' }] }],
  },
  {
    id: 'gredi-talpi',
    name: 'Греди и талпи',
    summary: 'Сухи греди във всякакъв размер · дължини 4 – 6 м',
    Icon: BeamIcon,
    filters: ['beams', 'custom'],
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
    id: 'letvi-daski',
    name: 'Летви и дъски',
    summary: 'Челни дъски 15 – 23 см · обшивка тясна и широка',
    Icon: LathsIcon,
    filters: ['boards'],
    photo: '/images/products/letvi-daski.jpg',
    note: 'Челни дъски и дървена обшивка — тясна и широка.',
    groups: [{ specs: [{ label: 'челни дъски, ширина', values: ['15 – 23'], unit: 'см' }] }],
  },
]

export const PRODUCT_FILTERS: { id: Filter | 'all'; label: string }[] = [
  { id: 'all', label: 'Всички' },
  { id: 'dry', label: 'Сух материал' },
  { id: 'floor', label: 'Дюшеме' },
  { id: 'panel', label: 'Ламперия' },
  { id: 'beams', label: 'Греди' },
  { id: 'boards', label: 'Летви и дъски' },
  { id: 'custom', label: 'По поръчка' },
]

/** Comparison table under the product grid. */
export const SPEC_ROWS: { name: string; thickness: string; width: string; length: string }[] = [
  { name: 'Дъски — бор и смърч', thickness: '1,8 – 12 см', width: '8 – 23 см', length: 'от 4 м' },
  { name: 'Дъб, бук и липа', thickness: '3 – 7 см', width: 'свободна', length: '3 м' },
  { name: 'Дюшеме и декинг', thickness: '2,5 – 4 см', width: '8 – 22 см', length: 'по заявка' },
  { name: 'Ламперия /сачак/', thickness: '1,5 – 2,5 см', width: '8 – 23 см', length: 'по заявка' },
  { name: 'Челни дъски', thickness: 'по заявка', width: '15 – 23 см', length: 'по заявка' },
  { name: 'Греди', thickness: 'всякакъв размер', width: 'всякакъв размер', length: '4 – 6 м' },
  { name: 'Слепени греди', thickness: 'по поръчка', width: 'по поръчка', length: 'до 9,5 м' },
]

export const inquiryHref = (productId?: string) =>
  productId ? `/contacts?material=${productId}#inquiry` : '/contacts#inquiry'
