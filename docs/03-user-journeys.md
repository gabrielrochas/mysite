# 03 — Jornadas de Usuário

## 1. Jornada principal: Visitante → Lead qualificado → Call → Proposta

### 1.1. Visão geral do fluxo

```
Visitante → Seleção de idioma (opcional) → Navegação no site → Identificação com caso de uso → 
Clique no CTA → Formulário → Submissão → Página de obrigado → Email automático com link Calendly → 
Registro no CRM → (opcional) Clique no link WhatsApp → Agendamento de call → Call de diagnóstico → 
Envio de proposta → Follow-up → Fechamento
```

(Fonte: plan.md §3.6 – "Fluxo ideal do lead até o fechamento")

---

## 2. Etapa 1: Entrada no site

### 2.1. Intenção do usuário

- Conhecer o desenvolvedor e entender se ele resolve o problema do negócio.
- Avaliar credibilidade (processo, tecnologias, depoimentos, casos).

### 2.2. Conteúdo necessário

- **Hero Section** com headline clara (ex.: "Aplicações web sob medida que transformam processos soltos em produtos digitais lucrativos").
- **Prova social rápida**: logos/nomes de clientes ou número de projetos entregues.
- **Seletor de idioma** (LanguageSwitcher) visível no header, com ícones pt-BR/en/es.

(Fonte: plan.md §2.2 – "Hero Section"; §2.3 – "Prova social")

### 2.3. Eventos de tracking

- `page_view` (propriedades: `page_path`, `referrer`, `language_preference` detectado do navegador ou selecionado).
- `language_change` (se usuário trocar idioma manualmente; propriedades: `from_language`, `to_language`).

---

## 3. Etapa 2: Navegação e identificação

### 3.1. Intenção do usuário

- Verificar se o desenvolvedor já resolveu problemas semelhantes ao seu.
- Entender o processo de trabalho para avaliar seriedade.
- Confirmar que tecnologias usadas são modernas e confiáveis.

### 3.2. Conteúdo necessário

- **Seção de Serviços** com foco em resultados, não em features (ex.: "Sites rápidos que geram caixa" vs "Aplicações web sob medida").
- **Casos de uso** com problemas concretos resolvidos (ex.: "Clínica que aumentou agendamentos em X%" ou "Startup que automatizou pedidos e reduziu erros").
- **Processo de trabalho** com etapas claras: Diagnóstico → Proposta → Protótipo → Desenvolvimento → Entrega → Acompanhamento.
- **Seção de Tecnologias** com logos de React, Node.js, bancos de dados, integrações.

(Fonte: plan.md §2.4 – "Seção de serviços"; §2.5 – "Casos de uso"; §2.6 – "Processo de trabalho"; §2.7 – "Tecnologias")

### 3.3. Eventos de tracking

- `scroll_depth` (opcional; rastrear quão fundo o usuário rola a página).
- `section_view` (disparado quando seção entra no viewport; propriedades: `section_name` = "services", "use_cases", "process", "technologies").
- `CTA_click` (quando usuário clica em CTA secundário no meio da página; propriedades: `cta_location` = "hero", "services", "use_cases", "final", `cta_text`).

---

## 4. Etapa 3: Decisão de contato

### 4.1. Intenção do usuário

- Entender próximos passos: o que acontece após preencher formulário?
- Reduzir objeções finais via FAQ ou depoimentos.
- Decidir se vale a pena investir tempo preenchendo formulário.

### 4.2. Conteúdo necessário

- **Depoimentos contextualizados**: nome, tipo de negócio, problema, resultado.
- **FAQ estratégico** abordando objeções comuns:
  - "Quanto custa?"
  - "Qual o prazo?"
  - "Como funciona o pagamento?"
  - "E se eu não souber definir o escopo?"
  - "Vocês dão suporte após entrega?"
- **CTA final forte** com reforço de filtro (ex.: "Aplicar para projeto" ou "Agendar diagnóstico estratégico gratuito").

(Fonte: plan.md §2.8 – "Depoimentos"; §2.9 – "FAQ estratégico"; §2.10 – "CTA final")

### 4.3. Eventos de tracking

