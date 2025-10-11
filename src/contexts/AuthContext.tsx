import React, { createContext, useContext } from 'react';
import { useAuth } from '@/hooks/useAuth'; // Bizim orijinal hook'umuz

// Tip tanımını useAuth'tan alıyoruz
type AuthContextType = ReturnType<typeof useAuth>;

// 1. Context'i oluşturuyoruz
const AuthContext = createContext<AuthContextType | null>(null);

// 2. Provider bileşenini oluşturuyoruz.
// Bu bileşen, useAuth'u çağıracak ve tüm uygulamayı sarmalayacak.
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // useAuth hook'u artık sadece burada, tek bir yerde çağrılıyor.
  const auth = useAuth(false);
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

// 3. Bu context'i kolayca kullanmak için özel bir hook oluşturuyoruz.
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};