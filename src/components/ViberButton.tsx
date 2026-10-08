import { ViberIcon } from './Icons'
import { VIBER_HREF } from '../data/company'

type Props = {
  /** The .btn variant classes, so it sits in whichever row it is placed in. */
  className?: string
  /** Icon alone, for a bar where a word will not fit; the name moves to aria-label. */
  iconOnly?: boolean
  children?: string
}

/**
 * Builders would rather send a photo of a sketch than type it out, and most of
 * them do it on Viber. This sits beside the phone number everywhere it is shown.
 */
export default function ViberButton({ className = '', iconOnly = false, children = 'Viber' }: Props) {
  return (
    <a
      href={VIBER_HREF}
      aria-label={iconOnly ? 'Пиши ни във Viber' : undefined}
      className={`btn ${className}`}
    >
      <ViberIcon className="h-4 w-4" />
      {!iconOnly && children}
    </a>
  )
}
