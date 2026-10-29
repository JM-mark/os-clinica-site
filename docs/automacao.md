# Automação de agendamento

## O que já funciona (sem backend)
Ao confirmar, o widget:
1. abre `https://wa.me/<WHATSAPP_NUMBER>?text=...` com todos os dados do paciente;
2. faz `POST /api/agendamento` (valida com zod e repassa ao webhook);
3. oferece um `.ics` (pré-reserva, 60 min, fuso America/Sao_Paulo).

> O número (19) 98935-8958, do Google Maps, está em `WHATSAPP_NUMBER`, pendente de confirmação pela clínica.

## Plugar um webhook (n8n / Make / Zapier)
1. Crie um fluxo com gatilho **Webhook (POST)** e copie a URL.
2. Defina `BOOKING_WEBHOOK_URL=<url>` no `.env.local` (e na Vercel/Netlify).
3. Payload recebido:
```json
{
  "treatmentId": "clareamento", "treatmentName": "Clareamento dental",
  "date": "2026-11-05", "time": "09:00",
  "name": "...", "phone": "(19) 90000-0000", "email": "",
  "firstVisit": "sim", "payment": "particular", "notes": "",
  "consent": true, "receivedAt": "ISO-8601", "source": "site-previa"
}
```
4. Ações sugeridas no fluxo: criar evento no **Google Calendar**, linha em planilha/CRM e enviar confirmação ao paciente.

## Confirmação automática por WhatsApp
Use uma API oficial ou de terceiros no passo final do fluxo: **WhatsApp Cloud API (Meta)**, **Z-API** ou **Evolution API**. Para mensagens iniciadas pela clínica, a Cloud API exige template aprovado. Use o telefone do payload e uma mensagem do tipo: “Olá, {nome}! Recebemos seu pedido para {data} às {hora}. Confirmamos em breve.”

## Trocar os horários mockados por reais
`src/lib/availability.ts` exporta `getSlots(dateISO, period)` e `isBookableDate`. Mantenha a assinatura e troque o corpo por:
- **Google Calendar free/busy**: consulte `freebusy.query` do calendário da clínica e remova do conjunto de horários base os intervalos ocupados;
- **Cal.com**: use a API de slots (`/slots`) e mapeie para `{ time, available }`.
Se a chamada for feita no servidor, crie uma rota `app/api/disponibilidade/route.ts` e faça `fetch` nela dentro de `getSlots`.

## Privacidade
O route handler não registra nome, telefone ou e-mail em log. Mantenha assim em produção e informe os operadores do fluxo (n8n, etc.) na política de privacidade.
