import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

export default function OnboardingPage({ completeOnboarding }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    skill: '',
    best_result: '',
    ideal_client: '',
    pricing: '',
    portfolio_url: ''
  });

  const totalSteps = 5;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      completeOnboarding(formData);
      setLoading(false);
      navigate('/dashboard');
    }, 500);
  };

  const questions = [
    { name: 'skill', label: 'What is your exact skill in one sentence?', placeholder: 'e.g., I write converting email copy for B2B SaaS companies.' },
    { name: 'best_result', label: 'What is the best result you have gotten for a client?', placeholder: 'e.g., Increased open rates by 45% and generated 20 meetings in one month.' },
    { name: 'ideal_client', label: 'Describe your ideal client — industry, size, problem they hire you to solve.', placeholder: 'e.g., Series A B2B SaaS companies struggling with outbound sales.' },
    { name: 'pricing', label: 'What do you charge? (project or monthly rate)', placeholder: 'e.g., $2,500/month or $5,000 per project' },
    { name: 'portfolio_url', label: 'Your portfolio or LinkedIn URL', placeholder: 'e.g., https://linkedin.com/in/yourprofile' }
  ];

  const currentQ = questions[step - 1];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--surface)', padding: '2rem' }}>
      <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto', marginTop: '4rem' }}>
        
        <div style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>
            <span>Question {step} of {totalSteps}</span>
            <span>{Math.round((step / totalSteps) * 100)}% Complete</span>
          </div>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
          </div>
        </div>

        <div className="card animate-fade-in" key={step}>
          <h2 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{currentQ.label}</h2>
          
          <div className="form-group">
            {step === 3 || step === 2 ? (
              <textarea 
                name={currentQ.name}
                value={formData[currentQ.name]}
                onChange={handleChange}
                placeholder={currentQ.placeholder}
                className="form-textarea"
                rows="4"
                autoFocus
              ></textarea>
            ) : (
              <input 
                type="text"
                name={currentQ.name}
                value={formData[currentQ.name]}
                onChange={handleChange}
                placeholder={currentQ.placeholder}
                className="form-input"
                autoFocus
              />
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
            {step > 1 ? (
              <button className="btn btn-secondary" onClick={() => setStep(step - 1)}>Back</button>
            ) : (
              <div></div>
            )}
            
            <button 
              className="btn btn-primary" 
              onClick={handleNext} 
              disabled={loading || !formData[currentQ.name].trim()}
            >
              {loading ? (
                <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div>
              ) : step === totalSteps ? (
                <>Generate my campaign <Check size={20} /></>
              ) : (
                <>Next <ArrowRight size={20} /></>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
