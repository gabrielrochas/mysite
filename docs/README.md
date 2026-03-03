# Documentação SDD (Spec-Driven Development)

Este diretório contém a especificação completa do produto web B2B, estruturada segundo a metodologia Spec-Driven Development (SDD) e pronta para implementação no stack:

- **Frontend**: Next.js 14+, Tailwind CSS, shadcn/ui, React Hook Form, Zod
- **Backend**: Nest.js, Prisma
- **Qualidade/DevX**: Biome.js, Lefthook
- **Autenticação**: better-auth (uso futuro)
- **i18n**: pt-BR, en, es

---

## 📁 Estrutura dos documentos

### 1. Fundação estratégica

| Documento | Descrição |
|-----------|-----------|
| [00-vision.md](./00-vision.md) | Problema, solução, posicionamento e não-funcionais de alto nível |
| [01-scope.md](./01-scope.md) | O que está em escopo / fora de escopo; restrições e premissas |
| [02-personas-and-jtbd.md](./02-personas-and-jtbd.md) | Personas, Jobs-to-be-done, dores e gatilhos |
| [03-user-journeys.md](./03-user-journeys.md) | Jornadas ponta a ponta do visitante ao lead qualificado |

### 2. Arquitetura de informação e design

| Documento | Descrição |
|-----------|-----------|
| [04-information-architecture.md](./04-information-architecture.md) | Sitemap, estrutura de seções, navegação e i18n |
| [08-content-spec.md](./08-content-spec.md) | Tom de voz, copy por seção, CTAs, FAQ e organização de traduções |
| [09-ui-component-spec.md](./09-ui-component-spec.md) | Componentes Next.js + shadcn/ui com props, estados e acessibilidade |

### 3. Requisitos funcionais e não-funcionais

| Documento | Descrição |
|-----------|-----------|
| [05-functional-requirements.md](./05-functional-requirements.md) | Requisitos funcionais (FR-001…) com prioridade e rastreabilidade |
| [06-non-functional-requirements.md](./06-non-functional-requirements.md) | NFRs (performance, SEO, acessibilidade, segurança, i18n) |
| [07-tracking-and-analytics-spec.md](./07-tracking-and-analytics-spec.md) | Plano de eventos, propriedades e mapeamento frontend/backend |

### 4. Arquitetura técnica e implementação

| Documento | Descrição |
|-----------|-----------|
| [10-technical-architecture.md](./10-technical-arch.md) | Arquitetura frontend/backend, Prisma, integrações e deploy |
| [11-backlog.md](./11-backlog.md) | Épicos, features e histórias (US-001…) com critérios de aceite Gherkin |

---

## 🎯 Como usar esta documentação

### Para Product Managers / Stakeholders

1. **Comece por**: 00-vision.md, 01-scope.md, 02-personas-and-jtbd.md
2. **Para validar produto**: 03-user-journeys.md, 04-information-architecture.md
3. **Para entender métricas**: 07-tracking-and-analytics-spec.md

### Para Designers / UX

1. **Comece por**: 02-personas-and-jtbd.md, 03-user-journeys.md
2. **Para estrutura visual**: 04-information-architecture.md, 08-content-spec.md
3. **Para componentes**: 09-ui-component-spec.md

### Para Desenvolvedores

1. **Comece por**: 10-technical-architecture.md (visão geral do stack)
2. **Para features**: 05-functional-requirements.md, 06-non-functional-requirements.md
3. **Para implementação**: 11-backlog.md (histórias com critérios de aceite)
4. **Para tracking**: 07-tracking-and-analytics-spec.md

### Para QA / Testers

1. **Comece por**: 05-functional-requirements.md, 06-non-functional-requirements.md
2. **Para casos de teste**: 11-backlog.md (critérios de aceite em Gherkin)
3. **Para jornadas E2E**: 03-user-journeys.md

---

## 🔗 Rastreabilidade

Todos os requisitos e histórias estão rastreados com referências explícitas:

- **Fonte**: Plan.md (documento original)
- **FR/NFR**: Requisitos funcionais e não-funcionais
- **US**: User Stories no backlog

**Exemplo**:
```
FR-001 → Formulário principal
  ↓
US-008 → Implementação do formulário
  ↓
Critérios de aceite (Gherkin)
  ↓
Fonte: plan.md §3.5
```

