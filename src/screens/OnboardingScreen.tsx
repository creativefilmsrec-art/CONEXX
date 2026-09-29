import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import {
  Briefcase,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

export const OnboardingScreen: React.FC = () => {
  const { setScreen } = useApp();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    {
      title: 'CONHEÇA NOVAS POSSIBILIDADES',
      subtitle: 'Conecte-se com pessoas, empresas e oportunidades que fazem sentido para você.',
      badge: 'Rede Viva & Dinâmica',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=80',
      icon: Users,
    },
    {
      title: 'OPORTUNIDADES EM UM SÓ LUGAR',
      subtitle: 'Vagas exclusivas, novos contratos B2B, capacitação e parcerias estratégicas reunidos em um ecossistema.',
      badge: 'Multidimensional',
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&auto=format&fit=crop&q=80',
      icon: Briefcase,
    },
    {
      title: 'SEU NETWORKING VAI ALÉM DA TELA',
      subtitle: 'Participe de palestras, workshops, happy hours e encontros presenciais em espaços corporativos selecionados.',
      badge: 'Presencial + Digital',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop&q=80',
      icon: Calendar,
    },
    {
      title: 'CONSTRUA SUA PRESENÇA COM CONEXX SCORE',
      subtitle: 'Um algoritmo exclusivo que mede sua reputação real, engajamento e contribuição para a comunidade.',
      badge: 'Score Inteligente',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop&q=80',
      icon: ShieldCheck,
    },
  ];

  const current = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      setScreen('user_type');
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#070e13] flex flex-col justify-between p-5 select-none relative overflow-hidden">
      {/* Top Bar: Logo & Skip */}
      <div className="flex items-center justify-between z-10 pt-2">
        <Logo size="sm" showTagline={false} />
        <button
          onClick={() => setScreen('user_type')}
          className="text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer px-3 py-1"
        >
          Pular
        </button>
      </div>

      {/* Main Slide Card */}
      <div className="z-10 my-auto py-4 flex flex-col items-center text-center max-w-sm mx-auto w-full">
        {/* Visual Hero Image Container */}
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-teal-500/20 shadow-2xl mb-6">
          <img
            src={current.image}
            alt={current.title}
            className="w-full h-full object-cover filter brightness-90 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070e13] via-transparent to-transparent" />

          {/* Floating Pill Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#081116]/80 backdrop-blur-md border border-teal-500/30 text-[#00d29d] text-[11px] font-bold">
            <current.icon className="w-3.5 h-3.5" />
            <span>{current.badge}</span>
          </div>
        </div>

        {/* Step Indicator Dots */}
        <div className="flex items-center gap-2 mb-4">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentStep
                  ? 'w-7 bg-[#00d29d] shadow-[0_0_8px_#00d29d]'
                  : 'w-2 bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Text */}
        <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase font-['Space_Grotesk'] leading-tight">
          {current.title}
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 mt-3 font-normal leading-relaxed">
          {current.subtitle}
        </p>
      </div>

      {/* Bottom CTA */}
      <div className="z-10 w-full max-w-sm mx-auto pb-4 flex flex-col gap-2.5">
        <button
          onClick={handleNext}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)] active:scale-95 transition-all cursor-pointer"
        >
          <span>{currentStep === steps.length - 1 ? 'Começar Agora' : 'Próximo'}</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>

        {currentStep === 0 && (
          <p className="text-center text-[11px] text-slate-500 mt-1">
            Mais do que um app, uma rede viva de oportunidades.
          </p>
        )}
      </div>
    </div>
  );
};
