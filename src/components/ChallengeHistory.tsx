import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useAppContext } from '@/pages/AppLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Trophy, Shield, User, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';

interface HistoryEntry {
  id: string;
  challenger_name: string;
  opponent_name: string;
  unit_id: number;
  challenger_score: number;
  challenger_time_seconds: number;
  opponent_score: number;
  opponent_time_seconds: number;
  completed_at: string;
  is_winner: boolean;
  is_challenger: boolean;
}

export default function ChallengeHistory() {
  const { userId, userName } = useAppContext();
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    const fetchHistory = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_challenge_history', { p_user_id: userId });
      if (data) {
        setHistory(data);
      }
      setLoading(false);
    };
    fetchHistory();
  }, [userId]);

  if (loading) {
    return <p className="text-center text-muted-foreground py-4">Yükleniyor...</p>;
  }

  if (history.length === 0) {
    return <p className="text-center text-muted-foreground py-10">Henüz tamamlanmış bir düello yok.</p>;
  }

  return (
    <div className="space-y-3">
      {history.map(entry => {
        const myName = userName;
        const otherPlayerName = entry.is_challenger ? entry.opponent_name : entry.challenger_name;
        const myStats = entry.is_challenger ? { score: entry.challenger_score, time: entry.challenger_time_seconds } : { score: entry.opponent_score, time: entry.opponent_time_seconds };
        const otherPlayerStats = entry.is_challenger ? { score: entry.opponent_score, time: entry.opponent_time_seconds } : { score: entry.challenger_score, time: entry.challenger_time_seconds };
        
        return (
          <Card key={entry.id} className={entry.is_winner ? 'bg-green-500/10 border-green-500/20' : 'bg-destructive/10 border-destructive/20'}>
            <CardContent className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    {entry.is_winner ? <Trophy className="h-5 w-5 text-yellow-500" /> : <Shield className="h-5 w-5 text-red-500" />}
                    <h3 className="font-bold text-lg">{entry.is_winner ? "Kazandın!" : "Kaybettin"}</h3>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(entry.completed_at), 'dd MMMM yyyy, HH:mm', { locale: tr })}
                  </p>
                </div>
                <p className="text-sm font-semibold bg-muted px-2 py-1 rounded-md">Ünite {entry.unit_id}</p>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4 text-center">
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center justify-center gap-1"><User className="h-4 w-4" /> {myName}</p>
                  <p className="text-xl font-bold">{myStats.score} <span className="text-sm font-normal text-muted-foreground">doğru</span></p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Clock className="h-3 w-3" /> {myStats.time} sn</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium flex items-center justify-center gap-1"><User className="h-4 w-4" /> {otherPlayerName}</p>
                  <p className="text-xl font-bold">{otherPlayerStats.score} <span className="text-sm font-normal text-muted-foreground">doğru</span></p>
                  <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><Clock className="h-3 w-3" /> {otherPlayerStats.time} sn</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}