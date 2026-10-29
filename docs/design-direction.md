# Direção de design — OS Clínica

## Marca encontrada (Instagram @osclinicaodontologia)
- Foto de perfil: monograma "OS" em círculo verde-sálvia (amostra média ≈ `#BBBEAA`), traço claro e detalhe dourado, com o descritor "Odontologia Integrada". Emoji ⚜️ na bio.
- Bio: "OS Clínica – Odontologia Integrada – CROSP 17.060", RT Suzy Vassão CROSP 26.161, link de WhatsApp `wa.me/message/SQ2GXQ3L26YTG1`.
- Destaques do perfil: atendimento, Os clínica, depoimentos, convênios, corpo clínico.
- A logo oficial em alta **não foi obtida** (só miniatura 100px). Usamos wordmark provisório; substituir via `public/brand/`.

> Como a marca real é **verde-sálvia + dourado**, a paleta do briefing (teal) foi adaptada para um verde-oliva/sálvia profundo.

## Referências usadas (padrões, sem copiar layout/código)
1. **Motionsites "Glow Features"** — cards com brilho suave que segue o cursor → seção de tratamentos (versão clara, acento champanhe).
2. **21st.dev / templates 8B** — estrutura de site de serviço local (hero → serviços → prova → contato) e entradas de scroll sóbrias.
3. **B12 (Health & wellness)** — CTA de agendamento sempre visível (header, barra mobile, flutuante).
4. **Framer / Webflow** — hero com tipografia grande, bento grid, micro-interações curtas.
5. **Figma Community (portfólio)** — grids editoriais e fotos grandes na seção "A clínica".

## Paleta final
| Token | Hex | Uso |
|---|---|---|
| `--bg` | `#F7F5F1` | fundo off-white quente |
| `--surface` | `#FFFFFF` | cards |
| `--ink` | `#14181B` | texto |
| `--brand` | `#3F4A38` | verde-oliva profundo (primário; contraste 9,2:1 sobre `--bg`) |
| `--brand-dark` | `#2B3326` | hover / footer |
| `--sage` | `#BBBEAA` | cor da logo, superfícies suaves |
| `--sage-soft` | `#E6E8DD` | fundos de seção, chips |
| `--accent` | `#C8A97E` | champanhe/dourado: linhas, glow (decorativo, nunca texto sobre claro) |
| `--muted` | `#5B6259` | texto secundário (contraste 5,9:1 sobre `--bg`) |

Texto branco sobre `--brand`: 9,6:1 (AA/AAA). Acento só em elementos decorativos.

## Tipografia
- Títulos: **Fraunces** (serifada, tracking −0,02em).
- Texto/UI: **Manrope**.
- Ícones: Lucide, traço 1.5.

## Formas e movimento
- Raios 16–28px, bordas 1px semitransparentes, sombras muito suaves.
- Animações: fade + translateY 16–24px, stagger em cards, glow no cursor, linha SVG que desenha no scroll; tudo reduzido em `prefers-reduced-motion`.


---
## Atualização (29/10/2026): família escolhida pelo catálogo
**S01 Clínica Boutique Clara**, com traços editoriais do Dentelle (https://dentelle.framer.website/, 🟡 só inspiração).

| Estilo | Nota ponderada |
|---|---|
| S01 | 8,9 |
| S03 (precisa de fotos reais) | 7,1 |
| S02 (onde o catálogo classifica o Dentelle) | 5,9 |
| S04 | 5,8 |

Adotado do Dentelle: títulos em serifa estreita com itálico, navegação em pílulas, hero em campo de cor, numeração e rótulos mono. Não adotado: azul, dente 3D, preços, antes/depois, depoimentos nominais. Tokens finais em `DESIGN.md`.

## Fotos
- Instagram: só artes de marca com texto (sem fotos do espaço ou da equipe). Usadas apenas para extrair a paleta (sálvia `#B7BAA5`, taupe `#B49D8D`).
- Google Maps (18 fotos): imagens genéricas de banco e uma fachada em baixa resolução, com direitos incertos. Não usadas. Dados reais aproveitados: coordenadas do pin, nota 4,8 (105 avaliações) e fechamento às 18:00.


---
## Ajustes finais (29/10/2026)
- **Tipografia:** Instrument Serif (títulos e números) + **Jost** (texto, botões e rótulos). Jost é a alternativa open-source mais próxima da Futura (geométrica, "a" de um andar), combinação clássica de serif editorial + sans geométrica em marcas de beleza e moda. A Tenor Sans foi considerada só para botões e rótulos caso a Jost parecesse redonda demais; **não foi necessária**: em caixa alta com tracking aberto a Jost fica elegante nos botões, e no texto corrido (300/400) o peso leve mantém leitura confortável. Geist Mono removida.
- **Hero:** sem foto de banco no arco; logo grande com anel de texto circular girando e rolando com o scroll. A logo é a recriação vetorial do monograma (TODO trocar pelo arquivo oficial).
- **A clínica e Como funciona:** só tipografia, sem fotos.
- **Fotos:** banco de imagens só na vitrine e nas queixas; Clareamento usa close de sorriso com crop na boca.
- **Instagram:** embeds oficiais dos 4 posts escolhidos (sem scraping).
- **Antes/depois:** copy nova, sem "simulação". As imagens precisam ser **geradas** (mesma pessoa, só os dentes mudam). Faltam os arquivos em `public/antes-depois/`, por isso `FEATURES.beforeAfter` está desligada. Gerar exigiu créditos que a sessão não tinha (Higgsfield com 0,25; Weave gratuito com 2 execuções).
