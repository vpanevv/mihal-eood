import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import InquiryForm from '../components/InquiryForm'
import { ClockIcon, MailIcon, NavigationIcon, PhoneIcon, PinIcon } from '../components/Icons'
import {
  ADDRESS_CITY,
  ADDRESS_LANDMARK,
  ADDRESS_STREET,
  DIRECTIONS_LINK,
  EMAIL,
  HOURS_WEEKDAYS,
  MAP_EMBED,
  PHONE_DISPLAY,
  PHONE_HREF,
} from '../data/company'

const cardClass = 'card fade-up flex gap-4 rounded-2xl p-5 md:p-6'
const iconWrap =
  'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-timber-gold/15 text-timber-ember'
const labelClass = 'font-sans text-[0.66rem] font-medium uppercase tracking-[0.2em] text-timber-ember'
const valueClass = 'mt-2 font-display text-lg font-bold uppercase tracking-[0.02em] text-timber-bark'
const noteClass = 'mt-1 font-sans text-[0.85rem] font-light leading-[1.6] text-timber-bark/70'

export default function Contact() {
  useEffect(() => {
    document.title = 'Контакти — МИХАЛ ЕООД'
  }, [])

  return (
    <main className="relative z-10">
      <PageBanner crumb="Контакти" title="Свържете се" accent="с нас" image="/images/new-5.jpg" />

      {/* Четирите начина за връзка — телефонът пръв, и на телефон той е най-горе. */}
      <section aria-label="Начини за връзка" className="py-10 md:py-16">
        <div className="mx-auto grid max-w-[1200px] gap-3 px-5 sm:grid-cols-2 md:gap-5 md:px-8 lg:grid-cols-4">
          <a href={PHONE_HREF} className={`${cardClass} transition-colors hover:bg-timber-cream`}>
            <span className={iconWrap}>
              <PhoneIcon />
            </span>
            <span>
              <span className={labelClass}>Телефон</span>
              <span className={`${valueClass} block`}>{PHONE_DISPLAY}</span>
              <span className={`${noteClass} block`}>Понеделник – Петък</span>
            </span>
          </a>

          <a
            href={`mailto:${EMAIL}`}
            className={`${cardClass} transition-colors hover:bg-timber-cream`}
            style={{ animationDelay: '0.05s' }}
          >
            <span className={iconWrap}>
              <MailIcon />
            </span>
            <span className="min-w-0">
              <span className={labelClass}>Е-мейл</span>
              <span className="mt-2 block break-words font-sans text-[0.95rem] font-medium text-timber-bark">
                {EMAIL}
              </span>
              <span className={`${noteClass} block`}>Отговор до 24 часа</span>
            </span>
          </a>

          <div className={cardClass} style={{ animationDelay: '0.1s' }}>
            <span className={iconWrap}>
              <PinIcon />
            </span>
            <span>
              <span className={labelClass}>Адрес</span>
              <span className="mt-2 block font-sans text-[0.95rem] font-medium leading-[1.6] text-timber-bark">
                {ADDRESS_CITY}
                <br />
                {ADDRESS_STREET}
              </span>
              <span className={`${noteClass} block`}>{ADDRESS_LANDMARK}</span>
            </span>
          </div>

          <div className={cardClass} style={{ animationDelay: '0.15s' }}>
            <span className={iconWrap}>
              <ClockIcon />
            </span>
            <span>
              <span className={labelClass}>Работно време</span>
              <span className={`${valueClass} block`}>{HOURS_WEEKDAYS}</span>
              <span className={`${noteClass} block`}>Събота и неделя — почивни</span>
            </span>
          </div>
        </div>
      </section>

      {/* Формата и картата */}
      <section className="pb-14 md:pb-24">
        <div className="mx-auto grid max-w-[1200px] items-start gap-6 px-5 md:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-8">
          <div id="inquiry">
            <InquiryForm />
          </div>

          <section aria-labelledby="map-heading" className="card fade-up overflow-hidden rounded-3xl">
            <div className="px-6 pt-6 md:px-8 md:pt-8">
              <p className="eyebrow">Складова база</p>
              <h2
                id="map-heading"
                className="mt-3 font-display text-[clamp(1.5rem,5vw,2.25rem)] font-bold uppercase leading-[1] text-timber-bark"
              >
                Как да
                <br />
                ни намерите
              </h2>
              <p className="mt-3 font-sans text-[0.9rem] font-light leading-[1.7] text-timber-bark/70">
                {ADDRESS_CITY}, {ADDRESS_STREET}, {ADDRESS_LANDMARK}
              </p>
              <a
                href={DIRECTIONS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline mt-5"
              >
                <NavigationIcon className="h-4 w-4" />
                Навигация до базата
              </a>
            </div>

            <iframe
              title="Карта — складовата база в Разлог"
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-6 h-[300px] w-full border-0 bg-timber-bark/5 md:h-[380px]"
            />
          </section>
        </div>
      </section>
    </main>
  )
}
