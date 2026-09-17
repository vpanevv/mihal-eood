import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'
import { inquiryHref, PRODUCTS, type Product } from '../data/products'

type Props = {
  products?: Product[]
  /** The products page opens a specification dialog; the home page just links on. */
  onOpen?: (product: Product) => void
}

export default function CategoryGrid({ products = PRODUCTS, onOpen }: Props) {
  if (products.length === 0) {
    return (
      <p className="py-14 text-center font-sans text-[0.95rem] font-light text-timber-bark/70">
        Няма категории в тази група.
      </p>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-5 lg:grid-cols-3">
      {products.map((product, i) => {
        const { id, name, summary, Icon } = product
        return (
          <article
            key={id}
            className="card fade-up flex flex-col rounded-2xl p-5 md:p-7"
            style={{ animationDelay: `${0.04 + i * 0.05}s` }}
          >
            <Icon className="h-8 w-8 text-timber-gold md:h-9 md:w-9" />
            <h3 className="mt-5 font-display text-lg font-bold uppercase leading-tight tracking-[0.03em] text-timber-bark md:text-xl">
              {name}
            </h3>
            <p className="mt-2.5 grow font-sans text-[0.85rem] font-light leading-[1.65] text-timber-bark/70">
              {summary}
            </p>

            {/* Both controls are at least 44px tall, so they are an easy
                thumb target rather than a line of text to aim at. */}
            <div className="mt-4 flex flex-wrap items-center gap-x-5 border-t border-timber-bark/10 pt-1">
              {onOpen && (
                <button
                  type="button"
                  onClick={() => onOpen(product)}
                  className="inline-flex min-h-[44px] items-center font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-timber-bark/70 underline-offset-4 transition-colors hover:text-timber-bark hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold"
                >
                  Размери
                </button>
              )}
              <Link
                to={inquiryHref(id)}
                className="group/link ml-auto inline-flex min-h-[44px] items-center gap-2 font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-timber-ember transition-colors hover:text-timber-bark"
              >
                Запитване
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1" />
              </Link>
            </div>
          </article>
        )
      })}
    </div>
  )
}
