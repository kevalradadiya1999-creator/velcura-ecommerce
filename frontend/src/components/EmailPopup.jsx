import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const EmailPopup = () => {
  const { pathname } = useLocation();
  if (pathname === '/admin') return null;

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('velcura_email_captured') || sessionStorage.getItem('velcura_popup_dismissed')) {
      return;
    }
    const timer = setTimeout(() => {
      setVisible(true);
    }, 15000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setVisible(false);
    if (!submitted) {
      sessionStorage.setItem('velcura_popup_dismissed', 'true');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    localStorage.setItem('velcura_email_captured', 'true');
    setTimeout(() => {
      setVisible(false);
    }, 3000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText('WELCOME20');
  };

  return (
    <AnimatePresence>
      {visible && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center' }} role="dialog" aria-modal="true">
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
            onClick={close}
          />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ width: '480px', maxWidth: '95vw', background: 'white', borderRadius: '20px', position: 'relative', overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.2)' }}
          >
            <button onClick={close} aria-label="Close dialog" style={{ position: 'absolute', top: '16px', right: '16px', background: 'rgba(255,255,255,0.8)', border: 'none', borderRadius: '50%', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}>✕</button>
            
            <img src="https://images.unsplash.com/photo-1615397323282-3151ebf38c3c?w=600&q=80&fit=crop" alt="Lifestyle" style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
            
            <div style={{ padding: '40px' }}>
              {submitted ? (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#0A192F', marginBottom: '16px' }}>Welcome to Velcura!</h2>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '24px' }}>Use this code at checkout for 15% off your first order.</p>
                  <div style={{ background: '#F5F0E8', padding: '16px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: '1px dashed #C9A24A' }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.1em', color: '#0A192F' }}>WELCOME20</span>
                    <button onClick={copyCode} style={{ background: '#0A192F', color: 'white', border: 'none', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', fontWeight: 600, cursor: 'pointer' }}>Copy</button>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9CA3AF', marginTop: '24px' }}>Closing automatically...</p>
                </div>
              ) : (
                <div style={{ textAlign: 'center' }}>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#0A192F', marginBottom: '12px' }}>Get 15% Off Your First Order</h2>
                  <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.6' }}>Join the Velcura community for exclusive offers, skincare tips, and early access to new launches.</p>
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <input type="email" placeholder="Email address" required value={email} onChange={e => setEmail(e.target.value)} style={{ padding: '14px 20px', border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', fontFamily: 'Inter, sans-serif', outline: 'none' }} />
                    <button type="submit" className="btn-primary" style={{ padding: '16px', width: '100%', justifyContent: 'center', fontSize: '14px' }}>Claim Offer</button>
                  </form>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EmailPopup;
