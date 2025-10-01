import { useEffect, useState } from 'react';
import { supabase } from '@/supabaseClient';
import { useAppContext } from './AppLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { User, Flame, Clock, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

interface StudentSummary {
  student_user_id: string;
  student_name: string;
  weekly_questions: number;
  current_streak: number;
  last_active_date: string | null;
}

const WEEKLY_GOAL = 250;

export default function SchedulePage() {
  const navigate = useNavigate();
  const context = useAppContext();
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userId = context?.userId;

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase.rpc('get_coach_students_summary', {
        p_coach_user_id: userId
      });

      if (rpcError) {
        console.error("Öğrenci özeti çekilirken hata:", rpcError);
        setError("Öğrenci verileri yüklenemedi.");
      } else if (data) {
        setStudents(data);
      }
      setLoading(false);
    };

    fetchStudents();
  }, [userId]);

  const formatLastActive = (dateString: string | null) => {
    if (!dateString) return "Hiç aktif olmadı";
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: tr });
  };
  
  if (!context || loading) {
    return <div className="text-center p-8">Öğrenci verileri yükleniyor...</div>;
  }
  
  if (error) {
    return <div className="text-center p-8 text-destructive">{error}</div>;
  }

  return (
    <div className="space-y-6 animate-slide-up">
      <Card>
        <CardHeader>
          <CardTitle>Koç Paneli</CardTitle>
          <CardDescription>Öğrencilerinin haftalık ilerlemesini buradan takip et.</CardDescription>
        </CardHeader>
      </Card>

      {students.length === 0 ? (
        <div className="text-center text-muted-foreground py-10">
          <p>Sisteme kayıtlı öğrencin bulunmuyor.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {students.map(student => (
            <Card 
              key={student.student_user_id} 
              className="hover:bg-muted/50 transition-colors cursor-pointer"
              onClick={() => navigate(`/student/${student.student_user_id}`)}
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