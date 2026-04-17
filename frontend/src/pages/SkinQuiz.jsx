import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import SEOHead from '../components/SEOHead';
import { ArrowLeft, CheckCircle, Droplets, Sun, Wind, Activity, Plus } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: "What's your skin type?",
    options: [
      { id: 'Oily', label: 'Oily', icon: <Droplets size={24} /> },
      { id: 'Dry', label: 'Dry', icon: <Sun size={24} /> },
      { id: 'Combination', label: 'Combination', icon: <Activity size={24} /> },
      { id: 'Normal', label: 'Normal', icon: <CheckCircle size={24} /> },
      { id: 'Sensitive', label: 'Sensitive', icon: <Wind size={24} /> }
    ]
  },
  {
    id: 2,
    title: "What's your main concern?",
    options: [
      { id: 'Acne & Breakouts', label: 'Acne & Breakouts' },
      { id: 'Dryness & Flaking', label: 'Dryness & Flaking' },
      { id: 'Uneven Tone', label: 'Uneven Tone' },
      { id: 'Sensitivity & Redness', label: 'Sensitivity & Redness' },
      { id: 'Anti-aging', label: 'Anti-aging' }
    ]
  },
  {
    id: 3,
    title: "How would you describe your routine?",
    options: [
      { id: 'Simple', label: 'Simple (1–2 steps)' },
      { id: 'Moderate', label: 'Moderate (3–4 steps)' },
      { id: 'Detailed', label: 'Detailed (5+ steps)' }
    ]
  }
];

const SkinQuiz = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState({ 1: null, 2: null, 3: null });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleSelect = (stepId, optionId) => {
    setAnswers(prev => ({ ...prev, [stepId]: optionId }));
    if (stepId < 3) {
      setTimeout(() => setCurrentStep(stepId + 1), 300);
    } else {
      setLoading(true);
      setTimeout(() => {
        calculateResults();
        setLoading(false);
      }, 1500);
    }
  };

  const calculateResults = () => {
    // Generate recommendation paragraph based on combination
    let text = `Based on your ${answers[1].toLowerCase()} skin and concern with ${answers[2].toLowerCase()}, we've curated a ${answers[3].toLowerCase()} routine tailored for you. `;
    
    let recommendedProducts = [];
    if (answers[1] === 'Oily' || answers[2] === 'Acne & Breakouts') {
      recommendedProducts.push(products.find(p => p.id === '1') || products[0]); // Oil Balance
      text += "Managing excess sebum without stripping the skin's barrier is key.";
    } else if (answers[1] === 'Dry' || answers[2] === 'Dryness & Flaking') {
      recommendedProducts.push(products.find(p => p.id === '2') || products[1]); // HydraGlow
      text += "Deep hydration and moisture retention are the primary focus of these selections.";
    } else {
      recommendedProducts.push(products.find(p => p.id === '3') || products[2]); // Calm Barrier
      text += "We highly prioritize maintaining your skin barrier and soothing sensitivity.";
    }

    if (answers[3] === 'Detailed') {
      if (!recommendedProducts.find(p => p.id === '2')) recommendedProducts.push(products[1]);
      if (!recommendedProducts.find(p => p.id === '3')) recommendedProducts.push(products[2]);
    } else if (answers[3] === 'Moderate') {
      if (!recommendedProducts.find(p => p.id === '1') && answers[1] !== 'Dry') recommendedProducts.push(products[0]);
    }
    
    // Ensure unique items
    recommendedProducts = [...new Set(recommendedProducts)].slice(0, 3);
    setResults({ text, products: recommendedProducts });
  };

  if (results) {
    return (
      <div style={{ padding: '80px 20px', background: '#FDFBF7', minHeight: '80vh' }}>
        <SEOHead title="Your Custom Routine | Velcura" />
        <div className="container" style={{ maxWidth: '900px' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '36px', color: '#0A192F', marginBottom: '16px' }}>Your Velcura Routine</h1>
            <p style={{ fontSize: '16px', color: '#6B7280', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>{results.text}</p>
          </motion.div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            {results.products.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '60px' }}>
            <button onClick={() => { setResults(null); setCurrentStep(1); setAnswers({1:null, 2:null, 3:null}); }} style={{ background: 'none', border: '1px solid #ddd', padding: '12px 32px', borderRadius: '999px', fontSize: '14px', cursor: 'pointer', fontFamily: 'Inter' }}>
              Retake Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '80px 20px', background: '#FDFBF7', minHeight: '80vh', display: 'flex', flexDirection: 'column' }}>
      <SEOHead title="Skin Quiz | Velcura" />
      <div className="container" style={{ maxWidth: '600px', flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
        
        {loading ? (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <style>{`@keyframes pulseDot { 0%, 100% { opacity: 0.2; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } }`}</style>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C9A24A', animation: 'pulseDot 1.4s infinite ease-in-out' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C9A24A', animation: 'pulseDot 1.4s infinite ease-in-out', animationDelay: '0.2s' }}></div>
              <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#C9A24A', animation: 'pulseDot 1.4s infinite ease-in-out', animationDelay: '0.4s' }}></div>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', color: '#0A192F' }}>Finding your perfect products...</h2>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              {currentStep > 1 ? (
                <button onClick={() => setCurrentStep(c => c - 1)} style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer', fontSize: '14px', color: '#6B7280' }}>
                  <ArrowLeft size={16} /> Back
                </button>
              ) : <div />}
              <span style={{ fontSize: '12px', fontWeight: 600, color: '#9CA3AF', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Step {currentStep} of 3</span>
            </div>

            <div style={{ height: '4px', background: '#eee', borderRadius: '2px', marginBottom: '40px', overflow: 'hidden' }}>
              <div style={{ height: '100%', background: '#C9A24A', width: `${(currentStep / 3) * 100}%`, transition: 'width 0.3s ease' }}></div>
            </div>

            <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                {steps.map(step => step.id === currentStep && (
                  <motion.div
                    key={step.id}
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -100, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  >
                    <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '32px', color: '#0A192F', marginBottom: '32px', textAlign: 'center' }}>
                      {step.title}
                    </h2>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: step.options[0].icon ? 'repeat(auto-fit, minmax(140px, 1fr))' : '1fr', gap: '16px' }}>
                      {step.options.map(opt => (
                        <button
                          key={opt.id}
                          onClick={() => handleSelect(step.id, opt.id)}
                          style={{
                            background: 'white',
                            border: `2px solid ${answers[step.id] === opt.id ? '#0A192F' : '#eee'}`,
                            borderRadius: '16px',
                            padding: '24px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '12px',
                            transition: 'all 0.2s',
                          }}
                        >
                          {opt.icon && <div style={{ color: answers[step.id] === opt.id ? '#C9A24A' : '#9CA3AF' }}>{opt.icon}</div>}
                          <span style={{ fontSize: '16px', fontWeight: answers[step.id] === opt.id ? 600 : 500, color: '#0A192F' }}>{opt.label}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SkinQuiz;
