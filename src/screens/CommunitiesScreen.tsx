import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageCircle,
  Search,
  Users,
  Sparkles,
  ArrowRight,
  Check,
  Plus,
} from 'lucide-react';

export const CommunitiesScreen: React.FC = () => {
  const {
    communities,
    joinedCommunityIds,
    toggleJoinCommunity,
    navigateTab,
    setSelectedCommunity,
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('Todas');

  const filtered = communities.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      selectedFilter === 'Todas' || c.category.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-5 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Comunidades CONEXX
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Clubes digitais setoriais para trocas contínuas, parcerias e fomento de mercado.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Buscar comunidades e hubs temáticos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
        />
      </div>

      {/* Filter Pills (Screen 14) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {['Todas', 'Marketing', 'Tecnologia', 'Profissões', 'Negócios', 'Estilo de Vida'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedFilter(cat)}
            className={`px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              selectedFilter === cat
                ? 'bg-[#00d29d] text-black font-bold border-[#00d29d]'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Communities List (Screen 14) */}
      <div className="space-y-3.5">
        {filtered.map((comm) => {
          const isJoined = joinedCommunityIds.has(comm.id);
          return (
            <div
              key={comm.id}
              className="glass-card rounded-2xl p-4 sm:p-5 border border-teal-500/20 hover:border-teal-400/50 transition-all flex items-center justify-between gap-3 group"
            >
              <div
                onClick={() => {
                  setSelectedCommunity(comm);
                  navigateTab('comunidade_detalhe', { community: comm });
                }}
                className="flex items-center gap-3.5 cursor-pointer flex-1"
              >
                <img
                  src={comm.avatar}
                  alt={comm.name}
                  className="w-13 h-13 rounded-2xl object-cover border border-teal-900/60 shrink-0 group-hover:scale-105 transition-transform"
                />
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00d29d] transition-colors">
                    {comm.name}
                  </h2>
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-0.5">
                    <Users className="w-3 h-3 text-teal-400" />
                    <span>{(comm.membersCount / 1000).toFixed(1)} mil membros</span>
                    <span>•</span>
                    <span>{comm.city}</span>
                  </p>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-1 font-normal">
                    {comm.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleJoinCommunity(comm.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    isJoined
                      ? 'bg-slate-800 text-teal-300 border border-teal-800'
                      : 'bg-teal-500/20 text-[#00d29d] border border-[#00d29d]/40 hover:bg-[#00d29d] hover:text-black'
                  }`}
                >
                  {isJoined ? 'Participando' : '+ Entrar'}
                </button>

                <button
                  onClick={() => {
                    setSelectedCommunity(comm);
                    navigateTab('comunidade_detalhe', { community: comm });
                  }}
                  className="p-2 text-slate-400 hover:text-white"
                  title="Ver comunidade"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
