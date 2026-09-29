import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Heart,
  MessageSquare,
  Share2,
  Bookmark,
  Sparkles,
  MoreHorizontal,
  Plus,
  Send,
  Calendar,
  Briefcase,
  UtensilsCrossed,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

export const FeedScreen: React.FC = () => {
  const {
    feedPosts,
    toggleLikePost,
    likedPostIds,
    navigateTab,
    setIsCreateModalOpen,
    currentUser,
    openReportModal,
    addToast,
    toggleConnectUser,
    connectedUserIds,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'para_voce' | 'seguindo'>('para_voce');
  const [activeCommentPostId, setActiveCommentPostId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [savedPosts, setSavedPosts] = useState<Set<string>>(new Set());

  const toggleSave = (id: string) => {
    setSavedPosts((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        addToast('Publicação removida dos salvos', undefined, 'info');
      } else {
        next.add(id);
        addToast('Publicação salva nos seus favoritos!', undefined, 'success');
      }
      return next;
    });
  };

  const handleShare = (postTitle: string) => {
    addToast('Link copiado para a área de transferência!', 'Compartilhe com sua rede.', 'info');
  };

  const handleAddComment = (postId: string) => {
    if (!commentText.trim()) return;
    addToast('Comentário publicado!', '+3 pontos no CONEXX Score', 'score');
    setCommentText('');
    setActiveCommentPostId(null);
  };

  return (
    <div className="space-y-5 pb-20">
      {/* Top Feed Tabs: Para Você & Seguindo */}
      <div className="flex items-center justify-between border-b border-teal-900/40 pb-2">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setActiveTab('para_voce')}
            className={`text-sm font-bold pb-2 relative transition-colors cursor-pointer ${
              activeTab === 'para_voce' ? 'text-[#00d29d]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Para você
            {activeTab === 'para_voce' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d29d] rounded-full shadow-[0_0_8px_#00d29d]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('seguindo')}
            className={`text-sm font-bold pb-2 relative transition-colors cursor-pointer ${
              activeTab === 'seguindo' ? 'text-[#00d29d]' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Seguindo
            {activeTab === 'seguindo' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00d29d] rounded-full shadow-[0_0_8px_#00d29d]" />
            )}
          </button>
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-teal-950 border border-teal-500/40 text-[#00d29d] hover:bg-teal-900 text-xs font-bold transition-all cursor-pointer shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Publicar</span>
        </button>
      </div>

      {/* Quick Composer Header */}
      <div
        onClick={() => setIsCreateModalOpen(true)}
        className="glass-card rounded-2xl p-3.5 border border-teal-500/20 flex items-center gap-3 cursor-pointer hover:border-[#00d29d]/40 transition-all"
      >
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-9 h-9 rounded-full object-cover border border-teal-500/40"
        />
        <div className="flex-1 px-4 py-2 rounded-xl bg-slate-900/80 text-xs text-slate-400 border border-slate-800">
          Compartilhar oportunidade, vaga, momento ou negócio...
        </div>
        <div className="p-2 rounded-xl bg-teal-500/10 text-[#00d29d]">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      {/* Feed Posts List */}
      <div className="space-y-4">
        {feedPosts.map((post) => {
          const isLiked = likedPostIds.has(post.id) || post.isLiked;
          const isSaved = savedPosts.has(post.id);
          const isAuthorConnected = connectedUserIds.has(post.author.id);

          return (
            <div
              key={post.id}
              className="glass-card rounded-3xl p-4 sm:p-5 border border-teal-500/15 hover:border-teal-500/30 transition-all space-y-3.5 shadow-lg"
            >
              {/* Post Header: Author info & tag */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-11 h-11 rounded-full object-cover border border-teal-500/40 cursor-pointer"
                    onClick={() => {
                      if (post.author.isCompany) {
                        navigateTab('empresa_detalhe');
                      } else {
                        navigateTab('networking');
                      }
                    }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3
                        className="text-sm font-bold text-white hover:text-[#00d29d] transition-colors cursor-pointer"
                        onClick={() => {
                          if (post.author.isCompany) {
                            navigateTab('empresa_detalhe');
                          } else {
                            navigateTab('networking');
                          }
                        }}
                      >
                        {post.author.name}
                      </h3>
                      {post.author.isCompany && (
                        <span className="px-1.5 py-0.2 rounded bg-teal-900/60 text-teal-300 text-[9px] font-bold">
                          Empresa
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 leading-tight mt-0.5">{post.author.role}</p>
                    <span className="text-[10px] text-slate-500">{post.createdAt}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {post.author.id !== currentUser.id && !post.author.isCompany && (
                    <button
                      onClick={() => toggleConnectUser(post.author.id)}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full transition-all cursor-pointer ${
                        isAuthorConnected
                          ? 'bg-slate-800 text-teal-300 border border-teal-800'
                          : 'bg-teal-500/20 text-[#00d29d] border border-[#00d29d]/40 hover:bg-[#00d29d] hover:text-black'
                      }`}
                    >
                      {isAuthorConnected ? 'Conectado' : '+ Conectar'}
                    </button>
                  )}
                  <button
                    onClick={() => openReportModal('Publicação', post.id, post.author.name)}
                    className="p-1.5 text-slate-500 hover:text-slate-300 transition-colors"
                    title="Mais opções"
                  >
                    <MoreHorizontal className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Tag / Category Badge */}
              {post.tag && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-950/80 text-teal-300 border border-teal-800/60">
                    {post.tag}
                  </span>
                  {post.matchScore && (
                    <span className="text-[10px] font-black px-2 py-0.5 rounded-md bg-emerald-500/20 text-[#00d29d] border border-emerald-500/30">
                      ★ {post.matchScore}% MATCH
                    </span>
                  )}
                </div>
              )}

              {/* Content Body */}
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-normal whitespace-pre-line">
                {post.content}
              </p>

              {/* Image attachment if any */}
              {post.image && (
                <div className="rounded-2xl overflow-hidden border border-teal-900/30 max-h-80 w-full">
                  <img
                    src={post.image}
                    alt="Post media"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              {/* Meta Action Cards (e.g. Vaga vinculada, Evento vinculado) */}
              {post.metaData?.jobId && (
                <div className="p-3.5 rounded-2xl bg-teal-950/40 border border-teal-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-teal-500/20 text-[#00d29d]">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{post.metaData.badgeText || 'Vaga em aberto'}</p>
                      <p className="text-[10px] text-teal-300">Candidatura simplificada pelo CONEXX</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateTab('vagas')}
                    className="px-3 py-1.5 rounded-xl bg-[#00d29d] text-black font-extrabold text-xs hover:opacity-90 transition-all cursor-pointer"
                  >
                    Ver Vaga &rarr;
                  </button>
                </div>
              )}

              {post.metaData?.eventId && (
                <div className="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300">
                      <UtensilsCrossed className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{post.metaData.location || 'Evento CONEXX'}</p>
                      <p className="text-[10px] text-purple-300">{post.metaData.badgeText}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => navigateTab('happyhour')}
                    className="px-3 py-1.5 rounded-xl bg-purple-500 text-white font-extrabold text-xs hover:bg-purple-400 transition-all cursor-pointer"
                  >
                    Confirmar Presença &rarr;
                  </button>
                </div>
              )}

              {/* Action Bar (Curtir, Comentar, Compartilhar, Salvar) */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  {/* Like Button */}
                  <button
                    onClick={() => toggleLikePost(post.id)}
                    className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isLiked ? 'text-rose-500 font-bold' : 'hover:text-rose-400'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                    <span>{post.likes}</span>
                  </button>

                  {/* Comment Button */}
                  <button
                    onClick={() =>
                      setActiveCommentPostId(
                        activeCommentPostId === post.id ? null : post.id
                      )
                    }
                    className="flex items-center gap-1.5 hover:text-teal-400 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{post.commentsCount}</span>
                  </button>

                  {/* Share Button */}
                  <button
                    onClick={() => handleShare(post.content)}
                    className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors cursor-pointer"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Compartilhar</span>
                  </button>
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleSave(post.id)}
                  className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                    isSaved ? 'text-[#00d29d]' : 'hover:text-teal-400'
                  }`}
                  title={isSaved ? 'Remover dos salvos' : 'Salvar publicação'}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? 'fill-[#00d29d]' : ''}`}
                  />
                </button>
              </div>

              {/* Expandable Comment Input */}
              {activeCommentPostId === post.id && (
                <div className="pt-2 flex items-center gap-2 border-t border-slate-800">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                    placeholder="Adicionar um comentário relevante..."
                    className="flex-1 px-3 py-1.5 text-xs bg-slate-900 border border-teal-900/50 rounded-xl text-white focus:outline-none focus:border-[#00d29d]"
                    autoFocus
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    disabled={!commentText.trim()}
                    className="p-2 rounded-xl bg-[#00d29d] text-black hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
