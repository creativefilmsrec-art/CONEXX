import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Sparkles,
  Building2,
  CheckCircle2,
  Bookmark,
  Share2,
  Send,
  Users,
} from 'lucide-react';

export const JobDetailScreen: React.FC = () => {
  const {
    selectedJob,
    goBack,
    navigateTab,
    applyToJob,
    appliedJobIds,
    savedJobIds,
    toggleSaveJob,
    addToast,
    companies,
    setSelectedCompany,
  } = useApp();

  if (!selectedJob) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-slate-400">Vaga não selecionada.</p>
        <button onClick={goBack} className="mt-3 text-xs text-teal-400 underline">
          Voltar às Vagas
        </button>
      </div>
    );
  }

  const isApplied = appliedJobIds.has(selectedJob.id);
  const isSaved = savedJobIds.has(selectedJob.id);

  const targetCompany = companies.find((c) => c.id === selectedJob.companyId) || companies[0];

  const handleShare = () => {
    addToast('Link da vaga copiado com sucesso!', undefined, 'info');
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar para Vagas</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            title="Compartilhar vaga"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => toggleSaveJob(selectedJob.id)}
            className={`p-2 rounded-xl border transition-all cursor-pointer ${
              isSaved
                ? 'bg-teal-950 border-[#00d29d] text-[#00d29d]'
                : 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Salvar vaga"
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-[#00d29d]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Header Info Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 border border-teal-500/25 space-y-4">
        <div className="flex items-start gap-4">
          <img
            src={selectedJob.companyLogo}
            alt={selectedJob.companyName}
            className="w-16 h-16 rounded-2xl object-cover border border-teal-800/60 shadow-lg"
          />
          <div className="flex-1">
            <h1 className="text-lg sm:text-xl font-black text-white leading-tight">
              {selectedJob.title}
            </h1>
            <div
              onClick={() => {
                setSelectedCompany(targetCompany);
                navigateTab('empresa_detalhe', { company: targetCompany });
              }}
              className="inline-flex items-center gap-1.5 text-xs text-teal-400 font-bold hover:underline cursor-pointer mt-1"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{selectedJob.companyName}</span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
              <MapPin className="w-3 h-3 text-slate-500" />
              <span>{selectedJob.city}</span>
            </p>
          </div>
        </div>

        {/* Badges Bar */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800/80">
          <span className="text-xs px-3 py-1 rounded-lg bg-teal-950/80 text-teal-300 border border-teal-800 font-semibold">
            {selectedJob.locationType}
          </span>
          <span className="text-xs px-3 py-1 rounded-lg bg-slate-900 text-slate-300 border border-slate-800 font-semibold">
            {selectedJob.contractType}
          </span>
          {selectedJob.salary && (
            <span className="text-xs px-3 py-1 rounded-lg bg-emerald-950/60 text-emerald-400 border border-emerald-800/60 font-bold">
              {selectedJob.salary}
            </span>
          )}
        </div>
      </div>

      {/* AI Match Card */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-teal-950/70 via-slate-900/90 to-cyan-950/60 border border-[#00d29d]/40 shadow-lg space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-black uppercase text-[#00d29d] tracking-wide">
            <Sparkles className="w-4 h-4 text-[#00d29d]" />
            <span>CONEXX AI Match</span>
          </div>
          <span className="text-base font-black text-white px-2.5 py-0.5 rounded-full bg-[#00d29d] text-black">
            {selectedJob.matchPercentage}% Compatível
          </span>
        </div>
        <div className="space-y-1.5 text-xs text-slate-300">
          {selectedJob.matchDetails.map((detail, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#00d29d] shrink-0 mt-0.5" />
              <span>{detail}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Descrição */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Descrição da Vaga
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {selectedJob.description}
        </p>
      </div>

      {/* Requisitos */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Requisitos & Competências
        </h2>
        <div className="space-y-2">
          {selectedJob.requirements.map((req, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 shrink-0 mt-1.5" />
              <span>{req}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefícios */}
      {selectedJob.benefits && selectedJob.benefits.length > 0 && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800/80 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Benefícios
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
            {selectedJob.benefits.map((ben, i) => (
              <div key={i} className="flex items-center gap-2 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>{ben}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky Bottom Apply Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 p-3 bg-[#081218]/90 backdrop-blur-md border-t border-teal-900/40">
        <div className="max-w-md mx-auto flex items-center gap-3">
          <button
            onClick={() => toggleSaveJob(selectedJob.id)}
            className="p-3 rounded-2xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white"
          >
            <Bookmark className={`w-5 h-5 ${isSaved ? 'fill-[#00d29d] text-[#00d29d]' : ''}`} />
          </button>

          <button
            onClick={() => applyToJob(selectedJob.id)}
            disabled={isApplied}
            className={`flex-1 py-3 px-6 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg ${
              isApplied
                ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/40 cursor-default'
                : 'bg-gradient-to-r from-teal-500 to-[#00d29d] text-black hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)]'
            }`}
          >
            {isApplied ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>Candidatura Enviada</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Quero essa oportunidade</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
