import { Link } from 'react-router-dom';
import { ShoppingBag, X } from 'lucide-react';
import { useCompare } from '../context/CompareContext';
import { useCart } from '../context/CartContext';
import SEOHead from '../components/SEOHead';
import StarRating from '../components/StarRating';

const Compare = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();
  const { addItem } = useCart();

  if (compareList.length === 0) {
    return (
      <div style={{ padding: '120px 20px', textAlign: 'center', minHeight: '60vh', background: '#FDFBF7' }}>
        <SEOHead title="Compare Products | Velcura" />
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#0A192F', marginBottom: '16px' }}>Compare Products</h1>
        <p style={{ color: '#6B7280', marginBottom: '32px' }}>You haven't selected any products to compare yet.</p>
        <Link to="/shop" className="btn-primary" style={{ display: 'inline-flex', padding: '12px 32px' }}>Return to Shop</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px 100px', background: '#FDFBF7', minHeight: '80vh' }}>
      <SEOHead title="Compare Products | Velcura" />
      <div className="container" style={{ maxWidth: '1200px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A24A' }}>Product Breakdown</span>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', color: '#0A192F', marginTop: '8px' }}>Compare Products</h1>
          </div>
          <button onClick={clearCompare} style={{ background: 'none', border: '1px solid #ddd', padding: '8px 16px', borderRadius: '999px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter' }}>
            Clear All
          </button>
        </div>

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '20px' }}>
          <table style={{ width: '100%', minWidth: '800px', borderCollapse: 'collapse', textAlign: 'left', background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 8px 30px rgba(0,0,0,0.04)' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <th style={{ padding: '24px', width: '20%' }}></th>
                {compareList.map(p => (
                  <th key={p.id} style={{ padding: '24px', width: `${80 / compareList.length}%`, verticalAlign: 'top', position: 'relative' }}>
                    <button onClick={() => removeFromCompare(p.id)} style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}><X size={18} /></button>
                    <img src={p.image} alt={p.name} style={{ width: '100%', aspectRatio: '1', objectFit: 'cover', borderRadius: '12px', background: p.bgColor, marginBottom: '16px' }} />
                    <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', marginBottom: '4px' }}>{p.name}</h3>
                    <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '16px' }}>₹{p.price}</p>
                    <button
                      onClick={() => p.stock > 0 && addItem(p)}
                      disabled={p.stock === 0}
                      className="btn-primary"
                      style={{ width: '100%', justifyContent: 'center', padding: '10px', fontSize: '13px', opacity: p.stock === 0 ? 0.5 : 1 }}
                    >
                      {p.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontWeight: 600, color: '#0A192F', fontSize: '14px' }}>Rating</td>
                {compareList.map(p => (
                  <td key={p.id} style={{ padding: '20px 24px', borderBottom: '1px solid #eee' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <StarRating rating={p.rating} size={14} />
                      <span style={{ fontSize: '13px', color: '#6B7280' }}>({p.reviewCount})</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontWeight: 600, color: '#0A192F', fontSize: '14px' }}>Target Skin Type</td>
                {compareList.map(p => (
                  <td key={p.id} style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontSize: '14px', color: '#6B7280' }}>
                    {p.skinType}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontWeight: 600, color: '#0A192F', fontSize: '14px' }}>Key Ingredient</td>
                {compareList.map(p => (
                  <td key={p.id} style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontSize: '14px', color: '#6B7280' }}>
                    {p.keyIngredient}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontWeight: 600, color: '#0A192F', fontSize: '14px' }}>Mechanism</td>
                {compareList.map(p => (
                  <td key={p.id} style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontSize: '14px', color: '#6B7280' }}>
                    {p.mechanismLine}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontWeight: 600, color: '#0A192F', fontSize: '14px' }}>Sizes Available</td>
                {compareList.map(p => (
                  <td key={p.id} style={{ padding: '20px 24px', borderBottom: '1px solid #eee', fontSize: '13px', color: '#6B7280' }}>
                    {p.sizes?.join(', ') || 'Standard'}
                  </td>
                ))}
              </tr>
              <tr>
                <td style={{ padding: '20px 24px', fontWeight: 600, color: '#0A192F', fontSize: '14px' }}>Stock Status</td>
                {compareList.map(p => (
                  <td key={p.id} style={{ padding: '20px 24px', fontSize: '14px', color: p.stock > 0 ? '#16a34a' : '#ef4444', fontWeight: 500 }}>
                    {p.stock > 0 ? `In Stock (${p.stock})` : 'Out of Stock'}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Compare;
