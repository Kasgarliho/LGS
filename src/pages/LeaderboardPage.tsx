import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Crown, Medal, Award, CheckCircle, PlusCircle, Info } from 'lucide-react';
import { useAppContext } from './AppLayout';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { startOfWeek, endOfWeek, format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface LeaderboardEntry {
  user_id: string;
  user_name: string;
  weekly_daily_correct: number;
  weekly_manual_correct: number;
}

const getRankIcon = (rank: number) => {
  if (rank === 0) return <Crown className="h-6 w-6 text-yellow-400" />;
  if (rank === 1) return <Medal className="h-6 w-6 text-gray-400" />;
  if (rank === 2) return <Award className="h-6 w-6 text-yellow-600" />;
  return <span className="font-bold text-lg w-6 text-center">{rank + 1}</span>;
};

export default function LeaderboardPage() {
  const context = useAppContext();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const userId = context?.userId;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      
      const { data, error: rpcError } = await supabase.rpc('get_weekly_leaderboard');

      if (rpcError) {
        console.error("Liderlik tablosu çekilirken hata:", rpcError);
        setError("Liderlik tablosu verileri yüklenemedi.");
      } else if (data) {
        setLeaderboard(data);
      }
      setLoading(false);
    };

    fetchLeaderboard();
  }, []);

  const now = new Date();
  const weekStart = startOfWeek(now, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
  const weekRange = `${format(weekStart, 'dd MMMM yyyy, HH:mm', { locale: tr })} - ${format(weekEnd, 'dd MMMM yyyy, HH:mm', { locale: tr })}`;

  if (loading) {
    return <div className="text-center p-8">Liderlik tablosu yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-destructive">{error}</div>;
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <Card className="shadow-lg bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <CardHeader>
          <div className="flex items-center gap-2">
            <CardTitle>Haftanın Liderleri</CardTitle>
            <HoverCard>
              <HoverCardTrigger>
                <Info className="h-4 w-4 text-white/80 cursor-pointer" />
              </HoverCardTrigger>
              <HoverCardContent>
                <p className="text-sm">
                  Bu sıralama, aşağıda belirtilen zaman aralığındaki "Günlük Görev" doğru sayılarına dayanmaktadır:
                  <br />
                  <strong className="mt-2 block">{weekRange}</strong>
                </p>
              </HoverCardContent>
            </HoverCard>
          </div>
          <CardDescription className="text-white/90">Son 7 günde en çok doğru yapan öğrenciler.</CardDescription>
        </CardHeader>
      </Card>

      {leaderboard.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          <p>Bu hafta henüz kimse günlük görev çözmedi.</p>
          <p className="text-sm">İlk doğruyu yaparak listeye adını yazdır!</p>
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="space-y-2">
              {leaderboard.map((entry, index) => (
                <div 
                  key={entry.user_id} 
                  className={`flex items-center gap-4 p-4 ${entry.user_id === userId ? 'bg-primary/10' : ''} ${index < 3 ? 'border-l-4' : ''} ${index === 0 ? 'border-yellow-400' : ''} ${index === 1 ? 'border-gray-400' : ''} ${index === 2 ? 'border-yellow-600' : ''}`}
                >
                  <div className="w-8 flex justify-center items-center">
                    {getRankIcon(index)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className={`font-bold ${entry.user_id === userId ? 'text-primary' : ''}`}>{entry.user_name}</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <PlusCircle className="h-3 w-3" />
                      <span>+{entry.weekly_manual_correct} manuel doğru</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-semibold">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    {entry.weekly_daily_correct} Doğru
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}