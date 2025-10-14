import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Calendar, BarChart3, Trophy, KeyRound } from "lucide-react";
import { playConfirmSound } from "@/utils/sounds";

interface BottomNavProps {
  isMuted: boolean;
  userRole: string | null;
}

// Her rol için ayrı menü tanımlamaları
const studentNavItems = [
  { id: 'home', path: '/', icon: Home, label: 'Ana Sayfa' },
  { id: 'lessons', path: '/derslerim', icon: BookOpen, label: 'Derslerim' },
  { id: 'leaderboard', path: '/leaderboard', icon: Trophy, label: 'Liderlik' },
  { id: 'schedule', path: '/program', icon: Calendar, label: 'Program' },
  { id: 'statistics', path: '/statistics', icon: BarChart3, label: 'İstatistik' },
];

const coachNavItems = [
  { id: 'coach_reports', path: '/coach', icon: BarChart3, label: 'Raporlar' },
  { id: 'leaderboard', path: '/leaderboard', icon: Trophy, label: 'Liderlik' },
];

const adminNavItems = [
  { id: 'coach_reports', path: '/coach', icon: BarChart3, label: 'Raporlar' },
  { id: 'leaderboard', path: '/leaderboard', icon: Trophy, label: 'Liderlik' },
  { id: 'admin_reset', path: '/admin/reset-password', icon: KeyRound, label: 'Şifre Sıfırla' },
];

export default function BottomNav({ isMuted, userRole }: BottomNavProps) {
  const location = useLocation();
  const activePath = location.pathname;

  // Role göre hangi menünün gösterileceğini seçen mantık
  let visibleNavItems;
  const lowerCaseRole = userRole?.toLowerCase();

  if (lowerCaseRole === 'admin') {
    visibleNavItems = adminNavItems;
  } else if (lowerCaseRole === 'koç') {
    visibleNavItems = coachNavItems;
  } else {
    visibleNavItems = studentNavItems;
  }

  if (visibleNavItems.length === 0) {
      return null;
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 gradient-subtle border-t border-border/50 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path || (item.path === '/coach' && (activePath.startsWith('/student')));

            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => playConfirmSound(isMuted)}
                className={`flex flex-col items-center justify-center gap-1 h-auto py-2 px-3 min-w-[60px] rounded-lg transition-all duration-300 ${
                  isActive 
                    ? "gradient-primary text-primary-foreground shadow-glow scale-105" 
                    : "hover:bg-primary/10 hover:scale-105 text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "animate-bounce" : ""}`} />
                <span className="text-xs font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}