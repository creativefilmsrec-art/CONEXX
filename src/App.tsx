import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ConexxScoreModal } from './components/modals/ConexxScoreModal';
import { CreateModal } from './components/modals/CreateModal';
import { CheckInModal } from './components/modals/CheckInModal';
import { ReportModal } from './components/modals/ReportModal';
import { ConexxAIModal } from './components/ai/ConexxAIModal';

// Screens
import { SplashScreen } from './screens/SplashScreen';
import { OnboardingScreen } from './screens/OnboardingScreen';
import {
  UserTypeScreen,
  RegisterScreen,
  LoginScreen,
  ForgotPasswordScreen,
  InterestsOnboardingScreen,
} from './screens/AuthScreens';
import { HomeScreen } from './screens/HomeScreen';
import { FeedScreen } from './screens/FeedScreen';
import { JobsScreen } from './screens/JobsScreen';
import { JobDetailScreen } from './screens/JobDetailScreen';
import { NetworkingScreen } from './screens/NetworkingScreen';
import { UserProfileScreen } from './screens/UserProfileScreen';
import { EventsScreen } from './screens/EventsScreen';
import { EventDetailScreen } from './screens/EventDetailScreen';
import { CheckoutScreen } from './screens/CheckoutScreen';
import { CommunitiesScreen } from './screens/CommunitiesScreen';
import { CommunityFeedScreen } from './screens/CommunityFeedScreen';
import { BusinessMarketplaceScreen } from './screens/BusinessMarketplaceScreen';
import { RestaurantsAndHappyHourScreen } from './screens/RestaurantsAndHappyHourScreen';
import { InteractiveMapScreen } from './screens/InteractiveMapScreen';
import { ChatScreen } from './screens/ChatScreen';
import { NotificationsScreen } from './screens/NotificationsScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { CompanyProfileScreen } from './screens/CompanyProfileScreen';
import { SubscriptionsScreen } from './screens/SubscriptionsScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { HelpCenterScreen } from './screens/HelpCenterScreen';
import { AdminDashboardScreen } from './screens/AdminDashboardScreen';

// Toast Notification Banner
const ToastContainer: React.FC = () => {
  const { toasts } = useApp();
  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-16 right-4 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto p-3.5 rounded-2xl glass-card border border-teal-500/40 shadow-2xl flex items-center justify-between gap-3 animate-in slide-in-from-top-3 duration-300"
        >
          <div>
            <p className="text-xs font-bold text-white">{t.title}</p>
            {t.description && (
              <p className="text-[11px] text-teal-300 mt-0.5">{t.description}</p>
            )}
          </div>
          <span className="w-2 h-2 rounded-full bg-[#00d29d] animate-ping" />
        </div>
      ))}
    </div>
  );
};

// Main App Router & Layout View
const MainContent: React.FC = () => {
  const { screen, mainTab, viewMode } = useApp();

  // 1. Auth Flow Screens
  if (screen === 'splash') return <SplashScreen />;
  if (screen === 'onboarding') return <OnboardingScreen />;
  if (screen === 'user_type') return <UserTypeScreen />;
  if (screen === 'register') return <RegisterScreen />;
  if (screen === 'login') return <LoginScreen />;
  if (screen === 'forgot') return <ForgotPasswordScreen />;
  if (screen === 'interests') return <InterestsOnboardingScreen />;

  // 2. Active Screen inside Main App
  const renderTabContent = () => {
    switch (mainTab) {
      case 'home':
        return <HomeScreen />;
      case 'feed':
        return <FeedScreen />;
      case 'vagas':
        return <JobsScreen />;
      case 'vaga_detalhe':
        return <JobDetailScreen />;
      case 'networking':
        return <NetworkingScreen />;
      case 'user_detalhe':
        return <UserProfileScreen />;
      case 'eventos':
        return <EventsScreen />;
      case 'evento_detalhe':
        return <EventDetailScreen />;
      case 'checkout':
        return <CheckoutScreen />;
      case 'comunidades':
        return <CommunitiesScreen />;
      case 'comunidade_detalhe':
        return <CommunityFeedScreen />;
      case 'negocios':
        return <BusinessMarketplaceScreen />;
      case 'happyhour':
        return <RestaurantsAndHappyHourScreen />;
      case 'mapa':
        return <InteractiveMapScreen />;
      case 'mensagens':
        return <ChatScreen />;
      case 'notificacoes':
        return <NotificationsScreen />;
      case 'perfil':
      case 'meu_conexx':
        return <ProfileScreen />;
      case 'empresa_detalhe':
        return <CompanyProfileScreen />;
      case 'assinaturas':
        return <SubscriptionsScreen />;
      case 'configuracoes':
        return <SettingsScreen />;
      case 'ajuda':
        return <HelpCenterScreen />;
      case 'admin':
        return <AdminDashboardScreen />;
      default:
        return <HomeScreen />;
    }
  };

  const showBottomNav =
    mainTab !== 'admin' &&
    mainTab !== 'checkout' &&
    mainTab !== 'configuracoes';

  // Responsive Layout Wrapper
  return (
    <div className="min-h-screen bg-[#050b0f] text-slate-100 flex flex-col justify-between selection:bg-[#00d29d] selection:text-black">
      {/* Toast Stack */}
      <ToastContainer />

      {/* When viewMode === 'mobile' on large desktop screens, present as sleek phone mockup */}
      <div
        className={
          viewMode === 'mobile'
            ? 'flex-1 flex justify-center items-center py-0 sm:py-6 px-0 sm:px-4'
            : 'flex-1 flex flex-col'
        }
      >
        <div
          className={
            viewMode === 'mobile'
              ? 'w-full sm:max-w-[430px] sm:h-[880px] bg-[#070e13] sm:rounded-[48px] sm:border-[8px] sm:border-slate-800/90 sm:shadow-[0_0_60px_rgba(0,0,0,0.8)] flex flex-col relative overflow-hidden ring-1 ring-teal-500/20'
              : 'w-full flex-1 flex flex-col bg-[#070e13]'
          }
        >
          {/* Header */}
          <Header />

          {/* Dynamic Island / Bezel simulated speaker bar on mobile mode */}
          {viewMode === 'mobile' && (
            <div className="hidden sm:block absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-50 pointer-events-none" />
          )}

          {/* Main Body */}
          <main className="flex-1 overflow-y-auto px-4 py-4 sm:px-5">
            {renderTabContent()}
          </main>

          {/* Bottom Bar */}
          {showBottomNav && <BottomNav />}
        </div>
      </div>

      {/* Global Modals */}
      <ConexxScoreModal />
      <CreateModal />
      <CheckInModal />
      <ReportModal />
      <ConexxAIModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
