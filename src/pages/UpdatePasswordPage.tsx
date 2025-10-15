// src/pages/UpdatePasswordPage.tsx

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from 'sonner';
import { KeyRound, CheckCircle, AlertTriangle } from 'lucide-react';

// Kullanıcı dostu hata mesajları için bir yardımcı fonksiyon
const getFriendlyErrorMessage = (message: string) => {
    if (message.includes('Token has expired')) {
        return 'Bu şifre sıfırlama linkinin süresi dolmuş. Lütfen giriş sayfasından yeni bir tane isteyin.';
    }
    if (message.includes('Invalid token')) {
        return 'Geçersiz bir link kullandınız. Lütfen e-postanızdaki linke doğru tıkladığınızdan emin olun.';
    }
    return 'Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
};

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null); // Hata durumunu saklamak için

    const navigate = useNavigate();

    useEffect(() => {
        let recoveryVerified = false;

        const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
            // İYİLEŞTİRME: Sadece event'e değil, session'ın varlığına da bakıyoruz.
            if (event === 'PASSWORD_RECOVERY' && session) {
                recoveryVerified = true;
                toast.info("Kimliğiniz doğrulandı, yeni şifrenizi belirleyebilirsiniz.");
            }
        });
        
        // Kullanıcı sayfaya geldiğinde token geçersizse veya yoksa bir süre sonra hata gösterelim.
        const timer = setTimeout(() => {
            if (!recoveryVerified) {
                setError("Bu sayfaya erişim için geçerli bir şifre sıfırlama linki kullanmalısınız.");
            }
        }, 2000);

        return () => {
            subscription.unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    const handleUpdatePassword = async () => {
        if (password.length < 6) {
            toast.error('Şifre en az 6 karakter olmalıdır.');
            return;
        }
        if (password !== confirmPassword) {
            toast.error('Şifreler uyuşmuyor.');
            return;
        }

        setLoading(true);
        const { error: updateError } = await supabase.auth.updateUser({ password });

        if (updateError) {
            // İYİLEŞTİRME: Hata mesajlarını kullanıcı dostu hale getiriyoruz.
            toast.error(getFriendlyErrorMessage(updateError.message));
        } else {
            toast.success('Şifren başarıyla güncellendi!');
            setIsSuccess(true);
        }
        setLoading(false);
    };
    
    // Eğer bir yetkilendirme hatası varsa, ana formu gösterme
    if (error) {
         return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-slide-up">
                <Card className="w-full max-w-md text-center bg-card backdrop-blur-sm border border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <AlertTriangle className="h-6 w-6 text-destructive" />
                            Geçersiz Erişim
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">{error}</p>
                        <Button onClick={() => navigate('/login')} className="w-full">Giriş Sayfasına Dön</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-slide-up">
                <Card className="w-full max-w-md text-center bg-card backdrop-blur-sm border border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <CheckCircle className="h-6 w-6 text-success" />
                            Başarılı!
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-muted-foreground">Şifren başarıyla değiştirildi. Şimdi giriş ekranına yönlendiriliyorsun.</p>
                        <Button onClick={() => navigate('/login')} className="w-full">Giriş Yap</Button>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 animate-slide-up">
            <Card className="w-full max-w-md bg-card backdrop-blur-sm border border-border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <KeyRound className="h-6 w-6 text-primary"/>
                        Yeni Şifre Belirle
                    </CardTitle>
                    <CardDescription>
                        Hesabın için yeni bir şifre oluştur.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input 
                        type="password" 
                        placeholder="Yeni Şifren" 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input 
                        type="password" 
                        placeholder="Yeni Şifreni Tekrar Gir" 
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleUpdatePassword()}
                    />
                    <Button onClick={handleUpdatePassword} disabled={loading} className="w-full">
                        {loading ? 'Güncelleniyor...' : 'Şifreyi Güncelle'}
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}