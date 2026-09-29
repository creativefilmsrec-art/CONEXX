import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Calendar,
  Search,
  MapPin,
  Sparkles,
  ArrowRight,
  Users,
  Ticket,
} from 'lucide-react';

export const EventsScreen: React.FC = () => {
  const { events, navigateTab, setSelectedEvent } = useApp();

  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEvents = events.filter((ev) => {
    const matchesSearch =
      ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.venue.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ev.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === 'Todos' ||
      ev.category.toLowerCase().includes(activeFilter.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-5 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Eventos & Encontros
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Palestras, workshops, rodadas de negócios e happy hours presenciais.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Buscar eventos, palestras ou locais..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
        />
      </div>

      {/* Filter Tabs (Screen 17) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {['Todos', 'Palestras', 'Cursos', 'Networking', 'Happy Hour'].map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveFilter(cat)}
            className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === cat
                ? 'bg-[#00d29d] text-black font-bold border-[#00d29d]'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Event Cards (Screen 17) */}
      <div className="space-y-4">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className="glass-card rounded-3xl overflow-hidden border border-teal-500/20 hover:border-teal-400/50 transition-all shadow-xl group"
          >
            <div className="relative h-44 sm:h-52 w-full overflow-hidden">
              <img
                src={event.coverImage}
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#09151c] via-[#09151c]/60 to-transparent" />

              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-[#081116]/80 backdrop-blur-md border border-teal-500/30 text-[#00d29d] text-[10px] font-extrabold uppercase">
                  {event.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  Score {event.eventScore}
                </span>
              </div>

              <div className="absolute top-3 right-3">
                <span className="px-3 py-1 rounded-full bg-[#00d29d] text-black font-black text-xs">
                  {event.priceFormatted}
                </span>
              </div>
            </div>

            <div className="p-4 sm:p-5 -mt-6 relative z-10 space-y-3">
              <h2
                onClick={() => {
                  setSelectedEvent(event);
                  navigateTab('evento_detalhe', { event });
                }}
                className="text-base sm:text-lg font-bold text-white group-hover:text-[#00d29d] transition-colors cursor-pointer leading-snug"
              >
                {event.title}
              </h2>

              <div className="space-y-1.5 text-xs text-slate-300">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-teal-400" />
                  <span>{event.date} • {event.time}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" />
                  <span>{event.venue} • {event.city}</span>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-teal-900/40">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    {event.speakers.map((sp, idx) => (
                      <img
                        key={idx}
                        src={sp.avatar}
                        alt={sp.name}
                        className="w-7 h-7 rounded-full object-cover border-2 border-[#09151c]"
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">
                    {event.attendeesCount} participantes
                  </span>
                </div>

                <button
                  onClick={() => {
                    setSelectedEvent(event);
                    navigateTab('evento_detalhe', { event });
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-xs hover:opacity-90 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,210,157,0.3)]"
                >
                  Comprar Ingresso
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
