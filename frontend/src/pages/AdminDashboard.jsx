import { useState, useEffect } from 'react';
import { products } from '../data/products';
import { Package, Star, Tag, LogOut, Edit2, Trash2, MessageCircle, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import SEOHead from '../components/SEOHead';

const AdminDashboard = () => {
  const [unlocked, setUnlocked] = useState(
    localStorage.getItem('velcura_admin') === 'true'
  );
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);

  const handleLogin = () => {
    if (pwd === 'velcura2025') {
      localStorage.setItem('velcura_admin', 'true');
      setUnlocked(true);
      setError(false);
    } else {
      setError(true);
      setPwd('');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('velcura_admin');
    setUnlocked(false);
    setPwd('');
  };

  if (!unlocked) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FDFBF7' }}>
        <SEOHead title="Admin Login | Velcura" />
        <div style={{ background: 'white', padding: '40px', borderRadius: '16px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#0A192F', marginBottom: '8px' }}>Admin Access</h1>
          <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '32px' }}>Please enter your password to continue.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <input 
              type="password" 
              placeholder="Password"
              value={pwd}
              onChange={e => { setPwd(e.target.value); setError(false); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className={error ? 'shake' : ''}
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '8px',
                border: `1px solid ${error ? '#ef4444' : '#ddd'}`,
                fontSize: '14px', outline: 'none'
              }}
            />
            {error && <p style={{ color: '#ef4444', fontSize: '12px', textAlign: 'left' }}>Incorrect password</p>}
            <button onClick={handleLogin} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Unlock Dashboard
            </button>
          </div>
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

        {/* Overall Grid Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', alignItems: 'start' }}>
          
          {/* Main Content Area (Left) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Products Table */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)', overflowX: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', margin: 0 }}>Inventory Management</h2>
                <span style={{ fontSize: '13px', color: '#6B7280' }}>{products.length} Products</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E5E7EB', textAlign: 'left' }}>
                    <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Product & Image</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Category</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Price</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Stock</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Rating</th>
                    <th style={{ padding: '12px 16px', fontSize: '12px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: '#0A192F' }}>{p.name}</span>
                          <img src={p.image} alt="" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover', background: '#F8F9FA' }} />
                        </div>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#6B7280' }}>{p.category}</td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', fontWeight: 700, color: '#0A192F' }}>₹{p.price}</td>
                      <td style={{ padding: '12px 16px' }}>
                        <span style={{ display: 'inline-block', padding: '4px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 600, background: p.stock > 0 ? '#ECFDF5' : '#FEF2F2', color: p.stock > 0 ? '#10B981' : '#EF4444' }}>
                          {p.stock > 0 ? `${p.stock} Units` : 'Low Stock'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontSize: '14px', color: '#EAB308', fontWeight: 600 }}>★ {p.rating}</td>
                      <td style={{ padding: '12px 16px', textAlign: 'right' }}>
                        <button onClick={() => toast.info('Edit: Coming soon')} style={{ background: 'none', border: 'none', color: '#6B7280', cursor: 'pointer', marginRight: '12px' }}><Edit2 size={16} /></button>
                        <button onClick={() => toast.info('Delete: Coming soon')} style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer' }}><Trash2 size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Reviews (Now below the table) */}
            <div style={{ background: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#0A192F', margin: 0 }}>Customer Feedback</h2>
                <button style={{ fontSize: '12px', color: '#C9A24A', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>View All Reviews</button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {mockReviews.map((r, i) => (
                  <div key={i} style={{ border: '1px solid #F3F4F6', borderRadius: '12px', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ fontSize: '14px', fontWeight: 700, color: '#0A192F' }}>{r.user}</span>
                      <div style={{ display: 'flex', gap: '2px' }}>
                        {[...Array(5)].map((_, starI) => <Star key={starI} size={12} fill={starI < r.rating ? "#EAB308" : "none"} stroke={starI < r.rating ? "#EAB308" : "#D1D5DB"} />)}
                      </div>
                    </div>
                    <span style={{ fontSize: '11px', color: '#C9A24A', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '8px' }}>{r.pName}</span>
                    <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.6, fontStyle: 'italic' }}>"{r.body}"</p>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar Area (Right) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* WhatsApp Widget */}
            <div style={{ background: '#25D366', borderRadius: '16px', padding: '24px', color: 'white', boxShadow: '0 10px 20px rgba(37, 211, 102, 0.2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ background: 'rgba(255,255,255,0.2)', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <MessageCircle size={24} />
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 700, margin: 0 }}>Chat Support</h3>
                  <p style={{ fontSize: '12px', opacity: 0.9, margin: 0 }}>+91 98765 43210</p>
                </div>
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.5, marginBottom: '20px', opacity: 0.9 }}>Need technical help or have queries about orders? Our team is live.</p>
              <a 
                href="https://wa.me/919876543210" 
                target="_blank" 
                rel="noreferrer"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', background: 'white', color: '#25D366', textDecoration: 'none', padding: '12px', borderRadius: '8px', fontWeight: 700, fontSize: '14px', transition: 'transform 0.2s ease' }}
                onMouseOver={e => e.currentTarget.style.transform = 'scale(1.02)'}
                onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                Open WhatsApp
              </a>
            </div>

            {/* AI Insights Widget */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid rgba(10,25,47,0.05)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                <Sparkles size={18} color="#C9A24A" />
                <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0A192F', margin: 0 }}>AI Insights</h3>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  "Oil Balance Cleanser has the highest rating (4.8★)",
                  "WELCOME20 is your most-used coupon",
                  "Stock running low on 1 product",
                  "3 new reviews this week"
                ].map((insight, idx) => (
                  <li key={idx} style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#4B5563', lineHeight: 1.4 }}>
                    <div style={{ minWidth: '6px', height: '6px', borderRadius: '50%', background: '#C9A24A', marginTop: '6px' }} />
                    {insight}
                  </li>
                ))}
              </ul>
            </div>

            {/* Coupons Table */}
            <div style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid rgba(10,25,47,0.05)', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
              <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#0A192F', marginBottom: '20px', margin: '0 0 20px' }}>Promo Codes</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid #F3F4F6' }}>
                    <th style={{ paddingBottom: '10px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Code</th>
                    <th style={{ paddingBottom: '10px', fontSize: '11px', color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.05em', textAlign: 'right' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { c: 'WELCOME20', d: '20%', s: true },
                    { c: 'VELCURA10', d: '10%', s: true },
                    { c: 'SKIN15', d: '15%', s: true }
                  ].map(c => (
                    <tr key={c.c} style={{ borderBottom: '1px solid #FAFAFA' }}>
                      <td style={{ padding: '12px 0' }}>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#0A192F', display: 'block' }}>{c.c}</span>
                        <span style={{ fontSize: '11px', color: '#10B981', fontWeight: 600 }}>{c.d} OFF</span>
                      </td>
                      <td style={{ padding: '12px 0', textAlign: 'right' }}>
                        <span style={{ fontSize: '10px', fontWeight: 700, color: c.s ? '#10B981' : '#9CA3AF', background: c.s ? '#ECFDF5' : '#F3F4F6', padding: '4px 8px', borderRadius: '4px' }}>
                          {c.s ? 'ACTIVE' : 'EXPIRED'}
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
