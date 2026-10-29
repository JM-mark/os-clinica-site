"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui";

const pillars = [
  { n: "01", title: "Escuta primeiro.", text: "O ponto de partida é entender o que você sente e o que deseja." },
  { n: "02", title: "Diagnóstico completo.", text: "Exame clínico e, quando necessário, exames complementares." },
  { n: "03", title: "Plano por etapas.", text: "Prioridades claras, explicadas com calma, para você decidir com segurança." },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Seção tipográfica: título entra por linha com máscara; os pilares aparecem em sequência com a hairline se desenhando.
export function About() {
  const reduce = useReducedMotion();
  const line = (t: React.ReactNode, i: number) => (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={reduce ? false : { y: "112%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, delay: i * 0.12, ease }}
      >
        {t}
      </motion.span>
    </span>
  );

  return (
    <section id="clinica" className="bg-sage-soft/60 py-20 md:py-28">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Reveal>
              <p className="eyebrow">A clínica</p>
            </Reveal>
            <h2 className="mt-5 text-[clamp(56px,7.2vw,96px)] leading-[0.96]">
              {line("Um paciente,", 0)}
              {line(
                <>
                  um <em className="ac">plano</em> completo.
                </>,
                1,
              )}
            </h2>
          </div>
          <Reveal delay={0.15} className="space-y-5">
            <p className="t-lead">
              Odontologia integrada significa que as especialidades conversam entre si. Em vez de tratamentos soltos, você recebe uma visão do conjunto: saúde, função e estética no mesmo plano.
            </p>
            {/* TODO substituir por texto sobre a equipe e a história da clínica, fornecido pela clínica */}
            <p className="t-body">
              Na OS Clínica, o ponto de partida é ouvir você. Depois vêm o exame, o diagnóstico e uma proposta organizada por etapas, com prioridades claras, tudo explicado de forma simples.
            </p>
          </Reveal>
        </div>

        <ol className="mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-0">
          {pillars.map((p, i) => (
            <li key={p.n} className={`relative md:px-8 ${i === 0 ? "md:pl-0" : ""} ${i === pillars.length - 1 ? "md:pr-0" : ""}`}>
              {/* hairline que se desenha; entre colunas vira divisória vertical no desktop */}
              <motion.span
                aria-hidden
                className="absolute left-0 top-0 hidden h-full w-px origin-top bg-accent/70 md:block"
                style={{ display: i === 0 ? "none" : undefined }}
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1.1, delay: 0.2 + i * 0.2, ease }}
              />
              <motion.span
                aria-hidden
                className="mb-6 block h-px origin-left bg-accent/70 md:hidden"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 1, delay: i * 0.15, ease }}
              />
              <Reveal delay={0.2 + i * 0.2}>
                <p className="num-serif font-serif text-[clamp(44px,4vw,56px)] leading-none text-brand">{p.n}</p>
                <h3 className="mt-4 font-serif text-[26px] leading-[1.1]">{p.title}</h3>
                <p className="t-body mt-3">{p.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
