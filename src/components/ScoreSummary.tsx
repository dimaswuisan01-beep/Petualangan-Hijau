import React, { useEffect } from 'react';
import { QuizResult } from '../types';
import { QUIZ_QUESTIONS } from '../data/questions';
import { CHARACTERS } from '../data/characters';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Sparkles,
  CheckCircle2,
  XCircle,
  RefreshCw,
  BookOpen,
  ArrowRight,
  Award,
} from 'lucide-react';

interface ScoreSummaryProps {
  quizResult: QuizResult;
  onOpenTeacher: () => void;
  onContinueToReflection: () => void;
  onReviewMaterial: () => void;
  onRestartQuiz: () => void;
}

export const ScoreSummary: React.FC<ScoreSummaryProps> = ({
  quizResult,
  onOpenTeacher,
  onContinueToReflection,
  onReviewMaterial,
  onRestartQuiz,
}) => {
  const { score, correctCount, wrongCount, category, student, answers } = quizResult;

  // Trigger celebration confetti for high score
  useEffect(() => {
    if (score >= 80) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#10b981', '#f59e0b', '#3b82f6', '#ec4899', '#84cc16'],
        });
      } catch (e) {
        // Safe fallback if canvas not available
      }
    }
  }, [score]);

  // Review of questions that were missed
  const missedQuestions = QUIZ_QUESTIONS.filter((q) => answers[q.id] !== q.correctAnswer);

  const getCategoryDetails = () => {
    if (score >= 80) {
      return {
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        cardBg: 'from-emerald-500 to-green-600',
        message: 'Keren! Kamu sudah memahami banyak hal tentang fotosintesis. Terus jaga rasa ingin tahumu!',
        iconColor: 'text-amber-300',
      };
    } else if (score >= 60) {
      return {
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        cardBg: 'from-amber-500 to-yellow-600',
        message: 'Bagus! Kamu sudah belajar banyak. Yuk, baca kembali materi yang masih membingungkan.',
        iconColor: 'text-amber-100',
      };
    } else {
      return {
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
        cardBg: 'from-sky-500 to-blue-600',
        message: 'Terima kasih sudah berusaha! Setiap percobaan membuatmu semakin pintar. Kamu boleh membaca materi lagi dan berlatih kembali.',
        iconColor: 'text-sky-100',
      };
    }
  };

  const catDetails = getCategoryDetails();

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Hero Score Badge */}
      <div className={`rounded-3xl p-6 sm:p-8 bg-gradient-to-r ${catDetails.cardBg} text-white shadow-xl relative overflow-hidden mb-6`}>
        {/* Background glow */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative text-center">
          <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-3">
            <Trophy className={`w-4 h-4 ${catDetails.iconColor}`} />
            Hasil Kuis Petualangan
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
            {category}
          </h2>

          <div className="my-5 flex items-baseline justify-center gap-2">
            <span className="font-heading font-black text-6xl sm:text-7xl drop-shadow-md">
              {score}
            </span>
            <span className="text-xl sm:text-2xl font-bold opacity-80">/ 100 Poin</span>
          </div>

          <p className="max-w-lg mx-auto text-sm sm:text-base font-semibold opacity-95 leading-relaxed bg-white/10 p-3 rounded-2xl backdrop-blur-xs">
            "{catDetails.message}"
          </p>

          <div className="mt-4 text-xs font-bold opacity-80">
            Penjelajah: {student.name} • {student.className} • {student.school}
          </div>
        </div>
      </div>

      {/* Breakdown Cards (Correct vs Wrong) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-emerald-200 shadow-md flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Jawaban Benar</div>
            <div className="font-heading font-extrabold text-2xl text-emerald-700">
              {correctCount} <span className="text-sm font-normal text-slate-400">/ 5 soal</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 sm:p-5 rounded-3xl border-2 border-amber-200 shadow-md flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <XCircle className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500 uppercase">Perlu Latihan</div>
            <div className="font-heading font-extrabold text-2xl text-amber-700">
              {wrongCount} <span className="text-sm font-normal text-slate-400">/ 5 soal</span>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Recorded Notification Card */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-emerald-200 shadow-md mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="font-heading font-bold text-slate-800 text-sm sm:text-base">
              Nilai Berhasil Dicatat ke Leaderboard Guru!
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Skor {score} atas nama {student.name} ({student.school}) telah tersimpan dan siap dicetak oleh guru.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenTeacher}
          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-bold text-xs flex items-center gap-1.5 shadow-xs transition-all active:scale-95 cursor-pointer shrink-0"
        >
          <Trophy className="w-4 h-4 text-amber-800" />
          <span>Lihat Leaderboard & Cetak</span>
        </button>
      </div>

      {/* Concept Review Card if any wrong */}
      {missedQuestions.length > 0 && (
        <div className="bg-white rounded-3xl p-5 sm:p-6 border-2 border-amber-200 shadow-md mb-6">
          <h3 className="font-heading font-bold text-slate-800 text-base mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-amber-500" />
            Tips Pengingat dari Sahabat Fotosintesis:
          </h3>
          <div className="space-y-3">
            {missedQuestions.map((q) => {
              const char = CHARACTERS[q.characterId];
              return (
                <div
                  key={q.id}
                  className="p-3.5 rounded-2xl bg-amber-50/70 border border-amber-200 flex items-start gap-3"
                >
                  {char && (
                    <img
                      src={char.imagePath}
                      alt={char.name}
                      className="w-10 h-10 rounded-xl object-cover border border-amber-300 shrink-0"
                    />
                  )}
                  <div className="text-xs leading-relaxed text-slate-700">
                    <span className="font-bold text-amber-900 block mb-0.5">
                      Soal {q.id}: {q.topic}
                    </span>
                    {q.feedbackWrong}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={onReviewMaterial}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-heading font-bold text-xs sm:text-sm border-2 border-slate-200 shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-600" />
            Pelajari Materi Lagi
          </button>

          <button
            onClick={onRestartQuiz}
            className="flex-1 sm:flex-initial px-4 py-3 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-heading font-bold text-xs sm:text-sm border-2 border-slate-200 shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-4 h-4 text-amber-600" />
            Ulangi Kuis (Sesi Baru)
          </button>
        </div>

        <button
          onClick={onContinueToReflection}
          className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-heading font-extrabold text-base shadow-lg shadow-emerald-200 hover:shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
        >
          <span>Lanjut ke Refleksi Belajar</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};
