import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertTriangle, ShieldAlert, Check } from 'lucide-react';

export const ReportModal: React.FC = () => {
  const { isReportModalOpen, setIsReportModalOpen, reportTarget, addToast } = useApp();
  const [reason, setReason] = useState('spam');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isReportModalOpen) return null;

  const reasons = [
    { id: 'spam', label: 'Spam ou Mensagens em Massa' },
    { id: 'inapropriado', label: 'Conteúdo Impróprio / Ofensivo' },
    { id: 'assedio', label: 'Assédio ou Comportamento Inadequado' },
    { id: 'fraude', label: 'Golpe, Vaga Falsa ou Fraude' },
    { id: 'outro', label: 'Outro motivo' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      addToast('Denúncia enviada à moderação', 'Nossa equipe revisará o caso em até 2 horas.', 'info');
      setSubmitted(false);
      setDetails('');
      setIsReportModalOpen(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0b161e] border border-red-500/30 rounded-3xl shadow-2xl overflow-hidden p-6">
        <button
          onClick={() => setIsReportModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-4 text-red-400">
          <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-white">Denunciar Conteúdo</h2>
            <p className="text-xs text-slate-400">
              {reportTarget ? `${reportTarget.type}: ${reportTarget.title}` : 'Segurança do Ecossistema'}
            </p>
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
              <Check className="w-6 h-6" />
            </div>
            <p className="text-sm font-bold text-white">Denúncia Registrada</p>
            <p className="text-xs text-slate-400 mt-1">Obrigado por manter o ecossistema seguro.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-2">
                Motivo da denúncia
              </label>
              <div className="space-y-1.5">
                {reasons.map((r) => (
                  <label
                    key={r.id}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                      reason === r.id
                        ? 'bg-red-950/40 border-red-500/60 text-white ring-1 ring-red-500/40'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span>{r.label}</span>
                    <input
                      type="radio"
                      name="reportReason"
                      checked={reason === r.id}
                      onChange={() => setReason(r.id)}
                      className="accent-red-500"
                    />
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Detalhes adicionais (opcional)
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Forneça mais contexto sobre a infração..."
                className="w-full p-2.5 text-xs bg-slate-900 border border-slate-700 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="pt-2 flex gap-2">
              <button
                type="button"
                onClick={() => setIsReportModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl border border-slate-700 text-xs font-semibold text-slate-300 hover:bg-slate-800"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs transition-colors cursor-pointer"
              >
                Enviar Denúncia
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
