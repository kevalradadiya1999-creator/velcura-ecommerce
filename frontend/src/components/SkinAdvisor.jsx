import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, ShoppingBag, MessageSquare, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';

// ─── Skin Diagnosis Engine ───────────────────────────────────────────────────

const SKIN_RULES = {
  oily: {
    signals: [
      'oily', 'greasy', 'shiny', 'acne', 'pimple', 'breakout', 'pore', 'clog',
      'blackhead', 'whitehead', 'acne prone', 't-zone', 'oily zone', 'excess oil',
      'sebum', 'open pores', 'oiliness', 'oily face', 'oily skin'
    ],
    product: 'oil-balance',
    productName: 'Velcura Oil Balance Wipes',
    skinLabel: 'oily',
    diagnosis:
      "It sounds like your skin is **oily**. This happens when your skin produces excess oil (sebum), which can clog pores and cause pimples or a shiny appearance.",
    recommendation:
      "I recommend **Velcura Oil Balance Wipes** — they contain 4% Niacinamide and Zinc PCA that actively control oil production, reduce breakouts, and clean out pores while removing makeup gently.",
  },
  dry: {
    signals: [
      'dry', 'tight', 'tightness', 'flake', 'flaky', 'rough', 'dull', 'stretched',
      'dehydrated', 'parched', 'cracked', 'peeling', 'lack moisture', 'no moisture',
      'not hydrated', 'dryness', 'dry skin', 'moisture'
    ],
    product: 'hydraglow',
    productName: 'Velcura HydraGlow Wipes',
    skinLabel: 'dry',
    diagnosis:
      "This sounds like **dry skin**. Dry skin lacks moisture, which causes that tight, rough, or flaky feeling — especially after cleansing.",
    recommendation:
      "I recommend **Velcura HydraGlow Wipes** — they use 1.0% Hyaluronic Acid and Sweet Almond Oil to deeply hydrate your skin as you remove makeup. You'll feel soft and nourished, never dry or tight.",
  },
  sensitive: {
    signals: [
      'sensitive', 'red', 'redness', 'irritat', 'burn', 'sting', 'react', 'rash',
      'allerg', 'inflam', 'flush', 'itchy', 'itch', 'fragrance', 'breakout reaction',
      'product reaction', 'sensitive skin', 'easily irritated', 'skin reacts'
    ],
    product: 'calm-skin',
    productName: 'Velcura Calm Barrier Wipes',
    skinLabel: 'sensitive',
    diagnosis:
      "Your skin sounds **sensitive**. Sensitive skin has a weaker barrier, which means it reacts easily to products, weather changes, or friction — causing redness, burning, or stinging.",
    recommendation:
      "I recommend **Velcura Calm Barrier Wipes** — they're built on Ceramide NP+AP+EOP (1.2%) and Allantoin to repair your skin's lipid barrier, calm redness, and cleanse without any irritation. Fragrance-free.",
  },
};

const COMBO_SIGNALS = ['combination', 'combo', 'both', 'oily and dry', 'dry and oily', 'some areas'];
const MAKEUP_SIGNALS = ['makeup', 'mascara', 'foundation', 'lipstick', 'waterproof', 'eyeliner', 'remov'];

const QUESTIONS = [
  "Does your skin feel oily or greasy during the day?",
  "Does it feel tight or dry after washing?",
  "Do you experience redness, stinging, or irritation from products?",
];

const QUICK_CHIPS = [
  { label: "My face gets oily", text: "My face gets oily and shiny during the day" },
  { label: "Skin feels tight", text: "My skin feels tight and dry after washing" },
  { label: "I get redness", text: "My skin gets red and irritated easily" },
  { label: "I get pimples", text: "I get pimples and acne frequently" },
  { label: "Not sure 🤔", text: "I'm not sure what skin type I have" },
];

