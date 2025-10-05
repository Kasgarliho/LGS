import { Outlet, useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from "@/utils/storage";
import { toast } from 'sonner';
import { AppContextType, SolvedStat, Challenge } from '@/types';
import { LocalNotifications } from '@capacitor/local-notifications';
import { playFailSound } from '@/utils/sounds';
import { App } from '@capacitor/app';
import { supabase } from "@/supabaseClient";

import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ChallengeNotification from "@/components/ChallengeNotification"; // YENİ
import { useAuth } from '@/hooks/useAuth';
import { useStudyData } from '@/hooks/useStudyData';
import { useCoreData } from '@/hooks/useCoreData';
import { useScheduler } from '@/hooks/useScheduler';

export default function AppLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(() => storage.loadIsMuted());
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [pendingChallenges, setPendingChallenges] = useState<Challenge[]>([]); // YENİ

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  const auth = useAuth(isMuted);
  const { userId, userName, userRole } = auth;

  const coreData = useCoreData(userId, userRole, isInitialized, isMuted);
  const studyData = useStudyData(userId, isInitialized, isMuted, (result, newDailySolvedCount) => {
    if (userRole === 'koç') return;
    coreData.setTotalPoints(prev => prev + (result.correct * 10));
    if (newDailySolvedCount === 3) {
      coreData.setStreak(prev => prev + 1);
      toast.success("Günlük seri arttı! 🔥");
    } else {
      toast.info("Harika bir paket tamamladın, devam et! 🎉");
    }
  });
  const scheduler = useScheduler(userId, isInitialized);

  // YENİ: Meydan okumaları çeken useEffect
  useEffect(() => {
    const fetchChallenges = async () => {
      if (!userId) return;
      const { data, error } = await supabase.rpc('get_pending_challenges', { p_user_id: userId });
      if (error) {
        console.error("Meydan okumalar çekilirken hata:", error);
      } else if (data) {
        setPendingChallenges(data);
      }
    };
    fetchChallenges();
    // Supabase Realtime ile yeni meydan okumaları dinle (opsiyonel ama çok daha iyi)
    const channel = supabase.channel('challenges')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'challenges', filter: `opponent_id=eq.${userId}` }, 
        (payload) => {
          fetchChallenges(); // Yeni bir meydan okuma geldiğinde listeyi yenile
        }
      ).subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  useEffect(() => {
    if (userId) {
      setTheme(storage.loadTheme(userId));
    } else {
      setTheme('dark');
    }
  }, [userId]);

  useEffect(() => {
    const checkDeepLink = async () => {
      const listener = await App.addListener('appUrlOpen', (event) => {
        if (event && event.url) {
          const path = new URL(event.url).pathname.replace('/app', '');
          if (path) {
            navigate(path);
          }
        }
      });
      const initialUrl = await App.getLaunchUrl();
      if (initialUrl && initialUrl.url) {
          const path = new URL(initialUrl.url).pathname.replace('/app', '');
          if (path) {
              navigate(path);
          }
      }
      return listener;
    };
    const listener = checkDeepLink();
    return () => {
      listener.then(l => l.remove());
    };
  }, [navigate]);

  useEffect(() => {
    if (userId && userRole !== 'koç') {
      const { lastActiveDate, setLastActiveDate } = studyData;
      const { streakFreezes, setStreak, setStreakFreezes } = coreData;
      if (lastActiveDate) {
        const today = new Date();
        const todayStr = today.toLocaleDateString();
        if (lastActiveDate !== todayStr) {
          const lastDate = new Date(lastActiveDate);
          const yesterday = new Date();
          yesterday.setDate(today.getDate() - 1);
          const yesterdayStart = new Date(yesterday.setHours(0, 0, 0, 0));
          if (lastDate.getTime() < yesterdayStart.getTime()) {
            if (streakFreezes > 0) {
              setStreakFreezes(prev => prev - 1);
              setLastActiveDate(yesterday.toLocaleDateString());
              toast.info("Bir gün ara verdin ama Seri Dondurma serini kurtardı! ❄️");
            } else {
              setStreak(0);
              playFailSound(isMuted);
            }
          }
        }
      }
    }
  }, [userId, userRole, studyData.lastActiveDate]);

  useEffect(() => {
    const requestPermissions = async () => {
      await LocalNotifications.requestPermissions();
      setIsInitialized(true)
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    if (coreData.isCloudDataLoaded && userId && studyData.subjects.length > 0) {
      coreData.checkAchievements(studyData.subjects, { type: 'questions' });
    }
  }, [coreData.isCloudDataLoaded, userId]);

  useEffect(() => { storage.saveIsMuted(isMuted); }, [isMuted]);
  
  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      if (userId) {
        storage.saveTheme(userId, theme);
      }
    }
  }, [theme, userId]);

  const toggleMute = () => setIsMuted(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleQuizCompletion = async (solvedStats: SolvedStat[], subjectId: string) => {
    await studyData.handleQuizCompletion(solvedStats, subjectId);
    const incorrectCount = solvedStats.filter(s => !s.correct).length;
    coreData.checkAchievements(studyData.subjects, {
      type: 'quiz',
      data: { quizResult: { correct: 6 - incorrectCount, incorrect: incorrectCount } }
    });
  };

  const handleEnglishUnitUnlocked = () => {
    coreData.checkAchievements(studyData.subjects, { type: 'english_unit' });
  };
  
  // YENİ: Bildirim kapatıldığında listeden kaldırma fonksiyonu
  const dismissChallenge = (challengeId: string) => {
    setPendingChallenges(prev => prev.filter(c => c.id !== challengeId));
  };

  const totalQuestions = studyData.subjects.reduce((sum, s) => sum + s.correct + s.incorrect, 0);
  const unlockedAchievements = coreData.achievements.filter(a => a.unlocked).length;

  const contextValue: AppContextType = {
    ...auth,
    ...studyData,
    ...coreData,
    ...scheduler,
    handleQuizCompletion,
    handleEnglishUnitUnlocked,
    isMuted,
    toggleMute,
    pendingChallenges,    // YENİ
    dismissChallenge,     // YENİ
  };

  return (
    <>
      {theme && (
        <div className={`max-w-7xl mx-auto p-4 pb-24`}>
          <Header
            userName={userName}
            totalQuestions={totalQuestions}
            streak={coreData.streak}
            unlockedAchievements={unlockedAchievements}
            totalPoints={coreData.totalPoints}
            theme={theme}
            toggleTheme={toggleTheme}
            currentAvatarId={coreData.userAvatars.current}
            isMuted={isMuted}
            toggleMute={toggleMute}
            isHomePage={isHomePage}
            userRole={userRole}
          />
          <main>
            {/* YENİ: Bildirim bileşeni eklendi */}
            <ChallengeNotification challenges={pendingChallenges} onDismiss={dismissChallenge} />
            <div className="animate-slide-up">
              <Outlet context={contextValue} />
            </div>
          </main>
        </div>
      )}
      <BottomNav isMuted={isMuted} />
    </>
  );
}

export function useAppContext(): AppContextType {
  return useOutletContext<AppContextType>();
}