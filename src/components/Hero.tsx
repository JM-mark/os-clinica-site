"use client";

import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useBooking } from "./Providers";
import { whatsappUrl } from "@/config";

type W = { t: string; ac?: boolean };
const lines: W[][] = [
  [{ t: "Odontologia" }, { t: "integrada", ac: true }],
  [{ t: "do" }, { t: "cuidado", ac: true }, { t: "ao" }, { t: "sorriso", ac: true }],
];

// Objeto focal abstrato: arco com anéis dourados e o monograma. TODO trocar por foto/render real quando houver.
function Focal() {
  return (
    <svg viewBox="0 0 600 420" className="h-full w-full" aria-hidden>
      <defs>
        <linearGradient id="arch" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f3f1e8" />
          <stop offset="1" stopColor="#cfd2bd" />
        </linearGradient>
      </defs>
      {[210, 250, 290].map((r, i) => (
        <circle key={r} cx="300" cy="420" r={r} fill="none" stroke="#c8a97e" strokeOpacity={0.5 - i * 0.14} strokeWidth="1" />
      ))}
      <path d="M130 420 V230 C130 130 205 70 300 70 C395 70 470 130 470 230 V420 Z" fill="url(#arch)" />
      <path d="M160 420 V232 C160 148 220 100 300 100 C380 100 440 148 440 232 V420" fill="none" stroke="#fff" strokeOpacity="0.7" />
      <text x="300" y="245" textAnchor="middle" fontSize="96" fill="#3f4a38" style={{ fontFamily: "var(--font-display), serif", fontStyle: "italic" }}>
        OS
      </text>
      <path d="M232 268 c40 26 98 26 136 -8" stroke="#c8a97e" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { startBooking } = useBooking();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);

  let n = 0;
  return (
    <section id="topo" ref={ref} className="field relative flex min-h-[100svh] flex-col overflow-hidden text-white">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-soft-light" style={{ backgroundImage: "radial-gradient(circle at 50% 100%, #fff, transparent 60%)" }} />

      <div className="container-x relative z-10 flex flex-1 flex-col items-center pt-[120px] text-center md:pt-[132px]">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="eyebrow !text-white/80"
        >
          Jardim Ribeiro · Valinhos/SP
        </motion.p>

        <h1 className="mt-5 text-[52px] leading-[0.95] sm:text-[84px] lg:text-[112px]">
          {lines.map((line, li) => (
            <span key={li} className="block" aria-label={line.map((w) => w.t).join(" ")}>
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
          <span className="sr-only"> que você quer ter.</span>
        </h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="mt-6 max-w-lg text-[17px] leading-relaxed text-white/85"
        >
          Do cuidado preventivo ao sorriso que você quer ter, em um plano único e pensado para você.
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <button onClick={() => startBooking()} className="btn bg-bg text-brand-dark hover:bg-white">
            Agendar avaliação
          </button>
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn border border-white/40 text-white hover:bg-white/10">
            <MessageCircle size={18} strokeWidth={1.5} /> Falar no WhatsApp
          </a>
        </motion.div>
      </div>

      <motion.div style={{ y }} className="relative z-0 mx-auto -mb-1 mt-10 h-[200px] w-full max-w-[560px] px-6 sm:h-[300px]">
        <Focal />
      </motion.div>
    </section>
  );
}
