import { useEffect } from 'react'
import Hero from './sections/Hero'
import Showcase from './sections/Showcase'

const LANDING_TITLE = 'МИХАЛ ЕООД — Качествен сух дървен материал'

export default function App() {
  // Each route owns the title, otherwise it keeps whatever the last page set.
  useEffect(() => {
    document.title = LANDING_TITLE
  }, [])

  return (
    <main id="top">
      <Hero />
      <Showcase />
    </main>
  )
}
