export const motivationalQuotes = [
  {
    text: "Hayatta en hakiki mürşit ilimdir, fendir.",
    author: "Mustafa Kemal Atatürk"
  },
  {
    text: "Başarı, hazırlık fırsatla buluştuğunda doğar.",
    author: "Anonim"
  },
  {
    text: "Bilim insanı olmak için yaratılıştan zeki olmak gerekmez, meraklı olmak yeterlidir.",
    author: "Aziz Sancar"
  },
  {
    text: "Küçük adımlar büyük yolculukların başlangıcıdır.",
    author: "Anonim"
  },
  {
    text: "Başarısızlık, başarının öğretmenidir.",
    author: "Anonim"
  },
  {
    text: "Vatanını en çok seven, görevini en iyi yapandır.",
    author: "Mustafa Kemal Atatürk"
  },
  {
    text: "Zafer, 'Zafer benimdir' diyebilenindir. Başarı ise, 'Başaracağım' diye başlayarak sonunda 'Başardım' diyebilenindir.",
    author: "Mustafa Kemal Atatürk"
  },

  // --- YENİ EKLENEN EĞLENCELİ SÖZLER ---
  {
    text: "Başarının sırrı mı? Google, bolca çay ve son teslim tarihinin paniği.",
    author: "Bir Bilge Öğrenci"
  },
  {
    text: "Unutma, beyin de bir kastır. Bugün biraz 'soru press' yapma zamanı!",
    author: "Anonim"
  },
  {
    text: "Hata yapmaktan korkma. Silgilerin bir üretim amacı var sonuçta.",
    author: "Anonim"
  },
  {
    text: "Tembellik, yorulmadan önce dinlenme sanatıdır. Ama sen yine de bir iki soru çöz, ne olur ne olmaz.",
    author: "Esprili Tembel"
  },
  {
    text: "Hayat bir oyunsa, LGS de 'boss fight' olsa gerek. Bol bol 'level' atla!",
    author: "Oyuncu Atasözü"
  },
  {
    text: "Her başarılı öğrencinin arkasında, bol miktarda kafein vardır.",
    author: "Anonim"
  },
  {
    text: "Bugünün işini yarına bırakma. Yarın yine bir sürü işin olacak zaten.",
    author: "Gerçekçi Panda"
  },
  {
    text: "Matematik, çözene kadar 'x'i bulmaya çalışıp, bulunca da 'bu ne işime yarayacak?' diye sormaktır.",
    author: "Anonim"
  }
];

export const getRandomQuote = () => {
  const randomIndex = Math.floor(Math.random() * motivationalQuotes.length);
  return motivationalQuotes[randomIndex];
};

export const getDailyQuote = () => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
  return motivationalQuotes[dayOfYear % motivationalQuotes.length];
};