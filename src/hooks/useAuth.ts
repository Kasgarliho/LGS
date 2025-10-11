import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { Session } from '@supabase/supabase-js';
import { playIntroSound, playSuccessSound, playFailSound } from '@/utils/sounds';

// Helper function to sanitize coach codes for matching
const sanitizeCoachCode = (text: string) => {
  if (!text) return "";
  return text
    .trim()
    .toUpperCase()
    .replace(/ /g, '')
    .replace(/İ/g, 'I')
    .replace(/Ş/g, 'S')
    .replace(/Ğ/g, 'G')
    .replace(/Ü/g, 'U')
    .replace(/Ö/g, 'O')
    .replace(/Ç/g, 'C');
};

// Helper function to generate a username from a full name
const generateUsername = (fullName: string) => {
  if (!fullName) return "";
  return fullName
    .trim()
    .toLowerCase()
    .replace(/ /g, '')
    .replace(/ı/g, 'i')
    .replace(/ş/g, 's')
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c');
};

export const useAuth = (isMuted: boolean) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // New Registration form state
  const [regFullName, setRegFullName] = useState("");
  const [regClassName, setRegClassName] = useState("");
  const [regCoachCode, setRegCoachCode] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirmPassword, setRegConfirmPassword] = useState("");

  useEffect(() => {
    const initializeAndListen = async () => {
      try {
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        if (initialSession?.user) {
          const { data: userProfile } = await supabase.from('kullanicilar').select('*').eq('id', initialSession.user.id).single();
          setProfile(userProfile || null);
        }
      } catch (error) {
        console.error("Oturum başlatılırken hata:", error);
      } finally {
        setAuthLoading(false);
      }

      const { data: authListener } = supabase.auth.onAuthStateChange(
        async (_event, newSession) => {
          setAuthLoading(true);
          setSession(newSession);
          setProfile(null);
          if (newSession?.user) {
            const { data: userProfile } = await supabase.from('kullanicilar').select('*').eq('id', newSession.user.id).single();
            setProfile(userProfile || null);
          }
          setAuthLoading(false);
        }
      );
      return () => { authListener.subscription.unsubscribe(); };
    };

    const subscriptionPromise = initializeAndListen();
    return () => { subscriptionPromise.then(cleanup => cleanup && cleanup()); };
  }, []);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error("Kullanıcı adı ve şifre alanları boş bırakılamaz.");
      return;
    }
    try {
      const { data: userData, error: userError } = await supabase
        .from('kullanicilar')
        .select('email')
        .eq('kullanici_adi', username.toLowerCase())
        .single();

      if (userError || !userData) {
        throw new Error("Kullanıcı adı veya şifre hatalı.");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: password,
      });

      if (signInError) {
        throw new Error("Kullanıcı adı veya şifre hatalı.");
      }
      playIntroSound(isMuted);

    } catch (error: any) {
      toast.error(error.message);
    }
  };
  
  const handleNewStudentRegistration = async (): Promise<boolean> => {
    if (!regFullName || !regClassName || !regCoachCode || !regEmail || !regPassword || !regConfirmPassword) {
      toast.error("Tüm alanları doldurmalısınız.");
      return false;
    }
    if (regPassword !== regConfirmPassword) {
      toast.error("Şifreler uyuşmuyor.");
      return false;
    }
    if (regPassword.length < 6) {
      toast.error("Şifreniz en az 6 karakter olmalıdır.");
      return false;
    }

    try {
      const finalFullName = regFullName.trim();
      const finalClassName = regClassName.trim();
      const finalCoachCode = sanitizeCoachCode(regCoachCode);

      const { data: preRegData, error: preRegError } = await supabase
        .from('onkayit_ogrenciler')
        .select('*')
        .ilike('ad_soyad', finalFullName)
        .ilike('sinif', finalClassName)
        .ilike('koc_kodu', finalCoachCode)
        .single();
        
      if (preRegError || !preRegData) {
        throw new Error("Ön kayıt bulunamadı. Lütfen Ad Soyad, Sınıf ve Koç Kodu bilgilerinizi kontrol edin.");
      }
      if (preRegData.kayit_tamamlandi) {
        throw new Error("Bu öğrenci için zaten bir hesap oluşturulmuş.");
      }

      const generatedUsername = generateUsername(finalFullName);
      
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email: regEmail,
        password: regPassword,
        options: {
          data: {
            ad_soyad: finalFullName,
            koc_kodu: finalCoachCode 
          }
        }
      });
      if (signUpError) throw signUpError;
      if (!user) throw new Error("Kullanıcı oluşturulamadı, lütfen tekrar deneyin.");

      const { error: updateError } = await supabase
        .from('kullanicilar')
        .update({
          rol: 'ogrenci',
          kullanici_adi: generatedUsername
        })
        .eq('id', user.id);
      if (updateError) throw updateError;
      
      const { error: preRegUpdateError } = await supabase
        .from('onkayit_ogrenciler')
        .update({ kayit_tamamlandi: true })
        .eq('id', preRegData.id);
      if (preRegUpdateError) throw preRegUpdateError;

      toast.success("Hesabın başarıyla oluşturuldu!", {
        description: `Kullanıcı adın: ${generatedUsername}. Bu kullanıcı adı ve şifrenle giriş yapabilirsin.`,
        duration: 10000
      });
      return true;
      
    } catch (error: any) {
      toast.error(error.message);
      return false;
    }
  };

  const handlePasswordResetRequest = async (email: string) => {
    if (!email) {
      toast.error("Lütfen e-posta adresinizi girin.");
      return false;
    }
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'http://localhost:8080/update-password',
      });
      if (error) throw error;
      toast.success("Şifre sıfırlama e-postası gönderildi!", {
        description: "Lütfen e-posta kutunuzu kontrol edin.",
      });
      return true;
    } catch (error: any) {
      toast.error("Bir hata oluştu:", { description: error.message });
      return false;
    }
  };

  const handleLogout = async () => { 
    await supabase.auth.signOut();
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => { 
    if (!profile?.email) { toast.error("Kullanıcı oturumu bulunamadı."); return false; }
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: profile.email, password: currentPassword });
    if (signInError) { playFailSound(isMuted); toast.error("Mevcut şifreniz yanlış!"); return false; }
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    if (updateError) { toast.error("Şifre güncellenirken bir hata oluştu."); return false; }
    playSuccessSound(isMuted); toast.success("Şifreniz başarıyla güncellendi!");
    return true; 
  };
  
  return {
    session, profile, authLoading,
    userId: profile?.id ?? null, userName: profile?.ad_soyad ?? null, userRole: profile?.rol ?? null,
    username, setUsername,
    password, setPassword,
    handleLogin,
    regFullName, setRegFullName,
    regClassName, setRegClassName,
    regCoachCode, setRegCoachCode,
    regEmail, setRegEmail,
    regPassword, setRegPassword,
    regConfirmPassword, setRegConfirmPassword,
    handleNewStudentRegistration,
    handlePasswordResetRequest,
    handleLogout,
    handleChangePassword,
  };
};