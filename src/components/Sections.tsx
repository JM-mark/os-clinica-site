"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, animate, motion, useInView, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone, Plus, Star } from "lucide-react";
import { clinic, whatsappUrl } from "@/config";
import { faq } from "@/content/faq";
import { photos } from "@/content/photos";
import { Photo } from "./Photo";
import { Reveal, SectionHead, useReduce } from "./ui";
import { Lockup } from "./Logo";
import { Magnetic } from "./Interactions";

// Nota real do Google: o número conta de 0,0 até o valor e as 5 estrelas acendem em sequência.
function RatingCounter() {
  const reduce = useReduce();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [txt, setTxt] = useState("0,0");
  const target = Number(clinic.rating.value.replace(",", "."));

  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, target, { duration: 1.6, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setTxt(v.toFixed(1).replace(".", ",")) });
    return () => c.stop();
  }, [inView, reduce, target]);

  return (
    <div ref={ref} className="my-10">
      <span className="sr-only">Nota {clinic.rating.value} de 5 no Google</span>
      <p aria-hidden className="num-serif font-serif text-[clamp(88px,9vw,128px)] leading-none">{reduce ? clinic.rating.value : txt}</p>
      <div aria-hidden className="mt-4 flex gap-1.5">
        {[0, 1, 2, 3, 4].map((k) => (
          <motion.span key={k} initial={reduce ? false : { opacity: 0.2, scale: 0.7 }} animate={inView ? { opacity: 1, scale: 1 } : undefined} transition={{ delay: 0.3 + k * 0.18, duration: 0.4 }}>
            <Star size={22} className="fill-accent text-accent" />
          </motion.span>
        ))}
      </div>
      <p className="mt-4 text-[16px] text-white/85">{clinic.rating.count} avaliações de pacientes (dado público do Google Maps)</p>
    </div>
  );
}

