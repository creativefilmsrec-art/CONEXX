import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Briefcase,
  Users,
  Compass,
  Plus,
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { mainTab, navigateTab, setIsCreateModalOpen, currentUser } = useApp();

  const isTabActive = (tabName: string) => {
    if (tabName === 'home' && (mainTab === 'home' || mainTab === 'feed')) return true;
    if (tabName === 'vagas' && (mainTab === 'vagas' || mainTab === 'vaga_detalhe')) return true;
    if (tabName === 'networking' && (mainTab === 'networking' || mainTab === 'user_detalhe')) return true;
    if (tabName === 'perfil' && (mainTab === 'perfil' || mainTab === 'meu_conexx' || mainTab === 'configuracoes')) return true;
    if (tabName === 'explorar' && (mainTab === 'eventos' || mainTab === 'comunidades' || mainTab === 'negocios' || mainTab === 'happyhour' || mainTab === 'mapa')) return true;
    return false;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#070e13]/95 backdrop-blur-lg border-t border-teal-950/60 pb-safe">
      <div className="max-w-md md:max-w-xl mx-auto px-4 h-16 flex items-center justify-between relative">
        {/* Início */}
        <button
          onClick={() => navigateTab('home')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors cursor-pointer ${
            isTabActive('home') ? 'text-[#00d29d]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide">Início</span>
        </button>

        {/* Vagas */}
        <button
          onClick={() => navigateTab('vagas')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors cursor-pointer ${
            isTabActive('vagas') ? 'text-[#00d29d]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Briefcase className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide">Vagas</span>
        </button>

        {/* Central Prominent (+) Button */}
        <div className="flex-1 flex justify-center -translate-y-3">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#00b4d8] to-[#00d29d] text-black font-bold flex items-center justify-center shadow-[0_0_20px_rgba(0,210,157,0.5)] hover:scale-105 active:scale-95 transition-transform cursor-pointer border-2 border-[#070e13]"
            title="Criar Oportunidade / Post"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* Conexões / Networking */}
        <button
          onClick={() => navigateTab('networking')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors cursor-pointer ${
            isTabActive('networking') ? 'text-[#00d29d]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px] font-semibold tracking-wide">Conexões</span>
        </button>

        {/* Perfil */}
        <button
          onClick={() => navigateTab('perfil')}
          className={`flex flex-col items-center justify-center gap-1 flex-1 py-1 transition-colors cursor-pointer ${
            isTabActive('perfil') ? 'text-[#00d29d]' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className={`w-6 h-6 rounded-full object-cover border ${
                isTabActive('perfil') ? 'border-[#00d29d] ring-2 ring-[#00d29d]/30' : 'border-slate-600'
              }`}
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#00d29d]" />
          </div>
          <span className="text-[10px] font-semibold tracking-wide">Perfil</span>
        </button>
      </div>
    </nav>
  );
};
