import { Link } from 'react-router-dom'
import { ClockIcon, MailIcon, NavigationIcon, PhoneIcon, PinIcon } from '../components/Icons'
import {
  ADDRESS_CITY,
  ADDRESS_LANDMARK,
  ADDRESS_STREET,
  DIRECTIONS_LINK,
  EMAIL,
  HOURS_WEEKDAYS,
  MAP_LINK,
  PHONE_DISPLAY,
  PHONE_HREF,
} from '../data/company'

const headingClass =
  'flex items-center gap-2.5 font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-timber-ember'

const ICON = 'h-4 w-4 shrink-0 text-timber-ember'

/** Underline wipes in on hover, matching the nav links. */
const linkClass =
  'group/link relative inline-flex min-h-[36px] items-center text-timber-bark/90 transition-colors hover:text-timber-bark focus-visible:text-timber-bark'

function Underline() {
  return (
    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-timber-gold transition-transform duration-500 ease-out group-hover/link:origin-left group-hover/link:scale-x-100" />
  )
}

export default function Footer() {
  return (
    <footer className="footer-panel relative z-10">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-14 sm:grid-cols-2 md:px-8 md:py-16 lg:grid-cols-4 lg:gap-8">
        <section>
          <h2 className={headingClass}>
            <PinIcon className={ICON} />
            Адрес
          </h2>
          <address className="mt-4 space-y-1 font-sans text-[0.95rem] not-italic leading-[1.75] text-timber-bark/85">
            <p>{ADDRESS_CITY}</p>
            <p>{ADDRESS_STREET}</p>
            <p>{ADDRESS_LANDMARK}</p>
          </address>
        </section>

        <section>
          <h2 className={headingClass}>
            <PhoneIcon className={ICON} />
            Контакти
          </h2>
          <div className="mt-4 flex flex-col items-start gap-2 font-sans text-[0.95rem] leading-[1.75]">
            <a href={PHONE_HREF} className={linkClass}>
              {PHONE_DISPLAY}
              <Underline />
            </a>
            <a href={`mailto:${EMAIL}`} className={linkClass}>
              {EMAIL}
              <Underline />
            </a>
          </div>
        </section>

        <section>
          <h2 className={headingClass}>
            <ClockIcon className={ICON} />
            Работно време
          </h2>
          <dl className="mt-4 space-y-2 font-sans text-[0.95rem] leading-[1.75] text-timber-bark/85">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <dt>Понеделник – Петък</dt>
              <dd className="font-medium text-timber-bark">{HOURS_WEEKDAYS} ч.</dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <dt>Събота – Неделя</dt>
              <dd className="text-timber-bark/70">Почивни дни</dd>
            </div>
          </dl>
        </section>

        <section>
          <h2 className={headingClass}>
            <MailIcon className={ICON} />
            Връзки
          </h2>
          <ul className="mt-4 flex flex-col items-start gap-2 font-sans text-[0.95rem] leading-[1.75]">
            <li>
              <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className={linkClass}>
                Google Карти
                <Underline />
              </a>
            </li>
            <li>
              <a href={DIRECTIONS_LINK} target="_blank" rel="noopener noreferrer" className={linkClass}>
                <span className="inline-flex items-center gap-2">
                  <NavigationIcon className="h-3.5 w-3.5 text-timber-ember" />
                  Навигация до базата
                </span>
                <Underline />
              </a>
            </li>
            <li>
              <Link to="/privacy" className={linkClass}>
                Политика за поверителност
                <Underline />
              </Link>
            </li>
          </ul>
        </section>
      </div>

      <div className="border-t border-timber-bark/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-5 py-6 sm:flex-row md:px-8">
          <Link
            to="/"
            className="inline-flex min-h-[36px] items-center font-display text-xs font-medium uppercase tracking-[0.3em] text-timber-bark transition-opacity hover:opacity-70"
          >
            Михал<span className="ml-2 text-timber-ember">ЕООД</span>
          </Link>
          <p className="font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-timber-bark/65">
            © {new Date().getFullYear()} — Всички права запазени
          </p>
        </div>
      </div>
    </footer>
  )
}
