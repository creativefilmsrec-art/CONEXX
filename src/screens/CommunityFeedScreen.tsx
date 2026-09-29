import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ArrowLeft,
  Users,
  MessageCircle,
  Share2,
  Heart,
  Send,
  Plus,
  Check,
  Sparkles,
} from 'lucide-react';

export const CommunityFeedScreen: React.FC = () => {
  const {
    selectedCommunity,
    goBack,
    joinedCommunityIds,
    toggleJoinCommunity,
    currentUser,
    addToast,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'feed' | 'membros' | 'sobre'>('feed');
  const [newPostText, setNewPostText] = useState('');
  const [posts, setPosts] = useState([
    {
      id: 'cp_1',
      author: 'Ana Paula Ferreira',
      role: 'Head de SEO @ Growth Tech',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
      time: 'Há 2h',
      content: 'Dicas de SEO para melhorar o ranqueamento do seu site B2B em 2026: invistam em Search Generative Experience (SGE) e conteúdo autoral com cases reais. O que vocês acham?',
      likes: 23,
      isLiked: false,
      comments: [
        {
          author: 'Rafael Costa',
          text: 'Excelente conteúdo! Estamos testando aqui e o tráfego qualificado dobrou.',
        },
      ],
    },
    {
      id: 'cp_2',
      author: 'Carlos Mendes',
      role: 'CEO @ Inovação Tech',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      time: 'Há 5h',
      content: 'Alguém aqui tem experiência com migração de CRM para Hubspot Enterprise no Nordeste? Buscando recomendações de parceiros certificados.',
      likes: 14,
      isLiked: true,
      comments: [],
    },
  ]);

  if (!selectedCommunity) {
    return (
      <div className="text-center py-20">
        <p className="text-sm text-slate-400">Comunidade não selecionada.</p>
        <button onClick={goBack} className="mt-3 text-xs text-teal-400 underline">
          Voltar
        </button>
      </div>
    );
  }

  const isJoined = joinedCommunityIds.has(selectedCommunity.id);

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: `cp_${Date.now()}`,
      author: currentUser.name,
      role: `${currentUser.title} @ ${currentUser.company}`,
      avatar: currentUser.avatar,
      time: 'Agora mesmo',
      content: newPostText,
      likes: 1,
      isLiked: true,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
    addToast('Publicação enviada para a comunidade!', '+8 pontos no CONEXX Score', 'score');
  };

  const handleLike = (id: string) => {
    setPosts(
      posts.map((p) =>
        p.id === id
          ? { ...p, likes: p.isLiked ? p.likes - 1 : p.likes + 1, isLiked: !p.isLiked }
          : p
      )
    );
  };

  return (
    <div className="space-y-6 pb-20 max-w-2xl mx-auto">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Voltar às Comunidades</span>
        </button>

        <button
          onClick={() => addToast('Link da comunidade copiado!', undefined, 'info')}
          className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Community Header (Screen 15) */}
      <div className="glass-card rounded-3xl overflow-hidden border border-teal-500/25 bg-slate-900 shadow-xl">
        <div className="h-28 sm:h-36 w-full overflow-hidden relative">
          <img
            src={selectedCommunity.coverImage}
            alt={selectedCommunity.name}
            className="w-full h-full object-cover filter brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b161e] via-transparent to-transparent" />
        </div>

        <div className="px-5 pb-5 -mt-10 relative z-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-4">
          <div className="flex items-center gap-3.5 text-center sm:text-left">
            <img
              src={selectedCommunity.avatar}
              alt={selectedCommunity.name}
              className="w-20 h-20 rounded-2xl object-cover border-3 border-[#0b161e] shadow-xl shrink-0"
            />
            <div>
              <h1 className="text-lg sm:text-xl font-black text-white">{selectedCommunity.name}</h1>
              <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                <Users className="w-3.5 h-3.5 text-teal-400" />
                <span>{(selectedCommunity.membersCount / 1000).toFixed(1)} mil membros</span>
                <span>•</span>
                <span>{selectedCommunity.category}</span>
              </p>
            </div>
          </div>

          <button
            onClick={() => toggleJoinCommunity(selectedCommunity.id)}
            className={`px-4 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
              isJoined
                ? 'bg-slate-800 text-teal-300 border border-teal-800'
                : 'bg-gradient-to-r from-teal-500 to-[#00d29d] text-black shadow-[0_0_15px_rgba(0,210,157,0.3)]'
            }`}
          >
            {isJoined ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Membro Ativo</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Entrar na Comunidade</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Tabs Menu (Screen 15) */}
      <div className="flex border-b border-teal-900/40">
        {[
          { id: 'feed', label: 'Feed da Comunidade' },
          { id: 'membros', label: `Membros (${selectedCommunity.membersCount})` },
          { id: 'sobre', label: 'Sobre & Regras' },
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

      {/* Tab: Feed */}
      {activeTab === 'feed' && (
        <div className="space-y-4">
          {/* Post composer in community */}
          <form
            onSubmit={handleCreatePost}
            className="glass-card rounded-2xl p-3.5 border border-teal-500/20 space-y-2.5"
          >
            <div className="flex items-center gap-2.5">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="w-8 h-8 rounded-full object-cover border border-teal-500/40"
              />
              <input
                type="text"
                value={newPostText}
                onChange={(e) => setNewPostText(e.target.value)}
                placeholder="Compartilhar dúvida, dica ou oportunidade..."
                className="flex-1 px-3.5 py-2 text-xs bg-slate-900 border border-teal-900/40 rounded-xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
              />
              <button
                type="submit"
                disabled={!newPostText.trim()}
                className="p-2 rounded-xl bg-[#00d29d] text-black hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Posts list */}
          <div className="space-y-3.5">
            {posts.map((post) => (
              <div
                key={post.id}
                className="glass-card rounded-2xl p-4 sm:p-5 border border-slate-800 space-y-3"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={post.avatar}
                    alt={post.author}
                    className="w-10 h-10 rounded-full object-cover border border-teal-900/60"
                  />
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white">{post.author}</h3>
                    <p className="text-[10px] text-slate-400">{post.role}</p>
                    <span className="text-[9px] text-slate-500">{post.time}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed font-normal">
                  {post.content}
                </p>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400">
                  <button
                    onClick={() => handleLike(post.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      post.isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-400'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${post.isLiked ? 'fill-rose-500' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <span className="text-[11px] text-slate-500">
                    {post.comments.length} comentários
                  </span>
                </div>

                {/* Sub-comments */}
                {post.comments.length > 0 && (
                  <div className="pt-2 space-y-1.5 border-t border-slate-800/50">
                    {post.comments.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-xl bg-slate-900/60 text-xs">
                        <span className="font-bold text-teal-300 block">{c.author}</span>
                        <p className="text-slate-300 mt-0.5">{c.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Sobre */}
      {activeTab === 'sobre' && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-400">
            Propósito da Comunidade
          </h2>
          <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
            {selectedCommunity.description}
          </p>

          <h3 className="text-xs font-bold uppercase tracking-wider text-teal-400 pt-3">
            Tópicos em Discussão
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedCommunity.topics.map((t, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-teal-950 border border-teal-800 text-teal-300 text-xs"
              >
                #{t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Tab: Membros */}
      {activeTab === 'membros' && (
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-3">
          <p className="text-xs text-slate-400">
            Mais de {selectedCommunity.membersCount} profissionais participam ativamente desta comunidade.
          </p>
        </div>
      )}
    </div>
  );
};
