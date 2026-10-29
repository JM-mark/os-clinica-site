---
name: OS Clínica
family: S01 Clínica Boutique Clara (+ traços editoriais do Dentelle) — revisão premium
colors:
  bg: "#F7F5F1"
  surface: "#FFFFFF"
  ink: "#14181B"
  muted: "#4A5146"      # texto secundário; 7,4:1 sobre bg (AA/AAA)
  brand: "#3F4A38"
  brand-dark: "#2B3326"
  sage: "#BBBEAA"        # cor da logo (amostra do Instagram: #B7BAA5)
  sage-soft: "#E6E8DD"
  taupe: "#B49D8D"
  accent: "#C8A97E"      # champanhe: SÓ detalhes (traços, selos, hairlines). Nunca texto sobre fundo claro.
  ivory: "#F4EFE4"       # wordmark do rodapé
  field-from: "#69765A"
  field-to: "#323C2A"
typography:
  display: "Instrument Serif"
  body: "Jost 300/400/500 (texto, interface, botões e rótulos)"
  numbers: "Instrument Serif com algarismos lining + tabulares (01 / 06, contadores, nota 4,8). Geist Mono foi removida."
scale:
  h1: "clamp(56px, 9.2vw, 128px) / 0.92 / -0.02em"
  h2: "clamp(44px, 6.2vw, 88px) / 0.98 / -0.02em; 1 a 2 palavras em itálico (.ac)"
  h3: "clamp(30px, 3.4vw, 48px) / 1.02"
  lead: "Jost 300, clamp(19px, 1.5vw, 21px) / 1.55; ink a 82%"
  body: "Jost 400, clamp(16px, 1.2vw, 17px) / 1.65; cor #4A5146; max-width 34em"
  label: "Jost 12px / 500 / 0.2em / caixa alta, com traço dourado de 24px antes (::before)"
  button: "Jost 500 / 13px / caixa alta / 0.14em; altura 52px; padding 0 28px; pílula. Header: 12px."
radius: { card: 24px, pill: 999px }
---

# Overview
Clínica boutique, calma e precisa, com acabamento de agência. Dentelle inspira a estrutura editorial (hero em campo de cor, títulos com itálico, navegação em pílulas, numeração, antes/depois sticky e processo em 3 colunas), sem o azul saturado nem o dente 3D, que conflitam com a marca sálvia e dourado.

# Colors
Marca primeiro: sálvia da logo + dourado. Texto branco sobre `field` ≥ 4,5:1 (ponto mais claro `#69765A`). `muted` escurecido para `#4A5146` (7,4:1). Dourado só em detalhes.

# Typography
- Títulos: Instrument Serif, tracking negativo, `text-wrap: balance`. Parágrafos com `text-wrap: pretty`.
- Texto: Jost 400, 16–17px, entrelinha 1,65 (lead em Jost 300), coluna de no máximo 34em (65–70 caracteres).
- Rótulos (eyebrow): Jost 12px, peso 500, caixa alta, tracking 0,2em, precedidos de traço dourado de 24px.
- Botões: Jost 500, 13px, caixa alta, tracking 0,14em, 52px de altura, pílula. Primário: fundo `brand`, texto marfim. Secundário: borda 1px e texto `brand`. Hover: efeito "roll" de 200ms (o texto sobe e uma cópia vem de baixo) e a seta desliza 4px.
- Números (contadores, 01 — 05, nota): Instrument Serif com `lining-nums tabular-nums`.
- Números grandes (contador da vitrine, nota 4,8): Instrument Serif com `font-variant-numeric: tabular-nums`.

# Layout
Container 1200px. Hero 100svh com campo verde e arco com foto. Seções alternam `bg` e `sage-soft/60`; agendamento em `brand`. Hairline dourada desenhada entre seções. Grão de filme a 3%.

