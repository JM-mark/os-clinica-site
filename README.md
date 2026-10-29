# OS Clínica — site prévia

Next.js (App Router) + TypeScript + Tailwind 4 + Framer Motion + Lenis/GSAP.

## Rodar
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Onde editar
| O quê | Onde |
|---|---|
| WhatsApp, telefone, endereço, CRO, horário, flags | `src/config.ts` |
| Tratamentos (e quais estão confirmados) | `src/content/treatments.ts` |
| FAQ | `src/content/faq.ts` |
| Logo | `src/components/Logo.tsx` (`OFFICIAL_LOGO`) + arquivos em `public/brand/` |
| Fotos | `src/components/Photo.tsx` — passe `src="/photos/x.jpg"` nos usos (Hero, About, Instagram) |
| Cores / fontes / raios | `src/app/globals.css` (tokens) e `src/app/layout.tsx` (fontes) |
| Horários do agendamento | `src/lib/availability.ts` |
| Guia de marca (oculto) | `/brand` |

## Variáveis de ambiente
- `BOOKING_WEBHOOK_URL` — webhook (n8n/Make/Zapier). Sem ela, a API roda em modo prévia.
- `NEXT_PUBLIC_SITE_URL` — domínio final (SEO/Open Graph).

Detalhes da automação em `docs/automacao.md`. Direção de design em `docs/design-direction.md`.

## TODOs que dependem da clínica
- [ ] Logo oficial em alta (SVG/PNG, versão horizontal, símbolo, branca) → `public/brand/`
- [ ] Confirmar que (19) 98935-8958 é o WhatsApp da clínica (`WHATSAPP_NUMBER`)
- [ ] Horário de funcionamento
- [ ] Confirmar responsável técnica e CRO (hoje: Suzy Vassão, CROSP 26.161; clínica CROSP 17.060 — lidos da bio do Instagram)
- [ ] Equipe/corpo clínico e texto "A clínica"
- [ ] Fotos reais (fachada, recepção, consultórios, posts)
- [ ] Avaliações reais do Google (com autorização)
- [ ] Convênios aceitos, formas de pagamento, atendimento infantil (FAQ)
- [ ] Tratamentos marcados `confirmed: false` (clareamento, ortodontia, dentística, odontopediatria, harmonização, DTM)
- [ ] Coordenadas exatas para o JSON-LD (`clinic.geo`) e domínio final
- [ ] Revisão jurídica da `/privacidade` e das regras de publicidade do CFO/CRO
