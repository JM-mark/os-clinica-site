"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useSyncExternalStore } from "react";
import {
  Activity, AlignHorizontalDistributeCenter, Anchor, Baby, Circle, ClipboardList, Gem, HeartPulse, Layers,
  Moon, Scissors, ShieldCheck, Siren, Smile, Sparkles, Stethoscope, CalendarCheck, ClipboardCheck, Handshake,
  type LucideProps,
} from "lucide-react";

const map: Record<string, React.ComponentType<LucideProps>> = {
  Activity, AlignHorizontalDistributeCenter, Anchor, Baby, ClipboardList, Gem, HeartPulse, Layers, Moon,
  Scissors, ShieldCheck, Siren, Smile, Sparkles, Stethoscope, CalendarCheck, ClipboardCheck, Handshake,
};

export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const C = map[name] ?? Circle;
  return <C strokeWidth={1.25} aria-hidden {...props} />;
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  y = 20,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead?: string;
  center?: boolean;
}) {
  return (
    <Reveal className={center ? "mx-auto max-w-4xl text-center" : "max-w-4xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="t-h2 mt-5">{title}</h2>
      {lead && <p className={`t-lead mt-6 ${center ? "mx-auto" : ""}`}>{lead}</p>}
    </Reveal>
  );
}

/** Hairline dourada que se desenha da esquerda para a direita ao entrar na tela. */
export function HairLine({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`container-x ${className}`} aria-hidden>
      <motion.div
        className="h-px origin-left bg-accent/70"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

// true só em telas >= 1024px e sem prefers-reduced-motion: liga as animações de scroll mais elaboradas.
export function useRichMotion(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const a = window.matchMedia("(min-width: 1024px)");
      const b = window.matchMedia("(prefers-reduced-motion: reduce)");
      a.addEventListener("change", cb);
      b.addEventListener("change", cb);
      return () => {
        a.removeEventListener("change", cb);
        b.removeEventListener("change", cb);
      };
    },
    () => window.matchMedia("(min-width: 1024px)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** true em dispositivos com mouse (ponteiro fino) e sem reduced-motion. */
export function useFinePointer(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const a = window.matchMedia("(pointer: fine)");
      a.addEventListener("change", cb);
      return () => a.removeEventListener("change", cb);
    },
    () => window.matchMedia("(pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}

/** prefers-reduced-motion sem divergência de hidratação (o servidor assume "sem reduzir"). */
export function useReduce(): boolean {
  return useSyncExternalStore(
    (cb) => {
      const m = window.matchMedia("(prefers-reduced-motion: reduce)");
      m.addEventListener("change", cb);
      return () => m.removeEventListener("change", cb);
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
}
