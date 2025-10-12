import { Question } from "@/types";
import { turkishQuestions } from "./turkish";
import { mathQuestions } from "./math";
import { scienceQuestions } from "./science";
import { englishQuestions } from "./english";
import { revolutionQuestions } from "./revolution";
import { religionQuestions } from "./religion";

// Tüm soru dizilerini tek bir büyük diziye toplayalım
const allRawQuestions = [
  ...turkishQuestions,
  ...mathQuestions,
  ...scienceQuestions,
  ...englishQuestions,
  ...revolutionQuestions,
  ...religionQuestions,
];

// Olası kopyala-yapıştır hatalarından kaynaklanan 'boş' veya 'tanımsız' verileri
// diziden otomatik olarak temizleyen akıllı bir filtre ekleyelim.
export const questions: Question[] = allRawQuestions.filter(question => question);