---

## ✅ Checklist de qualidade (garantida em todos os docs)

- ✅ **Rastreabilidade**: Todo requisito tem "Fonte: plan.md §X.Y"
- ✅ **Testabilidade**: Critérios de aceite verificáveis (Gherkin)
- ✅ **Sem invenção**: Nada foi criado além do que está no plan.md
- ✅ **Consistência**: Termos e nomes padronizados
- ✅ **Idioma**: PT-BR objetivo, sem jargão desnecessário
- ✅ **Stack explícito**: Tecnologias indicadas em cada contexto

---

## 🚀 Próximos passos

### 1. Validação

- [ ] Review de 00-vision.md e 01-scope.md com stakeholder
- [ ] Validação de 02-personas-and-jtbd.md com dados reais (se disponível)
- [ ] Aprovação de 08-content-spec.md (tom e copy)

### 2. Refinamento técnico

- [ ] Review de 10-technical-architecture.md com time de dev
- [ ] Decisão sobre CRM (HubSpot, Pipedrive, outro) → atualizar FR-005
- [ ] Decisão sobre better-auth (usar no MVP ou não) → atualizar 01-scope.md
- [ ] Configuração de ambiente (variáveis, deploy)

### 3. Implementação (Sprint 1 - MVP pt-BR)

Conforme priorização em 11-backlog.md:

- [ ] US-001: Página principal
- [ ] US-002: Página de obrigado
- [ ] US-003: Seção hero
- [ ] US-004: Seção de serviços
- [ ] US-008: Formulário com validação
- [ ] US-009: Integração backend
- [ ] US-010: Email automático
- [ ] US-011: Integração CRM

---

## 📝 Decisões pendentes (registradas nos docs)

As seguintes decisões foram marcadas como "Pendentes" e precisam ser resolvidas antes da implementação:

1. **CRM**: Qual ferramenta usar? (HubSpot, Pipedrive, outro)
   - Localização: 05-functional-requirements.md (FR-005)
   - Impacto: US-011 (implementação da integração)

2. **better-auth**: Usar no MVP ou deixar para versão futura?
   - Localização: 01-scope.md (§3.1), 10-technical-architecture.md (§5.1)
   - Impacto: Se usar, adicionar histórias de autenticação no backlog

3. **Analytics**: Google Analytics, Segment, Posthog ou outro?
   - Localização: 07-tracking-and-analytics-spec.md (§1.2)
   - Impacto: US-017 a US-019 (implementação de tracking)

4. **Email provider**: Resend, SendGrid, SMTP genérico ou outro?
   - Localização: 10-technical-architecture.md (§4.1)
   - Impacto: US-010 (envio de email automático)

---

## 📚 Glossário de termos

| Termo | Significado |
|-------|-------------|
| **FR** | Functional Requirement (Requisito Funcional) |
| **NFR** | Non-Functional Requirement (Requisito Não-Funcional) |
| **US** | User Story (História de Usuário) |
| **JTBD** | Jobs-to-be-done (Trabalhos a serem realizados) |
| **CTA** | Call-to-Action (Chamada para ação) |
| **MVP** | Minimum Viable Product (Produto Mínimo Viável) |
| **SSG** | Static Site Generation (Geração Estática de Site) |
| **SSR** | Server-Side Rendering (Renderização no Servidor) |
| **i18n** | Internationalization (Internacionalização) |
| **CRM** | Customer Relationship Management (Gestão de Relacionamento com Cliente) |

---

## 🤝 Contribuições e atualizações

**Regras para atualizar documentação**:

1. **Sempre manter rastreabilidade**: Se adicionar requisito, referencie origem
2. **Atualizar backlog**: Se mudar requisito, revisar histórias relacionadas
3. **Marcar decisões pendentes**: Se houver dúvida, adicionar em "Decisão pendente" com opções
4. **Manter consistência**: Usar mesmos termos em todos os docs
5. **Versionar mudanças**: Commit com mensagem clara de qual doc foi alterado e por quê

---

## 📞 Contato

Este documento foi gerado em: **26 de fevereiro de 2026**

Para dúvidas sobre a especificação, consulte o documento específico ou revise o plan.md original.

---

**✨ Documentação completa e pronta para execução! Bom desenvolvimento! 🚀**
