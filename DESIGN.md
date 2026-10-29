---
name: OS Clínica
family: S01 Clínica Boutique Clara (+ traços editoriais do Dentelle)
colors:
  bg: "#F7F5F1"
  surface: "#FFFFFF"
  ink: "#14181B"
  muted: "#5B6259"
  brand: "#3F4A38"
  brand-dark: "#2B3326"
  sage: "#BBBEAA"        # cor da logo (amostra do Instagram: #B7BAA5)
  sage-soft: "#E6E8DD"
  taupe: "#B49D8D"       # secundária vista nos posts da clínica
  accent: "#C8A97E"      # champanhe, só decorativo
  field-from: "#69765A"  # campo do hero
  field-to: "#323C2A"
typography:
  display: "Instrument Serif (títulos; itálico nas palavras de acento)"
  body: "Instrument Sans"
  label: "Geist Mono (rótulos, numeração, 11.5px, caixa alta, tracking .14em)"
radius: { card: 24px, pill: 999px }
---

# Overview
Clínica boutique, calma e precisa. Dentelle inspira a estrutura editorial (hero em campo de cor, títulos com itálico, navegação em pílulas, numeração), sem o azul saturado nem o dente 3D, que conflitam com a marca sálvia e dourado.

# Colors
Marca primeiro: sálvia da logo + dourado. Texto branco sobre `field` ≥ 4,5:1 (o ponto mais claro é `#69765A`). Acento dourado nunca é cor de texto sobre fundo claro.

# Typography
Títulos em Instrument Serif, 1 a 2 palavras em itálico por título (`<em class="ac">`). Rótulos em Geist Mono. Libre Caslon Condensed (Dentelle) não existe no next/font; Instrument Serif cumpre o papel.

# Layout
Container 1200px. Hero 100svh com campo verde e arco focal na base. Seções alternam `bg` e `sage-soft/60`; agendamento em `brand`.

# Components
Navegação: pílulas "Menu" (abre painel em tela cheia, numerado 01–05) e "Contato". Cards de tratamento numerados "01 / 12" com glow no cursor. Jornada com passos "Passo 01–04" e linha que desenha no scroll.

# Motion
Entrada por palavra no hero, fade+subida 20px, clip-path no menu. Tudo reduzido sob `prefers-reduced-motion`.

# Do's and Don'ts
- Fazer: trocar o arco focal por foto ou render real quando existir.
- Não: azul saturado, clip-art de dente, preços e antes/depois (regras CFO/CRO), depoimentos inventados.
