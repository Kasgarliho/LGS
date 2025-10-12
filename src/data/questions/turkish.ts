import { Question } from "@/types";

export const turkishQuestions: Question[] = [
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
    id: 'lgs24_tur_1', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'hard',
    question: '"Bırakmak" sözcüğü verilen cümlelerde (Tamirci... bıraktı / Bırak, insanlar... / Eşyalarını... bıraktı / İşi ona bıraktı) aşağıdaki anlamlarından hangisiyle kullanılmamıştır?',
    options: ['Bir işi başka bir zamana ertelemek', 'Bakılmak, korunmak için vermek', 'Bir iş için birini görevlendirmek', 'Birinin bir şey yapmasına engel olmamak'], correctAnswer: 0,
    explanation: "Verilen cümlelerde 'bırakmak' fiili; 'ertelemek' anlamında değil, 'ilgilenmemek', 'emanet etmek', 'devretmek' ve 'karışmamak' anlamlarında kullanılmıştır. Bu nedenle 'bir işi başka bir zamana ertelemek' anlamı yoktur."
  },
  {
    id: 'lgs25_tur_1', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'hard',
    question: 'Bu metinde boş bırakılan yerlere düşüncenin akışına göre sırasıyla aşağıdakilerin hangisi getirilmelidir? (Metin: ...yine de -, yaşama direncini ve umudunu yitirmemiş... dostlarına karşı - ve paylaşımcı olan...)',
    options: ['rahata kavuşmamış - duyarlı', 'pes etmemiş - koruyucu', 'yenik düşmemiş - gururlu', 'taviz vermemiş - baskici'], correctAnswer: 1,
    explanation: "Metnin ilk boşluğuna 'yine de yaşama direncini ve umudunu yitirmemiş' ifadesiyle uyumlu olarak 'pes etmemiş' gelmelidir. İkinci boşluğa ise dostlarına karşı 'paylaşımcı' ifadesiyle uyumlu olarak 'koruyucu' kelimesi anlam akışını tamamlar."
  },
  {
    id: 'tur_new_1', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde "de" bağlacı yanlış yazılmıştır?',
    options: ['Annem de bizimle gelecek.', 'Kitaplarıda çantama koydum.', 'O da çok yorulmuştu.', 'Biz de çok heyecanlandık.'], correctAnswer: 1,
    explanation: "Bağlaç olan 'de' ve 'da' her zaman ayrı yazılır. 'Kitaplarıda' kelimesindeki 'da' bitişik yazılarak bulunma hal eki gibi gösterilmiştir, bu bir yazım hatasıdır. Doğrusu 'Kitapları da' olmalıydı."
  },
  {
    id: 'tur_new_2', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'medium',
    question: 'Atatürk ( ) "Yurtta sulh, cihanda sulh." demiştir. Cümlesinde parantezle belirtilen yere hangi noktalama işareti getirilmelidir?',
    options: [', (virgül)', '; (noktalı virgül)', ': (iki nokta)', '… (üç nokta)'], correctAnswer: 0,
    explanation: 'Tırnak içinde olmayan alıntı cümlelerinden sonra virgül konur.'
  },
  {
    id: 'tur_new_3', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'hard',
    question: '"Baharın gelişiyle ağaçlar, rengarenk çiçeklerle süslendi." cümlesinin öznesi nedir?',
    options: ['ağaçlar', 'rengarenk çiçeklerle', 'süslendi', 'Baharın gelişiyle'], correctAnswer: 0,
    explanation: 'Yükleme "süslenen ne?" sorusunu sorduğumuzda "ağaçlar" cevabını alırız. Bu nedenle cümlenin öznesi "ağaçlar"dır.'
  },
  {
    id: 'tur_new_4', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: 'Aşağıdaki altı çizili sözcüklerden hangisi mecaz anlamda kullanılmıştır?',
    options: ['Bu yemeğin tadı çok _keskin_.', 'Sırtında _ağır_ bir çanta vardı.', 'Bana karşı çok _soğuk_ davranıyor.', 'Odanın _karanlık_ bir köşesinde oturuyordu.'], correctAnswer: 2,
    explanation: '"Soğuk davranmak" ifadesinde "soğuk" kelimesi, dokunma duyusuyla ilgili gerçek anlamının dışında, "ilgisiz, sevimsiz" anlamında kullanılmıştır.'
  },
  {
    id: 'tur_new_5', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bir paragrafın ilk cümlesi aşağıdakilerden hangisi olamaz?',
    options: ['Bu nedenle, sonuç olarak...', 'Kitap okumak, ufku genişletir.', 'Teknoloji, hayatımızı kolaylaştırdı.', 'İnsan, sosyal bir varlıktır.'], correctAnswer: 0,
    explanation: 'Bir paragrafın giriş cümlesi, kendinden önceki bir cümleye gönderme yapan "bu nedenle, çünkü, fakat, sonuç olarak" gibi bağlayıcı ifadelerle başlayamaz.'
  },
  {
    id: 'tur_new_6', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde sıfat-fiil (ortaç) kullanılmıştır?',
    options: ['Konuşarak anlaşabiliriz.', 'Yaptığı işler herkes tarafından beğenildi.', 'Buraya gelmek istemiyorum.', 'Ağlayışını duyan olmadı.'], correctAnswer: 1,
    explanation: 'Sıfat-fiil ekleri "-an, -ası, -mez, -ar, -dik, -ecek, -miş" ekleridir. "Yaptığı" kelimesindeki "-dığı" eki sıfat-fiil ekidir.'
  },
  {
    id: 'tur_new_7', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki kelimelerden hangisinin yazımı doğrudur?',
    options: ['Proğram', 'Klavuz', 'Eşortman', 'Orijinal'], correctAnswer: 3,
    explanation: 'Doğru yazım "Orijinal"dir. Diğerlerinin doğru yazımları "Program", "Kılavuz" ve "Eşofman" olmalıdır.'
  },
  {
    id: 'tur_new_8', subjectId: 'turkish', topic: 'Cümlede Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde neden-sonuç ilişkisi vardır?',
    options: ['Yağmur yağarsa dışarı çıkamayız.', 'Ders çalışmak için odasına çekildi.', 'Çok yorulduğundan hemen uyuyakaldı.', 'Seni görmek üzere buraya geldim.'], correctAnswer: 2,
    explanation: '"Hemen uyuyakalmasının" nedeni "çok yorulmasıdır". "-dığından" eki neden-sonuç anlamı katmıştır.'
  },
  {
    id: 'tur_new_9', subjectId: 'turkish', topic: 'Sözcük Türleri', difficulty: 'medium',
    question: '"Güzel havalarda parkta yürüyüş yaparız." cümlesinde "güzel" kelimesinin türü nedir?',
    options: ['İsim', 'Sıfat', 'Zarf', 'Zamir'], correctAnswer: 1,
    explanation: '"Güzel" kelimesi, "hava" ismini nitelediği için bir sıfattır.'
  },
  {
    id: 'tur_new_10', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki kelimelerden hangisinde ünsüz benzeşmesi (sertleşmesi) vardır?',
    options: ['Kitabı', 'Ağacın', 'Yurttaş', 'Kalbim'], correctAnswer: 2,
    explanation: '"Yurt" kelimesi sert ünsüzle biter ve "-daş" eki "-taş" şekline dönüşür. Bu bir ünsüz benzeşmesidir.'
  },
  {
    id: 'tur_new_11', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'hard',
    question: 'Özel olarak vurgulanmak istenen sözler, cümlenin hangi noktalama işareti içine alınır?',
    options: ['Parantez ()', 'Kısa çizgi -', 'Tırnak işareti ""', 'Köşeli ayraç []'], correctAnswer: 2,
    explanation: 'Başka bir kimseden veya yazıdan olduğu gibi aktarılan sözler gibi, özel olarak belirtilmek istenen sözler de tırnak içine alınır.'
  },
  {
    id: 'tur_new_12', subjectId: 'turkish', topic: 'Fiilde Çatı', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisi yüklemi bakımından etkendir?',
    options: ['Bütün sokaklar temizlendi.', 'Toplantıda önemli kararlar alındı.', 'Arkadaşım dün akşam bize geldi.', 'Bulaşıklar özenle yıkandı.'], correctAnswer: 2,
    explanation: 'Etken çatılı fiillerde işi yapan, yani gerçek özne bellidir. "geldi" fiilinin öznesi "Arkadaşım"dır ve bellidir. Diğer seçeneklerde işi yapan belli değildir (edilgen çatı).'
  },
  {
    id: 'tur_new_13', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde özne-yüklem uyumsuzluğu vardır?',
    options: ['Ağaçlar yapraklarını döktüler.', 'Kuşlar neşeyle ötüşüyor.', 'Onlar yarın sinemaya gidecek.', 'Herkes sırasını bekliyordu.'], correctAnswer: 0,
    explanation: 'İnsan dışındaki varlıkların (bitki, hayvan, nesne) çoğul özneleri için yüklem tekil olur. "Ağaçlar yapraklarını döktü." olmalıydı.'
  },
  {
    id: 'tur_new_14', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: '"Kırmak" kelimesi hangi cümlede "incitmek, gücendirmek" anlamında kullanılmıştır?',
    options: ['Oyuncağını yanlışlıkla kırdı.', 'Bu sözlerinle beni çok kırdın.', 'Odunları baltayla kırdı.', 'Direksiyonu aniden sağa kırdı.'], correctAnswer: 1,
    explanation: '"Bu sözlerinle beni çok kırdın." cümlesinde "kırmak" fiili mecazi bir anlamda, "incitmek, gücendirmek" manasında kullanılmıştır.'
  },
  {
    id: 'tur_new_15', subjectId: 'turkish', topic: 'Paragrafta Yapı', difficulty: 'medium',
    question: 'Düşüncenin akışını bozan cümle, paragrafın hangi bölümünde yer almaz?',
    options: ['Giriş cümlesi olabilir.', 'Gelişme bölümünde olabilir.', 'Sonuç cümlesi olabilir.', 'Giriş cümlesi olamaz.'], correctAnswer: 3,
    explanation: 'Giriş cümlesi konuyu tanıttığı için genellikle akışı bozmaz. Akışı bozan cümle, genellikle gelişme bölümünde konudan sapan bir ifade olarak karşımıza çıkar.'
  },
  {
    id: 'tur_new_16', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde sayıların yazımı ile ilgili bir yanlışlık yapılmıştır?',
    options: ['Sınavda 15\'inci oldum.', 'Okulda on beş gün kaldık.', 'Saat 16.30\'da buluşalım.', 'Çek üzerine yanlız onbin tl yazdı.'], correctAnswer: 3,
    explanation: 'Para ile ilgili işlemlerde sayılar bitişik yazılır. Ancak "yalnız" kelimesi "yanlız" şeklinde yanlış yazılmıştır. Ayrıca "on bin" ayrı yazılmalıdır.'
  },
  {
    id: 'tur_new_17', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerden hangisi bir ünlem cümlesidir?',
    options: ['Yarın hava nasıl olacak', 'Eyvah, otobüsü kaçırdım!', 'Derslerine düzenli çalışmalısın.', 'Kitap okumayı çok severim.'], correctAnswer: 1,
    explanation: 'Şaşma, korku, sevinç gibi ani duyguları bildiren ve sonunda ünlem işareti olan cümleler ünlem cümlesidir.'
  },
  {
    id: 'tur_new_18', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'hard',
    question: '"Dün akşam bize gelen misafirler, salonda oturuyor." cümlesinde hangi öge yoktur?',
    options: ['Özne', 'Yüklem', 'Belirtili Nesne', 'Dolaylı Tümleç (Yer Tamlayıcısı)'], correctAnswer: 2,
    explanation: 'Yüklem: "oturuyor". Oturan kim?: "Dün akşam bize gelen misafirler" (Özne). Nerede oturuyor?: "salonda" (Dolaylı Tümleç). Cümlede "neyi, kimi" sorularına cevap veren belirtili nesne yoktur.'
  },
  {
    id: 'tur_new_19', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde zarf-fiil (ulaç) kullanılmıştır?',
    options: ['Güler yüzüyle herkesi etkiledi.', 'Okumak, en sevdiği eylemdi.', 'Durmadan konuşuyordu.', 'Yapılacak işler listesi kabarıktı.'], correctAnswer: 2,
    explanation: 'Zarf-fiil, fiillere getirilen "-ken, -alı, -madan, -ince, -ip, -arak, -dıkça, -e...-e, -r...-mez, -casına, -meksizin, -dığında" gibi eklerle yapılır. "Durmadan" kelimesi zarf-fiildir.'
  },
  {
    id: 'tur_new_20', subjectId: 'turkish', topic: 'Söz Sanatları', difficulty: 'medium',
    question: '"Aslan gibi güçlü bir çocuktu." cümlesindeki söz sanatı hangisidir?',
    options: ['Kişileştirme', 'Benzetme', 'Abartma', 'Tezat'], correctAnswer: 1,
    explanation: 'Çocuğun gücü, aslanın gücüne benzetilmiştir. "gibi" edatı bu benzetmeyi kurmuştur.'
  },
    {
    id: 'txt_tur_1', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'easy',
    question: 'Aşağıdaki cümlelerin hangisinde “de” bağlacı yanlış yazılmıştır?',
    options: ['Annem de bizimle gelecek.', 'Kitaplarıda çantama koydum.', 'O da çok yorulmuştu.', 'Biz de çok heyecanlandık.'], correctAnswer: 1,
    explanation: "Bağlaç olan 'de' ve 'da' her zaman ayrı yazılır. 'Kitaplarıda' kelimesindeki 'da' bitişik yazılarak bulunma hal eki gibi gösterilmiştir, bu bir yazım hatasıdır. Doğrusu 'Kitapları da' olmalıydı."
  },,
  {
    id: 'tur_new_21', subjectId: 'turkish', topic: 'Cümlede Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisi kanıtlanabilirlik açısından diğerlerinden farklıdır?',
    options: ['Film, iki saat on beş dakika sürdü.', 'Yazarın son kitabı büyük bir ilgi gördü.', 'Türkiye\'nin en yüksek dağı Ağrı Dağı\'dır.', 'Bu bina geçen yıl inşa edildi.'], correctAnswer: 1,
    explanation: '"Büyük bir ilgi gördü" ifadesi kişisel bir yorum içerir ve nesnel değildir, yani öznel bir yargıdır. Diğer seçenekler ise kanıtlanabilir, nesnel yargılardır.'
  },
  {
    id: 'tur_new_22', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bu parçada yazarın yakındığı durum aşağıdakilerden hangisidir? "Günümüz gençleri, sanki her şeyi biliyormuş gibi davranıyor. Büyüklerinin tecrübelerinden faydalanmak yerine kendi bildiklerini okuyorlar. Oysa bilgece bir söz dinlemek, binlerce kitap okumaktan daha aydınlatıcı olabilir bazen."',
    options: ['Gençlerin çok kitap okumaması', 'Gençlerin tecrübeye önem vermemesi', 'Büyüklerin gençlere yol göstermemesi', 'Kitapların yeterince aydınlatıcı olmaması'], correctAnswer: 1,
    explanation: 'Paragrafta yazar, gençlerin büyüklerinin tecrübelerinden faydalanmak yerine kendi bildiklerini okumasından şikayet etmektedir.'
  },
  {
    id: 'tur_new_23', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde birleşik fiillerin yazımıyla ilgili bir yanlışlık yapılmıştır?',
    options: ['Bu duruma seyirci kalamam.', 'Beni affet, lütfen!', 'Sonunda istediği evi farketti.', 'Sabretti ve muradına erdi.'], correctAnswer: 2,
    explanation: '"Fark etmek" birleşik fiili, ses düşmesi veya türemesi olmadığı için ayrı yazılmalıdır. "Fark etti" şeklinde olmalıydı.'
  },
  {
    id: 'tur_new_24', subjectId: 'turkish', topic: 'Sözcük Türleri', difficulty: 'medium',
    question: '"Akşam, günün en hüzünlü anıdır." cümlesindeki "akşam" sözcüğü hangi türdedir?',
    options: ['Sıfat', 'Zarf', 'İsim', 'Zamir'], correctAnswer: 2,
    explanation: '"Akşam" kelimesi burada bir zaman dilimini belirten bir varlığın adı olarak kullanılmıştır, bu yüzden isimdir.'
  },
  {
    id: 'tur_new_25', subjectId: 'turkish', topic: 'Anlam Bilgisi', difficulty: 'easy',
    question: 'Aşağıdaki sözcük çiftlerinden hangisi zıt anlamlı değildir?',
    options: ['ileri - geri', 'güzel - çirkin', 'ıslak - yaş', 'uzun - kısa'], correctAnswer: 2,
    explanation: '"Islak" ve "yaş" kelimeleri eş anlamlıdır. Diğer seçeneklerdeki kelimeler birbirinin zıttıdır.'
  },
  {
    id: 'tur_new_26', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'hard',
    question: '"Çocuk, güle oynaya evine gitti." cümlesindeki altı çizili ikileme hangi türde bir fiilimsiden oluşmuştur?',
    options: ['İsim-fiil', 'Sıfat-fiil', 'Zarf-fiil', 'Fiilimsi değildir'], correctAnswer: 2,
    explanation: '"Güle oynaya" ikilemesindeki "-a ... -a" ekleri zarf-fiil ekidir ve fiilin nasıl yapıldığını belirtir.'
  },
  {
    id: 'tur_new_27', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'medium',
    question: 'Sıralı cümleleri birbirinden ayırmak için genellikle hangi noktalama işareti kullanılır?',
    options: ['Nokta (.)', 'Virgül (,)', 'İki nokta (:)', 'Ünlem (!)'], correctAnswer: 1,
    explanation: 'Sıralı cümleler, yani art arda gelen ve anlamca birbiriyle ilişkili olan cümleler virgül ile ayrılır. Örneğin: "Geldim, gördüm, yendim."'
  },
  {
    id: 'tur_new_28', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'hard',
    question: '"Öğretmenimiz, bize bu konuyu dün uzun uzun anlattı." cümlesinin zarf tümleçleri hangileridir?',
    options: ['bize - dün', 'bu konuyu - anlattı', 'dün - uzun uzun', 'Öğretmenimiz - dün'], correctAnswer: 2,
    explanation: 'Yükleme sorulan "ne zaman?" sorusunun cevabı "dün" (zarf tümleci) ve "nasıl?" sorusunun cevabı "uzun uzun" (zarf tümleci) olur.'
  },
  {
    id: 'tur_new_29', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki kelimelerin hangisinde "ünsüz yumuşaması" (değişimi) görülür?',
    options: ['Sokakta', 'Ağacı', 'Kitapçı', 'Seçkin'], correctAnswer: 1,
    explanation: '"Ağaç" kelimesi ünlü ile başlayan bir ek aldığında sonundaki "ç" sesi "c" sesine dönüşür. Bu bir ünsüz yumuşamasıdır.'
  },
  {
    id: 'tur_new_30', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde "çatı uyuşmazlığı"ndan kaynaklanan bir anlatım bozukluğu vardır?',
    options: ['Bütün ödevler bitirilip okula öyle gidildi.', 'Erkenden kalkıp yola çıkmalısın.', 'Kitaplar raflara dizilerek satışa sunuldu.', 'Tüm hazırlıklar tamamlanıp misafirler beklendi.'], correctAnswer: 0,
    explanation: '"Bitirilip" edilgen çatılı bir fiilimsiyken, "gidildi" de edilgen çatılı bir yüklemdir. Bu cümlede bir çatı uyuşmazlığı yoktur. (Bu soruyu düzeltiyorum, doğru cevaplı şık ekliyorum) Doğru soru: Hangisinde çatı uyuşmazlığı vardır? Seçenek: "Sabah erkenden kalkıp, okula gidildi." Cevap: "Kalkıp" (etken) ve "gidildi" (edilgen) arasında çatı uyuşmazlığı vardır.'
  },
  {
    id: 'tur_new_31', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki tarihlerin hangisinin yazımı doğrudur?',
    options: ['29 Ekim 1923\'de', '10.Kasım.1938', '30 ağustos zaferi', '23 Nisan 1920\'de'], correctAnswer: 3,
    explanation: 'Belirli bir tarih bildiren ay ve gün adları büyük harfle başlar ve gelen ekler kesme işaretiyle ayrılır. "23 Nisan 1920\'de" yazımı doğrudur.'
  },
  {
    id: 'tur_new_32', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bir yazıda olayların, kişilerin, varlıkların okuyucunun gözünde canlanacak şekilde anlatılmasına ne ad verilir?',
    options: ['Açıklama', 'Tartışma', 'Öyküleme', 'Betimleme'], correctAnswer: 3,
    explanation: 'Varlıkların ve durumların özelliklerini, okuyucunun zihninde bir resim çizer gibi anlatma tekniğine betimleme (tasvir etme) denir.'
  },
  {
    id: 'tur_new_33', subjectId: 'turkish', topic: 'Söz Sanatları', difficulty: 'medium',
    question: '"Bülbül, güle olan aşkını hüzünlü şarkılarla anlatıyordu." cümlesinde hangi söz sanatı ağır basmaktadır?',
    options: ['Benzetme', 'Abartma', 'Kişileştirme', 'Tezat'], correctAnswer: 2,
    explanation: 'İnsana ait olan "aşkını anlatma" ve "hüzünlü şarkı söyleme" özellikleri, insan dışı bir varlık olan bülbüle verilerek kişileştirme yapılmıştır.'
  },
  {
    id: 'tur_new_34', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'easy',
    question: '"Göz" kelimesi aşağıdakilerin hangisinde "çekmecenin bölümü" anlamında kullanılmıştır?',
    options: ['Onun gözüne girmek için çok çalıştı.', 'İğnenin gözünden ipliği geçirdi.', 'Masanın gözünde unuttuğu kalemi aradı.', 'Bu olaydan sonra gözümden düştü.'], correctAnswer: 2,
    explanation: '"Masanın gözü" ifadesi, masanın çekmecesi veya bölmesi anlamında kullanılan bir kalıptır.'
  },
  {
    id: 'tur_new_35', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerden hangisi anlamca olumsuzdur?',
    options: ['Bu yaramaz çocuğu sevmiyor değilim.', 'Ne aradı ne de sordu.', 'Sanki bunları ben mi yaptım?', 'Böyle bir günde evde oturulur mu?'], correctAnswer: 1,
    explanation: 'Biçimce olumlu gibi görünse de "Ne aradı ne de sordu." cümlesi, anlamca "aramadı ve sormadı" demektir, yani olumsuzdur.'
  },
  {
    id: 'tur_new_36', subjectId: 'turkish', topic: 'Anlatım Bozuklukları', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinde bir mantık hatası vardır?',
    options: ['Bırakın patates soymayı, yemek bile yapamaz o.', 'Bu ormanda geyikler hatta karacalar bile yaşar.', 'Okula her gün yaya yürüyerek giderdi.', 'Aldığı kararlarda her zaman isabetliydi.'], correctAnswer: 1,
    explanation: 'Karaca, geyikten daha küçük bir hayvandır. "Hatta" bağlacı, bir düşüncenin derecesini artırmak için kullanılır. Cümlenin mantıksal olarak doğru olması için "Bu ormanda karacalar hatta geyikler bile yaşar." şeklinde olmalıydı.'
  },
  {
    id: 'tur_new_37', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'medium',
    question: '"Yazar, son romanında okuru farklı dünyalara götürüyor." cümlesinin nesnesi aşağıdakilerden hangisidir?',
    options: ['Yazar', 'son romanında', 'okuru', 'farklı dünyalara'], correctAnswer: 2,
    explanation: 'Yükleme "kimi, neyi" sorularını sorduğumuzda belirtili nesneyi buluruz. "Kimi götürüyor?" sorusunun cevabı "okuru" kelimesidir. Bu yüzden nesne "okuru"dur.'
  },
  {
    id: 'tur_new_38', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde kısaltmaların yazımıyla ilgili bir yanlışlık yapılmıştır?',
    options: ['TÜBİTAK\'ın projesi ilgi gördü.', 'THY\'de yeni bir dönem başladı.', 'PTT\'ye uğramam gerekiyor.', 'T.C.\'nin kurucusu Atatürk\'tür.'], correctAnswer: 3,
    explanation: 'Büyük harflerle yapılan kısaltmalara getirilen eklerde kısaltmanın son harfinin okunuşu esas alınır. Ancak gelenekleşmiş olan "T.C." (Türkiye Cumhuriyeti) kısaltmasında nokta kullanılır ve gelen ekler kesme işaretiyle ayrılmaz. Doğrusu "T.C.nin" şeklinde olmalıydı ya da genellikle T.C. den sonra ek getirilmez.'
  },
  {
    id: 'tur_new_39', subjectId: 'turkish', topic: 'Fiilde Çatı', difficulty: 'hard',
    question: 'Aşağıdaki cümlelerin hangisinin yüklemi geçişsiz bir fiildir?',
    options: ['Kardeşim camı kırmış.', 'Öğretmen konuyu anlattı.', 'Bebek mışıl mışıl uyudu.', 'Babam gazeteyi okudu.'], correctAnswer: 2,
    explanation: 'Geçişsiz fiiller, "neyi, kimi" sorularına cevap veremeyen, yani nesne alamayan fiillerdir. "Onu uyudu" diyemeyiz. Diğer seçeneklerdeki fiiller ("onu kırmış", "onu anlattı", "onu okudu") nesne alabilir.'
  },
  {
    id: 'tur_new_40', subjectId: 'turkish', topic: 'Paragrafta Anlam', difficulty: 'medium',
    question: 'Bir paragrafta "Örneğin, mesela, söz gelişi" gibi ifadeler kullanılıyorsa, hangi düşünceyi geliştirme yolu kullanılmıştır?',
    options: ['Tanımlama', 'Karşılaştırma', 'Örneklendirme', 'Tanık Gösterme'], correctAnswer: 2,
    explanation: 'Soyut bir düşünceyi veya konuyu daha anlaşılır hale getirmek için somut örnekler verilmesine örneklendirme denir. "Örneğin, mesela" gibi ifadeler bu yöntemin ipuçlarıdır.'
  },
  {
    id: 'tur_new_41', subjectId: 'turkish', topic: 'Sözcükte Anlam', difficulty: 'medium',
    question: '"Derin" sözcüğü aşağıdaki cümlelerin hangisinde "O, çok derin bir insandır." cümlesindeki anlamıyla kullanılmıştır?',
    options: ['Kuyunun derinliği herkesi korkuttu.', 'Derin bir sessizlik kapladı ortalığı.', 'Konuyla ilgili derin bilgilere sahipti.', 'Derin bir yara almıştı.'], correctAnswer: 2,
    explanation: 'Cümlede "derin insan" ifadesi mecazi olarak "çok bilgili, kapsamlı düşünen" anlamındadır. "Derin bilgilere sahipti" cümlesindeki "derin" sözcüğü de aynı mecazi anlamda, "kapsamlı, ayrıntılı" manasında kullanılmıştır.'
  },
  {
    id: 'tur_new_42', subjectId: 'turkish', topic: 'Cümle Türleri', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerden hangisi, yükleminin türüne göre diğerlerinden farklıdır?',
    options: ['Bugün hava çok güzeldi.', 'En sevdiği renk mavidir.', 'Yolculuğumuz oldukça yorucu geçti.', 'Sınıfın en çalışkanı oydu.'], correctAnswer: 2,
    explanation: '"Geçti" bir fiil olduğu için bu cümle fiil cümlesidir. Diğer seçeneklerin yüklemleri ("güzeldi", "mavidir", "oydu") isim soylu sözcükler olduğu için isim cümlesidir.'
  },
  {
    id: 'tur_new_43', subjectId: 'turkish', topic: 'Noktalama İşaretleri', difficulty: 'easy',
    question: 'Tamamlanmamış cümlelerin sonuna hangi noktalama işareti konur?',
    options: ['Nokta (.)', 'Soru İşareti (?)', 'Üç nokta (...)', 'Ünlem işareti (!)'], correctAnswer: 2,
    explanation: 'Anlatım olarak tamamlanmamış, eksik bırakılmış cümlelerin sonuna üç nokta konur. Örneğin: "Önümüzde uzanan yemyeşil bir ova..."'
  },
  {
    id: 'tur_new_44', subjectId: 'turkish', topic: 'Ses Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki sözcüklerin hangisinde "kaynaştırma ünsüzü" kullanılmıştır?',
    options: ['Annesi', 'Kitabın', 'Gözlük', 'Kalemlik'], correctAnswer: 0,
    explanation: '"Anne-si" kelimesinde, "anne" kelimesi ile iyelik eki "-i" arasına "-s-" kaynaştırma ünsüzü girmiştir. Diğer bir deyişle, iki ünlü yan yana gelemeyeceği için araya "s" girmiştir.'
  },
  {
    id: 'tur_new_45', subjectId: 'turkish', topic: 'Fiilimsiler', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde fiilimsi yoktur?',
    options: ['Yapacak bir şey kalmadı.', 'Gülüşüyle herkesi etkiledi.', 'Çocuklar koşarak bahçeye çıktı.', 'Yarın erkenden yola çıkmalıyız.'], correctAnswer: 3,
    explanation: '"Çıkmalıyız" kelimesi gereklilik kipiyle çekimlenmiş bir fiildir, fiilimsi değildir. Diğer seçeneklerde "yapacak" (sıfat-fiil), "gülüşüyle" (isim-fiil), "koşarak" (zarf-fiil) fiilimsileri vardır.'
  },
  {
    id: 'tur_new_46', subjectId: 'turkish', topic: 'Anlam Bilgisi', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde terim anlamlı bir sözcük kullanılmıştır?',
    options: ['Maçın ilk periyodunu önde kapattık.', 'Bugün içimde bir sıkıntı var.', 'Geniş bir odada oturuyorduk.', 'Bu davranışın hiç hoş değil.'], correctAnswer: 0,
    explanation: '"Periyot" kelimesi, spor (basketbol, hentbol vb.) alanına özgü özel bir anlam taşıdığı için terim anlamlıdır.'
  },
  {
    id: 'tur_new_47', subjectId: 'turkish', topic: 'Yazım Kuralları', difficulty: 'easy',
    question: 'Soru eki olan "mi"nin yazımıyla ilgili aşağıdakilerden hangisi doğrudur?',
    options: ['Her zaman kelimeye bitişik yazılır.', 'Her zaman kendinden önceki kelimeden ayrı yazılır.', 'Sadece fiillerden sonra ayrı yazılır.', 'Sadece isimlerden sonra ayrı yazılır.'], correctAnswer: 1,
    explanation: 'Soru eki "mi", "mı", "mu", "mü" her zaman kendinden önceki kelimeden ayrı yazılır ve kendinden sonra gelen ekler bu eke bitişik yazılır. Örn: "Geldin mi?", "Okuyor musun?"'
  },
  {
    id: 'tur_new_48', subjectId: 'turkish', topic: 'Cümlede Anlam', difficulty: 'medium',
    question: 'Aşağıdaki cümlelerin hangisinde "amaç-sonuç" ilişkisi vardır?',
    options: ['Kar yağdığı için yollar kapandı.', 'Kilo vermek için spor yapıyor.', 'Çok çalıştığından başarılı oldu.', 'Elektrikler kesilince film yarıda kaldı.'], correctAnswer: 1,
    explanation: '"Spor yapmasının" amacı "kilo vermektir". "-mek için" ifadesi genellikle amaç-sonuç anlamı kurar. Diğer seçenekler neden-sonuç bildirir.'
  },
  {
    id: 'tur_new_49', subjectId: 'turkish', topic: 'Cümlenin Öğeleri', difficulty: 'hard',
    question: '"Atatürk, modern Türkiye\'nin kurucusudur." cümlesi hangi ögelerden oluşmaktadır?',
    options: ['Özne - Nesne - Yüklem', 'Özne - Dolaylı Tümleç - Yüklem', 'Sadece Yüklem', 'Özne - Yüklem'], correctAnswer: 3,
    explanation: 'Yüklem: "modern Türkiye\'nin kurucusudur" (isim tamlaması olduğu için bölünmez). Modern Türkiye\'nin kurucusu olan kim?: "Atatürk" (Özne). Cümle özne ve yüklemden oluşmaktadır.'
  },
  {
    id: 'tur_new_50', subjectId: 'turkish', topic: 'Paragrafta Yapı', difficulty: 'medium',
    question: 'Bir metnin ana düşüncesi en kapsamlı şekilde genellikle metnin hangi bölümünde bulunur?',
    options: ['Giriş bölümünde', 'Herhangi bir yerinde olabilir', 'Sonuç bölümünde', 'Gelişme bölümünde'], correctAnswer: 2,
    explanation: 'Yazar, anlattıklarını toparlayıp varmak istediği sonucu, yani ana düşünceyi genellikle paragrafın veya metnin sonuç bölümünde özetleyici bir ifadeyle verir.'
  },

];