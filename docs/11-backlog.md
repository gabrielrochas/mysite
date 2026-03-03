# 11 — Backlog (Épicos e Histórias)

## 1. Estrutura do backlog

**Priorização**: Por valor/risco (MoSCoW) e dependências técnicas.

**Formato**:
- **Épico** (E-001): agrupamento de funcionalidades relacionadas
- **Feature** (F-001): funcionalidade de alto nível dentro do épico
- **História** (US-001): unidade de trabalho implementável com critérios de aceite em Gherkin

**Rastreabilidade**: Cada história referencia FR/NFR correspondentes.

---

## ÉPICO 1: MVP do site institucional (pt-BR)

**Objetivo**: Entregar versão mínima viável do site em português com captura de lead funcional.

**Prioridade**: Must have

**Features**:
- F-001: Estrutura de páginas e rotas
- F-002: Seções de conteúdo
- F-003: Formulário de captura de lead

---

### F-001: Estrutura de páginas e rotas

#### US-001: Criação da página principal (pt-BR)

**Descrição**: Como visitante, quero acessar a página principal do site para conhecer os serviços oferecidos.

**Prioridade**: Must have

**Critérios de aceite**:
```gherkin
Scenario: Acesso à página principal
  Given que estou na URL "/"
  When a página carrega
  Then devo ver o header com logo e menu
  And devo ver a seção hero com headline e CTA
  And devo ver a seção de serviços
  And devo ver o footer
```

**Referências**: FR-006 (Página principal), NFR-001 (Performance)

**Stack**: Next.js (App Router), Tailwind CSS, shadcn/ui

---

#### US-002: Criação da página de obrigado

**Descrição**: Como lead que enviou o formulário, quero ver uma página de confirmação com próximos passos.

**Prioridade**: Must have

**Critérios de aceite**:
```gherkin
Scenario: Página de obrigado após submissão
  Given que submeti o formulário com sucesso
  When sou redirecionado para "/obrigado"
  Then devo ver mensagem de confirmação ("Obrigado, recebemos seu contato")
  And devo ver informações dos próximos passos ("Você receberá email em até 24h")
  And devo ver CTA secundário ("Chamar no WhatsApp")
```

**Referências**: FR-004 (Página de obrigado)

**Stack**: Next.js (App Router), Tailwind CSS

---

### F-002: Seções de conteúdo

#### US-003: Implementação da seção hero

**Descrição**: Como visitante, quero ver uma seção hero clara e atraente ao entrar no site para entender rapidamente o valor da oferta.

**Prioridade**: Must have

**Critérios de aceite**:
```gherkin
Scenario: Hero com headline e CTAs
  Given que estou na página principal
  When a seção hero carrega
  Then devo ver h1 com headline principal
  And devo ver subheadline explicando a oferta
  And devo ver CTA primário ("Aplicar para projeto")
  And devo ver CTA secundário ("Ver casos de uso")
  And ao clicar no CTA primário, devo ser levado ao formulário (scroll suave)
```

**Referências**: FR-007 (CTA), 04-info-architecture.md §2.1

**Stack**: SectionHero component (Next.js, Tailwind)

---

#### US-004: Implementação da seção de serviços

**Descrição**: Como visitante, quero ver detalhes dos dois serviços ("Sites rápidos" e "Aplicações sob medida") para escolher o que faz sentido para mim.

**Prioridade**: Must have

**Critérios de aceite**:
```gherkin
Scenario: Seção de serviços com 2 cards
  Given que estou na página principal
  When rolo até a seção de serviços
  Then devo ver 2 cards lado a lado (desktop) ou empilhados (mobile)
  And cada card deve ter título, descrição, bullets e CTA
  And ao clicar no CTA de um card, devo ser levado ao formulário
```

**Referências**: FR-008 (Seção de serviços), 09-ui-component-spec.md §2.3

**Stack**: ServiceCard component, Tailwind Grid

---

#### US-005: Implementação da seção de casos de uso

