"use client";

import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Reveal, SectionHead, useRichMotion } from "./ui";

const steps = [
  { title: "Agendamento online", text: "Escolha o motivo e o melhor horário em menos de 1 minuto. A clínica confirma pelo WhatsApp." },
  { title: "Avaliação e diagnóstico", text: "Conversa, exame clínico e, se preciso, exames complementares." },
  { title: "Plano de tratamento", text: "Uma proposta clara, por etapas, explicada sem pressa." },
  { title: "Acompanhamento", text: "Retornos programados para cuidar do sorriso ao longo do tempo." },
];
const pad = (n: number) => String(n + 1).padStart(2, "0");
const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Duas colunas, só texto: lista de passos à esquerda; painel do passo ativo à direita (seção fixa, avança com o scroll ou clique).
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
        <div className="container-x grid w-full grid-cols-[0.9fr_1.1fr] items-center gap-16">
          <ol aria-label="Passos">
            {steps.map((s, k) => (
              <li key={s.title}>
                <button onClick={() => goTo(k)} aria-current={i === k} className={`flex w-full items-center gap-4 py-3 text-left transition-all duration-300 ${i === k ? "text-ink" : "text-ink/30 hover:text-ink/60"}`}>
                  <ArrowRight size={24} className={`shrink-0 text-brand transition-all ${i === k ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"}`} />
                  <span className="num text-[15px]">{pad(k)}</span>
                  <span className="font-serif text-[clamp(32px,3.2vw,40px)] leading-[1.05]">{s.title}</span>
                </button>
              </li>
            ))}
          </ol>

          <div className="min-h-[340px]">
            <AnimatePresence mode="wait">
              <motion.div key={i}>
                <p className="eyebrow">Passo {pad(i)}</p>
                <h3 className="mt-5 text-[clamp(48px,4.6vw,64px)] leading-[1]">
                  <span className="block overflow-hidden pb-[0.08em]">
                    <motion.span className="block" initial={{ y: "112%" }} animate={{ y: "0%" }} exit={{ y: "-112%" }} transition={{ duration: 0.5, ease }}>
                      {steps[i].title}
                    </motion.span>
                  </span>
                </h3>
                <span className="mt-6 block overflow-hidden">
                  <motion.p className="t-lead !text-[18px]" initial={{ y: "120%" }} animate={{ y: "0%" }} exit={{ y: "-120%" }} transition={{ duration: 0.5, delay: 0.08, ease }}>
                    {steps[i].text}
                  </motion.p>
                </span>
              </motion.div>
            </AnimatePresence>

            {/* contador de progresso com barra dourada */}
            <div className="mt-12 max-w-sm">
              <p className="num-serif font-serif text-[32px] leading-none text-brand">
                {pad(i)} <span className="text-ink/30">/ {String(steps.length).padStart(2, "0")}</span>
              </p>
              <div className="mt-4 h-px w-full bg-line">
                <motion.div style={{ scaleX: scrollYProgress, transformOrigin: "left" }} className="h-px bg-accent" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StepList() {
  return (
    <ol className="container-x mt-12 divide-y divide-line border-y border-line">
      {steps.map((s, k) => (
        <li key={s.title}>
          <Reveal className="py-8">
            <p className="num-serif font-serif text-[40px] leading-none text-brand">{pad(k)}</p>
            <h3 className="t-h3 mt-3">{s.title}</h3>
            <p className="t-body mt-3">{s.text}</p>
          </Reveal>
        </li>
      ))}
    </ol>
  );
}

export function Journey() {
  const rich = useRichMotion();
  return (
    <section id="como-agendar" className="pt-20 md:pt-28">
      <div className="container-x">
        <SectionHead eyebrow="Como funciona" title={<>Da primeira mensagem ao <em className="ac">acompanhamento</em>.</>} />
      </div>
      {rich ? <Process /> : <StepList />}
      <div className="pb-20 md:pb-28" />
    </section>
  );
}
