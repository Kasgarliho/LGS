import { useState, useMemo } from "react";
import { useAppContext } from "./AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Pencil } from "lucide-react";
import { AddStudyPlanDialog } from "@/components/AddStudyPlanDialog";
import { cn } from "@/lib/utils";
import { StudyPlanEntry, StudyType } from "@/types";
import { toast } from "sonner";
import { emptySchedule } from '@/data/schedule';

const weekDays = ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma"];

export default function ProgramimSayfasi() {
  const { 
    manualSchedule, 
    customPlan, 
    handleUpdateManualSchedule, 
    handleAddPlanEntry, 
    handleRemovePlanEntry,
    subjects // 'subjects' context'ten alınıyor
  } = useAppContext();

  const todayIndex = new Date().getDay();
  const todayKey = weekDays[todayIndex - 1] || weekDays[0];

  const [selectedDay, setSelectedDay] = useState(todayKey);
  const [isPlanDialogOpen, setIsPlanDialogOpen] = useState(false);
  const [isEditingManual, setIsEditingManual] = useState(false);

  const lessonsForSelectedDay = useMemo(() => {
    const schedule = manualSchedule || emptySchedule;
    return schedule[selectedDay] || [];
  }, [manualSchedule, selectedDay]);

  const getSubjectName = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId)?.name || subjectId;
  };

  const handleSaveNewPlan = (newPlanData: {
    day: string;
    timeRange: string;
    subjectId: string;
    studyType: StudyType;
    details?: string;
  }) => {
    handleAddPlanEntry(newPlanData);
    toast.success("Çalışma planına yeni etkinlik eklendi!");
  };

  const handleChangeManual = (
    hourIndex: number,
    field: "subject" | "teacher",
    value: string
  ) => {
    if (!manualSchedule) return;
    const updatedSchedule = JSON.parse(JSON.stringify(manualSchedule));
    if (!updatedSchedule[selectedDay]) {
      updatedSchedule[selectedDay] = Array(8).fill({ subject: "", teacher: "" });
    }
    updatedSchedule[selectedDay][hourIndex][field] = value;
    handleUpdateManualSchedule(updatedSchedule);
  };

  const toggleEditManual = () => {
    if (isEditingManual) {
      toast.success("Değişiklikler kaydedildi!");
    }
    setIsEditingManual(!isEditingManual);
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <Tabs defaultValue="ders-programim" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ders-programim">Ders Programım</TabsTrigger>
          <TabsTrigger value="calisma-planim">Çalışma Planım</TabsTrigger>
        </TabsList>

        {/* DERS PROGRAMIM SEKMESİ */}
        <TabsContent value="ders-programim" className="mt-4">
          <div className="space-y-4">
             <Card>
                <CardContent className="p-2">
                    <div className="grid grid-cols-5 gap-2">
                        {weekDays.map(day => (
                            <Button
                            key={day}
                            onClick={() => setSelectedDay(day)}
                            variant={selectedDay === day ? "default" : "ghost"}
                            className="flex-1"
                            >
                            {day.slice(0, 3)}
                            </Button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>{selectedDay} Günü Programı</CardTitle>
                        <Button onClick={toggleEditManual} variant="outline" size="sm" className="gap-2">
                            <Pencil className="h-4 w-4" />
                            {isEditingManual ? "Kaydet" : "Düzenle"}
                        </Button>
                    </div>
                </CardHeader>
                <CardContent className="space-y-2">
                    {lessonsForSelectedDay.length > 0 ? (
                        lessonsForSelectedDay.map((lesson, index) => (
                        <div key={index} 
                            className={cn(
                                "p-3 rounded-lg flex items-center justify-between",
                                index % 2 === 0 ? "bg-muted/50" : "bg-card"
                            )}
                        >
                            {isEditingManual ? (
                                <div className="flex w-full items-center gap-2">
                                <span className="text-sm font-bold w-16">{index + 1}. Ders</span>
                                <Input
                                    value={lesson.subject}
                                    onChange={(e) => handleChangeManual(index, "subject", e.target.value)}
                                    placeholder="Ders"
                                    className="flex-1 h-8"
                                />
                                <Input
                                    value={lesson.teacher}
                                    onChange={(e) => handleChangeManual(index, "teacher", e.target.value)}
                                    placeholder="Öğretmen"
                                    className="flex-1 h-8 text-xs"
                                />
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-bold text-muted-foreground w-6 text-center">{index + 1}</span>
                                        <div>
                                            <p className="font-semibold">{lesson.subject || "Boş Ders"}</p>
                                        </div>
                                    </div>
                                    <p className="text-sm text-muted-foreground">{lesson.teacher}</p>
                                </>
                            )}
                        </div>
                        ))
                    ) : (
                        <div className="text-center text-muted-foreground py-10">
                        <p>Seçili gün için ders programı bulunmuyor.</p>
                        </div>
                    )}
                </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* ÇALIŞMA PLANIM SEKMESİ */}
        <TabsContent value="calisma-planim" className="mt-4 relative min-h-[60vh]">
           <Card>
            <CardHeader>
              <CardTitle>Kişisel Çalışma Planın</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {customPlan && Object.values(customPlan).flat().length > 0 ? (
                Object.entries(customPlan).map(([day, entries]) => (
                  entries.length > 0 && <div key={day}>
                    <h3 className="font-bold mb-2 border-b pb-1">{day}</h3>
                    <div className="space-y-2">
                      {(entries as StudyPlanEntry[]).map(entry => (
                        <div key={entry.id} className="flex items-center justify-between bg-muted/50 p-3 rounded-lg">
                          <div>
                            <p className="font-semibold">{getSubjectName(entry.subjectId)} - {entry.studyType}</p>
                            <p className="text-sm text-muted-foreground">{entry.timeRange}</p>
                          </div>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleRemovePlanEntry(entry.id)}>
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
            className="absolute bottom-4 right-4 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg"
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