**Descrição**: Como visitante, quero ver exemplos de casos de uso para me identificar com uma das situações e sentir que a solução serve para mim.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Casos de uso por persona
  Given que estou na página principal
  When rolo até a seção de casos de uso
  Then devo ver 3 cards com títulos por tipo de cliente
  And cada card deve ter descrição e gatilhos (bullets)
  And não deve haver CTA dentro dos cards (apenas conteúdo informativo)
```

**Referências**: FR-010 (Casos de uso)

**Stack**: UseCaseCard component

---

#### US-006: Implementação da seção de processo

**Descrição**: Como visitante, quero entender como funciona o processo de trabalho para ter transparência antes de entrar em contato.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Timeline do processo
  Given que estou na página principal
  When rolo até a seção de processo
  Then devo ver timeline com 6 etapas
  And cada etapa deve ter título e descrição
  And etapas devem estar numeradas (1-6)
```

**Referências**: FR-011 (Processo)

**Stack**: ProcessTimeline component

---

#### US-007: Implementação da seção FAQ

**Descrição**: Como visitante, quero ver respostas para perguntas frequentes antes de contatar para reduzir objeções.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Accordion de FAQ
  Given que estou na página principal
  When rolo até a seção FAQ
  Then devo ver accordion com pelo menos 6 perguntas
  And ao clicar em uma pergunta, ela expande mostrando resposta
  And ao clicar novamente, ela recolhe
  And apenas 1 item pode estar expandido por vez
```

**Referências**: FR-014 (FAQ)

**Stack**: FAQAccordion (shadcn/ui Accordion)

---

### F-003: Formulário de captura de lead

#### US-008: Formulário principal (campos e validação)

**Descrição**: Como visitante interessado, quero preencher um formulário simples e enviar meus dados para iniciar contato.

**Prioridade**: Must have

**Critérios de aceite**:
```gherkin
Scenario: Validação de campos obrigatórios
  Given que estou no formulário
  When deixo campo "Nome" vazio
  And clico em "Enviar"
  Then devo ver mensagem de erro "Nome deve ter pelo menos 3 caracteres"

Scenario: Validação de email
  Given que estou no formulário
  When preencho campo "Email" com "emailinvalido"
  And clico em "Enviar"
  Then devo ver mensagem de erro "Email inválido"

Scenario: Validação de tipo de projeto
  Given que estou no formulário
  When não seleciono nenhuma opção em "Tipo de projeto"
  And clico em "Enviar"
  Then devo ver mensagem de erro "Campo obrigatório"

Scenario: Submissão bem-sucedida
  Given que preenchi todos os campos obrigatórios corretamente
  When clico em "Enviar"
  Then devo ver indicador de loading no botão
  And após resposta do backend, devo ser redirecionado para "/obrigado"
```

**Referências**: FR-001 (Formulário), 05-functional-requirements.md §1.1

**Stack**: React Hook Form, Zod, FormField component

---

#### US-009: Submissão do formulário (integração backend)

**Descrição**: Como sistema, quero enviar dados do formulário para o backend Nest.js para processamento.

**Prioridade**: Must have

**Critérios de aceite**:
```gherkin
Scenario: POST para endpoint /api/leads
  Given que o usuário preencheu o formulário
  When clica em "Enviar"
  Then devo fazer POST para ${NEXT_PUBLIC_BACKEND_URL}/api/leads
  And enviar JSON com campos: name, email, whatsapp, company, goal, project_type, investment_range, urgency, description, language

Scenario: Tratamento de erro de rede
  Given que o backend está offline
  When faço POST
  Then devo exibir AlertBanner com mensagem "Erro ao enviar. Tente novamente."
  And não devo redirecionar usuário

Scenario: Tratamento de erro de validação
  Given que o backend retorna status 400 com erro de validação
  When recebo resposta
  Then devo exibir mensagem de erro específica do campo
