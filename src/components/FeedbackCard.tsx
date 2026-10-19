import React from 'react';
import { CHARACTERS } from '../data/characters';
import { CheckCircle2, XCircle, ArrowRight, Sparkles } from 'lucide-react';

interface FeedbackCardProps {
  isCorrect: boolean;
  feedbackText: string;
  characterId: string;
  onNext: () => void;
  isLastQuestion: boolean;
}

export const FeedbackCard: React.FC<FeedbackCardProps> = ({
  isCorrect,
  feedbackText,
  characterId,
  onNext,
  isLastQuestion,
}) => {
  const character = CHARACTERS[characterId] || CHARACTERS['tumbuhan'];

  return (
    <div
      className={`mt-6 p-5 sm:p-6 rounded-3xl border-3 shadow-lg transition-all duration-300 animate-in fade-in slide-in-from-bottom-3 ${
        isCorrect
          ? 'bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-emerald-300'
          : 'bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 border-amber-300'
      }`}
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
        {/* Character Avatar with badge */}
        <div className="relative shrink-0 text-center">
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-3 shadow-md bg-white ${
              isCorrect ? 'border-emerald-400' : 'border-amber-400'
            }`}
          >
            <img
              src={character.imagePath}
              alt={character.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <span className="inline-block mt-1 text-[11px] font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded-full border border-slate-200">
            {character.name}
          </span>
        </div>

        {/* Feedback Message */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2 mb-2">
            {isCorrect ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 text-white font-heading font-extrabold text-xs shadow-xs">
                <CheckCircle2 className="w-4 h-4" />
                Hebat! Jawabanmu Benar (+20 Poin)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 text-white font-heading font-extrabold text-xs shadow-xs">
                <XCircle className="w-4 h-4" />
                Yuk Pelajari Lagi (+0 Poin)
              </span>
            )}
          </div>

          <p className="text-slate-800 text-sm sm:text-base font-semibold leading-relaxed">
            "{feedbackText}"
          </p>
        </div>
      </div>

      {/* Next Question / Finish Button */}
      <div className="mt-5 pt-4 border-t border-slate-200/60 flex justify-end">
        <button
          onClick={onNext}
          className={`w-full sm:w-auto px-6 py-3 rounded-2xl font-heading font-bold text-sm sm:text-base text-white shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer ${
            isCorrect
              ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-200'
              : 'bg-amber-600 hover:bg-amber-700 shadow-amber-200'
          }`}
        >
          <span>{isLastQuestion ? 'Lihat Hasil Akhir Kuis' : 'Lanjut ke Soal Berikutnya'}</span>
          {isLastQuestion ? (
            <Sparkles className="w-5 h-5" />
          ) : (
            <ArrowRight className="w-5 h-5" />
          )}
        </button>
      </div>
    </div>
  );
};
