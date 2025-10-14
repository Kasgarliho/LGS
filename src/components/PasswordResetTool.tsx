// src/components/PasswordResetTool.tsx

import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/supabaseClient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { KeyRound, Search, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface StudentProfile {
  id: string;
  ad_soyad: string;
}

export default function PasswordResetTool() {
  const [students, setStudents] = useState<StudentProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<StudentProfile | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [isResetting, setIsResetting] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('kullanicilar')
        .select('id, ad_soyad')
        .eq('rol', 'ogrenci')
        .order('ad_soyad', { ascending: true });

      if (error) {
        toast.error("Öğrenci listesi yüklenemedi.");
        console.error(error);
      } else {
        setStudents(data || []);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    if (!searchTerm) return students;
    return students.filter(student =>
      student.ad_soyad.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const handleResetPassword = async () => {
    if (!selectedStudent) {
      toast.error("Lütfen bir öğrenci seçin.");
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      toast.error("Yeni şifre en az 6 karakter olmalıdır.");
      return;
    }

    setIsResetting(true);
    
    // === DEĞİŞİKLİK BURADA: Fonksiyon adı, sizin oluşturduğunuz doğru isimle güncellendi ===
    const { error } = await supabase.functions.invoke('admin-change-password', {
      body: {
        user_id: selectedStudent.id,
        new_password: newPassword,
      },
    });

    if (error) {
      toast.error(`Şifre sıfırlanırken hata oluştu: ${error.message}`);
    } else {
      toast.success(`${selectedStudent.ad_soyad} adlı öğrencinin şifresi başarıyla güncellendi.`);
      setNewPassword("");
      setSelectedStudent(null);
    }
    setIsResetting(false);
  };

  return (
    <Card className="shadow-card border-border/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <KeyRound className="h-5 w-5 text-primary" /> Yönetici Paneli: Şifre Sıfırlama
        </CardTitle>
        <CardDescription>
          Bir öğrencinin şifresini unuttuğunda buradan onun için yeni bir şifre belirleyebilirsiniz.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Student List Column */}
        <div className="flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Öğrenci ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="flex items-center justify-center h-72 rounded-md border p-2">
              <p>Öğrenciler yükleniyor...</p>
            </div>
          ) : (
            <ScrollArea className="h-72 rounded-md border p-2">
              <div className="space-y-1">
                {filteredStudents.map(student => (
                  <button
                    key={student.id}
                    onClick={() => {
                      setSelectedStudent(student);
                      setNewPassword("");
                    }}
                    className={cn(
                      "w-full text-left p-2 rounded-md flex items-center gap-2 transition-colors",
                      selectedStudent?.id === student.id
                        ? "bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    )}
                  >
                    <User className="h-4 w-4" /> {student.ad_soyad}
                  </button>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>

        {/* Password Reset Column */}
        <div className="flex flex-col justify-center items-center gap-4 p-4 bg-muted/50 rounded-lg min-h-[200px]">
          {selectedStudent ? (
            <>
              <h3 className="font-semibold text-lg text-center">
                {selectedStudent.ad_soyad}
              </h3>
              <p className="text-sm text-muted-foreground text-center -mt-2 mb-2">için yeni bir şifre belirleyin.</p>
              <Input
                type="text"
                placeholder="Yeni Şifre..."
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleResetPassword()}
              />
              <Button onClick={handleResetPassword} disabled={isResetting} className="w-full">
                {isResetting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isResetting ? "Sıfırlanıyor..." : "Şifreyi Değiştir"}
              </Button>
            </>
          ) : (
            <div className="text-center text-muted-foreground">
              <KeyRound className="h-10 w-10 mx-auto mb-4 text-gray-400" />
              <p>Lütfen listeden şifresini sıfırlamak istediğiniz öğrenciyi seçin.</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}