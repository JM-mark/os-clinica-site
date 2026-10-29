"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { beforeAfterPairs } from "@/content/photos";
import { Photo } from "./Photo";
import { Magnetic } from "./Interactions";
import { useBooking } from "./Providers";
import { Roll, useRichMotion } from "./ui";

// Os pares são imagens GERADAS (mesma pessoa, só os dentes mudam), em public/antes-depois/<slug>-antes.webp e -depois.webp.
// Antes de publicar no domínio oficial, trocar por casos reais autorizados pelos pacientes (CFO, Res. 196/2019)
// ou manter como demonstração de tratamento.
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const cases = beforeAfterPairs.map((c) => ({
  title: c.title,
  before: { src: `${BASE}/antes-depois/${c.slug}-antes.webp`, alt: c.altBefore },
  after: { src: `${BASE}/antes-depois/${c.slug}-depois.webp`, alt: c.altAfter },
}));

function ToothIcon() {
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <path d="M8 3.5c-2.4 0-4 1.7-4 4.2 0 1.8.7 3 1.1 4.7.5 2 .7 5.6 1.8 5.6 1.3 0 1.1-3 2-4.5.5-.8 1.5-.8 2 0 .9 1.5.7 4.5 2 4.5 1.1 0 1.3-3.6 1.8-5.6.4-1.7 1.1-2.9 1.1-4.7 0-2.5-1.6-4.2-4-4.2-1.4 0-2 .6-3 .6S9.4 3.5 8 3.5Z" />
    </svg>
  );
}

function Comparer({ title, before, after, index }: { title: string; before: { src: string; alt: string }; after: { src: string; alt: string }; index: number }) {
  const reduce = useReducedMotion();
  const rich = useRichMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const seen = useInView(box, { once: true, amount: 0.6 });
  const pos = useMotionValue(50);
  const clip = useTransform(pos, (v) => `inset(0 ${100 - v}% 0 0)`);
  const left = useTransform(pos, (v) => `${v}%`);

  // Parallax e rotação leve por card (só desktop): lados com velocidades diferentes.
  const rightSide = index % 2 === 1;
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], rich ? (rightSide ? [140, -120] : [90, -170]) : [0, 0]);
  const rotate = useTransform(scrollYProgress, [0, 0.4], rich ? [rightSide ? 1 : -1, 0] : [0, 0]);

  useEffect(
    () =>
      pos.on("change", (v) => {
        if (input.current) input.current.value = String(v);
      }),
    [pos],
  );

  // Ao aparecer, a linha "passeia" uma vez (50 → 30 → 70 → 50, 2,2s) para mostrar que dá para arrastar.
  useEffect(() => {
    if (!seen || reduce || !rich) return;
    const a = animate(pos, [50, 30, 70, 50], { duration: 2.2, ease: "easeInOut" });
    return () => a.stop();
  }, [seen, reduce, rich, pos]);

  return (
    <motion.div ref={wrap} style={{ y, rotate }} className={rich ? `pointer-events-auto w-[30%] ${rightSide ? "ml-auto mr-[7%]" : "ml-[7%]"}` : "w-full"}>
      <figure>
        <div
          ref={box}
          data-cursor="Arraste"
          className="relative aspect-[4/5] w-full select-none overflow-hidden rounded-[24px] border border-white/60 shadow-[var(--shadow-soft)]"
        >
          <div className="absolute inset-0">
            <Photo src={after.src} alt={after.alt} tone={index} sizes="(min-width: 1024px) 30vw, 100vw" className="h-full w-full" />
          </div>
          <motion.div style={{ clipPath: clip }} className="absolute inset-0" aria-hidden>
            <Photo src={before.src} alt="" tone={index} sizes="(min-width: 1024px) 30vw, 100vw" className="h-full w-full" />
          </motion.div>

          <span className="absolute left-4 top-4 z-10 rounded-full bg-black/50 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-white backdrop-blur">Antes</span>
          <span className="absolute right-4 top-4 z-10 rounded-full bg-white/85 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.14em] text-brand backdrop-blur">Depois</span>

          {/* linha fina branca + alça de vidro com dente, perto da base (como no template de referência) */}
          <motion.div style={{ left }} aria-hidden className="pointer-events-none absolute inset-y-0 z-10 w-px -translate-x-1/2 bg-white/70">
            <span className="absolute left-1/2 top-[82%] grid h-11 w-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-white/25 text-white shadow-lg backdrop-blur-md">
              <ToothIcon />
            </span>
          </motion.div>

          <input
            ref={input}
            type="range"
            min={0}
            max={100}
            step={1}
            defaultValue={50}
            data-cursor="Arraste"
            aria-label={`Comparar antes e depois: ${title}`}
            onChange={(e) => pos.set(Number(e.target.value))}
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          />
        </div>
        <figcaption className="mt-5">
          <span className="block font-serif text-[clamp(32px,3vw,40px)] leading-[1.02]">{title}</span>
        </figcaption>
      </figure>
    </motion.div>
  );
}

function Title() {
  const { startBooking } = useBooking();
  return (
    <div className="mx-auto max-w-[44rem] px-5 text-center">
      <p className="eyebrow">Transformações</p>
      <h2 className="t-h2 mt-5">
        Pequenos detalhes, <em className="ac">grandes</em> mudanças.
      </h2>
      <p className="t-lead mx-auto mt-6">
        Arraste a linha e veja como cada tratamento atua no sorriso: restauração, implante, clareamento e alinhadores. Na avaliação, mostramos o caminho indicado para você.
      </p>
      <div className="mt-8 flex justify-center">
        <Magnetic>
          <button onClick={() => startBooking()} className="btn btn-primary">
            <Roll>Agendar avaliação</Roll>
          </button>
        </Magnetic>
      </div>
    </div>
  );
}

export function BeforeAfter() {
  const rich = useRichMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Quanto mais os cards cobrem o título, mais ele desfoca e esmaece.
  const blur = useTransform(scrollYProgress, [0.08, 0.65], [0, 14]);
  const op = useTransform(scrollYProgress, [0.08, 0.65], [1, 0.35]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);

  if (!rich) {
    return (
      <section id="antes-depois" className="py-20 md:py-28">
        <Title />
        <div className="container-x mt-14 grid gap-10 sm:grid-cols-2">
          {cases.map((c, i) => (
            <Comparer key={c.title} index={i} {...c} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="antes-depois" ref={ref} className="relative">
      <motion.div style={{ filter, opacity: op }} className="sticky top-0 z-0 grid h-screen place-items-center">
        <Title />
      </motion.div>
      {/* cards sobem em ziguezague por cima do título fixo */}
      <div className="pointer-events-none relative z-10 -mt-[100vh] pb-[18vh] pt-[70vh]">
        <div className="pointer-events-none space-y-[16vh]">
          {cases.map((c, i) => (
            <div key={c.title}>
              <Comparer index={i} {...c} />
            </div>
          ))}
        </div>
      </div>
      <div className="relative z-10 pb-24" />
    </section>
  );
}