```

**Referências**: FR-002 (Backend de submissão)

**Stack**: Next.js (fetch), Nest.js (POST handler)

---

#### US-010: Envio de email automático

**Descrição**: Como lead que enviei o formulário, quero receber um email de confirmação com próximos passos em até 24 horas.

**Prioridade**: Must have

**Critérios de aceite**:
```gherkin
Scenario: Email enviado após submissão
  Given que o lead foi criado no banco
  When o backend processa a solicitação
  Then devo enviar email para o endereço fornecido
  And email deve conter saudação personalizada ("Olá, [Nome]")
  And email deve conter link para agendar chamada (Calendly)
  And email deve conter link para WhatsApp

Scenario: Registro de envio de email
  Given que email foi enviado com sucesso
  Then devo atualizar campo email_sent = true no banco
  
Scenario: Falha no envio de email
  Given que serviço de email falhou
  Then devo logar erro no servidor
  And devo manter email_sent = false
  And não devo bloquear resposta ao frontend
```

**Referências**: FR-003 (Email automático)

**Stack**: Nest.js (EmailService), Nodemailer, Prisma

---

#### US-011: Integração com CRM

**Descrição**: Como sistema, quero registrar lead automaticamente no CRM para centralizar gestão de contatos.

**Prioridade**: Must have

**Critérios de aceite**:
```gherkin
Scenario: Lead sincronizado com CRM
  Given que lead foi criado no banco
  When backend processa solicitação
  Then devo enviar dados para API do CRM (HubSpot, Pipedrive, etc.)
  And devo mapear campos: name → firstname/lastname, email, phone, company, custom_fields
  And devo atualizar crm_synced = true após sucesso

Scenario: Falha na sincronização
  Given que API do CRM está offline
  Then devo logar erro
  And devo manter crm_synced = false para retry posterior
  And não devo bloquear resposta ao frontend
```

**Referências**: FR-005 (Integração CRM)

**Stack**: Nest.js (CrmService), Axios, Prisma

---

## ÉPICO 2: Prova social e otimização de conversão

**Objetivo**: Aumentar credibilidade e reduzir objeções com prova social.

**Prioridade**: Should have

**Features**:
- F-004: Prova social
- F-005: Depoimentos

---

### F-004: Prova social

#### US-012: Seção de prova social (números/logos)

**Descrição**: Como visitante, quero ver indicadores de credibilidade (projetos entregues, clientes, etc.) para confiar no serviço.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Barra de prova social
  Given que estou na página principal
  When a seção hero carrega
  Then devo ver barra com 2-3 itens de prova social
  And itens podem ser números ("12 projetos entregues") ou texto ("95% dos clientes renovam")
```

**Referências**: FR-009 (Prova social)

**Stack**: SocialProofBar component

---

### F-005: Depoimentos

#### US-013: Seção de depoimentos

**Descrição**: Como visitante, quero ler depoimentos de outros clientes para me sentir mais confiante.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Cards de depoimentos
  Given que estou na página principal
  When rolo até seção de depoimentos
  Then devo ver 2-3 cards com nome, empresa, problema, resultado e quote
  And em mobile, devo poder fazer swipe entre cards (carrossel)
```

**Referências**: FR-013 (Depoimentos)

**Stack**: TestimonialCard component, swiper (opcional)

---

## ÉPICO 3: Internacionalização (i18n)

**Objetivo**: Suportar múltiplos idiomas (en, es) além de pt-BR.

**Prioridade**: Should have

**Features**:
- F-006: Rotas e comutação de idioma
- F-007: Tradução de conteúdo

---

### F-006: Rotas e comutação de idioma

#### US-014: Rotas i18n (/en, /es)

**Descrição**: Como visitante, quero acessar o site em inglês ou espanhol via URL.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Acesso à versão em inglês
  Given que acesso URL "/en"
  When a página carrega
  Then todo o conteúdo deve estar em inglês
  And header, CTAs, formulário devem estar traduzidos

Scenario: Acesso à versão em espanhol
  Given que acesso URL "/es"
  When a página carrega
  Then todo o conteúdo deve estar em espanhol
```

