import { useState } from 'react';
import SEOHead from '../components/SEOHead';
import { Search, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OrderTracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!orderNumber || !email) return;
    setLoading(true);
    setStatus(null);
    // Fake loading state
    setTimeout(() => {
      setLoading(false);
      setStatus({
        orderNum: orderNumber.toUpperCase(),
        email: email,
        product: 'Oil Balance Cleansing Wipes',
        qty: 1,
        price: '₹599'
      });
    }, 1200);
  };

  return (
    <div style={{ padding: '80px 20px', background: '#FDFBF7', minHeight: '80vh' }}>
      <SEOHead title="Track Your Order | Velcura" />
      <div className="container" style={{ maxWidth: '600px' }}>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', color: '#0A192F', marginBottom: '16px', textAlign: 'center' }}>
          Track Your Order
        </h1>
        <p style={{ textAlign: 'center', color: '#6B7280', marginBottom: '40px' }}>
          Enter your order details below to see the current status.
        </p>

        <form onSubmit={handleTrack} style={{ background: 'white', padding: '32px', borderRadius: '16px', border: '1px solid #eee', marginBottom: '40px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0A192F', marginBottom: '8px' }}>Order Number</label>
            <input 
              type="text" 
              placeholder="e.g. VLC-12345"
              value={orderNumber}
              onChange={e => setOrderNumber(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#C9A24A'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#0A192F', marginBottom: '8px' }}>Email Address</label>
            <input 
              type="email" 
              placeholder="The email used at checkout"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '14px', outline: 'none' }}
              onFocus={e => e.target.style.borderColor = '#C9A24A'}
              onBlur={e => e.target.style.borderColor = '#ddd'}
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="btn-primary" 
            style={{ width: '100%', justifyContent: 'center', padding: '14px', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? <Loader2 size={18} className="animate-spin" /> : <><Search size={18} /> Track Order</>}
          </button>
        </form>

        <AnimatePresence>
          {status && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div style={{ background: 'white', borderRadius: '16px', border: '1px solid #eee', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.04)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px dashed #eee' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#9CA3AF', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order</p>
                    <p style={{ fontSize: '18px', fontWeight: 700, color: '#0A192F' }}>{status.orderNum}</p>
                  </div>
                  <div style={{ background: '#F0FDF4', color: '#16A34A', padding: '4px 12px', borderRadius: '999px', fontSize: '12px', fontWeight: 600 }}>
                    In Transit
                  </div>
                </div>

                {/* Progress Tracker Tracker */}
                <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', marginBottom: '40px' }}>
                  {/* Progress Line */}
                  <div style={{ position: 'absolute', top: '12px', left: '10%', right: '10%', height: '2px', background: '#eee', zIndex: 0 }} />
                  <div style={{ position: 'absolute', top: '12px', left: '10%', width: '45%', height: '2px', background: '#C9A24A', zIndex: 1, transition: 'width 1s ease' }} />
                  
                  {[
                    { id: 1, label: 'Order Placed', time: 'Yesterday, 10:24 AM', state: 'done' },
                    { id: 2, label: 'Processing', time: 'Yesterday, 4:15 PM', state: 'done' },
                    { id: 3, label: 'Shipped', time: 'Today, 8:00 AM', state: 'active' },
                    { id: 4, label: 'Delivered', time: 'Est. Tomorrow', state: 'upcoming' },
                  ].map((step, idx) => (
                    <div key={step.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2, width: '25%' }}>
                      <div style={{ 
                        width: '26px', height: '26px', borderRadius: '50%', marginBottom: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        background: step.state === 'done' ? '#C9A24A' : step.state === 'active' ? 'white' : 'white',
                        border: step.state === 'done' ? '2px solid #C9A24A' : step.state === 'active' ? '2px solid #C9A24A' : '2px solid #ddd',
                        color: 'white', position: 'relative'
                      }}>
                        {step.state === 'done' && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                        {step.state === 'active' && <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#C9A24A', animation: 'pulse 1.5s infinite' }} />}
                        <style>{`@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(201,162,74,0.4); } 70% { box-shadow: 0 0 0 6px rgba(201,162,74,0); } 100% { box-shadow: 0 0 0 0 rgba(201,162,74,0); } }`}</style>
                      </div>
                      <span style={{ fontSize: '11px', fontWeight: 600, color: (step.state === 'done' || step.state === 'active') ? '#0A192F' : '#9CA3AF', textAlign: 'center' }}>{step.label}</span>
                      <span style={{ fontSize: '10px', color: '#9CA3AF', textAlign: 'center', marginTop: '4px' }}>{step.time}</span>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', padding: '16px', background: '#FDFBF7', borderRadius: '12px', border: '1px solid #eee' }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600, color: '#0A192F', marginBottom: '4px' }}>{status.product}</p>
                    <p style={{ fontSize: '12px', color: '#6B7280' }}>Qty: {status.qty} • Total: {status.price}</p>
                  </div>
                </div>

                <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '13px', color: '#6B7280' }}>
                  Need help? <a href="https://wa.me/something" target="_blank" rel="noreferrer" style={{ color: '#C9A24A', fontWeight: 600, textDecoration: 'underline' }}>WhatsApp Us</a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default OrderTracking;
