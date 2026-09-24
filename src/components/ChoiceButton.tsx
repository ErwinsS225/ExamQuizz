import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

interface Props {
  index: number;
  label: string;
  selected: boolean;
  disabled: boolean;
  /** état en mode entraînement après révélation */
  state?: "idle" | "correct" | "wrong" | "revealed-correct";
  onClick: () => void;
}

const LETTERS = ["A", "B", "C", "D", "E", "F"];

export function ChoiceButton({
  index,
  label,
  selected,
  disabled,
  state = "idle",
  onClick,
}: Props) {
  const isCorrect = state === "correct" || state === "revealed-correct";
  const isWrong = state === "wrong";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "group relative flex w-full items-start gap-3 rounded-xl border px-4 py-3.5 text-left text-sm transition-all duration-150",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
        !disabled &&
          "hover:border-sky-500/60 hover:bg-slate-800/60 active:scale-[.995]",
        selected &&
          !isCorrect &&
          !isWrong &&
          "border-sky-500 bg-sky-500/10 shadow-[0_0_0_1px_rgba(56,189,248,.4)]",
        isCorrect && "border-emerald-500/70 bg-emerald-500/10",
        isWrong && "border-rose-500/70 bg-rose-500/10",
        !selected &&
          !isCorrect &&
          !isWrong &&
          "border-slate-800 bg-slate-900/40",
        disabled && "cursor-default",
      )}
    >
      <span
        className={cn(
          "mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-md border text-[11px] font-bold transition-colors",
          selected &&
            !isCorrect &&
            !isWrong &&
            "border-sky-400 bg-sky-400 text-slate-950",
          isCorrect && "border-emerald-400 bg-emerald-400 text-slate-950",
          isWrong && "border-rose-400 bg-rose-400 text-slate-950",
          !selected &&
            !isCorrect &&
            !isWrong &&
            "border-slate-700 bg-slate-800 text-slate-400 group-hover:border-sky-500/60 group-hover:text-sky-300",
        )}
      >
        {isCorrect ? (
          <Check size={14} strokeWidth={3} />
        ) : isWrong ? (
          <X size={14} strokeWidth={3} />
        ) : (
          LETTERS[index]
        )}
      </span>
      <span className="flex-1 leading-relaxed text-slate-200">{label}</span>
    </button>
  );
}
