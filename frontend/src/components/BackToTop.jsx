import { useState, useEffect } from 'react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      id="back-to-top"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      style={{
        position: 'fixed',
        bottom: '100px',
        right: '24px',
        zIndex: 90,
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'var(--color-primary, #0A192F)',
        color: '#FDFBF7',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 20px rgba(10,25,47,0.25)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(16px)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: visible ? 'auto' : 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.background = 'var(--accent, #C9A24A)'; }}
      onMouseLeave={e => { e.currentTarget.style.background = 'var(--color-primary, #0A192F)'; }}
    >
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="4 11 9 6 14 11" />
      </svg>
    </button>
  );
};

export default BackToTop;
