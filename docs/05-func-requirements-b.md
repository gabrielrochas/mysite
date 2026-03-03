# 05 — Requisitos Funcionais (Parte B)

## 6. FR-006: Página de obrigado

### 6.1. Descrição

Página exibida após submissão bem-sucedida do formulário, confirmando recebimento e facilitando agendamento de call.

### 6.2. Rota

`/obrigado?name=[Nome do lead]` (query param opcional para personalização)

### 6.3. Conteúdo

- **Título personalizado**: "Obrigado, [Nome]! Seu pedido foi recebido."
- **Subtítulo**: "Você receberá um email em até 24 horas com os próximos passos."
- **CTA primário**: "Agendar chamada agora"
  - Comportamento: embed de Calendly (iframe) ou link que abre em nova aba.
  - URL configurável via variável de ambiente (ex.: `NEXT_PUBLIC_CALENDLY_URL`).
- **CTA secundário**: "Prefere WhatsApp? Clique aqui"
  - Link: `https://wa.me/[numero]?text=Olá, preenchi o formulário no site e gostaria de conversar sobre o projeto`
- **Reforço de credibilidade**: card/bloco com título "O que esperar da chamada" e bullets:
  - Diagnóstico do seu negócio
  - Alinhamento de expectativas
  - Próximos passos claros

### 6.4. Prioridade e dependências

- **Prioridade**: Must (blocker para MVP).
- **Dependências**: FR-001 (redirecionamento após submissão).
- **Impacto no stack**: Frontend only (Next.js).

### 6.5. Origem

(Fonte: plan.md §3.6 – "oferecendo link de Calendly para agendar uma chamada")

---

## 7. FR-007: CTA primário e secundário

### 7.1. Descrição

Botões de call-to-action estrategicamente posicionados em múltiplas seções do site para maximizar conversão.

### 7.2. Posicionamentos

| Localização | Tipo | Texto sugerido | Comportamento |
|-------------|------|----------------|---------------|
| **Hero Section** | Primário | "Aplicar para projeto" ou "Agendar diagnóstico estratégico" | Abre modal de formulário **ou** rola suave para âncora #formulario |
| **Hero Section** | Secundário | "Ver casos de uso" | Rola suave para #casos-de-uso |
| **Seção de Serviços** | Primário (por card) | "Quero um site rápido" / "Quero uma aplicação sob medida" | Abre formulário pré-preenchido com `project_type` correspondente |
| **CTA final** | Primário | "Aplicar para projeto" | Abre modal de formulário |
| **Header fixo** | Primário | "Aplicar para projeto" | Abre modal de formulário (sempre visível) |

### 7.3. Estilos (Tailwind CSS + shadcn/ui)

**CTA primário**:
- Componente: `<Button variant="default" size="lg">`
- Cores: usar design system do shadcn (ex.: `bg-primary text-primary-foreground`)
- Hover: leve elevação (shadow) e escurecimento

**CTA secundário**:
- Componente: `<Button variant="outline" size="lg">`
- Cores: borda e texto primary, fundo transparente

### 7.4. Prioridade e dependências

- **Prioridade**: Must (blocker para MVP).
- **Dependências**: FR-001 (formulário), FR-008 (modal de formulário se aplicável).
- **Impacto no stack**: Frontend only (Next.js + Tailwind + shadcn/ui).

### 7.5. Origem

(Fonte: plan.md §2.2 – "CTA primário e secundário"; §2.10 – "CTA final forte")

---

## 8. FR-008: Modal de formulário (opcional)

### 8.1. Descrição

Modal/dialog que abre o formulário (FR-001) ao clicar em CTAs, permitindo que usuário preencha sem sair da página atual.

**Decisão pendente**: usar modal **ou** scroll suave para âncora #formulario inline na página.

