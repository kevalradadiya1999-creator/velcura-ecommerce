import { Link } from 'react-router-dom';
import SEOHead from '../components/SEOHead';
import { products } from '../data/products';

const Sitemap = () => {
  return (
    <div style={{ padding: '80px 20px', background: '#FDFBF7', minHeight: '80vh' }}>
      <SEOHead title="Sitemap | Velcura" />
      <div className="container" style={{ maxWidth: '800px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', color: '#0A192F', marginBottom: '40px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
          Site Map
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '40px' }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', marginBottom: '16px' }}>Main Pages</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/" style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>Home</Link></li>
              <li><Link to="/shop" style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>Shop</Link></li>
              <li><Link to="/about" style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>About</Link></li>
              <li><Link to="/contact" style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>Contact</Link></li>
              <li><Link to="/quiz" style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>Skin Quiz</Link></li>
              <li><Link to="/compare" style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>Compare Products</Link></li>
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', marginBottom: '16px' }}>Products</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {products.map(p => (
                <li key={p.id}><Link to={`/product/${p.slug}`} style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>{p.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', marginBottom: '16px' }}>Account</h2>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/wishlist" style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>Wishlist</Link></li>
              <li><Link to="/order-confirmation" style={{ color: '#C9A24A', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.currentTarget.style.color = '#0A192F'} onMouseLeave={e => e.currentTarget.style.color = '#C9A24A'}>Order Status</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sitemap;
