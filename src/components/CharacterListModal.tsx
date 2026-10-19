import React from 'react';
import { Character } from '../types';
import { CHARACTER_LIST } from '../data/characters';
import { X, Sparkles, Users } from 'lucide-react';

interface CharacterListModalProps {
  onClose: () => void;
  onSelectCharacter: (char: Character) => void;
}

export const CharacterListModal: React.FC<CharacterListModalProps> = ({
  onClose,
  onSelectCharacter,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-300 max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                Koleksi Pemandu Cilik
              </span>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl mt-0.5">
                8 Sahabat Fotosintesis
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
            aria-label="Tutup"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lineup Banner */}
        <div className="p-4 bg-emerald-50/70 border-b border-emerald-100 flex items-center justify-between gap-3 text-xs text-emerald-900 font-semibold">
          <span>🌟 Klik pada salah satu karakter untuk membaca rahasianya!</span>
          <span className="text-[11px] bg-emerald-200/70 px-2 py-0.5 rounded-full text-emerald-800 font-bold">
            8 Karakter Lengkap
          </span>
        </div>

        {/* 8 Characters Grid */}
        <div className="p-5 sm:p-6 overflow-y-auto grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {CHARACTER_LIST.map((char) => (
            <div
              key={char.id}
              onClick={() => {
                onSelectCharacter(char);
              }}
              className="p-3.5 rounded-2xl bg-white border-2 border-emerald-100 hover:border-emerald-400 hover:shadow-lg transition-all text-center group cursor-pointer active:scale-95 flex flex-col items-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-slate-200 group-hover:border-emerald-400 shadow-xs mb-2.5 bg-slate-50">
                <img
                  src={char.imagePath}
                  alt={char.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
              </div>

              <div className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border mb-1 truncate max-w-full ${char.badgeBg}`}>
                {char.role}
              </div>

              <h4 className="font-heading font-bold text-slate-800 text-sm truncate max-w-full">
                {char.name}
              </h4>
              <p className="text-[11px] text-emerald-600 line-clamp-1">
                {char.alias}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs transition-colors cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
