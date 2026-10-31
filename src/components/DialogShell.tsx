import { useEffect, useRef, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { CloseIcon } from './Icons'
import { useFocusTrap } from '../utils/useFocusTrap'

type Props = {
  open: boolean
  onClose: () => void
  /** id of the heading inside `children`, which names the dialog. */
  titleId: string
  children: ReactNode
}

/**
 * The frame every detail popup shares: a modal on <body>, a dimmed backdrop
 * that closes it, Escape, a focus trap, a locked page behind it, and focus sent
 * back to whatever opened it. The content is the caller's.
 */
export default function DialogShell({ open, onClose, titleId, children }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<Element | null>(null)

  useEffect(() => {
    if (!open) return

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
  }, [open, onClose])

  useFocusTrap(dialogRef, open)

  if (!open) return null

  // Portalled to <body>: the page's <main> is its own stacking context, so a
  // dialog rendered inside it can never rise above the fixed nav.
  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
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
        {children}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Затвори"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-timber-bark/15 bg-white text-timber-bark transition-colors hover:border-timber-bark hover:bg-timber-bark hover:text-white"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>,
    document.body,
  )
}
