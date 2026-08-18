export interface Domain {
  id: string;
  number: number;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Topic {
  id: string;
  title: string;
  content: string;
  keyTerms: string[];
}

export interface Question {
  id: string;
  domainId: string;
  domainNumber: number;
  text: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  difficulty: 'foundational' | 'intermediate' | 'advanced';
}

export interface ExamConfig {
  mode: 'full' | 'domain' | 'practice';
  domainId?: string;
  questionCount: number;
  timeLimitMinutes: number | null;
}

export interface ExamAttempt {
  id: string;
  date: string;
  config: ExamConfig;
  answers: Record<string, number>;
  flagged: string[];
  score: number;
  totalQuestions: number;
  domainScores: Record<string, { correct: number; total: number }>;
  passed: boolean;
  timeSpentSeconds: number;
}

export interface GlossaryTerm {
  term: string;
  abbreviation?: string;
  definition: string;
  domain: string;
}
