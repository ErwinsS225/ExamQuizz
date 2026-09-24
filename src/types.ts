export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Question {
  id: string;
  domain: string;
  difficulty: Difficulty;
  question: string;
  options: string[];
  /** Index de la bonne réponse dans `options` (avant mélange) */
  answer: number;
  explanation: string;
  reference?: string;
}

/** Question telle qu'utilisée dans une session (options mélangées) */
export interface SessionQuestion {
  source: Question;
  options: string[];
  /** Index de la bonne réponse dans `options` mélangées */
  correctIndex: number;
}

export type QuizMode = "exam" | "training";
export type ExamType = "ccst" | "cct";

export interface QuizConfig {
  exam: ExamType;
  mode: QuizMode;
  count: number;
  /** 0 = automatique (1min15 / question) */
  durationMinutes: number;
  /** Vide = tous les domaines */
  domains: string[];
  /** Non renseigné = tous les niveaux de difficulté */
  difficulty?: Difficulty;
  /** Si renseigné, limite la session à ces identifiants (rejeu des erreurs). */
  questionIds?: string[];
}

export interface QuizSession {
  id: string;
  config: QuizConfig;
  questions: SessionQuestion[];
  answers: (number | null)[];
  flags: boolean[];
  /** En mode training : question déjà validée */
  revealed: boolean[];
  currentIndex: number;
  startedAt: number;
  /** 0 si pas de chrono */
  endsAt: number;
  finishedAt: number | null;
  autoSubmitted: boolean;
}

export interface DomainScore {
  domain: string;
  correct: number;
  total: number;
  percentage: number;
}

export interface QuizResult {
  score: number;
  total: number;
  percentage: number;
  timeSeconds: number;
  byDomain: DomainScore[];
}

export interface HistoryEntry {
  id: string;
  date: number;
  exam: ExamType;
  mode: QuizMode;
  score: number;
  total: number;
  timeSeconds: number;
  domains: string[];
}
