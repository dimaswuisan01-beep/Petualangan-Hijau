export interface Student {
  name: string;
  className: string;
  school: string;
}

export interface Character {
  id: string;
  name: string;
  alias: string;
  role: string;
  description: string;
  dialogue: string;
  color: string;
  badgeBg: string;
  borderColor: string;
  imagePath: string;
  iconName: string;
}

export interface QuizQuestion {
  id: number;
  topic: string;
  question: string;
  options: {
    key: 'A' | 'B' | 'C' | 'D';
    text: string;
  }[];
  correctAnswer: 'A' | 'B' | 'C' | 'D';
  feedbackCorrect: string;
  feedbackWrong: string;
  characterId: string;
}

export interface QuizResult {
  sessionId: string;
  student: Student;
  answers: { [questionId: number]: 'A' | 'B' | 'C' | 'D' };
  correctCount: number;
  wrongCount: number;
  score: number;
  category: 'Penjelajah Fotosintesis Hebat!' | 'Penjelajah yang Terus Berkembang!' | 'Penjelajah Pantang Menyerah!';
  status: 'completed';
  timestamp: string;
}

export interface ReflectionData {
  sessionId: string;
  student: Student;
  feeling: string;
  understanding: string;
  action: string;
  question?: string;
  timestamp: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  className: string;
  school: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  category: string;
  timestamp: string;
}

export type AppStep =
  | 'welcome'
  | 'student-form'
  | 'material'
  | 'quiz'
  | 'score'
  | 'reflection'
  | 'completed';

export type SaveStatus = 'idle' | 'saving' | 'success' | 'error';
