import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function AuthPage({ loginUser }) {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      loginUser({ email, id: Date.now().toString(), onboarding_complete: false });
      setLoading(false);
      navigate('/onboarding');
    }, 500);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--surface)' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2rem' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', marginBottom: 'auto' }}>
          <ArrowLeft size={20} /> Back home
        </Link>
        
        <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', marginBottom: 'auto' }}>
          <div className="card animate-fade-in">
            <h2 className="heading-lg" style={{ fontSize: '1.5rem', marginBottom: '1.5rem', textAlign: 'center' }}>
              {isLogin ? 'Welcome back' : 'Create your account'}
            </h2>
            
            <form onSubmit={handleAuth}>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <button type="submit" className="btn btn-primary w-full" disabled={loading} style={{ justifyContent: 'center' }}>
                {loading ? <div className="spinner" style={{ width: '20px', height: '20px', borderWidth: '2px' }}></div> : (isLogin ? 'Sign In' : 'Sign Up')}
              </button>
            </form>
            
            <div style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button 
                onClick={() => setIsLogin(!isLogin)} 
                style={{ color: 'var(--primary)', fontWeight: '600' }}
              >
                {isLogin ? 'Sign up' : 'Log in'}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div style={{ flex: 1, backgroundColor: 'var(--primary)', display: 'none', alignItems: 'center', justifyContent: 'center', padding: '4rem', color: 'white' }}>
        <div style={{ maxWidth: '400px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Never write a cold email again.</h2>
          <p style={{ opacity: 0.9, fontSize: '1.125rem' }}>ClientAI analyzes your profile and builds an entire outreach campaign targeted at your ideal clients.</p>
        </div>
      </div>
    </div>
  );
}
