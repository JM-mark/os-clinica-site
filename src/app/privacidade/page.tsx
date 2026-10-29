import type { Metadata } from "next";
import Link from "next/link";
import { clinic } from "@/config";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = { title: "Política de Privacidade" };

export default function Privacidade() {
  return (
    <main className="container-x max-w-3xl py-16">
      <Link href="/" aria-label="Voltar ao início"><Logo /></Link>
      {/* TODO revisar jurídico: texto modelo */}
      <p className="mt-10 rounded-xl bg-sage-soft px-4 py-3 text-[13px] text-muted">Texto modelo. TODO revisar com assessoria jurídica antes de publicar.</p>
      <h1 className="mt-6 text-[40px]">Política de Privacidade</h1>
      <div className="mt-6 space-y-5 leading-relaxed text-muted">
        <p><strong className="text-ink">Quem somos.</strong> A {clinic.name} ({clinic.descriptor}), {clinic.address.street}, {clinic.address.city}/{clinic.address.state}, é a controladora dos dados tratados neste site.</p>
        <p><strong className="text-ink">Quais dados coletamos.</strong> Nome, telefone/WhatsApp, e-mail (opcional), motivo da consulta, data e horário de preferência e observações que você escolher informar no agendamento.</p>
        <p><strong className="text-ink">Para que usamos.</strong> Exclusivamente para entrar em contato, confirmar e organizar o seu atendimento. Base legal: consentimento (art. 7º, I, LGPD) e procedimentos preliminares a contrato.</p>
        <p><strong className="text-ink">Compartilhamento.</strong> Os dados são enviados à clínica por WhatsApp e/ou pelos sistemas de agenda usados por ela. Não vendemos dados.</p>
        <p><strong className="text-ink">Armazenamento.</strong> Este site não grava os seus dados no navegador. Os dados ficam apenas nos canais de atendimento da clínica pelo tempo necessário ao atendimento e às obrigações legais.</p>
        <p><strong className="text-ink">Seus direitos.</strong> Você pode pedir acesso, correção ou exclusão dos dados e revogar o consentimento a qualquer momento pelo e-mail <a className="text-brand underline" href={`mailto:${clinic.email}`}>{clinic.email}</a>.</p>
      </div>
    </main>
  );
}
