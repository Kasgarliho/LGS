import { useEffect, useState, useMemo } from 'react';
import { supabase } from '@/supabaseClient';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { tr } from 'date-fns/locale';
import { User, Search, ChevronRight } from 'lucide-react';

interface Student {
  id: string;
  ad_soyad: string;
  sinif: string;
  son_aktif_tarih: string | null; // Bu alanı tekrar ekledik
}

export default function SchedulePage() {
  const [students, setStudents] = useState<Student[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [classFilter, setClassFilter] = useState('all');

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const { data, error } = await supabase.rpc('get_report_students'); 

      if (error) {
        console.error("Öğrenci listesi çekilirken hata:", error);
      } else {
        setStudents(data || []);
      }
      setLoading(false);
    };

    fetchStudents();
  }, []);

  const uniqueClasses = useMemo(() => {
    if (!students) return [];
    // Sınıf bilgisi null olabilecek ihtimale karşı filtreleme eklendi
    return [...new Set(students.map(student => student.sinif).filter(Boolean))].sort();
  }, [students]);

  const filteredStudents = useMemo(() => {
    if (!students) return [];
    let classFiltered = students;
    if (classFilter !== 'all') {
      classFiltered = students.filter(student => student.sinif === classFilter);
    }
    if (!searchTerm) {
      return classFiltered;
    }
    return classFiltered.filter(student =>
      student.ad_soyad.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [students, searchTerm, classFilter]);

  if (loading) {
    return <div className="text-center p-8">Öğrenci listesi yükleniyor...</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Raporlar (Öğrenci Listesi)</h1>
      
      <Card>
        <CardContent className="p-4 space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Öğrenci ara..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
                variant={classFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setClassFilter('all')}
            >
                Tümü
            </Button>
            {uniqueClasses.map(className => (
                <Button
                    key={className}
                    variant={classFilter === className ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setClassFilter(className)}
                >
                    {className}
                </Button>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <div className="space-y-3">
        {filteredStudents && filteredStudents.length > 0 ? (
          filteredStudents.map(student => (
            <Link to={`/student/${student.id}`} key={student.id}>
              <Card className="hover:bg-muted/50 transition-colors">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold">{student.ad_soyad}</p>
                      <p className="text-sm text-muted-foreground">
                        Sınıf: {student.sinif || 'Belirtilmemiş'}
                        {/* son_aktif_tarih bilgisi geri eklendi */}
                        {student.son_aktif_tarih && (
                          <span className="ml-2 text-xs">
                            (Son aktif: {formatDistanceToNow(new Date(student.son_aktif_tarih), { addSuffix: true, locale: tr })})
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </CardContent>
              </Card>
            </Link>
          ))
        ) : (
          <p className="text-center text-muted-foreground pt-8">
            Filtrelere uygun öğrenci bulunamadı.
          </p>
        )}
      </div>
    </div>
  );
}