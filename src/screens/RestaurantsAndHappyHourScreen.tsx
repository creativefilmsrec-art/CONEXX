import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  UtensilsCrossed,
  Search,
  MapPin,
  Users,
  Star,
  CheckCircle,
  Calendar,
  Sparkles,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const RestaurantsAndHappyHourScreen: React.FC = () => {
  const { restaurants, navigateTab, addToast } = useApp();

  const [activeTab, setActiveTab] = useState<'happyhour' | 'espacos'>('happyhour');
  const [confirmedIds, setConfirmedIds] = useState<Set<string>>(new Set(['rest_bistro']));
  const [searchTerm, setSearchTerm] = useState('');

  const toggleConfirm = (id: string, name: string) => {
    setConfirmedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast('Presença cancelada', undefined, 'info');
      } else {
        next.add(id);
        addToast(`Presença confirmada no ${name}!`, '+15 pontos no CONEXX Score', 'score');
      }
      return next;
    });
  };

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-5 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Restaurantes & Happy Hour
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Conexões à mesa, drinks de networking e espaços corporativos de alto padrão.
        </p>
      </div>

      {/* Tabs Menu (Screen 20 & 21) */}
      <div className="flex border-b border-teal-900/40">
        <button
          onClick={() => setActiveTab('happyhour')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'happyhour'
              ? 'border-rose-500 text-rose-400'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Happy Hour & Networking
        </button>
        <button
          onClick={() => setActiveTab('espacos')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'espacos'
              ? 'border-[#00d29d] text-[#00d29d]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Restaurantes & Espaços B2B
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Buscar bistrôs, rooftops ou locais corporativos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
        />
      </div>

      {/* Content for Happy Hour (Screen 21) */}
      {activeTab === 'happyhour' && (
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-rose-950/40 via-slate-900 to-[#070e13] border border-rose-500/30 text-xs text-rose-200 flex items-center justify-between">
            <div>
              <p className="font-bold text-white">Próximo Encontro: Hoje às 19h</p>
              <p className="text-[11px] text-rose-300/80">Recife Antigo • Chopp artesanal & rodada de pitch</p>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-rose-500 text-white font-extrabold text-[10px]">
              Hoje
            </span>
          </div>

          {filtered.map((item) => {
            const isConfirmed = confirmedIds.has(item.id);
            return (
              <div
                key={item.id}
                className="glass-card rounded-3xl overflow-hidden border border-rose-500/20 hover:border-rose-400/50 transition-all shadow-xl group"
              >
                <div className="relative h-44 sm:h-52 w-full overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#09151c] via-[#09151c]/60 to-transparent" />

                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-rose-400 border border-rose-500/30 text-[10px] font-bold uppercase">
                      {item.type}
                    </span>
                    {item.isTonight && (
                      <span className="px-2 py-0.5 rounded-full bg-rose-500 text-white text-[10px] font-extrabold animate-pulse">
                        Acontecendo Hoje
                      </span>
                    )}
                  </div>

                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md text-amber-400 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                  </div>
                </div>

                <div className="p-4 sm:p-5 -mt-6 relative z-10 space-y-3">
                  <h2 className="text-base sm:text-lg font-bold text-white leading-snug">
                    {item.name}
                  </h2>

                  <div className="space-y-1.5 text-xs text-slate-300">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-rose-400" />
                      <span>{item.eventDate || 'Semanalmente'}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-rose-400" />
                      <span>{item.address}</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <Users className="w-3.5 h-3.5 text-rose-400" />
                      <span>
                        <strong className="text-white">{item.confirmedCount}</strong> profissionais confirmados
                      </span>
                    </div>

                    <button
                      onClick={() => toggleConfirm(item.id, item.name)}
                      className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                        isConfirmed
                          ? 'bg-rose-950 text-rose-300 border border-rose-500/50'
                          : 'bg-rose-500 hover:bg-rose-400 text-white shadow-[0_0_15px_rgba(244,63,94,0.3)]'
                      }`}
                    >
                      {isConfirmed ? 'Presença Confirmada ✓' : 'Confirmar Presença'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Content for Espaços & Restaurantes (Screen 20) */}
      {activeTab === 'espacos' && (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl p-4 sm:p-5 border border-teal-500/20 hover:border-teal-400/50 transition-all flex flex-col sm:flex-row gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full sm:w-44 h-36 rounded-xl object-cover shrink-0"
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-teal-400 px-2 py-0.5 rounded bg-teal-950">
                    {item.type}
                  </span>
                  <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    {item.rating}
                  </span>
                </div>

                <h2 className="text-sm sm:text-base font-bold text-white">{item.name}</h2>
                <p className="text-xs text-slate-300">{item.capacity}</p>
                <p className="text-xs text-slate-400 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  {item.address}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {item.perks.map((p, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-teal-300 border border-teal-900/40"
                    >
                      ✓ {p}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => addToast('Reserva / Contato B2B enviado!', undefined, 'success')}
                    className="px-4 py-2 rounded-xl bg-teal-950 border border-teal-500/40 text-teal-300 hover:bg-teal-900 font-bold text-xs"
                  >
                    Ver Mais / Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
