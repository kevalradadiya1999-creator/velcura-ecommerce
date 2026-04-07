import { useState } from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const AnnouncementBanner = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // In a real implementation this would ping an API endpoint
      setTimeout(() => setSubmitted(false), 5000);
      setEmail('');
    }
  };

  return (
    <div className="bg-[#0A192F] text-[#FDFBF7] py-2 px-4 w-full z-50 relative">
      <div className="max-w-[1200px] mx-auto flex items-center justify-center gap-3 sm:gap-6 flex-wrap">
        <span className="text-[11px] sm:text-[13px] font-semibold tracking-widest uppercase text-[#C9A24A] text-center">
          Launching Soon – Get Notified
        </span>
        
        {submitted ? (
          <div className="hidden sm:flex items-center gap-2 text-[12px] text-green-400 font-medium">
            <CheckCircle2 size={16} />
            <span>You're on the list!</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="hidden sm:flex items-center">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="bg-transparent border-b border-[#FDFBF7]/30 text-[#FDFBF7] text-[13px] px-2 py-1 outline-none focus:border-[#C9A24A] transition-colors w-[180px] sm:w-[220px] placeholder:text-[#FDFBF7]/40"
            />
            <button
              type="submit"
              className="ml-2 hover:text-[#C9A24A] transition-colors bg-transparent border-none cursor-pointer flex items-center justify-center p-1"
              aria-label="Submit Email"
            >
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default AnnouncementBanner;
