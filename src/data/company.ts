/** Facts used on several pages, kept in one place so they never drift apart. */

export const PHONE_DISPLAY = '0888 726 194'
export const PHONE_HREF = 'tel:+359888726194'
export const EMAIL = 'mihaleood@gmail.com'

export const ADDRESS_CITY = 'гр. Разлог'
export const ADDRESS_STREET = 'ул. „Христо Ботев“'
export const ADDRESS_LANDMARK = 'срещу бензиностанция „Лукойл“'

// The exact yard entrance (41°53'10.7"N 23°28'51.8"E). Searching the street
// address dropped the pin on the road rather than on the business, so the map
// is driven by coordinates and the address is kept only as the label.
export const MAP_COORDS = '41.886306,23.481056'
export const MAP_EMBED = `https://www.google.com/maps?q=${MAP_COORDS}&hl=bg&z=16&output=embed`
export const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${MAP_COORDS}`
export const DIRECTIONS_LINK = `https://www.google.com/maps/dir/?api=1&destination=${MAP_COORDS}`

export const HOURS_WEEKDAYS = '08.00 – 17.00'
