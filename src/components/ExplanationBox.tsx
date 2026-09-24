import { Lightbulb } from "lucide-react";

interface Props {
  explanation: string;
  reference?: string;
}

export function ExplanationBox({ explanation, reference }: Props) {
  return (
    <div className="animate-slide-up mt-5 overflow-hidden rounded-xl border border-sky-500/20 bg-sky-500/[0.04]">
      <div className="flex items-start gap-3 p-4">
        <div className="mt-0.5 grid h-7 w-7 flex-shrink-0 place-items-center rounded-lg bg-sky-500/15 text-sky-400">
          <Lightbulb size={15} />
        </div>
        <div className="flex-1 space-y-2">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-sky-400">
            Explication
          </div>
          <p className="text-sm leading-relaxed text-slate-300">
            {explanation}
          </p>
          {reference && (
            <p className="text-[11px] italic text-slate-500">
              Source : {reference}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
