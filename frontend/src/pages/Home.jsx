import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Droplets, Sun, Leaf, BadgeCheck, Feather, Fingerprint, Gem, ShoppingBag } from 'lucide-react';
import { products, reviews } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import SEOHead from '../components/SEOHead';

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
      <SEOHead
        title="Velcura — Skincare Science Meets Everyday Cleansing"
        description="Premium clinical-grade makeup remover wipes with 4% Niacinamide, Hyaluronic Acid & Ceramides. Made for Oily, Dry & Sensitive Indian skin. Shop now at ₹299."
        url="/"
        schema={{
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Velcura Hygiene Pvt Ltd",
          "url": "https://velcurahygiene.in",
          "description": "Premium clinical-grade skincare wipes for every skin type.",
          "foundingDate": "2026",
          "address": { "@type": "PostalAddress", "addressLocality": "Ahmedabad", "addressCountry": "IN" },
        }}
      />

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

        <div className="container relative z-10 py-16 lg:py-20">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center text-center lg:text-left">
            
            {/* Left: Content */}
            <div
              ref={heroRef}
              style={{
                opacity: heroVisible ? 1 : 0,
                transform: heroVisible ? 'none' : 'translateY(24px)',
                transition: 'opacity 0.8s ease, transform 0.8s ease',
              }}
            >
              <div className="flex flex-col items-center lg:items-start gap-2 mb-8">
                <div className="flex items-center gap-4">
                  <div className="h-[1px] w-8 lg:w-12 bg-[#C9A24A]" />
                  <span className="section-label !mb-0 tracking-[0.2em] uppercase text-[10px] lg:text-[11px] text-[#C9A24A] font-semibold">Clinical Beauty Standard</span>
                  <div className="h-[1px] w-8 lg:w-12 bg-[#C9A24A] lg:hidden" />
                </div>
              </div>

              <h1 className="text-[26px] md:text-[34px] lg:text-[40px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text)] mb-6 font-playfair">
                Premium Makeup Remover Wipes<br />
                <span className="text-[var(--accent)]">Made for Your Exact Skin Type</span>
              </h1>

              <p className="text-[var(--text-muted)] max-w-[560px] mx-auto lg:mx-0 mb-8 lg:mb-10 font-normal">
                Gentle cleansing with real active ingredients. No tightness. No irritation. No shine. Just fresh, balanced skin in seconds.
              </p>

              {/* Step 1: Trust bar */}
              <div className="flex flex-wrap justify-center lg:justify-start items-center gap-x-4 gap-y-2 mb-10 lg:mb-12 py-3 px-4 lg:py-4 lg:px-6 bg-[rgba(201,162,74,0.03)] border border-[rgba(201,162,74,0.15)] rounded-lg">
                {[
                  'Made in India',
                  'Dermatologically Inspired',
                  'Alcohol-Free',
                  'Skin-Type Specific',
                  'Free Skin Guide with First Order'
                ].map((item, i, arr) => (
                  <div key={item} className="flex items-center gap-4">
                    <span className="text-[11px] lg:text-[12px] font-semibold text-[rgba(10,25,47,0.6)] tracking-[0.05em]">
                      {item === 'Free Skin Guide with First Order' ? <span className="text-[#C9A24A]">{item}</span> : item}
                    </span>
                    {i < arr.length - 1 && <span className="text-[rgba(201,162,74,0.4)] text-[12px] hidden sm:inline">•</span>}
                  </div>
                ))}
              </div>

              {/* Step 1: 4 Buttons Grid */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 w-full max-w-[560px] mx-auto lg:mx-0">
                <Link to="/shop?type=oily" className="btn-outline w-full sm:w-auto justify-center text-[12px] py-3 px-5 rounded-lg">
                  Shop Oily Skin
                </Link>
                <Link to="/shop?type=dry" className="btn-outline w-full sm:w-auto justify-center text-[12px] py-3 px-5 rounded-lg">
                  Shop Dry Skin
                </Link>
                <Link to="/shop?type=sensitive" className="btn-outline w-full sm:w-auto justify-center text-[12px] py-3 px-5 rounded-lg">
                  Shop Sensitive Skin
                </Link>
                <button 
                  onClick={() => document.getElementById('skin-advisor-trigger')?.click()}
                  className="btn-primary w-full sm:w-auto justify-center text-[12px] py-3 px-5 bg-[#C9A24A] border-[#C9A24A] rounded-lg shadow-[0_8px_20px_rgba(201,162,74,0.15)]"
                >
                  Take 30-Second Skin Quiz
                </button>
              </div>
            </div>

            {/* Right: BRAND HERO VISUAL - Product Trio */}
            <div className="relative flex items-center justify-center h-[280px] sm:h-[350px] md:h-[450px] lg:h-[500px] w-full mt-4 lg:mt-0">
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

      {/* ────────────── TRUST ELEMENTS ────────────── */}
      <section className="bg-white section border-b border-[var(--border)]">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-[#C9A24A]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"/></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"/></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"/></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"/></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"/></svg>
            </div>
            <span className="font-semibold text-[16px] text-gray-800">4.8/5 Average Rating</span>
          </div>
          <div className="hidden md:block w-px h-12 bg-[var(--border)]"></div>
          <div className="flex flex-col items-center gap-1">
            <span className="font-playfair text-3xl font-bold text-[#C9A24A]">500+</span>
            <span className="font-semibold text-[16px] text-gray-800">Happy Users</span>
          </div>
          <div className="hidden md:block w-px h-12 bg-[var(--border)]"></div>
          <div className="flex flex-col items-center gap-2">
            <Shield size={28} color="var(--accent)" strokeWidth={1.5} />
            <span className="font-semibold text-[16px] text-gray-800">Dermatology-inspired formulas</span>
          </div>
        </div>
      </section>

      {/* ────────────── VALUE PROPOSITION ────────────── */}
      <section className="bg-white section border-b border-[var(--border)] text-center">
        <div className="container">
          <h2 className="text-[var(--text)] mb-8 lg:mb-12">Not Just Makeup Removal</h2>
          <div className="velcura-grid">
            <div className="flex flex-col items-center p-6 bg-[var(--surface)] rounded-2xl">
              <Droplets size={40} className="text-[#C9A24A] mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-lg lg:text-xl mb-2">Removes Everything</h3>
              <p className="text-[var(--text-muted)]">Effectively dissolves waterproof makeup, SPF, and urban pollution without harsh rubbing.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[var(--surface)] rounded-2xl">
              <Gem size={40} className="text-[#C9A24A] mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-lg lg:text-xl mb-2">Treats Skin</h3>
              <p className="text-[var(--text-muted)]">Infused with active ingredients like Niacinamide and Hyaluronic Acid to nourish while you cleanse.</p>
            </div>
            <div className="flex flex-col items-center p-6 bg-[var(--surface)] rounded-2xl">
              <Shield size={40} className="text-[#C9A24A] mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-lg lg:text-xl mb-2">Protects Barrier</h3>
              <p className="text-[var(--text-muted)]">Maintains your skin's natural pH and lipid barrier. Zero post-cleanse tightness or irritation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── SKIN TYPE SELECTOR ────────────── */}
      <section className="bg-[var(--surface)] section border-b border-[var(--border)] text-center">
        <div className="container">
          <h2 className="text-[var(--text)] mb-4 lg:mb-8">Find Your Perfect Wipe</h2>
          <p className="text-[var(--text-muted)] mb-8 lg:mb-10 max-w-lg mx-auto">Select your primary concern below to jump directly to the clinical formula designed exclusively for your skin.</p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
          <a href="#sku-oil-balance" className="w-full md:w-auto btn-primary bg-white text-[var(--text)] border border-[var(--border)] hover:bg-[#C9A24A] hover:text-white justify-center text-[14px] py-5 px-8 rounded-xl shadow-sm transition-all duration-300">
            Oily Skin &rarr;
          </a>
          <a href="#sku-hydraglow" className="w-full md:w-auto btn-primary bg-white text-[var(--text)] border border-[var(--border)] hover:bg-[#C9A24A] hover:text-white justify-center text-[14px] py-5 px-8 rounded-xl shadow-sm transition-all duration-300">
            Dry Skin &rarr;
          </a>
          <a href="#sku-calm-skin" className="w-full md:w-auto btn-primary bg-white text-[var(--text)] border border-[var(--border)] hover:bg-[#C9A24A] hover:text-white justify-center text-[14px] py-5 px-8 rounded-xl shadow-sm transition-all duration-300">
            Sensitive Skin &rarr;
          </a>
        </div>
        </div>
      </section>

      {/* ────────────── PRODUCT SPOTLIGHT SECTIONS ────────────── */}
      <section id="sku-spotlights" className="bg-white">
        {products.map((p, i) => (
          <div
            id={`sku-${p.id}`}
            key={p.id}
            className={`section border-b border-[var(--border)] flex items-center justify-center ${i % 2 === 0 ? 'bg-white' : 'bg-[var(--surface)]'}`}
          >
            <div className={`container flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 lg:gap-16 items-center`}>
              {/* Image Column */}
              <div className="relative w-full lg:w-1/2 flex justify-center">
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
                      loading="lazy"
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
              <div className="w-full lg:w-1/2 text-center lg:text-left">
                <span className="ingredient-pill" style={{ marginBottom: '16px', background: p.bgColor, color: p.accentColor, border: `1px solid ${p.accentColor}33` }}>
                  {p.keyIngredient}
                </span>
                <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Target: {p.skinType}
                </p>
                <h2 className="text-[var(--text)] mb-3 tracking-[-0.02em]">
                  {p.name}
                </h2>
                <h3 className="text-[14px] lg:text-[16px] mb-8 font-inter tracking-[0.05em]" style={{ color: p.accentColor }}>
                  {p.tagline}
                </h3>
                
                <p className="text-[var(--text-muted)] mb-10 max-w-[500px] mx-auto lg:mx-0">
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

                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mx-auto lg:mx-0 max-w-[400px] sm:max-w-none">
                  <Link to={`/product/${p.slug}`} className="btn-primary w-full sm:w-auto justify-center md:px-8">
                    View Clinical Details
                  </Link>
                  <button 
                    onClick={() => addItem(p)}
                    className="btn-outline w-full sm:w-auto justify-center md:px-8" 
                  >
                    Add to Cart · ₹{p.price}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ────────────── BUNDLE SECTION ────────────── */}
      <section id="bundles" className="bg-[var(--surface)] section border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-10 lg:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-8 bg-[var(--accent)]" />
              <span className="text-[10px] lg:text-[11px] font-semibold text-[var(--accent)] tracking-[0.2em] uppercase">Exclusive Offers</span>
              <div className="h-[1px] w-8 bg-[var(--accent)]" />
            </div>
            <h2 className="text-[var(--text)]">
              Build Your Skin Reset Routine & Save
            </h2>
          </div>
          <div className="velcura-grid mb-8">
            {[
              { id: 'b1', name: 'Duo Pack', desc: 'Any 2 variants — Mix & match for your routine.', price: 1099, mrp: 1198, savings: '₹99', tag: 'Popular' },
              { id: 'b2', name: 'Trio Pack', desc: 'All 3 variants — Oil Balance + HydraGlow + Calm Barrier.', price: 1599, mrp: 1797, savings: '₹200', tag: 'Best Value' },
              { id: 'b3', name: 'Monthly Subscription', desc: 'Auto-delivered. Cancel anytime. Never run out again.', price: 539, mrp: 599, savings: '10% recurring', tag: 'VIP Perks' },
            ].map(b => (
              <div
                key={b.id}
                className="bg-white border border-[var(--border)] rounded-xl py-12 px-6 md:px-10 relative flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_60px_rgba(10,25,47,0.08)] hover:border-[rgba(201,162,74,0.3)]"
              >
                <div className="absolute top-6 right-6 bg-[rgba(201,162,74,0.1)] text-[var(--accent)] text-[10px] font-bold tracking-[0.1em] uppercase py-1.5 px-3 rounded-full">
                  {b.tag}
                </div>
                <h3 className="font-playfair text-3xl font-semibold mb-4 text-[var(--text)]">{b.name}</h3>
                <p className="text-[15px] text-[var(--text-muted)] mb-8 flex-1 leading-[1.6]">{b.desc}</p>
                
                <div className="mb-8">
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-semibold text-[var(--text)]">₹{b.price}</span>
                    <span className="text-sm text-[var(--text-subtle)] line-through">₹{b.mrp}</span>
                  </div>
                  <p className="text-[13px] text-[var(--accent)] font-semibold tracking-[0.02em]">Save {b.savings} + Free Shipping</p>
                </div>
                
                <button
                  id={`bundle-add-${b.id}`}
                  className="btn-primary w-full justify-center h-14 text-[13px]"
                  onClick={() => {}}
                >
                  <ShoppingBag size={16} /> Choose {b.name}
                </button>
              </div>
            ))}
          </div>
          <p className="text-center text-[13px] text-[var(--text-muted)] italic">
            *Free Skin Type Guide PDF included with your first bundle order.
          </p>
        </div>
      </section>

      {/* ────────────── INGREDIENT SCIENCE ────────────── */}
      <section id="ingredient-science" className="section bg-[#0A192F] relative overflow-hidden">
        {/* Decorative circles */}
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', border: '1px solid rgba(201,162,74,0.15)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', left: '-60px', width: '300px', height: '300px', borderRadius: '50%', border: '1px solid rgba(201,162,74,0.1)', pointerEvents: 'none' }} />

        <div
          ref={sciRef}
          className="container"
          style={{
            opacity: sciVisible ? 1 : 0,
            transform: sciVisible ? 'none' : 'translateY(24px)',
            transition: 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <span className="section-label text-[#C9A24A]">The Science</span>
              <h2 className="text-[#FDFBF7]">
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
                sub: 'Target: 4.0%',
                product: 'Oil Balance',
                desc: 'Doctor-approved for oil regulation. It interrupts pigment transfer and regulates sebaceous output—without stripping moisture.',
                color: '#2D7D77',
              },
              {
                number: '02',
                name: 'Hyaluronic Acid',
                sub: 'Target: 1.0%',
                product: 'HydraGlow',
                desc: 'Molecular humectant that holds 1000× its weight in water, providing deep hydration and plumping without greasiness.',
                color: '#8B6B3D',
              },
              {
                number: '03',
                name: 'Ceramide Complex',
                sub: 'Target: 1.2%',
                product: 'Calm Skin',
                desc: "Restores the skin's natural lipid barrier and protects against environmental irritants. Rebuilds your skin's moisture barrier.",
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
      <section className="section bg-[var(--bg)]">
        <div className="container text-center">
          <span className="section-label mx-auto">Why Velcura</span>
          <h2 className="text-[var(--text)] mb-10 lg:mb-16">
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
        <section className="section bg-[var(--surface)]">
          <div className="container">
            <div className="text-center mb-10 lg:mb-16">
              <span className="section-label mx-auto">Customer Stories</span>
              <h2 className="text-[var(--text)]">
                Real Skin. Real Results.
              </h2>
            </div>

            {/* Featured review */}
            <div style={{ maxWidth: '720px', margin: '0 auto', position: 'relative' }}>
              <div style={{ textAlign: 'center', padding: '48px', background: 'white', borderRadius: '16px', boxShadow: '0 8px 40px rgba(10,25,47,0.06)' }}>
                <Stars rating={reviews[reviewIdx].rating} />
                <blockquote className="italic text-[var(--text)] my-7">
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
      <section className="section bg-[#0A192F]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <span className="section-label text-[#C9A24A]">Our Story</span>
              <h2 className="text-[#FDFBF7] mb-6">
                The Velcura Philosophy
              </h2>
              <p className="text-[rgba(253,251,247,0.65)] mb-5">
                Velcura Hygiene Pvt Ltd was created with a singular conviction: cleansing should never come at the expense of skin health.
              </p>
              <p className="text-[rgba(253,251,247,0.65)] mb-10">
                Unlike ordinary wipes that strip and discard, our formulas combine high-performance makeup removal with dermatologically recognized skincare actives — protecting and strengthening your skin barrier with every use.
              </p>
              <Link to="/about" id="about-cta" className="btn-outline w-full sm:w-auto justify-center" style={{ borderColor: 'rgba(253,251,247,0.3)', color: '#FDFBF7' }}
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
        </div>
      </section>

      {/* ────────────── CTA BANNER ────────────── */}
      <section className="section text-center" style={{ background: 'linear-gradient(135deg, #C9A24A 0%, #A8833C 100%)' }}>
        <div className="container">
          <div className="max-w-[720px] mx-auto flex flex-col items-center">
            <h2 className="text-[#0A192F] mb-4">
              Find Your Perfect Formula
            </h2>
            <p className="text-[rgba(10,25,47,0.75)] mb-8">
              Oily, dry, or sensitive — there's a Velcura wipe made precisely for your skin.
            </p>
            <Link to="/shop" id="banner-shop-btn" className="btn-primary w-full sm:w-auto justify-center" style={{ background: '#0A192F', color: 'white', border: 'none' }}>
              Shop the Full Collection <ArrowRight size={16} />
            </Link>
          </div>
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
