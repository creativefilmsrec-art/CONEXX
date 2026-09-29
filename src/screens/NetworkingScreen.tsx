import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Users,
  Search,
  Sparkles,
  UserPlus,
  Check,
  Building2,
  Calendar,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const NetworkingScreen: React.FC = () => {
  const {
    users,
    companies,
    connectedUserIds,
    toggleConnectUser,
    navigateTab,
    setSelectedUser,
    setSelectedCompany,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'pessoas' | 'empresas'>('pessoas');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter((u) => {
    return (
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.company?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const filteredCompanies = companies.filter((c) => {
    return (
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.segment.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-5 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Networking Estratégico
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Conexões sugeridas por afinidade de mercado, eventos em comum e score.
        </p>
      </div>

      {/* Tabs: Pessoas vs Empresas (Screen 13) */}
      <div className="flex border-b border-teal-900/40">
        <button
          onClick={() => setActiveTab('pessoas')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'pessoas'
              ? 'border-[#00d29d] text-[#00d29d]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Pessoas ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('empresas')}
          className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'empresas'
              ? 'border-[#00d29d] text-[#00d29d]'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Empresas ({companies.length})
        </button>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder={
            activeTab === 'pessoas'
              ? 'Buscar pessoas por cargo, nome ou empresa...'
              : 'Buscar empresas por nome ou setor...'
          }
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
        />
      </div>

      {/* List of People (Screen 13) */}
      {activeTab === 'pessoas' && (
        <div className="space-y-3.5">
          {filteredUsers.map((user) => {
            const isConnected = connectedUserIds.has(user.id);
            return (
              <div
                key={user.id}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-teal-500/20 hover:border-teal-400/50 transition-all space-y-3 group"
              >
                <div className="flex items-center justify-between gap-3">
                  <div
                    onClick={() => {
                      setSelectedUser(user);
                      navigateTab('user_detalhe', { user });
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <div className="relative">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-13 h-13 rounded-full object-cover border border-teal-500/40 group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00d29d] ring-2 ring-[#070e13]" />
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00d29d] transition-colors">
                          {user.name}
                        </h2>
                        {user.matchScore && (
                          <span className="text-[10px] px-1.5 py-0.2 rounded-md bg-emerald-500/20 text-[#00d29d] font-black border border-emerald-500/30">
                            ★ {user.matchScore}% MATCH
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-300 mt-0.5">{user.title}</p>
                      <p className="text-[11px] text-teal-400 font-semibold">{user.company} • {user.city}</p>
                    </div>
                  </div>

                  <button
                    onClick={() => toggleConnectUser(user.id)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shrink-0 ${
                      isConnected
                        ? 'bg-slate-800 text-teal-300 border border-teal-800/80'
                        : 'bg-gradient-to-r from-teal-500 to-[#00d29d] text-black hover:opacity-95 shadow-[0_0_15px_rgba(0,210,157,0.25)]'
                    }`}
                  >
                    {isConnected ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Conectado</span>
                      </>
                    ) : (
                      <>
                        <UserPlus className="w-3.5 h-3.5" />
                        <span>Conectar</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Match reasons explanation (Section 34) */}
                {user.matchReasons && user.matchReasons.length > 0 && (
                  <div className="pt-2 border-t border-slate-800/80 flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                    {user.matchReasons.map((reason, idx) => (
                      <span key={idx} className="flex items-center gap-1 text-teal-300/90">
                        <Sparkles className="w-3 h-3 text-[#00d29d]" />
                        {reason}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* List of Companies (Screen 13) */}
      {activeTab === 'empresas' && (
        <div className="space-y-3.5">
          {filteredCompanies.map((company) => (
            <div
              key={company.id}
              onClick={() => {
                setSelectedCompany(company);
                navigateTab('empresa_detalhe', { company });
              }}
              className="glass-card rounded-2xl p-4 sm:p-5 border border-teal-500/20 hover:border-teal-400/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={company.logo}
                  alt={company.name}
                  className="w-13 h-13 rounded-2xl object-cover border border-teal-900/60 shrink-0"
                />
                <div>
                  <h2 className="text-sm sm:text-base font-bold text-white group-hover:text-[#00d29d] transition-colors">
                    {company.name}
                  </h2>
                  <p className="text-xs text-slate-400">{company.segment}</p>
                  <div className="flex items-center gap-2 mt-1 text-[11px] text-teal-300">
                    <span>{company.openJobsCount} vagas abertas</span>
                    <span>•</span>
                    <span>Score {company.businessScore}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1 text-teal-400 text-xs font-bold">
                <span>Ver Perfil</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
