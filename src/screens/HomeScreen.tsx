import React from 'react';
import { useApp } from '../context/AppContext';
import { ConexxScoreRing } from '../components/common/ConexxScoreRing';
import {
  Briefcase,
  Users,
  Calendar,
  Sparkles,
  ArrowRight,
  MapPin,
  UtensilsCrossed,
  Share2,
  Heart,
  MessageCircle,
  Building,
  GraduationCap,
  Map,
  ShieldCheck,
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const {
    currentUser,
    navigateTab,
    events,
    jobs,
    feedPosts,
    toggleLikePost,
    likedPostIds,
    setSelectedJob,
    setSelectedEvent,
  } = useApp();

  const shortcuts = [
    {
      label: 'Vagas',
      icon: Briefcase,
      color: 'from-emerald-500/20 to-teal-500/10 border-teal-500/30 text-[#00d29d]',
      action: () => navigateTab('vagas'),
      count: '12 novas',
    },
    {
      label: 'Networking',
      icon: Users,
      color: 'from-blue-500/20 to-cyan-500/10 border-cyan-500/30 text-cyan-400',
      action: () => navigateTab('networking'),
      count: '24 matches',
    },
    {
      label: 'Eventos',
      icon: Calendar,
      color: 'from-purple-500/20 to-indigo-500/10 border-purple-500/30 text-purple-400',
      action: () => navigateTab('eventos'),
      count: '3 esta semana',
    },
    {
      label: 'Comunidades',
      icon: MessageCircle,
      color: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30 text-emerald-400',
      action: () => navigateTab('comunidades'),
      count: '6 hubs',
    },
    {
      label: 'Negócios B2B',
      icon: Briefcase,
      color: 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400',
      action: () => navigateTab('negocios'),
      count: 'Parcerias',
    },
    {
      label: 'Happy Hour',
      icon: UtensilsCrossed,
      color: 'from-rose-500/20 to-pink-500/10 border-rose-500/30 text-rose-400',
      action: () => navigateTab('happyhour'),
      count: 'Hoje 19h',
    },
    {
      label: 'Mapa',
      icon: Map,
      color: 'from-sky-500/20 to-blue-500/10 border-sky-500/30 text-sky-400',
      action: () => navigateTab('mapa'),
      count: 'Radar PE',
    },
    {
      label: 'Meu CONEXX',
      icon: ShieldCheck,
      color: 'from-teal-500/30 to-emerald-500/20 border-[#00d29d]/40 text-[#00d29d]',
      action: () => navigateTab('perfil'),
      count: 'Score 842',
    },
  ];

  const stories = [
    {
      id: 'st_1',
      name: 'Mariana',
      role: 'Growth HR',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
      hasUnseen: true,
      tag: 'Bastidores',
    },
    {
      id: 'st_2',
      name: 'Tech Solutions',
      role: 'Empresa',
      avatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      hasUnseen: true,
      tag: 'Vagas',
    },
    {
      id: 'st_3',
      name: 'Carlos',
      role: 'Inovação Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      hasUnseen: true,
      tag: 'Palestra',
    },
    {
      id: 'st_4',
      name: 'Bistrô Bar',
      role: 'Happy Hour',
      avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&auto=format&fit=crop&q=80',
      hasUnseen: false,
      tag: 'Encontro',
    },
    {
      id: 'st_5',
      name: 'CONEXX Talks',
      role: 'Oficial',
      avatar: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=200&auto=format&fit=crop&q=80',
      hasUnseen: false,
      tag: 'Eventos',
    },
  ];

  const featuredEvent = events[0];
  const featuredJob = jobs[0];

  return (
    <div className="space-y-6 pb-20">
      {/* 1. Header Greeting & Dynamic subtext */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
            Olá, {currentUser.name.split(' ')[0]}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Veja as melhores oportunidades para você hoje.
          </p>
        </div>
        <button
          onClick={() => navigateTab('perfil')}
          className="relative group p-0.5 rounded-full ring-2 ring-teal-500/40 hover:ring-[#00d29d] transition-all cursor-pointer"
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00d29d] ring-2 ring-[#070e13]" />
        </button>
      </div>

      {/* 2. CONEXX Score Preview Widget */}
      <ConexxScoreRing />

      {/* 3. MOMENTOS (Stories Bar - Section 13) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Momentos em Destaque
          </span>
          <button
            onClick={() => navigateTab('feed')}
            className="text-[11px] font-semibold text-[#00d29d] hover:text-white"
          >
            Ver Feed Completo &rarr;
          </button>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
          {/* Add story button */}
          <div
            onClick={() => navigateTab('feed')}
            className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-teal-500/50 group-hover:border-[#00d29d] flex items-center justify-center bg-slate-900/60 transition-all">
              <span className="text-xl font-bold text-[#00d29d]">+</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">Seu Momento</span>
          </div>

          {/* Stories list */}
          {stories.map((st) => (
            <div
              key={st.id}
              onClick={() => navigateTab('feed')}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div
                className={`relative p-0.5 rounded-full transition-all ${
                  st.hasUnseen
                    ? 'bg-gradient-to-tr from-[#00d29d] via-[#00b4d8] to-emerald-400 shadow-[0_0_12px_rgba(0,210,157,0.3)]'
                    : 'bg-slate-700'
                }`}
              >
                <img
                  src={st.avatar}
                  alt={st.name}
                  className="w-15 h-15 rounded-full object-cover ring-2 ring-[#070e13] group-hover:scale-105 transition-transform"
                />
                <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-slate-900 text-[8px] font-bold text-teal-300 border border-teal-800">
                  {st.tag}
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-300 max-w-[64px] truncate text-center">
                {st.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Quick Category Shortcuts (Section 12) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Acesso Rápido
          </span>
        </div>
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {shortcuts.map((sc, i) => {
            const Icon = sc.icon;
            return (
              <button
                key={i}
                onClick={sc.action}
                className="p-3 rounded-2xl glass-card flex flex-col items-center justify-center gap-1.5 text-center cursor-pointer transition-all hover:border-[#00d29d]/50 hover:scale-[1.02]"
              >
                <div className={`p-2.5 rounded-xl border bg-gradient-to-br ${sc.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-bold text-white tracking-tight">
                  {sc.label}
                </span>
                <span className="text-[9px] text-teal-400/80 font-medium">{sc.count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Featured Event Hero Card (Screen 7) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Eventos em Destaque
          </span>
          <button
            onClick={() => navigateTab('eventos')}
            className="text-[11px] font-semibold text-[#00d29d] hover:text-white"
          >
            Ver Todos &rarr;
          </button>
        </div>

        <div className="rounded-3xl overflow-hidden border border-teal-500/25 bg-[#09151c] relative group shadow-xl">
          <div className="relative h-44 sm:h-52 w-full overflow-hidden">
            <img
              src={featuredEvent.coverImage}
              alt={featuredEvent.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#09151c] via-[#09151c]/60 to-transparent" />

            {/* Badges on top */}
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-full bg-[#081116]/80 backdrop-blur-md border border-teal-500/30 text-[#00d29d] text-[10px] font-extrabold uppercase tracking-wider">
                {featuredEvent.category}
              </span>
              <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                Score {featuredEvent.eventScore}
              </span>
            </div>

            <div className="absolute top-3 right-3">
              <span className="px-3 py-1 rounded-full bg-[#00d29d] text-black font-extrabold text-xs">
                {featuredEvent.priceFormatted}
              </span>
            </div>
          </div>

          <div className="p-4 sm:p-5 -mt-6 relative z-10 space-y-3">
            <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
              {featuredEvent.title}
            </h3>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-teal-400" />
                <span>{featuredEvent.date} • {featuredEvent.time.split(' - ')[0]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>{featuredEvent.venue}</span>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between border-t border-teal-900/30">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  {featuredEvent.speakers.map((sp, idx) => (
                    <img
                      key={idx}
                      src={sp.avatar}
                      alt={sp.name}
                      className="w-7 h-7 rounded-full object-cover border-2 border-[#09151c]"
                    />
                  ))}
                </div>
                <span className="text-[11px] text-slate-400">
                  {featuredEvent.attendeesCount} participantes confirmados
                </span>
              </div>

              <button
                onClick={() => navigateTab('evento_detalhe', { event: featuredEvent })}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-xs hover:opacity-90 transition-all cursor-pointer shadow-[0_0_15px_rgba(0,210,157,0.3)]"
              >
                Comprar Ingresso
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 6. Top Vaga com Match Inteligente 92% (Screen 8 & 9) */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Vaga Recomendada para Você
          </span>
          <button
            onClick={() => navigateTab('vagas')}
            className="text-[11px] font-semibold text-[#00d29d] hover:text-white"
          >
            Ver Todas ({jobs.length}) &rarr;
          </button>
        </div>

        <div className="glass-card rounded-2xl p-4 sm:p-5 border border-teal-500/20 hover:border-teal-400/40 transition-all space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <img
                src={featuredJob.companyLogo}
                alt={featuredJob.companyName}
                className="w-12 h-12 rounded-xl object-cover border border-teal-900/50"
              />
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white hover:text-teal-400 transition-colors">
                  {featuredJob.title}
                </h3>
                <p className="text-xs text-slate-400">
                  {featuredJob.companyName} • {featuredJob.city}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-teal-950 text-teal-300 border border-teal-800">
                    {featuredJob.locationType}
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300">
                    {featuredJob.contractType}
                  </span>
                  <span className="text-[10px] text-slate-400">{featuredJob.publishedAt}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-[#00d29d] border border-emerald-500/40 text-xs font-black">
                <Sparkles className="w-3 h-3 text-[#00d29d]" /> {featuredJob.matchPercentage}% MATCH
              </span>
              <p className="text-[10px] text-slate-400 mt-1">{featuredJob.salary}</p>
            </div>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2">{featuredJob.description}</p>

          <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
            <span className="text-[11px] text-emerald-400 font-medium">
              ★ Compatível com suas habilidades de Growth & Marketing
            </span>
            <button
              onClick={() => navigateTab('vaga_detalhe', { job: featuredJob })}
              className="px-3.5 py-1.5 rounded-xl bg-teal-950 border border-teal-500/30 text-teal-300 hover:text-white hover:bg-teal-900 font-bold text-xs transition-all cursor-pointer"
            >
              Ver Detalhes
            </button>
          </div>
        </div>
      </div>

      {/* 7. Happy Hour & Networking de Hoje (Screen 8 & 21) */}
      <div className="rounded-2xl p-4 bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-[#070e13] border border-rose-500/30 flex items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold text-rose-400 uppercase">
            <UtensilsCrossed className="w-4 h-4" />
            <span>Hoje, às 18:30h — Recife Antigo</span>
          </div>
          <h3 className="text-sm font-bold text-white mt-1">
            CONEXX Networking + Happy Hour no Bistrô
          </h3>
          <p className="text-xs text-slate-300 mt-0.5">
            48 profissionais e empresários confirmados na sua rede.
          </p>
        </div>
        <button
          onClick={() => navigateTab('happyhour')}
          className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white font-extrabold text-xs transition-colors shrink-0 cursor-pointer shadow-[0_0_15px_rgba(244,63,94,0.3)]"
        >
          Confirmar Presença
        </button>
      </div>
    </div>
  );
};
