import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { ScoreRing } from "@/components/ui/ScoreRing";
import type { QuizResult, QuizSession } from "@/types";
import { EXAM_LABELS } from "@/data/questionBanks";
import { cn, formatTime, scoreColor } from "@/lib/utils";
import { Check, X, RotateCw, Home } from "lucide-react";

interface Props {
  session: QuizSession;
  result: QuizResult;
  onRestart: () => void;
  onRetryWrong: () => void;
  onHome: () => void;
}

export function ResultsScreen({
  session,
  result,
  onRestart,
  onRetryWrong,
  onHome,
}: Props) {
  const wrongIndices = session.questions
    .map((_, i) => i)
    .filter((i) => session.answers[i] !== session.questions[i].correctIndex);

  const verdict =
    result.percentage >= 80
      ? { label: "Solide — niveau examen atteint", tone: "success" as const }
      : result.percentage >= 60
        ? {
            label: "Passable — quelques domaines à consolider",
            tone: "warning" as const,
          }
        : {
            label: "Insuffisant — reprenez les fondamentaux",
            tone: "danger" as const,
          };

  return (
    <div className="space-y-4">
      <Card className="p-6 text-center">
        {session.autoSubmitted && (
          <div className="mb-4 inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3 py-1.5 text-xs text-amber-300">
            ⏱ Temps écoulé — remise automatique
          </div>
        )}
        <ScoreRing
          percentage={result.percentage}
          score={result.score}
          total={result.total}
        />
        <div className="mt-4">
          <Badge tone={verdict.tone}>{verdict.label}</Badge>
        </div>
        <div className="mt-3 text-xs text-slate-500">
          Temps : {formatTime(result.timeSeconds)} ·{" "}
          {EXAM_LABELS[session.config.exam]} ·{" "}
          {session.config.mode === "exam" ? "Examen blanc" : "Entraînement"}
        </div>

        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Button onClick={onRestart}>
            <RotateCw size={15} />
            Nouvelle session
          </Button>
          {wrongIndices.length > 0 && (
            <Button variant="secondary" onClick={onRetryWrong}>
              {wrongIndices.length === 1
                ? "Rejouer mon erreur"
                : `Rejouer mes ${wrongIndices.length} erreurs`}
            </Button>
          )}
          <Button variant="ghost" onClick={onHome}>
            <Home size={15} />
            Accueil
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Résultats par domaine
        </h2>
        <div className="space-y-3">
          {result.byDomain.map((d) => (
            <div key={d.domain}>
              <div className="mb-1.5 flex items-center justify-between text-xs">
                <span className="truncate text-slate-300">{d.domain}</span>
                <span
                  className={cn(
                    "font-mono tabular-nums",
                    scoreColor(d.percentage),
                  )}
                >
                  {d.correct}/{d.total} · {d.percentage}%
                </span>
              </div>
              <ProgressBar
                value={d.percentage}
                tone={
                  d.percentage >= 80
                    ? "success"
                    : d.percentage >= 60
                      ? "warning"
                      : "danger"
                }
              />
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-400">
          Correction détaillée
        </h2>
        <div className="space-y-4">
          {session.questions.map((q, i) => {
            const userAnswer = session.answers[i];
            const isCorrect = userAnswer === q.correctIndex;
            return (
              <div
                key={q.source.id}
                className={cn(
                  "rounded-xl border p-4",
                  isCorrect
                    ? "border-slate-800 bg-slate-900/40"
                    : "border-rose-500/20 bg-rose-500/[0.03]",
                )}
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <Badge tone="accent" className="mb-2">
                      {q.source.domain}
                    </Badge>
                    <p className="text-sm font-medium leading-snug text-slate-200">
                      {i + 1}. {q.source.question}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "grid h-6 w-6 flex-shrink-0 place-items-center rounded-md",
                      isCorrect
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-rose-500/20 text-rose-400",
                    )}
                  >
                    {isCorrect ? (
                      <Check size={14} strokeWidth={3} />
                    ) : (
                      <X size={14} strokeWidth={3} />
                    )}
                  </div>
                </div>

                <div className="space-y-1.5 text-sm">
                  {q.options.map((opt, idx) => {
                    const isRight = idx === q.correctIndex;
                    const isUserWrong = idx === userAnswer && !isRight;
                    if (!isRight && !isUserWrong) return null;
                    return (
                      <div
                        key={idx}
                        className={cn(
                          "flex items-start gap-2 rounded-lg px-2.5 py-1.5",
                          isRight && "bg-emerald-500/10 text-emerald-300",
                          isUserWrong && "bg-rose-500/10 text-rose-300",
                        )}
                      >
                        <span className="mt-0.5 font-mono text-[10px] font-bold">
                          {isRight ? "✓" : "✗"}
                        </span>
                        <span>{opt}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-3 border-t border-slate-800 pt-3">
                  <p className="text-xs leading-relaxed text-slate-400">
                    <span className="font-semibold text-sky-400">
                      Explication —{" "}
                    </span>
                    {q.source.explanation}
                  </p>
                  {q.source.reference && (
                    <p className="mt-1.5 text-[11px] italic text-slate-600">
                      Source : {q.source.reference}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
