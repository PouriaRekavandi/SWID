import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

interface ScrollToTopButtonProps {
  threshold?: number;
  hasBottomChatButton?: boolean;
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  threshold = 450,
  hasBottomChatButton = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY > threshold);

      // Calculate scroll progress percentage (0 to 100)
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (currentScrollY / docHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Check initial position
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // SVG circumference calculations for radial progress ring (r = 18, circumference = 2 * PI * 18 ≈ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <div
      className={`fixed z-40 transition-all duration-300 ease-out ${
        hasBottomChatButton ? 'bottom-20 right-6' : 'bottom-6 right-6'
      } ${
        isVisible
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        aria-label="Scroll back to top of page"
        title={`Scroll to top (${Math.round(scrollProgress)}% scrolled)`}
        className="relative group flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full dark:bg-[#0c1015]/90 bg-white/95 border-2 dark:border-[#00ff41]/50 border-sky-500 shadow-xl dark:shadow-[0_0_15px_rgba(0,255,65,0.25)] shadow-slate-400/40 hover:dark:border-[#00ff41] hover:border-sky-600 hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer backdrop-blur-md"
      >
        {/* Circular Progress Ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none p-[2px]"
          viewBox="0 0 44 44"
          aria-hidden="true"
        >
          {/* Background track */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-slate-200 dark:stroke-zinc-800"
            strokeWidth="2"
            fill="none"
          />
          {/* Active progress stroke */}
          <circle
            cx="22"
            cy="22"
            r={radius}
            className="stroke-sky-600 dark:stroke-[#00ff41] transition-[stroke-dashoffset] duration-150"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
            }}
          />
        </svg>

        {/* Arrow Icon with pulse hover */}
        <div className="relative z-10 flex flex-col items-center justify-center dark:text-[#00ff41] text-sky-700 group-hover:-translate-y-0.5 transition-transform duration-200">
          <ArrowUp className="w-5 h-5 sm:w-5 sm:h-5 stroke-[2.5]" />
        </div>

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-3 px-2 py-1 rounded dark:bg-black/90 bg-slate-800 text-white font-mono text-[10px] uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none shadow-md hidden sm:block">
          Top · {Math.round(scrollProgress)}%
        </span>
      </button>
    </div>
  );
};
