import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          textAlign: 'center',
          background: '#FDFBF7',
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>⚠️</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '28px',
            color: '#0A192F',
            marginBottom: '12px',
          }}>
            Something went wrong
          </h2>
          <p style={{ color: '#6B7280', marginBottom: '24px', maxWidth: '400px', lineHeight: '1.6' }}>
            We ran into an unexpected issue. Don't worry — your cart is saved. Please refresh the page to continue.
          </p>
          <button
            onClick={() => window.location.reload()}
            style={{
              background: '#0A192F',
              color: '#FDFBF7',
              border: 'none',
              padding: '12px 28px',
              borderRadius: '4px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            Reload Page
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
