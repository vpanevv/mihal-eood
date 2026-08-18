import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import './index.css'

// The landing page is what most visitors see first, so it stays in the main
// bundle. Everything else — including framer-motion, which only the gallery
// needs — is split out and fetched when its route is opened.
const About = lazy(() => import('./pages/About.tsx'))
const Products = lazy(() => import('./pages/Products.tsx'))
const Delivery = lazy(() => import('./pages/Delivery.tsx'))
const Gallery = lazy(() => import('./pages/Gallery.tsx'))
const Contact = lazy(() => import('./pages/Contact.tsx'))

/** Matches the page background, so a chunk fetch never flashes white. */
function RouteFallback() {
  return <div className="min-h-svh bg-timber-bark" />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contacts" element={<Contact />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </StrictMode>,
)
