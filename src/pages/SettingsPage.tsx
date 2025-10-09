import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BellRing, History, ChevronRight, LogOut, User, Users, Swords, KeyRound } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppLayout";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogDescription as DialogDescriptionComponent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import  ProfileSwitcher  from "@/components/ProfileSwitcher";
import PasswordResetTool from "@/components/PasswordResetTool";

export const SettingsPage = () => {
  const { 
    userRole,
    notificationSettings, 
    handleUpdateNotificationSettings, 
    handleLogout, 
    userName, 
    knownUsers, 
    userId, 
    handleSwitchUser, 
    handleRemoveKnownUser, 
    showRegistration,
    handleChangePassword 
  } = useAppContext();

  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const isCoachOrAdmin = userRole?.toLowerCase() === 'koç' || userRole?.toLowerCase() === 'admin' || userRole?.toLowerCase() === 'hoca';

  if (!notificationSettings) {
    return <div>Yükleniyor...</div>;
  }
  
  const onPasswordChange = async () => {
    if (newPassword.length < 6) {
      toast.error("Yeni şifre en az 6 karakter olmalıdır.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Yeni şifreler uyuşmuyor.");
      return;
    }
    
    // handleChangePassword'ın useAuth'tan gelmesi gerekiyor. Eğer AppContext'te yoksa eklenmeli.
    // Şimdilik olduğunu varsayıyoruz.
    if (handleChangePassword) {
        const success = await handleChangePassword(currentPassword, newPassword);
        if (success) {
          setIsPasswordDialogOpen(false);
          setCurrentPassword("");
          setNewPassword("");
          setConfirmPassword("");
        }
    } else {
        toast.error("Şifre değiştirme fonksiyonu bulunamadı.");
    }
  };

  const handleStudyReminderToggle = (isChecked: boolean) => handleUpdateNotificationSettings({ ...notificationSettings, studyPlanReminder: { ...notificationSettings.studyPlanReminder, enabled: isChecked } });
  const handleStudyReminderTimeChange = (value: string) => handleUpdateNotificationSettings({ ...notificationSettings, studyPlanReminder: { ...notificationSettings.studyPlanReminder, minutesBefore: parseInt(value, 10) } });
  const handleBagReminderToggle = (isChecked: boolean) => handleUpdateNotificationSettings({ ...notificationSettings, bagReminder: { ...notificationSettings.bagReminder, enabled: isChecked } });
  const handleBagReminderTimeChange = (value: string) => handleUpdateNotificationSettings({ ...notificationSettings, bagReminder: { ...notificationSettings.bagReminder, hour: parseInt(value.split(':')[0], 10), minute: parseInt(value.split(':')[1], 10) } });
  const handleStreakReminderToggle = (isChecked: boolean) => handleUpdateNotificationSettings({ ...notificationSettings, streakReminder: isChecked });
  const handleChallengeReminderToggle = (isChecked: boolean) => handleUpdateNotificationSettings({ ...notificationSettings, challengeReminder: isChecked });

  return (
    <div className="space-y-6 animate-slide-up">
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Hesap Yönetimi</CardTitle>
          <CardDescription>Aktif kullanıcı: <span className="font-semibold">{userName || 'Giriş yapılmadı'}</span></CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
            {isCoachOrAdmin && (
                <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full"><KeyRound className="h-4 w-4 mr-2" />Şifre Değiştir</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Şifreni Değiştir</DialogTitle>
                            <DialogDescriptionComponent>Güvenliğin için yeni bir şifre belirle.</DialogDescriptionComponent>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <Input type="password" placeholder="Mevcut Şifren" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} />
                            <Input type="password" placeholder="Yeni Şifren" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <Input type="password" placeholder="Yeni Şifren (Tekrar)" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                        </div>
                        <DialogFooter>
                            <Button onClick={onPasswordChange}>Değişiklikleri Kaydet</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="w-full"><LogOut className="h-4 w-4 mr-2" />Çıkış Yap</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Çıkış yapmak istediğine emin misin?</AlertDialogTitle>
                <AlertDialogDescription>Mevcut oturumun sonlandırılacak ve giriş ekranına yönlendirileceksin.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleLogout()}>Çıkış Yap</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {knownUsers && knownUsers.length > 1 && (
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Profilleri Yönet</CardTitle>
            <CardDescription>Bu cihazda kayıtlı profiller arasında geçiş yap veya bir profili kaldır.</CardDescription>
          </CardHeader>
          <CardContent>
            <ProfileSwitcher 
              knownUsers={knownUsers}
              activeUserId={userId}
              onSwitch={handleSwitchUser}
              onRemove={handleRemoveKnownUser}
              onAddNew={showRegistration}
            />
          </CardContent>
        </Card>
      )}

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><History className="h-5 w-5 text-primary" /> İşlem Geçmişi</CardTitle>
          <CardDescription>Girdiğin soru sayılarını görüntüle ve gerekirse düzenle.</CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/gecmis">
            <div className="p-4 border rounded-lg flex justify-between items-center hover:bg-muted/50 transition-colors cursor-pointer">
              <p className="font-semibold">Son İşlemleri Görüntüle</p>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </div>
          </Link>
        </CardContent>
      </Card>
      
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Swords className="h-5 w-5 text-primary" /> Meydan Okuma Bildirimi</CardTitle>
          <CardDescription>Uygulamayı bir süre kullanmadığında seni motive etmek için bildirim gönderir.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="challenge-reminder">Hatırlatıcıyı Etkinleştir</Label>
              <p className="text-sm text-muted-foreground">3 gün ara verdiğinde bildirim al.</p>
            </div>
            <Switch id="challenge-reminder" checked={notificationSettings.challengeReminder ?? false} onCheckedChange={handleChallengeReminderToggle} />
          </div>
        </CardContent>
      </Card>
      
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5 text-primary" /> Bildirim Ayarları</CardTitle>
          <CardDescription>Çalışma planı hatırlatıcılarını ayarla.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="study-reminder">Çalışma Planı Hatırlatıcıları</Label>
              <p className="text-sm text-muted-foreground">Planlanmış dersler için bildirim al.</p>
            </div>
            <Switch id="study-reminder" checked={notificationSettings.studyPlanReminder?.enabled ?? false} onCheckedChange={handleStudyReminderToggle} />
          </div>
          {notificationSettings.studyPlanReminder?.enabled && (
            <div className="flex items-center justify-between pl-2 pr-1 pt-2 border-t">
              <p className="text-sm text-muted-foreground">Ne kadar önce hatırlat?</p>
              <Select value={notificationSettings.studyPlanReminder.minutesBefore.toString()} onValueChange={handleStudyReminderTimeChange}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Dakika Seç" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 dakika önce</SelectItem>
                  <SelectItem value="15">15 dakika önce</SelectItem>
                  <SelectItem value="30">30 dakika önce</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5 text-primary" /> Çanta Hazırlama Bildirimi</CardTitle>
          <CardDescription>Her akşam bir sonraki günün derslerine göre çantanı hazırlamanı hatırlatır.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="bag-reminder">Hatırlatıcıyı Etkinleştir</Label>
              <p className="text-sm text-muted-foreground">Bildirim almak için bu özelliği aç.</p>
            </div>
            <Switch id="bag-reminder" checked={notificationSettings.bagReminder?.enabled ?? false} onCheckedChange={handleBagReminderToggle} />
          </div>
          {notificationSettings.bagReminder?.enabled && (
            <div className="flex items-center justify-between pl-2 pr-1 pt-2 border-t">
              <p className="text-sm text-muted-foreground">Ne zaman haber verilsin?</p>
              <Select value={`${notificationSettings.bagReminder?.hour.toString().padStart(2, '0')}:${notificationSettings.bagReminder?.minute.toString().padStart(2, '0')}`} onValueChange={handleBagReminderTimeChange}>
                <SelectTrigger className="w-[180px]"><SelectValue placeholder="Saat Seç" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="19:00">19:00</SelectItem>
                  <SelectItem value="20:00">20:00</SelectItem>
                  <SelectItem value="21:00">21:00</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BellRing className="h-5 w-5 text-primary" /> Diğer Bildirimler</CardTitle>
          <CardDescription>Diğer bildirimleri buradan yönet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label htmlFor="streak-reminder">Seri Koruma Hatırlatıcısı</Label>
              <p className="text-sm text-muted-foreground">Günlük görevini yapmadığında serini korumak için bildirim al.</p>
            </div>
            <Switch id="streak-reminder" checked={notificationSettings.streakReminder ?? false} onCheckedChange={handleStreakReminderToggle} />
          </div>
        </CardContent>
      </Card>
      
      {isCoachOrAdmin && (
        <div className="pt-4">
          <PasswordResetTool />
        </div>
      )}
    </div>
  );
};