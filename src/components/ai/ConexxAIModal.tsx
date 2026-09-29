import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Sparkles,
  Send,
  Briefcase,
  Users,
  Calendar,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

interface AIMessage {
  sender: 'ai' | 'user';
  text: string;
  actionButton?: {
    label: string;
    action: () => void;
  };
}

export const ConexxAIModal: React.FC = () => {
  const { isAIModalOpen, setIsAIModalOpen, navigateTab, jobs, users, events } = useApp();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      sender: 'ai',
      text: 'Olá, Juliana! Eu sou o CONEXX AI, seu copiloto de oportunidades e networking. Como posso acelerar suas conexões hoje?',
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  if (!isAIModalOpen) return null;

  const quickPrompts = [
    'Vagas com Match acima de 90%',
    'Encontrar líderes de inovação em Recife',
    'Eventos de networking recomendados esta semana',
    'Como atingir 900+ no CONEXX Score?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const lower = query.toLowerCase();

      if (lower.includes('vaga') || lower.includes('emprego') || lower.includes('match')) {
        const topJob = jobs[0];
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Localizei a vaga de "${topJob.title}" na ${topJob.companyName}. Seu perfil possui 92% de match com as competências de Growth e localização em Recife!`,
            actionButton: {
              label: 'Ver Detalhes da Vaga',
              action: () => {
                setIsAIModalOpen(false);
                navigateTab('vaga_detalhe', { job: topJob });
              },
            },
          },
        ]);
      } else if (lower.includes('líder') || lower.includes('recife') || lower.includes('networking') || lower.includes('pessoa')) {
        const topUser = users[0];
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Encontrei Carlos Mendes (CEO @ Inovação Tech). Vocês têm 18 conexões em comum e participaram de 3 encontros no Porto Digital. A compatibilidade é de 94%!`,
            actionButton: {
              label: 'Conectar com Carlos Mendes',
              action: () => {
                setIsAIModalOpen(false);
                navigateTab('user_detalhe', { user: topUser });
              },
            },
          },
        ]);
      } else if (lower.includes('evento') || lower.includes('happy hour')) {
        const happyHour = events[1];
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Recomendo o "CONEXX Networking + Happy Hour" no Bistrô Empresarial hoje às 18:30h. Já conta com 48 fundadores e gestores confirmados da sua rede.`,
            actionButton: {
              label: 'Ver Happy Hour & Ingressos',
              action: () => {
                setIsAIModalOpen(false);
                navigateTab('evento_detalhe', { event: happyHour });
              },
            },
          },
        ]);
      } else if (lower.includes('score')) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Seu CONEXX Score atual é 842 (Referência na Comunidade). Para ultrapassar os 900 pontos, recomendo fazer check-in no próximo evento presencial (+18 pts) e publicar um momento de bastidor com sua equipe (+12 pts).`,
            actionButton: {
              label: 'Ver Estrutura do Score',
              action: () => {
                setIsAIModalOpen(false);
                navigateTab('meu_conexx');
              },
            },
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ai',
            text: `Entendido! Analisei o ecossistema CONEXX para "${query}". Há novas pessoas, comunidades e oportunidades de negócios ativas nesse segmento em Pernambuco.`,
            actionButton: {
              label: 'Explorar Oportunidades',
              action: () => {
                setIsAIModalOpen(false);
                navigateTab('negocios');
              },
            },
          },
        ]);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0a161f] border border-teal-500/40 rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[85vh] max-h-[640px]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-teal-900/40 flex items-center justify-between bg-[#071117]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-[#00d29d] flex items-center justify-center text-black font-bold shadow-[0_0_12px_rgba(0,210,157,0.4)]">
              <Sparkles className="w-4 h-4 text-black animate-pulse" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white flex items-center gap-1.5">
                CONEXX AI <span className="text-[10px] px-1.5 py-0.2 rounded bg-teal-900/60 text-teal-300">Inteligente</span>
              </h2>
              <p className="text-[11px] text-teal-400">Recomendações em tempo real</p>
            </div>
          </div>
          <button
            onClick={() => setIsAIModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex flex-col ${
                m.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-[#00d29d] text-black font-medium'
                    : 'bg-slate-900/90 border border-teal-900/40 text-slate-100 shadow-md'
                }`}
              >
                {m.text}
              </div>

              {m.actionButton && (
                <button
                  onClick={m.actionButton.action}
                  className="mt-2 text-xs font-bold text-[#00d29d] bg-teal-950/80 border border-teal-500/40 px-3 py-1.5 rounded-xl hover:bg-teal-900/80 flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <span>{m.actionButton.label}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-1 text-slate-400 text-xs p-2">
              <span className="w-2 h-2 rounded-full bg-[#00d29d] animate-bounce" />
              <span className="w-2 h-2 rounded-full bg-[#00d29d] animate-bounce [animation-delay:0.2s]" />
              <span className="w-2 h-2 rounded-full bg-[#00d29d] animate-bounce [animation-delay:0.4s]" />
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 border-t border-teal-950/60 bg-[#081218] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((qp, i) => (
            <button
              key={i}
              onClick={() => handleSend(qp)}
              className="whitespace-nowrap text-[11px] px-2.5 py-1 rounded-full bg-slate-900 border border-teal-900/50 text-slate-300 hover:text-white hover:border-[#00d29d] transition-all cursor-pointer"
            >
              {qp}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="p-3 border-t border-teal-900/40 bg-[#071117] flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Pergunte ao CONEXX AI..."
            className="flex-1 px-3.5 py-2 text-xs bg-slate-900 border border-teal-900/50 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="p-2.5 rounded-xl bg-[#00d29d] text-black hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
