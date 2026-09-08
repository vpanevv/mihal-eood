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

export type Product = {
  id: string
  name: string
  /** Card background, under /public. */
  image: string
  /**
   * Milled profile cross-section shown in the card's lower band.
   *
   * PROVISIONAL — awaiting the correct pairing from the client. These are
   * dimensioned specs customers order against, so a wrong drawing here is a
   * factual error, not a cosmetic one. Confirmed so far: дюшеме is drawing-3
   * (tongue-and-groove floorboard, 96x15). drawing-1 is currently unused.
   */
  drawing: string
  note?: string
  groups: Group[]
}

export const PRODUCTS: Product[] = [
  {
    id: 'suh-darven-material',
    name: 'Сух дървен материал',
    drawing: '/images/drawing-2.png',
    image: '/images/suho-durvo.jpg',
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
    drawing: '/images/drawing-3.png',
    image: '/images/dusheme.jpg',
    note: 'Вид подова настилка, изработена от дълги прави дъски.',
    groups: [{ specs: [{ label: 'дължина', values: ['4'], unit: 'м' }] }],
  },
  {
    id: 'lamperia',
    name: 'Ламперия /сачак/',
    drawing: '/images/drawing-4.png',
    image: '/images/lamperia.jpg',
    note: 'Произведена от висококачествена иглолистна дървесина.',
    groups: [
      {
        specs: [
          { label: 'ширина', values: ['10 – 22'], unit: 'см' },
          { label: 'дебелина', values: ['1.9'], unit: 'см' },
          { label: 'дължина', values: ['4'], unit: 'м' },
        ],
      },
    ],
  },
  {
    id: 'slepeni-gredi',
    name: 'Слепени греди',
    drawing: '/images/drawing-5.png',
    image: '/images/slepeni-gredi.jpg',
    note: 'Разполагаме с камера за сушене на дървен материал с обем до 50 m³.',
    groups: [],
  },
]
