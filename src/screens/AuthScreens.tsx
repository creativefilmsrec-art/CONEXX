import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Logo } from '../components/common/Logo';
import { UserType } from '../types';
import {
  User,
  Building2,
  Briefcase,
  GraduationCap,
  ArrowRight,
  Check,
  Mail,
  Lock,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';

// ==========================================
// 1. ESCOLHA DO TIPO DE USUÁRIO (Screen 6)
// ==========================================
export const UserTypeScreen: React.FC = () => {
  const { setScreen, userTypeSelected, setUserTypeSelected } = useApp();

  const options: { type: UserType; title: string; subtitle: string; icon: any }[] = [
    {
      type: 'profissional',
      title: 'Profissional',
      subtitle: 'Estou em busca de oportunidades, networking e desenvolvimento de carreira.',
      icon: User,
    },
    {
      type: 'empresa',
      title: 'Empresa',
      subtitle: 'Quero contratar talentos, divulgar vagas e conectar com fornecedores.',
      icon: Building2,
    },
    {
      type: 'empresario',
      title: 'Empresário / Empreendedor',
      subtitle: 'Quero fazer networking estratégico, novos clientes e parcerias de negócios.',
      icon: Briefcase,
    },
    {
      type: 'estudante',
      title: 'Estudante',
      subtitle: 'Quero aprender, conectar e iniciar minha jornada profissional com mentores.',
      icon: GraduationCap,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#070e13] flex flex-col justify-between p-5 select-none max-w-md mx-auto">
      {/* Top Header */}
      <div className="pt-2 flex items-center justify-between">
        <Logo size="sm" showTagline={false} />
        <span className="text-[11px] font-bold text-teal-400">Passo 1 de 3</span>
      </div>

      <div className="my-auto py-4">
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-['Space_Grotesk'] leading-tight">
          Qual é o seu perfil?
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          Personalizaremos seu feed e recomendações com base no seu objetivo.
        </p>

        {/* Options */}
        <div className="space-y-3">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isSelected = userTypeSelected === opt.type;
            return (
              <div
                key={opt.type}
                onClick={() => setUserTypeSelected(opt.type)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                  isSelected
                    ? 'bg-teal-950/60 border-[#00d29d] ring-1 ring-[#00d29d] shadow-[0_0_15px_rgba(0,210,157,0.15)]'
                    : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div
                  className={`p-2.5 rounded-xl ${
                    isSelected ? 'bg-[#00d29d] text-black' : 'bg-slate-800 text-teal-400'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{opt.title}</h3>
                    {isSelected && <Check className="w-4 h-4 text-[#00d29d]" />}
                  </div>
                  <p className="text-xs text-slate-400 mt-1 leading-relaxed">{opt.subtitle}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="pb-4">
        <button
          onClick={() => setScreen('register')}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)] active:scale-95 transition-all cursor-pointer"
        >
          <span>Continuar</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 2. CADASTRO (Screen 3)
// ==========================================
export const RegisterScreen: React.FC = () => {
  const { setScreen, currentUser, updateCurrentUser, addToast } = useApp();
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState('juliana.santos@exemplo.com');
  const [password, setPassword] = useState('••••••••');
  const [acceptedTerms, setAcceptedTerms] = useState(true);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!acceptedTerms) {
      addToast('Atenção', 'Aceite os termos para prosseguir', 'info');
      return;
    }
    updateCurrentUser({ name });
    addToast('Conta criada com sucesso!', 'Vamos personalizar seus interesses', 'success');
    setScreen('interests');
  };

  return (
    <div className="min-h-screen w-full bg-[#070e13] flex flex-col justify-between p-5 select-none max-w-md mx-auto">
      {/* Top Header */}
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={() => setScreen('user_type')}
          className="text-slate-400 hover:text-white p-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Logo size="sm" showTagline={false} />
        <span className="text-[11px] font-bold text-teal-400">Passo 2 de 3</span>
      </div>

      <div className="my-auto py-4">
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-['Space_Grotesk'] leading-tight">
          Crie sua conta
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Junte-se a milhares de profissionais e empresas no CONEXX.
        </p>

        {/* Social SSO buttons */}
        <div className="space-y-2.5 mb-5">
          <button
            type="button"
            onClick={() => setScreen('interests')}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.9c2.28-2.1 3.645-5.18 3.645-9.15z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.9-3.05c-1.08.72-2.45 1.16-4.03 1.16-3.1 0-5.74-2.1-6.68-4.91H1.21v3.15C3.25 21.43 7.34 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.32 14.29c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.56H1.21C.44 8.1 0 9.99 0 12s.44 3.9 1.21 5.44l4.11-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.25 2.57 1.21 6.56l4.11 3.15c.94-2.81 3.58-4.96 6.68-4.96z"
              />
            </svg>
            <span>Continuar com Google</span>
          </button>

          <button
            type="button"
            onClick={() => setScreen('interests')}
            className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
          >
            <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.85-.9.04-1.98.6-2.62 1.35-.57.65-1.07 1.72-.94 2.74 1 .08 2.02-.49 2.64-1.24z" />
            </svg>
            <span>Continuar com Apple</span>
          </button>
        </div>

        <div className="relative my-4 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative bg-[#070e13] px-3 text-[10px] uppercase font-bold text-slate-500">
            ou com seu e-mail
          </span>
        </div>

        {/* Traditional Form */}
        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Nome Completo</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#00d29d]"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">E-mail Profissional</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#00d29d]"
              required
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#00d29d]"
              required
            />
          </div>

          <label className="flex items-start gap-2.5 pt-1 text-xs text-slate-400 cursor-pointer">
            <input
              type="checkbox"
              checked={acceptedTerms}
              onChange={(e) => setAcceptedTerms(e.target.checked)}
              className="mt-0.5 accent-[#00d29d]"
            />
            <span>
              Li e concordo com os <strong className="text-teal-400">Termos de Uso</strong> e{' '}
              <strong className="text-teal-400">Política de Privacidade</strong>.
            </span>
          </label>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)] active:scale-95 transition-all cursor-pointer"
          >
            <span>Criar Minha Conta</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>
      </div>

      <div className="pb-4 text-center">
        <button
          onClick={() => setScreen('login')}
          className="text-xs text-slate-400 hover:text-white"
        >
          Já tem uma conta? <strong className="text-[#00d29d]">Entrar</strong>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 3. LOGIN (Screen 4)
// ==========================================
export const LoginScreen: React.FC = () => {
  const { setScreen, addToast } = useApp();
  const [email, setEmail] = useState('juliana.santos@techsolutions.io');
  const [password, setPassword] = useState('••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Bem-vinda de volta, Juliana!', 'Carregando seu feed personalizado...', 'success');
    setScreen('main');
  };

  return (
    <div className="min-h-screen w-full bg-[#070e13] flex flex-col justify-between p-5 select-none max-w-md mx-auto">
      <div className="pt-2 flex items-center justify-between">
        <Logo size="sm" showTagline={false} />
        <span className="text-[11px] font-bold text-teal-400">Acesso Seguro</span>
      </div>

      <div className="my-auto py-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-[#00d29d] flex items-center justify-center mb-4">
          <Lock className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-['Space_Grotesk'] leading-tight">
          Bem-vindo de volta!
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Conecte-se para acessar suas oportunidades e networking.
        </p>

        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <label className="block text-[11px] font-semibold text-slate-300 mb-1">E-mail ou Telefone</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#00d29d]"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-semibold text-slate-300">Senha</label>
              <button
                type="button"
                onClick={() => setScreen('forgot')}
                className="text-[11px] text-teal-400 hover:text-white"
              >
                Esqueceu a senha?
              </button>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#00d29d]"
              required
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="accent-[#00d29d]"
              />
              <span>Lembrar-me</span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)] active:scale-95 transition-all cursor-pointer"
          >
            <span>Entrar na Plataforma</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </form>

        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-800" />
          </div>
          <span className="relative bg-[#070e13] px-3 text-[10px] uppercase font-bold text-slate-500">
            ou
          </span>
        </div>

        <button
          type="button"
          onClick={() => setScreen('main')}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-xs font-semibold text-white flex items-center justify-center gap-2.5 transition-colors cursor-pointer"
        >
          <span>Acesso Rápido com Demo (Juliana Santos)</span>
        </button>
      </div>

      <div className="pb-4 text-center">
        <button
          onClick={() => setScreen('register')}
          className="text-xs text-slate-400 hover:text-white"
        >
          Ainda não tem uma conta? <strong className="text-[#00d29d]">Criar conta</strong>
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 4. RECUPERAÇÃO DE SENHA (Screen 5)
// ==========================================
export const ForgotPasswordScreen: React.FC = () => {
  const { setScreen, addToast } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    addToast('Link de recuperação enviado!', 'Verifique sua caixa de entrada.', 'success');
  };

  return (
    <div className="min-h-screen w-full bg-[#070e13] flex flex-col justify-between p-5 select-none max-w-md mx-auto">
      <div className="pt-2 flex items-center justify-between">
        <button
          onClick={() => setScreen('login')}
          className="text-slate-400 hover:text-white p-1"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <Logo size="sm" showTagline={false} />
        <span />
      </div>

      <div className="my-auto py-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-[#00d29d] flex items-center justify-center mb-4">
          <Mail className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-['Space_Grotesk'] leading-tight">
          Recupere sua senha
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Digite seu e-mail e enviaremos um código de verificação seguro para redefinir seu acesso.
        </p>

        {sent ? (
          <div className="p-4 rounded-2xl bg-teal-950/60 border border-teal-500/40 text-center space-y-3">
            <Check className="w-8 h-8 text-[#00d29d] mx-auto" />
            <h3 className="text-sm font-bold text-white">E-mail Enviado!</h3>
            <p className="text-xs text-slate-300">
              Enviamos as instruções para <strong>{email || 'seu e-mail'}</strong>. Verifique sua caixa de entrada e spam.
            </p>
            <button
              onClick={() => setScreen('login')}
              className="w-full py-2.5 rounded-xl bg-[#00d29d] text-black font-bold text-xs"
            >
              Voltar para o Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-semibold text-slate-300 mb-1">Seu E-mail Cadastrado</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#00d29d]"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)] active:scale-95 transition-all cursor-pointer"
            >
              <span>Enviar Link de Redefinição</span>
            </button>
          </form>
        )}
      </div>

      <div className="pb-4 text-center">
        <button
          onClick={() => setScreen('login')}
          className="text-xs text-slate-400 hover:text-white"
        >
          Voltar para o login
        </button>
      </div>
    </div>
  );
};

// ==========================================
// 5. INTERESSES ONBOARDING (Screen 10)
// ==========================================
export const InterestsOnboardingScreen: React.FC = () => {
  const { setScreen, selectedInterests, toggleInterest, addToast } = useApp();

  const areas = [
    'Tecnologia',
    'Marketing Digital',
    'Design & UX',
    'Startups & Investimentos',
    'Recursos Humanos',
    'Vendas & B2B',
    'Engenharia & Construção',
    'Gastronomia',
    'Finanças',
    'Inteligência Artificial',
    'Gestão & Negócios',
    'Educação',
  ];

  const handleFinish = () => {
    addToast('Perfil configurado!', 'Bem-vindo ao ecossistema CONEXX.', 'success');
    setScreen('main');
  };

  return (
    <div className="min-h-screen w-full bg-[#070e13] flex flex-col justify-between p-5 select-none max-w-md mx-auto">
      <div className="pt-2 flex items-center justify-between">
        <Logo size="sm" showTagline={false} />
        <span className="text-[11px] font-bold text-teal-400">Passo 3 de 3</span>
      </div>

      <div className="my-auto py-4">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/30 text-[#00d29d] flex items-center justify-center mb-4">
          <Sparkles className="w-6 h-6" />
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white uppercase font-['Space_Grotesk'] leading-tight">
          Quais são seus interesses?
        </h2>
        <p className="text-xs text-slate-400 mt-1 mb-5">
          Selecione tópicos para calibrarmos seu algoritmo de match e vagas.
        </p>

        <div className="flex flex-wrap gap-2">
          {areas.map((area) => {
            const isSelected = selectedInterests.includes(area);
            return (
              <button
                key={area}
                type="button"
                onClick={() => toggleInterest(area)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-950/80 border-[#00d29d] text-[#00d29d] ring-1 ring-[#00d29d]'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                {isSelected && <Check className="w-3.5 h-3.5" />}
                <span>{area}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="pb-4">
        <button
          onClick={handleFinish}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm flex items-center justify-center gap-2 hover:opacity-95 shadow-[0_0_20px_rgba(0,210,157,0.35)] active:scale-95 transition-all cursor-pointer"
        >
          <span>Concluir e Explorar o CONEXX</span>
          <ArrowRight className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
