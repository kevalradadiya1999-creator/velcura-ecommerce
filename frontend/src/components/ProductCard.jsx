import { memo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShoppingBag, Heart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlistContext } from '../context/WishlistContext';

const StarRating = ({ rating, count }) => {
  if (!rating) return null;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
      <div style={{ display: 'flex', gap: '2px' }}>
        {[1,2,3,4,5].map(i => (
          <Star key={i} size={11} fill={i <= Math.round(rating) ? '#C9A24A' : 'none'} color="#C9A24A" strokeWidth={1.5} />
        ))}
      </div>
      <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500 }}>
        {rating} {count ? `(${count})` : ''}
      </span>
    </div>
  );
};

const ProductCard = ({ product, variant = 'default' }) => {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlistContext();
  const wishlisted = isWishlisted(product.id);
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1100px) rotateX(${-py * 5}deg) rotateY(${px * 7}deg) translateY(-6px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (cardRef.current) {
      cardRef.current.style.transform = 'perspective(1100px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    }
  }, []);

  const softBg = product.softBg || product.bgColor || '#F5F0E8';
  const accentColor = product.accentColor || 'var(--accent)';

  return (
    <div
      ref={cardRef}
      id={`product-card-${product.id}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        borderRadius: '28px',
        padding: '36px 32px 28px',
        background: softBg,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.12s ease-out, box-shadow 0.3s ease',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'default',
      }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 40px 80px rgba(10,25,47,0.18)'}
      onMouseLeave2={e => e.currentTarget.style.boxShadow = 'none'}
    >
      {/* Radial glow from product accent color */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '280px',
        height: '280px',
        background: `radial-gradient(circle, ${accentColor}22 0%, transparent 70%)`,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* Arrow button top-right */}
      <Link
        to={`/product/${product.slug}`}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 10,
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.7)',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#0A192F',
          textDecoration: 'none',
          transition: 'background 0.2s, color 0.2s',
          backdropFilter: 'blur(8px)',
        }}
        onMouseEnter={e => { e.currentTarget.style.background = '#0A192F'; e.currentTarget.style.color = '#FDFBF7'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.7)'; e.currentTarget.style.color = '#0A192F'; }}
      >
        <ArrowUpRight size={16} />
      </Link>

      {/* Wishlist */}
      {toggle && (
        <button
          onClick={() => toggle(product)}
          style={{ position: 'absolute', top: '20px', right: '64px', zIndex: 10, width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', backdropFilter: 'blur(8px)', transition: 'transform 0.2s' }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={14} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#9CA3AF'} />
        </button>
      )}

      {/* Product Image with translateZ */}
      <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '200px', marginBottom: '24px' }}>
          <img
            src={product.image}
            alt={product.fullName || product.name}
            className="card-img"
            loading="lazy"
            style={{
              width: '180px',
              height: '180px',
              objectFit: 'contain',
              transition: 'transform 0.2s ease',
              filter: 'drop-shadow(0 24px 36px rgba(10,25,47,0.22))',
              transform: 'translateZ(20px)',
            }}
            onError={e => { e.target.onerror = null; e.target.src = product.bgColor ? '' : 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'; }}
          />
        </div>
      </Link>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Key Ingredient badge */}
        <span className="font-mono-mini" style={{ color: accentColor, display: 'block', marginBottom: '8px' }}>
          {product.keyIngredient}
        </span>

        <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '24px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', lineHeight: 1.1 }}>
            {product.name}
          </h3>
        </Link>

        <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
          {product.skinType}
        </p>

        <StarRating rating={product.rating} count={product.reviews} />

        <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: '20px' }}>
          {product.shortDesc}
        </p>

        {/* Price + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <span style={{ fontSize: '22px', fontWeight: 700, color: 'var(--text)' }}>₹{product.price}</span>
            {product.mrp && product.mrp > product.price && (
              <span style={{ fontSize: '13px', color: 'var(--text-muted)', marginLeft: '8px', textDecoration: 'line-through' }}>₹{product.mrp}</span>
            )}
          </div>
          <button
            id={`add-to-cart-${product.id}`}
            onClick={() => addItem(product)}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '10px 18px',
              background: '#0A192F', color: 'white',
              border: 'none', borderRadius: '10px',
              fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'background 0.2s, transform 0.2s',
              fontFamily: 'Inter, sans-serif',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = accentColor; e.currentTarget.style.color = '#0A192F'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#0A192F'; e.currentTarget.style.color = 'white'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            <ShoppingBag size={13} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);

