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
      <section className="section text-center relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0A192F 0%, #0D2440 100%)' }}>
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
        <div className="container relative z-10">
          <span className="section-label text-[#C9A24A] mx-auto">Our Foundation</span>
          <h1 className="text-[#FDFBF7] mb-6">
            Velcura Hygiene Pvt Ltd
          </h1>
          <p className="font-playfair text-[18px] lg:text-[22px] italic text-[var(--accent)]">
            "Skincare Science Meets Everyday Cleansing"
          </p>
        </div>
      </section>

      {/* Lab Research Split-Screen Section */}
      <section className="py-20 lg:py-32 bg-[#FDFBF7]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            
            {/* Left: Navy Clinical Text */}
            <div className="order-2 lg:order-1 lg:pr-8">
              <span className="text-[12px] uppercase tracking-[0.25em] text-[#C9A24A] font-semibold mb-4 block">
                The Velcura Point of View
              </span>
              <h2 className="font-playfair text-[36px] lg:text-[48px] leading-[1.15] text-[#0A192F] font-semibold mb-8">
                A cleansing brand built where derma-science meets elevated daily ritual.
              </h2>
              
              <div className="text-[16px] lg:text-[18px] text-[#0A192F]/80 space-y-6 font-inter leading-relaxed">
                <p>
                  We started with an uncomfortable truth: traditional makeup wipes are built entirely around the function of removal. They utilize harsh surfactants and stripped solvents with absolutely no regard for the skin lipid barrier left behind.
                </p>
                <p>
                  Velcura changes that equation. Every formula we develop begins in a clinical laboratory setting, utilizing dermatologically recognized active ingredients at highly precise concentrations.
                </p>
                <p className="font-medium text-[#0A192F] pt-4 border-t border-[#0A192F]/10">
                  Our wipes are not just removers; they are the first step of your targeted skincare routine.
                </p>
              </div>
            </div>

            {/* Right: Vertical Lab Photo */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[24px] overflow-hidden border border-[#0A192F]/5 shadow-[0_30px_60px_rgba(10,25,47,0.08)]">
                <img 
                  src="/lab-formulation.png" 
                  alt="Velcura Clinical Formulation Lab" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section bg-white">
        <div className="container text-center">
          <span className="section-label mx-auto">What We Stand For</span>
          <h2 className="text-[var(--text)] mb-10 lg:mb-16">
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
      <section className="section bg-[var(--surface)] text-center">
        <div className="container flex flex-col items-center">
          <span className="section-label mx-auto">The Collection</span>
          <h2 className="text-[var(--text)] mb-4">
            Put Science to Work for Your Skin
          </h2>
          <p className="text-[var(--text-muted)] max-w-[500px] mb-8">
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
