import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  User,
  Bell,
  Lock,
  Shield,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Eye,
  Check,
} from 'lucide-react';

export const SettingsScreen: React.FC = () => {
  const { goBack, navigateTab, setScreen, addToast } = useApp();

  const [showScorePublic, setShowScorePublic] = useState(true);
  const [profilePublic, setProfilePublic] = useState(true);
  const [notifVagas, setNotifVagas] = useState(true);

  const handleLogout = () => {
    addToast('Você saiu da sua conta', undefined, 'info');
    setScreen('login');
  };

  return (
    <div className="space-y-6 pb-20 max-w-md mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar</span>
        </button>
        <span className="text-xs font-bold text-teal-400">Configurações</span>
      </div>

      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Configurações
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Gerencie sua privacidade, segurança e preferências no ecossistema.
        </p>
      </div>

      {/* Settings Menu List (Screen 26) */}
      <div className="space-y-4">
        {/* Section: Privacidade */}
        <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Privacidade & Visibilidade
          </h2>

          <label className="flex items-center justify-between py-1 text-xs text-slate-200 cursor-pointer">
            <div>
              <p className="font-semibold text-white">Perfil Público para Empresas</p>
              <p className="text-[10px] text-slate-400">Permitir que recrutadores encontrem você</p>
            </div>
            <input
              type="checkbox"
              checked={profilePublic}
              onChange={(e) => setProfilePublic(e.target.checked)}
              className="accent-[#00d29d] w-4 h-4"
            />
          </label>

          <label className="flex items-center justify-between py-1 text-xs text-slate-200 cursor-pointer border-t border-slate-800/60 pt-2">
            <div>
              <p className="font-semibold text-white">Exibir CONEXX Score</p>
              <p className="text-[10px] text-slate-400">Mostrar indicador numérico no perfil</p>
            </div>
            <input
              type="checkbox"
              checked={showScorePublic}
              onChange={(e) => setShowScorePublic(e.target.checked)}
              className="accent-[#00d29d] w-4 h-4"
            />
          </label>
        </div>

        {/* Links List (Screen 26) */}
        <div className="glass-card rounded-2xl overflow-hidden border border-slate-800 divide-y divide-slate-800/80">
          {[
            {
              label: 'Conta & Cadastro',
              icon: User,
              action: () => addToast('Seus dados estão sincronizados', undefined, 'info'),
            },
            {
              label: 'Notificações & Alertas',
              icon: Bell,
              action: () => addToast('Preferências de notificação salvas', undefined, 'success'),
            },
            {
              label: 'Segurança & Senha',
              icon: Lock,
              action: () => addToast('Autenticação de 2 fatores ativada', undefined, 'info'),
            },
            {
              label: 'LGPD & Privacidade de Dados',
              icon: Shield,
              action: () => addToast('Seus dados estão protegidos sob a LGPD', undefined, 'info'),
            },
            {
              label: 'Central de Ajuda & FAQ',
              icon: HelpCircle,
              action: () => navigateTab('ajuda'),
            },
            {
              label: 'Sobre o CONEXX',
              icon: Info,
              action: () => addToast('CONEXX v2.4.0 • Recife Hub', undefined, 'info'),
            },
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 text-teal-400" />
                  <span className="text-xs font-semibold text-white">{item.label}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-500" />
              </button>
            );
          })}
        </div>

        {/* Sair da Conta (Screen 26) */}
        <button
          onClick={handleLogout}
          className="w-full p-3.5 rounded-2xl bg-red-950/40 border border-red-500/30 text-red-400 hover:bg-red-900/40 text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Sair da Conta</span>
        </button>
      </div>
    </div>
  );
};
