import { Outlet, useOutletContext, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { storage } from "@/utils/storage";
import { toast } from 'sonner';
import { SolvedStat, Challenge } from '@/types';
import { LocalNotifications } from '@capacitor/local-notifications';
import { playFailSound } from '@/utils/sounds';
import { App } from '@capacitor/app';
import { supabase } from "@/supabaseClient";

import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import ChallengeNotification from "@/components/ChallengeNotification";
import { useAuthContext } from "@/contexts/AuthContext"; 
import { useStudyData } from '@/hooks/useStudyData';
import { useCoreData } from '@/hooks/useCoreData';
import { useScheduler } from '@/hooks/useScheduler';

export type AppContextType =
  ReturnType<typeof useAuthContext> &
  ReturnType<typeof useCoreData> &
  ReturnType<typeof useStudyData> &
  ReturnType<typeof useScheduler> &
  {
    handleQuizCompletion: (solvedStats: SolvedStat[], subjectId: string) => Promise<void>;
    handleEnglishUnitUnlocked: () => void;
    isMuted: boolean;
    toggleMute: () => void;
    pendingChallenges: Challenge[];
    dismissChallenge: (challengeId: string) => void;
  };

export default function AppLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(() => storage.loadIsMuted());
  const [theme, setTheme] = useState<'light' | 'dark' | null>(null);
  const [pendingChallenges, setPendingChallenges] = useState<Challenge[]>([]);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === '/' || location.pathname === '/derslerim';

  const auth = useAuthContext();
  const { userId, userName, userRole } = auth;

  // === YÖNLENDİRME DÜZELTMESİ BURADA ===
  useEffect(() => {
    const lowerCaseRole = userRole?.toLowerCase();
    if (lowerCaseRole === 'koç' || lowerCaseRole === 'admin' || lowerCaseRole === 'hoca') {
        // Eğer bir koç, öğrenci sayfalarından birine (ana sayfa, derslerim vb.) düşerse, onu doğrudan koç paneline yönlendir.
        if (location.pathname === '/' || location.pathname === '/derslerim' || location.pathname === '/practice') {
             navigate('/coach', { replace: true });
        }
    }
  }, [userRole, navigate, location.pathname]);
  // ===================================

  const coreData = useCoreData(userId, userName, userRole, isInitialized, isMuted);
  const studyData = useStudyData(userId, isInitialized, isMuted, (result, newDailySolvedCount) => {
    if (userRole?.toLowerCase() === 'koç' || userRole?.toLowerCase() === 'admin') return;
    if (coreData.setTotalPoints && coreData.setStreak) {
        coreData.setTotalPoints(prev => prev + (result.correct * 10));
        if (newDailySolvedCount === 3) {
            coreData.setStreak(prev => prev + 1);
            toast.success("Günlük seri arttı! 🔥");
        } else {
            toast.info("Harika bir paket tamamladın, devam et! 🎉");
        }
    }
  });
  const scheduler = useScheduler(userId, isInitialized);

  useEffect(() => {
    if (!userId) {
      setPendingChallenges([]);
      return;
    }

    const fetchChallenges = async () => {
      const { data, error } = await supabase.rpc('get_pending_challenges', { p_user_id: userId });
      if (error) console.error("Meydan okumalar çekilirken hata:", error);
      else if (data) setPendingChallenges(data);
    };
    fetchChallenges();

    const channel = supabase.channel(`challenges_for_${userId}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'challenges', filter: `opponent_id=eq.${userId}` },
        () => fetchChallenges()
      ).subscribe();

    return () => {
      if (channel) {
        channel.unsubscribe();
      }
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
        if (event?.url) {
          const path = new URL(event.url).pathname.replace('/app', '');
          if (path) navigate(path);
        }
      });
      const initialUrl = await App.getLaunchUrl();
      if (initialUrl?.url) {
          const path = new URL(initialUrl.url).pathname.replace('/app', '');
          if (path) navigate(path);
      }
      return listener;
    };
    const listenerPromise = checkDeepLink();
    return () => {
      listenerPromise.then(l => l.remove());
    };
  }, [navigate]);

  useEffect(() => {
    if (userId && userRole !== 'koç' && userRole !== 'admin' && studyData.lastActiveDate && coreData.setStreak) {
      const { lastActiveDate, setLastActiveDate } = studyData;
      const { streak, streakFreezes, setStreak, setStreakFreezes } = coreData;

      const today = new Date();
      const todayStr = today.toLocaleDateString();
      if (lastActiveDate !== todayStr) {
        const lastDate = new Date();
        try {
          const dateParts = lastActiveDate.split('.').map(Number);
          lastDate.setFullYear(dateParts[2], dateParts[1] - 1, dateParts[0]);
        } catch (e) {
           console.error("Tarih formatı hatası:", e);
           return;
        }

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);
        const yesterdayStart = new Date(yesterday.setHours(0, 0, 0, 0));

        if (lastDate.getTime() < yesterdayStart.getTime()) {
          if (streak > 0) {
            if (streakFreezes > 0) {
              setStreakFreezes(prev => prev - 1);
              setLastActiveDate(yesterday.toLocaleDateString());
              toast.info("Bir gün ara verdin ama Seri Dondurma serini kurtardı! ❄️");
            } else {
              setStreak(0);
              playFailSound(isMuted);
              toast.error("Serin sıfırlandı! 😢");
            }
          }
        }
      }
    }
  }, [userId, userRole, studyData, coreData, isMuted]);

  useEffect(() => {
    const requestPermissions = async () => {
      try {
        await LocalNotifications.requestPermissions();
      } catch (e) {
        console.error("Bildirim izni istenemedi.", e);
      } finally {
        setIsInitialized(true);
      }
    };
    requestPermissions();
  }, []);

  useEffect(() => {
    if (coreData.isCloudDataLoaded && userId && studyData.subjects?.length > 0 && userRole !== 'koç' && userRole !== 'admin') {
      coreData.checkAchievements(studyData.subjects, { type: 'questions' });
    }
  }, [coreData.isCloudDataLoaded, userId, studyData.subjects, userRole, coreData]);

  useEffect(() => { storage.saveIsMuted(isMuted); }, [isMuted]);

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(theme);
      if (userId) storage.saveTheme(userId, theme);
    }
  }, [theme, userId]);

  const toggleMute = () => setIsMuted(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  const handleQuizCompletion = async (solvedStats: SolvedStat[], subjectId: string) => {
    if (!studyData.handleQuizCompletion || !coreData.checkAchievements) return;
    await studyData.handleQuizCompletion(solvedStats, subjectId);
    const incorrectCount = solvedStats.filter(s => !s.correct).length;
    coreData.checkAchievements(studyData.subjects, {
      type: 'quiz',
      data: { quizResult: { correct: 6 - incorrectCount, incorrect: incorrectCount } }
    });
  };

  const handleEnglishUnitUnlocked = () => {
    if (coreData.checkAchievements) {
      coreData.checkAchievements(studyData.subjects, { type: 'english_unit' });
    }
  };

  const dismissChallenge = (challengeId: string) => {
    setPendingChallenges(prev => prev.filter(c => c.id !== challengeId));
  };

  const totalQuestions = useMemo(() => {
    return studyData.subjects?.reduce((sum, s) => sum + s.correct + s.incorrect, 0) || 0;
  }, [studyData.subjects]);

  const unlockedAchievements = useMemo(() => {
      return coreData.achievements?.filter(a => a.unlocked).length || 0;
  }, [coreData.achievements]);

  const contextValue: AppContextType = {
    ...auth, ...studyData, ...coreData, ...scheduler,
    handleQuizCompletion, handleEnglishUnitUnlocked,
    isMuted, toggleMute,
    pendingChallenges, dismissChallenge,
  };

  if (auth.authLoading || !coreData.isCloudDataLoaded) {
    return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Uygulama Yükleniyor...</p></div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto p-4 pb-24">
        <Header
          userName={userName}
          totalQuestions={totalQuestions}
          streak={coreData.streak}
          unlockedAchievements={unlockedAchievements}
          totalPoints={coreData.totalPoints}
          theme={theme}
          toggleTheme={toggleTheme}
          currentAvatarId={coreData.userAvatars?.current || 'default'}
          isMuted={isMuted}
          toggleMute={toggleMute}
          isHomePage={isHomePage}
          userRole={userRole}
        />
        <main>
          <ChallengeNotification challenges={pendingChallenges} onDismiss={dismissChallenge} />
          <div className="animate-slide-up">
            <Outlet context={contextValue} />
          </div>
        </main>
      </div>
      <BottomNav isMuted={isMuted} userRole={userRole} />
    </>
  );
}

export function useAppContext(): AppContextType { 
  return useOutletContext<AppContextType>();
}