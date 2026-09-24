import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { QuestionCard } from "@/components/QuestionCard";
import { QuestionPalette } from "@/components/QuestionPalette";
import { Flag, ChevronLeft, ChevronRight, Clock, LogOut } from "lucide-react";
import { cn, formatTime } from "@/lib/utils";
import { useCountdown } from "@/hooks/useCountdown";
import type { QuizSession } from "@/types";

interface Props {
  session: QuizSession;
  onAnswer: (idx: number) => void;
  onPrev: () => void;
  onNext: () => void;
  onJump: (i: number) => void;
  onToggleFlag: () => void;
  onQuit: () => void;
  onFinish: (auto?: boolean) => void;
}

export function QuizScreen({
  session,
  onAnswer,
  onPrev,
  onNext,
  onJump,
  onToggleFlag,
  onQuit,
  onFinish,
}: Props) {
  const i = session.currentIndex;
  const q = session.questions[i];
  const total = session.questions.length;
  const progress = ((i + 1) / total) * 100;
  const isLast = i === total - 1;

  const remaining = useCountdown(session.endsAt || null, () => onFinish(true));

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.defaultPrevented) return;
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement ||
        (event.target instanceof HTMLElement && event.target.isContentEditable)
      ) {
        return;
      }
      if (["1", "2", "3", "4"].includes(event.key)) {
        const index = Number.parseInt(event.key, 10) - 1;
        if (index < q.options.length) {
          event.preventDefault();
          onAnswer(index);
        }
      } else if (event.key === "ArrowRight" || event.key === "Enter") {
        event.preventDefault();
        handleNext();
      } else if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrev();
      } else if (event.key.toLowerCase() === "f") {
        event.preventDefault();
        onToggleFlag();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [
    isLast,
    onAnswer,
    onFinish,
    onNext,
    onPrev,
    onToggleFlag,
    q.options.length,
  ]);

  const handleNext = () => {
    if (isLast) onFinish(false);
    else onNext();
  };

  const timeTone =
    remaining > 300 ? "default" : remaining > 60 ? "warning" : "danger";

  return (
    <div className="space-y-4">
      {/* Barre supérieure */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={onQuit}>
            <LogOut size={14} />
            <span className="hidden sm:inline">Quitter</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant={session.flags[i] ? "secondary" : "ghost"}
            size="sm"
            onClick={onToggleFlag}
            title="Marquer (F)"
          >
            <Flag
              size={14}
              className={session.flags[i] ? "text-amber-400" : ""}
              fill={session.flags[i] ? "currentColor" : "none"}
            />
            <span className="hidden sm:inline">
              {session.flags[i] ? "Marquée" : "Marquer"}
            </span>
          </Button>

          {session.endsAt > 0 && (
            <div
              className={cn(
                "flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-sm tabular-nums",
                timeTone === "danger" &&
                  "animate-pulse-fast border-rose-500/50 bg-rose-500/10 text-rose-300",
                timeTone === "warning" &&
                  "border-amber-500/50 bg-amber-500/10 text-amber-300",
                timeTone === "default" &&
                  "border-slate-800 bg-slate-900/50 text-slate-300",
              )}
            >
              <Clock size={13} />
              {formatTime(remaining)}
            </div>
          )}
        </div>
      </div>

      <ProgressBar value={progress} />

      {/* Question */}
      <Card className="p-5 sm:p-6">
        <QuestionCard
          question={q}
          index={i}
          total={total}
          mode={session.config.mode}
          selected={session.answers[i]}
          revealed={session.revealed[i]}
          onSelect={onAnswer}
        />
      </Card>

      {/* Palette */}
      <Card className="p-4">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            Navigation
          </span>
          <span className="text-xs text-slate-500">
            {session.answers.filter((a) => a !== null).length}/{total} répondues
          </span>
        </div>
        <QuestionPalette
          total={total}
          current={i}
          answers={session.answers}
          flags={session.flags}
          onJump={onJump}
        />
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <Button variant="ghost" onClick={onPrev} disabled={i === 0}>
          <ChevronLeft size={16} />
          Précédent
        </Button>

        <Button onClick={handleNext}>
          {isLast ? "Terminer" : "Suivante"}
          {!isLast && <ChevronRight size={16} />}
        </Button>
      </div>

      <p className="text-center text-[11px] text-slate-600">
        <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5">
          1-4
        </kbd>{" "}
        répondre ·{" "}
        <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5">
          Entrée
        </kbd>{" "}
        suivante ·{" "}
        <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5">
          ←
        </kbd>{" "}
        précédent ·{" "}
        <kbd className="rounded border border-slate-800 bg-slate-900 px-1.5 py-0.5">
          F
        </kbd>{" "}
        marquer
      </p>
    </div>
  );
}
