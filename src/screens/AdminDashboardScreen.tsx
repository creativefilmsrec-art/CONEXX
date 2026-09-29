import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Users,
  Building2,
  Briefcase,
  Calendar,
  MessageCircle,
  TrendingUp,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Check,
  RefreshCw,
} from 'lucide-react';

export const AdminDashboardScreen: React.FC = () => {
  const { goBack, adminMetrics, updateScoreWeights, addToast } = useApp();
  const [weights, setWeights] = useState(adminMetrics.scoreWeights);
  const [activeTab, setActiveTab] = useState<'kpis' | 'score' | 'moderacao'>('kpis');

  const handleWeightChange = (key: keyof typeof weights, value: number) => {
    setWeights((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    updateScoreWeights(weights);
  };

  return (
    <div className="space-y-6 pb-20 max-w-3xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao App</span>
        </button>
        <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase">
          Ambiente Administrativo
        </span>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Painel Administrativo CONEXX
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Gestão centralizada do ecossistema, calibração de scores e moderação.
        </p>
      </div>

      {/* Admin Tabs (Screen 29) */}
      <div className="flex border-b border-teal-900/40">
        {[
          { id: 'kpis', label: 'Visão Geral & KPIs' },
          { id: 'score', label: 'Score Management' },
          { id: 'moderacao', label: 'Moderação (4)' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === t.id
                ? 'border-[#00d29d] text-[#00d29d]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: KPIs (Screen 29) */}
      {activeTab === 'kpis' && (
        <div className="space-y-5">
          {/* Top KPI Metric Cards (Screen 29) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center">
              <span className="text-xl sm:text-2xl font-black text-white block font-['Space_Grotesk']">
                {adminMetrics.totalUsers.toLocaleString()}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-0.5 block">
                Usuários
              </span>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center">
              <span className="text-xl sm:text-2xl font-black text-white block font-['Space_Grotesk']">
                {adminMetrics.totalCompanies}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-0.5 block">
                Empresas
              </span>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center">
              <span className="text-xl sm:text-2xl font-black text-white block font-['Space_Grotesk']">
                {adminMetrics.totalJobs}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400 mt-0.5 block">
                Vagas Ativas
              </span>
            </div>
            <div className="glass-card rounded-2xl p-4 border border-slate-800 text-center">
              <span className="text-xl sm:text-2xl font-black text-[#00d29d] block font-['Space_Grotesk']">
                {adminMetrics.totalEvents}
              </span>
              <span className="text-[10px] uppercase font-bold text-teal-400 mt-0.5 block">
                Eventos
              </span>
            </div>
          </div>

          {/* Revenue & Growth banner */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-teal-950/60 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">
                Receita Mensal Recorrente (MRR)
              </p>
              <h3 className="text-2xl font-black text-white mt-0.5 font-['Space_Grotesk']">
                R$ {adminMetrics.monthlyRevenue.toLocaleString('pt-BR')},00
              </h3>
              <p className="text-[11px] text-slate-300 mt-0.5">
                Assinaturas PRO/Empresariais + Taxas de Ingressos
              </p>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              +18.4% este mês
            </span>
          </div>

          {/* Gerenciar Seções (Screen 29) */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Gerenciar Módulos
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { name: 'Base de Usuários & Perfis', count: '1.254 registros' },
                { name: 'Empresas & Perfis B2B', count: '320 ativas' },
                { name: 'Vagas & Candidaturas', count: '156 listadas' },
                { name: 'Eventos & Check-ins QR', count: '89 cadastrados' },
                { name: 'Comunidades & Moderação', count: '28 hubs' },
                { name: 'Planos & Assinaturas', count: '4 planos ativos' },
              ].map((m, i) => (
                <div
                  key={i}
                  onClick={() => addToast(`Módulo "${m.name}" sincronizado!`, undefined, 'info')}
                  className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-teal-500/30 flex items-center justify-between cursor-pointer transition-colors"
                >
                  <span className="text-xs font-semibold text-white">{m.name}</span>
                  <span className="text-[10px] text-teal-400">{m.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab: Score Management (Section 60) */}
      {activeTab === 'score' && (
        <form onSubmit={handleSaveWeights} className="space-y-4">
          <div className="p-4 rounded-2xl bg-teal-950/40 border border-[#00d29d]/30 text-xs text-slate-300">
            <p>
              <strong className="text-white">Ajuste dos Pesos do Algoritmo:</strong> Calibre o peso de cada pilar para incentivar a presença física em eventos, colaboração genuína e combater spam.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            {[
              { key: 'conexoes', label: 'Conexões Qualificadas', desc: 'Conexões mútuas aceitas' },
              { key: 'networking', label: 'Networking Ativo', desc: 'Conversas e interações iniciadas' },
              { key: 'eventos', label: 'Eventos & Check-ins QR', desc: 'Presença física comprovada' },
              { key: 'conteudo', label: 'Conteúdo & Publicações', desc: 'Posts e oportunidades compartilhadas' },
              { key: 'comunidades', label: 'Comunidades & Hubs', desc: 'Participação nos clubes digitais' },
              { key: 'palestras', label: 'Palestras & Cursos', desc: 'Workshops e capacitação' },
              { key: 'contribuicao', label: 'Contribuição Ecossistêmica', desc: 'Recomendações e mentorias' },
            ].map((p) => {
              const val = weights[p.key as keyof typeof weights];
              return (
                <div key={p.key} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="font-bold text-white">{p.label}</span>
                    <span className="font-extrabold text-[#00d29d]">{val}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    value={val}
                    onChange={(e) =>
                      handleWeightChange(p.key as any, parseInt(e.target.value))
                    }
                    className="w-full accent-[#00d29d]"
                  />
                  <p className="text-[10px] text-slate-400">{p.desc}</p>
                </div>
              );
            })}

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-xl bg-[#00d29d] text-black font-extrabold text-xs hover:opacity-90 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Salvar e Recalcular Score de Todos os Usuários</span>
            </button>
          </div>
        </form>
      )}

      {/* Tab: Moderação & Denúncias (Screen 28 & Section 61) */}
      {activeTab === 'moderacao' && (
        <div className="space-y-3">
          {[
            {
              id: 'rep_1',
              type: 'Publicação Suspeita',
              author: 'Bot_Ofertas_Fast',
              reason: 'Contém Spam ou Mensagens em massa',
              time: 'Há 12 min',
            },
            {
              id: 'rep_2',
              type: 'Vaga de Emprego',
              author: 'Empresa Não Identificada',
              reason: 'Golpe, Vaga Falsa ou Fraude',
              time: 'Há 45 min',
            },
          ].map((rep) => (
            <div
              key={rep.id}
              className="glass-card rounded-2xl p-4 border border-red-500/20 flex items-center justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-bold text-red-400 uppercase">
                  {rep.type}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white">{rep.author}</h4>
                <p className="text-xs text-slate-300">{rep.reason}</p>
                <span className="text-[10px] text-slate-500">{rep.time}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => addToast('Denúncia arquivada como improcedente', undefined, 'info')}
                  className="px-3 py-1.5 rounded-xl border border-slate-700 text-xs text-slate-300 hover:bg-slate-800"
                >
                  Descartar
                </button>
                <button
                  onClick={() => addToast('Conteúdo removido e usuário advertido', undefined, 'success')}
                  className="px-3 py-1.5 rounded-xl bg-red-600 text-white font-bold text-xs hover:bg-red-500"
                >
                  Remover
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
