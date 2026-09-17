/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      // Tailwind's default opacity scale is every 5, so bg-timber-bark/82 or
      // opacity-18 silently generate nothing and the rule just vanishes — a
      // tint disappears or a layer jumps to full strength, with no error.
      // Allowing every integer removes that trap.
      opacity: Object.fromEntries(
        Array.from({ length: 101 }, (_, i) => [i, (i / 100).toString()]),
      ),
      fontFamily: {
        display: ['Oswald', 'Arial Narrow', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // The design proposal's palette (September 2026): a neutral, yellow-leaning
      // ground (hue 47°) instead of the earlier orange-pink cream, with colour
      // coming only from the brown and the gold.
      colors: {
        timber: {
          // ТЪМНО — text and dark bands. 15.3:1 on paper.
          bark: '#2a2011',
          // КАФЯВО — primary buttons and active chips. White on it is 8:1.
          brown: '#634d25',
          // ЗЛАТИСТО — fills, icons and rules. Only 3:1 on paper, so never
          // small text on a light ground; dark text on it is 5:1.
          gold: '#b4883e',
          // The gold, deepened for small labels on light grounds: 5.6:1 on paper.
          ember: '#7f5f27',
          // The gold, lifted for text on dark photos and bands: 6.6:1 on bark.
          sap: '#c9a05a',
          // ХАРТИЯ / ФОН / ФУТЪР
          paper: '#fbfaf6',
          ground: '#edebe1',
          stone: '#e4e1d4',
          cream: '#f4f2ea',
        },
      },
    },
  },
  plugins: [],
}
