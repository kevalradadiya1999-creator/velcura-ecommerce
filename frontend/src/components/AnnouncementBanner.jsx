import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AnnouncementBanner = () => {
  return (
    <div className="bg-[#0A192F] text-[#FDFBF7] py-2 lg:py-2.5 px-4 w-full z-50 relative">
      <div className="container mx-auto flex items-center justify-center gap-2 sm:gap-4 transition-transform hover:scale-[1.01] duration-300">
        <Link to="/export" className="flex items-center justify-center gap-2 sm:gap-4 text-decoration-none group cursor-pointer w-full max-w-max mx-auto">
          <span className="text-[10px] sm:text-[12px] font-semibold tracking-[0.15em] uppercase text-[#C9A24A] text-center flex flex-col sm:flex-row gap-0.5 sm:gap-3 items-center group-hover:text-white transition-colors duration-300">
            <span>Now Exporting Worldwide</span>
            <span className="hidden sm:inline opacity-40 text-white font-light text-[14px]">|</span>
            <span>B2B Inquiries Open</span>
          </span>
          <ArrowRight size={14} className="hidden sm:block text-[#C9A24A] group-hover:text-white transition-colors duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBanner;
