import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import ErrorBoundary from './components/ErrorBoundary';
import BackToTop from './components/BackToTop';
import Layout from './components/Layout';

// Code splitting — all pages loaded lazily
const Home        = lazy(() => import('./pages/Home'));
const Shop        = lazy(() => import('./pages/Shop'));
const ProductPage = lazy(() => import('./pages/ProductPage'));
const Ingredients = lazy(() => import('./pages/Ingredients'));
const About       = lazy(() => import('./pages/About'));
const FAQ         = lazy(() => import('./pages/FAQ'));
const Contact     = lazy(() => import('./pages/Contact'));
const Checkout    = lazy(() => import('./pages/Checkout'));
const Success     = lazy(() => import('./pages/Success'));
const Export      = lazy(() => import('./pages/Export'));
const Wishlist    = lazy(() => import('./pages/Wishlist'));

// Page loader shown while lazy components load
const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <style>{`
      @keyframes velcuraPulse {
        0%, 100% { opacity: 1; transform: scale(1); }
        50% { opacity: 0.4; transform: scale(0.95); }
      }
    `}</style>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', animation: 'velcuraPulse 1.5s ease infinite' }}>
      <img src="/velcura-logo.png" alt="Loading..." style={{ height: '40px', opacity: 0.6 }} />
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading...</p>
    </div>
  </div>
);

// Inner component to use useLocation inside Router
const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="product/:slug" element={<ProductPage />} />
          <Route path="ingredients" element={<Ingredients />} />
          <Route path="about" element={<About />} />
          <Route path="faq" element={<FAQ />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<Checkout />} />
          <Route path="success" element={<Success />} />
          <Route path="export" element={<Export />} />
          <Route path="wishlist" element={<Wishlist />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <CartProvider>
      <WishlistProvider>
        <Router>
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </ErrorBoundary>

          {/* Global UI elements */}
          <BackToTop />

          {/* Global toast notifications */}
          <Toaster
            position="bottom-right"
            gutter={8}
            toastOptions={{
              duration: 3000,
              style: {
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                background: '#0A192F',
                color: '#FDFBF7',
                borderRadius: '8px',
                padding: '12px 16px',
                boxShadow: '0 4px 20px rgba(10,25,47,0.2)',
              },
              success: { iconTheme: { primary: '#C9A24A', secondary: '#0A192F' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
