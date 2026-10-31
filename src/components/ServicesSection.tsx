import { useState } from 'react'
import SectionHeading from './SectionHeading'
import ServiceDialog from './ServiceDialog'
import { ArrowIcon } from './Icons'
import { thumbFor } from '../data/gallery'
import { PROCESS, SERVICES, type Service } from '../data/services'

type Props = {
  /** The home page links on to the full services page; that page does not. */
  withLink?: boolean
}

export default function ServicesSection({ withLink = false }: Props) {
  const [open, setOpen] = useState<Service | null>(null)

  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <SectionHeading
        eyebrow="Какво правим"
        title="Не само продаваме"
        accent="материал"
        aside={
          withLink
            ? 'Сушим в собствена камера до 50 м³, рендосваме, шлайфаме, боядисваме, импрегнираме и клинозъбим — и доставяме готовия материал до обекта.'
            : undefined
        }
      />

      {/* Same shell as the product cards: a photograph leads where there is
          one, an icon where there is not yet. */}
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-5">
        {SERVICES.map((service, i) => {
          const { title, text, photo, photoFocus, Icon } = service
          return (
            <button
              key={title}
              type="button"
              onClick={() => setOpen(service)}
              className="group card reveal flex flex-col overflow-hidden rounded-2xl text-left transition-shadow duration-300 hover:shadow-[0_18px_40px_-26px_rgba(42,32,17,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold focus-visible:ring-offset-2 focus-visible:ring-offset-timber-ground"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              {photo ? (
                <span className="block aspect-[4/3] w-full overflow-hidden bg-timber-bark/5">
                  <img
                    src={thumbFor(photo)}
                    srcSet={`${thumbFor(photo)} 640w, ${photo} 1200w`}
                    sizes="(min-width: 768px) 33vw, 46vw"
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    // Lowercase so React 18 passes it through.
                    {...{ fetchpriority: 'low' }}
                    style={photoFocus ? { objectPosition: photoFocus } : undefined}
                    className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                  />
                </span>
              ) : null}

              <span className="flex grow flex-col p-5 md:p-7">
                {!photo && <Icon className="h-8 w-8 text-timber-gold md:h-9 md:w-9" />}
                <span
                  className={`block font-display text-base font-bold uppercase leading-tight tracking-[0.04em] text-timber-bark md:text-lg ${
                    photo ? '' : 'mt-5'
                  }`}
                >
                  {title}
                </span>

                {/* The description carries the serif of the site's accent voice,
                    opened by a short gold rule so it reads as its own block. */}
                <span aria-hidden="true" className="mt-3 block h-px w-10 bg-timber-gold/70" />
                <span className="mt-3 block grow font-serif text-[0.95rem] leading-[1.6] text-timber-bark/80 md:text-base md:leading-[1.65]">
                  {text}
                </span>

                <span className="mt-4 inline-flex min-h-[40px] items-center gap-2 border-t border-timber-bark/10 pt-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-timber-bark/70 transition-colors group-hover:text-timber-bark">
                  Виж повече
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Процесът 01–04 */}
      <div className="mt-14 md:mt-20">
        <p className="eyebrow reveal">Процесът</p>
        <h3 className="reveal mt-3 font-display text-[clamp(1.5rem,5vw,2.5rem)] font-bold uppercase leading-[1] text-timber-bark">
          От запитване до обекта
        </h3>

        <ol className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-10 md:grid-cols-4 md:gap-6">
          {PROCESS.map(({ title, text }, i) => (
            <li
              key={title}
              className="reveal relative rounded-2xl border border-timber-bark/10 bg-white/60 p-5 md:border-0 md:bg-transparent md:p-0"
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

      <ServiceDialog service={open} onClose={() => setOpen(null)} />
    </div>
  )
}
