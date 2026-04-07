import { Link } from 'react-router-dom';

const About = () => {
  const values = [
    { title: 'Science First', desc: 'Every formula starts with efficacy. We don\'t add an ingredient unless there\'s clinical evidence to support its benefit at the concentration we use.' },
    { title: 'Barrier Integrity', desc: 'The skin barrier is the cornerstone of healthy skin. Every Velcura product is designed to protect, not compromise, it.' },
    { title: 'No Trade-offs', desc: 'Convenience should not come at the cost of skin health. Velcura wipes prove the two can coexist at a premium level.' },
    { title: 'Transparent Formulas', desc: 'We tell you exactly what\'s in our products, how much of each active, and why. No vague "complex" marketing jargon.' },
  ];

  return (
    <div>
      {/* Header */}
      <section className="section-spacing text-center relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A192F 0%, #0D2440 100%)' }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
            width: `${(i + 1) * 300}px`,
            height: `${(i + 1) * 300}px`,
            borderRadius: '50%',
            border: '1px solid rgba(201,162,74,0.08)',
            pointerEvents: 'none',
          }} />
        ))}
        <div className="velcura-container relative z-10">
          <span className="section-label text-[#C9A24A] mx-auto">Our Foundation</span>
          <h1 className="text-h1 text-[#FDFBF7] mb-6">
            Velcura Hygiene Pvt Ltd
          </h1>
          <p className="font-playfair text-[18px] lg:text-[22px] italic text-[var(--accent)]">
            "Skincare Science Meets Everyday Cleansing"
          </p>
        </div>
      </section>

      {/* Origin story */}
      <section className="section-spacing bg-[var(--bg)]">
        <div className="velcura-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
            <div>
              <span className="section-label">The Beginning</span>
              <h2 className="text-h2 text-[var(--text)] mb-6">
                A Brand Built Around One Conviction
              </h2>
              <div className="text-body text-[var(--text-muted)] space-y-5">
                <p>
                  Velcura Hygiene Pvt Ltd was established with a singular conviction: the act of removing makeup should never compromise your skin's natural health.
                </p>
                <p>
                  Traditional wipes are built around one function: removal. They use surfactants and solvents harsh enough to dissolve even waterproof formulas, with no thought given to what happens to the skin left behind. The result? Compromised barriers, stripped moisture, and irritated, reactive skin.
                </p>
                <p>
                  Velcura changes that equation. Our wipes are formulated with dermatologically recognized active ingredients at efficacious concentrations — not as marketing additions, but as the very core of each formula.
                </p>
              </div>
            </div>

          <div>
            <div style={{ padding: '48px', background: '#0A192F', borderRadius: '12px', color: '#FDFBF7', marginBottom: '24px' }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontStyle: 'italic', lineHeight: '1.6', color: 'rgba(253,251,247,0.9)', marginBottom: '24px' }}>
                "We started with a question: why do we accept that cleansing has to be harsh? The skin barrier is everything. We built Velcura to protect it."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#0A192F' }}>V</div>
                <div>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'white' }}>The Velcura Team</p>
                  <p style={{ fontSize: '11px', color: 'rgba(253,251,247,0.5)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Founders, Velcura Hygiene Pvt Ltd</p>
                </div>
              </div>
            </div>

            <div style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '12px', background: 'white' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '20px' }}>Our Mission in Numbers</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  { n: '3', l: 'Skin-targeted formulas' },
                  { n: '0%', l: 'Harsh alcohol used' },
                  { n: '5+', l: 'Clinical actives per pack' },
                  { n: '100%', l: 'Science-backed claims' },
                ].map(s => (
                  <div key={s.l}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{s.n}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px', lineHeight: '1.4' }}>{s.l}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-spacing bg-white">
        <div className="velcura-container text-center">
          <span className="section-label mx-auto">What We Stand For</span>
          <h2 className="text-h2 text-[var(--text)] mb-10 lg:mb-16">
            Our Formulation Values
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
            {values.map((v, i) => (
              <div 
                key={v.title} 
                className="hover-lift"
                style={{ 
                  padding: '48px 40px', 
                  background: 'white', 
                  borderRadius: '12px', 
                  textAlign: 'left',
                  border: '1px solid var(--border)',
                  transition: 'all 0.4s ease',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Subtle Shimmer */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 45%, rgba(201,162,74,0.03) 50%, transparent 55%)',
                  backgroundSize: '300% 300%',
                  animation: 'shimmer 12s infinite linear',
                  pointerEvents: 'none',
                }} />

                <div style={{ 
                  fontFamily: "'Playfair Display', serif", 
                  fontSize: '56px', 
                  color: 'var(--accent)', 
                  opacity: 0.1,
                  fontWeight: 700, 
                  lineHeight: 1, 
                  marginBottom: '16px' 
                }}>
                  0{i + 1}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text)', marginBottom: '16px', fontFamily: "'Playfair Display', serif" }}>{v.title}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.8' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-spacing bg-[var(--surface)] text-center">
        <div className="velcura-container flex flex-col items-center">
          <span className="section-label mx-auto">The Collection</span>
          <h2 className="text-h2 text-[var(--text)] mb-4">
            Put Science to Work for Your Skin
          </h2>
          <p className="text-body text-[var(--text-muted)] max-w-[500px] mb-8">
            Three formulas. Three skin types. One commitment to ingredient integrity.
          </p>
          <Link to="/shop" className="btn-primary" id="about-shop-btn">
            Explore the Collection
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
