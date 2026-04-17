import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Star, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { useCart } from '../context/CartContext';
import { useWishlistContext } from '../context/WishlistContext';
import StarRating from './StarRating';

const ProductCard = ({ product, variant = 'default' }) => {
  const { addItem } = useCart();
  const { toggle, isWishlisted } = useWishlistContext();
  const wishlisted = isWishlisted(product.id);

  const renderStars = (rating) =>
    Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} size={11}
        fill={i < Math.floor(rating) ? 'var(--accent)' : 'none'}
        stroke={i < Math.floor(rating) ? 'var(--accent)' : 'rgba(10,25,47,0.25)'}
        strokeWidth={1.5}
      />
    ));

  if (variant === 'featured') {
    return (
      <motion.div
        id={`product-card-${product.id}`}
        className="card-lift bg-white border border-[var(--border)] rounded-xl overflow-hidden flex flex-col relative w-full"
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        style={{ position: 'relative' }}
      >
        {product.badge && (
          <div style={{ position: 'absolute', top: '16px', left: '16px', zIndex: 2, background: 'var(--text)', color: 'white', fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '4px 10px' }}>
            {product.badge}
          </div>
        )}

        {/* Low stock badge */}
        {product.stock != null && product.stock <= 5 && product.stock > 0 && (
          <div style={{ position: 'absolute', top: '16px', left: product.badge ? '100px' : '16px', zIndex: 3, background: '#FEF3C7', color: '#92400E', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px' }}>
            Only {product.stock} left
          </div>
        )}

        {/* Wishlist heart */}}
        <button
          onClick={() => toggle(product)}
          title={wishlisted ? 'Remove from wishlist' : 'Save for later'}
          style={{
            position: 'absolute', top: '14px', right: '14px', zIndex: 3,
            background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
            width: '34px', height: '34px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'transform 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
          onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
        >
          <Heart size={16} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#9CA3AF'} />
        </button>

        <Link to={`/product/${product.slug}`} className="block w-full" style={{ position: 'relative' }}>
          <div className="product-img-wrap h-[240px] md:h-[280px] w-full" style={{ background: product.bgColor, position: 'relative', overflow: 'hidden' }}>
            <img src={product.image} alt={product.fullName} className="w-full h-full object-cover" loading="lazy" />
            {/* Quick-add overlay */}
            <div
              className="quick-add-overlay"
              onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product, 1); toast.success(`${product.name} added to cart!`); }}
              role="button"
              tabIndex={0}
              aria-label={`Quick add ${product.name} to cart`}
              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addItem(product, 1); } }}
              style={{
                position: 'absolute', bottom: 0, left: 0, right: 0,
                background: 'rgba(10,25,47,0.85)', color: 'white',
                textAlign: 'center', padding: '10px', fontSize: '13px',
                fontWeight: 500, letterSpacing: '0.5px', cursor: 'pointer',
                opacity: 0, transition: 'opacity 0.2s ease',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '1'}
              onMouseLeave={e => e.currentTarget.style.opacity = '0'}
            >
              + Quick Add
            </div>
          </div>
        </Link>

        <div className="p-5 md:p-6 flex-1 flex flex-col">
          <span className="inline-block px-3 py-1 bg-[#0A192F] text-white text-[10px] font-bold uppercase tracking-widest rounded-md self-start mb-3">
            Best for: {product.skinType}
          </span>
          <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
            <h3
              style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              {product.fullName}
            </h3>
          </Link>
          {product.rating && (
            <div style={{ marginBottom: '8px' }}>
              <StarRating rating={product.rating} count={product.reviewCount} size={12} />
            </div>
          )}
          <p style={{ fontSize: '13px', color: 'var(--accent)', fontWeight: 600, marginBottom: '20px', letterSpacing: '0.02em' }}>
            {product.mechanismLine}
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 24px 0', flex: 1 }}>
            {product.cardBullets?.map((bullet, i) => (
              <li key={i} style={{ fontSize: '13.5px', color: 'var(--text-muted)', marginBottom: '10px', display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                <span style={{ color: 'var(--accent)', fontSize: '12px', marginTop: '3px' }}>◇</span>
                <span style={{ lineHeight: '1.4' }}>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-1.5 mb-5 text-[#C9A24A]">
            <span className="text-[10px] font-semibold tracking-widest uppercase flex items-center gap-1 shadow-sm">
              <span className="text-[12px] pb-[1px]">✦</span> Export Quality • Globally Compliant
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-auto gap-4">
            <div>
              <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)' }}>₹{product.price}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px', fontWeight: 500 }}>(30 Wipes)</span>
            </div>
            <button
              id={`add-to-cart-${product.id}`}
              onClick={() => addItem(product)}
              className="w-full md:w-auto flex items-center justify-center gap-2 transition-colors duration-200"
              style={{ background: 'var(--text)', border: 'none', color: 'white', padding: '12px 24px', fontSize: '12px', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--text)'}
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // Default smaller card
  return (
    <motion.div
      id={`product-card-${product.id}`}
      className="card-lift bg-white border border-[var(--border)] rounded-xl overflow-hidden flex flex-col w-full h-full"
      style={{ position: 'relative' }}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
    >
      {/* Low stock badge */}
      {product.stock != null && product.stock <= 5 && product.stock > 0 && (
        <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 3, background: '#FEF3C7', color: '#92400E', fontSize: '11px', fontWeight: 600, padding: '2px 8px', borderRadius: '999px' }}>
          Only {product.stock} left
        </div>
      )}

      {/* Wishlist heart */}
      <button
        onClick={() => toggle(product)}
        title={wishlisted ? 'Remove from wishlist' : 'Save for later'}
        style={{
          position: 'absolute', top: '10px', right: '10px', zIndex: 3,
          background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
          width: '30px', height: '30px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.08)', transition: 'transform 0.2s',
        }}
        onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.15)'}
        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
      >
        <Heart size={14} fill={wishlisted ? '#ef4444' : 'none'} color={wishlisted ? '#ef4444' : '#9CA3AF'} />
      </button>

      <Link to={`/product/${product.slug}`} className="block w-full">
        <div className="product-img-wrap h-[200px] md:h-[220px] w-full" style={{ background: product.bgColor, position: 'relative', overflow: 'hidden' }}>
          <img src={product.image} alt={product.fullName} className="w-full h-full object-cover" loading="lazy" />
          <div
            className="quick-add-overlay"
            onClick={e => { e.preventDefault(); e.stopPropagation(); addItem(product, 1); toast.success(`${product.name} added to cart!`); }}
            role="button" tabIndex={0}
            aria-label={`Quick add ${product.name} to cart`}
            style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'rgba(10,25,47,0.85)', color: 'white', textAlign: 'center', padding: '8px', fontSize: '12px', fontWeight: 500, cursor: 'pointer', opacity: 0, transition: 'opacity 0.2s ease', fontFamily: 'Inter, sans-serif' }}
            onMouseEnter={e => e.currentTarget.style.opacity = '1'}
            onMouseLeave={e => e.currentTarget.style.opacity = '0'}
          >
            + Quick Add
          </div>
        </div>
      </Link>
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <span className="inline-block px-2 py-1 bg-[#0A192F] text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-[4px] self-start mb-2">
          Best for: {product.skinType}
        </span>
        <h3 className="font-playfair text-[16px] md:text-[17px] text-[var(--text)] mb-1 font-semibold leading-tight">
          {product.name}
        </h3>
        {product.rating && (
          <div style={{ marginBottom: '6px' }}>
            <StarRating rating={product.rating} count={product.reviewCount} size={11} />
          </div>
        )}
        <p className="text-[11px] md:text-[12px] text-[#C9A24A] font-semibold mb-4 leading-tight">
          {product.mechanismLine}
        </p>
        <div className="flex items-center gap-1.5 mb-3 text-[#C9A24A]">
          <span className="text-[9px] md:text-[8px] font-semibold tracking-widest uppercase flex items-center gap-1">
            <span className="text-[10px] pb-[1px]">✦</span> Globally Compliant
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-auto gap-3">
          <div>
            <span style={{ fontWeight: 700 }}>₹{product.price}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px' }}>(30 Wipes)</span>
          </div>
          <button
            id={`add-to-cart-small-${product.id}`}
            onClick={() => addItem(product)}
            className="w-full md:w-auto transition-colors duration-200 flex items-center justify-center p-[10px_16px] md:p-[8px_14px] text-[11px] md:text-[10px]"
            style={{ background: 'none', border: '1px solid var(--text)', color: 'var(--text)', fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--text)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default memo(ProductCard);
