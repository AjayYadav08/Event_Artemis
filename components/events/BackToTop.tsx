import React from 'react';
import { ArrowUp } from 'lucide-react';

interface BackToTopProps {
  showBackToTop: boolean;
  scrollToTop: () => void;
}

const BackToTop: React.FC<BackToTopProps> = ({ showBackToTop, scrollToTop }) => {
  return (
    <div 
      className={`sticky bottom-8 z-[500] flex justify-center w-full pointer-events-none transition-all  ${
        showBackToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <button
        onClick={scrollToTop}
        className="pointer-events-auto bg-slate-900 text-white p-4 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:bg-black hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)] hover:-translate-y-1 transition-all flex items-center justify-center group"
        aria-label="Back to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>
    </div>
  );
};

export default BackToTop;
