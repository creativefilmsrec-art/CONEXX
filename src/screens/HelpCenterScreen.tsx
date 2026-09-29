import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Search,
  HelpCircle,
  ChevronRight,
  MessageSquare,
  ShieldCheck,
} from 'lucide-react';

export const HelpCenterScreen: React.FC = () => {
  const { goBack, addToast, navigateTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Como funciona o CONEXX Score?',
      a: 'O CONEXX Score mede sua presença, contribuição e qualidade de relacionamento dentro do ecossistema. Ele considera 7 pilares calibrados (conexões, eventos, networking, conteúdo, etc.) e combate manipulações ou spam.',
    },
    {
      q: 'Como realizar o check-in digital em eventos?',
      a: 'Ao chegar ao evento presencial (palestra, workshop ou happy hour), abra o evento no app e toque em "Check-in Digital". Aponte a câmera para o totem de QR Code para validar sua presença e ganhar +18 pontos no score!',
    },
    {
      q: 'Como publicar uma vaga de emprego?',
      a: 'Se você possui um perfil de Empresa ou Empresário, toque no botão central (+) no menu inferior e escolha "Vaga". Preencha os requisitos, localização e faixa salarial.',
    },
    {
      q: 'Como participar das comunidades e hubs setoriais?',
      a: 'Na aba Comunidades, explore os clubes digitais (ex: Marketing, Tecnologia, RH). Basta tocar em "+ Entrar" para participar das discussões e ter acesso a vagas exclusivas.',
    },
  ];

  return (
    <div className="space-y-6 pb-20 max-w-md mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-teal-400">Suporte CONEXX</span>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Central de Ajuda
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Tire dúvidas frequentes ou fale com a nossa equipe de suporte.
        </p>
      </div>

      {/* Search Input (Screen 27) */}
      <div className="relative">
        <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Como podemos te ajudar hoje?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
        />
      </div>

      {/* FAQ Accordion (Screen 27) */}
      <div className="space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Dúvidas Frequentes
        </h2>
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="glass-card rounded-2xl p-4 border border-slate-800 transition-all cursor-pointer"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xs sm:text-sm font-bold text-white">{faq.q}</h3>
              <ChevronRight
                className={`w-4 h-4 text-teal-400 transition-transform ${
                  openFaq === i ? 'rotate-90' : ''
                }`}
              />
            </div>
            {openFaq === i && (
              <p className="text-xs text-slate-300 mt-2.5 leading-relaxed border-t border-slate-800/80 pt-2 font-normal">
                {faq.a}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Fale Conosco Card */}
      <div className="p-4 rounded-2xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between">
        <div>
          <p className="text-xs font-bold text-white">Precisa de atendimento direto?</p>
          <p className="text-[11px] text-teal-300">Equipe de suporte em Recife e suporte digital</p>
        </div>
        <button
          onClick={() => {
            addToast('Canal de suporte aberto!', undefined, 'info');
            navigateTab('mensagens');
          }}
          className="px-3.5 py-2 rounded-xl bg-[#00d29d] text-black font-extrabold text-xs"
        >
          Fale Conosco
        </button>
      </div>
    </div>
  );
};
