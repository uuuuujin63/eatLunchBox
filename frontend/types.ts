export interface WordItem {
  id: string | number;
  word: string;
  meaning: string;
  favorite?: boolean;
  level?: string;
  context?: string;
  showName?: string;
  source?: 'user' | 'ai';
}

export interface SentenceItem {
  id: number;
  eng: string;
  kor: string;
  author: string;
  tag: string;
}

export interface QuizItem {
  id: string | number;
  question: string;
  options: string[];
  answer: string;
}
