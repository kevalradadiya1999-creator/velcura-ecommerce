import { useEffect, useState } from 'react';
import { Shield, CheckCircle2, Globe, Send, Anchor, Award, Search, Ship, FileText } from 'lucide-react';

const Export = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    company: '',
    country: '',
    markets: '',
    quantity: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate submission
    setSubmitted(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const markets = [
    { region: 'United States', reason: 'Largest premium beauty wipes market', flags: ['us'] },
    { region: 'UK, Germany & France', reason: 'Strong EU demand for clean & clinical products', flags: ['gb', 'de', 'fr'] },
    { region: 'UAE & GCC', reason: 'Luxury beauty boom + premium imports', flags: ['ae', 'sa', 'qa'] },
    { region: 'Australia', reason: 'Fast-growing clean beauty market', flags: ['au'] },
    { region: 'South Korea & Japan', reason: 'K-beauty & J-beauty influence on premium wipes', flags: ['kr', 'jp'] },
  ];

  const compliance = [
    'FDA MoCRA Compliant (US)',
    'EU Cosmetics Regulation Compliant',
    'GCC/ESMA Standards',
    'Full Stability & Microbial Testing',
    'Free Sale Certificate Available'
  ];

  return (
    <div className="animate-fade-in pb-12 lg:pb-24">
      
      {/* ─── Hero Section ─── */}
      <section className="velcura-container pt-12 pb-8 lg:pt-20 lg:pb-12 text-center">
        <div className="flex items-center justify-center gap-4 mb-5">
          <div className="h-[1px] w-8 lg:w-16 bg-[#C9A24A]" />
          <span className="text-[10px] lg:text-[12px] tracking-[0.25em] uppercase text-[#C9A24A] font-semibold">Global Distribution</span>
          <div className="h-[1px] w-8 lg:w-16 bg-[#C9A24A]" />
        </div>
        
        <h1 className="font-playfair text-[32px] md:text-[46px] lg:text-[56px] leading-[1.1] text-[var(--text)] mb-6 tracking-[-0.02em] max-w-[900px] mx-auto font-semibold">
          Velcura – Export Ready <span className="text-[var(--accent)] italic">Premium Wipes</span>
        </h1>
        
        <p className="font-inter text-[15px] lg:text-[18px] text-[var(--text-muted)] max-w-[650px] mx-auto leading-relaxed">
          Made in India • Compliant for global markets • Premium skin-type specific formulas
        </p>
      </section>

      {/* ─── Compliance Section ─── */}
      <section className="velcura-container mb-12 lg:mb-20">
        <div className="bg-white rounded-[24px] p-8 md:p-12 lg:p-16 border border-[rgba(10,25,47,0.04)] shadow-[0_8px_32px_rgba(10,25,47,0.03)] text-center">
          <h2 className="font-playfair text-[24px] lg:text-[32px] font-semibold text-[var(--text)] mb-3">Export Compliance & Quality</h2>
          <p className="font-inter text-[14px] lg:text-[16px] text-[var(--text-muted)] mb-10">Manufactured to the highest clinical standards required for global entry.</p>
          
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 max-w-[1000px] mx-auto">
            {compliance.map((item, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3 lg:px-6 lg:py-4 rounded-xl border border-[rgba(201,162,74,0.2)] bg-[#FDFBF7]">
                <Shield size={18} className="text-[#C9A24A]" />
                <span className="font-inter text-[13px] lg:text-[14px] font-medium text-[var(--text)] tracking-wide">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Markets Section ─── */}
      <section className="velcura-container mb-12 lg:mb-20">
        <h2 className="font-playfair text-[24px] lg:text-[32px] font-semibold text-[var(--text)] mb-8 lg:mb-12 text-center">High-Demand Markets We Serve</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {markets.map((m, i) => (
            <div key={i} className="p-8 lg:p-10 rounded-2xl bg-white border border-[rgba(201,162,74,0.15)] flex flex-col items-center text-center shadow-[0_4px_20px_rgba(10,25,47,0.02)] transition-transform hover:-translate-y-1 duration-300">
              <div className="flex items-center justify-center mb-5 h-12">
                <div className="flex -space-x-4">
                  {m.flags.map((code, idx) => (
                    <img 
                      key={code} 
                      src={`https://flagcdn.com/w80/${code}.png`} 
                      alt={code} 
                      className="w-12 h-12 lg:w-14 lg:h-14 rounded-full object-cover border-[3px] border-white shadow-sm relative transition-transform hover:scale-110 hover:z-50 duration-300" 
                      style={{ zIndex: m.flags.length - idx }}
                    />
                  ))}
                </div>
              </div>
              <h3 className="font-playfair text-[20px] lg:text-[22px] font-semibold mb-2 text-[var(--text)]">{m.region}</h3>
              <p className="font-inter text-[14px] lg:text-[15px] text-[var(--text-muted)] leading-relaxed">{m.reason}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── Why Export Section ─── */}
      <section className="velcura-container mb-12 lg:mb-20">
        <div className="bg-[#0A192F] text-white rounded-3xl p-10 lg:p-16 relative overflow-hidden shadow-[0_20px_40px_rgba(10,25,47,0.1)]">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(201,162,74,0.15)_0%,transparent_70%)] pointer-events-none" />
          
          <h2 className="font-playfair text-[26px] lg:text-[36px] font-semibold mb-10 lg:mb-12 text-center text-white">Why Export with Velcura</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 max-w-[1100px] mx-auto">
            <div className="flex flex-col items-center text-center">
              <FileText size={32} className="text-[#C9A24A] mb-4" />
              <span className="font-inter font-semibold text-[15px] lg:text-[16px] mb-2 text-white">Private Label Ready</span>
              <p className="font-inter text-[13px] lg:text-[14px] text-white/70">Customize packaging for your brand</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <CheckCircle2 size={32} className="text-[#C9A24A] mb-4" />
              <span className="font-inter font-semibold text-[15px] lg:text-[16px] mb-2 text-white">Custom Formulation</span>
              <p className="font-inter text-[13px] lg:text-[14px] text-white/70">Adapt specs for local regulations</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Ship size={32} className="text-[#C9A24A] mb-4" />
              <span className="font-inter font-semibold text-[15px] lg:text-[16px] mb-2 text-white">Fast Logistics</span>
              <p className="font-inter text-[13px] lg:text-[14px] text-white/70">7–14 day dispatch protocols</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <Award size={32} className="text-[#C9A24A] mb-4" />
              <span className="font-inter font-semibold text-[15px] lg:text-[16px] mb-2 text-white">B2B Tiered Pricing</span>
              <p className="font-inter text-[13px] lg:text-[14px] text-white/70">Optimized for maximum ROI</p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Inquiry Form Section ─── */}
      <section className="velcura-container" id="inquiry">
        <div className="max-w-[800px] mx-auto bg-white p-8 md:p-10 lg:p-14 rounded-3xl border border-[rgba(10,25,47,0.06)] shadow-[0_20px_60px_rgba(10,25,47,0.03)]">
          <div className="text-center mb-10">
            <h2 className="font-playfair text-[26px] lg:text-[34px] font-semibold text-[var(--text)] mb-3">B2B / Bulk Export Inquiry</h2>
            <p className="font-inter text-[15px] text-[var(--text-muted)]">Connect with our export team for pricing, compliance, and samples.</p>
          </div>

          {submitted ? (
            <div className="text-center py-12 lg:py-16 animate-fade-up">
              <div className="w-20 h-20 bg-[rgba(201,162,74,0.1)] rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={40} className="text-[#C9A24A]" />
              </div>
              <h3 className="font-playfair text-[28px] font-semibold mb-3">Inquiry Received</h3>
              <p className="font-inter text-[16px] text-[var(--text-muted)] mb-10">Our global specialists will contact you within 24 hours.</p>
              <button className="btn-primary px-8" onClick={() => setSubmitted(false)}>Submit Another Request</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5 lg:gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] lg:text-[12px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">Company / Brand Name *</label>
                  <input type="text" name="company" required onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[rgba(10,25,47,0.1)] focus:border-[#C9A24A] rounded-xl px-5 py-4 outline-none text-[15px] lg:text-[16px] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] lg:text-[12px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">Your Country *</label>
                  <input type="text" name="country" required onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[rgba(10,25,47,0.1)] focus:border-[#C9A24A] rounded-xl px-5 py-4 outline-none text-[15px] lg:text-[16px] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] lg:text-[12px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">Target Market(s) *</label>
                  <input type="text" name="markets" required onChange={handleChange} placeholder="e.g. UAE, UK" className="w-full bg-[#FDFBF7] border border-[rgba(10,25,47,0.1)] focus:border-[#C9A24A] rounded-xl px-5 py-4 outline-none text-[15px] lg:text-[16px] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] lg:text-[12px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">Estimated Quantity *</label>
                  <input type="text" name="quantity" required onChange={handleChange} placeholder="e.g. 5000 units" className="w-full bg-[#FDFBF7] border border-[rgba(10,25,47,0.1)] focus:border-[#C9A24A] rounded-xl px-5 py-4 outline-none text-[15px] lg:text-[16px] transition-colors" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] lg:text-[12px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">Email Address *</label>
                  <input type="email" name="email" required onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[rgba(10,25,47,0.1)] focus:border-[#C9A24A] rounded-xl px-5 py-4 outline-none text-[15px] lg:text-[16px] transition-colors" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[11px] lg:text-[12px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">Phone Number</label>
                  <input type="tel" name="phone" onChange={handleChange} placeholder="+CountryCode" className="w-full bg-[#FDFBF7] border border-[rgba(10,25,47,0.1)] focus:border-[#C9A24A] rounded-xl px-5 py-4 outline-none text-[15px] lg:text-[16px] transition-colors" />
                </div>
              </div>

              <div className="flex flex-col gap-2 mb-4">
                <label className="text-[11px] lg:text-[12px] font-semibold tracking-widest text-[var(--text-muted)] uppercase">Message / Requirements</label>
                <textarea name="message" rows="4" onChange={handleChange} className="w-full bg-[#FDFBF7] border border-[rgba(10,25,47,0.1)] focus:border-[#C9A24A] rounded-xl px-5 py-4 outline-none text-[15px] lg:text-[16px] resize-none transition-colors"></textarea>
              </div>

              <button type="submit" className="btn-primary w-full justify-center !py-4 lg:text-[13px] shadow-[0_8px_20px_rgba(10,25,47,0.15)]">
                Send Export Inquiry <Send size={18} />
              </button>
            </form>
          )}
        </div>
      </section>

    </div>
  );
};

export default Export;

