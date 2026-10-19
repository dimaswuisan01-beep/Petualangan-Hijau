import React from 'react';
import { AppStep, Student } from '../types';
import { Sprout, BookOpen, HelpCircle, Heart, User, Trophy, Users, Sparkles } from 'lucide-react';

interface NavbarProps {
  currentStep: AppStep;
  student: Student | null;
  onNavigate: (step: AppStep) => void;
  onOpenTeacher: () => void;
  onOpenCharacters: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentStep,
  student,
  onNavigate,
  onOpenTeacher,
  onOpenCharacters,
}) => {
  const steps: { key: AppStep; label: string; icon: React.ElementType }[] = [
    { key: 'material', label: '1. Materi', icon: BookOpen },
    { key: 'quiz', label: '2. Kuis', icon: HelpCircle },
    { key: 'reflection', label: '3. Refleksi', icon: Heart },
  ];

  // Logic to determine if a step is clickable
  const isAccessible = (stepKey: AppStep) => {
    if (!student) return false;
    if (stepKey === 'material') return true;
    if (stepKey === 'quiz') return ['quiz', 'score', 'reflection', 'completed'].includes(currentStep);
    if (stepKey === 'reflection') return ['reflection', 'completed'].includes(currentStep);
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b-2 border-emerald-100 shadow-xs no-print">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-2">
        {/* Logo and title */}
        <div
          onClick={() => student && onNavigate('material')}
          className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-green-400 p-0.5 shadow-md shadow-emerald-200 group-hover:scale-105 transition-transform flex items-center justify-center text-white">
            <Sprout className="w-6 h-6 sm:w-7 sm:h-7 animate-pulse-subtle" />
          </div>
          <div>
            <h1 className="font-heading font-extrabold text-base sm:text-xl text-emerald-900 tracking-tight leading-tight flex items-center gap-1.5">
              Petualangan Fotosintesis
              <Sparkles className="w-4 h-4 text-amber-500 inline-block" />
            </h1>
            <p className="text-[11px] sm:text-xs font-bold text-emerald-600 hidden xs:block">
              Misi Hijau Kelas IV SD
            </p>
          </div>
        </div>

        {/* Learning Journey Stepper (shown when student has filled the form) */}
        {student && currentStep !== 'welcome' && currentStep !== 'student-form' && (
          <nav className="hidden md:flex items-center gap-1.5 bg-emerald-50/80 p-1.5 rounded-2xl border border-emerald-200/80">
            {steps.map((s) => {
              const active = currentStep === s.key || (s.key === 'quiz' && currentStep === 'score');
              const accessible = isAccessible(s.key);
              const StepIcon = s.icon;

              return (
                <button
                  key={s.key}
                  disabled={!accessible}
                  onClick={() => accessible && onNavigate(s.key)}
                  className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold font-heading transition-all ${
                    active
                      ? 'bg-emerald-600 text-white shadow-xs scale-102'
                      : accessible
                      ? 'text-emerald-800 hover:bg-emerald-100/80 cursor-pointer'
                      : 'text-slate-400 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <StepIcon className="w-4 h-4" />
                  {s.label}
                </button>
              );
            })}
          </nav>
        )}

        {/* Right action buttons: Student info badge + Modals */}
        <div className="flex items-center gap-2">
          {student && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-900">
              <User className="w-4 h-4 text-amber-600" />
              <span className="truncate max-w-[120px]">{student.name}</span>
              <span className="bg-amber-200/80 text-amber-800 px-1.5 py-0.5 rounded-md text-[10px]">
                {student.className}
              </span>
            </div>
          )}

          {/* 8 Sahabat Karakter Button */}
          <button
            onClick={onOpenCharacters}
            title="Lihat 8 Sahabat Fotosintesis"
            className="flex items-center gap-1 px-3 py-2 rounded-2xl bg-emerald-100/80 hover:bg-emerald-200 text-emerald-800 font-bold text-xs font-heading transition-all active:scale-95 border border-emerald-200 cursor-pointer"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">8 Sahabat</span>
          </button>

          {/* Teacher Leaderboard Button */}
          <button
            onClick={onOpenTeacher}
            title="Leaderboard & Rekap Nilai Siswa (Panel Guru)"
            className="px-3 py-2 rounded-2xl bg-amber-100/90 hover:bg-amber-200 text-amber-900 hover:text-amber-950 font-bold text-xs font-heading transition-all active:scale-95 border border-amber-300 flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Trophy className="w-4 h-4 text-amber-600" />
            <span className="hidden sm:inline">Leaderboard Guru</span>
            <span className="sm:hidden">Guru</span>
          </button>
        </div>
      </div>
    </header>
  );
};
