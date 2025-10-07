import { useState, useMemo } from "react";
import { Question } from "@/types";
import { questions as allQuestions } from "@/data/questions";
import { useAppContext } from "./AppLayout";
import QuestionSolver, { SolvedStat } from "@/components/QuestionSolver";
import DailyQuestions from "@/components/DailyQuestions";
import MotivationalQuote from "@/components/MotivationalQuote";
import WordSwiper from "@/components/WordSwiper";
import { Stopwatch } from "@/components/Stopwatch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Swords, Trophy, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dailyWords } from "@/data/dailywords";
import { cn } from "@/lib/utils";

// GÜNCELLEME: Rozet listesi, senin dosya yapına ve seviyelerine göre düzenlendi.
const badges = [
  { wins: 0, image: '/assets/default.png', name: 'Başlangıç Ligi' },
  { wins: 25, image: '/assets/badge25.png', name: 'Bronz Lig' },
  { wins: 75, image: '/assets/badge75.png', name: 'Gümüş Lig' },
  { wins: 100, image: '/assets/badge100.png', name: 'Altın Lig' },
  { wins: 150, image: '/assets/badge150.png', name: 'Kristal Lig' },
  { wins: 250, image: '/assets/badge250.png', name: 'Usta Ligi' },
  { wins: 500, image: '/assets/badge500.png', name: 'Şampiyonlar Ligi' },
];

export default function PracticePage() {
  const [dailyQuestions, setDailyQuestions] = useState<Question[]>([]);
  const [isSolving, setIsSolving] = useState(false);
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const navigate = useNavigate();
  const { handleQuizCompletion, subjects, dailySolvedSubjects, challengeWins } = useAppContext();

  const handleSelectSubject = (subjectId: string) => {
    const questionsForSubject = allQuestions.filter(q => q.subjectId === subjectId);
    const shuffledQuestions = [...questionsForSubject].sort(() => 0.5 - Math.random()).slice(0, 6);
    setDailyQuestions(shuffledQuestions);
    setSelectedSubjectId(subjectId);
    setIsSolving(true);
  };
  
  const handleFinishSolving = (correctlySolved: SolvedStat[]) => {
    setIsSolving(false);
    if (selectedSubjectId) {
      handleQuizCompletion(correctlySolved, selectedSubjectId);
    }
    setSelectedSubjectId(null);
  };
  
  const availableSubjects = subjects.filter(s => 
    (s.id === 'turkish' || s.id === 'math' || s.id === 'science' || s.id === 'religion' || s.id === 'english' || s.id === 'revolution') &&
    !dailySolvedSubjects.includes(s.id)
  );

  const wordUnits = useMemo(() => {
    return [...new Set(dailyWords.map(w => w.unit))].sort((a,b) => a-b);
  }, []);

  const getCurrentBadge = (wins: number) => {
    let currentBadge = badges[0];
    for (const badge of badges) {
      if (wins >= badge.wins) {
        currentBadge = badge;
      } else {
        break;
      }
    }
    return currentBadge;
  };

  const currentBadge = getCurrentBadge(challengeWins);

  if (isSolving) {
    return <QuestionSolver questions={dailyQuestions} subjects={subjects} onFinish={handleFinishSolving} onClose={() => setIsSolving(false)} />;
  }

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <Tabs defaultValue="gunluk-gorev" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-primary text-primary-foreground shadow-md">
          <TabsTrigger value="gunluk-gorev">Günlük Görev</TabsTrigger>
          <TabsTrigger value="vocab-world">Vocab World</TabsTrigger>
          <TabsTrigger value="araclar">Araçlar</TabsTrigger>
        </TabsList>

        <div className="mt-4">
          <MotivationalQuote />
        </div>

        <TabsContent value="gunluk-gorev" className="mt-4 space-y-6">
          <DailyQuestions 
            dailyQuestionsCount={36}
            availableSubjects={availableSubjects} 
            onSelectSubject={handleSelectSubject}
            solvedCount={dailySolvedSubjects.length}
          />
        </TabsContent>

        <TabsContent value="vocab-world" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Swords /> Word Challenge
              </CardTitle>
              <CardDescription>Bilgini sına, arkadaşlarına meydan oku ve rozetleri kazan!</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-center p-4 pt-0">
                <div className="flex flex-col items-center gap-2 mb-4">
                    <img src={currentBadge.image} alt={currentBadge.name} className="w-24 h-24 drop-shadow-lg animate-bounce-in" />
                    <div className="text-center">
                        <p className="font-bold">{currentBadge.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Trophy className="h-4 w-4 text-yellow-500" />
                            <span>{challengeWins} Galibiyet</span>
                        </div>
                    </div>
                </div>
                <div className="w-full bg-muted/30 p-3 rounded-lg">
                    <h4 className="text-sm font-semibold text-center mb-3">Tüm Rozetler</h4>
                    <div className="flex justify-center items-end gap-2">
                        {badges.map(badge => {
                            const isUnlocked = challengeWins >= badge.wins;
                            return (
                                <Tooltip key={badge.name}>
                                    <TooltipTrigger>
                                        <img 
                                            src={badge.image} 
                                            alt={badge.name} 
                                            className={cn("w-10 h-10 transition-all", !isUnlocked && "grayscale opacity-40")}
                                        />
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        {isUnlocked ? (
                                            <p>{badge.name} (Kazanıldı)</p>
                                        ) : (
                                            <p className="flex items-center gap-1">
                                                <Lock className="h-3 w-3"/>
                                                {badge.wins} galibiyet gerekli
                                            </p>
                                        )}
                                    </TooltipContent>
                                </Tooltip>
                            )
                        })}
                    </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {wordUnits.map(unit => (
                  <Button key={unit} onClick={() => navigate(`/word-quiz/${unit}`)}>
                    Ünite {unit} Testi
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          <WordSwiper />
        </TabsContent>

        <TabsContent value="araclar" className="mt-4">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Stopwatch />
           </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};