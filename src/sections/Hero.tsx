import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PhoneIcon } from '../components/Icons'
import { PHONE_DISPLAY, PHONE_HREF } from '../data/company'

const HEADLINE = 'МИХАЛ ЕООД'

// Split into words so nothing breaks mid-word, but keep one running glyph
// counter across the whole line so the stagger reads as a single sweep.
const WORDS = (() => {
  let glyphIndex = 0
  return HEADLINE.split(' ').map((word) => ({
    word,
    glyphs: [...word].map((glyph) => ({ glyph, delay: 0.25 + glyphIndex++ * 0.045 })),
  }))
})()

// The original yard photograph. hero.jpg is the q82 export of hero.png —
// pixel-identical at 1774x887, 362 KB against 2.1 MB. This is the landing
// page's LCP image, so it serves the export.
const HERO_IMAGE = '/images/hero.jpg'

const ADVANTAGES = ['Собствена складова база', 'Сушилня на място', 'Доставка в цялата страна']

export default function Hero() {
  // If the photo is missing the gradient fallback shows through instead of a broken image.
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section className="hero-fallback relative h-svh min-h-[600px] w-full overflow-hidden">
      {/* Photograph */}
      {!photoFailed && (
        <img
          src={HERO_IMAGE}
          alt=""
          aria-hidden="true"
          decoding="async"
          // Lowercase so React 18 passes it through; the camelCase prop is React 19+.
          {...{ fetchpriority: 'high' }}
          className="hero-kenburns absolute inset-0 h-full w-full object-cover object-center"
          onError={() => setPhotoFailed(true)}
        />
      )}

      {/* Tint: a warm wash, then a vertical fall-off so the type stays legible.
          Plain alpha layers, no blend modes — a multiply or overlay over the
          slowly scaling photo is re-blended across the whole screen every
          frame, which is what made the first seconds stutter on phones. */}
      <div className="absolute inset-0 bg-[#4a3116] opacity-15" />
      <div className="absolute inset-0 bg-gradient-to-b from-timber-bark/40 via-timber-bark/10 to-timber-bark/65" />
      <div className="hero-scrim absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-grain absolute inset-0 opacity-[0.07]" />

      {/* Headline, tagline, two buttons, three advantages */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-5 pb-20 pt-24">
        {/* Wraps to two lines on phones, so it can be sized far larger there than the one-line desktop setting */}
        <h1 className="text-center font-display text-[clamp(3rem,15vw,5.75rem)] font-bold uppercase leading-[0.86] tracking-[0.005em] text-white [text-shadow:0_2px_40px_rgba(18,12,4,0.55)] md:text-[min(10vw,11rem)]">
          <span className="sr-only">{HEADLINE}</span>
          {WORDS.map(({ word, glyphs }) => (
            <span key={word} aria-hidden="true" className="mx-[0.14em] inline-block whitespace-nowrap">
              {glyphs.map(({ glyph, delay }, i) => (
                <span
                  key={`${word}-${i}`}
                  className="inline-block overflow-hidden align-bottom pb-[0.06em]"
                >
                  <span className="glyph-rise inline-block" style={{ animationDelay: `${delay}s` }}>
                    {glyph}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        {/* Supporting line. Lands after the headline's glyph sweep and before
            the buttons, so the three read in order. */}
        <p
          className="fade-up mt-5 text-center font-display text-[clamp(0.95rem,4.2vw,1.3rem)] font-medium uppercase leading-[1.35] tracking-[0.14em] text-white/90 [text-shadow:0_2px_18px_rgba(18,12,4,0.6)] md:mt-7 md:text-[1.6rem] md:tracking-[0.16em]"
          style={{ animationDelay: '0.7s' }}
        >
          <span className="block sm:inline">Дърво с характер.</span>{' '}
          <span className="block sm:inline">Качество, което остава.</span>
        </p>

        <p
          className="fade-up mt-4 max-w-[46ch] text-center font-sans text-[0.9rem] font-light leading-[1.7] text-white/80 [text-shadow:0_1px_14px_rgba(18,12,4,0.7)] md:text-[1.05rem]"
          style={{ animationDelay: '0.8s' }}
        >
          Сух дървен материал от Разлог — дюшеме, ламперия, греди и слепени греди
        </p>

        <div
          className="fade-up mt-8 flex w-full max-w-md flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center md:mt-10"
          style={{ animationDelay: '0.9s' }}
        >
          <Link to="/products" className="btn btn-gold">
            Разгледай продуктите
          </Link>
          <a href={PHONE_HREF} className="btn btn-outline-light">
            <PhoneIcon className="h-4 w-4" />
            {PHONE_DISPLAY}
          </a>
        </div>

        <ul
          className="fade-up mt-9 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 md:mt-12"
          style={{ animationDelay: '1s' }}
        >
          {ADVANTAGES.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 font-sans text-[0.66rem] font-medium uppercase tracking-[0.18em] text-white/80 md:text-[0.72rem]"
            >
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-timber-gold" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      {/* The hand-off to the next section. No rule at all: three stacked
          layers blur the photograph harder and harder towards the bottom,
          each masked in so no layer shows an edge of its own, and a wash in
          the paper colour finishes it. The hero simply dissolves. */}
      <div aria-hidden="true" className="hero-edge pointer-events-none absolute inset-x-0 bottom-0 z-10">
        <span className="hero-edge__layer hero-edge__layer--soft" />
        <span className="hero-edge__layer hero-edge__layer--mid" />
        <span className="hero-edge__layer hero-edge__layer--deep" />
        <span className="hero-edge__wash" />
      </div>
    </section>
  )
}
