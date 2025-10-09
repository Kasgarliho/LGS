import { useState, useEffect } from 'react';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { Session } from '@supabase/supabase-js';
import { playIntroSound, playSuccessSound, playFailSound } from '@/utils/sounds';
import { storage, KnownUser } from '@/utils/storage';

export const useAuth = (isMuted: boolean) => {
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [knownUsers, setKnownUsers] = useState<KnownUser[]>(() => storage.loadKnownUsers());
  const [showNameModal, setShowNameModal] = useState(false);
  
  const [tempName, setTempName] = useState("");
  const [className, setClassName] = useState("");
  const [coachCode, setCoachCode] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");


  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session) {
        const { data: userProfile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(userProfile);
        
        if (userProfile) {
            updateKnownUsers({ userId: userProfile.id, userName: userProfile.ad_soyad });
        }
      }
      setAuthLoading(false);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      if (session) {
          const { data: userProfile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
          setProfile(userProfile);
          if (userProfile) {
              updateKnownUsers({ userId: userProfile.id, userName: userProfile.ad_soyad });
          }
      } else {
          setProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const updateKnownUsers = (user: KnownUser) => {
    const currentUsers = storage.loadKnownUsers();
    const userExists = currentUsers.some(u => u.userId === user.userId);
    if (!userExists) {
      const updatedUsers = [...currentUsers, user];
      setKnownUsers(updatedUsers);
      storage.saveKnownUsers(updatedUsers);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
        toast.error("Kullanıcı adı ve şifre alanları boş bırakılamaz.");
        return;
    }
    const email = username.toLowerCase() + '@lgs.app';

    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      toast.error("Giriş başarısız. Kullanıcı adı veya şifre hatalı.");
    } else {
      playIntroSound(isMuted);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };
  
  const handleFirstTimeLogin = async () => {
     const finalName = tempName.trim().toUpperCase();
     const finalClassName = className.trim().toUpperCase();
     const finalCoachCode = coachCode.trim().toUpperCase();

     if (!finalName || !finalClassName || !finalCoachCode || !newPassword) {
         toast.error("Tüm alanları ve yeni şifrenizi doldurmalısınız.");
         return;
     }
     if (newPassword.length < 6) {
         toast.error("Şifreniz en az 6 karakter olmalıdır.");
         return;
     }

     const { error } = await supabase.rpc('ilk_ogrenci_girisi_ve_sifre_olustur', {
         p_ad_soyad: finalName,
         p_sinif: finalClassName,
         p_koc_kodu: finalCoachCode,
         p_yeni_sifre: newPassword
     });

     if (error) {
         toast.error(error.message);
         console.error("İlk giriş hatası:", error);
     } else {
         toast.success("Hesabın başarıyla oluşturuldu! Şimdi 'Giriş Yap' ekranından giriş yapabilirsin.");
     }
  };

  // =================================================================
  // YENİ EKLENEN ŞİFRE DEĞİŞTİRME FONKSİYONU
  // =================================================================
  const handleChangePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    // 1. Mevcut şifrenin doğru olup olmadığını kontrol et
    // Bunun için kullanıcının e-postasıyla tekrar giriş yapmayı deneriz.
    if (!session?.user.email) {
        toast.error("Kullanıcı oturumu bulunamadı.");
        return false;
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
        email: session.user.email,
        password: currentPassword
    });

    if (signInError) {
        playFailSound(isMuted);
        toast.error("Mevcut şifreniz yanlış!");
        return false;
    }

    // 2. Mevcut şifre doğruysa, yeni şifreyi ayarla
    const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword
    });
    
    if (updateError) {
        toast.error("Şifre güncellenirken bir hata oluştu.");
        console.error("Şifre güncelleme hatası:", updateError);
        return false;
    }

    playSuccessSound(isMuted);
    toast.success("Şifreniz başarıyla güncellendi!");
    return true;
  };

  const handleSwitchUser = async (userId: string) => {
    await handleLogout();
    const userToSwitch = knownUsers.find(u => u.userId === userId);
    if(userToSwitch) {
        const studentProfile = await supabase.from('ogrenciler').select('kullanici_adi').eq('baglanan_kullanici_id', userId).single();
        if(studentProfile.data?.kullanici_adi) {
            setUsername(studentProfile.data.kullanici_adi);
        }
    }
  };

  const handleRemoveKnownUser = (userIdToRemove: string) => {
    const updatedKnownUsers = knownUsers.filter(u => u.userId !== userIdToRemove);
    storage.saveKnownUsers(updatedKnownUsers);
    setKnownUsers(updatedKnownUsers);
    toast.info("Profil, cihazın hatırlananlar listesinden kaldırıldı.");
    if (profile?.id === userIdToRemove) {
      handleLogout();
    }
  };
  
  const showRegistration = () => {};

  return {
    session,
    profile,
    authLoading,
    userId: profile?.id ?? null,
    userName: profile?.ad_soyad ?? null,
    userRole: profile?.rol ?? null,
    
    knownUsers,
    showNameModal,
    
    username, setUsername,
    password, setPassword,
    newPassword, setNewPassword,
    tempName, setTempName,
    className, setClassName,
    coachCode, setCoachCode,
    
    handleLogin,
    handleLogout,
    handleFirstTimeLogin,
    handleSwitchUser,
    handleRemoveKnownUser,
    showRegistration,
    handleChangePassword, // Eklendi
  };
};