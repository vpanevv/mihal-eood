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
      colors: {
        timber: {
          // bark was #1a1207 — near black. Lifted to a warm coffee so the
          // site reads as wood rather than shadow; still 11.6:1 with white
          // text, and 11.6:1 as dark text on the white nav.
          bark: '#402d18',
          // ember stays the on-light accent (the nav logo sits on white), so
          // it can only brighten as far as AA allows: 5.1:1 at this value.
          ember: '#96622e',
          // sap is the on-dark accent, and carries most of the new warmth.
          sap: '#e0a24f',
          cream: '#f7f0e4',
          // The single ground colour: the tone the mobile menu already used.
          paper: '#f7f1e8',
        },
      },
    },
  },
  plugins: [],
}
