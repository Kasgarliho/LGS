import { useEffect, useMemo, useState } from 'react';
import { storage, NotificationSettings } from '@/utils/storage';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { ManualSchedule, CustomStudyPlan, StudyPlanEntry } from '@/types';
import { LocalNotifications } from '@capacitor/local-notifications';
import { subjects as allSubjectsData } from '@/data/subjects';

const weekDaysForLookup = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];

export const useScheduler = (userId: string | null, isInitialized: boolean) => {
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>(storage.loadNotificationSettings());
  const [manualSchedule, setManualSchedule] = useState<ManualSchedule | null>(storage.loadManualSchedule());
  const [customPlan, setCustomPlan] = useState<CustomStudyPlan | null>(null);

  const tomorrowSubjects = useMemo(() => {
    if (!manualSchedule) return [];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayName = weekDaysForLookup[tomorrow.getDay()];
    const subjectsForTomorrow = manualSchedule[dayName] || [];
    return [...new Set(subjectsForTomorrow.map(lesson => lesson.subject).filter(Boolean))];
  }, [manualSchedule]);

  const isEvening = useMemo(() => new Date().getHours() >= 19, []);

  const updateUserCloudData = async (dataToUpdate: object) => {
    if (!userId || !isInitialized) return;
    const { error } = await supabase.from('kullanicilar').update(dataToUpdate).eq('id', userId);
    if (error) {
        console.error("Bulut zamanlama verisi güncellenirken hata oluştu:", error);
        toast.error("Programınız buluta kaydedilemedi.");
    }
  };

  useEffect(() => {
    if (userId) {
      const fetchSchedulerData = async () => {
        const { data, error } = await supabase
          .from('kullanicilar')
          .select('manuel_program, calisma_programi')
          .eq('id', userId)
          .single();

        if (error) {
          console.error("Zamanlama verileri çekilirken hata:", error);
        } else if (data) {
          setManualSchedule(data.manuel_program || storage.loadManualSchedule());
          setCustomPlan(data.calisma_programi || {});
        }
      };
      fetchSchedulerData();
    } else {
        setManualSchedule(null);
        setCustomPlan(null);
    }
  }, [userId]);

  useEffect(() => {
    if (userId && isInitialized && manualSchedule) {
      storage.saveManualSchedule(manualSchedule);
      updateUserCloudData({ manuel_program: manualSchedule });
    }
  }, [manualSchedule, userId, isInitialized]);

  useEffect(() => {
    if (userId && isInitialized && customPlan) {
      storage.saveCustomStudyPlan(userId, customPlan);
      updateUserCloudData({ calisma_programi: customPlan });
    }
  }, [customPlan, userId, isInitialized]);
  
  useEffect(() => {
    storage.saveNotificationSettings(notificationSettings);
  }, [notificationSettings]);


  const handleUpdateManualSchedule = (newSchedule: ManualSchedule) => {
    setManualSchedule(newSchedule);
    toast.success("Ders programı güncellendi ve kaydedildi.");
  };

  const getSubjectName = (subjectId: string) => {
    const subject = allSubjectsData.find(s => s.id === subjectId);
    return subject ? subject.name : 'Bilinmeyen Ders';
  };

  const handleAddPlanEntry = async (newEntryData: Omit<StudyPlanEntry, 'id' | 'notificationId'>) => {
    const fullEntry: StudyPlanEntry = {
      ...newEntryData,
      id: `plan-${Date.now()}`
    };

    if (notificationSettings.studyPlanReminder.enabled) {
      try {
        const [day, time] = [fullEntry.day, fullEntry.timeRange.split(' - ')[0]];
        const dayIndex = weekDaysForLookup.indexOf(day);
        const [hour, minute] = time.split(':').map(Number);
        
        const now = new Date();
        const notificationDate = new Date();
        const daysUntilTarget = (dayIndex - now.getDay() + 7) % 7;
        notificationDate.setDate(now.getDate() + daysUntilTarget);
        notificationDate.setHours(hour, minute, 0, 0);

        if (notificationDate.getTime() > now.getTime()) {
          const notificationId = Math.floor(Math.random() * 10000);
          fullEntry.notificationId = notificationId;
          
          await LocalNotifications.schedule({
            notifications: [{
              title: "Çalışma Zamanı!",
              body: `${getSubjectName(fullEntry.subjectId)} için belirlediğin ${fullEntry.studyType} zamanı geldi.`,
              id: notificationId,
              schedule: { at: notificationDate },
            }]
          });
        }
      } catch (e) { 
        console.error("Bildirim hatası:", e); 
        toast.error("Hatırlatıcı kurulamadı."); 
      }
    }

    setCustomPlan(prevPlan => {
      const updatedPlan = { ...prevPlan };
      if (!updatedPlan[fullEntry.day]) { 
          updatedPlan[fullEntry.day] = []; 
      }
      updatedPlan[fullEntry.day].push(fullEntry);
      return updatedPlan;
    });
    toast.success("Çalışma planına yeni etkinlik eklendi.");
  };
  
  const handleRemovePlanEntry = async (planId: string) => {
    let notificationIdToCancel: number | undefined;
    setCustomPlan(prevPlan => {
      if (!prevPlan) return null;
      const updatedPlan = { ...prevPlan };
      for (const day in updatedPlan) {
        const entryToRemove = updatedPlan[day].find(entry => entry.id === planId);
        if(entryToRemove) { notificationIdToCancel = entryToRemove.notificationId; }
        updatedPlan[day] = updatedPlan[day].filter(entry => entry.id !== planId);
        if (updatedPlan[day].length === 0) { delete updatedPlan[day]; }
      }
      return updatedPlan;
    });

    if (notificationIdToCancel) {
      await LocalNotifications.cancel({ notifications: [{ id: notificationIdToCancel }] });
    }
    toast.info("Programdan silindi ve hatırlatıcı iptal edildi.");
  };

  const handleUpdateNotificationSettings = (settings: NotificationSettings) => {
      setNotificationSettings(settings);
      toast.success("Bildirim ayarları kaydedildi.");
  };

  return {
    notificationSettings,
    manualSchedule,
    customPlan,
    tomorrowSubjects,
    isEvening,
    handleUpdateNotificationSettings,
    handleUpdateManualSchedule,
    handleAddPlanEntry,
    handleRemovePlanEntry,
  };
};