import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Check,
  Sparkles,
  ShieldCheck,
  CreditCard,
  Building2,
  Zap,
} from 'lucide-react';
import { SUBSCRIPTION_PLANS } from '../data/mockData';

export const SubscriptionsScreen: React.FC = () => {
  const { goBack, navigateTab, addToast } = useApp();
  const [planType, setPlanType] = useState<'profissional' | 'empresarial'>('profissional');

  const filteredPlans = SUBSCRIPTION_PLANS.filter((p) => p.type === planType);

  const handleSelectPlan = (planName: string, price: string) => {
    if (price === 'R$ 0') {
      addToast('Plano Gratuito ativo.', undefined, 'info');
      return;
    }
    navigateTab('checkout');
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-teal-400">Planos CONEXX</span>
      </div>

      {/* Header (Screen 24) */}
      <div className="text-center space-y-2">
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Escolha seu CONEXX
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto">
          Acelere sua presença, impulsione seus negócios ou contrate os melhores talentos do ecossistema.
        </p>
      </div>

      {/* Tabs Menu (Screen 24) */}
      <div className="flex border-b border-teal-900/40 max-w-sm mx-auto">
        <button
          onClick={() => setPlanType('profissional')}
          className={`flex-1 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            planType === 'profissional'
              ? 'border-[#00d29d] text-[#00d29d]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Para Profissionais
        </button>
        <button
          onClick={() => setPlanType('empresarial')}
          className={`flex-1 py-2 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            planType === 'empresarial'
              ? 'border-[#00d29d] text-[#00d29d]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Para Empresas & Negócios
        </button>
      </div>

      {/* Plans List (Screen 24) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredPlans.map((plan) => (
          <div
            key={plan.id}
            className={`glass-card rounded-3xl p-5 border flex flex-col justify-between transition-all ${
              plan.recommended
                ? 'border-[#00d29d] bg-gradient-to-b from-[#0c2226] to-[#081318] shadow-[0_0_25px_rgba(0,210,157,0.15)] ring-1 ring-[#00d29d]'
                : 'border-slate-800 bg-slate-900/60'
            }`}
          >
            <div>
              {plan.recommended && (
                <span className="inline-block mb-3 px-2.5 py-0.5 rounded-full bg-[#00d29d] text-black text-[10px] font-black uppercase tracking-wider">
                  Mais Popular
                </span>
              )}

              <h2 className="text-base font-bold text-white">{plan.name}</h2>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-black text-white font-['Space_Grotesk']">
                  {plan.price}
                </span>
                <span className="text-xs text-slate-400">{plan.period}</span>
              </div>
              <p className="text-xs text-slate-300 mt-2 font-normal">{plan.description}</p>

              {/* Features list */}
              <div className="mt-5 space-y-2.5 border-t border-slate-800/80 pt-4">
                {plan.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-slate-200">
                    <Check className="w-3.5 h-3.5 text-[#00d29d] shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => handleSelectPlan(plan.name, plan.price)}
                className={`w-full py-3 rounded-2xl font-extrabold text-xs transition-all cursor-pointer ${
                  plan.current
                    ? 'bg-slate-800 text-teal-300 border border-teal-800/80'
                    : plan.recommended
                    ? 'bg-gradient-to-r from-teal-500 to-[#00d29d] text-black hover:opacity-95 shadow-[0_0_15px_rgba(0,210,157,0.3)]'
                    : 'bg-slate-800 hover:bg-slate-700 text-white'
                }`}
              >
                {plan.current ? 'Plano Atual (Ativo)' : 'Assinar Plano'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
