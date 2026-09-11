type Props = {
  /** Path under /public. */
  src: string
  /** Extra darkening for pages that carry body copy rather than a headline. */
  strength?: 'hero' | 'copy' | 'dark'
}

/**
 * The shared photographic backdrop: the image, a warm multiply, a vertical
 * fall-off, a vignette and film grain. Extracted so the hero and the About
 * page tint identically instead of drifting apart.
 */
const TINTS: Record<NonNullable<Props['strength']>, string> = {
  hero: 'bg-gradient-to-b from-timber-bark/40 via-timber-bark/10 to-timber-bark/60',
  copy: 'bg-timber-bark/60',
  // Pages using this tier put some text straight on the backdrop rather than
  // on a panel, so it cannot go as light as the others. Even at 82% of the new
  // brown it reads far brighter than 90% of the old near-black did.
  dark: 'bg-timber-bark/82',
}

export default function TintedBackdrop({ src, strength = 'hero' }: Props) {
  return (
    <>
      <img
        src={src}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-[#4a3116] opacity-20 mix-blend-multiply" />
      <div className={`absolute inset-0 ${TINTS[strength]}`} />
      <div className="white-wash absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-grain absolute inset-0 opacity-[0.14] mix-blend-overlay" />
    </>
  )
}
