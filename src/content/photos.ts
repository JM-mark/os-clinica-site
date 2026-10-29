// Fotos do site em um só lugar.
// PRÉVIA: fotos livres do Unsplash (licença Unsplash), carregadas de images.unsplash.com.
// TODO substituir pelas fotos reais da clínica: coloque os arquivos em public/photos/ e troque o `src`,
// por exemplo src: "/photos/recepcao.jpg". Se uma foto não carregar, <Photo> mostra o placeholder.
// Regra: cada foto aparece em um só lugar. Fotos de banco ficam só na vitrine de tratamentos e nas queixas.

const u = (id: string, w = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export type SitePhoto = { src?: string; alt: string; /** object-position do crop, ex.: "center 60%" */ pos?: string };

export const photos = {
  // Vitrine de tratamentos (5 destaques)
  prevention: { src: u("photo-1606811842243-af7e16970c1f"), alt: "Dentista explicando o tratamento para a paciente na cadeira" },
  // Close de sorriso com dentes claros em evidência, crop focado na boca
  whitening: { src: u("photo-1663182234283-28941e7612da"), alt: "Close de sorriso com dentes claros", pos: "center 60%" },
  implants: { src: u("photo-1777793389944-f7165259a05c"), alt: "Dentista mostrando um modelo anatômico de dente" },
  ortho: { src: u("photo-1674775372046-ff6cd6cb8b68"), alt: "Paciente com aparelho ortodôntico sorrindo" },
  aesthetic: { src: u("photo-1785860817740-c95735ba03b1"), alt: "Paciente sorrindo ao ver o resultado no espelho" },
  // Queixas ("O que te incomoda?")
  missing: { src: u("photo-1790574318492-1e9149397f58"), alt: "Pessoa sorrindo, representando a reposição de dentes" },
  chipped: { src: u("photo-1590718778567-5ad1d013e5ed"), alt: "Close de sorriso em avaliação odontológica" },
  stains: { src: u("photo-1663182245833-7dd667277043"), alt: "Pessoa sorrindo com dentes claros" },
  gums: { src: u("photo-1661438818937-437f1aeaf08e"), alt: "Paciente em avaliação da saúde da gengiva" },
  sensitive: { src: u("photo-1681939282781-341ac4f61996"), alt: "Paciente em consulta para avaliar dor e sensibilidade" },
  crooked: { src: u("photo-1609840114035-3c981b782dfe"), alt: "Sorriso em avaliação ortodôntica" },
} satisfies Record<string, SitePhoto>;

// Antes/depois: imagens GERADAS (mesma pessoa, só os dentes mudam), salvas em public/antes-depois/.
// Arquivos esperados por caso: <slug>-antes.webp e <slug>-depois.webp (1600×1200, qualidade 82).
// TODO: ainda não existem. Enquanto faltarem, FEATURES.beforeAfter fica desligado em src/config.ts.
export const beforeAfterPairs = [
  { slug: "restauracao", title: "Restauração estética", altBefore: "Sorriso com dente fraturado", altAfter: "Sorriso com o dente restaurado" },
  { slug: "implante", title: "Implante dentário", altBefore: "Sorriso com espaço de um dente ausente", altAfter: "Sorriso com o espaço reposto por implante" },
  { slug: "clareamento", title: "Clareamento dental", altBefore: "Sorriso com dentes amarelados e manchas leves", altAfter: "Sorriso com dentes claros e naturais" },
  { slug: "alinhadores", title: "Alinhadores", altBefore: "Sorriso com dentes apinhados e desalinhados", altAfter: "Sorriso com dentes alinhados" },
] as const;
