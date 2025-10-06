import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Timer } from "lucide-react";

const LgsCountdown = () => {
  // LGS 2026 sınav tarihi (Haziran ayının ilk Pazarı olarak tahmin edilmiştir)
  const targetDate = new Date('2026-06-07T09:30:00');

  const calculateTimeLeft = () => {
    const difference = +targetDate - +new Date();
    let timeLeft = {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  // DÜZELTME: useEffect artık sadece bileşen ilk yüklendiğinde çalışacak
  // ve her saniye kendini tekrar render etmeyecek.
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // Bileşen ekrandan kaldırıldığında zamanlayıcıyı temizle
    return () => clearInterval(timer);
  }, []); // Boş dependency array, bu etkinin sadece bir kez çalışmasını sağlar

  return (
    <Card className="shadow-lg border-primary/20 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-2 text-white">
          <Timer className="h-5 w-5" />
          LGS'ye Kalan Süre
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-4 gap-2 md:gap-4 text-center">
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-3xl md:text-4xl font-bold">{timeLeft.days}</p>
          <p className="text-xs uppercase">Gün</p>
        </div>
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-3xl md:text-4xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</p>
          <p className="text-xs uppercase">Saat</p>
        </div>
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-3xl md:text-4xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</p>
          <p className="text-xs uppercase">Dakika</p>
        </div>
        <div className="bg-white/10 p-3 rounded-lg">
          <p className="text-3xl md:text-4xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</p>
          <p className="text-xs uppercase">Saniye</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LgsCountdown;