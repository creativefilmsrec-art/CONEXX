import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  UserProfile,
  Company,
  Job,
  EventItem,
  Community,
  FeedPost,
  BusinessItem,
  RestaurantHappyHour,
  ChatConversation,
  NotificationItem,
  UserType,
  AdminMetrics,
} from '../types';
import {
  CURRENT_USER,
  COMPANIES,
  OTHER_USERS,
  JOBS,
  EVENTS,
  COMMUNITIES,
  FEED_POSTS,
  BUSINESS_ITEMS,
  RESTAURANTS_AND_SPACES,
  CHATS,
  NOTIFICATIONS,
  INITIAL_ADMIN_METRICS,
} from '../data/mockData';

export type ScreenType =
  | 'splash'
  | 'onboarding'
  | 'user_type'
  | 'register'
  | 'login'
  | 'forgot'
  | 'interests'
  | 'main';

export type MainTabType =
  | 'home'
  | 'feed'
  | 'vagas'
  | 'networking'
  | 'eventos'
  | 'comunidades'
  | 'negocios'
  | 'happyhour'
  | 'mapa'
  | 'mensagens'
  | 'notificacoes'
  | 'perfil'
  | 'meu_conexx'
  | 'vaga_detalhe'
  | 'evento_detalhe'
  | 'empresa_detalhe'
  | 'user_detalhe'
  | 'comunidade_detalhe'
  | 'checkout'
  | 'assinaturas'
  | 'configuracoes'
  | 'ajuda'
  | 'admin';

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'info' | 'score';
}

interface AppContextType {
  screen: ScreenType;
  setScreen: (screen: ScreenType) => void;
  mainTab: MainTabType;
  navigateTab: (tab: MainTabType, params?: any) => void;
  goBack: () => void;
  tabHistory: MainTabType[];
  
  // Current user & auth
  currentUser: UserProfile;
  updateCurrentUser: (updates: Partial<UserProfile>) => void;
  userTypeSelected: UserType;
  setUserTypeSelected: (type: UserType) => void;
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;

  // Selected Entities
  selectedJob: Job | null;
  setSelectedJob: (job: Job | null) => void;
  selectedEvent: EventItem | null;
  setSelectedEvent: (event: EventItem | null) => void;
  selectedCompany: Company | null;
  setSelectedCompany: (company: Company | null) => void;
  selectedUser: UserProfile | null;
  setSelectedUser: (user: UserProfile | null) => void;
  selectedCommunity: Community | null;
  setSelectedCommunity: (community: Community | null) => void;

  // Data lists & interactions
  users: UserProfile[];
  companies: Company[];
  jobs: Job[];
  events: EventItem[];
  communities: Community[];
  feedPosts: FeedPost[];
  businessItems: BusinessItem[];
  restaurants: RestaurantHappyHour[];
  chats: ChatConversation[];
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  notifications: NotificationItem[];
  unreadNotifsCount: number;

