/**
 * What each page says to search engines and link previews, in one table. The
 * pages read it at run time (usePageMeta), and the build reads it to write a
 * separate HTML file per route with these tags already in place — crawlers
 * and link previewers that do not run JavaScript would otherwise see the home
 * page's title, description and canonical address on every URL.
 *
 * Plain data only: vite.config.ts imports this file.
 */

/** The site's own domain. Change it here and in index.html together. */
export const SITE_URL = 'https://mihal-eood.com'
export const SITE_NAME = 'МИХАЛ ЕООД'

export type RouteMeta = {
  /** Under ~65 characters: the main search phrase first, the brand last. */
  title: string
  /** About 140–160 characters: what the page offers, where, and the next step. */
  description: string
  /** The page's name in the breadcrumb trail shown in search results. */
  crumb: string
}

export const ROUTE_META: Record<string, RouteMeta> = {
  '/': {
    title: 'Сух дървен материал в Разлог — дюшеме, ламперия | МИХАЛ ЕООД',
    description:
      'Склад за сух дървен материал в Разлог: дъски, греди и талпи, дюшеме, ламперия и слепени греди. Собствена сушилня, рендосване и доставка в цялата страна.',
    crumb: 'Начало',
  },
  '/products': {
    title: 'Дървен материал по размер — дъски, греди, ламперия | МИХАЛ ЕООД',
    description:
      'Сух дървен материал на склад в Разлог: дъски, греди и талпи, слепени греди, дюшеме, декинг, ламперия и челни дъски. Изберете размер и пратете запитване.',
    crumb: 'Продукти',
  },
  '/delivery': {
    title: 'Сушене, рендосване и доставка на дървен материал | МИХАЛ ЕООД',
    description:
      'Обработка на дървен материал в Разлог: сушене в камера до 50 м³, рендосване, шлайфане, боядисване, импрегниране и клинозъбене. Доставка в цялата страна.',
    crumb: 'Услуги и доставка',
  },
  '/gallery': {
    title: 'Галерия — складът за дървен материал в Разлог | МИХАЛ ЕООД',
    description:
      'Снимки от складовата база на МИХАЛ ЕООД в Разлог: подреден сух дървен материал, пакети дъски и греди под навес, товарене и доставки до обекта.',
    crumb: 'Галерия',
  },
  '/about-us': {
    title: 'За нас — дървен материал от Разлог от 2008 г. | МИХАЛ ЕООД',
    description:
      'МИХАЛ ЕООД е регистрирано през 2008 г. в гр. Разлог — търговия и обработка на сух дървен материал, със собствена складова база, сушилня и транспорт.',
    crumb: 'За нас',
  },
  '/contacts': {
    title: 'Контакти — склад за дървен материал в Разлог | МИХАЛ ЕООД',
    description:
      'МИХАЛ ЕООД, гр. Разлог, ул. „Христо Ботев“, срещу „Лукойл“. Тел. 0888 726 194, Viber и е-мейл. Изпратете запитване с размерите и кубатурата — връщаме оферта.',
    crumb: 'Контакти',
  },
  '/privacy': {
    title: 'Политика за поверителност | МИХАЛ ЕООД',
    description:
      'Политика за поверителност на МИХАЛ ЕООД — какви данни събираме през формата за запитване и как ги използваме.',
    crumb: 'Политика за поверителност',
  },
}

/** The routes in the order the sitemap lists them. */
export const ROUTES = Object.keys(ROUTE_META)

/** The canonical address of a route: no query, no trailing slash. */
export const canonicalFor = (path: string) => (path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`)
