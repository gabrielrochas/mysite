# 00 — Visão do Produto

## 1. Problema e solução

### 1.1. Problema que o produto resolve

Desenvolvedores solo que vendem serviços de desenvolvimento web enfrentam três desafios principais:

1. **Percepção de commodity**: serem vistos como "quem faz site barato" e competir apenas por preço.
2. **Falta de clareza de oferta**: não conseguir diferenciar entre sites rápidos e aplicações sob medida, gerando expectativas confusas.
3. **Baixa conversão de leads**: atrair contatos não qualificados ("só quero saber o preço") que consomem tempo sem fechar projeto.

(Fonte: plan.md §1.2 – "Vender sites rápidos sem parecer barato"; §1.4 – "Como evitar competir apenas por preço")

### 1.2. Solução proposta

Um site institucional que posiciona o desenvolvedor como **especialista em produtos digitais sob medida**, capaz de:

- Apresentar duas ofertas distintas com escopo claro: **Sites rápidos** (validação/conversão) e **Aplicações web sob medida** (automação/eficiência).
- Capturar leads qualificados via formulário estruturado com campos de filtro (faixa de investimento, urgência, tipo de projeto).
- Transmitir autoridade via processo transparente, casos de uso concretos, stack moderna (React + Node.js) e depoimentos contextualizados.

(Fonte: plan.md §1.1 – "Posição central na mente do cliente"; §3.7 – "Estratégia de captura de leads qualificados")

### 1.3. Para quem

**Público-alvo principal (B2B)**:

- Donos de pequenas empresas de serviços, clínicas, pequenas indústrias que precisam de site institucional ou landing page para captar clientes.
- Startups e scale-ups que necessitam de sistemas internos, CRMs customizados, dashboards operacionais ou plataformas B2B.
- Gestores de operação que querem eliminar planilhas e processos manuais via automação.

(Fonte: plan.md §1.3 – "Atrair clientes de aplicações web customizadas"; §2.5 – "Casos de uso")

## 2. Posicionamento e mensagens-chave

### 2.1. Declaração de posicionamento

> **"Não vendo páginas, vendo ativos digitais que geram receita e eficiência."**

O site posiciona o desenvolvedor como **consultor de produto digital**, não como "programador de site". Foco em:

- **Visão estratégica de produto + conversão**, apoiada em tecnologia moderna (React, Node.js, boas práticas) como prova de competência.
- **Velocidade + método + conversão** para sites rápidos.
- **Resultado mensurável** (leads gerados, tempo economizado, erros reduzidos) para aplicações sob medida.

(Fonte: plan.md §1.1 – "Posição central"; §1.5 – "Ângulo de diferenciação principal")

### 2.2. Mensagens-chave por oferta

#### Sites rápidos

- **Pacotes com escopo claro e foco em conversão**: "Landing page para captar leads qualificados em até X dias, já pronta para tráfego pago."
- **Baseados em processo**: diagnóstico rápido, definição de oferta, copy, design, implementação, publicação e acompanhamento inicial.
- **Entregáveis profissionais**: layout responsivo, métricas configuradas (Analytics, Pixel), testes básicos de performance e SEO on-page, documentação mínima.

(Fonte: plan.md §1.2 – "Vender sites rápidos sem parecer barato")

#### Aplicações web sob medida

- **Solução para problemas específicos de negócio**: eliminar planilhas confusas, centralizar operações, criar dashboards, CRMs, portais de clientes.
- **Sites rápidos como porta de entrada**: após validar oferta via landing page, cliente naturalmente enxerga necessidade de sistema mais robusto.
- **Foco em eficiência, redução de erro, controle e visibilidade em tempo real**.

(Fonte: plan.md §1.3 – "Atrair clientes de aplicações web customizadas"; §2.5 – "Casos de uso")

## 3. Métricas de sucesso

### 3.1. Métricas de negócio

