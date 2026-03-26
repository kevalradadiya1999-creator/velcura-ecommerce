import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    category: 'Product',
    id: 'product',
    items: [
      { q: 'How are Velcura wipes different from regular makeup remover wipes?', a: 'Most standard wipes are formulated purely to dissolve and remove makeup — they rely on surfactants and solvents without any skin-beneficial actives. Velcura wipes are built around a core dermatological ingredient (Niacinamide, Hyaluronic Acid, or Ceramide Complex) that actively benefits your skin while removing makeup. You\'re not just cleansing; you\'re treating.' },
      { q: 'Can I use Velcura wipes as my only cleansing step?', a: 'Yes. Velcura wipes are designed to be effective as a standalone cleansing step for most makeup levels. For very heavy, full-coverage makeup, you may prefer to follow with a gentle water rinse. For everyday makeup or light coverage, one wipe is sufficient.' },
      { q: 'Are Velcura wipes safe for use around the eyes?', a: 'Yes. All Velcura formulas are gentle enough for use around the eye area. We recommend a gentle sweep without rubbing over the eyelid. If you wear heavy waterproof mascara, a second pass may be needed.' },
      { q: 'Do I need to rinse after using Velcura wipes?', a: 'No rinsing is required. The residual actives (Niacinamide, HA, or Ceramide) continue to work on your skin after the wipe. This is by design — rinsing would remove the beneficial actives.' },
      { q: 'How many wipes are in each pack?', a: 'Each Velcura pack contains 25 wipes.' },
    ],
  },
  {
    category: 'Skin Type',
    id: 'skin-type',
    items: [
      { q: 'Which Velcura wipe is right for my skin?', a: 'If you have oily or acne-prone skin, choose Oil Balance (Niacinamide). If your skin is dry or dehydrated, choose HydraGlow (Hyaluronic Acid). If you have sensitive, reactive, or easily irritated skin, choose Calm Skin (Ceramide Complex). Combination skin types often find the Oil Balance formula most effective.' },
      { q: 'Can I use Velcura wipes if I have eczema?', a: 'The Calm Skin (Ceramide Complex) formula is specifically designed for compromised and sensitive skin types, including those prone to eczema. However, we always recommend a patch test and consulting your dermatologist for active eczema flare-ups.' },
      { q: 'I have combination skin — which should I use?', a: 'This is very common. Oil Balance (Niacinamide) tends to work well for combination skin as it regulates without over-drying. You could also use HydraGlow on drier areas if needed.' },
    ],
  },
  {
    category: 'Ingredients',
    id: 'ingredients',
    items: [
      { q: 'Are Velcura wipes alcohol-free?', a: 'Yes. All Velcura formulas are completely free from harsh, drying alcohols (such as Ethanol, Isopropyl Alcohol, and Denatured Alcohol). We use only skin-compatible, non-drying alcohols where structurally required (such as Cetyl Alcohol, which is a fatty alcohol that actually moisturizes).' },
      { q: 'Are Velcura wipes fragrance-free?', a: 'The Calm Skin formula is completely fragrance-free. The Oil Balance and HydraGlow formulas contain a very low concentration of skin-safe fragrance. If you have fragrance allergies, select Calm Skin.' },
      { q: 'Are your products cruelty-free?', a: 'Yes. Velcura does not conduct or commission any animal testing at any stage of product development.' },
    ],
  },
  {
    category: 'Orders & Shipping',
    id: 'shipping',
    items: [
      { q: 'How long does delivery take?', a: 'Standard delivery takes 3–5 business days across India. Express delivery (1–2 business days) is available in select metro areas. Free standard shipping on orders above ₹999.' },
      { q: 'What is your return policy?', a: 'We offer a 30-day return policy for unopened products. If you\'re unsatisfied with an opened product, please contact our support team at velcura60@gmail.com and we\'ll work with you toward a resolution.' },
      { q: 'Can I track my order?', a: 'Yes. A tracking link is sent to your email and phone number once your order is dispatched.' },
      { q: 'Do you ship internationally?', a: 'Currently, we ship within India only. International shipping is on our roadmap — sign up to our newsletter to be notified when it launches.' },
      { q: 'Is my payment information secure?', a: 'Absolutely. All transactions are processed through PCI-DSS certified payment gateways. We do not store any card details on our servers.' },
    ],
  },
];

