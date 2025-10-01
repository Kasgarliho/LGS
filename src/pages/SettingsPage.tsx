import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BellRing, History, ChevronRight, LogOut, User, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAppContext } from "./AppLayout";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, 
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export const SettingsPage = () => {
  const { 
    notificationSettings, 
    handleUpdateNotificationSettings, 
    handleLogout, 
    userName, 
    knownUsers, 
    handleSwitchUser, 
    userId 
  } = useAppContext();

  if (!notificationSettings) {
    return <div>Yükleniyor...</div>;
  }

  const handleStudyReminderToggle = (isChecked: boolean) => {
    handleUpdateNotificationSettings({ ...notificationSettings, studyPlanReminder: { ...notificationSettings.studyPlanReminder, enabled: isChecked } });
  };
  const handleStudyReminderTimeChange = (value: string) => {
    handleUpdateNotificationSettings({ ...notificationSettings, studyPlanReminder: { ...notificationSettings.studyPlanReminder, minutesBefore: parseInt(value, 10) } });
  };
  const handleBagReminderToggle = (isChecked: boolean) => {
    handleUpdateNotificationSettings({ ...notificationSettings, bagReminder: { ...notificationSettings.bagReminder, enabled: isChecked } });
  };
  const handleBagReminderTimeChange = (value: string) => {
    handleUpdateNotificationSettings({ ...notificationSettings, bagReminder: { ...notificationSettings.bagReminder, hour: parseInt(value.split(':')[0], 10), minute: parseInt(value.split(':')[1], 10) } });
  };
  const handleStreakReminderToggle = (isChecked: boolean) => {
    handleUpdateNotificationSettings({ ...notificationSettings, streakReminder: isChecked });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <Card className="shadow-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-primary" /> Hesap Yönetimi</CardTitle>
          <CardDescription>Aktif kullanıcı: <span className="font-semibold">{userName || 'Giriş yapılmadı'}</span></CardDescription>
        </CardHeader>
        <CardContent>
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
                <AlertDialogAction onClick={handleLogout}>Çıkış Yap</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>

      {knownUsers && knownUsers.length > 1 && (
        <Card className="shadow-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-primary" /> Profilleri Değiştir</CardTitle>
            <CardDescription>Bu cihazda kayıtlı diğer profillere hızlıca geçiş yap.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {knownUsers.map(user => (
              <Button
                key={user.userId}
                variant={user.userId === userId ? "secondary" : "outline"}
                className="w-full justify-start gap-2"
                onClick={() => user.userId !== userId && handleSwitchUser(user.userId)}
                disabled={user.userId === userId}
              >
                {user.userId === userId && <CheckCircle className="h-4 w-4 text-primary" />}
                {user.userName}
              </Button>
            ))}
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
    </div>
  );
};