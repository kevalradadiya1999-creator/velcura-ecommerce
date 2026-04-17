import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onDone }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 350);
    }, 1200);
    return () => clearTimeout(t1);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          style={{
            position: 'fixed', inset: 0, background: '#FDFBF7',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            zIndex: 9999,
          }}
        >
          <img src="/velcura-logo.png" alt="Velcura" style={{ height: '56px', marginBottom: '32px', opacity: 0.9 }} />
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '14px', color: '#C9A24A', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '32px' }}>
            Skincare Science
          </p>

          {/* Progress bar */}
          <div style={{ width: '200px', height: '2px', background: '#E8E3DB', borderRadius: '999px', overflow: 'hidden', position: 'absolute', bottom: '40px' }}>
            <div style={{
              height: '100%',
              background: '#C9A24A',
              borderRadius: '999px',
              animation: 'splashProgress 1.2s linear forwards',
            }} />
          </div>

          <style>{`
            @keyframes splashProgress {
              from { width: 0%; }
              to { width: 100%; }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
