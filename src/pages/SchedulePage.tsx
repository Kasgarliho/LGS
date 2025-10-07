import { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Activity, Flame, Users, Search } from 'lucide-react';
import { useAppContext } from './AppLayout';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { tr } from 'date-fns/locale';
import { avatars } from '@/data/avatars';
import { UserAvatars } from '@/types';

interface StudentSummary {
  student_user_id: string;
  student_name: string;
  student_class: string;
  weekly_questions: number;
  current_streak: number;
  last_active_date: string | null;
  avatar_url: UserAvatars; 
}

const defaultAvatar = avatars.find(a => a.id === 'default')?.image || '';

export default function SchedulePage() {
  const navigate = useNavigate();
  const { userId, userRole } = useAppContext();
  
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;

    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      
      let rpcCall;
      // GÜNCELLEME: Kullanıcı rolüne göre doğru fonksiyonu çağır
      if (userRole === 'admin') {
        rpcCall = supabase.rpc('get_all_students_summary');
      } else {
        rpcCall = supabase.rpc('get_coach_students_summary', { p_coach_user_id: userId });
      }

      const { data, error: rpcError } = await rpcCall;

      if (rpcError) {
        console.error("Öğrenci özeti çekilirken hata:", rpcError);
        setError("Öğrenci verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      } else if (data) {
        setStudents(data as StudentSummary[]);
      }
      setLoading(false);
    };

    fetchStudents();
  }, [userId, userRole]);

  const classNames = useMemo(() => {
    if (!students) return [];
    const uniqueClasses = [...new Set(students.map(s => s.student_class).filter(Boolean))];
    return uniqueClasses.sort();
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students
      .filter(student => selectedClass === 'all' || student.student_class === selectedClass)
      .filter(student => student.student_name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [students, searchTerm, selectedClass]);

  const formatLastActive = (dateString: string | null) => {
    if (!dateString) return "Bilinmiyor";
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true, locale: tr });
    } catch (e) {
      return "Geçersiz Tarih";
    }
  };

  const getAvatarImage = (avatarData: UserAvatars) => {
    const currentAvatarId = avatarData?.current || 'default';
    return avatars.find(a => a.id === currentAvatarId)?.image || defaultAvatar;
  };

  if (loading) {
    return <div className="text-center p-8">Öğrenci listesi yükleniyor...</div>;
  }

  if (error) {
    return <div className="text-center p-8 text-destructive">{error}</div>;
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-6 w-6 text-primary" />
            {userRole === 'admin' ? 'Tüm Öğrenciler' : 'Öğrencilerim'}
          </CardTitle>
          <CardDescription>Öğrencilerinin genel durumunu ve ilerlemelerini buradan takip et.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Öğrenci ara..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sınıf Seç" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Sınıflar</SelectItem>
                {classNames.map(className => (
                  <SelectItem key={className} value={className}>{className}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      
      {filteredStudents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStudents.map(student => (
            <Card 
              key={student.student_user_id}
              className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer"
              onClick={() => navigate(`/student/${student.student_user_id}`)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <img
                  src={getAvatarImage(student.avatar_url)}
                  alt={`${student.student_name} avatarı`}
                  className="w-16 h-16 rounded-full border-2 border-border"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{student.student_name}</h3>
                      <p className="text-xs px-2 py-0.5 bg-muted rounded-full inline-block">{student.student_class}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2" title="Haftalık Çözülen Soru Sayısı">
                      <Activity className="h-4 w-4 text-blue-500" />
                      <span>Haftalık: {student.weekly_questions || 0} soru</span>
                    </div>
                    <div className="flex items-center gap-2" title="Güncel Seri">
                      <Flame className="h-4 w-4 text-amber-500" />
                      <span>Seri: {student.current_streak || 0} gün</span>
                    </div>
                  </div>
                   <p className="text-xs text-muted-foreground pt-1">
                      Son aktiflik: {formatLastActive(student.last_active_date)}
                    </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted-foreground py-10">
          <p>Aradığınız kriterlere uygun öğrenci bulunamadı veya henüz öğrenciniz yok.</p>
        </div>
      )}
    </div>
  );
}