const FAQ = () => {
  const [open, setOpen] = useState(null);
  const [activeCategory, setActiveCategory] = useState('product');

  const toggleItem = (id) => setOpen(open === id ? null : id);
  const activeSection = faqs.find(f => f.id === activeCategory);

  return (
    <div>
      {/* Header */}
      <section style={{
        background: '#0A192F',
        padding: '100px 32px 80px',
        textAlign: 'center',
      }}>
        <span className="section-label">Support</span>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, color: '#FDFBF7', marginBottom: '16px' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontSize: '16px', color: 'rgba(253,251,247,0.6)', maxWidth: '500px', margin: '0 auto' }}>
          Everything you need to know about Velcura products, ingredients, and orders.
        </p>
      </section>

      {/* Content */}
      <section style={{ padding: '80px 32px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          {/* Category tabs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '48px' }}>
            {faqs.map(f => (
              <button
                key={f.id}
                id={`faq-tab-${f.id}`}
                onClick={() => { setActiveCategory(f.id); setOpen(null); }}
                style={{
                  background: activeCategory === f.id ? 'var(--text)' : 'white',
                  color: activeCategory === f.id ? 'white' : 'var(--text-muted)',
                  border: `1px solid ${activeCategory === f.id ? 'var(--text)' : 'var(--border)'}`,
                  padding: '10px 24px',
                  fontSize: '12px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  borderRadius: '12px',
                  transition: 'all 0.2s',
                }}
              >
                {f.category}
              </button>
            ))}
          </div>

          {/* FAQ items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {activeSection?.items.map((item, idx) => {
              const id = `${activeCategory}-${idx}`;
              const isActive = open === id;
              return (
                <div
                  key={id}
                  style={{
                    background: 'white',
                    border: `1px solid ${isActive ? 'var(--accent)' : 'var(--border)'}`,
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? '0 10px 30px rgba(10,25,47,0.05)' : 'none',
                    position: 'relative',
                  }}
                >
                  {/* Subtle Shimmer for Active Item */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(45deg, transparent 40%, rgba(201,162,74,0.02) 50%, transparent 60%)',
                      backgroundSize: '200% 200%',
                      animation: 'shimmer 8s infinite linear',
                      pointerEvents: 'none',
                    }} />
                  )}

                  <button
                    id={`faq-q-${id}`}
                    onClick={() => toggleItem(id)}
                    style={{
                      width: '100%',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '24px 32px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      textAlign: 'left',
                      gap: '20px',
                    }}
                  >
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: '18px',
                      fontWeight: 600,
                      color: isActive ? 'var(--accent)' : 'var(--text)',
                      lineHeight: '1.4',
                      flex: 1,
                      transition: 'color 0.2s',
                    }}>
                      {item.q}
                    </span>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isActive ? 'var(--accent)' : 'var(--bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease',
                    }}>
                      <ChevronDown
                        size={16}
                        color={isActive ? '#0A192F' : 'var(--text-muted)'}
                        style={{ transition: 'transform 0.4s', transform: isActive ? 'rotate(180deg)' : 'none' }}
                      />
                    </div>
                  </button>
 
                  {isActive && (
                    <div
                      style={{
                        padding: '0 32px 32px',
                        animation: 'fadeUp 0.4s ease',
                      }}
                    >
                      <div style={{ 
                        fontSize: '15px', 
                        color: 'var(--text-muted)', 
                        lineHeight: '1.8', 
                        padding: '24px', 
                        background: 'var(--bg)', 
                        borderRadius: '12px',
                        borderLeft: '4px solid var(--accent)'
                      }}>
                        {item.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still need help? */}
          <div style={{ marginTop: '64px', padding: '48px', background: '#0A192F', borderRadius: '12px', textAlign: 'center' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', fontWeight: 600, color: '#FDFBF7', marginBottom: '12px' }}>
              Still have a question?
            </p>
            <p style={{ fontSize: '14px', color: 'rgba(253,251,247,0.6)', marginBottom: '28px' }}>
              Our team replies within 24 hours.
            </p>
            <a
              href="/contact"
              className="btn-primary"
              style={{ display: 'inline-flex' }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
