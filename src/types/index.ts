// src/types/index.ts

export type StudyType = 'Konu Tekrarı' | 'Test Çözme' | 'Ödev' | 'Diğer';

export interface Subject {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: 'primary' | 'success' | 'warning';
  targetQuestions: number;
  correct: number;
  incorrect: number;
  topics: string[];
}

export interface StudySession {
  id: string;
  subjectId: string;
  duration: number; // in minutes
  questionsCompleted: number;
  correctCount: number;
  incorrectCount: number;
  date: Date;
  topic: string;
}

export interface Question {
  id: string;
  subjectId: string;
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
  category: 'questions' | 'subject' | 'streak' | 'special';
  requiredQuestions?: number;
  requiredSubjectId?: string;
  requirement?: string;
}

export interface SolvedStat {
  subjectId: string;
  topic: string;
  correct: boolean;
}

export interface ManualScheduleEntry {
  subject: string;
  teacher: string;
}

export interface ManualSchedule {
  [day: string]: ManualScheduleEntry[];
}

export interface UserAvatars {
  current: string;
  unlocked: string[];
}

export interface LearnedWords {
  known: string[];
  unknown: string[];
}

export interface StudyPlanEntry {
  id: string;
  day: string;
  timeRange: string;
  subjectId: string;
  studyType: StudyType;
  details?: string;
  notificationId?: number;
}

export interface CustomStudyPlan {
  [day: string]: StudyPlanEntry[];
}

export interface DailyWordData {
  id: string;
  unit: number;
  word: string;
  meaning: string;
  example: string;
  exampleMeaning: string;
}

export interface NotificationSettings {
  challengeReminder: boolean;
  bagReminder: {
    enabled: boolean;
    hour: number;
    minute: number;
  };
  streakReminder: boolean;
  studyPlanReminder: {
    enabled: boolean;
    minutesBefore: number;
  };
}

export interface KnownUser {
  userId: string;
  userName: string;
}

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