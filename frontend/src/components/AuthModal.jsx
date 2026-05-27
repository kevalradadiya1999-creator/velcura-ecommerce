import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Phone, User as UserIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isAuthModalOpen) return null;

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    let result;
    if (isLogin) {
      if (!formData.email && !formData.phone) {
        setError('Please enter either email or phone number');
        setLoading(false);
        return;
      }
      result = await login(formData.email, formData.phone);
    } else {
      if (!formData.name || !formData.email || !formData.phone) {
        setError('Please fill in all fields');
        setLoading(false);
        return;
      }
      result = await register(formData.name, formData.email, formData.phone);
    }

    setLoading(false);
    if (!result.success) {
      setError(result.error || 'Authentication failed');
    } else {
      setFormData({ name: '', email: '', phone: '' });
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '16px',
        }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeAuthModal}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(10, 25, 47, 0.4)',
            backdropFilter: 'blur(8px)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '440px',
            background: 'rgba(253, 251, 247, 0.95)',
            border: '1px solid rgba(201, 162, 74, 0.2)',
            borderRadius: '16px',
            boxShadow: '0 20px 40px rgba(10, 25, 47, 0.15), inset 0 0 0 1px rgba(253, 251, 247, 0.5)',
            overflow: 'hidden',
            zIndex: 10000,
          }}
        >
          <div
            style={{
              padding: '28px 28px 16px',
              borderBottom: '1px solid rgba(10, 25, 47, 0.05)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              position: 'relative',
            }}
          >
            <button
              onClick={closeAuthModal}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#0A192F',
                opacity: 0.6,
                padding: '4px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 1}
              onMouseLeave={e => e.currentTarget.style.opacity = 0.6}
            >
              <X size={18} />
            </button>

            <span
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '28px',
                fontWeight: 700,
                letterSpacing: '0.15em',
                color: '#0A192F',
                textTransform: 'uppercase',
                marginBottom: '4px',
              }}
            >
              Velcura
            </span>
            <span
              style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                color: '#C9A24A',
                textTransform: 'uppercase',
              }}
            >
              Premium Skincare Essentials
            </span>
          </div>

          <div style={{ padding: '24px 28px 28px' }}>
            <div
              style={{
                display: 'flex',
                background: 'rgba(10, 25, 47, 0.04)',
                borderRadius: '8px',
                padding: '4px',
                marginBottom: '24px',
              }}
            >
              <button
                onClick={() => { setIsLogin(true); setError(''); }}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  border: 'none',
                  borderRadius: '6px',
                  background: isLogin ? '#FDFBF7' : 'transparent',
                  color: '#0A192F',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: isLogin ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: isLogin ? '0 2px 8px rgba(10, 25, 47, 0.06)' : 'none',
                }}
              >
                Login
              </button>
              <button
                onClick={() => { setIsLogin(false); setError(''); }}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  border: 'none',
                  borderRadius: '6px',
                  background: !isLogin ? '#FDFBF7' : 'transparent',
                  color: '#0A192F',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: !isLogin ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: !isLogin ? '0 2px 8px rgba(10, 25, 47, 0.06)' : 'none',
                }}
              >
                Register
              </button>
            </div>

            {error && (
              <div
                style={{
                  background: 'rgba(239, 68, 68, 0.08)',
                  border: '1px solid rgba(239, 68, 68, 0.2)',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  color: '#ef4444',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  marginBottom: '18px',
                  textAlign: 'center',
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {!isLogin && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label
                    htmlFor="reg-name"
                    style={{
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      color: 'rgba(10, 25, 47, 0.6)',
                      textTransform: 'uppercase',
                    }}
                  >
                    Full Name
                  </label>
                  <div style={{ position: 'relative' }}>
                    <UserIcon
                      size={16}
                      style={{
                        position: 'absolute',
                        left: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: 'rgba(10, 25, 47, 0.4)',
                      }}
                    />
                    <input
                      id="reg-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 12px 12px 38px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        background: '#FFFFFF',
                        border: '1px solid rgba(10, 25, 47, 0.12)',
                        borderRadius: '8px',
                        color: '#0A192F',
                        outline: 'none',
                        transition: 'all 0.2s',
                      }}
                      onFocus={e => {
                        e.target.style.borderColor = '#C9A24A';
                        e.target.style.boxShadow = '0 0 0 3px rgba(201, 162, 74, 0.15)';
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = 'rgba(10, 25, 47, 0.12)';
                        e.target.style.boxShadow = 'none';
                      }}
                    />
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="auth-email"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'rgba(10, 25, 47, 0.6)',
                    textTransform: 'uppercase',
                  }}
                >
                  Email Address {isLogin && <span style={{ fontWeight: 400, textTransform: 'none', opacity: 0.7 }}>(optional)</span>}
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(10, 25, 47, 0.4)',
                    }}
                  />
                  <input
                    id="auth-email"
                    name="email"
                    type="email"
                    required={!isLogin}
                    placeholder="e.g. john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 38px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(10, 25, 47, 0.12)',
                      borderRadius: '8px',
                      color: '#0A192F',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#C9A24A';
                      e.target.style.boxShadow = '0 0 0 3px rgba(201, 162, 74, 0.15)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(10, 25, 47, 0.12)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label
                  htmlFor="auth-phone"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    color: 'rgba(10, 25, 47, 0.6)',
                    textTransform: 'uppercase',
                  }}
                >
                  Phone Number {isLogin && <span style={{ fontWeight: 400, textTransform: 'none', opacity: 0.7 }}>(optional)</span>}
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone
                    size={16}
                    style={{
                      position: 'absolute',
                      left: '12px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: 'rgba(10, 25, 47, 0.4)',
                    }}
                  />
                  <input
                    id="auth-phone"
                    name="phone"
                    type="tel"
                    required={!isLogin}
                    placeholder="e.g. +91 98765 43210"
                    value={formData.phone}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 12px 12px 38px',
                      fontFamily: 'Inter, sans-serif',
                      fontSize: '14px',
                      background: '#FFFFFF',
                      border: '1px solid rgba(10, 25, 47, 0.12)',
                      borderRadius: '8px',
                      color: '#0A192F',
                      outline: 'none',
                      transition: 'all 0.2s',
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = '#C9A24A';
                      e.target.style.boxShadow = '0 0 0 3px rgba(201, 162, 74, 0.15)';
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = 'rgba(10, 25, 47, 0.12)';
                      e.target.style.boxShadow = 'none';
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                style={{
                  width: '100%',
                  padding: '14px',
                  background: '#C9A24A',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '13px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(201, 162, 74, 0.25)',
                  marginTop: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#b8903c';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(201, 162, 74, 0.35)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = '#C9A24A';
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = '0 4px 15px rgba(201, 162, 74, 0.25)';
                }}
              >
                {loading ? 'Processing...' : isLogin ? 'Login' : 'Create Account'}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;