// src/hooks/useScheduler.ts

import { useEffect, useMemo, useState } from 'react';
import { storage, NotificationSettings } from '@/utils/storage';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { ManualSchedule, CustomStudyPlan, StudyPlanEntry } from '@/types';
import { LocalNotifications } from '@capacitor/local-notifications';
import { subjects as allSubjectsData } from '@/data/subjects';

const weekDaysForLookup = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"];
const CHALLENGE_NOTIFICATION_ID = 999;

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

  // GÜNCELLENDİ: Hata alsa bile duracak şekilde updateUserCloudData
  const updateUserCloudData = async (dataToUpdate: object) => {
    if (!userId || !isInitialized) return;
    const { error } = await supabase.from('kullanicilar').update(dataToUpdate).eq('id', userId);
    if (error) console.error("Bulut planlama verisi güncellenirken hata oluştu:", error);
  };
  
  useEffect(() => {
    setNotificationSettings(storage.loadNotificationSettings());
    setManualSchedule(storage.loadManualSchedule());

    if(userId) {
       // Cloud'dan customPlan çekme
       supabase
        .from('kullanicilar')
        .select('calisma_programi')
        .eq('id', userId)
        .maybeSingle()
        .then(({ data }) => {
          if(data && data.calisma_programi) {
            setCustomPlan(data.calisma_programi);
            storage.saveCustomStudyPlan(userId, data.calisma_programi); // Lokal yedeği de güncelle
          } else {
             // Cloud'da yoksa lokalden çek (bu genelde ilk girişte olur)
             setCustomPlan(storage.loadCustomStudyPlan(userId));
          }
        });
    } else {
        setCustomPlan(null);
    }
  }, [userId]);

  // GÜNCELLEME: customPlan değiştiğinde sadece kaydetme
  useEffect(() => { 
    if (isInitialized && userId) { 
        storage.saveCustomStudyPlan(userId, customPlan); 
        // Plan değiştiğinde buluta kaydet
        if (customPlan !== null) {
            updateUserCloudData({ calisma_programi: customPlan }); 
        }
    } 
  }, [customPlan, isInitialized, userId]);


  useEffect(() => {
    const scheduleChallengeNotification = async () => {
      await LocalNotifications.cancel({ notifications: [{ id: CHALLENGE_NOTIFICATION_ID }] });

      if (notificationSettings.challengeReminder) {
        const scheduleDate = new Date();
        scheduleDate.setDate(scheduleDate.getDate() + 3);
        scheduleDate.setHours(18, 0, 0, 0);

        await LocalNotifications.schedule({
          notifications: [{
            id: CHALLENGE_NOTIFICATION_ID,
            title: "LGS Asistanı Seni Bekliyor! 💪",
            body: "Var mısın bir meydan okumaya? Yeni kelimeler ve sorular seni bekliyor!",
            schedule: { at: scheduleDate },
          }]
        });
      }
    };

    if (isInitialized && userId) {
      scheduleChallengeNotification();
    }
  }, [isInitialized, userId, notificationSettings.challengeReminder]);


  useEffect(() => { if (isInitialized) storage.saveNotificationSettings(notificationSettings); }, [notificationSettings, isInitialized]);
  useEffect(() => { if (isInitialized && manualSchedule) storage.saveManualSchedule(manualSchedule); }, [manualSchedule, isInitialized]);

  const handleUpdateNotificationSettings = (settings: NotificationSettings) => setNotificationSettings(settings);
  
  const handleUpdateManualSchedule = (schedule: ManualSchedule) => setManualSchedule(schedule);
  
  const getSubjectName = (subjectId: string) => allSubjectsData.find(s => s.id === subjectId)?.name || subjectId;

  const handleAddPlanEntry = async (newPlanData: Omit<StudyPlanEntry, 'id' | 'notificationId'>) => {
    const notificationId = Date.now();
    const newEntry: StudyPlanEntry = { ...newPlanData, id: notificationId.toString(), notificationId };
    
    if (notificationSettings.studyPlanReminder.enabled) {
      try {
        const weekDaysMap: { [key: string]: number } = { "Pazartesi": 1, "Salı": 2, "Çarşamba": 3, "Perşembe": 4, "Cuma": 5, "Cumartesi": 6, "Pazar": 0 };
        const today = new Date();
        const currentDayIndex = today.getDay();
        const targetDayIndex = weekDaysMap[newEntry.day];
        
        let dayDifference = targetDayIndex - currentDayIndex;
        if (dayDifference < 0) { dayDifference += 7; }
        
        const [hour, minute] = newEntry.timeRange.split(' - ')[0].split(':').map(Number);
        const scheduleDate = new Date();
        scheduleDate.setDate(today.getDate() + dayDifference);
        scheduleDate.setHours(hour, minute, 0, 0);

        if (dayDifference === 0 && scheduleDate.getTime() < today.getTime()) {
            scheduleDate.setDate(scheduleDate.getDate() + 7);
        }

        const reminderTime = notificationSettings.studyPlanReminder.minutesBefore * 60000;
        const reminderDate = new Date(scheduleDate.getTime() - reminderTime);

        if (reminderDate.getTime() > new Date().getTime()) {
          await LocalNotifications.schedule({
            notifications: [{
              id: notificationId,
              title: "🔔 Çalışma Zamanı!",
              body: `${getSubjectName(newEntry.subjectId)} etkinliğin ${notificationSettings.studyPlanReminder.minutesBefore} dakika sonra başlıyor.`,
              schedule: { at: reminderDate },
            }]
          });
          toast.success("Hatırlatıcı başarıyla kuruldu!");
        } else {
          toast.warning("Hatırlatıcı geçmiş bir zaman için kurulamaz.");
        }
      } catch (e) { 
        console.error("Bildirim hatası:", e); 
        toast.error("Hatırlatıcı kurulamadı."); 
      }
    }
    setCustomPlan(prevPlan => {
      const updatedPlan = { ...prevPlan };
      if (!updatedPlan[newEntry.day]) { updatedPlan[newEntry.day] = []; }
      updatedPlan[newEntry.day].push(newEntry);
      return updatedPlan;
    });
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

  return {
    notificationSettings,
    manualSchedule,
    customPlan,
    tomorrowSubjects,
    isEvening,
    handleUpdateNotificationSettings,
    handleUpdateManualSchedule,
    handleAddPlanEntry,
    handleRemovePlanEntry
  };
};