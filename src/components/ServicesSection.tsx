import SectionHeading from './SectionHeading'
import { thumbFor } from '../data/gallery'
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
            ? 'Сушим в собствена камера до 50 м³, рендосваме, шлайфаме, боядисваме, импрегнираме и клинозъбим — и доставяме готовия материал до обекта.'
            : undefined
        }
      />

      {/* Same shell as the product cards: a photograph leads where there is
          one, an icon where there is not yet. */}
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 md:mt-14 md:grid-cols-3 md:gap-5">
        {SERVICES.map(({ title, text, photo, Icon }, i) => (
          <article
            key={title}
            className="card fade-up flex flex-col overflow-hidden rounded-2xl"
            style={{ animationDelay: `${0.05 + i * 0.06}s` }}
          >
            {photo ? (
              <div className="aspect-[4/3] w-full overflow-hidden bg-timber-bark/5">
                <img
                  src={thumbFor(photo)}
                  srcSet={`${thumbFor(photo)} 640w, ${photo} 1200w`}
                  sizes="(min-width: 768px) 33vw, 46vw"
                  alt={title}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center"
                />
              </div>
            ) : null}

            {/* An icon card sits in a row beside photographed ones, so its
                content centres in the height the row gives it. */}
            <div className={`p-5 md:p-7 ${photo ? '' : 'flex grow flex-col justify-center'}`}>
              {!photo && <Icon className="h-8 w-8 text-timber-gold md:h-9 md:w-9" />}
              <h3
                className={`font-display text-base font-bold uppercase leading-tight tracking-[0.04em] text-timber-bark md:text-lg ${
                  photo ? '' : 'mt-5'
                }`}
              >
                {title}
              </h3>

              {/* The description carries the serif of the site's accent voice,
                  opened by a short gold rule so it reads as its own block. */}
              <span aria-hidden="true" className="mt-3 block h-px w-10 bg-timber-gold/70" />
              <p className="mt-3 font-serif text-[0.95rem] leading-[1.6] text-timber-bark/80 md:text-base md:leading-[1.65]">
                {text}
              </p>
            </div>
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