- `faq_item_click` (se FAQ for accordion/expandível; propriedades: `question_text`).
- `testimonial_view` (se carrossel de depoimentos; propriedades: `testimonial_id`).
- `CTA_click` (CTA final; propriedades: `cta_location` = "final", `cta_text`).

---

## 5. Etapa 4: Preenchimento do formulário

### 5.1. Intenção do usuário

- Fornecer informações mínimas necessárias para receber contato.
- Entender se o investimento necessário está dentro do orçamento (via campo de faixa de investimento).

### 5.2. Conteúdo necessário (campos do formulário)

**Obrigatórios**:
- Nome completo
- Email **ou** WhatsApp (validação: pelo menos um preenchido)
- Nome da empresa
- Objetivo principal do projeto (textarea curto)
- Tipo de projeto (select: "Site rápido", "Aplicação web sob medida", "Ainda não sei")
- Faixa de investimento (select: "até R$ X", "de R$ X a R$ Y", "acima de R$ Y", "Prefiro discutir")

**Opcionais**:
- Urgência (select: "Preciso começar em até 2 semanas", "1 mês", "2–3 meses", "Sem pressa")
- Descrição adicional (textarea longo; dica: "Conte mais sobre seu negócio e o problema que quer resolver")

(Fonte: plan.md §3.5 – "Redução de fricção no formulário"; §3.7 – "Estratégia de captura de leads qualificados")

### 5.3. Validações (React Hook Form + Zod)

- **Nome**: mínimo 3 caracteres, obrigatório.
- **Email**: formato válido de email; obrigatório **se** WhatsApp estiver vazio.
- **WhatsApp**: regex de número brasileiro (ex.: +55 XX 9XXXX-XXXX); obrigatório **se** Email estiver vazio.
- **Empresa**: mínimo 2 caracteres, obrigatório.
- **Objetivo**: mínimo 10 caracteres, obrigatório.
- **Tipo de projeto**: select obrigatório.
- **Faixa de investimento**: select obrigatório.
- **Urgência**: opcional (pode ser null).
- **Descrição adicional**: opcional; máximo 1000 caracteres.

### 5.4. UX do formulário

- **Validação em tempo real**: erros claros e amigáveis abaixo de cada campo (ex.: "Email inválido", "Campo obrigatório").
- **Indicadores de progresso** se formulário tiver duas etapas:
  - Etapa 1: nome, email/WhatsApp, empresa, objetivo.
  - Etapa 2: tipo de projeto, faixa de investimento, urgência, descrição adicional.
- **Mensagem clara sobre próximos passos** acima do botão "Enviar" (ex.: "Você receberá um email em até 24h com os próximos passos e link para agendar uma chamada").

(Fonte: plan.md §3.5 – "Validação em tempo real no formulário (erros claros e amigáveis); Indicadores de progresso se o formulário tiver mais de uma etapa")

### 5.5. Eventos de tracking

- `form_start` (disparado quando usuário interage com primeiro campo; propriedades: `form_id`, `language`).
- `form_step_completed` (se multistep; propriedades: `step_number`).
- `form_field_error` (opcional; quando validação falha; propriedades: `field_name`, `error_type`).
- `form_submit_attempt` (usuário clica em "Enviar"; propriedades: `form_id`).

---

## 6. Etapa 5: Submissão e resposta do backend

### 6.1. Intenção do usuário

- Confirmar que formulário foi enviado com sucesso.
- Saber o que acontece agora: quanto tempo até receber resposta? Como será o contato?

### 6.2. Fluxo técnico (backend Nest.js)

1. **Validação server-side** com Zod (duplicar validações do frontend para segurança).
2. **Salvar lead no banco de dados** (Prisma):
   - Tabela `Lead` com campos: id, name, email, whatsapp, company, goal, project_type, investment_range, urgency, description, language, created_at, updated_at.
3. **Enviar email automático** para o lead:
   - Assunto: "Obrigado pelo interesse, [Nome]! Próximos passos"
   - Corpo: agradecimento, breve reforço de credibilidade, explicação dos próximos passos, link clicável de Calendly.
   - Footer com link de WhatsApp (ex.: "Prefere conversar pelo WhatsApp? Clique aqui: [Link]").
