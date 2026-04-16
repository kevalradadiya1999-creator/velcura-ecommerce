import { useParams, Link } from 'react-router-dom';
import { useState } from 'react';
import { ArrowRight, Check, ChevronDown, Star } from 'lucide-react';
import { products, reviews } from '../data/products';
import ProductCard from '../components/ProductCard';
import { useCart } from '../context/CartContext';
import SEOHead from '../components/SEOHead';

const ProductPage = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const product = products.find(p => p.slug === slug);
  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState('benefits');

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', marginBottom: '16px' }}>Product Not Found</h1>
        <Link to="/shop" className="btn-primary">Back to Shop</Link>
      </div>
    );
  }

  const productReviews = reviews.filter(r => r.product === product.slug);
  const related = products.filter(p => p.slug !== slug);
  const discount = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  const accordionSections = [
    {
      id: 'benefits',
      title: 'Benefits',
      content: (
        <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {product.benefits.map(b => (
            <li key={b} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--gold-light)', border: '1px solid rgba(201,162,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={11} color="var(--accent)" strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>{b}</span>
            </li>
          ))}
        </ul>
      ),
    },
    {
      id: 'howtouse',
      title: 'How to Use',
      content: <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7' }}>{product.howToUse}</p>,
    },
    {
      id: 'ingredients',
      title: 'Key Ingredient',
      content: (
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px', padding: '20px', background: 'var(--surface)', borderRadius: '8px' }}>
          <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gold-light)', border: '1.5px solid rgba(201,162,74,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span style={{ fontSize: '18px', color: 'var(--accent)' }}>{product.id === 'oil-balance' ? '⬡' : product.id === 'hydraglow' ? '◈' : '⬜'}</span>
          </div>
          <div>
            <p style={{ fontWeight: 700, color: 'var(--text)', marginBottom: '6px' }}>{product.keyIngredient} Content</p>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>{product.description}</p>
          </div>
        </div>
      ),
    },
    {
      id: 'science',
      title: 'Formulation & Science',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '4px' }}>Expertly formulated with high-purity actives:</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {product.formulation.map(f => (
              <div key={f.name} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', background: 'white', borderRadius: '6px', border: '1px solid var(--border)' }}>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)' }}>{f.name}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{f.role}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent)' }}>{f.conc}</p>
                </div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '11px', color: 'var(--text-subtle)', fontStyle: 'italic', marginTop: '8px' }}>
            Substrate: {product.substrate}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div>
      <SEOHead
        title={`${product.fullName} — Velcura | ${product.skinType}`}
        description={product.shortDesc + ` Key active: ${product.keyIngredient}. Alcohol-free, pH-balanced. ₹${product.price} for 30 wipes.`}
        url={`/product/${product.slug}`}
        type="product"
        schema={{
          "@context": "https://schema.org",
          "@type": "Product",
          "name": product.fullName,
          "description": product.description,
          "brand": { "@type": "Brand", "name": "Velcura Hygiene" },
          "image": `https://velcurahygiene.in${product.image}`,
          "sku": product.id,
          "offers": {
            "@type": "Offer",
            "price": product.price,
            "priceCurrency": "INR",
            "availability": "https://schema.org/InStock",
            "url": `https://velcurahygiene.in/product/${product.slug}`,
          },
        }}
      />
      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface)', padding: '14px 32px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', gap: '8px', alignItems: 'center', fontSize: '12px', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>Home</Link>
          <span>/</span>
          <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}>Shop</Link>
          <span>/</span>
          <span style={{ color: 'var(--accent)', fontWeight: 600 }}>{product.fullName}</span>
        </div>
      </div>

      {/* Main product section */}
      <section style={{ padding: '60px 32px' }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'start',
        }}
        className="product-grid"
        >
          {/* Left: Images */}
          <div>
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              background: product.bgColor,
              padding: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '16px',
              minHeight: '500px',
            }}>
              <img
                src={product.image}
                alt={product.fullName}
                loading="lazy"
                width="400"
                height="380"
                style={{ maxWidth: '80%', maxHeight: '380px', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(10,25,47,0.15))' }}
              />
            </div>
            {/* Thumbnail row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
              {[product, ...related.slice(0, 2)].map((p, i) => (
                <Link key={p.id} to={`/product/${p.slug}`} style={{
                  borderRadius: '10px',
                  overflow: 'hidden',
                  background: p.bgColor,
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: i === 0 ? '2px solid var(--accent)' : '2px solid transparent',
                  minHeight: '80px',
                  transition: 'border-color 0.2s',
                }}>
                  <img src={p.image} alt={p.name} style={{ height: '60px', objectFit: 'contain' }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Info */}
          <div style={{ position: 'sticky', top: '100px' }}>
            {product.badge && (
              <div style={{ display: 'inline-block', background: '#0A192F', color: 'white', padding: '4px 12px', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '20px' }}>
                {product.badge}
              </div>
            )}

            <span className="ingredient-pill" style={{ marginBottom: '12px' }}>{product.keyIngredient}</span>

            <p style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: '8px', marginBottom: '8px' }}>
              {product.skinType}
            </p>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(28px, 3.5vw, 40px)',
              fontWeight: 600,
              color: 'var(--text)',
              marginBottom: '8px',
              lineHeight: 1.15,
            }}>
              {product.fullName}
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '20px' }}>
              {product.tagline}
            </p>

            {/* Rating */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} fill={i < Math.floor(product.rating) ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth={1.5} />
                ))}
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600 }}>{product.rating}</span>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>({product.reviews} reviews)</span>
            </div>

            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '28px' }}>
              {product.shortDesc}
            </p>

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text)' }}>₹{product.price}</span>
              <span style={{ fontSize: '16px', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>₹{product.mrp}</span>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                {discount}% OFF
              </span>
            </div>

            {/* Qty + Add to Cart */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  id="qty-decrease"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  style={{ width: '44px', height: '52px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--text)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  −
                </button>
                <span style={{ width: '48px', textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{qty}</span>
                <button
                  id="qty-increase"
                  onClick={() => setQty(q => q + 1)}
                  style={{ width: '44px', height: '52px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--text)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  +
                </button>
              </div>
              <button
                id="add-to-cart-detail"
                onClick={() => addItem(product, qty)}
                className="btn-primary"
                style={{ flex: 1 }}
              >
                Add to Cart · ₹{(product.price * qty).toLocaleString()}
              </button>
            </div>

            {/* Introductory Bundles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
              <Link to="/shop" className="btn-outline" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: '13px' }}>
                <span>📦 <strong>Duo Pack</strong> (Any 2 variants)</span>
                <span>₹579 <span style={{color: '#16a34a', fontWeight: 'bold'}}>(Save ₹19)</span></span>
              </Link>
              <Link to="/shop" className="btn-outline" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: '13px' }}>
                <span>✨ <strong>Trio Pack</strong> (All 3 variants)</span>
                <span>₹829 <span style={{color: '#16a34a', fontWeight: 'bold'}}>(Save ₹68 + Free Ship)</span></span>
              </Link>
              <Link to="/shop" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: '13px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '4px', textDecoration: 'none', color: 'var(--text)' }}>
                <span>🔄 <strong>Subscribe & Save</strong> (Monthly)</span>
                <span>₹269/mo <span style={{color: '#16a34a', fontWeight: 'bold'}}>(10% Off)</span></span>
              </Link>
            </div>

            {/* Trust strip */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', padding: '16px', background: 'var(--surface)', borderRadius: '8px' }}>
              {['Free Shipping over ₹999', 'Dermatologist Tested', 'Easy Returns'].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500 }}>
                  <Check size={12} color="var(--accent)" strokeWidth={2.5} />
                  {item}
                </div>
              ))}
            </div>

            {/* Accordion */}
            <div style={{ marginTop: '32px', borderTop: '1px solid var(--border)' }}>
              {accordionSections.map(section => (
                <div key={section.id} style={{ borderBottom: '1px solid var(--border)' }}>
                  <button
                    id={`accordion-${section.id}`}
                    onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '18px 0',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      fontWeight: 600,
                      color: openSection === section.id ? 'var(--accent)' : 'var(--text)',
                      letterSpacing: '0.02em',
                    }}
                  >
                    {section.title}
                    <ChevronDown
                      size={16}
                      style={{ transition: 'transform 0.3s', transform: openSection === section.id ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>
                  {openSection === section.id && (
                    <div style={{ paddingBottom: '20px', animation: 'fadeIn 0.3s ease' }}>
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reviews section */}
      {productReviews.length > 0 && (
        <section style={{ background: 'var(--surface)', padding: '80px 32px' }}>
          <div className="container">
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 600, color: 'var(--text)', marginBottom: '40px' }}>
              Customer Reviews
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {productReviews.map(r => (
                <div key={r.id} style={{ background: 'white', padding: '28px', borderRadius: '12px', border: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex', gap: '2px', marginBottom: '12px' }}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} size={13} fill={i < r.rating ? 'var(--accent)' : 'none'} stroke="var(--accent)" strokeWidth={1.5} />
                    ))}
                  </div>
                  <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '16px', fontStyle: 'italic' }}>
                    "{r.text}"
                  </p>
                  <p style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text)' }}>{r.name}</p>
                  <p style={{ fontSize: '11px', color: 'var(--text-subtle)', marginTop: '4px' }}>{r.date}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      <section style={{ padding: '80px 32px', background: 'white' }}>
        <div className="container">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 600, marginBottom: '40px', textAlign: 'center' }}>
            Complete the Ritual
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {related.map(p => <ProductCard key={p.id} product={p} variant="featured" />)}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