| Métrica | Definição | Meta inicial |
|---------|-----------|--------------|
| Taxa de conversão de visitante para lead | % de visitantes únicos que preenchem formulário | Qualitativa: melhorar a qualificação de leads (menos contatos "só quero preço") |
| Taxa de qualificação de lead | % de leads que passam nos critérios de faixa de investimento + urgência | Qualitativa: filtrar curiosos, atrair projetos sérios |
| Taxa de conversão de lead para call | % de leads que agendam chamada via Calendly após receber email | Qualitativa: reduzir no-show e acelerar contato |
| Taxa de conversão de call para proposta | % de calls que resultam em envio de proposta estruturada | Qualitativa: garantir fit antes de investir tempo em proposta |
| Ticket médio | Valor médio de projetos fechados | Foco em tickets médios/altos (sem valor numérico no plan.md, mas indicação de posicionamento premium) |

(Fonte: plan.md §3.7 – "Estratégia de captura de leads qualificados"; §3.6 – "Fluxo ideal do lead até fechamento")

### 3.2. Métricas de produto/UX

| Métrica | Definição | Meta inicial |
|---------|-----------|--------------|
| Tempo de carregamento (FCP) | First Contentful Paint | < 1.5s (inferido de "performance como higiene") |
| Taxa de abandono no formulário | % de usuários que iniciam mas não completam formulário | Qualitativa: formulário simples com poucos campos obrigatórios |
| Taxa de erro no envio do formulário | % de submissões que falham | < 1% (validação em tempo real) |
| Taxa de cliques em CTA principal | % de visitantes que clicam no CTA de "Aplicar para projeto" ou "Diagnóstico estratégico" | Qualitativa: CTA claro e posicionado estrategicamente |

(Fonte: plan.md §3.5 – "Redução de fricção no formulário"; plan.md §1.5 – "performance como 'higiene'")

## 4. Requisitos não-funcionais de alto nível

### 4.1. Performance

- **Carregamento rápido**: SSR/SSG via Next.js para garantir FCP < 1.5s.
- **Otimização de imagens**: uso de next/image com lazy loading.
- **Bundle size controlado**: code-splitting automático do Next.js.

(Fonte: inferido de plan.md §1.5 – "Performance [...] aparece como benefício secundário"; §2.7 – "Tecnologias")

### 4.2. Qualidade e manutenção

- **Linting e formatação**: Biome.js para padrão de código.
- **Git hooks**: Lefthook para validação pré-commit/pré-push.
- **Validação de formulários**: React Hook Form + Zod para validações tipadas e testáveis.

(Fonte: stack informado no prompt; inferido de "boas práticas" em plan.md §1.6)

### 4.3. SEO e Analytics

- **SEO on-page**: meta tags otimizadas, sitemap, robots.txt, schema.org básico.
- **Rastreamento de conversão**: Analytics e Pixel configurados para rastrear eventos-chave (page_view, form_start, form_submit, CTA_click, whatsapp_link_click).

(Fonte: plan.md §1.2 – "métricas configuradas (Analytics, Pixel)"; plan.md §3.5 – "mensagem clara sobre o que acontece depois de enviar")

### 4.4. Internacionalização (i18n)

- **Idiomas suportados**: pt-BR (padrão), en, es.
- **Estratégia**: Arquivos de tradução JSON/TS por namespace (ex.: common, hero, form, faq).
- **Seleção de idioma**: componente LanguageSwitcher visível no header; detecção automática via navegador (opcional).
- **Rotas**: subpaths (`/`, `/en`, `/es`) ou domínios (decisão pendente).

(Fonte: stack informado no prompt; plan.md não menciona idiomas explicitamente, mas o público B2B pode incluir clientes internacionais, logo i18n é prudente para expansão futura)

### 4.5. Acessibilidade

- **WCAG 2.1 AA como alvo**: navegação por teclado, labels semânticos, contraste adequado.
- **Componentes shadcn/ui**: uso de primitives acessíveis por padrão (Radix UI).

(Fonte: inferido de "layout responsivo" e "boas práticas" em plan.md §1.2)

### 4.6. Segurança

- **Validação de entrada**: Zod no frontend e backend para sanitização.
- **Rate limiting**: proteção contra spam no formulário (backend Nest.js).
- **HTTPS obrigatório**: certificado SSL em produção.

(Fonte: inferido de "boas práticas de segurança" em plan.md §1.6)

---

**Próximos passos**: Este documento serve como norte estratégico. Os requisitos funcionais detalhados (formulário, CRM, email) e backlog priorizado estão nos documentos subsequentes (05-functional-requirements.md, 11-backlog.md).
