/**
 * Cubic-metre arithmetic for the inquiry form. A builder thinks in "40 pieces of
 * 10×10×400", not in m³, so the form lets them list sizes and does the sum.
 * Thickness and width are in centimetres, length in metres, as the yard quotes them.
 */

export type Field = 'thickness' | 'width' | 'length' | 'count'

export type CubicRow = { id: number } & Record<Field, string>

export const FIELDS: Field[] = ['thickness', 'width', 'length', 'count']
export const MAX_ROWS = 12

/** Anything beyond these is a slipped decimal point, not a real order. */
const LIMITS: Record<Field, number> = { thickness: 50, width: 100, length: 15, count: 99999 }

let counter = 0
export const newRow = (): CubicRow => ({ id: ++counter, thickness: '', width: '', length: '', count: '' })

/** null when blank, NaN when there is something in the box that is not a usable number. */
function parse(raw: string): number | null {
  const s = raw.trim()
  if (s === '') return null
  // A comma is how people type decimals here; allow at most two places.
  if (!/^\d+(?:[.,]\d{1,2})?$/.test(s)) return NaN
  return Number(s.replace(',', '.'))
}

export type RowResult = {
  /** empty: untouched · incomplete: some boxes blank · invalid: a box is unusable · ok: counts */
  status: 'empty' | 'incomplete' | 'invalid' | 'ok'
  bad: Partial<Record<Field, true>>
  volume: number
  pieces: number
  values: Record<Field, number> | null
}

export function evaluate(row: CubicRow): RowResult {
  const parsed = FIELDS.map((f) => [f, parse(row[f])] as const)
  const blank = parsed.filter(([, v]) => v === null).length
  const bad: Partial<Record<Field, true>> = {}

  for (const [f, v] of parsed) {
    if (v === null) continue
    if (Number.isNaN(v) || v <= 0 || v > LIMITS[f] || (f === 'count' && !Number.isInteger(v))) bad[f] = true
  }

  const none = { bad, volume: 0, pieces: 0, values: null }
  if (blank === FIELDS.length) return { status: 'empty', ...none }
  if (Object.keys(bad).length > 0) return { status: 'invalid', ...none }
  if (blank > 0) return { status: 'incomplete', ...none }

  const values = Object.fromEntries(parsed) as Record<Field, number>
  // cm × cm × m → m³ needs the two centimetres brought down to metres.
  const volume = (values.thickness * values.width * values.length * values.count) / 10000
  return { status: 'ok', bad, volume, pieces: values.count, values }
}

export type CubicSummary = {
  total: number
  pieces: number
  /** Rows that count towards the total. */
  used: number
  /** Rows that were started but cannot be counted — they would be silently dropped. */
  unfinished: number
}

export function summarize(rows: CubicRow[]): CubicSummary {
  const out: CubicSummary = { total: 0, pieces: 0, used: 0, unfinished: 0 }
  for (const row of rows) {
    const r = evaluate(row)
    if (r.status === 'ok') {
      out.total += r.volume
      out.pieces += r.pieces
      out.used += 1
    } else if (r.status !== 'empty') out.unfinished += 1
  }
  return out
}

export const formatM3 = (v: number) => `${v.toFixed(3).replace('.', ',')} м³`
const num = (n: number) => String(n).replace('.', ',')

/** The text the yard receives: one line per size, then the total. Empty when nothing was entered. */
export function formatCalculation(rows: CubicRow[]): string {
  const lines: string[] = []
  for (const row of rows) {
    const r = evaluate(row)
    if (r.status !== 'ok' || !r.values) continue
    const { thickness, width, length, count } = r.values
    lines.push(
      `${lines.length + 1}) ${num(thickness)} × ${num(width)} см × ${num(length)} м × ${count} бр. = ${formatM3(r.volume)}`,
    )
  }
  if (lines.length === 0) return ''
  const { total, pieces } = summarize(rows)
  return [...lines, `Общо: ${formatM3(total)} (${pieces} бр.)`].join('\n')
}
