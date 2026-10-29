"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { photos, type SitePhoto } from "@/content/photos";
import { Photo } from "./Photo";
import { Reveal, SectionHead, useRichMotion } from "./ui";

// O "antes" é uma SIMULAÇÃO: a mesma foto com filtro CSS. TODO trocar por pares reais autorizados pelo paciente.
const SIM_FILTER = "[filter:sepia(.42)_saturate(1.3)_brightness(.93)]";

function Comparer({ title, photo }: { title: string; photo: SitePhoto }) {
  const reduce = useReducedMotion();
  const rich = useRichMotion();
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const seen = useInView(box, { once: true, amount: 0.6 });
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);

  useEffect(
    () =>
      pos.on("change", (v) => {
        if (input.current) input.current.value = String(v);
      }),
    [pos],
  );

  // Ao aparecer, o divisor "passeia" uma vez para mostrar que dá para arrastar (só desktop, sem reduced-motion).
  useEffect(() => {
    if (!seen || reduce || !rich) return;
    const a = animate(pos, [50, 28, 72, 50], { duration: 2.2, ease: "easeInOut" });
    return () => a.stop();
  }, [seen, reduce, rich, pos]);

  return (
    <Reveal>
      <figure>
        <div
          ref={box}
          className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-[var(--radius-card)] border border-line shadow-[var(--shadow-soft)]"
        >
          <div className="absolute inset-0">
            <Photo src={photo.src} alt={`${photo.alt} (depois)`} tone={1} sizes="(min-width: 1024px) 45vw, 100vw" className="h-full w-full" />
          </div>
          <motion.div style={{ clipPath: clip }} className="absolute inset-0" aria-hidden>
            <Photo src={photo.src} alt="" tone={1} sizes="(min-width: 1024px) 45vw, 100vw" imgClassName={SIM_FILTER} className="h-full w-full" />
          </motion.div>

          <span className="absolute left-4 top-4 z-10 rounded-full bg-black/55 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-white backdrop-blur">
            Antes
          </span>
          <span className="absolute right-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-brand backdrop-blur">
            Depois
          </span>

          <motion.div
            style={{ left }}
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-white shadow-[0_0_0_1px_rgb(0_0_0/0.08)]"
          >
            <span className="absolute left-1/2 top-1/2 grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-brand shadow-lg">
              <ChevronsLeftRight size={20} strokeWidth={1.5} />
            </span>
          </motion.div>

          <input
            ref={input}
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={50}
            aria-label={`Comparar antes e depois: ${title}`}
            onChange={(e) => pos.set(Number(e.target.value))}
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
        <figcaption className="mt-4 flex items-baseline justify-between gap-4">
          <span className="font-serif text-[28px] leading-tight">{title}</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted">Simulação ilustrativa</span>
        </figcaption>
      </figure>
    </Reveal>
  );
}

export function BeforeAfter() {
  return (
    <section id="antes-depois" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead
          eyebrow="Antes e depois"
          title={
            <>
              Veja a diferença, <em className="ac">arrastando</em>.
            </>
          }
          lead="Imagens ilustrativas desta prévia. Casos reais só são publicados com autorização do paciente, conforme as normas do CFO. Os resultados variam de pessoa para pessoa."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          <Comparer title="Clareamento dental" photo={photos.smileA} />
          <Comparer title="Estética do sorriso" photo={photos.smileB} />
        </div>
      </div>
    </section>
  );
}
