/**
 * The sizes the yard holds, in one place: the table on the Продукти page and
 * the downloadable PDF are both built from these rows.
 *
 * No imports on purpose — scripts/build-spec-sheet.mjs reads this file in
 * plain Node, which cannot load the React icons that products.ts pulls in.
 *
 * Changed a size? Run `npm run spec-sheet` to rebuild the PDF; `npm run
 * spec-sheet:check` says whether the PDF still matches.
 */
export type SpecRow = { name: string; thickness: string; width: string; length: string }

export const SPEC_ROWS: SpecRow[] = [
  { name: 'Дъски — бор и смърч', thickness: '1,8 – 12 см', width: '8 – 23 см', length: 'от 4 м' },
  { name: 'Дъб, бук и липа', thickness: '3 – 7 см', width: 'свободна', length: '3 м' },
  { name: 'Дюшеме и декинг', thickness: '2,5 – 4 см', width: '8 – 22 см', length: 'по заявка' },
  { name: 'Ламперия /сачак/', thickness: '1,5 – 2,5 см', width: '8 – 23 см', length: 'по заявка' },
  { name: 'Челни дъски', thickness: 'по заявка', width: '15 – 23 см', length: 'по заявка' },
  { name: 'Греди', thickness: 'всякакъв размер', width: 'всякакъв размер', length: '4 – 6 м' },
  { name: 'Слепени греди', thickness: 'по поръчка', width: 'по поръчка', length: 'до 9,5 м' },
]

/** Where the generated PDF is served from, and the name it downloads as. */
export const SPEC_SHEET_PATH = '/mihal-eood-specifikatsiya.pdf'
export const SPEC_SHEET_FILENAME = 'МИХАЛ-ЕООД-спецификация.pdf'
