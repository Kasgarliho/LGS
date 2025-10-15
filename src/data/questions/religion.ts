import { Question } from "@/types";

export const religionQuestions: Question[] = [
  {
    id: 'og_din_1', subjectId: 'religion', topic: 'Kader ve Kaza', difficulty: 'easy',
    question: 'Allah’ın her şeyi bir ölçü ve düzene göre yaratmasına ne denir?',
    options: ['Kaza', 'Kader', 'Ecel', 'Tevekkül'], correctAnswer: 1,
    explanation: 'Kader, Allah\'ın evrende olacak her şeyi önceden bilmesi ve takdir etmesidir.'
  },
  {
    id: 'og_din_2', subjectId: 'religion', topic: 'Zekat ve Sadaka', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisine zekat verilmez?',
    options: ['Fakir komşuya', 'İhtiyaç sahibi öğrenciye', 'Anne, baba ve çocuklara', 'Borçlulara'], correctAnswer: 2,
    explanation: 'İslam dinine göre zekat, usul ve füru\'a (anne, baba, dede, nine, çocuk, torun gibi yakın akrabalara) verilmez.'
  },
  {
    id: 'og_din_3', subjectId: 'religion', topic: 'Din ve Hayat', difficulty: 'medium',
    question: 'Peygamberlerin Allah’tan aldıkları mesajları insanlara eksizsiz olarak bildirmelerine ne ad verilir?',
    options: ['Sıdk (Doğruluk)', 'Emanet (Güvenilirlik)', 'Fetanet (Akıllı olmak)', 'Tebliğ (Bildirme)'], correctAnswer: 3,
    explanation: 'Peygamberlerin ilahi mesajları insanlara ulaştırma görevi Tebliğ olarak adlandırılır.'
  },
  {
    id: 'og_din_4', subjectId: 'religion', topic: 'İnanç Esasları', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi İslam\'ın şartlarından biri değildir?',
    options: ['Şehadet getirmek', 'Namaz kılmak', 'Oruç tutmak', 'Kitaplara inanmak'], correctAnswer: 3,
    explanation: 'Kitaplara inanmak, İslam\'ın değil, İmanın şartlarındandır.'
  },
  {
    id: 'og_din_5', subjectId: 'religion', topic: 'Kur\'an-ı Kerim', difficulty: 'medium',
    question: 'Kur\'an-ı Kerim\'in indiriliş süresi yaklaşık kaç yıldır?',
    options: ['10 yıl', '23 yıl', '40 yıl', '12 yıl'], correctAnswer: 1,
    explanation: 'Kur\'an-ı Kerim, Hz. Muhammed\'e peygamberliğinin başladığı 610 yılından vefat ettiği 632 yılına kadar yaklaşık 23 yılda indirilmiştir.'
  },
  {
    id: 'og_din_6', subjectId: 'religion', topic: 'İnanç Esasları', difficulty: 'easy',
    question: '“Allah’ın varlığı ve birliği, eşi ve benzeri olmaması” inancı aşağıdakilerden hangisiyle ilgilidir?',
    options: ['Tevhid', 'Nübüvvet', 'Ahiret', 'İhsan'],
    correctAnswer: 0,
    explanation: 'Tevhid, Allah\'ın tek ve eşsiz olduğu inancıdır.'
  },
  {
    id: 'og_din_7', subjectId: 'religion', topic: 'İbadetler', difficulty: 'easy',
    question: 'İslam’ın şartlarından biri aşağıdakilerden hangisidir?',
    options: ['İman', 'Namaz', 'İhsan', 'Sabır'],
    correctAnswer: 1,
    explanation: 'Namaz, İslam\'ın beş temel şartından biridir.'
  },
  {
    id: 'og_din_8', subjectId: 'religion', topic: 'Hac', difficulty: 'medium',
    question: 'Hac ibadeti hangi ayda yapılır?',
    options: ['Recep', 'Ramazan', 'Şaban', 'Zilhicce'],
    correctAnswer: 3,
    explanation: 'Hac ibadeti, Hicri takvimin son ayı olan Zilhicce ayında yapılır.'
  },
  {
    id: 'og_din_9', subjectId: 'religion', topic: 'Ahlak', difficulty: 'easy',
    question: '“İnsanların doğuştan sahip oldukları haklar” aşağıdaki kavramlardan hangisini ifade eder?',
    options: ['Kul hakkı', 'Doğal hak', 'Adalet', 'Merhamet'],
    correctAnswer: 1,
    explanation: 'Doğal haklar, insanların doğuştan kazandığı, kimseye ait olmayan haklardır.'
  },
  {
    id: 'og_din_10', subjectId: 'religion', topic: 'Helal ve Haram', difficulty: 'easy',
    question: 'İslam’a göre aşağıdakilerden hangisi helaldir?',
    options: ['Faiz', 'Kumar', 'Zekât', 'İçki'],
    correctAnswer: 2,
    explanation: 'Zekât, İslam\'da ibadet olarak kabul edilen ve helal olan bir davranıştır.'
  },
  {
    id: 'og_din_11', subjectId: 'religion', topic: 'Kur\'an-ı Kerim', difficulty: 'easy',
    question: 'Kur’an-ı Kerim’in ilk suresi aşağıdakilerden hangisidir?',
    options: ['Fatiha', 'Bakara', 'İhlas', 'Nas'],
    correctAnswer: 0,
    explanation: 'Kur’an-ı Kerim, Fatiha suresi ile başlar.'
  },
  {
    id: 'og_din_12', subjectId: 'religion', topic: 'Peygamberlik', difficulty: 'easy',
    question: 'Peygamberlerin gönderiliş amacı aşağıdakilerden hangisidir?',
    options: ['İnsanların zenginleşmesini sağlamak', 'İnsanlara doğru yolu göstermek', 'Dünyada rahat yaşamayı öğretmek', 'İnsanların ömürlerini uzatmak'],
    correctAnswer: 1,
    explanation: 'Peygamberler, insanlara Allah\'ın emir ve yasaklarını bildirerek doğru yolu göstermek için gönderilmiştir.'
  },
  {
    id: 'og_din_13', subjectId: 'religion', topic: 'Hz. Muhammed', difficulty: 'easy',
    question: 'Hz. Muhammed’in çocukluk yıllarındaki dürüstlüğü nedeniyle kendisine verilen unvan hangisidir?',
    options: ['El-Emîn', 'El-Fetih', 'El-Hakîm', 'El-Müctehid'],
    correctAnswer: 0,
    explanation: 'Hz. Muhammed, dürüstlüğünden dolayı "El-Emîn" (Güvenilir) unvanını almıştır.'
  },
  {
    id: 'og_din_14', subjectId: 'religion', topic: 'Günahlar', difficulty: 'medium',
    question: 'İslam’a göre aşağıdakilerden hangisi “büyük günah” kabul edilir?',
    options: ['Namaz kılmak', 'Oruç tutmak', 'Yalan söylemek', 'Hırsızlık yapmak'],
    correctAnswer: 3,
    explanation: 'Hırsızlık yapmak, İslam\'da büyük günahlardan biri olarak kabul edilir.'
  },
  {
    id: 'og_din_15', subjectId: 'religion', topic: 'İslam ve Toplum', difficulty: 'medium',
    question: '“Din ve vicdan özgürlüğü” ile en çok ilişkili ilke hangisidir?',
    options: ['Laiklik', 'Milliyetçilik', 'Devletçilik', 'Halkçılık'],
    correctAnswer: 0,
    explanation: 'Laiklik, devletin din ve vicdan işlerinde tarafsız olması ilkesidir.'
  },
  {
    id: 'og_din_16', subjectId: 'religion', topic: 'Ahlak', difficulty: 'medium',
    question: '“İyiliği emretmek, kötülükten sakındırmak” ifadesi hangi kavramla açıklanır?',
    options: ['Takva', 'Tevazu', 'Emr-i bi’l-maruf', 'İhsan'],
    correctAnswer: 2,
    explanation: 'Emr-i bi’l-maruf, iyiliği emretmek, kötülükten sakındırmak anlamına gelir.'
  },
  {
    id: 'og_din_17', subjectId: 'religion', topic: 'Zekat', difficulty: 'easy',
    question: 'Zekât kimlere verilemez?',
    options: ['Fakirlere', 'Borçlulara', 'Yolculara', 'Zenginlere'],
    correctAnswer: 3,
    explanation: 'Zekat, ihtiyaç sahibi olanlara verilir, zenginlere verilmez.'
  },
  {
    id: 'og_din_18', subjectId: 'religion', topic: 'Kur\'an-ı Kerim', difficulty: 'easy',
    question: 'İslam’a göre ilk emir aşağıdakilerden hangisidir?',
    options: ['Oku', 'Koru', 'Dinle', 'Çalış'],
    correctAnswer: 0,
    explanation: 'Kur’an-ı Kerim\'in ilk ayetinde Hz. Muhammed\'e "Oku" emri gelmiştir.'
  },
  {
    id: 'og_din_19', subjectId: 'religion', topic: 'Hz. Muhammed', difficulty: 'easy',
    question: 'Peygamberimizin doğduğu şehir aşağıdakilerden hangisidir?',
    options: ['Medine', 'Mekke', 'Kudüs', 'Taif'],
    correctAnswer: 1,
    explanation: 'Hz. Muhammed 571 yılında Mekke\'de doğmuştur.'
  },
  {
    id: 'og_din_20', subjectId: 'religion', topic: 'İbadetler', difficulty: 'easy',
    question: 'Kurban ibadeti hangi dini bayramda yapılır?',
    options: ['Ramazan Bayramı', 'Kurban Bayramı', 'Mevlid Kandili', 'Berat Kandili'],
    correctAnswer: 1,
    explanation: 'Kurban ibadeti, Kurban Bayramı\'nda yapılır.'
  },
  {
    id: 'og_din_21', subjectId: 'religion', topic: 'Ahlak', difficulty: 'medium',
    question: 'Aşağıdaki kavramlardan hangisi “Allah’a karşı sorumluluk bilinciyle yaşamak” demektir?',
    options: ['İhsan', 'Takva', 'İhlas', 'Tevekkül'],
    correctAnswer: 1,
    explanation: 'Takva, Allah\'ın emir ve yasaklarına karşı sorumlu davranma bilincidir.'
  },
  {
    id: 'og_din_22', subjectId: 'religion', topic: 'İslam ve Kaynakları', difficulty: 'medium',
    question: '“İslam dininin temel kaynakları” arasında aşağıdakilerden hangisi yer almaz?',
    options: ['Kur’an', 'Sünnet', 'Hadis', 'Anayasa'],
    correctAnswer: 3,
    explanation: 'Anayasa, İslam dininin temel kaynaklarından biri değildir.'
  },
  {
    id: 'og_din_23', subjectId: 'religion', topic: 'Hz. Muhammed', difficulty: 'easy',
    question: 'Hz. Muhammed’in doğum günü hangi gece kutlanır?',
    options: ['Miraç Kandili', 'Mevlid Kandili', 'Berat Kandili', 'Kadir Gecesi'],
    correctAnswer: 1,
    explanation: 'Hz. Muhammed\'in doğum günü Mevlid Kandili olarak kutlanır.'
  },
  {
    id: 'og_din_24', subjectId: 'religion', topic: 'Ahlak', difficulty: 'easy',
    question: 'Aşağıdaki davranışlardan hangisi “kul hakkına girmek”tir?',
    options: ['Oruç tutmak', 'Başkasının malını izinsiz almak', 'Sadaka vermek', 'Selamlaşmak'],
    correctAnswer: 1,
    explanation: 'Başkasının malını izinsiz almak, kul hakkına girmektir.'
  },
  {
    id: 'og_din_25', subjectId: 'religion', topic: 'Ahiret', difficulty: 'easy',
    question: '“İnsanların iyi veya kötü amellerinin karşılığını göreceği hayat” hangi kavramla ifade edilir?',
    options: ['Dünya', 'Ahiret', 'Fıtrat', 'Nübüvvet'],
    correctAnswer: 1,
    explanation: 'Ahiret, bu dünya hayatından sonra başlayacak ve amellerin karşılığının görüleceği ebedi hayattır.'
  },
  {
    id: 'og_din_26', subjectId: 'religion', topic: 'Helal ve Haram', difficulty: 'easy',
    question: 'İslam’a göre aşağıdakilerden hangisi haram değildir?',
    options: ['Faiz', 'Kumar', 'Çalışmak', 'İçki'],
    correctAnswer: 2,
    explanation: 'Çalışmak, İslam\'da teşvik edilen bir davranıştır, haram değildir.'
  },
  {
    id: 'og_din_27', subjectId: 'religion', topic: 'Kur\'an-ı Kerim', difficulty: 'medium',
    question: 'Kur’an-ı Kerim aşağıdaki hangi halife döneminde çoğaltılmıştır?',
    options: ['Hz. Ebubekir', 'Hz. Ömer', 'Hz. Osman', 'Hz. Ali'],
    correctAnswer: 2,
    explanation: 'Kur\'an, Hz. Osman döneminde farklı lehçelerde okunmasını önlemek amacıyla çoğaltılmıştır.'
  },
  {
    id: 'og_din_28', subjectId: 'religion', topic: 'Peygamberlik', difficulty: 'medium',
    question: '“Allah’ın peygamberler aracılığıyla insanlara gönderdiği buyruklar” ne olarak adlandırılır?',
    options: ['Sünnet', 'Vahiy', 'Hadis', 'Kıyas'],
    correctAnswer: 1,
    explanation: 'Vahiy, Allah\'ın, peygamberleri aracılığıyla insanlara gönderdiği ilahi mesajlardır.'
  },
  {
    id: 'og_din_29', subjectId: 'religion', topic: 'Ahlak', difficulty: 'easy',
    question: 'İslam’a göre “sabır” aşağıdakilerden hangisini ifade eder?',
    options: ['Şikâyet etmek', 'Zorluklara dayanmak', 'Haksızlık yapmak', 'Umutsuz olmak'],
    correctAnswer: 1,
    explanation: 'Sabır, karşılaşılan zorluklara ve sıkıntılara dayanmak anlamına gelir.'
  },
  {
    id: 'og_din_30', subjectId: 'religion', topic: 'Tarih', difficulty: 'easy',
    question: 'Hz. Muhammed’in Medine’ye hicretiyle birlikte kurulan ilk İslam devleti aşağıdakilerden hangisidir?',
    options: ['Emeviler', 'Abbâsiler', 'Medine İslam Devleti', 'Osmanlılar'],
    correctAnswer: 2,
    explanation: 'Hz. Muhammed\'in hicretinden sonra Medine\'de kurulan devletin adı, Medine İslam Devleti\'dir.'
  },
  {
    id: 'og_din_31', subjectId: 'religion', topic: 'Kur\'an-ı Kerim', difficulty: 'easy',
    question: 'Kadir Gecesi hangi ayın içinde yer alır?',
    options: ['Şaban', 'Recep', 'Ramazan', 'Muharrem'],
    correctAnswer: 2,
    explanation: 'Kadir Gecesi, Ramazan ayı içinde yer alan mübarek bir gecedir.'
  },
  {
    id: 'og_din_32', subjectId: 'religion', topic: 'İnanç Esasları', difficulty: 'medium',
    question: 'İslam’a göre en büyük günah aşağıdakilerden hangisidir?',
    options: ['Yalan söylemek', 'Şirk koşmak', 'Hırsızlık yapmak', 'Gıybet etmek'],
    correctAnswer: 1,
    explanation: 'Allah\'a ortak koşmak (şirk), İslam\'da en büyük günah kabul edilir.'
  },
  {
    id: 'og_din_33', subjectId: 'religion', topic: 'Ahlak', difficulty: 'easy',
    question: '“Allah’a güvenip gerekli tedbirleri almak” anlamına gelen kavram aşağıdakilerden hangisidir?',
    options: ['Tevekkül', 'Tevazu', 'Takva', 'İhlas'],
    correctAnswer: 0,
    explanation: 'Tevekkül, bir iş için gerekli tüm çabayı gösterdikten sonra sonucunu Allah\'a bırakmaktır.'
  },
  {
    id: 'og_din_34', subjectId: 'religion', topic: 'Kul Hakkı', difficulty: 'medium',
    question: 'İslam’da “komşu hakkı” ile ilgili olarak aşağıdakilerden hangisi yanlıştır?',
    options: ['Komşularla iyi geçinmek gerekir.', 'Komşular açken tok yatmamak gerekir.', 'Komşunun malını gizlice almak caizdir.', 'Komşuya yardım etmek dinen teşvik edilmiştir.'],
    correctAnswer: 2,
    explanation: 'Komşunun malını gizlice almak kul hakkına girmektir ve caiz değildir.'
  },
  {
    id: 'og_din_35', subjectId: 'religion', topic: 'Peygamberler', difficulty: 'hard',
    question: 'Aşağıdaki peygamberlerden hangisi “Ulul Azm” peygamberler arasında yer alır?',
    options: ['Hz. Yusuf', 'Hz. Nuh', 'Hz. Harun', 'Hz. Davut'],
    correctAnswer: 1,
    explanation: 'Ulul Azm peygamberler, Kur\'an\'da en çok zorluğa göğüs germiş olarak tanımlanan peygamberlerdir. Bunlar Hz. Nuh, Hz. İbrahim, Hz. Musa, Hz. İsa ve Hz. Muhammed\'dir.'
  },
  {
    id: 'og_din_36', subjectId: 'religion', topic: 'İnfak', difficulty: 'easy',
    question: 'İslam’da “infak” ne anlama gelir?',
    options: ['Allah’a şirk koşmak', 'Yardım ve bağışta bulunmak', 'Günah işlemek', 'İbadetleri terk etmek'],
    correctAnswer: 1,
    explanation: 'İnfak, Allah rızası için kişinin malından ihtiyaç sahiplerine harcaması, yani yardım ve bağışta bulunmasıdır.'
  },
  {
    id: 'og_din_37', subjectId: 'religion', topic: 'Sorumluluk', difficulty: 'easy',
    question: 'İslam’a göre insanın özgür iradesiyle yaptığı davranışların ahirette karşılığını görmesine ne denir?',
    options: ['Kader', 'Kaza', 'Sorumluluk', 'Hesap'],
    correctAnswer: 2,
    explanation: 'İslam\'da her birey, özgür iradesiyle yaptığı eylemlerden sorumludur.'
  },
  {
    id: 'og_din_38', subjectId: 'religion', topic: 'Hz. Muhammed', difficulty: 'easy',
    question: 'Hz. Muhammed’e ilk vahiy hangi mağarada gelmiştir?',
    options: ['Sevr', 'Hira', 'Nur', 'Uhud'],
    correctAnswer: 1,
    explanation: 'Hz. Muhammed\'e ilk vahiy, Hira Mağarası\'nda gelmiştir.'
  },
];