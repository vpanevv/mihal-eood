import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'
import PhotoCarousel from './PhotoCarousel'
import { inquiryHref, photosOf, type Product } from '../data/products'

type Props = {
  product: Product
  /** Opens the full specification popup, where sizes are picked and added. */
  onOpen: () => void
}

/**
 * One product, given the whole width: its photographs on one side, what it is
 * and the sizes it comes in on the other. Shown on the Products page once a
 * product has been chosen from the selector.
 */
export default function ProductFeature({ product, onOpen }: Props) {
  const { name, summary, note, groups, Icon } = product
  const photos = photosOf(product)
  // Every size the product lists, flattened for a quick read; the popup keeps
  // them grouped by wood.
  const specs = groups.flatMap((g) => g.specs)

  return (
    <article
      aria-labelledby="feature-title"
      className="card pop-in grid overflow-hidden rounded-3xl md:grid-cols-2"
    >
      {photos.length > 0 ? (
        <PhotoCarousel key={product.id} photos={photos} alt={name} rounded="rounded-t-3xl md:rounded-none" />
      ) : (
        // Not photographed yet: the product's own mark on the same footprint.
        <div className="flex aspect-[4/3] items-center justify-center bg-timber-ground md:aspect-auto md:min-h-[420px]">
          <span className="flex h-28 w-28 items-center justify-center rounded-3xl bg-timber-gold/18 text-timber-ember">
            <Icon className="h-14 w-14" />
          </span>
        </div>
      )}

      <div className="flex flex-col p-7 md:p-10 lg:p-12">
        <span aria-hidden="true" className="block h-[3px] w-12 rounded-full bg-timber-gold" />
        <h2
          id="feature-title"
          className="mt-5 font-display text-[clamp(1.9rem,4.5vw,2.75rem)] font-bold uppercase leading-[1.05] text-timber-bark"
        >
          {name}
        </h2>
        <p className="mt-3 font-sans text-[0.95rem] font-light leading-[1.7] text-timber-bark/75">{summary}</p>

        {note && (
          <p className="mt-6 font-serif text-[1.02rem] leading-[1.75] text-timber-bark/85">{note}</p>
        )}

        {specs.length > 0 && (
          <dl className="mt-7 divide-y divide-timber-bark/10 border-y border-timber-bark/10">
            {specs.map((spec, i) => (
              <div key={`${spec.label}-${i}`} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-3">
                <dt className="font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-timber-ember">
                  {spec.label}
                </dt>
                <dd className="font-sans text-[0.95rem] text-timber-bark">
                  {spec.values.join(' · ')}
                  {spec.unit && ` ${spec.unit}`}
                </dd>
              </div>
            ))}
          </dl>
        )}

        <div className="mt-auto flex flex-col gap-3 pt-8 sm:flex-row">
          <button type="button" onClick={onOpen} className="btn btn-primary">
            Избери размери
            <ArrowIcon className="h-4 w-4" />
          </button>
          <Link to={inquiryHref(product.id)} className="btn btn-outline">
            Запитване
          </Link>
        </div>
      </div>
    </article>
  )
}
