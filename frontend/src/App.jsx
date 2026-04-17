import { lazy, Suspense, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { CompareProvider } from './context/CompareContext';
import ErrorBoundary from './components/ErrorBoundary';
import BackToTop from './components/BackToTop';
import ScrollToTop from './components/ScrollToTop';
import PromoBanner from './components/PromoBanner';
import SplashScreen from './components/SplashScreen';
import Layout from './components/Layout';
import EmailPopup from './components/EmailPopup';
import CompareBar from './components/CompareBar';

const Home             = lazy(() => import('./pages/Home'));
const Shop             = lazy(() => import('./pages/Shop'));
const ProductPage      = lazy(() => import('./pages/ProductPage'));
const Ingredients      = lazy(() => import('./pages/Ingredients'));
const About            = lazy(() => import('./pages/About'));
const FAQ              = lazy(() => import('./pages/FAQ'));
const Contact          = lazy(() => import('./pages/Contact'));
const Checkout         = lazy(() => import('./pages/Checkout'));
const Success          = lazy(() => import('./pages/Success'));
const Export           = lazy(() => import('./pages/Export'));
const Wishlist         = lazy(() => import('./pages/Wishlist'));
const OrderConfirmation = lazy(() => import('./pages/OrderConfirmation'));
const Compare          = lazy(() => import('./pages/Compare'));
const SkinQuiz         = lazy(() => import('./pages/SkinQuiz'));
const Sitemap          = lazy(() => import('./pages/Sitemap'));
const NotFound         = lazy(() => import('./pages/NotFound'));

const PageLoader = () => (
  <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <style>{`@keyframes velcuraPulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.95)} }`}</style>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', animation: 'velcuraPulse 1.5s ease infinite' }}>
      <img src="/velcura-logo.png" alt="Loading Velcura..." style={{ height: '40px', opacity: 0.6 }} />
      <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '12px', color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Loading...</p>
    </div>
  </div>
);

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
          <Route path="order-confirmation" element={<OrderConfirmation />} />
          <Route path="compare" element={<Compare />} />
          <Route path="quiz" element={<SkinQuiz />} />
          <Route path="sitemap" element={<Sitemap />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  const [splashDone, setSplashDone] = useState(false);

  return (
    <CartProvider>
      <WishlistProvider>
        <CompareProvider>
          {!splashDone && <SplashScreen onDone={() => setSplashDone(true)} />}
          <PromoBanner />
          <Router>
            <ScrollToTop />
          <ErrorBoundary>
            <Suspense fallback={<PageLoader />}>
              <AnimatedRoutes />
            </Suspense>
          </ErrorBoundary>
          <CompareBar />
          <EmailPopup />
          <BackToTop />
          <Toaster
            position="bottom-right"
            gutter={8}
            toastOptions={{
              duration: 3000,
              style: { fontFamily: 'Inter, sans-serif', fontSize: '13px', background: '#0A192F', color: '#FDFBF7', borderRadius: '8px', padding: '12px 16px', boxShadow: '0 4px 20px rgba(10,25,47,0.2)' },
              success: { iconTheme: { primary: '#C9A24A', secondary: '#0A192F' } },
              error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
            }}
          />
        </Router>
        </CompareProvider>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
