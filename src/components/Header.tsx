"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { Logo } from "./Logo";
import { useBooking } from "./Providers";
import { clinic, whatsappUrl } from "@/config";

const links = [
  { href: "#tratamentos", label: "Tratamentos" },
  { href: "#clinica", label: "A clínica" },
  { href: "#como-agendar", label: "Como agendar" },
  { href: "#faq", label: "Dúvidas" },
  { href: "#contato", label: "Contato" },
];

export function Header() {
  const [past, setPast] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const { startBooking } = useBooking();

  useEffect(() => {
    const on = () => setPast(window.scrollY > window.innerHeight * 0.7);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", esc);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", esc);
    };
  }, [open]);

  // Sobre o hero (campo verde) a barra é clara; depois do hero vira escura.
  const onField = !past && !open;
  const glass = onField ? "pill-glass" : "pill-dark";

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${past ? "border-b border-line bg-bg/80 backdrop-blur-xl" : ""}`}>
        <div className="container-x flex h-[76px] items-center justify-between">
          <a href="#topo" aria-label="OS Clínica — início" className={onField ? "text-white" : ""}>
            <Logo variant={onField ? "white" : "full"} />
          </a>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              aria-expanded={open}
              aria-haspopup="dialog"
              className={`pill ${glass}`}
            >
              <Plus size={16} strokeWidth={1.75} /> <span className="font-mono text-[13px]">Menu</span>
            </button>
            <a href="#contato" className={`pill ${onField ? "pill-solid" : "pill-dark"} hidden sm:inline-flex`}>
              Contato
            </a>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] overflow-y-auto bg-brand-dark text-white"
          >
            <div className="container-x flex h-[76px] items-center justify-between">
              <Logo variant="white" />
              <button onClick={() => setOpen(false)} className="pill pill-glass" aria-label="Fechar menu">
                <X size={16} strokeWidth={1.75} /> <span className="font-mono text-[13px]">Fechar</span>
              </button>
            </div>
            <div className="container-x grid gap-12 pb-16 pt-10 md:grid-cols-[1.4fr_1fr]">
              <nav aria-label="Principal">
                <ol>
                  {links.map((l, i) => (
                    <li key={l.href} className="border-b border-white/15">
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="group flex items-baseline gap-5 py-4 text-[40px] leading-none transition-colors hover:text-accent md:text-[64px]"
                      >
                        <span className="font-mono text-[12px] tracking-[0.14em] text-white/50">0{i + 1}</span>
                        <span className="font-serif">{l.label}</span>
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
              <div className="space-y-6 text-[15px] text-white/80">
                <button
                  onClick={() => {
                    setOpen(false);
                    setTimeout(() => startBooking(), 300);
                  }}
                  className="btn w-full bg-bg text-brand-dark hover:bg-white"
                >
                  Agendar avaliação
                </button>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost w-full !border-white/40 !text-white hover:!bg-white/10">
                  Falar no WhatsApp
                </a>
                <p className="eyebrow !text-accent">Endereço</p>
                <p>
                  {clinic.address.street} — {clinic.address.district}
                  <br />
                  {clinic.address.city}/{clinic.address.state}
                </p>
                <p className="eyebrow !text-accent">Contato</p>
                <p>
                  {clinic.phone}
                  <br />
                  {clinic.email}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
