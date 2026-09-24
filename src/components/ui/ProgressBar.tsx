import { cn } from "@/lib/utils";

interface Props {
  value: number; // 0..100
  className?: string;
  tone?: "accent" | "success" | "warning" | "danger";
}

const tones = {
  accent: "from-sky-400 to-indigo-500",
  success: "from-emerald-400 to-teal-500",
  warning: "from-amber-400 to-orange-500",
  danger: "from-rose-500 to-pink-500",
};

export function ProgressBar({ value, className, tone = "accent" }: Props) {
  return (
    <div
      className={cn(
        "h-1.5 w-full overflow-hidden rounded-full bg-slate-800",
        className,
      )}
    >
      <div
        className={cn(
          "h-full rounded-full bg-gradient-to-r transition-[width] duration-300 ease-out",
          tones[tone],
        )}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}
