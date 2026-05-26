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
    <div className="toast" id="cart-toast" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <span style={{ color: 'var(--accent)' }}>✓</span>&nbsp;{toast}
    </div>
  );
};

const RewardsTab = () => (
  <a
    href="#"
    style={{
      position: 'fixed',
      left: '-28px',
      top: '50%',
      transform: 'translateY(-50%) rotate(-90deg)',
      background: 'var(--accent)',
      color: '#0A192F',
      fontSize: '9px',
      fontWeight: 700,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      padding: '8px 20px',
      borderRadius: '0 0 8px 8px',
      zIndex: 998,
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      fontFamily: 'JetBrains Mono, monospace',
      transition: 'left 0.2s',
    }}
    onMouseEnter={e => e.currentTarget.style.left = '0px'}
    onMouseLeave={e => e.currentTarget.style.left = '-28px'}
    title="Velcura Rewards"
  >
    Rewards
  </a>
);

const Layout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative' }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '100px' }}>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
      <SkinAdvisor />
      <RewardsTab />
      <Toast />
    </div>
  );
};

export default Layout;