**Prós/Contras**:
| Opção | Prós | Contras |
|-------|------|---------|
| **Modal** | Menos distração, foco total no formulário | Pode ser invasivo; usuário perde contexto da página |
| **Scroll inline** | Mantém contexto; usuário pode reler seções | Formulário ocupa muito espaço vertical na página |

**Recomendação para MVP**: scroll inline (mais simples; menos JavaScript). Modal pode ser adicionado depois se necessário.

### 8.2. Prioridade e dependências

- **Prioridade**: Could (nice-to-have; não blocker).
- **Dependências**: FR-001 (formulário).
- **Impacto no stack**: Frontend only (Next.js + shadcn/ui Dialog component).

### 8.3. Origem

(Fonte: inferido de boas práticas de UX de captação de leads)

---

## 9. FR-009: Prova social (mini-bloco)

### 9.1. Descrição

Seção curta logo após Hero com elementos de credibilidade: números de projetos entregues, logos de clientes (se permitido), ou nomes de segmentos atendidos.

### 9.2. Conteúdo sugerido

**Opção A** (números):
- "12 projetos entregues em 2024"
- "95% dos clientes renovam manutenção"

**Opção B** (logos/nomes):
- Logos de 3–5 clientes (se houver permissão)
- Ou texto: "Projetos entregues para empresas de [segmentos]"

### 9.3. Componente

`<SocialProofBar>` com props:
- `type`: "numbers" | "logos" | "text"
- `items`: array de objetos { text, icon, image }

### 9.4. Prioridade e dependências

- **Prioridade**: Should (importante para credibilidade, mas não blocker técnico).
- **Dependências**: Nenhuma.
- **Impacto no stack**: Frontend only (Next.js + Tailwind).

### 9.5. Origem

(Fonte: plan.md §2.3 – "Prova social rápida")

---

## 10. FR-010: Casos de uso (cards)

### 10.1. Descrição

Seção com 3 cards apresentando problemas concretos resolvidos, organizados por tipo de cliente.

### 10.2. Estrutura de cada card

- **Título**: tipo de cliente (ex.: "Pequenas empresas", "Startups", "Empresas com sistema interno")
- **Descrição**: exemplo de projeto (ex.: "Landing de serviços, site institucional com captação, sistema de agendamento")
- **Gatilhos**: bullets com gatilhos (ex.: "Captar clientes", "Validar oferta", "Presença digital profissional")
- **Ícone/ilustração**: opcional

### 10.3. Componente

`<UseCaseCard>` com props:
- `title`: string
- `description`: string
- `triggers`: string[]
- `icon`: optional React node

### 10.4. Prioridade e dependências

- **Prioridade**: Must (essencial para conversão; facilita identificação).
- **Dependências**: Nenhuma.
- **Impacto no stack**: Frontend only (Next.js + Tailwind + shadcn/ui Card).

### 10.5. Origem

(Fonte: plan.md §2.5 – "Casos de uso")

---

## 11. FR-011: Processo de trabalho (timeline)

### 11.1. Descrição

Seção visual mostrando as 6 etapas do processo de trabalho, transmitindo segurança e previsibilidade.

### 11.2. Etapas

1. **Diagnóstico**: Chamada para entender negócio e objetivo (30–45 min).
2. **Proposta e escopo**: Envio de proposta estruturada (até 3 dias).
3. **Protótipo**: Wireframes ou layout para validação.
4. **Desenvolvimento**: Iteração em sprints curtos (1–2 semanas).
5. **Entrega e ajustes finais**: Revisão, testes, documentação.
6. **Acompanhamento inicial / suporte**: Período de garantia + opção de manutenção.

### 11.3. Componente

`<ProcessTimeline>` com props:
- `steps`: array de objetos { title, description, duration }

**Layout**: cards numerados ou timeline vertical/horizontal com conectores.

### 11.4. Prioridade e dependências

- **Prioridade**: Must (transmite autoridade e reduz objeções).
- **Dependências**: Nenhuma.
- **Impacto no stack**: Frontend only (Next.js + Tailwind).

