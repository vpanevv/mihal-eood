import SectionHeading from './SectionHeading'
import { PROCESS, SERVICES } from '../data/services'

type Props = {
  /** The home page links on to the full services page; that page does not. */
  withLink?: boolean
}

export default function ServicesSection({ withLink = false }: Props) {
  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <SectionHeading
        eyebrow="Какво правим"
        title="Не само продаваме"
        accent="материал"
        aside={
          withLink
            ? 'Режем по зададен размер, сушим в собствена камера, товарим с подемна техника и доставяме до обекта.'
            : undefined
        }
      />

      <div className="mt-10 grid grid-cols-2 gap-3 md:mt-14 md:grid-cols-4 md:gap-5">
        {SERVICES.map(({ title, text, Icon }, i) => (
          <article
            key={title}
            className="card fade-up rounded-2xl p-5 md:p-7"
            style={{ animationDelay: `${0.05 + i * 0.06}s` }}
          >
            <Icon className="h-8 w-8 text-timber-gold md:h-9 md:w-9" />
            <h3 className="mt-5 font-display text-base font-bold uppercase leading-tight tracking-[0.04em] text-timber-bark md:text-lg">
              {title}
            </h3>
            <p className="mt-2.5 font-sans text-[0.83rem] font-light leading-[1.65] text-timber-bark/70 md:text-[0.9rem]">
              {text}
            </p>
          </article>
        ))}
      </div>

      {/* Процесът 01–04 */}
      <div className="mt-14 md:mt-20">
        <p className="eyebrow fade-up">Процесът</p>
        <h3 className="fade-up mt-3 font-display text-[clamp(1.5rem,5vw,2.5rem)] font-bold uppercase leading-[1] text-timber-bark">
          От запитване до обекта
        </h3>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-10 md:grid-cols-4 md:gap-6">
          {PROCESS.map(({ title, text }, i) => (
            <li
              key={title}
              className="fade-up relative rounded-2xl border border-timber-bark/10 bg-white/60 p-5 md:border-0 md:bg-transparent md:p-0"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              <span className="font-display text-3xl font-bold leading-none text-timber-gold md:text-5xl">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h4 className="mt-3 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-timber-bark md:mt-4">
                {title}
              </h4>
              <p className="mt-1.5 font-sans text-[0.85rem] font-light text-timber-bark/70">{text}</p>
              {/* Hairline that carries the eye to the next step on wide screens. */}
              {i < PROCESS.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute -right-3 top-4 hidden h-px w-6 bg-timber-bark/15 md:block"
                />
              )}
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
