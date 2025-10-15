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
const getFriendlyErrorMessage = (message?: string) => {
    if (!message) return 'Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
    if (message.includes('Token has expired') || message.toLowerCase().includes('expired')) {
        return 'Bu şifre sıfırlama linkinin süresi dolmuş. Lütfen giriş sayfasından yeni bir tane isteyin.';
    }
    if (message.includes('Invalid token') || message.toLowerCase().includes('invalid')) {
        return 'Geçersiz bir link kullandınız. Lütfen e-postanızdaki linke doğru tıkladığınızdan emin olun.';
    }
    return 'Beklenmedik bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
};

export default function UpdatePasswordPage() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    useEffect(() => {
        let recoveryVerified = false;

        // 1) URL'den token/type kontrolü (bazı tarayıcı/gateway senaryolarında onAuthStateChange tetiklenmeyebilir)
        try {
            const params = new URL(window.location.href).searchParams;
            const type = params.get('type');
            const accessToken = params.get('access_token') || params.get('token'); // bazen token parametre ismi değişebilir
            if (type === 'recovery' && accessToken) {
                recoveryVerified = true;
                toast.info("Kimliğiniz doğrulandı, yeni şifrenizi belirleyebilirsiniz.");
            }
        } catch (e) {
            // ignore
        }

        // 2) Fallback: onAuthStateChange ile PASSWORD_RECOVERY bekle
        const { data } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'PASSWORD_RECOVERY' || event === 'USER_UPDATED') {
                if (session) {
                    recoveryVerified = true;
                    toast.info("Kimliğiniz doğrulandı, yeni şifrenizi belirleyebilirsiniz.");
                }
            }
        });

        const subscription = data?.subscription;

        // Eğer kısa sürede doğrulanmazsa hata göster
        const timer = setTimeout(() => {
            if (!recoveryVerified) {
                setError("Bu sayfaya erişim için geçerli bir şifre sıfırlama linki kullanmalısınız.");
            }
        }, 2000);

        return () => {
            // cleanup
            try {
                subscription?.unsubscribe();
            } catch (e) {
                // bazı sdk versiyonlarında farklı olabilir, güvenli fallback
                if (typeof data?.unsubscribe === 'function') data.unsubscribe();
            }
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
            toast.error(getFriendlyErrorMessage(updateError.message));
            setLoading(false);
            return;
        }

        toast.success('Şifren başarıyla güncellendi!');
        setIsSuccess(true);

        // Kısa bir bekleme sonrası yönlendir
        setTimeout(() => {
            navigate('/login');
        }, 1200);

        setLoading(false);
    };

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