import { useState } from 'react'
import { CalculatorIcon, ChevronDownIcon, PlusIcon, TrashIcon } from './Icons'
import {
  evaluate,
  formatM3,
  MAX_ROWS,
  newRow,
  summarize,
  type CubicRow,
  type Field,
} from '../utils/cubic'

type Props = {
  rows: CubicRow[]
  onChange: (rows: CubicRow[]) => void
  open: boolean
  onOpenChange: (open: boolean) => void
  /** Set when the form was submitted with a half-filled row. */
  error?: string
}

const COLUMNS: { field: Field; label: string; unit: string; placeholder: string; numeric?: boolean }[] = [
  { field: 'thickness', label: 'Дебелина', unit: 'см', placeholder: '5' },
  { field: 'width', label: 'Ширина', unit: 'см', placeholder: '15' },
  { field: 'length', label: 'Дължина', unit: 'м', placeholder: '4' },
  { field: 'count', label: 'Брой', unit: 'бр.', placeholder: '20', numeric: true },
]

export default function CubicCalculator({ rows, onChange, open, onOpenChange, error }: Props) {
  const [addedId, setAddedId] = useState<number | null>(null)
  const summary = summarize(rows)

  const update = (id: number, field: Field, value: string) =>
    onChange(rows.map((r) => (r.id === id ? { ...r, [field]: value } : r)))

  const add = () => {
    if (rows.length >= MAX_ROWS) return
    const row = newRow()
    setAddedId(row.id)
    onChange([...rows, row])
  }

  // The last row is cleared rather than removed, so the panel never goes empty.
  const remove = (id: number) => {
    const next = rows.filter((r) => r.id !== id)
    onChange(next.length > 0 ? next : [newRow()])
  }

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => onOpenChange(!open)}
        aria-expanded={open}
        aria-controls="cubic-panel"
        data-error={!!error}
        className="flex w-full items-center gap-3 rounded-xl border border-dashed border-timber-bark/25 bg-timber-ground/50 px-4 py-4 text-left transition-colors hover:border-timber-gold hover:bg-timber-ground focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold"
      >
        <CalculatorIcon className="h-5 w-5 shrink-0 text-timber-ember" />
        <span className="min-w-0 grow">
          <span className="block font-sans text-[0.85rem] font-medium text-timber-bark">
            Изчисли кубатура
          </span>
          <span className="block font-sans text-[0.78rem] font-light text-timber-bark/70">
            Въведете размери и брой — сметваме м³ вместо вас
          </span>
        </span>
        {summary.used > 0 && (
          <span className="shrink-0 rounded-full bg-timber-brown px-3 py-1 font-sans text-[0.72rem] font-medium text-white">
            {formatM3(summary.total)}
          </span>
        )}
        <ChevronDownIcon
          className={`h-4 w-4 shrink-0 text-timber-bark/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {error && (
        <p id="calculation-error" role="alert" className="mt-2 font-sans text-[0.8rem] text-red-700">
          {error}
        </p>
      )}

      <div id="cubic-panel" hidden={!open}>
        {open && (
          <div className="pop-in mt-3 rounded-2xl border border-timber-bark/10 bg-timber-paper/60 p-4 md:p-5">
            <ul className="space-y-4">
              {rows.map((row, i) => {
                const result = evaluate(row)
                return (
                  <li
                    key={row.id}
                    className="border-b border-timber-bark/10 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                      {COLUMNS.map(({ field, label, unit, placeholder, numeric }) => (
                        <div key={field}>
                          <label htmlFor={`cubic-${row.id}-${field}`} className="field-label">
                            {label}
                            {/* The unit is shown inside the box; this keeps it in the name. */}
                            <span className="sr-only">, {unit}</span>
                          </label>
                          <div className="relative">
                            <input
                              id={`cubic-${row.id}-${field}`}
                              type="text"
                              inputMode={numeric ? 'numeric' : 'decimal'}
                              autoComplete="off"
                              autoFocus={row.id === addedId && field === 'thickness'}
                              value={row[field]}
                              onChange={(e) => update(row.id, field, e.target.value)}
                              aria-invalid={!!result.bad[field]}
                              placeholder={placeholder}
                              className={`field !py-2.5 !pr-11 ${
                                result.bad[field]
                                  ? 'border-red-600/70'
                                  : 'border-timber-bark/15 focus:border-timber-gold'
                              }`}
                            />
                            <span
                              aria-hidden="true"
                              className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 font-sans text-[0.78rem] text-timber-bark/60"
                            >
                              {unit}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-3">
                      <span
                        className={`font-display text-lg font-bold tabular-nums ${
                          result.status === 'ok' ? 'text-timber-brown' : 'text-timber-bark/35'
                        }`}
                      >
                        {result.status === 'ok' ? formatM3(result.volume) : '— м³'}
                      </span>
                      <button
                        type="button"
                        onClick={() => remove(row.id)}
                        aria-label={`Премахни ред ${i + 1}`}
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-timber-bark/15 bg-white text-timber-bark/70 transition-colors hover:border-red-600/60 hover:text-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-timber-bark/10 pt-5">
              <button
                type="button"
                onClick={add}
                disabled={rows.length >= MAX_ROWS}
                className="btn btn-outline !min-h-[44px] !px-5 !text-[0.7rem]"
              >
                <PlusIcon className="h-4 w-4" />
                Добави размер
              </button>

              {/* Announced as it changes, so a screen reader hears the sum. */}
              <p role="status" aria-live="polite" className="text-right">
                <span className="block font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-timber-bark/70">
                  Общо
                </span>
                <span className="block font-display text-[1.75rem] font-bold leading-none tabular-nums text-timber-brown md:text-3xl">
                  {formatM3(summary.total)}
                </span>
                {summary.pieces > 0 && (
                  <span className="mt-1 block font-sans text-[0.78rem] font-light text-timber-bark/70">
                    {summary.pieces} бр.
                  </span>
                )}
              </p>
            </div>

            <p className="mt-4 font-sans text-[0.78rem] font-light leading-[1.6] text-timber-bark/70">
              Изчислението се изпраща заедно със запитването. Броят се само изцяло попълнените редове.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
