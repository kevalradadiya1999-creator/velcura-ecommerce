import { Link } from 'react-router-dom';
import { ArrowRight, Hexagon, Diamond, Layers } from 'lucide-react';
import { products } from '../data/products';

const Ingredients = () => {
  const science = [
    {
      id: 'niacinamide',
      name: 'Niacinamide',
      subtitle: 'Vitamin B3',
      icon: Hexagon,
      color: '#2D7D77',
      bg: '#EAF5F4',
      product: products[0],
      what: "Niacinamide (nicotinamide) is an active, water-soluble form of Vitamin B3. Our formulation uses a clinical concentration of 4% to target oil production at the source.",
      how: "It works by regulating the activity of sebaceous glands and interrupting the transfer of pigment. It also reinforces the epidermal barrier by stimulating the skin's natural production of ceramides and keratin.",
      results: [
        'Significant sebum reduction in 4 weeks',
        'Refined pore texture and reduced redness',
        'Stronger, more resilient skin barrier'
      ],
      fact: "Clinical studies show that 4% Niacinamide is as effective as topical antibiotics for calming acne-related inflammation, without the risk of antibiotic resistance.",
    },
    {
      id: 'hyaluronic-acid',
      name: 'Hyaluronic Acid',
      subtitle: 'Sodium Hyaluronate',
      icon: Diamond,
      color: '#8B6B3D',
      bg: '#FDF5E8',
      product: products[1],
      what: "Hyaluronic Acid is a powerful humectant naturally found in the skin. We use a high-purity Sodium Hyaluronate (0.5% - 1%) to ensure maximum hydration without greasiness.",
      how: "It acts like a molecular sponge, holding up to 1000 times its weight in water. By delivering this moisture deep into the epidermal layers, it creates an immediate plumping effect and smooths out fine dehydration lines.",
      results: [
        'Immediate relief from skin tightness',
        'Visible plumping of the skin surface',
        'Long-lasting hydration that persists after cleansing'
      ],
      fact: "Hyaluronic Acid levels in the skin decrease by 50% as we age. Replenishing it topically is a cornerstone of anti-aging and hydration strategy.",
    },
    {
      id: 'ceramide-complex',
      name: 'Ceramide Complex',
      subtitle: 'NP + AP + EOP',
      icon: Layers,
      color: '#7B6B8A',
      bg: '#F4EFF8',
      product: products[2],
      what: "Ceramides are lipid molecules that make up 50% of your skin's composition. Our complex combines Ceramide NP, AP, and EOP to mimic the skin's natural mortgage.",
      how: "They act as the 'mortar' between your skin cell 'bricks'. By replenishing these lipids, the wipes restore the barrier's integrity, locking in moisture and sealing out environmental irritants and pollutants.",
      results: [
        'Reduced skin reactivity and redness',
        'Protection against transepidermal water loss',
        'Restored barrier function for compromised skin'
      ],
      fact: "Sensitive skin is often a symptom of a 'leaky' barrier. Ceramide replenishment is the primary clinical way to 'seal' the skin and reduce long-term sensitivity.",
    },
  ];

  return (
    <div>
      {/* Header */}
      <section style={{
        background: '#0A192F',
        padding: '100px 32px 80px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-50px', left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', borderRadius: '50%', border: '1px solid rgba(201,162,74,0.1)', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <span className="section-label">Formulation Science</span>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, color: '#FDFBF7', marginBottom: '20px', lineHeight: 1.2 }}>
            The Clinical Standard
          </h1>
          <p style={{ fontSize: '17px', color: 'rgba(253,251,247,0.6)', maxWidth: '580px', margin: '0 auto', lineHeight: '1.7' }}>
            Doctor-approved ingredient strategies designed to cleanse your skin without compromising its biological health.
          </p>
        </div>
      </section>

      {/* Ingredients detail */}
      {science.map((ing, idx) => (
        <section
          key={ing.id}
          id={`ingredient-${ing.id}`}
          style={{
            padding: '100px 32px',
            background: idx % 2 === 0 ? 'white' : 'var(--bg)',
          }}
        >
          <div style={{
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '80px',
            alignItems: 'center',
            direction: idx % 2 !== 0 ? 'rtl' : 'ltr',
          }}
          className="ingredient-grid"
          >
            {/* Visual */}
            <div style={{ direction: 'ltr' }}>
              <div style={{
                borderRadius: '12px',
                background: `linear-gradient(135deg, ${ing.bg} 0%, white 100%)`,
                padding: '60px 40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '440px',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(10,25,47,0.1)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.03)',
              }}>
                {/* Glassmorphism Background elements */}
                <div style={{
                  position: 'absolute',
                  top: '-20px',
                  right: '-20px',
                  width: '150px',
                  height: '150px',
                  borderRadius: '50%',
                  background: `radial-gradient(circle, ${ing.color}15 0%, transparent 70%)`,
                  filter: 'blur(20px)',
                }} />
                
                {/* Subtle Shimmer on Card */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(45deg, transparent 45%, rgba(255,255,255,0.4) 50%, transparent 55%)',
                  backgroundSize: '300% 300%',
                  animation: 'shimmer 10s infinite linear',
                  pointerEvents: 'none',
                }} />

                <div style={{ 
                  marginBottom: '24px', 
                  color: ing.color,
                  filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.1))',
                  animation: 'float 5s infinite ease-in-out',
                  display: 'flex',
                  justifyContent: 'center'
                }}>
                  <ing.icon size={80} strokeWidth={1.2} />
                </div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', fontWeight: 600, color: ing.color, marginBottom: '8px', textAlign: 'center' }}>{ing.name}</p>
                <p style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '0.2em', color: ing.color, opacity: 0.8, textTransform: 'uppercase', textAlign: 'center' }}>{ing.subtitle}</p>

                {/* Product link - Glassmorphism style */}
                <div style={{ 
                  marginTop: '40px', 
                  padding: '16px 24px', 
                  background: 'rgba(255,255,255,0.7)', 
                  backdropFilter: 'blur(8px)',
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '16px', 
                  boxShadow: '0 8px 32px rgba(10,25,47,0.05)',
                  border: '1px solid rgba(255,255,255,0.5)',
                  transition: 'transform 0.3s ease',
                }}
                className="hover-lift"
                >
                  <img src={ing.product.image} alt={ing.product.name} style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '12px' }} />
                  <div style={{ textAlign: 'left' }}>
                    <p style={{ fontSize: '10px', color: ing.color, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '4px' }}>Found in</p>
                    <p style={{ fontSize: '14px', fontWeight: 700, color: '#0A192F' }}>{ing.product.fullName}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Text */}
            <div style={{ direction: 'ltr' }}>
              <div style={{ width: '40px', height: '3px', background: ing.color, marginBottom: '28px' }} />
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(26px, 3.5vw, 40px)', fontWeight: 600, color: 'var(--text)', marginBottom: '24px', lineHeight: 1.2 }}>
                {ing.name}
              </h2>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: ing.color, marginBottom: '10px' }}>What It Is</p>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>{ing.what}</p>
              </div>

              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: ing.color, marginBottom: '10px' }}>Clinical Function</p>
                <p style={{ fontSize: '15px', color: 'var(--text-muted)', lineHeight: '1.7' }}>{ing.how}</p>
              </div>

              <div style={{ marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: ing.color, marginBottom: '12px' }}>Expected Results</p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {ing.results.map(r => (
                    <li key={r} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-muted)' }}>
                      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: ing.color, flexShrink: 0 }} />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Clinical fact */}
              <div style={{ padding: '20px 24px', background: ing.bg, borderLeft: `3px solid ${ing.color}`, borderRadius: '12px', marginBottom: '32px' }}>
                <p style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: ing.color, textTransform: 'uppercase', marginBottom: '6px' }}>Clinical Fact</p>
                <p style={{ fontSize: '14px', color: 'var(--text-muted)', lineHeight: '1.6', fontStyle: 'italic' }}>{ing.fact}</p>
              </div>

              <Link to={`/product/${ing.product.slug}`} className="btn-primary" style={{ display: 'inline-flex' }}>
                Shop {ing.product.name} <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </section>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .ingredient-grid { grid-template-columns: 1fr !important; direction: ltr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
};

export default Ingredients;
