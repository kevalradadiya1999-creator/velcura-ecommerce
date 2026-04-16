import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import SEOHead from '../components/SEOHead';

const OrderConfirmation = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const [orderedItems] = useState(() => [...items]);
  const [orderNumber] = useState(() => `#VLC-${Math.floor(Math.random() * 90000 + 10000)}`);
  const orderTotal = orderedItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  useEffect(() => {
    // Clear cart after saving items to local state
    const timer = setTimeout(() => clearCart(), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#FDFBF7', padding: '60px 24px' }}>
      <SEOHead title="Order Confirmed — Velcura" description="Your Velcura order has been placed." url="/order-confirmation" />

      <div style={{ maxWidth: '560px', margin: '0 auto', textAlign: 'center' }}>
        {/* Animated checkmark */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          style={{ marginBottom: '28px' }}
        >
          <div style={{
            width: '80px', height: '80px', background: '#dcfce7',
            borderRadius: '50%', display: 'flex', alignItems: 'center',
            justifyContent: 'center', margin: '0 auto',
          }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <path d="M8 20L16 28L32 12" stroke="#16a34a" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.4 }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 5vw, 40px)', color: '#0A192F', marginBottom: '12px', fontWeight: 600 }}>
            Order Placed! 🎉
          </h1>
          <p style={{ fontSize: '15px', color: '#6B7280', marginBottom: '8px', lineHeight: '1.7' }}>
            Thank you for shopping with Velcura. Your order is being prepared with care.
          </p>

          <div style={{ display: 'inline-flex', gap: '24px', background: 'white', border: '1px solid rgba(10,25,47,0.08)', borderRadius: '12px', padding: '16px 28px', margin: '20px 0 32px', textAlign: 'left' }}>
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Order ID</p>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#0A192F' }}>{orderNumber}</p>
            </div>
            <div style={{ width: '1px', background: 'rgba(10,25,47,0.08)' }} />
            <div>
              <p style={{ fontSize: '11px', color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '4px' }}>Delivery</p>
              <p style={{ fontSize: '16px', fontWeight: 700, color: '#0A192F' }}>3–5 business days</p>
            </div>
          </div>

          {/* Order summary */}
          {orderedItems.length > 0 && (
            <div style={{ background: 'white', border: '1px solid rgba(10,25,47,0.08)', borderRadius: '12px', padding: '20px', marginBottom: '32px', textAlign: 'left' }}>
              <p style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#C9A24A', marginBottom: '16px' }}>
                Order Summary
              </p>
              {orderedItems.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(10,25,47,0.06)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={item.image} alt={item.name} width="44" height="44" style={{ borderRadius: '8px', objectFit: 'cover', background: item.bgColor }} />
                    <div>
                      <p style={{ fontSize: '13px', fontWeight: 600, color: '#0A192F' }}>{item.name}</p>
                      <p style={{ fontSize: '11px', color: '#9CA3AF' }}>Qty: {item.qty}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 700 }}>₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '16px' }}>
                <span style={{ fontWeight: 700, fontSize: '14px' }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: '16px', color: '#0A192F' }}>₹{orderTotal.toLocaleString()}</span>
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" style={{
              background: '#0A192F', color: '#FDFBF7', padding: '14px 28px',
              textDecoration: 'none', borderRadius: '4px', fontSize: '12px',
              fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Continue Shopping
            </Link>
            <Link to="/" style={{
              background: 'none', border: '1px solid rgba(10,25,47,0.2)', color: '#0A192F',
              padding: '14px 28px', textDecoration: 'none', borderRadius: '4px',
              fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
            }}>
              Back to Home
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
