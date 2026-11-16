import { useMemo, useState, type CSSProperties } from 'react'
import { Link } from 'react-router-dom'
import { ArrowIcon, ExpandIcon } from './Icons'
import Lightbox from './Lightbox'
import { inquiryHref, photosOf, type Photo, type Product } from '../data/products'
import { pack, S, type Placement, type Span } from '../utils/bento'
import type { GalleryImage } from '../data/gallery'

type Props = {
  product: Product
  /** Opens the size popup, where sizes are picked and added to the inquiry. */
  onSizes: () => void
}

const mdFor = (src: string) => src.replace(/\.jpg$/, '-800.jpg')

/**
 * The grid for one product. Every photograph here is upright, so the layout is
 * chosen by how many there are: one fills the width, two or three stand side
 * by side, four and more go into the bento with the first one large. On a
 * phone, two columns; a lone photo takes the whole width.
 */
function arrange(n: number) {
  const one = [S.one]
  if (n === 1) return { dc: 2, dr: 0.62, pc: 1, pr: 1.25, desktop: [[S.big]], phone: [one] }
  if (n === 2) return { dc: 2, dr: 1.2, pc: 2, pr: 1.4, desktop: [one, one], phone: [one, one] }
  if (n === 3) return { dc: 3, dr: 1.3, pc: 2, pr: 1.25, desktop: [one, one, one], phone: [[S.wide], one, one] }
  const rest = (o: Span[]) => Array.from({ length: n - 1 }, () => o)
  return {
    dc: 4,
    dr: 0.78,
    pc: 2,
    pr: 1.25,
    desktop: [[S.big], ...rest([S.tall, S.one, S.big])],
    phone: [[S.big], ...rest([S.one, S.tall, S.big])],
  }
}

const line = ({ col, row, c, r }: Placement) => ({ column: `${col} / span ${c}`, row: `${row} / span ${r}` })

/**
 * A chosen product on the Products page: what it is and what to do next at
 * the top, then every photograph of it. A tap on a photo opens it large, with
 * the same two actions underneath.
 */
export default function ProductShowcase({ product, onSizes }: Props) {
  const [zoomed, setZoomed] = useState<number | null>(null)
  const photos: Photo[] = photosOf(product)

  const tiles = useMemo(() => {
    if (photos.length === 0) return null
    const a = arrange(photos.length)
    const d = pack(a.desktop, a.dc)
    const p = pack(a.phone, a.pc)
    return { ...a, d, p }
  }, [photos])

  // The viewer's shape: the full file large, the 800px copy for its strip.
  const images: GalleryImage[] = photos.map(({ src }, i) => ({
    srcUrl: src,
    thumbUrl: mdFor(src),
    smUrl: mdFor(src),
    alt: `${product.name} — снимка ${i + 1}`,
    width: 1200,
    height: 1600,
  }))

  const buttons = (light: boolean, onAction?: () => void) => (
    <>
      <button
        type="button"
        onClick={() => {
          onAction?.()
          onSizes()
        }}
        className={`btn ${light ? 'btn-gold' : 'btn-primary'}`}
      >
        Избери размер
        <ArrowIcon className="h-4 w-4" />
      </button>
      <Link to={inquiryHref(product.id)} className={`btn ${light ? 'btn-outline-light' : 'btn-outline'}`}>
        Запитване
      </Link>
    </>
  )

  return (
    <section aria-labelledby="showcase-title" className="pop-in">
      <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-10">
        <div className="min-w-0">
          <span aria-hidden="true" className="block h-[3px] w-12 rounded-full bg-timber-gold" />
          <h2
            id="showcase-title"
            className="mt-4 font-display text-[clamp(2rem,5vw,3.25rem)] font-bold uppercase leading-[1.05] text-timber-bark"
          >
            {product.name}
          </h2>
          <p className="mt-3 max-w-[60ch] font-sans text-[0.95rem] font-light leading-[1.7] text-timber-bark/75">
            {product.summary}
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row">{buttons(false)}</div>
      </header>

      {tiles ? (
        <div
          className="pgrid mt-8 md:mt-10"
          style={{ '--dc': tiles.dc, '--dr': tiles.dr, '--pc': tiles.pc, '--pr': tiles.pr } as CSSProperties}
        >
          {photos.map(({ src, focus }, i) => {
            const d = line(tiles.d[i])
            const p = line(tiles.p[i])
            const wide = tiles.d[i].c === 2 || tiles.dc <= 2
            return (
              <button
                key={src}
                type="button"
                onClick={(e) => {
                  // Safari does not focus a button on click; the viewer and the
                  // size popup hand focus back to whatever had it, so make that
                  // this photo.
                  e.currentTarget.focus()
                  setZoomed(i)
                }}
                aria-label={`Отвори снимка ${i + 1} — ${product.name}`}
                style={{ '--c': d.column, '--r': d.row, '--cm': p.column, '--rm': p.row } as CSSProperties}
                className="group relative overflow-hidden rounded-xl bg-timber-bark/5 ring-1 ring-timber-bark/10 transition-shadow duration-500 hover:ring-timber-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold md:rounded-2xl"
              >
                <img
                  src={mdFor(src)}
                  srcSet={`${mdFor(src)} 800w, ${src} 1200w`}
                  sizes={wide ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw'}
                  alt=""
                  width={1200}
                  height={1600}
                  loading={i < 2 ? 'eager' : 'lazy'}
                  decoding="async"
                  {...(i < 2 ? {} : { fetchpriority: 'low' })}
                  style={{ objectPosition: focus ?? '50% 50%' }}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-timber-bark/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100" />
                <span className="pointer-events-none absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white/90 text-timber-bark opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                  <ExpandIcon className="h-4 w-4" />
                </span>
              </button>
            )
          })}
        </div>
      ) : (
        <p className="mt-8 rounded-3xl border-2 border-dashed border-timber-bark/15 px-6 py-12 text-center font-sans text-[0.95rem] font-light text-timber-bark/70 md:mt-10">
          Все още няма снимки на този продукт.
        </p>
      )}

      <Lightbox
        images={images}
        index={zoomed}
        onClose={() => setZoomed(null)}
        onStep={(step) => setZoomed((i) => (i === null ? i : (i + step + images.length) % images.length))}
        actions={buttons(true, () => setZoomed(null))}
      />
    </section>
  )
}
