import React from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  QrCode,
  Share2,
  Ticket,
  Sparkles,
  CheckCircle,
  UserPlus,
  Check,
} from 'lucide-react';

export const EventDetailScreen: React.FC = () => {
  const {
    selectedEvent,
    goBack,
    navigateTab,
    setIsCheckInModalOpen,
    checkedInEventIds,
    confirmedEventIds,
    toggleConfirmEvent,
    users,
    connectedUserIds,
    toggleConnectUser,
    addToast,
  } = useApp();

  if (!selectedEvent) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-slate-400">Evento não selecionado.</p>
        <button onClick={goBack} className="mt-3 text-xs text-teal-400 underline">
          Voltar
        </button>
      </div>
    );
  }

  const isCheckedIn = checkedInEventIds.has(selectedEvent.id);
  const isConfirmed = confirmedEventIds.has(selectedEvent.id);

  const handleShare = () => {
    addToast('Link do evento copiado com sucesso!', undefined, 'info');
  };

  return (
    <div className="space-y-6 pb-24 max-w-2xl mx-auto">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar aos Eventos</span>
        </button>

        <button
          onClick={handleShare}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Hero Cover Card (Screen 18) */}
      <div className="glass-card rounded-3xl overflow-hidden border border-teal-500/25 bg-slate-900 shadow-xl">
        <div className="h-48 sm:h-60 w-full overflow-hidden relative">
          <img
            src={selectedEvent.coverImage}
            alt={selectedEvent.title}
            className="w-full h-full object-cover filter brightness-85"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b161e] via-[#0b161e]/50 to-transparent" />

          <div className="absolute top-4 left-4 flex gap-2">
            <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#00d29d] border border-teal-500/40 text-xs font-bold uppercase">
              {selectedEvent.category}
            </span>
          </div>

          <div className="absolute top-4 right-4">
            <span className="px-3 py-1.5 rounded-full bg-[#00d29d] text-black font-black text-xs">
              {selectedEvent.priceFormatted}
            </span>
          </div>
        </div>

        <div className="p-5 sm:p-6 -mt-6 relative z-10 space-y-4">
          <h1 className="text-lg sm:text-2xl font-black text-white leading-snug">
            {selectedEvent.title}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300 pt-1">
            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <Calendar className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <p className="font-bold text-white">{selectedEvent.date}</p>
                <p className="text-[11px] text-slate-400">{selectedEvent.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              <div>
                <p className="font-bold text-white">{selectedEvent.venue}</p>
                <p className="text-[11px] text-slate-400">{selectedEvent.city}</p>
              </div>
            </div>
          </div>

          {/* Check-in digital button (Section 58) */}
          <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-[#00d29d]/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-teal-500/20 text-[#00d29d]">
                <QrCode className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Check-in Digital no Local</p>
                <p className="text-[10px] text-teal-300">
                  {isCheckedIn ? 'Presença confirmada! (+18 Score)' : 'Escanear QR Code no totem de entrada'}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCheckInModalOpen(true)}
              disabled={isCheckedIn}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isCheckedIn
                  ? 'bg-emerald-900/80 text-emerald-300 border border-emerald-500/40'
                  : 'bg-[#00d29d] text-black hover:opacity-90 shadow-[0_0_15px_rgba(0,210,157,0.3)]'
              }`}
            >
              {isCheckedIn ? 'Validado ✓' : 'Fazer Check-in'}
            </button>
          </div>
        </div>
      </div>

      {/* Sobre o Evento */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
        <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Sobre o Evento
        </h2>
        <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
          {selectedEvent.description}
        </p>
      </div>

      {/* Palestrantes */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
        <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
          Palestrantes & Anfitriões
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {selectedEvent.speakers.map((sp, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center gap-3"
            >
              <img
                src={sp.avatar}
                alt={sp.name}
                className="w-12 h-12 rounded-xl object-cover border border-teal-500/30"
              />
              <div>
                <h3 className="text-xs font-bold text-white">{sp.name}</h3>
                <p className="text-[11px] text-teal-300">{sp.role}</p>
                <p className="text-[10px] text-slate-400">{sp.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quem estará lá (Participantes - Section 29) */}
      <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Quem estará lá ({selectedEvent.attendeesCount} confirmados)
          </h2>
          <span className="text-[10px] text-slate-400 font-semibold">Networking ativo</span>
        </div>

        <div className="space-y-2.5">
          {users.slice(0, 3).map((usr) => {
            const isConn = connectedUserIds.has(usr.id);
            return (
              <div
                key={usr.id}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={usr.avatar}
                    alt={usr.name}
                    className="w-10 h-10 rounded-full object-cover border border-teal-500/30"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-white">{usr.name}</h3>
                    <p className="text-[10px] text-slate-400">{usr.title} • {usr.company}</p>
                    <span className="text-[9px] text-[#00d29d] font-bold">
                      CONEXX Score {usr.conexxScore.total}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleConnectUser(usr.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isConn
                      ? 'bg-slate-800 text-teal-300 border border-teal-800'
                      : 'bg-teal-500/20 text-[#00d29d] border border-[#00d29d]/40 hover:bg-[#00d29d] hover:text-black'
                  }`}
                >
                  {isConn ? 'Conectado' : '+ Conectar'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-16 left-0 right-0 z-30 p-3 bg-[#081218]/90 backdrop-blur-md border-t border-teal-900/40">
        <div className="max-w-md mx-auto flex items-center justify-between gap-4">
          <div>
            <span className="text-[10px] text-slate-400 uppercase font-bold block">Valor do Ingresso</span>
            <span className="text-lg font-black text-white">{selectedEvent.priceFormatted}</span>
          </div>

          <button
            onClick={() => navigateTab('checkout')}
            className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)] transition-all cursor-pointer"
          >
            <Ticket className="w-4 h-4 stroke-[2.5]" />
            <span>Comprar Ingresso</span>
          </button>
        </div>
      </div>
    </div>
  );
};
