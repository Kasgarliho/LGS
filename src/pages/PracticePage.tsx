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
import { Swords, Trophy } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { dailyWords } from "@/data/dailywords";

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

  const getBadgeImage = (wins: number) => {
    if (wins >= 500) return '/assets/badge500.png';
    if (wins >= 250) return '/assets/badge250.png';
    if (wins >= 150) return '/assets/badge150.png';
    if (wins >= 100) return '/assets/badge100.png';
    if (wins >= 75) return '/assets/badge75.png';
    if (wins >= 25) return '/assets/badge25.png';
    return '/assets/default.png';
  };

  const badgeImage = getBadgeImage(challengeWins);

  if (isSolving) {
    return <QuestionSolver questions={dailyQuestions} subjects={subjects} onFinish={handleFinishSolving} onClose={() => setIsSolving(false)} />;
  }

  return (
    <div className="p-4 space-y-6 animate-slide-up">
      <Tabs defaultValue="vocab-world" className="w-full">
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
          
          {/* Ana sarmalayıcı: dikey flex, ortalanmış elemanlar, aralarında boşluk */}
          <div className="flex flex-col items-center justify-center p-6 space-y-4 rounded-lg bg-card">
              
              {/* Başlık ve açıklama */}
              <div className="text-center">
                  <h2 className="text-2xl font-bold flex items-center gap-2 justify-center">
                      <Swords size={22} /> Word Challenge
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                      Bilgini sına, arkadaşlarına meydan oku ve rozetleri kazan!
                  </p>
              </div>
              
              {/* Rozet ve galibiyet sayısı */}
              <div className="flex flex-col items-center">
                  <img src={badgeImage} alt="Düello Rozeti" className="w-24 h-24 drop-shadow-lg" />
                  <div className="text-center font-semibold text-sm mt-2 flex items-center justify-center gap-1">
                      <Trophy className="h-4 w-4 text-yellow-500" />
                      <span>{challengeWins} Galibiyet</span>
                  </div>
              </div>
          </div>

          <Card>
              <CardHeader>
                <CardTitle>Ünite Testleri</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                  {wordUnits.map(unit => (
                      <Button key={unit} onClick={() => navigate(`/word-quiz/${unit}`)}>
                          Ünite {unit} Testi
                      </Button>
                  ))}
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