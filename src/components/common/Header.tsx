import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Logo } from './Logo';
import {
  Search,
  Bell,
  MessageSquare,
  Sparkles,
  Smartphone,
  Maximize2,
  Shield,
  X,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    navigateTab,
    mainTab,
    unreadNotifsCount,
    searchQuery,
    setSearchQuery,
    setIsAIModalOpen,
    viewMode,
    setViewMode,
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-teal-900/30 bg-[#081116]/90 backdrop-blur-md transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Logo */}
        <button
          onClick={() => navigateTab('home')}
          className="cursor-pointer text-left hover:opacity-90 transition-opacity focus:outline-none"
        >
          <Logo size="md" showTagline={false} />
        </button>

        {/* Center: Search Bar (Desktop / Expanded) */}
        <div className="hidden md:flex flex-1 max-w-md items-center relative">
          <Search className="w-4 h-4 text-teal-400/80 absolute left-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Buscar vagas, pessoas, empresas, eventos, cursos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-9 py-1.5 text-xs sm:text-sm bg-slate-900/80 border border-teal-900/40 rounded-full text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#00d29d] focus:ring-1 focus:ring-[#00d29d] transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Mobile Search Toggle */}
          <button
            onClick={() => setIsSearchOpen(!isSearchOpen)}
            className="md:hidden p-2 rounded-full text-slate-300 hover:bg-slate-800/60 hover:text-[#00d29d] transition-colors"
            title="Buscar"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* CONEXX AI Button */}
          <button
            onClick={() => setIsAIModalOpen(true)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-[#00d29d]/40 text-[#00d29d] hover:bg-[#00d29d]/25 transition-all text-xs font-semibold cursor-pointer shadow-[0_0_15px_rgba(0,210,157,0.2)]"
            title="Assistente CONEXX AI"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#00d29d]" />
            <span className="hidden sm:inline">CONEXX AI</span>
          </button>

          {/* Messages */}
          <button
            onClick={() => navigateTab('mensagens')}
            className={`p-2 rounded-full relative transition-colors cursor-pointer ${
              mainTab === 'mensagens'
                ? 'text-[#00d29d] bg-teal-950/60'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-[#00d29d]'
            }`}
            title="Mensagens"
          >
            <MessageSquare className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#00d29d] ring-2 ring-[#081116]" />
          </button>

          {/* Notifications */}
          <button
            onClick={() => navigateTab('notificacoes')}
            className={`p-2 rounded-full relative transition-colors cursor-pointer ${
              mainTab === 'notificacoes'
                ? 'text-[#00d29d] bg-teal-950/60'
                : 'text-slate-300 hover:bg-slate-800/60 hover:text-[#00d29d]'
            }`}
            title="Notificações"
          >
            <Bell className="w-4 h-4" />
            {unreadNotifsCount > 0 && (
              <span className="absolute top-1 right-1 px-1 min-w-[14px] h-[14px] rounded-full bg-emerald-500 text-[9px] font-bold text-black flex items-center justify-center">
                {unreadNotifsCount}
              </span>
            )}
          </button>

          {/* View Mode Toggle (Mobile Artboard vs Fluid Desktop) */}
          <button
            onClick={() => setViewMode(viewMode === 'mobile' ? 'fluid' : 'mobile')}
            className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-lg border border-slate-700/60 bg-slate-800/50 text-[11px] font-medium text-slate-300 hover:text-white hover:border-teal-500/40 transition-colors"
            title={viewMode === 'mobile' ? 'Expandir para tela cheia' : 'Visualizar como Smartphone'}
          >
            {viewMode === 'mobile' ? (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-teal-400" />
                <span>Modo Expandido</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-teal-400" />
                <span>Modo Mobile</span>
              </>
            )}
          </button>

          {/* Admin Dashboard shortcut */}
          <button
            onClick={() => navigateTab('admin')}
            className={`p-2 rounded-full text-slate-400 hover:text-amber-400 hover:bg-slate-800/60 transition-colors ${
              mainTab === 'admin' ? 'text-amber-400 bg-amber-950/40' : ''
            }`}
            title="Painel Administrativo"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Expandable Mobile Search Bar */}
      {isSearchOpen && (
        <div className="md:hidden px-3 pb-3 pt-1 border-t border-teal-900/20 bg-[#081116]">
          <div className="relative">
            <Search className="w-4 h-4 text-teal-400/80 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Buscar vagas, pessoas, eventos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-9 py-2 text-sm bg-slate-900 border border-teal-900/50 rounded-xl text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-[#00d29d]"
              autoFocus
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
