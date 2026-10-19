import React, { useState } from 'react';
import { Character } from '../types';
import { Sun, Droplets, Sprout, Leaf, Wind, Sparkles, Cloud, HeartHandshake } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  showDialogue?: boolean;
  size?: 'sm' | 'md' | 'lg';
  compact?: boolean;
  onClick?: () => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sun,
  Droplets,
  Sprout,
  Leaf,
  Wind,
  Sparkles,
  Cloud,
  HeartHandshake,
};

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  showDialogue = true,
  size = 'md',
  compact = false,
  onClick,
}) => {
  const [imgError, setImgError] = useState(false);
  const IconComponent = ICON_MAP[character.iconName] || Sprout;

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-32 h-32 sm:w-40 sm:h-40',
  }[size];

  if (compact) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 p-3 rounded-2xl bg-white/90 border border-emerald-100 shadow-xs hover:shadow-md transition-all ${
          onClick ? 'cursor-pointer hover:scale-[1.02]' : ''
        }`}
      >
        <div className={`relative overflow-hidden rounded-xl border-2 ${character.borderColor} bg-emerald-50 shrink-0 w-14 h-14`}>
          {!imgError ? (
            <img
              src={character.imagePath}
              alt={character.name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover object-center"
              loading="lazy"
            />
          ) : (
            <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${character.color} text-white`}>
              <IconComponent className="w-7 h-7" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-heading font-bold text-slate-800 text-sm truncate">{character.name}</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${character.badgeBg}`}>
              {character.role}
            </span>
          </div>
          <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">{character.alias}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center p-4 rounded-3xl bg-white border-2 border-emerald-100 shadow-md transition-all duration-300 hover:border-emerald-300 hover:shadow-lg ${
        onClick ? 'cursor-pointer hover:-translate-y-1' : ''
      }`}
    >
      {/* Role Badge */}
      <div className={`text-xs font-bold px-3 py-1 rounded-full border mb-3 ${character.badgeBg}`}>
        {character.role}
      </div>

      {/* Character Image */}
      <div className={`relative rounded-2xl overflow-hidden border-3 ${character.borderColor} shadow-inner bg-slate-50 ${sizeClasses}`}>
        {!imgError ? (
          <img
            src={character.imagePath}
            alt={character.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${character.color} text-white p-3 text-center`}>
            <IconComponent className="w-10 h-10 mb-1 drop-shadow-xs" />
            <span className="text-[11px] font-bold leading-tight">{character.name}</span>
          </div>
        )}
      </div>

      {/* Name & Alias */}
      <h3 className="font-heading font-bold text-slate-800 text-base sm:text-lg mt-3 text-center">
        {character.name}
      </h3>
      <p className="text-xs font-semibold text-emerald-600 mb-2 text-center">
        {character.alias}
      </p>

      {/* Dialogue / Bio */}
      {showDialogue && (
        <div className="relative mt-2 p-3 bg-emerald-50/80 rounded-2xl border border-emerald-200/60 text-slate-700 text-xs text-center leading-relaxed">
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-emerald-50 rotate-45 border-t border-l border-emerald-200/60" />
          "{character.dialogue}"
        </div>
      )}
    </div>
  );
};
