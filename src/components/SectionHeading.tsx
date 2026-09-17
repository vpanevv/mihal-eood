import type { ReactNode } from 'react'

type Props = {
  eyebrow: string
  title: string
  /** Second line of the headline, in the deepened gold. */
  accent?: string
  /** Supporting paragraph, set beside the headline on wide screens. */
  aside?: ReactNode
  className?: string
}

export default function SectionHeading({ eyebrow, title, accent, aside, className = '' }: Props) {
  return (
    <div className={`fade-up gap-8 md:flex md:items-end md:justify-between ${className}`}>
      <div className="max-w-[34ch]">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 font-display text-[clamp(1.75rem,6vw,3rem)] font-bold uppercase leading-[0.98] tracking-[0.005em] text-timber-bark">
          {title}
          {accent && (
            <>
              <br />
              <span className="text-timber-ember">{accent}</span>
            </>
          )}
        </h2>
      </div>

      {aside && (
        <p className="mt-5 max-w-[42ch] font-sans text-[0.95rem] font-light leading-[1.75] text-timber-bark/75 md:mt-0">
          {aside}
        </p>
      )}
    </div>
  )
}
