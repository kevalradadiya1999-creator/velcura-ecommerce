import { useState } from 'react';

const NewsletterBanner = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus('error');
      return;
    }
    // Store in localStorage to prevent re-showing
    localStorage.setItem('velcura_newsletter', email);
    setStatus('success');
  };

  return (
    <section style={{
      background: '#F5F0E8',
      padding: '80px 32px',
      textAlign: 'center',
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        <p style={{
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--accent, #C9A24A)',
          marginBottom: '12px',
        }}>
          The Velcura Circle
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(26px, 4vw, 38px)',
          fontWeight: 600,
          color: '#0A192F',
          marginBottom: '12px',
          lineHeight: 1.2,
        }}>
          Join the Velcura Circle
        </h2>
        <p style={{
          fontSize: '15px',
          color: '#6B7280',
          marginBottom: '36px',
          lineHeight: '1.7',
        }}>
          Skincare tips, launch alerts, and members-only offers —<br /> straight to your inbox.
        </p>

        {status === 'success' ? (
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#dcfce7',
            color: '#16a34a',
            padding: '16px 28px',
            borderRadius: '12px',
            fontSize: '15px',
            fontWeight: 600,
          }}>
            <span>✓</span>
            You're in! Check your inbox.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0', maxWidth: '420px', margin: '0 auto' }}>
            <input
              id="newsletter-banner-email"
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setStatus('idle'); }}
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: '14px 20px',
                fontSize: '14px',
                fontFamily: 'Inter, sans-serif',
                border: status === 'error' ? '1.5px solid #ef4444' : '1.5px solid rgba(10,25,47,0.15)',
                borderRight: 'none',
                borderRadius: '8px 0 0 8px',
                outline: 'none',
                background: 'white',
                color: '#0A192F',
              }}
            />
            <button
              id="newsletter-banner-submit"
              type="submit"
              style={{
                background: '#0A192F',
                border: 'none',
                padding: '14px 24px',
                color: '#FDFBF7',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '0 8px 8px 0',
                fontFamily: 'Inter, sans-serif',
                transition: 'background 0.2s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent, #C9A24A)'}
              onMouseLeave={e => e.currentTarget.style.background = '#0A192F'}
            >
              Subscribe
            </button>
          </form>
        )}
        {status === 'error' && (
          <p style={{ color: '#ef4444', fontSize: '13px', marginTop: '8px' }}>
            Please enter a valid email address.
          </p>
        )}
        <p style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '16px' }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default NewsletterBanner;
