# 06 — Requisitos Não-Funcionais

## 1. NFR-001: Performance de carregamento

### 1.1. Descrição

Garantir carregamento rápido do site para melhorar experiência do usuário e SEO.

### 1.2. Metas mensuráveis

| Métrica | Meta | Método de medição |
|---------|------|-------------------|
| **First Contentful Paint (FCP)** | < 1.5s | Lighthouse, PageSpeed Insights, Web Vitals |
| **Largest Contentful Paint (LCP)** | < 2.5s | idem |
| **Time to Interactive (TTI)** | < 3.5s | idem |
| **Cumulative Layout Shift (CLS)** | < 0.1 | idem |
| **Bundle size (inicial)** | < 200KB (gzipped) | Next.js build analysis |

### 1.3. Estratégias de implementação

- **SSR/SSG com Next.js**: renderização server-side ou geração estática para FCP/LCP rápidos.
- **Code-splitting automático**: Next.js divide código por rota.
- **Otimização de imagens**: usar `next/image` com lazy loading e formatos modernos (WebP, AVIF).
- **Minificação e compressão**: Gzip/Brotli habilitado no servidor.
- **CDN**: deploy em Vercel (CDN global) ou similar.

### 1.4. Origem

(Fonte: plan.md §1.5 – "Performance [...] aparece como benefício secundário"; inferido de "layout responsivo, métricas configuradas, testes básicos de performance" em §1.2)

### 1.5. Impacto no stack

- **Frontend**: Next.js 14+ (App Router com SSR/SSG).
- **Decisões arquiteturais**: usar geração estática (`generateStaticParams`) para páginas de idioma; SSR apenas se necessário para personalização.

---

## 2. NFR-002: Performance de formulário

### 2.1. Descrição

Garantir que formulário responda rapidamente e não trave durante validação ou submissão.

### 2.2. Metas qualitativas

- Validação em tempo real (onBlur) não deve causar lag perceptível.
- Submissão deve iniciar em < 100ms após clicar "Enviar".
- Feedback de loading (spinner) deve aparecer imediatamente.

### 2.3. Estratégias de implementação

- **React Hook Form**: usa uncontrolled components para performance.
- **Debounce em validações assíncronas** (se houver; ex.: verificar email duplicado).
- **Otimistic UI**: desabilitar botão e mostrar spinner imediatamente ao clicar.

### 2.4. Origem

(Fonte: inferido de boas práticas de UX; plan.md §3.5 menciona "Validação em tempo real")

### 2.5. Impacto no stack

- **Frontend**: Next.js + React Hook Form + Zod.

---

## 3. NFR-003: SEO on-page

### 3.1. Descrição

Otimizar site para motores de busca, garantindo indexação correta e visibilidade orgânica.

### 3.2. Metas mensuráveis

| Item | Meta | Método de medição |
|------|------|-------------------|
| **Meta tags** | Todas as páginas com title, description, og:image | Inspeção manual + validador de meta tags |
| **Schema.org markup** | Página principal com Organization schema | Google Rich Results Test |
| **Sitemap.xml** | Gerado e submetido ao Google Search Console | GSC |
| **Robots.txt** | Configurado para permitir crawling | Inspeção manual |
| **URLs amigáveis** | Clean URLs sem query params desnecessários | Inspeção manual |
| **Heading hierarchy** | H1 único por página, H2-H6 estruturados | Lighthouse, validador HTML |

### 3.3. Estratégias de implementação

- **Meta tags dinâmicas**: usar Next.js `Metadata` API.
- **Schema.org**: JSON-LD script com dados de Organization, ofertas, FAQPage.
- **Sitemap**: gerar via `next-sitemap` ou similar.
- **Robots.txt**: criar arquivo estático em `/public/robots.txt`.
- **URLs amigáveis**: rotas Next.js já são clean; i18n via subpaths (`/en`, `/es`).

### 3.4. Origem

(Fonte: plan.md §1.2 – "testes básicos de performance e SEO on-page"; §4.1 – "Foco em posicionamento, SEO on-page básico")

### 3.5. Impacto no stack

- **Frontend**: Next.js (Metadata API, geração de sitemap).

---

## 4. NFR-004: Validação robusta

### 4.1. Descrição

Garantir que dados de formulário sejam validados tanto no frontend quanto no backend, prevenindo submissão de dados inválidos.

### 4.2. Metas qualitativas

- 100% dos campos obrigatórios com validação frontend (React Hook Form + Zod).
- 100% das validações duplicadas no backend (Nest.js + Zod).
- Mensagens de erro claras e amigáveis (ex.: "Email inválido", não "Validation error").

### 4.3. Estratégias de implementação

- **Schema Zod único** compartilhado entre frontend e backend (via pacote compartilhado ou duplicação controlada).
- **Validação em tempo real** (frontend): onBlur para campos individuais.
- **Validação server-side obrigatória** (backend): mesmo se frontend já validou, backend revalida.

