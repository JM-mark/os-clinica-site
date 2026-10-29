"use client";

import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useBooking } from "./Providers";
import { Photo } from "./Photo";
import { Magnetic } from "./Interactions";
import { useRichMotion } from "./ui";
import { photos } from "@/content/photos";
import { whatsappUrl } from "@/config";

type W = { t: string; ac?: boolean };
const lines: W[][] = [
  [{ t: "Odontologia" }, { t: "integrada", ac: true }],
  [{ t: "do" }, { t: "cuidado", ac: true }, { t: "ao" }, { t: "sorriso", ac: true }],
];

// Selo dourado com texto circular girando devagar e o monograma no centro.
function Seal() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  return (
    <div className="relative h-[104px] w-[104px] sm:h-[124px] sm:w-[124px]" aria-hidden>
      <svg viewBox="0 0 120 120" className="absolute inset-0 h-full w-full animate-[spin_26s_linear_infinite]">
        <defs>
          <path id="seal-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
        </defs>
        <circle cx="60" cy="60" r="60" fill="#C8A97E" />
        <text fontSize="9.2" fontWeight="500" letterSpacing="2.1" fill="#2B3326" style={{ fontFamily: "var(--font-sans-body), sans-serif" }}>
          <textPath href="#seal-circle">ODONTOLOGIA INTEGRADA · VALINHOS · ODONTOLOGIA INTEGRADA · VALINHOS ·</textPath>
        </text>
      </svg>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`${base}/brand/symbol.svg`} alt="" width={52} height={52} className="absolute left-1/2 top-1/2 h-[46%] w-[46%] -translate-x-1/2 -translate-y-1/2" />
    </div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { startBooking } = useBooking();
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  // O arco cresce ao rolar e a foto dentro dele dá um leve zoom (só desktop, sem reduced-motion).
  const scale = useTransform(scrollYProgress, [0, 1], [1, rich ? 1.35 : 1]);
  const inner = useTransform(scrollYProgress, [0, 1], [1, rich ? 1.12 : 1]);

  let n = 0;
  return (
    <section id="topo" ref={ref} className="field relative flex min-h-[100svh] flex-col overflow-hidden text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, #fff, transparent 60%)" }} />

      <div className="container-x relative z-10 flex flex-1 flex-col items-center pt-[112px] text-center md:pt-[128px]">
        <motion.p initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="eyebrow !text-white/85">
          Jardim Ribeiro · Valinhos/SP
        </motion.p>

        <h1 className="t-h1 mt-6">
          {lines.map((line, li) => (
            <span key={li} className="block" aria-hidden="true">
              {line.map((w) => {
                const i = n++;
                return (
                  <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom" aria-hidden>
                    <motion.span
                      className={`inline-block ${w.ac ? "ac" : ""}`}
                      initial={reduce ? false : { y: "110%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {w.t}&nbsp;
                    </motion.span>
                  </span>
                );
              })}
            </span>
          ))}
          <span className="sr-only">Odontologia integrada, do cuidado ao sorriso que você quer ter.</span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="t-lead mt-7 !text-white/90"
        >
          Todas as especialidades em um só plano, com atendimento próximo no Jardim Ribeiro, em Valinhos.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-9 flex flex-col gap-3 sm:flex-row"
        >
          <Magnetic>
            <button onClick={() => startBooking()} className="btn bg-bg text-brand-dark hover:bg-white">
              Agendar avaliação
            </button>
          </Magnetic>
          <Magnetic>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn border border-white/40 text-white hover:bg-white/10">
              <MessageCircle size={18} strokeWidth={1.5} /> Falar no WhatsApp
            </a>
          </Magnetic>
        </motion.div>
      </div>

      <motion.div style={{ y, scale, transformOrigin: "bottom center" }} className="relative z-0 mx-auto mt-10 w-[min(440px,82vw)]">
        <div className="relative h-[220px] sm:h-[340px]">
          <div className="absolute inset-x-0 top-0 h-[520px] overflow-hidden rounded-t-[999px] border border-white/30 bg-sage-soft shadow-2xl">
            <motion.div style={{ scale: inner }} className="absolute inset-0">
              <Photo src={photos.consult.src} alt={photos.consult.alt} tone={0} priority sizes="440px" className="h-full w-full" />
            </motion.div>
          </div>
          <div className="absolute -left-4 top-[28%] z-10 sm:-left-12">
            <Seal />
          </div>
        </div>
      </motion.div>
    </section>
  );
}
