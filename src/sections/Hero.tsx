import { useState } from 'react'
import { Link } from 'react-router-dom'

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

export default function Hero() {
  // If the photo is missing the gradient fallback shows through instead of a broken image.
  const [photoFailed, setPhotoFailed] = useState(false)

  return (
    <section className="hero-fallback relative h-svh min-h-[560px] w-full overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-b from-timber-bark/40 via-timber-bark/10 to-timber-bark/60" />
      <div className="hero-scrim absolute inset-0" />
      <div className="hero-vignette absolute inset-0" />
      <div className="hero-grain absolute inset-0 opacity-[0.07]" />

      {/* Headline + CTA */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Wraps to two lines on phones, so it can be sized far larger there than the one-line desktop setting */}
        <h1 className="text-center font-display text-[clamp(3rem,16vw,6rem)] font-bold uppercase leading-[0.86] tracking-[0.005em] text-white [text-shadow:0_2px_40px_rgba(18,12,4,0.55)] md:text-[min(10.5vw,12rem)]">
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
            the button, so the three read in order. Breaks between the two
            sentences on phones rather than mid-phrase. */}
        <p
          className="fade-up mt-6 text-center font-display text-[clamp(1rem,4.6vw,1.35rem)] font-medium uppercase leading-[1.35] tracking-[0.14em] text-white/90 [text-shadow:0_2px_18px_rgba(18,12,4,0.6)] md:mt-8 md:text-[1.7rem] md:tracking-[0.16em]"
          style={{ animationDelay: '0.7s' }}
        >
          <span className="block sm:inline">Дърво с характер.</span>{' '}
          <span className="block sm:inline">Качество, което остава.</span>
        </p>

        {/* CTA — the light variant, since this one sits on a photograph rather
            than on paper like every other button on the site. */}
        <Link
          to="/products"
          className="cta-button cta-button--light fade-up mt-8 font-sans uppercase tracking-[0.14em] md:mt-10 md:tracking-[0.18em]"
          style={{ animationDelay: '0.9s' }}
        >
          <span>Разгледай нашите продукти</span>
        </Link>
      </div>

      {/* Hairline rule that hands the eye off to whatever section comes next */}
      <div
        className="fade-up absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-timber-sap/45 to-transparent"
        style={{ animationDelay: '1s' }}
      />
    </section>
  )
}
