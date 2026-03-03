# Mapa de Relacionamento dos Documentos SDD

## 📊 Fluxo de leitura recomendado

```
START
  ↓
┌─────────────────────────────────────────────────┐
│  00-vision.md                                   │
│  (Problema, solução, posicionamento)            │
└─────────────────────────────────────────────────┘
  ↓
┌─────────────────────────────────────────────────┐
│  01-scope.md                                    │
│  (Em escopo / fora; restrições)                 │
└─────────────────────────────────────────────────┘
  ↓
┌─────────────────┬─────────────────┬─────────────────┐
│ 02-personas     │ 03-journeys     │ 04-info-arch    │
│ (Quem usa)      │ (Como usa)      │ (Estrutura)     │
└─────────────────┴─────────────────┴─────────────────┘
  ↓
┌───────────────────────────────────────────────────────┐
│  05-functional-requirements.md                        │
│  (O QUE construir - FR-001…)                          │
└───────────────────────────────────────────────────────┘
  ↓
┌───────────────────────────────────────────────────────┐
│  06-non-functional-requirements.md                    │
│  (COMO construir - Performance, SEO, etc.)            │
└───────────────────────────────────────────────────────┘
  ↓
┌─────────────────┬─────────────────┬─────────────────┐
│ 07-tracking     │ 08-content      │ 09-components   │
│ (Métricas)      │ (Copy)          │ (UI)            │
└─────────────────┴─────────────────┴─────────────────┘
  ↓
┌───────────────────────────────────────────────────────┐
│  10-technical-architecture.md                         │
│  (COMO implementar - Stack técnico)                   │
└───────────────────────────────────────────────────────┘
  ↓
┌───────────────────────────────────────────────────────┐
│  11-backlog.md                                        │
│  (Épicos → Features → User Stories)                   │
└───────────────────────────────────────────────────────┘
  ↓
IMPLEMENTATION
```

---

## 🔗 Matriz de rastreabilidade (exemplo)

| User Story | FR | NFR | Journey | Component | Tracking |
|------------|-----|-----|---------|-----------|----------|
| US-001 (Página principal) | FR-006 | NFR-001, NFR-003 | J-001 Etapa 2 | Header, SectionHero | page_view |
| US-008 (Formulário) | FR-001, FR-002 | NFR-007, NFR-009 | J-001 Etapa 4 | FormStep, FormField | form_start, form_submit |
| US-010 (Email) | FR-003 | NFR-006 | J-001 Etapa 5 | EmailService | email_send_success |
| US-015 (i18n switcher) | FR-015, FR-016 | NFR-008 | J-001 Etapa 1 | LanguageSwitcher | language_change |

---

## 📐 Dependências entre documentos

### 00-vision.md (fundação)
- **Alimenta**: 01-scope, 02-personas, 05-functional-req, 06-non-functional-req
- **Não depende de**: nenhum

### 01-scope.md (limites)
- **Alimenta**: 05-functional-req, 11-backlog
- **Depende de**: 00-vision

### 02-personas-and-jtbd.md (usuários)
- **Alimenta**: 03-user-journeys, 08-content-spec
- **Depende de**: 00-vision

### 03-user-journeys.md (fluxos)
- **Alimenta**: 04-info-arch, 05-functional-req, 07-tracking
- **Depende de**: 02-personas

### 04-information-architecture.md (estrutura)
- **Alimenta**: 08-content-spec, 09-ui-component-spec, 10-technical-arch
- **Depende de**: 03-user-journeys

### 05-functional-requirements.md (requisitos funcionais)
- **Alimenta**: 11-backlog, 10-technical-arch
- **Depende de**: 03-user-journeys, 04-info-arch

### 06-non-functional-requirements.md (qualidade)
- **Alimenta**: 10-technical-arch, 11-backlog
- **Depende de**: 00-vision

