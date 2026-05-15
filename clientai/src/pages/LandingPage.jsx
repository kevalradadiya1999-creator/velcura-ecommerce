import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="landing-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <header style={{ padding: '1.5rem', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontWeight: '800', fontSize: '1.5rem', color: 'var(--text-main)' }}>ClientAI</div>
        <Link to="/auth" className="btn btn-secondary">Login</Link>
      </header>

      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 1.5rem' }}>
        <div className="container" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <div className="animate-fade-in">
            <h1 className="heading-xl" style={{ marginBottom: '1.5rem' }}>
              Your next client is <span style={{ color: 'var(--primary)' }}>one email away.</span>
            </h1>
            <p className="text-xl" style={{ marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
              ClientAI writes your entire outreach campaign in 60 seconds — leads, emails, DMs, follow-ups — so you can focus on the work you love.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', textAlign: 'left', maxWidth: '500px', margin: '0 auto 3rem', backgroundColor: 'var(--surface)', padding: '2rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CheckCircle size={24} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                <span className="text-lg"><strong>Stuck staring at a blank email?</strong> We write it for you.</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CheckCircle size={24} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                <span className="text-lg"><strong>Wasting hours on LinkedIn with nothing to show?</strong> We find the right people.</span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <CheckCircle size={24} color="var(--primary)" style={{ flexShrink: 0, marginTop: '0.25rem' }} />
                <span className="text-lg"><strong>Getting ghosted?</strong> Our follow-up sequences keep you top of mind.</span>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <Link to="/auth" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.25rem' }}>
                Get my first campaign free <ArrowRight size={20} />
              </Link>
            </div>
            
            <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', fontWeight: '500' }}>
              Join 847 freelancers who got their last client without cold calling
            </p>
          </div>
        </div>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border)', color: 'var(--text-muted)' }}>
        <p>ClientAI — built for freelancers who hate selling.</p>
      </footer>
    </div>
  );
}
