import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react"; 
import { useAuthContext, AuthProvider } from "./contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

import AppLayout, { useAppContext } from "./pages/AppLayout";
import Index from "./pages/Index";
import ProgramimSayfasi from "./pages/ProgramimSayfasi";
import NotFound from "./pages/NotFound";
import Statistics from "@/components/Statistics";
import AchievementsList from "@/components/AchievementsList";
import PracticePage from "./pages/PracticePage";
import { MarketPage } from "./pages/MarketPage";
import  ProfilePage  from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import GecmisKayitlarSayfasi from "./pages/GecmisKayitlarSayfasi";
import StudentDetailPage from "./pages/StudentDetailPage";
import SchedulePage from "./pages/SchedulePage";
import LeaderboardPage from "./pages/LeaderboardPage";
import WordQuizPage from "./pages/WordQuizPage";

// ==========================================================
// KESİN ÇÖZÜM BURADA: Otomatik veri yenileme ayarı eklendi
// ==========================================================
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Sekmeye geri dönüldüğünde otomatik veri çekmeyi kapatır.
    },
  },
});
// ==========================================================

const StatisticsPage = () => {
  const context = useAppContext();
  if (!context) return null;
  return <Statistics subjects={context.subjects} sessions={context.sessions} />;
};
const AchievementsPage = () => {
  const context = useAppContext();
  if (!context) return null;
  return <AchievementsList achievements={context.achievements} />;
};

const LoginPage = () => {
    const auth = useAuthContext();
    const [activeTab, setActiveTab] = useState("login");
    const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
    const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
    const [resetEmail, setResetEmail] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (!auth.authLoading && auth.session) {
            navigate("/", { replace: true });
        }
    }, [auth.session, auth.authLoading, navigate]);

    const handleRegister = async () => {
        const success = await auth.handleNewStudentRegistration();
        if (success) {
            setIsRegisterSuccess(true);
        }
    };

    const handleResetRequest = async () => {
        const success = await auth.handlePasswordResetRequest(resetEmail);
        if (success) {
            setIsResetDialogOpen(false);
        }
    };

    if (isRegisterSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md text-center">
                    <CardHeader><CardTitle>Kayıt Başarılı!</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Hesabın başarıyla oluşturuldu. Şimdi seni giriş ekranına yönlendiriyoruz.</p>
                        <Button onClick={() => {setIsRegisterSuccess(false); setActiveTab("login");}} className="w-full">Giriş Ekranına Git</Button>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-background p-4">
                <Card className="w-full max-w-md">
                    <CardHeader><CardTitle className="text-2xl text-center">LGS Asistanı</CardTitle></CardHeader>
                    <CardContent>
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                            <TabsList className="grid w-full grid-cols-2">
                                <TabsTrigger value="login">Giriş Yap</TabsTrigger>
                                <TabsTrigger value="register">Kayıt Ol</TabsTrigger>
                            </TabsList>
                            <TabsContent value="login" className="pt-4">
                                <p className="text-center mb-4 text-sm text-muted-foreground">Kullanıcı adın ve şifrenle giriş yap.</p>
                                <div className="space-y-4">
                                    <Input placeholder="Kullanıcı Adı (örn: aliyesil)" value={auth.username} onChange={(e) => auth.setUsername(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && auth.handleLogin()} />
                                    <Input type="password" placeholder="Şifre" value={auth.password} onChange={(e) => auth.setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && auth.handleLogin()} />
                                    <Button onClick={auth.handleLogin} className="w-full">Giriş Yap</Button>
                                </div>
                                <div className="text-center mt-4">
                                    <Button variant="link" className="text-xs" onClick={() => setIsResetDialogOpen(true)}>
                                        Şifremi Unuttum
                                    </Button>
                                </div>
                            </TabsContent>
                            <TabsContent value="register" className="pt-4">
                                <p className="text-center mb-4 text-sm text-muted-foreground">Sisteme ön kaydını tamamlamak için aşağıdaki bilgileri doldur.</p>
                                <div className="space-y-3">
                                    <Input placeholder="Adın Soyadın (örn: ALİ YEŞİL)" value={auth.regFullName} onChange={(e) => auth.setRegFullName(e.target.value)} />
                                    <Input placeholder="Sınıfın (örn: 8D)" value={auth.regClassName} onChange={(e) => auth.setRegClassName(e.target.value)} />
                                    <Input placeholder="Koç Kodu (örn: COSKUNHOCA)" value={auth.regCoachCode} onChange={(e) => auth.setRegCoachCode(e.target.value)} />
                                    <hr className="my-2"/>
                                    <Input type="email" placeholder="Kendi E-posta Adresin" value={auth.regEmail} onChange={(e) => auth.setRegEmail(e.target.value)} />
                                    <Input type="password" placeholder="Yeni Şifreni Gir" value={auth.regPassword} onChange={(e) => auth.setRegPassword(e.target.value)} />
                                    <Input type="password" placeholder="Yeni Şifreni Tekrar Gir" value={auth.regConfirmPassword} onChange={(e) => auth.setRegConfirmPassword(e.target.value)} />
                                    <Button onClick={handleRegister} className="w-full">Hesabımı Oluştur</Button>
                                </div>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>

            <Dialog open={isResetDialogOpen} onOpenChange={setIsResetDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Şifre Sıfırla</DialogTitle>
                        <DialogDescription>
                            Hesabınıza ait e-posta adresini girin. Size şifrenizi sıfırlamanız için bir link göndereceğiz.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">E-posta</Label>
                            <Input type="email" id="email" placeholder="ornek@eposta.com" value={resetEmail} onChange={(e) => setResetEmail(e.target.value)} />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="secondary" onClick={() => setIsResetDialogOpen(false)}>İptal</Button>
                        <Button type="submit" onClick={handleResetRequest}>Sıırlama Linki Gönder</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

const ProtectedRoute = () => {
    const { session, profile, authLoading } = useAuthContext();

    if (authLoading) {
        return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Yükleniyor...</p></div>;
    }

    if (!session) {
        return <Navigate to="/login" replace />;
    }
    
    if (!profile) {
        return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Profil bilgileri alınıyor...</p></div>;
    }

    return <AppLayout />;
};

const router = createBrowserRouter([
    {
        path: "/login",
        element: <LoginPage />
    },
    {
        path: "/",
        element: <ProtectedRoute />,
        children: [
            { path: 'update-password', element: <div>Şifre güncelleme sayfası</div> }, // Şifre güncelleme için geçici sayfa
            { index: true, element: <Index /> }, 
            { path: "program", element: <ProgramimSayfasi /> },
            { path: "practice", element: <PracticePage /> },
            { path: "statistics", element: <StatisticsPage /> },
            { path: "achievements", element: <AchievementsPage /> },
            { path: "market", element: <MarketPage /> },
            { path: "profile", element: <ProfilePage /> },
            { path: "settings", element: <SettingsPage /> },
            { path: "gecmis", element: <GecmisKayitlarSayfasi /> },
            { path: "leaderboard", element: <LeaderboardPage /> },
            { path: "word-quiz/:unitId", element: <WordQuizPage /> },
            { path: "student/:studentId", element: <StudentDetailPage /> },
            { path: "coach", element: <SchedulePage /> },
        ],
        errorElement: <NotFound />,
    },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <SonnerToaster position="top-center" />
          <RouterProvider router={router} />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;