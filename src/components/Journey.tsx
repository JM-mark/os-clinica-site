"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Icon, Reveal, SectionHead } from "./ui";

const steps = [
  { icon: "CalendarCheck", title: "Agendamento online", text: "Escolha o motivo e o melhor horário em menos de 1 minuto." },
  { icon: "Stethoscope", title: "Avaliação e diagnóstico", text: "Conversa, exame clínico e, se preciso, exames complementares." },
  { icon: "ClipboardCheck", title: "Plano de tratamento", text: "Proposta clara, por etapas, explicada sem pressa." },
  { icon: "HeartPulse", title: "Acompanhamento", text: "Cuidado contínuo para manter os resultados ao longo do tempo." },
];

export function Journey() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <section id="como-agendar" className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead eyebrow="Como funciona" title={<>Da primeira mensagem ao <em className="ac">acompanhamento</em>.</>} center />

        <div ref={ref} className="relative mx-auto mt-16 max-w-3xl">
          {/* linha-guia: desenha conforme o scroll */}
          <div aria-hidden className="absolute bottom-6 left-6 top-6 w-px bg-line md:left-1/2" />
          <motion.div
            aria-hidden
            style={{ scaleY: reduce ? 1 : progress, transformOrigin: "top" }}
            className="absolute bottom-6 left-6 top-6 w-px bg-accent md:left-1/2"
          />
          <ol className="space-y-12">
            {steps.map((s, i) => (
              <li key={s.title} className={`relative flex gap-6 md:w-1/2 ${i % 2 ? "md:ml-auto md:pl-14" : "md:flex-row-reverse md:pr-14 md:text-right"}`}>
                <span className={`relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-full border border-accent/60 bg-bg text-brand md:absolute md:top-0 ${i % 2 ? "md:-left-6" : "md:-right-6"}`}>
                  <Icon name={s.icon} size={22} />
                </span>
                <Reveal delay={0.05} className="pt-1">
                  <p className="eyebrow">Passo 0{i + 1}</p>
                  <h3 className="mt-1 text-[32px] leading-none">{s.title}</h3>
                  <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-muted">{s.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
