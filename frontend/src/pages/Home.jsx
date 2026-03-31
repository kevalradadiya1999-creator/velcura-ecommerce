import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Droplets, Sun, Leaf, BadgeCheck, Feather, Fingerprint, Gem } from 'lucide-react';
import { products, reviews } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';

/* ── Small reusable animation hook ── */
const useInview = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
};

/* ── Stars Component ── */
const Stars = ({ rating }) => (
  <div style={{ display: 'flex', gap: '2px' }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill={i < Math.floor(rating) ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth="1.2">
        <polygon points="7,1 8.8,5.2 13.5,5.5 10,8.5 11,13 7,10.5 3,13 4,8.5 0.5,5.5 5.2,5.2" />
      </svg>
    ))}
  </div>
);

/* ── Trust icons ── */
const trustPoints = [
  { icon: Shield, label: 'Dermatologically Inspired' },
  { icon: Droplets, label: 'Alcohol-Free Cleansing' },
  { icon: Leaf, label: 'Skin-Type Specific' },
  { icon: Sun, label: 'Premium Ingredients' },
];

const Home = () => {
  const { addItem } = useCart();
  const [heroRef, heroVisible] = useInview(0.05);
  const [shopRef, shopVisible] = useInview(0.1);
  const [sciRef, sciVisible] = useInview(0.1);
  const [reviewIdx, setReviewIdx] = useState(0);

  const nextReview = () => {
    if (reviews.length === 0) return;
    setReviewIdx(i => (i + 1) % reviews.length);
  };
  const prevReview = () => {
    if (reviews.length === 0) return;
    setReviewIdx(i => (i - 1 + reviews.length) % reviews.length);
  };

  /* Auto-rotate reviews */
  useEffect(() => {
    if (reviews && reviews.length > 0) {
      const t = setInterval(nextReview, 5000);
      return () => clearInterval(t);
    }
  }, [reviews.length]);

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ────────────── HERO ────────────── */}
      <section
        id="hero"
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          background: 'linear-gradient(135deg, #FDFBF7 0%, #EEF2F6 100%)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background decoration */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,162,74,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '-5%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(10,25,47,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '120px 32px 80px',
          width: '100%',
          position: 'relative',
          zIndex: 1,
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: '60px',
            alignItems: 'center',
          }} className="hero-grid">
            
            {/* Left: Content */}
            <div
              ref={heroRef}
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(24px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{ height: '1px', width: '48px', background: 'var(--accent)' }} />
                  <span className="section-label" style={{ marginBottom: 0, letterSpacing: '0.2em', textTransform: 'uppercase', fontSize: '11px', color: 'var(--accent)', fontWeight: 600 }}>Clinical Beauty Standard</span>
                </div>
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(42px, 6vw, 76px)',
                fontWeight: 600,
                color: 'var(--text)',
                lineHeight: 1.1,
                marginBottom: '28px',
                letterSpacing: '-0.02em',
              }}>
                Premium Makeup Remover Wipes<br />
                <span style={{ color: 'var(--accent)' }}>Made for Your Exact Skin Type</span>
              </h1>

              <p style={{
                fontSize: '18px',
                color: 'var(--text-muted)',
                lineHeight: '1.7',
                maxWidth: '560px',
                marginBottom: '40px',
                fontWeight: 400
              }}>
                Gentle cleansing with real active ingredients. No tightness. No irritation. No shine. Just fresh, balanced skin in seconds.
              </p>

              {/* Step 1: Trust bar */}
              <div style={{ 
                display: 'flex', 
                flexWrap: 'wrap',
                alignItems: 'center', 
                columnGap: '16px',
                rowGap: '8px',
                marginBottom: '48px',
                padding: '16px 24px',
                background: 'rgba(201,162,74,0.03)',
                border: '1px solid rgba(201,162,74,0.15)',
                borderRadius: '8px',
              }}>
                {[
                  'Made in India',
                  'Dermatologically Inspired',
                  'Alcohol-Free',
                  'Skin-Type Specific',
                  'Free Skin Guide with First Order'
                ].map((item, i, arr) => (
                  <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.05em' }}>
                      {item === 'Free Skin Guide with First Order' ? <span style={{color: 'var(--accent)'}}>{item}</span> : item}
                    </span>
                    {i < arr.length - 1 && <span style={{ color: 'rgba(201,162,74,0.4)', fontSize: '12px' }}>•</span>}
                  </div>
                ))}
              </div>

              {/* Step 1: 4 Buttons Grid */}
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
                gap: '16px', 
                maxWidth: '560px',
              }}>
                <Link to="/shop?type=oily" className="btn-outline" style={{ justifyContent: 'center', fontSize: '12px', padding: '16px', borderRadius: '8px' }}>
                  Shop Oily Skin
                </Link>
                <Link to="/shop?type=dry" className="btn-outline" style={{ justifyContent: 'center', fontSize: '12px', padding: '16px', borderRadius: '8px' }}>
                  Shop Dry Skin
                </Link>
                <Link to="/shop?type=sensitive" className="btn-outline" style={{ justifyContent: 'center', fontSize: '12px', padding: '16px', borderRadius: '8px' }}>
                  Shop Sensitive Skin
                </Link>
                <button 
                  onClick={() => document.getElementById('skin-advisor-trigger')?.click()}
                  className="btn-primary" 
                  style={{ justifyContent: 'center', fontSize: '12px', padding: '16px', background: 'var(--accent)', borderColor: 'var(--accent)', borderRadius: '8px', boxShadow: '0 8px 20px rgba(201,162,74,0.15)' }}
                >
                  Take 30-Second Skin Quiz
                </button>
              </div>
            </div>

            {/* Right: BRAND HERO VISUAL - Product Trio */}
            <div style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              height: '600px',
            }}>
              {/* Luxury Spotlight Background */}
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '700px',
                height: '700px',
                background: 'radial-gradient(circle, rgba(201,162,74,0.08) 0%, transparent 70%)',
                zIndex: 0,
                animation: 'glow 6s infinite alternate ease-in-out'
              }} />

              {/* Product Visual Container */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                animation: 'float 6s infinite ease-in-out',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%',
                maxWidth: '680px',
              }}>
                <div style={{
                  position: 'relative',
                  width: '100%',
                  filter: 'drop-shadow(0 40px 80px rgba(10,25,47,0.15))'
                }}>
                  <img 
                    src="/product-trio.jpg" 
                    alt="Velcura Product Trio" 
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '12px' }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}>
          <div style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, transparent, var(--accent))',
          }} />
          <span style={{ fontSize: '10px', color: 'var(--text-subtle)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ────────────── PRODUCT SPOTLIGHT SECTIONS ────────────── */}
      <section id="sku-spotlights" style={{ background: 'white' }}>
        {products.map((p, i) => (
          <div
            key={p.id}
            style={{
              padding: '120px 32px',
              background: i % 2 === 0 ? 'white' : 'var(--surface)',
              borderBottom: '1px solid var(--border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                maxWidth: '1280px',
                width: '100%',
                display: 'grid',
                gridTemplateColumns: i % 2 === 0 ? '1.1fr 0.9fr' : '0.9fr 1.1fr',
                gap: '80px',
                alignItems: 'center',
              }}
              className="spotlight-grid"
            >
              {/* Image Column */}
              <div style={{ order: i % 2 === 0 ? 0 : 2, position: 'relative' }}>
                  <div style={{
                    position: 'absolute',
                    top: '-40px',
                    left: '-40px',
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: p.bgColor,
                    zIndex: 0,
                    opacity: 0.6
                  }} />
                  <div style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    background: p.bgColor,
                    padding: '40px',
                    boxShadow: '0 40px 80px rgba(10,25,47,0.12)',
                    position: 'relative',
                    zIndex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '520px',
                    border: '1px solid rgba(255,255,255,0.4)',
                    backdropFilter: 'blur(10px)',
                  }}>
                    <img 
                      src={p.image} 
                      alt={p.fullName} 
                      style={{ 
                        maxWidth: '90%', 
                        maxHeight: '400px', 
                        objectFit: 'contain', 
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' 
                      }} 
                    />
                  </div>
              </div>

              {/* Info Column */}
              <div>
                <span className="ingredient-pill" style={{ marginBottom: '16px', background: p.bgColor, color: p.accentColor, border: `1px solid ${p.accentColor}33` }}>
                  {p.keyIngredient}
                </span>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Target: {p.skinType}
                </p>
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(40px, 5vw, 64px)',
                  fontWeight: 600,
                  color: 'var(--text)',
                  lineHeight: 1,
                  marginBottom: '12px',
                  letterSpacing: '-0.02em'
                }}>
                  {p.name}
                </h2>
                <h3 style={{ 
                  fontSize: '18px', 
                  fontWeight: 400, 
                  color: p.accentColor, 
                  marginBottom: '32px',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '0.05em'
                }}>
                  {p.tagline}
                </h3>
                
                <p style={{ fontSize: '17px', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '40px', maxWidth: '500px' }}>
                  {p.description}
                </p>

                {/* Formulation Highlight Grid */}
                <div style={{ 
                  display: 'grid', 
                  gridTemplateColumns: 'repeat(2, 1fr)', 
                  gap: '24px', 
                  marginBottom: '48px',
                  padding: '32px',
                  background: 'white',
                  borderRadius: '12px',
                  border: `1px solid ${p.accentColor}1A`,
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}>
                  {p.formulation.slice(0, 2).map(f => (
                    <div key={f.name}>
                      <span style={{ fontSize: '11px', color: 'var(--text-subtle)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{f.name}</span>
                      <div style={{ fontSize: '24px', fontWeight: 600, color: 'var(--text)', margin: '4px 0' }}>{f.conc}</div>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.4' }}>{f.role}</p>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <Link to={`/product/${p.slug}`} className="btn-primary" style={{ padding: '16px 32px' }}>
                    View Clinical Details
                  </Link>
                  <button 
                    onClick={() => addItem(p)}
                    className="btn-outline" 
                    style={{ padding: '16px 32px' }}
                  >
                    Add to Cart · ₹{p.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ────────────── INGREDIENT SCIENCE ────────────── */}
      <section
        id="ingredient-science"
        style={{
          background: '#0A192F',
          padding: '100px 32px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(201,162,74,0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(201,162,74,0.1)', pointerEvents: 'none' }} />

        <div
          ref={sciRef}
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            opacity: sciVisible ? 1 : 0,
            transform: sciVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '24px', marginBottom: '64px' }}>
            <div>
              <span className="section-label">The Science</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(28px, 4vw, 48px)',
                fontWeight: 600,
                color: '#FDFBF7',
                lineHeight: 1.15,
              }}>
                Powered by Dermatological<br />Ingredients
              </h2>
            </div>
            <Link
              to="/ingredients"
              id="ingredients-cta"
              style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '13px', fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}
              onMouseEnter={e => e.currentTarget.style.color = 'white'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--accent)'}
            >
              Explore All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '0' }}>
            {[
              {
                number: '01',
                name: 'Niacinamide',
                sub: 'Target: 4% - 5%',
                product: 'Oil Balance',
                desc: 'Doctor-approved for oil regulation. It interrupts pigment transfer and regulates sebaceous output—without stripping moisture.',
                color: '#2D7D77',
              },
              {
                number: '02',
                name: 'Hyaluronic Acid',
                sub: 'Target: 0.5% - 1%',
                product: 'HydraGlow',
                desc: 'Molecular humectant that holds 1000× its weight in water, providing deep hydration and plumping without greasiness.',
                color: '#8B6B3D',
              },
              {
                number: '03',
                name: 'Ceramide Complex',
                sub: 'Target: 0.5% - 1%',
                product: 'Calm Skin',
                desc: "Restores the skin's natural lipid barrier and protects against environmental irritants. Rebuilds your skin's mortgage.",
                color: '#7B6B8A',
              },
            ].map((ing, i) => (
              <div
                key={ing.number}
                style={{
                  padding: '40px 36px',
                  borderLeft: i > 0 ? '1px solid rgba(253,251,247,0.08)' : 'none',
                  borderTop: '2px solid transparent',
                  position: 'relative',
                  transition: 'background 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(253,251,247,0.03)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: ing.color,
                  opacity: 0.7,
                }} />
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: '48px', color: 'rgba(201,162,74,0.15)', fontWeight: 700, lineHeight: 1, display: 'block', marginBottom: '24px' }}>
                  {ing.number}
                </span>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: ing.color, textTransform: 'uppercase', marginBottom: '8px' }}>
                  {ing.sub} · {ing.product}
                </p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 600, color: '#FDFBF7', marginBottom: '16px' }}>
                  {ing.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(253,251,247,0.6)', lineHeight: '1.7' }}>
                  {ing.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── WHY VELCURA ────────────── */}
      <section style={{ background: 'var(--bg)', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', textAlign: 'center' }}>
          <span className="section-label">Why Velcura</span>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 600, color: 'var(--text)', marginBottom: '64px' }}>
            The Standard We Don't Compromise On
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px' }}>
            {[
              { icon: <BadgeCheck size={32} color="var(--accent)" strokeWidth={1.5} />, title: 'Dermatologically Inspired', desc: 'Every formula is built around clinically recognized active ingredients.' },
              { icon: <Feather size={32} color="var(--accent)" strokeWidth={1.5} />, title: 'Alcohol-Free Cleansing', desc: 'No harsh alcohols that strip or dry out your skin barrier.' },
              { icon: <Fingerprint size={32} color="var(--accent)" strokeWidth={1.5} />, title: 'Skin-Type Specific', desc: 'Each product is tailored to a distinct skin type and its unique needs.' },
              { icon: <Gem size={32} color="var(--accent)" strokeWidth={1.5} />, title: 'Premium Actives', desc: 'We use the same ingredients found in leading dermatology skincare brands.' },
              { icon: <Sun size={32} color="var(--accent)" strokeWidth={1.5} />, title: 'Safe for Daily Use', desc: 'Gentle enough for daily use, effective enough to see results.' },
            ].map(item => (
              <div
                key={item.title}
                style={{
                  padding: '40px 24px',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  background: 'white',
                  transition: 'border-color 0.3s ease, transform 0.3s ease',
                  cursor: 'default',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ fontSize: '32px', marginBottom: '20px' }}>{item.icon}</div>
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── REVIEWS ────────────── */}
      {reviews && reviews.length > 0 && (
        <section style={{ background: 'var(--surface)', padding: '100px 32px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '64px' }}>
              <span className="section-label">Customer Stories</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 600, color: 'var(--text)' }}>
                Real Skin. Real Results.
              </h2>
            </div>

            {/* Featured review */}
            <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
              <div style={{ textAlign: 'center', padding: '48px', background: 'white', borderRadius: '16px', boxShadow: '0 8px 40px rgba(10,25,47,0.06)' }}>
                <Stars rating={reviews[reviewIdx].rating} />
                <blockquote style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(18px, 2.5vw, 24px)',
                  fontStyle: 'italic',
                  color: 'var(--text)',
                  lineHeight: '1.6',
                  margin: '28px 0',
                }}>
                  "{reviews[reviewIdx].text}"
                </blockquote>
                <p style={{ fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>{reviews[reviewIdx].name}</p>
                <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{reviews[reviewIdx].skinType}</p>
              </div>

              {/* Nav buttons */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '28px' }}>
                <button
                  id="prev-review-btn"
                  onClick={prevReview}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  id="next-review-btn"
                  onClick={nextReview}
                  style={{ width: '44px', height: '44px', borderRadius: '50%', border: '1px solid var(--border)', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
                >
                  <ChevronRight size={18} />
                </button>
              </div>

              {/* Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
                {reviews.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIdx(i)}
                    style={{
                      width: i === reviewIdx ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: i === reviewIdx ? 'var(--accent)' : 'var(--border)',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      padding: 0,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ────────────── BRAND STORY ────────────── */}
      <section style={{ background: '#0A192F', padding: '100px 32px' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center',
        }}
        className="brand-grid"
        >
          <div>
            <span className="section-label">Our Story</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600, color: '#FDFBF7', lineHeight: 1.2, marginBottom: '24px' }}>
              The Velcura Philosophy
            </h2>
            <p style={{ fontSize: '16px', color: 'rgba(253,251,247,0.65)', lineHeight: '1.8', marginBottom: '20px' }}>
              Velcura Hygiene Pvt Ltd was created with a singular conviction: cleansing should never come at the expense of skin health.
            </p>
            <p style={{ fontSize: '16px', color: 'rgba(253,251,247,0.65)', lineHeight: '1.8', marginBottom: '40px' }}>
              Unlike ordinary wipes that strip and discard, our formulas combine high-performance makeup removal with dermatologically recognized skincare actives — protecting and strengthening your skin barrier with every use.
            </p>
            <Link to="/about" id="about-cta" className="btn-outline" style={{ borderColor: 'rgba(253,251,247,0.3)', color: '#FDFBF7' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.color = 'var(--accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(253,251,247,0.3)'; e.currentTarget.style.color = '#FDFBF7'; }}
            >
              Read Our Full Story
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { num: '3', label: 'Skin-Type Formulas' },
              { num: '5+', label: 'Dermatological Actives' },
              { num: '0', label: 'Harsh Alcohols' },
              { num: '∞', label: 'Skin Confidence' },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '32px 24px',
                border: '1px solid rgba(253,251,247,0.1)',
                borderRadius: '12px',
                background: 'rgba(253,251,247,0.03)',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '40px', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.1, marginBottom: '8px' }}>
                  {stat.num}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(253,251,247,0.5)', fontWeight: 500, letterSpacing: '0.05em' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ────────────── CTA BANNER ────────────── */}
      <section style={{
        background: 'linear-gradient(135deg, #C9A24A 0%, #A8833C 100%)',
        padding: '80px 32px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '720px', margin: '0 auto' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(24px, 3.5vw, 40px)', fontWeight: 600, color: '#0A192F', marginBottom: '16px' }}>
            Find Your Perfect Formula
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(10,25,47,0.75)', marginBottom: '36px', lineHeight: '1.6' }}>
            Oily, dry, or sensitive — there's a Velcura wipe made precisely for your skin.
          </p>
          <Link to="/shop" id="banner-shop-btn" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            background: '#0A192F',
            color: 'white',
            padding: '16px 40px',
            fontFamily: 'Inter, sans-serif',
            fontSize: '12px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            transition: 'transform 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'none'}
          >
            Shop the Full Collection <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; padding: 100px 24px 60px !important; }
          .brand-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @keyframes softPulse {
          from { transform: translate(-50%, -50%) scale(0.95); opacity: 0.03; }
          to { transform: translate(-50%, -50%) scale(1.05); opacity: 0.06; }
        }
        @keyframes glow {
          from { opacity: 0.4; transform: translate(-50%, -50%) scale(0.9); }
          to { opacity: 0.8; transform: translate(-50%, -50%) scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% -200%; }
          100% { background-position: 200% 200%; }
        }
      `}</style>
    </div>
  );
};

export default Home;
