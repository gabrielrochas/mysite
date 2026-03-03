# 04 — Arquitetura de Informação

## 1. Sitemap

```
/ (página principal, one-page)
  ├─ #hero (Hero Section)
  ├─ #prova-social (Prova social rápida)
  ├─ #servicos (Serviços)
  ├─ #casos-de-uso (Casos de uso)
  ├─ #processo (Processo de trabalho)
  ├─ #tecnologias (Tecnologias)
  ├─ #depoimentos (Depoimentos)
  ├─ #faq (FAQ estratégico)
  └─ #cta-final (CTA final)

/obrigado (página de agradecimento pós-formulário)

[OPCIONAIS - Não MVP]
/sites-rapidos (página específica para oferta de sites rápidos)
/aplicacoes-sob-medida (página específica para oferta de aplicações)
/cases (página de estudos de caso detalhados)
```

**Rotas i18n**:
- pt-BR: `/` (padrão)
- en: `/en` ou `/en/` (subpath)
- es: `/es` ou `/es/` (subpath)

**Decisão pendente**: Usar subpaths (`/en`, `/es`) ou domínios separados (`en.seusite.com`). Recomendação: subpaths para MVP (mais simples).

(Fonte: plan.md §2.1 – "Ordem ideal das seções"; §4.2 – "Página específica para 'Aplicações web sob medida'")

---

## 2. Estrutura de seções da página principal

### 2.1. Hero Section (#hero)

**Objetivo**: Capturar atenção e comunicar posicionamento em 3 segundos.

