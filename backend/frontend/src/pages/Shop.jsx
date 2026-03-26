import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Filter, ShoppingBag } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

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
    { id: 'b1', name: 'Complete Skin Ritual', desc: 'All 3 formulas — Oil Balance + HydraGlow + Calm Skin', price: 1199, mrp: 1497, savings: '₹298', tag: 'Best Value' },
    { id: 'b2', name: 'Hydration Duo', desc: 'HydraGlow + Calm Skin — perfect for sensitive or dry skin', price: 849, mrp: 998, savings: '₹149', tag: 'Popular' },
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

      {/* Bundles section */}
      <section id="bundles" style={{ background: 'var(--surface)', padding: '80px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span className="section-label">Save More</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 600 }}>
              Velcura Bundles
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {bundles.map(b => (
              <div
                key={b.id}
                style={{
                  background: 'white',
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '40px',
                  position: 'relative',
                  transition: 'box-shadow 0.3s, transform 0.3s',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 30px 60px rgba(10,25,47,0.12)'; e.currentTarget.style.transform = 'translateY(-8px)'; }}
                onMouseLeave={e => { e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
              >
                {/* Subtle Shimmer on Card */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 45%, rgba(201,162,74,0.05) 50%, transparent 55%)',
                  backgroundSize: '300% 300%',
                  animation: 'shimmer 8s infinite linear',
                  pointerEvents: 'none',
                }} />

                <div style={{ position: 'absolute', top: '24px', right: '24px', background: 'var(--accent)', color: '#0A192F', fontSize: '10px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', padding: '6px 14px', borderRadius: '12px' }}>
                  {b.tag}
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', fontWeight: 600, marginBottom: '12px' }}>{b.name}</h3>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', marginBottom: '28px', lineHeight: '1.7' }}>{b.desc}</p>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '32px', fontWeight: 800, color: 'var(--text)' }}>₹{b.price}</span>
                  <span style={{ fontSize: '16px', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>₹{b.mrp}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#16a34a', fontWeight: 700, marginBottom: '32px', letterSpacing: '0.05em' }}>Save {b.savings} and elevate your ritual</p>
                <button
                  id={`bundle-add-${b.id}`}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', height: '54px' }}
                  onClick={() => {}}
                >
                  <ShoppingBag size={18} /> Add Bundle to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
