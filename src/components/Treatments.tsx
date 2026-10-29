"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { treatments, type Treatment } from "@/content/treatments";
import { Icon, Reveal, SectionHead } from "./ui";
import { useBooking } from "./Providers";

function GlowCard({ t, onOpen, index }: { t: Treatment; onOpen: () => void; index: number }) {
  const ref = useRef<HTMLButtonElement>(null);

  const move = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  return (
    <Reveal delay={(index % 3) * 0.07}>
      <button
        ref={ref}
        onPointerMove={move}
        onClick={onOpen}
        className="group relative h-full w-full overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface p-7 text-left shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(260px circle at var(--mx,50%) var(--my,50%), rgb(200 169 126 / 0.22), transparent 70%)",
          }}
        />
        <span className="relative flex items-start justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-sage-soft text-brand">
            <Icon name={t.icon} size={22} />
          </span>
          <span className="eyebrow">{String(index + 1).padStart(2, "0")} / 12</span>
        </span>
        <h3 className="relative mt-6 text-[30px] leading-[1.05]">{t.name}</h3>
        <p className="relative mt-3 text-[15px] leading-relaxed text-muted">{t.short}</p>
        <span className="relative mt-6 inline-flex items-center gap-1 text-[14px] font-semibold text-brand">
          Saiba mais <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </button>
    </Reveal>
  );
}

function TreatmentDialog({ t, onClose }: { t: Treatment | null; onClose: () => void }) {
  const ref = useRef<HTMLDialogElement>(null);
  const { startBooking } = useBooking();

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (t && !d.open) d.showModal();
    if (!t && d.open) d.close();
  }, [t]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === ref.current && onClose()}
      aria-labelledby="treat-title"
      className="m-auto w-[min(92vw,560px)] rounded-[28px] border border-line bg-bg p-0 text-ink shadow-2xl backdrop:bg-[#14181b]/40 backdrop:backdrop-blur-sm"
    >
      {t && (
        <div className="relative p-8 sm:p-10">
          <button
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full hover:bg-sage-soft"
          >
            <X size={20} />
          </button>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-soft text-brand">
            <Icon name={t.icon} size={26} />
          </span>
          <h3 id="treat-title" className="mt-6 text-[32px] leading-tight">
            {t.name}
          </h3>
          <p className="mt-4 leading-relaxed text-muted">{t.long}</p>
          <ul className="mt-6 space-y-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px]">
                <Check size={18} className="text-brand" /> {p}
              </li>
            ))}
          </ul>
          {!t.confirmed && (
            <p className="mt-6 rounded-xl bg-sage-soft px-4 py-3 text-[13px] text-muted">
              {/* TODO confirmar com a clínica */}
              Consulte a disponibilidade deste tratamento na avaliação.
            </p>
          )}
          <button
            onClick={() => {
              const id = t.id;
              onClose();
              setTimeout(() => startBooking(id), 120);
            }}
            className="btn btn-primary mt-8 w-full sm:w-auto"
          >
            Agendar este tratamento
          </button>
        </div>
      )}
    </dialog>
  );
}

export function Treatments() {
  const [open, setOpen] = useState<Treatment | null>(null);

  return (
    <section id="tratamentos" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Tratamentos"
          title={<>Todas as áreas da <em className="ac">odontologia</em>, em um só plano.</>}
          lead="Você não precisa escolher por onde começar. Na avaliação, entendemos o seu caso e organizamos o cuidado do jeito certo."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((t, i) => (
            <GlowCard key={t.id} t={t} index={i} onOpen={() => setOpen(t)} />
          ))}
        </div>
      </div>
      <TreatmentDialog t={open} onClose={() => setOpen(null)} />
    </section>
  );
}
