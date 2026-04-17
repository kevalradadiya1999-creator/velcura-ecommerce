import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const NotFound = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center', background: '#FDFBF7' }}>
    <SEOHead title="404 — Page Not Found | Velcura" description="This page doesn't exist." url="/404" />

    <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      {/* Decorative leaves */}
      <div style={{ marginBottom: '24px', opacity: 0.25 }}>
        <svg width="80" height="60" viewBox="0 0 80 60" fill="none">
          <ellipse cx="20" cy="40" rx="18" ry="10" fill="#C9A24A" transform="rotate(-30 20 40)" />
          <ellipse cx="40" cy="30" rx="22" ry="12" fill="#2D7D77" transform="rotate(10 40 30)" />
          <ellipse cx="60" cy="42" rx="16" ry="9" fill="#7B6B8A" transform="rotate(-15 60 42)" />
        </svg>
      </div>

      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(80px, 18vw, 120px)',
        fontWeight: 700,
        color: '#C9A24A',
        lineHeight: 1,
        textShadow: '0 4px 24px rgba(201,162,74,0.2)',
        marginBottom: '0',
      }}>404</p>

      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, color: '#0A192F', margin: '16px 0 12px' }}>
        Page Not Found
      </h1>
      <p style={{ fontSize: '15px', color: '#6B7280', maxWidth: '380px', lineHeight: '1.7', marginBottom: '36px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link to="/" style={{ background: '#0A192F', color: 'white', padding: '12px 28px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
          Go Home
        </Link>
        <Link to="/shop" style={{ background: 'none', border: '1.5px solid #0A192F', color: '#0A192F', padding: '12px 28px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px', fontWeight: 700, letterSpacing: '0.08em', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
          Browse Products
        </Link>
      </div>
    </motion.div>
  </div>
);

export default NotFound;