### 4.4. Origem

(Fonte: plan.md §3.5 – "Validação em tempo real no formulário (erros claros e amigáveis)")

### 4.5. Impacto no stack

- **Frontend**: Next.js + React Hook Form + Zod.
- **Backend**: Nest.js + Zod.

---

## 5. NFR-005: Segurança básica

### 5.1. Descrição

Proteger formulário e backend contra ataques comuns (spam, injection, CSRF).

### 5.2. Metas qualitativas

- **Validação e sanitização** de todas entradas (frontend + backend).
- **Rate limiting** no endpoint `/api/leads` (ex.: máximo 5 submissões por IP a cada 10 minutos).
- **HTTPS obrigatório** em produção.
- **CORS configurado** corretamente (permitir apenas origem do próprio domínio).
- **Proteção contra SQL injection**: usar Prisma (ORM com queries parametrizadas).

### 5.3. Estratégias de implementação

- **Validação**: Zod server-side (já coberto em NFR-004).
- **Rate limiting**: lib `@nestjs/throttler` no Nest.js.
- **HTTPS**: garantir via Vercel/AWS/Azure (certificado SSL automático).
- **CORS**: configurar `@nestjs/cors` para aceitar apenas domínio de produção.
- **Sanitização**: Prisma já previne SQL injection; para HTML, escapar inputs (se exibidos em algum lugar).

### 5.4. Origem

(Fonte: plan.md §1.6 – "boas práticas de segurança"; inferido de requisito de formulário com dados sensíveis)

### 5.5. Impacto no stack

- **Backend**: Nest.js + Prisma + @nestjs/throttler + @nestjs/cors.
- **Infraestrutura**: SSL via provedor de hospedagem.

---

## 6. NFR-006: Observabilidade e logs

### 6.1. Descrição

Garantir visibilidade de erros, falhas em integrações (email, CRM) e comportamento do sistema para debugging e monitoramento.

### 6.2. Metas qualitativas

- **Logs estruturados** no backend (formato JSON com timestamp, level, message, context).
- **Rastreamento de erros** críticos: falha ao salvar lead, falha ao enviar email, falha ao sincronizar CRM.
- **Alertas** para erros críticos (opcional para MVP; pode ser email automático ou integração com Sentry/Datadog).

### 6.3. Estratégias de implementação

- **Logger**: usar `@nestjs/common` Logger ou lib externa (Winston, Pino).
- **Monitoramento de erro** (opcional): Sentry (frontend + backend).
- **Logs de integração**: sempre logar sucesso/falha de email e CRM com contexto (lead_id, timestamp, erro).

### 6.4. Origem

(Fonte: inferido de necessidade de "registro organizado" em plan.md §3.8; boas práticas para dev solo gerenciar sistema)

### 6.5. Impacto no stack

- **Backend**: Nest.js + lib de logging (Winston/Pino) + opcional Sentry.

---

## 7. NFR-007: Acessibilidade (WCAG 2.1 AA)

### 7.1. Descrição

Garantir que site seja navegável por teclado, acessível a leitores de tela e tenha contraste adequado.

### 7.2. Metas mensuráveis

| Item | Meta | Método de medição |
|------|------|-------------------|
| **Navegação por teclado** | Todos os elementos interativos acessíveis via Tab | Teste manual + Lighthouse |
| **Labels em formulários** | Todos os inputs com `<label>` associado ou `aria-label` | Lighthouse, WAVE |
| **Contraste de cores** | Razão mínima de 4.5:1 para texto normal, 3:1 para texto grande | Lighthouse, Contrast Checker |
| **Alt text em imagens** | Todas as imagens com `alt` descritivo | Lighthouse |
| **ARIA attributes** | Uso correto de `aria-expanded`, `aria-label` onde necessário | Lighthouse, WAVE |

### 7.3. Estratégias de implementação

- **shadcn/ui**: usa Radix UI primitives que já têm acessibilidade embutida.
- **Formulário**: usar `<label htmlFor>` para todos os inputs.
- **Cores**: testar contraste com ferramenta (ex.: WebAIM Contrast Checker) ao escolher paleta.
- **Focus visible**: garantir que outline de foco não seja removido (ou substituído por estilo visível).

### 7.4. Origem

(Fonte: inferido de "layout responsivo" e "boas práticas" em plan.md §1.2)

### 7.5. Impacto no stack

- **Frontend**: Next.js + Tailwind + shadcn/ui (acessibilidade nativa).

---

## 8. NFR-008: Experiência de internacionalização (i18n)

### 8.1. Descrição

Garantir que troca de idioma seja fluida, conteúdo seja traduzido de forma consistente e preferência seja persistida.

### 8.2. Metas qualitativas

