// Fotos do site em um só lugar.
// PRÉVIA: fotos livres do Unsplash (licença Unsplash), carregadas de images.unsplash.com.
// TODO substituir pelas fotos reais da clínica: coloque os arquivos em public/photos/ e troque o `src`,
// por exemplo src: "/photos/recepcao.jpg". Se uma foto não carregar, <Photo> mostra o placeholder.
// Regra: sem fotos de pessoas. Fotos de banco só nas queixas; a vitrine de tratamentos é só texto.

const Q = `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}/queixas`;

export type SitePhoto = { src?: string; alt: string; /** object-position do crop, ex.: "center 60%" */ pos?: string };

export const photos = {
  // Queixas ("O que te incomoda?"): fotos clínicas e de modelos, SEM pessoas, baixadas do Unsplash (licença Unsplash)
  // e salvas em public/queixas/ (WebP 1600×1200 e -800). TODO trocar pelas fotos reais da clínica, se houver.
  missing: { src: `${Q}/queixa-falta-dente.webp`, alt: "Modelo de arcada com um dente ausente e um implante ao lado" },
  chipped: { src: `${Q}/queixa-dente-quebrado.webp`, alt: "Close dos dentes posteriores com desgaste e fissuras no esmalte" },
  stains: { src: `${Q}/queixa-manchados.webp`, alt: "Close dos dentes com tom amarelado" },
  gums: { src: `${Q}/queixa-gengiva.webp`, alt: "Close dos dentes com a gengiva avermelhada" },
  sensitive: { src: `${Q}/queixa-sensibilidade.webp`, alt: "Close da região dos dentes e da gengiva sendo avaliada com uma sonda" },
  crooked: { src: `${Q}/queixa-desalinhados.webp`, alt: "Close dos dentes apinhados e desalinhados" },
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
