import React from 'react';
import { Character } from '../types';
import { X, Sparkles, BookOpen, MessageCircle } from 'lucide-react';

interface CharacterModalProps {
  character: Character | null;
  onClose: () => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({ character, onClose }) => {
  if (!character) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border-4 border-emerald-200 overflow-hidden">
        {/* Header decoration */}
        <div className={`h-24 bg-gradient-to-r ${character.color} relative p-4 flex items-start justify-between`}>
          <span className={`text-xs font-bold px-3 py-1 rounded-full bg-white/90 shadow-xs text-slate-800`}>
            {character.role}
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-slate-900 transition-colors shadow-xs"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 pt-0 relative">
          {/* Avatar overlap */}
          <div className="flex justify-center -mt-14 mb-4">
            <div className={`w-28 h-28 rounded-2xl overflow-hidden border-4 border-white shadow-lg bg-emerald-50`}>
              <img
                src={character.imagePath}
                alt={character.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
          </div>

          <div className="text-center mb-5">
            <h3 className="font-heading text-2xl font-bold text-slate-800">{character.name}</h3>
            <p className="text-sm font-semibold text-emerald-600">{character.alias}</p>
          </div>

          {/* Speech Bubble */}
          <div className="mb-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-700 text-sm leading-relaxed relative">
            <div className="flex items-center gap-1.5 font-bold text-emerald-800 mb-1 text-xs uppercase tracking-wide">
              <MessageCircle className="w-4 h-4" /> Pesan untukmu
            </div>
            "{character.dialogue}"
          </div>

          {/* Role details */}
          <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/60 text-slate-700 text-sm leading-relaxed">
            <div className="flex items-center gap-1.5 font-bold text-amber-900 mb-1 text-xs uppercase tracking-wide">
              <BookOpen className="w-4 h-4 text-amber-600" /> Peran dalam Fotosintesis
            </div>
            <p>{character.description}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full mt-6 py-3 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold font-heading text-base shadow-md transition-all active:scale-[0.98]"
          >
            Kembali ke Petualangan
          </button>
        </div>
      </div>
    </div>
  );
};
