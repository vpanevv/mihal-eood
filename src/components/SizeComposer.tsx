import { useState, type Dispatch, type SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, PlusIcon } from './Icons'
import { evaluate, FIELD_META, formatM3, MAX_ROWS, newRow, type Field } from '../utils/cubic'
import { useInquiryList } from '../utils/inquiryList'
import type { Product } from '../data/products'

export type Draft = Record<Field, string>
export const EMPTY_DRAFT: Draft = { thickness: '', width: '', length: '', count: '' }

type Props = {
  product: Product
  draft: Draft
  onDraft: Dispatch<SetStateAction<Draft>>
  /** Which wood the tapped sizes belong to, when the product mixes several. */
  variant?: string
  /** True when at least one size above can be tapped. */
  tappable: boolean
  /** Called after a line is added, so the dialog can forget the wood it was remembering. */
  onAdded: () => void
  onClose: () => void
}

/**
 * Turns the sizes above into a line of the inquiry. Tapping a size chip fills
 * its box here; the rest is typed. The line goes into the same list the
 * calculator on the contact page edits.
 */
export default function SizeComposer({ product, draft, onDraft, variant, tappable, onAdded, onClose }: Props) {
  const { add, summary } = useInquiryList()
  const [message, setMessage] = useState<{ kind: 'error' | 'ok'; text: string } | null>(null)
  const result = evaluate({ ...newRow(), ...draft })

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const now = evaluate({ ...newRow(), ...draft })
    if (now.status === 'empty' || now.status === 'incomplete') {
      setMessage({ kind: 'error', text: 'Попълнете дебелина, ширина, дължина и брой.' })
      return
    }
    if (now.status === 'invalid') {
      setMessage({ kind: 'error', text: 'Проверете отбелязаните полета — трябва да са числа.' })
      return
    }
    const label = variant ? `${product.name} (${variant})` : product.name
    if (!add({ ...draft, productId: product.id, label })) {
      setMessage({ kind: 'error', text: `Заявката има най-много ${MAX_ROWS} реда. Изпратете я и започнете нова.` })
      return
    }
    onDraft(EMPTY_DRAFT)
    onAdded()
    setMessage({ kind: 'ok', text: `Добавено: ${label}, ${formatM3(now.volume)}.` })
  }

  const set = (field: Field, value: string) => {
    setMessage(null)
    onDraft((d) => ({ ...d, [field]: value }))
  }

  return (
    <form onSubmit={submit} noValidate className="mt-8 rounded-2xl border border-timber-bark/10 bg-timber-paper/60 p-4 md:p-5">
      <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-timber-ember">
        Добави към заявката
      </h3>
      <p className="mt-1.5 font-sans text-[0.82rem] font-light leading-[1.6] text-timber-bark/75">
        {tappable
          ? 'Докоснете размер по-горе или го въведете, после добавете брой.'
          : 'Въведете размера и броя, които ви трябват.'}
        {variant && (
          <>
            {' '}
            Дървесина: <span className="font-medium text-timber-bark">{variant}</span>.
          </>
        )}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {FIELD_META.map(({ field, label, unit, placeholder, numeric }) => (
          <div key={field}>
            <label htmlFor={`draft-${field}`} className="field-label">
              {label}
              <span className="sr-only">, {unit}</span>
            </label>
            <div className="relative">
              <input
                id={`draft-${field}`}
                type="text"
                inputMode={numeric ? 'numeric' : 'decimal'}
                autoComplete="off"
                value={draft[field]}
                onChange={(e) => set(field, e.target.value)}
                aria-invalid={!!result.bad[field]}
                placeholder={placeholder}
                className={`field !py-2.5 !pr-11 ${
                  result.bad[field] ? 'border-red-600/70' : 'border-timber-bark/15 focus:border-timber-gold'
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

      <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
        <button type="submit" className="btn btn-outline !min-h-[48px] !px-5 !text-[0.72rem]">
          <PlusIcon className="h-4 w-4" />
          Добави към заявката
        </button>
        {result.status === 'ok' && (
          <span className="font-display text-lg font-bold tabular-nums text-timber-brown">
            {formatM3(result.volume)}
          </span>
        )}
      </div>

      {/* One live region, so an added line and an error are both announced. */}
      <p
        role={message?.kind === 'error' ? 'alert' : 'status'}
        aria-live="polite"
        className={`font-sans text-[0.82rem] ${message ? 'mt-3' : ''} ${
          message?.kind === 'error' ? 'text-red-700' : 'text-timber-bark'
        }`}
      >
        {message?.text}
      </p>

      {summary.used > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-timber-bark/10 pt-4">
          <span className="font-sans text-[0.82rem] text-timber-bark/80">
            В заявката: <strong className="font-medium text-timber-bark">{summary.used} {summary.used === 1 ? 'ред' : 'реда'}</strong>{' '}
            · {formatM3(summary.total)}
          </span>
          <Link
            to="/contacts#inquiry"
            onClick={onClose}
            className="inline-flex min-h-[44px] items-center gap-2 font-sans text-[0.74rem] font-medium uppercase tracking-[0.16em] text-timber-brown hover:text-timber-bark"
          >
            Към заявката
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      )}
    </form>
  )
}
