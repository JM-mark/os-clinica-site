"use client";

import { useRef } from "react";
import { MessageCircle } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useBooking } from "./Providers";
import { Magnetic } from "./Interactions";
import { Roll, useRichMotion } from "./ui";
import { MONO_O, MONO_S, MONO_TRANSFORM } from "./monogramPaths";
import { whatsappUrl } from "@/config";

type W = { t: string; ac?: boolean };
const lines: W[][] = [
  [{ t: "Odontologia" }, { t: "integrada", ac: true }],
  [{ t: "do" }, { t: "cuidado", ac: true }, { t: "ao" }, { t: "sorriso", ac: true }],
];

// Logo: disco sálvia + monograma OS. No primeiro carregamento o monograma se desenha em traço dourado (1,2s) antes de preencher.
// TODO trocar pelo arquivo oficial da clínica (public/brand/logo-os.svg) quando chegar; hoje é a recriação vetorial do monograma.
function LogoMark({ reduce }: { reduce: boolean }) {
  return (
    <svg viewBox="0 0 512 512" className="h-full w-full" role="img" aria-label="OS Clínica">
      <circle cx="256" cy="256" r="256" fill="#B7BAA5" />
      <g transform={MONO_TRANSFORM}>
        {[MONO_O, MONO_S].map((d, i) => (
          <motion.path
            key={i}
            d={d}
            pathLength={1}
            fill="#FFFFFF"
            stroke="#C8A97E"
            strokeWidth={4}
            strokeDasharray={1}
            initial={reduce ? false : { strokeDashoffset: 1, fillOpacity: 0 }}
            animate={{ strokeDashoffset: 0, fillOpacity: 1 }}
            transition={{ strokeDashoffset: { duration: 1.2, delay: 0.5, ease: "easeInOut" }, fillOpacity: { delay: 1.5, duration: 0.6 } }}
          />
        ))}
      </g>
    </svg>
  );
}

// Anel de texto circular: gira devagar (40s por volta) e acompanha a rolagem da página.
function TextRing() {
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full animate-[spin_40s_linear_infinite]" aria-hidden>
      <defs>
        <path id="ring-path" d="M150 150 m-122 0 a122 122 0 1 1 244 0 a122 122 0 1 1 -244 0" />
      </defs>
      <text fontSize="13" fontWeight="500" letterSpacing="4.6" fill="#3F4A38" style={{ fontFamily: "var(--font-sans-body), sans-serif" }}>
        <textPath href="#ring-path">ODONTOLOGIA INTEGRADA · VALINHOS · SP · ODONTOLOGIA INTEGRADA · VALINHOS · SP ·</textPath>
      </text>
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { startBooking } = useBooking();
  const rich = useRichMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 90]);
  // O arco cresce ao rolar; o anel e a logo giram de 0 a 180° junto com o scroll (só desktop, sem reduced-motion).
  const scale = useTransform(scrollYProgress, [0, 1], [1, rich ? 1.35 : 1]);
  const spin = useTransform(scrollYProgress, [0, 1], [0, rich ? 180 : 0]);

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
                  <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
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
              <Roll>Agendar avaliação</Roll>
            </button>
          </Magnetic>
          <Magnetic>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn border border-white/40 text-white hover:bg-white/10">
              <MessageCircle size={18} strokeWidth={1.5} /> <Roll>Falar no WhatsApp</Roll>
            </a>
          </Magnetic>
        </motion.div>
      </div>

      {/* arco claro com a logo grande e o anel de texto; o arco cresce ao rolar */}
      <motion.div style={{ y, scale, transformOrigin: "bottom center" }} className="relative z-0 mx-auto mt-10 w-[min(440px,86vw)]">
        <div className="relative h-[300px] sm:h-[400px]">
          <div className="absolute inset-x-0 top-0 h-[600px] overflow-hidden rounded-t-[999px] border border-white/40 bg-gradient-to-b from-[#F4F1E8] to-[#DDE0CE] shadow-2xl">
            <div className="absolute left-1/2 top-[44px] h-[260px] w-[260px] -translate-x-1/2 sm:top-[56px] sm:h-[300px] sm:w-[300px]">
              <motion.div style={{ rotate: spin }} className="absolute inset-0">
                <TextRing />
              </motion.div>
              <motion.div style={{ rotate: spin }} className="absolute inset-[22%]">
                <LogoMark reduce={!!reduce} />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
