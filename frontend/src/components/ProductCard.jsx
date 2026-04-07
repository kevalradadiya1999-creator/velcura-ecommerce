import { Link } from 'react-router-dom';
import { ShoppingBag, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product, variant = 'default' }) => {
  const { addItem } = useCart();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        size={11}
        fill={i < Math.floor(rating) ? 'var(--accent)' : 'none'}
        stroke={i < Math.floor(rating) ? 'var(--accent)' : 'rgba(10,25,47,0.25)'}
        strokeWidth={1.5}
      />
    ));
  };

  if (variant === 'featured') {
    return (
      <div
        id={`product-card-${product.id}`}
        className="card-lift bg-white border border-[var(--border)] rounded-xl overflow-hidden flex flex-col relative w-full"
      >
        {product.badge && (
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            zIndex: 2,
            background: 'var(--text)',
            color: 'white',
            fontSize: '10px',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding: '4px 10px',
          }}>
            {product.badge}
          </div>
        )}

        {/* Image */}
        <Link to={`/product/${product.slug}`} className="block w-full">
          <div className="product-img-wrap h-[240px] md:h-[280px] w-full" style={{ background: product.bgColor }}>
            <img src={product.image} alt={product.fullName} className="w-full h-full object-cover" />
          </div>
        </Link>

        {/* Info */}
        <div className="p-5 md:p-6 flex-1 flex flex-col">
          <span className="inline-block px-3 py-1 bg-[#0A192F] text-white text-[10px] font-bold uppercase tracking-widest rounded-md self-start mb-3">
            Best for: {product.skinType}
          </span>
          
          <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              {product.fullName}
            </h3>
          </Link>
          
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
          
          <div className="flex flex-col md:flex-row md:items-center justify-between mt-auto gap-4">
            <div>
              <span style={{ fontSize: '20px', fontWeight: 600, color: 'var(--text)' }}>₹{product.price}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)', marginLeft: '8px', fontWeight: 500 }}>(50 Wipes)</span>
            </div>
            <button
              id={`add-to-cart-${product.id}`}
              onClick={() => addItem(product)}
              className="w-full md:w-auto flex items-center justify-center gap-2 transition-colors duration-200"
              style={{
                background: 'var(--text)',
                border: 'none',
                color: 'white',
                padding: '12px 24px',
                fontSize: '12px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--text)'}
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Default smaller card
  return (
    <div
      id={`product-card-${product.id}`}
      className="card-lift bg-white border border-[var(--border)] rounded-xl overflow-hidden flex flex-col w-full h-full"
    >
      <Link to={`/product/${product.slug}`} className="block w-full">
        <div className="product-img-wrap h-[200px] md:h-[220px] w-full" style={{ background: product.bgColor }}>
          <img src={product.image} alt={product.fullName} className="w-full h-full object-cover" />
        </div>
      </Link>
      <div className="p-4 md:p-5 flex flex-col flex-1">
        <span className="inline-block px-2 py-1 bg-[#0A192F] text-white text-[9px] md:text-[10px] font-bold uppercase tracking-widest rounded-[4px] self-start mb-2">
          Best for: {product.skinType}
        </span>
        <h3 className="font-playfair text-[16px] md:text-[17px] text-[var(--text)] mb-1 font-semibold leading-tight">
          {product.name}
        </h3>
        <p className="text-[11px] md:text-[12px] text-[#C9A24A] font-semibold mb-4 leading-tight">
          {product.mechanismLine}
        </p>
        
        <div className="flex flex-col md:flex-row md:items-center justify-between mt-auto gap-3">
          <div>
            <span style={{ fontWeight: 700 }}>₹{product.price}</span>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '4px' }}>(50 Wipes)</span>
          </div>
          <button
            id={`add-to-cart-small-${product.id}`}
            onClick={() => addItem(product)}
            className="w-full md:w-auto transition-colors duration-200 flex items-center justify-center p-[10px_16px] md:p-[8px_14px] text-[11px] md:text-[10px]"
            style={{
              background: 'none',
              border: '1px solid var(--text)',
              color: 'var(--text)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--text)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--text)'; }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
