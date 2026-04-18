import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { useCompare } from '../context/CompareContext';

const CompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useCompare();

  return (
    <AnimatePresence>
      {compareList.length >= 2 && (
        <motion.div
          initial={{ y: 100, opacity: 0, x: '-50%' }}
          animate={{ y: 0, opacity: 1, x: '-50%' }}
          exit={{ y: 100, opacity: 0, x: '-50%' }}
          style={{
            position: 'fixed',
            bottom: '80px',
            left: '50%',
            background: 'white',
            border: '1px solid #eee',
            borderRadius: '16px',
            padding: '12px 20px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            zIndex: 90,
            width: 'max-content',
            maxWidth: '90vw',
            overflowX: 'auto',
          }}
        >
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {compareList.map(p => (
              <div key={p.id} style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px', background: '#F9F8F5', padding: '6px 10px 6px 6px', borderRadius: '8px', border: '1px solid #eee' }}>
                <img 
                  src={p.image} 
                  alt={p.name} 
                  style={{ width: '32px', height: '32px', borderRadius: '4px', objectFit: 'cover', background: p.bgColor }} 
                  onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&q=80'; }}
                />
                <span style={{ fontSize: '12px', fontWeight: 600, color: '#0A192F', maxWidth: '80px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.name}</span>
                <button
                  onClick={() => removeFromCompare(p.id)}
                  style={{ background: 'none', border: 'none', padding: '0', cursor: 'pointer', display: 'flex', color: '#9CA3AF' }}
                  title="Remove from comparison"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>

          <div style={{ width: '1px', height: '32px', background: '#eee' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/compare" className="btn-primary" style={{ padding: '10px 24px', fontSize: '13px' }}>Compare Now</Link>
            <button onClick={clearCompare} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#6B7280', fontWeight: 500, fontFamily: 'Inter' }}>Clear All</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CompareBar;