**Referências**: FR-016 (Suporte a i18n)

**Stack**: next-intl (middleware, generateStaticParams)

---

#### US-015: Seletor de idioma (LanguageSwitcher)

**Descrição**: Como visitante, quero mudar o idioma do site sem sair da página.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Troca de idioma via seletor
  Given que estou em "/"
  When clico no seletor de idioma no header
  And seleciono "English"
  Then devo ser redirecionado para "/en"
  And minha preferência deve ser salva em cookie

Scenario: Tracking de troca de idioma
  Given que troquei o idioma
  Then devo disparar evento `language_change` com propriedades: from=pt-BR, to=en
```

**Referências**: FR-015 (LanguageSwitcher), 07-tracking-spec.md §2.2

**Stack**: LanguageSwitcher component, next-intl, localStorage

---

### F-007: Tradução de conteúdo

#### US-016: Arquivos de tradução (JSON)

**Descrição**: Como desenvolvedor, quero organizar traduções em arquivos JSON para facilitar manutenção.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Estrutura de pastas de tradução
  Given que estou no projeto
  Then devo ter pasta /messages com subpastas /pt-BR, /en, /es
  And cada subpasta deve ter: common.json, hero.json, form.json, faq.json
  And cada JSON deve conter chaves traduzidas (ex.: "headline_v1", "cta_primary")
```

**Referências**: NFR-008 (Experiência de i18n), 08-content-spec.md §9

**Stack**: next-intl, JSON

---

## ÉPICO 4: Analytics e tracking

**Objetivo**: Implementar eventos de tracking para qualificar leads e otimizar funil.

**Prioridade**: Should have

**Features**:
- F-008: Eventos de tracking

---

### F-008: Eventos de tracking

#### US-017: Evento page_view

**Descrição**: Como sistema, quero registrar page_view sempre que página carrega.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Page view na página principal
  Given que usuário acessa "/"
  When página carrega
  Then devo disparar evento `page_view` com propriedades: page_path="/", language="pt-BR"
```

**Referências**: 07-tracking-spec.md §2.1

**Stack**: Next.js (useEffect), Google Analytics/Segment

---

#### US-018: Evento CTA_click

**Descrição**: Como sistema, quero rastrear cliques em CTAs para entender quais seções geram mais conversões.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Clique em CTA do hero
  Given que estou no hero
  When clico em "Aplicar para projeto"
  Then devo disparar evento `CTA_click` com: cta_location="hero", cta_text="Aplicar para projeto"
```

**Referências**: 07-tracking-spec.md §2.3

**Stack**: CTAButton component (onClick handler)

---

#### US-019: Eventos do formulário (form_start, form_submit)

**Descrição**: Como sistema, quero rastrear início e submissão de formulário para identificar taxa de abandono.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Início do formulário
  Given que usuário clica no primeiro campo do formulário
  Then devo disparar evento `form_start`

Scenario: Submissão com sucesso
  Given que formulário foi submetido com sucesso
  Then devo disparar evento `form_submit_success` com: project_type, investment_range, urgency

Scenario: Erro na submissão
  Given que houve erro na submissão
  Then devo disparar evento `form_submit_fail` com: error_type
```

**Referências**: 07-tracking-spec.md §2.4, §2.5

**Stack**: FormStep component (tracking hooks)

---

## ÉPICO 5: Performance e SEO

**Objetivo**: Otimizar performance e SEO on-page para posicionamento orgânico.

**Prioridade**: Should have

**Features**:
- F-009: Performance
- F-010: SEO on-page

---

### F-009: Performance

#### US-020: Core Web Vitals (LCP < 2.5s)

**Descrição**: Como sistema, quero garantir que LCP (Largest Contentful Paint) seja < 2.5s para boa experiência de usuário.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Medição de LCP
  Given que acesso página principal
  When página carrega completamente
  Then LCP deve ser < 2.5s (medido via Lighthouse)

Scenario: Otimizações aplicadas
  Then imagens devem usar formato WebP
  And fontes devem usar font-display: swap
  And CSS crítico deve estar inline (se aplicável)
```

