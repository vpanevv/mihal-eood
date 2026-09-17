import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import ServicesSection from '../components/ServicesSection'
import { ArrowIcon, CheckIcon, NavigationIcon, PhoneIcon } from '../components/Icons'
import { DIRECTIONS_LINK, MAP_EMBED, PHONE_DISPLAY, PHONE_HREF } from '../data/company'
import { DELIVERY_TOWNS } from '../data/services'

const TERMS = [
  'Оферта след запитване по телефона или през формата, с цена според размерите и количеството.',
  'Доставка със собствен транспорт; цената зависи от обема и адреса на обекта.',
  'Товарене с подемна техника в базата — без ръчно разтоварване.',
  'Фактура за всяка поръчка.',
]

export default function Delivery() {
  useEffect(() => {
    document.title = 'Услуги и доставка — МИХАЛ ЕООД'
  }, [])

  return (
    <main className="relative z-10">
      <PageBanner crumb="Услуги" title="Услуги и" accent="доставка" image="/images/new-1.jpg" />

      <section className="py-12 md:py-20">
        <ServicesSection />
      </section>

      {/* Зона на доставка */}
      <section aria-labelledby="zone-heading" className="bg-timber-ground/70 py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="fade-up">
            <p className="eyebrow">Зона на доставка</p>
            <h2
              id="zone-heading"
              className="mt-3 font-display text-[clamp(1.6rem,5.5vw,2.75rem)] font-bold uppercase leading-[1] text-timber-bark"
            >
              Пирин и
              <br />
              <span className="text-timber-ember">цялата страна</span>
            </h2>

            <ul className="mt-7 flex flex-wrap gap-2.5">
              {DELIVERY_TOWNS.map((town) => (
                <li
                  key={town}
                  className="rounded-full border border-timber-bark/15 bg-white px-4 py-2 font-sans text-[0.85rem] text-timber-bark/85"
                >
                  {town}
                </li>
              ))}
            </ul>

            <p className="mt-5 font-sans text-[0.92rem] font-light leading-[1.8] text-timber-bark/70">
              … и цялата страна по договаряне.
            </p>

            <a
              href={DIRECTIONS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary mt-7"
            >
              <NavigationIcon className="h-4 w-4" />
              Навигация до базата
            </a>
          </div>

          <div className="card fade-up overflow-hidden rounded-3xl">
            <iframe
              title="Карта — складовата база в Разлог"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-[300px] w-full border-0 bg-timber-bark/5 md:h-[420px]"
            />
          </div>
        </div>
      </section>

      {/* Условия */}
      <section aria-labelledby="terms-heading" className="py-14 md:py-20">
        <div className="mx-auto max-w-[900px] px-5 md:px-8">
          <p className="eyebrow fade-up">Условия</p>
          <h2
            id="terms-heading"
            className="fade-up mt-3 font-display text-[clamp(1.6rem,5.5vw,2.5rem)] font-bold uppercase leading-[1] text-timber-bark"
          >
            Как работим
          </h2>

          <ul className="mt-8 space-y-4">
            {TERMS.map((term, i) => (
              <li
                key={term}
                className="fade-up flex items-start gap-3.5 font-sans text-[0.95rem] font-light leading-[1.75] text-timber-bark/80"
                style={{ animationDelay: `${0.04 + i * 0.05}s` }}
              >
                <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-timber-gold" />
                {term}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link to="/contacts#inquiry" className="btn btn-primary">
              Изпрати запитване
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <a href={PHONE_HREF} className="btn btn-outline">
              <PhoneIcon className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}
