import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { EXAM_LABELS, getDomains, getQuestions } from "@/data/questionBanks";
import type { Difficulty, ExamType, QuizConfig, QuizMode } from "@/types";
import { cn } from "@/lib/utils";
import { BookOpen, GraduationCap, Check, FileBadge2 } from "lucide-react";

interface Props {
  onStart: (cfg: QuizConfig) => void;
  onShowHistory: () => void;
  lastScore?: {
    score: number;
    total: number;
    date: number;
    exam: "ccst" | "cct";
  } | null;
}

export function HomeScreen({ onStart, onShowHistory, lastScore }: Props) {
  const [exam, setExam] = useState<ExamType>("ccst");
  const [mode, setMode] = useState<QuizMode>("exam");
  const [count, setCount] = useState(20);
  const [duration, setDuration] = useState(0);
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [domains, setDomains] = useState<string[]>([]);

  const questions = useMemo(() => getQuestions(exam), [exam]);
  const availableDomains = useMemo(() => getDomains(exam), [exam]);
  const totalAvailable = useMemo(
    () =>
      questions.filter(
        (q) =>
          (domains.length === 0 || domains.includes(q.domain)) &&
          (difficulty === null || q.difficulty === difficulty),
      ).length,
    [difficulty, domains, questions],
  );

  useEffect(() => {
    setDomains([]);
    setDifficulty(null);
    setCount(20);
  }, [exam]);

  useEffect(() => {
    if (count !== 999 && count > totalAvailable) setCount(999);
  }, [count, totalAvailable]);

  const toggleDomain = (domain: string) =>
    setDomains((current) => {
      if (current.length === 0) return [domain];
      if (current.includes(domain)) {
        return current.length === 1 ? current : current.filter((item) => item !== domain);
      }
      return [...current, domain];
    });

  const handleStart = () =>
    onStart({
      exam,
      mode,
      count: Math.min(count, totalAvailable),
      durationMinutes: duration,
      domains,
      ...(difficulty ? { difficulty } : {}),
    });

  return (
    <div className="space-y-5">
      <Card className="p-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Prêt pour l'examen ?
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          {questions.length} question{questions.length > 1 ? "s" : ""} ·{" "}
          {availableDomains.length} domaine{availableDomains.length > 1 ? "s" : ""} ·{" "}
          préparation {EXAM_LABELS[exam]}
        </p>

        {lastScore && (
          <div className="mt-5 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3">
            <div>
              <div className="text-xs uppercase tracking-wider text-slate-500">
                Dernière session
              </div>
              <div className="mt-0.5 text-sm">
                <span className="font-semibold text-slate-100">
                  {lastScore.score}/{lastScore.total}
                </span>{" "}
                <span className="text-slate-500">
                  · {lastScore.exam.toUpperCase()} ·{" "}
                  {new Date(lastScore.date).toLocaleDateString("fr-FR")}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={onShowHistory}>
              Historique
            </Button>
          </div>
        )}
      </Card>

      <Card className="p-6">
        <SectionTitle>Examen à préparer</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <ModeCard
            active={exam === "ccst"}
            icon={<FileBadge2 size={18} />}
            title="CCST"
            desc="Banque de questions dédiée au CCST"
            onClick={() => setExam("ccst")}
          />
          <ModeCard
            active={exam === "cct"}
            icon={<FileBadge2 size={18} />}
            title="CCT"
            desc="Banque de questions dédiée au CCT"
            onClick={() => setExam("cct")}
          />
        </div>
      </Card>

      <Card className="p-6">
        <SectionTitle>Mode</SectionTitle>
        <div className="grid gap-3 sm:grid-cols-2">
          <ModeCard
            active={mode === "exam"}
            icon={<GraduationCap size={18} />}
            title="Examen blanc"
            desc="Chronométré, correction à la fin"
            onClick={() => setMode("exam")}
          />
          <ModeCard
            active={mode === "training"}
            icon={<BookOpen size={18} />}
            title="Entraînement"
            desc="Correction immédiate + explication"
            onClick={() => setMode("training")}
          />
        </div>

        <SectionTitle className="mt-6">Nombre de questions</SectionTitle>
        <div className="flex flex-wrap gap-2">
          {[10, 20, 30, 40, 60].map((n) => (
            <Pill
              key={n}
              active={count === n}
              onClick={() => setCount(n)}
              disabled={n > totalAvailable}
            >
              {n}
            </Pill>
          ))}
          <Pill active={count === 999} onClick={() => setCount(999)}>
            Tout ({totalAvailable})
          </Pill>
        </div>

        {mode === "exam" && (
          <>
            <SectionTitle className="mt-6">Durée</SectionTitle>
            <div className="flex flex-wrap gap-2">
              {[
                { v: 0, l: "Auto" },
                { v: 10, l: "10 min" },
                { v: 15, l: "15 min" },
                { v: 20, l: "20 min" },
                { v: 30, l: "30 min" },
                { v: 45, l: "45 min" },
                { v: 60, l: "60 min" },
              ].map((o) => (
                <Pill
                  key={o.v}
                  active={duration === o.v}
                  onClick={() => setDuration(o.v)}
                >
                  {o.l}
                </Pill>
              ))}
            </div>
          </>
        )}

        {questions.length === 0 ? (
          <div className="mt-6 rounded-xl border border-amber-500/30 bg-amber-500/[0.06] p-4 text-sm leading-relaxed text-amber-200">
            <span className="font-semibold">Banque {EXAM_LABELS[exam]} en préparation.</span>{" "}
            Ajoutez vos questions dans le fichier JSON correspondant pour
            activer cette session.
          </div>
        ) : (
          <>
            <SectionTitle className="mt-6">Niveau de difficulté</SectionTitle>
            <div className="flex flex-wrap gap-2">
              <Pill
                active={difficulty === null}
                onClick={() => setDifficulty(null)}
              >
                Tous
              </Pill>
              <Pill
                active={difficulty === "beginner"}
                onClick={() => setDifficulty("beginner")}
              >
                Débutant
              </Pill>
              <Pill
                active={difficulty === "intermediate"}
                onClick={() => setDifficulty("intermediate")}
              >
                Intermédiaire
              </Pill>
              <Pill
                active={difficulty === "advanced"}
                onClick={() => setDifficulty("advanced")}
              >
                Avancé
              </Pill>
            </div>

            <SectionTitle className="mt-6">
              Domaines
              <span className="ml-2 text-xs font-normal text-slate-500">
                {domains.length === 0
                  ? "(tous)"
                  : `(${domains.length} sélectionné${domains.length > 1 ? "s" : ""})`}
              </span>
            </SectionTitle>
        <div className="mb-3 flex flex-wrap gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDomains([...availableDomains])}
          >
            Tous les domaines
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDomains([])}
          >
            Réinitialiser
          </Button>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          {availableDomains.map((d) => {
            const active = domains.length === 0 || domains.includes(d);
            return (
              <button
                key={d}
                onClick={() => toggleDomain(d)}
                className={cn(
                  "flex items-center justify-between gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition-all",
                  active
                    ? "border-sky-500/50 bg-sky-500/10 text-sky-100"
                    : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700 hover:bg-slate-800/50",
                )}
              >
                <span className="flex-1 truncate">{d}</span>
                <span
                  className={cn(
                    "grid h-5 w-5 flex-shrink-0 place-items-center rounded-md border transition-colors",
                    active
                      ? "border-sky-400 bg-sky-400 text-slate-950"
                      : "border-slate-700",
                  )}
                >
                  {active && <Check size={12} strokeWidth={3} />}
                </span>
              </button>
            );
          })}
          </div>
          </>
        )}

        <Button
          size="lg"
          className="mt-7 w-full"
          onClick={handleStart}
          disabled={totalAvailable === 0}
        >
          {totalAvailable === 0
            ? `Aucune question ${EXAM_LABELS[exam]}`
            : `Démarrer la session · ${Math.min(count, totalAvailable)} ${
                Math.min(count, totalAvailable) > 1 ? "questions" : "question"
              }`}
        </Button>
      </Card>
    </div>
  );
}

