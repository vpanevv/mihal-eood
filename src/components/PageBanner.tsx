import { Link } from 'react-router-dom'
import { thumbFor } from '../data/gallery'

type Props = {
  /** Rendered plain, then the accent half in gold. */
  title: string
  accent?: string
  image: string
  /** Alt text is empty: the photo is decoration behind the page title. */
  crumb: string
}

/** The dark photo band that opens every page except the landing one. */
export default function PageBanner({ title, accent, image, crumb }: Props) {
  return (
    <section className="hero-fallback relative isolate flex h-[270px] items-end overflow-hidden md:h-[340px]">
      <img
        src={thumbFor(image)}
        srcSet={`${thumbFor(image)} 640w, ${image} 1200w`}
        sizes="100vw"
        alt=""
        aria-hidden="true"
        decoding="async"
        {...{ fetchpriority: 'high' }}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-timber-bark/55" />
      <div className="absolute inset-0 bg-gradient-to-t from-timber-bark/85 via-timber-bark/25 to-timber-bark/45" />
      <div className="hero-grain absolute inset-0 opacity-[0.07]" />

      <div className="relative mx-auto w-full max-w-[1200px] px-5 pb-8 md:px-8 md:pb-12">
        <p className="fade-up font-sans text-[0.66rem] uppercase tracking-[0.24em] text-white/70">
          <Link to="/" className="transition-colors hover:text-timber-sap">
            Начало
          </Link>
          <span aria-hidden="true"> · </span>
          {crumb}
        </p>
        <h1
          className="fade-up mt-3 font-display text-[clamp(2.1rem,8.5vw,4rem)] font-bold uppercase leading-[0.95] tracking-[0.005em] text-white"
          style={{ animationDelay: '0.08s' }}
        >
          {title}
          {accent && <span className="text-timber-sap"> {accent}</span>}
        </h1>
      </div>
    </section>
  )
}
