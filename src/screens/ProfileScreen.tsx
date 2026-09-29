import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ConexxScoreRing } from '../components/common/ConexxScoreRing';
import {
  Settings,
  Share2,
  Edit3,
  MapPin,
  Building,
  Briefcase,
  GraduationCap,
  Award,
  Sparkles,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle,
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { currentUser, navigateTab, setIsScoreModalOpen, addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'sobre' | 'experiencia' | 'atividades'>('sobre');

  const handleShare = () => {
    addToast('Link do seu perfil CONEXX copiado!', undefined, 'info');
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      {/* Cover & Avatar Header */}
      <div className="relative rounded-3xl overflow-hidden border border-teal-500/20 bg-slate-900 shadow-xl">
        <div className="h-32 sm:h-40 w-full overflow-hidden relative">
          <img
            src={currentUser.coverImage}
            alt="Capa"
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b161e] via-transparent to-transparent" />

          {/* Action buttons on top of cover */}
          <div className="absolute top-3 right-3 flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
              title="Compartilhar perfil"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTab('configuracoes')}
              className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white hover:bg-black/80 transition-colors"
              title="Configurações"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Profile Card Body */}
        <div className="px-5 pb-5 -mt-12 sm:-mt-14 relative z-10">
          <div className="flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-3 text-center sm:text-left">
              <div className="relative">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover border-4 border-[#0b161e] shadow-xl"
                />
                <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#00d29d] ring-4 ring-[#0b161e]" />
              </div>
              <div className="mt-2 sm:mt-0">
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-black text-white">{currentUser.name}</h1>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-[#00d29d] text-[10px] font-extrabold border border-emerald-500/30">
                    Destaque
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-teal-300 font-semibold">{currentUser.title}</p>
                <p className="text-xs text-slate-400 flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-slate-500" />
                  <span>{currentUser.city}</span>
                  <span>•</span>
                  <span>{currentUser.company}</span>
                </p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => addToast('Edição de perfil habilitada!', undefined, 'info')}
                className="px-4 py-2 rounded-xl bg-teal-950 border border-teal-500/40 text-teal-300 hover:bg-teal-900 font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Editar Perfil</span>
              </button>
            </div>
          </div>

          {/* Metrics bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 mt-4 border-t border-slate-800/80 text-center">
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-base font-extrabold text-white block">
                {currentUser.connectionsCount}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Conexões</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-base font-extrabold text-white block">
                {currentUser.profileViews}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Visualizações</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-base font-extrabold text-[#00d29d] block">
                {currentUser.conexxScore.total}
              </span>
              <span className="text-[10px] uppercase font-bold text-slate-400">CONEXX Score</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-900/50 border border-slate-800/60">
              <span className="text-base font-extrabold text-teal-400 block">+57</span>
              <span className="text-[10px] uppercase font-bold text-slate-400">Crescimento Mês</span>
            </div>
          </div>
        </div>
      </div>

      {/* CONEXX Score Highlight Widget */}
      <ConexxScoreRing />

      {/* Tabs Menu */}
      <div className="flex border-b border-teal-900/40">
        {[
          { id: 'sobre', label: 'Sobre mim' },
          { id: 'experiencia', label: 'Experiência & Formação' },
          { id: 'atividades', label: 'Timeline & Conquistas' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === t.id
                ? 'border-[#00d29d] text-[#00d29d]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Sobre mim */}
      {activeTab === 'sobre' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Bio Profissional
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {currentUser.bio}
            </p>
          </div>

          {/* Competências */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Competências & Habilidades
            </h2>
            <div className="flex flex-wrap gap-2">
              {currentUser.skills.map((sk, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-xl bg-teal-950/80 border border-teal-800 text-teal-300 text-xs font-semibold"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

          {/* Badges / Selos */}
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2.5">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Selos no Ecossistema
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {currentUser.badges.map((bg, i) => (
                <div
                  key={i}
                  className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center gap-2 text-xs font-bold text-white"
                >
                  <Award className="w-4 h-4 text-[#00d29d] shrink-0" />
                  <span className="text-[11px]">{bg}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Experiência & Educação */}
      {activeTab === 'experiencia' && (
        <div className="space-y-4">
          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <Briefcase className="w-4 h-4" /> Experiência
            </h2>
            <div className="space-y-4">
              {currentUser.experiences.map((exp, i) => (
                <div key={i} className="border-l-2 border-teal-500/40 pl-3.5 space-y-1">
                  <h3 className="text-sm font-bold text-white">{exp.role}</h3>
                  <p className="text-xs text-teal-400 font-semibold">{exp.company}</p>
                  <span className="text-[10px] text-slate-400 block">{exp.period}</span>
                  <p className="text-xs text-slate-300 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" /> Formação & Certificações
            </h2>
            <div className="space-y-3">
              {currentUser.education.map((edu, i) => (
                <div key={i} className="border-l-2 border-cyan-500/40 pl-3.5 space-y-0.5">
                  <h3 className="text-xs font-bold text-white">{edu.course}</h3>
                  <p className="text-xs text-slate-400">{edu.institution}</p>
                  <span className="text-[10px] text-slate-500">{edu.period}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Timeline & Atividades CONEXX */}
      {activeTab === 'atividades' && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Timeline de Atividades Recentes
          </h2>
          <div className="space-y-3 text-xs text-slate-300">
            {[
              {
                text: 'Participou da Palestra: Inovação e Negócios no Hotel Atlântico',
                time: 'Há 2 dias',
                score: '+18 Score',
              },
              {
                text: 'Conectou-se com Carlos Mendes (CEO @ Inovação Tech)',
                time: 'Há 4 dias',
                score: '+10 Score',
              },
              {
                text: 'Entrou na comunidade Marketing Digital & Growth',
                time: 'Há 1 semana',
                score: '+8 Score',
              },
              {
                text: 'Check-in confirmado no CONEXX Night Recife',
                time: 'Há 2 semanas',
                score: '+18 Score',
              },
            ].map((act, i) => (
              <div
                key={i}
                className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <p className="font-semibold text-white">{act.text}</p>
                  <span className="text-[10px] text-slate-500">{act.time}</span>
                </div>
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-teal-950 text-[#00d29d] border border-teal-800 shrink-0">
                  {act.score}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