### 11.5. Origem

(Fonte: plan.md §2.6 – "Processo de trabalho")

---

## 12. FR-012: Seção de tecnologias

### 12.1. Descrição

Grid de logos das tecnologias principais usadas, com descrição curta reforçando competência técnica.

### 12.2. Conteúdo

**Headline**: "Tecnologia moderna e manutenível"

**Descrição**: "Uso tecnologias consolidadas e boas práticas para garantir performance, segurança e facilidade de manutenção."

**Logos** (grid responsivo):
- React, Next.js, Tailwind CSS
- Node.js, Nest.js
- PostgreSQL (ou banco usado)
- Vercel/AWS (cloud usado)
- Ícones de integrações (REST APIs, webhooks)

### 12.3. Componente

`<TechnologyGrid>` com props:
- `technologies`: array de objetos { name, logo, category }

### 12.4. Prioridade e dependências

- **Prioridade**: Should (reforça credibilidade técnica, mas não é blocker).
- **Dependências**: Nenhuma.
- **Impacto no stack**: Frontend only (Next.js + Tailwind).

### 12.5. Origem

(Fonte: plan.md §2.7 – "Tecnologias")

---

## 13. FR-013: Depoimentos (cards ou carrossel)

### 13.1. Descrição

Seção com 2–4 depoimentos contextualizados de clientes, mostrando problema, solução e resultado.

### 13.2. Estrutura de cada depoimento

- **Nome do cliente** + foto (opcional)
- **Tipo de negócio** (ex.: "Fundadora de startup de logística")
- **Problema**: 1 frase
- **Resultado**: 1 frase com métrica ou resultado qualitativo
- **Quote**: 1–2 frases de depoimento

### 13.3. Componente

`<TestimonialCard>` com props:
- `name`: string
- `role`: string
- `company`: string
- `problem`: string
- `result`: string
- `quote`: string
- `photo`: optional string (URL)

**Layout**: cards lado a lado (desktop) ou carrossel (mobile).

### 13.4. Prioridade e dependências

- **Prioridade**: Should (forte impacto em conversão, mas depende de ter depoimentos reais).
- **Dependências**: Conteúdo (depoimentos de clientes reais).
- **Impacto no stack**: Frontend only (Next.js + Tailwind + shadcn/ui Carousel se aplicável).

### 13.5. Origem

(Fonte: plan.md §2.8 – "Depoimentos")

---

## 14. FR-014: FAQ (accordion)

### 14.1. Descrição

Seção com 5–6 perguntas frequentes em formato accordion (expansível), abordando objeções comuns.

### 14.2. Perguntas e respostas

Ver conteúdo detalhado em 08-content-spec.md. Resumo:
1. Quanto custa?
2. Qual o prazo?
3. Como funciona o pagamento?
4. E se eu não souber definir o escopo?
5. Vocês dão suporte após entrega?
6. (Opcional) Por que não usar plataforma pronta?

### 14.3. Componente

`<FAQAccordion>` com props:
- `items`: array de objetos { question, answer }

**Comportamento**: clicar na pergunta expande/recolhe resposta (shadcn/ui Accordion).

### 14.4. Prioridade e dependências

- **Prioridade**: Must (reduz objeções e melhora conversão).
- **Dependências**: Nenhuma.
- **Impacto no stack**: Frontend only (Next.js + shadcn/ui Accordion).

### 14.5. Origem

(Fonte: plan.md §2.9 – "FAQ estratégico")

---

## 15. FR-015: Seletor de idioma (LanguageSwitcher)

### 15.1. Descrição

Componente no header para trocar entre pt-BR, en, es.

### 15.2. Comportamento

