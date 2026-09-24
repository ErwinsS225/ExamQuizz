import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { HomeScreen } from "@/components/HomeScreen";
import { QuizScreen } from "@/components/QuizScreen";
import { ResultsScreen } from "@/components/ResultsScreen";
import { HistoryScreen } from "@/components/HistoryScreen";
import { useQuiz } from "@/hooks/useQuiz";
import { loadHistory, saveHistory, clearHistory } from "@/lib/storage";
import type { HistoryEntry, QuizConfig } from "@/types";

type Screen = "home" | "quiz" | "results" | "history";

export default function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());
  const {
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
  } = useQuiz();

  const handleStart = (cfg: QuizConfig) => {
    start(cfg);
    setScreen("quiz");
  };

  const handleFinish = (auto = false) => {
    finish(auto);
    // On bascule sur l'écran résultats dès que result est prêt (useEffect côté session)
    setScreen("results");
  };

  useEffect(() => {
    if (screen !== "results" || !session || !result) return;
    if (history.some((entry) => entry.id === session.id)) return;

    const entry: HistoryEntry = {
      id: session.id,
      date: session.finishedAt ?? Date.now(),
      exam: session.config.exam,
      mode: session.config.mode,
      score: result.score,
      total: result.total,
      timeSeconds: result.timeSeconds,
      domains: Array.from(
        new Set(session.questions.map((question) => question.source.domain)),
      ),
    };
    const next = [entry, ...history].slice(0, 60);
    setHistory(next);
    saveHistory(next);
  }, [history, result, screen, session]);

  const handleRestart = () => {
    stop();
    setScreen("home");
  };

  const handleRetryWrong = () => {
    if (!session) return;
    const wrongQuestions = session.questions.filter(
      (q, i) => session.answers[i] !== q.correctIndex,
    );
    if (wrongQuestions.length === 0) return;

    start({
      exam: session.config.exam,
      mode: "training",
      count: wrongQuestions.length,
      durationMinutes: 0,
      domains: [],
      ...(session.config.difficulty
        ? { difficulty: session.config.difficulty }
        : {}),
      questionIds: wrongQuestions.map((question) => question.source.id),
    });
    setScreen("quiz");
  };

  const handleClear = () => {
    if (!confirm("Effacer tout l'historique ?")) return;
    clearHistory();
    setHistory([]);
  };

  const lastScore = history[0]
    ? {
        score: history[0].score,
        total: history[0].total,
        date: history[0].date,
        exam: history[0].exam,
      }
    : null;

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 sm:py-10">
      <Header
        right={
          screen === "quiz" && session ? (
            <span className="hidden rounded-lg border border-slate-800 bg-slate-900/50 px-3 py-1.5 text-xs text-slate-400 sm:inline-block">
              {session.config.mode === "exam"
                ? "Mode examen"
                : "Mode entraînement"}
              <span className="mx-2 text-slate-700">·</span>
              {session.config.exam.toUpperCase()}
            </span>
          ) : null
        }
      />

      {screen === "home" && (
        <HomeScreen
          onStart={handleStart}
          onShowHistory={() => setScreen("history")}
          lastScore={lastScore}
        />
      )}

      {screen === "quiz" && session && (
        <QuizScreen
          session={session}
          onAnswer={answer}
          onPrev={prev}
          onNext={next}
          onJump={goTo}
          onToggleFlag={toggleFlag}
          onQuit={handleRestart}
          onFinish={handleFinish}
        />
      )}

      {screen === "results" && session && result && (
        <ResultsScreen
          session={session}
          result={result}
          onRestart={handleRestart}
          onRetryWrong={handleRetryWrong}
          onHome={() => {
            stop();
            setScreen("home");
          }}
        />
      )}

      {screen === "history" && (
        <HistoryScreen
          entries={history}
          onBack={() => setScreen("home")}
          onClear={handleClear}
        />
      )}

      <footer className="mt-10 text-center text-[11px] text-slate-600">
        Banque et historique conservés localement · aucune donnée de quiz envoyée
      </footer>
    </div>
  );
}
