import { Link, useLocation } from 'react-router-dom'
import { ArrowIcon, CalculatorIcon } from './Icons'
import { formatM3 } from '../utils/cubic'
import { useInquiryList } from '../utils/inquiryList'

/**
 * Follows the visitor once they have put a size on their list: how much is on
 * it, and one tap to the form. Gone on the contact page, where the list is
 * already on screen.
 */
export default function InquiryPill() {
  const { summary } = useInquiryList()
  const { pathname } = useLocation()
  if (summary.used === 0 || pathname === '/contacts') return null

  const lines = `${summary.used} ${summary.used === 1 ? 'ред' : 'реда'}`

  return (
    // On a phone it floats above the fixed action bar (about 76px plus the safe area).
    <div
      className="pointer-events-none fixed inset-x-0 z-30 flex justify-end px-3 md:px-6"
      style={{ bottom: 'calc(env(safe-area-inset-bottom) + 5.75rem)' }}
    >
      <Link
        to="/contacts#inquiry"
        aria-label={`Към заявката: ${lines}, ${formatM3(summary.total)}`}
        className="pop-in pointer-events-auto inline-flex min-h-[52px] items-center gap-3 rounded-full bg-timber-brown px-5 font-sans text-[0.78rem] font-medium uppercase tracking-[0.12em] text-white shadow-[0_18px_40px_-14px_rgba(42,32,17,0.7)] ring-1 ring-white/15 transition-colors hover:bg-timber-bark focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold focus-visible:ring-offset-2 focus-visible:ring-offset-timber-paper"
      >
        <CalculatorIcon className="h-5 w-5 shrink-0 text-timber-sap" />
        <span aria-hidden="true" className="flex items-baseline gap-2">
          <span>{lines}</span>
          <span className="font-display text-base font-bold tracking-normal tabular-nums">{formatM3(summary.total)}</span>
        </span>
        <ArrowIcon className="h-4 w-4 shrink-0" />
      </Link>
    </div>
  )
}
