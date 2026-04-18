import { useState, useEffect } from 'react';

const MESSAGES = [
  '🚚 Free shipping on orders above ₹499',
  '🎁 Use code WELCOME20 for 20% off your first order',
  '✨ New arrivals: Oil Balance Cleanser now available',
  '🌿 100% natural ingredients. Dermatologist tested.',
];

const PromoBanner = () => {
  const [visible, setVisible] = useState(true);
  const [msgIdx, setMsgIdx] = useState(0);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    if (sessionStorage.getItem('promo_dismissed') === 'true') {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setOpacity(0);
      setTimeout(() => {
        setMsgIdx(i => (i + 1) % MESSAGES.length);
        setOpacity(1);
      }, 300);
    }, 3000);
    return () => clearInterval(interval);
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('promo_dismissed', 'true');
  };

  return (
    <div style={{
      height: '36px',
      background: '#0A192F',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      zIndex: 100,
      flexShrink: 0,
    }}>
      <p style={{
        fontSize: '12px',
        fontFamily: 'DM Sans, Inter, sans-serif',
        fontWeight: 500,
        letterSpacing: '0.02em',
        opacity,
        transition: 'opacity 0.3s ease',
        textAlign: 'center',
        padding: '0 40px',
      }}>
        {MESSAGES[msgIdx]}
      </p>
      <button
        onClick={dismiss}
        aria-label="Dismiss announcement"
        style={{
          position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)',
          cursor: 'pointer', fontSize: '16px', lineHeight: 1,
          transition: 'color 0.2s', padding: '4px',
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'white'}
        onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
      >
        ×
      </button>
    </div>
  );
};

export default PromoBanner;
