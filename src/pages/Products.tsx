import { useState } from 'react'
import { usePageMeta } from '../utils/usePageMeta'
import { Link, useSearchParams } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { BANNERS } from '../data/banners'
import ChapterNav from '../components/ChapterNav'
import ProductShowcase from '../components/ProductShowcase'
import ProductDialog from '../components/ProductDialog'
import { ArrowIcon, DownloadIcon, LogIcon, PhoneIcon } from '../components/Icons'
import ViberButton from '../components/ViberButton'
import { PHONE_DISPLAY, PHONE_HREF } from '../data/company'
import { PRODUCTS, type Product } from '../data/products'
import { SPEC_ROWS, SPEC_SHEET_FILENAME, SPEC_SHEET_PATH } from '../data/specs'

/** The selector's order: the stock first, then the milled products, then the boards. */
const ORDER = ['suh-material', 'dyusheme', 'lamperia', 'gredi-talpi', 'slepeni-gredi', 'letvi-daski', 'chelni-daski']
const PICKS = ORDER.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p))

export default function Products() {
  const [open, setOpen] = useState<Product | null>(null)
  // The choice lives in the address, so a link can open the page on one
  // product and the browser's Back button steps back through the choices.
  const [params, setParams] = useSearchParams()
  const chosen = PICKS.find((p) => p.id === params.get('p')) ?? null
  const choose = (id: string) => setParams({ p: id }, { preventScrollReset: true })

  usePageMeta(
    'Продукти — МИХАЛ ЕООД',
    'Размери и категории дървен материал от Разлог: дъски от бор и смърч, дъб, бук и липа, дюшеме, декинг, ламперия, греди и слепени греди.',
  )

  return (
    <main id="main" tabIndex={-1} className="relative z-10">
      <PageBanner crumb="Продукти" title="Дървен" accent="материал" image={BANNERS['/products']} />

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <div className="reveal gap-8 md:flex md:items-start md:justify-between">
            <p className="max-w-[46ch] font-sans text-[0.95rem] font-light leading-[1.8] text-timber-bark/80">
              Целият асортимент на склад в Разлог. Всяка категория се реже по зададен размер.
            </p>
            <p className="mt-4 max-w-[34ch] font-sans text-[0.95rem] font-light leading-[1.8] text-timber-bark/70 md:mt-0">
              Не намирате търсеното?{' '}
              <a href={PHONE_HREF} className="font-medium text-timber-ember underline-offset-4 hover:underline">
                Обадете се
              </a>{' '}
              — произвеждаме и по поръчка.
            </p>
          </div>

          {/* Lifted above the product card: the phone menu opens over it. */}
          <div className="reveal relative z-20 mt-8 md:mt-10">
            <ChapterNav
              kind="select"
              label="Изберете продукт"
              items={PICKS.map((p) => ({ anchor: p.id, title: p.short }))}
              active={chosen?.id ?? null}
              onJump={choose}
            />
          </div>

          <div className="mt-6 md:mt-8">
            {chosen ? (
              <ProductShowcase key={chosen.id} product={chosen} onSizes={() => setOpen(chosen)} />
            ) : (
              // Nothing is shown until a product is picked; this says so.
              <div className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-timber-bark/15 bg-white/40 px-6 py-12 text-center md:min-h-[340px]">
                <LogIcon className="h-16 w-16 text-timber-ember" />
                <p className="mt-5 font-display text-[clamp(1.3rem,3.5vw,1.75rem)] font-bold uppercase leading-[1.15] text-timber-bark">
                  Изберете продукт
                </p>
                <p className="mt-2 max-w-[38ch] font-sans text-[0.95rem] font-light leading-[1.7] text-timber-bark/70">
                  Натиснете бутон отгоре, за да видите снимките и размерите му.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Спецификации */}
      <section aria-labelledby="specs-heading" className="bg-timber-ground/70 py-14 md:py-20">
        <div className="mx-auto max-w-[1200px] px-5 md:px-8">
          <p className="eyebrow reveal">Технически данни</p>
          <h2
            id="specs-heading"
            className="reveal mt-3 font-display text-[clamp(1.6rem,5.5vw,2.75rem)] font-bold uppercase leading-[1] text-timber-bark"
          >
            Размери на склад
          </h2>

          {/* A table on wide screens; key/value rows on a phone, where five
              columns would either scroll sideways or squeeze to nothing. */}
          <div className="card reveal mt-8 overflow-hidden rounded-2xl md:mt-10">
            <table className="hidden w-full border-collapse text-left md:table">
              <thead>
                <tr className="border-b border-timber-bark/10 bg-timber-cream">
                  {['Материал', 'Дебелина', 'Ширина', 'Дължина'].map((head) => (
                    <th
                      key={head}
                      scope="col"
                      className="px-6 py-4 font-sans text-[0.68rem] font-medium uppercase tracking-[0.18em] text-timber-ember"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SPEC_ROWS.map(({ name, thickness, width, length }) => (
                  <tr key={name} className="border-b border-timber-bark/8 last:border-0">
                    <th scope="row" className="px-6 py-4 font-display text-base font-bold uppercase tracking-[0.04em] text-timber-bark">
                      {name}
                    </th>
                    <td className="px-6 py-4 font-sans text-[0.92rem] font-light text-timber-bark/80">{thickness}</td>
                    <td className="px-6 py-4 font-sans text-[0.92rem] font-light text-timber-bark/80">{width}</td>
                    <td className="px-6 py-4 font-sans text-[0.92rem] font-light text-timber-bark/80">{length}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <dl className="divide-y divide-timber-bark/8 md:hidden">
              {SPEC_ROWS.map(({ name, thickness, width, length }) => (
                <div key={name} className="px-5 py-4">
                  <dt className="font-display text-base font-bold uppercase tracking-[0.04em] text-timber-bark">
                    {name}
                  </dt>
                  <dd className="mt-1.5 font-sans text-[0.85rem] font-light leading-[1.7] text-timber-bark/75">
                    Дебелина: {thickness}
                    <br />
                    Ширина: {width}
                    <br />
                    Дължина: {length}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="reveal mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[52ch] font-sans text-[0.82rem] font-light text-timber-bark/75">
              Режем по зададена спецификация. Размери извън таблицата се уточняват при запитване.
            </p>

            {/* The same rows as the table, as a one-page A4 sheet to forward or
                print. A plain link: `download` names the file, and it works
                without any script. */}
            <a
              href={SPEC_SHEET_PATH}
              download={SPEC_SHEET_FILENAME}
              type="application/pdf"
              className="btn btn-primary shrink-0"
            >
              <DownloadIcon className="h-4 w-4" />
              Свали спецификацията
              <span className="rounded-full bg-white/15 px-2 py-0.5 text-[0.62rem] tracking-[0.14em]">PDF</span>
            </a>
          </div>
        </div>
      </section>

      {/* Тъмна лента с призив */}
      <section className="bg-timber-bark py-14 md:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col items-start gap-7 px-5 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <h2 className="font-display text-[clamp(1.6rem,5.5vw,2.5rem)] font-bold uppercase leading-[1] text-white">
              Поискай <span className="text-timber-sap">оферта</span>
            </h2>
            <p className="mt-3 max-w-[48ch] font-sans text-[0.95rem] font-light leading-[1.75] text-white/75">
              Изпратете размерите и количеството — или се обадете и ще ги уточним заедно.
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link to="/contacts#inquiry" className="btn btn-gold">
              Изпрати запитване
              <ArrowIcon className="h-4 w-4" />
            </Link>
            <a href={PHONE_HREF} className="btn btn-outline-light">
              <PhoneIcon className="h-4 w-4" />
              {PHONE_DISPLAY}
            </a>
            <ViberButton className="btn-outline-light" />
          </div>
        </div>
      </section>

      <ProductDialog product={open} onClose={() => setOpen(null)} photos={false} />
    </main>
  )
}
