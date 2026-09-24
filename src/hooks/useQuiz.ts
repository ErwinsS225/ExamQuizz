import { useCallback, useMemo, useState } from "react";
import { getQuestions } from "@/data/questionBanks";
import type { QuizConfig, QuizSession, SessionQuestion } from "@/types";
import { shuffle, uid, percent } from "@/lib/utils";

function buildSession(config: QuizConfig): QuizSession {
  const questionsByExam = config.difficulty
    ? getQuestions(config.exam).filter(
        (question) => question.difficulty === config.difficulty,
      )
    : getQuestions(config.exam);
  const pool = config.questionIds
    ? questionsByExam.filter((question) =>
        config.questionIds?.includes(question.id),
      )
    : config.domains.length
      ? questionsByExam.filter((question) =>
          config.domains.includes(question.domain),
        )
      : questionsByExam;

  const picked = shuffle(pool).slice(0, Math.min(config.count, pool.length));

  const questions: SessionQuestion[] = picked.map((q) => {
    const order = shuffle(q.options.map((_, i) => i));
    return {
      source: q,
      options: order.map((i) => q.options[i]),
      correctIndex: order.indexOf(q.answer),
    };
  });

  const minutes =
    config.mode === "exam"
      ? config.durationMinutes > 0
        ? config.durationMinutes
        : Math.ceil(questions.length * 1.25)
      : 0;

  return {
    id: uid(),
    config,
    questions,
    answers: Array(questions.length).fill(null),
    flags: Array(questions.length).fill(false),
    revealed: Array(questions.length).fill(false),
    currentIndex: 0,
    startedAt: Date.now(),
    endsAt: minutes > 0 ? Date.now() + minutes * 60_000 : 0,
    finishedAt: null,
    autoSubmitted: false,
  };
}

export function useQuiz() {
  const [session, setSession] = useState<QuizSession | null>(null);

  const start = useCallback((config: QuizConfig) => {
    setSession(buildSession(config));
  }, []);

  const stop = useCallback(() => setSession(null), []);

  const answer = useCallback((idx: number) => {
    setSession((s) => {
      if (!s) return s;
      const isTraining = s.config.mode === "training";
      if (isTraining && s.revealed[s.currentIndex]) return s;
      const answers = [...s.answers];
      answers[s.currentIndex] = idx;
      const revealed = [...s.revealed];
      if (isTraining) revealed[s.currentIndex] = true;
      return { ...s, answers, revealed };
    });
  }, []);

  const goTo = useCallback((idx: number) => {
    setSession((s) => {
      if (!s) return s;
      const clamped = Math.max(0, Math.min(idx, s.questions.length - 1));
      return { ...s, currentIndex: clamped };
    });
  }, []);

  const next = useCallback(() => {
    setSession((s) => {
      if (!s) return s;
      return {
        ...s,
        currentIndex: Math.min(s.currentIndex + 1, s.questions.length - 1),
      };
    });
  }, []);

  const prev = useCallback(() => {
    setSession((s) => {
      if (!s) return s;
      return { ...s, currentIndex: Math.max(s.currentIndex - 1, 0) };
    });
  }, []);

  const toggleFlag = useCallback(() => {
    setSession((s) => {
      if (!s) return s;
      const flags = [...s.flags];
      flags[s.currentIndex] = !flags[s.currentIndex];
      return { ...s, flags };
    });
  }, []);

  const finish = useCallback((auto = false) => {
    setSession((s) =>
      s ? { ...s, finishedAt: Date.now(), autoSubmitted: auto } : s,
    );
  }, []);

  const result = useMemo(() => {
    if (!session || session.finishedAt === null) return null;
    let score = 0;
    const byDomain = new Map<string, { correct: number; total: number }>();

    session.questions.forEach((q, i) => {
      const ok = session.answers[i] === q.correctIndex;
      if (ok) score++;
      const d = q.source.domain;
      const cur = byDomain.get(d) ?? { correct: 0, total: 0 };
      cur.total++;
      if (ok) cur.correct++;
      byDomain.set(d, cur);
    });

    return {
      score,
      total: session.questions.length,
      percentage: percent(score, session.questions.length),
      timeSeconds: Math.round(
        ((session.finishedAt ?? Date.now()) - session.startedAt) / 1000,
      ),
      byDomain: Array.from(byDomain.entries()).map(([domain, v]) => ({
        domain,
        correct: v.correct,
        total: v.total,
        percentage: percent(v.correct, v.total),
      })),
    };
  }, [session]);

  return {
    session,
    result,
    start,
    stop,
    answer,
    goTo,
    next,
    prev,
    toggleFlag,
    finish,
  };
}
