import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { ArrowIcon, CloseIcon } from './Icons'
import { useFocusTrap } from '../utils/useFocusTrap'
import SizeComposer, { EMPTY_DRAFT, type Draft } from './SizeComposer'
import { inquiryHref, sizeField, variantOf, type Product } from '../data/products'

type Props = {
  product: Product | null
  onClose: () => void
}

export default function ProductDialog({ product, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<Element | null>(null)
  // The size being put together in the composer below the specs; the chips in
  // the specs fill it. Starts fresh for every product.
  const [draft, setDraft] = useState<Draft>(EMPTY_DRAFT)
  const [variant, setVariant] = useState<string | undefined>()

  useEffect(() => {
    setDraft(EMPTY_DRAFT)
    setVariant(undefined)
  }, [product])

  useEffect(() => {
    if (!product) return

    lastFocused.current = document.activeElement
    closeRef.current?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKey)
      // Send focus back to whatever opened the dialog.
      ;(lastFocused.current as HTMLElement | null)?.focus?.()
    }
  }, [product, onClose])

  useFocusTrap(dialogRef, product !== null)

  if (!product) return null

  const tappable = product.groups.some((g) => g.specs.some((sp) => sp.values.some((v) => sizeField(sp, v))))

  const pick = (field: keyof Draft, value: string, group: Product['groups'][number]) => {
    setDraft((d) => ({ ...d, [field]: d[field] === value ? '' : value }))
    // A product that mixes woods (pine here, oak there) needs to say which.
    const v = variantOf(group)
    if (v) setVariant(v)
  }

  // Portalled to <body>: the page's <main> is its own stacking context, so a
  // dialog rendered inside it can never rise above the fixed nav.
  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-dialog-title"
    >
      {/* Click-away layer */}
      <button
        type="button"
        aria-label="Затвори"
        tabIndex={-1}
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-timber-bark/70"
      />

      {/* Opaque white rather than blurred glass: a full-screen backdrop blur
          re-renders the page behind on every frame and stutters on phones. */}
      <div className="card pop-in relative max-h-full w-full max-w-lg overflow-y-auto rounded-3xl">
        {/* A photograph of the product leads, where there is one; otherwise the
            milled profile does. */}
        {product.photo ? (
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-3xl bg-timber-bark/5">
            <img
              src={product.photo}
              srcSet={`${product.photo.replace(/\.jpg$/, '-800.jpg')} 800w, ${product.photo} 1200w`}
              sizes="(min-width: 640px) 512px, 92vw"
              alt={product.name}
              width={1200}
              height={1600}
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
          </div>
        ) : (
          product.drawing && (
            <div className="profile-band relative aspect-[19/9] w-full overflow-hidden rounded-t-3xl">
              <img
                src={product.drawing}
                alt={`Профил на ${product.name}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
          )
        )}

        <div className="p-7 md:p-9">
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Затвори"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-timber-bark/15 bg-white text-timber-bark transition-colors hover:border-timber-bark hover:bg-timber-bark hover:text-white"
          >
            <CloseIcon className="h-4 w-4" />
          </button>

          <h2
            id="product-dialog-title"
            className="pr-12 font-display text-2xl font-bold uppercase tracking-[0.02em] text-timber-bark md:text-3xl"
          >
            {product.name}
          </h2>

          <div className="mt-5 h-px w-full bg-gradient-to-r from-timber-gold/60 via-timber-gold/20 to-transparent" />

          {product.note && (
            <p className="mt-6 font-sans text-[0.95rem] font-light leading-[1.8] text-timber-bark/75">
              {product.note}
            </p>
          )}

          {product.groups.map((group, i) => (
            <div key={group.title ?? i} className={i === 0 && !product.note ? 'mt-6' : 'mt-7'}>
              {group.title && (
                <h3 className="font-display text-lg font-bold uppercase tracking-[0.12em] text-timber-ember">
                  {group.title}
                </h3>
              )}
              <dl className={group.title ? 'mt-3 space-y-3' : 'space-y-3'}>
                {group.specs.map((spec) => (
                  <div key={spec.label} className="flex flex-wrap items-center gap-x-3 gap-y-2">
                    <dt className="font-sans text-[0.9rem] font-light text-timber-bark/70">
                      {spec.label}
                    </dt>
                    <dd className="flex flex-wrap items-center gap-1.5">
                      {spec.values.map((value) => {
                        const text = spec.unit ? `${value} ${spec.unit}` : value
                        const field = sizeField(spec, value)
                        if (!field) {
                          return (
                            <span
                              key={value}
                              className="rounded-lg bg-timber-gold/12 px-2.5 py-1 font-sans text-[0.9rem] font-medium text-timber-bark ring-1 ring-inset ring-timber-gold/40"
                            >
                              {text}
                            </span>
                          )
                        }
                        const on = draft[field] === value
                        return (
                          <button
                            key={value}
                            type="button"
                            aria-pressed={on}
                            aria-label={`${spec.label} ${text}`}
                            onClick={() => pick(field, value, group)}
                            className={`min-h-[44px] rounded-lg px-3 py-1 font-sans text-[0.9rem] font-medium ring-1 ring-inset transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-timber-gold md:min-h-[40px] ${
                              on
                                ? 'bg-timber-brown text-white ring-timber-brown'
                                : 'bg-timber-gold/12 text-timber-bark ring-timber-gold/40 hover:bg-timber-gold/25'
                            }`}
                          >
                            {text}
                          </button>
                        )
                      })}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}

          <SizeComposer
            product={product}
            draft={draft}
            onDraft={setDraft}
            variant={variant}
            tappable={tappable}
            onAdded={() => setVariant(undefined)}
            onClose={onClose}
          />

          <Link to={inquiryHref(product.id)} onClick={onClose} className="btn btn-primary mt-6 w-full">
            Запитване за тази категория
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>,
    document.body,
  )
}
