import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { PhoneIcon } from '../components/Icons'
import { PHONE_DISPLAY, PHONE_HREF } from '../data/company'

const LINKS = [
  { label: 'Начало', href: '/' },
  // Продукти is deliberately absent: the six categories live on the landing
  // page, and /products is reached from there rather than from the bar.
  { label: 'Услуги', href: '/delivery' },
  { label: 'Галерия', href: '/gallery' },
  { label: 'За нас', href: '/about-us' },
  { label: 'Контакти', href: '/contacts' },
]

/** Scroll depth at which the bar leaves the photograph and becomes paper. */
const SOLID_AFTER = 60

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [solid, setSolid] = useState(() => window.scrollY > SOLID_AFTER)
  const { pathname } = useLocation()

  // A boolean rather than a per-frame opacity: the bar only has two states, so
  // React does work twice per page instead of on every scroll frame.
  const frame = useRef(0)
  useEffect(() => {
    const apply = () => setSolid(window.scrollY > SOLID_AFTER)
    const onScroll = () => {
      cancelAnimationFrame(frame.current)
      frame.current = requestAnimationFrame(apply)
    }
    apply()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame.current)
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Close the menu when a navigation happens, however it was triggered.
  useEffect(() => setMenuOpen(false), [pathname])

  // Lock the page behind the overlay, and let Escape dismiss it.
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false)
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  const onPhoto = !solid && !menuOpen

  return (
    <>
      <header
        className="fade-down fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-5"
        style={{ animationDelay: '0.1s' }}
      >
        <div
          className={`relative mx-auto h-16 max-w-[1400px] overflow-hidden rounded-full transition-[background-color,box-shadow] duration-300 md:h-[72px] ${
            onPhoto ? 'nav-clear' : 'nav-solid'
          }`}
        >
          <div className="relative flex h-full items-center justify-between gap-4 pl-6 pr-3 md:pl-9 md:pr-4">
            <Link
              to="/"
              className={`-my-2 flex items-center py-2 font-display text-sm font-medium uppercase tracking-[0.3em] transition-opacity hover:opacity-70 md:text-base ${
                onPhoto ? 'text-white' : 'text-timber-bark'
              }`}
            >
              Михал
              <span className={`ml-2 ${onPhoto ? 'text-timber-sap' : 'text-timber-ember'}`}>ЕООД</span>
            </Link>

            <nav aria-label="Основна навигация" className="hidden lg:block">
              <ul className="flex items-center gap-7 xl:gap-9">
                {LINKS.map(({ label, href }) => (
                  <li key={href}>
                    <NavLink
                      to={href}
                      end={href === '/'}
                      className={({ isActive }) =>
                        `group relative block font-serif text-[1.05rem] transition-colors xl:text-lg ${
                          onPhoto
                            ? isActive
                              ? 'text-timber-sap'
                              : 'text-white/85 hover:text-white'
                            : isActive
                              ? 'text-timber-ember'
                              : 'text-timber-bark/80 hover:text-timber-bark'
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          {label}
                          {/* Active page keeps the gold rule; the rest wipe it in on hover. */}
                          <span
                            className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-timber-gold transition-transform duration-300 ease-out ${
                              isActive
                                ? 'scale-x-100'
                                : 'origin-right scale-x-0 group-hover:origin-left group-hover:scale-x-100'
                            }`}
                          />
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                to="/contacts#inquiry"
                className="btn btn-primary hidden !min-h-[44px] !px-6 !text-[0.7rem] lg:inline-flex"
              >
                Запитване
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                aria-label={menuOpen ? 'Затвори менюто' : 'Отвори менюто'}
                className={`relative z-50 flex h-11 w-11 flex-col items-center justify-center gap-[7px] rounded-full transition-colors lg:hidden ${
                  onPhoto ? 'text-white' : 'text-timber-bark'
                }`}
              >
                <span
                  className={`block h-px w-7 bg-current transition-transform duration-300 ${
                    menuOpen ? 'translate-y-[4px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`block h-px w-7 bg-current transition-transform duration-300 ${
                    menuOpen ? '-translate-y-[4px] -rotate-45' : ''
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay — the six pages full screen, as in the proposal. */}
      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="fixed inset-0 z-40 bg-timber-bark lg:hidden"
      >
        <nav aria-label="Мобилна навигация" className="flex h-full flex-col justify-center px-7 pb-28 pt-24">
          <ul className="w-full">
            {LINKS.map(({ label, href }, i) => (
              <li
                key={href}
                className={`border-b border-white/10 ${menuOpen ? 'fade-up' : ''}`}
                style={{ animationDelay: `${0.04 + i * 0.05}s` }}
              >
                <NavLink
                  to={href}
                  end={href === '/'}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block py-4 font-display text-[2rem] font-bold uppercase tracking-[0.02em] ${
                      isActive ? 'text-timber-sap' : 'text-white'
                    }`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <a href={PHONE_HREF} className="btn btn-gold mt-9 self-start">
            <PhoneIcon className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </nav>
      </div>
    </>
  )
}
