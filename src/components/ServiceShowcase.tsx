import { Link } from 'react-router-dom'
import { ArrowIcon, PhoneIcon } from './Icons'
import PhotoShowcase from './PhotoShowcase'
import { inquiryHref } from '../data/products'
import { PHONE_DISPLAY, PHONE_HREF } from '../data/company'
import { photosOf, type Service } from '../data/services'

/** A chosen service on the Услуги page: what it is, how to ask for it, then every photograph of it. */
export default function ServiceShowcase({ service }: { service: Service }) {
  const { title, text, Icon } = service
  return (
    <PhotoShowcase
      title={title}
      summary={text}
      photos={photosOf(service)}
      actions={(light, close) => (
        <>
          <Link to={inquiryHref()} onClick={close} className={`btn ${light ? 'btn-gold' : 'btn-primary'}`}>
            Запитване за тази услуга
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <a href={PHONE_HREF} className={`btn ${light ? 'btn-outline-light' : 'btn-outline'}`}>
            <PhoneIcon className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </>
      )}
      // Not photographed yet: the service's own mark holds the place of the grid.
      empty={
        <div className="flex min-h-[260px] flex-col items-center justify-center rounded-3xl bg-timber-ground px-6 py-12 text-center md:min-h-[340px]">
          <span className="flex h-24 w-24 items-center justify-center rounded-3xl bg-timber-gold/18 text-timber-ember">
            <Icon className="h-12 w-12" />
          </span>
          <p className="mt-5 max-w-[38ch] font-sans text-[0.95rem] font-light leading-[1.7] text-timber-bark/70">
            Снимки на тази услуга предстоят — обадете се и ще ви разкажем повече.
          </p>
        </div>
      }
    />
  )
}
