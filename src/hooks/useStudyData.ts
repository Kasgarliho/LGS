// src/hooks/useStudyData.ts

import { useState, useEffect } from 'react';
import { storage } from '@/utils/storage';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { Subject, StudySession, SolvedStat } from '@/types';
import { subjects as initialSubjects } from '@/data/subjects';
import { playSuccessSound } from '@/utils/sounds';

type QuizCompletionResult = {
  correct: number;
  incorrect: number;
};

export const useStudyData = (
  userId: string | null,
  isInitialized: boolean,
  isMuted: boolean,
  onQuizCompleted: (result: QuizCompletionResult, newDailySolvedCount: number) => void
) => {
  const [subjects, setSubjects] = useState<Subject[]>(initialSubjects);
  const [sessions, setSessions] = useState<StudySession[]>([]);
  // GÜNCELLENDİ: dailySolvedSubjects artık Supabase'ten çekilecek
  const [dailySolvedSubjects, setDailySolvedSubjects] = useState<string[]>([]);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);
  
  // YENİ: Bugünün tarihi (YYYY-MM-DD formatında, Supabase Date tipine uygun)
  const getTodayDate = () => new Date().toISOString().split('T')[0];

  // GÜNCELLENDİ: DailySolvedSubjects ve LastActiveDate'i Supabase'ten çekme
  useEffect(() => {
    if (userId) {
      const fetchDailyData = async () => {
        const todayStr = new Date().toLocaleDateString();
        const todaySQL = getTodayDate();
        
        // 1. Dün çözülmemişse günlük görevleri temizle (Supabase tablosu değil, sadece lokal state)
        const storedLastActiveDate = storage.loadLastActiveDate(userId);
        if (storedLastActiveDate && storedLastActiveDate !== todayStr) {
          // Eğer gün değişmişse lokal state'i ve storage'ı temizle
          storage.clearDailySolvedSubjects(userId);
        }
        
        // 2. Supabase'ten bugünkü tamamlanmış görevleri çek
        const { data, error } = await supabase
          .from('tamamlanan_gunluk_gorevler')
          .select('ders_id')
          .eq('kullanici_id', userId)
          .eq('tamamlanma_tarihi', todaySQL);

        if (error) {
          console.error("Günlük görevler Supabase'ten çekilemedi:", error);
          // Hata durumunda sadece lokal storage'daki veriye güven
          setDailySolvedSubjects(storage.loadDailySolvedSubjects(userId, todayStr));
        } else if (data) {
          const solved = data.map(row => row.ders_id);
          setDailySolvedSubjects(solved);
          // Çekilen veriyi local storage'a da yaz (hızlı yükleme için)
          storage.saveDailySolvedSubjects(userId, solved);
        }
        
        setLastActiveDate(storedLastActiveDate);
      };
      fetchDailyData();
    } else {
        setSubjects(initialSubjects);
        setSessions([]);
        setDailySolvedSubjects([]);
        setLastActiveDate(null);
    }
  }, [userId]);


  useEffect(() => {
    if (userId) {
      const fetchStudyData = async () => {
        const { data: statsData, error } = await supabase.rpc('get_user_stats', { p_user_id: userId });
        if (error) {
          console.error("Özet istatistik verileri çekilemedi:", error);
          const loadedSubjects = storage.loadSubjects(userId);
          setSubjects(loadedSubjects.length > 0 ? loadedSubjects : initialSubjects);
          setSessions(storage.loadSessions(userId));
        } else if (statsData) {
          const syncedSubjects = JSON.parse(JSON.stringify(initialSubjects));
          const summarySessions: StudySession[] = [];
          statsData.forEach(stat => {
            const subject = syncedSubjects.find((s: Subject) => s.id === stat.ders_id);
            if (subject) {
              subject.correct += stat.toplam_dogru;
              subject.incorrect += stat.toplam_yanlis;
              if (stat.konu && !subject.topics.includes(stat.konu)) {
                subject.topics.push(stat.konu);
              }
            }
            summarySessions.push({
              id: `summary-${stat.ders_id}-${stat.konu}`,
              subjectId: stat.ders_id,
              correctCount: stat.toplam_dogru,
              incorrectCount: stat.toplam_yanlis,
              questionsCompleted: stat.toplam_dogru + stat.toplam_yanlis,
              topic: stat.konu,
              date: new Date(),
              duration: 0,
            });
          });
          setSubjects(syncedSubjects);
          setSessions(summarySessions);
        }
      };
      fetchStudyData();
    } else {
        setSubjects(initialSubjects);
        setSessions([]);
    }
  }, [userId]);

  // GÜNCELLENDİ: DailySolvedSubjects için storage kaydı kaldırıldı, sadece LastActiveDate kaldı
  useEffect(() => { if (isInitialized && userId) storage.saveSubjects(userId, subjects); }, [subjects, isInitialized, userId]);
  useEffect(() => { if (isInitialized && userId) storage.saveSessions(userId, sessions); }, [sessions, isInitialized, userId]);
  useEffect(() => { if (isInitialized && userId && lastActiveDate) storage.saveLastActiveDate(userId, lastActiveDate); }, [lastActiveDate, isInitialized, userId]);


  const handleAddQuestions = async (subjectId: string, counts: { correct: number, incorrect: number }, topic: string) => {
    if (!userId) return;
    const { correct, incorrect } = counts;
    const newSession: StudySession = {
      id: Date.now().toString(), subjectId, correctCount: correct, incorrectCount: incorrect,
      questionsCompleted: correct + incorrect, topic, date: new Date(), duration: 0,
    };
    setSessions(prev => [...prev, newSession]);
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, correct: s.correct + correct, incorrect: s.incorrect + incorrect } : s));
    toast.success(`${correct + incorrect} soru eklendi! ✨`);
    playSuccessSound(isMuted);

    // Soruyu cozulen_sorular tablosuna kaydet
    await supabase.from('cozulen_sorular').insert({ kullanici_id: userId, ders_id: subjectId, dogru_sayisi: correct, yanlis_sayisi: incorrect, konu: topic });
  };

  const handleQuizCompletion = async (solvedStats: SolvedStat[], subjectId: string) => {
    if (!userId) return;
    const todayStr = new Date().toLocaleDateString();
    
    // GÜNCELLENDİ: Local state kontrolü yerine Supabase'e kayıt kontrolü yapılacak
    if (dailySolvedSubjects.includes(subjectId)) return;
    
    const newDailySolved = [...dailySolvedSubjects, subjectId];
    setDailySolvedSubjects(newDailySolved);
    
    const correctCount = solvedStats.filter(s => s.correct).length;
    const incorrectCount = 6 - correctCount;
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, correct: s.correct + correctCount, incorrect: s.incorrect + incorrectCount } : s));
    const newSession: StudySession = {
      id: Date.now().toString(), subjectId, correctCount, incorrectCount, questionsCompleted: 6,
      topic: "Günlük Test", date: new Date(), duration: 0,
    };
    setSessions(prev => [...prev, newSession]);
    setLastActiveDate(todayStr);
    
    onQuizCompleted({ correct: correctCount, incorrect: incorrectCount }, newDailySolved.length);
    
    // 1. Soruyu cozulen_sorular tablosuna kaydet
    await supabase.from('cozulen_sorular').insert({ kullanici_id: userId, ders_id: subjectId, dogru_sayisi: correctCount, yanlis_sayisi: incorrectCount, konu: "Günlük Test" });
    
    // 2. GÜNLÜK GÖREV TAMAMLAMA KAYDINI YENİ TABLOYA EKLE
    await supabase.from('tamamlanan_gunluk_gorevler').insert({ kullanici_id: userId, ders_id: subjectId, tamamlanma_tarihi: getTodayDate() });
    
    // 3. Local Storage'daki günlük görev kaydını güncelle (hızlı yükleme için)
    storage.saveDailySolvedSubjects(userId, newDailySolved);
  };

  return {
    subjects,
    sessions,
    dailySolvedSubjects,
    lastActiveDate,
    setLastActiveDate,
    handleAddQuestions,
    handleQuizCompletion
  };
};