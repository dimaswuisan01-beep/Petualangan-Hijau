import React, { useState } from 'react';
import { ReflectionData, Student } from '../types';
import { CHARACTERS } from '../data/characters';
import {
  Heart,
  Send,
  CheckCircle2,
  AlertCircle,
  Check,
} from 'lucide-react';

interface ReflectionSectionProps {
  sessionId: string;
  student: Student;
  onSubmitReflection: (reflectionData: ReflectionData) => void;
  onFinishApp: () => void;
  onOpenTeacher: () => void;
}

export const ReflectionSection: React.FC<ReflectionSectionProps> = ({
  sessionId,
  student,
  onSubmitReflection,
  onFinishApp,
  onOpenTeacher,
}) => {
  const [feeling, setFeeling] = useState<string>('');
  const [understanding, setUnderstanding] = useState<string>('');
  const [action, setAction] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [formError, setFormError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const charManusia = CHARACTERS['manusia'];
  const charTumbuhan = CHARACTERS['tumbuhan'];

  const feelingOptions = [
    'Senang sekali!',
    'Senang.',
    'Masih bingung.',
    'Ingin belajar lagi.',
  ];

  const understandingOptions = [
    'Tumbuhan membutuhkan cahaya, air, dan karbon dioksida untuk fotosintesis.',
    'Tumbuhan mengambil seluruh makanannya langsung dari tanah.',
    'Fotosintesis tidak membutuhkan cahaya.',
  ];

  const actionOptions = [
    'Merawat tumbuhan di sekitar.',
    'Membiarkan tumbuhan rusak.',
    'Tidak peduli terhadap lingkungan.',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!feeling) {
      setFormError('Ups, pilih bagaimana perasaanmu setelah belajar (Pertanyaan 1) ya!');
      return;
    }
    if (!understanding) {
      setFormError('Ups, pilih hal paling penting yang kamu pelajari (Pertanyaan 2) ya!');
      return;
    }
    if (!action) {
      setFormError('Ups, pilih tindakan yang akan kamu lakukan (Pertanyaan 3) ya!');
      return;
    }

    const reflectionPayload: ReflectionData = {
      sessionId,
      student,
      feeling,
      understanding,
      action,
      question: question.trim(),
      timestamp: new Date().toISOString(),
    };

    onSubmitReflection(reflectionPayload);
    setIsSubmitted(true);
  };

  // If already successfully submitted
  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 text-center animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border-4 border-emerald-300 relative overflow-hidden">
          <div className="w-20 h-20 mx-auto rounded-3xl bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-inner mb-4">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-emerald-950 mb-2">
            Refleksi Berhasil Disimpan!
          </h2>
          <p className="text-emerald-700 font-bold text-sm mb-6">
            Terima kasih {student.name}, catatan pengalaman belajarmu telah berhasil dirangkum bersama hasil kuismu!
          </p>

          {/* Guide Characters Greeting */}
          <div className="flex items-center justify-center gap-4 my-6">
            <div className="text-center">
              <img
                src={charManusia.imagePath}
                alt={charManusia.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-300 shadow-xs mx-auto mb-1"
              />
              <span className="text-[11px] font-bold text-slate-700">{charManusia.name}</span>
            </div>
            <div className="text-center">
              <img
                src={charTumbuhan.imagePath}
                alt={charTumbuhan.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-300 shadow-xs mx-auto mb-1"
              />
              <span className="text-[11px] font-bold text-slate-700">{charTumbuhan.name}</span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-slate-800 text-sm sm:text-base font-semibold leading-relaxed mb-6">
            "Terima kasih, Penjelajah Cilik! Hari ini kamu sudah belajar bagaimana tumbuhan membuat makanannya sendiri. Yuk, terus sayangi tumbuhan dan jaga lingkungan!"
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onOpenTeacher}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-extrabold text-base shadow-md transition-all active:scale-95 cursor-pointer"
            >
              Lihat Leaderboard & Cetak
            </button>
            <button
              onClick={onFinishApp}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-extrabold text-base shadow-lg shadow-emerald-200 transition-all active:scale-95 cursor-pointer"
            >
              Selesai Petualangan Hari Ini
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-3 border-emerald-200">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Heart className="w-4 h-4 text-emerald-600" />
            Bagian 3: Refleksi Belajar
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
            Yuk, Ceritakan Pengalaman Belajarmu!
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Refleksi ini membantu kamu mengingat apa yang sudah dipelajari dan tidak mengurangi nilaimu.
          </p>

          {/* Guide Mentors */}
          <div className="flex items-center justify-center gap-3 mt-4 bg-emerald-50/70 p-2.5 rounded-2xl border border-emerald-200">
            <span className="text-xs font-bold text-emerald-900">Dipandu oleh:</span>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-white px-2 py-1 rounded-xl border border-emerald-100 shadow-xs">
                <img src={charManusia.imagePath} alt="Manusia" className="w-5 h-5 rounded-full object-cover" />
                {charManusia.name}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 bg-white px-2 py-1 rounded-xl border border-emerald-100 shadow-xs">
                <img src={charTumbuhan.imagePath} alt="Tumbuhan" className="w-5 h-5 rounded-full object-cover" />
                {charTumbuhan.name}
              </span>
            </div>
          </div>
        </div>

        {/* Form Error alert */}
        {formError && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-sm flex items-start gap-2.5 animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="font-semibold">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Question 1 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block font-heading font-bold text-sm sm:text-base text-slate-800 mb-2">
              1. Bagaimana perasaanmu setelah belajar fotosintesis? <span className="text-rose-500">*</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {feelingOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setFeeling(opt)}
                  className={`p-3 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    feeling === opt
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <span>{opt}</span>
                  {feeling === opt && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              ))}
            </div>
          </div>

          {/* Question 2 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block font-heading font-bold text-sm sm:text-base text-slate-800 mb-2">
              2. Apa hal paling penting yang kamu pelajari hari ini? <span className="text-rose-500">*</span>
            </label>
            <div className="space-y-2">
              {understandingOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setUnderstanding(opt)}
                  className={`w-full p-3 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    understanding === opt
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <span className="leading-snug">{opt}</span>
                  {understanding === opt && <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* Question 3 */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <label className="block font-heading font-bold text-sm sm:text-base text-slate-800 mb-2">
              3. Apa yang akan kamu lakukan setelah mengetahui manfaat fotosintesis? <span className="text-rose-500">*</span>
            </label>
            <div className="space-y-2">
              {actionOptions.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setAction(opt)}
                  className={`w-full p-3 rounded-xl border-2 text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    action === opt
                      ? 'bg-emerald-100 border-emerald-500 text-emerald-950 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <span className="leading-snug">{opt}</span>
                  {action === opt && <Check className="w-4 h-4 text-emerald-600 shrink-0 ml-2" />}
                </button>
              ))}
            </div>
          </div>

          {/* Question 4 (Optional) */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <label className="block font-heading font-bold text-sm sm:text-base text-slate-800">
                4. Tuliskan satu hal yang masih ingin kamu ketahui tentang fotosintesis:
              </label>
              <span className="text-[11px] font-bold text-slate-400 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                Opsional
              </span>
            </div>
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              maxLength={300}
              rows={3}
              placeholder="Contoh: Apakah pohon di malam hari tetap bisa bernafas?"
              className="w-full p-3 rounded-xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-hidden text-sm text-slate-800 bg-white placeholder:text-slate-400 transition-all resize-none"
            />
            <div className="text-right text-[11px] text-slate-400 mt-1">
              {question.length} / 300 karakter
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-heading font-extrabold text-base sm:text-lg shadow-lg shadow-emerald-200 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Kirim Refleksi & Selesaikan</span>
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
};
