import { Outlet, useOutletContext, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { storage } from "@/utils/storage";
import { toast } from 'sonner';
import { AppContextType, SolvedStat } from '@/types';
import { LocalNotifications } from '@capacitor/local-notifications';
import { playFailSound } from '@/utils/sounds';

// UI Bileşenleri
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Oluşturduğumuz Hook'lar
import { useAuth } from '@/hooks/useAuth';
import { useStudyData } from '@/hooks/useStudyData';
import { useCoreData } from '@/hooks/useCoreData';
import { useScheduler } from '@/hooks/useScheduler';

export default function AppLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isMuted, setIsMuted] = useState(() => storage.loadIsMuted());
  const [theme, setTheme] = useState<'light' | 'dark'>(() => storage.loadTheme() || 'dark');
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const auth = useAuth(isMuted);
  const { userId, userName } = auth;

  const coreData = useCoreData(userId, isInitialized, isMuted);

  const studyData = useStudyData(userId, isInitialized, isMuted, (result, newDailySolvedCount) => {
    coreData.setTotalPoints(prev => prev + (result.correct * 10));
    if (newDailySolvedCount === 3) {
      coreData.setStreak(prev => prev + 1);
      toast.success("Günlük seri arttı! 🔥");
    } else {
      toast.info("Harika bir paket tamamladın, devam et! 🎉");
    }
  });

  const scheduler = useScheduler(userId, isInitialized);

  useEffect(() => {
    if (userId) {
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
  }, [userId, studyData.lastActiveDate, coreData.streakFreezes, coreData.setStreak, coreData.setStreakFreezes, studyData.setLastActiveDate, isMuted]);

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
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
    storage.saveTheme(theme);
  }, [theme]);

  const toggleMute = () => setIsMuted(prev => !prev);
  const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

  // =================================================================
  // DÜZELTME BURADA: Parametre adı 'solvedStats' olarak güncellendi.
  // =================================================================
  const handleQuizCompletion = async (solvedStats: SolvedStat[], subjectId: string) => {
    await studyData.handleQuizCompletion(solvedStats, subjectId);
    // Yanlış sayısı artık doğru hesaplanacak
    const incorrectCount = solvedStats.filter(s => !s.correct).length;
    coreData.checkAchievements(studyData.subjects, {
      type: 'quiz',
      data: { quizResult: { correct: 6 - incorrectCount, incorrect: incorrectCount } }
    });
  };

  const handleEnglishUnitUnlocked = () => {
    coreData.checkAchievements(studyData.subjects, { type: 'english_unit' });
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
    toggleMute
  };

  return (
    <>
      <Dialog open={auth.showNameModal}>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="text-2xl">Sisteme Giriş</DialogTitle>
            <DialogDescription>Devam etmek için bilgilerini ve koç kodunu gir.</DialogDescription>
          </DialogHeader>
          <div className="py-4 space-y-4">
            <Input placeholder="Adın Soyadın..." value={auth.tempName} onChange={(e) => auth.setTempName(e.target.value)} />
            <Input placeholder="Sınıfın (Örn: 8A)" value={auth.className} onChange={(e) => auth.setClassName(e.target.value)} />
            <Input placeholder="Koç Kodu" value={auth.coachCode} onChange={(e) => auth.setCoachCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && auth.handleRegistration()} />
            <Button onClick={auth.handleRegistration} disabled={!auth.tempName.trim() || !auth.className.trim() || !auth.coachCode.trim()} className="w-full">Giriş Yap</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="max-w-7xl mx-auto p-4 pb-24">
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
        />
        <main>
          <div className="animate-slide-up">
            <Outlet context={contextValue} />
          </div>
        </main>
      </div>
      <BottomNav isMuted={isMuted} />
    </>
  );
};

export function useAppContext(): AppContextType {
  return useOutletContext<AppContextType>();
}