function analyze(text) {
  const lower = text.toLowerCase();

  // Combination skin check first
  const isCombo = COMBO_SIGNALS.some(s => lower.includes(s));
  if (isCombo) {
    const hasOily = SKIN_RULES.oily.signals.some(s => lower.includes(s));
    const hasDry = SKIN_RULES.dry.signals.some(s => lower.includes(s));
    if (hasOily || hasDry) {
      const primary = hasOily ? SKIN_RULES.oily : SKIN_RULES.dry;
      return {
        type: 'combo',
        primary,
        text:
          "You may have **combination skin** — where some areas (like the T-zone) are oily while others feel dry. The best approach is to focus on your main concern.",
      };
    }
  }

  // Makeup removal question
  const isMakeup = MAKEUP_SIGNALS.some(s => lower.includes(s));
  if (isMakeup && !Object.keys(SKIN_RULES).some(k =>
    SKIN_RULES[k].signals.some(s => lower.includes(s))
  )) {
    return { type: 'makeup' };
  }

  // Score each skin type
  const scores = {};
  for (const [key, rule] of Object.entries(SKIN_RULES)) {
    scores[key] = rule.signals.filter(s => lower.includes(s)).length;
  }

  const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0];
  if (best[1] > 0) {
    return { type: 'match', rule: SKIN_RULES[best[0]] };
  }

  // "I don't know" type responses
  const unclear = /(don.?t know|not sure|unclear|what|which|help me|tell me|identify|find out)/.test(lower);
  if (unclear) return { type: 'quiz' };

  return { type: 'fallback' };
}

function buildResponse(result, messageHistory) {
  if (result.type === 'match') {
    const { rule } = result;
    return {
      content: `${rule.diagnosis}\n\n${rule.recommendation}\n\nWould you like help choosing or placing your order?`,
      action: { skinType: rule.skinLabel, productSlug: rule.product, productName: rule.productName },
    };
  }

  if (result.type === 'combo') {
    const { primary, text } = result;
    return {
      content: `${text}\n\nBased on your primary concern, I'd recommend **${primary.productName}**.\n\n${primary.recommendation}\n\nWould you like help choosing or placing your order?`,
      action: { skinType: primary.skinLabel, productSlug: primary.product, productName: primary.productName },
    };
  }

  if (result.type === 'makeup') {
    return {
      content:
        "Great — you need a wipe that removes makeup *and* suits your skin type.\n\nCould you tell me: does your skin feel oily, dry, or sensitive after cleansing?",
      action: null,
      chips: [
        { label: 'Oily after cleansing', text: 'My skin feels oily after cleansing' },
        { label: 'Dry/tight after cleansing', text: 'My skin feels dry and tight after cleansing' },
        { label: 'Red/irritated after cleansing', text: 'My skin gets red or irritated after cleansing' },
      ],
    };
  }

  if (result.type === 'quiz') {
    // Check if we've already asked a question
    const askedCount = messageHistory.filter(m => m.isQuestion).length;
    if (askedCount < QUESTIONS.length) {
      return {
        content: `No problem — let me help you find out! 😊\n\n${QUESTIONS[askedCount]}`,
        action: null,
        isQuestion: true,
        chips: [
          { label: 'Yes', text: 'Yes' },
          { label: 'No', text: 'No' },
          { label: 'Sometimes', text: 'Sometimes' },
        ],
      };
    }
  }

  return {
    content:
      "I can help you figure out which Velcura wipe is right for your skin. Can you describe how your skin feels during the day — or share any concerns like oiliness, dryness, or sensitivity?",
    action: null,
    chips: QUICK_CHIPS,
  };
}

// ─── Component ───────────────────────────────────────────────────────────────

