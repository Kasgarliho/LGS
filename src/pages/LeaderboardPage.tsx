import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"; // YENİ
import { Crown, Medal, Award, CheckCircle, PlusCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAppContext } from './AppLayout';
import { startOfWeek, endOfWeek, format, addDays, isSameWeek } from 'date-fns';
import { tr } from 'date-fns/locale';
import ChallengeHistory from '@/components/ChallengeHistory'; // YENİ

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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const userId = context?.userId;

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setLoading(true);
      setError(null);
      const { data, error: rpcError } = await supabase.rpc('get_weekly_leaderboard_for_date', { p_date_in_week: selectedDate.toISOString() });
      if (rpcError) {
        console.error("Liderlik tablosu çekilirken hata:", rpcError);
        setError("Liderlik tablosu verileri yüklenemedi.");
      } else if (data) {
        setLeaderboard(data);
      }
      setLoading(false);
    };
    fetchLeaderboard();
  }, [selectedDate]);

  const changeWeek = (offset: number) => {
    setSelectedDate(prevDate => addDays(prevDate, offset * 7));
  };

  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(selectedDate, { weekStartsOn: 1 });
  const isCurrentWeek = isSameWeek(new Date(), selectedDate, { weekStartsOn: 1 });
  const weekRange = `${format(weekStart, 'dd MMMM', { locale: tr })} - ${format(weekEnd, 'dd MMMM yyyy', { locale: tr })}`;

  return (
    <div className="space-y-6 animate-slide-up">
      <Tabs defaultValue="leaderboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="leaderboard">Liderlik Tablosu</TabsTrigger>
          <TabsTrigger value="history">Düello Geçmişi</TabsTrigger>
        </TabsList>
        <TabsContent value="leaderboard" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Haftanın Liderleri</CardTitle>
              <CardDescription>"Günlük Görev" doğru sayılarına göre haftalık sıralama.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <Button variant="outline" size="icon" onClick={() => changeWeek(-1)}>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div className="text-center">
                        <p className="font-semibold">{weekRange}</p>
                        {isCurrentWeek && <p className="text-xs text-primary">(Mevcut Hafta)</p>}
                    </div>
                    <Button variant="outline" size="icon" onClick={() => changeWeek(1)} disabled={isCurrentWeek}>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardContent>
          </Card>
          
          {loading && <div className="text-center p-8">Liderlik tablosu yükleniyor...</div>}
          {!loading && error && <div className="text-center p-8 text-destructive">{error}</div>}
          {!loading && !error && (
            leaderboard.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">
                <p>Bu hafta için henüz bir veri bulunmuyor.</p>
              </div>
            ) : (
              <Card>
                <CardContent className="p-0">
                  <div className="space-y-2">
                    {leaderboard.map((entry, index) => (
                      <div key={entry.user_id} className={`flex items-center gap-4 p-4 ${entry.user_id === userId ? 'bg-primary/10' : ''} ${index < 3 ? 'border-l-4' : ''} ${index === 0 ? 'border-yellow-400' : ''} ${index === 1 ? 'border-gray-400' : ''} ${index === 2 ? 'border-yellow-600' : ''}`}>
                        <div className="w-8 flex justify-center items-center">{getRankIcon(index)}</div>
                        <div className="flex-1 space-y-1">
                          <p className={`font-bold ${entry.user_id === userId ? 'text-primary' : ''}`}>{entry.user_name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground"><PlusCircle className="h-3 w-3" /><span>+{entry.weekly_manual_correct} manuel doğru</span></div>
                        </div>
                        <div className="flex items-center gap-2 font-semibold"><CheckCircle className="h-4 w-4 text-green-500" />{entry.weekly_daily_correct} Doğru</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          )}
        </TabsContent>
        <TabsContent value="history" className="mt-4">
          <ChallengeHistory />
        </TabsContent>
      </Tabs>
    </div>
  );
}