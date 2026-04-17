import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, Check, ChevronDown, Star, Share2, Link as LinkIcon, MessageCircle, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { products, reviews } from '../data/products';
import ProductCard from '../components/ProductCard';
import StarRating from '../components/StarRating';
import ReviewsSection from '../components/ReviewsSection';
import { useCart } from '../context/CartContext';
import SEOHead from '../components/SEOHead';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';

const ProductPage = () => {
  const { slug } = useParams();
  const { addItem } = useCart();
  const { addItem: saveToRecent } = useRecentlyViewed();
  const product = products.find(p => p.slug === slug);

  const [qty, setQty] = useState(1);
  const [openSection, setOpenSection] = useState('benefits');
  const [activeImg, setActiveImg] = useState(0);
  const [imgOpacity, setImgOpacity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const addToCartBtnRef = useRef(null);

  // Save to recently viewed on mount
  useEffect(() => {
    if (product) saveToRecent(product);
  }, [product?.slug]);

  // Set default size
  useEffect(() => {
    if (product?.sizes?.length) {
      setSelectedSize(product.sizes[Math.floor(product.sizes.length / 2)]);
    }
    setActiveImg(0);
  }, [product?.slug]);

  // Sticky add-to-cart bar (mobile) — watch when CTA button leaves viewport
  useEffect(() => {
    const btn = addToCartBtnRef.current;
    if (!btn) return;
    const observer = new IntersectionObserver(
      ([entry]) => setShowStickyBar(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(btn);
    return () => observer.disconnect();
  }, [product?.slug]);

  const switchImage = useCallback((idx) => {
    setImgOpacity(0);
    setTimeout(() => { setActiveImg(idx); setImgOpacity(1); }, 200);
  }, []);

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
  const images = product.images || [product.image];

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
    {
      id: 'shipping',
      title: 'Shipping & Returns',
      content: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { icon: '🚚', label: 'Free shipping on Trio Pack & orders above ₹999' },
            { icon: '⚡', label: 'Express delivery available at checkout (1–3 days)' },
            { icon: '↩️', label: 'Easy 7-day returns on all unopened products' },
            { icon: '📦', label: 'Ships from Ahmedabad within 24 hours of order' },
            { icon: '🔒', label: 'Tamper-proof sealed packaging guaranteed' },
          ].map(item => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              <span>{item.label}</span>
            </div>
          ))}
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
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "url": `https://velcurahygiene.in/product/${product.slug}`,
          },
        }}
      />

      {/* Breadcrumb */}
      <div style={{ background: 'var(--surface)', padding: '14px 32px', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', gap: '6px', alignItems: 'center', fontSize: '13px', color: 'var(--text-muted)', flexWrap: 'wrap' }}>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>Home</Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <Link to="/shop" style={{ textDecoration: 'none', color: 'inherit' }}
            onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
            onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>Shop</Link>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span style={{ color: 'var(--text-muted)' }}>{product.category || 'Face'}</span>
          <span style={{ color: 'var(--border)' }}>/</span>
          <span style={{ color: 'var(--text)', fontWeight: 600, maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.fullName}
          </span>
        </div>
      </div>

      {/* Main product section */}
      <section style={{ padding: '60px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'start' }}
          className="product-grid"
        >
          {/* Left: Image Gallery */}
          <div>
            {/* Main Image */}
            <div style={{
              borderRadius: '16px',
              overflow: 'hidden',
              background: product.bgColor,
              aspectRatio: '1/1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'zoom-in',
              position: 'relative',
            }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1.08)'; }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) img.style.transform = 'scale(1)'; }}
            >
              <img
                src={images[activeImg]}
                alt={product.fullName}
                loading="eager"
                style={{
                  maxWidth: '80%',
                  maxHeight: '80%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 40px rgba(10,25,47,0.15))',
                  transition: 'opacity 0.3s ease, transform 0.4s ease',
                  opacity: imgOpacity,
                }}
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto', scrollbarWidth: 'none', paddingBottom: '4px' }}>
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => switchImage(i)}
                    aria-label={`View image ${i + 1}`}
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); switchImage(i); } }}
                    style={{
                      width: '72px', height: '72px', flexShrink: 0,
                      borderRadius: '8px', overflow: 'hidden',
                      border: i === activeImg ? '2px solid #0A192F' : '2px solid transparent',
                      cursor: 'pointer', padding: 0, background: product.bgColor,
                      transition: 'border-color 0.2s',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.name} view ${i + 1}`}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
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

            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 3.5vw, 40px)', fontWeight: 600, color: 'var(--text)', marginBottom: '8px', lineHeight: 1.15 }}>
              {product.fullName}
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '12px' }}>
              {product.tagline}
            </p>

            {/* Star Rating */}
            <div style={{ marginBottom: '20px' }}>
              <StarRating rating={product.rating} count={product.reviewCount} size={16} />
            </div>

            {/* Share row */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Share:</span>
              <button
                onClick={() => window.open(`https://wa.me/?text=Check out ${product.name} on Velcura - ${window.location.href}`, '_blank')}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #eee', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#25D366'; e.currentTarget.style.borderColor = '#25D366'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = 'var(--text)'; }}
                title="Share on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </button>
              <button
                onClick={() => { navigator.clipboard.writeText(window.location.href); toast.success('Link copied!'); }}
                style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #eee', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text)' }}
                onMouseEnter={e => { e.currentTarget.style.background = '#0A192F'; e.currentTarget.style.borderColor = '#0A192F'; e.currentTarget.style.color = 'white'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = 'var(--text)'; }}
                title="Copy Link"
              >
                <LinkIcon size={16} />
              </button>
              {navigator.share && (
                <button
                  onClick={() => navigator.share({ title: product.name, url: window.location.href }).catch(() => {})}
                  style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #eee', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s', color: 'var(--text)' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#C9A24A'; e.currentTarget.style.borderColor = '#C9A24A'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#eee'; e.currentTarget.style.color = 'var(--text)'; }}
                  title="Share"
                >
                  <Share2 size={16} />
                </button>
              )}
            </div>

            {/* Rating bar */}
            <div style={{ marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid var(--border)' }} />

            <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '20px' }}>
              {product.shortDesc}
            </p>

            {/* Size selector */}
            {product.sizes?.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: 500, margin: 0 }}>Size</p>
                  <button onClick={() => setSizeGuideOpen(true)} style={{ background: 'none', border: 'none', fontSize: '12px', color: 'var(--text-muted)', textDecoration: 'underline', cursor: 'pointer' }}>
                    Size Guide
                  </button>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        borderRadius: '999px',
                        padding: '6px 16px',
                        fontSize: '13px',
                        cursor: 'pointer',
                        border: selectedSize === size ? 'none' : '1px solid #ddd',
                        background: selectedSize === size ? '#0A192F' : 'transparent',
                        color: selectedSize === size ? 'white' : 'var(--text)',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: selectedSize === size ? 600 : 400,
                        transition: 'all 0.2s',
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <span style={{ fontSize: '28px', fontWeight: 800, color: 'var(--text)' }}>₹{product.price}</span>
              <span style={{ fontSize: '16px', color: 'var(--text-subtle)', textDecoration: 'line-through' }}>₹{product.mrp}</span>
              <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '12px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                {discount}% OFF
              </span>
            </div>

            {/* Stock indicator */}
            <div style={{ marginBottom: '20px' }}>
              {product.stock === 0 ? (
                <span style={{ background: '#fee2e2', color: '#991b1b', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '999px' }}>
                  ❌ Out of Stock
                </span>
              ) : product.stock <= 5 ? (
                <span style={{ background: '#FEF3C7', color: '#92400E', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '999px' }}>
                  ⚠️ Only {product.stock} left in stock — order soon!
                </span>
              ) : (
                <span style={{ background: '#dcfce7', color: '#16a34a', fontSize: '12px', fontWeight: 600, padding: '4px 12px', borderRadius: '999px' }}>
                  <span style={{ display: 'inline-block', width: '7px', height: '7px', borderRadius: '50%', background: '#16a34a', marginRight: '5px', verticalAlign: 'middle' }} />
                  In Stock
                </span>
              )}
            </div>

            {/* Qty + Add to Cart */}
            <div ref={addToCartBtnRef} style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid var(--border)', borderRadius: '4px', overflow: 'hidden' }}>
                <button
                  id="qty-decrease"
                  onClick={() => setQty(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  style={{ width: '44px', height: '52px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--text)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  −
                </button>
                <span style={{ width: '48px', textAlign: 'center', fontWeight: 700, fontSize: '16px' }}>{qty}</span>
                <button
                  id="qty-increase"
                  onClick={() => setQty(q => Math.min(10, q + 1))}
                  aria-label="Increase quantity"
                  style={{ width: '44px', height: '52px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', color: 'var(--text)', transition: 'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'none'}
                >
                  +
                </button>
              </div>
              <button
                id="add-to-cart-detail"
                onClick={() => product.stock > 0 && addItem(product, qty)}
                disabled={product.stock === 0}
                className="btn-primary"
                style={{ flex: 1, opacity: product.stock === 0 ? 0.5 : 1, cursor: product.stock === 0 ? 'not-allowed' : 'pointer' }}
              >
                {product.stock === 0 ? 'Notify Me' : `Add to Cart · ₹${(product.price * qty).toLocaleString()}`}
              </button>
            </div>

            {/* Introductory Bundles */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '28px' }}>
              <Link to="/shop" className="btn-outline" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: '13px' }}>
                <span>📦 <strong>Duo Pack</strong> (Any 2 variants)</span>
                <span>₹579 <span style={{ color: '#16a34a', fontWeight: 'bold' }}>(Save ₹19)</span></span>
              </Link>
              <Link to="/shop" className="btn-outline" style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', fontSize: '13px' }}>
                <span>✨ <strong>Trio Pack</strong> (All 3 variants)</span>
                <span>₹829 <span style={{ color: '#16a34a', fontWeight: 'bold' }}>(Save ₹68 + Free Ship)</span></span>
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
                    onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpenSection(openSection === section.id ? null : section.id); } }}
                    style={{
                      width: '100%', background: 'none', border: 'none', cursor: 'pointer',
                      padding: '18px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                      fontFamily: 'Inter, sans-serif', fontSize: '14px', fontWeight: 600,
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
                  <div style={{ marginBottom: '12px' }}>
                    <StarRating rating={r.rating} size={13} />
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

      {/* Reviews */}
      <ReviewsSection reviews={Array.isArray(product.reviews) ? product.reviews : []} />

      {/* You May Also Like */}
      <section style={{ padding: '80px 32px', background: 'var(--color-warm-beige, #F0ECE4)' }}>
        <div className="container">
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', textAlign: 'center', marginBottom: '8px' }}>Complete Your Ritual</p>
          <h2 style={{ fontFamily: "var(--font-heading, 'Playfair Display', serif)", fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 600, marginBottom: '12px', textAlign: 'center', color: 'var(--color-primary, #0A192F)' }}>
            You May Also Like
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '40px', fontSize: '14px' }}>
            Each Velcura formula targets a different skin need — try them all.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
            {related.map(p => <ProductCard key={p.id} product={p} variant="featured" />)}
          </div>
        </div>
      </section>

      {/* Mobile sticky add-to-cart bar */}
      <div
        className="sticky-atc"
        style={{
          position: 'fixed', bottom: 'env(safe-area-inset-bottom)', left: 0, right: 0,
          background: 'white', borderTop: '1px solid #eee',
          padding: '12px 20px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          zIndex: 85,
          transform: showStickyBar ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform 0.3s ease',
          boxShadow: '0 -4px 20px rgba(0,0,0,0.08)',
        }}
      >
        <div>
          <p style={{ fontSize: '14px', fontWeight: 600, color: '#0A192F', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {product.name}
          </p>
          <p style={{ fontSize: '16px', fontWeight: 800, color: '#0A192F' }}>₹{product.price}</p>
        </div>
        <button
          onClick={() => product.stock > 0 && addItem(product, qty)}
          disabled={product.stock === 0}
          style={{
            background: '#0A192F', color: 'white', border: 'none',
            borderRadius: '8px', padding: '10px 20px', fontSize: '14px',
            fontWeight: 600, cursor: product.stock === 0 ? 'not-allowed' : 'pointer',
            opacity: product.stock === 0 ? 0.5 : 1,
            fontFamily: 'Inter, sans-serif',
          }}
        >
          {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
        </button>
      </div>

      {/* Size Guide Modal */}
      <AnimatePresence>
        {sizeGuideOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSizeGuideOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.4)', zIndex: 998, backdropFilter: 'blur(2px)' }}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: '-50%', x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: '-50%', x: '-50%' }}
              exit={{ opacity: 0, scale: 0.95 }}
              role="dialog" aria-modal="true" aria-labelledby="size-guide-title"
              style={{ position: 'fixed', top: '50%', left: '50%', background: 'white', borderRadius: '16px', padding: '32px', zIndex: 999, width: '100%', maxWidth: '500px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                <h2 id="size-guide-title" style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', margin: 0, color: 'var(--text)' }}>Size Guide</h2>
                <button onClick={() => setSizeGuideOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  <X size={20} />
                </button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '16px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #eee', textAlign: 'left' }}>
                    <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Size</th>
                    <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Volume</th>
                    <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Best For</th>
                    <th style={{ padding: '12px 8px', fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)' }}>Lasts</th>
                  </tr>
                </thead>
                <tbody>
                  {[['30ml', '30ml', 'Travel / Trial', '~3 weeks'], ['50ml', '50ml', 'Regular use', '~6 weeks'], ['100ml', '100ml', 'Daily use', '~3 months']].map(row => (
                    <tr key={row[0]} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ padding: '12px 8px', fontSize: '14px', fontWeight: 500 }}>{row[0]}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', color: 'var(--text-muted)' }}>{row[1]}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', color: 'var(--text-muted)' }}>{row[2]}</td>
                      <td style={{ padding: '12px 8px', fontSize: '14px', color: 'var(--text-muted)' }}>{row[3]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ fontSize: '12px', color: 'var(--text-subtle)', fontStyle: 'italic', margin: 0 }}>All sizes contain the same formula. Larger sizes offer better value.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
        @media (min-width: 769px) {
          .sticky-atc { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductPage;
