import { useState, useEffect } from 'react';
import { storage, KnownUser } from '@/utils/storage';
import { supabase } from '@/supabaseClient';
import { toast } from 'sonner';
import { playIntroSound } from '@/utils/sounds';

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
          storage.clearCurrentUserId();
          setUserId(null);
        }
        setShowNameModal(false);
        setShowProfileSelector(false);
        setAuthLoading(false);
      };
      fetchUserData();
    }
  }, [userId]);

  const handleRegistration = async () => {
    // =================================================================
    // DÜZELTME: Tüm giriş bilgilerini büyük harfe çevirerek standart hale getiriyoruz.
    // =================================================================
    const finalName = tempName.trim().toUpperCase();
    const finalClassName = className.trim().toUpperCase();
    const finalCoachCode = coachCode.trim().toUpperCase(); // Bu da artık büyük harf

    if (!finalName || !finalClassName || !finalCoachCode) {
        toast.error("Lütfen tüm alanları doldurun.");
        return;
    }
    try {
        const { data: coachData, error: coachError } = await supabase
            .from('koclar')
            .select('eposta')
            .ilike('koc_kodu', finalCoachCode) // .ilike zaten harf duyarsızdır, ama tutarlılık iyidir.
            .single();

        if (coachError || !coachData) {
            toast.error("Koç kodu bulunamadı. Lütfen kontrol et.");
            return;
        }
        const finalCoachEmail = coachData.eposta;

        const { data: studentData, error: studentError } = await supabase
            .from('ogrenciler')
            .select('*')
            .ilike('ad_soyad', finalName)
            .ilike('sinif', finalClassName)
            .ilike('koc_eposta', finalCoachEmail)
            .single();
            
        if (studentError || !studentData) {
            toast.error("Bilgiler eşleşmedi. Ad, sınıf ve koç kodunu kontrol et.");
            return;
        }

        let newUserId;
        const { data: existingUserData } = await supabase.from('kullanicilar').select('id').ilike('ad_soyad', finalName).ilike('koc_eposta', finalCoachEmail).maybeSingle();

        if (existingUserData) {
            newUserId = existingUserData.id;
        } else {
            const { data: newUserData, error: newUserError } = await supabase.from('kullanicilar').insert({ ad_soyad: finalName, koc_eposta: finalCoachEmail, rol: 'ogrenci' }).select('id').single();
            if (newUserError || !newUserData) {
                toast.error("Kullanıcı kimliği oluşturulurken bir hata oluştu.");
                throw newUserError || new Error("Yeni kullanıcı ID'si alınamadı.");
            }
            newUserId = newUserData.id;
        }
        
        await supabase.from('ogrenciler').update({ baglanan_kullanici_id: newUserId }).eq('id', studentData.id);

        storage.saveCurrentUserId(newUserId);
        storage.saveUserName(newUserId, studentData.ad_soyad);

        const currentKnownUsers = storage.loadKnownUsers();
        const isAlreadyKnown = currentKnownUsers.some(u => u.userId === newUserId);
        if (!isAlreadyKnown) {
          const updatedKnownUsers = [...currentKnownUsers, { userId: newUserId, userName: studentData.ad_soyad }];
          storage.saveKnownUsers(updatedKnownUsers);
        }
        
        setUserId(newUserId);
        toast.success(`Hoş geldin, ${studentData.ad_soyad}! Giriş başarılı.`);
        playIntroSound(isMuted);
        
        window.location.reload();

    } catch (error) {
        console.error("Kayıt sırasında beklenmedik hata:", error);
        toast.error("Giriş yapılırken bir hata oluştu. Lütfen internet bağlantını kontrol et.");
    }
  };

  const handleLogout = () => {
    storage.clearCurrentUserId();
    window.location.reload();
  };

  const handleSwitchUser = (newUserId: string) => {
    storage.saveCurrentUserId(newUserId);
    window.location.reload();
  };

  const showRegistration = () => {
    setShowProfileSelector(false);
    setShowNameModal(true);
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
    handleRegistration,
    handleLogout,
    handleSwitchUser,
    showRegistration,
  };
};