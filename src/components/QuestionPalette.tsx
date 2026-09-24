import { cn } from "@/lib/utils";
import { Flag } from "lucide-react";

interface Props {
  total: number;
  current: number;
  answers: (number | null)[];
  flags: boolean[];
  onJump: (i: number) => void;
}

export function QuestionPalette({
  total,
  current,
  answers,
  flags,
  onJump,
}: Props) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {Array.from({ length: total }, (_, i) => {
        const answered = answers[i] !== null;
        const flagged = flags[i];
        const isCurrent = i === current;
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className={cn(
              "relative grid h-8 w-8 place-items-center rounded-lg border text-[11px] font-semibold transition-all",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400",
              isCurrent
                ? "border-sky-400 bg-sky-400 text-slate-950"
                : answered
                  ? "border-sky-500/40 bg-sky-500/10 text-sky-300"
                  : "border-slate-800 bg-slate-900/40 text-slate-500 hover:border-slate-700 hover:text-slate-300",
            )}
            title={`Question ${i + 1}${flagged ? " (marquée)" : ""}`}
          >
            {i + 1}
            {flagged && (
              <Flag
                size={9}
                className="absolute -right-0.5 -top-0.5 text-amber-400"
                fill="currentColor"
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
