import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Bell,
  Briefcase,
  Calendar,
  Users,
  MessageSquare,
  Sparkles,
  Check,
} from 'lucide-react';

export const NotificationsScreen: React.FC = () => {
  const { notifications, markNotificationAsRead, navigateTab } = useApp();
  const [activeFilter, setActiveFilter] = useState<'todas' | 'vagas' | 'eventos' | 'mensagens'>('todas');

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'todas') return true;
    if (activeFilter === 'vagas') return n.type === 'vaga';
    if (activeFilter === 'eventos') return n.type === 'evento';
    if (activeFilter === 'mensagens') return n.type === 'mensagem';
    return true;
  });

  const getIcon = (type: string) => {
    switch (type) {
      case 'vaga':
        return <Briefcase className="w-4 h-4 text-emerald-400" />;
      case 'evento':
        return <Calendar className="w-4 h-4 text-purple-400" />;
      case 'conexao':
        return <Users className="w-4 h-4 text-cyan-400" />;
      case 'mensagem':
        return <MessageSquare className="w-4 h-4 text-blue-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-[#00d29d]" />;
    }
  };

  const handleClick = (notif: any) => {
    markNotificationAsRead(notif.id);
    if (notif.type === 'vaga') {
      navigateTab('vagas');
    } else if (notif.type === 'evento') {
      navigateTab('eventos');
    } else if (notif.type === 'mensagem') {
      navigateTab('mensagens');
    } else if (notif.type === 'score') {
      navigateTab('meu_conexx');
    }
  };

  return (
    <div className="space-y-5 pb-20 max-w-2xl mx-auto">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Notificações
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Atualizações em tempo real sobre vagas, eventos e conexões.
        </p>
      </div>

      {/* Tabs Menu (Screen 23) */}
      <div className="flex border-b border-teal-900/40">
        {[
          { id: 'todas', label: 'Todas' },
          { id: 'vagas', label: 'Vagas' },
          { id: 'eventos', label: 'Eventos' },
          { id: 'mensagens', label: 'Mensagens' },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveFilter(t.id as any)}
            className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
              activeFilter === t.id
                ? 'border-[#00d29d] text-[#00d29d]'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Notifications List (Screen 23) */}
      <div className="space-y-2.5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => handleClick(item)}
            className={`glass-card rounded-2xl p-4 border transition-all cursor-pointer flex items-center justify-between gap-3 ${
              item.unread
                ? 'border-teal-500/40 bg-[#0c1c24]/90 shadow-md'
                : 'border-slate-800/80 bg-slate-900/40 opacity-75'
            }`}
          >
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 shrink-0">
                {getIcon(item.type)}
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-white">{item.title}</h3>
                  {item.unread && (
                    <span className="w-2 h-2 rounded-full bg-[#00d29d]" />
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-0.5">{item.description}</p>
                <span className="text-[10px] text-slate-500 mt-1 block">{item.time}</span>
              </div>
            </div>

            {item.avatar && (
              <img
                src={item.avatar}
                alt="Origem"
                className="w-10 h-10 rounded-xl object-cover border border-teal-900/60 shrink-0"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
