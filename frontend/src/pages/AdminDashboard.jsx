import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Package, Star, Tag, LogOut, Edit2, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import SEOHead from '../components/SEOHead';

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('velcura_admin') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'velcura2025') {
      localStorage.setItem('velcura_admin', 'true');
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setTimeout(() => setError(false), 500); // For shake animation clearing
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('velcura_admin');
    setIsAuthenticated(false);
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDFBF7' }}>
        <SEOHead title="Admin Login | Velcura" />
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#0A192F', marginBottom: '8px' }}>Admin Access</h1>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '32px' }}>Please enter your password to continue.</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className={error ? 'shake' : ''}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '8px',
                border: `1px solid ${error ? '#ef4444' : '#ddd'}`,
                marginBottom: '16px', fontSize: '14px', outline: 'none'
              }}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '12px', marginBottom: '16px', textAlign: 'left' }}>Incorrect password</p>}
            <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Unlock Dashboard
            </button>
          </form>
          <style>{`
            @keyframes shake {
              0%, 100% { transform: translateX(0); }
              20%, 60% { transform: translateX(-5px); }
              40%, 80% { transform: translateX(5px); }
            }
            .shake { animation: shake 0.4s ease-in-out; }
          `}</style>
        </div>
      </div>
    );
  }

  // Dashboard calculations
  const totalProducts = products.length;
  const totalReviews = products.reduce((acc, p) => acc + (p.reviewCount || 0), 0);
  const avgRating = (products.reduce((acc, p) => acc + (p.rating || 0), 0) / (totalProducts || 1)).toFixed(1);

  const mockReviews = [
    { pName: 'Oil Balance', user: 'Jessica T.', rating: 5, body: 'These wipes are incredible. They don\'t leave my skin feeling tight at all.' },
    { pName: 'HydraGlow', user: 'Amanda R.', rating: 4, body: 'Very hydrating, but I wish the wipe itself was a tiny bit larger.' },
    { pName: 'Calm Skin', user: 'Michelle K.', rating: 5, body: 'Finally a wipe that doesn\'t burn my sensitive rosacea skin. Lifesaver!' },
    { pName: 'Oil Balance', user: 'David W.', rating: 5, body: 'Use them after the gym. Perfect for quick cleansing without a sink.' },
    { pName: 'HydraGlow', user: 'Sarah L.', rating: 5, body: 'Leaves a beautiful dewy finish. I actually look forward to taking my makeup off.' },
  ];

  return (
    <div style={{ padding: '80px 20px', background: '#F9FAFB', minHeight: '100vh' }}>
      <SEOHead title="Admin Dashboard | Velcura" />
      <div className="container" style={{ maxWidth: '1200px' }}>
        
        {/* Top Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', background: 'white', padding: '20px 24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '32px', height: '32px', background: '#0A192F', color: 'white', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontFamily: 'Playfair Display' }}>V</div>
            <span style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F' }}>Velcura Admin</span>
          </div>
          <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', fontSize: '14px', fontWeight: 500 }}>
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
          {[
            { label: 'Total Products', val: totalProducts, icon: <Package size={20} color="#3B82F6" />, bg: '#EFF6FF' },
            { label: 'Total Reviews', val: totalReviews, icon: <Star size={20} color="#EAB308" />, bg: '#FEFCE8' },
            { label: 'Average Rating', val: avgRating, icon: <Star size={20} color="#10B981" />, bg: '#ECFDF5' },
            { label: 'Active Coupons', val: 3, icon: <Tag size={20} color="#8B5CF6" />, bg: '#F5F3FF' },
          ].map(stat => (
            <div key={stat.label} style={{ background: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: stat.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500, marginBottom: '4px' }}>{stat.label}</p>
                <p style={{ fontSize: '24px', color: '#0A192F', fontWeight: 700 }}>{stat.val}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          {/* Products Table */}
          <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflowX: 'auto' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', margin: '0 0 20px' }}>Products</h2>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Image</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Name</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Price</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Stock</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Rating</th>
                  <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map(p => (
                  <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '12px 16px' }}><img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} /></td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 500, color: '#0A192F' }}>{p.name}<br/><span style={{fontSize:'12px', color:'#6B7280', fontWeight:400}}>{p.category}</span></td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#4B5563' }}>₹{p.price}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: p.stock > 0 ? '#ECFDF5' : '#FEF2F2', color: p.stock > 0 ? '#10B981' : '#EF4444' }}>
                        {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontSize: '14px', color: '#4B5563' }}>★ {p.rating}</td>
                    <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                      <button onClick={() => toast.info('Coming soon')} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', marginRight: '12px' }}><Edit2 size={16} /></button>
                      <button onClick={() => toast.info('Coming soon')} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Reviews */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', margin: '0 0 20px' }}>Recent Reviews</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {mockReviews.map((r, i) => (
                  <div key={i} style={{ borderBottom: i < mockReviews.length - 1 ? '1px solid #f3f4f6' : 'none', paddingBottom: i < mockReviews.length - 1 ? '16px' : 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: '#0A192F' }}>{r.user}</span>
                      <span style={{ fontSize: '12px', color: '#EAB308' }}>{'★'.repeat(r.rating)}</span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#C9A24A', display: 'block', marginBottom: '4px' }}>{r.pName}</span>
                    <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.4 }}>"{r.body.substring(0, 60)}..."</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Coupons */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
               <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', margin: '0 0 20px' }}>Coupon Codes</h2>
               <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                      <th style={{ padding: '8px 0', fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>Code</th>
                      <th style={{ padding: '8px 0', fontSize: '12px', color: '#6B7280', fontWeight: 600 }}>Off</th>
                      <th style={{ padding: '8px 0', fontSize: '12px', color: '#6B7280', fontWeight: 600, textAlign: 'right' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { c: 'WELCOME20', d: '20%', s: true },
                      { c: 'VELCURA10', d: '10%', s: true },
                      { c: 'SKIN15', d: '15%', s: true }
                    ].map(c => (
                      <tr key={c.c} style={{ borderBottom: '1px solid #f3f4f6' }}>
                        <td style={{ padding: '12px 0', fontSize: '13px', fontWeight: 600, fontFamily: 'monospace' }}>{c.c}</td>
                        <td style={{ padding: '12px 0', fontSize: '13px', color: '#4B5563' }}>{c.d}</td>
                        <td style={{ padding: '12px 0', textAlign: 'right' }}>
                          <span style={{ background: c.s ? '#ECFDF5' : '#F3F4F6', color: c.s ? '#10B981' : '#9CA3AF', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>
                            {c.s ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
               </table>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default AdminDashboard;