const SkinAdvisor = () => {
  const { addItem } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm your Velcura Skin Advisor. 👋\n\nTell me about your skin — or if you're not sure of your skin type, I'll ask a couple of quick questions to identify it.",
      chips: QUICK_CHIPS,
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (text) => {
    const userText = (text || input).trim();
    if (!userText) return;
    setInput('');

    const userMsg = { role: 'user', content: userText };
    const nextMessages = [...messages, userMsg];
    setMessages(nextMessages);
    setLoading(true);

    setTimeout(() => {
      const result = analyze(userText);
      const response = buildResponse(result, nextMessages.filter(m => m.isQuestion));
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: response.content,
          action: response.action || null,
          chips: response.chips || null,
          isQuestion: response.isQuestion || false,
        },
      ]);
      setLoading(false);
    }, 600);
  };

  const renderContent = (content) => {
    // Bold **text** rendering
    const parts = content.split(/\*\*(.*?)\*\*/g);
    return parts.map((part, i) =>
      i % 2 === 1
        ? <strong key={i} style={{ color: '#0A192F', fontWeight: 700 }}>{part}</strong>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <>
      {/* Floating trigger */}
      {!isOpen && (
        <div className="fixed bottom-[80px] right-4 md:bottom-[108px] md:right-8 z-[9998] flex items-center justify-end gap-3">
          <div className="hidden sm:block bg-white px-3 py-2 md:px-4 md:py-2 rounded-xl text-[10px] md:text-[11px] font-semibold text-[#0A192F] shadow-[0_8px_24px_rgba(10,25,47,0.08)] tracking-wide border border-[rgba(201,162,74,0.2)]">
            Ask Skin Advisor
          </div>
          <button
            id="skin-advisor-btn"
            onClick={() => setIsOpen(true)}
            className="w-[48px] h-[48px] sm:w-[60px] sm:h-[60px]"
            style={{
              backgroundColor: '#0A192F',
              border: '1.5px solid var(--accent)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--accent)',
              boxShadow: '0 8px 24px rgba(10,25,47,0.2)',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            aria-label="Open Skin Advisor"
          >
            <Sparkles size={22} />
          </button>
        </div>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <div style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '380px',
          maxWidth: 'calc(100vw - 24px)',
          height: '580px',
          maxHeight: 'calc(100vh - 40px)',
          backgroundColor: '#F8F6F2',
          borderRadius: '20px',
          boxShadow: '0 16px 56px rgba(10,25,47,0.15)',
          zIndex: 10000,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          border: '1px solid rgba(201,162,74,0.25)',
          animation: 'slideUp 0.3s ease-out',
        }}>

          {/* Header */}
          <div style={{
            background: 'linear-gradient(135deg, #0A192F 0%, #0D2440 100%)',
            padding: '18px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                background: 'rgba(201,162,74,0.15)',
                border: '1px solid rgba(201,162,74,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Bot size={20} color="#C9A24A" />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 700, color: '#FDFBF7', fontFamily: "'Playfair Display', serif", letterSpacing: '0.02em' }}>
                  Velcura Skin Advisor
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ADE80' }} />
                  <span style={{ fontSize: '11px', color: 'rgba(253,251,247,0.6)' }}>AI-powered · Always available</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', color: 'rgba(253,251,247,0.6)', cursor: 'pointer', padding: '4px', borderRadius: '6px', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#FDFBF7'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(253,251,247,0.6)'}
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          {/* Disclaimer */}
          <div style={{ background: 'rgba(201,162,74,0.08)', padding: '8px 16px', borderBottom: '1px solid rgba(201,162,74,0.15)', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: '#8B6B3D', fontWeight: 500, letterSpacing: '0.03em' }}>
              General skincare guidance only · Not medical advice
            </span>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {messages.map((msg, idx) => (
              <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start', gap: '8px' }}>

                {/* Bubble */}
                <div style={{
                  maxWidth: '88%',
                  padding: '11px 15px',
                  borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '4px 16px 16px 16px',
                  backgroundColor: msg.role === 'user' ? '#0A192F' : 'white',
                  color: msg.role === 'user' ? '#FDFBF7' : '#0A192F',
                  fontSize: '13px',
                  lineHeight: '1.65',
                  boxShadow: msg.role === 'assistant' ? '0 2px 8px rgba(10,25,47,0.06)' : 'none',
                  border: msg.role === 'assistant' ? '1px solid rgba(10,25,47,0.07)' : 'none',
                  whiteSpace: 'pre-line',
                }}>
                  {msg.role === 'assistant' ? renderContent(msg.content) : msg.content}
                </div>

                {/* Quick chips */}
                {msg.chips && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', maxWidth: '90%' }}>
                    {msg.chips.map((chip, ci) => (
                      <button
                        key={ci}
                        onClick={() => handleSend(chip.text)}
                        style={{
                          padding: '6px 12px',
                          borderRadius: '20px',
                          border: '1px solid rgba(201,162,74,0.4)',
                          background: 'white',
                          fontSize: '11px',
                          fontWeight: 600,
                          color: '#0A192F',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          transition: 'all 0.2s',
                          fontFamily: 'Inter, sans-serif',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#0A192F'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#0A192F'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.color = '#0A192F'; e.currentTarget.style.borderColor = 'rgba(201,162,74,0.4)'; }}
                      >
                        <ChevronRight size={10} />
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}

                {/* Action buttons after recommendation */}
                {msg.action && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '90%' }}>
                    <button
                      onClick={() => {
                        const productObj = products.find(p =>
                          p.slug === msg.action.productSlug ||
                          p.fullName?.toLowerCase().includes(msg.action.productSlug) ||
                          p.name?.toLowerCase().includes(msg.action.productSlug)
                        );
                        if (productObj) { addItem(productObj); setIsOpen(false); }
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 18px',
                        background: 'linear-gradient(135deg, #0A192F 0%, #1a3a5c 100%)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: 'Inter, sans-serif',
                        transition: 'opacity 0.2s',
                        boxShadow: '0 4px 16px rgba(10,25,47,0.15)',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <ShoppingBag size={14} />
                      Add to Cart — {msg.action.productName.replace('Velcura ', '')}
                    </button>

                    <a
                      href={`https://wa.me/917863031769?text=${encodeURIComponent(`Hi Velcura, I have ${msg.action.skinType} skin. I'd like to order ${msg.action.productName}. Please help me place an order.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '11px 18px',
                        background: '#25D366',
                        color: 'white',
                        textDecoration: 'none',
                        borderRadius: '12px',
                        fontSize: '12px',
                        fontWeight: 700,
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        fontFamily: 'Inter, sans-serif',
                        boxShadow: '0 4px 16px rgba(37,211,102,0.25)',
                        transition: 'opacity 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.opacity = '0.88'}
                      onMouseLeave={e => e.currentTarget.style.opacity = '1'}
                    >
                      <MessageSquare size={14} />
                      Order on WhatsApp
                    </a>
                  </div>
                )}
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div style={{ display: 'flex', gap: '4px', padding: '11px 15px', backgroundColor: 'white', borderRadius: '4px 16px 16px 16px', width: 'fit-content', border: '1px solid rgba(10,25,47,0.07)', boxShadow: '0 2px 8px rgba(10,25,47,0.06)' }}>
                {[0, 0.2, 0.4].map((delay, i) => (
                  <div key={i} style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#C9A24A', animation: `bounce 1.2s infinite ease-in-out both`, animationDelay: `${delay}s` }} />
                ))}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div style={{ padding: '14px 16px', backgroundColor: 'white', borderTop: '1px solid rgba(10,25,47,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#F8F6F2', borderRadius: '14px', padding: '6px 8px', border: '1px solid rgba(10,25,47,0.1)' }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Describe your skin concern…"
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  padding: '7px 6px',
                  fontSize: '13px',
                  fontFamily: 'Inter, sans-serif',
                  color: '#0A192F',
                }}
              />
              <button
                onClick={() => handleSend()}
                disabled={!input.trim()}
                style={{
                  background: input.trim() ? '#0A192F' : 'rgba(10,25,47,0.08)',
                  border: 'none',
                  borderRadius: '10px',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: input.trim() ? 'white' : 'rgba(10,25,47,0.3)',
                  cursor: input.trim() ? 'pointer' : 'default',
                  transition: 'background 0.2s',
                  flexShrink: 0,
                }}
              >
                <Send size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(24px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeUp {
          from { transform: translateY(8px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0.4); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
};

export default SkinAdvisor;
