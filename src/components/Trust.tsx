import { Reveal, Icon } from "./ui";

const items = [
  { icon: "Layers", title: "Todas as especialidades", text: "Em um só lugar, trabalhando juntas." },
  { icon: "ClipboardCheck", title: "Planejamento personalizado", text: "Um plano claro para o seu caso." },
  { icon: "ShieldCheck", title: "Biossegurança", text: "Protocolos e tecnologia a seu favor." },
  { icon: "Handshake", title: "Atendimento humanizado", text: "Explicamos cada etapa, sem pressa." },
];

export function Trust() {
  return (
    <section aria-label="Diferenciais" className="py-14">
      <div className="container-x grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((it, i) => (
          <Reveal key={it.title} delay={i * 0.08} className="flex items-start gap-4">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-sage-soft text-brand">
              <Icon name={it.icon} size={22} />
            </span>
            <div>
              <h3 className="font-sans text-[16px] font-semibold tracking-normal">{it.title}</h3>
              <p className="mt-1 text-[14px] leading-snug text-muted">{it.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
