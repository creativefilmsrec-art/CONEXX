import React from 'react';
import { useApp } from '../../context/AppContext';
import { TrendingUp, ShieldCheck } from 'lucide-react';

interface ConexxScoreRingProps {
  score?: number;
  monthlyGrowth?: number;
  level?: string;
  size?: 'sm' | 'md' | 'lg';
  showDetailsButton?: boolean;
}

export const ConexxScoreRing: React.FC<ConexxScoreRingProps> = ({
  score: propScore,
  monthlyGrowth: propGrowth,
  level: propLevel,
  size = 'md',
  showDetailsButton = true,
}) => {
  const { currentUser, setIsScoreModalOpen } = useApp();

  const score = propScore ?? currentUser.conexxScore.total;
  const growth = propGrowth ?? currentUser.conexxScore.monthlyGrowth;
  const level = propLevel ?? currentUser.conexxScore.level;

  const maxScore = 1200;
  const percentage = Math.min(Math.round((score / maxScore) * 100), 100);

  // SVG parameters
  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const radius = size === 'sm' ? 24 : size === 'md' ? 38 : 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const svgDimensions = {
    sm: { width: 60, height: 60, font: 'text-sm' },
    md: { width: 96, height: 96, font: 'text-2xl' },
    lg: { width: 140, height: 140, font: 'text-4xl' },
  }[size];

  return (
    <div
      onClick={() => showDetailsButton && setIsScoreModalOpen(true)}
      className={`glass-card rounded-2xl p-4 flex items-center justify-between gap-4 border border-teal-500/20 bg-gradient-to-br from-[#0a1820]/90 to-[#071116]/90 ${
        showDetailsButton ? 'cursor-pointer hover:border-teal-400/40 hover:shadow-[0_0_20px_rgba(0,210,157,0.15)] transition-all' : ''
      }`}
    >
      <div className="flex-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#00d29d] tracking-wider uppercase">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>CONEXX SCORE</span>
        </div>
        <div className="mt-1 flex items-baseline gap-2">
          <span className="text-2xl sm:text-3xl font-extrabold text-white font-['Space_Grotesk']">
            {score}
          </span>
          <span className="flex items-center text-xs font-bold text-emerald-400">
            <TrendingUp className="w-3 h-3 mr-0.5" />+{growth} este mês
          </span>
        </div>
        <p className="text-xs text-slate-300 mt-1 font-medium">{level}</p>

        {showDetailsButton && (
          <span className="inline-block mt-2 text-[11px] text-teal-400/90 underline font-semibold hover:text-white transition-colors">
            Ver detalhamento do score &rarr;
          </span>
        )}
      </div>

      {/* Radial Ring */}
      <div className="relative flex items-center justify-center">
        <svg
          width={svgDimensions.width}
          height={svgDimensions.height}
          className="transform -rotate-90"
        >
          <circle
            cx={svgDimensions.width / 2}
            cy={svgDimensions.height / 2}
            r={radius}
            stroke="#122b2f"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          <circle
            cx={svgDimensions.width / 2}
            cy={svgDimensions.height / 2}
            r={radius}
            stroke="url(#scoreRingGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id="scoreRingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00d29d" />
              <stop offset="50%" stopColor="#00b4d8" />
              <stop offset="100%" stopColor="#2dd4bf" />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute text-center">
          <span className="text-xs sm:text-sm font-bold text-white">
            {percentage}%
          </span>
        </div>
      </div>
    </div>
  );
};
