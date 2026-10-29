"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, MessageCircle, MessagesSquare, X } from "lucide-react";
import { FEATURES, whatsappUrl } from "@/config";
import { useBooking } from "./Providers";

const triage = [
  { label: "Dor ou urgência", id: "urgencia" },
  { label: "Clareamento", id: "clareamento" },
  { label: "Implantes", id: "implantes" },
  { label: "Aparelho", id: "ortodontia" },
  { label: "Outro assunto", id: "avaliacao" },
];

export function FloatingCta() {
  const { startBooking } = useBooking();
  const [chat, setChat] = useState(false);

  return (
    <>
      {/* barra fixa mobile */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-bg/90 p-3 backdrop-blur-xl md:hidden">
        <button onClick={() => startBooking()} className="btn btn-primary flex-1"><CalendarCheck size={18} /> Agendar</button>
        <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost flex-1"><MessageCircle size={18} /> WhatsApp</a>
      </div>

      {/* flutuantes desktop */}
      <div className="fixed bottom-6 right-6 z-40 hidden flex-col items-end gap-3 md:flex">
        <AnimatePresence>
          {FEATURES.triageChat && chat && (
            <motion.div initial={{ opacity: 0, y: 12, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 8 }}
              className="w-[300px] rounded-3xl border border-line bg-surface p-5 shadow-2xl" role="dialog" aria-label="Assistente de atendimento">
              <div className="flex items-start justify-between">
                <p className="font-serif text-lg leading-snug">Olá! Como podemos ajudar?</p>
                <button onClick={() => setChat(false)} aria-label="Fechar" className="grid h-9 w-9 place-items-center rounded-full hover:bg-sage-soft"><X size={16} /></button>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {triage.map((t) => (
                  <button key={t.id} onClick={() => { setChat(false); startBooking(t.id); }} className="rounded-full border border-line bg-bg px-4 py-2 text-[13px] font-semibold text-brand hover:bg-sage-soft">{t.label}</button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-3">
          {FEATURES.triageChat && (
            <button onClick={() => setChat((v) => !v)} aria-label="Abrir assistente" aria-expanded={chat}
              className="grid h-14 w-14 place-items-center rounded-full border border-line bg-surface text-brand shadow-[var(--shadow-soft)] hover:bg-sage-soft">
              <MessagesSquare size={22} strokeWidth={1.5} />
            </button>
          )}
          <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp"
            className="grid h-14 w-14 place-items-center rounded-full bg-brand text-white shadow-[var(--shadow-soft)] transition hover:scale-105">
            <MessageCircle size={24} strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </>
  );
}
