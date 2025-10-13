import { useState, useEffect } from 'react';
import { storage } from '@/utils/storage';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { Achievement, UserAvatars, Subject } from '@/types';
import { achievements as initialAchievementsData } from '@/data/achievements';
import { avatars as allAvatars } from "@/data/avatars";
import { playPurchaseSound, playConfirmSound } from "@/utils/sounds";

export const useCoreData = (
  userId: string | null,
  userName: string | null, 
  userRole: string | null,
  isInitialized: boolean,
  isMuted: boolean
) => {
  const [totalPoints, setTotalPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [streakFreezes, setStreakFreezes] = useState(0);
  const [achievements, setAchievements] = useState<Achievement[]>(initialAchievementsData);
  const [userAvatars, setUserAvatars] = useState<UserAvatars>({ current: 'default', unlocked: ['default'] });
  const [challengeWins, setChallengeWins] = useState(0);
  const [isCloudDataLoaded, setIsCloudDataLoaded] = useState(false);

  const updateUserCloudData = async (dataToUpdate: object) => {
    if (!userId || !isInitialized) return;
    const { error } = await supabase.from('kullanicilar').update(dataToUpdate).eq('id', userId);
    if (error) console.error("Bulut verisi güncellenirken hata oluştu:", error);
  };

  useEffect(() => {
    if (!userId) {
      setIsCloudDataLoaded(true);
      setTotalPoints(0);
      setStreak(0);
      setStreakFreezes(0);
      setChallengeWins(0);
      setUserAvatars({ current: 'default', unlocked: ['default'] });
      setAchievements(initialAchievementsData);
      return; 
    }

    setIsCloudDataLoaded(false);

    const fetchCoreData = async () => {
      try {
        const [cloudDataRes, winsDataRes] = await Promise.all([
          supabase.from('kullanicilar').select('puan, seri, seri_dondurma, avatar, kazanilan_basarimlar, is_test_account').eq('id', userId).maybeSingle(),
          supabase.rpc('get_challenge_win_count', { p_user_id: userId })
        ]);

        if (winsDataRes.data) setChallengeWins(winsDataRes.data);

        const { data: cloudData, error } = cloudDataRes;
        
        if (!error && cloudData) {
            const isTestAccount = cloudData.is_test_account === true;
            const lowerCaseRole = userRole?.toLowerCase();
            const isPrivilegedRole = lowerCaseRole === 'koç' || lowerCaseRole === 'admin' || lowerCaseRole === 'hoca';

            // === KOÇ/TEST HESABI İÇİN AVATAR KAYDETME DÜZELTMESİ ===
            if (isPrivilegedRole || isTestAccount) {
                // 1. Önce veritabanından kayıtlı avatar bilgisini güvenle alalım.
                let savedAvatarCurrent = 'default';
                if (cloudData.avatar) {
                    try {
                        const parsed = typeof cloudData.avatar === 'string' ? JSON.parse(cloudData.avatar) : cloudData.avatar;
                        if (parsed && parsed.current) {
                            savedAvatarCurrent = parsed.current;
                        }
                    } catch (e) { /* Hata olursa varsayılanı kullan */ }
                }

                // 2. Tüm avatarların kilidini aç ve kayıtlı avatarı ata.
                const allAvatarIds = allAvatars.map(avatar => avatar.id);
                const finalPrivilegedAvatars: UserAvatars = {
                    current: savedAvatarCurrent,
                    unlocked: allAvatarIds
                };
                setUserAvatars(finalPrivilegedAvatars);
                storage.saveUserAvatars(userId, finalPrivilegedAvatars);

                // 3. Diğer özel ayrıcalıkları ata.
                setTotalPoints(9999);
                setStreak(99);
                setAchievements(initialAchievementsData.map(a => ({ ...a, unlocked: true, unlockedAt: new Date() })));
                setChallengeWins(999);
            } else {
                // Normal öğrenciler için zaten çalışan sağlamlaştırılmış kod
                setTotalPoints(cloudData.puan ?? 0);
                setStreak(cloudData.seri ?? 0);
                setStreakFreezes(cloudData.seri_dondurma ?? 0);

                const defaultAvatarState: UserAvatars = { current: 'default', unlocked: ['default'] };
                let cloudAvatars: UserAvatars | null = null;
                if (cloudData.avatar) {
                    try { cloudAvatars = typeof cloudData.avatar === 'string' ? JSON.parse(cloudData.avatar) : cloudData.avatar; } catch (e) { cloudAvatars = null; }
                }
                
                const finalAvatars: UserAvatars = {
                    current: cloudAvatars?.current || defaultAvatarState.current,
                    unlocked: cloudAvatars?.unlocked || defaultAvatarState.unlocked,
                };
                setUserAvatars(finalAvatars);
                storage.saveUserAvatars(userId, finalAvatars);
                
                const unlockedAchievementIds = new Set(cloudData.kazanilan_basarimlar || []);
                const syncedAchievements = initialAchievementsData.map(ach => ({ ...ach, unlocked: unlockedAchievementIds.has(ach.id) }));
                setAchievements(syncedAchievements);
            }
        } else {
            setTotalPoints(storage.loadPoints(userId));
            setStreak(storage.loadStreak(userId));
            setStreakFreezes(storage.loadStreakFreezes(userId));
            setUserAvatars(storage.loadUserAvatars(userId));
            setAchievements(storage.loadAchievements(userId));
        }
      } catch (e) {
          console.error("fetchCoreData içinde beklenmedik bir hata oluştu:", e);
      } finally {
          setIsCloudDataLoaded(true);
      }
    };
    fetchCoreData();

  }, [userId, userRole, userName]);

  useEffect(() => {
    if (!isInitialized || !userId || userRole?.toLowerCase() === 'koç' || userRole?.toLowerCase() === 'admin') return;
    
    const debounceTimer = setTimeout(() => {
        storage.savePoints(userId, totalPoints);
        storage.saveStreak(userId, streak);
        storage.saveStreakFreezes(userId, streakFreezes);
        
        updateUserCloudData({
            puan: totalPoints,
            seri: streak,
            seri_dondurma: streakFreezes,
        });
    }, 1500);

    return () => clearTimeout(debounceTimer);
  }, [totalPoints, streak, streakFreezes, isInitialized, userId, userRole]);

  useEffect(() => {
    if (isInitialized && userId && achievements.length > 0 && userRole?.toLowerCase() !== 'koç' && userRole?.toLowerCase() !== 'admin') {
      storage.saveAchievements(userId, achievements);
      const unlockedIds = achievements.filter(a => a.unlocked).map(a => a.id);
      updateUserCloudData({ kazanilan_basarimlar: unlockedIds });
    }
  }, [achievements, isInitialized, userId, userRole]);

  const handleSetAvatar = (avatarId: string) => {
    if (!userId) return;
    if ((userAvatars?.unlocked || []).includes(avatarId)) {
      const newAvatarsState: UserAvatars = {
        current: avatarId,
        unlocked: userAvatars?.unlocked || ['default']
      };
      setUserAvatars(newAvatarsState);
      storage.saveUserAvatars(userId, newAvatarsState);
      updateUserCloudData({ avatar: newAvatarsState });
      toast.success("Avatarın değiştirildi!");
      playConfirmSound(isMuted);
    }
  };

  const handleBuyAvatar = (avatarId: string) => {
    const lowerCaseRole = userRole?.toLowerCase();
    if (!userId || lowerCaseRole === 'koç' || lowerCaseRole === 'admin' || lowerCaseRole === 'hoca') return;
    const avatar = allAvatars.find(a => a.id === avatarId);
    if (!avatar || avatar.unlockMethod !== 'purchase') return;
    const price = avatar.price || 0;
    if (totalPoints >= price && !(userAvatars?.unlocked || []).includes(avatarId)) {
      setTotalPoints(prev => prev - price);
      const newAvatarsState: UserAvatars = {
        current: userAvatars?.current || 'default',
        unlocked: [...(userAvatars?.unlocked || []), avatarId]
      };
      setUserAvatars(newAvatarsState);
      storage.saveUserAvatars(userId, newAvatarsState);
      updateUserCloudData({ avatar: newAvatarsState });
      toast.success(`${avatar.name} avatarı satın alındı!`);
      playPurchaseSound(isMuted);
    } else {
      toast.error("Yetersiz puan veya bu avatara zaten sahipsin.");
    }
  };
  
  const handleBuyStreakFreeze = () => {
    const lowerCaseRole = userRole?.toLowerCase();
    if (!userId || lowerCaseRole === 'koç' || lowerCaseRole === 'admin' || lowerCaseRole === 'hoca') return;
    const price = 200;
    if (totalPoints >= price) {
      setTotalPoints(prev => prev - price);
      setStreakFreezes(prev => prev + 1);
      playPurchaseSound(isMuted);
    } else {
      toast.error("Yetersiz puan!");
    }
  };

  const checkAchievements = (subjects: Subject[], trigger: { type: 'quiz' | 'questions' | 'english_unit', data?: any }) => {
    const lowerCaseRole = userRole?.toLowerCase();
    if (!userId || lowerCaseRole === 'koç' || lowerCaseRole === 'admin' || lowerCaseRole === 'hoca') return;
    
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
        if (avatarToUnlock && userId) {
            setUserAvatars(currentAvatars => {
                const newAvatarsState: UserAvatars = {
                    current: currentAvatars.current || 'default',
                    unlocked: [...(currentAvatars.unlocked || []), avatarToUnlock.id]
                };
                storage.saveUserAvatars(userId, newAvatarsState);
                updateUserCloudData({ avatar: newAvatarsState });
                toast.success("Yeni bir avatar kazandın! 🥳");
                return newAvatarsState;
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
    challengeWins,
    handleBuyStreakFreeze,
    handleBuyAvatar,
    handleSetAvatar,
    checkAchievements,
    isCloudDataLoaded,
  };
};