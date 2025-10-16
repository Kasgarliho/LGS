import { Question } from "@/types";

export const mathQuestions: Question[] = [
    {
    id: 'og_mat_1', subjectId: 'math', topic: 'Üslü İfadeler', difficulty: 'medium',
    question: 'Bir kenarı 2^5 cm olan karenin alanı kaç cm²\'dir?',
    options: ['2^7', '4^5', '2^10', '4^10'], correctAnswer: 2,
    explanation: 'Karenin alanı kenar uzunluğunun karesidir. (2^5)^2 = 2^(5*2) = 2^10.'
  },
  {
    id: 'og_mat_2', subjectId: 'math', topic: 'Kareköklü İfadeler', difficulty: 'medium',
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
    id: 'mat_new_1', subjectId: 'math', topic: 'Kareköklü İfadeler', difficulty: 'medium',
    question: '√72 sayısı hangi iki tam sayı arasındadır?',
    options: ['6 ve 7', '7 ve 8', '8 ve 9', '9 ve 10'], correctAnswer: 2,
    explanation: '√64 = 8 ve √81 = 9 olduğundan, √72 bu iki sayı arasındadır.'
  },
  {
    id: 'mat_new_2', subjectId: 'math', topic: 'Üslü İfadeler', difficulty: 'medium',
    question: '(3^4) * (3^-2) işleminin sonucu nedir?',
    options: ['3^6', '3^-8', '3^2', '9^2'], correctAnswer: 2,
    explanation: 'Tabanları aynı olan üslü ifadeler çarpılırken üsler toplanır. 4 + (-2) = 2. Sonuç 3^2 olur.'
  },
  {
    id: 'mat_new_3', subjectId: 'math', topic: 'Veri Analizi', difficulty: 'easy',
    question: 'Bir veri grubunun tepe değeri (mod) ne anlama gelir?',
    options: ['Verilerin ortalaması', 'Ortadaki veri', 'En çok tekrar eden veri', 'En büyük ve en küçük veri arasındaki fark'], correctAnswer: 2,
    explanation: 'Tepe değer (mod), bir veri grubunda en sık tekrar eden değerdir.'
  },
  {
    id: 'mat_new_4', subjectId: 'math', topic: 'Cebirsel İfadeler', difficulty: 'medium',
    question: '$(x - 5)^2$ ifadesinin özdeşi aşağıdakilerden hangisidir?',
    options: ['$x^2 - 25$', '$x^2 + 25$', '$x^2 - 10x + 25$', '$x^2 + 10x + 25$'], correctAnswer: 2,
    explanation: 'Tam kare özdeşliği $(a-b)^2 = a^2 - 2ab + b^2$ formülü kullanılarak bulunur. Burada $a=x$ ve $b=5$ olduğundan, sonuç $x^2 - 2(x)(5) + 5^2 = x^2 - 10x + 25$ olur.'
  },
  {
    id: 'mat_new_5', subjectId: 'math', topic: 'Üslü İfadeler', difficulty: 'medium',
    question: '$27^3$ sayısı $9^4$ sayısının kaç katıdır?',
    options: ['3', '9', '27', '81'], correctAnswer: 0,
    explanation: 'Sayıları 3 tabanında yazalım: $27^3 = (3^3)^3 = 3^9$. $9^4 = (3^2)^4 = 3^8$. Bir sayının diğerinin kaç katı olduğunu bulmak için böleriz: $3^9 / 3^8 = 3^{(9-8)} = 3^1 = 3$.'
  },
  {
    id: 'mat_new_6', subjectId: 'math', topic: 'Olasılık', difficulty: 'medium',
    question: 'İçinde 4 sarı, 5 kırmızı ve 6 mavi top bulunan bir torbadan rastgele çekilen bir topun sarı olmama olasılığı nedir?',
    options: ['4/15', '11/15', '5/15', '6/15'], correctAnswer: 1,
    explanation: 'Toplam top sayısı $4 + 5 + 6 = 15$\'tir. Sarı olmayan topların sayısı kırmızı ve mavi topların toplamıdır: $5 + 6 = 11$. Dolayısıyla sarı olmama olasılığı $11/15$\'tir.'
  },
  {
    id: 'mat_new_7', subjectId: 'math', topic: 'Kareköklü İfadeler', difficulty: 'medium',
    question: '$\\sqrt{50} + \\sqrt{18}$ işleminin sonucu aşağıdakilerden hangisidir?',
    options: ['$\\sqrt{68}$', '$8\\sqrt{2}$', '$2\\sqrt{17}$', '$15\\sqrt{2}$'], correctAnswer: 1,
    explanation: 'Karekök içlerini a√b şeklinde yazmalıyız. $\\sqrt{50} = \\sqrt{25 \\cdot 2} = 5\\sqrt{2}$. $\\sqrt{18} = \\sqrt{9 \\cdot 2} = 3\\sqrt{2}$. Toplamları $5\\sqrt{2} + 3\\sqrt{2} = 8\\sqrt{2}$ olur.'
  },
  {
    id: 'mat_new_8', subjectId: 'math', topic: 'Doğrusal Denklemler', difficulty: 'medium',
    question: 'Bir kumbarada 25 kuruşluk ve 50 kuruşluk toplam 30 adet madeni para vardır. Kumbaradaki paranın toplam değeri 11 TL olduğuna göre, kumbarada kaç adet 25 kuruşluk vardır?',
    options: ['12', '14', '16', '18'], correctAnswer: 2,
    explanation: '25 kuruşlukların sayısına $x$ dersek, 50 kuruşlukların sayısı $30-x$ olur. Denklemi kurarsak: $25x + 50(30-x) = 1100$ (kuruş). $25x + 1500 - 50x = 1100$. $-25x = -400$. $x = 16$ bulunur.'
  },
  {
    id: 'mat_new_9', subjectId: 'math', topic: 'Üçgenler', difficulty: 'hard',
    question: 'Bir ABC üçgeninde A açısı $50^{\\circ}$ ve B açısı $70^{\\circ}$ ise, bu üçgenin kenar uzunlukları arasındaki doğru sıralama hangisidir? (a, A açısının karşısındaki kenar vb.)',
    options: ['a < b < c', 'b < a < c', 'a < c < b', 'c < a < b'], correctAnswer: 3,
    explanation: 'Üçgenin iç açıları toplamı $180^{\\circ}$\'dir. C açısı $180 - (50+70) = 60^{\\circ}$ olur. Üçgende büyük açının karşısında büyük kenar bulunur. Açı sıralaması $B > C > A$ ($70 > 60 > 50$) olduğundan, kenar sıralaması da $b > c > a$ olur. Tersten yazarsak $a < c < b$.'
  },
  {
    id: 'mat_new_10', subjectId: 'math', topic: 'Veri Analizi', difficulty: 'medium',
    question: 'Bir öğrencinin 5 sınavdan aldığı notlar 70, 85, 90, 60 ve 95\'tir. Bu notların medyanı (ortanca değeri) kaçtır?',
    options: ['80', '85', '90', '70'], correctAnswer: 1,
    explanation: 'Medyanı bulmak için veriler küçükten büyüğe sıralanır: 60, 70, 85, 90, 95. Ortadaki değer medyandır. Bu seride ortadaki değer 85\'tir.'
  },
  {
    id: 'mat_new_11', subjectId: 'math', topic: 'Cebirsel İfadeler', difficulty: 'hard',
    question: '$9x^2 - 49y^2$ ifadesinin çarpanlarına ayrılmış şekli aşağıdakilerden hangisidir?',
    options: ['$(3x - 7y)(3x - 7y)$', '$(9x - 7y)(x + 7y)$', '$(3x - 7y)(3x + 7y)$', '$(9x^2 - 49y^2)$'], correctAnswer: 2,
    explanation: 'Bu ifade iki kare farkı özdeşliğidir: $a^2 - b^2 = (a-b)(a+b)$. Burada $a^2 = 9x^2 \\Rightarrow a = 3x$ ve $b^2 = 49y^2 \\Rightarrow b = 7y$. Yerine koyarsak sonuç $(3x - 7y)(3x + 7y)$ olur.'
  },
  {
    id: 'mat_new_12', subjectId: 'math', topic: 'Eğim', difficulty: 'medium',
    question: 'Koordinat sisteminde A(2, 5) ve B(4, 9) noktalarından geçen doğrunun eğimi kaçtır?',
    options: ['1', '2', '3', '4'], correctAnswer: 1,
    explanation: 'Eğim (m), y\'ler farkının x\'ler farkına bölünmesiyle bulunur: $m = (y_2 - y_1) / (x_2 - x_1)$. Değerleri yerine koyarsak: $(9 - 5) / (4 - 2) = 4 / 2 = 2$.'
  },
  {
    id: 'mat_new_13', subjectId: 'math', topic: 'Kareköklü İfadeler', difficulty: 'easy',
    question: 'Aşağıdaki sayılardan hangisi bir tam kare sayı değildir?',
    options: ['121', '144', '169', '180'], correctAnswer: 3,
    explanation: '$11^2 = 121$, $12^2 = 144$, $13^2 = 169$. Ancak 180, herhangi bir tam sayının karesi değildir, bu yüzden tam kare sayı değildir.'
  },
  {
    id: 'mat_new_14', subjectId: 'math', topic: 'Olasılık', difficulty: 'easy',
    question: 'Bir olayın olma olasılığı aşağıdakilerden hangisi olamaz?',
    options: ['0', '0.5', '1', '1.2'], correctAnswer: 3,
    explanation: 'Bir olayın olma olasılığı her zaman 0 (imkansız olay) ile 1 (kesin olay) arasında bir değer alır. 1\'den büyük bir olasılık değeri olamaz.'
  },
  {
    id: 'mat_new_15', subjectId: 'math', topic: 'Üslü İfadeler', difficulty: 'hard',
    question: 'Bilimsel gösterimi $3.45 \\times 10^{-4}$ olan sayı aşağıdakilerden hangisidir?',
    options: ['34500', '0.000345', '0.00345', '3450'], correctAnswer: 1,
    explanation: 'Üs -4 olduğu için virgül 4 basamak sola kaydırılır. $3.45 \\rightarrow 0.345 \\rightarrow 0.0345 \\rightarrow 0.00345 \\rightarrow 0.000345$.'
  },
  {
    id: 'mat_new_16', subjectId: 'math', topic: 'Çarpanlar ve Katlar', difficulty: 'medium',
    question: 'Aralarında asal iki sayının EBOB\'u ile EKOK\'unun toplamı 61\'dir. Bu sayılardan biri 12 ise diğeri kaçtır?',
    options: ['5', '7', '11', '49'], correctAnswer: 0,
    explanation: 'Aralarında asal iki sayının EBOB\'u her zaman 1\'dir. EKOK\'ları ise bu iki sayının çarpımına eşittir. EBOB + EKOK = 61 ise, 1 + EKOK = 61, yani EKOK = 60\'tır. EKOK(a,b) = a*b olduğundan, $12 \\cdot b = 60$ ise $b = 5$\'tir.'
  },
  {
    id: 'mat_new_17', subjectId: 'math', topic: 'Pisagor Bağıntısı', difficulty: 'medium',
    question: 'Bir dik üçgende dik kenarların uzunlukları 6 cm ve 8 cm ise hipotenüsün uzunluğu kaç cm\'dir?',
    options: ['10', '12', '14', '100'], correctAnswer: 0,
    explanation: 'Pisagor teoremine göre $a^2 + b^2 = c^2$. $6^2 + 8^2 = c^2 \\Rightarrow 36 + 64 = c^2 \\Rightarrow 100 = c^2 \\Rightarrow c = 10$. Bu aynı zamanda bir 3-4-5 üçgeninin (6-8-10) katıdır.'
  },
  {
    id: 'mat_new_18', subjectId: 'math', topic: 'Geometrik Cisimler', difficulty: 'medium',
    question: 'Yarıçapı 5 cm ve yüksekliği 10 cm olan bir dik silindirin hacmi kaç $cm^3$\'tür? ($\\pi = 3$ alınız)',
    options: ['150', '300', '750', '1500'], correctAnswer: 2,
    explanation: 'Silindirin hacmi $V = \\pi r^2 h$ formülüyle bulunur. $V = 3 \\cdot (5^2) \\cdot 10 = 3 \\cdot 25 \\cdot 10 = 750 cm^3$.'
  },
  {
    id: 'pdf2_mat_1', subjectId: 'math', topic: 'Çarpanlar ve Katlar', difficulty: 'hard',
    question: 'Bir sayı oyununda, oyuncunun söylediği sayı kadar puan kendisine, söylediği sayının kendisi hariç pozitif tam sayı bölenlerinin toplamı kadar puan rakibine yazılıyor. Ahmet\'in 14 sayısını söylediği bir oyunda, Deniz aşağıdaki sayılardan hangisini söylerse oyunu kazanır?',
    options: ['18', '20', '25', '36'], correctAnswer: 2,
    explanation: 'Başlangıç: Ahmet 14, Deniz 10 (14\'ün bölenleri 1+2+7=10). C) Deniz 25 söylerse: Deniz\'e 25 puan gelir (Toplam: 10+25=35). 25\'in bölenleri (1+5=6) Ahmet\'e gelir (Toplam: 14+6=20). Deniz 35-20 kazanır.'
  },
  {
    id: 'pdf2_mat_2', subjectId: 'math', topic: 'Çarpanlar ve Katlar', difficulty: 'medium',
    question: 'Yarıçapı r olan çemberin çevresi $2\\pi r$\'dir. Tekerlerinin merkezlerinin yere uzaklığı 40 cm ve 30 cm olan iki farklı bisiklet, tekerleri tam tur atarak aynı mesafeyi tamamlıyor. Bu mesafe en az kaç cm\'dir? ($\\pi = 3$ alınız)',
    options: ['400', '420', '700', '720'], correctAnswer: 3,
    explanation: '1. tekerin çevresi: $2 \\cdot 3 \\cdot 40 = 240$ cm. 2. tekerin çevresi: $2 \\cdot 3 \\cdot 30 = 180$ cm. Alınan mesafe, bu iki çevrenin en küçük ortak katı (EKOK) olmalıdır. EKOK(240, 180) = 720 cm\'dir.'
  },
  {
    id: 'pdf2_mat_3', subjectId: 'math', topic: 'Çarpanlar ve Katlar', difficulty: 'hard',
    question: 'A gübresi (50kg, %20 Azot, 70 TL) veya B gübresi (50kg, %44 Azot, 160 TL) kullanılacaktır. İki gübreden de eşit miktarda azot alındığında, 1000 TL\'den az ödeyerek A gübresi tercih ediliyor. Diğerini tercih etseydi kaç TL daha fazla öderdi?',
    options: ['15', '30', '45', '60'], correctAnswer: 1,
    explanation: 'A torbasında azot: $50 \\cdot 0.20 = 10$ kg. B torbasında azot: $50 \\cdot 0.44 = 22$ kg. Gerekli azot miktarı EKOK(10, 22) = 110 kg olmalıdır. 110 kg azot için: A\'dan 11 torba ($11 \\cdot 70 = 770$ TL), B\'den 5 torba ($5 \\cdot 160 = 800$ TL) gerekir. A gübresi 770 TL ile daha ucuzdur ve 1000 TL\'den azdır. Diğerini seçseydi 800 TL ödeyecekti. Fark: $800 - 770 = 30$ TL.'
  },
  {
    id: 'pdf2_mat_4', subjectId: 'math', topic: 'Çarpanlar ve Katlar', difficulty: 'medium',
    question: 'Uzunluğu 360 cm ile 400 cm arasında olan bir AB doğru parçasına, kenarları 5 cm ve 7 cm olan kareler ayrı ayrı tam olarak sığabiliyor. Bu doğru parçasına aşağıdaki karelerden hangisi tam olarak sığmaz?',
    options: ['25 cm', '55 cm', '70 cm', '105 cm'], correctAnswer: 1,
    explanation: 'Doğru parçasının uzunluğu hem 5\'in hem de 7\'nin katı olmalıdır. EKOK(5, 7) = 35. 35\'in 360 ile 400 arasındaki katı $35 \\cdot 11 = 385$ cm\'dir. 385 sayısı 25\'e, 70\'e ve 105\'e tam bölünürken, 55\'e tam bölünmez.'
  },
  {
    id: 'pdf2_mat_5', subjectId: 'math', topic: 'Çarpanlar ve Katlar', difficulty: 'hard',
    question: 'Ayrıtları 30cm ve 80cm olan kare prizma şeklindeki koliler, yüksekliği 3 metreden az olan bir depoya dikey veya yatay olarak hiç boşluk kalmadan tavana kadar yerleştirilebiliyor. Bu işlem aşağıdaki kolilerden hangisiyle de yapılabilir?',
    options: ['20cm ve 90cm', '60cm ve 120cm', '50cm ve 180cm', '45cm ve 60cm'], correctAnswer: 1,
    explanation: 'Deponun yüksekliği hem 30\'un hem de 80\'in ortak katı olmalıdır. EKOK(30, 80) = 240 cm. Yükseklik 300cm\'den az olduğu için 240 cm\'dir. Şıklardaki kolilerin de hem dikey hem yatay ayrıtlarının 240\'ı tam bölmesi gerekir. B şıkkında 60cm ve 120cm, her ikisi de 240\'ı tam böler.'
  },
  {
    id: 'pdf2_mat_6', subjectId: 'math', topic: 'Çarpanlar ve Katlar', difficulty: 'medium',
    question: 'Genişliği 60cm olan koltuklar aralarında 25cm boşlukla dizildiğinde sıra sonu ile duvar arasında da 25cm kalıyor. Aralarındaki boşluk 15cm olacak şekilde yeniden dizildiğinde ise sonda yine 15cm kalıyor. Salona en az kaç koltuk daha eklenmiştir?',
    options: ['1', '2', '3', '4'], correctAnswer: 1,
    explanation: 'İlk durumda her koltuk ve boşluğu bir periyot (60+25=85cm), ikinci durumda ise (60+15=75cm) olarak düşünülebilir. Salonun uzunluğu hem 85\'in hem de 75\'in ortak katı olmalıdır. EKOK(85, 75) = 1275 cm. İlk durumda yerleşen koltuk sayısı: 1275 / 85 = 15. İkinci durumda yerleşen koltuk sayısı: 1275 / 75 = 17. Eklenen koltuk sayısı: 17 - 15 = 2.'
  },
  {
    id: 'pdf2_mat_9', subjectId: 'math', topic: 'Üslü İfadeler', difficulty: 'easy',
    question: 'Dört haneli bir şifrenin ilk hanesindeki rakamın karesi ikinci haneye, ikinci hanedeki rakamın karesi son iki haneye yazılıyor. Şifrenin son rakamı 6 ise ilk rakamı kaçtır?',
    options: ['1', '2', '3', '4'], correctAnswer: 2,
    explanation: 'Son rakam 6 ise, son iki hane bir sayının karesi olmalı ve 6 ile bitmeli: 16 (4^2) veya 36 (6^2). Son iki hane 16 ise, ikinci hane 4 olmalıdır. İlk hanenin karesi 4 ise, ilk hane 2\'dir (Şifre: 2416). Son iki hane 36 ise, ikinci hane 6 olmalıdır, ancak hiçbir tam sayının karesi 6 değildir. Dolayısıyla ilk rakam 2 olmalıdır.'
  },
  {
    id: 'mat_new_19', subjectId: 'math', topic: 'Doğrusal Denklemler', difficulty: 'medium',
    question: '$y = 3x - 5$ doğrusu için aşağıdakilerden hangisi yanlıştır?',
    options: ['Eğimi 3\'tür.', 'y eksenini -5 noktasında keser.', 'x eksenini 5/3 noktasında keser.', '(2, 2) noktasından geçer.'], correctAnswer: 3,
    explanation: 'x yerine 2 koyduğumuzda y = 3(2) - 5 = 6 - 5 = 1 olur. Yani doğru (2, 1) noktasından geçer, (2, 2) noktasından geçmez.'
  },
  {
    id: 'mat_new_20', subjectId: 'math', topic: 'Eşitsizlikler', difficulty: 'medium',
    question: '$2x + 7 > 15$ eşitsizliğinin çözüm kümesi aşağıdakilerden hangisidir?',
    options: ['$x > 4$', '$x < 4$', '$x > 8$', '$x < 8$'], correctAnswer: 0,
    explanation: '$2x > 15 - 7 \\Rightarrow 2x > 8 \\Rightarrow x > 4$.'
  },
  {
    id: 'pdf2_mat_10',
    subjectId: 'math',
    topic: 'Çarpanlar ve Katlar',
    difficulty: 'medium',
    question: "Serra, 1'den 100'e kadar olan sayıların olduğu bir kartta; 2'nin pozitif tam sayı kuvvetlerini sarıya, 3'ün pozitif tam sayı kuvvetlerini maviye ve tam kare sayıları kırmızıya boyuyor. Sarı kareler kırmızıya boyanınca turuncu, mavi kareler kırmızıya boyanınca mor oluyor. Son durumda turuncu ve mor renkli kare sayıları kaç tanedir?",
    options: ['Turuncu: 3, Mor: 3', 'Turuncu: 3, Mor: 2', 'Turuncu: 2, Mor: 3', 'Turuncu: 2, Mor: 2'],
    correctAnswer: 1,
    explanation: 'Turuncu (Sarı ve Kırmızı): 2\'nin kuvveti olan tam kareler: $2^2=4$, $2^4=16$, $2^6=64$ (3 tane). Mor (Mavi ve Kırmızı): 3\'ün kuvveti olan tam kareler: $3^2=9$, $3^4=81$ (2 tane). Sonuç: Turuncu: 3, Mor: 2.'
  },
  {
    id: 'pdf2_mat_12',
    subjectId: 'math',
    topic: 'Üslü İfadeler',
    difficulty: 'hard',
    question: "Bir oyunda iki tabletten sayılar seçiliyor. Sayılar aynı ise karesi, farklı ise küçük sayı taban, büyük sayı üs olacak şekilde değer hesaplanıyor. İlk basışta aynı sayılar, ikinci basışta farklı sayılar geliyor. Birinci tablette {-3, 4, 2, -4}, ikinci tablette {2, 3, -2, -3} sayıları var. Hesaplanan değerlerin çarpımı en çok kaçtır?",
    options: ['$12^{4}$', '$18^{2}$', '$3^{6}$', '$2^{8}$'],
    correctAnswer: 2,
    explanation: 'En büyük sonuç için pozitif değerler seçilmelidir. İlk basışta aynı sayılardan gelebilecek en büyük değer $(-3)^2 = 9$ veya $2^2=4$\'tür. En büyüğü 9\'dur. İkinci basışta farklı sayılarla elde edilebilecek en büyük üslü ifade, birinci tabletten 4 ve ikinci tabletten 3 seçilerek $3^4 = 81$ olarak bulunur. Bu iki değerin çarpımı $9 \\cdot 81 = 3^2 \\cdot 3^4 = 3^6$ olur.'
  },
  {
    id: 'pdf2_mat_13',
    subjectId: 'math',
    topic: 'Üslü İfadeler',
    difficulty: 'medium',
    question: 'Boş iki tüpten birine $2^9$, diğerine $8^4$ bakteri konuluyor. Bir saat sonra birinci tüpteki bakteri sayısı 4 katına, ikincideki 8 katına çıkıyor. Son durumda birinci tüpteki bakterilerin yarısı, ikincidekinin 1/4\'ü alınıyor. İkinci tüpten alınan bakteri sayısı, birinci tüpten alınan bakteri sayısının kaç katıdır?',
    options: ['8', '4', '2', '16'],
    correctAnswer: 0,
    explanation: '1. tüpten alınan: $(2^9 \\cdot 4) / 2 = 2^{11} / 2 = 2^{10}$. 2. tüpten alınan: $(8^4 \\cdot 8) / 4 = ( (2^3)^4 \\cdot 2^3 ) / 2^2 = (2^{12} \\cdot 2^3) / 2^2 = 2^{15} / 2^2 = 2^{13}$. Kat sayısı: $2^{13} / 2^{10} = 2^3 = 8$.'
  },
  {
    id: 'pdf2_mat_14',
    subjectId: 'math',
    topic: 'Üslü İfadeler',
    difficulty: 'hard',
    question: 'A, B, C, D mikroorganizmalarının gerçek ve mikroskoptaki büyüklükleri verilmiştir. Büyütme oranı = (Mikroskopta Görülen / Gerçek Büyüklük) olduğuna göre, hangi canlı için kullanılan büyütme oranı en küçüktür? A: $2.5 \\cdot 10^{-1}$ -> 3.75; B: $3 \\cdot 10^{-2}$ -> 3; C: $1 \\cdot 10^{-4}$ -> 0.1; D: $2 \\cdot 10^{-3}$ -> 2.4',
    options: ['A mikroorganizması', 'B mikroorganizması', 'C mikroorganizması', 'D mikroorganizması'],
    correctAnswer: 0,
    explanation: 'A: $3.75 / 0.25 = 15$ kat. B: $3 / 0.03 = 100$ kat. C: $0.1 / 0.0001 = 1000$ kat. D: $2.4 / 0.002 = 1200$ kat. En küçük büyütme oranı A mikroorganizması için 15\'tir.'
  },
  {
    id: 'pdf2_mat_15',
    subjectId: 'math',
    topic: 'Bilimsel Gösterim',
    difficulty: 'medium',
    question: 'Yetişkin bir ağaç saatte ortalama 2.3 kg CO2 emilimi yapıyor. "Fidanlar, Fidanlarla Büyüyor!" projesinde dikilen 10 milyon fidanın tamamı yetişkinliğe erişirse, bir saatte yapacağı ortalama CO2 emiliminin ton cinsinden bilimsel gösterimi nedir? (1 ton = 1000 kg)',
    options: ['$2,3 \\cdot 10^{4}$', '$2,3 \\cdot 10^{5}$', '$2,3 \\cdot 10^{6}$', '$2,3 \\cdot 10^{7}$'],
    correctAnswer: 0,
    explanation: 'Toplam emilim (kg): $10,000,000 \\cdot 2.3 = 23,000,000$ kg. Tona çevirmek için 1000\'e böleriz: $23,000,000 / 1000 = 23,000$ ton. Bilimsel gösterimi: $2.3 \\cdot 10^4$ tondur.'
  },
  {
    id: 'pdf2_mat_16',
    subjectId: 'math',
    topic: 'Çarpanlar ve Katlar',
    difficulty: 'medium',
    question: 'Bir maraton yolunun soluna ve sağına sırasıyla su ve gıda istasyonları kurulacaktır. Yolun sonunda da karşılıklı birer istasyon olması isteniyor. Karşılıklı istasyon sayısının en az olması için mesafeler hangi seçenekteki gibi olmalıdır?',
    options: ['Su: 2.5 km, Gıda: 3.5 km', 'Su: 2.5 km, Gıda: 4.5 km', 'Su: 3 km, Gıda: 4 km', 'Su: 3 km, Gıda: 4.5 km'],
    correctAnswer: 1,
    explanation: 'Karşılıklı istasyon sayısının en az olması için, istasyon mesafelerinin en küçük ortak katının (EKOK) en büyük olması gerekir. A) EKOK(2.5, 3.5)=17.5. B) EKOK(2.5, 4.5)=22.5. C) EKOK(3, 4)=12. D) EKOK(3, 4.5)=9. En büyük EKOK değeri B seçeneğindedir.'
  },
  {
    id: 'pdf2_mat_17',
    subjectId: 'math',
    topic: 'Bilimsel Gösterim',
    difficulty: 'hard',
    question: 'Keşfedilen bir buzdağının uzunluğu 1600m, genişliği 1000m, su üzerindeki yüksekliği 50m\'dir. Görünen kısmının, buzdağının %20\'sini oluşturduğu tahmin ediliyor. Buzdağının tamamının hacminin metreküp cinsinden bilimsel gösterimi nedir?',
    options: ['$8 \\cdot 10^{7}$', '$2,4 \\cdot 10^{8}$', '$4 \\cdot 10^{8}$', '$8 \\cdot 10^{8}$'],
    correctAnswer: 2,
    explanation: 'Görünen kısmın hacmi: $1600 \\cdot 1000 \\cdot 50 = 80,000,000 = 8 \\cdot 10^7 m^3$. Bu hacim, toplam hacmin %20\'si (yani 1/5\'i) ise, toplam hacim $5 \\cdot (8 \\cdot 10^7) = 40 \\cdot 10^7 = 4 \\cdot 10^8 m^3$.'
  },
  {
    id: 'pdf2_mat_21',
    subjectId: 'math',
    topic: 'Aralarında Asal Sayılar',
    difficulty: 'hard',
    question: '4 haneli bir kilit şifresi oluşturuluyor. Soldan ilk iki hane (AB) ve son iki hane (CD) aralarında asal ise şifre aktif oluyor. Yiğit, ilk iki hanedeki (1B) sayısının asal çarpanlarını küçükten büyüğe son iki haneye (CD) yazıyor. Kilit aktif olduğuna göre B rakamı hangisi olabilir?',
    options: ['0', '5', '6', '8'],
    correctAnswer: 3,
    explanation: 'A=1 verilmiş. B=8 ise sayı 18 olur, asal çarpanları 2 ve 3\'tür. Şifrenin son iki hanesi 23 olur. EBOB(18, 23)=1 olduğu için aralarında asaldır. Diğer şıklar bu kuralı sağlamaz.'
  },
  {
    id: 'pdf2_mat_22',
    subjectId: 'math',
    topic: 'Çarpanlar ve Katlar',
    difficulty: 'medium',
    question: '3 katlı bir okulun her katında 1-5 arası sınıflar var. Salon numaraları "kat no + sınıf no" şeklinde (örn: 1. kat 4. sınıf -> 14). Eylül ve Zeynep, salon numarası asal olmayan ve sadece bir tane asal çarpanı olan farklı sınıflara giriyor. Bu iki salon numarasının EKOK\'u kaçtır?',
    options: ['100', '300', '600', '800'],
    correctAnswer: 3,
    explanation: 'Salon numaraları 11-15, 21-25, 31-35 arasındadır. Asal olmayan ve tek asal çarpanı olan sayılar, bir asal sayının kuvvetleridir. Bu aralıkta bu şartı sağlayan sayılar $5^2=25$ ve $2^5=32$\'dir. Bu iki sayının EKOK\'u, aralarında asal oldukları için çarpımlarıdır: EKOK(25, 32) = $25 \\cdot 32 = 800$.'
  },
  {
    id: 'pdf2_mat_23',
    subjectId: 'math',
    topic: 'Çarpanlar ve Katlar',
    difficulty: 'hard',
    question: 'Mavi (15m ip/tahta, 4TL/m) ve Pembe (12m ip/tahta, 5TL/m) iplerle kedi tırmalama tahtaları yapılıyor. İki renk ipten de eşit uzunlukta kullanılmış ve toplam maliyet 1400-1700 TL arasındadır. Toplam kaç tahta yapılmıştır?',
    options: ['21', '27', '28', '36'],
    correctAnswer: 1,
    explanation: 'Kullanılan ip uzunluğu EKOK(15, 12) = 60m\'nin bir katı olmalıdır. Her 60m için maliyet: Mavi: $60 \\cdot 4 = 240$ TL. Pembe: $60 \\cdot 5 = 300$ TL. Toplam: $240+300=540$ TL. Maliyet 1400-1700 arasında olduğuna göre, bu maliyetin 3 katını almalıyız: $540 \\cdot 3 = 1620$ TL. Bu durumda her ipten $60 \\cdot 3 = 180$ m kullanılmıştır. Mavi tahta sayısı: $180 / 15 = 12$. Pembe tahta sayısı: $180 / 12 = 15$. Toplam tahta sayısı: $12 + 15 = 27$.'
  },
  {
    id: 'pdf2_mat_25',
    subjectId: 'math',
    topic: 'Çarpanlar ve Katlar',
    difficulty: 'medium',
    question: 'Kare şeklindeki eş iki pencerenin tüllerinin orta kısmının genişliği, birinde pencere kenarının 1/4\'ü, diğerinde 1/6\'sına eşittir. Bu genişlikler tam sayı olduğuna göre, pencerenin alanı hangisi olabilir?',
    options: ['100', '121', '144', '169'],
    correctAnswer: 2,
    explanation: 'Pencerenin kenar uzunluğu hem 4\'e hem de 6\'ya tam bölünebilen bir sayı olmalıdır. Yani EKOK(4, 6) = 12\'nin bir katı olmalıdır. Şıklardaki alan değerlerinin kareköklerini alarak kenar uzunluklarını buluruz: 10, 11, 12, 13. Bu sayılardan sadece 12, 12\'nin katıdır. Dolayısıyla pencerenin alanı $12^2 = 144$ olabilir.'
  },
  {
    id: 'pdf2_mat_27',
    subjectId: 'math',
    topic: 'Üslü İfadeler',
    difficulty: 'medium',
    question: 'Sinyal gücü en fazla olan bölgeden arama başlayacaktır. Sinyal güçleri: 1.Bölge: $1.204$, 2.Bölge: $1.3$, 3.Bölge: $1.08$, 4.Bölge: $1.045$. Hangi bölgeden başlanmalıdır?',
    options: ['1. Bölge', '2. Bölge', '3. Bölge', '4. Bölge'],
    correctAnswer: 1,
    explanation: 'Sayıları ondalık olarak karşılaştırdığımızda en büyük değer 1.3\'tür. Dolayısıyla arama 2. Bölgeden başlamalıdır.'
  },
  {
    id: 'pdf2_mat_28',
    subjectId: 'math',
    topic: 'Aralarında Asal Sayılar',
    difficulty: 'hard',
    question: 'Beş karenin içine 3, 5, 7, 9, 11 sayılarından farklı biri yazılıyor. Bir doğru parçasıyla bağlı iki karedeki sayılar aralarında asal. Ortadaki boyalı kareye yazılabilecek sayıların toplamı kaçtır?',
    options: ['12', '16', '23', '26'],
    correctAnswer: 2,
    explanation: 'Ortadaki kare, etrafındaki dört kareyle de bağlantılıdır, yani hepsiyle aralarında asal olmalıdır. 3 ve 9 sayıları birbirleriyle aralarında asal olmadıkları için, bunlardan herhangi biri ortaya konulursa diğeriyle olan bağlantı kuralı bozulur. Geriye 5, 7 ve 11 sayıları kalır. Bu sayılar diğer tüm sayılarla aralarında asaldır ve ortaya konulabilirler. Toplamları: 5 + 7 + 11 = 23.'
  },
];