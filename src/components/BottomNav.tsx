import { Link, useLocation } from "react-router-dom";
import { Home, BookOpen, Calendar, BarChart3, Trophy } from "lucide-react";
import { playConfirmSound } from "@/utils/sounds";

interface BottomNavProps {
  isMuted: boolean;
  userRole: string | null; // userRole prop'u eklendi
}

const navItems = [
  { id: 'home', path: '/', icon: Home, label: 'Ana Sayfa' },
  { id: 'practice', path: '/practice', icon: BookOpen, label: 'Çalışma' },
  { id: 'leaderboard', path: '/leaderboard', icon: Trophy, label: 'Liderlik' },
  { id: 'schedule', path: '/program', icon: Calendar, label: 'Program' },
  { id: 'statistics', path: '/statistics', icon: BarChart3, label: 'İstatistik' },
];

export default function BottomNav({ isMuted, userRole }: BottomNavProps) {
  const location = useLocation();
  const activePath = location.pathname;

  // DEĞİŞİKLİK BURADA: Rol kontrolü
  const lowerCaseRole = userRole?.toLowerCase();
  const isCoachOrAdmin = lowerCaseRole === 'koç' || lowerCaseRole === 'admin';

  // Eğer kullanıcı koç veya admin ise, sadece 'Ana Sayfa' ve 'Liderlik' gösterilir.
  // Değilse, tüm menü elemanları gösterilir.
  const visibleNavItems = isCoachOrAdmin
    ? navItems.filter(item => item.id === 'home' || item.id === 'leaderboard')
    : navItems;
    
  // Eğer kullanıcı koç veya admin ise, navigasyon menüsünü hiç göstermeyebiliriz.
  // Ama şimdilik sadece ilgili sekmeleri gösterelim.
  if (isCoachOrAdmin && visibleNavItems.length === 0) {
      return null; // Koç için menüyü tamamen gizleyebiliriz de. Şimdilik kalsın.
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 gradient-subtle border-t border-border/50 backdrop-blur-lg pb-[env(safe-area-inset-bottom)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-around py-2">
          {/* DEĞİŞİKLİK BURADA: 'navItems' yerine 'visibleNavItems' kullanılıyor */}
          {visibleNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePath === item.path || (item.path === '/' && activePath.startsWith('/coach'));
            
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