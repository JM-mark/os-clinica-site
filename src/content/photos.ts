// Fotos do site em um só lugar.
// PRÉVIA: fotos livres do Unsplash (licença Unsplash), carregadas de images.unsplash.com.
// TODO substituir pelas fotos reais da clínica: coloque os arquivos em public/photos/ e troque o `src`,
// por exemplo src: "/photos/recepcao.jpg". Se uma foto não carregar, <Photo> mostra o placeholder.
// Regra: cada foto aparece em um só lugar (exceção: os 3 quadrados do Instagram).

const u = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type SitePhoto = { src?: string; alt: string };

export const photos = {
  // Hero (dentro do arco)
  consult: { src: u("photo-1777331903190-341a3dd0441b", 1100), alt: "Dentista conversando com a paciente em um consultório claro" },
  // A clínica
  reception: { src: u("photo-1762625570087-6d98fca29531"), alt: "Sala de espera clara, com cadeiras e plantas" },
  room: { src: u("photo-1704455306251-b4634215d98f"), alt: "Consultório odontológico moderno com cadeira e equipamentos" },
  team: { src: u("photo-1662837775272-545d8e143ad0"), alt: "Profissional de odontologia em atendimento" },
  // Tratamentos em destaque
  prevention: { src: u("photo-1606811842243-af7e16970c1f"), alt: "Dentista explicando o tratamento para a paciente na cadeira" },
  whitening: { src: u("photo-1662850886700-4ec19bd30d11"), alt: "Mulher sorrindo com naturalidade" },
  implants: { src: u("photo-1777793389944-f7165259a05c"), alt: "Dentista mostrando um modelo anatômico de dente" },
  ortho: { src: u("photo-1674775372046-ff6cd6cb8b68"), alt: "Paciente com aparelho ortodôntico sorrindo" },
  aesthetic: { src: u("photo-1785860817740-c95735ba03b1"), alt: "Paciente sorrindo ao ver o resultado no espelho" },
  // Queixas
  missing: { src: u("photo-1790574318492-1e9149397f58"), alt: "Pessoa sorrindo, representando a reposição de dentes" },
  chipped: { src: u("photo-1590718778567-5ad1d013e5ed"), alt: "Close de sorriso em avaliação odontológica" },
  stains: { src: u("photo-1663182245833-7dd667277043"), alt: "Pessoa sorrindo com dentes claros" },
  gums: { src: u("photo-1661438818937-437f1aeaf08e"), alt: "Paciente em avaliação da saúde da gengiva" },
  sensitive: { src: u("photo-1681939282781-341ac4f61996"), alt: "Paciente em consulta para avaliar dor e sensibilidade" },
  crooked: { src: u("photo-1609840114035-3c981b782dfe"), alt: "Sorriso em avaliação ortodôntica" },
  // Como funciona (4 passos)
  stepBook: { src: u("photo-1762341116682-cef250137a24"), alt: "Paciente aguardando atendimento em ambiente tranquilo" },
  stepExam: { src: u("photo-1590718778567-5ad1d013e5ed"), alt: "Avaliação odontológica em close" },
  stepPlan: { src: u("photo-1679136287096-cb864ebf9b10"), alt: "Profissional apresentando o plano de tratamento" },
  stepCare: { src: u("photo-1678473882249-6378b6e12241"), alt: "Sorriso saudável no acompanhamento" },
  // Antes/depois (simulação ilustrativa): mesma foto, "antes" recebe filtro CSS
  baWhitening: { src: u("photo-1663182234283-28941e7612da", 1000), alt: "Sorriso para simulação ilustrativa de clareamento" },
  baLenses: { src: u("photo-1678473882249-6378b6e12241", 1000), alt: "Sorriso para simulação ilustrativa de lentes de contato dental" },
  baRestoration: { src: u("photo-1679136287096-cb864ebf9b10", 1000), alt: "Sorriso para simulação ilustrativa de restauração estética" },
  baVeneers: { src: u("photo-1679741919483-acf704e00495", 1000), alt: "Sorriso para simulação ilustrativa de facetas" },
} satisfies Record<string, SitePhoto>;
