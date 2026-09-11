import { Link } from 'react-router-dom'

const ICON = 'h-4 w-4 shrink-0 text-timber-ember'

function PinIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M20 10c0 5-8 12-8 12s-8-7-8-12a8 8 0 1 1 16 0Z" strokeLinejoin="round" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

function PhoneIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path
        d="M6.2 3.5h3l1.4 4-2 1.4a12.5 12.5 0 0 0 6.5 6.5l1.4-2 4 1.4v3a1.6 1.6 0 0 1-1.8 1.6C10.6 18.8 5.2 13.4 4.6 5.3A1.6 1.6 0 0 1 6.2 3.5Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg className={ICON} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <circle cx="12" cy="12" r="8.6" />
      <path d="M12 7.2V12l3.2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

const headingClass =
  'flex items-center gap-2.5 font-sans text-[0.68rem] font-medium uppercase tracking-[0.22em] text-timber-ember'

/** Underline wipes in on hover, matching the nav links. */
const linkClass =
  'group/link relative inline-block text-timber-bark/75 transition-colors hover:text-timber-bark focus-visible:text-timber-bark'

function Underline() {
  return (
    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-timber-ember transition-transform duration-500 ease-out group-hover/link:origin-left group-hover/link:scale-x-100" />
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="liquid-glass-panel white-wash relative z-10">
      {/* Hairline that catches the eye coming off the page above */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-timber-ember/30 to-transparent" />

      <div className="mx-auto grid max-w-[1200px] gap-10 px-6 py-14 sm:grid-cols-2 md:px-10 md:py-16 lg:grid-cols-3 lg:gap-8">
        <section>
          <h2 className={headingClass}>
            <PinIcon />
            Адрес
          </h2>
          <address className="mt-4 space-y-1 font-sans text-[0.95rem] font-light not-italic leading-[1.75] text-timber-bark/75">
            <p>гр. Разлог</p>
            <p>ул. Христо Ботев, срещу бензиностанция „Лукойл“</p>
          </address>
        </section>

        <section>
          <h2 className={headingClass}>
            <PhoneIcon />
            Контакти
          </h2>
          <div className="mt-4 flex flex-col items-start gap-2 font-sans text-[0.95rem] font-light leading-[1.75]">
            <a href="tel:+359888726194" className={linkClass}>
              0888 726 194
              <Underline />
            </a>
            <a href="mailto:mihaleood@gmail.com" className={linkClass}>
              mihaleood@gmail.com
              <Underline />
            </a>
          </div>
        </section>

        <section className="sm:col-span-2 lg:col-span-1">
          <h2 className={headingClass}>
            <ClockIcon />
            Работно време
          </h2>
          <dl className="mt-4 space-y-2 font-sans text-[0.95rem] font-light leading-[1.75] text-timber-bark/75">
            <div className="flex flex-wrap items-baseline gap-x-3">
              <dt>Понеделник – Петък</dt>
              <dd className="text-timber-bark">08.00 – 17.00 ч.</dd>
            </div>
            <div className="flex flex-wrap items-baseline gap-x-3">
              <dt>Събота – Неделя</dt>
              <dd className="text-timber-bark/60">Почивни дни</dd>
            </div>
          </dl>
        </section>
      </div>

      <div className="border-t border-timber-bark/10">
        <div className="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row md:px-10">
          <Link
            to="/"
            className="font-display text-xs font-medium uppercase tracking-[0.32em] text-timber-bark transition-opacity hover:opacity-70"
          >
            Михал<span className="ml-2 text-timber-ember">ЕООД</span>
          </Link>
          <p className="font-sans text-[0.68rem] uppercase tracking-[0.18em] text-timber-bark/55">
            © {new Date().getFullYear()} — Всички права запазени
          </p>
        </div>
      </div>
    </footer>
  )
}