  // Actions
  connectedUserIds: Set<string>;
  toggleConnectUser: (userId: string) => void;
  appliedJobIds: Set<string>;
  applyToJob: (jobId: string) => void;
  savedJobIds: Set<string>;
  toggleSaveJob: (jobId: string) => void;
  confirmedEventIds: Set<string>;
  toggleConfirmEvent: (eventId: string) => void;
  checkedInEventIds: Set<string>;
  checkInToEvent: (eventId: string) => void;
  joinedCommunityIds: Set<string>;
  toggleJoinCommunity: (communityId: string) => void;
  likedPostIds: Set<string>;
  toggleLikePost: (postId: string) => void;
  createNewPost: (post: Partial<FeedPost>) => void;
  sendMessage: (chatId: string, text: string, attachment?: any) => void;
  markNotificationAsRead: (id: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & UI helpers
  isScoreModalOpen: boolean;
  setIsScoreModalOpen: (open: boolean) => void;
  isCreateModalOpen: boolean;
  setIsCreateModalOpen: (open: boolean) => void;
  isCheckInModalOpen: boolean;
  setIsCheckInModalOpen: (open: boolean) => void;
  isAIModalOpen: boolean;
  setIsAIModalOpen: (open: boolean) => void;
  isReportModalOpen: boolean;
  setIsReportModalOpen: (open: boolean) => void;
  reportTarget: { type: string; id: string; title: string } | null;
  openReportModal: (type: string, id: string, title: string) => void;

  // Device view
  viewMode: 'mobile' | 'fluid';
  setViewMode: (mode: 'mobile' | 'fluid') => void;

  // Toast
  toasts: ToastMessage[];
  addToast: (title: string, description?: string, type?: 'success' | 'info' | 'score') => void;

  // Admin
  adminMetrics: AdminMetrics;
  updateScoreWeights: (weights: AdminMetrics['scoreWeights']) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation
  const [screen, setScreen] = useState<ScreenType>('splash');
  const [mainTab, setMainTab] = useState<MainTabType>('home');
  const [tabHistory, setTabHistory] = useState<MainTabType[]>(['home']);

  // Current user & profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);
  const [userTypeSelected, setUserTypeSelected] = useState<UserType>('profissional');
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Tecnologia',
    'Marketing',
    'Startups',
    'Networking',
  ]);

  // Selected details
  const [selectedJob, setSelectedJob] = useState<Job | null>(JOBS[0]);
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(EVENTS[0]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(COMPANIES[0]);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(OTHER_USERS[0]);
  const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(COMMUNITIES[0]);

  // Lists
  const [users] = useState<UserProfile[]>(OTHER_USERS);
  const [companies] = useState<Company[]>(COMPANIES);
  const [jobs, setJobs] = useState<Job[]>(JOBS);
  const [events, setEvents] = useState<EventItem[]>(EVENTS);
  const [communities] = useState<Community[]>(COMMUNITIES);
  const [feedPosts, setFeedPosts] = useState<FeedPost[]>(FEED_POSTS);
  const [businessItems] = useState<BusinessItem[]>(BUSINESS_ITEMS);
  const [restaurants] = useState<RestaurantHappyHour[]>(RESTAURANTS_AND_SPACES);
  const [chats, setChats] = useState<ChatConversation[]>(CHATS);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);

  // Interaction Sets
  const [connectedUserIds, setConnectedUserIds] = useState<Set<string>>(new Set(['user_carlos']));
  const [appliedJobIds, setAppliedJobIds] = useState<Set<string>>(new Set());
  const [savedJobIds, setSavedJobIds] = useState<Set<string>>(new Set(['job_analista_marketing']));
  const [confirmedEventIds, setConfirmedEventIds] = useState<Set<string>>(new Set(['event_palestra_inovacao']));
  const [checkedInEventIds, setCheckedInEventIds] = useState<Set<string>>(new Set());
  const [joinedCommunityIds, setJoinedCommunityIds] = useState<Set<string>>(new Set(['comm_marketing', 'comm_tech', 'comm_startups']));
  const [likedPostIds, setLikedPostIds] = useState<Set<string>>(new Set(['post_happy_hour', 'post_momento_juliana']));

  // Search
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [isScoreModalOpen, setIsScoreModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCheckInModalOpen, setIsCheckInModalOpen] = useState(false);
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [reportTarget, setReportTarget] = useState<{ type: string; id: string; title: string } | null>(null);

  // View mode: default to 'mobile' on mobile devices or 'mobile' artboard on desktop with toggle
  const [viewMode, setViewMode] = useState<'mobile' | 'fluid'>('mobile');

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Admin
  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics>(INITIAL_ADMIN_METRICS);

  const addToast = (title: string, description?: string, type: 'success' | 'info' | 'score' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const navigateTab = (tab: MainTabType, params?: any) => {
    if (params) {
      if (params.job) setSelectedJob(params.job);
      if (params.event) setSelectedEvent(params.event);
      if (params.company) setSelectedCompany(params.company);
      if (params.user) setSelectedUser(params.user);
      if (params.community) setSelectedCommunity(params.community);
      if (params.chatId) setActiveChatId(params.chatId);
    }
    setTabHistory((prev) => [...prev, tab]);
    setMainTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (tabHistory.length > 1) {
      const nextHistory = [...tabHistory];
      nextHistory.pop();
      const prevTab = nextHistory[nextHistory.length - 1];
      setTabHistory(nextHistory);
      setMainTab(prevTab);
    } else {
      setMainTab('home');
    }
  };

  const updateCurrentUser = (updates: Partial<UserProfile>) => {
    setCurrentUser((prev) => ({ ...prev, ...updates }));
  };

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest) ? prev.filter((i) => i !== interest) : [...prev, interest]
    );
  };

  const toggleConnectUser = (userId: string) => {
    setConnectedUserIds((prev) => {
      const next = new Set(prev);
      const isConnecting = !next.has(userId);
      if (isConnecting) {
        next.add(userId);
        addToast('Solicitação de conexão enviada!', '+10 pontos no CONEXX Score', 'score');
        setCurrentUser((u) => ({
          ...u,
          connectionsCount: u.connectionsCount + 1,
          conexxScore: {
            ...u.conexxScore,
            total: u.conexxScore.total + 10,
            conexoes: u.conexxScore.conexoes + 10,
          },
        }));
      } else {
        next.delete(userId);
        addToast('Conexão desfeita', undefined, 'info');
      }
      return next;
    });
  };

  const applyToJob = (jobId: string) => {
    if (appliedJobIds.has(jobId)) return;
    setAppliedJobIds((prev) => new Set(prev).add(jobId));
    setJobs((prev) =>
      prev.map((j) => (j.id === jobId ? { ...j, applied: true } : j))
    );
    addToast('Candidatura enviada com sucesso!', 'A empresa entrará em contato via chat CONEXX.', 'success');
  };

  const toggleSaveJob = (jobId: string) => {
    setSavedJobIds((prev) => {
      const next = new Set(prev);
      if (next.has(jobId)) {
        next.delete(jobId);
        addToast('Vaga removida dos salvos', undefined, 'info');
      } else {
        next.add(jobId);
        addToast('Vaga salva com sucesso!', 'Acesse suas vagas salvas a qualquer momento.', 'success');
      }
      return next;
    });
  };

  const toggleConfirmEvent = (eventId: string) => {
    setConfirmedEventIds((prev) => {
      const next = new Set(prev);
      if (next.has(eventId)) {
        next.delete(eventId);
        addToast('Inscrição cancelada', undefined, 'info');
      } else {
        next.add(eventId);
        addToast('Presença confirmada!', '+15 pontos no CONEXX Score', 'score');
        setCurrentUser((u) => ({
          ...u,
          conexxScore: {
            ...u.conexxScore,
            total: u.conexxScore.total + 15,
            eventos: u.conexxScore.eventos + 15,
          },
        }));
      }
      return next;
    });
  };

  const checkInToEvent = (eventId: string) => {
    if (checkedInEventIds.has(eventId)) return;
    setCheckedInEventIds((prev) => new Set(prev).add(eventId));
    setCurrentUser((u) => ({
      ...u,
      connectionsCount: u.connectionsCount + 12,
      conexxScore: {
        ...u.conexxScore,
        total: u.conexxScore.total + 18,
        eventos: u.conexxScore.eventos + 18,
        networking: u.conexxScore.networking + 15,
      },
    }));
    addToast('🎉 Check-in Confirmado!', '+18 Score • +12 Novas Oportunidades de Conexão liberadas!', 'score');
  };

  const toggleJoinCommunity = (communityId: string) => {
    setJoinedCommunityIds((prev) => {
      const next = new Set(prev);
      if (next.has(communityId)) {
        next.delete(communityId);
        addToast('Você saiu da comunidade', undefined, 'info');
      } else {
        next.add(communityId);
        addToast('Bem-vindo à comunidade!', '+8 pontos no CONEXX Score', 'score');
        setCurrentUser((u) => ({
          ...u,
          conexxScore: {
            ...u.conexxScore,
            total: u.conexxScore.total + 8,
            comunidades: u.conexxScore.comunidades + 8,
          },
        }));
      }
      return next;
    });
  };

  const toggleLikePost = (postId: string) => {
    setLikedPostIds((prev) => {
      const next = new Set(prev);
      const isLiked = next.has(postId);
      if (isLiked) {
        next.delete(postId);
      } else {
        next.add(postId);
      }
      setFeedPosts((posts) =>
        posts.map((p) =>
          p.id === postId
            ? { ...p, likes: isLiked ? p.likes - 1 : p.likes + 1, isLiked: !isLiked }
            : p
        )
      );
      return next;
    });
  };

  const createNewPost = (newPostData: Partial<FeedPost>) => {
    const created: FeedPost = {
      id: `post_${Date.now()}`,
      type: newPostData.type || 'post',
      author: {
        id: currentUser.id,
        name: currentUser.name,
        role: `${currentUser.title} @ ${currentUser.company}`,
        avatar: currentUser.avatar,
      },
      content: newPostData.content || '',
      image: newPostData.image,
      createdAt: 'Agora mesmo',
      likes: 1,
      isLiked: true,
      commentsCount: 0,
      sharesCount: 0,
      tag: newPostData.tag || 'Compartilhamento',
      metaData: newPostData.metaData,
    };
    setFeedPosts((prev) => [created, ...prev]);
    setCurrentUser((u) => ({
      ...u,
      conexxScore: {
        ...u.conexxScore,
        total: u.conexxScore.total + 12,
        conteudo: u.conexxScore.conteudo + 12,
      },
    }));
    addToast('Publicação compartilhada no ecossistema!', '+12 pontos no CONEXX Score', 'score');
  };

  const sendMessage = (chatId: string, text: string, attachment?: any) => {
    if (!text.trim() && !attachment) return;
    const newMessage = {
      id: `msg_${Date.now()}`,
      senderId: currentUser.id,
      text,
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      attachment,
    };
    setChats((prev) =>
      prev.map((c) =>
        c.id === chatId
          ? {
              ...c,
              lastMessage: text || (attachment ? `Enviou ${attachment.title}` : ''),
              lastTimestamp: 'Agora',
              messages: [...c.messages, newMessage],
            }
          : c
      )
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const openReportModal = (type: string, id: string, title: string) => {
    setReportTarget({ type, id, title });
    setIsReportModalOpen(true);
  };

  const updateScoreWeights = (weights: AdminMetrics['scoreWeights']) => {
    setAdminMetrics((prev) => ({ ...prev, scoreWeights: weights }));
    addToast('Pesos do algoritmo atualizados com sucesso!', 'Recálculo em andamento no cluster.', 'success');
  };

  const unreadNotifsCount = notifications.filter((n) => n.unread).length;

  return (
    <AppContext.Provider
      value={{
        screen,
        setScreen,
        mainTab,
        navigateTab,
        goBack,
        tabHistory,
        currentUser,
        updateCurrentUser,
        userTypeSelected,
        setUserTypeSelected,
        selectedInterests,
        toggleInterest,
        selectedJob,
        setSelectedJob,
        selectedEvent,
        setSelectedEvent,
        selectedCompany,
        setSelectedCompany,
        selectedUser,
        setSelectedUser,
        selectedCommunity,
        setSelectedCommunity,
        users,
        companies,
        jobs,
        events,
        communities,
        feedPosts,
        businessItems,
        restaurants,
        chats,
        activeChatId,
        setActiveChatId,
        notifications,
        unreadNotifsCount,
        connectedUserIds,
        toggleConnectUser,
        appliedJobIds,
        applyToJob,
        savedJobIds,
        toggleSaveJob,
        confirmedEventIds,
        toggleConfirmEvent,
        checkedInEventIds,
        checkInToEvent,
        joinedCommunityIds,
        toggleJoinCommunity,
        likedPostIds,
        toggleLikePost,
        createNewPost,
        sendMessage,
        markNotificationAsRead,
        searchQuery,
        setSearchQuery,
        isScoreModalOpen,
        setIsScoreModalOpen,
        isCreateModalOpen,
        setIsCreateModalOpen,
        isCheckInModalOpen,
        setIsCheckInModalOpen,
        isAIModalOpen,
        setIsAIModalOpen,
        isReportModalOpen,
        setIsReportModalOpen,
        reportTarget,
        openReportModal,
        viewMode,
        setViewMode,
        toasts,
        addToast,
        adminMetrics,
        updateScoreWeights,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
