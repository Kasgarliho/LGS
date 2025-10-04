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

// DÜZELTME: Arayüz, veritabanından gelen gerçek sütun adlarıyla eşleşecek şekilde güncellendi.
interface StudentSummary {
  student_user_id: string;
  student_name: string;
  student_class: string;       // 'sinif' -> 'student_class' olarak değiştirildi
  weekly_questions: number;    // 'weekly_progress' -> 'weekly_questions' olarak değiştirildi
  current_streak: number;      // 'seri' -> 'current_streak' olarak değiştirildi
  last_active_date: string;    // 'son_aktiflik' -> 'last_active_date' olarak değiştirildi
}

const defaultAvatar = '/avatars/default.png'; 

export default function SchedulePage() {
  const { userId } = useAppContext();
  const navigate = useNavigate();
  
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
      
      const { data, error: rpcError } = await supabase.rpc('get_coach_students_summary', {
        p_coach_user_id: userId
      });

      if (rpcError) {
        console.error("Öğrenci özeti çekilirken hata:", rpcError);
        setError("Öğrenci verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      } else if (data) {
        setStudents(data as StudentSummary[]);
      }
      setLoading(false);
    };

    fetchStudents();
  }, [userId]);

  const classNames = useMemo(() => {
    if (!students) return [];
    // DÜZELTME: 's.sinif' -> 's.student_class' olarak değiştirildi
    const uniqueClasses = [...new Set(students.map(s => s.student_class).filter(Boolean))];
    return uniqueClasses.sort();
  }, [students]);

  const filteredStudents = useMemo(() => {
    return students
      // DÜZELTME: 'student.sinif' -> 'student.student_class' olarak değiştirildi
      .filter(student => selectedClass === 'all' || student.student_class === selectedClass)
      .filter(student => student.student_name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [students, searchTerm, selectedClass]);


  const formatLastActive = (dateString: string) => {
    if (!dateString) return "Bilinmiyor";
    try {
      return formatDistanceToNow(parseISO(dateString), { addSuffix: true, locale: tr });
    } catch (e) {
      return "Geçersiz Tarih";
    }
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
            Öğrencilerim
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
                {/* DÜZELTME: Avatar URL'si veritabanından gelmediği için varsayılan avatar kullanılıyor */}
                <img
                  src={defaultAvatar}
                  alt={`${student.student_name} avatarı`}
                  className="w-16 h-16 rounded-full border-2 border-border"
                />
                <div className="flex-1 space-y-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold">{student.student_name}</h3>
                      {/* DÜZELTME: 'student.sinif' -> 'student.student_class' olarak değiştirildi */}
                      <p className="text-xs px-2 py-0.5 bg-muted rounded-full inline-block">{student.student_class}</p>
                    </div>
                  </div>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2" title="Haftalık Çözülen Soru Sayısı">
                      <Activity className="h-4 w-4 text-blue-500" />
                       {/* DÜZELTME: 'weekly_progress' -> 'weekly_questions' olarak değiştirildi */}
                      <span>Haftalık: {student.weekly_questions || 0} soru</span>
                    </div>
                    <div className="flex items-center gap-2" title="Güncel Seri">
                      <Flame className="h-4 w-4 text-amber-500" />
                       {/* DÜZELTME: 'seri' -> 'current_streak' olarak değiştirildi */}
                      <span>Seri: {student.current_streak || 0} gün</span>
                    </div>
                  </div>
                   <p className="text-xs text-muted-foreground pt-1">
                      {/* DÜZELTME: 'son_aktiflik' -> 'last_active_date' olarak değiştirildi */}
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