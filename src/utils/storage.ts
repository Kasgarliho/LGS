// src/utils/storage.ts

import { Subject, StudySession, Achievement, ManualSchedule, UserAvatars, LearnedWords, CustomStudyPlan, KnownUser } from '@/types';

export interface NotificationSettings {
  studyPlanReminder: { enabled: boolean; minutesBefore: number };
  bagReminder: { enabled: boolean; hour: number; minute: number };
  streakReminder: boolean;
  challengeReminder: boolean;
}

const BASE_KEYS = {
  THEME: 'theme',
  SUBJECTS: 'subjects',
  SESSIONS: 'sessions',
  ACHIEVEMENTS: 'achievements',
  STREAK: 'streak',
  USERNAME: 'username',
  POINTS: 'points',
  LEARNED_WORDS: 'learned_words',
  STREAK_FREEZES: 'streak_freezes',
  LAST_ACTIVE_DATE: 'last_active_date',
  USER_AVATARS: 'user_avatars',
  CUSTOM_STUDY_PLAN: 'custom_study_plan',
  IS_MUTED: 'is_muted',
  MANUAL_SCHEDULE: 'manual_schedule',
  DAILY_SOLVED_SUBJECTS: 'daily_solved_subjects',
  NOTIFICATION_SETTINGS: 'notification_settings',
};

const CURRENT_USER_ID_KEY = 'lgs_app_current_user_id';
const KNOWN_USERS_KEY = 'lgs_app_known_users';

const createKey = (userId: string, baseKey: string) => `lgs_app_${userId}_${baseKey}`;
const createGlobalKey = (baseKey: string) => `lgs_app_${baseKey}`;

// --- DEĞİŞİKLİK: Standart tarih formatı için yardımcı fonksiyon ---
const getTodayDateString = () => new Date().toISOString().split('T')[0];

