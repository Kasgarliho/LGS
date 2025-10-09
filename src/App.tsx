import { useState } from "react";
import { Toaster as SonnerToaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
import ProfileSwitcher from "./components/ProfileSwitcher"; // Bu artık kullanılmayacak ama kalsın

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
  const { 
    session, 
    profile, 
    authLoading, 
    userRole,
    username, setUsername,
    password, setPassword,
    newPassword, setNewPassword,
    tempName, setTempName,
    className, setClassName,
    coachCode, setCoachCode,
    handleLogin,
    handleFirstTimeLogin
  } = auth;
  
  if (authLoading) {
    return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Yükleniyor...</p></div>;
  }

  if (!session) {
    return (
      <Dialog open={true}>
        <DialogContent onPointerDownOutside={(e) => e.preventDefault()} className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl text-center">LGS Asistanı</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Giriş Yap</TabsTrigger>
              <TabsTrigger value="register">İlk Girişim</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="pt-4">
              <DialogDescription className="text-center mb-4">Kullanıcı adın ve şifrenle giriş yap.</DialogDescription>
              <div className="space-y-4">
                <Input placeholder="Kullanıcı Adı" value={username} onChange={(e) => setUsername(e.target.value)} />
                <Input type="password" placeholder="Şifre" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} />
                <Button onClick={handleLogin} className="w-full">Giriş Yap</Button>
              </div>
            </TabsContent>
            <TabsContent value="register" className="pt-4">
               <DialogDescription className="text-center mb-4">Daha önce şifre oluşturmadıysan, aşağıdaki bilgileri doldurarak yeni bir şifre belirle.</DialogDescription>
              <div className="space-y-3">
                <Input placeholder="Adın Soyadın..." value={tempName} onChange={(e) => setTempName(e.target.value)} />
                <Input placeholder="Sınıfın (Örn: 8A)" value={className} onChange={(e) => setClassName(e.target.value)} />
                <Input placeholder="Koç Kodu" value={coachCode} onChange={(e) => setCoachCode(e.target.value)} />
                <Input type="password" placeholder="Yeni Şifreni Gir..." value={newPassword} onChange={(e) => setNewPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleFirstTimeLogin()} />
                <Button onClick={handleFirstTimeLogin} className="w-full">Hesabımı Oluştur</Button>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  }

  if (profile) {
    const lowerCaseRole = userRole?.toLowerCase();
    const isCoachOrAdmin = lowerCaseRole === 'koç' || lowerCaseRole === 'admin' || lowerCaseRole === 'hoca';
    return isCoachOrAdmin ? <RouterProvider router={coachRouter} /> : <RouterProvider router={studentRouter} />;
  }

  return <div className="fixed inset-0 flex items-center justify-center bg-background"><p>Profil Yükleniyor...</p></div>;
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