import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  Camera,
  Briefcase,
  Calendar,
  Sparkles,
  Handshake,
  GraduationCap,
  Megaphone,
  CheckCircle,
} from 'lucide-react';

export const CreateModal: React.FC = () => {
  const { isCreateModalOpen, setIsCreateModalOpen, createNewPost, currentUser } = useApp();

  const [postType, setPostType] = useState<
    'momento' | 'oportunidade' | 'vaga' | 'evento' | 'curso' | 'negocio' | 'anuncio'
  >('momento');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  if (!isCreateModalOpen) return null;

  const typeOptions = [
    { id: 'momento', label: 'Momento', icon: Camera, desc: 'Bastidores, fotos e conquistas', tag: 'Bastidores' },
    { id: 'oportunidade', label: 'Oportunidade', icon: Sparkles, desc: 'Oportunidades em aberto', tag: 'Oportunidade' },
    { id: 'vaga', label: 'Vaga', icon: Briefcase, desc: 'Contratação para sua equipe', tag: 'Vaga de Emprego' },
    { id: 'evento', label: 'Evento', icon: Calendar, desc: 'Encontro, palestra ou happy hour', tag: 'Evento' },
    { id: 'negocio', label: 'Negócio', icon: Handshake, desc: 'Procuro ou ofereço parcerias B2B', tag: 'Parceria B2B' },
    { id: 'curso', label: 'Curso', icon: GraduationCap, desc: 'Workshop ou capacitação', tag: 'Academy' },
    { id: 'anuncio', label: 'Anúncio', icon: Megaphone, desc: 'Divulgação corporativa', tag: 'Destaque' },
  ] as const;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createNewPost({
      type: postType === 'momento' ? 'momento' : postType === 'vaga' ? 'vaga' : postType === 'evento' ? 'evento' : 'negocio',
      content,
      image: imageUrl || undefined,
      tag: tag || typeOptions.find((t) => t.id === postType)?.tag,
      metaData: {
        badgeText: `${postType.toUpperCase()} • ${currentUser.city}`,
      },
    });

    setContent('');
    setImageUrl('');
    setIsCreateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0b161e] border border-teal-500/30 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-5 py-4 border-b border-teal-900/40 flex items-center justify-between bg-[#081117]">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#00b4d8] to-[#00d29d] flex items-center justify-center text-black font-bold text-sm">
              +
            </span>
            <div>
              <h2 className="text-base font-bold text-white">Criar Nova Publicação</h2>
              <p className="text-xs text-slate-400">Compartilhe com todo o ecossistema CONEXX</p>
            </div>
          </div>
          <button
            onClick={() => setIsCreateModalOpen(false)}
            className="p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Post Type Selector Horizontal Pills */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Tipo de Publicação
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {typeOptions.map((opt) => {
                const Icon = opt.icon;
                const isSelected = postType === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setPostType(opt.id);
                      setTag(opt.tag);
                    }}
                    className={`p-2.5 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer text-center ${
                      isSelected
                        ? 'bg-teal-950/70 border-[#00d29d] text-[#00d29d] ring-1 ring-[#00d29d]'
                        : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] font-semibold">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* User Preview */}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-9 h-9 rounded-full object-cover border border-teal-500/40"
            />
            <div>
              <p className="text-xs font-bold text-white">{currentUser.name}</p>
              <p className="text-[11px] text-teal-400">
                Publicando como {currentUser.title} • Score {currentUser.conexxScore.total}
              </p>
            </div>
          </div>

          {/* Text Area */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              O que você quer compartilhar ou propor?
            </label>
            <textarea
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Descreva a vaga, oportunidade de negócio, novidade ou evento..."
              className="w-full p-3 text-sm bg-slate-900/90 border border-teal-900/40 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d] focus:ring-1 focus:ring-[#00d29d]"
              required
            />
          </div>

          {/* Image URL input (optional) */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              Imagem de capa ou foto (URL opcional)
            </label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://exemplo.com/foto.jpg"
              className="w-full px-3 py-2 text-xs bg-slate-900/90 border border-teal-900/40 rounded-xl text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-[#00d29d]"
            />
          </div>

          {/* Quick presets for testing */}
          <div className="pt-1">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">
              Sugestões rápidas:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                'Buscando desenvolvedor Fullstack em Recife',
                'Networking aberto hoje para troca de experiências B2B',
                'Ofereço mentoria sobre captação e growth',
              ].map((sug, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setContent(sug)}
                  className="text-[10px] px-2 py-1 rounded bg-slate-800 text-teal-300 hover:bg-slate-700 transition-colors"
                >
                  {sug}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={!content.trim()}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-500 to-[#00d29d] text-black font-extrabold text-sm hover:opacity-95 disabled:opacity-50 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(0,210,157,0.3)]"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Publicar no CONEXX (+12 Score)</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
