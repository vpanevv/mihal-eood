import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from './sections/Hero'
import Showcase from './sections/Showcase'
import SectionHeading from './components/SectionHeading'
import ServicesSection from './components/ServicesSection'
import CategoryGrid from './components/CategoryGrid'
import GalleryStrip from './components/GalleryStrip'
import InquiryForm from './components/InquiryForm'
import Faq from './components/Faq'
import { ArrowIcon } from './components/Icons'

const LANDING_TITLE = 'МИХАЛ ЕООД — Качествен сух дървен материал'

export default function App() {
  // Each route owns the title, otherwise it keeps whatever the last page set.
  useEffect(() => {
    document.title = LANDING_TITLE
  }, [])

  return (
    <main id="top">
      <Hero />

      {/* The four photo blocks stay as they are, now with a line of copy each. */}
      <Showcase />

      <section aria-labelledby="materials-heading" className="bg-timber-ground/70 py-14 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          {/* The cards speak for themselves; the heading stays for screen
              readers and for the section landmark. */}
          <h2 id="materials-heading" className="sr-only">
            Нашите материали
          </h2>
          <CategoryGrid />
          <div className="mt-10">
            <Link to="/products" className="btn btn-outline">
              Виж всички размери
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section aria-labelledby="services-heading" className="border-t border-timber-bark/8 bg-timber-paper py-14 md:py-24">
        <h2 id="services-heading" className="sr-only">
          Услуги
        </h2>
        <ServicesSection withLink />
        <div className="mx-auto mt-10 max-w-[1200px] px-5 md:mt-14 md:px-8">
          <Link to="/delivery" className="btn btn-outline">
            Всичко за услугите и доставката
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <section aria-labelledby="gallery-heading" className="bg-timber-ground/70 py-14 md:py-24">
        <div className="mx-auto mb-8 max-w-[1200px] px-5 md:mb-12 md:px-8">
          <SectionHeading
            eyebrow="От базата"
            title="Снимки от"
            accent="склада"
            aside="Складът в Разлог, подреденият материал и натоварените камиони."
          />
        </div>
        <h2 id="gallery-heading" className="sr-only">
          Галерия
        </h2>
        <GalleryStrip />
      </section>

      <section id="inquiry" aria-labelledby="inquiry-heading" className="bg-timber-paper py-14 md:py-24">
        <h2 id="inquiry-heading" className="sr-only">
          Запитване
        </h2>
        <div className="mx-auto max-w-[760px] px-5 md:px-8">
          <InquiryForm />
        </div>
      </section>

      <section aria-labelledby="faq-heading" className="bg-timber-ground/70 py-14 md:py-24">
        <div className="mx-auto max-w-[900px] px-5 md:px-8">
          <SectionHeading eyebrow="Въпроси" title="Често задавани" accent="въпроси" />
          <div className="mt-9 md:mt-12">
            <Faq />
          </div>
        </div>
      </section>
    </main>
  )
}
