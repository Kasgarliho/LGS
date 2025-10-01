import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/supabaseClient';
import { useAppContext } from './AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Flame, Clock, ChevronRight, Search, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface StudentSummary {
  student_user_id: string;
  student_name: string;
  student_class: string;
  weekly_questions: number;
  current_streak: number;
  last_active_date: string | null;
}

const WEEKLY_GOAL = 250;

export default function SchedulePage() {
  const navigate = useNavigate();
  const { userId } = useAppContext();
  const [allStudents, setAllStudents] = useState<StudentSummary[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all'); // YENİ: Seçili sınıfı tutan state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      const { data, error: rpcError } = await supabase.rpc('get_coach_students_summary', { p_coach_user_id: userId });

      if (rpcError) {
        console.error("Öğrenci özeti çekilirken hata:", rpcError);
        setError("Öğrenci verileri yüklenemedi.");
      } else if (data) {
        setAllStudents(data);
      }
      setLoading(false);
    };

    fetchStudents();
  }, [userId]);

  // YENİ: Öğrenci listesinden benzersiz sınıf adlarını al
  const classNames = useMemo(() => {
    const uniqueClasses = [...new Set(allStudents.map(student => student.student_class || 'Belirtilmemiş'))];
    return ['all', ...uniqueClasses.sort()];
  }, [allStudents]);

  // DÜZELTME: Bu blok artık gruplama yerine filtreleme yapıyor
  const filteredStudents = useMemo(() => {
    return allStudents
      .filter(student => 
        selectedClass === 'all' || (student.student_class || 'Belirtilmemiş') === selectedClass
      )
      .filter(student =>
        student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [allStudents, searchTerm, selectedClass]);

  const formatLastActive = (dateString: string | null) => {
    if (!dateString) return "Hiç aktif olmadı";
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: tr });
  };
  
  if (loading) { return <div className="text-center p-8">Öğrenci verileri yükleniyor...</div>; }
  if (error) { return <div className="text-center p-8 text-destructive">{error}</div>; }

  return (
    <div className="space-y-6 animate-slide-up">
      <Card>
        <CardHeader>
          <CardTitle>Koç Paneli</CardTitle>
          <CardDescription>Öğrencilerinin haftalık ilerlemesini buradan takip et.</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Öğrenci adıyla ara..."
              className="pl-9"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="relative flex items-center">
             <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
             <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="pl-9">
                  <SelectValue placeholder="Sınıf Seç..." />
                </SelectTrigger>
                <SelectContent>
                  {classNames.map(name => (
                    <SelectItem key={name} value={name}>
                      {name === 'all' ? 'Tüm Sınıflar' : name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
          </div>
        </CardContent>
      </Card>

      {/* DÜZELTME: Artık gruplama yok, doğrudan filtrelenmiş liste gösteriliyor */}
      {filteredStudents.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          <p>{searchTerm || selectedClass !== 'all' ? 'Filtreyle eşleşen öğrenci bulunamadı.' : 'Sisteme kayıtlı öğrencin bulunmuyor.'}</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredStudents.map(student => (
            <Card 
              key={student.student_user_id} 
              className="hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/coach/student/${student.student_user_id}`)}
            >
              <CardContent className="p-4 flex items-center gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-bold flex items-center gap-2">
                      <User className="h-5 w-5 text-muted-foreground" />
                      {student.student_name}
                    </h3>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                       <Clock className="h-3 w-3" /> {formatLastActive(student.last_active_date)}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                     <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-muted-foreground">Haftalık İlerleme</span>
                        <span className="font-bold">{student.weekly_questions} / {WEEKLY_GOAL} Soru</span>
                     </div>
                     <Progress value={(student.weekly_questions / WEEKLY_GOAL) * 100} />
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm pt-2">
                       <div className="flex items-center gap-2">
                          <Flame className="h-4 w-4 text-amber-500" />
                          <span className="font-semibold">{student.current_streak}</span>
                          <span className="text-muted-foreground">Günlük Seri</span>
                      </div>
                  </div>
                </div>
                <ChevronRight className="h-6 w-6 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}