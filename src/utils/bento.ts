/**
 * Bento packing for the gallery. Every photograph gets a footprint of one or
 * two cells each way, chosen to suit its shape, and the tiles are laid into a
 * fixed number of columns the way CSS `grid-auto-flow: dense` would — except
 * that the positions are worked out here, so the grid is guaranteed to end as
 * a clean rectangle rather than trailing a ragged last row.
 */

/** A tile's footprint in grid cells. */
export type Span = { c: 1 | 2; r: 1 | 2 }

/** Where a tile sits; columns and rows are 1-based, as CSS grid lines are. */
export type Placement = Span & { col: number; row: number }

export const S = {
  one: { c: 1, r: 1 },
  wide: { c: 2, r: 1 },
  tall: { c: 1, r: 2 },
  big: { c: 2, r: 2 },
} as const satisfies Record<string, Span>

/** First-fit, row by row: each tile takes the earliest gap it fits in. */
function place(spans: Span[], cols: number): { placed: Placement[]; holes: number } {
  const taken: boolean[][] = []
  const placed = spans.map(({ c, r }): Placement => {
    for (let row = 0; ; row++) {
      for (let col = 0; col + c <= cols; col++) {
        let free = true
        for (let y = row; y < row + r && free; y++)
          for (let x = col; x < col + c; x++) if (taken[y]?.[x]) free = false
        if (!free) continue
        for (let y = row; y < row + r; y++) {
          taken[y] ??= Array<boolean>(cols).fill(false)
          for (let x = col; x < col + c; x++) taken[y][x] = true
        }
        return { c, r, col: col + 1, row: row + 1 }
      }
    }
  })
  const area = spans.reduce((n, s) => n + s.c * s.r, 0)
  return { placed, holes: taken.length * cols - area }
}

/** Enough to square off any set here, and it keeps the search to a few thousand tries. */
const MAX_TAIL = 7

/**
 * `options[i]` lists the footprints tile i may take, best first. Every tile
 * starts on its favourite; if that leaves gaps, the last few tiles are stepped
 * through their alternatives — fewest and latest changes first — until the grid
 * closes. The top of each chapter, where the eye lands, is left as designed.
 */
export function pack(options: Span[][], cols: number): Placement[] {
  const choice = options.map((o) => o[0])
  const first = place(choice, cols)
  if (first.holes === 0) return first.placed

  const n = options.length
  for (let tail = 1; tail <= Math.min(MAX_TAIL, n); tail++) {
    const from = n - tail
    const attempt = choice.slice()
    const search = (i: number): Placement[] | null => {
      if (i === n) {
        const result = place(attempt, cols)
        return result.holes === 0 ? result.placed : null
      }
      for (const option of options[i]) {
        attempt[i] = option
        const found = search(i + 1)
        if (found) return found
      }
      return null
    }
    const found = search(from)
    if (found) return found
  }
  return first.placed
}