- **Seletor de idioma visível** no header em todas as páginas.
- **Persistência de preferência**: idioma selecionado deve ser lembrado em próximas visitas (cookie/localStorage).
- **Detecção automática** (opcional): tentar detectar idioma do navegador na primeira visita.
- **Conteúdo 100% traduzido**: headlines, subheadlines, bullets, CTAs, formulário, FAQ, emails.
- **Rotas amigáveis**: `/en`, `/es` (não `/pt-BR?lang=en`).

### 8.3. Estratégias de implementação

- **Biblioteca**: `next-intl` (integração nativa com Next.js 14+ App Router).
- **Estrutura de arquivos**: `/messages/[locale]/[namespace].json`.
- **Persistência**: middleware do next-intl já gerencia cookie de idioma.
- **Detecção automática**: middleware pode ler `Accept-Language` header.

### 8.4. Origem

(Fonte: requisito de i18n pt-BR/en/es no prompt)

### 8.5. Impacto no stack

- **Frontend**: Next.js + next-intl.
- **Backend**: emails também devem ser traduzidos (template por idioma).

---

## 9. NFR-009: Compatibilidade mobile

### 9.1. Descrição

Garantir que site seja responsivo e funcione bem em dispositivos móveis (smartphones, tablets).

### 9.2. Metas mensuráveis

| Item | Meta | Método de medição |
|------|------|-------------------|
| **Layout responsivo** | Todas as seções adaptam de desktop para mobile | Teste manual em Chrome DevTools responsive mode |
| **Touch targets** | Botões e links com mínimo 44x44px | Lighthouse |
| **Viewport configurado** | `<meta name="viewport" content="width=device-width, initial-scale=1.0">` | Inspeção manual |
| **Formulário mobile-friendly** | Inputs com `type` correto (email, tel), teclado virtual adequado | Teste manual em dispositivo real |

### 9.3. Estratégias de implementação

- **Tailwind CSS**: usar classes responsivas (`sm:`, `md:`, `lg:`).
- **shadcn/ui**: componentes já são responsivos por padrão.
- **Teste**: usar Chrome DevTools + teste em dispositivo real (iOS/Android).

### 9.4. Origem

(Fonte: plan.md §1.2 – "layout responsivo"; inferido de público B2B que pode acessar de mobile)

### 9.5. Impacto no stack

- **Frontend**: Next.js + Tailwind CSS.

---

## 10. NFR-010: Qualidade de código (linting e formatação)

### 10.1. Descrição

Garantir código consistente, legível e livre de erros comuns via linting e formatação automática.

### 10.2. Metas qualitativas

- **Zero erros de linting** antes de commit.
- **Formatação consistente** (indentação, ponto-e-vírgula, aspas).
- **Git hooks** configurados para rodar linter e formatter antes de commit e push.

### 10.3. Estratégias de implementação

- **Biome.js**: substituir ESLint + Prettier por Biome (mais rápido, menos configuração).
- **Lefthook**: configurar hooks `pre-commit` (lint + format) e `pre-push` (type-check + tests se houver).
- **CI/CD** (opcional): rodar lint/format check no pipeline de deploy.

### 10.4. Origem

(Fonte: stack informado no prompt – "Qualidade/devx: Biome.js, Lefthook")

### 10.5. Impacto no stack

- **DevX**: Biome.js + Lefthook.
- **Configuração**: arquivos `.biome.json` e `.lefthook.yml` no root do projeto.

---

## 11. Tabela resumo: Rastreabilidade NFR ↔ FR

| NFR | Título | FR relacionados |
|-----|--------|-----------------|
| NFR-001 | Performance de carregamento | FR-006 (página de obrigado), todos os componentes de seção |
| NFR-002 | Performance de formulário | FR-001 (formulário) |
| NFR-003 | SEO on-page | FR-009, FR-010, FR-012, FR-013, FR-014 (conteúdo das seções) |
| NFR-004 | Validação robusta | FR-001 (formulário frontend), FR-004 (validação server-side) |
| NFR-005 | Segurança básica | FR-002 (backend de submissão), FR-004 (validação) |
| NFR-006 | Observabilidade | FR-002, FR-003, FR-005 (backend + integrações) |
| NFR-007 | Acessibilidade | FR-001, FR-007, FR-009–FR-014 (todos os componentes de UI) |
| NFR-008 | Experiência de i18n | FR-015 (LanguageSwitcher), FR-016 (suporte a i18n) |
| NFR-009 | Compatibilidade mobile | Todos os FRs (todos os componentes devem ser responsivos) |
| NFR-010 | Qualidade de código | Todos os FRs (aplicação geral do projeto) |

---

**Próximos passos**: Especificação de tracking e analytics está em 07-tracking-and-analytics-spec.md. Componentes de UI detalhados estão em 09-ui-component-spec.md.