function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        "mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400",
        className,
      )}
    >
      {children}
    </h2>
  );
}

function ModeCard({
  active,
  icon,
  title,
  desc,
  onClick,
}: {
  active: boolean;
  icon: React.ReactNode;
  title: string;
  desc: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
        active
          ? "border-sky-500/60 bg-sky-500/[0.08] shadow-[0_0_0_1px_rgba(56,189,248,.3)]"
          : "border-slate-800 bg-slate-900/40 hover:border-slate-700",
      )}
    >
      <div
        className={cn(
          "grid h-9 w-9 flex-shrink-0 place-items-center rounded-lg",
          active ? "bg-sky-500/20 text-sky-300" : "bg-slate-800 text-slate-400",
        )}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold">{title}</span>
          {active && <Badge tone="accent">Actif</Badge>}
        </div>
        <div className="mt-0.5 text-xs text-slate-500">{desc}</div>
      </div>
    </button>
  );
}

function Pill({
  children,
  active,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg border px-3.5 py-1.5 text-sm font-medium transition-all",
        disabled && "cursor-not-allowed opacity-30",
        active
          ? "border-sky-400 bg-sky-400 text-slate-950"
          : "border-slate-800 bg-slate-900/40 text-slate-300 hover:border-slate-700",
      )}
    >
      {children}
    </button>
  );
}
