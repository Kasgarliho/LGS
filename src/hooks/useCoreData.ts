import { useState, useEffect } from 'react';
import { storage } from '@/utils/storage';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { Achievement, UserAvatars, Subject } from '@/types';
import { achievements as initialAchievementsData } from '@/data/achievements';
import { avatars as allAvatars } from "@/data/avatars";
import { playPurchaseSound, playConfirmSound, playFailSound } from "@/utils/sounds";

export const useCoreData = (
  userId: string | null,
  isInitialized: boolean,
  isMuted: boolean
) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [streakFreezes, setStreakFreezes] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievementsData);
  const [userAvatars, setUserAvatars] = useState<UserAvatars>({ current: 'default', unlocked: ['default'] });
  const [isCloudDataLoaded, setIsCloudDataLoaded] = useState(false);

  const updateUserCloudData = async (dataToUpdate: object) => {
    if (!userId || !isInitialized || !isCloudDataLoaded) return;

    const { error } = await supabase.from('kullanicilar').update(dataToUpdate).eq('id', userId);
    if (error) console.error("Bulut verisi güncellenirken hata oluştu:", error);
  };

  useEffect(() => {
    if (userId) {
      const fetchCoreData = async () => {
        const { data: cloudData, error } = await supabase
          .from('kullanicilar')
          .select('puan, seri, seri_dondurma, avatar, kazanilan_basarimlar')
          .eq('id', userId)
          .maybeSingle();

        if (error || !cloudData) {
          console.error("Bulut çekirdek verileri çekilemedi, lokal veriler kullanılacak:", error);
          setTotalPoints(storage.loadPoints());
          setStreak(storage.loadStreak());
          setStreakFreezes(storage.loadStreakFreezes());
          setUserAvatars(storage.loadUserAvatars());
          setAchievements(storage.loadAchievements().length > 0 ? storage.loadAchievements() : initialAchievementsData);
        } else {
          setTotalPoints(cloudData.puan ?? 0);
          setStreak(cloudData.seri ?? 0);
          setStreakFreezes(cloudData.seri_dondurma ?? 0);
          try {
            const parsedAvatars = typeof cloudData.avatar === 'string' ? JSON.parse(cloudData.avatar) : cloudData.avatar;
            setUserAvatars(parsedAvatars && parsedAvatars.unlocked ? parsedAvatars : storage.loadUserAvatars());
          } catch (e) {
            setUserAvatars(storage.loadUserAvatars());
          }
          const unlockedAchievementIds = new Set(cloudData.kazanilan_basarimlar || []);
          const syncedAchievements = initialAchievementsData.map(ach => ({ ...ach, unlocked: unlockedAchievementIds.has(ach.id) }));
          setAchievements(syncedAchievements);
        }
        setIsCloudDataLoaded(true);
      };
      fetchCoreData();
    } else {
        setTotalPoints(storage.loadPoints());
        setStreak(storage.loadStreak());
        setStreakFreezes(storage.loadStreakFreezes());
        setUserAvatars(storage.loadUserAvatars());
        setAchievements(storage.loadAchievements().length > 0 ? storage.loadAchievements() : initialAchievementsData);
        setIsCloudDataLoaded(true);
    }
  }, [userId]);
  
  useEffect(() => {
    if (!isInitialized || achievements.length === 0) return;
    const unlockedAchievements = achievements.filter(a => a.unlocked);
    const avatarsToUnlock = allAvatars.filter(avatar =>
      avatar.unlockMethod === 'achievement' &&
      unlockedAchievements.some(ach => ach.id === avatar.achievementId)
    );
    const newAvatarIds = avatarsToUnlock.map(avatar => avatar.id);
    if (newAvatarIds.length > 0) {
      setUserAvatars(currentAvatars => {
        const allUnlockedIds = [...new Set([...currentAvatars.unlocked, ...newAvatarIds])];
        if (allUnlockedIds.length > currentAvatars.unlocked.length) {
          return { ...currentAvatars, unlocked: allUnlockedIds };
        }
        return currentAvatars;
      });
    }
  }, [achievements, isInitialized]);

  useEffect(() => { if (isInitialized) { storage.savePoints(totalPoints); updateUserCloudData({ puan: totalPoints }); } }, [totalPoints, isInitialized]);
  useEffect(() => { if (isInitialized) { storage.saveStreak(streak); updateUserCloudData({ seri: streak }); } }, [streak, isInitialized]);
  useEffect(() => { if (isInitialized) { storage.saveStreakFreezes(streakFreezes); updateUserCloudData({ seri_dondurma: streakFreezes }); } }, [streakFreezes, isInitialized]);
  useEffect(() => { if (isInitialized && userAvatars) { storage.saveUserAvatars(userAvatars); updateUserCloudData({ avatar: userAvatars }); } }, [userAvatars, isInitialized]);
  useEffect(() => {
    if (isInitialized && achievements.length > 0) {
      storage.saveAchievements(achievements);
      const unlockedIds = achievements.filter(a => a.unlocked).map(a => a.id);
      if (unlockedIds.length > 0 || isCloudDataLoaded) updateUserCloudData({ kazanilan_basarimlar: unlockedIds });
    }
  }, [achievements, isInitialized, isCloudDataLoaded]);

  const handleBuyStreakFreeze = () => {
    const price = 200;
    if (totalPoints >= price) {
      setTotalPoints(prev => prev - price);
      setStreakFreezes(prev => prev + 1);
      playPurchaseSound(isMuted);
      toast.success("Seri Dondurma satın alındı! ❄️");
    } else {
      toast.error("Yetersiz puan!");
    }
  };

  const handleBuyAvatar = (avatarId: string) => {
    const avatar = allAvatars.find(a => a.id === avatarId);
    if (!avatar || avatar.unlockMethod !== 'purchase') return;
    const price = avatar.price || 0;
    if (totalPoints >= price && !(userAvatars?.unlocked || []).includes(avatarId)) {
      setTotalPoints(prev => prev - price);
      setUserAvatars(prev => ({ ...prev, unlocked: [...(prev?.unlocked || []), avatarId] }));
      toast.success(`${avatar.name} avatarı satın alındı!`);
      playPurchaseSound(isMuted);
    } else {
      toast.error("Yetersiz puan veya bu avatara zaten sahipsin.");
    }
  };

  const handleSetAvatar = (avatarId: string) => {
    if ((userAvatars?.unlocked || []).includes(avatarId)) {
      setUserAvatars(prev => ({ ...prev, current: avatarId }));
      toast.success("Avatarın değiştirildi!");
      playConfirmSound(isMuted);
    }
  };
  
  const checkAchievements = (subjects: Subject[], trigger: { type: 'quiz' | 'questions' | 'english_unit', data?: any }) => {
    const locked = achievements.filter(a => !a.unlocked);
    if (locked.length === 0) return;

    const totalQuestions = subjects.reduce((sum, s) => sum + s.correct + s.incorrect, 0);
    let newAchievementsUnlocked = false;

    const updatedAchievements = achievements.map(ach => {
      if (ach.unlocked) return ach;
      let conditionMet = false;

      switch (ach.category) {
        case 'questions': if (ach.requiredQuestions && totalQuestions >= ach.requiredQuestions) conditionMet = true; break;
        case 'streak': if (ach.requiredQuestions && streak >= ach.requiredQuestions) conditionMet = true; break;
        case 'subject':
          const subjectData = subjects.find(s => s.id === ach.requiredSubjectId);
          if (subjectData && ach.requiredQuestions && (subjectData.correct + subjectData.incorrect) >= ach.requiredQuestions) { conditionMet = true; }
          break;
      }
      if (trigger.type === 'quiz') {
        const now = new Date();
        const quizResult: {correct: number, incorrect: number} = trigger.data.quizResult;
        if (ach.id === 'perfect-performance' && quizResult.incorrect === 0) conditionMet = true;
        if (ach.id === 'night-owl' && now.getHours() >= 0 && now.getHours() < 5) conditionMet = true;
        if (ach.id === 'early-bird' && now.getHours() >= 5 && now.getHours() < 7) conditionMet = true;
      }
      if (trigger.type === 'english_unit') { if (ach.id === 'english-unit-unlocked') conditionMet = true; }
      
      if (conditionMet) {
        newAchievementsUnlocked = true;
        toast.info(`Başarım Kazanıldı: ${ach.title}`);
        
        const avatarToUnlock = allAvatars.find(avatar => avatar.achievementId === ach.id);
        if (avatarToUnlock) {
          setUserAvatars(currentAvatars => {
            if (!currentAvatars.unlocked.includes(avatarToUnlock.id)) {
              toast.success("Yeni bir avatar kazandın! 🥳");
              return { ...currentAvatars, unlocked: [...currentAvatars.unlocked, avatarToUnlock.id] };
            }
            return currentAvatars;
          });
        }
        return { ...ach, unlocked: true, unlockedAt: new Date() };
      }
      return ach;
    });

    if (newAchievementsUnlocked) {
      setAchievements(updatedAchievements);
    }
  };

  return {
    totalPoints, setTotalPoints,
    streak, setStreak,
    streakFreezes, setStreakFreezes,
    achievements,
    userAvatars,
    handleBuyStreakFreeze,
    handleBuyAvatar,
    handleSetAvatar,
    checkAchievements,
    isCloudDataLoaded, // DÜZELTME: Bu satırın eklendiğinden emin oluyoruz.
  };
};