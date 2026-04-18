import { useEffect, useState } from 'react';
import { X, Trash2, Minus, Plus, ArrowRight, ShoppingBag, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const COUPONS = { VELCURA10: 10, WELCOME20: 20, SKIN15: 15 };

const CartDrawer = () => {
  const { items, removeItem, updateQty, total, count, isOpen, setIsOpen } = useCart();
  const [couponInput, setCouponInput] = useState('');
  const [couponExpanded, setCouponExpanded] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const discountAmt = Math.round(total * discount / 100);
  const finalTotal = total - discountAmt;

  const applyCoupon = () => {
    const code = couponInput.trim().toUpperCase();
    if (COUPONS[code]) {
      setAppliedCoupon(code);
      setDiscount(COUPONS[code]);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code');
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    setCouponInput('');
    setCouponError('');
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        id="cart-overlay"
        className="cart-overlay"
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div id="cart-drawer" className="cart-drawer open" role="dialog" aria-modal="true">
        {/* Header */}
        <div style={{
          padding: '24px 28px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexShrink: 0,
        }}>
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: 'var(--text)' }}>
              Your Cart
            </h2>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '2px' }}>
              {count} {count === 1 ? 'item' : 'items'}
            </p>
          </div>
          <button
            id="close-cart-btn"
            onClick={() => setIsOpen(false)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', padding: '8px', borderRadius: '12px', transition: 'background 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.background = 'var(--surface)'}
            onMouseLeave={e => e.currentTarget.style.background = 'none'}
          >
            <X size={20} />
          </button>
        </div>

        {/* Items */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', paddingTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <ShoppingBag size={64} color="var(--accent)" strokeWidth={1} style={{ marginBottom: '20px', opacity: 0.3 }} />
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '18px', color: 'var(--text)', marginBottom: '8px' }}>Your cart is empty</p>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginBottom: '32px' }}>Discover our premium skincare wipes</p>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="btn-primary"
                style={{ display: 'inline-flex' }}
              >
                Shop Now
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {items.map(item => (
                <div
                  key={item.id}
                  id={`cart-item-${item.id}`}
                  style={{
                    display: 'flex',
                    gap: '16px',
                    padding: '16px',
                    background: 'var(--surface)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)',
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    background: 'white',
                  }}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '4px' }}>
                      Velcura
                    </p>
                    <p style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text)', marginBottom: '4px' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginBottom: '12px' }}>
                      {item.skinType}
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Qty */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid var(--border)', padding: '4px 12px', borderRadius: '12px' }}>
                        <button
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', display: 'flex' }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{ fontSize: '14px', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text)', display: 'flex' }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      {/* Price */}
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text)' }}>
                          ₹{(item.price * item.qty).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-subtle)', alignSelf: 'flex-start', transition: 'color 0.2s', display: 'flex' }}
                    onMouseEnter={e => e.currentTarget.style.color = '#ef4444'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--text-subtle)'}
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Coupon code section */}
        {items.length > 0 && (
          <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border)' }}>
            {appliedCoupon ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', background: '#dcfce7', padding: '10px 14px', borderRadius: '8px' }}>
                <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>
                  🎉 {appliedCoupon} applied — You save ₹{discountAmt}
                </span>
                <button onClick={removeCoupon} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#16a34a', fontSize: '16px' }}>×</button>
              </div>
            ) : (
              <div>
                <button
                  onClick={() => setCouponExpanded(v => !v)}
                  style={{ display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: 'var(--text-muted)', padding: 0, fontFamily: 'Inter, sans-serif' }}
                >
                  <Tag size={14} />
                  Have a coupon?
                </button>
                <div style={{
                  maxHeight: couponExpanded ? '80px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease',
                  marginTop: couponExpanded ? '10px' : 0,
                }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <input
                      id="coupon-input"
                      value={couponInput}
                      onChange={e => { setCouponInput(e.target.value); setCouponError(''); }}
                      placeholder="Enter coupon code"
                      onKeyDown={e => e.key === 'Enter' && applyCoupon()}
                      style={{ flex: 1, border: '1px solid var(--border)', borderRadius: '6px', padding: '8px 12px', fontSize: '13px', fontFamily: 'Inter, sans-serif', outline: 'none', textTransform: 'uppercase' }}
                    />
                    <button
                      onClick={applyCoupon}
                      style={{ background: '#0A192F', color: 'white', border: 'none', borderRadius: '6px', padding: '8px 14px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '6px' }}>{couponError}</p>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        {items.length > 0 && (
          <div style={{ padding: '24px 28px', borderTop: '1px solid var(--border)', flexShrink: 0 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Subtotal</span>
              <span style={{ fontSize: '14px', color: discount > 0 ? 'var(--text-subtle)' : 'var(--text)', fontWeight: 700, textDecoration: discount > 0 ? 'line-through' : 'none' }}>₹{total.toLocaleString()}</span>
            </div>
            {discount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <span style={{ fontSize: '13px', color: '#16a34a', fontWeight: 600 }}>Discount ({discount}%)</span>
                <span style={{ fontSize: '14px', color: '#16a34a', fontWeight: 700 }}>−₹{discountAmt}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
              <span style={{ fontSize: '14px', fontWeight: 700 }}>Total</span>
              <span style={{ fontSize: '16px', fontWeight: 800 }}>₹{finalTotal.toFixed(2)}</span>
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-subtle)', marginBottom: '20px' }}>
              Taxes and shipping calculated at checkout
            </p>
            <Link
              to="/order-confirmation"
              id="checkout-btn"
              onClick={() => setIsOpen(false)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <span>Proceed to Checkout</span>
              <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              style={{ width: '100%', marginTop: '12px', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
