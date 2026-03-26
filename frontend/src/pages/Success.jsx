import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Success = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', padding: '32px', textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '32px' }}>
        <CheckCircle size={48} color="#0A192F" />
      </div>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '42px', fontWeight: 600, marginBottom: '16px', color: 'var(--text)' }}>
        Your Order is Confirmed
      </h1>
      <p style={{ color: 'var(--text-muted)', maxWidth: '500px', lineHeight: '1.7', marginBottom: '40px', fontSize: '16px' }}>
        Thank you for choosing Velcura. Your skin will thank you.
      </p>
      <div style={{ display: 'flex', gap: '16px' }}>
        <Link to="/shop" className="btn-primary" style={{ padding: '16px 32px' }}>Continue Shopping</Link>
      </div>
    </div>
  );
};

export default Success;
