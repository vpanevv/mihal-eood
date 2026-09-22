import { ArrowIcon } from './Icons'
import { thumbFor } from '../data/gallery'
import { PRODUCTS, type Product } from '../data/products'

type Props = {
  products?: Product[]
  /** Given, the whole card opens the specification dialog. */
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
        const { id, name, summary, photo, Icon } = product
        const body = (
          <>
            {photo ? (
              <span className="relative block aspect-[4/3] w-full overflow-hidden rounded-t-2xl bg-timber-bark/5">
                <img
                  src={thumbFor(photo)}
                  srcSet={`${thumbFor(photo)} 640w, ${photo} 1200w`}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                  alt={name}
                  width={1200}
                  height={1600}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </span>
            ) : null}

            <span className="flex grow flex-col p-5 md:p-7">
              {!photo && <Icon className="h-8 w-8 text-timber-gold md:h-9 md:w-9" />}

              <span
                className={`block font-display text-lg font-bold uppercase leading-tight tracking-[0.03em] text-timber-bark md:text-xl ${
                  photo ? '' : 'mt-5'
                }`}
              >
                {name}
              </span>
              <span className="mt-2.5 block grow font-sans text-[0.85rem] font-light leading-[1.65] text-timber-bark/70">
                {summary}
              </span>

              {onOpen && (
                <span className="mt-4 inline-flex min-h-[40px] items-center gap-2 border-t border-timber-bark/10 pt-4 font-sans text-[0.72rem] font-medium uppercase tracking-[0.16em] text-timber-bark/70 transition-colors group-hover:text-timber-bark">
                  Размери
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              )}
            </span>
          </>
        )

        const shared = 'card fade-up flex flex-col overflow-hidden rounded-2xl text-left'
        const style = { animationDelay: `${0.04 + i * 0.05}s` }

        return onOpen ? (
          <button
            key={id}
            type="button"
            onClick={() => onOpen(product)}
            style={style}
            className={`group ${shared} transition-shadow duration-300 hover:shadow-[0_18px_40px_-26px_rgba(42,32,17,0.7)] focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold focus-visible:ring-offset-2 focus-visible:ring-offset-timber-ground`}
          >
            {body}
          </button>
        ) : (
          <article key={id} style={style} className={shared}>
            {body}
          </article>
        )
      })}
    </div>
  )
}
