import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Building2,
  MapPin,
  Globe,
  Users,
  Briefcase,
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Check,
  Plus,
  ArrowRight,
  Package,
} from 'lucide-react';

export const CompanyProfileScreen: React.FC = () => {
  const { selectedCompany, goBack, navigateTab, jobs, businessItems, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'sobre' | 'vagas' | 'produtos'>('sobre');
  const [isFollowing, setIsFollowing] = useState(false);

  if (!selectedCompany) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-slate-400">Empresa não encontrada.</p>
        <button onClick={goBack} className="mt-3 text-xs text-teal-400 underline">
          Voltar
        </button>
      </div>
    );
  }

  const companyJobs = jobs.filter((j) => j.companyId === selectedCompany.id);
  const companyProducts = businessItems.filter((b) => b.authorCompany === selectedCompany.name);

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
    addToast(
      isFollowing ? 'Deixou de seguir a empresa' : 'Você agora está seguindo ' + selectedCompany.name,
      undefined,
      'info'
    );
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>

        <a
          href={selectedCompany.website}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1.5 text-xs text-teal-400 font-bold hover:underline"
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Ver site</span>
        </a>
      </div>

      {/* Company Cover & Header Card (Screen 12) */}
      <div className="glass-card rounded-3xl overflow-hidden border border-teal-500/25 bg-slate-900 shadow-xl">
        <div className="h-32 sm:h-40 w-full overflow-hidden relative">
          <img
            src={selectedCompany.coverImage}
            alt="Capa corporativa"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b161e] via-transparent to-transparent" />
        </div>

        <div className="px-5 pb-5 -mt-12 sm:-mt-14 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3.5 text-center sm:text-left">
              <img
                src={selectedCompany.logo}
                alt={selectedCompany.name}
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-[#0b161e] shadow-xl bg-slate-900"
              />
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white">{selectedCompany.name}</h1>
                  {selectedCompany.verified && (
                    <span className="p-1 rounded-full bg-teal-500 text-black">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </span>
                  )}
                </div>
                <p className="text-xs sm:text-sm text-teal-300 font-semibold">{selectedCompany.segment}</p>
                <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <span>{selectedCompany.employeesRange}</span>
                  <span>•</span>
                  <span>{selectedCompany.city}</span>
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2">
              <button
                onClick={toggleFollow}
                className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                  isFollowing
                    ? 'bg-slate-800 text-slate-200 border border-slate-700'
                    : 'bg-gradient-to-r from-teal-500 to-[#00d29d] text-black shadow-[0_0_15px_rgba(0,210,157,0.3)]'
                }`}
              >
                {isFollowing ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Seguindo</span>
                  </>
                ) : (
                  <>
                    <Plus className="w-3.5 h-3.5" />
                    <span>Seguir</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigateTab('mensagens', { chatId: 'chat_techsolutions' })}
                className="px-4 py-2 rounded-xl bg-teal-950 border border-teal-500/40 text-[#00d29d] hover:bg-teal-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Mensagem</span>
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-4 mt-4 border-t border-slate-800/80 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-base font-extrabold text-white block">
                {selectedCompany.openJobsCount}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Vagas Abertas</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-base font-extrabold text-white block">
                {selectedCompany.followersCount}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Seguidores</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-base font-extrabold text-white block">
                {selectedCompany.connectionsCount}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Conexões</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-teal-500/30">
              <span className="text-base font-extrabold text-[#00d29d] block">
                {selectedCompany.businessScore}
              </span>
              <span className="text-[10px] uppercase font-bold text-teal-400">Business Score</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Menu (Screen 12) */}
      <div className="flex border-b border-teal-900/40">
        {[
          { id: 'sobre', label: 'Sobre a Empresa' },
          { id: 'vagas', label: `Vagas (${companyJobs.length})` },
          { id: 'produtos', label: 'Produtos / Serviços B2B' },
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

      {/* Tab: Sobre */}
      {activeTab === 'sobre' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Sobre Nós
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {selectedCompany.description}
            </p>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              CONEXX Business Score & Governança
            </h2>
            <div className="p-3.5 rounded-xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-white">Score Corporativo 910</p>
                <p className="text-xs text-slate-300">
                  Alta taxa de resposta a candidatos e parceiros B2B.
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-[#00d29d] text-xs font-extrabold border border-emerald-500/40">
                Empresa Diamante
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Vagas */}
      {activeTab === 'vagas' && (
        <div className="space-y-3">
          {companyJobs.length === 0 ? (
            <div className="text-center py-8 glass-card rounded-2xl p-4">
              <p className="text-xs text-slate-400">Nenhuma vaga ativa no momento.</p>
            </div>
          ) : (
            companyJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => navigateTab('vaga_detalhe', { job })}
                className="glass-card rounded-2xl p-4 border border-teal-500/20 hover:border-[#00d29d] transition-all cursor-pointer flex items-center justify-between gap-3 group"
              >
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#00d29d] transition-colors">
                    {job.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-950 text-teal-300">
                      {job.locationType}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                      {job.contractType}
                    </span>
                    <span className="text-[10px] text-emerald-400 font-bold">
                      {job.matchPercentage}% Match
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-teal-400 text-xs font-bold">
                  <span>Ver</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab: Produtos e Serviços B2B */}
      {activeTab === 'produtos' && (
        <div className="space-y-3">
          {companyProducts.map((prod) => (
            <div
              key={prod.id}
              className="glass-card rounded-2xl p-4 border border-slate-800 flex gap-4 items-center"
            >
              <img
                src={prod.image}
                alt={prod.title}
                className="w-16 h-16 rounded-xl object-cover shrink-0"
              />
              <div className="flex-1">
                <span className="text-[9px] uppercase font-bold text-teal-400 px-1.5 py-0.5 rounded bg-teal-950">
                  {prod.type}
                </span>
                <h4 className="text-xs sm:text-sm font-bold text-white mt-1">{prod.title}</h4>
                <p className="text-xs text-emerald-400 font-semibold">{prod.price}</p>
              </div>
              <button
                onClick={() => navigateTab('negocios')}
                className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
              >
                Consultar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
