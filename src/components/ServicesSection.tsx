import { useState } from 'react'
import SectionHeading from './SectionHeading'
import ServiceDialog from './ServiceDialog'
import { ArrowIcon } from './Icons'
import { thumbFor } from '../data/gallery'
import { SERVICES, type Service } from '../data/services'
import ProcessSteps from './ProcessSteps'

export default function ServicesSection() {
  const [open, setOpen] = useState<Service | null>(null)

  return (
    <div className="mx-auto max-w-[1200px] px-5 md:px-8">
      <SectionHeading
        eyebrow="Какво правим"
        title="Не само продаваме"
        accent="материал"
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
              onClick={(e) => {
                // Safari does not focus a button on click; the dialog hands focus back here.
                e.currentTarget.focus()
                setOpen(service)
              }}
              className="group card reveal flex flex-col overflow-hidden rounded-2xl text-left transition-shadow duration-300 hover:shadow-[0_18px_40px_-26px_rgba(42,32,17,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold focus-visible:ring-offset-2 focus-visible:ring-offset-timber-ground"
              style={{ animationDelay: `${0.05 + i * 0.06}s` }}
            >
              {photo ? (
                <span className="block aspect-[4/3] w-full overflow-hidden bg-timber-bark/5">
                  <img
                    src={thumbFor(photo)}
                    // One column on a phone, two from 640px, three from 768px —
                    // and never wider than a third of the 1200px container.
                    srcSet={`${thumbFor(photo)} 640w, ${photo.replace(/\.jpg$/, '-800.jpg')} 800w, ${photo} 1200w`}
                    sizes="(min-width: 1200px) 370px, (min-width: 768px) 31vw, (min-width: 640px) 47vw, 92vw"
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

      <div className="mt-14 md:mt-20">
        <ProcessSteps />
      </div>

      <ServiceDialog service={open} onClose={() => setOpen(null)} />
    </div>
  )
}
