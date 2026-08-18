import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../sections/Nav'
import Footer from '../sections/Footer'
import TintedBackdrop from '../components/TintedBackdrop'

const ICON = 'h-9 w-9 text-timber-sap md:h-10 md:w-10'

function WarehouseIcon() {
  return (
    <svg className={ICON} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M4 20 24 8l20 12v22H4V20Z" strokeLinejoin="round" />
      <path d="M14 42V26h20v16" strokeLinejoin="round" />
      <path d="M14 32h20M24 26v16" />
    </svg>
  )
}

function TruckIcon() {
  return (
    <svg className={ICON} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M3 12h25v20H3zM28 19h8l6 7v6h-14z" strokeLinejoin="round" />
      <circle cx="13" cy="36" r="4" />
      <circle cx="34" cy="36" r="4" />
      <path d="M17 36h13" />
    </svg>
  )
}

function ForkliftIcon() {
  return (
    <svg className={ICON} viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
      <path d="M6 32V14h12l6 10v8z" strokeLinejoin="round" />
      <path d="M32 8v26M32 34h11" strokeLinecap="round" />
      <circle cx="12" cy="38" r="4" />
      <circle cx="26" cy="38" r="4" />
    </svg>
  )
}

const CAPABILITIES = [
  { label: 'Складова база', Icon: WarehouseIcon },
  { label: 'Собствен транспорт', Icon: TruckIcon },
  { label: 'Подемна техника', Icon: ForkliftIcon },
]

export default function Delivery() {
  useEffect(() => {
    document.title = 'Доставка — МИХАЛ ЕООД'
  }, [])

  return (
    <>
      <Nav />

      <div className="fixed inset-0 z-0 overflow-hidden bg-timber-bark">
        <TintedBackdrop src="/images/hero.jpg" strength="copy" />
      </div>

      <main className="relative z-10 flex min-h-svh flex-col items-center justify-center px-6 py-32 md:px-10 md:py-44">
        <h1 className="sr-only">Доставка</h1>

        <p
          className="fade-up font-display text-3xl font-bold uppercase tracking-[0.02em] text-white [text-shadow:0_2px_24px_rgba(18,12,4,0.7)] md:text-5xl"
          style={{ animationDelay: '0.15s' }}
        >
          Разполагаме с:
        </p>

        <div className="mt-12 grid w-full max-w-[1000px] gap-5 sm:grid-cols-3 md:mt-16 md:gap-6">
          {CAPABILITIES.map(({ label, Icon }, i) => (
            <div
              key={label}
              className="liquid-glass-panel fade-up flex flex-col items-center gap-5 rounded-3xl px-6 py-10 text-center md:py-12"
              style={{ animationDelay: `${0.3 + i * 0.1}s` }}
            >
              <Icon />
              <h2 className="font-display text-lg font-bold uppercase leading-tight tracking-[0.06em] text-white md:text-xl">
                {label}
              </h2>
            </div>
          ))}
        </div>

        <div className="fade-up mt-14 md:mt-16" style={{ animationDelay: '0.65s' }}>
          <Link to="/contacts" className="cta-button font-sans uppercase tracking-[0.16em]">
            <span>Свържи се с нас</span>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