**Conteúdo**:
- **Headline** (h1): "Aplicações web sob medida que transformam processos soltos em produtos digitais lucrativos" (exemplo adaptado do plan.md).
- **Subheadline** (p): "Desenvolvimento full-stack (React e Node.js) para pequenas empresas e startups que precisam ir além de um simples site."
- **CTA primário**: "Aplicar para projeto" ou "Agendar diagnóstico estratégico" (abre formulário/modal ou rola para âncora #formulario).
- **CTA secundário** (opcional): "Ver casos de uso" (rola para #casos-de-uso).
- **Imagem/ilustração** (opcional): mockup de dashboard ou ilustração de produto digital.

**Navegação**: Âncoras para outras seções (#servicos, #casos-de-uso, #processo, etc.) via menu fixo no header.

(Fonte: plan.md §2.2 – "Hero Section")

---

### 2.2. Prova Social (#prova-social)

**Objetivo psicológico**: Transmitir credibilidade logo após hero.

**Conteúdo**:
- Mini-bloco com texto tipo: "Projetos entregues para empresas de [segmentos]" ou "Já ajudei X clientes a automatizar processos e aumentar conversão".
- **Logos ou nomes de clientes** (se permitido) ou **números** (ex.: "12 projetos entregues em 2024", "95% dos clientes renovam manutenção").
- Sem exageros; foco em social proof real.

(Fonte: plan.md §2.3 – "Prova social")

---

### 2.3. Serviços (#servicos)

**Objetivo**: Diferenciar ofertas de forma clara e posicioná-las como resultados, não features.

**Conteúdo**:

#### Serviço 1: Sites rápidos que geram caixa

- **Headline**: "Sites rápidos que geram caixa"
- **Descrição**: Landing pages e sites institucionais otimizados para conversão. Ideais para validar ofertas, rodar campanhas de tráfego pago e gerar leads qualificados rápido.
- **Bullets de valor**:
  - Escopo fechado: 1 página + obrigado, integrações básicas.
  - Prazo curto: entrega em dias, não semanas.
  - Tracking configurado: Analytics e Pixel prontos.
  - Copy focada em conversão.
- **CTA**: "Quero um site rápido" (rola para formulário ou abre modal).

#### Serviço 2: Aplicações web sob medida

- **Headline**: "Aplicações web sob medida"
- **Descrição**: Sistemas e plataformas customizadas que automatizam processos, centralizam operações e escalam negócios. CRMs internos, dashboards, portais de clientes, sistemas de pedidos.
- **Bullets de valor**:
  - Eliminar planilhas confusas e processos manuais.
  - Redução de erros e ganho de eficiência.
  - Visibilidade em tempo real para decisões melhores.
  - Tecnologia moderna (React + Node.js) e boas práticas.
- **CTA**: "Quero uma aplicação sob medida" (rola para formulário ou abre modal).

(Fonte: plan.md §2.4 – "Seção de serviços")

---

### 2.4. Casos de Uso (#casos-de-uso)

**Objetivo**: Mostrar problemas concretos resolvidos para facilitar identificação do visitante.

**Conteúdo** (cards ou lista):

1. **Pequenas empresas**:
   - Exemplo: landing de serviços, site institucional com captação, sistema simples de agendamento.
   - Gatilhos: captar clientes, validar oferta, presença digital profissional.

2. **Startups e scale-ups**:
   - Exemplo: CRM interno, dashboard de operação, sistema de pedidos, portal de clientes.
   - Gatilhos: eliminar planilhas, centralizar informação, escalar operação.

3. **Empresas com sistema interno**:
   - Exemplo: dashboard para operação, sistema de pedidos customizado, automação de fluxos.
   - Gatilhos: integração com ERP, automação, redução de erro, controle em tempo real.

**Formato**: Cards com título (tipo de empresa), descrição curta, ícone/ilustração.

(Fonte: plan.md §2.5 – "Casos de uso")

---

### 2.5. Processo de Trabalho (#processo)

**Objetivo psicológico**: Transmitir segurança, reduzir risco, mostrar método.

**Conteúdo**:

**Headline**: "Como trabalhamos juntos"

**Etapas** (timeline ou cards):

1. **Diagnóstico**:
   - Chamada para entender negócio, processo atual e objetivo.
   - Duração: 30–45 min.

2. **Proposta e escopo**:
   - Envio de proposta estruturada com escopo, prazo, investimento e próximos passos.
   - Prazo: até 3 dias após a call.

3. **Protótipo**:
   - Wireframes ou layout para validação antes de implementar.
   - Iteração rápida para alinhar expectativas.

4. **Desenvolvimento**:
   - Iteração em sprints curtos (1–2 semanas).
   - Entregas parciais para feedback contínuo.

5. **Entrega e ajustes finais**:
   - Revisão final, testes de performance e segurança.
   - Documentação mínima.

6. **Acompanhamento inicial / suporte**:
   - Período de garantia para ajustes e dúvidas.
   - Opção de manutenção contínua.

(Fonte: plan.md §2.6 – "Processo de trabalho")

---

### 2.6. Tecnologias (#tecnologias)

**Objetivo**: Reforçar competência técnica sem exagerar.

**Conteúdo**:

**Headline**: "Tecnologia moderna e manutenível"

**Descrição curta**: "Uso tecnologias consolidadas e boas práticas para garantir performance, segurança e facilidade de manutenção."

**Logos/nomes de tecnologias-chave**:
- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Nest.js
- **Bancos de dados**: PostgreSQL, MongoDB (ou o que for mais comum)
- **Cloud**: Vercel, AWS, Azure (conforme usado)
- **Integrações**: REST APIs, webhooks, CRMs, email, pagamentos

**O que não incluir**: lista enorme de tudo que já foi estudado, tecnologias experimentais irrelevantes para B2B.

(Fonte: plan.md §2.7 – "Tecnologias")

---

### 2.7. Depoimentos (#depoimentos)

**Objetivo**: Transmitir credibilidade via social proof contextualizado.

**Conteúdo** (cards ou carrossel):

Cada depoimento deve ter:
- **Nome do cliente**
- **Tipo de negócio** (ex.: "Fundadora de startup de logística")
- **Problema**: breve descrição do desafio.
- **Resultado**: métrica ou resultado qualitativo (ex.: "Reduziu erros de pedido em 80%", "Aumentou leads em 3x em 2 meses").
- **Quote** (1–2 frases): depoimento do cliente.

**O que não incluir**: depoimentos genéricos tipo "Muito bom, recomendo!", prints desorganizados de WhatsApp.

(Fonte: plan.md §2.8 – "Depoimentos")

---

### 2.8. FAQ Estratégico (#faq)

**Objetivo**: Abordar objeções comuns sem esperar que usuário pergunte.

**Perguntas sugeridas**:

1. **"Quanto custa um site rápido / aplicação sob medida?"**
   - Resposta: "Sites rápidos têm escopo fechado e faixa de investimento previsível (R$ X a R$ Y). Aplicações sob medida variam conforme complexidade; após a call de diagnóstico, envio proposta com valor detalhado."

2. **"Qual o prazo de entrega?"**
   - Resposta: "Sites rápidos: até X dias. Aplicações sob medida: depende do escopo; normalmente entre 4–12 semanas, com entregas parciais em sprints curtos."

3. **"Como funciona o pagamento?"**
   - Resposta: "Geralmente divido em 3 parcelas: 30% no início, 40% no meio do projeto, 30% na entrega. Aceito PIX, boleto e transferência."

4. **"E se eu não souber definir exatamente o que preciso?"**
   - Resposta: "Normal! A call de diagnóstico serve justamente para entender seu negócio, processo e objetivo. Depois disso, monto proposta com escopo claro."

5. **"Vocês dão suporte após a entrega?"**
   - Resposta: "Sim. Todo projeto inclui período de garantia (X dias) para ajustes e dúvidas. Depois, ofereço planos de manutenção mensal."

6. **"Por que não usar plataforma pronta tipo Wix / WordPress?"**
   - Resposta: "Plataformas prontas são ótimas para casos simples. Se você precisa de personalização, integrações específicas ou sistema sob medida, código customizado é mais eficiente e escalável."

(Fonte: plan.md §2.9 – "FAQ estratégico")

---

### 2.9. CTA Final (#cta-final)

**Objetivo**: Última chance de conversão, com reforço de filtro.

**Conteúdo**:

**Headline**: "Pronto para transformar seu processo em produto digital?"

**Subheadline**: "Agende um diagnóstico estratégico gratuito (30 min) para entendermos seu negócio e vermos se faz sentido trabalhar juntos."

**CTA primário**: "Aplicar para projeto" (abre formulário ou rola para âncora #formulario).

**Reforço de filtro** (texto pequeno abaixo do botão): "Esse diagnóstico é para empresas que buscam resultado real, não apenas 'um site bonitinho'. Se você quer algo profissional e está disposto a investir de forma adequada, vamos conversar."

(Fonte: plan.md §2.10 – "CTA final")

---

## 3. Página de Obrigado (/obrigado)

**Objetivo**: Confirmar sucesso do envio e facilitar agendamento de call.

**Conteúdo**:

- **Título**: "Obrigado, [Nome]! Seu pedido foi recebido."
- **Subtítulo**: "Você receberá um email em até 24 horas com os próximos passos."
- **CTA primário**: "Agendar chamada agora" (embed de Calendly ou link externo).
- **CTA secundário**: "Prefere WhatsApp? Clique aqui" (link `https://wa.me/...`).
- **Reforço de credibilidade**: "O que esperar da chamada: diagnóstico do seu negócio, alinhamento de expectativas, próximos passos claros."

(Fonte: plan.md §3.6 – "oferecendo link de Calendly para agendar uma chamada")

---

## 4. Regras de navegação

### 4.1. Menu fixo (header)

**Desktop**:
- Logo (esquerda)
- Links de navegação (centro/direita): Serviços | Casos de uso | Processo | FAQ
- Seletor de idioma (LanguageSwitcher; ícone ou dropdown)
- CTA (botão destacado): "Aplicar para projeto"

**Mobile**:
- Logo (esquerda)
- Hamburger menu (direita) com links de navegação + seletor de idioma

### 4.2. Ancoragem (scroll suave)

- Todos os links internos (#servicos, #casos-de-uso, etc.) devem usar scroll suave (`scroll-behavior: smooth` ou lib de scroll).
- Offset para compensar header fixo (ex.: `scroll-margin-top: 80px`).

### 4.3. Comutação de idioma

**Comportamento**:
- Ao trocar idioma, recarregar página na rota correspondente (`/`, `/en`, `/es`) **ou** atualizar conteúdo via context/hook sem reload (decisão de implementação).
- **Persistência**: salvar preferência em cookie/localStorage para manter idioma em próximas visitas.
- **Detecção automática**: tentar detectar idioma via `navigator.language` na primeira visita; se não suportado, usar pt-BR como fallback.

**Evento de tracking**: `language_change` disparado ao trocar idioma manualmente.

(Fonte: inferido de requisito de i18n pt-BR/en/es no prompt)

---

## 5. Organização de conteúdo para i18n

### 5.1. Estratégia de arquivos

**Estrutura sugerida** (Next.js 14+ com App Router):

```
/messages
  /pt-BR
    common.json (header, footer, CTAs)
    hero.json (headline, subheadline)
    services.json (títulos e descrições de serviços)
    use-cases.json (casos de uso)
    process.json (etapas do processo)
    technologies.json (descrições de tecnologias)
    testimonials.json (depoimentos - se traduzidos)
    faq.json (perguntas e respostas)
    form.json (labels, placeholders, validações)
  /en
    [mesma estrutura]
  /es
    [mesma estrutura]
```

**Biblioteca sugerida**: `next-intl` (integração nativa com Next.js App Router) ou `react-i18next`.

### 5.2. Namespaces por seção

| Namespace | Conteúdo |
|-----------|----------|
| `common` | Header, footer, CTAs genéricos, botões ("Enviar", "Ver mais", etc.) |
| `hero` | Headline, subheadline do hero |
| `services` | Títulos e descrições dos serviços (Sites rápidos, Aplicações sob medida) |
| `use-cases` | Títulos e descrições dos casos de uso |
| `process` | Títulos e descrições das etapas do processo |
| `technologies` | Headline e descrição curta da seção de tecnologias |
| `testimonials` | Depoimentos (se traduzidos; caso contrário, manter em idioma original) |
| `faq` | Perguntas e respostas do FAQ |
| `form` | Labels, placeholders, mensagens de validação, textos de ajuda |

### 5.3. Textos não traduzíveis

- **Nomes de clientes** (manter original).
- **Depoimentos** (opcional traduzir; se não, adicionar nota tipo "[Original em português]").
- **Logos de tecnologias** (nomes próprios: React, Node.js, etc. não traduzem).

---

## 6. Componentes reutilizáveis por seção

| Seção | Componentes principais |
|-------|------------------------|
| **Hero** | `SectionHero`, `CTAButton` |
| **Prova social** | `SocialProofBar` (mini-bloco com texto + números/logos) |
| **Serviços** | `ServiceCard` (card com título, descrição, bullets, CTA) |
| **Casos de uso** | `UseCaseCard` (card com ícone, título, descrição) |
| **Processo** | `ProcessTimeline` (componente de timeline ou cards numerados) |
| **Tecnologias** | `TechnologyGrid` (grid de logos com tooltips opcionais) |
| **Depoimentos** | `TestimonialCard`, `TestimonialCarousel` |
| **FAQ** | `FAQAccordion` (accordion com perguntas/respostas) |
| **CTA final** | `SectionCTA`, `CTAButton` |
| **Formulário** | `FormStep` (se multistep), `FormField` (wrappers para React Hook Form) |

(Detalhes de cada componente estão em 09-ui-component-spec.md)

---

**Próximos passos**: Requisitos funcionais detalhados (formulário, email, CRM) estão em 05-functional-requirements.md. Spec de componentes UI está em 09-ui-component-spec.md.
