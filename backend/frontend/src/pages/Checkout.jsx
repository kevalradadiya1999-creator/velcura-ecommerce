import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { ShieldCheck, CreditCard, Truck, ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { items, total, count, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Shipping, 2: Payment
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const handleNext = async (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/payment/create-order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: total }),
      });
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to create order');

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID || "rzp_test_placeholder",
        amount: data.amount,
        currency: data.currency,
        name: "Velcura Hygiene",
        description: "Premium Skincare Ritual",
        image: "/velcura-logo.png",
        order_id: data.id,
        handler: async (response) => {
          try {
            const verifyRes = await fetch(`${API_URL}/api/payment/verify`, {
               method: "POST",
               headers: { "Content-Type": "application/json" },
               body: JSON.stringify(response)
            });
            
            if (verifyRes.ok) {
              const orderRes = await fetch(`${API_URL}/api/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                   items,
                   total,
                   paymentId: response.razorpay_payment_id,
                   shippingDetails: {}
                })
              });
              
              if (orderRes.ok) {
                 clearCart();
                 navigate('/success');
              }
            } else {
              alert("Payment verification failed.");
            }
          } catch (error) {
            console.error(error);
            alert("Order saving failed.");
          } finally {
            setLoading(false);
          }
        },
        prefill: {
          name: "Velcura Customer",
          email: "customer@velcura.in",
          contact: "9999999999"
        },
        theme: {
          color: "#0A192F",
        },
        modal: {
          ondismiss: function() {
            setLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.on('payment.failed', function (response){
         alert("Payment Failed: " + response.error.description);
         setLoading(false);
      });
      rzp.open();
    } catch (error) {
      console.error(error);
      alert("Error initiating payment.");
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '32px' }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', marginBottom: '16px' }}>Your cart is empty</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '32px' }}>Add some premium wipes to your collection before checking out.</p>
        <Link to="/shop" className="btn-primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '120px 32px 80px' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '64px' }} className="checkout-grid">
        
        {/* Left: Form */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '40px' }}>
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step >= 1 ? 'var(--text)' : 'var(--border)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>1</div>
            <div style={{ height: '1px', width: '40px', background: 'var(--border)' }} />
            <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step >= 2 ? 'var(--text)' : 'var(--border)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 700 }}>2</div>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', fontWeight: 600, marginBottom: '48px' }}>
            {step === 1 ? 'Shipping Details' : 'Payment Method'}
          </h1>

          <form onSubmit={handleNext} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {step === 1 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <Input label="First Name" required />
                  <Input label="Last Name" required />
                </div>
                <Input label="Email Address" type="email" required />
                <Input label="Phone Number" type="tel" required />
                <Input label="Shipping Address" required />
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <Input label="City" required />
                  <Input label="State" required />
                  <Input label="Pincode" required />
                </div>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ padding: '24px', border: '1.5px solid var(--accent)', borderRadius: '12px', background: 'rgba(201,162,74,0.05)', display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <CreditCard size={24} color="var(--accent)" />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '15px', fontWeight: 600 }}>Secure Payment</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Credit Card, UPI, or Net Banking</p>
                  </div>
                  <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'white' }} />
                  </div>
                </div>
                <Input label="Card Number" placeholder="0000 0000 0000 0000" required />
                <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '16px' }}>
                  <Input label="Expiry Date" placeholder="MM / YY" required />
                  <Input label="CVV" placeholder="***" type="password" required />
                </div>
              </div>
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '16px' }}>
              {step === 2 && (
                <button type="button" onClick={() => setStep(1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '14px' }}>
                  <ArrowLeft size={16} /> Back to Shipping
                </button>
              )}
              <button 
                type="submit" 
                className="btn-primary" 
                disabled={loading}
                style={{ marginLeft: 'auto', minWidth: '200px', justifyContent: 'center' }}
              >
                {loading ? 'Processing...' : step === 1 ? 'Continue to Payment' : `Pay ₹${total.toLocaleString()}`}
              </button>
            </div>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div>
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '40px', position: 'sticky', top: '120px' }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, marginBottom: '32px' }}>Order Summary</h2>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '32px', maxHeight: '400px', overflowY: 'auto' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', gap: '16px' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '12px', overflow: 'hidden', background: 'var(--bg)', flexShrink: 0 }}>
                    <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: 600 }}>{item.name}</p>
                    <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Qty: {item.qty}</p>
                  </div>
                  <p style={{ fontSize: '14px', fontWeight: 600 }}>₹{(item.price * item.qty).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderTop: '1px solid var(--border)', paddingTop: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                <span>Subtotal</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--text-muted)' }}>
                <span>Shipping</span>
                <span style={{ color: '#16a34a', fontWeight: 600 }}>FREE</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 700, borderTop: '1px solid var(--border)', paddingTop: '16px', marginTop: '8px' }}>
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>

            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-subtle)', fontSize: '12px' }}>
                <ShieldCheck size={16} />
                <span>Secure SSL encrypted checkout</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-subtle)', fontSize: '12px' }}>
                <Truck size={16} />
                <span>Tracked express delivery across India</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 992px) {
          .checkout-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </div>
  );
};

const Input = ({ label, ...props }) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <label style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
      {label}
    </label>
    <input
      {...props}
      style={{
        width: '100%',
        padding: '14px 18px',
        border: '1.5px solid var(--border)',
        background: 'white',
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        outline: 'none',
        borderRadius: '12px',
        transition: 'all 0.2s',
      }}
      onFocus={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.boxShadow = '0 0 0 4px rgba(201,162,74,0.05)'; }}
      onBlur={e => { e.target.style.borderColor = 'var(--border)'; e.target.style.boxShadow = 'none'; }}
    />
  </div>
);

export default Checkout;
