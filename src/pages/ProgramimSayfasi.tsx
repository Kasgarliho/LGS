import { useState, useMemo, useEffect } from "react";
import { useAppContext } from "./AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Pencil, Save, X, BookOpen, Clock } from "lucide-react";
import { AddStudyPlanDialog } from "@/components/AddStudyPlanDialog";
import { StudyPlanEntry, ManualSchedule } from "@/types";
import { emptySchedule } from '@/data/schedule';
import { subjects as allSubjectsData } from '@/data/subjects';

const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];
const allWeekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"];

export default function ProgramimSayfasi() {
  const { 
    manualSchedule, 
    customPlan, 
    handleUpdateManualSchedule, 
    handleAddPlanEntry, 
    handleRemovePlanEntry,
  } = useAppContext();

  const getSubjectName = (subjectId: string) => {
    const subject = allSubjectsData.find(s => s.id === subjectId);
    return subject ? subject.name : 'Bilinmeyen Ders';
  };

  const todayIndex = new Date().getDay();
  const todayKey = weekDays[todayIndex - 1] || weekDays[0];

  const [selectedDay, setSelectedDay] = useState(todayKey);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [isEditingManual, setIsEditingManual] = useState(false);

  const [localSchedule, setLocalSchedule] = useState<ManualSchedule>(manualSchedule || emptySchedule);

  useEffect(() => {
    if (!isEditingManual && manualSchedule) {
      setLocalSchedule(manualSchedule);
    }
  }, [manualSchedule, isEditingManual]);

  const handleManualEditChange = (day: string, index: number, field: 'subject' | 'teacher', value: string) => {
    setLocalSchedule(prev => {
      const newSchedule = JSON.parse(JSON.stringify(prev));
      if (newSchedule[day] && newSchedule[day][index]) {
        newSchedule[day][index][field] = value.toUpperCase();
      }
      return newSchedule;
    });
  };

  const handleSaveManualSchedule = () => {
    handleUpdateManualSchedule(localSchedule);
    setIsEditingManual(false);
  };

  const handleCancelEdit = () => {
    setLocalSchedule(manualSchedule || emptySchedule);
    setIsEditingManual(false);
  };

  const handleEditClick = () => {
    setLocalSchedule(manualSchedule || emptySchedule);
    setIsEditingManual(true);
  };

  const lessonsForSelectedDay = useMemo(() => {
    const schedule = localSchedule || emptySchedule;
    return schedule[selectedDay] || [];
  }, [localSchedule, selectedDay]);

  const sortedPlanDays = useMemo(() => {
    if (!customPlan) return [];
    return allWeekDays.filter(day => customPlan[day] && customPlan[day].length > 0);
  }, [customPlan]);

  const handleSaveNewPlan = (newPlanData: Omit<StudyPlanEntry, 'id' | 'notificationId'>) => {
    handleAddPlanEntry(newPlanData);
    setIsPlanDialogOpen(false);
  };

  return (
    <div className="space-y-6 animate-slide-up relative pb-20">
      <Tabs defaultValue="ders-programi">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ders-programi">Ders Programım</TabsTrigger>
          <TabsTrigger value="calisma-plani">Çalışma Planım</TabsTrigger>
        </TabsList>

        {/* DERS PROGRAMIM SEKMESİ */}
        <TabsContent value="ders-programi">
          <Card className="shadow-card bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Haftalık Ders Programı</CardTitle>
                    <CardDescription>Okul ders programını buradan yönetebilirsin.</CardDescription>
                </div>
                {isEditingManual ? (
                  <div className="flex gap-2">
                    <Button variant="secondary" size="sm" onClick={handleCancelEdit}><X className="h-4 w-4 mr-2"/>İptal</Button>
                    <Button size="sm" onClick={handleSaveManualSchedule}><Save className="h-4 w-4 mr-2"/>Kaydet</Button>
                  </div>
                ) : (
                  <Button variant="outline" size="sm" onClick={handleEditClick}><Pencil className="h-4 w-4 mr-2"/>Düzenle</Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
                <div className="bg-muted/30 rounded-md p-1 mb-4">
                    <div className="flex gap-1 justify-between overflow-x-auto">
                        {weekDays.map(day => (
                        <Button 
                            key={day} 
                            variant={selectedDay === day ? "default" : "ghost"}
                            size="sm"
                            onClick={() => setSelectedDay(day)}
                            className="flex-1"
                        >
                            {day}
                        </Button>
                        ))}
                    </div>
                </div>
              <div className="space-y-1">
                {lessonsForSelectedDay.length > 0 ? (
                  lessonsForSelectedDay.map((lesson, lessonIndex) => (
                    // === DEĞİŞİKLİK BURADA BAŞLIYOR ===
                    <div key={lessonIndex} className="grid grid-cols-[auto_1fr_1fr] gap-3 items-center bg-muted/30 p-2 rounded-md">
                      <span className="font-mono font-bold text-muted-foreground text-center w-6">{lessonIndex + 1}</span>
                      {isEditingManual ? (
                        <>
                          <Input
                            value={lesson.subject}
                            onChange={(e) => handleManualEditChange(selectedDay, lessonIndex, 'subject', e.target.value)}
                            placeholder="DERS KODU"
                            className="uppercase h-9"
                          />
                          <Input
                            value={lesson.teacher}
                            onChange={(e) => handleManualEditChange(selectedDay, lessonIndex, 'teacher', e.target.value)}
                            placeholder="ÖĞRETMEN"
                            className="uppercase h-9"
                          />
                        </>
                      ) : (
                        <>
                          <p className="font-semibold px-2">{lesson.subject || "Boş Ders"}</p>
                          <p className="text-sm text-muted-foreground px-2">{lesson.teacher || "-"}</p>
                        </>
                      )}
                    </div>
                     // === DEĞİŞİKLİK BURADA BİTİYOR ===
                  ))
                ) : (
                  <p className="text-center text-muted-foreground py-4">Seçili gün için ders programı boş.</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ÇALIŞMA PLANIM SEKMESİ */}
        <TabsContent value="calisma-plani">
          <Card className="shadow-card bg-card/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Kişisel Çalışma Planı</CardTitle>
              <CardDescription>Kendi çalışma rutinini oluştur ve takip et.</CardDescription>
            </CardHeader>
            <CardContent>
              {sortedPlanDays.length > 0 ? (
                sortedPlanDays.map(day => (
                  <div key={day} className="mb-6">
                    <h3 className="font-bold mb-3 border-b pb-2 text-lg">{day}</h3>
                    <div className="space-y-3">
                      {(customPlan?.[day] || []).sort((a,b) => a.timeRange.localeCompare(b.timeRange)).map(entry => (
                        <div key={entry.id} className="flex items-center justify-between border-l-4 border-primary bg-muted/40 p-3 rounded-r-md hover:bg-muted/60 transition-colors">
                           <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center justify-center p-2">
                                <Clock className="h-5 w-5 text-primary mb-1"/>
                                <p className="text-xs font-mono text-muted-foreground">{entry.timeRange.split(' - ')[0]}</p>
                            </div>
                            <div>
                                <p className="font-semibold flex items-center gap-2">
                                    <BookOpen className="h-4 w-4 text-muted-foreground"/>
                                    {getSubjectName(entry.subjectId)}
                                </p>
                                <p className="text-sm text-muted-foreground">{entry.studyType}</p>
                            </div>
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10" onClick={() => handleRemovePlanEntry(entry.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-muted-foreground py-10">
                  <p>Henüz kişisel çalışma planı oluşturmadın.</p>
                  <p className="text-sm">Yeni etkinlik eklemek için (+) butonuna tıkla.</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Button
            onClick={() => setIsPlanDialogOpen(true)}
            className="fixed bottom-24 right-4 h-14 w-14 rounded-full shadow-lg z-10 animate-pulse-glow"
            variant="hero"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </TabsContent>
      </Tabs>

      <AddStudyPlanDialog
        open={isPlanDialogOpen}
        onOpenChange={setIsPlanDialogOpen}
        onSave={handleSaveNewPlan}
      />
    </div>
  );
}