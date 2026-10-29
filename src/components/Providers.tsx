"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomCursor, Intro } from "./Interactions";

type BookingCtx = {
  preselected: string | null;
  startBooking: (treatmentId?: string) => void;
};

const Ctx = createContext<BookingCtx>({ preselected: null, startBooking: () => {} });
export const useBooking = () => useContext(Ctx);

export function Providers({ children }: { children: React.ReactNode }) {
  const [preselected, setPreselected] = useState<string | null>(null);

  const startBooking = useCallback((treatmentId?: string) => {
    if (treatmentId) setPreselected(treatmentId);
    const el = document.getElementById("agendar");
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  }, []);

  // Smooth scroll (Lenis) sincronizado com ScrollTrigger. Desligado com reduced-motion.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);

  const value = useMemo(() => ({ preselected, startBooking }), [preselected, startBooking]);
  return (
    <Ctx.Provider value={value}>
      <Intro />
      <CustomCursor />
      {children}
    </Ctx.Provider>
  );
}
