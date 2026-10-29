"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CalendarPlus, Check, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { extraReasons, treatments } from "@/content/treatments";
import { getSlots, isBookableDate, periods, type Slot } from "@/lib/availability";
import {
  bookingSchema, buildWhatsAppUrl, downloadIcs, formatDateBR, formatPhone, type BookingData,
} from "@/lib/booking";
import { Icon, Reveal } from "./ui";
import { useBooking } from "./Providers";

const stepNames = ["Motivo", "Data e horário", "Seus dados", "Confirmação"];
const reasons = [...extraReasons, ...treatments.map((t) => ({ id: t.id, name: t.name, icon: t.icon, short: t.short }))];

const iso = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

function Calendar({ value, onChange }: { value: string; onChange: (iso: string) => void }) {
  const today = new Date();
  const [cursor, setCursor] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const first = cursor.getDay();
  const days = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
  const canPrev = cursor > new Date(today.getFullYear(), today.getMonth(), 1);
  const label = cursor.toLocaleDateString("pt-BR", { month: "long", year: "numeric" });

  return (
    <div className="rounded-2xl border border-line bg-surface p-4">
      <div className="mb-3 flex items-center justify-between">
        <button type="button" disabled={!canPrev} aria-label="Mês anterior"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          className="grid h-11 w-11 place-items-center rounded-full hover:bg-sage-soft disabled:opacity-30">
          <ChevronLeft size={18} />
        </button>
        <p className="font-serif text-lg first-letter:uppercase" aria-live="polite">{label}</p>
        <button type="button" aria-label="Próximo mês"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          className="grid h-11 w-11 place-items-center rounded-full hover:bg-sage-soft">
          <ChevronRight size={18} />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-semibold uppercase tracking-wider text-muted">
        {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => <span key={i} className="py-1">{d}</span>)}
      </div>
      <div className="mt-1 grid grid-cols-7 gap-1">
        {Array.from({ length: first }).map((_, i) => <span key={`e${i}`} />)}
        {Array.from({ length: days }).map((_, i) => {
          const d = new Date(cursor.getFullYear(), cursor.getMonth(), i + 1);
          const ok = isBookableDate(d);
          const v = iso(d);
          const sel = v === value;
          return (
            <button key={v} type="button" disabled={!ok} onClick={() => onChange(v)} aria-pressed={sel}
              aria-label={d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}
              className={`aspect-square rounded-full text-[14px] font-medium transition-colors ${
                sel ? "bg-brand text-white" : ok ? "hover:bg-sage-soft" : "text-muted/40 line-through"
              }`}>
              {i + 1}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function Booking() {
  const reduce = useReducedMotion();
  const { preselected } = useBooking();
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [period, setPeriod] = useState<"manha" | "tarde">("manha");
  const [slots, setSlots] = useState<Slot[]>([]);
  const [done, setDone] = useState<BookingData | null>(null);
  const [sending, setSending] = useState(false);

  const form = useForm<BookingData>({
    resolver: zodResolver(bookingSchema),
    mode: "onTouched",
    defaultValues: {
      treatmentId: "", treatmentName: "", date: "", time: "", name: "", phone: "", email: "",
      firstVisit: "sim", payment: "particular", notes: "",
    } as Partial<BookingData> as BookingData,
  });
  const { register, watch, setValue, trigger, handleSubmit, formState: { errors } } = form;
  const v = watch();

  const pick = (id: string) => {
    const r = reasons.find((x) => x.id === id);
    if (!r) return;
    setValue("treatmentId", r.id, { shouldValidate: true });
    setValue("treatmentName", r.name);
  };

  useEffect(() => {
    if (preselected) { pick(preselected); setStep((s) => (s === 3 ? s : 1)); setDir(1); }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [preselected]);

  useEffect(() => {
    if (!v.date) return;
    let live = true;
    getSlots(v.date, period).then((s) => live && setSlots(s));
    return () => { live = false; };
  }, [v.date, period]);

  const go = async (next: number) => {
    if (next > step) {
      const fields: (keyof BookingData)[][] = [["treatmentId"], ["date", "time"], ["name", "phone", "email", "consent"]];
      const ok = await trigger(fields[step]);
      if (!ok) return;
    }
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const submit = handleSubmit(async (data) => {
    setSending(true);
    // Abre o WhatsApp (funciona sem backend) e envia ao webhook em paralelo.
    window.open(buildWhatsAppUrl(data), "_blank", "noopener,noreferrer");
    try {
      await fetch(process.env.NEXT_PUBLIC_BOOKING_WEBHOOK_URL || `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/api/agendamento`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    } catch { /* modo prévia: ignora falha de rede */ }
    setSending(false);
    setDone(data);
    setDir(1);
    setStep(3);
  });

  const variants = useMemo(
    () => ({
      enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 40 }),
      center: { opacity: 1, x: 0 },
      exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -40 }),
    }),
    [reduce],
  );

  const input = "w-full rounded-xl border border-line bg-surface px-4 py-3.5 text-[16px] outline-none transition focus:border-brand";
  const err = (m?: string) => m && <p role="alert" className="mt-1.5 text-[13px] text-[#a13d2d]">{m}</p>;

  return (
    <section id="agendar" className="relative overflow-hidden bg-brand py-20 text-white md:py-28">
      <div aria-hidden className="absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full border border-accent/30" />
      <div aria-hidden className="absolute -right-20 -top-20 h-[320px] w-[320px] rounded-full border border-accent/20" />
      <div className="container-x relative grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <Reveal>
          <p className="eyebrow !text-accent">Agendamento online</p>
          <h2 className="t-h2 mt-5">Agende sua <em className="ac">avaliação</em> em menos de 1 minuto.</h2>
          <p className="t-lead mt-6 !text-white/85">
            Escolha o tratamento, o melhor horário e receba a confirmação pelo WhatsApp.
          </p>
          <ul className="mt-8 space-y-3 text-[15px] text-white/85">
            {["Sem cadastro e sem senha", "Seus dados só são usados para o agendamento", "A clínica confirma o horário com você"].map((t) => (
              <li key={t} className="flex items-center gap-3"><Check size={18} className="text-accent" />{t}</li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-[28px] bg-bg p-5 text-ink shadow-2xl sm:p-8">
            {/* progresso */}
            <div className="mb-6">
              <div className="flex justify-between text-[12px] font-semibold uppercase tracking-wider text-muted">
                <span>Etapa {step + 1} de 4</span><span>{stepNames[step]}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sage-soft" role="progressbar" aria-label="Progresso do agendamento" aria-valuemin={1} aria-valuemax={4} aria-valuenow={step + 1}>
                <motion.div className="h-full rounded-full bg-brand" animate={{ width: `${((step + 1) / 4) * 100}%` }} transition={{ duration: reduce ? 0 : 0.5 }} />
              </div>
            </div>

            <form onSubmit={submit} noValidate>
              <AnimatePresence mode="wait" custom={dir} initial={false}>
                <motion.div key={step} custom={dir} variants={variants} initial="enter" animate="center" exit="exit" transition={{ duration: reduce ? 0 : 0.3 }}>
                  {step === 0 && (
                    <fieldset>
                      <legend className="font-serif text-[26px]">Qual o motivo da consulta?</legend>
                      <div className="mt-5 grid max-h-[420px] gap-2.5 overflow-y-auto pb-12 pr-1 [mask-image:linear-gradient(to_bottom,black_82%,transparent)] sm:grid-cols-2">
                        {reasons.map((r) => (
                          <button type="button" key={r.id} onClick={() => pick(r.id)} aria-pressed={v.treatmentId === r.id}
                            className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left transition ${v.treatmentId === r.id ? "border-brand bg-sage-soft" : "border-line bg-surface hover:border-brand/40"}`}>
                            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sage-soft text-brand"><Icon name={r.icon} size={18} /></span>
                            <span className="text-[14px] font-semibold leading-tight">{r.name}</span>
                          </button>
                        ))}
                      </div>
                      {err(errors.treatmentId?.message)}
                    </fieldset>
                  )}

                  {step === 1 && (
                    <div>
                      <h3 className="font-serif text-[26px]">Quando fica melhor?</h3>
                      <div className="mt-5 grid gap-5 md:grid-cols-2">
                        <Calendar value={v.date} onChange={(d) => { setValue("date", d, { shouldValidate: true }); setValue("time", ""); }} />
                        <div>
                          <div className="flex gap-2" role="tablist" aria-label="Período">
                            {periods.map((p) => (
                              <button type="button" role="tab" aria-selected={period === p.id} key={p.id}
                                onClick={() => { setPeriod(p.id); setValue("time", ""); }}
                                className={`flex-1 rounded-full border px-4 py-2.5 text-[14px] font-semibold ${period === p.id ? "border-brand bg-brand text-white" : "border-line bg-surface"}`}>
                                {p.label}
                              </button>
                            ))}
                          </div>
                          {!v.date ? (
                            <p className="mt-4 text-[14px] text-muted">Escolha uma data para ver os horários. Domingos não têm atendimento.</p>
                          ) : slots.length === 0 ? (
                            <p className="mt-4 text-[14px] text-muted">Sem horários neste período. Tente outro período ou outro dia.</p>
                          ) : (
                            <div className="mt-4 grid grid-cols-3 gap-2">
                              {slots.map((s) => (
                                <button type="button" key={s.time} disabled={!s.available} aria-pressed={v.time === s.time}
                                  onClick={() => setValue("time", s.time, { shouldValidate: true })}
                                  className={`rounded-xl border py-3 text-[14px] font-semibold ${v.time === s.time ? "border-brand bg-brand text-white" : s.available ? "border-line bg-surface hover:border-brand/50" : "border-transparent bg-sage-soft/60 text-muted/50 line-through"}`}>
                                  {s.time}
                                </button>
                              ))}
                            </div>
                          )}
                          {err(errors.date?.message || errors.time?.message)}
                          <p className="mt-4 text-[12px] text-muted">Horários de exemplo na prévia. A clínica confirma a disponibilidade real.</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="grid gap-4">
                      <h3 className="font-serif text-[26px]">Seus dados</h3>
                      <div>
                        <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold">Nome completo</label>
                        <input id="name" autoComplete="name" className={input} {...register("name")} />
                        {err(errors.name?.message)}
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold">WhatsApp</label>
                          <input id="phone" inputMode="tel" autoComplete="tel" placeholder="(19) 90000-0000" className={input}
                            {...register("phone", { onChange: (e) => setValue("phone", formatPhone(e.target.value)) })} />
                          {err(errors.phone?.message)}
                        </div>
                        <div>
                          <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold">E-mail <span className="font-normal text-muted">(opcional)</span></label>
                          <input id="email" type="email" autoComplete="email" className={input} {...register("email")} />
                          {err(errors.email?.message)}
                        </div>
                      </div>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <label htmlFor="first" className="mb-1.5 block text-[13px] font-semibold">Primeira vez na clínica?</label>
                          <select id="first" className={input} {...register("firstVisit")}><option value="sim">Sim</option><option value="nao">Não</option></select>
                        </div>
                        <div>
                          <label htmlFor="pay" className="mb-1.5 block text-[13px] font-semibold">Atendimento</label>
                          <select id="pay" className={input} {...register("payment")}><option value="particular">Particular</option><option value="convenio">Convênio</option></select>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="notes" className="mb-1.5 block text-[13px] font-semibold">Observações <span className="font-normal text-muted">(opcional)</span></label>
                        <textarea id="notes" rows={3} className={input} {...register("notes")} />
                      </div>
                      <div>
                        <label className="flex items-start gap-3 text-[14px] leading-snug">
                          <input type="checkbox" className="mt-1 h-5 w-5 accent-[#3f4a38]" {...register("consent")} />
                          <span>
                            Concordo em compartilhar estes dados com a OS Clínica para fins de agendamento, conforme a{" "}
                            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/privacidade/`} target="_blank" className="font-semibold text-brand underline">Política de Privacidade</a> (LGPD).
                          </span>
                        </label>
                        {err(errors.consent?.message)}
                      </div>
                    </div>
                  )}

                  {step === 3 && done && (
                    <div className="py-4 text-center">
                      <motion.div initial={reduce ? false : { scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }}
                        className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-brand text-white">
                        <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                          <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={reduce ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.25, duration: 0.5 }} />
                        </svg>
                      </motion.div>
                      <h3 className="mt-6 font-serif text-[30px]">Pedido enviado, {done.name.split(" ")[0]}!</h3>
                      <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-muted">
                        Abrimos o WhatsApp com os seus dados. Se a janela não abriu, use o botão abaixo. A clínica confirma o horário por lá.
                      </p>
                      <dl className="mx-auto mt-6 max-w-sm rounded-2xl border border-line bg-surface p-5 text-left text-[14px]">
                        <div className="flex justify-between gap-4 py-1"><dt className="text-muted">Motivo</dt><dd className="text-right font-semibold">{done.treatmentName}</dd></div>
                        <div className="flex justify-between gap-4 py-1"><dt className="text-muted">Data</dt><dd className="text-right font-semibold capitalize">{formatDateBR(done.date)}</dd></div>
                        <div className="flex justify-between gap-4 py-1"><dt className="text-muted">Horário</dt><dd className="font-semibold">{done.time}</dd></div>
                      </dl>
                      <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <a href={buildWhatsAppUrl(done)} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><MessageCircle size={18} /> Abrir WhatsApp</a>
                        <button type="button" onClick={() => downloadIcs(done)} className="btn btn-ghost"><CalendarPlus size={18} /> Adicionar à agenda</button>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {step < 3 && (
                <div className="mt-8 flex items-center justify-between gap-3">
                  <button type="button" onClick={() => go(step - 1)} disabled={step === 0} className="btn btn-ghost disabled:invisible">Voltar</button>
                  {step < 2 ? (
                    <button type="button" onClick={() => go(step + 1)} className="btn btn-primary">Continuar</button>
                  ) : (
                    <button type="submit" disabled={sending} className="btn btn-primary">{sending ? "Enviando…" : "Confirmar agendamento"}</button>
                  )}
                </div>
              )}
            </form>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
