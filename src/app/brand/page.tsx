import type { Metadata } from "next";
import { Logo } from "@/components/Logo";
import { Icon } from "@/components/ui";

export const metadata: Metadata = { title: "Guia de marca", robots: { index: false, follow: false } };

const colors = [
  ["Fundo", "#F7F5F1", "var(--bg)"], ["Superfície", "#FFFFFF", "var(--surface)"], ["Texto", "#14181B", "var(--ink)"],
  ["Primária", "#3F4A38", "var(--brand)"], ["Primária escura", "#2B3326", "var(--brand-dark)"],
  ["Sálvia (logo)", "#BBBEAA", "var(--sage)"], ["Sálvia suave", "#E6E8DD", "var(--sage-soft)"], ["Acento champanhe", "#C8A97E", "var(--accent)"],
];

export default function Brand() {
  return (
    <main className="container-x py-16">
      <p className="eyebrow">Guia de marca · prévia</p>
      <h1 className="mt-3 text-[48px]">OS Clínica</h1>

      <section className="mt-14">
        <h2 className="text-[28px]">Logo</h2>
        <p className="mt-2 text-muted">Wordmark provisório, até a logo oficial chegar.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="grid h-40 place-items-center rounded-3xl border border-line bg-surface"><Logo /></div>
          <div className="grid h-40 place-items-center rounded-3xl border border-line bg-surface"><Logo variant="symbol" /></div>
          <div className="grid h-40 place-items-center rounded-3xl bg-brand"><Logo variant="white" /></div>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[28px]">Paleta</h2>
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
          {colors.map(([n, hex, v]) => (
            <div key={hex} className="overflow-hidden rounded-2xl border border-line bg-surface">
              <div className="h-24" style={{ background: v }} />
              <div className="p-3 text-[13px]"><p className="font-semibold">{n}</p><p className="text-muted">{hex}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[28px]">Tipografia</h2>
        <div className="mt-6 rounded-3xl border border-line bg-surface p-8">
          <p className="eyebrow">Fraunces · títulos</p>
          <p className="mt-2 font-serif text-[56px] leading-none">Odontologia integrada</p>
          <p className="eyebrow mt-8">Manrope · texto</p>
          <p className="mt-2 max-w-xl text-[17px] leading-relaxed text-muted">Acolhedor, seguro e técnico sem jargão. Frases curtas. Sempre tratando o paciente por “você”.</p>
        </div>
      </section>

      <section className="mt-14">
        <h2 className="text-[28px]">Componentes</h2>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <button className="btn btn-primary">Agendar avaliação</button>
          <button className="btn btn-ghost">Falar no WhatsApp</button>
          <div className="w-72 rounded-[24px] border border-line bg-surface p-6 shadow-[var(--shadow-soft)]">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-sage-soft text-brand"><Icon name="Sparkles" size={20} /></span>
            <h3 className="mt-4 text-[22px]">Card de tratamento</h3>
            <p className="mt-2 text-[14px] text-muted">Borda 1px, raio 24px, sombra suave.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
