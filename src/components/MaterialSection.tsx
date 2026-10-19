import React, { useState } from 'react';
import { MATERIAL_CARDS, MaterialCardData } from '../data/materials';
import { CHARACTERS } from '../data/characters';
import { Character } from '../types';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ArrowRight,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  Sun,
  Droplets,
  Cloud,
  Leaf,
  Wind,
  ShieldCheck,
  HeartHandshake,
  Sprout
} from 'lucide-react';

interface MaterialSectionProps {
  onStartQuiz: () => void;
  onSelectCharacter: (char: Character) => void;
}

const ICON_MAP: Record<string, React.ElementType> = {
  Sun,
  Droplets,
  Cloud,
  Leaf,
  Wind,
  Sparkles,
  ShieldCheck,
  HeartHandshake,
  Sprout,
};

export const MaterialSection: React.FC<MaterialSectionProps> = ({
  onStartQuiz,
  onSelectCharacter,
}) => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const card: MaterialCardData = MATERIAL_CARDS[currentCardIndex];
  const isLastCard = currentCardIndex === MATERIAL_CARDS.length - 1;

  const handleNext = () => {
    if (currentCardIndex < MATERIAL_CARDS.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-4 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Section Header */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
          <BookOpen className="w-4 h-4 text-emerald-600" />
          Bagian 1: Ringkasan Materi Interaktif
        </div>
        <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
          Rahasia Tumbuhan Membuat Makanan
        </h2>
        <p className="text-sm text-slate-600 mt-1 max-w-xl mx-auto">
          Pelajari 5 kartu seru di bawah ini sebelum menguji kemampuanmu di kuis berhadiah poin bintang!
        </p>

        {/* Card Navigator Pills */}
        <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
          {MATERIAL_CARDS.map((item, index) => {
            const isActive = index === currentCardIndex;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentCardIndex(index);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-3 py-1.5 rounded-xl font-heading font-bold text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md scale-105'
                    : 'bg-white hover:bg-emerald-50 text-slate-700 border border-emerald-200'
                }`}
              >
                Kartu {index + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Material Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-3 border-emerald-200 relative overflow-hidden transition-all duration-300">
        {/* Card Header & Guide Characters */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-emerald-100 mb-6">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100/80 px-3 py-1 rounded-full">
              {card.badge}
            </span>
            <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-slate-800 mt-2">
              {card.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-emerald-600 mt-0.5">
              {card.subtitle}
            </p>
          </div>

          {/* Characters in this card */}
          <div className="flex items-center gap-2 bg-emerald-50/70 p-2 rounded-2xl border border-emerald-200 shrink-0">
            <span className="text-[11px] font-bold text-emerald-800 px-1 hidden sm:inline">Pemandu:</span>
            <div className="flex items-center -space-x-2">
              {card.characterIds.map((cid) => {
                const char = CHARACTERS[cid];
                if (!char) return null;
                return (
                  <button
                    key={cid}
                    type="button"
                    onClick={() => onSelectCharacter(char)}
                    title={`Klik untuk kenalan dengan ${char.name}`}
                    className="relative w-10 h-10 rounded-full border-2 border-white shadow-xs overflow-hidden bg-white hover:scale-115 hover:z-10 transition-transform cursor-pointer"
                  >
                    <img
                      src={char.imagePath}
                      alt={char.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lead sentence */}
        <div className="text-base sm:text-lg font-bold text-slate-800 leading-relaxed mb-4 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100">
          🌱 {card.content.lead}
        </div>

        {/* Paragraphs */}
        <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed mb-6 font-medium">
          {card.content.paragraphs.map((para, i) => (
            <p
              key={i}
              dangerouslySetInnerHTML={{
                __html: para
                  .replace(/\*\*(.*?)\*\*/g, '<strong class="text-emerald-900 font-bold">$1</strong>')
              }}
            />
          ))}
        </div>

        {/* Card 3: Interactive Flowchart / Formula */}
        {card.content.formula && (
          <div className="my-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-sky-50 border-2 border-emerald-200">
            <div className="text-center font-heading font-extrabold text-base sm:text-lg text-emerald-950 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              Bagan Alur Proses Fotosintesis
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Inputs */}
              <div className="space-y-2 bg-white/90 p-4 rounded-2xl border border-emerald-200 shadow-xs">
                <div className="text-xs font-extrabold text-amber-700 uppercase tracking-wider text-center mb-2">
                  Bahan & Energi yang Masuk
                </div>
                {card.content.formula.inputs.map((inp, idx) => {
                  const char = CHARACTERS[inp.charId];
                  return (
                    <div
                      key={idx}
                      onClick={() => char && onSelectCharacter(char)}
                      className="flex items-center gap-3 p-2 rounded-xl bg-amber-50/60 border border-amber-200/60 hover:bg-amber-100/70 transition-colors cursor-pointer"
                    >
                      {char && (
                        <img
                          src={char.imagePath}
                          alt={char.name}
                          className="w-8 h-8 rounded-full border border-amber-300 object-cover"
                        />
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-800">{inp.name}</div>
                        <div className="text-[10px] text-slate-500">{inp.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Center Process */}
              <div className="flex flex-col items-center justify-center p-4 bg-emerald-600 text-white rounded-2xl shadow-md text-center">
                <span className="text-xs uppercase font-extrabold text-emerald-200">
                  Dapur Pengolahan
                </span>
                <div className="font-heading font-extrabold text-base sm:text-lg mt-1">
                  {card.content.formula.process.name}
                </div>
                <div className="text-xs text-emerald-100 mt-1 bg-emerald-700/60 px-3 py-1 rounded-full">
                  {card.content.formula.process.place}
                </div>
                <div className="text-xs text-emerald-200 mt-2">
                  Mengubah bahan menjadi makanan lezat!
                </div>
              </div>

              {/* Outputs */}
              <div className="space-y-2 bg-white/90 p-4 rounded-2xl border border-emerald-200 shadow-xs">
                <div className="text-xs font-extrabold text-teal-700 uppercase tracking-wider text-center mb-2">
                  Hasil yang Dikeluarkan
                </div>
                {card.content.formula.outputs.map((out, idx) => {
                  const char = CHARACTERS[out.charId];
                  return (
                    <div
                      key={idx}
                      onClick={() => char && onSelectCharacter(char)}
                      className="flex items-center gap-3 p-2 rounded-xl bg-teal-50/60 border border-teal-200/60 hover:bg-teal-100/70 transition-colors cursor-pointer"
                    >
                      {char && (
                        <img
                          src={char.imagePath}
                          alt={char.name}
                          className="w-8 h-8 rounded-full border border-teal-300 object-cover"
                        />
                      )}
                      <div>
                        <div className="text-xs font-bold text-slate-800">{out.name}</div>
                        <div className="text-[10px] text-slate-500">{out.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Highlight Box Items (Card 1, 2, 4) */}
        {card.content.highlightBox && (
          <div className="my-5 p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
            <h4 className="font-heading font-extrabold text-emerald-900 text-base mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              {card.content.highlightBox.title}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {card.content.highlightBox.items.map((item, idx) => {
                const ItemIcon = ICON_MAP[item.icon] || Sparkles;
                return (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-emerald-100 shadow-xs hover:border-emerald-300 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                        <ItemIcon className="w-3.5 h-3.5" />
                      </div>
                      <div className="font-heading font-bold text-sm text-slate-800">
                        {item.title}
                      </div>
                    </div>
                    <div className="text-xs text-slate-600 leading-relaxed pl-8">
                      {item.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Card 5: Summary Grid */}
        {card.content.summaryItems && (
          <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {card.content.summaryItems.map((item, idx) => {
              const char = CHARACTERS[item.charId];
              return (
                <div
                  key={idx}
                  onClick={() => char && onSelectCharacter(char)}
                  className="p-4 rounded-2xl bg-white border-2 border-emerald-200 shadow-xs hover:border-emerald-400 hover:shadow-md transition-all flex items-start gap-3.5 cursor-pointer"
                >
                  {char && (
                    <img
                      src={char.imagePath}
                      alt={char.name}
                      className="w-12 h-12 rounded-xl object-cover border-2 border-emerald-200 shrink-0"
                    />
                  )}
                  <div>
                    <span className="text-[11px] font-extrabold uppercase tracking-wide text-emerald-600 block">
                      {item.label}
                    </span>
                    <span className="font-heading font-bold text-sm sm:text-base text-slate-800">
                      {item.value}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Did You Know Box */}
        {card.content.didYouKnow && (
          <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-slate-700 text-xs sm:text-sm flex items-start gap-2.5 my-4">
            <Lightbulb className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
            <p>
              <strong className="font-bold text-amber-900">Tahukah Kamu?</strong>{' '}
              {card.content.didYouKnow}
            </p>
          </div>
        )}

        {/* Navigation & Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-emerald-100 mt-6">
          <button
            onClick={handlePrev}
            disabled={currentCardIndex === 0}
            className={`w-full sm:w-auto px-5 py-3 rounded-2xl font-heading font-bold text-sm flex items-center justify-center gap-1.5 transition-all ${
              currentCardIndex === 0
                ? 'opacity-40 bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-200 cursor-pointer active:scale-95'
            }`}
          >
            <ChevronLeft className="w-5 h-5" />
            Sebelumnya
          </button>

          <div className="text-xs font-bold text-slate-500">
            Halaman {currentCardIndex + 1} dari {MATERIAL_CARDS.length}
          </div>

          {!isLastCard ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              Berikutnya
              <ChevronRight className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onStartQuiz}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-heading font-extrabold text-base shadow-lg shadow-amber-200 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group cursor-pointer animate-pulse-subtle"
            >
              <span>Siap Mengikuti Kuis!</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
