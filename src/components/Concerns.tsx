"use client";

import { useEffect, useRef, useState } from "react";
import { photos, type SitePhoto } from "@/content/photos";
import { Photo } from "./Photo";
import { Reveal } from "./ui";
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

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.i));
        }
      },
      { rootMargin: "-40% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const go = (i: number) => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    refs.current[i]?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
  };

  return (
    <section id="queixas" className="py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="eyebrow">Por onde começar</p>
            <h2 className="mt-3 text-[42px] leading-[1.02] md:text-[56px] lg:text-[48px] xl:text-[56px]">
              O que te <em className="ac">incomoda</em>?
            </h2>
          </Reveal>
          <ul className="mt-8 hidden lg:block" aria-label="Queixas">
            {concerns.map((c, i) => (
              <li key={c.id}>
                <button
                  onClick={() => go(i)}
                  aria-current={active === i}
                  className={`flex w-full items-center gap-3 py-2.5 text-left font-serif text-[26px] leading-tight transition-all duration-300 ${
                    active === i ? "translate-x-2 text-ink" : "text-ink/30 hover:text-ink/60"
                  }`}
                >
                  <span aria-hidden className={`h-2 w-2 shrink-0 rounded-full bg-brand transition-opacity ${active === i ? "opacity-100" : "opacity-0"}`} />
                  {c.title}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-6 lg:space-y-10">
          {concerns.map((c, i) => (
            <article
              key={c.id}
              ref={(el) => { refs.current[i] = el; }}
              data-i={i}
              className="overflow-hidden rounded-[var(--radius-card)] border border-line bg-surface shadow-[var(--shadow-soft)]"
            >
              <Photo src={c.photo.src} alt={c.photo.alt} label={c.title} tone={i} sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[16/10] w-full" />
              <div className="p-6 sm:p-8">
                <p className="eyebrow">{String(i + 1).padStart(2, "0")} / 06</p>
                <h3 className="mt-2 text-[32px] leading-[1.05]">{c.title}</h3>
                <p className="mt-3 max-w-md text-[15px] leading-relaxed text-muted">{c.text}</p>
                <button onClick={() => startBooking(c.treatment)} className="btn btn-primary mt-6">
                  Agendar avaliação
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
