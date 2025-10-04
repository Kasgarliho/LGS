import { KnownUser } from "@/types";
import { Button } from "@/components/ui/button";
import { CheckCircle, X } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface ProfileSwitcherProps {
  knownUsers: KnownUser[];
  activeUserId: string | null;
  onSwitch: (userId: string) => void;
  onRemove: (userId: string) => void;
  onAddNew: () => void;
}

export default function ProfileSwitcher({ knownUsers, activeUserId, onSwitch, onRemove, onAddNew }: ProfileSwitcherProps) {
  return (
    <div className="py-4">
      <div className="space-y-2">
        {knownUsers.map(user => (
          <div key={user.userId} className="flex items-center gap-2">
            <Button
              variant={user.userId === activeUserId ? "secondary" : "outline"}
              className="w-full justify-start gap-2"
              onClick={() => user.userId !== activeUserId && onSwitch(user.userId)}
              disabled={user.userId === activeUserId}
            >
              {user.userId === activeUserId && <CheckCircle className="h-4 w-4 text-primary" />}
              {user.userName}
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="flex-shrink-0 text-muted-foreground hover:text-destructive">
                  <X className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>"{user.userName}" profilini kaldır?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Bu işlem, bu profile ait tüm verileri (puan, seri, avatarlar vb.) **sadece bu cihazdan** kalıcı olarak silecek. Hesabın tamamen silinmeyecektir. Emin misin?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>İptal</AlertDialogCancel>
                  <AlertDialogAction onClick={() => onRemove(user.userId)}>Kaldır</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        ))}
      </div>
      <Button className="w-full mt-4" onClick={onAddNew}>Yeni Hesapla Giriş Yap</Button>
    </div>
  );
}