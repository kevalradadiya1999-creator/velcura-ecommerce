import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ShoppingBag, Check, X } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SkinQuiz from '../components/SkinQuiz';
import SEOHead from '../components/SEOHead';

const Shop = () => {
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('featured');

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'oily', label: 'Oily Skin' },
    { id: 'dry', label: 'Dry Skin' },
    { id: 'sensitive', label: 'Sensitive Skin' },
  ];

  const filtered = useMemo(() => {
    let result = filter === 'all' ? [...products] : products.filter(p => p.tags.includes(filter));
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    else if (sort === 'newest') result = [...result].reverse();
    return result;
  }, [filter, sort]);

  // Bundle packs
  const bundles = [
    { id: 'b1', name: 'Duo Pack', desc: 'Any 2 variants — Mix & match for your routine.', price: 1099, mrp: 1198, savings: '₹99', tag: 'Popular' },
    { id: 'b2', name: 'Trio Pack', desc: 'All 3 variants — Oil Balance + HydraGlow + Calm Barrier.', price: 1599, mrp: 1797, savings: '₹200', tag: 'Best Value' },
    { id: 'b3', name: 'Monthly Subscription', desc: 'Auto-delivered. Cancel anytime. Never run out again.', price: 539, mrp: 599, savings: '10% recurring', tag: 'VIP Perks' },
  ];
  
  const faqs = [
    { q: "How many wipes per pack?", a: "50 wipes per pack." },
    { q: "Do they remove waterproof makeup?", a: "Yes, effortlessly and without harsh rubbing." },
    { q: "Are they safe for sensitive skin?", a: "Yes, fragrance-free with protective ceramides." },
    { q: "Where is shipping from?", a: "Ahmedabad, ensuring fast delivery across India." },
    { q: "What is the return policy?", a: "Unopened packs can be returned within 7 days." },
    { q: "Do you offer subscriptions?", a: "Yes, get 10% off recurring orders and free shipping." }
  ];

  return (
    <div>
      <SEOHead
        title="Shop Velcura — Clinical Skincare Wipes for Every Skin Type"
        description="Shop our range of clinical-grade makeup remover wipes. Oil Balance (Niacinamide), HydraGlow (Hyaluronic Acid), Calm Barrier (Ceramides). Free shipping on Trio Pack."
        url="/shop"
      />
      {/* Header */}
      <section className="section text-center bg-[#0A192F]">
        <div className="container">
          <span className="section-label text-[#C9A24A] mx-auto">The Collection</span>
          <h1 className="text-[#FDFBF7] mb-4">
            Shop Velcura
          </h1>
          <p className="text-[rgba(253,251,247,0.6)] max-w-[500px] mx-auto">
            Every formula engineered with a purpose: real skincare ingredients for real skin.
          </p>
        </div>
      </section>

      {/* Filter + Sort bar */}
      <div className="bg-white border-b border-[var(--border)] sticky top-16 z-30">
        <div className="container flex items-center gap-2 overflow-x-auto py-3" style={{ flexWrap: 'wrap' }}>
          <Filter size={14} color="var(--text-muted)" className="flex-shrink-0" />
          {filters.map(f => (
            <button
              key={f.id}
              id={`filter-${f.id}`}
              onClick={() => setFilter(f.id)}
              style={{
                background: filter === f.id ? 'var(--text)' : 'transparent',
                color: filter === f.id ? 'white' : 'var(--text-muted)',
                border: `1px solid ${filter === f.id ? 'var(--text)' : 'var(--border)'}`,
                padding: '7px 18px',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '999px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
          <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
            <select
              id="sort-select"
              value={sort}
              onChange={e => setSort(e.target.value)}
              style={{
                border: '1px solid var(--border)',
                borderRadius: '8px',
                padding: '7px 12px',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                color: 'var(--text-muted)',
                background: 'white',
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products grid */}
      <section className="section bg-[var(--bg)]">
        <div className="container">
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '24px' }}>
            Showing <strong>{filtered.length}</strong> of <strong>{products.length}</strong> products
          </p>
          <div className="velcura-grid" style={{ opacity: 1, transition: 'opacity 0.25s ease' }}>
            <AnimatePresence mode="popLayout">
              {filtered.map((p, index) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                >
                  <ProductCard product={p} variant="featured" />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* 1. Bundles section */}
      <section id="bundles" className="section bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-10 lg:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-8 lg:w-12 bg-[var(--accent)]" />
              <span className="text-[10px] lg:text-[11px] font-semibold text-[var(--accent)] tracking-[0.2em] uppercase">Exclusive Offers</span>
              <div className="h-[1px] w-8 lg:w-12 bg-[var(--accent)]" />
            </div>
            <h2 className="text-[var(--text)]">
              Build Your Skin Reset Routine & Save
            </h2>
          </div>
          <div className="velcura-grid mb-8">
            {bundles.map(b => (
              <div
                key={b.id}
                style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '48px 40px',
                  position: 'relative',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column'
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 30px 60px rgba(10,25,47,0.08)'; e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(201,162,74,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'rgba(201,162,74,0.1)', color: 'var(--accent)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '6px 12px', borderRadius: '20px' }}>
                  {b.tag}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 600, marginBottom: '16px', color: 'var(--text)' }}>{b.name}</h3>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', marginBottom: '32px', lineHeight: '1.6', flex: 1 }}>{b.desc}</p>
                
                <div style={{ marginBottom: '32px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '36px', fontWeight: 600, color: 'var(--text)' }}>₹{b.price}</span>
                    <span style={{ fontSize: '14px', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>₹{b.mrp}</span>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.02em' }}>Save {b.savings} + Free Shipping</p>
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
          <p style={{ textAlign: 'center', fontSize: '13px', color: 'var(--text-muted)', fontStyle: 'italic' }}>
            *Free Skin Type Guide PDF included with your first bundle order.
          </p>
        </div>
      </section>

      {/* 2. Comparison Table */}
      <section className="section bg-white border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-[900px] mx-auto">
            <div className="text-center mb-10 lg:mb-16">
              <h2 className="text-[var(--text)]">
                Velcura vs. Regular Drugstore Wipes
              </h2>
            </div>
          
          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
              <thead>
                <tr>
                  <th style={{ padding: '24px', borderBottom: '2px solid var(--border)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', width: '30%' }}>Feature</th>
                  <th style={{ padding: '24px', borderBottom: '2px solid var(--accent)', fontSize: '18px', fontFamily: "'Playfair Display', serif", color: 'var(--text)', background: 'rgba(201,162,74,0.03)', width: '35%' }}>Velcura Wipes</th>
                  <th style={{ padding: '24px', borderBottom: '2px solid var(--border)', fontSize: '16px', color: 'var(--text-muted)', width: '35%' }}>Regular Wipes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Formulation', velcura: 'Skin-Type Specific (Oily, Dry, Sensitive)', regular: 'Generic "One-Size-Fits-All"' },
                  { feature: 'Core Ingredients', velcura: 'Dermatological Actives (Ceramides, HA)', regular: 'Harsh Surfactants & Alcohol' },
                  { feature: 'After-Use Feel', velcura: 'Balanced, Soft, & Hydrated', regular: 'Tight, Stripped, or Sticky' },
                  { feature: 'Fragrance', velcura: '100% Fragrance-Free or Minimal', regular: 'Heavy Synthetic Perfumes' }
                ].map((row, i, arr) => (
                  <tr key={i} style={{ borderBottom: i === arr.length - 1 ? 'none' : '1px solid var(--border)' }}>
                    <td style={{ padding: '24px', fontSize: '15px', fontWeight: 600, color: 'var(--text)' }}>{row.feature}</td>
                    <td style={{ padding: '24px', fontSize: '15px', color: 'var(--text)', background: 'rgba(201,162,74,0.03)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <Check size={18} color="var(--accent)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{row.velcura}</span>
                      </div>
                    </td>
                    <td style={{ padding: '24px', fontSize: '15px', color: 'var(--text-subtle)' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                        <X size={18} color="var(--border)" style={{ marginTop: '2px', flexShrink: 0 }} />
                        <span>{row.regular}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      </section>

      {/* 3. Skin-Type Quiz */}
      <section className="section bg-[var(--bg)] border-t border-[var(--border)]">
        <div className="container">
          <div className="text-center mb-10 lg:mb-16">
            <h2 className="text-[var(--text)] mb-4">
              Not sure which wipe is best for you?
            </h2>
            <p className="text-[var(--text-muted)]">Take our diagnostic 30-second quiz to find your exact formula match.</p>
          </div>
          
          <SkinQuiz />
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section className="section bg-[var(--surface)] border-t border-[var(--border)]">
        <div className="container">
          <div className="max-w-[800px] mx-auto">
            <div className="text-center mb-10 lg:mb-16">
              <span className="section-label mx-auto text-[#C9A24A]">Common Questions</span>
              <h2 className="text-[var(--text)]">
                Frequently Asked Questions
              </h2>
            </div>
          
          <div style={{ display: 'grid', gap: '24px' }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '12px', background: 'white' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 600, color: 'var(--text)', marginBottom: '12px', display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <span style={{ color: 'var(--accent)' }}>Q.</span>
                  {faq.q}
                </h3>
                <p className="text-[var(--text-muted)] pl-7">{faq.a}</p>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
