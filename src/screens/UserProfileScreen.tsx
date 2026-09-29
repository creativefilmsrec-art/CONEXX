import React from 'react';
import { useApp } from '../context/AppContext';
import { ConexxScoreRing } from '../components/common/ConexxScoreRing';
import {
  ArrowLeft,
  MapPin,
  Building,
  UserPlus,
  Check,
  MessageSquare,
  Share2,
  Calendar,
  Sparkles,
  Award,
  Users,
} from 'lucide-react';

export const UserProfileScreen: React.FC = () => {
  const {
    selectedUser,
    goBack,
    navigateTab,
    connectedUserIds,
    toggleConnectUser,
    addToast,
    currentUser,
  } = useApp();

  if (!selectedUser) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-slate-400">Usuário não encontrado.</p>
        <button onClick={goBack} className="mt-3 text-xs text-teal-400 underline">
          Voltar
        </button>
      </div>
    );
  }

  const isConnected = connectedUserIds.has(selectedUser.id);

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Networking</span>
        </button>

        <button
          onClick={() => addToast('Link do perfil copiado!', undefined, 'info')}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Header Info Card */}
      <div className="glass-card rounded-3xl p-5 sm:p-6 border border-teal-500/25 space-y-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="relative">
            <img
              src={selectedUser.avatar}
              alt={selectedUser.name}
              className="w-24 h-24 rounded-3xl object-cover border-2 border-teal-500/50 shadow-xl"
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#00d29d] ring-2 ring-[#070e13]" />
          </div>

          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-xl font-black text-white">{selectedUser.name}</h1>
                <p className="text-xs sm:text-sm text-teal-300 font-semibold">{selectedUser.title}</p>
                <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <Building className="w-3 h-3 text-slate-500" />
                  <span>{selectedUser.company}</span>
                  <span>•</span>
                  <span>{selectedUser.city}</span>
                </p>
              </div>

              {selectedUser.matchScore && (
                <span className="self-center sm:self-start px-3 py-1 rounded-full bg-emerald-500/20 text-[#00d29d] border border-emerald-500/40 text-xs font-black">
                  ★ {selectedUser.matchScore}% MATCH
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-4">
              <button
                onClick={() => toggleConnectUser(selectedUser.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                  isConnected
                    ? 'bg-slate-800 text-teal-300 border border-teal-800'
                    : 'bg-gradient-to-r from-teal-500 to-[#00d29d] text-black shadow-[0_0_15px_rgba(0,210,157,0.3)]'
                }`}
              >
                {isConnected ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Conectado</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Conectar</span>
                  </>
                )}
              </button>

              <button
                onClick={() => navigateTab('mensagens', { chatId: 'chat_mariana' })}
                className="px-4 py-2 rounded-xl bg-teal-950 border border-teal-500/40 text-[#00d29d] hover:bg-teal-900 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Mensagem</span>
              </button>

              <button
                onClick={() => addToast('Convite para o Happy Hour enviado!', undefined, 'success')}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                <span>Convidar para Evento</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-800/80 text-center">
          <div className="p-2 rounded-xl bg-slate-900/40">
            <span className="text-sm font-bold text-white block">{selectedUser.connectionsCount}</span>
            <span className="text-[10px] text-slate-400 uppercase">Conexões</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/40">
            <span className="text-sm font-bold text-teal-400 block">{selectedUser.mutualConnections || 8}</span>
            <span className="text-[10px] text-slate-400 uppercase">Em Comum</span>
          </div>
          <div className="p-2 rounded-xl bg-slate-900/40 border border-teal-500/30">
            <span className="text-sm font-bold text-[#00d29d] block">{selectedUser.conexxScore.total}</span>
            <span className="text-[10px] text-teal-400 uppercase">Score</span>
          </div>
        </div>
      </div>

      {/* Score Ring Widget */}
      <ConexxScoreRing
        score={selectedUser.conexxScore.total}
        monthlyGrowth={selectedUser.conexxScore.monthlyGrowth}
        level={selectedUser.conexxScore.level}
        showDetailsButton={false}
      />

      {/* Bio */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Sobre
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
          {selectedUser.bio}
        </p>
      </div>

      {/* Skills */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2.5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Competências & Áreas de Atuação
        </h2>
        <div className="flex flex-wrap gap-2">
          {selectedUser.skills.map((sk, i) => (
            <span
              key={i}
              className="px-3 py-1 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-semibold"
            >
              {sk}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
