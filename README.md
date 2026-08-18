# МИХАЛ ЕООД

Bulgarian-language site for a dry-timber merchant in Разлог. Vite + React +
Tailwind, deployed as a static SPA.

## Run

```bash
npm install
npm run dev
```

## Routes

| Path         | Page                                    |
| ------------ | --------------------------------------- |
| `/`          | Landing (hero)                          |
| `/products`  | Продукти — cards + spec dialogs         |
| `/gallery`   | Галерия — coverflow carousel + lightbox |
| `/about-us`  | За нас — swipeable card carousel        |
| `/contacts`  | Контакти — form + Google Maps           |

Client-side routing. **Static hosting needs a rewrite sending all paths to
`index.html`**, or a direct hit on `/products` 404s. Netlify: `/* /index.html 200`
in `_redirects`. Vercel and Cloudflare Pages handle SPAs automatically.

There is no catch-all route yet, so an unmatched path renders an empty page.

## Contact form

The form validates and composes a message, but a static site cannot send mail.
Submitting opens the visitor's mail client with a message to `mihaleood@gmail.com`
prefilled. Set `FORM_ENDPOINT` at the top of `src/pages/Contact.tsx` to a form
backend (Formspree, Web3Forms, or your own handler) and it POSTs there instead —
the success and error states for that path are already written.

Spam protection is a hidden honeypot field plus a required "Не съм робот"
checkbox. It is not Google reCAPTCHA, which needs a site key.

## Performance notes

Decisions here that are easy to undo by accident:

- **Routes are code-split** (`React.lazy` in `src/main.tsx`). The landing page
  ships 63 KB gzipped; framer-motion (43 KB gzipped) loads only when someone
  opens `/gallery`. Importing a page statically in `main.tsx` silently undoes this.
- **Fonts are self-hosted** in `public/fonts`, with the faces in `src/fonts.css`.
  This removes a render-blocking third-party stylesheet and two TLS handshakes.
  Only the `cyrillic` and `latin` subsets ship. To change weights, refetch from
  Google Fonts and regenerate that file.
- **No global image preload.** `hero.jpg` used to be preloaded in `index.html`,
  which cost every other route 362 KB it never displayed. The hero `<img>`
  carries `fetchpriority="high"` instead.
- **The nav's scroll tint is written straight to the DOM**, not through React
  state — driving it with `setState` re-rendered the whole nav on every scroll
  frame.
- **Gallery images**: only the centre card is `eager`; the rest are `lazy`.

## Images

`public/images/` holds the `.jpg`/`.jpeg` files the site serves. Keep gallery
photos at ~1000px on the long edge and under ~250 KB — one 5184px camera
original was 965 KB on its own.

`services.jpg` is 768×1024 portrait but is used as a full-screen backdrop on
three pages, so it upscales on desktop. A wider source would sharpen it.

Some `.png` masters sit alongside untracked; they are unused at runtime.

If the hero photo is missing the page falls back to a warm gradient
(`.hero-fallback` in `src/index.css`), so it never renders broken.

## Structure

- `src/sections/` — `Hero`, `Nav` (liquid glass bar + mobile menu), `Footer`
- `src/pages/` — one file per route
- `src/components/` — `TintedBackdrop` (shared photo + tint stack),
  `CardCarousel`, `CoverflowCarousel`, `ProductCard`, `ProductDialog`,
  `Lightbox`, `ScrollToTop`
- `src/data/` — product specs and the gallery manifest
- `src/index.css` — keyframes, liquid glass, CTA button, grain, vignette
- `tailwind.config.js` — `timber` palette; `font-display` (Oswald),
  `font-serif` (Playfair Display), `font-sans` (Inter)
