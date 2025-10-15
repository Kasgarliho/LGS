// src/components/SubjectCard.tsx

import { useState } from "react";
import { Subject } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"; 
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, BookOpen } from "lucide-react";
import { toast } from 'sonner';
import { AppLauncher } from '@capacitor/app-launcher';
import { Browser } from '@capacitor/browser';
import { Capacitor } from '@capacitor/core';
import { cn } from "@/lib/utils"; // cn utility'sini import ediyoruz

interface SubjectCardProps {
  subject: Subject;
  onAddQuestions: (subjectId: string, counts: { correct: number, incorrect: number }, topic: string) => void;
}

// Görsel temaya uygun yeni bir gradient fonksiyonu
const getGradientColor = (color: string) => {
  switch (color) {
    case 'primary': return 'from-primary/80 to-purple-500/80';
    case 'success': return 'from-emerald-500/80 to-green-600/80';
    case 'warning': return 'from-amber-500/80 to-orange-600/80';
    default: return 'from-secondary to-muted';
  }
};

export default function SubjectCard({ subject, onAddQuestions }: SubjectCardProps) {
  const [open, setOpen] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [correctCount, setCorrectCount] = useState<string>("");
  const [incorrectCount, setIncorrectCount] = useState<string>("");

  const totalCompleted = subject.correct + subject.incorrect;

  const handleSubmit = () => {
    const correct = parseInt(correctCount) || 0;
    const incorrect = parseInt(incorrectCount) || 0;
    if (selectedTopic && (correct > 0 || incorrect > 0)) {
      onAddQuestions(subject.id, { correct, incorrect }, selectedTopic);
      setOpen(false);
      setSelectedTopic("");
      setCorrectCount("");
      setIncorrectCount("");
    }
  };

  const handleOpenMebiApp = async () => {
    const appUrl = 'mebi://';
    const androidStoreUrl = 'https://play.google.com/store/apps/details?id=tr.gov.eba.mebi';
    const iosStoreUrl = 'https://apps.apple.com/tr/app/id1438258386';
    const platform = Capacitor.getPlatform();

    if (platform === 'web') {
      const storeUrl = /iPad|iPhone|iPod/.test(navigator.userAgent) ? iosStoreUrl : androidStoreUrl;
      toast.info("MEB uygulaması için mağaza sayfası açılıyor...");
      window.open(storeUrl, '_blank');
      return;
    }

    const storeUrl = platform === 'ios' ? iosStoreUrl : androidStoreUrl;
    try {
      const canOpen = await AppLauncher.canOpenUrl({ url: appUrl });
      if (canOpen.value) {
        await AppLauncher.openUrl({ url: appUrl });
        toast.info("MEB uygulaması açılıyor...");
      } else {
        await Browser.open({ url: storeUrl });
        toast.info("MEB uygulaması bulunamadı, mağaza açılıyor...");
      }
    } catch (e) {
      console.error('Uygulama açılırken hata oluştu, mağaza deneniyor:', e);
      await Browser.open({ url: storeUrl });
    }
  };

  return (
    <Card 
      className={cn(
        "bg-card backdrop-blur-sm", // YARI SAYDAM ARKA PLAN VE BLUR EFEKTİ
        "border border-border", // HAFİF KENARLIK
        "transition-all duration-300",
        "hover:border-primary/80 hover:shadow-[0_0_20px_hsl(var(--primary)/0.5)]" // ÜZERİNE GELİNCE NEON PARLAMA
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`bg-gradient-to-br ${getGradientColor(subject.color)} p-3 rounded-xl shadow-lg text-2xl`}>
              {subject.icon}
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-foreground">
                {subject.name}
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                {subject.description}
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className={`h-6 w-full rounded-full flex items-center justify-center bg-gradient-to-r ${getGradientColor(subject.color)}`}>
          <span className="text-white font-bold text-sm drop-shadow-[0_1px_1px_rgba(0,0,0,0.7)]">
            {totalCompleted} Soru Çözüldü
          </span>
        </div>

        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="card" className="flex-1 group/button">
                <Plus className="h-4 w-4 mr-2 group-hover/button:rotate-90 transition-transform duration-300" />
                Soru Ekle
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Soru Ekle - {subject.name}</DialogTitle>
                <DialogDescription>
                    Çözdüğün soru sayılarını gir ve hangi konuyu çalıştığını belirt.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="topic">LGS Konusu</Label>
                  <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                    <SelectTrigger><SelectValue placeholder="LGS konusu seçin..." /></SelectTrigger>
                    <SelectContent>
                      {subject.topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="correct">Doğru Sayısı</Label>
                    <Input id="correct" type="number" min="0" value={correctCount} onChange={(e) => setCorrectCount(e.target.value)} placeholder=" örn: 18" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="incorrect">Yanlış Sayısı</Label>
                    <Input id="incorrect" type="number" min="0" value={incorrectCount} onChange={(e) => setIncorrectCount(e.target.value)} placeholder=" örn: 2" />
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button variant="outline" className="flex-1" onClick={() => setOpen(false)}>İptal</Button>
                  <Button className="flex-1" onClick={handleSubmit} disabled={!selectedTopic || (!correctCount && !incorrectCount)}>Ekle</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
          <Button 
            variant="outline" 
            size="icon" 
            className="hover:bg-primary/20 hover:text-primary hover:border-primary transition-all duration-300"
            onClick={handleOpenMebiApp}
          >
            <BookOpen className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}