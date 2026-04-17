import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.5 },
};

const About = () => (
  <div>
    <SEOHead
      title="Our Story — Velcura Hygiene Pvt Ltd"
      description="Velcura was born from the belief that skincare and convenience should never be a trade-off. Learn how we built India's most clinical face wipe brand."
      url="/about"
    />

    {/* Hero */}
    <motion.section {...fadeUp} style={{ background: '#F5F0E8', padding: '100px 32px', textAlign: 'center' }}>
      <div className="container" style={{ maxWidth: '720px', margin: '0 auto' }}>
        <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A24A', display: 'block', marginBottom: '20px' }}>
          Our Philosophy
        </span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 600, color: '#0A192F', lineHeight: 1.2, marginBottom: '24px' }}>
          We Believe Clean Skin Starts with Clean Ingredients
        </h1>
        <p style={{ fontSize: '17px', color: '#6B7280', lineHeight: '1.8', maxWidth: '560px', margin: '0 auto' }}>
          Velcura was founded on a simple idea: that a makeup wipe should leave your skin better, not just cleaner. Every formula we create starts in the lab, not the marketing deck.
        </p>
      </div>
    </motion.section>

    {/* Values section */}
    <motion.section {...fadeUp} style={{ padding: '80px 32px', background: 'white' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A24A' }}>What We Stand For</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#0A192F', marginTop: '8px' }}>Our Core Values</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {[
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 4v4M16 24v4M8 16H4M28 16h-4M10.34 10.34l-2.83-2.83M24.49 24.49l-2.83-2.83M10.34 21.66l-2.83 2.83M24.49 7.51l-2.83 2.83" stroke="#C9A24A" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="16" cy="16" r="5" stroke="#C9A24A" strokeWidth="2"/>
                </svg>
              ),
              title: 'Science-Backed',
              desc: 'Every ingredient is chosen for clinical efficacy at a meaningful concentration. We cite peer-reviewed research, not marketing trends.',
            },
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 6C16 6 7 12 7 19a9 9 0 0018 0C25 12 16 6 16 6z" stroke="#C9A24A" strokeWidth="2" strokeLinejoin="round"/>
                  <path d="M16 14v6M13 17h6" stroke="#C9A24A" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Cruelty Free',
              desc: 'No animal testing at any stage. Our formulations are proven safe with in-vitro and human patch testing only.',
            },
            {
              icon: (
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <path d="M16 5C10 5 5 10 5 16s5 11 11 11 11-5 11-11S22 5 16 5z" stroke="#C9A24A" strokeWidth="2"/>
                  <path d="M16 9c-2.5 2-4 5-4 7s1.5 5 4 7c2.5-2 4-5 4-7s-1.5-5-4-7z" stroke="#C9A24A" strokeWidth="1.5"/>
                  <line x1="5" y1="16" x2="27" y2="16" stroke="#C9A24A" strokeWidth="1.5"/>
                </svg>
              ),
              title: 'Made in India',
              desc: 'Manufactured in Ahmedabad with local supply chains, quality-tested to global GMP standards. Proud to be Indian.',
            },
          ].map((val, i) => (
            <motion.div key={val.title} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.1 }}
              style={{ background: '#FDFBF7', border: '1px solid rgba(10,25,47,0.08)', borderRadius: '16px', padding: '28px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {val.icon}
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', color: '#0A192F', margin: 0 }}>{val.title}</h3>
              <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.7', margin: 0 }}>{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>

    {/* Founder Story */}
    <motion.section {...fadeUp} style={{ padding: '80px 32px', background: '#F5F0E8' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'center', maxWidth: '1000px', margin: '0 auto' }}>
          <div>
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&fit=crop&crop=faces&auto=format"
              alt="Velcura Founder"
              style={{ width: '100%', aspectRatio: '4/5', objectFit: 'cover', borderRadius: '16px', boxShadow: '0 20px 60px rgba(10,25,47,0.12)' }}
            />
          </div>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A24A', display: 'block', marginBottom: '16px' }}>Our Story</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 38px)', color: '#0A192F', marginBottom: '24px' }}>
              Built From Frustration, Refined by Science
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '15px', color: '#6B7280', lineHeight: '1.8' }}>
              <p>Velcura Hygiene began with a simple observation: most makeup wipes on the Indian market were harsh, over-fragranced, and left skin worse than before — yet millions of people used them daily because of their uncontested convenience.</p>
              <p>We spent 18 months in formulation before releasing a single product. The goal wasn't to make a "better wipe" — it was to create a new category: an active skincare delivery system that happens to remove makeup.</p>
              <p>Every formula is built around one core active (Niacinamide, Hyaluronic Acid, or Ceramides) at clinically validated concentrations. The substrate is chosen to minimise friction. The preservative system is minimal yet effective. Nothing is added for marketing appeal alone.</p>
              <p>We believe that convenience and skin health are not a trade-off. Velcura exists to prove that.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>

    {/* Numbers section */}
    <motion.section {...fadeUp} style={{ padding: '80px 32px', background: '#0A192F' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '40px', textAlign: 'center' }}>
          {[
            { number: '3+', label: 'Clinical Formulas' },
            { number: '500+', label: 'Happy Customers' },
            { number: '100%', label: 'Natural Actives' },
            { number: '0', label: 'Harmful Chemicals' },
          ].map((stat, i) => (
            <motion.div key={stat.label} {...fadeUp} transition={{ duration: 0.4, delay: i * 0.1 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: '#C9A24A', margin: '0 0 8px' }}>{stat.number}</p>
              <p style={{ fontSize: '13px', color: 'rgba(253,251,247,0.5)', fontWeight: 500, letterSpacing: '0.05em', margin: 0 }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>

    {/* CTA section */}
    <motion.section {...fadeUp} style={{ padding: '80px 32px', textAlign: 'center', background: 'white' }}>
      <div className="container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3vw, 36px)', color: '#0A192F', marginBottom: '24px' }}>
          Ready to Transform Your Routine?
        </h2>
        <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '32px', lineHeight: '1.7' }}>
          Find the wipe that's been engineered for your skin type.
        </p>
        <Link to="/shop" style={{ background: '#0A192F', color: 'white', padding: '14px 36px', borderRadius: '4px', textDecoration: 'none', fontSize: '13px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'inline-block' }}>
          Shop Now
        </Link>
      </div>
    </motion.section>
  </div>
);

export default About;
