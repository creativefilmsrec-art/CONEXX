import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  TrendingUp,
  Award,
  Users,
  Calendar,
  Share2,
  BookOpen,
  HeartHandshake,
  MessageCircle,
  HelpCircle,
} from 'lucide-react';

export const ConexxScoreModal: React.FC = () => {
  const { isScoreModalOpen, setIsScoreModalOpen, currentUser } = useApp();

  if (!isScoreModalOpen) return null;

  const score = currentUser.conexxScore;

  const pillars = [
    {
      name: 'Conexões Qualificadas',
      points: score.conexoes,
      weight: '20%',
      icon: Users,
      desc: 'Conexões recíprocas e relevantes com tomadores de decisão.',
      color: 'bg-teal-500',
    },
    {
      name: 'Networking Efetivo',
      points: score.networking,
      weight: '20%',
      icon: HeartHandshake,
      desc: 'Conversas produtivas iniciadas e mantidas no ecossistema.',
      color: 'bg-emerald-500',
    },
    {
      name: 'Eventos & Check-ins',
      points: score.eventos,
      weight: '20%',
      icon: Calendar,
      desc: 'Presença confirmada e check-in presencial validado via QR Code.',
      color: 'bg-cyan-500',
    },
    {
      name: 'Conteúdo de Valor',
      points: score.conteudo,
      weight: '15%',
      icon: Share2,
      desc: 'Publicações, conquistas, oportunidades e engajamento genuíno.',
      color: 'bg-blue-500',
    },
    {
      name: 'Comunidades Ativas',
      points: score.comunidades,
      weight: '10%',
      icon: MessageCircle,
      desc: 'Participação em discussões e fomento de hubs setoriais.',
      color: 'bg-indigo-500',
    },
    {
      name: 'Palestras & Cursos',
      points: score.palestras,
      weight: '10%',
      icon: BookOpen,
      desc: 'Workshops concluídos e palestras ministradas ou assistidas.',
      color: 'bg-purple-500',
    },
    {
      name: 'Contribuição Ecossistêmica',
      points: score.contribuicao,
      weight: '5%',
      icon: Award,
      desc: 'Recomendações dadas, mentoria e apoio a outros membros.',
      color: 'bg-amber-500',
    },
  ];

  const levels = [
    { range: '0–199', label: 'Presença Inicial', active: false },
    { range: '200–399', label: 'Participante', active: false },
    { range: '400–599', label: 'Conectado', active: false },
    { range: '600–799', label: 'Ativo', active: false },
    { range: '800–999', label: 'Referência na Comunidade', active: true },
    { range: '1000+', label: 'Alta Presença Global', active: false },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[90vh] flex flex-col bg-[#0b161e] border border-teal-500/30 rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-teal-900/40 flex items-center justify-between bg-[#081117]">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-teal-500/10 border border-teal-500/30 text-[#00d29d]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                Como seu CONEXX Score é calculado
              </h2>
              <p className="text-xs text-slate-400">Transparência e algoritmo de qualidade</p>
            </div>
          </div>
          <button
            onClick={() => setIsScoreModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Big Score Card */}
          <div className="rounded-2xl bg-gradient-to-r from-teal-950/70 via-slate-900/90 to-cyan-950/70 border border-[#00d29d]/30 p-5 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#00d29d]/10 rounded-full blur-2xl pointer-events-none" />
            <span className="text-xs uppercase tracking-widest font-bold text-[#00d29d]">
              Pontuação Atual
            </span>
            <div className="mt-1 flex items-center justify-center gap-2">
              <span className="text-4xl sm:text-5xl font-black text-white font-['Space_Grotesk']">
                {score.total}
              </span>
              <div className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3.5 h-3.5 mr-1" />
                +{score.monthlyGrowth} este mês
              </div>
            </div>
            <p className="text-sm font-semibold text-slate-200 mt-2">
              {score.level}
            </p>
          </div>

          {/* Anti-spam / Quality Banner */}
          <div className="p-3.5 rounded-xl bg-teal-950/30 border border-teal-500/20 flex gap-3 text-xs text-slate-300">
            <HelpCircle className="w-4 h-4 text-[#00d29d] shrink-0 mt-0.5" />
            <p>
              <strong className="text-white">Qualidade acima de quantidade:</strong> O CONEXX Score não é uma métrica de vaidade. Conexões mútuas, presença real comprovada em eventos e interações construtivas possuem peso muito maior do que ações em massa ou spam.
            </p>
          </div>

          {/* Pillars List */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Detalhamento dos Pilares
            </h3>
            <div className="space-y-3">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                const percentOfTotal = Math.round((p.points / 1000) * 100);
                return (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 hover:border-teal-500/30 transition-all"
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-teal-400" />
                        <span className="font-semibold text-white">{p.name}</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-teal-400 border border-teal-900/50">
                          Peso {p.weight}
                        </span>
                      </div>
                      <span className="font-bold text-[#00d29d]">{p.points} pts</span>
                    </div>
                    <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mb-1.5">
                      <div
                        className={`${p.color} h-full rounded-full transition-all duration-700`}
                        style={{ width: `${Math.min(percentOfTotal, 100)}%` }}
                      />
                    </div>
                    <p className="text-[11px] text-slate-400">{p.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Níveis de Presença */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Escala de Presença no Ecossistema
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {levels.map((lvl, i) => (
                <div
                  key={i}
                  className={`p-2.5 rounded-xl border text-center transition-all ${
                    lvl.active
                      ? 'bg-teal-950/60 border-[#00d29d] ring-1 ring-[#00d29d]'
                      : 'bg-slate-900/40 border-slate-800/60 opacity-60'
                  }`}
                >
                  <span className="text-[10px] font-bold text-teal-400 block">{lvl.range}</span>
                  <span className="text-xs font-bold text-white block mt-0.5">{lvl.label}</span>
                  {lvl.active && (
                    <span className="inline-block mt-1 text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-[#00d29d] text-black">
                      Seu Nível
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-teal-900/40 bg-[#081117] flex justify-end">
          <button
            onClick={() => setIsScoreModalOpen(false)}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00d29d] text-black font-bold text-xs hover:bg-[#00d29d]/90 transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
