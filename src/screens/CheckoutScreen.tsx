import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Calendar,
  Ticket,
  CheckCircle,
  Tag,
  CreditCard,
  QrCode,
  ShieldCheck,
} from 'lucide-react';

export const CheckoutScreen: React.FC = () => {
  const { selectedEvent, goBack, navigateTab, addToast, toggleConfirmEvent } = useApp();

  const [qtyLote1, setQtyLote1] = useState(1);
  const [qtyLote2, setQtyLote2] = useState(0);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'cartao' | 'boleto'>('pix');
  const [isCompleted, setIsCompleted] = useState(false);

  const priceLote1 = selectedEvent ? selectedEvent.price : 60;
  const priceLote2 = 80;

  const subtotal = qtyLote1 * priceLote1 + qtyLote2 * priceLote2;
  const total = Math.max(subtotal - discount, 0);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (coupon.toUpperCase() === 'CONEXX10' || coupon.toUpperCase() === 'RECIFE') {
      setDiscount(15);
      addToast('Cupom aplicado com sucesso!', 'Desconto de R$ 15,00', 'success');
    } else {
      addToast('Cupom inválido', 'Tente CONEXX10', 'info');
    }
  };

  const handleFinalize = () => {
    if (selectedEvent) {
      toggleConfirmEvent(selectedEvent.id);
    }
    setIsCompleted(true);
    addToast('Compra realizada com sucesso!', 'Ingresso gerado e salvo em Meu CONEXX.', 'success');
  };

  return (
    <div className="space-y-6 pb-24 max-w-md mx-auto">
      {/* Top Nav */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar ao Evento</span>
        </button>
        <span className="text-xs font-bold text-teal-400">Checkout Seguro</span>
      </div>

      {isCompleted ? (
        <div className="glass-card rounded-3xl p-6 border border-emerald-500/40 text-center space-y-4 animate-in zoom-in-95 duration-300">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(52,211,153,0.3)]">
            <CheckCircle className="w-8 h-8" />
          </div>

          <h2 className="text-xl font-black text-white">Ingresso Confirmado!</h2>
          <p className="text-xs text-slate-300">
            Você garantiu seu acesso em {selectedEvent?.title}.
          </p>

          <div className="p-4 rounded-2xl bg-slate-900 border border-teal-500/30 text-left space-y-2 text-xs">
            <p className="text-slate-400">
              Titular: <strong className="text-white">Juliana Santos</strong>
            </p>
            <p className="text-slate-400">
              Local: <strong className="text-white">{selectedEvent?.venue}</strong>
            </p>
            <p className="text-slate-400">
              Data: <strong className="text-white">{selectedEvent?.date} • {selectedEvent?.time}</strong>
            </p>
            <p className="text-slate-400">
              Total Pago: <strong className="text-emerald-400">R$ {total.toFixed(2)}</strong>
            </p>
          </div>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => navigateTab('home')}
              className="w-full py-3 rounded-xl bg-[#00d29d] text-black font-extrabold text-xs"
            >
              Ir para a Página Inicial
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Event Header (Screen 19) */}
          <div className="glass-card rounded-2xl p-4 border border-teal-500/20">
            <span className="text-[10px] font-extrabold uppercase text-teal-400 block mb-1">
              Ingresso
            </span>
            <h2 className="text-sm font-bold text-white leading-snug">
              {selectedEvent?.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {selectedEvent?.date} • {selectedEvent?.time} | {selectedEvent?.venue}
            </p>
          </div>

          {/* Lotes / Tiers Selection (Screen 19) */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Selecione os Ingressos
            </h3>

            {/* Lote 1 */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-teal-900/40 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-white">Lote 1 — Primeiro lote</p>
                <p className="text-xs font-extrabold text-[#00d29d]">R$ {priceLote1.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQtyLote1(Math.max(0, qtyLote1 - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold text-sm hover:bg-slate-700"
                >
                  -
                </button>
                <span className="text-xs font-bold text-white w-4 text-center">{qtyLote1}</span>
                <button
                  type="button"
                  onClick={() => setQtyLote1(qtyLote1 + 1)}
                  className="w-7 h-7 rounded-lg bg-teal-500 text-black font-bold text-sm hover:bg-teal-400"
                >
                  +
                </button>
              </div>
            </div>

            {/* Lote 2 */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between opacity-80">
              <div>
                <p className="text-xs font-bold text-white">Lote 2 — Segundo lote</p>
                <p className="text-xs font-extrabold text-slate-300">R$ {priceLote2.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQtyLote2(Math.max(0, qtyLote2 - 1))}
                  className="w-7 h-7 rounded-lg bg-slate-800 text-white font-bold text-sm hover:bg-slate-700"
                >
                  -
                </button>
                <span className="text-xs font-bold text-white w-4 text-center">{qtyLote2}</span>
                <button
                  type="button"
                  onClick={() => setQtyLote2(qtyLote2 + 1)}
                  className="w-7 h-7 rounded-lg bg-teal-500 text-black font-bold text-sm hover:bg-teal-400"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Cupom de Desconto (Screen 19) */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <input
              type="text"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Cupom de desconto (ex: CONEXX10)"
              className="flex-1 px-3.5 py-2 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white uppercase placeholder:normal-case focus:outline-none focus:border-[#00d29d]"
            />
            <button
              type="submit"
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-teal-300 text-xs font-bold transition-colors cursor-pointer"
            >
              Aplicar
            </button>
          </form>

          {/* Método de Pagamento */}
          <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-2.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Forma de Pagamento
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'pix', label: 'PIX Instantâneo', icon: QrCode },
                { id: 'cartao', label: 'Cartão de Crédito', icon: CreditCard },
                { id: 'boleto', label: 'Boleto', icon: Ticket },
              ].map((m) => {
                const Icon = m.icon;
                const isSel = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id as any)}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1 text-center transition-all cursor-pointer ${
                      isSel
                        ? 'bg-teal-950 border-[#00d29d] text-[#00d29d] ring-1 ring-[#00d29d]'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[10px] font-bold">{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Total & Summary (Screen 19) */}
          <div className="glass-card rounded-2xl p-4 border border-teal-500/20 space-y-2">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Subtotal</span>
              <span>R$ {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400 font-bold">
                <span>Desconto Cupom</span>
                <span>- R$ {discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-slate-800">
              <span>Total</span>
              <span className="text-lg text-[#00d29d]">R$ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* Finalize Button */}
          <button
            onClick={handleFinalize}
            disabled={total === 0 && subtotal === 0}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)] transition-all cursor-pointer disabled:opacity-50"
          >
            Finalizar Compra
          </button>
        </div>
      )}
    </div>
  );
};