export function SocialProof() {
  const ig = [photos.aesthetic, photos.prevention, photos.reception];
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead eyebrow="Quem já foi" title={<>Reconhecimento e <em className="ac">rotina</em> da clínica.</>} />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-brand p-8 text-white sm:p-10">
              <p className="eyebrow !text-accent">Avaliações no Google</p>
              <RatingCounter />
              <a href={clinic.maps} target="_blank" rel="noopener noreferrer" className="btn w-full bg-bg text-brand-dark hover:bg-white sm:w-auto sm:self-start">
                Ver avaliações no Google <ExternalLink size={16} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-9">
              <p className="eyebrow">Instagram</p>
              <p className="mt-3 font-serif text-[clamp(32px,3vw,40px)] leading-tight">{clinic.instagramHandle}</p>
              {/* TODO trocar por fotos reais dos posts (ou feed embed) */}
              <div className="mt-7 grid grid-cols-3 gap-3">
                {ig.map((ph, k) => (
                  <a key={k} href={clinic.instagram} target="_blank" rel="noopener noreferrer" aria-label="Abrir o Instagram da clínica">
                    <Photo reveal src={ph.src} alt={ph.alt} tone={k} sizes="(min-width: 1024px) 14vw, 30vw" className="aspect-square rounded-[16px]" />
                  </a>
                ))}
              </div>
              <div className="mt-7">
                <Magnetic>
                  <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                    Seguir no Instagram <ExternalLink size={16} />
                  </a>
                </Magnetic>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionHead eyebrow="Dúvidas frequentes" title={<>Perguntas que costumam <em className="ac">aparecer</em>.</>} />
        <div className="divide-y divide-line border-y border-line">
          {faq.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q}>
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex min-h-14 w-full items-center justify-between gap-6 py-6 text-left font-serif text-[clamp(24px,2.4vw,28px)] leading-[1.12] tracking-[-0.01em]"
                  >
                    {f.q}
                    <Plus size={26} strokeWidth={1.25} className={`shrink-0 text-brand transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="t-body pb-7 pr-10 !text-[17px]">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const a = clinic.address;
  return (
    <section id="contato" className="bg-sage-soft/60 py-20 md:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionHead eyebrow="Localização e contato" title={<>Venha nos <em className="ac">visitar</em> em Valinhos.</>} />
          <Reveal delay={0.1} className="mt-8 space-y-5 text-[17px] leading-[1.55]">
            <p className="flex gap-3"><MapPin className="mt-1 shrink-0 text-brand" size={20} strokeWidth={1.5} /><span>{a.street} — {a.district}<br />{a.city}/{a.state} · CEP {a.zip}</span></p>
            <p className="flex gap-3"><Phone className="mt-1 shrink-0 text-brand" size={20} strokeWidth={1.5} /><a href={clinic.phoneHref} className="inline-flex min-h-11 items-center hover:text-brand">{clinic.phone}</a></p>
            <p className="flex gap-3"><Mail className="mt-1 shrink-0 text-brand" size={20} strokeWidth={1.5} /><a href={`mailto:${clinic.email}`} className="inline-flex min-h-11 items-center hover:text-brand">{clinic.email}</a></p>
            <div className="rounded-2xl border border-line bg-surface p-5 text-[15px]">
              <p className="eyebrow mb-2">Horário</p>
              {/* TODO confirmar horário de funcionamento */}
              {clinic.hours.map((h) => <p key={h.days} className="flex justify-between py-0.5"><span>{h.days}</span><span className="text-muted">{h.time}</span></p>)}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <a href={clinic.maps} target="_blank" rel="noopener noreferrer" className="btn btn-primary">Como chegar</a>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><MessageCircle size={18} /> WhatsApp</a>
            </div>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <iframe
            title="Mapa: OS Clínica, Rua Itália 142, Valinhos/SP"
            src={clinic.mapsEmbed}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[380px] w-full rounded-[var(--radius-card)] border border-line shadow-[var(--shadow-soft)] lg:h-full lg:min-h-[460px]"
          />
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], [reduce ? 0 : 140, 0]);
  const link = "flex min-h-11 items-center text-[16px] text-white/80 hover:text-white";

  return (
    <footer ref={ref} className="relative overflow-hidden bg-brand-dark pt-16 text-white/80">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Lockup tone="light" />
            <p className="mt-5 max-w-xs text-[16px] leading-[1.6]">Odontologia integrada em Valinhos/SP. Cuidado completo, em um só plano.</p>
          </div>
          <nav aria-label="Rodapé" className="space-y-0.5">
            <p className="eyebrow mb-4 !text-accent">Navegar</p>
            {[["#tratamentos", "Tratamentos"], ["#clinica", "A clínica"], ["#agendar", "Agendar"], ["#faq", "Dúvidas"], ["#contato", "Contato"]].map(([h, l]) => (
              <a key={h} href={h} className={link}><span className="u-link">{l}</span></a>
            ))}
          </nav>
          <div className="space-y-0.5">
            <p className="eyebrow mb-4 !text-accent">Redes</p>
            <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className={link}><span className="u-link">Instagram</span></a>
            <a href={clinic.facebook} target="_blank" rel="noopener noreferrer" className={link}><span className="u-link">Facebook</span></a>
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/privacidade/`} className={link}><span className="u-link">Política de Privacidade</span></a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-[13px] leading-relaxed text-white/65">
          {/* Dados do perfil oficial no Instagram. TODO confirmar com a clínica antes de publicar. */}
          <p>Responsável técnica: Dra. {clinic.cro.responsible} — {clinic.cro.responsibleCro} · Clínica: {clinic.cro.clinic}</p>
          <p className="mt-1">© 2026 OS Clínica. Os resultados variam de pessoa para pessoa. Este conteúdo não substitui a avaliação profissional.</p>
        </div>
      </div>

      {/* wordmark gigante que sobe com parallax ao chegar no fim da página */}
      {/* decorativo: texto em pseudo-elemento (fora da árvore de acessibilidade e da checagem de contraste) */}
      <motion.p
        aria-hidden
        style={{ y }}
        className="pointer-events-none mt-6 select-none whitespace-nowrap text-center font-serif text-[18vw] leading-[1] tracking-[-0.03em] text-ivory/[0.08] before:content-['OS_Clínica'] md:-mb-[2.2vw] md:mt-2"
      />
      <div className="h-24 md:h-0" aria-hidden />
    </footer>
  );
}
