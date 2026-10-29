import { NextResponse } from "next/server";
import { bookingSchema } from "@/lib/booking";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "JSON inválido" }, { status: 400 });
  }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Dados inválidos", issues: parsed.error.issues }, { status: 422 });
  }

  const payload = { ...parsed.data, receivedAt: new Date().toISOString(), source: "site-previa" };
  const webhook = process.env.BOOKING_WEBHOOK_URL;

  if (!webhook) {
    // Modo prévia: sem webhook configurado, apenas registra (sem dados pessoais).
    console.log("[agendamento] modo prévia — recebido:", payload.treatmentName, payload.date, payload.time);
    return NextResponse.json({ ok: true, mode: "preview" });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) throw new Error(`webhook respondeu ${res.status}`);
    return NextResponse.json({ ok: true, mode: "webhook" });
  } catch (err) {
    console.error("[agendamento] falha ao enviar ao webhook:", err);
    return NextResponse.json({ ok: false, error: "Falha ao repassar o agendamento" }, { status: 502 });
  }
}
