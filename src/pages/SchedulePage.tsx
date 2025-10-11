import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search, User, TrendingUp, Calendar } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';

interface StudentSummary {
  student_id: string;
  student_name: string;
  student_class: string;
  total_points: number;
  current_streak: number;
  last_active_date: string | null;
}

const SchedulePage = () => {
  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      
      const { data, error: rpcError } = await supabase.rpc('get_all_students_summary');

      if (rpcError) {
        console.error("Öğrenci özeti çekilirken hata:", rpcError);
        setError("Öğrenci verileri yüklenemedi. Lütfen daha sonra tekrar deneyin.");
      } else {
        setStudents(data || []);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const filteredStudents = useMemo(() => {
    return students.filter(student =>
      student.student_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm]);

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Aktivite Yok";
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true, locale: tr });
  };

  return (
    <div className="space-y-6 animate-slide-up">
      <Card>
        <CardHeader>
          <CardTitle>Koç Paneli</CardTitle>
          <CardDescription>Sana atanan öğrencilerin genel durumunu buradan takip edebilirsin.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Öğrenci ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {loading && <p className="text-center text-muted-foreground py-4">Öğrenciler yükleniyor...</p>}
      {error && <p className="text-center text-destructive py-4">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStudents.length > 0 ? (
            filteredStudents.map(student => (
              <Link to={`/student/${student.student_id}`} key={student.student_id}>
                <Card className="hover:shadow-lg hover:border-primary/50 transition-all">
                  <CardHeader className="flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-muted rounded-full"><User className="h-5 w-5 text-muted-foreground" /></div>
                      <div>
                        <p className="font-bold">{student.student_name}</p>
                        <p className="text-sm text-muted-foreground">{student.student_class}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <span>{student.total_points || 0} Puan</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-amber-500" />
                      <span>Son aktivite: {formatDate(student.last_active_date)}</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))
          ) : (
            <p className="text-center text-muted-foreground md:col-span-2 py-10">
              {searchTerm ? "Arama kriterlerine uyan öğrenci bulunamadı." : "Sisteme kayıtlı öğrenciniz bulunmuyor."}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default SchedulePage;