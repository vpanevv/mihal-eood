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
  note?: string
  groups: Group[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'suh-material',
    name: 'Сух дървен материал',
    summary: 'Бук и бор · дебелини 2–10 см · дължини 2,5 и 4 м',
    Icon: PlanksIcon,
    filters: ['dry'],
    drawing: '/images/drawing-2.png',
    note: 'От собствена сушилня. Материалът отлежава един месец след сушенето, преди да влезе в продажба.',
    groups: [
      {
        title: 'Бук',
        specs: [
          { label: 'дебелина', values: ['4', '5', '6'], unit: 'см' },
          { label: 'дължина', values: ['2,5', '4'], unit: 'м' },
        ],
      },
      {
        title: 'Бор',
        specs: [
          { label: 'дебелина', values: ['2', '3', '4', '5', '6', '8', '10'], unit: 'см' },
          { label: 'дължина', values: ['4'], unit: 'м' },
        ],
      },
    ],
  },
  {
    id: 'dyusheme',
    name: 'Дюшеме',
    summary: 'Подова настилка от дълги прави дъски · дължина 4 м',
    Icon: FloorIcon,
    filters: ['floor'],
    drawing: '/images/drawing-3.png',
    note: 'Вид подова настилка, изработена от дълги прави дъски.',
    groups: [{ specs: [{ label: 'дължина', values: ['4'], unit: 'м' }] }],
  },
  {
    id: 'lamperia',
    name: 'Ламперия /сачак/',
    summary: 'Иглолистна · ширина 10–22 см · дебелина 1,9 см',
    Icon: PanelIcon,
    filters: ['panel'],
    drawing: '/images/drawing-1.png',
    note: 'Произведена от висококачествена иглолистна дървесина. Сачак за обшивка — тесен и широк.',
    groups: [
      {
        specs: [
          { label: 'ширина', values: ['10 – 22'], unit: 'см' },
          { label: 'дебелина', values: ['1,9'], unit: 'см' },
          { label: 'дължина', values: ['4'], unit: 'м' },
        ],
      },
    ],
  },
  {
    id: 'slepeni-gredi',
    name: 'Слепени греди',
    summary: 'Изработка по поръчка · размери по запитване',
    Icon: GlulamIcon,
    filters: ['beams', 'custom'],
    drawing: '/images/drawing-5.png',
    note: 'Изработват се по поръчка. Разполагаме с камера за сушене на дървен материал с обем до 50 м³.',
    groups: [],
  },
  {
    id: 'gredi-talpi',
    name: 'Греди и талпи',
    summary: 'Строителна дървесина · рязане по размер',
    Icon: BeamIcon,
    filters: ['beams', 'custom'],
    note: 'Строителна дървесина за покриви и конструкции. Сеченията и дължините се уточняват при запитване.',
    groups: [],
  },
  {
    id: 'letvi-daski',
    name: 'Летви и дъски',
    summary: 'Челни дъски и дървена обшивка · тясна и широка',
    Icon: LathsIcon,
    filters: ['boards'],
    note: 'Челни дъски и дървена обшивка — тясна и широка. Наличните размери се уточняват при запитване.',
    groups: [],
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

/** Comparison table under the product grid. Only sizes the company has given. */
export const SPEC_ROWS: { name: string; thickness: string; width: string; length: string }[] = [
  { name: 'Бук', thickness: '4, 5, 6 см', width: '—', length: '2,5 и 4 м' },
  { name: 'Бор', thickness: '2 – 10 см', width: '—', length: '4 м' },
  { name: 'Дюшеме', thickness: 'по запитване', width: 'по запитване', length: '4 м' },
  { name: 'Ламперия', thickness: '1,9 см', width: '10 – 22 см', length: '4 м' },
  { name: 'Греди и талпи', thickness: 'по размер', width: 'по размер', length: 'по размер' },
  { name: 'Слепени греди', thickness: 'по поръчка', width: 'по поръчка', length: 'по поръчка' },
]

export const inquiryHref = (productId?: string) =>
  productId ? `/contacts?material=${productId}#inquiry` : '/contacts#inquiry'
