import rawCcstQuestions from "@/data/questions-ccst.json";
import rawCctQuestions from "@/data/questions-cct.json";
import type { ExamType, Question } from "@/types";

export const EXAM_LABELS: Record<ExamType, string> = {
  ccst: "CCST",
  cct: "CCT",
};

function isQuestion(value: unknown): value is Question {
  if (typeof value !== "object" || value === null) return false;
  const question = value as Record<string, unknown>;
  return (
    typeof question.id === "string" &&
    typeof question.domain === "string" &&
    (question.difficulty === "beginner" ||
      question.difficulty === "intermediate" ||
      question.difficulty === "advanced") &&
    typeof question.question === "string" &&
    question.question.trim().length > 0 &&
    Array.isArray(question.options) &&
    question.options.length === 4 &&
    new Set(question.options).size === 4 &&
    question.options.every(
      (option) => typeof option === "string" && option.trim().length > 0,
    ) &&
    typeof question.answer === "number" &&
    Number.isInteger(question.answer) &&
    question.answer >= 0 &&
    question.answer < 4 &&
    typeof question.explanation === "string" &&
    question.explanation.trim().length > 0 &&
    (question.reference === undefined ||
      typeof question.reference === "string")
  );
}

function validateBank(value: unknown, exam: ExamType): Question[] {
  if (!Array.isArray(value) || !value.every(isQuestion)) {
    throw new Error(`La banque de questions ${exam.toUpperCase()} contient une entrée invalide.`);
  }

  const ids = new Set(value.map((question) => question.id));
  if (ids.size !== value.length) {
    throw new Error(`La banque de questions ${exam.toUpperCase()} contient des identifiants dupliqués.`);
  }

  return value;
}

const questionBanks: Record<ExamType, Question[]> = {
  ccst: validateBank(rawCcstQuestions as unknown, "ccst"),
  cct: validateBank(rawCctQuestions as unknown, "cct"),
};

export function getQuestions(exam: ExamType): Question[] {
  return questionBanks[exam];
}

export function getDomains(exam: ExamType): string[] {
  return Array.from(new Set(getQuestions(exam).map((q) => q.domain)));
}
