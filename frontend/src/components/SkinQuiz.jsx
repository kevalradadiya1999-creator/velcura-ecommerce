import { useState } from 'react';
import { ChevronRight, Droplets, Wind, Focus, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

const SkinQuiz = () => {
  const [step, setStep] = useState(0);
  const { addItem } = useCart();
  
  const questions = [
    {
      question: "How does your skin feel 30 minutes after washing?",
      options: [
        { label: "Tight, dry, or pulling", points: { dry: 2, sensitive: 1, oily: 0 } },
        { label: "Shiny, greasy, or oily", points: { dry: 0, sensitive: 0, oily: 2 } },
        { label: "Red, irritated, or normal", points: { dry: 0, sensitive: 2, oily: 0 } }
      ]
    },
    {
      question: "What is your primary skincare concern?",
      options: [
        { label: "Large pores & breakouts", points: { dry: 0, sensitive: 0, oily: 2 } },
        { label: "Flakiness & dullness", points: { dry: 2, sensitive: 0, oily: 0 } },
        { label: "Redness & damaged barrier", points: { dry: 0, sensitive: 2, oily: 0 } }
      ]
    },
    {
      question: "How often do you wear heavy or waterproof makeup?",
      options: [
        { label: "Daily - I need serious removal", points: { dry: 1, sensitive: 0, oily: 1 } },
        { label: "Sometimes - Light to medium coverage", points: { dry: 0, sensitive: 0, oily: 0 } },
        { label: "Rarely - Mostly sunscreen", points: { dry: 0, sensitive: 1, oily: 0 } }
      ]
    },
    {
      question: "Do fragrances in products bother your skin?",
      options: [
        { label: "Yes, I break out or get red", points: { dry: 0, sensitive: 3, oily: 0 } },
        { label: "No, my skin is pretty resilient", points: { dry: 0, sensitive: 0, oily: 0 } }
      ]
    }
  ];

  const [scores, setScores] = useState({ dry: 0, oily: 0, sensitive: 0 });

  const handleAnswer = (points) => {
    const newScores = {
      dry: scores.dry + points.dry,
      oily: scores.oily + points.oily,
      sensitive: scores.sensitive + points.sensitive
    };
    setScores(newScores);
    setStep(step + 1);
  };

  const getRecommendation = () => {
    let highest = 'dry';
    if (scores.oily > scores.dry && scores.oily > scores.sensitive) highest = 'oily';
    if (scores.sensitive > scores.dry && scores.sensitive > scores.oily) highest = 'sensitive';
    
    // Map to product
    if (highest === 'oily') return products.find(p => p.id === 'oil-balance');
    if (highest === 'dry') return products.find(p => p.id === 'hydraglow');
    return products.find(p => p.id === 'calm-skin');
  };

  if (step >= questions.length) {
    const rec = getRecommendation();
    return (
      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '40px', textAlign: 'center' }}>
        <CheckCircle2 size={48} color="var(--accent)" style={{ margin: '0 auto 16px' }} />
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', marginBottom: '8px' }}>Your Perfect Match</h3>
        <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>Based on your answers, we highly recommend:</p>
        
        <div style={{ background: rec.bgColor, padding: '24px', borderRadius: '12px', marginBottom: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <p style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '8px' }}>{rec.skinType}</p>
          <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '24px', marginBottom: '8px' }}>{rec.name} Wipes</h4>
          <p style={{ fontSize: '14px', color: 'var(--text-muted)', maxWidth: '300px', marginBottom: '16px' }}>{rec.mechanismLine}</p>
          <button 
            className="btn-primary" 
            onClick={() => addItem(rec)}
            style={{ padding: '12px 24px', fontSize: '13px' }}
          >
            Add {rec.name} to Cart - ₹599
          </button>
        </div>
        
        <button 
          onClick={() => { setStep(0); setScores({ dry: 0, oily: 0, sensitive: 0 }) }}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', fontSize: '12px', textDecoration: 'underline', cursor: 'pointer' }}
        >
          Retake Quiz
        </button>
      </div>
    );
  }

  const currentQ = questions[step];

  return (
    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '12px', padding: '40px', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <span style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Question {step + 1} of {questions.length}
        </span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {questions.map((_, i) => (
            <div key={i} style={{ height: '4px', width: '24px', background: i <= step ? 'var(--accent)' : 'var(--border)', borderRadius: '2px' }} />
          ))}
        </div>
      </div>
      
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', color: 'var(--text)', marginBottom: '32px', lineHeight: 1.3 }}>
        {currentQ.question}
      </h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => handleAnswer(opt.points)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              padding: '20px 24px',
              background: 'rgba(253,251,247,0.5)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              cursor: 'pointer',
              textAlign: 'left',
              fontSize: '15px',
              color: 'var(--text)',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'var(--accent)';
              e.currentTarget.style.background = 'rgba(201,162,74,0.02)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.background = 'rgba(253,251,247,0.5)';
            }}
          >
            <span>{opt.label}</span>
            <ChevronRight size={18} color="var(--text-muted)" />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkinQuiz;
