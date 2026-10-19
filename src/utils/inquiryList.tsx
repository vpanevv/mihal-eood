import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { evaluate, FIELDS, MAX_ROWS, newRow, reserveIds, summarize, type CubicRow, type CubicSummary } from './cubic'

/**
 * The visitor's running list of sizes. It lives above the router so a size
 * added from a product dialog on one page is still there on the contact page,
 * and is kept for the tab's lifetime in case they reload.
 */
const STORAGE_KEY = 'mihal.inquiry.v1'

type Context = {
  rows: CubicRow[]
  setRows: (rows: CubicRow[]) => void
  /** false when the list is already full. */
  add: (item: Pick<CubicRow, 'productId' | 'label' | 'thickness' | 'width' | 'length' | 'count'>) => boolean
  clear: () => void
  summary: CubicSummary
}

const InquiryListContext = createContext<Context | null>(null)

function load(): CubicRow[] {
  try {
    const parsed: unknown = JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? 'null')
    if (!Array.isArray(parsed)) return [newRow()]
    const rows = parsed
      .filter(
        (r): r is CubicRow =>
          !!r && typeof r.id === 'number' && FIELDS.every((f) => typeof (r as Record<string, unknown>)[f] === 'string'),
      )
      .slice(0, MAX_ROWS)
    if (rows.length === 0) return [newRow()]
    reserveIds(rows)
    return rows
  } catch {
    return [newRow()]
  }
}

export function InquiryListProvider({ children }: { children: ReactNode }) {
  const [rows, setRows] = useState<CubicRow[]>(load)

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
    } catch {
      /* private mode or blocked storage: the list just lasts until the page is closed */
    }
  }, [rows])

  const add = useCallback<Context['add']>(
    (item) => {
      // Untouched blank rows make way for the new line rather than piling up.
      const kept = rows.filter((r) => evaluate(r).status !== 'empty')
      if (kept.length >= MAX_ROWS) return false
      setRows([...kept, { ...newRow(), ...item }])
      return true
    },
    [rows],
  )

  const clear = useCallback(() => setRows([newRow()]), [])
  const summary = useMemo(() => summarize(rows), [rows])
  const value = useMemo(() => ({ rows, setRows, add, clear, summary }), [rows, add, clear, summary])

  return <InquiryListContext.Provider value={value}>{children}</InquiryListContext.Provider>
}

export function useInquiryList(): Context {
  const ctx = useContext(InquiryListContext)
  if (!ctx) throw new Error('useInquiryList must be used inside <InquiryListProvider>')
  return ctx
}
