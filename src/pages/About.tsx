import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import Stats from '../components/Stats'
import { ArrowIcon, ClockIcon, NavigationIcon, PinIcon } from '../components/Icons'
import {
  ADDRESS_CITY,
  ADDRESS_LANDMARK,
  ADDRESS_STREET,
  DIRECTIONS_LINK,
  HOURS_WEEKDAYS,
} from '../data/company'
import { thumbFor } from '../data/gallery'

const BASE_PHOTO = '/images/gallery/mihal-razlog-2-min.jpeg'

export default function About() {
  useEffect(() => {
    document.title = 'За нас — МИХАЛ ЕООД'
  }, [])

  return (
    <main className="relative z-10">
      <PageBanner crumb="За нас" title="Фирмата зад" accent="материала" image="/images/new-6.jpg" />

      <section aria-labelledby="about-heading" className="py-12 md:py-20">
        <div className="mx-auto max-w-[1000px] px-5 md:px-8">
          <p id="about-heading" className="eyebrow fade-up">
            За МИХАЛ ЕООД
          </p>

          <p className="fade-up mt-5 font-serif text-[clamp(1.25rem,4vw,1.9rem)] leading-[1.4] text-timber-bark">
            МИХАЛ ЕООД е дружество, регистрирано през 2008 г. в гр. Разлог, с основна дейност
            търговия и обработка на <span className="text-timber-ember">сух дървен материал</span>.
          </p>

          <div className="mt-10 grid gap-7 md:mt-12 md:grid-cols-2 md:gap-10">
            <p
              className="fade-up font-sans text-[0.95rem] font-light leading-[1.85] text-timber-bark/80"
              style={{ animationDelay: '0.05s' }}
            >
              Дружеството разполага със собствена складова база, транспортни средства и подемна
              техника, което осигурява цялостен контрол върху веригата на доставка — от съхранението
              на материала до неговото доставяне на клиента.
            </p>
            <p
              className="fade-up font-sans text-[0.95rem] font-light leading-[1.85] text-timber-bark/80"
              style={{ animationDelay: '0.1s' }}
            >
              Продуктовата гама включва сух дървен материал, дюшеме, ламперия, сачак за обшивка и
              слепени греди. Материалът преминава задължителен престой от минимум един месец след
              сушилня, преди да бъде предложен за продажба, с цел гарантиране на подходящото ниво на
              влажност.
            </p>
            <p
              className="fade-up font-sans text-[0.95rem] font-light leading-[1.85] text-timber-bark/80 md:col-span-2 md:max-w-[62ch]"
              style={{ animationDelay: '0.15s' }}
            >
              В рамките на своята дейност МИХАЛ ЕООД работи основно със строителни фирми,
              производители на мебели и частни клиенти, като поддържа дългосрочни партньорства въз
              основа на коректност, качество и спазване на договорените срокове.
            </p>
          </div>

          {/* Мисията затваря разказа, затова е изнесена на отделна карта. */}
          <div className="card fade-up mt-10 rounded-3xl p-6 md:mt-14 md:p-10" style={{ animationDelay: '0.2s' }}>
            <span aria-hidden="true" className="block h-px w-12 bg-timber-gold" />
            <p className="mt-5 font-serif text-[1.05rem] leading-[1.7] text-timber-bark/85 md:text-[1.2rem] md:leading-[1.75]">
              <strong className="font-display text-base font-bold uppercase tracking-[0.06em] text-timber-bark md:text-lg">
                Нашата мисия
              </strong>{' '}
              е да бъдем надежден и последователен доставчик на висококачествен дървен материал за
              нашите клиенти — съчетавайки традицията в обработката на дървесина с грижа за всяка
              отделна поръчка. Стремим се да бъдем партньорът, на когото строителни и мебелни фирми
              могат да разчитат за срокове, качество и коректност, независимо от мащаба на проекта.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="numbers-heading" className="bg-timber-ground/70 py-12 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <h2 id="numbers-heading" className="eyebrow fade-up">
            Михал ЕООД в числа
          </h2>
          <div className="mt-8 md:mt-10">
            <Stats />
          </div>
        </div>
      </section>

      {/* Складовата база */}
      <section aria-labelledby="base-heading" className="py-14 md:py-20">
        <div className="mx-auto grid max-w-[1200px] gap-8 px-5 md:px-8 lg:grid-cols-2 lg:items-center lg:gap-12">
          <div className="fade-up overflow-hidden rounded-3xl ring-1 ring-timber-bark/10">
            <img
              src={thumbFor(BASE_PHOTO)}
              srcSet={`${thumbFor(BASE_PHOTO)} 640w, ${BASE_PHOTO} 1000w`}
              sizes="(min-width: 1024px) 50vw, 100vw"
              alt="Складовата база на МИХАЛ ЕООД в Разлог"
              width={1000}
              height={667}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>

          <div className="fade-up" style={{ animationDelay: '0.06s' }}>
            <p className="eyebrow">Складовата база</p>
            <h2
              id="base-heading"
              className="mt-3 font-display text-[clamp(1.6rem,5.5vw,2.75rem)] font-bold uppercase leading-[1] text-timber-bark"
            >
              Разлог,
              <br />
              <span className="text-timber-ember">ул. „Христо Ботев“</span>
            </h2>

            <dl className="mt-7 space-y-4 font-sans text-[0.95rem] font-light leading-[1.75] text-timber-bark/80">
              <div className="flex items-start gap-3.5">
                <dt className="mt-0.5">
                  <PinIcon className="h-4 w-4 text-timber-gold" />
                  <span className="sr-only">Адрес</span>
                </dt>
                <dd>
                  {ADDRESS_CITY}, {ADDRESS_STREET}, {ADDRESS_LANDMARK}
                </dd>
              </div>
              <div className="flex items-start gap-3.5">
                <dt className="mt-0.5">
                  <ClockIcon className="h-4 w-4 text-timber-gold" />
                  <span className="sr-only">Работно време</span>
                </dt>
                <dd>
                  Понеделник – Петък, {HOURS_WEEKDAYS} ч. Товаренето е с подемна техника на място.
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={DIRECTIONS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                <NavigationIcon className="h-4 w-4" />
                Навигация до базата
              </a>
              <Link to="/contacts#inquiry" className="btn btn-primary">
                Запитване
                <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
