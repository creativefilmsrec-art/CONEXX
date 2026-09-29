import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Search,
  MapPin,
  Filter,
  Sparkles,
  ArrowRight,
  Bookmark,
  CheckCircle,
} from 'lucide-react';

export const JobsScreen: React.FC = () => {
  const { jobs, navigateTab, savedJobIds, toggleSaveJob } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Todos');
  const [selectedType, setSelectedType] = useState('Todos');

  const filteredJobs = jobs.filter((j) => {
    const matchesSearch =
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.city.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation =
      selectedLocation === 'Todos' || j.city.includes(selectedLocation);
    const matchesType =
      selectedType === 'Todos' || j.locationType === selectedType;
    return matchesSearch && matchesLocation && matchesType;
  });

  return (
    <div className="space-y-5 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Vagas de Emprego
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Oportunidades em empresas parceiras com match algorítmico do seu perfil.
        </p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
        <input
          type="text"
          placeholder="Buscar cargo, competência ou empresa..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
        />
      </div>

      {/* Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-[10px] uppercase font-bold text-slate-500 flex items-center gap-1">
          <Filter className="w-3 h-3 text-teal-400" /> Filtros:
        </span>
        {['Todos', 'Recife', 'Olinda'].map((loc) => (
          <button
            key={loc}
            onClick={() => setSelectedLocation(loc)}
            className={`px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              selectedLocation === loc
                ? 'bg-[#00d29d] text-black font-bold border-[#00d29d]'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {loc === 'Todos' ? 'Todas Cidades' : loc}
          </button>
        ))}

        {['Todos', 'Presencial', 'Híbrido', 'Remoto'].map((mod) => (
          <button
            key={mod}
            onClick={() => setSelectedType(mod)}
            className={`px-3 py-1 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              selectedType === mod
                ? 'bg-teal-500 text-black font-bold border-teal-500'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {mod === 'Todos' ? 'Todas Modalidades' : mod}
          </button>
        ))}
      </div>

      {/* Job Cards List */}
      <div className="space-y-3.5">
        {filteredJobs.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-2xl p-6">
            <Briefcase className="w-10 h-10 text-slate-600 mx-auto mb-2" />
            <p className="text-sm font-bold text-white">Nenhuma vaga encontrada</p>
            <p className="text-xs text-slate-400 mt-1">
              Tente redefinir seus filtros de busca ou localização.
            </p>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const isSaved = savedJobIds.has(job.id);
            return (
              <div
                key={job.id}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-teal-500/20 hover:border-teal-400/50 transition-all space-y-3 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={job.companyLogo}
                      alt={job.companyName}
                      className="w-12 h-12 rounded-xl object-cover border border-teal-900/60 shrink-0"
                    />
                    <div>
                      <h2
                        onClick={() => navigateTab('vaga_detalhe', { job })}
                        className="text-sm sm:text-base font-bold text-white group-hover:text-[#00d29d] transition-colors cursor-pointer"
                      >
                        {job.title}
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {job.companyName} • {job.city}
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 mt-2">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 border border-teal-800">
                          {job.locationType}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                          {job.contractType}
                        </span>
                        {job.salary && (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-900 text-emerald-400 font-semibold border border-emerald-900/40">
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-[#00d29d] border border-emerald-500/40 text-xs font-black">
                      <Sparkles className="w-3 h-3 text-[#00d29d]" /> {job.matchPercentage}% MATCH
                    </span>

                    <button
                      onClick={() => toggleSaveJob(job.id)}
                      className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                        isSaved
                          ? 'border-[#00d29d] text-[#00d29d] bg-teal-950/60'
                          : 'border-slate-800 text-slate-400 hover:text-white'
                      }`}
                      title="Salvar vaga"
                    >
                      <Bookmark className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#00d29d]' : ''}`} />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 line-clamp-2">{job.description}</p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[10px] text-slate-500">{job.publishedAt}</span>
                  <button
                    onClick={() => navigateTab('vaga_detalhe', { job })}
                    className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-gradient-to-r from-teal-500/20 to-emerald-500/20 border border-[#00d29d]/40 text-[#00d29d] hover:bg-[#00d29d] hover:text-black font-extrabold text-xs transition-all cursor-pointer"
                  >
                    <span>Ver Detalhes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
