import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Gift, Star, UserPlus, Instagram } from 'lucide-react';

const RewardsWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      {/* Floating Button Node */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          zIndex: 85,
          width: '32px',
          height: '80px',
          background: 'var(--accent)',
          border: 'none',
          color: 'white',
          borderRadius: '0 8px 8px 0',
          writingMode: 'vertical-rl',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.15em',
          cursor: 'pointer',
          boxShadow: '4px 0 16px rgba(201,162,74,0.3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'width 0.2s, background 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.width = '36px'; e.currentTarget.style.background = '#b89241'; }}
        onMouseLeave={(e) => { e.currentTarget.style.width = '32px'; e.currentTarget.style.background = 'var(--accent)'; }}
        aria-label="Open Rewards Panel"
      >
        REWARDS
      </button>

      {/* Slide-in Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              style={{
                position: 'fixed', inset: 0, background: 'rgba(10,25,47,0.4)', zIndex: 95, backdropFilter: 'blur(2px)'
              }}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              style={{
                position: 'fixed', left: 0, top: 0, bottom: 0, width: '300px', maxWidth: '85vw',
                background: 'var(--bg)', zIndex: 96, boxShadow: '4px 0 24px rgba(0,0,0,0.1)',
                display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px', borderBottom: '1px solid var(--border)' }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '22px', color: 'var(--text)', margin: 0 }}>Velcura Rewards</h2>
                <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }} aria-label="Close Rewards">
                  <X size={20} />
                </button>
              </div>

              <div style={{ padding: '32px 24px', flex: 1, overflowY: 'auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                  <p style={{ fontSize: '32px', fontWeight: 600, color: '#C9A24A', fontFamily: "'Playfair Display', serif", marginBottom: '8px' }}>
                    ✦ 0 Points
                  </p>
                  <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>Earn points with every purchase</p>
                </div>

                <div style={{ marginBottom: '40px' }}>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', marginBottom: '16px' }}>Ways to Earn</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {[
                      { label: 'Make a purchase', limit: '10 pts per ₹100', icon: <Gift size={16} /> },
                      { label: 'Write a review', limit: '50 pts', icon: <Star size={16} /> },
                      { label: 'Refer a friend', limit: '100 pts', icon: <UserPlus size={16} /> },
                      { label: 'Follow on Instagram', limit: '25 pts', icon: <Instagram size={16} /> }
                    ].map(way => (
                      <div key={way.label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(201,162,74,0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {way.icon}
                        </div>
                        <div>
                          <p style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text)', marginBottom: '2px' }}>{way.label}</p>
                          <p style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{way.limit}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text)', marginBottom: '16px' }}>How to Redeem</h3>
                  <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text)' }}>100 pts</p>
                      <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>= ₹10 off</p>
                    </div>
                    <div style={{ position: 'relative' }}>
                      <button disabled style={{ background: 'var(--surface)', color: 'var(--text-subtle)', border: 'none', padding: '8px 16px', borderRadius: '8px', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        Redeem
                      </button>
                      <span style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'var(--text)', color: 'white', fontSize: '9px', padding: '2px 6px', borderRadius: '999px', fontWeight: 700 }}>SOON</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default RewardsWidget;
