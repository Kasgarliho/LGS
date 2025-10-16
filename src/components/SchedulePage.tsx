import { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from 'sonner';
import { User, Search, ChevronRight, Target, Star, Flame } from 'lucide-react'; // Yeni ikonlar eklendi
import { avatars } from '@/data/avatars';
import { UserAvatars } from '@/types';

// Arayüzde kullanılacak Student tipini güncelliyoruz
interface Student {
  user_id: string;
  user_name: string;
  user_avatar: UserAvatars | null;
  user_class: string;
  last_active: string | null;
  total_questions: number;
  total_points: number;
  current_streak: number;
}

const defaultAvatar = avatars.find(a => a.id === 'default')?.image || '';

const getAvatarImage = (avatarData: UserAvatars | null) => {
    const currentAvatarId = avatarData?.current || 'default';
    return avatars.find(a => a.id === currentAvatarId)?.image || defaultAvatar;
};

export default function SchedulePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      
      const { data, error } = await supabase.rpc('get_my_students');

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
      student.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.user_class.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Öğrenci Paneli</CardTitle>
          <CardDescription>Öğrencilerinizin genel durumunu ve ilerlemesini bir bakışta görün.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Öğrenci veya sınıf ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <ScrollArea className="h-[60vh] rounded-md border">
            <div className="p-2 space-y-1">
              {loading ? (
                <p className="text-center text-muted-foreground p-4">Yükleniyor...</p>
              ) : filteredStudents.length === 0 ? (
                <p className="text-center text-muted-foreground p-4">Gösterilecek öğrenci bulunamadı.</p>
              ) : (
                filteredStudents.map(student => (
                  <Link
                    key={student.user_id}
                    to={`/student/${student.user_id}`}
                    className="block p-3 rounded-lg hover:bg-muted transition-colors border-b"
                  >
                    <div className="flex items-center justify-between">
                      {/* Sol Taraf: Avatar ve İsim */}
                      <div className="flex items-center gap-4">
                        <img
                          src={getAvatarImage(student.user_avatar)}
                          alt={student.user_name}
                          className="w-12 h-12 rounded-full border-2 border-border"
                        />
                        <div>
                          <p className="font-semibold">{student.user_name}</p>
                          <p className="text-sm text-muted-foreground">{student.user_class}</p>
                        </div>
                      </div>
                      {/* Sağ Taraf: Ok ikonu */}
                      <ChevronRight className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                    </div>
                    {/* Alt Kısım: Yeni Eklenen İstatistikler */}
                    <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                        <div className="flex flex-col items-center justify-center bg-muted/50 p-2 rounded-md">
                            <Target className="h-4 w-4 text-muted-foreground mb-1"/>
                            <p className="text-sm font-bold">{student.total_questions}</p>
                            <p className="text-xs text-muted-foreground">Soru</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-muted/50 p-2 rounded-md">
                            <Star className="h-4 w-4 text-muted-foreground mb-1"/>
                            <p className="text-sm font-bold">{student.total_points}</p>
                            <p className="text-xs text-muted-foreground">Puan</p>
                        </div>
                        <div className="flex flex-col items-center justify-center bg-muted/50 p-2 rounded-md">
                            <Flame className="h-4 w-4 text-muted-foreground mb-1"/>
                            <p className="text-sm font-bold">{student.current_streak}</p>
                            <p className="text-xs text-muted-foreground">Seri</p>
                        </div>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}