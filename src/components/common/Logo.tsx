import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showTagline = false, className = '' }) => {
  const sizeMap = {
    sm: { icon: 'w-6 h-6', text: 'text-lg', sub: 'text-[9px]' },
    md: { icon: 'w-8 h-8', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'w-12 h-12', text: 'text-3xl', sub: 'text-xs' },
    xl: { icon: 'w-16 h-16', text: 'text-4xl', sub: 'text-sm' },
  };

  const current = sizeMap[size];

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Stylized luminous infinity / connect ribbon icon */}
      <div className={`relative flex items-center justify-center ${current.icon}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,210,157,0.5)]">
          <defs>
            <linearGradient id="conexxGrad" x1="10%" y1="10%" x2="90%" y2="90%">
              <stop offset="0%" stopColor="#00d29d" />
              <stop offset="50%" stopColor="#00b4d8" />
              <stop offset="100%" stopColor="#065a60" />
            </linearGradient>
            <linearGradient id="dotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Dual ribbon intersecting loops forming dynamic 'C&' */}
          <path
            d="M26 36C26 23.8497 35.8497 14 48 14C60.1503 14 70 23.8497 70 36C70 48.1503 54 60 48 66C42 60 26 48.1503 26 36Z"
            stroke="url(#conexxGrad)"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity="0.25"
          />
          <path
            d="M32 68C22 60 18 46 22 34C26 22 38 16 50 20C62 24 74 38 82 52C88 62 82 76 70 80C58 84 46 76 38 66L68 34"
            stroke="url(#conexxGrad)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Glowing focal connection node */}
          <circle cx="70" cy="34" r="6" fill="url(#dotGrad)" className="animate-pulse" />
        </svg>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`font-extrabold tracking-wider text-white font-['Space_Grotesk'] ${current.text}`}>
            CONEX<span className="text-[#00d29d]">X</span>
          </span>
        </div>
        {showTagline && (
          <span className={`tracking-[0.18em] uppercase font-semibold text-slate-400 ${current.sub}`}>
            Pessoas • Negócios • Oportunidades
          </span>
        )}
      </div>
    </div>
  );
};
