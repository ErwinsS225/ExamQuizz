import type { ReactNode } from "react";

interface Props {
  right?: ReactNode;
}

export function Header({ right }: Props) {
  return (
    <header className="mb-8 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative h-3 w-3">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 shadow-[0_0_16px_rgba(56,189,248,0.6)]" />
        </div>
        <div>
          <div className="text-sm font-bold tracking-wide">CyberQuiz</div>
          <div className="text-[11px] text-slate-500">
            Préparation CCST &amp; CCT
          </div>
        </div>
      </div>
      <div>{right}</div>
    </header>
  );
}
