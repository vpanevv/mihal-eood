import { Link } from 'react-router-dom'
import { PhoneIcon } from './Icons'
import { PHONE_HREF } from '../data/company'

/**
 * Fixed bar on phones: the yard takes orders by telephone, so the number is
 * never more than one tap away, from any point on any page.
 */
export default function MobileActionBar() {
  return (
    <div
      // No backdrop blur: the bar is all but opaque, and a blurred backdrop on
      // a fixed element is re-computed on every scroll frame for nothing.
      className="fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-timber-bark/97 px-3 pt-3 lg:hidden"
      style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
    >
      <div className="mx-auto flex max-w-md gap-3">
        <a href={PHONE_HREF} className="btn btn-gold flex-1 !px-3">
          <PhoneIcon className="h-4 w-4" />
          Обади се
        </a>
        <Link to="/contacts#inquiry" className="btn btn-outline-light flex-1 !px-3">
          Запитване
        </Link>
      </div>
    </div>
  )
}
