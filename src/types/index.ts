export type UserType = 'profissional' | 'empresa' | 'empresario' | 'estudante';

export interface ScoreBreakdown {
  conexoes: number; // 20%
  networking: number; // 20%
  eventos: number; // 20%
  conteudo: number; // 15%
  comunidades: number; // 10%
  palestras: number; // 10%
  contribuicao: number; // 5%
  total: number;
  monthlyGrowth: number;
  level: string; // e.g., 'Referência na Comunidade'
}

export interface UserProfile {
  id: string;
  name: string;
  username: string;
  title: string;
  company?: string;
  city: string;
  avatar: string;
  coverImage?: string;
  userType: UserType;
  bio: string;
  conexxScore: ScoreBreakdown;
  connectionsCount: number;
  profileViews: number;
  isAmbassador?: boolean;
  skills: string[];
  interests: string[];
  experiences: {
    role: string;
    company: string;
    period: string;
    description: string;
  }[];
  education: {
    course: string;
    institution: string;
    period: string;
  }[];
  badges: string[];
  matchScore?: number;
  matchReasons?: string[];
  mutualConnections?: number;
  eventsInCommon?: number;
}

export interface Company {
  id: string;
  name: string;
  segment: string;
  employeesRange: string;
  city: string;
  logo: string;
  coverImage: string;
  description: string;
  website: string;
  followersCount: number;
  connectionsCount: number;
  openJobsCount: number;
  businessScore: number;
  productsCount: number;
  verified: boolean;
}

export interface Job {
  id: string;
  title: string;
  companyId: string;
  companyName: string;
  companyLogo: string;
  city: string;
  locationType: 'Presencial' | 'Híbrido' | 'Remoto';
  contractType: 'CLT' | 'PJ' | 'Estágio';
  salary?: string;
  matchPercentage: number;
  matchDetails: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  publishedAt: string;
  applied?: boolean;
  saved?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'networking' | 'palestra' | 'workshop' | 'happyhour' | 'curso' | 'negocios';
  date: string;
  time: string;
  venue: string;
  city: string;
  coverImage: string;
  price: number;
  priceFormatted: string;
  description: string;
  speakers: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  }[];
  attendeesCount: number;
  eventScore: number;
  confirmed?: boolean;
  checkedIn?: boolean;
  spotsLeft: number;
  coordinates?: { lat: number; lng: number };
}

export interface Community {
  id: string;
  name: string;
  category: string;
  membersCount: number;
  description: string;
  coverImage: string;
  avatar: string;
  city?: string;
  joined?: boolean;
  postsCount: number;
  topics: string[];
}

export interface FeedPost {
  id: string;
  type: 'post' | 'oportunidade' | 'vaga' | 'evento' | 'happyhour' | 'negocio' | 'momento';
  author: {
    id: string;
    name: string;
    role: string;
    avatar: string;
    isCompany?: boolean;
  };
  content: string;
  image?: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
  commentsCount: number;
  sharesCount: number;
  isSaved?: boolean;
  matchScore?: number;
  tag?: string;
  metaData?: {
    jobId?: string;
    eventId?: string;
    businessType?: 'procuro' | 'ofereco' | 'parceria';
    location?: string;
    badgeText?: string;
  };
}

export interface BusinessItem {
  id: string;
  type: 'procuro' | 'ofereco' | 'parceria' | 'produto' | 'servico';
  title: string;
  authorName: string;
  authorCompany: string;
  authorAvatar: string;
  city: string;
  price?: string;
  description: string;
  image: string;
  matchScore?: number;
  tags: string[];
  createdAt: string;
}

export interface RestaurantHappyHour {
  id: string;
  name: string;
  type: 'Restaurante' | 'Espaço Corporativo' | 'Rooftop' | 'Bar Executivo';
  capacity: string;
  city: string;
  address: string;
  image: string;
  rating: number;
  confirmedCount: number;
  isTonight?: boolean;
  eventDate?: string;
  perks: string[];
  coordinates: { x: number; y: number }; // Relative map coordinate %
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  attachment?: {
    type: 'job' | 'event' | 'profile' | 'opportunity';
    title: string;
    subtitle: string;
    id: string;
  };
}

export interface ChatConversation {
  id: string;
  participantId: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  isCompany?: boolean;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  isGroup?: boolean;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  type: 'vaga' | 'evento' | 'conexao' | 'mensagem' | 'score' | 'comunidade';
  title: string;
  description: string;
  time: string;
  unread: boolean;
  avatar?: string;
  targetId?: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  type: 'profissional' | 'empresarial';
  price: string;
  period: string;
  description: string;
  features: string[];
  recommended?: boolean;
  current?: boolean;
}

export interface AdminMetrics {
  totalUsers: number;
  totalCompanies: number;
  totalJobs: number;
  totalEvents: number;
  totalCommunities: number;
  monthlyRevenue: number;
  activeUsersD30: number;
  reportsCount: number;
  scoreWeights: {
    conexoes: number;
    networking: number;
    eventos: number;
    conteudo: number;
    comunidades: number;
    palestras: number;
    contribuicao: number;
  };
}
