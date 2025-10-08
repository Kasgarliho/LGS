import { useState, useEffect } from 'react';
import { storage, KnownUser } from '@/utils/storage';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { playIntroSound, playSuccessSound, playFailSound } from '@/utils/sounds';

export const useAuth = (isMuted: boolean) => {
  const [userId, setUserId] = useState<string | null>(() => storage.loadCurrentUserId());
  const [userName, setUserName] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null);
  const [knownUsers, setKnownUsers] = useState<KnownUser[]>(() => storage.loadKnownUsers());
  const [showNameModal, setShowNameModal] = useState(false);
  const [showProfileSelector, setShowProfileSelector] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [tempName, setTempName] = useState("");
  const [className, setClassName] = useState("");
  const [coachCode, setCoachCode] = useState("");
  const [tempPassword, setTempPassword] = useState("");

  useEffect(() => {
    const known = storage.loadKnownUsers();
    setKnownUsers(known);
    setAuthLoading(true);

    if (!userId) {
      if (known.length > 0) {
        setShowProfileSelector(true);
        setShowNameModal(false);
      } else {
        setShowProfileSelector(false);
        setShowNameModal(true);
      }
      setAuthLoading(false);
    } else {
      const fetchUserData = async () => {
        const { data, error } = await supabase
          .from('kullanicilar')
          .select('ad_soyad, rol')
          .eq('id', userId)
          .single();

        if (data) {
          setUserName(data.ad_soyad);
          setUserRole(data.rol);
        } else {
          console.error("Kullanıcı verisi çekilemedi, oturum sonlandırılıyor:", error);
          handleLogout(true);
        }
        setShowNameModal(false);
        setShowProfileSelector(false);
        setAuthLoading(false);
      };
      fetchUserData();
    }
  }, [userId]);

  const loginUser = (newUserId: string, newUserName: string) => {
    storage.saveCurrentUserId(newUserId);
    storage.saveUserName(newUserId, newUserName);

    const currentKnownUsers = storage.loadKnownUsers();
    const isAlreadyKnown = currentKnownUsers.some(u => u.userId === newUserId);
    if (!isAlreadyKnown) {
      const updatedKnownUsers = [...currentKnownUsers, { userId: newUserId, userName: newUserName }];
      storage.saveKnownUsers(updatedKnownUsers);
    }
    
    setUserId(newUserId);
    toast.success(`Hoş geldin, ${newUserName}! Giriş başarılı.`);
    playIntroSound(isMuted);
    
    window.location.reload();
  };

  // =================================================================
  // GÜNCELLENEN ÖĞRENCİ GİRİŞ FONKSİYONU
  // =================================================================
  const handleStudentRegistration = async () => {
    const finalName = tempName.trim().toUpperCase();
    const finalClassName = className.trim().toUpperCase();
    const finalCoachCode = coachCode.trim().toUpperCase();

    if (!finalName || !finalClassName || !finalCoachCode) {
        toast.error("Lütfen tüm alanları doldurun.");
        return;
    }
    try {
        const { data: coachData, error: coachError } = await supabase.from('koclar').select('eposta').ilike('koc_kodu', finalCoachCode).single();
        if (coachError || !coachData) {
            toast.error("Koç kodu bulunamadı. Lütfen kontrol et.");
            return;
        }
        const finalCoachEmail = coachData.eposta;

        // 1. Adım: Öğrenciyi 'ogrenciler' tablosunda bul.
        const { data: studentData, error: studentError } = await supabase
            .from('ogrenciler')
            .select('id, ad_soyad, baglanan_kullanici_id') // baglanan_kullanici_id'yi de alıyoruz
            .ilike('ad_soyad', finalName)
            .ilike('sinif', finalClassName)
            .ilike('koc_eposta', finalCoachEmail)
            .single();

        if (studentError || !studentData) {
            toast.error("Bilgiler eşleşmedi. Ad, sınıf ve koç kodunu kontrol et.");
            return;
        }

        let userIdToLogin;

        // 2. Adım: Öğrencinin zaten bağlanmış bir kullanıcı ID'si var mı diye kontrol et.
        if (studentData.baglanan_kullanici_id) {
            // Eğer varsa, yeni kullanıcı oluşturma, mevcut ID'yi kullan.
            userIdToLogin = studentData.baglanan_kullanici_id;
        } else {
            // Eğer yoksa (ilk giriş), o zaman yeni bir kullanıcı oluştur.
            const { data: newUserData, error: newUserError } = await supabase.from('kullanicilar').insert({ 
                ad_soyad: finalName, 
                koc_eposta: finalCoachEmail, // İlk kayıttaki koç mailini kullan
                rol: 'ogrenci' 
            }).select('id').single();
            
            if (newUserError || !newUserData) { throw newUserError || new Error("Yeni kullanıcı ID'si alınamadı."); }
            
            userIdToLogin = newUserData.id;
            
            // Yeni kullanıcı ID'sini 'ogrenciler' tablosuna bağla.
            await supabase.from('ogrenciler').update({ baglanan_kullanici_id: userIdToLogin }).eq('id', studentData.id);
        }
        
        // Bulunan veya yeni oluşturulan ID ile kullanıcıyı sisteme giriş yaptır.
        loginUser(userIdToLogin, studentData.ad_soyad);

    } catch (error) {
        console.error("Öğrenci kaydı sırasında beklenmedik hata:", error);
        toast.error("Giriş yapılırken bir hata oluştu. Lütfen internet bağlantını kontrol et.");
    }
  };
  // =================================================================

  const handleCoachRegistration = async () => {
    const finalCoachCode = coachCode.trim().toUpperCase();
    const finalPassword = tempPassword.trim();

    if (!finalCoachCode || !finalPassword) {
      toast.error("Lütfen koç kodu ve şifreyi girin.");
      return;
    }
    try {
      const { data: coachData, error: coachError } = await supabase.from('koclar').select('eposta').ilike('koc_kodu', finalCoachCode).single();
      if (coachError || !coachData) {
        toast.error("Koç kodu bulunamadı. Lütfen kontrol et.");
        return;
      }
      
      const { data: userData, error: userError } = await supabase
        .from('kullanicilar')
        .select('id, ad_soyad, sifre')
        .eq('koc_eposta', coachData.eposta)
        .in('rol', ['koç', 'admin', 'Hoca'])
        .single();
        
      if(userError || !userData) {
        toast.error("Bu koç koduna ait bir kullanıcı hesabı bulunamadı.");
        return;
      }

      if (userData.sifre !== finalPassword) {
        toast.error("Şifre yanlış!");
        return;
      }
      
      loginUser(userData.id, userData.ad_soyad);

    } catch(error) {
      console.error("Koç/Admin girişi sırasında beklenmedik hata:", error);
      toast.error("Giriş yapılırken bir hata oluştu.");
    }
  };

  const handleChangePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!userId) {
      toast.error("Kullanıcı bulunamadı.");
      return false;
    }
    
    const { data: userData, error: fetchError } = await supabase
      .from('kullanicilar')
      .select('sifre')
      .eq('id', userId)
      .single();
    
    if (fetchError || !userData) {
      toast.error("Kullanıcı verileri alınamadı.");
      return false;
    }
    
    if (userData.sifre !== currentPassword) {
      playFailSound(isMuted);
      toast.error("Mevcut şifre yanlış!");
      return false;
    }

    const { error: updateError } = await supabase
      .from('kullanicilar')
      .update({ sifre: newPassword })
      .eq('id', userId);

    if (updateError) {
      toast.error("Şifre güncellenirken bir hata oluştu.");
      console.error("Şifre güncelleme hatası:", updateError);
      return false;
    }

    playSuccessSound(isMuted);
    toast.success("Şifreniz başarıyla güncellendi!");
    return true;
  };

  const handleLogout = (reloadPage = false) => {
    storage.clearCurrentUserId();
    if (reloadPage) {
      window.location.reload();
    } else {
      window.location.href = '/';
    }
  };

  const handleSwitchUser = (newUserId: string) => {
    storage.saveCurrentUserId(newUserId);
    window.location.reload();
  };

  const showRegistration = () => {
    setShowProfileSelector(false);
    setShowNameModal(true);
  };

  const handleRemoveKnownUser = (userIdToRemove: string) => {
    const updatedKnownUsers = knownUsers.filter(u => u.userId !== userIdToRemove);
    storage.saveKnownUsers(updatedKnownUsers);
    setKnownUsers(updatedKnownUsers);
    storage.removeAllUserData(userIdToRemove);
    toast.info("Profil cihazdan kaldırıldı.");
    if (userId === userIdToRemove) {
      handleLogout(true);
    }
  };

  return {
    userId,
    userName,
    userRole,
    authLoading,
    knownUsers,
    showNameModal,
    setShowNameModal,
    showProfileSelector,
    tempName,
    setTempName,
    className,
    setClassName,
    coachCode,
    setCoachCode,
    tempPassword,
    setTempPassword,
    handleStudentRegistration,
    handleCoachRegistration,
    handleChangePassword,
    handleLogout,
    handleSwitchUser,
    showRegistration,
    handleRemoveKnownUser,
  };
};