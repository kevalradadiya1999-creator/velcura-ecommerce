import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppButton from './WhatsAppButton';
import SkinAdvisor from './SkinAdvisor';
import { useCart } from '../context/CartContext';

const Toast = () => {
  const { toast } = useCart();
  if (!toast) return null;
  return (
    <div className="toast" id="cart-toast">
      ✓ &nbsp;{toast}
    </div>
  );
};

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '80px' }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <SkinAdvisor />
      <Toast />
    </div>
  );
};

export default Layout;
