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
  const [dailySolvedSubjects, setDailySolvedSubjects] = useState<string[]>([]);
  const [lastActiveDate, setLastActiveDate] = useState<string | null>(null);

  useEffect(() => {
    const todayStr = new Date().toLocaleDateString();
    const storedLastActiveDate = storage.loadLastActiveDate();
    setDailySolvedSubjects(storage.loadDailySolvedSubjects(todayStr));
    setLastActiveDate(storedLastActiveDate);

    if (storedLastActiveDate && storedLastActiveDate !== todayStr) {
      storage.clearDailySolvedSubjects();
      setDailySolvedSubjects([]);
    }

    if (userId) {
      const fetchStudyData = async () => {
        // =================================================================
        // DÜZELTME: Artık tüm kayıtları çekmek yerine RPC fonksiyonunu çağırıyoruz.
        // =================================================================
        const { data: statsData, error } = await supabase.rpc('get_user_stats', {
          p_user_id: userId
        });

        if (error) {
          console.error("Özet istatistik verileri çekilemedi:", error);
          // Hata durumunda eski yöntemle lokalden yükle
          setSubjects(storage.loadSubjects().length > 0 ? storage.loadSubjects() : initialSubjects);
          setSessions(storage.loadSessions());
        } else if (statsData) {
          // Gelen özet veriyi işleyerek state'leri güncelliyoruz.
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
            // İstatistik sayfasının çalışmaya devam etmesi için özet session'lar oluşturuyoruz
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
        setSubjects(storage.loadSubjects().length > 0 ? storage.loadSubjects() : initialSubjects);
        setSessions(storage.loadSessions());
    }
  }, [userId]);

  useEffect(() => { if (isInitialized) storage.saveSubjects(subjects); }, [subjects, isInitialized]);
  useEffect(() => { if (isInitialized) storage.saveSessions(sessions); }, [sessions, isInitialized]);
  useEffect(() => { if (isInitialized && lastActiveDate) storage.saveLastActiveDate(lastActiveDate); }, [lastActiveDate, isInitialized]);
  useEffect(() => { storage.saveDailySolvedSubjects(dailySolvedSubjects); }, [dailySolvedSubjects]);

  const handleAddQuestions = async (subjectId: string, counts: { correct: number, incorrect: number }, topic: string) => {
    const { correct, incorrect } = counts;
    // Yeni eklenen soruları anında görebilmek için lokal state'i hemen güncelliyoruz
    const newSession: StudySession = {
      id: Date.now().toString(), subjectId, correctCount: correct, incorrectCount: incorrect,
      questionsCompleted: correct + incorrect, topic, date: new Date(), duration: 0,
    };
    setSessions(prev => [...prev, newSession]);
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, correct: s.correct + correct, incorrect: s.incorrect + incorrect } : s));
    toast.success(`${correct + incorrect} soru eklendi! ✨`);
    playSuccessSound(isMuted);

    if (userId) {
      await supabase.from('cozulen_sorular').insert({ kullanici_id: userId, ders_id: subjectId, dogru_sayisi: correct, yanlis_sayisi: incorrect, konu: topic });
    }
  };

  const handleQuizCompletion = async (correctlySolved: SolvedStat[], subjectId: string) => {
    const todayStr = new Date().toLocaleDateString();
    if (dailySolvedSubjects.includes(subjectId)) return;

    const newDailySolved = [...dailySolvedSubjects, subjectId];
    setDailySolvedSubjects(newDailySolved);

    const correctCount = correctlySolved.length;
    const incorrectCount = 6 - correctCount;

    // Lokal state'i anında güncelle
    setSubjects(prev => prev.map(s => s.id === subjectId ? { ...s, correct: s.correct + correctCount, incorrect: s.incorrect + incorrectCount } : s));
    const newSession: StudySession = {
      id: Date.now().toString(), subjectId, correctCount, incorrectCount, questionsCompleted: 6,
      topic: "Günlük Test", date: new Date(), duration: 0,
    };
    setSessions(prev => [...prev, newSession]);
    setLastActiveDate(todayStr);

    onQuizCompleted({ correct: correctCount, incorrect: incorrectCount }, newDailySolved.length);

    if (userId) {
      await supabase.from('cozulen_sorular').insert({ kullanici_id: userId, ders_id: subjectId, dogru_sayisi: correctCount, yanlis_sayisi: incorrectCount, konu: "Günlük Test" });
    }
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