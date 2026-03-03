# 01 — Escopo do Produto

## 1. Entidades principais

### 1.1. Site rápido (módulo/oferta A)

**Definição**: Landing pages e sites institucionais otimizados para conversão, posicionados como "lançadores" de resultado para validar ofertas, rodar tráfego pago e gerar caixa rápido.

**Características**:
- Escopo fechado: 1 página principal + página de obrigado.
- Prazo curto (até X dias, valor não especificado no plan.md).
- Integrações básicas: formulário, Analytics, Pixel, envio de email automático.
- Copy ajustada para conversão.
- Tracking configurado.

(Fonte: plan.md §1.1 – "Sites rápidos"; §4.1 – "Sites rápidos que geram caixa")

### 1.2. Aplicação web sob medida (módulo/oferta B)

**Definição**: Sistemas e plataformas customizadas que automatizam processos, centralizam operações e escalam o negócio. Posicionados como "produto principal".

**Características**:
- Escopo variável: depende do problema de negócio (CRMs internos, dashboards, portais de cliente, sistemas de pedidos, automação de fluxos).
- Processo em fases: discovery → escopo → protótipo → sprints → entrega → acompanhamento.
- Stack full-stack: Next.js (frontend) + Nest.js (backend) + Prisma (banco de dados).
- Foco em eficiência, redução de erro, controle e visibilidade em tempo real.

(Fonte: plan.md §1.1 – "Aplicações web sob medida"; §1.3 – "Atrair clientes de aplicações web customizadas")

### 1.3. Relação entre ofertas

- **Sites rápidos como porta de entrada**: cliente valida oferta via landing page, depois enxerga necessidade de sistema mais robusto.
- **Aplicações sob medida como upsell natural**: desenvolvedor já conhece o negócio do cliente, facilitando escopo e confiança.

(Fonte: plan.md §1.3 – "sites rápidos são a porta de entrada")

## 2. Em escopo

### 2.1. Site institucional do desenvolvedor

- [x] **Página principal (one-page)** com seções: Hero, Prova social, Serviços, Casos de uso, Processo, Tecnologias, Depoimentos, FAQ, CTA final.
- [x] **Página de obrigado** exibida após envio do formulário, com mensagem de confirmação, próximos passos e link para Calendly.
- [x] **Páginas de apoio (opcionais para MVP)**: "Sites rápidos" (específica), "Aplicações web sob medida" (específica), "Cases" (quando houver volume).
- [x] **Formulário de captação de leads** com campos de qualificação: nome, email/WhatsApp, empresa, objetivo, tipo de projeto, faixa de investimento, urgência.
- [x] **Envio de email automático** ao lead após submissão, com agradecimento, próximos passos e link de Calendly.
- [x] **Registro automático de lead em CRM** (ferramenta a definir: HubSpot, Pipedrive, Notion, outro).
- [x] **CTA primário e secundário** posicionados estrategicamente (hero, meio da página, final).
- [x] **Componentes de prova social**: mini-bloco com logos/nomes de clientes ou projetos.
- [x] **Casos de uso concretos**: cards ou seção com problemas reais resolvidos.
- [x] **FAQ estratégico**: perguntas que abordem objeções comuns (prazo, preço, processo).
- [x] **Suporte a 3 idiomas**: pt-BR (padrão), en, es, com seletor de idioma no header.

(Fonte: plan.md §2.1 – "Ordem ideal das seções"; §3.5 – "Redução de fricção no formulário"; §3.6 – "Fluxo ideal do lead")

### 2.2. Rastreamento e analytics

- [x] **Eventos de tracking**: page_view, language_change, CTA_click (por seção), form_start, form_submit_success, form_submit_fail, email_send_success, email_send_fail, crm_record_created, whatsapp_link_click.
- [x] **Propriedades de eventos**: tipo de projeto, faixa de investimento, urgência, idioma selecionado.
- [x] **Integração com Google Analytics e Facebook/Meta Pixel**.

(Fonte: plan.md §1.2 – "métricas configuradas (Analytics, Pixel)")

### 2.3. Arquitetura e stack

- [x] **Frontend**: Next.js 14+ (App Router), Tailwind CSS, shadcn/ui, React Hook Form, Zod.
- [x] **Backend**: Nest.js, Prisma ORM.
- [x] **Qualidade/DevX**: Biome.js (linting/formatting), Lefthook (git hooks).
- [x] **Autenticação**: better-auth (uso pendente; não necessário para MVP do site institucional).
- [x] **i18n**: pt-BR/en/es via arquivos JSON/TS organizados por namespace.

(Fonte: stack informado no prompt)

## 3. Fora de escopo (pelo menos no MVP)

### 3.1. Funcionalidades não previstas

