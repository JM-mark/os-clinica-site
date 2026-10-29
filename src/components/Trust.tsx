import { Reveal, Icon } from "./ui";

const items = [
  { icon: "Layers", title: "Todas as especialidades", text: "Em um só lugar, trabalhando juntas no mesmo plano." },
  { icon: "ClipboardCheck", title: "Planejamento personalizado", text: "Um plano claro e por etapas para o seu caso." },
  { icon: "ShieldCheck", title: "Biossegurança", text: "Protocolos e tecnologia a favor do seu cuidado." },
  { icon: "Handshake", title: "Atendimento humanizado", text: "Explicamos cada etapa, sem pressa e sem jargão." },
];

export function Trust() {
  return (
    <section aria-label="Diferenciais" className="py-16 md:py-24">
      <h2 className="sr-only">Diferenciais da clínica</h2>
      <div className="container-x grid grid-cols-2 gap-y-12 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.08} className={`px-2 sm:px-8 lg:border-l lg:border-line ${i === 0 ? "lg:border-l-0 lg:pl-0" : ""} ${i % 2 === 1 ? "border-l border-line lg:border-l" : ""}`}>
            <span className="text-brand">
              <Icon name={it.icon} size={32} />
            </span>
            <h3 className="mt-5 font-serif text-[24px] leading-[1.08] sm:text-[28px]">{it.title}</h3>
            <p className="t-body mt-3 !text-[15px] sm:!text-[16px]">{it.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
