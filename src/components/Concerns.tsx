"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { photos, type SitePhoto } from "@/content/photos";
import { Photo } from "./Photo";
import { Reveal, Roll } from "./ui";
import { Magnetic } from "./Interactions";
import { useBooking } from "./Providers";

type Concern = { id: string; title: string; text: string; treatment: string; photo: SitePhoto };

const concerns: Concern[] = [
  { id: "dente-ausente", title: "Falta de um dente", treatment: "implantes", photo: photos.missing,
    text: "A ausência de um dente pode afetar a mastigação e o encaixe dos outros. Na avaliação, vemos as opções de reposição para o seu caso." },
  { id: "dente-quebrado", title: "Dente quebrado", treatment: "dentistica", photo: photos.chipped,
    text: "Uma lasca ou fratura merece avaliação. Verificamos a extensão e indicamos a restauração adequada." },
  { id: "manchas", title: "Dentes manchados", treatment: "clareamento", photo: photos.stains,
    text: "Manchas têm causas diferentes. Avaliamos a origem e se o clareamento é indicado para você." },
  { id: "gengiva", title: "Gengiva sangrando", treatment: "periodontia", photo: photos.gums,
    text: "O sangramento pode indicar inflamação. Examinamos a gengiva e orientamos o cuidado." },
  { id: "dor", title: "Dor ou sensibilidade", treatment: "urgencia", photo: photos.sensitive,
    text: "Dor e sensibilidade têm origens variadas. Priorizamos a avaliação para entender a causa." },
  { id: "alinhamento", title: "Dentes desalinhados", treatment: "ortodontia", photo: photos.crooked,
    text: "Avaliamos o alinhamento e a mordida e conversamos sobre as opções, como aparelhos fixos e alinhadores." },
];

export function Concerns() {
  const { startBooking } = useBooking();
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const chips = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Mantém o chip ativo visível no carrossel do celular (rola só o carrossel, não a página).
  useEffect(() => {
    const box = chips.current;
    const el = box?.children[active] as HTMLElement | undefined;
    if (box && el) box.scrollTo({ left: el.offsetLeft - box.clientWidth / 2 + el.clientWidth / 2, behavior: "smooth" });
  }, [active]);

  const go = (i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    refs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <section id="queixas" className="py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-12">
        <div className="min-w-0 lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">Por onde começar</p>
            <h2 className="t-h2 mt-5">
              O que te <em className="ac">incomoda</em>?
            </h2>
          </Reveal>
          <ul className="mt-10 hidden lg:block" aria-label="Queixas">
            {concerns.map((c, i) => (
              <li key={c.id}>
                <button
                  onClick={() => go(i)}
                  aria-current={active === i}
                  className={`flex w-full items-center gap-4 py-2 text-left font-serif text-[clamp(40px,3.6vw,52px)] leading-[1.05] tracking-[-0.02em] transition-all duration-300 ${
                    active === i ? "translate-x-3 text-ink" : "text-ink/[0.28] hover:text-ink/60"
                  }`}
                >
                  <span aria-hidden className={`h-2.5 w-2.5 shrink-0 rounded-full bg-brand transition-opacity ${active === i ? "opacity-100" : "opacity-0"}`} />
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="min-w-0">
          {/* celular: carrossel de chips fixo no topo da seção, indica o card ativo */}
          <div className="sticky top-[76px] z-20 -mx-5 mb-6 bg-bg/90 py-3 backdrop-blur lg:hidden">
            <div ref={chips} className="flex gap-2 overflow-x-auto px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden" role="tablist" aria-label="Queixas">
              {concerns.map((c, i) => (
                <button
                  key={c.id}
                  role="tab"
                  aria-selected={active === i}
                  onClick={() => go(i)}
                  className={`min-h-11 shrink-0 rounded-full border px-4 text-[14px] font-medium transition-colors ${
                    active === i ? "border-brand bg-brand text-white" : "border-line bg-surface text-ink/70"
                  }`}
                >
                  {c.title}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6 lg:space-y-10">
            {concerns.map((c, i) => (
              <article
                key={c.id}
                ref={(el) => { refs.current[i] = el; }}
                data-i={i}
                className="relative aspect-[4/5] scroll-mt-40 overflow-hidden rounded-[28px] border border-line bg-sage-soft shadow-[var(--shadow-soft)] sm:aspect-[4/3]"
              >
                {/* a imagem do card ativo entra com leve zoom (1,04 → 1) */}
                <motion.div className="absolute inset-0" animate={{ scale: active === i ? 1 : 1.04 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
                  <Photo src={c.photo.src} alt={c.photo.alt} tone={i} sizes="(min-width: 1024px) 50vw, 100vw" className="h-full w-full" />
                </motion.div>
                {/* texto sobre a base da imagem, em degradê marfim que sobe */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#F4EFE4] via-[#F4EFE4]/92 to-transparent px-6 pb-6 pt-24 sm:px-9 sm:pb-8 sm:pt-32">
                  <p className="num text-[13px] text-muted">{String(i + 1).padStart(2, "0")} / 06</p>
                  <h3 className="mt-2 text-[clamp(30px,3vw,40px)] leading-[1.02]">{c.title}</h3>
                  <p className="mt-3 max-w-[30em] font-serif text-[20px] leading-[1.22] text-ink/85 sm:text-[24px]">{c.text}</p>
                  <div className="mt-5">
                    <Magnetic>
                      <button onClick={() => startBooking(c.treatment)} className="btn btn-primary">
                        <Roll>Agendar avaliação</Roll>
                      </button>
                    </Magnetic>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
