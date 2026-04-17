import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CookieBanner = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const accepted = localStorage.getItem('velcura_cookies_accepted');
      if (!accepted) {
        setShow(true);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('velcura_cookies_accepted', 'true');
    setShow(false);
  };

  const handleDecline = () => {
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
          style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'var(--text)',
            color: 'white',
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '16px',
            zIndex: 95,
            flexWrap: 'wrap',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.1)'
          }}
        >
          <p style={{ fontSize: '13px', lineHeight: '1.5', flex: '1 1 300px', margin: 0, color: 'rgba(255,255,255,0.9)' }}>
            We use cookies to improve your experience and analyze site traffic. By continuing, you agree to our{' '}
            <a href="#" style={{ color: 'white', textDecoration: 'underline', fontWeight: 600 }}>Privacy Policy</a>.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexShrink: 0 }}>
            <button
              onClick={handleDecline}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              style={{
                background: 'white',
                border: 'none',
                color: 'var(--text)',
                padding: '8px 24px',
                borderRadius: '8px',
                fontSize: '12px',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              Accept All
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieBanner;
