import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  MapPin,
  Calendar,
  UtensilsCrossed,
  Building2,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';

export const InteractiveMapScreen: React.FC = () => {
  const { navigateTab, events, companies, restaurants } = useApp();

  const [activeCategory, setActiveCategory] = useState<'todos' | 'eventos' | 'happyhour' | 'empresas'>('todos');
  const [selectedPin, setSelectedPin] = useState<{
    id: string;
    title: string;
    subtitle: string;
    category: 'evento' | 'happyhour' | 'empresa';
    address: string;
    image: string;
    x: number; // percentage
    y: number; // percentage
    data?: any;
  } | null>(null);

  const pins = [
    {
      id: 'pin_tech',
      title: 'Tech Solutions (HQ)',
      subtitle: 'Empresa Tech • 12 vagas abertas',
      category: 'empresa' as const,
      address: 'Cais do Apolo, 220 — Bairro do Recife',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&auto=format&fit=crop&q=80',
      x: 35,
      y: 28,
      data: companies[0],
    },
    {
      id: 'pin_bistro',
      title: 'Bistrô Empresarial & Happy Hour',
      subtitle: 'Hoje às 19h • 52 confirmados',
      category: 'happyhour' as const,
      address: 'Rua do Bom Jesus, 192 — Recife Antigo',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=80',
      x: 48,
      y: 42,
      data: restaurants[0],
    },
    {
      id: 'pin_hotel',
      title: 'Hotel Atlântico — Palestra IA',
      subtitle: '12 Mai às 19h • Palestra Inovação',
      category: 'evento' as const,
      address: 'Av. Boa Viagem, 1400 — Boa Viagem',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&auto=format&fit=crop&q=80',
      x: 65,
      y: 75,
      data: events[0],
    },
    {
      id: 'pin_villa',
      title: 'Villa Gourmet Rooftop',
      subtitle: 'Networking B2B & Drinks',
      category: 'happyhour' as const,
      address: 'Av. Boa Viagem, 3140 — Cobertura',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&auto=format&fit=crop&q=80',
      x: 72,
      y: 82,
      data: restaurants[1],
    },
    {
      id: 'pin_inova',
      title: 'Inova Digital Studio',
      subtitle: 'Estúdio de Software & Design',
      category: 'empresa' as const,
      address: 'Rua da Moeda, 85 — Recife Antigo',
      image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=200&auto=format&fit=crop&q=80',
      x: 40,
      y: 50,
      data: companies[1],
    },
  ];

  const filteredPins = pins.filter((p) => {
    if (activeCategory === 'todos') return true;
    if (activeCategory === 'eventos') return p.category === 'evento';
    if (activeCategory === 'happyhour') return p.category === 'happyhour';
    if (activeCategory === 'empresas') return p.category === 'empresa';
    return true;
  });

  return (
    <div className="space-y-4 pb-20">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white font-['Space_Grotesk'] tracking-tight">
          Mapa do Ecossistema
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Descubra eventos, happy hours, empresas e espaços corporativos ao seu redor.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar text-xs">
        {[
          { id: 'todos', label: 'Todos os Locais' },
          { id: 'eventos', label: 'Eventos' },
          { id: 'happyhour', label: 'Happy Hours' },
          { id: 'empresas', label: 'Empresas' },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id as any)}
            className={`px-3.5 py-1.5 rounded-full border transition-all cursor-pointer whitespace-nowrap ${
              activeCategory === cat.id
                ? 'bg-[#00d29d] text-black font-bold border-[#00d29d]'
                : 'bg-slate-900/70 border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Radar / Stylized Dark Map Container */}
      <div className="relative w-full h-[400px] sm:h-[480px] rounded-3xl overflow-hidden border border-teal-500/30 bg-[#061017] shadow-2xl">
        {/* Map Grid and Topography Background Vector */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00d29d" strokeWidth="0.5" opacity="0.25" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
            {/* Curved river / coastline paths simulating Recife Capibaribe water basins */}
            <path
              d="M 10 200 Q 150 180 250 260 T 400 380 T 600 450"
              fill="none"
              stroke="#00b4d8"
              strokeWidth="12"
              opacity="0.35"
              strokeLinecap="round"
            />
            <path
              d="M 120 10 Q 220 120 280 210 T 500 310"
              fill="none"
              stroke="#00b4d8"
              strokeWidth="8"
              opacity="0.25"
            />
          </svg>
        </div>

        {/* Ambient Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 rounded-full border border-teal-500/15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full border border-teal-500/10 pointer-events-none" />

        {/* Region Labels */}
        <span className="absolute top-4 left-4 text-[10px] font-extrabold uppercase tracking-widest text-teal-400/80 bg-black/60 px-2.5 py-1 rounded-full border border-teal-900/60 backdrop-blur-md">
          Região Metropolitana do Recife • PE
        </span>

        {/* Interactive Map Pins */}
        {filteredPins.map((pin) => {
          const isSelected = selectedPin?.id === pin.id;
          const pinColor =
            pin.category === 'evento'
              ? 'bg-purple-500 text-white shadow-[0_0_15px_#a855f7]'
              : pin.category === 'happyhour'
              ? 'bg-rose-500 text-white shadow-[0_0_15px_#f43f5e]'
              : 'bg-[#00d29d] text-black shadow-[0_0_15px_#00d29d]';

          return (
            <div
              key={pin.id}
              onClick={() => setSelectedPin(pin)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform hover:scale-125 z-20 group"
              style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
            >
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border-2 border-[#061017] ${pinColor} ${
                  isSelected ? 'ring-4 ring-white scale-125' : ''
                }`}
              >
                {pin.category === 'evento' ? (
                  <Calendar className="w-4 h-4" />
                ) : pin.category === 'happyhour' ? (
                  <UtensilsCrossed className="w-4 h-4" />
                ) : (
                  <Building2 className="w-4 h-4" />
                )}
              </div>
              <span className="absolute top-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-bold text-white bg-black/80 px-2 py-0.5 rounded shadow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                {pin.title}
              </span>
            </div>
          );
        })}

        {/* Bottom Popup Card for Selected Pin */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 z-30 glass-card rounded-2xl p-4 border border-teal-500/40 shadow-2xl animate-in slide-in-from-bottom-3 duration-200">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedPin.image}
                  alt={selectedPin.title}
                  className="w-12 h-12 rounded-xl object-cover border border-teal-800 shrink-0"
                />
                <div>
                  <span className="text-[9px] uppercase font-bold text-teal-400 block">
                    {selectedPin.category}
                  </span>
                  <h3 className="text-sm font-bold text-white">{selectedPin.title}</h3>
                  <p className="text-xs text-slate-300">{selectedPin.subtitle}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-slate-500" />
                    {selectedPin.address}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  if (selectedPin.category === 'evento') {
                    navigateTab('evento_detalhe', { event: selectedPin.data });
                  } else if (selectedPin.category === 'happyhour') {
                    navigateTab('happyhour');
                  } else {
                    navigateTab('empresa_detalhe', { company: selectedPin.data });
                  }
                }}
                className="px-3.5 py-2 rounded-xl bg-[#00d29d] text-black font-extrabold text-xs hover:opacity-90 transition-all shrink-0 cursor-pointer"
              >
                Abrir
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