4. **Registrar lead no CRM** (decisão pendente de ferramenta: HubSpot API, Pipedrive API, Notion Database, webhook genérico):
   - Campos mínimos: nome, email, whatsapp, empresa, tipo de projeto, faixa de investimento, urgência, data de captação.
5. **Enviar notificação interna** (opcional; email para desenvolvedor ou webhook para Slack/Discord).
6. **Redirecionar para página de obrigado** (frontend).

(Fonte: plan.md §3.6 – "Recebe email automático agradecendo, explicando próximos passos e oferecendo link de Calendly")

### 6.3. Eventos de tracking

- `form_submit_success` (propriedades: `form_id`, `project_type`, `investment_range`, `urgency`, `language`).
- `form_submit_fail` (se validação server-side falhar ou erro de banco/CRM/email; propriedades: `error_code`, `error_message`).
- `email_send_success` (backend; log interno ou evento enviado ao Analytics via server-side tracking).
- `email_send_fail` (idem).
- `crm_record_created` (backend; log interno).
- `crm_sync_fail` (se integração com CRM falhar; backend).

---

## 7. Etapa 6: Página de obrigado

### 7.1. Intenção do usuário

- Confirmar visualmente que ação foi concluída.
- Agendar call imediatamente, se possível, via Calendly.
- (Opcional) Contatar via WhatsApp se preferir canal mais direto.

### 7.2. Conteúdo necessário

- **Título**: "Obrigado, [Nome]! Seu pedido foi recebido."
- **Subtítulo**: "Você receberá um email em até 24 horas com os próximos passos."
- **CTA primário**: "Agendar chamada agora" (link para Calendly embed ou popup).
- **CTA secundário**: "Prefere WhatsApp? Clique aqui" (link `https://wa.me/5561999999999?text=Olá, preenchi o formulário no site e gostaria de conversar sobre o projeto`).
- **Reforço de credibilidade**: mini-bloco com "O que esperar da chamada: diagnóstico do seu negócio, alinhamento de expectativas, próximos passos claros".

(Fonte: plan.md §3.6 – "oferecendo link de Calendly para agendar uma chamada"; §3.8 – "WhatsApp: opção secundária")

### 7.3. Eventos de tracking

- `thank_you_page_view` (propriedades: `lead_id`, `project_type`, `language`).
- `calendly_click` (usuário clica no link/botão de Calendly; propriedades: `cta_location` = "thank_you_page").
- `whatsapp_link_click` (usuário clica no link de WhatsApp; propriedades: `source` = "thank_you_page").

---

## 8. Etapa 7: Email automático e agendamento

### 8.1. Intenção do usuário

- Ler email para confirmar que o desenvolvedor é real e profissional.
- Agendar call via Calendly ou responder ao email.

### 8.2. Conteúdo do email

**Assunto**: "Obrigado pelo interesse, [Nome]! Próximos passos"

**Corpo** (exemplo simplificado):

```
Olá, [Nome]!

Obrigado por preencher o formulário de projeto. Recebi suas informações e vou analisar com cuidado.

Aqui estão os próximos passos:

1. Agendamento de chamada (30–45 min): vamos conversar sobre seu negócio, entender o problema e ver se faz sentido trabalharmos juntos. [Link do Calendly: https://calendly.com/seu-usuario/diagnostico]

2. Se preferir, você pode me chamar diretamente no WhatsApp: [Link: https://wa.me/5561999999999]

3. Após a chamada, vou enviar uma proposta estruturada com escopo, prazo e investimento.

O que você pode esperar da nossa conversa:
- Diagnóstico do seu negócio e objetivo
- Alinhamento de expectativas
- Visão clara de como podemos resolver o problema

Até breve,
[Nome do desenvolvedor]

---
[Assinatura com link do site]
```

(Fonte: plan.md §3.6 – "Recebe email automático agradecendo, explicando próximos passos e oferecendo link de Calendly")

### 8.3. Eventos de tracking

- `email_opened` (se usar ferramenta de email marketing com tracking; opcional).
- `email_link_click` (rastrear cliques no link de Calendly ou WhatsApp; depende da ferramenta de email).

---

## 9. Etapa 8: Call de diagnóstico

### 9.1. Intenção do usuário

