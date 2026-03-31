import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ShoppingBag, Check, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SkinQuiz from '../components/SkinQuiz';

const Shop = () => {
  const [filter, setFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All Products' },
    { id: 'oily', label: 'Oily Skin' },
    { id: 'dry', label: 'Dry Skin' },
    { id: 'sensitive', label: 'Sensitive Skin' },
  ];

  const filtered = filter === 'all'
    ? products
    : products.filter(p => p.tags.includes(filter));

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
      {/* Header */}
      <section style={{
        background: '#0A192F',
        padding: '100px 32px 60px',
        textAlign: 'center',
      }}>
        <span className="section-label">The Collection</span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, color: '#FDFBF7', marginBottom: '16px' }}>
          Shop Velcura
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(253,251,247,0.6)', maxWidth: '500px', margin: '0 auto', lineHeight: '1.7' }}>
          Every formula engineered with a purpose: real skincare ingredients for real skin.
        </p>
      </section>

      {/* Filter bar */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '0 32px', position: 'sticky', top: '64px', zIndex: 30 }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '8px', overflowX: 'auto', padding: '16px 0' }}>
          <Filter size={14} color="var(--text-muted)" style={{ flexShrink: 0 }} />
          {filters.map(f => (
            <button
              key={f.id}
              id={`filter-${f.id}`}
              onClick={() => setFilter(f.id)}
              style={{
                background: filter === f.id ? 'var(--text)' : 'transparent',
                color: filter === f.id ? 'white' : 'var(--text-muted)',
                border: `1px solid ${filter === f.id ? 'var(--text)' : 'var(--border)'}`,
                padding: '8px 20px',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                borderRadius: '12px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Products grid */}
      <section style={{ padding: '64px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px' }}>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '32px' }}>
            {filtered.map(p => <ProductCard key={p.id} product={p} variant="featured" />)}
          </div>
        </div>
      </section>

      {/* 1. Bundles section */}
      <section id="bundles" style={{ background: 'var(--surface)', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{ height: '1px', width: '48px', background: 'var(--accent)' }} />
              <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase' }}>Exclusive Offers</span>
              <div style={{ height: '1px', width: '48px', background: 'var(--accent)' }} />
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(36px, 4vw, 48px)', fontWeight: 600, color: 'var(--text)' }}>
              Build Your Skin Reset Routine & Save
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', marginBottom: '32px' }}>
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
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', height: '56px', fontSize: '13px' }}
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
      <section style={{ background: 'white', padding: '100px 32px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 600, color: 'var(--text)' }}>
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
      </section>

      {/* 3. Skin-Type Quiz */}
      <section style={{ background: 'var(--bg)', padding: '100px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 600, color: 'var(--text)', marginBottom: '16px' }}>
              Not sure which wipe is best for you?
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-muted)' }}>Take our diagnostic 30-second quiz to find your exact formula match.</p>
          </div>
          
          <SkinQuiz />
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section style={{ background: 'var(--surface)', padding: '100px 32px', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '16px', display: 'block' }}>Common Questions</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 4vw, 42px)', fontWeight: 600, color: 'var(--text)' }}>
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
                <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.6', paddingLeft: '28px' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
