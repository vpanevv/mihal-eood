type Stat = { value: string; label: string }

export const COMPANY_STATS: Stat[] = [
  { value: '2008', label: 'Година на основаване' },
  { value: '50 м³', label: 'Камера за сушене' },
  { value: '1 месец', label: 'Престой след сушене' },
  { value: '100%', label: 'Собствен транспорт' },
]

export default function Stats({ stats = COMPANY_STATS }: { stats?: Stat[] }) {
  return (
    <dl className="grid grid-cols-2 gap-y-8 sm:gap-x-6 md:grid-cols-4">
      {stats.map(({ value, label }, i) => (
        <div key={label} className="fade-up" style={{ animationDelay: `${0.04 + i * 0.06}s` }}>
          <dt className="sr-only">{label}</dt>
          <dd>
            <span className="block font-display text-[clamp(2rem,7vw,3.25rem)] font-bold leading-none text-timber-brown">
              {value}
            </span>
            <span className="mt-2.5 block font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-timber-bark/75">
              {label}
            </span>
          </dd>
        </div>
      ))}
    </dl>
  )
}
