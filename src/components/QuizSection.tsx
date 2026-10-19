import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/questions';
import { CHARACTERS } from '../data/characters';
import { FeedbackCard } from './FeedbackCard';
import { Check, HelpCircle, Sparkles, BookOpen, AlertCircle, Award } from 'lucide-react';

interface QuizSectionProps {
  onFinishQuiz: (
    answers: { [qId: number]: 'A' | 'B' | 'C' | 'D' },
    correctCount: number,
    wrongCount: number,
    score: number
  ) => void;
  onReviewMaterial: () => void;
}

export const QuizSection: React.FC<QuizSectionProps> = ({
  onFinishQuiz,
  onReviewMaterial,
}) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [answersMap, setAnswersMap] = useState<{ [qId: number]: 'A' | 'B' | 'C' | 'D' }>({});
  const [correctScore, setCorrectScore] = useState(0);

  const question = QUIZ_QUESTIONS[currentIdx];
  const totalQuestions = QUIZ_QUESTIONS.length;
  const isLastQuestion = currentIdx === totalQuestions - 1;
  const guideCharacter = CHARACTERS[question.characterId] || CHARACTERS['daun'];

  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerChecked) return; // Locked once verified
    setSelectedAnswer(key);
  };

  const handleCheckAnswer = () => {
    if (!selectedAnswer || isAnswerChecked) return;

    const isCorrect = selectedAnswer === question.correctAnswer;
    setIsAnswerChecked(true);

    const newAnswersMap = { ...answersMap, [question.id]: selectedAnswer };
    setAnswersMap(newAnswersMap);

    if (isCorrect) {
      setCorrectScore((prev) => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerChecked(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Calculate final score
      const finalCorrect = correctScore;
      const finalWrong = totalQuestions - finalCorrect;
      const finalScore = finalCorrect * 20;

      onFinishQuiz(answersMap, finalCorrect, finalWrong, finalScore);
    }
  };

  const progressPercent = Math.round(((currentIdx + (isAnswerChecked ? 1 : 0)) / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto py-4 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Quiz Top Header & Progress */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-lg border-2 border-emerald-200 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Soal {currentIdx + 1} dari {totalQuestions}
              </span>
              <span className="text-xs font-bold text-slate-500">
                Topik: {question.topic}
              </span>
            </div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-800 mt-1">
              Kuis Petualangan Fotosintesis
            </h2>
          </div>

          {/* Current Score Badge */}
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 shrink-0">
            <Award className="w-5 h-5 text-amber-500" />
            <span className="text-xs font-extrabold text-amber-900">
              Skor Sementara: {correctScore * 20} Poin
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="bg-gradient-to-r from-emerald-500 to-green-400 h-full rounded-full transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div className="flex justify-between items-center text-[11px] font-bold text-slate-400 mt-1.5">
          <span>Mulai</span>
          <span>Progres {progressPercent}% Selesai</span>
          <span>Selesai</span>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-3 border-emerald-200 relative overflow-hidden">
        {/* Guide Character Banner */}
        <div className="flex items-center gap-3 p-3 rounded-2xl bg-emerald-50/70 border border-emerald-100 mb-6">
          <div className="w-12 h-12 rounded-xl overflow-hidden border-2 border-emerald-300 shrink-0 bg-white shadow-xs">
            <img
              src={guideCharacter.imagePath}
              alt={guideCharacter.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>
          <div>
            <div className="text-xs font-bold text-emerald-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              Pemandu Soal: {guideCharacter.name} ({guideCharacter.role})
            </div>
            <p className="text-xs text-slate-600">
              "Bacalah pertanyaan dengan teliti ya, jangan terburu-buru!"
            </p>
          </div>
        </div>

        {/* Question Text */}
        <div className="mb-6">
          <h3 className="font-heading font-extrabold text-lg sm:text-xl text-slate-800 leading-snug">
            {question.question}
          </h3>
        </div>

        {/* 4 Choices (A, B, C, D) */}
        <div className="space-y-3 mb-6">
          {question.options.map((option) => {
            const isSelected = selectedAnswer === option.key;
            const isCorrectOption = option.key === question.correctAnswer;

            let optionStyle = 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 text-slate-800';

            if (isAnswerChecked) {
              if (isCorrectOption) {
                optionStyle = 'bg-emerald-100/90 border-emerald-500 text-emerald-950 font-bold shadow-xs';
              } else if (isSelected && !isCorrectOption) {
                optionStyle = 'bg-rose-100/90 border-rose-400 text-rose-950 font-bold';
              } else {
                optionStyle = 'bg-slate-50 border-slate-200 text-slate-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-200 shadow-xs';
            }

            return (
              <button
                key={option.key}
                type="button"
                disabled={isAnswerChecked}
                onClick={() => handleSelectOption(option.key)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-3.5 group cursor-pointer ${optionStyle} ${
                  isAnswerChecked ? 'cursor-default' : 'active:scale-[0.99]'
                }`}
              >
                {/* Key Badge (A, B, C, D) */}
                <div
                  className={`w-9 h-9 rounded-xl font-heading font-extrabold text-sm flex items-center justify-center shrink-0 border transition-colors ${
                    isAnswerChecked && isCorrectOption
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : isAnswerChecked && isSelected && !isCorrectOption
                      ? 'bg-rose-600 text-white border-rose-700'
                      : isSelected
                      ? 'bg-emerald-600 text-white border-emerald-700'
                      : 'bg-slate-100 text-slate-700 border-slate-300 group-hover:bg-emerald-200 group-hover:text-emerald-900'
                  }`}
                >
                  {isAnswerChecked && isCorrectOption ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    option.key
                  )}
                </div>

                <span className="text-sm sm:text-base leading-snug flex-1 font-medium">
                  {option.text}
                </span>
              </button>
            );
          })}
        </div>

        {/* Action: Check Answer Button (only when not checked yet) */}
        {!isAnswerChecked && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onReviewMaterial}
              className="text-xs font-bold text-emerald-700 hover:text-emerald-800 hover:underline flex items-center gap-1.5 p-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Buka Ringkasan Materi Sebentar
            </button>

            <button
              type="button"
              disabled={!selectedAnswer}
              onClick={handleCheckAnswer}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-heading font-extrabold text-base transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                selectedAnswer
                  ? 'bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white shadow-emerald-200 active:scale-95 cursor-pointer'
                  : 'bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none'
              }`}
            >
              <span>Periksa Jawaban</span>
              <Check className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Immediate Feedback Card once checked */}
        {isAnswerChecked && selectedAnswer && (
          <FeedbackCard
            isCorrect={selectedAnswer === question.correctAnswer}
            feedbackText={
              selectedAnswer === question.correctAnswer
                ? question.feedbackCorrect
                : question.feedbackWrong
            }
            characterId={question.characterId}
            onNext={handleNextQuestion}
            isLastQuestion={isLastQuestion}
          />
        )}
      </div>
    </div>
  );
};