**Referências**: NFR-001 (Performance), NFR-002 (Core Web Vitals)

**Stack**: Next.js (SSG, Image Optimization), Lighthouse

---

### F-010: SEO on-page

#### US-021: Meta tags e Open Graph

**Descrição**: Como sistema, quero incluir meta tags corretas em todas as páginas para melhorar SEO.

**Prioridade**: Should have

**Critérios de aceite**:
```gherkin
Scenario: Meta tags na página principal
  Given que acesso "/"
  Then devo ver <title> descritivo ("Aplicações web sob medida | [Nome]")
  And devo ver <meta name="description"> com resumo da oferta
  And devo ver Open Graph tags (og:title, og:description, og:image)
  And devo ver tag canonical (<link rel="canonical">)
```

**Referências**: NFR-003 (SEO on-page)

**Stack**: Next.js Metadata API

---

## ÉPICO 6: Qualidade e DevX

**Objetivo**: Configurar ferramentas de qualidade para manter codebase saudável.

**Prioridade**: Could have (importante mas não bloqueia MVP)

**Features**:
- F-011: Lint e format (Biome.js)
- F-012: Git hooks (Lefthook)

---

### F-011: Lint e format

#### US-022: Configuração de Biome.js

**Descrição**: Como desenvolvedor, quero rodar lint e format automaticamente para manter código consistente.

**Prioridade**: Could have

**Critérios de aceite**:
```gherkin
Scenario: Lint verifica erros
  Given que alterei código
  When rodo `npm run lint`
  Then Biome.js deve reportar erros de sintaxe e regras

Scenario: Format corrige estilo
  Given que alterei código
  When rodo `npm run format`
  Then Biome.js deve aplicar indentação e espaçamento corretos
```

**Referências**: NFR-010 (Qualidade de código)

**Stack**: Biome.js

---

### F-012: Git hooks

#### US-023: Pre-commit hook

**Descrição**: Como desenvolvedor, quero que lint e format rodem automaticamente antes de commit.

**Prioridade**: Could have

**Critérios de aceite**:
```gherkin
Scenario: Hook pre-commit
  Given que alterei código
  When faço `git commit`
  Then Lefthook deve rodar lint e format
  And se houver erro, commit deve ser abortado
```

**Referências**: NFR-010

**Stack**: Lefthook

---

## Resumo de priorização

| Épico | Prioridade | Justificativa |
|-------|-----------|---------------|
| E-001: MVP do site (pt-BR) | Must have | Base funcional; site precisa estar no ar para validar oferta |
| E-002: Prova social | Should have | Aumenta conversão; mas site pode funcionar sem |
| E-003: i18n (en, es) | Should have | Aumenta alcance; mas pt-BR cobre mercado inicial |
| E-004: Analytics | Should have | Essencial para otimização; mas não bloqueia lançamento |
| E-005: Performance/SEO | Should have | Importante para long-term; mas MVP pode lançar sem perfeição |
| E-006: Qualidade/DevX | Could have | Melhora manutenção; mas não afeta usuário final |

---

## Ordem sugerida de implementação

**Sprint 1 (MVP pt-BR)**:
- US-001, US-002, US-003, US-004, US-008, US-009, US-010, US-011

**Sprint 2 (Conteúdo e conversão)**:
- US-005, US-006, US-007, US-012, US-013

**Sprint 3 (i18n)**:
- US-014, US-015, US-016

**Sprint 4 (Analytics e otimização)**:
- US-017, US-018, US-019, US-020, US-021

**Sprint 5 (Qualidade)**:
- US-022, US-023

---

**Observação**: Histórias podem ser quebradas em tarefas menores durante planning. Critérios de aceite devem ser revisados com stakeholder antes de iniciar sprint.
