import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { dailyWords } from '@/data/dailywords';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useAppContext } from './AppLayout';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { ChallengeDialog } from '@/components/ChallengeDialog';
import { Swords } from 'lucide-react';

export default function WordQuizPage() {
  const { unitId } = useParams<{ unitId: string }>();
  const navigate = useNavigate();
  const location = useLocation(); // YENİ
  const context = useAppContext();

  // YENİ: Meydan okuma ID'sini state'ten al
  const challengeId = location.state?.challengeId;

  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [isFinished, setIsFinished] = useState(false);
  
  const [showChallengeDialog, setShowChallengeDialog] = useState(false);
  const [finalTime, setFinalTime] = useState(0);

  const userId = context?.userId;

  useEffect(() => {
    const numericUnitId = parseInt(unitId || '1');
    const unitWords = dailyWords.filter(w => w.unit === numericUnitId);
    if (unitWords.length < 4) {
      toast.error("Bu ünitede test oluşturmak için yeterli kelime yok.");
      navigate('/practice');
      return;
    }

    const shuffled = [...unitWords].sort(() => 0.5 - Math.random());
    const quizWords = shuffled;

    const generatedQuestions = quizWords.map(correctWord => {
      const otherWordsInUnit = shuffled.filter(w => w.id !== correctWord.id);
      let wrongOptionsPool = otherWordsInUnit;
      if (wrongOptionsPool.length < 3) {
        wrongOptionsPool = [...wrongOptionsPool, ...dailyWords.filter(w => w.unit !== numericUnitId)];
      }
      const wrongOptions = wrongOptionsPool
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map(w => w.meaning);
      const options = [...wrongOptions, correctWord.meaning].sort(() => 0.5 - Math.random());
      
      return {
        word: correctWord.word,
        correctMeaning: correctWord.meaning,
        options,
      };
    });

    setQuestions(generatedQuestions);
    setStartTime(Date.now());
  }, [unitId, navigate]);

  const handleAnswerClick = (option: string) => {
    if (showResult) return;
    setSelectedAnswer(option);
    if (option === questions[currentQuestionIndex].correctMeaning) {
      setCorrectCount(prev => prev + 1);
    }
    setShowResult(true);

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
      } else {
        const endTime = Date.now();
        const timeTaken = Math.round((endTime - startTime) / 1000);
        setFinalTime(timeTaken);

        // YENİ: Eğer bu bir meydan okuma ise, sonucu veritabanına işle
        if (challengeId) {
            supabase.from('challenges').update({
                opponent_score: correctCount + (option === questions[currentQuestionIndex].correctMeaning ? 1 : 0),
                opponent_time_seconds: timeTaken,
                status: 'completed',
                completed_at: new Date().toISOString()
            }).eq('id', challengeId).then(({ error }) => {
                if (error) {
                    toast.error("Meydan okuma sonucu kaydedilemedi.");
                } else {
                    toast.success("Meydan okuma tamamlandı! Sonuç rakibine iletildi.");
                    context.dismissChallenge(challengeId);
                }
            });
        }
        
        setIsFinished(true);
      }
    }, 400);
  };
  
  if (isFinished) {
    const score = correctCount;

    return (
        <>
          <div className="text-center p-4 animate-slide-up">
              <Card className="max-w-md mx-auto">
                  <CardHeader>
                      <CardTitle>Test Tamamlandı!</CardTitle>
                      <CardDescription>Ünite {unitId} kelime testini bitirdin.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <p className="text-2xl font-bold">Skorun: {score * 10}</p>
                      <div className="grid grid-cols-3 text-center">
                        <div>
                          <p className="font-bold text-lg text-green-500">{correctCount}</p>
                          <p className="text-sm text-muted-foreground">Doğru</p>
                        </div>
                        <div>
                          <p className="font-bold text-lg text-red-500">{questions.length - correctCount}</p>
                          <p className="text-sm text-muted-foreground">Yanlış</p>
                        </div>
                        <div>
                          <p className="font-bold text-lg">{finalTime} sn</p>
                          <p className="text-sm text-muted-foreground">Süre</p>
                        </div>
                      </div>
                      {/* Meydan okuma değilse bu butonu göster */}
                      {!challengeId && (
                        <Button onClick={() => setShowChallengeDialog(true)} className="w-full" variant="outline">
                          <Swords className="h-4 w-4 mr-2" />
                          Bir Arkadaşına Meydan Oku
                        </Button>
                      )}
                      <Button onClick={() => navigate('/practice')} className="w-full">Geri Dön</Button>
                  </CardContent>
              </Card>
          </div>
          <ChallengeDialog 
            open={showChallengeDialog}
            onOpenChange={setShowChallengeDialog}
            unitId={parseInt(unitId || '1')}
            score={score}
            time={finalTime}
          />
        </>
    );
  }

  if (questions.length === 0) {
    return <div>Test yükleniyor...</div>;
  }
  
  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="p-4 animate-slide-up">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
            <Progress value={progress} className="h-2 mb-4" />
            <CardTitle className="text-center text-4xl font-bold tracking-wider">{currentQuestion.word}</CardTitle>
            <CardDescription className="text-center">Doğru anlamı seç.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-4 pt-4">
            {currentQuestion.options.map((option: string, index: number) => {
                const isSelected = selectedAnswer === option;
                const isCorrect = currentQuestion.correctMeaning === option;
                
                let buttonVariant: "default" | "secondary" | "destructive" | "success" = "secondary";
                if(showResult) {
                    if(isCorrect) buttonVariant = "success";
                    else if (isSelected && !isCorrect) buttonVariant = "destructive";
                }

                return (
                    <Button
                        key={index}
                        variant={buttonVariant}
                        className="h-24 text-lg text-wrap"
                        onClick={() => handleAnswerClick(option)}
                        disabled={showResult}
                    >
                        {option}
                    </Button>
                )
            })}
        </CardContent>
      </Card>
    </div>
  );
}