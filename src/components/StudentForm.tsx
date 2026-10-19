import React, { useState } from 'react';
import { Student } from '../types';
import { CHARACTERS } from '../data/characters';
import { User, School, Sparkles, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

interface StudentFormProps {
  initialData?: Student | null;
  onSubmit: (student: Student) => void;
  onOpenCharacters: () => void;
}

export const StudentForm: React.FC<StudentFormProps> = ({
  initialData,
  onSubmit,
  onOpenCharacters,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [className, setClassName] = useState(initialData?.className || 'Kelas IV A');
  const [customClass, setCustomClass] = useState('');
  const [school, setSchool] = useState(initialData?.school || '');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const classOptions = [
    'Kelas IV A',
    'Kelas IV B',
    'Kelas IV C',
    'Kelas IV D',
    'Lainnya (Tulis Sendiri)',
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const cleanName = name.trim();
    const finalClass = className === 'Lainnya (Tulis Sendiri)' ? customClass.trim() : className;
    const cleanSchool = school.trim();

    if (!cleanName) {
      setErrorMsg('Ups, nama kamu belum diisi. Yuk, lengkapi dulu supaya petualangan bisa dimulai!');
      return;
    }

    if (cleanName.length < 2) {
      setErrorMsg('Nama kamu terlalu pendek. Tuliskan nama panggilan atau nama lengkapmu ya!');
      return;
    }

    if (!finalClass) {
      setErrorMsg('Pilih atau tuliskan kelasmu dulu ya, Penjelajah Cilik!');
      return;
    }

    if (!cleanSchool) {
      setErrorMsg('Nama sekolah kamu belum diisi. Tuliskan nama sekolah dasar tempatmu belajar ya!');
      return;
    }

    // Basic formula injection sanitization on client
    const sanitizedName = cleanName.replace(/^[=+\-@]/, '');
    const sanitizedSchool = cleanSchool.replace(/^[=+\-@]/, '');
    const sanitizedClass = finalClass.replace(/^[=+\-@]/, '');

    onSubmit({
      name: sanitizedName,
      className: sanitizedClass,
      school: sanitizedSchool,
    });
  };

  return (
    <div className="max-w-2xl mx-auto py-4 px-4 sm:px-6 animate-in fade-in duration-300">
      {/* Welcome Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border-3 border-emerald-200 relative overflow-hidden">
        {/* Decorative background sun & leaf blobs */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-amber-200/50 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-36 h-36 bg-emerald-200/50 rounded-full blur-2xl pointer-events-none" />

        {/* Character Lineup Preview Banner */}
        <div className="relative mb-6 p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 border border-emerald-200 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-white/80 px-3 py-1 rounded-full border border-emerald-200">
              Kenalan Dulu Yuk!
            </span>
          </div>

          <div className="flex items-center justify-center -space-x-2 sm:-space-x-3 my-2 overflow-hidden py-1">
            {['matahari', 'air', 'tumbuhan', 'daun', 'oksigen', 'glukosa', 'karbon-dioksida', 'manusia'].map((cid) => {
              const char = CHARACTERS[cid];
              return (
                <div
                  key={cid}
                  title={`${char.name} - ${char.role}`}
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-md overflow-hidden bg-white shrink-0 hover:scale-115 hover:z-10 transition-transform cursor-pointer"
                  onClick={onOpenCharacters}
                >
                  <img
                    src={char.imagePath}
                    alt={char.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
              );
            })}
          </div>

          <p className="text-xs text-slate-600 mt-2">
            8 Sahabat Fotosintesis siap menemani petualangan belajarmu hari ini!
          </p>
        </div>

        {/* Form Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-2">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Kartu Identitas Penjelajah
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-800">
            Siapa Nama Kamu, Sahabat Cilik?
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Isi identitas singkatmu agar sertifikat hasil belajar dan kuis dapat tersimpan rapi oleh gurumu.
          </p>
        </div>

        {/* Friendly Error Box */}
        {errorMsg && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 text-rose-800 text-sm flex items-start gap-3 animate-shake">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <p className="font-semibold">{errorMsg}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* 1. Nama Lengkap */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <User className="w-4 h-4 text-emerald-600" />
              Nama Lengkap Murid <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Contoh: Alif Bintang Ramadhan"
              maxLength={60}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-hidden font-medium text-slate-800 placeholder:text-slate-400 text-base transition-all bg-slate-50/50"
            />
          </div>

          {/* 2. Kelas */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              Kelas <span className="text-rose-500">*</span>
            </label>
            <select
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-hidden font-bold text-slate-800 text-base transition-all bg-slate-50/50 cursor-pointer"
            >
              {classOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {className === 'Lainnya (Tulis Sendiri)' && (
              <input
                type="text"
                value={customClass}
                onChange={(e) => setCustomClass(e.target.value)}
                placeholder="Tuliskan nama kelasmu, misal: Kelas IV Cendrawasih"
                maxLength={40}
                className="w-full mt-2 px-4 py-3 rounded-2xl border-2 border-emerald-300 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-hidden font-medium text-slate-800 placeholder:text-slate-400 text-base transition-all"
              />
            )}
          </div>

          {/* 3. Nama Sekolah */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-1.5 flex items-center gap-1.5">
              <School className="w-4 h-4 text-blue-600" />
              Nama Sekolah Dasar (SD) <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={school}
              onChange={(e) => setSchool(e.target.value)}
              placeholder="Contoh: SD Negeri 1 Merdeka"
              maxLength={80}
              className="w-full px-4 py-3 rounded-2xl border-2 border-slate-200 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 outline-hidden font-medium text-slate-800 placeholder:text-slate-400 text-base transition-all bg-slate-50/50"
            />
          </div>

          {/* Privacy Note */}
          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 flex items-start gap-2.5 text-xs text-slate-600 leading-relaxed">
            <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <p>
              <strong>Privasi Aman:</strong> Data identitas ini hanya digunakan oleh gurumu untuk mencatat nilai kuis fotosintesis dan tidak disebarkan ke publik.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-heading font-extrabold text-lg sm:text-xl shadow-lg shadow-emerald-200 hover:shadow-xl transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Mulai Belajar</span>
            <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform" />
          </button>
        </form>
      </div>
    </div>
  );
};
