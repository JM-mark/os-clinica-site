"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { useFinePointer } from "./ui";
import { MONO_O, MONO_S, MONO_TRANSFORM } from "./monogramPaths";

/** Botão magnético: desloca até 6px na direção do cursor (só ponteiro fino). */
export function Magnetic({ children, strength = 6 }: { children: React.ReactNode; strength?: number }) {
  const fine = useFinePointer();
  const ref = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 220, damping: 18, mass: 0.4 });
  if (!fine) return <>{children}</>;
  return (
    <motion.span
      ref={ref}
      style={{ x, y }}
      className="inline-flex"
      onPointerMove={(e) => {
        const r = ref.current!.getBoundingClientRect();
        x.set(((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * strength);
        y.set(((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.span>
  );
}

/** Cursor personalizado: ponto de 10px; vira disco de 72px com "Ver" ou "Arraste" sobre elementos [data-cursor]. */
export function CustomCursor() {
  const fine = useFinePointer();
  const x = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.3 });
  const y = useSpring(useMotionValue(-100), { stiffness: 500, damping: 40, mass: 0.3 });
  const [label, setLabel] = useState<string | null>(null);
  // Só aparece depois do primeiro movimento; some ao sair da janela ou quando a aba perde o foco.
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!fine) return;
    document.documentElement.classList.add("has-cursor");
    const hide = () => setVisible(false);
    const move = (e: PointerEvent) => {
      setVisible(true);
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement | null)?.closest?.("[data-cursor]") as HTMLElement | null;
      setLabel(el?.dataset.cursor ?? null);
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [fine, x, y]);

  if (!fine) return null;
  return (
    <motion.div aria-hidden style={{ x, y, opacity: visible ? 1 : 0 }} className="pointer-events-none fixed left-0 top-0 z-[120] transition-opacity duration-200">
      <motion.div
        animate={{ width: label ? 72 : 10, height: label ? 72 : 10 }}
        transition={{ type: "spring", stiffness: 380, damping: 26 }}
        className="grid place-items-center rounded-full bg-brand text-[12px] font-medium tracking-wide text-white shadow-lg"
        style={{ translate: "-50% -50%" }}
      >
        {label && <span>{label}</span>}
      </motion.div>
    </motion.div>
  );
}

/** Intro (≤ 1,2s, uma vez por sessão): o monograma se desenha em traço dourado e a cortina verde abre. */
export function Intro() {
  const [phase, setPhase] = useState<"show" | "done" | "skip">("show");

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("os-intro") === "1";
    } catch {}
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (seen || reduce) {
      const t0 = setTimeout(() => setPhase("skip"), 0);
      return () => clearTimeout(t0);
    }
    try {
      sessionStorage.setItem("os-intro", "1");
    } catch {}
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 700);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "skip") return null; // visita repetida ou reduced-motion: sem cortina
  return (
    <AnimatePresence>
      {phase === "show" && (
        <motion.div
          aria-hidden
          className="field fixed inset-0 z-[110] grid place-items-center"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.svg viewBox="0 0 512 512" className="h-[120px] w-[120px]" initial="hidden" animate="show">
            <g transform={MONO_TRANSFORM} fill="none" stroke="#C8A97E" strokeWidth={5} strokeLinejoin="round">
              {[MONO_O, MONO_S].map((d, i) => (
                <motion.path
                  key={i}
                  d={d}
                  pathLength={1}
                  strokeDasharray={1}
                  variants={{ hidden: { strokeDashoffset: 1 }, show: { strokeDashoffset: 0 } }}
                  transition={{ duration: 0.7, delay: i * 0.08, ease: "easeInOut" }}
                />
              ))}
            </g>
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
