import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Target, CheckCircle, Book } from "lucide-react";
import { Subject } from "@/types";
import { cn } from "@/lib/utils"; // cn utility'sini import ediyoruz

interface DailyQuestionsProps {
  dailyQuestionsCount: number;
  availableSubjects: Subject[];
  onSelectSubject: (subjectId: string) => void;
  solvedCount: number;
}

export default function DailyQuestions({ dailyQuestionsCount, availableSubjects, onSelectSubject, solvedCount }: DailyQuestionsProps) {
  const totalSubjects = 3;

  const getSubjectColor = (subjectId: string) => {
    const subjectColors: Record<string, string> = {
      math: 'bg-primary/20 text-primary',
      science: 'bg-success/20 text-success',
      turkish: 'bg-warning/20 text-warning',
      english: 'bg-primary/20 text-primary',
      revolution: 'bg-success/20 text-success',
      religion: 'bg-warning/20 text-warning',
    };
    return subjectColors[subjectId] || 'bg-secondary/50 text-secondary-foreground';
  };

  return (
    <Card className={cn(
      "bg-card backdrop-blur-sm border border-border", // GLASS EFEKTİ EKLENDİ
      "animate-slide-up"
    )}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              <div className="bg-gradient-to-br from-primary/80 to-purple-500/80 p-2 rounded-lg">
                <Target className="h-5 w-5 text-primary-foreground" />
              </div>
              Günlük Görev
            </CardTitle>
            <CardDescription className="mt-2">
              Bugün için toplam {dailyQuestionsCount} soru seni bekliyor.
            </CardDescription>
            <div className="mt-1 text-sm text-muted-foreground">Serini devam ettirmek için en az {totalSubjects} ders seç.</div>
            <div className="font-bold text-lg mt-2">{solvedCount}/{totalSubjects} ders tamamlandı.</div>
          </div>
          <Badge variant="outline" className="bg-gradient-to-r from-emerald-500/80 to-green-600/80 text-success-foreground border-0 animate-pulse">
            <CheckCircle className="h-3 w-3 mr-1" />
            {solvedCount * 6} / {dailyQuestionsCount} Soru
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {availableSubjects.length > 0 ? (
          <div className="grid grid-cols-2 gap-3">
            {availableSubjects.map(subject => (
              <Card 
                key={subject.id} 
                className={cn(
                  "bg-muted/30 hover:bg-muted/50", // Arka planı biraz daha belirgin yaptık
                  "transition-all duration-300 cursor-pointer",
                  "border border-border hover:border-primary/50",
                  "flex flex-col justify-between"
                )}
                onClick={() => onSelectSubject(subject.id)}
              >
                <CardContent className="p-4 flex flex-col items-center text-center flex-1">
                  <div className={`p-3 mb-3 rounded-lg ${getSubjectColor(subject.id)}`}>
                    <Book className="h-6 w-6" />
                  </div>
                  <div className="flex flex-col flex-1 justify-center">
                    <h4 className="font-semibold leading-tight">{subject.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">6 soru</p>
                  </div>
                  <Play className="h-5 w-5 text-muted-foreground mt-3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="p-4 rounded-lg bg-success/10 text-success text-center">
            <CheckCircle className="h-8 w-8 mx-auto mb-2" />
            <p className="font-bold">Bugünkü görev tamamlandı!</p>
            <p className="text-sm">Yarın yeni sorularla görüşmek üzere.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}