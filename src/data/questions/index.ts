import { Question } from "@/types";
import { turkishQuestions } from "./turkish";
import { mathQuestions } from "./math";
import { scienceQuestions } from "./science";
import { englishQuestions } from "./english";
import { revolutionQuestions } from "./revolution";
import { religionQuestions } from "./religion";

export const questions: Question[] = [
  ...turkishQuestions,
  ...mathQuestions,
  ...scienceQuestions,
  ...englishQuestions,
  ...revolutionQuestions,
  ...religionQuestions,
];