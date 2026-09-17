import { PlusIcon } from './Icons'
import { FAQ } from '../data/services'

/** Native <details>, so it opens without JavaScript and reads correctly to screen readers. */
export default function Faq() {
  return (
    <div className="divide-y divide-timber-bark/10 border-y border-timber-bark/10">
      {FAQ.map(({ q, a }) => (
        <details key={q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-base font-bold uppercase tracking-[0.02em] text-timber-bark transition-colors hover:text-timber-ember md:text-lg [&::-webkit-details-marker]:hidden">
            {q}
            <PlusIcon className="h-5 w-5 shrink-0 text-timber-gold transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <p className="pb-6 pr-8 font-sans text-[0.92rem] font-light leading-[1.8] text-timber-bark/75">
            {a}
          </p>
        </details>
      ))}
    </div>
  )
}
