import { Link } from 'react-router-dom'
import { ArrowIcon } from './Icons'
import DialogShell from './DialogShell'
import PhotoCarousel from './PhotoCarousel'
import { inquiryHref } from '../data/products'
import { photosOf, type Service } from '../data/services'

type Props = {
  service: Service | null
  onClose: () => void
}

/** The popup behind a service card: its photographs, the full description, a way to ask. */
export default function ServiceDialog({ service, onClose }: Props) {
  if (!service) return null

  const { title, text, Icon } = service
  const photos = photosOf(service)

  return (
    <DialogShell open onClose={onClose} titleId="service-dialog-title">
      {photos.length > 0 ? (
        <PhotoCarousel key={title} photos={photos} alt={title} />
      ) : (
        // Not photographed yet: the service's own mark stands in, on the same
        // footprint as a photograph so the popup keeps its shape.
        <div className="flex aspect-[19/9] w-full items-center justify-center rounded-t-3xl bg-timber-ground">
          <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-timber-gold/18 text-timber-ember">
            <Icon className="h-12 w-12" />
          </span>
        </div>
      )}

      <div className="p-7 md:p-9">
        <h2
          id="service-dialog-title"
          className="pr-12 font-display text-2xl font-bold uppercase tracking-[0.02em] text-timber-bark md:text-3xl"
        >
          {title}
        </h2>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-timber-gold/60 via-timber-gold/20 to-transparent" />

        <p className="mt-6 font-serif text-[1.02rem] leading-[1.75] text-timber-bark/85">{text}</p>

        <Link to={inquiryHref()} onClick={onClose} className="btn btn-primary mt-8 w-full">
          Запитване за тази услуга
          <ArrowIcon className="h-4 w-4" />
        </Link>
      </div>
    </DialogShell>
  )
}
