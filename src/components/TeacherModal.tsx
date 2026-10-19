import React, { useState, useEffect } from 'react';
import { LeaderboardEntry } from '../types';
import { getLeaderboard, clearLeaderboard, resetToSampleLeaderboard } from '../services/studentRecords';
import {
  X,
  Printer,
  Trophy,
  Search,
  Award,
  Users,
  GraduationCap,
  RefreshCw,
  Trash2,
  FileText,
  School,
  Sparkles,
} from 'lucide-react';

interface TeacherModalProps {
  onClose: () => void;
}

export const TeacherModal: React.FC<TeacherModalProps> = ({ onClose }) => {
  const [records, setRecords] = useState<LeaderboardEntry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmClear, setConfirmClear] = useState(false);

  useEffect(() => {
    setRecords(getLeaderboard());
  }, []);

  const handlePrint = () => {
    // Triggers browser's native print preview dialog immediately
    window.print();
  };

  const handleClear = () => {
    clearLeaderboard();
    setRecords([]);
    setConfirmClear(false);
  };

  const handleResetSample = () => {
    const samples = resetToSampleLeaderboard();
    setRecords(samples);
  };

  const filteredRecords = records.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.className.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalStudents = records.length;
  const averageScore =
    totalStudents > 0
      ? Math.round(records.reduce((acc, curr) => acc + curr.score, 0) / totalStudents)
      : 0;
  const highestScore = totalStudents > 0 ? Math.max(...records.map((r) => r.score)) : 0;
  const perfectScores = records.filter((r) => r.score === 100).length;

  return (
    <>
      {/* On-Screen Modal Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200 no-print">
        <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-4 border-emerald-300 max-h-[92vh] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-5 sm:p-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-700 text-white flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shadow-inner">
                <Trophy className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-200">
                  Panel Guru & Pendidik
                </span>
                <h3 className="font-heading font-extrabold text-xl sm:text-2xl mt-0.5">
                  Leaderboard & Rekap Nilai Siswa
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                title="Cetak Tabel Leaderboard"
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all active:scale-95 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span className="hidden xs:inline">Cetak Rekap</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Statistics Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-4 sm:p-5 bg-slate-50 border-b border-slate-200 shrink-0">
            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Total Siswa</div>
                <div className="font-heading font-extrabold text-lg text-slate-800">{totalStudents} anak</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Rata-rata Skor</div>
                <div className="font-heading font-extrabold text-lg text-blue-700">{averageScore} / 100</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Trophy className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Skor Tertinggi</div>
                <div className="font-heading font-extrabold text-lg text-amber-700">{highestScore} poin</div>
              </div>
            </div>

            <div className="bg-white p-3 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[11px] font-bold text-slate-500 uppercase">Nilai Sempurna</div>
                <div className="font-heading font-extrabold text-lg text-purple-700">{perfectScores} anak</div>
              </div>
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="p-4 sm:px-6 bg-white border-b border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama, kelas, atau sekolah..."
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-hidden text-xs sm:text-sm"
              />
            </div>

            <div className="flex items-center gap-2 self-end sm:self-auto">
              <button
                type="button"
                onClick={handlePrint}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-heading font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Print Preview</span>
              </button>

              <button
                type="button"
                onClick={handleResetSample}
                title="Muat data contoh"
                className="px-3 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-bold flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Data Contoh</span>
              </button>

              {confirmClear ? (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={handleClear}
                    className="px-2.5 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold cursor-pointer"
                  >
                    Ya, Hapus
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmClear(false)}
                    className="px-2.5 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs font-bold cursor-pointer"
                  >
                    Batal
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  title="Hapus riwayat leaderboard"
                  className="p-2 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Leaderboard Table Content */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {filteredRecords.length === 0 ? (
              <div className="text-center py-12 text-slate-400">
                <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p className="font-heading font-bold text-base text-slate-600">Belum Ada Data Siswa</p>
                <p className="text-xs text-slate-400 mt-1">
                  Siswa yang telah menyelesaikan 5 soal kuis akan otomatis tercatat pada daftar ini.
                </p>
                <button
                  onClick={handleResetSample}
                  className="mt-4 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold cursor-pointer inline-flex items-center gap-1.5"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Tampilkan Data Contoh
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-2xl border border-slate-200 shadow-xs">
                <table className="w-full text-left text-xs sm:text-sm border-collapse">
                  <thead>
                    <tr className="bg-slate-100/90 text-slate-700 font-heading font-bold uppercase text-[11px] tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4 text-center w-16">Nomor</th>
                      <th className="py-3 px-4">Nama Murid</th>
                      <th className="py-3 px-4">Kelas</th>
                      <th className="py-3 px-4">Sekolah</th>
                      <th className="py-3 px-4 text-center">Nilai / Skor</th>
                      <th className="py-3 px-4 text-center">Kategori</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium text-slate-700">
                    {filteredRecords.map((item, index) => {
                      const rank = index + 1;
                      let rankBadge = (
                        <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-600 font-bold inline-flex items-center justify-center text-xs">
                          {rank}
                        </span>
                      );

                      if (rank === 1) {
                        rankBadge = (
                          <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black inline-flex items-center justify-center text-xs shadow-xs border border-amber-300">
                            🥇 1
                          </span>
                        );
                      } else if (rank === 2) {
                        rankBadge = (
                          <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black inline-flex items-center justify-center text-xs shadow-xs border border-slate-200">
                            🥈 2
                          </span>
                        );
                      } else if (rank === 3) {
                        rankBadge = (
                          <span className="w-7 h-7 rounded-full bg-amber-600 text-white font-black inline-flex items-center justify-center text-xs shadow-xs border border-amber-500">
                            🥉 3
                          </span>
                        );
                      }

                      return (
                        <tr
                          key={item.id}
                          className={`hover:bg-emerald-50/40 transition-colors ${
                            rank <= 3 ? 'bg-amber-50/20' : ''
                          }`}
                        >
                          {/* 1. Nomor */}
                          <td className="py-3 px-4 text-center font-bold">{rankBadge}</td>

                          {/* 2. Nama */}
                          <td className="py-3 px-4">
                            <div className="font-heading font-bold text-slate-900 text-sm">
                              {item.name}
                            </div>
                            <div className="text-[10px] text-slate-400 font-mono">
                              {item.timestamp}
                            </div>
                          </td>

                          {/* 3. Kelas */}
                          <td className="py-3 px-4">
                            <span className="inline-block px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                              {item.className}
                            </span>
                          </td>

                          {/* 4. Sekolah */}
                          <td className="py-3 px-4 text-slate-600 font-medium">
                            <div className="flex items-center gap-1.5">
                              <School className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span className="truncate max-w-[200px]">{item.school}</span>
                            </div>
                          </td>

                          {/* 5. Nilai / Skor */}
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`inline-flex items-center justify-center px-3 py-1 rounded-xl font-heading font-black text-sm shadow-xs ${
                                item.score >= 80
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                                  : item.score >= 60
                                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                  : 'bg-rose-100 text-rose-800 border border-rose-300'
                              }`}
                            >
                              {item.score}
                            </span>
                          </td>

                          {/* Kategori */}
                          <td className="py-3 px-4 text-center">
                            <span
                              className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${
                                item.score >= 80
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : item.score >= 60
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-rose-50 text-rose-700 border border-rose-200'
                              }`}
                            >
                              {item.score >= 80
                                ? 'Sangat Baik'
                                : item.score >= 60
                                ? 'Berkembang'
                                : 'Perlu Bimbingan'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Info & Close */}
          <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
            <div className="text-xs text-slate-500 text-center sm:text-left">
              Data tersimpan otomatis secara aman di perangkat ini dan siap dicetak kapan saja.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 font-heading font-bold text-xs flex items-center gap-2 shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Cetak Tabel Nilai</span>
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-900 text-white font-heading font-bold text-xs transition-colors cursor-pointer"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* PRINT-ONLY OFFICIAL DOCUMENT (Displayed strictly in Print Preview) */}
      <div id="printable-leaderboard" className="hidden print:block">
        <div style={{ textAlign: 'center', marginBottom: '24px', borderBottom: '2px solid #000', paddingBottom: '16px' }}>
          <h1 style={{ fontSize: '18pt', fontWeight: 'bold', margin: '0 0 6px 0', textTransform: 'uppercase' }}>
            DAFTAR NILAI & LEADERBOARD KUIS SAINS KELAS IV SD
          </h1>
          <h2 style={{ fontSize: '14pt', fontWeight: 'bold', margin: '0 0 6px 0', color: '#166534' }}>
            PETUALANGAN FOTOSINTESIS: MISI HIJAU
          </h2>
          <p style={{ fontSize: '10pt', margin: '0', color: '#475569' }}>
            Dicetak pada: {new Date().toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })} • Pukul {new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })} WIB
          </p>
        </div>

        {/* Print Summary Stats */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '10pt' }}>
          <div><strong>Total Siswa Mengikuti:</strong> {totalStudents} anak</div>
          <div><strong>Rata-Rata Nilai:</strong> {averageScore} / 100</div>
          <div><strong>Nilai Tertinggi:</strong> {highestScore}</div>
        </div>

        {/* Printable Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10pt' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9' }}>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '40px' }}>No</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left' }}>Nama Murid</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left', width: '100px' }}>Kelas</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'left' }}>Sekolah</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '90px' }}>Nilai / Skor</th>
              <th style={{ border: '1px solid #000', padding: '8px', textAlign: 'center', width: '110px' }}>Keterangan</th>
            </tr>
          </thead>
          <tbody>
            {records.map((row, idx) => (
              <tr key={row.id}>
                <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center' }}>{idx + 1}</td>
                <td style={{ border: '1px solid #000', padding: '6px 8px', fontWeight: 'bold' }}>{row.name}</td>
                <td style={{ border: '1px solid #000', padding: '6px 8px' }}>{row.className}</td>
                <td style={{ border: '1px solid #000', padding: '6px 8px' }}>{row.school}</td>
                <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center', fontWeight: 'bold' }}>{row.score}</td>
                <td style={{ border: '1px solid #000', padding: '6px 8px', textAlign: 'center' }}>
                  {row.score >= 80 ? 'Sangat Baik' : row.score >= 60 ? 'Berkembang' : 'Perlu Latihan'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Signature Area */}
        <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ textAlign: 'center', width: '220px', fontSize: '10pt' }}>
            <p style={{ margin: '0 0 60px 0' }}>
              Guru Kelas IV SD,
            </p>
            <p style={{ margin: '0', fontWeight: 'bold', textDecoration: 'underline' }}>
              ( .................................................. )
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '9pt', color: '#64748b' }}>
              NIP. .........................................
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