### 07-tracking-and-analytics-spec.md (métricas)
- **Alimenta**: 09-ui-component-spec, 10-technical-arch, 11-backlog
- **Depende de**: 03-user-journeys, 05-functional-req

### 08-content-spec.md (copy)
- **Alimenta**: 09-ui-component-spec, 11-backlog
- **Depende de**: 02-personas, 04-info-arch

### 09-ui-component-spec.md (componentes)
- **Alimenta**: 10-technical-arch, 11-backlog
- **Depende de**: 04-info-arch, 08-content-spec

### 10-technical-architecture.md (implementação)
- **Alimenta**: 11-backlog
- **Depende de**: 05-functional-req, 06-non-functional-req, 09-ui-component-spec

### 11-backlog.md (histórias)
- **Não alimenta**: (ponto final; é executado)
- **Depende de**: TODOS os documentos anteriores

---

## 🎯 Atalhos rápidos por papel

### 👔 Stakeholder / Product Owner
**Documentos essenciais**:
1. 00-vision.md (5 min)
2. 01-scope.md (5 min)
3. 02-personas-and-jtbd.md (10 min)
4. 11-backlog.md (épicos e priorização) (10 min)

**Total**: 30 min para entender produto completo

---

### 🎨 Designer / UX
**Documentos essenciais**:
1. 02-personas-and-jtbd.md (10 min)
2. 03-user-journeys.md (15 min)
3. 04-information-architecture.md (15 min)
4. 08-content-spec.md (20 min)
5. 09-ui-component-spec.md (20 min)

**Total**: 1h20 para ter contexto de design completo

---

### 💻 Desenvolvedor Frontend
**Documentos essenciais**:
1. 10-technical-architecture.md (§2 Frontend) (15 min)
2. 05-functional-requirements.md (filtrar "Frontend only") (20 min)
3. 09-ui-component-spec.md (30 min)
4. 07-tracking-and-analytics-spec.md (15 min)
5. 11-backlog.md (histórias US-001 a US-007, US-014 a US-021) (30 min)

**Total**: 1h50 para começar implementação

---

### 💻 Desenvolvedor Backend
**Documentos essenciais**:
1. 10-technical-architecture.md (§3 Backend) (20 min)
2. 05-functional-requirements.md (filtrar "Backend" ou "Full-stack") (20 min)
3. 06-non-functional-requirements.md (NFR-004, NFR-005, NFR-006) (10 min)
4. 11-backlog.md (histórias US-009, US-010, US-011) (20 min)

**Total**: 1h10 para começar implementação

---

### 🧪 QA / Tester
**Documentos essenciais**:
1. 03-user-journeys.md (fluxos E2E) (15 min)
2. 05-functional-requirements.md (todos os FRs) (30 min)
3. 06-non-functional-requirements.md (todos os NFRs) (20 min)
4. 11-backlog.md (critérios de aceite Gherkin) (40 min)

**Total**: 1h45 para criar plano de testes

---

## 🔍 Como encontrar informações específicas

### "Onde está definido o formulário?"
- **Estrutura**: 05-functional-requirements.md (FR-001)
- **Campos**: 05-functional-requirements.md (§1.1)
- **Validações**: 05-functional-requirements.md (§1.1)
- **Componente**: 09-ui-component-spec.md (§3.1, §3.2)
- **Backend**: 10-technical-architecture.md (§3.2)
- **História**: 11-backlog.md (US-008, US-009)

### "Onde está definido i18n?"
- **Estratégia**: 00-vision.md (§4.6)
- **Idiomas suportados**: 01-scope.md (§2.1)
- **Jornada**: 03-user-journeys.md (J-001 Etapa 1)
- **Arquitetura**: 04-information-architecture.md (§4)
- **Requisito funcional**: 05-functional-requirements.md (FR-015, FR-016)
- **Requisito não-funcional**: 06-non-functional-requirements.md (NFR-008)
- **Organização de arquivos**: 08-content-spec.md (§9)
- **Componente**: 09-ui-component-spec.md (§1.2)
- **Implementação**: 10-technical-architecture.md (§2.2)
- **Histórias**: 11-backlog.md (US-014, US-015, US-016)

