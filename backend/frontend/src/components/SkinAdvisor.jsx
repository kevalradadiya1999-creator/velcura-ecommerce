import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, MessageSquare } from 'lucide-react';

const SkinAdvisor = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I am your Velcura Skin Advisor. Tell me a bit about your skin concerns, and I will find your perfect match.' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (text) => {
    const lower = text.toLowerCase();
    let skinType = '';
    let product = '';
    let explanation = '';

    if (/(oily|acne|clogged|pore)/.test(lower)) {
      skinType = 'oily';
      product = 'Velcura Oil Balance Wipes';
      explanation = 'Niacinamide + Zinc controls oil and reduces breakouts.';
    } else if (/(dry|tight|flake|dull)/.test(lower)) {
      skinType = 'dry';
      product = 'Velcura HydraGlow Wipes';
      explanation = 'Hyaluronic Acid + Vitamin E deeply hydrates and restores glow.';
    } else if (/(sensitive|red|irritat|burn)/.test(lower)) {
      skinType = 'sensitive';
      product = 'Velcura Calm Skin Wipes';
      explanation = 'Ceramides + Aloe Vera soothe and repair skin barrier.';
    }

    if (skinType) {
      return {
        content: `Your skin sounds ${skinType}. ${product} would be ideal — they hydrate deeply and leave your skin soft. ${explanation} Would you like help choosing or placing your order?`,
        action: { skinType, product }
      };
    }

    return {
      content: "I can help you find the perfect clinical wipe based on your current concerns. Is your skin feeling mostly oily, dry, or sensitive today?",
      action: null
    };
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userText = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setInput('');
    setLoading(true);

    setTimeout(() => {
      const response = generateResponse(userText);
      setMessages(prev => [...prev, { role: 'assistant', content: response.content, action: response.action }]);
      setLoading(false);
    }, 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: '150px', right: '32px', zIndex: 9998, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
        {!isOpen && (
          <div style={{ background: 'white', padding: '6px 14px', borderRadius: '12px', fontSize: '11px', fontWeight: 600, color: '#0A192F', boxShadow: '0 4px 12px rgba(10,25,47,0.08)', letterSpacing: '0.05em', animation: 'slideUp 0.3s ease-out' }}>
            Ask Skin Advisor
          </div>
        )}
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#0A192F',
              border: '1.5px solid var(--accent)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              boxShadow: '0 8px 24px rgba(10, 25, 47, 0.2)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <Sparkles size={28} />
          </button>
        )}
      </div>

      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          width: '380px',
          maxWidth: 'calc(100vw - 32px)',
          height: '560px',
          maxHeight: 'calc(100vh - 64px)',
          backgroundColor: '#FDFBF7',
          borderRadius: '12px',
          boxShadow: '0 12px 48px rgba(10,25,47,0.12)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(201,162,74,0.3)',
          animation: 'slideUp 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{ backgroundColor: '#0A192F', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#FDFBF7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'rgba(201,162,74,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Bot size={20} color="var(--accent)" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600, fontFamily: "'Playfair Display', serif" }}>Velcura Skin Advisor</h3>
                <p style={{ margin: 0, fontSize: '11px', color: 'rgba(253,251,247,0.7)' }}>AI Skincare Assistant</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#FDFBF7', cursor: 'pointer', opacity: 0.7, padding: '4px' }} onMouseEnter={e => e.currentTarget.style.opacity = 1} onMouseLeave={e => e.currentTarget.style.opacity = 0.7}>
              <X size={20} />
            </button>
          </div>

          {/* Chat Body */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ textAlign: 'center', marginBottom: '8px' }}>
               <span style={{ fontSize: '10px', color: 'var(--text-subtle)', background: 'rgba(10,25,47,0.05)', padding: '4px 10px', borderRadius: '12px' }}>
                 This is general skincare guidance, not medical advice.
               </span>
            </div>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '85%',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  backgroundColor: msg.role === 'user' ? '#0A192F' : 'white',
                  color: msg.role === 'user' ? 'white' : '#0A192F',
                  border: msg.role === 'assistant' ? '1px solid rgba(10,25,47,0.08)' : 'none',
                  fontSize: '13px',
                  lineHeight: '1.5',
                  borderBottomRightRadius: msg.role === 'user' ? '4px' : '12px',
                  borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '12px',
                }}>
                  {msg.content}
                </div>
                {msg.action && (
                  <a
                    href={`https://wa.me/917863031769?text=${encodeURIComponent(`Hi Velcura, I have ${msg.action.skinType} skin and want ${msg.action.product} wipes.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: '8px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '10px 16px',
                      backgroundColor: '#25D366',
                      color: 'white',
                      textDecoration: 'none',
                      borderRadius: '12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(37, 211, 102, 0.2)'
                    }}
                  >
                    <MessageSquare size={14} /> Continue on WhatsApp
                  </a>
                )}
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: '4px', padding: '12px 16px', backgroundColor: 'white', borderRadius: '12px', borderBottomLeftRadius: '4px', width: 'fit-content', border: '1px solid rgba(10,25,47,0.08)' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-subtle)', animation: 'bounce 1.4s infinite ease-in-out both' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-subtle)', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.2s' }} />
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--text-subtle)', animation: 'bounce 1.4s infinite ease-in-out both', animationDelay: '0.4s' }} />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div style={{ padding: '16px', backgroundColor: 'white', borderTop: '1px solid rgba(10,25,47,0.08)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#FDFBF7', borderRadius: '12px', padding: '4px 8px', border: '1px solid rgba(10,25,47,0.1)' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Describe your skin..."
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  padding: '8px 4px',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#0A192F'
                }}
              />
              <button 
                onClick={handleSend}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? '#0A192F' : 'rgba(10,25,47,0.1)',
                  border: 'none',
                  borderRadius: '8px',
                  width: '32px',
                  height: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: input.trim() ? 'white' : 'var(--text-subtle)',
                  cursor: input.trim() ? 'pointer' : 'default',
                  transition: 'background 0.2s'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default SkinAdvisor;
