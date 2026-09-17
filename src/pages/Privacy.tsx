import { useEffect } from 'react'
import PageBanner from '../components/PageBanner'
import { EMAIL, PHONE_DISPLAY } from '../data/company'

const SECTIONS: { title: string; body: string }[] = [
  {
    title: 'Какви данни събираме',
    body: `През формата за запитване събираме само данните, които сами попълвате: име, телефон, е-мейл (по желание), описание на материала и прикачената спецификация, ако изпратите такава.`,
  },
  {
    title: 'За какво ги използваме',
    body: 'Използваме ги единствено за да отговорим на запитването ви и да изготвим оферта. Не ги използваме за реклама и не ги предоставяме на трети лица с търговска цел.',
  },
  {
    title: 'Къде се съхраняват',
    body: 'Запитванията се обработват от Netlify (услугата, която хоства сайта) и пристигат по електронна поща на адреса на фирмата. Достъп до тях имат само служители на МИХАЛ ЕООД.',
  },
  {
    title: 'Колко дълго ги пазим',
    body: 'Пазим запитванията само докато са ни нужни за връзка с вас и за евентуална поръчка, след което ги изтриваме.',
  },
  {
    title: 'Вашите права',
    body: `По всяко време можете да поискате достъп до данните си, поправка или изтриване. Пишете ни на ${EMAIL} или се обадете на ${PHONE_DISPLAY}.`,
  },
]

export default function Privacy() {
  useEffect(() => {
    document.title = 'Политика за поверителност — МИХАЛ ЕООД'
  }, [])

  return (
    <main className="relative z-10">
      <PageBanner
        crumb="Поверителност"
        title="Политика за"
        accent="поверителност"
        image="/images/gallery/mihal-razlog-13-min.jpeg"
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto max-w-[760px] px-5 md:px-8">
          {SECTIONS.map(({ title, body }, i) => (
            <div key={title} className={i === 0 ? '' : 'mt-9'}>
              <h2 className="font-display text-xl font-bold uppercase tracking-[0.02em] text-timber-bark md:text-2xl">
                {title}
              </h2>
              <p className="mt-3 font-sans text-[0.95rem] font-light leading-[1.85] text-timber-bark/80">
                {body}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
