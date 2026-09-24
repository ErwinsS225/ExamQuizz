import { Badge } from "@/components/ui/Badge";
import { ChoiceButton } from "@/components/ChoiceButton";
import { ExplanationBox } from "@/components/ExplanationBox";
import type { QuizMode, SessionQuestion } from "@/types";

interface Props {
  question: SessionQuestion;
  index: number;
  total: number;
  mode: QuizMode;
  selected: number | null;
  revealed: boolean;
  onSelect: (idx: number) => void;
}

export function QuestionCard({
  question,
  index,
  total,
  mode,
  selected,
  revealed,
  onSelect,
}: Props) {
  const isTraining = mode === "training";
  const showSolution = isTraining && revealed;

  const stateFor = (
    i: number,
  ): "idle" | "correct" | "wrong" | "revealed-correct" => {
    if (!showSolution) return "idle";
    if (i === question.correctIndex)
      return selected === i ? "correct" : "revealed-correct";
    if (i === selected) return "wrong";
    return "idle";
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center justify-between gap-3">
        <Badge tone="accent">{question.source.domain}</Badge>
        <span className="font-mono text-xs text-slate-500">
          {String(index + 1).padStart(2, "0")} /{" "}
          {String(total).padStart(2, "0")}
        </span>
      </div>

      <h2 className="mb-6 text-lg font-semibold leading-snug tracking-tight text-slate-100 sm:text-xl">
        {question.source.question}
      </h2>

      <div className="space-y-2.5">
        {question.options.map((opt, i) => (
          <ChoiceButton
            key={i}
            index={i}
            label={opt}
            selected={selected === i}
            disabled={showSolution}
            state={stateFor(i)}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>

      {showSolution && (
        <ExplanationBox
          explanation={question.source.explanation}
          reference={question.source.reference}
        />
      )}
    </div>
  );
}
