import { useState } from 'react';
import { motion } from 'framer-motion';
import SEOHead from '../components/SEOHead';

const SUBJECTS = ['Order Inquiry', 'Product Question', 'Returns & Refunds', 'Partnership', 'Other'];

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.46 },
};

const FloatingField = ({ id, label, type = 'text', value, onChange, error, textarea, rows = 4, children }) => {
  const baseStyle = {
    width: '100%', padding: '18px 14px 6px', fontSize: '14px',
    fontFamily: 'Inter, sans-serif', color: '#0A192F',
    border: `1.5px solid ${error ? '#ef4444' : '#ddd'}`, borderRadius: '8px',
    background: 'white', outline: 'none', resize: textarea ? 'vertical' : undefined,
    transition: 'border-color 0.2s', boxSizing: 'border-box',
    minHeight: textarea ? `${rows * 26}px` : undefined,
  };

  return (
    <div style={{ position: 'relative', marginBottom: error ? '6px' : '20px' }}>
      <style>{`
        .float-label { position: absolute; left: 14px; top: 14px; font-size: 14px; color: #9CA3AF; pointer-events: none; transition: all 0.2s; font-family: Inter, sans-serif; }
        .float-input:focus ~ .float-label,
        .float-input:not(:placeholder-shown) ~ .float-label,
        .float-select:focus ~ .float-label,
        .float-select[value]:not([value=""]) ~ .float-label { top: 4px; font-size: 11px; color: #C9A24A; font-weight: 600; letter-spacing: 0.06em; text-transform: uppercase; }
        .float-input:focus, .float-select:focus { border-color: #C9A24A !important; }
      `}</style>
      {textarea ? (
        <textarea id={id} placeholder=" " value={value} onChange={onChange} rows={rows} className="float-input" style={baseStyle} />
      ) : children ? (
        <select id={id} value={value} onChange={onChange} className="float-select" style={{ ...baseStyle, appearance: 'none' }}>
          <option value="" disabled />
          {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      ) : (
        <input id={id} type={type} placeholder=" " value={value} onChange={onChange} className="float-input" style={baseStyle} />
      )}
      <label htmlFor={id} className="float-label">{label}</label>
      {error && <p style={{ fontSize: '12px', color: '#ef4444', marginTop: '4px', marginBottom: '16px' }}>{error}</p>}
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const set = (field) => (e) => setForm(v => ({ ...v, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Please enter a valid email address';
    if (!form.subject) e.subject = 'Please select a subject';
    if (!form.message.trim()) e.message = 'Message is required';
    else if (form.message.trim().length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const e2 = validate();
    setErrors(e2);
    if (Object.keys(e2).length > 0) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); setSent(true); }, 1500);
  };

  return (
    <div>
      <SEOHead
        title="Contact Us — Velcura Hygiene"
        description="Have questions about Velcura skincare products, your order, or returns? Get in touch with our team within 24 hours."
        url="/contact"
      />

      {/* Header */}
      <section style={{ background: '#0A192F', padding: '80px 32px', textAlign: 'center' }}>
        <div className="container">
          <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#C9A24A', display: 'block', marginBottom: '16px' }}>Reach Us</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(28px, 4vw, 48px)', color: '#FDFBF7', marginBottom: '16px' }}>Get in Touch</h1>
          <p style={{ color: 'rgba(253,251,247,0.6)', fontSize: '16px', maxWidth: '480px', margin: '0 auto' }}>We'd love to hear from you. Our team typically responds within 24 hours.</p>
        </div>
      </section>

      {/* Contact grid */}
      <motion.section {...fadeUp} style={{ padding: '80px 32px', background: '#FDFBF7' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '60px', alignItems: 'start', maxWidth: '1000px', margin: '0 auto' }}>

            {/* Left: Form */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#0A192F', marginBottom: '8px' }}>Send a Message</h2>
              <p style={{ fontSize: '14px', color: '#9CA3AF', marginBottom: '32px' }}>Fill out the form and we'll get back to you shortly.</p>

              {sent ? (
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}
                  style={{ textAlign: 'center', padding: '48px 24px', background: '#F0FDF4', borderRadius: '12px', border: '1px solid #bbf7d0' }}>
                  <div style={{ width: '56px', height: '56px', background: '#16a34a', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: '#0A192F', marginBottom: '8px' }}>Message Sent!</h3>
                  <p style={{ fontSize: '14px', color: '#6B7280', lineHeight: '1.7' }}>We'll get back to you within 24 hours on working days.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <FloatingField id="contact-name" label="Your Name" value={form.name} onChange={set('name')} error={errors.name} />
                  {errors.name && <div style={{ height: '0' }} />}
                  <FloatingField id="contact-email" label="Email Address" type="email" value={form.email} onChange={set('email')} error={errors.email} />
                  {errors.email && <div style={{ height: '0' }} />}
                  <FloatingField id="contact-subject" label="Subject" value={form.subject} onChange={set('subject')} error={errors.subject} children>
                    {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
                  </FloatingField>
                  {errors.subject && <div style={{ height: '0' }} />}
                  <FloatingField id="contact-message" label="Message (min 20 chars)" value={form.message} onChange={set('message')} error={errors.message} textarea rows={5} />

                  <button type="submit" disabled={loading}
                    style={{ background: '#0A192F', color: 'white', border: 'none', padding: '14px 32px', borderRadius: '4px', fontSize: '13px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: loading ? 'wait' : 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', gap: '10px', opacity: loading ? 0.8 : 1 }}>
                    {loading ? (
                      <>
                        <div style={{ width: '14px', height: '14px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />
                        Sending...
                      </>
                    ) : 'Send Message'}
                  </button>
                </form>
              )}
            </div>

            {/* Right: Contact info */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: '#0A192F', marginBottom: '32px' }}>Contact Info</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24A" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>,
                    label: 'Email', value: 'support@velcurahygiene.in', href: 'mailto:support@velcurahygiene.in'
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24A" strokeWidth="1.8" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
                    label: 'WhatsApp', value: '+91 98765 43210', href: 'https://wa.me/919876543210'
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24A" strokeWidth="1.8" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
                    label: 'Instagram', value: '@velcurahygiene', href: 'https://instagram.com/velcurahygiene'
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24A" strokeWidth="1.8" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
                    label: 'Location', value: 'Ahmedabad, Gujarat, India', href: null
                  },
                  {
                    icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#C9A24A" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
                    label: 'Business Hours', value: 'Mon–Sat, 10am–6pm IST', href: null
                  },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                    <div style={{ width: '40px', height: '40px', background: '#F5F0E8', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div>
                      <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#9CA3AF', marginBottom: '2px' }}>{item.label}</p>
                      {item.href ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#0A192F', fontWeight: 500, textDecoration: 'none' }}
                          onMouseEnter={e => e.currentTarget.style.textDecoration = 'underline'}
                          onMouseLeave={e => e.currentTarget.style.textDecoration = 'none'}>
                          {item.value}
                        </a>
                      ) : (
                        <p style={{ fontSize: '14px', color: '#0A192F', fontWeight: 500 }}>{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default Contact;
