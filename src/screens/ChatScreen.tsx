import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MessageSquare,
  Search,
  Send,
  ArrowLeft,
  Paperclip,
  Briefcase,
  Calendar,
  CheckCheck,
  User,
} from 'lucide-react';

export const ChatScreen: React.FC = () => {
  const { chats, activeChatId, setActiveChatId, sendMessage, currentUser, navigateTab } = useApp();
  const [activeTab, setActiveTab] = useState<'conversas' | 'grupos'>('conversas');
  const [inputMsg, setInputMsg] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const currentChat = chats.find((c) => c.id === activeChatId) || (activeChatId ? chats[0] : null);

  const filteredChats = chats.filter((c) => {
    const matchesTab = activeTab === 'conversas' ? !c.isGroup : c.isGroup;
    const matchesSearch = c.participantName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMsg.trim() || !currentChat) return;
    sendMessage(currentChat.id, inputMsg);
    setInputMsg('');
  };

  return (
    <div className="space-y-4 pb-20 max-w-2xl mx-auto">
      {/* If Inside an Active Conversation */}
      {currentChat ? (
        <div className="glass-card rounded-3xl overflow-hidden border border-teal-500/25 flex flex-col h-[75vh] max-h-[640px]">
          {/* Chat Header */}
          <div className="p-3.5 sm:p-4 bg-[#081116] border-b border-teal-900/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveChatId(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative">
                <img
                  src={currentChat.participantAvatar}
                  alt={currentChat.participantName}
                  className="w-10 h-10 rounded-full object-cover border border-teal-500/40"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00d29d] ring-2 ring-[#081116]" />
              </div>

              <div>
                <h3 className="text-sm font-bold text-white leading-tight">
                  {currentChat.participantName}
                </h3>
                <p className="text-[11px] text-teal-400">{currentChat.participantRole}</p>
              </div>
            </div>
          </div>

          {/* Messages Flow */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#060c10]/60">
            {currentChat.messages.map((m) => {
              const isMe = m.senderId === currentUser.id;
              return (
                <div
                  key={m.id}
                  className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3 text-xs leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-semibold'
                        : 'bg-slate-900 border border-teal-900/40 text-slate-100'
                    }`}
                  >
                    {m.text}

                    {/* Attachment card (e.g. Job Vacancy attached) */}
                    {m.attachment && (
                      <div
                        onClick={() => navigateTab('vagas')}
                        className="mt-2.5 p-2.5 rounded-xl bg-black/30 border border-black/20 flex items-center gap-2.5 cursor-pointer hover:bg-black/40 transition-colors"
                      >
                        <div className="p-2 rounded-lg bg-teal-500 text-black">
                          <Briefcase className="w-4 h-4" />
                        </div>
                        <div className="text-left">
                          <p className="font-extrabold text-[11px]">{m.attachment.title}</p>
                          <p className="text-[10px] opacity-80">{m.attachment.subtitle}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-1 mt-1 text-[9px] text-slate-500">
                    <span>{m.timestamp}</span>
                    {isMe && <CheckCheck className="w-3 h-3 text-[#00d29d]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={handleSend}
            className="p-3 bg-[#081116] border-t border-teal-900/40 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Digite sua mensagem profissional..."
              className="flex-1 px-4 py-2.5 text-xs bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
            />
            <button
              type="submit"
              disabled={!inputMsg.trim()}
              className="p-2.5 rounded-2xl bg-[#00d29d] text-black hover:opacity-90 disabled:opacity-40 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        /* Conversation List (Screen 22) */
        <div className="space-y-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
              Mensagens
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Converse diretamente com empresas recrutadoras, fundadores e parceiros.
            </p>
          </div>

          {/* Tabs Menu (Screen 22) */}
          <div className="flex border-b border-teal-900/40">
            <button
              onClick={() => setActiveTab('conversas')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'conversas'
                  ? 'border-[#00d29d] text-[#00d29d]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Conversas Diretas
            </button>
            <button
              onClick={() => setActiveTab('grupos')}
              className={`flex-1 py-2.5 text-xs font-bold border-b-2 transition-all cursor-pointer ${
                activeTab === 'grupos'
                  ? 'border-[#00d29d] text-[#00d29d]'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Grupos & Comunidades
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-teal-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Buscar nas mensagens..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-900 border border-teal-900/50 rounded-2xl text-white placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
            />
          </div>

          {/* Chat Items List */}
          <div className="space-y-2.5">
            {filteredChats.map((chat) => (
              <div
                key={chat.id}
                onClick={() => setActiveChatId(chat.id)}
                className="glass-card rounded-2xl p-3.5 sm:p-4 border border-teal-500/20 hover:border-teal-400/50 transition-all flex items-center justify-between gap-3 cursor-pointer group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="relative shrink-0">
                    <img
                      src={chat.participantAvatar}
                      alt={chat.participantName}
                      className="w-12 h-12 rounded-full object-cover border border-teal-500/40"
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#00d29d] ring-2 ring-[#070e13]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-white group-hover:text-[#00d29d] transition-colors truncate">
                        {chat.participantName}
                      </h3>
                      <span className="text-[10px] text-slate-500 shrink-0 ml-2">
                        {chat.lastTimestamp}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 truncate mt-0.5 font-normal">
                      {chat.lastMessage}
                    </p>
                  </div>
                </div>

                {chat.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#00d29d] text-black text-[10px] font-black flex items-center justify-center shrink-0">
                    {chat.unreadCount}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
