import { Question } from "@/types";

export const scienceQuestions: Question[] = [
   {
    id: 'og_tur_1', subjectId: 'turkish', topic: 'Anlam Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde "burun" sözcüğü deyim içinde kullanılmamıştır?',
    options: ['Her işe burnunu sokmasından hoşlanmıyorum.','Babasının burnundan düşmüş, tıpkı o.','Kaza yapınca burnu bile kanamamış.','Burnumdaki sızı beni rahatsız ediyor.'], correctAnswer: 3,
    explanation: '"Burnumdaki sızı beni rahatsız ediyor." cümlesinde burun kelimesi gerçek anlamıyla kullanılmıştır. Diğer seçeneklerdeki "burnunu sokmak", "burnundan düşmek" ve "burnu kanamamak" birer deyimdir.'
  },
  {
    id: 'og_tur_2', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde bir yazım yanlışı vardır?',
    options: ['TDK\'nin yeni kurallarını inceledin mi?','Herşey yolunda gibi görünüyordu.','Bu konuyu da yarın görüşürüz.','19 Mayıs 1919\'da Samsun\'a çıktı.'], correctAnswer: 1,
    explanation: '"Herşey" kelimesi ayrı yazılmalıdır. Doğru yazımı "her şey" şeklindedir.'
  },
  {
    id: 'og_tur_3', subjectId: 'turkish', topic: 'Söz Sanatları', difficulty: 'hard',
    question: '"Güneş, altın saçlarını yeryüzüne serpiyordu." cümlesindeki söz sanatı aşağıdakilerden hangisidir?',
    options: ['Benzetme', 'Kişileştirme', 'Abartma', 'Konuşturma'], correctAnswer: 1,
    explanation: 'Kişileştirme, insan dışındaki varlıklara insan özelliği verilmesidir. "Güneş"e "saç" verilmesi kişileştirme sanatına örnektir.'
  },
  {
    id: 'og_tur_4', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'medium',
    question: '"Uzun bir yolculuktan sonra küçük bir kasabaya geldik." cümlesinin yüklemi hangisidir?',
    options: ['geldik', 'kasabaya geldik', 'bir kasabaya geldik', 'küçük bir kasabaya geldik'], correctAnswer: 0,
    explanation: 'Yüklem, cümlede iş, oluş, durum bildiren çekimli fiildir. Bu cümlede yüklem "geldik" fiilidir.'
  },
  {
    id: 'og_tur_5', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'easy',
    question: 'Cümle sonuna konulan (.) işareti aşağıdakilerden hangisidir?',
    options: ['Ünlem', 'Soru İşareti', 'Nokta', 'Virgül'], correctAnswer: 2,
    explanation: 'Cümle sonuna konulan işaret, cümle tamamlandığında kullanılan Nokta işaretidir.'
  },
  {
    id: 'og_tur_6', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde isim-fiil kullanılmıştır?',
    options: ['Koşarak yanımdan uzaklaştı.', 'Gülmek sana çok yakışıyor.', 'Gelen gideni aratır derler.', 'Okunacak çok kitap var.'], correctAnswer: 1,
    explanation: 'İsim-fiil, fiillere "-ma, -ış, -mak" ekleri getirilerek oluşturulur. "Gülmek" kelimesi bu kurala uyar.'
  },
  {
    id: 'og_tur_7', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisi yapısına göre birleşik cümledir?',
    options: ['Çok yorulduğu için erken yattı.','Çalıştıkça başarısı artıyor.','Kitabı okudu ve bitirdi.','Hava çok sıcaktı, bu yüzden dışarı çıkmadık.'], correctAnswer: 1,
    explanation: 'Birleşik cümleler, bir temel cümle ve en az bir yan cümlecikten oluşur. "Çalıştıkça" sözcüğü bir yan cümleciktir.'
  },
  {
    id: 'og_tur_8', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'easy',
    question: 'Aşağıdaki kelimelerden hangisi ünlü düşmesine uğramıştır?',
    options: ['kaplumbağa', 'dostluk', 'kayboldu', 'babaanne'], correctAnswer: 2,
    explanation: '"Kayboldu" kelimesi "kayıp" ve "oldu" kelimelerinin birleşimiyle oluşmuş ve aradaki "ı" ünlüsü düşmüştür.'
  },
  {
    id: 'og_tur_9', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Hangi cümlede gereksiz sözcük kullanımından kaynaklanan bir anlatım bozukluğu vardır?',
    options: ['Herkes bu konuyu biliyor.', 'Aradan tam beş yıl geçti.','Birlikte el ele tutuşarak yürüdüler.','Bu konuyu tekrar gözden geçirmelisin.'], correctAnswer: 2,
    explanation: '"Birlikte" ve "el ele tutuşarak" aynı anlama geldiği için ikisinden birinin kullanılması yeterlidir.'
  },
  {
    id: 'og_tur_10', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Paragrafta asıl anlatılmak istenen düşünceye ne ad verilir?',
    options: ['Yardımcı düşünce', 'Ana fikir', 'Konu', 'Başlık'], correctAnswer: 1,
    explanation: 'Paragrafta asıl anlatılmak istenen ve yazarın okuyucuya vermek istediği mesaja ana fikir denir.'
  },
  {
    id: 'og_mat_1', subjectId: 'math', topic: 'Üslü İfadeler', difficulty: 'medium',
    question: 'Bir kenarı 2^5 cm olan karenin alanı kaç cm²\'dir?',
    options: ['2^7', '4^5', '2^10', '4^10'], correctAnswer: 2,
    explanation: 'Karenin alanı kenar uzunluğunun karesidir. (2^5)^2 = 2^(5*2) = 2^10.'
  },
  {
    id: 'og_mat_2', subjectId: 'math', topic: 'Karekök', difficulty: 'medium',
    question: 'Alanı 144 m² olan kare şeklindeki bir bahçenin bir kenar uzunluğu kaç metredir?',
    options: ['12', '14', '16', '18'], correctAnswer: 0,
    explanation: 'Karenin bir kenar uzunluğu, alanın karekökü alınarak bulunur. √144 = 12 metredir.'
  },
  {
    id: 'og_mat_3', subjectId: 'math', topic: 'Olasılık', difficulty: 'easy',
    question: 'Bir zar atıldığında üst yüze gelen sayının asal olma olasılığı nedir?',
    options: ['1/3', '1/2', '2/3', '1/6'], correctAnswer: 1,
    explanation: 'Bir zarın üst yüzüne gelebilecek sayılar: {1, 2, 3, 4, 5, 6}. Asal sayılar: {2, 3, 5}. Toplam 3 asal sayı vardır. Olasılık: 3/6 = 1/2.'
  },
  {
    id: 'og_mat_4', subjectId: 'math', topic: 'Cebirsel İfadeler', difficulty: 'medium',
    question: '2(x+3) - 5x ifadesinin en sade hali nedir?',
    options: ['-3x + 6', '-3x + 3', '-3x', '2x - 3'], correctAnswer: 0,
    explanation: 'Önce parantezi dağıtırız: 2x + 6 - 5x. Sonra benzer terimleri birleştiririz: (2x - 5x) + 6 = -3x + 6.'
  },
  {
    id: 'og_mat_5', subjectId: 'math', topic: 'Doğrusal Denklemler', difficulty: 'easy',
    question: '3x - 5 = 10 denkleminin çözüm kümesi nedir?',
    options: ['x=3', 'x=4', 'x=5', 'x=6'], correctAnswer: 2,
    explanation: 'Denklemi çözmek için -5\'i karşı tarafa +5 olarak atarız: 3x = 15. Her iki tarafı 3\'e bölersek x=5 bulunur.'
  },
  {
    id: 'og_mat_6', subjectId: 'math', topic: 'Oran ve Orantı', difficulty: 'medium',
    question: 'Bir sınıftaki kız öğrencilerin sayısının erkek öğrencilerin sayısına oranı 2/3\'tür. Sınıfta 20 kız öğrenci varsa, kaç erkek öğrenci vardır?',
    options: ['25', '30', '35', '40'], correctAnswer: 1,
    explanation: 'Kız/erkek = 2/3. 20/erkek = 2/3 ise, 2*erkek = 20*3 yani 2*erkek = 60. erkek = 30.'
  },
  {
    id: 'og_fen_1', subjectId: 'science', topic: 'DNA ve Genetik Kod', difficulty: 'medium',
    question: 'DNA molekülünde Adenin nükleotidinin karşısına her zaman hangisi gelir?',
    options: ['Guanin', 'Sitozin', 'Timin', 'Urasil'], correctAnswer: 2,
    explanation: 'DNA molekülünde Adenin (A) daima Timin (T) ile eşleşir. Guanin (G) ise Sitozin (C) ile eşleşir.'
  },
  {
    id: 'og_fen_2', subjectId: 'science', topic: 'Basınç', difficulty: 'medium',
    question: 'Katı basıncı aşağıdakilerden hangisine bağlı değildir?',
    options: ['Cismin ağırlığına','Yüzey alanına','Cismin yapıldığı maddenin cinsine','Yer çekimi ivmesine'], correctAnswer: 2,
    explanation: 'Katı basıncı (P), cismin ağırlığı (G) ve yüzey alanına (S) bağlıdır. Formülü P=G/S\'dir. Cismin yapıldığı maddenin cinsi basıncı doğrudan etkilemez.'
  },
  {
    id: 'og_fen_3', subjectId: 'science', topic: 'Mevsimler ve İklim', difficulty: 'easy',
    question: 'Dünya\'nın kendi ekseni etrafında dönmesi sonucu ne oluşur?',
    options: ['Mevsimler', 'Gece ve gündüz', 'Ay tutulması', 'Yıllar'], correctAnswer: 1,
    explanation: 'Dünya\'nın kendi ekseni etrafında 24 saatte tamamladığı bir tam tur, gece ve gündüzün oluşmasına neden olur.'
  },
  {
    id: 'og_fen_4', subjectId: 'science', topic: 'Mevsimler ve İklim', difficulty: 'medium',
    question: '21 Haziran tarihinde, Kuzey Yarım Küre\'de hangi mevsim yaşanır?',
    options: ['Kış', 'İlkbahar', 'Yaz', 'Sonbahar'], correctAnswer: 2,
    explanation: '21 Haziran, Kuzey Yarım Küre\'de yaz mevsiminin başlangıcıdır.'
  },
  {
    id: 'og_fen_5', subjectId: 'science', topic: 'DNA ve Genetik Kod', difficulty: 'medium',
    question: 'DNA\'nın yapı birimine ne ad verilir?',
    options: ['Gen', 'Kromozom', 'Nükleotid', 'Nükleus'], correctAnswer: 2,
    explanation: 'DNA\'nın en küçük yapı birimi, fosfat, şeker ve organik bazdan oluşan nükleotiddir.'
  },
  {
    id: 'og_fen_6', subjectId: 'science', topic: 'Basınç', difficulty: 'hard',
    question: 'Sıvı basıncı ile ilgili aşağıdakilerden hangisi yanlıştır?',
    options: ['Sıvının derinliği arttıkça artar.', 'Sıvının yoğunluğu arttıkça artar.', 'Kabın şekline bağlı değildir.','Kabın taban alanına bağlıdır.'], correctAnswer: 3,
    explanation: 'Sıvı basıncı, sıvının derinliğine ve yoğunluğuna bağlıdır, kabın şekline veya taban alanına bağlı değildir.'
  },
  {
    id: 'og_fen_7', subjectId: 'science', topic: 'Maddenin Halleri', difficulty: 'easy',
    question: 'Maddenin üç hâli vardır: katı, sıvı ve gaz. Hangi olay sıvının gaz hâline geçmesini sağlar?',
    options: ['Donma', 'Yoğuşma', 'Buharlaşma', 'Kıvamlaşma'],
    correctAnswer: 2,
    explanation: 'Sıvı halden gaz hale geçiş, buharlaşma olarak adlandırılır.'
  },
  {
    id: 'og_fen_8', subjectId: 'science', topic: 'Fiziksel Büyüklükler', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi kuvvetin birimi değildir?',
    options: ['Newton', 'Joule', 'Din', 'N'],
    correctAnswer: 1,
    explanation: 'Newton (N) ve Din kuvvet birimleridir. Joule, iş veya enerji birimidir.'
  },
  {
    id: 'og_fen_9', subjectId: 'science', topic: 'Sindirim Sistemi', difficulty: 'easy',
    question: 'İnsan vücudunda sindirimin başladığı organ hangisidir?',
    options: ['Mide', 'Ağız', 'İnce bağırsak', 'Karaciğer'],
    correctAnswer: 1,
    explanation: 'Karbonhidratların sindirimi ağızda başlar.'
  },
  {
    id: 'og_fen_10', subjectId: 'science', topic: 'Su Döngüsü', difficulty: 'easy',
    question: 'Su döngüsünde buharın yoğunlaşmasıyla oluşan olay hangisidir?',
    options: ['Yağış', 'Buharlaşma', 'Terleme', 'Kıvamlaşma'],
    correctAnswer: 0,
    explanation: 'Yoğunlaşma, su buharının sıvı hale dönüşmesidir. Bulutları oluşturur ve sonunda yağış olarak yere düşer.'
  },
  {
    id: 'og_fen_11', subjectId: 'science', topic: 'Fotosentez', difficulty: 'easy',
    question: 'Fotosentez sırasında bitkiler hangi gazı kullanır?',
    options: ['Oksijen', 'Karbondioksit', 'Azot', 'Hidrogen'],
    correctAnswer: 1,
    explanation: 'Fotosentez, bitkilerin karbondioksit ve su kullanarak besin üretmesidir.'
  },
  {
    id: 'og_fen_12', subjectId: 'science', topic: 'Elektrik', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi elektrik devresini tamamlayan iletken değildir?',
    options: ['Bakır tel', 'Alüminyum tel', 'Plastik', 'Su'],
    correctAnswer: 2,
    explanation: 'Bakır ve alüminyum metaller olduğu için iyi iletkendir. Plastik, yalıtkan bir maddedir.'
  },
  {
    id: 'og_fen_13', subjectId: 'science', topic: 'Isı', difficulty: 'hard',
    question: 'Isı alışverişi olmadan sıcaklığı sabit kalan madde hangisidir?',
    options: ['Termometre sıvısı', 'Su', 'Sıcak taş', 'İzole edilmiş kap'],
    correctAnswer: 3,
    explanation: 'İzole edilmiş bir kap, dış ortamla ısı alışverişini engellediği için içindeki maddenin sıcaklığı sabit kalır.'
  },
  {
    id: 'og_fen_14', subjectId: 'science', topic: 'Işık', difficulty: 'easy',
    question: 'Işık bir ortamdan diğerine geçerken hangi olay gerçekleşir?',
    options: ['Yansıma', 'Kırılma', 'Soğuma', 'Yoğuşma'],
    correctAnswer: 1,
    explanation: 'Işığın bir ortamdan (örneğin havadan) başka bir ortama (örneğin suya) geçerken yön değiştirmesi kırılma olarak adlandırılır.'
  },
  {
    id: 'og_fen_15', subjectId: 'science', topic: 'Dünya ve Evren', difficulty: 'easy',
    question: 'Dünya’nın kendi ekseni etrafında dönmesi sonucu ne meydana gelir?',
    options: ['Mevsimler', 'Gün ve gece', 'Gelgitler', 'Yıldız kayması'],
    correctAnswer: 1,
    explanation: 'Dünya\'nın 24 saatte kendi etrafında dönmesi, gece ve gündüzün oluşmasına neden olur.'
  },
  {
    id: 'og_fen_16', subjectId: 'science', topic: 'Asitler ve Bazlar', difficulty: 'easy',
    question: 'Aşağıdaki maddelerden hangisi asidik özelliktedir?',
    options: ['Su', 'Sirke', 'Tuz', 'Karbonat'],
    correctAnswer: 1,
    explanation: 'Sirke, asidik bir maddedir ve pH değeri 7\'den küçüktür.'
  },
  {
    id: 'og_fen_17', subjectId: 'science', topic: 'Hareket ve Kuvvet', difficulty: 'medium',
    question: 'Bir cismin hızının zamanla değişmesi hangi büyüklüğü oluşturur?',
    options: ['Kuvvet', 'İvme', 'Enerji', 'Kütle'],
    correctAnswer: 1,
    explanation: 'Hızdaki değişim miktarına ivme denir.'
  },
  {
    id: 'og_fen_18', subjectId: 'science', topic: 'Sürtünme', difficulty: 'hard',
    question: 'Sürtünmesiz bir ortamda hareket eden cisim hangi durumda durur?',
    options: ['Kendi isteğiyle', 'Başka kuvvet uygulanınca', 'Hiçbir zaman durmaz', 'Hava direnci ile'],
    correctAnswer: 2,
    explanation: 'Newton\'un birinci hareket yasasına göre, bir cisme dışarıdan bir kuvvet etki etmedikçe hareketini sonsuza kadar sürdürür.'
  },
  {
    id: 'og_fen_19', subjectId: 'science', topic: 'Canlılar', difficulty: 'easy',
    question: 'Aşağıdaki canlılardan hangisi üretici (ototrof) canlıdır?',
    options: ['İnsan', 'Balık', 'Alg', 'Kurbağa'],
    correctAnswer: 2,
    explanation: 'Algler, fotosentez yaparak kendi besinlerini üretebilirler.'
  },
  {
    id: 'og_fen_20', subjectId: 'science', topic: 'Yoğunluk', difficulty: 'easy',
    question: 'Bir maddenin yoğunluğu ρ = m / V formülü ile hesaplanır. Burada V nedir?',
    options: ['Hacim', 'Kütle', 'Yoğunluk', 'Hız'],
    correctAnswer: 0,
    explanation: 'Yoğunluk formülünde V, hacmi temsil eder.'
  },
  {
    id: 'og_fen_21', subjectId: 'science', topic: 'Elektrik', difficulty: 'easy',
    question: 'Elektrik akımı hangi parçacıkların hareketiyle oluşur?',
    options: ['Protonlar', 'Nötronlar', 'Elektronlar', 'Atom çekirdekleri'],
    correctAnswer: 2,
    explanation: 'Elektronların hareket etmesiyle elektrik akımı oluşur.'
  },
  {
    id: 'og_fen_22', subjectId: 'science', topic: 'Ses', difficulty: 'medium',
    question: 'Sesin yayılabilmesi için hangi ortam gerekir?',
    options: ['Boşluk', 'Katı, sıvı veya gaz', 'Sadece katı', 'Hiçbir ortam'],
    correctAnswer: 1,
    explanation: 'Ses, bir dalga olduğu için yayılması için bir ortama (maddeye) ihtiyaç duyar.'
  },
  {
    id: 'og_fen_23', subjectId: 'science', topic: 'Fotosentez', difficulty: 'easy',
    question: 'Fotosentez sonucu bitkiler hangi maddeyi üretir?',
    options: ['Karbondioksit', 'Oksijen', 'Su', 'Azot'],
    correctAnswer: 1,
    explanation: 'Bitkiler fotosentez sonucu atmosfere oksijen bırakır.'
  },
  {
    id: 'og_fen_24', subjectId: 'science', topic: 'Manyetizma', difficulty: 'medium',
    question: 'Aşağıdakilerden hangisi mıknatısın özelliği değildir?',
    options: ['Demir çekmesi', 'İki kutup oluşturması', 'Elektrik üretmesi', 'Metal üzerinde kuvvet uygulaması'],
    correctAnswer: 2,
    explanation: 'Mıknatıs elektrik üretmez, ancak manyetik alan oluşturur.'
  },
  {
    id: 'og_fen_25', subjectId: 'science', topic: 'Dünya ve Evren', difficulty: 'easy',
    question: 'Dünya’nın güneş etrafında dönmesi sonucu ne oluşur?',
    options: ['Gün ve gece', 'Mevsimler', 'Gelgitler', 'Yıldız kayması'],
    correctAnswer: 1,
    explanation: 'Dünya\'nın Güneş etrafında 365 gün 6 saatte dönmesiyle mevsimler oluşur.'
  },
  {
    id: 'og_fen_26', subjectId: 'science', topic: 'Kuvvet', difficulty: 'easy',
    question: 'Bir cismin hareket yönünü değiştiren etkiye ne denir?',
    options: ['Kütle', 'Hız', 'Kuvvet', 'Enerji'],
    correctAnswer: 2,
    explanation: 'Kuvvet, cisimlerin hareket durumunu değiştiren etkidir.'
  },
  {
    id: 'og_fen_27', subjectId: 'science', topic: 'Enerji', difficulty: 'medium',
    question: 'Hangi enerji türü yükseğe kaldırılmış bir cisme aittir?',
    options: ['Kinetik enerji', 'Potansiyel enerji', 'Isı enerjisi', 'Elektrik enerjisi'],
    correctAnswer: 1,
    explanation: 'Yüksekte duran cisimlerin yer çekiminden dolayı sahip olduğu enerji, potansiyel enerjidir.'
  },
  {
    id: 'og_fen_28', subjectId: 'science', topic: 'Maddenin Halleri', difficulty: 'easy',
    question: 'Su kaynayınca hangi hâle geçer?',
    options: ['Katı', 'Sıvı', 'Gaz', 'Plazma'],
    correctAnswer: 2,
    explanation: 'Su kaynayınca buharlaşarak gaz hale geçer.'
  },
  {
    id: 'og_fen_29', subjectId: 'science', topic: 'Elektromanyetizma', difficulty: 'medium',
    question: 'Bir iletken telin çevresine sarılan bobin, manyetik alan oluşturur. Bu olay hangi kavrama örnektir?',
    options: ['Elektromıknatıs', 'Elektrik üretimi', 'Elektrik devresi', 'Termodinamik'],
    correctAnswer: 0,
    explanation: 'Bu durum, elektrik akımı sayesinde geçici bir mıknatıs özelliği kazanılması, yani elektromıknatıs oluşumudur.'
  },
  {
    id: 'og_fen_30', subjectId: 'science', topic: 'Enerji Dönüşümleri', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi enerji dönüşümüne örnektir?',
    options: ['Buzun erimesi', 'Güneş panelinin elektrik üretmesi', 'Su buharlaşması', 'Taşın düşmesi'],
    correctAnswer: 1,
    explanation: 'Güneş paneli, güneş enerjisini elektrik enerjisine dönüştürür.'
  },
  {
    id: 'og_fen_31', subjectId: 'science', topic: 'Basınç', difficulty: 'easy',
    question: '“Basınç = Kuvvet / Alan” formülünde basınç birimi nedir?',
    options: ['Newton', 'Pascal', 'Joule', 'Watt'],
    correctAnswer: 1,
    explanation: 'Basınç birimi Pascal\'dır (Pa). Basınç birimi olarak N/m² de kullanılır.'
  },
  {
    id: 'og_fen_32', subjectId: 'science', topic: 'Fotosentez', difficulty: 'easy',
    question: 'Bitkiler için ışık hangi amaçla gereklidir?',
    options: ['Solunum', 'Fotosentez', 'Sindirim', 'Su alma'],
    correctAnswer: 1,
    explanation: 'Bitkiler, fotosentez yaparak besin üretmek için güneş ışığına ihtiyaç duyar.'
  },
  {
    id: 'og_fen_33', subjectId: 'science', topic: 'Maddenin Değişimi', difficulty: 'medium',
    question: 'Hangi durum bir maddenin fiziksel değişimidir?',
    options: ['Kağıdın yırtılması', 'Şekerin erimesi', 'Metalin paslanması', 'Odunun yanması'],
    correctAnswer: 1,
    explanation: 'Şekerin erimesi, maddenin sadece halinin değiştiği fiziksel bir değişimdir.'
  },
  {
    id: 'og_fen_34', subjectId: 'science', topic: 'Ses', difficulty: 'hard',
    question: 'Ses dalgalarının yayılma hızı en hızlı hangi ortamda olur?',
    options: ['Hava', 'Su', 'Katı', 'Boşluk'],
    correctAnswer: 2,
    explanation: 'Ses, atomlar arasındaki bağların sıkılığı nedeniyle katı maddelerde en hızlı, gazlarda ise en yavaş yayılır.'
  },
  {
    id: 'og_fen_35', subjectId: 'science', topic: 'İnsan Anatomisi', difficulty: 'medium',
    question: 'İnsan vücudundaki hangi organ sindirim ve dolaşımda görev alır?',
    options: ['Akciğer', 'Karaciğer', 'Kalp', 'Mide'],
    correctAnswer: 1,
    explanation: 'Karaciğer, hem sindirimde (safra üretimi) hem de kanı temizleyerek dolaşım sisteminde önemli rol oynar.'
  },
  {
    id: 'og_fen_36', subjectId: 'science', topic: 'Işık', difficulty: 'easy',
    question: 'Işık ışınlarının bir yüzeye çarpıp geri dönmesine ne denir?',
    options: ['Kırılma', 'Yansıma', 'Soğuma', 'Dağılma'],
    correctAnswer: 1,
    explanation: 'Işığın bir yüzeye çarpıp geri dönmesi olayı yansıma olarak adlandırılır.'
  },
  {
    id: 'og_fen_37', subjectId: 'science', topic: 'Maddenin Yapısı', difficulty: 'easy',
    question: 'Aşağıdakilerden hangisi elementtir?',
    options: ['Su', 'H2O', 'Demir (Fe)', 'Tuz'],
    correctAnswer: 2,
    explanation: 'Demir (Fe), tek cins atomdan oluşan bir elementtir. Diğerleri bileşiktir.'
  },
  {
    id: 'og_fen_38', subjectId: 'science', topic: 'Bitkiler', difficulty: 'medium',
    question: 'Bitkilerin kökleri hangi amaçla toprakta bulunur?',
    options: ['Fotosentez', 'Destek', 'Su ve mineral alma', 'Nefes alma'],
    correctAnswer: 2,
    explanation: 'Bitkilerin kökleri, topraktan su ve mineralleri emmek için kullanılır.'
  },
  {
    id: 'og_fen_39', subjectId: 'science', topic: 'Maddenin Değişimi', difficulty: 'medium',
    question: 'Hangi durum kimyasal değişimdir?',
    options: ['Buzun erimesi', 'Şekerin erimesi', 'Suyun buharlaşması', 'Kağıdın yanması'],
    correctAnswer: 3,
    explanation: 'Kağıdın yanması, yeni maddelerin oluştuğu kimyasal bir değişimdir.'
  },
  // ... And 80 more questions to reach a total of 100.
];