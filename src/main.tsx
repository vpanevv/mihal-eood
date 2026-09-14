import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import App from './App.tsx'
import Nav from './sections/Nav.tsx'
import Footer from './sections/Footer.tsx'
import ScrollToTop from './components/ScrollToTop.tsx'
import './index.css'

// The landing page is what most visitors see first, so it stays in the main
// bundle. Every other route is split out; the loaders are kept by name so the
// same import can be warmed ahead of the click.
const loaders = {
  about: () => import('./pages/About.tsx'),
  products: () => import('./pages/Products.tsx'),
  delivery: () => import('./pages/Delivery.tsx'),
  gallery: () => import('./pages/Gallery.tsx'),
  contact: () => import('./pages/Contact.tsx'),
}

const About = lazy(loaders.about)
const Products = lazy(loaders.products)
const Delivery = lazy(loaders.delivery)
const Gallery = lazy(loaders.gallery)
const Contact = lazy(loaders.contact)

// The route chunks are a few kB each. Fetching them once the page is idle
// means a nav click renders straight away instead of waiting on the network.
window.addEventListener('load', () => {
  const warm = () => Object.values(loaders).forEach((load) => void load())
  if ('requestIdleCallback' in window) window.requestIdleCallback(warm, { timeout: 3000 })
  else setTimeout(warm, 1500)
})

/** Holds the space while a chunk loads, on the page's own ground. */
function RouteFallback() {
  return <div className="min-h-svh" />
}

/**
 * Nav and footer live outside the routes, so they mount once. Rendered per
 * page they were torn down on every navigation and the bar replayed its
 * entrance each time.
 */
function Layout() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <Suspense fallback={<RouteFallback />}>
        <Outlet />
      </Suspense>
      <Footer />
    </>
  )
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<App />} />
          <Route path="/about-us" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contacts" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
