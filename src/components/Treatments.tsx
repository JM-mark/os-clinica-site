"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { treatments, type Treatment } from "@/content/treatments";
import { Icon, Reveal, SectionHead, useRichMotion } from "./ui";
import { useBooking } from "./Providers";

type Feature = { id: string; a: string; b: string };

// 5 destaques da vitrine. `id` aponta para src/content/treatments.ts.
const features: Feature[] = [
  { id: "clinica-geral", a: "Prevenção", b: "e cuidado" },
  { id: "clareamento", a: "Clareamento", b: "dental" },
  { id: "implantes", a: "Implantes", b: "dentários" },
  { id: "ortodontia", a: "Ortodontia", b: "e alinhadores" },
  { id: "dentistica", a: "Estética", b: "do sorriso" },
];
const featureIds = new Set(features.map((f) => f.id));
const byId = (id: string) => treatments.find((t) => t.id === id)!;
const others = treatments.filter((t) => !featureIds.has(t.id));
const pad = (n: number) => String(n).padStart(2, "0");

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
          <button onClick={onClose} aria-label="Fechar" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full hover:bg-sage-soft">
            <X size={20} />
          </button>
          <span className="grid h-14 w-14 place-items-center rounded-full bg-sage-soft text-brand">
            <Icon name={t.icon} size={26} />
          </span>
          <h3 id="treat-title" className="mt-6 text-[clamp(34px,4vw,46px)] leading-[1.02]">{t.name}</h3>
          <p className="t-body mt-4">{t.long}</p>
          <ul className="mt-6 space-y-2">
            {t.points.map((p) => (
              <li key={p} className="flex items-center gap-3 text-[15px]"><Check size={18} className="text-brand" /> {p}</li>
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

// Vitrine fixa (desktop): a seção é alta e o conteúdo fica "preso" na tela enquanto o scroll troca o item.
function Showcase({ onOpen }: { onOpen: (t: Treatment) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setI(Math.min(features.length - 1, Math.max(0, Math.floor(p * features.length)))));
  const f = features[i];
  const mask = (delay: number) => ({
    initial: { y: "112%" },
    animate: { y: "0%" },
    exit: { y: "-112%" },
    transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  });

  return (
    <div ref={ref} style={{ height: `${features.length * 85}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-x grid w-full grid-cols-[0.7fr_1.3fr] items-center gap-16">
          <div>
            {/* contador com giro vertical (odômetro) */}
            <p className="num-serif flex items-baseline whitespace-nowrap font-serif text-[clamp(60px,5.6vw,88px)] leading-none text-brand" aria-live="polite" aria-label={`${pad(i + 1)} de ${pad(features.length)}`}>
              <span aria-hidden>0</span>
              <span aria-hidden className="inline-block h-[1em] overflow-hidden">
                <motion.span className="flex flex-col" animate={{ y: `-${i * (100 / features.length)}%` }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}>
                  {features.map((_, k) => (
                    <span key={k} className="block h-[1em] leading-none">{k + 1}</span>
                  ))}
                </motion.span>
              </span>
              <span aria-hidden className="ml-3 text-ink/30">— {pad(features.length)}</span>
            </p>
            <div className="mt-6 h-px w-full bg-line">
              <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="h-px bg-accent" />
            </div>
          </div>

          <div className="min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div key={f.id}>
                <h3 className="text-[clamp(72px,8vw,120px)] leading-[0.94]">
                  <span className="block overflow-hidden pb-[0.08em]"><motion.span className="block" {...mask(0)}>{f.a}</motion.span></span>
                  <span className="block overflow-hidden pb-[0.08em]"><motion.span className="ac block" {...mask(0.08)}>{f.b}</motion.span></span>
                </h3>
                <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
                  <p className="t-lead mt-7">{byId(f.id).short}</p>
                  <button onClick={() => onOpen(byId(f.id))} className="mt-8 inline-flex items-center gap-2 text-[17px] font-medium text-brand">
                    <span className="u-link pb-1">Saiba mais</span> <ArrowUpRight size={18} />
                  </button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

function FeatureCards({ onOpen }: { onOpen: (t: Treatment) => void }) {
  return (
    <ol className="container-x mt-12 divide-y divide-line border-y border-line">
      {features.map((x, k) => (
        <li key={x.id}>
          <Reveal className="py-8">
            <p className="num-serif font-serif text-[40px] leading-none text-brand">
              {pad(k + 1)} <span className="text-ink/30">— {pad(features.length)}</span>
            </p>
            <h3 className="t-h3 mt-4">
              {x.a} <em className="ac">{x.b}</em>
            </h3>
            <p className="t-body mt-3">{byId(x.id).short}</p>
            <button onClick={() => onOpen(byId(x.id))} className="mt-5 inline-flex min-h-11 items-center gap-1.5 text-[16px] font-medium text-brand">
              <span className="u-link pb-0.5">Saiba mais</span> <ArrowUpRight size={17} />
            </button>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Treatments() {
  const [open, setOpen] = useState<Treatment | null>(null);
  const rich = useRichMotion();

  return (
    <section id="tratamentos" className="pt-20 md:pt-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Tratamentos"
          title={<>Todas as áreas da <em className="ac">odontologia</em>, em um só plano.</>}
          lead="Você não precisa escolher por onde começar. Na avaliação, entendemos o seu caso e organizamos o cuidado do jeito certo."
        />
      </div>

      {rich ? <Showcase onOpen={setOpen} /> : <FeatureCards onOpen={setOpen} />}

      <div className="container-x pb-20 pt-10 md:pb-28">
        <Reveal>
          <p className="eyebrow">Outras especialidades</p>
        </Reveal>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((t, k) => (
            <Reveal key={t.id} delay={(k % 3) * 0.06}>
              <button
                onClick={() => setOpen(t)}
                className="group flex h-full w-full items-start gap-4 rounded-[20px] border border-line bg-surface p-5 text-left transition hover:-translate-y-0.5 hover:border-brand/40"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-sage-soft text-brand">
                  <Icon name={t.icon} size={20} />
                </span>
                <span>
                  <span className="block font-serif text-[28px] leading-[1.05]">{t.name}</span>
                  <span className="mt-2 block text-[15.5px] leading-[1.5] text-muted">{t.short}</span>
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
      <TreatmentDialog t={open} onClose={() => setOpen(null)} />
    </section>
  );
}
