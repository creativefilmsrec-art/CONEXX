import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Handshake,
  Search,
  Filter,
  Plus,
  ArrowRight,
  Building,
  CheckCircle,
  MessageSquare,
  Sparkles,
} from 'lucide-react';

export const BusinessMarketplaceScreen: React.FC = () => {
  const { businessItems, navigateTab, setIsCreateModalOpen, addToast } = useApp();

  const [activeFilter, setActiveFilter] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = businessItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.authorCompany.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      activeFilter === 'Todos' ||
      (activeFilter === 'Produtos' && item.type === 'produto') ||
      (activeFilter === 'Serviços' && item.type === 'servico') ||
      (activeFilter === 'Parcerias' && item.type === 'parceria');
    return matchesSearch && matchesFilter;
  });

  const handleContact = (itemTitle: string) => {
    addToast('Conversa iniciada sobre o produto!', undefined, 'success');
    navigateTab('mensagens');
  };

  return (
    <div className="space-y-5 pb-20">
      {/* Title & Top Action */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
            Mercado B2B & Negócios
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Compre, forneça e feche parcerias diretamente entre empresas e profissionais.
          </p>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-xs hover:opacity-95 shadow-[0_0_15px_rgba(0,210,157,0.3)] cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5 stroke-[3]" />
          <span className="hidden sm:inline">Criar Demanda</span>
        </button>
      </div>

      {/* Search Input (Screen 16) */}
      <div className="relative">
        <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Buscar produtos, serviços, contratos B2B..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
        />
      </div>

      {/* Filter Tabs (Screen 16) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {['Todos', 'Produtos', 'Serviços', 'Parcerias'].map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              activeFilter === f
                ? 'bg-[#00d29d] text-black font-bold border-[#00d29d]'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* B2B Cards List (Screen 16) */}
      <div className="space-y-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="glass-card rounded-2xl p-4 sm:p-5 border border-teal-500/20 hover:border-teal-400/50 transition-all space-y-3 group"
          >
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <img
                src={item.image}
                alt={item.title}
                className="w-full sm:w-36 h-32 rounded-xl object-cover border border-teal-900/60 shrink-0 group-hover:scale-105 transition-transform duration-300"
              />

              <div className="flex-1 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800">
                    {item.type}
                  </span>
                  <span className="text-[11px] text-slate-400">{item.city}</span>
                </div>

                <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00d29d] transition-colors">
                  {item.title}
                </h2>

                <p className="text-xs text-slate-300 line-clamp-2">{item.description}</p>

                <div className="flex items-center gap-2">
                  <img
                    src={item.authorAvatar}
                    alt={item.authorCompany}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span className="text-xs text-teal-400 font-semibold">{item.authorCompany}</span>
                </div>

                {item.price && (
                  <p className="text-sm font-black text-emerald-400">{item.price}</p>
                )}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between">
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t, i) => (
                  <span
                    key={i}
                    className="text-[10px] px-2 py-0.5 rounded bg-slate-900 text-slate-400"
                  >
                    #{t}
                  </span>
                ))}
              </div>

              <button
                onClick={() => handleContact(item.title)}
                className="px-4 py-2 rounded-xl bg-teal-950 border border-teal-500/40 text-[#00d29d] hover:bg-teal-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Negociar</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
