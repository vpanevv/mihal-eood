#!/usr/bin/env node
/**
 * Builds the downloadable PDF spec sheet (public/mihal-eood-specifikatsiya.pdf)
 * from the same rows the website table uses.
 *
 *   npm run spec-sheet          rebuild the PDF
 *   npm run spec-sheet:check    exit 1 if the PDF no longer matches the data
 *
 * It renders an HTML page with the site's own fonts and prints it through
 * Chrome, so the sheet matches the brand and embeds real Cyrillic. Needs
 * Chrome (or Chromium) and Node 22.18+ — the data files are read as TypeScript.
 * Set CHROME_PATH if Chrome is somewhere unusual.
 */
import { createHash } from 'node:crypto'
import { spawnSync } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { SPEC_ROWS, SPEC_SHEET_PATH } from '../src/data/specs.ts'
import * as company from '../src/data/company.ts'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = join(root, 'public', SPEC_SHEET_PATH)
const stamp = join(root, 'scripts', 'spec-sheet.hash')

// Everything printed on the sheet that comes from data. If any of it changes,
// the PDF is out of date.
const source = {
  rows: SPEC_ROWS,
  company: {
    phone: company.PHONE_DISPLAY,
    email: company.EMAIL,
    city: company.ADDRESS_CITY,
    street: company.ADDRESS_STREET,
    landmark: company.ADDRESS_LANDMARK,
    hours: company.HOURS_WEEKDAYS,
  },
}
const hash = createHash('sha256').update(JSON.stringify(source)).digest('hex')

if (process.argv.includes('--check')) {
  const current = existsSync(out) && existsSync(stamp) && readFileSync(stamp, 'utf8').trim() === hash
  if (current) {
    console.log('Spec sheet is up to date.')
    process.exit(0)
  }
  console.error('Spec sheet is out of date — run `npm run spec-sheet` and commit the PDF.')
  process.exit(1)
}

const MONTHS = [
  'януари', 'февруари', 'март', 'април', 'май', 'юни',
  'юли', 'август', 'септември', 'октомври', 'ноември', 'декември',
]
const now = new Date()
const issued = `${MONTHS[now.getMonth()]} ${now.getFullYear()} г.`

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

// The site's @font-face rules, pointed at the local files.
const fontsCss = readFileSync(join(root, 'src', 'fonts.css'), 'utf8').replaceAll(
  'url(/fonts/',
  `url(${pathToFileURL(join(root, 'public', 'fonts')).href}/`,
)

const rows = SPEC_ROWS.map(
  (r) => `<tr><th scope="row">${esc(r.name)}</th><td>${esc(r.thickness)}</td><td>${esc(r.width)}</td><td>${esc(r.length)}</td></tr>`,
).join('\n')

