import type { HistoryEntry } from "@/types";

const KEY = "cyberquiz:history:v2";

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (typeof value !== "object" || value === null) return false;
  const entry = value as Record<string, unknown>;
  return (
    typeof entry.id === "string" &&
    typeof entry.date === "number" &&
    (entry.exam === "ccst" || entry.exam === "cct") &&
    (entry.mode === "exam" || entry.mode === "training") &&
    typeof entry.score === "number" &&
    typeof entry.total === "number" &&
    typeof entry.timeSeconds === "number" &&
    Array.isArray(entry.domains) &&
    entry.domains.every((domain) => typeof domain === "string")
  );
}

export const loadHistory = (): HistoryEntry[] => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(KEY) ?? "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isHistoryEntry).slice(0, 60);
  } catch {
    return [];
  }
};

export const saveHistory = (entries: HistoryEntry[]): void => {
  try {
    localStorage.setItem(KEY, JSON.stringify(entries.slice(0, 60)));
  } catch {
    // Le quota ou le mode privé peut empêcher l'écriture.
  }
};

export const clearHistory = (): void => {
  try {
    localStorage.removeItem(KEY);
  } catch {
    // Certains navigateurs interdisent l'accès au stockage.
  }
};
