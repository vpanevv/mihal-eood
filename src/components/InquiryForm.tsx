import { useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { CheckIcon, PaperclipIcon } from './Icons'
import { EMAIL, PHONE_DISPLAY } from '../data/company'
import { PRODUCTS } from '../data/products'

/**
 * Netlify Forms. Netlify registers a form by reading static HTML at deploy
 * time, and this one is rendered by React, so a hidden twin with the same name
 * and fields sits in index.html. The submission is sent as multipart form data
 * — that is what carries the attachment — and the email to the yard is a form
 * notification configured in the Netlify UI.
 */
const FORM_NAME = 'contact'
const HONEYPOT = 'bot-field'
/** Netlify accepts up to 8 MB per submission; stay under it with room to spare. */
const MAX_FILE_BYTES = 7 * 1024 * 1024
const ACCEPT = '.pdf,.xls,.xlsx,.jpg,.jpeg,.png'

type Fields = { name: string; phone: string; email: string; material: string; message: string }
type Errors = Partial<Record<keyof Fields | 'attachment', string>>

const EMPTY: Fields = { name: '', phone: '', email: '', material: '', message: '' }

// Permissive on purpose: digits, spaces, dashes, brackets and a leading +.
const PHONE_RE = /^\+?[\d\s()-]{8,18}$/
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function validate(values: Fields): Errors {
  const errors: Errors = {}
  if (values.name.trim().length < 2) errors.name = 'Моля, въведете име (поне 2 символа).'
  if (!values.phone.trim()) errors.phone = 'Моля, въведете телефон, за да ви върнем оферта.'
  else if (!PHONE_RE.test(values.phone.trim())) errors.phone = 'Моля, проверете телефонния номер.'
  if (values.email.trim() && !EMAIL_RE.test(values.email.trim()))
    errors.email = 'Моля, въведете валиден е-мейл адрес.'
  if (values.message.trim().length < 10)
    errors.message = 'Опишете накратко какво ви трябва (поне 10 символа).'
  return errors
}

export default function InquiryForm() {
  const [params] = useSearchParams()
  const preselected = PRODUCTS.some((p) => p.id === params.get('material')) ? params.get('material')! : ''

  const [values, setValues] = useState<Fields>({ ...EMPTY, material: preselected })
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [failed, setFailed] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  // Bots fill every field they find; people never see this one.
  const honeypot = useRef<HTMLInputElement>(null)

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    const next = { ...values, [key]: value }
    setValues(next)
    setSent(false)
    // Only re-validate live once they have tried to submit, so the form does
    // not shout at someone still filling in the first field.
    if (submitted) setErrors({ ...validate(next), attachment: errors.attachment })
  }

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setFileName(null)
      setErrors((prev) => ({ ...prev, attachment: undefined }))
      return
    }
    if (file.size > MAX_FILE_BYTES) {
      e.target.value = ''
      setFileName(null)
      setErrors((prev) => ({ ...prev, attachment: 'Файлът е над 7 MB. Изпратете го на ' + EMAIL }))
      return
    }
    setFileName(file.name)
    setErrors((prev) => ({ ...prev, attachment: undefined }))
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (sending) return
    setSubmitted(true)
    setFailed(null)

    if (honeypot.current?.value) return // silently drop bot submissions

    const found = validate(values)
    setErrors({ ...found, attachment: errors.attachment })
    if (Object.keys(found).length > 0 || errors.attachment) {
      document.querySelector<HTMLElement>('[data-error="true"]')?.focus()
      return
    }

    const material = PRODUCTS.find((p) => p.id === values.material)
    // FormData rather than url-encoded: it is what carries the attachment, and
    // the browser sets the multipart boundary itself — never set it by hand.
    const body = new FormData()
    body.set('form-name', FORM_NAME)
    body.set(HONEYPOT, '')
    body.set('name', values.name.trim())
    body.set('phone', values.phone.trim())
    body.set('email', values.email.trim())
    body.set('material', material ? material.name : 'Не е посочен')
    body.set('message', values.message.trim())
    const file = fileRef.current?.files?.[0]
    if (file) body.set('attachment', file)

    setSending(true)
    try {
      const res = await fetch('/', { method: 'POST', body })
      if (!res.ok) throw new Error(String(res.status))
      setSent(true)
      setValues(EMPTY)
      setErrors({})
      setFileName(null)
      setSubmitted(false)
      if (fileRef.current) fileRef.current.value = ''
    } catch {
      setFailed(
        `Съобщението не беше изпратено. Опитайте отново, обадете се на ${PHONE_DISPLAY} или ни пишете на ${EMAIL}.`,
      )
    } finally {
      setSending(false)
    }
  }

  const borderFor = (key: keyof Errors) =>
    errors[key] ? 'border-red-600/70' : 'border-timber-bark/15 focus:border-timber-gold'

  return (
    <form
      name={FORM_NAME}
      method="POST"
      data-netlify="true"
      netlify-honeypot={HONEYPOT}
      encType="multipart/form-data"
      noValidate
      onSubmit={onSubmit}
      className="card fade-up rounded-3xl p-6 md:p-10"
    >
      {/* Netlify matches the submission to its form by this field. */}
      <input type="hidden" name="form-name" value={FORM_NAME} />

      <p className="eyebrow">Запитване</p>
      <h2 className="mt-3 font-display text-[clamp(1.6rem,5.5vw,2.5rem)] font-bold uppercase leading-[1] text-timber-bark">
        Опишете какво
        <br />
        ви трябва
      </h2>

      {sent && (
        <p
          role="status"
          className="mt-7 flex items-start gap-2.5 rounded-xl border border-timber-gold/40 bg-timber-gold/10 px-4 py-3 font-sans text-[0.9rem] font-light text-timber-bark"
        >
          <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-timber-ember" />
          Запитването е изпратено. Ще се свържем с вас.
        </p>
      )}

      {failed && (
        <p
          role="alert"
          className="mt-7 rounded-xl border border-red-600/40 bg-red-600/10 px-4 py-3 font-sans text-[0.9rem] font-light text-timber-bark"
        >
          {failed}
        </p>
      )}

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="field-label">
            Име <span aria-hidden="true">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            value={values.name}
            onChange={(e) => set('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            data-error={!!errors.name}
            placeholder="Име и фамилия"
            className={`field ${borderFor('name')}`}
          />
          {errors.name && (
            <p id="name-error" className="mt-2 font-sans text-[0.8rem] text-red-700">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="field-label">
            Телефон <span aria-hidden="true">*</span>
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            required
            value={values.phone}
            onChange={(e) => set('phone', e.target.value)}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            data-error={!!errors.phone}
            placeholder="08XX XXX XXX"
            className={`field ${borderFor('phone')}`}
          />
          {errors.phone && (
            <p id="phone-error" className="mt-2 font-sans text-[0.8rem] text-red-700">
              {errors.phone}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="field-label">
            Е-мейл <span className="tracking-normal">(по желание)</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => set('email', e.target.value)}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            data-error={!!errors.email}
            placeholder="ime@primer.bg"
            className={`field ${borderFor('email')}`}
          />
          {errors.email && (
            <p id="email-error" className="mt-2 font-sans text-[0.8rem] text-red-700">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="material" className="field-label">
            Вид материал
          </label>
          <select
            id="material"
            name="material"
            value={values.material}
            onChange={(e) => set('material', e.target.value)}
            className={`field ${borderFor('material')}`}
          >
            <option value="">Изберете категория</option>
            {PRODUCTS.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="field-label">
          Размери, количество и населено място <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={values.message}
          onChange={(e) => set('message', e.target.value)}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          data-error={!!errors.message}
          placeholder="напр. греди 10×10×400 см, 12 м³, доставка до Банско"
          className={`field resize-y ${borderFor('message')}`}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 font-sans text-[0.8rem] text-red-700">
            {errors.message}
          </p>
        )}
      </div>

      {/* Attachment — a specification is usually a PDF or a spreadsheet. */}
      <div className="mt-5">
        <label
          htmlFor="attachment"
          className="flex cursor-pointer items-center gap-3 rounded-xl border border-dashed border-timber-bark/25 bg-timber-ground/50 px-4 py-4 transition-colors hover:border-timber-gold hover:bg-timber-ground"
        >
          <PaperclipIcon className="h-5 w-5 shrink-0 text-timber-ember" />
          <span className="font-sans text-[0.85rem] font-light text-timber-bark/75">
            {fileName ?? 'Прикачете спецификация (PDF, XLS, JPG) — по желание'}
          </span>
        </label>
        <input
          id="attachment"
          ref={fileRef}
          name="attachment"
          type="file"
          accept={ACCEPT}
          onChange={onFile}
          className="sr-only"
          aria-describedby={errors.attachment ? 'attachment-error' : undefined}
        />
        {errors.attachment && (
          <p id="attachment-error" className="mt-2 font-sans text-[0.8rem] text-red-700">
            {errors.attachment}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from people, irresistible to bots. Netlify discards
          any submission that fills it. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden">
        <label htmlFor={HONEYPOT}>Не попълвайте това поле</label>
        <input id={HONEYPOT} name={HONEYPOT} type="text" tabIndex={-1} autoComplete="off" ref={honeypot} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <button type="submit" disabled={sending} className="btn btn-primary w-full sm:w-auto">
          {sending ? 'Изпращане…' : 'Изпрати запитване'}
        </button>
        <p className="font-sans text-[0.78rem] font-light text-timber-bark/70">
          Полетата с <span aria-hidden="true">*</span> са задължителни.
        </p>
      </div>
    </form>
  )
}