- Explicar problema e objetivo.
- Avaliar se desenvolvedor entende do negócio (não só de tecnologia).
- Entender prazo, investimento aproximado e próximos passos.

### 9.2. Agenda sugerida da call (30–45 min)

1. **Apresentação (5 min)**: breve contexto do desenvolvedor e do método de trabalho.
2. **Discovery (15–20 min)**: perguntas sobre negócio, processo atual, dor específica, objetivo, usuários do sistema/site.
3. **Visão de solução (10 min)**: explicar como resolveria o problema em alto nível, mencionar tecnologias e processo.
4. **Próximos passos (5–10 min)**: prazo estimado para envio de proposta, alinhamento de expectativas sobre investimento.

(Fonte: plan.md §3.6 – "Realização da call de diagnóstico (30–45 min), com foco em entender negócio, processo e objetivo")

### 9.3. Eventos de tracking

- `call_scheduled` (quando lead agenda via Calendly; pode ser webhook do Calendly para CRM/backend).
- `call_completed` (registro manual no CRM após call).
- `call_no_show` (lead não compareceu; registro manual).

---

## 10. Etapa 9: Proposta estruturada

### 10.1. Intenção do usuário

- Ler proposta detalhada com escopo, prazo, investimento e garantias.
- Tirar dúvidas finais antes de aprovar.

### 10.2. Conteúdo da proposta (formato PDF/email)

- **Resumo executivo**: problema identificado, solução proposta, resultado esperado.
- **Escopo detalhado**: funcionalidades, páginas/módulos, integrações.
- **Processo e prazo**: fases (discovery → protótipo → sprints → entrega), duração estimada.
- **Investimento**: valor total, forma de pagamento (ex.: 30% início, 40% meio, 30% entrega).
- **Tecnologias**: stack (Next.js, Nest.js, Prisma, etc.).
- **Suporte pós-entrega**: período de garantia, modelo de manutenção.
- **Próximos passos**: como aceitar proposta, prazo para início.

(Fonte: plan.md §3.6 – "Envio de proposta estruturada com escopo, timeline, investimento e próximos passos")

### 10.3. Eventos de tracking

- `proposal_sent` (backend/CRM; log manual ou automático).
- `proposal_opened` (se enviada via ferramenta com tracking; ex.: PandaDoc, DocuSign).

---

## 11. Etapa 10: Follow-up e fechamento

### 11.1. Intenção do usuário

- Esclarecer dúvidas sobre proposta.
- Negociar pequenos ajustes de escopo ou pagamento.
- Aprovar e iniciar projeto.

### 11.2. Fluxo de follow-up

- **D+3**: Email perguntando se houve dúvidas sobre proposta.
- **D+7**: Mensagem via WhatsApp ou email reforçando disponibilidade.
- **D+14**: Se não houver resposta, email final com "Se tiver mudado de ideia, sem problema. Se quiser retomar mais tarde, estarei à disposição."

(Fonte: plan.md §3.6 – "Follow-up em X dias, com espaço para dúvidas")

### 11.3. Eventos de tracking

- `proposal_accepted` (manual; CRM).
- `proposal_rejected` (manual; CRM).
- `follow_up_sent` (log no CRM).

---

## 12. Síntese de eventos por etapa

| Etapa | Eventos principais | Responsável pelo disparo |
|-------|-------------------|--------------------------|
| **Entrada** | `page_view`, `language_change` | Frontend (Next.js) |
| **Navegação** | `CTA_click`, `section_view`, `faq_item_click` | Frontend |
| **Formulário** | `form_start`, `form_submit_success/fail` | Frontend + Backend |
| **Backend** | `email_send_success/fail`, `crm_record_created` | Backend (Nest.js) |
| **Obrigado** | `thank_you_page_view`, `calendly_click`, `whatsapp_link_click` | Frontend |
| **Call** | `call_scheduled`, `call_completed` | Webhook Calendly + CRM manual |
| **Proposta** | `proposal_sent`, `proposal_accepted/rejected` | CRM manual |

---

**Próximos passos**: Especificação detalhada de tracking e analytics está em 07-tracking-and-analytics-spec.md. Componentes de UI (FormStep, AlertBanner, LanguageSwitcher) estão em 09-ui-component-spec.md.
