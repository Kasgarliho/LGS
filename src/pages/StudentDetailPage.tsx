import { useEffect, useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/supabaseClient';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { ArrowLeft, CheckCircle, XCircle, ChevronDown, TrendingUp, TrendingDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface SubjectStat {
  subject_id: string;
  subject_name: string;
  total_questions: number;
  correct_questions: number;
  incorrect_questions: number;
}
interface ReportData {
  weekly_stats: SubjectStat[];
  overall_stats: SubjectStat[];
}
interface TopicStat {
    subject_id: string;
    subject_name: string;
    topic: string;
    total_correct: number;
    total_incorrect: number;
}

const PIE_COLORS = ['#00C49F', '#FF8042'];

export default function StudentDetailPage() {
  const { studentId } = useParams<{ studentId: string }>();
  const [report, setReport] = useState<ReportData | null>(null);
  const [topicReport, setTopicReport] = useState<TopicStat[]>([]);
  const [studentName, setStudentName] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [openSubjectId, setOpenSubjectId] = useState<string | null>(null);

  useEffect(() => {
    if (!studentId) return;

    const fetchReport = async () => {
      setLoading(true);
      const reportPromise = supabase.rpc('get_student_detailed_report', { p_student_user_id: studentId });
      const topicReportPromise = supabase.rpc('get_student_topic_report', { p_student_user_id: studentId });
      const userPromise = supabase.from('kullanicilar').select('ad_soyad').eq('id', studentId).single();

      const [reportResult, topicReportResult, userResult] = await Promise.all([reportPromise, topicReportPromise, userPromise]);

      if (reportResult.error) console.error("Detaylı rapor çekilirken hata:", reportResult.error);
      else setReport(reportResult.data);

      if (topicReportResult.error) console.error("Konu raporu çekilirken hata:", topicReportResult.error);
      else setTopicReport(topicReportResult.data || []);
      
      if (userResult.data) setStudentName(userResult.data.ad_soyad);
      
      setLoading(false);
    };

    fetchReport();
  }, [studentId]);
  
  const topicsBySubject = useMemo(() => {
    return topicReport.reduce((acc, topic) => {
        if (!acc[topic.subject_id]) {
            acc[topic.subject_id] = [];
        }
        acc[topic.subject_id].push(topic);
        return acc;
    }, {} as Record<string, TopicStat[]>);
  }, [topicReport]);

  if (loading) return <div className="text-center p-8">Öğrenci raporu yükleniyor...</div>;
  if (!report) return <div className="text-center p-8 text-destructive">Rapor verileri bulunamadı.</div>;
  
  const overallCorrect = report.overall_stats.reduce((sum, stat) => sum + stat.correct_questions, 0);
  const overallIncorrect = report.overall_stats.reduce((sum, stat) => sum + stat.incorrect_questions, 0);
  const pieData = [{ name: 'Doğru', value: overallCorrect }, { name: 'Yanlış', value: overallIncorrect }];

  return (
    <div className="space-y-6 animate-slide-up">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary">
        <ArrowLeft className="h-4 w-4" />
        Koç Paneline Geri Dön
      </Link>

      <Card><CardHeader><CardTitle className="text-2xl">{studentName}</CardTitle><CardDescription>Öğrencinin genel ve haftalık performans analizi.</CardDescription></CardHeader></Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Genel Başarı Oranı</CardTitle></CardHeader>
          <CardContent>{(overallCorrect + overallIncorrect) > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>{pieData.map((entry, index) => (<Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />))}</Pie><Tooltip /><Legend /></PieChart></ResponsiveContainer></div>) : (<p className="text-muted-foreground">Henüz veri yok.</p>)}</CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Bu Haftanın Özeti</CardTitle><CardDescription>Bu hafta çözülen soru sayıları (Derslere Göre)</CardDescription></CardHeader>
          <CardContent>{report.weekly_stats.reduce((sum, s) => sum + s.total_questions, 0) > 0 ? (<div className="h-64"><ResponsiveContainer width="100%" height="100%"><BarChart data={report.weekly_stats} layout="vertical"><XAxis type="number" hide /><YAxis type="category" dataKey="subject_name" width={80} stroke="hsl(var(--foreground))" /><Tooltip cursor={{ fill: 'hsl(var(--muted))' }} /><Bar dataKey="total_questions" name="Çözülen Soru" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} /></BarChart></ResponsiveContainer></div>) : (<p className="text-muted-foreground">Bu hafta henüz soru çözülmedi.</p>)}</CardContent>
        </Card>
      </div>
      
      <Card>
          <CardHeader><CardTitle>Genel Konu Analizi</CardTitle><CardDescription>Tüm zamanlardaki ders ve konu bazlı başarıyı görmek için derse tıkla.</CardDescription></CardHeader>
          <CardContent className="space-y-2">
              {report.overall_stats.map((stat) => {
                  const total = stat.correct_questions + stat.incorrect_questions;
                  const successRate = total > 0 ? Math.round((stat.correct_questions / total) * 100) : 0;
                  const isOpen = openSubjectId === stat.subject_id;
                  const subjectTopics = topicsBySubject[stat.subject_id] || [];
                  return (
                      <div key={stat.subject_id} className="p-3 bg-muted/50 rounded-lg">
                          <div className="flex items-center justify-between cursor-pointer" onClick={() => setOpenSubjectId(isOpen ? null : stat.subject_id)}>
                            <div className='flex-1'>
                                <h4 className="font-semibold">{stat.subject_name}</h4>
                                <div className="flex items-center justify-between text-sm mt-1">
                                    <div className="flex gap-4">
                                        <span className="flex items-center gap-1 text-green-500"><CheckCircle className="h-4 w-4" /> {stat.correct_questions}</span>
                                        <span className="flex items-center gap-1 text-red-500"><XCircle className="h-4 w-4" /> {stat.incorrect_questions}</span>
                                    </div>
                                    <span className={`font-bold ${successRate > 75 ? 'text-green-500' : successRate > 50 ? 'text-amber-500' : 'text-red-500'}`}>
                                      %{successRate} Başarı
                                    </span>
                                </div>
                            </div>
                             <ChevronDown className={cn(`h-5 w-5 transition-transform duration-300 ml-2`, isOpen ? 'rotate-180' : '')} />
                          </div>
                          {isOpen && (
                            <div className="mt-4 pt-4 border-t space-y-3">
                                {subjectTopics.length > 0 ? subjectTopics.map(topic => {
                                    const topicTotal = topic.total_correct + topic.total_incorrect;
                                    const topicRate = topicTotal > 0 ? (topic.total_correct / topicTotal) * 100 : 0;
                                    return (
                                        <div key={topic.topic} className="flex flex-col gap-2 p-2 bg-background/50 rounded-lg">
                                            <div className="flex justify-between items-center text-sm">
                                                <span className="font-medium">{topic.topic}</span>
                                                <span className="font-semibold">%{Math.round(topicRate)}</span>
                                            </div>
                                            <Progress value={topicRate} className="h-2" />
                                            <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                                <div className="flex items-center gap-1 text-green-500"><TrendingUp className="h-3 w-3" /> {topic.total_correct} Doğru</div>
                                                <div className="flex items-center gap-1 text-red-500"><TrendingDown className="h-3 w-3" /> {topic.total_incorrect} Yanlış</div>
                                            </div>
                                        </div>
                                    )
                                }) : <p className="text-sm text-muted-foreground text-center">Bu ders için henüz konu detayı bulunmuyor.</p>}
                            </div>
                          )}
                      </div>
                  )
              })}
          </CardContent>
        </Card>
    </div>
  );
}