# Photography
Todas as fotos passam pelo componente `<Photo>`: `saturate(.88) contrast(1.02) sepia(.06)` + overlay da cor da marca (`soft-light`, 6%). Entram com máscara de baixo para cima e zoom 1,12 → 1. Fotos de banco só na vitrine de tratamentos e nas queixas; antes/depois são imagens geradas. Nenhuma foto se repete.

# Components
- Header: lockup com monograma em círculo 40px + "OS Clínica" (serif 22px) + "ODONTOLOGIA INTEGRADA" (10px, tracking aberto). No celular: monograma + nome, WhatsApp, Menu; sem "Contato" nem descritor.
- Hero: logo grande no arco claro, cercada por anel de texto circular ("ODONTOLOGIA INTEGRADA · VALINHOS · SP ·"); o monograma se desenha em dourado na primeira carga; o arco cresce ao rolar.
- Trust: 4 colunas com hairlines verticais (2×2 no celular).
- Queixas: lista fixa em serif 44–52px (ativo 100%, outros 28%); no celular, carrossel de chips.
- Vitrine: foto 42% da largura, 72vh; título 96px; "Saiba mais" com sublinhado animado.
- Antes/depois: sticky com título que desfoca; 4 cards em ziguezague; alça de vidro com dente. Imagens geradas (flag FEATURES.beforeAfter, hoje desligada até os arquivos existirem).
- Como funciona: 2 colunas só com texto (lista de passos + painel do passo ativo com contador 01 / 04 e barra dourada); no celular, lista vertical.
- FAQ: perguntas serif 24–28px, "+" que gira para "×".
- Footer: wordmark gigante "OS Clínica" (~18vw, marfim 8%) com parallax.

# Motion
Regra geral: Framer Motion; efeitos elaborados só no desktop (>= 1024px) e sem `prefers-reduced-motion` (hook `useRichMotion`). No celular e com reduced-motion há versão simples e estática. Preferir transform, opacity e clip-path.
- Intro (≤ 1,2s, uma vez por sessão): monograma desenhado em traço dourado e cortina verde que abre.
- Lenis em toda a página (já integrado ao ticker do GSAP).
- Hero: entrada por palavra; arco cresce 1 → 1,35; anel de texto gira 40s por volta e, com a logo, gira 0 → 180° com o scroll; monograma desenhado em traço dourado (1,2s). Reduced-motion: estático.
- Cursor: invisível até o primeiro `pointermove`; some ao sair da janela e ao perder o foco; nunca em toque (`hover: none`) nem com reduced-motion.
- Statement: frase que acende palavra por palavra no scroll.
- Marquee de especialidades entre Statement e Queixas; inverte o sentido quando o scroll inverte.
- Fotos: reveal por máscara (clip-path) + zoom 1,12 → 1.
- Queixas: lista fixa + IntersectionObserver; clicar rola até o card.
- Vitrine: contador com giro vertical (odômetro), troca de foto em cortina (clip-path), título por linha com máscara.
- Antes/depois: título fixo que desfoca (0 → 14px) e esmaece (1 → 0,35) conforme os cards sobem; parallax e rotação ±1° por card; passeio automático do divisor uma vez (50 → 30 → 70 → 50, 2,2s).
- Como funciona: passos pelo scroll (seção fixa) ou clique; o texto troca com máscara por linha.
- Nota 4,8: contador de 0,0 a 4,8 e estrelas acendendo em sequência.
- Micro-interações (só ponteiro fino): botões magnéticos (até 6px), cursor de 10px que vira disco de 72px com "Ver" ou "Arraste", sublinhado que se desenha no hover.
- Rodapé: wordmark com parallax.
- Menu: clip-path em tela cheia.

# Do's and Don'ts
- Fazer: trocar as fotos do Unsplash pelas reais da clínica e o antes/depois por casos autorizados.
- Não: azul saturado, clip-art de dente, preços e antes/depois reais sem autorização (CFO 196/2019), depoimentos inventados, dourado em texto sobre fundo claro.
