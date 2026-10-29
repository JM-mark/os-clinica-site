"use client";

import { useRef } from "react";
import { motion, useAnimationFrame, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const items = ["Implantes", "Clareamento", "Ortodontia", "Lentes de contato", "Periodontia", "Endodontia", "Odontopediatria"];

// Faixa de especialidades que rola devagar e inverte o sentido quando o scroll inverte.
export function Marquee() {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const dir = useRef(1);
  const { scrollY } = useScroll();
  const v = useSpring(useVelocity(scrollY), { stiffness: 80, damping: 30 });
  const tx = useTransform(x, (p) => `${p}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const vel = v.get();
    if (vel > 40) dir.current = 1;
    else if (vel < -40) dir.current = -1;
    const boost = 1 + Math.min(Math.abs(vel) / 1400, 2.5);
    let next = x.get() - dir.current * 2.2 * boost * (delta / 1000);
    if (next <= -50) next += 50;
    if (next > 0) next -= 50;
    x.set(next);
  });

  const row = items.map((t, i) => (
    <span key={t} className="flex shrink-0 items-center gap-8 pr-8 sm:gap-12 sm:pr-12">
      <span className={`whitespace-nowrap font-serif text-[56px] leading-none sm:text-[80px] lg:text-[96px] ${i % 2 ? "ac text-brand" : "text-ink"}`}>{t}</span>
      <span aria-hidden className="h-2 w-2 shrink-0 rounded-full bg-accent" />
    </span>
  ));

  return (
    <section aria-label="Especialidades" className="overflow-hidden border-y border-line py-8 sm:py-10">
      <motion.div style={{ x: tx }} className="flex w-max">
        <div className="flex">{row}</div>
        <div className="flex" aria-hidden>{row}</div>
      </motion.div>
    </section>
  );
}
