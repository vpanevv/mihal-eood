import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'
import PhotoShowcase from './PhotoShowcase'
import { inquiryHref, photosOf, type Product } from '../data/products'

type Props = {
  product: Product
  /** Opens the size popup, where sizes are picked and added to the inquiry. */
  onSizes: () => void
}

/** A chosen product on the Products page: pick a size or ask, then every photograph of it. */
export default function ProductShowcase({ product, onSizes }: Props) {
  return (
    <PhotoShowcase
      title={product.name}
      summary={product.summary}
      photos={photosOf(product)}
      actions={(light, close) => (
        <>
          <button
            type="button"
            onClick={() => {
              close?.()
              onSizes()
            }}
            className={`btn ${light ? 'btn-gold' : 'btn-primary'}`}
          >
            Избери размер
            <ArrowIcon className="h-4 w-4" />
          </button>
          <Link to={inquiryHref(product.id)} className={`btn ${light ? 'btn-outline-light' : 'btn-outline'}`}>
            Запитване
          </Link>
        </>
      )}
      empty={
        <p className="rounded-3xl border-2 border-dashed border-timber-bark/15 px-6 py-12 text-center font-sans text-[0.95rem] font-light text-timber-bark/70">
          Все още няма снимки на този продукт.
        </p>
      }
    />
  )
}
