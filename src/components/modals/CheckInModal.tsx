import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  QrCode,
  CheckCircle2,
  Sparkles,
  MapPin,
  Calendar,
  Users,
} from 'lucide-react';

export const CheckInModal: React.FC = () => {
  const { isCheckInModalOpen, setIsCheckInModalOpen, selectedEvent, checkInToEvent, currentUser } = useApp();
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);

  if (!isCheckInModalOpen || !selectedEvent) return null;

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setHasScanned(true);
      checkInToEvent(selectedEvent.id);
    }, 1400);
  };

  const handleClose = () => {
    setHasScanned(false);
    setIsScanning(false);
    setIsCheckInModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0b161e] border border-teal-500/30 rounded-3xl shadow-2xl overflow-hidden text-center p-6">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!hasScanned ? (
          <div>
            <div className="w-14 h-14 mx-auto rounded-2xl bg-teal-500/10 border border-teal-500/30 text-[#00d29d] flex items-center justify-center mb-4">
              <QrCode className="w-7 h-7" />
            </div>

            <h2 className="text-lg font-bold text-white">Check-in Digital do Evento</h2>
            <p className="text-xs text-slate-400 mt-1 mb-4">
              Valide sua presença física para desbloquear conexões e pontuação no ecossistema
            </p>

            {/* Event Summary Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-teal-900/40 text-left mb-5">
              <p className="text-xs font-bold text-teal-400 uppercase tracking-wide">
                {selectedEvent.category}
              </p>
              <h3 className="text-sm font-bold text-white mt-0.5">{selectedEvent.title}</h3>
              <div className="mt-2 space-y-1 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>{selectedEvent.date} • {selectedEvent.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>{selectedEvent.venue}</span>
                </div>
              </div>
            </div>

            {/* QR Scanner Simulation Area */}
            <div className="relative w-48 h-48 mx-auto rounded-2xl bg-slate-950 border-2 border-dashed border-teal-500/50 flex flex-col items-center justify-center p-4 overflow-hidden mb-6">
              {isScanning ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-[#00d29d] shadow-[0_0_12px_#00d29d] animate-bounce" />
                  <div className="text-center">
                    <QrCode className="w-20 h-20 text-teal-400/40 mx-auto animate-pulse" />
                    <span className="text-[11px] text-[#00d29d] font-semibold block mt-2">
                      Validando QR Code...
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-center">
                  <QrCode className="w-24 h-24 text-teal-400/60 mx-auto" />
                  <span className="text-[10px] text-slate-400 block mt-2">
                    Aponte para o totem de entrada
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleScan}
              disabled={isScanning}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,210,157,0.3)] disabled:opacity-50"
            >
              <QrCode className="w-4 h-4" />
              <span>{isScanning ? 'Lendo credencial...' : 'Simular Escanear QR Code'}</span>
            </button>
          </div>
        ) : (
          /* Success Animation */
          <div className="animate-in zoom-in-95 duration-300 py-4">
            <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mb-4 shadow-[0_0_25px_rgba(52,211,153,0.4)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-xl font-black text-white">Check-in Realizado com Sucesso!</h2>
            <p className="text-xs text-slate-300 mt-1">
              Sua presença foi confirmada em {selectedEvent.title}.
            </p>

            <div className="my-5 p-4 rounded-2xl bg-teal-950/60 border border-[#00d29d]/40 text-left space-y-2">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#00d29d]" /> CONEXX SCORE
                </span>
                <span className="text-[#00d29d] bg-teal-900/60 px-2 py-0.5 rounded text-sm font-extrabold">
                  +18 Pontos
                </span>
              </div>
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-cyan-400" /> Networking Desbloqueado
                </span>
                <span className="text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded text-sm font-extrabold">
                  +12 Conexões
                </span>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mb-6">
              Veja agora quem está no evento na aba &ldquo;Quem estará lá&rdquo; para iniciar conexões presenciais.
            </p>

            <button
              onClick={handleClose}
              className="w-full py-3 rounded-xl bg-[#00d29d] text-black font-extrabold text-sm hover:opacity-95 transition-all cursor-pointer"
            >
              Concluir e Ver Participantes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
