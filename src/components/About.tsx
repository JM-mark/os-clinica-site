import { Photo } from "./Photo";
import { photos } from "@/content/photos";
import { Reveal, SectionHead } from "./ui";

export function About() {
  return (
    <section id="clinica" className="bg-sage-soft/60 py-20 md:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="A clínica"
            title={<>Um paciente, um <em className="ac">plano</em> completo.</>}
            lead="Odontologia integrada significa que as especialidades conversam entre si. Em vez de tratamentos soltos, você recebe uma visão do conjunto: saúde, função e estética no mesmo plano."
          />
          <Reveal delay={0.1} className="mt-8 space-y-4 text-[16px] leading-relaxed text-muted">
            <p>
              Na OS Clínica, o ponto de partida é ouvir você. Depois vêm o exame, o diagnóstico e uma proposta
              organizada por etapas, com prioridades claras.
            </p>
            {/* TODO substituir por texto sobre a equipe e a história da clínica, fornecido pela clínica */}
            <p>Tudo explicado de forma simples, para você decidir com segurança.</p>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="grid grid-cols-6 grid-rows-6 gap-3 md:gap-4">
            <Photo showLabelOnPhoto src={photos.reception.src} alt={photos.reception.alt} label="Recepção" tone={1} className="col-span-4 row-span-4 aspect-[4/3] rounded-[24px]" />
            <Photo showLabelOnPhoto src={photos.care.src} alt={photos.care.alt} label="Atendimento" tone={2} className="col-span-2 row-span-3 rounded-[24px]" />
            <Photo showLabelOnPhoto src={photos.room.src} alt={photos.room.alt} label="Consultório" tone={3} className="col-span-2 row-span-3 rounded-[24px]" />
            <Photo showLabelOnPhoto src={photos.team.src} alt={photos.team.alt} label="Equipe" tone={0} className="col-span-4 row-span-2 rounded-[24px]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
