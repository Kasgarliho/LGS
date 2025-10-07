import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/supabaseClient";
import { useAppContext } from "@/pages/AppLayout";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { ChallengeOpponent, UserAvatars } from "@/types";
import { Search, Send } from "lucide-react";
import { avatars } from "@/data/avatars";

interface ChallengeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  unitId: number;
  score: number;
  time: number;
}

const defaultAvatar = avatars.find(a => a.id === 'default')?.image || '';

export function ChallengeDialog({ open, onOpenChange, unitId, score, time }: ChallengeDialogProps) {
  const { userId } = useAppContext();
  const [opponents, setOpponents] = useState<ChallengeOpponent[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (open && userId) {
      const fetchOpponents = async () => {
        setLoading(true);
        const { data, error } = await supabase.rpc('get_challenge_opponents', { p_user_id: userId });
        if (error) {
          console.error("Rakip listesi çekilemedi:", error);
          toast.error("Rakip listesi yüklenemedi.");
        } else {
          setOpponents(data || []);
        }
        setLoading(false);
      };
      fetchOpponents();
    }
  }, [open, userId]);

  const filteredOpponents = useMemo(() => {
    return opponents.filter(op => 
      op.user_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [opponents, searchTerm]);

  const handleChallenge = async (opponentId: string) => {
    if (!userId) return;

    const { error } = await supabase.from('challenges').insert({
      challenger_id: userId,
      opponent_id: opponentId,
      unit_id: unitId,
      challenger_score: score,
      challenger_time_seconds: time,
      status: 'pending'
    });

    if (error) {
      toast.error("Meydan okuma gönderilemedi. Lütfen tekrar dene.");
      console.error("Meydan okuma hatası:", error);
    } else {
      toast.success("Meydan okuma gönderildi! 🚀");
      onOpenChange(false);
    }
  };

  const getAvatarImage = (avatarData: UserAvatars) => {
    const currentAvatarId = avatarData?.current || 'default';
    return avatars.find(a => a.id === currentAvatarId)?.image || defaultAvatar;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Bir Arkadaşına Meydan Oku</DialogTitle>
          <DialogDescription>
            Skorunu geçmesi için bir arkadaşını düelloya davet et.
          </DialogDescription>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Arkadaş ara..." 
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {/* DÜZELTME: Kaydırma sorununu çözmek için `min-h-0` eklendi */}
        <ScrollArea className="flex-1 min-h-0">
          <div className="space-y-2 pr-4">
            {loading && <p className="text-center text-muted-foreground">Yükleniyor...</p>}
            {!loading && filteredOpponents.length === 0 && (
              <p className="text-center text-muted-foreground py-4">Meydan okunacak kimse bulunamadı.</p>
            )}
            {filteredOpponents.map(opponent => (
              <div key={opponent.user_id} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted">
                <div className="flex items-center gap-3">
                  <img 
                    src={getAvatarImage(opponent.user_avatar)} 
                    alt={opponent.user_name} 
                    className="w-10 h-10 rounded-full"
                  />
                  <span className="font-medium">{opponent.user_name}</span>
                </div>
                <Button size="sm" onClick={() => handleChallenge(opponent.user_id)}>
                  <Send className="h-4 w-4 mr-2" />
                  Gönder
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}