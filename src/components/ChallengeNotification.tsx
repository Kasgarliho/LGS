import { Challenge } from "@/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Swords, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabaseClient";

interface ChallengeNotificationProps {
  challenges: Challenge[];
  onDismiss: (challengeId: string) => void;
}

export default function ChallengeNotification({ challenges, onDismiss }: ChallengeNotificationProps) {
  const navigate = useNavigate();

  if (!challenges || challenges.length === 0) {
    return null;
  }

  const handleAccept = (challenge: Challenge) => {
    // Bildirimi hemen kapat
    onDismiss(challenge.id);
    // İlgili teste yönlendir ve challengeId'yi state olarak gönder
    navigate(`/word-quiz/${challenge.unit_id}`, { state: { challengeId: challenge.id } });
  };

  const handleDecline = async (challengeId: string) => {
    const { error } = await supabase
      .from('challenges')
      .update({ status: 'declined' })
      .eq('id', challengeId);

    if (error) {
      toast.error("Meydan okuma reddedilemedi.");
    } else {
      toast.info("Meydan okuma reddedildi.");
      onDismiss(challengeId);
    }
  };

  return (
    <div className="fixed top-24 right-4 z-50 w-80 space-y-2 animate-slide-in-right">
      {challenges.map(challenge => (
        <Card key={challenge.id} className="shadow-lg border-primary/20 bg-card">
          <CardHeader className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-sm font-bold flex items-center gap-2">
                  <Swords className="h-4 w-4 text-primary" />
                  Sana Meydan Okudu!
                </CardTitle>
                <CardDescription className="text-xs mt-1">
                  <strong>{challenge.challenger_name}</strong>, seni Ünite {challenge.unit_id} testine davet ediyor.
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onDismiss(challenge.id)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-xs text-muted-foreground mb-2">
              Onun Skoru: <strong>{challenge.challenger_score} doğru / {challenge.challenger_time_seconds} sn</strong>
            </p>
            <div className="flex gap-2">
              <Button className="flex-1" size="sm" onClick={() => handleAccept(challenge)}>Kabul Et</Button>
              <Button className="flex-1" size="sm" variant="outline" onClick={() => handleDecline(challenge.id)}>Reddet</Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}