const html = `<!doctype html>
<html lang="bg"><head><meta charset="utf-8">
<title>МИХАЛ ЕООД — спецификация на материалите</title>
<style>
${fontsCss}
@page { size: A4; margin: 0 }
* { box-sizing: border-box; margin: 0; padding: 0 }
/* The footer is in flow, not pinned: if the content ever outgrows the page it
   pushes onto a second page, and the page count check below fails loudly —
   rather than the footer silently painting over the last block. The html
   background matches the footer, so the half-millimetre of slack at the foot
   of the page is invisible. */
html { width: 210mm; background: #e4e1d4 }
body {
  width: 210mm; min-height: 296.5mm; display: flex; flex-direction: column;
  background: #fbfaf6; color: #2a2011;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif; font-weight: 400;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.band { background: #2a2011; color: #fff; padding: 12mm 17mm 10mm }
.brand { font-family: 'Oswald', sans-serif; font-weight: 500; font-size: 10.5pt; letter-spacing: .32em; text-transform: uppercase }
.brand span { color: #c9a05a; margin-left: .55em }
.kind { margin-top: 8mm; font-size: 7.5pt; letter-spacing: .26em; text-transform: uppercase; color: rgba(255,255,255,.65) }
h1 { margin-top: 3mm; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 35pt; line-height: 1; text-transform: uppercase }
h1 span { color: #c9a05a }
.rule { height: 1.2mm; background: #b4883e }

main { flex: 1; padding: 9mm 17mm 9mm }
.lede { font-size: 10.5pt; font-weight: 300; line-height: 1.6; max-width: 150mm; color: rgba(42,32,17,.82) }

table { width: 100%; margin-top: 6.5mm; border-collapse: collapse; background: #fff; border: .3mm solid rgba(42,32,17,.12) }
thead th {
  text-align: left; padding: 3.2mm 4mm; background: #edebe1;
  font-size: 7pt; font-weight: 500; letter-spacing: .2em; text-transform: uppercase; color: #7f5f27;
}
tbody th, tbody td { padding: 3.1mm 4mm; border-top: .3mm solid rgba(42,32,17,.1); text-align: left; vertical-align: middle }
tbody th { font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 10.5pt; letter-spacing: .04em; text-transform: uppercase; width: 38% }
tbody td { font-size: 9.5pt; font-weight: 400; color: rgba(42,32,17,.88) }

.notes { margin-top: 6.5mm; display: grid; gap: 2.2mm }
.notes p { position: relative; padding-left: 5mm; font-size: 9pt; font-weight: 300; line-height: 1.55; color: rgba(42,32,17,.85) }
.notes p::before { content: ''; position: absolute; left: 0; top: 1.9mm; width: 1.8mm; height: 1.8mm; border-radius: 50%; background: #b4883e }

.cta {
  margin-top: 7mm; display: flex; align-items: center; justify-content: space-between; gap: 8mm;
  background: #634d25; color: #fff; padding: 6mm 7mm; border-radius: 2.5mm;
}
.cta p { font-size: 9.5pt; font-weight: 300; line-height: 1.5; max-width: 105mm }
.cta strong { display: block; font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 20pt; letter-spacing: .04em; color: #fff; white-space: nowrap }

footer { background: #e4e1d4; padding: 8mm 17mm 7mm }
.contacts { display: grid; grid-template-columns: 1.25fr 1fr 1fr; gap: 8mm }
.contacts h2 { font-size: 6.5pt; font-weight: 500; letter-spacing: .22em; text-transform: uppercase; color: #7f5f27; margin-bottom: 1.6mm }
.contacts p { font-size: 8.5pt; line-height: 1.55; color: rgba(42,32,17,.88) }
.stamp { margin-top: 6mm; padding-top: 3.5mm; border-top: .3mm solid rgba(42,32,17,.15); display: flex; justify-content: space-between; font-size: 7pt; letter-spacing: .06em; color: rgba(42,32,17,.6) }
</style></head>
<body>
<div class="band">
  <div class="brand">Михал<span>ЕООД</span></div>
  <div class="kind">Спецификация на материалите</div>
  <h1>Размери <span>на склад</span></h1>
</div>
<div class="rule"></div>

<main>
  <p class="lede">Сух дървен материал от Разлог — размерите, с които разполагаме, и тези, които режем по зададена спецификация.</p>

  <table>
    <thead><tr><th>Материал</th><th>Дебелина</th><th>Ширина</th><th>Дължина</th></tr></thead>
    <tbody>
${rows}
    </tbody>
  </table>

  <div class="notes">
    <p>Режем по зададена спецификация. Размери извън таблицата се уточняват при запитване.</p>
    <p>Материалът преминава престой от минимум един месец след сушилнята, преди да бъде предложен за продажба.</p>
    <p>Разполагаме със собствена складова база, транспорт и подемна техника.</p>
  </div>

  <div class="cta">
    <p>За оферта — обадете се или ни изпратете размерите и количеството.</p>
    <strong>${esc(company.PHONE_DISPLAY)}</strong>
  </div>
</main>

<footer>
  <div class="contacts">
    <div><h2>Адрес</h2><p>${esc(company.ADDRESS_CITY)}<br>${esc(company.ADDRESS_STREET)}<br>${esc(company.ADDRESS_LANDMARK)}</p></div>
    <div><h2>Контакти</h2><p>${esc(company.PHONE_DISPLAY)}<br>${esc(company.EMAIL)}</p></div>
    <div><h2>Работно време</h2><p>Понеделник – Петък<br>${esc(company.HOURS_WEEKDAYS)} ч.<br>Събота и неделя — почивни дни</p></div>
  </div>
  <div class="stamp"><span>МИХАЛ ЕООД</span><span>Актуално към ${issued}</span></div>
</footer>
</body></html>`

// ---- find Chrome ---------------------------------------------------------
const candidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
].filter(Boolean)
const chrome = candidates.find((p) => existsSync(p))
if (!chrome) {
  console.error('Chrome or Chromium not found. Install it, or set CHROME_PATH to its binary.')
  process.exit(1)
}

// ---- print ---------------------------------------------------------------
const work = mkdtempSync(join(tmpdir(), 'spec-sheet-'))
const page = join(work, 'spec-sheet.html')
writeFileSync(page, html)

const result = spawnSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    `--user-data-dir=${join(work, 'profile')}`,
    '--no-pdf-header-footer',
    '--print-to-pdf-no-header',
    '--virtual-time-budget=10000',
    `--print-to-pdf=${out}`,
    pathToFileURL(page).href,
  ],
  { encoding: 'utf8', timeout: 60_000 },
)
if (result.status !== 0 || !existsSync(out)) {
  console.error('Chrome could not print the sheet.\n', result.stderr || result.error)
  process.exit(1)
}

// One A4 page: the layout is fixed, so a second page means a row overflowed.
const pdf = readFileSync(out, 'latin1')
const pages = (pdf.match(/\/Type\s*\/Page(?![s\w])/g) || []).length
if (pages !== 1) {
  console.error(`Expected one page, got ${pages}. Too many rows or too much text for the layout.`)
  process.exit(1)
}

writeFileSync(stamp, hash + '\n')
console.log(`Wrote ${SPEC_SHEET_PATH}  ·  ${pages} page  ·  ${(statSync(out).size / 1024).toFixed(0)} KB  ·  ${issued}`)
