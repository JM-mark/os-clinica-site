"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Reveal, useRichMotion } from "./ui";

const text = "Na OS Clínica, as especialidades conversam entre si. Você recebe um único plano, explicado com calma, do check-up ao tratamento completo.";
const accent = new Set(["único", "plano,", "calma,"]);
const words = text.split(" ");

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const opacity = useTransform(p, [i / n, (i + 1) / n], [0.16, 1]);
  return (
    <motion.span style={{ opacity }} className={`inline-block ${accent.has(w) ? "ac" : ""}`}>
      {w}&nbsp;
    </motion.span>
  );
}

export function Statement() {
  const rich = useRichMotion();
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  return (
    <section aria-label="Nossa proposta" className="py-20 md:py-32">
      <div className="container-x">
        {rich ? (
          <p ref={ref} className="mx-auto max-w-[1000px] text-center font-serif text-[56px] leading-[1.08] text-ink">
            {words.map((w, i) => (
              <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />
            ))}
          </p>
        ) : (
          <Reveal>
            <p className="mx-auto max-w-[900px] text-center font-serif text-[32px] leading-[1.12] text-ink sm:text-[44px]">
              Na OS Clínica, as especialidades conversam entre si. Você recebe um <em className="ac">único</em>{" "}
              <em className="ac">plano</em>, explicado com <em className="ac">calma</em>, do check-up ao tratamento completo.
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
