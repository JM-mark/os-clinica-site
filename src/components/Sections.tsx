"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, Mail, MapPin, MessageCircle, Phone, Plus } from "lucide-react";
import { clinic, whatsappUrl } from "@/config";
import { faq } from "@/content/faq";
import { Photo } from "./Photo";
import { Reveal, SectionHead } from "./ui";
import { Logo } from "./Logo";

export function SocialProof() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <SectionHead eyebrow="Quem já foi" title={<>Reconhecimento e <em className="ac">rotina</em> da clínica.</>} />
        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col justify-between rounded-[var(--radius-card)] bg-brand p-8 text-white sm:p-10">
              <p className="eyebrow !text-accent">Avaliações no Google</p>
              <div className="my-10">
                <p className="font-serif text-[96px] leading-none">{clinic.rating.value}</p>
                <p className="mt-3 text-[15px] text-white/80">{clinic.rating.count} avaliações de pacientes (dado público do Google Maps)</p>
              </div>
              <a href={clinic.maps} target="_blank" rel="noopener noreferrer" className="btn w-full bg-bg text-brand-dark hover:bg-white sm:w-auto sm:self-start">
                Ver avaliações no Google <ExternalLink size={16} />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="h-full rounded-[var(--radius-card)] border border-line bg-surface p-6 shadow-[var(--shadow-soft)] sm:p-8">
              <p className="eyebrow">Instagram</p>
              <p className="mt-2 font-serif text-[32px] leading-tight">{clinic.instagramHandle}</p>
              {/* TODO trocar por fotos reais dos posts (ou feed embed) */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[0, 1, 2].map((t) => (
                  <a key={t} href={clinic.instagram} target="_blank" rel="noopener noreferrer" aria-label="Abrir o Instagram da clínica">
                    <Photo alt="Espaço reservado para uma publicação do Instagram" tone={t} className="aspect-square rounded-[16px] transition-transform duration-500 hover:scale-[1.03]" />
                  </a>
                ))}
              </div>
              <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-6">
                Seguir no Instagram <ExternalLink size={16} />
              </a>
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
                <h3 className="font-sans">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left text-[17px] font-semibold tracking-normal"
                  >
                    {f.q}
                    <Plus size={20} className={`shrink-0 text-brand transition-transform ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div id={`faq-${i}`} initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="pb-6 pr-8 leading-relaxed text-muted">{f.a}</p>
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
          <Reveal delay={0.1} className="mt-8 space-y-5 text-[16px]">
            <p className="flex gap-3"><MapPin className="mt-1 shrink-0 text-brand" size={20} strokeWidth={1.5} /><span>{a.street} — {a.district}<br />{a.city}/{a.state} · CEP {a.zip}</span></p>
            <p className="flex gap-3"><Phone className="mt-1 shrink-0 text-brand" size={20} strokeWidth={1.5} /><a href={clinic.phoneHref} className="hover:text-brand">{clinic.phone}</a></p>
            <p className="flex gap-3"><Mail className="mt-1 shrink-0 text-brand" size={20} strokeWidth={1.5} /><a href={`mailto:${clinic.email}`} className="hover:text-brand">{clinic.email}</a></p>
            <div className="rounded-2xl border border-line bg-surface p-5 text-[14px]">
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
  return (
    <footer className="bg-brand-dark pb-28 pt-16 text-white/80 md:pb-12">
      <div className="container-x">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <Logo variant="white" />
            <p className="mt-5 max-w-xs text-[14px] leading-relaxed">Odontologia integrada em Valinhos/SP. Cuidado completo, em um só plano.</p>
          </div>
          <nav aria-label="Rodapé" className="space-y-2 text-[14px]">
            <p className="eyebrow !text-accent mb-3">Navegar</p>
            {[["#tratamentos", "Tratamentos"], ["#clinica", "A clínica"], ["#agendar", "Agendar"], ["#faq", "Dúvidas"], ["#contato", "Contato"]].map(([h, l]) => (
              <a key={h} href={h} className="block hover:text-white">{l}</a>
            ))}
          </nav>
          <div className="space-y-2 text-[14px]">
            <p className="eyebrow !text-accent mb-3">Redes</p>
            <a href={clinic.instagram} target="_blank" rel="noopener noreferrer" className="block hover:text-white">Instagram</a>
            <a href={clinic.facebook} target="_blank" rel="noopener noreferrer" className="block hover:text-white">Facebook</a>
            <a href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/privacidade/`} className="block hover:text-white">Política de Privacidade</a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/15 pt-6 text-[12px] leading-relaxed text-white/60">
          {/* Dados do perfil oficial no Instagram. TODO confirmar com a clínica antes de publicar. */}
          <p>Responsável técnica: Dra. {clinic.cro.responsible} — {clinic.cro.responsibleCro} · Clínica: {clinic.cro.clinic}</p>
          <p className="mt-1">© 2026 OS Clínica. Os resultados variam de pessoa para pessoa. Este conteúdo não substitui a avaliação profissional.</p>
        </div>
      </div>
    </footer>
  );
}
