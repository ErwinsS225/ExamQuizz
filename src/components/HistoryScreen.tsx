import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import type { HistoryEntry } from "@/types";
import { EXAM_LABELS } from "@/data/questionBanks";
import { cn, formatTime, percent, scoreColor } from "@/lib/utils";
import { ArrowLeft, Trash2 } from "lucide-react";

interface Props {
  entries: HistoryEntry[];
  onBack: () => void;
  onClear: () => void;
}

export function HistoryScreen({ entries, onBack, onClear }: Props) {
  const avg = entries.length
    ? Math.round(
        entries.reduce((a, e) => a + percent(e.score, e.total), 0) /
          entries.length,
      )
    : 0;

  return (
    <Card className="p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">Historique</h1>
          <p className="text-xs text-slate-500">
            {entries.length} session{entries.length > 1 ? "s" : ""} · moyenne{" "}
            <span className={cn("font-semibold", scoreColor(avg))}>{avg}%</span>
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ArrowLeft size={14} />
          Retour
        </Button>
      </div>

      {entries.length === 0 ? (
        <p className="py-8 text-center text-sm text-slate-500">
          Aucune session enregistrée.
        </p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-slate-800">
          <table className="w-full text-sm">
            <thead className="bg-slate-900/60 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-4 py-2.5 text-left font-medium">Date</th>
                <th className="px-4 py-2.5 text-left font-medium">Examen</th>
                <th className="px-4 py-2.5 text-left font-medium">Mode</th>
                <th className="px-4 py-2.5 text-right font-medium">Score</th>
                <th className="px-4 py-2.5 text-right font-medium">%</th>
                <th className="hidden px-4 py-2.5 text-right font-medium sm:table-cell">
                  Temps
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => {
                const p = percent(e.score, e.total);
                return (
                  <tr key={e.id} className="border-t border-slate-800/70">
                    <td className="px-4 py-3 text-slate-300">
                      {new Date(e.date).toLocaleDateString("fr-FR")}
                      <span className="ml-2 text-xs text-slate-600">
                        {new Date(e.date).toLocaleTimeString("fr-FR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {EXAM_LABELS[e.exam]}
                    </td>
                    <td className="px-4 py-3 text-slate-400">
                      {e.mode === "exam" ? "Examen" : "Entraîn."}
                    </td>
                    <td className="px-4 py-3 text-right tabular-nums text-slate-300">
                      {e.score}/{e.total}
                    </td>
                    <td
                      className={cn(
                        "px-4 py-3 text-right font-semibold tabular-nums",
                        scoreColor(p),
                      )}
                    >
                      {p}%
                    </td>
                    <td className="hidden px-4 py-3 text-right font-mono text-xs text-slate-500 sm:table-cell">
                      {formatTime(e.timeSeconds)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {entries.length > 0 && (
        <div className="mt-5 text-right">
          <Button variant="ghost" size="sm" onClick={onClear}>
            <Trash2 size={14} />
            Effacer l'historique
          </Button>
        </div>
      )}
    </Card>
  );
}
