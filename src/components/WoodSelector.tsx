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
      <div className="grid gap-3 md:grid-cols-2 md:gap-5">
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
              className={`fade-up group flex w-full flex-col rounded-2xl p-5 text-left transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold focus-visible:ring-offset-2 focus-visible:ring-offset-timber-ground md:p-7 ${
                isOpen
                  ? 'bg-timber-brown text-white shadow-[0_18px_40px_-24px_rgba(42,32,17,0.8)] md:col-span-2'
                  : 'card'
              }`}
            >
              <span className="flex items-center gap-4 md:gap-5">
                <Icon
                  className={`h-9 w-9 shrink-0 transition-colors duration-300 md:h-10 md:w-10 ${
                    isOpen ? 'text-white' : 'text-timber-gold'
                  }`}
                />
                <span className="font-display text-lg font-bold uppercase leading-tight tracking-[0.02em] md:text-2xl">
                  {name}
                  <span
                    className={`transition-colors duration-300 ${
                      // A lighter gold than timber-sap: on the brown card the sap
                      // only reaches 3.3:1 against it.
                      isOpen ? 'text-[#e6cb9c]' : 'text-timber-ember'
                    }`}
                  >
                    {' — '}
                    {woods}
                  </span>
                </span>
              </span>

              <span
                className={`mt-5 flex items-center justify-center gap-2 border-t pt-4 font-sans text-[0.68rem] font-medium uppercase tracking-[0.16em] transition-colors duration-300 ${
                  isOpen
                    ? 'border-white/20 text-white'
                    : 'border-timber-bark/10 text-timber-bark/70 group-hover:text-timber-bark'
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
        <p className="mt-5 font-sans text-[0.85rem] font-light text-timber-bark/70">
          Изберете вид дървесина, за да видите изделията от нея.
        </p>
      )}

      <ProductDialog product={detail} onClose={() => setDetail(null)} />
    </div>
  )
}
