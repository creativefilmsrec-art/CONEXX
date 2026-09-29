import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { ArrowRight, Sparkles } from 'lucide-react';

export const SplashScreen: React.FC = () => {
  const { setScreen } = useApp();
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-between p-6 bg-[#060c10] overflow-hidden select-none">
      {/* Background City Silhouette & Luminous Ambient */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1477959858617-67f30bc75b82?w=1600&auto=format&fit=crop&q=80"
          alt="Skyline"
          className="w-full h-full object-cover opacity-20 filter contrast-125 saturate-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060c10] via-[#060c10]/80 to-[#060c10]/40" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500/15 rounded-full blur-[100px] pointer-events-none" />
      </div>

      {/* Top Spacer */}
      <div className="z-10 pt-6">
        <span className="text-[11px] font-bold tracking-[0.25em] text-[#00d29d] uppercase flex items-center gap-1.5 justify-center">
          <Sparkles className="w-3 h-3 text-[#00d29d]" /> Ecossistema Integrado
        </span>
      </div>

      {/* Center Hero: Glowing Ribbon Logo & Tagline */}
      <div className="z-10 flex flex-col items-center text-center max-w-sm px-4">
        <div className="animate-in zoom-in-75 duration-1000">
          <Logo size="xl" showTagline={false} />
        </div>

        <h1 className="text-xl sm:text-2xl font-bold text-white mt-6 tracking-tight leading-snug">
          O ecossistema onde <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00d29d] via-[#00b4d8] to-teal-200">
            oportunidades se encontram.
          </span>
        </h1>

        <p className="text-xs text-slate-400 mt-3 font-normal max-w-xs leading-relaxed">
          Pessoas, empresas, eventos, vagas, negócios e networking em um só lugar.
        </p>
      </div>

      {/* Bottom CTA / Auto-forward */}
      <div className="z-10 w-full max-w-xs pb-6 flex flex-col gap-3">
        <button
          onClick={() => setScreen('onboarding')}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_25px_rgba(0,210,157,0.4)] active:scale-95 transition-all cursor-pointer"
        >
          <span>Acessar Plataforma</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        <button
          onClick={() => setScreen('login')}
          className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          Já tenho uma conta &rarr; Entrar
        </button>
      </div>
    </div>
  );
};