### "Onde está definido tracking?"
- **Estratégia**: 07-tracking-and-analytics-spec.md (completo)
- **Eventos por jornada**: 03-user-journeys.md (coluna "Eventos")
- **Componentes que disparam eventos**: 09-ui-component-spec.md (CTAButton, FormStep, FAQAccordion)
- **Histórias**: 11-backlog.md (US-017, US-018, US-019)

### "Onde está definido email automático?"
- **Requisito funcional**: 05-functional-requirements.md (FR-003)
- **Conteúdo do email**: 08-content-spec.md (referência implícita em "próximos passos")
- **Implementação**: 10-technical-architecture.md (§3.2, §4.1)
- **História**: 11-backlog.md (US-010)

### "Onde está definido CRM?"
- **Requisito funcional**: 05-functional-requirements.md (FR-005)
- **Campos mapeados**: 05-functional-requirements.md (§5.1)
- **Implementação**: 10-technical-architecture.md (§4.2)
- **História**: 11-backlog.md (US-011)
- **Decisão pendente**: README.md (§"Decisões pendentes" item 1)

---

## 📋 Checklist de validação por documento

### Antes de implementar Sprint 1 (MVP pt-BR)

**Stakeholder deve aprovar**:
- [ ] 00-vision.md (mensagens-chave)
- [ ] 01-scope.md (o que está fora)
- [ ] 02-personas-and-jtbd.md (personas corretas?)
- [ ] 08-content-spec.md (tom e copy)

**Time técnico deve aprovar**:
- [ ] 10-technical-architecture.md (stack, integrações)
- [ ] 11-backlog.md (Sprint 1 está claro?)

**Decisões pendentes devem ser resolvidas**:
- [ ] Qual CRM usar? (HubSpot, Pipedrive, outro)
- [ ] Qual email provider? (Resend, SendGrid, outro)
- [ ] Qual analytics? (GA, Segment, Posthog, outro)

---

## 📝 Versionamento de documentos

Quando atualizar documentação, seguir padrão:

```
commit: "docs(sdd): atualiza FR-005 com integração HubSpot confirmada"

Alterações:
- 05-functional-requirements.md: FR-005 agora especifica HubSpot
- 10-technical-architecture.md: §4.2 atualizado com exemplo HubSpot
- 11-backlog.md: US-011 critérios de aceite ajustados
- README.md: Remove "Decisão pendente" sobre CRM
```

---

## 🚀 De documentação para código

### Passo 1: Setup inicial
```bash
# Frontend
npx create-next-app@latest --typescript --tailwind --app
npx shadcn-ui@latest init

# Backend
nest new backend
cd backend && npm install @prisma/client prisma
npx prisma init
```

### Passo 2: Implementar US-001 (Página principal)
- **Referência**: 11-backlog.md (US-001)
- **Componentes necessários**: 09-ui-component-spec.md (Header, SectionHero)
- **Conteúdo**: 08-content-spec.md (§2.1 pt-BR)
- **Layout**: 04-information-architecture.md (§2.1)

### Passo 3: Implementar US-008 (Formulário)
- **Referência**: 11-backlog.md (US-008)
- **Schema Zod**: 05-functional-requirements.md (§1.1 - validações)
- **Componentes**: 09-ui-component-spec.md (§3.1, §3.2)
- **Backend endpoint**: 10-technical-architecture.md (§3.2)

### Passo 4: Tracking
- **Referência**: 07-tracking-and-analytics-spec.md
- **Implementação**: Adicionar tracking em cada componente conforme 09-ui-component-spec.md

---

**Documentação viva**: Este mapa deve ser atualizado quando novos documentos forem adicionados ou estrutura mudar.

---

**Última atualização**: 26 de fevereiro de 2026
