// Disponibilidade MOCKADA. Troque a implementação por uma chamada real
// (Google Calendar free/busy, Cal.com, etc.) mantendo a assinatura.
// Ver docs/automacao.md.

export type Slot = { time: string; available: boolean };

const MORNING = ["08:00", "09:00", "10:00", "11:00"];
const AFTERNOON = ["13:30", "14:30", "15:30", "16:30", "17:30"];

export const periods = [
  { id: "manha", label: "Manhã" },
  { id: "tarde", label: "Tarde" },
] as const;

function seed(dateISO: string, time: string) {
  let h = 0;
  for (const c of dateISO + time) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return h % 5; // 0..4
}

export function isBookableDate(d: Date, now = new Date()): boolean {
  const day = d.getDay();
  if (day === 0) return false; // domingo fechado
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return d >= today;
}

export async function getSlots(dateISO: string, period: "manha" | "tarde"): Promise<Slot[]> {
  const list = period === "manha" ? MORNING : AFTERNOON;
  const isSaturday = new Date(dateISO + "T12:00:00").getDay() === 6;
  const base = isSaturday && period === "tarde" ? [] : list;
  return base.map((time) => ({ time, available: seed(dateISO, time) !== 0 }));
}
