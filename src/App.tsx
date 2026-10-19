import React, { useState, useEffect } from 'react';
import { AppStep, Student, QuizResult, ReflectionData, Character } from './types';
import { Navbar } from './components/Navbar';
import { StudentForm } from './components/StudentForm';
import { MaterialSection } from './components/MaterialSection';
import { QuizSection } from './components/QuizSection';
import { ScoreSummary } from './components/ScoreSummary';
import { ReflectionSection } from './components/ReflectionSection';
import { TeacherModal } from './components/TeacherModal';
import { CharacterModal } from './components/CharacterModal';
import { CharacterListModal } from './components/CharacterListModal';
import { CHARACTER_LIST } from './data/characters';
import { saveQuizResultToLeaderboard } from './services/studentRecords';
import {
  Sprout,
  Sparkles,
  ArrowRight,
  Award,
  BookOpen,
  Users,
  Trophy,
  RefreshCw,
  Heart,
  Printer,
} from 'lucide-react';

// Generate unique session ID (e.g. FOTO-17182910-4A9B)
const generateSessionId = (): string => {
  const dateStr = Date.now().toString(36).toUpperCase();
  const randStr = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `FOTO-${dateStr}-${randStr}`;
};

export const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>('welcome');
  const [student, setStudent] = useState<Student | null>(null);
  const [sessionId, setSessionId] = useState<string>(generateSessionId());

  // Quiz state
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);

  // Modals
  const [isTeacherOpen, setIsTeacherOpen] = useState(false);
  const [isCharactersListOpen, setIsCharactersListOpen] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);

  // Restore saved student profile from session if available
  useEffect(() => {
    const saved = sessionStorage.getItem('fotosintesis_active_student');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.name && parsed.className && parsed.school) {
          setStudent(parsed);
        }
      } catch (e) {
        // Ignore
      }
    }
  }, []);

  const handleStartAdventure = () => {
    if (student) {
      setCurrentStep('material');
    } else {
      setCurrentStep('student-form');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStudentSubmit = (studentData: Student) => {
    setStudent(studentData);
    sessionStorage.setItem('fotosintesis_active_student', JSON.stringify(studentData));
    setCurrentStep('material');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuiz = () => {
    setCurrentStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFinishQuiz = (
    answers: { [qId: number]: 'A' | 'B' | 'C' | 'D' },
    correctCount: number,
    wrongCount: number,
    score: number
  ) => {
    if (!student) return;

    let category: QuizResult['category'] = 'Penjelajah Pantang Menyerah!';
    if (score >= 80) {
      category = 'Penjelajah Fotosintesis Hebat!';
    } else if (score >= 60) {
      category = 'Penjelajah yang Terus Berkembang!';
    }

    const result: QuizResult = {
      sessionId,
      student,
      answers,
      correctCount,
      wrongCount,
      score,
      category,
      status: 'completed',
      timestamp: new Date().toISOString(),
    };

    setQuizResult(result);
    // Record directly to the local persistent teacher leaderboard
    saveQuizResultToLeaderboard(result);

    setCurrentStep('score');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartQuiz = () => {
    // Generate a fresh unique session ID for the new attempt
    const newSession = generateSessionId();
    setSessionId(newSession);
    setQuizResult(null);
    setCurrentStep('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueToReflection = () => {
    setCurrentStep('reflection');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitReflection = (_reflectionData: ReflectionData) => {
    // Reflection is saved in the session
  };

  const handleFinishApp = () => {
    setCurrentStep('completed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReviewMaterial = () => {
    setCurrentStep('material');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50/80 via-teal-50/40 to-green-50/80">
      {/* Top Navbar */}
      <Navbar
        currentStep={currentStep}
        student={student}
        onNavigate={(step) => {
          setCurrentStep(step);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenTeacher={() => setIsTeacherOpen(true)}
        onOpenCharacters={() => setIsCharactersListOpen(true)}
      />

      {/* Main Body */}
      <main className="flex-1 py-6 sm:py-8">
        {/* Step: Welcome Screen */}
        {currentStep === 'welcome' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 animate-in fade-in duration-300">
            {/* Hero Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border-3 border-emerald-200 relative overflow-hidden text-center">
              {/* Background Glows */}
              <div className="absolute -top-16 -right-16 w-48 h-48 bg-amber-200/50 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-48 h-48 bg-emerald-200/50 rounded-full blur-3xl pointer-events-none" />

              {/* Title Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 font-heading font-extrabold text-xs sm:text-sm mb-4 border border-emerald-200 shadow-xs">
                <Sprout className="w-4 h-4 text-emerald-600 animate-bounce" />
                Media Pembelajaran Interaktif Kelas IV SD
              </div>

              <h1 className="font-heading font-black text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
                Petualangan Fotosintesis
              </h1>
              <p className="font-heading font-bold text-base sm:text-xl text-emerald-600 mt-2">
                Misi Hijau: Belajar, Bermain, dan Menemukan Rahasia Tumbuhan
              </p>

              {/* 8 Characters Lineup Display */}
              <div className="my-8 p-5 rounded-3xl bg-gradient-to-br from-emerald-50/90 via-teal-50/80 to-sky-50/90 border-2 border-emerald-200 shadow-inner">
                <div className="text-xs font-extrabold uppercase tracking-wider text-emerald-800 mb-3 flex items-center justify-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Kenalkan, 8 Sahabat Fotosintesis Pemandumu!
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
                  {CHARACTER_LIST.map((char) => (
                    <div
                      key={char.id}
                      onClick={() => setSelectedCharacter(char)}
                      title={`${char.name} - ${char.role}`}
                      className="group cursor-pointer flex flex-col items-center"
                    >
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-white group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-200">
                        <img
                          src={char.imagePath}
                          alt={char.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                      <span className="text-[11px] font-bold text-slate-700 mt-1 truncate max-w-full text-center group-hover:text-emerald-700">
                        {char.name.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Welcoming Quote */}
              <div className="max-w-xl mx-auto p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-slate-800 text-sm sm:text-base font-semibold leading-relaxed mb-8">
                "Halo, Penjelajah Cilik! Siap mencari tahu bagaimana tumbuhan membuat makanannya sendiri?"
              </div>

              {/* Main CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleStartAdventure}
                  className="w-full sm:w-auto px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-heading font-extrabold text-lg sm:text-xl shadow-lg shadow-emerald-200 hover:shadow-xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Mulai Petualangan</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
                </button>

                <button
                  onClick={() => setIsCharactersListOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-heading font-bold text-base border-2 border-slate-200 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Users className="w-5 h-5 text-emerald-600" />
                  <span>Lihat 8 Sahabat</span>
                </button>

                <button
                  onClick={() => setIsTeacherOpen(true)}
                  className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-900 font-heading font-bold text-base border-2 border-amber-300 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Trophy className="w-5 h-5 text-amber-600" />
                  <span>Leaderboard Guru</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Step: Student Form */}
        {currentStep === 'student-form' && (
          <StudentForm
            initialData={student}
            onSubmit={handleStudentSubmit}
            onOpenCharacters={() => setIsCharactersListOpen(true)}
          />
        )}

        {/* Step: Material Section */}
        {currentStep === 'material' && (
          <MaterialSection
            onStartQuiz={handleStartQuiz}
            onSelectCharacter={(char) => setSelectedCharacter(char)}
          />
        )}

        {/* Step: Quiz Section */}
        {currentStep === 'quiz' && (
          <QuizSection
            onFinishQuiz={handleFinishQuiz}
            onReviewMaterial={handleReviewMaterial}
          />
        )}

        {/* Step: Score Summary */}
        {currentStep === 'score' && quizResult && (
          <ScoreSummary
            quizResult={quizResult}
            onOpenTeacher={() => setIsTeacherOpen(true)}
            onContinueToReflection={handleContinueToReflection}
            onReviewMaterial={handleReviewMaterial}
            onRestartQuiz={handleRestartQuiz}
          />
        )}

        {/* Step: Reflection Section */}
        {currentStep === 'reflection' && student && (
          <ReflectionSection
            sessionId={sessionId}
            student={student}
            onSubmitReflection={handleSubmitReflection}
            onFinishApp={handleFinishApp}
            onOpenTeacher={() => setIsTeacherOpen(true)}
          />
        )}

        {/* Step: Completed Screen */}
        {currentStep === 'completed' && student && (
          <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-emerald-300 relative overflow-hidden">
              <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-white flex items-center justify-center shadow-lg shadow-amber-200 mb-4 animate-bounce">
                <Award className="w-12 h-12 text-white" />
              </div>

              <span className="text-xs font-extrabold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                Misi Hijau Selesai
              </span>

              <h2 className="font-heading font-black text-2xl sm:text-4xl text-slate-800 mt-2 mb-2">
                Selamat, {student.name}!
              </h2>
              <p className="text-sm font-semibold text-slate-600 mb-6">
                Kamu adalah Penjelajah Sahabat Lingkungan dari {student.school}.
              </p>

              {/* Closing Character message */}
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 border-2 border-emerald-200 text-slate-800 text-sm sm:text-base font-semibold leading-relaxed mb-6">
                <p>
                  "Terima kasih, Penjelajah Cilik! Hari ini kamu sudah belajar bagaimana tumbuhan membuat makanannya sendiri. Yuk, terus sayangi tumbuhan dan jaga lingkungan!"
                </p>
                <div className="mt-4 flex items-center justify-center gap-2 text-xs font-bold text-emerald-800">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  Salam hangat dari seluruh 8 Sahabat Fotosintesis!
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={() => setIsTeacherOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-extrabold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Lihat Leaderboard & Cetak</span>
                </button>

                <button
                  onClick={handleReviewMaterial}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 font-heading font-bold text-sm border-2 border-slate-200 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Baca Ulang Materi</span>
                </button>

                <button
                  onClick={handleRestartQuiz}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Mulai Tantangan Baru</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto py-6 border-t border-emerald-100 bg-white/60 text-center text-xs text-slate-500 no-print">
        <div className="max-w-4xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            <strong>Petualangan Fotosintesis: Misi Hijau</strong> • Media Pembelajaran Sains SD Kelas IV
          </div>
          <div className="flex items-center gap-2">
            <span>Dilengkapi Leaderboard & Cetak Rekap Nilai Siswa</span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {isTeacherOpen && (
        <TeacherModal onClose={() => setIsTeacherOpen(false)} />
      )}

      {isCharactersListOpen && (
        <CharacterListModal
          onClose={() => setIsCharactersListOpen(false)}
          onSelectCharacter={(char) => {
            setIsCharactersListOpen(false);
            setSelectedCharacter(char);
          }}
        />
      )}

      {selectedCharacter && (
        <CharacterModal
          character={selectedCharacter}
          onClose={() => setSelectedCharacter(null)}
        />
      )}
    </div>
  );
};

export default App;
