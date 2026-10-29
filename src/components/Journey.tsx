"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { photos } from "@/content/photos";
import { Photo } from "./Photo";
import { Reveal, SectionHead, useRichMotion } from "./ui";

const steps = [
  { title: "Agendamento online", text: "Escolha o motivo e o melhor horário em menos de 1 minuto. Você recebe a confirmação pelo WhatsApp.", photo: photos.stepBook },
  { title: "Avaliação e diagnóstico", text: "Conversa, exame clínico e, se preciso, exames complementares, para entender o seu caso por inteiro.", photo: photos.stepExam },
  { title: "Plano de tratamento", text: "Uma proposta clara, por etapas e com prioridades, explicada com calma antes de qualquer decisão.", photo: photos.stepPlan },
  { title: "Acompanhamento", text: "Cuidado contínuo para manter a saúde bucal e os resultados ao longo do tempo.", photo: photos.stepCare },
];
const pad = (n: number) => String(n + 1).padStart(2, "0");
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Estilo "Process" do template de referência: 3 colunas (lista, foto, texto) fixas na tela; o scroll avança os passos.
function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (p) => setI(Math.min(steps.length - 1, Math.max(0, Math.floor(p * steps.length)))));

  const goTo = (k: number) => {
    const el = ref.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const span = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + (k / steps.length) * span + 4, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  return (
    <div ref={ref} style={{ height: `${steps.length * 80}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen items-center">
        <div className="container-x grid w-full grid-cols-[0.9fr_1fr_1fr] items-center gap-12">
          <ol aria-label="Passos">
            {steps.map((s, k) => (
              <li key={s.title}>
                <button onClick={() => goTo(k)} aria-current={i === k} className={`flex w-full items-center gap-4 py-3 text-left transition-all duration-300 ${i === k ? "text-ink" : "text-ink/30 hover:text-ink/60"}`}>
                  <ArrowRight size={22} className={`shrink-0 text-brand transition-all ${i === k ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
                  <span className="num text-[13px]">{pad(k)}</span>
                  <span className="font-serif text-[clamp(26px,2.6vw,36px)] leading-[1.05]">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="relative h-[60vh] w-full">
            {steps.map((s, k) => (
              <motion.div
                key={s.title}
                className="absolute inset-0"
                style={{ zIndex: k }}
                initial={false}
                animate={{ clipPath: k <= i ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
                transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
                aria-hidden={k !== i}
              >
                <Photo src={s.photo.src} alt={s.photo.alt} tone={k} sizes="34vw" className="h-full w-full rounded-[28px]" />
              </motion.div>
            ))}
          </div>

          <div className="min-h-[260px]">
            <AnimatePresence mode="wait">
              <motion.div key={i}>
                <p className="num text-[14px] text-muted">Passo {pad(i)}</p>
                <h3 className="mt-3 text-[clamp(36px,3.6vw,52px)] leading-[1]">
                  <span className="block overflow-hidden pb-[0.08em]">
                    <motion.span className="block" initial={{ y: "112%" }} animate={{ y: "0%" }} exit={{ y: "-112%" }} transition={{ duration: 0.5, ease }}>
                      {steps[i].title}
                    </motion.span>
                  </span>
                </h3>
                <motion.p className="t-body mt-5" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, delay: 0.15 }}>
                  {steps[i].text}
                </motion.p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepCards() {
  return (
    <div className="container-x mt-12 space-y-6">
      {steps.map((s, k) => (
        <Reveal key={s.title}>
          <article className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-soft)]">
            <Photo reveal src={s.photo.src} alt={s.photo.alt} tone={k} sizes="100vw" className="aspect-[16/10] w-full" />
            <div className="p-6">
              <p className="num text-[13px] text-muted">Passo {pad(k)}</p>
              <h3 className="t-h3 mt-2">{s.title}</h3>
              <p className="t-body mt-3">{s.text}</p>
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function Journey() {
  const rich = useRichMotion();
  return (
    <section id="como-agendar" className="pt-20 md:pt-28">
      <div className="container-x">
        <SectionHead eyebrow="Como funciona" title={<>Da primeira mensagem ao <em className="ac">acompanhamento</em>.</>} />
      </div>
      {rich ? <Process /> : <StepCards />}
      <div className="pb-20 md:pb-28" />
    </section>
  );
}
