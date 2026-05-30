import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight, Shield, Droplets, Sun, Leaf, BadgeCheck, Feather, Fingerprint, Gem, ShoppingBag } from 'lucide-react';
import { products, reviews } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import SEOHead from '../components/SEOHead';
import { formatPrice } from '../utils/helpers';
import NewsletterBanner from '../components/NewsletterBanner';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

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
  
  const { scrollY } = useScroll();
  const yBg = useTransform(scrollY, [0, 1000], [0, 250]);
  const yHeroObj = useTransform(scrollY, [0, 1000], [0, -150]);
  const opacityHero = useTransform(scrollY, [0, 600], [1, 0]);
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

  const { items: recentlyViewed } = useRecentlyViewed();

  return (
    <motion.div
      style={{ overflowX: 'hidden' }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
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
      <section id="hero" style={{ minHeight: '100vh', background: '#F5F0E8', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        {/* Top announcement bar */}
        <div style={{ background: '#0A192F', color: 'rgba(253,251,247,0.85)', fontSize: '12px', fontWeight: 500, letterSpacing: '0.08em', padding: '10px 20px', textAlign: 'center' }}>
          ◇ 100% Natural Ingredients · Dermatologist Tested · Free Shipping above ₹499
        </div>

        {/* Main hero body */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 'calc(100vh - 40px)' }} className="hero-two-col">
          {/* LEFT: editorial text */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px 60px 80px', position: 'relative', zIndex: 2 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <div style={{ width: '32px', height: '1px', background: '#C9A24A' }} />
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A24A' }}>Clinical Beauty Standard</span>
            </div>

            <h1 ref={heroRef} style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px, 5vw, 72px)', fontWeight: 400, lineHeight: 1.05, color: '#0A192F', marginBottom: '0', letterSpacing: '-0.02em' }}>
              Premium Makeup<br />Remover Wipes
            </h1>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(42px, 5vw, 72px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.05, color: '#C9A24A', marginBottom: '16px', letterSpacing: '-0.02em' }}>
              Made for Your Exact<br />Skin Type
            </h1>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: '18px',
              color: '#C9A24A',
              fontStyle: 'italic',
              marginBottom: '24px',
              lineHeight: 1.4
            }}>
              Dermatology-inspired formulas designed for real skin concerns
            </p>

            <p style={{ fontSize: '16px', color: 'rgba(10,25,47,0.6)', lineHeight: 1.7, maxWidth: '420px', marginBottom: '48px' }}>
              Gentle cleansing with real active ingredients. No tightness. No irritation. No shine. Just fresh, balanced skin in seconds.
            </p>

            {/* Shop buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px' }}>
              {[
                { label: 'SHOP OILY SKIN', to: '/shop?type=oily' },
                { label: 'SHOP DRY SKIN', to: '/shop?type=dry' },
                { label: 'SHOP SENSITIVE SKIN', to: '/shop?type=sensitive' },
              ].map(btn => (
                <Link key={btn.to} to={btn.to} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', padding: '14px 24px', border: '1px solid rgba(10,25,47,0.2)', borderRadius: '12px', color: '#0A192F', textDecoration: 'none', background: 'transparent', transition: 'all 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#0A192F'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#0A192F'; }}>
                  {btn.label}
                </Link>
              ))}
              <button onClick={() => document.getElementById('skin-advisor-trigger')?.click()}
                style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', padding: '14px 24px', borderRadius: '12px', color: 'white', background: '#C9A24A', border: '1px solid #C9A24A', cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#A8833C'}
                onMouseLeave={e => e.currentTarget.style.background = '#C9A24A'}>
                TAKE 30S SKIN QUIZ
              </button>
            </div>

            {/* Trust micro-stats */}
            <div style={{ display: 'flex', gap: '32px', marginTop: '16px' }}>
              {[['4.8/5', 'Average Rating'], ['500+', 'Happy Users'], ['0%', 'Harsh Alcohol']].map(([n, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '22px', fontWeight: 700, color: '#C9A24A' }}>{n}</div>
                  <div style={{ fontSize: '11px', color: 'rgba(10,25,47,0.5)', letterSpacing: '0.05em' }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: product image */}
          <div style={{ position: 'relative', overflow: 'hidden', background: 'linear-gradient(135deg, #EDE8DE 0%, #D8D0C0 100%)' }}>
            {/* Glassmorphism Rating Badge */}
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8, duration: 0.6 }}
              style={{ position: 'absolute', top: '10%', right: '8%', zIndex: 10, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 8px 32px rgba(10,25,47,0.1)' }}>
              <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 700, color: '#0A192F', lineHeight: 1 }}>4.8<span style={{ fontSize: '14px', fontWeight: 400 }}>/5</span></div>
              <div style={{ fontSize: '9px', fontWeight: 700, letterSpacing: '0.15em', color: '#C9A24A', textTransform: 'uppercase', marginTop: '4px' }}>Clinically Rated</div>
            </motion.div>

            {/* Niacinamide Badge */}
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1, duration: 0.6 }}
              style={{ position: 'absolute', bottom: '15%', right: '6%', zIndex: 10, background: 'rgba(255,255,255,0.85)', backdropFilter: 'blur(16px)', border: '1px solid rgba(255,255,255,0.6)', borderRadius: '999px', padding: '10px 18px', boxShadow: '0 8px 32px rgba(10,25,47,0.1)' }}>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: '#0A192F' }}>4% NIACINAMIDE</span>
            </motion.div>

            <motion.img
              src="/product-trio.jpg"
              alt="Velcura Product Collection"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&q=80'; }}
            />

            {/* Scroll indicator */}
            <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, rgba(10,25,47,0.3))' }} />
              <span style={{ fontSize: '9px', letterSpacing: '0.2em', color: 'rgba(10,25,47,0.4)', textTransform: 'uppercase' }}>Scroll</span>
            </div>
          </div>
        </div>
      </section>

      {/* ────────────── MARQUEE STRIP ────────────── */}
      <div style={{ background: '#F5F0E8', borderTop: '1px solid rgba(10,25,47,0.08)', borderBottom: '1px solid rgba(10,25,47,0.08)', overflow: 'hidden', padding: '18px 0' }}>
        <style>{`
          @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          .marquee-inner { display: flex; gap: 0; animation: marqueeScroll 28s linear infinite; width: max-content; }
          .marquee-inner span { white-space: nowrap; padding: 0 40px; font-size: 12px; font-weight: 600; letter-spacing: 0.12em; color: rgba(10,25,47,0.5); text-transform: uppercase; }
          .marquee-inner span.dot { color: #C9A24A; padding: 0; font-size: 16px; }
          @media (max-width: 768px) { .hero-two-col { grid-template-columns: 1fr !important; } }
        `}</style>
        <div className="marquee-inner">
          {[...Array(4)].map((_, rep) => (
            ['Made in India', '◇', 'Dermatologically Inspired', '◇', 'Alcohol-Free', '◇', 'Skin-Type Specific', '◇', 'Premium Actives', '◇'].map((item, i) => (
              <span key={`${rep}-${i}`} className={item === '◇' ? 'dot' : ''}>{item}</span>
            ))
          ))}
        </div>
      </div>

      {/* ────────────── OUR APPROACH ────────────── */}
      <motion.section style={{ background: '#F5F0E8', padding: '100px 0' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#C9A24A', textTransform: 'uppercase', display: 'block', marginBottom: '20px' }}>Our Approach</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#0A192F', lineHeight: 1.1, marginBottom: '0' }}>
                Not just makeup<br /><em style={{ fontStyle: 'italic', color: '#0A192F' }}>removal.</em>
              </h2>
            </div>
            <div>
              <p style={{ fontSize: '16px', color: 'rgba(10,25,47,0.6)', lineHeight: 1.8, marginBottom: '32px' }}>
                A wipe shouldn't be a compromise. Velcura combines high-performance cleansing with active ingredients you'd find in a serum — leaving your barrier stronger, not weaker.
              </p>
              <Link to="/ingredients" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0A192F', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #0A192F', paddingBottom: '4px' }}>
                Explore The Science <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* 3 feature cards */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2px', marginTop: '80px', background: 'rgba(10,25,47,0.08)', borderRadius: '16px', overflow: 'hidden' }}>
            {[
              { icon: <Droplets size={28} strokeWidth={1.5} />, title: 'Removes Everything', body: 'Effectively dissolves waterproof makeup, SPF, and urban pollution without harsh rubbing.' },
              { icon: <Gem size={28} strokeWidth={1.5} />, title: 'Treats Skin', body: 'Infused with Niacinamide and Hyaluronic Acid to nourish while you cleanse.' },
              { icon: <Shield size={28} strokeWidth={1.5} />, title: 'Protects Barrier', body: 'Maintains your skin\'s natural pH and lipid barrier. Zero post-cleanse tightness.' },
            ].map((card, i) => (
              <div key={i} style={{ background: '#F5F0E8', padding: '40px 32px', transition: 'background 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.background = '#EDE5D5'}
                onMouseLeave={e => e.currentTarget.style.background = '#F5F0E8'}>
                <div style={{ color: '#C9A24A', marginBottom: '20px' }}>{card.icon}</div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '20px', color: '#0A192F', marginBottom: '12px', fontWeight: 500 }}>{card.title}</h3>
                <p style={{ fontSize: '14px', color: 'rgba(10,25,47,0.55)', lineHeight: 1.7 }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ────────────── TRUST ELEMENTS ────────────── */}
      <section className="bg-white section border-b border-[var(--border)]">
        <div className="container flex flex-col md:flex-row justify-between items-center gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <div className="flex text-[#C9A24A]">
              {[...Array(5)].map((_, i) => <svg key={i} width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><polygon points="12,2 15,9 22,9 17,14 18.5,21 12,17 5.5,21 7,14 2,9 9,9"/></svg>)}
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

      {/* ────────────── THE COLLECTION ────────────── */}
      <motion.section style={{ background: '#F5F0E8', padding: '100px 0' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '60px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#C9A24A', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>The Collection</span>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#0A192F', lineHeight: 1.1, margin: 0 }}>
                Find your<br /><em style={{ fontStyle: 'italic' }}>perfect wipe.</em>
              </h2>
            </div>
            <Link to="/shop" style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0A192F', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px', border: '1px solid rgba(10,25,47,0.2)', padding: '14px 24px', borderRadius: '12px' }}>
              VIEW ALL <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }} className="collection-grid">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </motion.section>

      {/* ────────────── PRODUCT SPOTLIGHT SECTIONS ────────────── */}
      <motion.section
        id="sku-spotlights"
        className="bg-white"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
      >
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
                      alt={p.name} 
                      loading="lazy"
                      style={{ 
                        maxWidth: '90%', 
                        maxHeight: '400px', 
                        objectFit: 'contain', 
                        filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' 
                      }} 
                      onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'; }}
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
      </motion.section>

      {/* ────────────── BUILD YOUR ROUTINE ────────────── */}
      <motion.section id="bundles" style={{ background: '#F5F0E8', padding: '100px 0' }} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', color: '#C9A24A', textTransform: 'uppercase', display: 'block', marginBottom: '16px' }}>Build Your Routine</span>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 400, color: '#0A192F', lineHeight: 1.1, margin: 0 }}>Curated combinations.</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }} className="collection-grid">
            {[
              {
                id: 'starter-trio',
                badge: 'BEST VALUE',
                badgeStyle: { background: '#C9A24A', color: 'white' },
                name: 'Starter Trio',
                sub: 'All 3 variants (75 wipes) — Oil Balance + Daily Reset + Calm & Restore.',
                items: [products[0], products[1], products[2]],
                price: 399,
                mrp: 499,
                dark: true
              },
              {
                id: 'try-any-2',
                badge: 'POPULAR',
                badgeStyle: { background: '#0A192F', color: 'white' },
                name: 'Try Any 2',
                sub: 'Choose your variants (2 packs of 25 wipes) — Mix & match any 2 packs.',
                items: [products[0], products[1]],
                price: 269,
                mrp: 349,
                dark: false
              },
              {
                id: 'monthly-supply',
                badge: 'GREAT VALUE',
                badgeStyle: { background: '#0A192F', color: 'white' },
                name: 'Monthly Supply',
                sub: '2 packs same variant (2 packs of 25 wipes) — Stock up on your favorite.',
                items: [products[0], products[0]],
                price: 259,
                mrp: 349,
                dark: false
              },
              {
                id: 'gift-set',
                badge: 'PREMIUM',
                badgeStyle: { background: '#C9A24A', color: 'white' },
                name: 'Gift Set',
                sub: 'All 3 variants + premium gift box (75 wipes). Perfect for gifting.',
                items: [products[0], products[1], products[2]],
                price: 549,
                mrp: 649,
                dark: true
              },
              {
                id: 'subscribe-save',
                badge: 'VIP PERKS',
                badgeStyle: { background: '#0A192F', color: 'white' },
                name: 'Subscribe & Save',
                sub: 'Subscribe to any SKU monthly (25 wipes). Cancel anytime.',
                items: [products[1]],
                price: 129,
                mrp: 179,
                isSubscription: true,
                dark: false
              }
            ].map(b => {
              const originalPrice = b.mrp;
              const bundlePrice = b.price;
              return (
                <div key={b.id} style={{ background: b.dark ? '#0A192F' : 'white', borderRadius: '16px', padding: '32px', display: 'flex', flexDirection: 'column', position: 'relative', transition: 'transform 0.2s', border: b.dark ? 'none' : '1px solid rgba(10,25,47,0.08)' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'none'}>
                  <span style={{ ...b.badgeStyle, fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', padding: '6px 14px', borderRadius: '999px', display: 'inline-block', marginBottom: '24px', alignSelf: 'flex-start' }}>{b.badge}</span>
                  <div style={{ display: 'flex', gap: '-8px', marginBottom: '20px' }}>
                    {b.items.slice(0, 3).map((p, pi) => (
                      <img key={p?.id || pi} src={p?.image || '/velcura-logo.png'} alt={p?.name} style={{ width: '64px', height: '64px', objectFit: 'contain', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', marginLeft: pi > 0 ? '-8px' : 0 }}
                        onError={e => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=80&q=80'; }} />
                    ))}
                  </div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 400, color: b.dark ? 'white' : '#0A192F', marginBottom: '8px' }}>{b.name}</h3>
                  <p style={{ fontSize: '13px', color: b.dark ? 'rgba(255,255,255,0.55)' : 'rgba(10,25,47,0.5)', marginBottom: '20px' }}>{b.sub}</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {b.items.map((p, pi) => (
                      <li key={p?.id || pi} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: b.dark ? 'rgba(255,255,255,0.7)' : 'rgba(10,25,47,0.6)' }}>
                        <span style={{ color: '#C9A24A' }}>🛡️</span> {p?.name || 'Velcura Wipe'}
                      </li>
                    ))}
                  </ul>
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '28px', fontWeight: 700, color: b.dark ? 'white' : '#0A192F' }}>
                        ₹{bundlePrice}{b.isSubscription ? '/month' : ''}
                      </span>
                      <span style={{ fontSize: '14px', color: b.dark ? 'rgba(255,255,255,0.35)' : 'rgba(10,25,47,0.3)', textDecoration: 'line-through' }}>
                        ₹{originalPrice}{b.isSubscription ? '/month' : ''}
                      </span>
                    </div>
                    <div style={{ fontSize: '11px', color: b.dark ? '#C9A24A' : 'var(--accent)', marginTop: '4px', fontWeight: 500 }}>
                      Launch price — limited to first batch only.
                    </div>
                  </div>
                  <button style={{ width: '100%', padding: '14px', borderRadius: '12px', border: b.dark ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(10,25,47,0.15)', background: b.dark ? 'rgba(255,255,255,0.08)' : 'transparent', color: b.dark ? 'white' : '#0A192F', fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', cursor: 'pointer', transition: 'all 0.2s' }}
                    onClick={() => {
                      addItem({
                        id: b.id,
                        name: b.name,
                        price: b.price,
                        image: b.id === 'starter-trio' || b.id === 'gift-set' ? products[0].image : '/velcura-logo.png',
                        skinType: b.sub,
                        stock: 10,
                        qty: 1
                      });
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = b.dark ? 'rgba(255,255,255,0.15)' : '#0A192F'; if (!b.dark) e.currentTarget.style.color = 'white'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = b.dark ? 'rgba(255,255,255,0.08)' : 'transparent'; if (!b.dark) e.currentTarget.style.color = '#0A192F'; }}>
                    ADD TO CART
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* ────────────── INGREDIENT SCIENCE ────────────── */}
      <motion.section
        id="ingredient-science"
        className="section bg-[#0A192F] relative overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.55 }}
      >
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
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '48px', color: 'rgba(201,162,74,0.15)', fontWeight: 700, lineHeight: 1, display: 'block', marginBottom: '24px' }}>
                  {ing.number}
                </span>
                <p style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.15em', color: ing.color, textTransform: 'uppercase', marginBottom: '8px' }}>
                  {ing.sub} · {ing.product}
                </p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '26px', fontWeight: 600, color: '#FDFBF7', marginBottom: '16px' }}>
                  {ing.name}
                </h3>
                <p style={{ fontSize: '14px', color: 'rgba(253,251,247,0.6)', lineHeight: '1.7' }}>
                  {ing.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ────────────── WHY VELCURA ────────────── */}
      <motion.section
        className="section bg-[var(--bg)]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.section>

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
      <motion.section
        className="section bg-[#0A192F]"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
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
              { num: '100%', label: 'Skin Confidence' },
            ].map(stat => (
              <div key={stat.label} style={{
                padding: '32px 24px',
                border: '1px solid rgba(253,251,247,0.1)',
                borderRadius: '12px',
                background: 'rgba(253,251,247,0.03)',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '40px', fontWeight: 700, color: 'var(--accent)', lineHeight: 1.1, marginBottom: '8px' }}>
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
      </motion.section>

      {/* ────────────── CTA BANNER ────────────── */}
      <motion.section
        className="section text-center"
        style={{ background: 'linear-gradient(135deg, #C9A24A 0%, #A8833C 100%)' }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.5 }}
      >
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
      </motion.section>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .collection-grid { grid-template-columns: 1fr !important; }
          .hero-two-col { grid-template-columns: 1fr !important; }
        }
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

      {/* Newsletter Banner */}
      <NewsletterBanner />

      {/* Recently Viewed */}
      {recentlyViewed.length > 0 && (
        <motion.section
          style={{ padding: '64px 32px', background: 'white' }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
        >
          <div className="container">
            <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '8px' }}>Your History</p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 600, color: '#0A192F', marginBottom: '32px' }}>
              Recently Viewed
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
              {recentlyViewed.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </motion.section>
      )}
    </motion.div>
  );
};

export default Home;