- [ ] **Área autenticada para clientes**: portal de acompanhamento de projetos, painel de histórico, etc. (Decisão pendente: implementar futuramente via better-auth se houver demanda).
- [ ] **Blog ou conteúdo educacional**: artigos, breakdowns de projetos (mencionado no plan.md §1.6 como reforço de autoridade, mas não é MVP).
- [ ] **Múltiplos formulários especializados**: por enquanto, um único formulário de captação geral.
- [ ] **Chat ao vivo ou chatbot**: WhatsApp é opção secundária, sem widget de chat na página.
- [ ] **Sistema de pagamento online**: propostas e pagamentos acontecem offline (email, boleto, PIX, transferência).
- [ ] **Versionamento de proposta ou assinatura digital**: propostas enviadas via PDF/email externo.

(Fonte: inferido de plan.md §3.8 – "WhatsApp: opção secundária"; ausência de menção a blog/conteúdo como entregável imediato)

### 3.2. Integrações não prioritárias

- [ ] **Integração com Slack/Discord/Telegram** para notificações de novo lead (pode ser adicionado depois).
- [ ] **Webhooks genéricos** para ferramentas de automação (Zapier, Make, n8n) — não mencionado no plan.md.
- [ ] **Assinatura de newsletter separada** do formulário principal.

## 4. Restrições e premissas

### 4.1. Restrições

| Restrição | Descrição | Impacto |
|-----------|-----------|---------|
| **Desenvolvedor solo** | Sem equipe; todas decisões e implementação por uma pessoa | Priorização rigorosa de escopo; foco em MVP funcional antes de refinamentos |
| **Prazo curto para sites rápidos** | Clientes esperam entrega rápida (dias, não semanas) | Necessidade de templates/componentes reutilizáveis e processo bem definido |
| **Fases em aplicações sob medida** | Projetos customizados exigem discovery → escopo → protótipo → sprints | Site institucional deve deixar claro esse processo para gerenciar expectativa |
| **Stack obrigatório** | Next.js + Nest.js + Prisma + Tailwind + shadcn/ui + React Hook Form + Zod + Biome + Lefthook + better-auth | Zero flexibilidade de stack; todos requisitos devem ser implementáveis nessa combinação |

(Fonte: plan.md §1.2 – "Prazo curto, escopo bem fechado"; §2.6 – "Processo de trabalho"; stack informado no prompt)

### 4.2. Premissas

| Premissa | Justificativa | Risco se falsa |
|----------|---------------|----------------|
| **Clientes B2B têm budget para tickets médios/altos** | Posicionamento premium; foco em resultado, não em preço | Se atrair apenas clientes de baixo orçamento, pressão por desconto e margem reduzida |
| **Formulário de qualificação reduz curiosos** | Campos de faixa de investimento + urgência filtram leads não sérios | Se formulário for longo demais, pode afastar leads legítimos |
| **Email automático + Calendly acelera agendamento** | Lead recebe próximos passos imediatamente, sem espera | Se link de Calendly não estiver configurado ou falhar, lead pode esfriar |
| **CRM registra leads automaticamente** | Organização e follow-up estruturado | Se integração falhar, leads se perdem ou exigem entrada manual |
| **Idiomas pt-BR/en/es cobrem público-alvo** | Brasil (pt-BR), América Latina (es), clientes internacionais (en) | Se houver demanda significativa em outro idioma, necessário adicionar suporte |

(Fonte: plan.md §1.4 – "Focar em resultados mensuráveis"; §3.7 – "Estratégia de captura de leads qualificados"; §3.6 – "Fluxo ideal do lead")

## 5. Glossário

| Termo | Definição |
|-------|-----------|
| **Lead qualificado** | Contato que preenche formulário completo, incluindo faixa de investimento e indicando urgência real |
| **CTA (Call-to-Action)** | Elemento clicável que convida o usuário a tomar ação (ex.: "Aplicar para projeto", "Agendar diagnóstico") |
| **Site rápido** | Landing page ou site institucional de escopo fechado, com prazo curto e foco em conversão |
| **Aplicação sob medida** | Sistema customizado full-stack (frontend + backend + banco de dados) para resolver problema específico de negócio |
| **Prova social** | Elementos de credibilidade: logos de clientes, depoimentos, casos de uso, números de projetos entregues |
| **MVP (Minimum Viable Product)** | Versão mínima funcional do site, com recursos essenciais para captar e qualificar leads |
| **CRM** | Customer Relationship Management — ferramenta para gerenciar leads, oportunidades e follow-up |

---

**Próximos passos**: Requisitos funcionais detalhados (formulário, email, CRM) estão em 05-functional-requirements.md. Personas e jornadas do usuário estão em 02-personas-and-jtbd.md e 03-user-journeys.md.
