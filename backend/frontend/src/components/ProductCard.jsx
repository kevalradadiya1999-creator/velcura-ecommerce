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
        className="card-lift"
        style={{
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: '12px',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
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
        <Link to={`/product/${product.slug}`} style={{ display: 'block' }}>
          <div className="product-img-wrap" style={{ height: '280px', background: product.bgColor }}>
            <img src={product.image} alt={product.fullName} />
          </div>
        </Link>

        {/* Info */}
        <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span className="ingredient-pill" style={{ marginBottom: '12px', alignSelf: 'flex-start' }}>
            {product.keyIngredient}
          </span>
          <p style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: '6px' }}>
            {product.skinType}
          </p>
          <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--text)', marginBottom: '8px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text)'}
            >
              {product.fullName}
            </h3>
          </Link>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px', flex: 1 }}>
            {product.shortDesc}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '2px' }}>{renderStars(product.rating)}</div>
            <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>({product.reviews})</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
            <div>
              <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text)' }}>₹{product.price}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-subtle)', textDecoration: 'line-through', marginLeft: '8px' }}>₹{product.mrp}</span>
            </div>
            <button
              id={`add-to-cart-${product.id}`}
              onClick={() => addItem(product)}
              style={{
                background: 'var(--text)',
                border: 'none',
                color: 'white',
                padding: '10px 18px',
                fontSize: '11px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.background = 'var(--text)'}
            >
              <ShoppingBag size={14} />
              Add
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
      className="card-lift"
      style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', overflow: 'hidden' }}
    >
      <Link to={`/product/${product.slug}`} style={{ display: 'block' }}>
        <div className="product-img-wrap" style={{ height: '220px', background: product.bgColor }}>
          <img src={product.image} alt={product.fullName} />
        </div>
      </Link>
      <div style={{ padding: '16px 20px' }}>
        <p style={{ fontSize: '10px', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>
          {product.keyIngredient}
        </p>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '17px', color: 'var(--text)', marginBottom: '8px' }}>
          {product.name}
        </h3>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontWeight: 700 }}>₹{product.price}</span>
          <button
            id={`add-to-cart-small-${product.id}`}
            onClick={() => addItem(product)}
            style={{
              background: 'none',
              border: '1px solid var(--text)',
              color: 'var(--text)',
              padding: '8px 14px',
              fontSize: '10px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
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