export const storage = {
  saveCurrentUserId: (userId: string) => localStorage.setItem(CURRENT_USER_ID_KEY, userId),
  loadCurrentUserId: (): string | null => localStorage.getItem(CURRENT_USER_ID_KEY),
  clearCurrentUserId: () => localStorage.removeItem(CURRENT_USER_ID_KEY),

  loadKnownUsers: (): KnownUser[] => {
    const data = localStorage.getItem(KNOWN_USERS_KEY);
    return data ? JSON.parse(data) : [];
  },
  saveKnownUsers: (users: KnownUser[]) => {
    localStorage.setItem(KNOWN_USERS_KEY, JSON.stringify(users));
  },

  loadTheme: (userId: string): 'light' | 'dark' => (localStorage.getItem(createKey(userId, BASE_KEYS.THEME)) as 'light' | 'dark') || 'dark',
  saveTheme: (userId: string, theme: 'light' | 'dark') => localStorage.setItem(createKey(userId, BASE_KEYS.THEME), theme),

  loadSubjects: (userId: string): Subject[] => {
    const data = localStorage.getItem(createKey(userId, BASE_KEYS.SUBJECTS));
    return data ? JSON.parse(data) : [];
  },
  saveSubjects: (userId: string, subjects: Subject[]) => localStorage.setItem(createKey(userId, BASE_KEYS.SUBJECTS), JSON.stringify(subjects)),

  loadSessions: (userId: string): StudySession[] => {
    const data = localStorage.getItem(createKey(userId, BASE_KEYS.SESSIONS));
    if (!data) return [];
    return JSON.parse(data).map((s: any) => ({ ...s, date: new Date(s.date) }));
  },
  saveSessions: (userId: string, sessions: StudySession[]) => localStorage.setItem(createKey(userId, BASE_KEYS.SESSIONS), JSON.stringify(sessions)),

  loadAchievements: (userId: string): Achievement[] => {
    const data = localStorage.getItem(createKey(userId, BASE_KEYS.ACHIEVEMENTS));
    if (!data) return [];
    return JSON.parse(data).map((a: any) => ({ ...a, unlockedAt: a.unlockedAt ? new Date(a.unlockedAt) : undefined }));
  },
  saveAchievements: (userId: string, achievements: Achievement[]) => localStorage.setItem(createKey(userId, BASE_KEYS.ACHIEVEMENTS), JSON.stringify(achievements)),

  loadStreak: (userId: string): number => parseInt(localStorage.getItem(createKey(userId, BASE_KEYS.STREAK)) || '0', 10),
  saveStreak: (userId: string, streak: number) => localStorage.setItem(createKey(userId, BASE_KEYS.STREAK), streak.toString()),

  loadUserName: (userId: string): string | null => localStorage.getItem(createKey(userId, BASE_KEYS.USERNAME)),
  saveUserName: (userId: string, name: string) => localStorage.setItem(createKey(userId, BASE_KEYS.USERNAME), name),
  
  loadPoints: (userId: string): number => parseInt(localStorage.getItem(createKey(userId, BASE_KEYS.POINTS)) || '0', 10),
  savePoints: (userId: string, points: number) => localStorage.setItem(createKey(userId, BASE_KEYS.POINTS), points.toString()),

  loadLearnedWords: (userId: string): LearnedWords => {
    const data = localStorage.getItem(createKey(userId, BASE_KEYS.LEARNED_WORDS));
    return data ? JSON.parse(data) : { known: [], unknown: [] };
  },
  saveLearnedWords: (userId: string, words: LearnedWords) => localStorage.setItem(createKey(userId, BASE_KEYS.LEARNED_WORDS), JSON.stringify(words)),

  loadStreakFreezes: (userId: string): number => parseInt(localStorage.getItem(createKey(userId, BASE_KEYS.STREAK_FREEZES)) || '0', 10),
  saveStreakFreezes: (userId: string, freezes: number) => localStorage.setItem(createKey(userId, BASE_KEYS.STREAK_FREEZES), freezes.toString()),

  loadLastActiveDate: (userId: string): string | null => localStorage.getItem(createKey(userId, BASE_KEYS.LAST_ACTIVE_DATE)),
  saveLastActiveDate: (userId: string, date: string) => localStorage.setItem(createKey(userId, BASE_KEYS.LAST_ACTIVE_DATE), date),

  loadUserAvatars: (userId: string): UserAvatars => {
    const data = localStorage.getItem(createKey(userId, BASE_KEYS.USER_AVATARS));
    return data ? JSON.parse(data) : { current: 'default', unlocked: ['default'] };
  },
  saveUserAvatars: (userId: string, avatars: UserAvatars) => localStorage.setItem(createKey(userId, BASE_KEYS.USER_AVATARS), JSON.stringify(avatars)),
  
  loadCustomStudyPlan: (userId: string): CustomStudyPlan | null => {
    const data = localStorage.getItem(createKey(userId, BASE_KEYS.CUSTOM_STUDY_PLAN));
    return data ? JSON.parse(data) : null;
  },
  saveCustomStudyPlan: (userId: string, plan: CustomStudyPlan | null) => {
    if (plan) {
      localStorage.setItem(createKey(userId, BASE_KEYS.CUSTOM_STUDY_PLAN), JSON.stringify(plan));
    } else {
      localStorage.removeItem(createKey(userId, BASE_KEYS.CUSTOM_STUDY_PLAN));
    }
  },

  // --- DEĞİŞİKLİK: 'todayStr' parametresi artık 'todayDateString' ---
  loadDailySolvedSubjects: (userId: string, todayDateString: string): string[] => {
    const storedData = localStorage.getItem(createKey(userId, BASE_KEYS.DAILY_SOLVED_SUBJECTS));
    if (storedData) {
      const data = JSON.parse(storedData);
      if (data.date === todayDateString) return data.subjects;
    }
    return [];
  },
  // --- DEĞİŞİKLİK: Kaydederken standart fonksiyonu kullanıyoruz ---
  saveDailySolvedSubjects: (userId: string, subjects: string[]) => {
    const today = getTodayDateString();
    localStorage.setItem(createKey(userId, BASE_KEYS.DAILY_SOLVED_SUBJECTS), JSON.stringify({ date: today, subjects }));
  },
  clearDailySolvedSubjects: (userId: string) => localStorage.removeItem(createKey(userId, BASE_KEYS.DAILY_SOLVED_SUBJECTS)),

  loadIsMuted: (): boolean => JSON.parse(localStorage.getItem(createGlobalKey(BASE_KEYS.IS_MUTED)) || 'false'),
  saveIsMuted: (isMuted: boolean) => localStorage.setItem(createGlobalKey(BASE_KEYS.IS_MUTED), JSON.stringify(isMuted)),
  
  loadManualSchedule: (): ManualSchedule | null => {
    const data = localStorage.getItem(createGlobalKey(BASE_KEYS.MANUAL_SCHEDULE));
    return data ? JSON.parse(data) : null;
  },
  saveManualSchedule: (schedule: ManualSchedule) => localStorage.setItem(createGlobalKey(BASE_KEYS.MANUAL_SCHEDULE), JSON.stringify(schedule)),
  
  loadNotificationSettings: (): NotificationSettings => {
    const data = localStorage.getItem(createGlobalKey(BASE_KEYS.NOTIFICATION_SETTINGS));
    const defaults: NotificationSettings = {
      studyPlanReminder: { enabled: true, minutesBefore: 15 },
      bagReminder: { enabled: true, hour: 20, minute: 0 },
      streakReminder: true,
      challengeReminder: true,
    };
    if (data) {
      const parsed = JSON.parse(data);
      return {
        ...defaults,
        ...parsed,
        studyPlanReminder: { ...defaults.studyPlanReminder, ...parsed.studyPlanReminder },
        bagReminder: { ...defaults.bagReminder, ...parsed.bagReminder },
      };
    }
    return defaults;
  },
  saveNotificationSettings: (settings: NotificationSettings) => localStorage.setItem(createGlobalKey(BASE_KEYS.NOTIFICATION_SETTINGS), JSON.stringify(settings)),

  removeAllUserData: (userId: string) => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith(`lgs_app_${userId}_`)) {
        localStorage.removeItem(key);
      }
    });
  }
};

export type { KnownUser };