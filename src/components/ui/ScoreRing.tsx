import { useEffect, useState } from "react";
import { cn, scoreColor } from "@/lib/utils";

interface Props {
  percentage: number;
  score: number;
  total: number;
}

export function ScoreRing({ percentage, score, total }: Props) {
  const [animated, setAnimated] = useState(0);
  const radius = 66;
  const circ = 2 * Math.PI * radius;

  useEffect(() => {
    const id = requestAnimationFrame(() => setAnimated(percentage));
    return () => cancelAnimationFrame(id);
  }, [percentage]);

  return (
    <div className="relative mx-auto h-44 w-44">
      <svg viewBox="0 0 160 160" className="-rotate-90">
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="rgb(30,41,59)"
          strokeWidth="10"
        />
        <circle
          cx="80"
          cy="80"
          r={radius}
          fill="none"
          stroke="url(#ringGrad)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ - (circ * animated) / 100}
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(.2,.7,.3,1)",
          }}
        />
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <div className="text-center">
          <div
            className={cn(
              "text-4xl font-bold tabular-nums",
              scoreColor(percentage),
            )}
          >
            {percentage}%
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {score} / {total}
          </div>
        </div>
      </div>
    </div>
  );
}
