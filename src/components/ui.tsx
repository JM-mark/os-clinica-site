"use client";

import { motion, useReducedMotion } from "framer-motion";
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
  return <C strokeWidth={1.5} aria-hidden {...props} />;
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
    <Reveal className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-3 text-[42px] leading-[1.02] md:text-[64px]">{title}</h2>
      {lead && <p className="mt-4 text-[17px] leading-relaxed text-muted">{lead}</p>}
    </Reveal>
  );
}
