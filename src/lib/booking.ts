import { z } from "zod";
import { clinic, whatsappUrl } from "@/config";

export const bookingSchema = z.object({
  treatmentId: z.string().min(1, "Escolha um tratamento"),
  treatmentName: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Escolha uma data"),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Escolha um horário"),
  name: z.string().trim().min(2, "Informe seu nome"),
  phone: z
    .string()
    .refine((v) => v.replace(/\D/g, "").length >= 10, "Informe um WhatsApp válido com DDD"),
  email: z.union([z.literal(""), z.string().email("E-mail inválido")]).optional(),
  firstVisit: z.enum(["sim", "nao"]),
  payment: z.enum(["particular", "convenio"]),
  notes: z.string().max(500).optional(),
  consent: z.literal(true, { message: "É necessário aceitar para continuar" }),
});

export type BookingData = z.infer<typeof bookingSchema>;

export function formatPhone(v: string): string {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function formatDateBR(iso: string): string {
  const d = new Date(iso + "T12:00:00");
  return d.toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long" });
}

export function buildWhatsAppMessage(b: BookingData): string {
  return [
    `Olá! Gostaria de agendar uma avaliação na ${clinic.name}.`,
    "",
    `*Motivo:* ${b.treatmentName}`,
    `*Data:* ${formatDateBR(b.date)}`,
    `*Horário:* ${b.time}`,
    `*Nome:* ${b.name}`,
    `*WhatsApp:* ${b.phone}`,
    b.email ? `*E-mail:* ${b.email}` : null,
    `*Primeira vez na clínica:* ${b.firstVisit === "sim" ? "Sim" : "Não"}`,
    `*Atendimento:* ${b.payment === "convenio" ? "Convênio" : "Particular"}`,
    b.notes ? `*Observações:* ${b.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

export function buildWhatsAppUrl(b: BookingData): string {
  return whatsappUrl(buildWhatsAppMessage(b));
}

// .ics de pré-reserva (duração padrão 60 min, horário de Brasília).
export function buildIcs(b: BookingData): string {
  const [y, m, d] = b.date.split("-");
  const [hh, mm] = b.time.split(":");
  const start = `${y}${m}${d}T${hh}${mm}00`;
  const endH = String(Number(hh) + 1).padStart(2, "0");
  const end = `${y}${m}${d}T${endH}${mm}00`;
  const esc = (s: string) => s.replace(/[,;\\]/g, (c) => `\\${c}`).replace(/\n/g, "\\n");
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//OS Clinica//Agendamento//PT-BR",
    "BEGIN:VEVENT",
    `UID:${Date.now()}@osclinica`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    `DTSTART;TZID=America/Sao_Paulo:${start}`,
    `DTEND;TZID=America/Sao_Paulo:${end}`,
    `SUMMARY:${esc(`Consulta — ${clinic.name} (pré-reserva)`)}`,
    `DESCRIPTION:${esc(`${b.treatmentName}. Pré-reserva: a clínica confirma o horário pelo WhatsApp.`)}`,
    `LOCATION:${esc(`${clinic.address.street}, ${clinic.address.district}, ${clinic.address.city}/${clinic.address.state}`)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

export function downloadIcs(b: BookingData) {
  const blob = new Blob([buildIcs(b)], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "consulta-os-clinica.ics";
  a.click();
  URL.revokeObjectURL(url);
}
