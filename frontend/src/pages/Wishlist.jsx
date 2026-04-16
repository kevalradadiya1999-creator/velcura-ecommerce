import { Link } from 'react-router-dom';
import { ShoppingBag, Heart } from 'lucide-react';
import SEOHead from '../components/SEOHead';
import { useWishlistContext } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
  const { wishlist, toggle } = useWishlistContext();
  const { addItem } = useCart();

  return (
    <div style={{ minHeight: '80vh', background: 'var(--color-background, #FDFBF7)', paddingBottom: '80px' }}>
      <SEOHead title="My Wishlist — Velcura" description="Your saved Velcura skincare products." url="/wishlist" />

      {/* Header */}
      <section style={{ background: '#0A192F', padding: '60px 32px', textAlign: 'center' }}>
        <div className="container">
          <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C9A24A', marginBottom: '8px' }}>
            Saved for Later
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 42px)', color: '#FDFBF7', fontWeight: 600, marginBottom: '8px' }}>
            My Wishlist
          </h1>
          <p style={{ color: 'rgba(253,251,247,0.55)', fontSize: '14px' }}>
            {wishlist.length} {wishlist.length === 1 ? 'product' : 'products'} saved
          </p>
        </div>
      </section>

      <div className="container" style={{ padding: '60px 32px' }}>
        {wishlist.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <Heart size={48} style={{ color: 'rgba(10,25,47,0.15)', marginBottom: '20px' }} />
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '26px', color: '#0A192F', marginBottom: '12px' }}>
              Your wishlist is empty
            </h2>
            <p style={{ color: '#6B7280', marginBottom: '28px', fontSize: '14px' }}>
              Browse our collection and save products you love.
            </p>
            <Link to="/shop" className="btn-primary">
              Explore Products
            </Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {wishlist.map(product => (
              <div key={product.id} style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid rgba(10,25,47,0.06)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                display: 'flex',
                flexDirection: 'column',
              }}>
                {/* Image */}
                <Link to={`/product/${product.slug}`}>
                  <div style={{ background: product.bgColor, height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                    <img
                      src={product.image}
                      alt={product.fullName}
                      loading="lazy"
                      style={{ maxHeight: '180px', objectFit: 'contain', filter: 'drop-shadow(0 8px 20px rgba(0,0,0,0.12))' }}
                    />
                  </div>
                </Link>

                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '10px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#6B7280', marginBottom: '6px' }}>
                    {product.skinType}
                  </span>
                  <Link to={`/product/${product.slug}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: '#0A192F', marginBottom: '4px', fontWeight: 600 }}>
                      {product.fullName}
                    </h3>
                  </Link>
                  <p style={{ fontSize: '13px', color: '#C9A24A', fontWeight: 600, marginBottom: '16px' }}>
                    {product.keyIngredient}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: '10px' }}>
                    <span style={{ fontSize: '20px', fontWeight: 700, color: '#0A192F' }}>₹{product.price}</span>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => toggle(product)}
                        title="Remove from wishlist"
                        style={{
                          background: '#FFF5F5',
                          border: '1px solid #FECACA',
                          borderRadius: '8px',
                          padding: '10px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Heart size={16} fill="#ef4444" color="#ef4444" />
                      </button>
                      <button
                        onClick={() => addItem(product)}
                        style={{
                          background: '#0A192F',
                          color: 'white',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '10px 16px',
                          fontSize: '11px',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = '#C9A24A'}
                        onMouseLeave={e => e.currentTarget.style.background = '#0A192F'}
                      >
                        <ShoppingBag size={13} />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