- **Exibição**: dropdown ou botões com ícones de bandeiras (🇧🇷 🇺🇸 🇪🇸) + siglas (PT, EN, ES).
- **Ao clicar**: recarrega página na rota correspondente (`/`, `/en`, `/es`) **ou** atualiza conteúdo via context sem reload.
- **Persistência**: salvar preferência em `localStorage` ou cookie.
- **Detecção automática** (opcional): usar `navigator.language` na primeira visita; se não suportado, fallback para pt-BR.

### 15.3. Evento de tracking

`language_change` disparado ao trocar idioma manualmente (propriedades: `from_language`, `to_language`).

### 15.4. Prioridade e dependências

- **Prioridade**: Must (requisito de i18n pt-BR/en/es).
- **Dependências**: Implementação de i18n (next-intl ou react-i18next).
- **Impacto no stack**: Frontend only (Next.js + lib de i18n).

### 15.5. Origem

(Fonte: requisito de i18n no prompt)

---

## 16. FR-016: Suporte a i18n (pt-BR, en, es)

### 16.1. Descrição

Tradução completa do conteúdo do site (headlines, subheadlines, bullets, CTAs, formulário, FAQ) em 3 idiomas.

### 16.2. Estratégia

- **Biblioteca**: `next-intl` (recomendado para Next.js 14+ App Router) ou `react-i18next`.
- **Estrutura de arquivos**: `/messages/[locale]/[namespace].json` (ver detalhes em 04-info-architecture.md).
- **Rotas**: subpaths (`/`, `/en`, `/es`).

### 16.3. Namespaces principais

- `common`: header, footer, CTAs genéricos
- `hero`, `services`, `use-cases`, `process`, `technologies`, `testimonials`, `faq`, `form`

### 16.4. Prioridade e dependências

- **Prioridade**: Must (requisito do prompt).
- **Dependências**: FR-015 (LanguageSwitcher), conteúdo traduzido (08-content-spec.md).
- **Impacto no stack**: Full-stack (Next.js frontend + backend se emails forem traduzidos).

### 16.5. Origem

(Fonte: stack informado no prompt – "i18n: pt-BR, en, es")

---

## 17. Tabela resumo: Rastreabilidade FR ↔ NFR ↔ Histórias

| FR | Título | NFR relacionados | Histórias relacionadas (backlog) |
|----|--------|------------------|----------------------------------|
| FR-001 | Formulário de captação (frontend) | NFR-004 (validação), NFR-007 (acessibilidade) | US-003, US-004 |
| FR-002 | Backend de submissão | NFR-005 (segurança), NFR-006 (observabilidade) | US-005 |
| FR-003 | Envio de email automático | NFR-006 (observabilidade) | US-006 |
| FR-004 | Validação server-side (Zod) | NFR-005 (segurança) | US-005 |
| FR-005 | Integração com CRM | NFR-006 (observabilidade) | US-007 |
| FR-006 | Página de obrigado | NFR-002 (performance), NFR-007 (acessibilidade) | US-008 |
| FR-007 | CTA primário/secundário | NFR-007 (acessibilidade) | US-001, US-002 |
| FR-009 | Prova social | NFR-003 (SEO) | US-002 |
| FR-010 | Casos de uso | NFR-003 (SEO), NFR-007 (acessibilidade) | US-002 |
| FR-011 | Processo de trabalho | NFR-007 (acessibilidade) | US-002 |
| FR-012 | Seção de tecnologias | NFR-003 (SEO) | US-002 |
| FR-013 | Depoimentos | NFR-003 (SEO), NFR-007 (acessibilidade) | US-002 |
| FR-014 | FAQ | NFR-003 (SEO), NFR-007 (acessibilidade) | US-002 |
| FR-015 | Seletor de idioma | NFR-008 (i18n) | US-009 |
| FR-016 | Suporte a i18n | NFR-008 (i18n) | US-009, US-010 |

---

**Próximos passos**: Requisitos não-funcionais detalhados estão em 06-non-functional-requirements.md. Backlog com histórias de usuário está em 11-backlog.md.
