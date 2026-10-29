"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, X } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { treatments, type Treatment } from "@/content/treatments";
import { photos, type SitePhoto } from "@/content/photos";
import { Icon, Reveal, SectionHead, useRichMotion } from "./ui";
import { Photo } from "./Photo";
import { useBooking } from "./Providers";

type Feature = { id: string; a: string; b: string; photo: SitePhoto };

// 5 destaques da vitrine. `id` aponta para src/content/treatments.ts.
const features: Feature[] = [
  { id: "clinica-geral", a: "Prevenção", b: "e cuidado", photo: photos.prevention },
  { id: "clareamento", a: "Clareamento", b: "dental", photo: photos.whitening },
  { id: "implantes", a: "Implantes", b: "dentários", photo: photos.implants },
  { id: "ortodontia", a: "Ortodontia", b: "e alinhadores", photo: photos.ortho },
  { id: "dentistica", a: "Estética", b: "do sorriso", photo: photos.aesthetic },
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
          <h3 id="treat-title" className="mt-6 text-[36px] leading-tight">{t.name}</h3>
          <p className="mt-4 leading-relaxed text-muted">{t.long}</p>
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

  return (
    <div ref={ref} style={{ height: `${features.length * 85}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-x grid w-full grid-cols-[0.7fr_1.1fr_1fr] items-center gap-10">
          <div>
            <p className="font-serif text-[88px] leading-none text-brand" aria-live="polite">
              {pad(i + 1)} <span className="text-ink/30">— {pad(features.length)}</span>
            </p>
            <div className="mt-6 h-px w-full bg-line">
              <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="h-px bg-accent" />
            </div>
          </div>

          <div className="min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={f.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-[72px] leading-[0.98] xl:text-[84px]">
                  {f.a}
                  <br />
                  <em className="ac">{f.b}</em>
                </h3>
                <p className="mt-6 max-w-sm text-[16px] leading-relaxed text-muted">{byId(f.id).short}</p>
                <button onClick={() => onOpen(byId(f.id))} className="mt-7 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand">
                  Saiba mais <ArrowUpRight size={17} />
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative aspect-[4/5] w-full">
            {features.map((x, k) => (
              <div key={x.id} className="absolute inset-0 transition-opacity duration-700" style={{ opacity: k === i ? 1 : 0 }} aria-hidden={k !== i}>
                <Photo src={x.photo.src} alt={x.photo.alt} label={`${x.a} ${x.b}`} tone={k} sizes="40vw" className="h-full w-full rounded-[28px]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCards({ onOpen }: { onOpen: (t: Treatment) => void }) {
  return (
    <div className="container-x mt-12 grid gap-5 sm:grid-cols-2">
      {features.map((x, k) => (
        <Reveal key={x.id} delay={(k % 2) * 0.06}>
          <article className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-soft)]">
            <Photo src={x.photo.src} alt={x.photo.alt} label={`${pad(k + 1)} — ${pad(features.length)}`} tone={k} sizes="(min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full" />
            <div className="p-6">
              <h3 className="text-[32px] leading-[1.02]">
                {x.a} <em className="ac">{x.b}</em>
              </h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{byId(x.id).short}</p>
              <button onClick={() => onOpen(byId(x.id))} className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-semibold text-brand">
                Saiba mais <ArrowUpRight size={16} />
              </button>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
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
                  <span className="block font-serif text-[24px] leading-tight">{t.name}</span>
                  <span className="mt-1 block text-[14px] leading-snug text-muted">{t.short}</span>
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
