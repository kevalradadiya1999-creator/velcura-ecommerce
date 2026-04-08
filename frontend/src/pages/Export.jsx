import { useEffect, useState } from 'react';

const Export = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    fullName: '', email: '', company: '', country: '', phone: '', region: '', narrative: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const heroTiles = [
    {
      title: 'MoCRA / US',
      desc: 'Prepared for documentation-led distributor discussions in the United States.',
    },
    {
      title: 'EU / UK',
      desc: 'Ingredient transparency and compliance-conscious storytelling for regulated markets.',
    },
    {
      title: 'UAE',
      desc: 'Premium positioning suited to beauty retail and pharmacy channels in the Gulf.',
    },
  ];

  const markets = [
    {
      title: 'United States',
      desc: 'Prepared for MoCRA-aligned documentation and private-label conversations.',
    },
    {
      title: 'UAE',
      desc: 'Export-ready positioning for premium beauty retail and pharmacy channels.',
    },
    {
      title: 'UK / EU',
      desc: 'Built for distributor discussions requiring ingredient transparency and compliance confidence.',
    },
    {
      title: 'Australia',
      desc: 'Clean beauty market with strong demand for clinically-positioned wipe formats.',
    },
    {
      title: 'South Korea & Japan',
      desc: 'K-beauty and J-beauty influence driving premium wipes demand.',
    },
  ];

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', background: '#FDFBF7' }}>

      {/* ─── Hero: Rounded Navy Card ─── */}
      <div style={{ padding: '24px 40px 0 40px' }}>
        <div style={{
          background: '#0d1f3c',
          borderRadius: '24px',
          overflow: 'hidden',
          padding: '72px 64px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '48px',
          alignItems: 'center',
        }} className="export-hero-grid">
          {/* Left */}
          <div>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c9a24a',
              fontWeight: 600,
              marginBottom: '24px',
            }}>
              B2B Portal
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(34px, 4vw, 54px)',
              fontWeight: 600,
              color: '#FDFBF7',
              lineHeight: 1.1,
              marginBottom: '24px',
            }}>
              Velcura is open for global distributor conversations.
            </h1>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '15px',
              color: 'rgba(253,251,247,0.6)',
              lineHeight: 1.7,
              maxWidth: '460px',
            }}>
              Created for premium retail, pharmacy, and beauty partners seeking a clinically positioned wipe range with elegant packaging, clear ingredient narratives, and export-facing communication.
            </p>
          </div>

          {/* Right: Stacked tiles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {heroTiles.map((tile, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px 24px',
              }}>
                <h3 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '18px',
                  fontWeight: 600,
                  color: '#FDFBF7',
                  marginBottom: '6px',
                }}>
                  {tile.title}
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  color: 'rgba(253,251,247,0.5)',
                  lineHeight: 1.6,
                }}>
                  {tile.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Markets Grid ─── */}
      <div style={{ background: '#FDFBF7', padding: '72px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '20px',
          maxWidth: '1200px',
          margin: '0 auto',
        }} className="export-markets-grid">
          {markets.map((m, i) => (
            <div key={i} style={{
              background: 'white',
              border: '1px solid rgba(10,25,47,0.08)',
              borderRadius: '20px',
              padding: '36px 32px',
              boxShadow: '0 2px 12px rgba(10,25,47,0.04)',
              transition: 'transform 0.3s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <h3 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '22px',
                fontWeight: 600,
                color: '#0d1f3c',
                marginBottom: '12px',
              }}>
                {m.title}
              </h3>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '14px',
                color: 'rgba(10,25,47,0.55)',
                lineHeight: 1.7,
              }}>
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ─── Distributor Inquiry Form ─── */}
      <div style={{ background: '#f0ece4', padding: '72px 40px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          maxWidth: '1200px',
          margin: '0 auto',
          alignItems: 'start',
        }} className="export-form-grid">

          {/* Left */}
          <div style={{ paddingTop: '8px' }}>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: '#c9a24a',
              fontWeight: 600,
              marginBottom: '20px',
            }}>
              Distributor Inquiry
            </p>
            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 3.5vw, 46px)',
              fontWeight: 600,
              color: '#0d1f3c',
              lineHeight: 1.1,
              marginBottom: '20px',
            }}>
              Share your market, company, and partnership requirements.
            </h2>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '14px',
              color: 'rgba(10,25,47,0.55)',
              lineHeight: 1.7,
              maxWidth: '420px',
            }}>
              Use this form for private-label, distribution, retail, or region-specific expansion conversations. Velcura will receive the inquiry in the backend for follow-up.
            </p>
          </div>

          {/* Right: Form */}
          <div style={{
            background: 'white',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 8px 32px rgba(10,25,47,0.06)',
          }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '40px 0' }}>
                <div style={{
                  width: '56px', height: '56px',
                  borderRadius: '50%',
                  background: 'rgba(201,162,74,0.12)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                  fontSize: '24px',
                }}>✓</div>
                <p style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '22px',
                  fontWeight: 600,
                  color: '#0d1f3c',
                  marginBottom: '8px',
                }}>Inquiry Received</p>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  color: 'rgba(10,25,47,0.55)',
                  marginBottom: '28px',
                }}>Our export team will contact you within 24–48 hours.</p>
                <button onClick={() => setSubmitted(false)} style={{
                  background: '#0d1f3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '12px 32px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.05em',
                }}>Submit Another</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {/* Row 1 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <input
                    type="text" name="fullName" placeholder="Full name" required onChange={handleChange}
                    style={inputStyle}
                  />
                  <input
                    type="email" name="email" placeholder="Business email" required onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                {/* Row 2 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <input
                    type="text" name="company" placeholder="Company name" required onChange={handleChange}
                    style={inputStyle}
                  />
                  <input
                    type="text" name="country" placeholder="Country" required onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                {/* Row 3 */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                  <input
                    type="tel" name="phone" placeholder="Phone number" onChange={handleChange}
                    style={inputStyle}
                  />
                  <input
                    type="text" name="region" placeholder="Region of interest" onChange={handleChange}
                    style={inputStyle}
                  />
                </div>
                {/* Narrative */}
                <textarea
                  name="narrative" rows="5"
                  placeholder="Tell us about your channel, order expectations, and regulatory requirements"
                  onChange={handleChange}
                  style={{ ...inputStyle, resize: 'none', paddingTop: '14px' }}
                />
                <button type="submit" style={{
                  background: '#0d1f3c',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  padding: '16px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  letterSpacing: '0.03em',
                  marginTop: '4px',
                  transition: 'opacity 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
                onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                >
                  Submit export inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .export-hero-grid {
            grid-template-columns: 1fr !important;
            padding: 48px 32px !important;
          }
          .export-markets-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .export-form-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
        @media (max-width: 600px) {
          .export-hero-grid {
            padding: 36px 24px !important;
          }
          .export-markets-grid {
            grid-template-columns: 1fr !important;
          }
          div[style*="padding: 72px 40px"] {
            padding: 48px 20px !important;
          }
        }
      `}</style>
    </div>
  );
};

const inputStyle = {
  background: '#f0ece4',
  border: '1px solid rgba(10,25,47,0.1)',
  borderRadius: '12px',
  padding: '14px 16px',
  fontFamily: 'Inter, sans-serif',
  fontSize: '14px',
  color: '#0d1f3c',
  outline: 'none',
  width: '100%',
  boxSizing: 'border-box',
};

export default Export;
