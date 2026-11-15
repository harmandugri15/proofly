import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTopButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  if (!isVisible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-40 px-3.5 py-2.5 rounded-full bg-[#385241]/95 hover:bg-[#24362A] text-white text-xs font-semibold shadow-lg border border-[#C7D9CD]/40 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl flex items-center gap-1.5 group select-none animate-fadeIn"
    >
      <ArrowUp className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
      <span className="hidden sm:inline font-sans">Top</span>
    </button>
  );
};
