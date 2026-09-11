import { Link } from 'react-router-dom'

const HEADLINE = 'МИХАЛ ЕООД'

// Split into words so nothing breaks mid-word, but keep one running glyph
// counter across the whole line so the stagger reads as a single sweep.
const WORDS = (() => {
  let glyphIndex = 0
  return HEADLINE.split(' ').map((word) => ({
    word,
    glyphs: [...word].map((glyph) => ({ glyph, delay: 0.55 + glyphIndex++ * 0.055 })),
  }))
})()

export default function Hero() {
  return (
    <section className="white-wash relative h-svh min-h-[560px] w-full overflow-hidden bg-timber-paper">
      {/* Headline + CTA */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6">
        {/* Wraps to two lines on phones, so it can be sized far larger there than the one-line desktop setting */}
        <h1 className="text-center font-display text-[clamp(3rem,16vw,6rem)] font-bold uppercase leading-[0.86] tracking-[0.005em] text-timber-bark md:text-[min(10.5vw,12rem)]">
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

        {/* CTA */}
        <Link
          to="/products"
          className="cta-button fade-up mt-10 font-sans uppercase tracking-[0.14em] md:mt-12 md:tracking-[0.18em]"
          style={{ animationDelay: '1.5s' }}
        >
          <span>Разгледай нашите продукти</span>
        </Link>
      </div>

      {/* Hairline rule that hands the eye off to whatever section comes next */}
      <div
        className="fade-up absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-timber-ember/35 to-transparent"
        style={{ animationDelay: '1.6s' }}
      />
    </section>
  )
}
