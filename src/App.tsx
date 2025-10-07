import { useState } from "react";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User, Shield } from "lucide-react";

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
import ProfileSwitcher from "./components/ProfileSwitcher";

const queryClient = new QueryClient();

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

const studentRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
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
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

const coachRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <SchedulePage /> },
      { path: "student/:studentId", element: <StudentDetailPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "profile", element: <ProfilePage /> },
      { path: "leaderboard", element: <LeaderboardPage /> },
      { path: "word-quiz/:unitId", element: <WordQuizPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

function AppController() {
  const auth = useAuth(false);
  const { userId, userRole, authLoading, knownUsers, handleSwitchUser, showRegistration, handleRemoveKnownUser, handleStudentRegistration, handleCoachRegistration } = auth;
  
  const [loginRole, setLoginRole] = useState<'student' | 'coach' | null>(null);

  if (authLoading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Yükleniyor...</p></div>;
  }

  if (!userId) {
    return (
      <Dialog open={true}>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()}>
          {knownUsers.length > 0 && !auth.showNameModal ? (
            <>
              <DialogHeader><DialogTitle className="text-2xl">Profil Seç</DialogTitle><DialogDescription>Devam etmek için bir profil seç veya yeni bir hesapla giriş yap.</DialogDescription></DialogHeader>
              <ProfileSwitcher 
                knownUsers={knownUsers}
                activeUserId={userId}
                onSwitch={handleSwitchUser}
                onRemove={handleRemoveKnownUser}
                onAddNew={showRegistration}
              />
            </>
          ) : (
            <>
              {!loginRole ? (
                <>
                  <DialogHeader><DialogTitle className="text-2xl">Sisteme Giriş</DialogTitle><DialogDescription>Devam etmek için rolünü seç.</DialogDescription></DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setLoginRole('student')}>
                      <User className="h-8 w-8" /> Öğrenciyim
                    </Button>
                    <Button variant="outline" className="h-24 flex flex-col gap-2" onClick={() => setLoginRole('coach')}>
                      <Shield className="h-8 w-8" /> Koçum
                    </Button>
                  </div>
                  {knownUsers.length > 0 && (<Button variant="ghost" className="w-full" onClick={() => auth.setShowNameModal(false)}>Geri</Button>)}
                </>
              ) : loginRole === 'student' ? (
                <>
                  <DialogHeader><DialogTitle className="text-2xl">Öğrenci Girişi</DialogTitle><DialogDescription>Devam etmek için bilgilerini ve koç kodunu gir.</DialogDescription></DialogHeader>
                  <div className="py-4 space-y-4">
                    <Input placeholder="Adın Soyadın..." value={auth.tempName} onChange={(e) => auth.setTempName(e.target.value)} />
                    <Input placeholder="Sınıfın (Örn: 8A)" value={auth.className} onChange={(e) => auth.setClassName(e.target.value)} />
                    <Input placeholder="Koç Kodu" value={auth.coachCode} onChange={(e) => auth.setCoachCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleStudentRegistration()} />
                    <Button onClick={handleStudentRegistration} disabled={!auth.tempName.trim() || !auth.className.trim() || !auth.coachCode.trim()} className="w-full">Giriş Yap</Button>
                    <Button variant="ghost" className="w-full" onClick={() => setLoginRole(null)}>Geri</Button>
                  </div>
                </>
              ) : (
                <>
                  <DialogHeader><DialogTitle className="text-2xl">Koç Girişi</DialogTitle><DialogDescription>Devam etmek için size özel koç kodunu ve şifrenizi girin.</DialogDescription></DialogHeader>
                  <div className="py-4 space-y-4">
                    <Input placeholder="Koç Kodu" value={auth.coachCode} onChange={(e) => auth.setCoachCode(e.target.value)} />
                    <Input type="password" placeholder="Şifre" value={auth.tempPassword} onChange={(e) => auth.setTempPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleCoachRegistration()} />
                    <Button onClick={handleCoachRegistration} disabled={!auth.coachCode.trim() || !auth.tempPassword.trim()} className="w-full">Giriş Yap</Button>
                    <Button variant="ghost" className="w-full" onClick={() => setLoginRole(null)}>Geri</Button>
                  </div>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  // GÜNCELLEME: Artık 'admin' rolünü de kontrol ediyor.
  const isCoachOrAdmin = userRole?.toLowerCase() === 'koç' || userRole?.toLowerCase() === 'admin';

  return isCoachOrAdmin ? <RouterProvider router={coachRouter} /> : <RouterProvider router={studentRouter} />;
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <SonnerToaster position="top-center" />
        <AppController />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;