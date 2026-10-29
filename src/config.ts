// Configurações centrais da clínica. Edite aqui para trocar contatos e flags.

// TODO confirmar com a clínica: número do WhatsApp (formato 55 + DDD + número, só dígitos).
// Número do celular listado no Google Maps (19) 98935-8958, adotado a pedido do usuário. Confirmar com a clínica que é o WhatsApp.
export const WHATSAPP_NUMBER = "5519989358958";

// Link de mensagem do WhatsApp encontrado na bio do Instagram da clínica.
// Usado como fallback enquanto WHATSAPP_NUMBER for placeholder.
export const WHATSAPP_MESSAGE_LINK = "https://wa.me/message/SQ2GXQ3L26YTG1";

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://osclinica.com.br"; // TODO domínio final

export const FEATURES = {
  // Assistente de triagem (determinístico, sem IA). Desligue aqui.
  triageChat: true,
  // Antes e depois. Hoje usa SIMULAÇÃO ilustrativa. TODO trocar por pares reais autorizados (CFO) ou desligar.
  beforeAfter: false, // TODO ligar quando os 8 arquivos de public/antes-depois/ existirem
};

export const clinic = {
  name: "OS Clínica",
  descriptor: "Odontologia Integrada",
  city: "Valinhos",
  state: "SP",
  address: {
    street: "Rua Itália, 142",
    district: "Jardim Ribeiro",
    city: "Valinhos",
    state: "SP",
    zip: "13270-180",
  },
  phone: "(19) 3869-2611",
  phoneHref: "tel:+551938692611",
  email: "contato@osclinica.com.br",
  instagram: "https://www.instagram.com/osclinicaodontologia",
  instagramHandle: "@osclinicaodontologia",
  facebook: "https://www.facebook.com/osclinicaodonto",
  maps: "https://www.google.com/maps/search/OS+Cl%C3%ADnica+-+Odontologia+Integrada+Valinhos+SP",
  mapsEmbed:
    "https://www.google.com/maps?q=-22.9707434,-46.9974663&z=17&output=embed",
  // Coordenadas do pin da clínica no Google Maps.
  geo: { lat: -22.9707434, lng: -46.9974663 },
  // Dado público do Google Maps: nota 4,8 com 105 avaliações (conferido em 29/10/2026).
  rating: { value: "4,8", count: 105 },
  // TODO confirmar horário de funcionamento com a clínica (o Google indica fechamento às 18:00).
  hours: [
    // TODO confirmar os horários com a clínica
    { days: "Segunda a sexta", time: "Horário com agendamento" },
    { days: "Sábado", time: "Consulte pelo WhatsApp" },
  ],
  // Fonte: bio do Instagram. Confirmar nome e CRO antes de publicar.
  cro: {
    clinic: "CROSP 17.060",
    responsible: "Suzy Vassão",
    responsibleCro: "CROSP 26.161",
  },
};

export function whatsappUrl(text?: string): string {
  const isPlaceholder = WHATSAPP_NUMBER.includes("X");
  if (isPlaceholder) return WHATSAPP_MESSAGE_LINK;
  return `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
}
