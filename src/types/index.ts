// src/types/index.ts

export interface Subject {
  topics: any;
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  targetQuestions: number;
  correct: number;
  incorrect: number;
}

export interface StudySession {
  id: string;
  subjectId: string;
  duration: number; // in minutes
  questionsCompleted: number;
  date: Date;
  topic: string;
  correctCount?: number;
  incorrectCount?: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'questions' | 'streak' | 'subject' | 'special'; 
  requiredSubjectId?: string;
  requiredQuestions?: number;
  requirement?: string;
}

export interface Question {
  id: string;
  subjectId: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface ManualSchedule {
  [day: string]: { subject: string; teacher: string; }[];
}

export interface UserAvatars {
  current: string;
  unlocked: string[];
}

export interface LearnedWords {
  known: string[];
  unknown: string[];
}

export interface DailyWordData {
  id: string;
  unit: number;
  word: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
}

export type StudyType = 'Konu Tekrarı' | 'Soru Çözme' | 'Test Çözme' | 'Ödev' | 'Diğer';

export interface StudyPlanEntry {
  id: string;
  notificationId?: number;
  day: string;
  timeRange: string;
  subjectId: string;
  studyType: StudyType;
  details?: string;
}

export interface CustomStudyPlan {
  [day: string]: StudyPlanEntry[];
}

export interface KnownUser {
  userId: string;
  userName: string;
}

export interface SolvedStat {
  subjectId: string;
  topic: string;
  correct: boolean;
}

// YENİ EKLENEN MEYDAN OKUMA TİPLERİ
export interface ChallengeOpponent {
  user_id: string;
  user_name: string;
  user_avatar: UserAvatars; 
}

export interface Challenge {
  id: string;
  challenger_id: string;
  opponent_id: string;
  unit_id: number;
  challenger_score: number;
  challenger_time_seconds: number;
  opponent_score?: number;
  opponent_time_seconds?: number;
  status: 'pending' | 'completed' | 'declined';
  created_at: string;
  challenger_name?: string; 
  opponent_name?: string;
}