import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import AppLayout from "./pages/AppLayout";
import Index from "./pages/Index";
import ProgramimSayfasi from "./pages/ProgramimSayfasi";
import NotFound from "./pages/NotFound";
import Statistics from "@/components/Statistics";
import AchievementsList from "@/components/AchievementsList";
import PracticePage from "./pages/PracticePage";
import { MarketPage } from "./pages/MarketPage";
import ProfilePage  from "./pages/ProfilePage";
import { SettingsPage } from "./pages/SettingsPage";
import GecmisKayitlarSayfasi from "./pages/GecmisKayitlarSayfasi";
import StudentDetailPage from "./pages/StudentDetailPage";
import SchedulePage from "./pages/SchedulePage";
import { useAppContext } from "./pages/AppLayout";


const queryClient = new QueryClient();

const StatisticsPage = () => {
  const context = useAppContext();
  if (!context) return null; // Context yüklenene kadar bekle
  return <Statistics subjects={context.subjects} sessions={context.sessions} />;
};
const AchievementsPage = () => {
  const context = useAppContext();
  if (!context) return null; // Context yüklenene kadar bekle
  return <AchievementsList achievements={context.achievements} />;
};


// Öğrenci arayüzünün rotaları
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
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

// Koç arayüzünün rotaları
const coachRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { index: true, element: <SchedulePage /> },
      { path: "student/:studentId", element: <StudentDetailPage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
]);

// Ana Kontrol Bileşeni
function AppController() {
  const auth = useAuth(false);
  const { userId, userRole, authLoading, knownUsers, handleSwitchUser, showRegistration } = auth;

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
              <div className="py-4 space-y-2">
                {knownUsers.map(user => (<Button key={user.userId} variant="outline" className="w-full justify-start" onClick={() => handleSwitchUser(user.userId)}>{user.userName}</Button>))}
                <Button className="w-full mt-4" onClick={showRegistration}>Yeni Hesapla Giriş Yap</Button>
              </div>
            </>
          ) : (
            <>
              <DialogHeader><DialogTitle className="text-2xl">Sisteme Giriş</DialogTitle><DialogDescription>Devam etmek için bilgilerini ve koç kodunu gir.</DialogDescription></DialogHeader>
              <div className="py-4 space-y-4">
                <Input placeholder="Adın Soyadın..." value={auth.tempName} onChange={(e) => auth.setTempName(e.target.value)} />
                <Input placeholder="Sınıfın (Örn: 8A)" value={auth.className} onChange={(e) => auth.setClassName(e.target.value)} />
                <Input placeholder="Koç Kodu" value={auth.coachCode} onChange={(e) => auth.setCoachCode(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && auth.handleRegistration()} />
                <Button onClick={auth.handleRegistration} disabled={!auth.tempName.trim() || !auth.className.trim() || !auth.coachCode.trim()} className="w-full">Giriş Yap</Button>
                {knownUsers.length > 0 && (<Button variant="ghost" className="w-full" onClick={() => auth.setShowNameModal(false)}>Geri</Button>)}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    );
  }

  return userRole === 'koç' ? <RouterProvider router={coachRouter} /> : <RouterProvider router={studentRouter} />;
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