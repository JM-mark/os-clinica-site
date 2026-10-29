export type Treatment = {
  id: string;
  name: string;
  icon: string; // nome do ícone Lucide
  short: string;
  long: string;
  points: string[];
  confirmed: boolean; // false = TODO confirmar com a clínica
};

// A clínica se apresenta como "todas as áreas da odontologia" (Facebook/Google).
// confirmed:false marca o que ainda precisa de validação.
export const treatments: Treatment[] = [
  {
    id: "clinica-geral",
    name: "Clínica geral e prevenção",
    icon: "ShieldCheck",
    short: "Check-up, limpeza e acompanhamento para manter a saúde bucal em dia.",
    long: "A base de tudo. Avaliamos dentes, gengiva e mordida, fazemos a limpeza profissional e orientamos a rotina de cuidados em casa.",
    points: ["Avaliação completa", "Limpeza e profilaxia", "Orientação de higiene"],
    confirmed: true,
  },
  {
    id: "clareamento",
    name: "Clareamento dental",
    icon: "Sparkles",
    short: "Dentes mais claros com acompanhamento profissional e segurança.",
    long: "Avaliamos se o clareamento é indicado para o seu caso e escolhemos a técnica mais confortável, no consultório ou supervisionada em casa.",
    points: ["Indicação individual", "Técnica de consultório ou caseira", "Cuidado com a sensibilidade"],
    confirmed: false,
  },
  {
    id: "implantes",
    name: "Implantes dentários",
    icon: "Anchor",
    short: "Reposição de dentes perdidos com planejamento e cirurgia guiada pela avaliação.",
    long: "O implante substitui a raiz do dente ausente. O planejamento começa em exames e avaliação, e segue com a reabilitação sobre o implante.",
    points: ["Planejamento com exames", "Reabilitação sobre implante", "Acompanhamento pós-cirúrgico"],
    confirmed: true,
  },
  {
    id: "protese",
    name: "Prótese e reabilitação oral",
    icon: "Layers",
    short: "Devolve função, conforto e estética com próteses sob medida.",
    long: "Coroas, pontes e próteses planejadas para o seu caso, integrando as outras especialidades quando necessário.",
    points: ["Coroas e pontes", "Próteses removíveis", "Reabilitação completa"],
    confirmed: true,
  },
  {
    id: "ortodontia",
    name: "Ortodontia",
    icon: "AlignHorizontalDistributeCenter",
    short: "Aparelhos fixos e alinhadores para alinhar dentes e mordida.",
    long: "Avaliamos o seu caso e conversamos sobre as opções de tratamento, como aparelhos fixos e alinhadores, com acompanhamento periódico.",
    points: ["Aparelhos fixos", "Alinhadores", "Contenção e manutenção"],
    confirmed: false,
  },
  {
    id: "endodontia",
    name: "Endodontia",
    icon: "Activity",
    short: "Tratamento de canal para preservar o dente e aliviar a dor.",
    long: "Quando a polpa do dente está inflamada ou infectada, o tratamento de canal permite manter o dente natural. Atendemos com anestesia e foco no conforto.",
    points: ["Alívio da dor", "Preservação do dente", "Acompanhamento"],
    confirmed: true,
  },
  {
    id: "periodontia",
    name: "Periodontia",
    icon: "HeartPulse",
    short: "Cuidado com a gengiva e com os tecidos que sustentam os dentes.",
    long: "Sangramento, retração ou mau hálito podem indicar problema na gengiva. Avaliamos, tratamos e orientamos a manutenção.",
    points: ["Tratamento da gengiva", "Raspagem", "Manutenção periódica"],
    confirmed: true,
  },
  {
    id: "dentistica",
    name: "Dentística e estética",
    icon: "Gem",
    short: "Restaurações, facetas e lentes de contato dental com naturalidade.",
    long: "Restaurações discretas e procedimentos estéticos planejados para harmonizar com o seu sorriso e a sua face.",
    points: ["Restaurações", "Facetas", "Lentes de contato dental"],
    confirmed: false,
  },
  {
    id: "odontopediatria",
    name: "Odontopediatria",
    icon: "Baby",
    short: "Atendimento acolhedor para crianças, com prevenção desde cedo.",
    long: "Consultas pensadas para a criança se sentir segura, com foco em prevenção e orientação aos responsáveis.",
    points: ["Primeira consulta", "Prevenção", "Orientação aos pais"],
    confirmed: false,
  },
  {
    id: "cirurgia",
    name: "Cirurgia oral",
    icon: "Scissors",
    short: "Extrações, inclusos e pequenas cirurgias com segurança.",
    long: "Avaliamos com exames e conduzimos extrações e cirurgias com planejamento e orientações claras para a recuperação.",
    points: ["Extrações", "Sisos", "Orientação pós-operatória"],
    confirmed: true,
  },
  {
    id: "harmonizacao",
    name: "Harmonização orofacial",
    icon: "Smile",
    short: "Procedimentos para equilibrar estética e função do sorriso e da face.",
    long: "Avaliação individual para indicar, ou não, os procedimentos mais adequados ao seu objetivo.",
    points: ["Avaliação individual", "Planejamento", "Acompanhamento"],
    confirmed: false, // TODO confirmar se a clínica oferece
  },
  {
    id: "dtm-bruxismo",
    name: "DTM e bruxismo",
    icon: "Moon",
    short: "Tratamento de dor na mandíbula, ranger de dentes e placa miorrelaxante.",
    long: "Avaliamos a articulação e a musculatura e, quando indicado, confeccionamos a placa miorrelaxante.",
    points: ["Avaliação da mordida", "Placa miorrelaxante", "Controle da dor"],
    confirmed: false,
  },
];

// Opções extras no agendamento
export const extraReasons = [
  { id: "avaliacao", name: "Avaliação geral", icon: "ClipboardList", short: "Primeira consulta ou check-up completo." },
  { id: "urgencia", name: "Urgência / dor", icon: "Siren", short: "Dor, quebra ou inchaço. Priorizamos o contato." },
];
