import { LeaderboardEntry, QuizResult } from '../types';

const LEADERBOARD_STORAGE_KEY = 'fotosintesis_leaderboard_records';

const INITIAL_SAMPLE_RECORDS: LeaderboardEntry[] = [
  {
    id: 'SEED-1',
    name: 'Bintang Pratama',
    className: 'Kelas IV A',
    school: 'SDN 1 Merdeka',
    score: 100,
    correctCount: 5,
    wrongCount: 0,
    category: 'Penjelajah Fotosintesis Hebat!',
    timestamp: '2026-10-18 08:30:00',
  },
  {
    id: 'SEED-2',
    name: 'Siti Rahma Azzahra',
    className: 'Kelas IV B',
    school: 'SDN 2 Nusantara',
    score: 100,
    correctCount: 5,
    wrongCount: 0,
    category: 'Penjelajah Fotosintesis Hebat!',
    timestamp: '2026-10-18 08:45:00',
  },
  {
    id: 'SEED-3',
    name: 'Ahmad Faiz Ramadhan',
    className: 'Kelas IV A',
    school: 'SDIT Harapan Bangsa',
    score: 80,
    correctCount: 4,
    wrongCount: 1,
    category: 'Penjelajah Fotosintesis Hebat!',
    timestamp: '2026-10-18 09:10:00',
  },
  {
    id: 'SEED-4',
    name: 'Nayla Putri Kusuma',
    className: 'Kelas IV C',
    school: 'SD Pelita Jaya',
    score: 80,
    correctCount: 4,
    wrongCount: 1,
    category: 'Penjelajah Fotosintesis Hebat!',
    timestamp: '2026-10-18 09:25:00',
  },
  {
    id: 'SEED-5',
    name: 'Rian Dwi Saputra',
    className: 'Kelas IV B',
    school: 'SDN 1 Merdeka',
    score: 60,
    correctCount: 3,
    wrongCount: 2,
    category: 'Penjelajah yang Terus Berkembang!',
    timestamp: '2026-10-18 09:50:00',
  },
];

export const getLeaderboard = (): LeaderboardEntry[] => {
  try {
    const raw = localStorage.getItem(LEADERBOARD_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_RECORDS));
      return INITIAL_SAMPLE_RECORDS;
    }
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      // Sort by score descending, then timestamp descending
      return parsed.sort((a, b) => b.score - a.score);
    }
  } catch (e) {
    console.error('Error loading leaderboard:', e);
  }
  return INITIAL_SAMPLE_RECORDS;
};

export const saveQuizResultToLeaderboard = (result: QuizResult): LeaderboardEntry => {
  const current = getLeaderboard();
  
  // Format readable timestamp in WIB
  const now = new Date();
  const timeFormatted = now.toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }) + ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

  const newEntry: LeaderboardEntry = {
    id: result.sessionId,
    name: result.student.name,
    className: result.student.className,
    school: result.student.school,
    score: result.score,
    correctCount: result.correctCount,
    wrongCount: result.wrongCount,
    category: result.category,
    timestamp: timeFormatted,
  };

  // Check if session ID already exists to prevent duplicate entries
  const existingIdx = current.findIndex((item) => item.id === result.sessionId);
  let updatedList: LeaderboardEntry[];

  if (existingIdx >= 0) {
    updatedList = [...current];
    updatedList[existingIdx] = newEntry;
  } else {
    updatedList = [newEntry, ...current];
  }

  // Sort by score descending
  updatedList.sort((a, b) => b.score - a.score);

  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(updatedList));
  return newEntry;
};

export const clearLeaderboard = (): void => {
  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify([]));
};

export const resetToSampleLeaderboard = (): LeaderboardEntry[] => {
  localStorage.setItem(LEADERBOARD_STORAGE_KEY, JSON.stringify(INITIAL_SAMPLE_RECORDS));
  return INITIAL_SAMPLE_RECORDS;
};
