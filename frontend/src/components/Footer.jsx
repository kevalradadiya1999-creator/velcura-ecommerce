import { Link } from 'react-router-dom';
import { Instagram, Youtube } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const columns = [
    {
      title: 'Shop',
      links: [
        { label: 'All Products', to: '/shop' },
        { label: 'Oil Balance', to: '/product/oil-balance' },
        { label: 'HydraGlow', to: '/product/hydraglow' },
        { label: 'Calm Skin', to: '/product/calm-skin' },
        { label: 'Bundles', to: '/shop#bundles' },
      ]
    },
    {
      title: 'Learn',
      links: [
        { label: 'Ingredient Science', to: '/ingredients' },
        { label: 'Journal', to: '/journal' },
        { label: 'Brand Story', to: '/about' },
        { label: 'FAQ', to: '/faq' },
        { label: 'Skin Type Guide', to: '/faq#skin-type' },
        { label: 'Sitemap', to: '/sitemap' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Contact Us', to: '/contact' },
        { label: 'Order Tracking', to: '/track-order' },
        { label: 'Returns Policy', to: '/faq#returns' },
        { label: 'Shipping Info', to: '/faq#shipping' },
        { label: 'Email: velcura60@gmail.com', to: 'mailto:velcura60@gmail.com', external: true },
      ]
    }
  ];

  return (
    <footer style={{ background: '#0A192F', color: '#FDFBF7' }}>
      {/* Newsletter strip */}
      <div style={{ borderBottom: '1px solid rgba(253,251,247,0.08)' }} className="py-12">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '24px' }}>
          <div>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, marginBottom: '6px' }}>
              Stay in the Velcura Circle
            </p>
            <p style={{ fontSize: '13px', color: 'rgba(253,251,247,0.6)', fontWeight: 400 }}>
              Skincare science, launches, and exclusive offers — delivered to you.
            </p>
          </div>
          <form
            onSubmit={e => e.preventDefault()}
            style={{ display: 'flex', gap: '0', flexWrap: 'wrap' }}
          >
            <input
              id="newsletter-email"
              type="email"
              placeholder="Your email address"
              required
              style={{
                background: 'rgba(253,251,247,0.06)',
                border: '1px solid rgba(253,251,247,0.15)',
                borderRight: 'none',
                padding: '14px 20px',
                color: '#FDFBF7',
                fontFamily: 'Inter, sans-serif',
                fontSize: '13px',
                outline: 'none',
                width: '260px',
                maxWidth: '100%',
                borderRadius: '12px 0 0 12px',
              }}
            />
            <button
              id="newsletter-submit"
              type="submit"
              style={{
                background: 'var(--accent)',
                border: 'none',
                padding: '14px 24px',
                color: '#0A192F',
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '0 12px 12px 0',
              }}
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container" style={{ padding: '64px 0 48px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '48px' }}>
        {/* Brand col */}
        <div>
          <div style={{ marginBottom: '20px' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: '#FDFBF7', marginBottom: '4px' }}>
              Velcura
            </p>
            <p style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase' }}>
              Hygiene Pvt Ltd
            </p>
          </div>
          <p style={{ fontSize: '13px', color: 'rgba(253,251,247,0.55)', lineHeight: '1.7', marginBottom: '28px', maxWidth: '220px' }}>
            Skincare Science Meets Everyday Cleansing. Dermatologically inspired wipes for every skin type.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#" aria-label="Instagram" style={{ color: 'rgba(253,251,247,0.5)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,251,247,0.5)'}
            >
              <Instagram size={18} strokeWidth={1.5} />
            </a>
            <a href="#" aria-label="YouTube" style={{ color: 'rgba(253,251,247,0.5)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,251,247,0.5)'}
            >
              <Youtube size={18} strokeWidth={1.5} />
            </a>
          </div>
        </div>

        {/* Link columns */}
        {columns.map(col => (
          <div key={col.title}>
            <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '24px' }}>
              {col.title}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {col.links.map(l => (
                <li key={l.label}>
                  {l.external ? (
                    <a
                      href={l.to}
                      style={{
                        fontSize: '13px',
                        color: 'rgba(253,251,247,0.6)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#FDFBF7'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,251,247,0.6)'}
                    >
                      {l.label}
                    </a>
                  ) : (
                    <Link
                      to={l.to}
                      style={{
                        fontSize: '13px',
                        color: 'rgba(253,251,247,0.6)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#FDFBF7'}
                      onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,251,247,0.6)'}
                    >
                      {l.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Trust badges */}
        <div>
          <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.2em', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '24px' }}>
            Our Promise
          </p>
          {['Dermatologically Inspired', 'Alcohol-Free', 'Skin Barrier Friendly', 'Premium Ingredients', 'Safe for Daily Use'].map(badge => (
            <div key={badge} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <div style={{ width: '18px', height: '18px', borderRadius: '50%', border: '1.5px solid var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4L3 6L7 2" stroke="#C9A24A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </div>
              <span style={{ fontSize: '12px', color: 'rgba(253,251,247,0.6)' }}>{badge}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(253,251,247,0.08)' }} className="py-5">
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <p style={{ fontSize: '12px', color: 'rgba(253,251,247,0.35)' }}>
            © {currentYear} Velcura Hygiene Pvt Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(policy => (
              <Link
                key={policy}
                to="#"
                style={{ fontSize: '11px', color: 'rgba(253,251,247,0.35)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.color = 'rgba(253,251,247,0.7)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,251,247,0.35)'}
              >
                {policy}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
