import { useState } from 'react'
import CategoryGrid from './CategoryGrid'
import ProductDialog from './ProductDialog'
import { ChevronDownIcon, ConiferIcon, HardwoodIcon } from './Icons'
import { PRODUCTS, type Product } from '../data/products'

type SpeciesId = 'conifer' | 'hardwood'

type Species = {
  id: SpeciesId
  name: string
  woods: string
  Icon: typeof ConiferIcon
  /** Which категории are milled from this wood. */
  products: string[]
}

const SPECIES: Species[] = [
  {
    id: 'conifer',
    name: 'Иглолистна дървесина',
    woods: 'Бор и смърч',
    Icon: ConiferIcon,
    products: ['letvi-daski', 'chelni-daski', 'gredi-talpi', 'lamperia'],
  },
  {
    id: 'hardwood',
    name: 'Широколистна дървесина',
    woods: 'Дъб, бук и липа',
    Icon: HardwoodIcon,
    products: ['dyusheme', 'slepeni-gredi'],
  },
]

const byId = (ids: string[]): Product[] =>
  ids.map((id) => PRODUCTS.find((p) => p.id === id)).filter((p): p is Product => Boolean(p))

/**
 * The assortment starts with the two woods. Picking one takes the other card
 * off the screen and reveals the categories milled from the chosen wood;
 * closing it brings both back.
 */
export default function WoodSelector() {
  const [open, setOpen] = useState<SpeciesId | null>(null)
  const [detail, setDetail] = useState<Product | null>(null)
  // While one wood is open the other card is gone, so the open one takes the
  // full width rather than leaving a hole in the two-column grid.
  const shown = open === null ? SPECIES : SPECIES.filter((s) => s.id === open)

  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 md:gap-6">
        {shown.map(({ id, name, woods, Icon }, i) => {
          const isOpen = open === id
          return (
            <button
              key={id}
              type="button"
              onClick={() => setOpen((current) => (current === id ? null : id))}
              aria-expanded={isOpen}
              aria-controls={`wood-${id}`}
              style={{ animationDelay: `${0.04 + i * 0.06}s` }}
              className={`reveal group flex w-full flex-col rounded-3xl p-6 text-left transition-[color,background-color,box-shadow] duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold focus-visible:ring-offset-2 focus-visible:ring-offset-timber-ground md:p-9 ${
                isOpen
                  ? 'bg-timber-brown text-white shadow-[0_22px_48px_-26px_rgba(42,32,17,0.85)] md:col-span-2'
                  : 'card shadow-[inset_0_0_0_1px_rgba(42,32,17,0.14),0_24px_46px_-28px_rgba(42,32,17,0.6)] hover:shadow-[inset_0_0_0_1.5px_rgba(180,136,62,0.85),0_28px_52px_-28px_rgba(42,32,17,0.65)]'
              }`}
            >
              <span className="flex items-center gap-5 md:gap-6">
                {/* The icon sits on a tinted badge: bare gold lines on white only
                    reach 3:1, the deeper gold on its own tint is easy to see. */}
                <span
                  aria-hidden="true"
                  className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-colors duration-300 md:h-[4.5rem] md:w-[4.5rem] ${
                    isOpen ? 'bg-white/15 text-white' : 'bg-timber-gold/18 text-timber-ember'
                  }`}
                >
                  <Icon className="h-8 w-8 md:h-10 md:w-10" />
                </span>
                <span className="font-display font-bold uppercase leading-tight tracking-[0.02em]">
                  <span className="block text-xl md:text-[1.75rem]">{name}</span>
                  <span
                    className={`mt-1 block text-lg transition-colors duration-300 md:text-2xl ${
                      // A lighter gold than timber-sap: on the brown card the sap
                      // only reaches 3.3:1 against it.
                      isOpen ? 'text-[#e6cb9c]' : 'text-timber-ember'
                    }`}
                  >
                    <span className="sr-only"> — </span>
                    {woods}
                  </span>
                </span>
              </span>

              {/* The whole card is the button; this label is what says so. */}
              <span
                className={`mt-6 flex min-h-[52px] items-center justify-center gap-2.5 rounded-full px-6 font-sans text-[0.8rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 md:mt-8 ${
                  isOpen
                    ? 'bg-white text-timber-bark group-hover:bg-timber-paper'
                    : 'bg-timber-brown text-white group-hover:bg-timber-bark'
                }`}
              >
                {isOpen ? 'Скрий изделията' : 'Виж изделията'}
                <ChevronDownIcon
                  className={`h-4 w-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
              </span>
            </button>
          )
        })}
      </div>

      {/* The region stays in the DOM for as long as its button does, so
          aria-controls always resolves; the cards mount on opening, which is
          what plays their entrance. */}
      {shown.map(({ id, name, products }) => (
        <div key={id} id={`wood-${id}`} role="region" aria-label={`Изделия — ${name}`} hidden={open !== id}>
          {open === id && (
            <div className="mt-3 md:mt-5">
              <CategoryGrid products={byId(products)} onOpen={setDetail} />
            </div>
          )}
        </div>
      ))}

      {open === null && (
        <p className="mt-6 font-sans text-base text-timber-bark/80">
          Изберете вид дървесина, за да видите изделията от нея.
        </p>
      )}

      <ProductDialog product={detail} onClose={() => setDetail(null)} />
    </div>
  )
}
