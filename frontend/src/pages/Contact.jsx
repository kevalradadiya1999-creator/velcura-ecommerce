import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => setSent(true), 600);
  };

  return (
    <div>
      {/* Header */}
      <section className="section text-center bg-[#0A192F]">
        <div className="container">
          <span className="section-label text-[#C9A24A] mx-auto">Reach Us</span>
          <h1 className="text-[#FDFBF7] mb-4">
            Contact Velcura
          </h1>
          <p className="text-[rgba(253,251,247,0.6)] max-w-[480px] mx-auto">
            Have questions about your skin type, our formulas, or an order? We're here.
          </p>
        </div>
      </section>

      {/* Contact grid */}
      <section className="section bg-[var(--bg)]">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-10 lg:gap-16 items-start">
            {/* Left info */}
            <div>
              <h2 className="text-[var(--text)] mb-3">
                We're here to help
              </h2>
              <p className="text-[var(--text-muted)] mb-10">
                Whether it's a question about the right formula for your skin, an order concern, or just a curiosity about our ingredients — our team responds within 24 hours.
              </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', marginBottom: '48px' }}>
              {[
                { icon: Mail, label: 'Email', value: <a href="mailto:velcura60@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>velcura60@gmail.com</a> },
                { icon: Phone, label: 'WhatsApp', value: '+91 7863031769' },
                { icon: MapPin, label: 'Registered Office', value: 'Velcura Hygiene Pvt Ltd, India' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color="var(--accent)" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '4px' }}>{label}</p>
                    <p style={{ fontSize: '15px', color: 'var(--text)', fontWeight: 500 }}>{value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Business hours */}
            <div style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '12px', background: 'white' }}>
              <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: '16px' }}>Support Hours</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { day: 'Monday – Friday', hours: '10:00 AM – 6:00 PM IST' },
                  { day: 'Saturday', hours: '11:00 AM – 4:00 PM IST' },
                  { day: 'Sunday', hours: 'Closed (email responded next day)' },
                ].map(r => (
                  <div key={r.day} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text)', fontWeight: 500 }}>{r.day}</span>
                    <span style={{ fontSize: '13px', color: 'var(--text-muted)' }}>{r.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div style={{ 
            background: 'white', 
            padding: '48px', 
            borderRadius: '12px', 
            border: '1px solid var(--border)', 
            boxShadow: '0 20px 50px rgba(10,25,47,0.08)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            {/* Subtle Shimmer for Form Container */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(45deg, transparent 45%, rgba(201,162,74,0.02) 50%, transparent 55%)',
              backgroundSize: '300% 300%',
              animation: 'shimmer 10s infinite linear',
              pointerEvents: 'none',
            }} />

            {sent ? (
              <div style={{ textAlign: 'center', padding: '60px 0', position: 'relative', zIndex: 1 }}>
                <CheckCircle size={56} color="var(--accent)" style={{ marginBottom: '24px' }} />
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '30px', fontWeight: 600, marginBottom: '12px', color: 'var(--text)' }}>Message Received</h3>
                <p style={{ fontSize: '16px', color: 'var(--text-muted)', lineHeight: '1.7' }}>
                  Your inquiry has been logged. Our clinical team will reach out to you within 24 hours.
                </p>
              </div>
            ) : (
              <div style={{ position: 'relative', zIndex: 1 }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 600, color: 'var(--text)', marginBottom: '32px' }}>
                  Clinical Inquiry
                </h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    {[
                      { id: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                      { id: 'email', label: 'Email Address', type: 'email', placeholder: 'you@email.com' },
                    ].map(field => (
                      <div key={field.id}>
                        <label htmlFor={field.id} style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          placeholder={field.placeholder}
                          required
                          value={form[field.id]}
                          onChange={e => setForm(f => ({ ...f, [field.id]: e.target.value }))}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: '1.5px solid var(--border)',
                            background: 'var(--bg)',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '14px',
                            color: 'var(--text)',
                            outline: 'none',
                            borderRadius: '12px',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border)'}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label htmlFor="subject" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                      Subject
                    </label>
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1.5px solid var(--border)',
                        background: 'var(--bg)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: form.subject ? 'var(--text)' : 'var(--text-muted)',
                        outline: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                      }}
                    >
                      <option value="">Select a topic</option>
                      <option value="product">Product question</option>
                      <option value="order">Order enquiry</option>
                      <option value="return">Returns & Refunds</option>
                      <option value="skin">Skin type advice</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-muted)', display: 'block', marginBottom: '8px' }}>
                      Message
                    </label>
                    <textarea
                      id="message"
                      placeholder="How can we help?"
                      required
                      rows={5}
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: '1.5px solid var(--border)',
                        background: 'var(--bg)',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '14px',
                        color: 'var(--text)',
                        outline: 'none',
                        borderRadius: '12px',
                        resize: 'vertical',
                        transition: 'border-color 0.2s',
                      }}
                      onFocus={e => e.target.style.borderColor = 'var(--accent)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>

                  <button
                    id="contact-submit"
                    type="submit"
                    className="btn-primary"
                    style={{ justifyContent: 'center' }}
                  >
                    <Send size={15} /> Send Message
                  </button>
                </form>
              </div>
            )}
          </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
