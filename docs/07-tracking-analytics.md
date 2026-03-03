# 07 — Tracking e Analytics

## 1. Plano de eventos

### 1.1. Eventos de navegação

| Evento | Gatilho | Propriedades | Responsável | Origem |
|--------|---------|--------------|-------------|--------|
| `page_view` | Carregamento de qualquer página | `page_path`, `referrer`, `language` | Frontend (Next.js) | Padrão de analytics |
| `language_change` | Usuário troca idioma manualmente | `from_language`, `to_language` | Frontend (LanguageSwitcher) | FR-015 |
| `section_view` | Seção entra no viewport (IntersectionObserver) | `section_name` (hero, services, use-cases, process, technologies, testimonials, faq) | Frontend (scroll tracking) | (Opcional) |

### 1.2. Eventos de interação com CTA

| Evento | Gatilho | Propriedades | Responsável | Origem |
|--------|---------|--------------|-------------|--------|
| `CTA_click` | Clique em qualquer botão de CTA | `cta_location` (hero, services, final, header), `cta_text`, `language` | Frontend (CTAButton component) | plan.md §2.2, §2.10 |
| `calendly_click` | Clique no link/botão de Calendly | `source` (thank_you_page, email), `language` | Frontend (thank you page) | plan.md §3.6 |
| `whatsapp_link_click` | Clique no link de WhatsApp | `source` (thank_you_page, email), `language` | Frontend (thank you page) | plan.md §3.8 |

### 1.3. Eventos de formulário

| Evento | Gatilho | Propriedades | Responsável | Origem |
|--------|---------|--------------|-------------|--------|
| `form_start` | Usuário interage com primeiro campo | `form_id`, `language` | Frontend (FormStep component) | plan.md §3.5 |
| `form_step_completed` | Usuário completa etapa (se multistep) | `step_number` (1 ou 2) | Frontend (FormStep component) | (Opcional) |
| `form_submit_attempt` | Usuário clica em "Enviar" | `form_id`, `language` | Frontend (FormStep component) | (Opcional) |
| `form_submit_success` | Formulário enviado com sucesso | `form_id`, `project_type`, `investment_range`, `urgency`, `language`, `lead_id` | Frontend (após resposta 200 do backend) | plan.md §3.6 |
| `form_submit_fail` | Erro ao enviar formulário | `form_id`, `error_code`, `error_message`, `language` | Frontend (após resposta de erro do backend) | NFR-006 |
| `form_field_error` | Validação de campo falha | `field_name`, `error_type` | Frontend (React Hook Form) | (Opcional; detalhado) |

### 1.4. Eventos de backend (integrações)

| Evento | Gatilho | Propriedades | Responsável | Origem |
|--------|---------|--------------|-------------|--------|
| `email_send_success` | Email automático enviado ao lead | `lead_id`, `email_provider`, `timestamp` | Backend (Nest.js) | plan.md §3.6 |
| `email_send_fail` | Falha ao enviar email | `lead_id`, `email_provider`, `error_message`, `timestamp` | Backend (Nest.js) | NFR-006 |
| `crm_record_created` | Lead registrado no CRM com sucesso | `lead_id`, `crm_provider`, `timestamp` | Backend (Nest.js) | FR-005 |
| `crm_sync_fail` | Falha ao sincronizar CRM | `lead_id`, `crm_provider`, `error_message`, `timestamp` | Backend (Nest.js) | NFR-006 |

### 1.5. Eventos de página de obrigado

| Evento | Gatilho | Propriedades | Responsável | Origem |
|--------|---------|--------------|-------------|--------|
| `thank_you_page_view` | Carregamento da página /obrigado | `lead_id`, `project_type`, `language` | Frontend (página /obrigado) | plan.md §3.6 |

---

## 2. Propriedades dos eventos (campos comuns)

| Propriedade | Tipo | Valores possíveis | Descrição |
|-------------|------|-------------------|-----------|
| `language` | string | "pt-BR", "en", "es" | Idioma selecionado pelo usuário |
| `project_type` | string | "site-rapido", "aplicacao-sob-medida", "ainda-nao-sei" | Tipo de projeto escolhido no formulário |
| `investment_range` | string | "ate-5k", "5k-15k", "15k-30k", "acima-30k", "discutir" | Faixa de investimento escolhida |
| `urgency` | string | "2-semanas", "1-mes", "2-3-meses", "sem-pressa", null | Urgência informada no formulário (opcional) |
| `lead_id` | string (UUID) | - | ID único do lead no banco de dados |
| `cta_location` | string | "hero", "services", "final", "header", "thank_you_page" | Localização do CTA clicado |
| `cta_text` | string | Ex.: "Aplicar para projeto", "Quero um site rápido" | Texto exibido no botão de CTA |

---

## 3. Porquê do tracking (objetivos de negócio)

### 3.1. Qualificar leads

**Objetivo**: Identificar quais tipos de projeto e faixas de investimento geram leads mais qualificados (que viram calls e fecham contratos).

**Eventos-chave**:
- `form_submit_success` → captura `project_type` e `investment_range`
- `call_scheduled` (via webhook Calendly) → correlacionar com `lead_id`
- `proposal_sent`, `proposal_accepted` (manual no CRM) → correlacionar com `lead_id`

**Análise**:
- Taxa de conversão por `project_type`: quantos leads de "site-rapido" vs "aplicacao-sob-medida" viram calls?
- Taxa de conversão por `investment_range`: qual faixa tem maior taxa de fechamento?
- Taxa de conversão por `urgency`: leads "2-semanas" fecham mais rápido?

(Fonte: plan.md §3.7 – "perguntas de qualificação sutis: faixa de investimento, nível de urgência")

### 3.2. Filtrar curiosos

**Objetivo**: Identificar padrões de leads que não convertem (ex.: clicam em WhatsApp mas nunca agendam call, preenchem formulário mas não respondem email).

**Eventos-chave**:
- `form_submit_success` → lead criado
- `whatsapp_link_click` → lead tentou contato direto
- `calendly_click` → lead tentou agendar
- Ausência de `call_scheduled` → lead não agendou

**Análise**:
- % de leads que clicam em WhatsApp mas não agendam call → indicador de curiosidade sem intenção séria
- % de leads que abrem email mas não clicam em Calendly → possível desinteresse ou email caiu em spam

(Fonte: plan.md §3.7 – "Estratégia de captura de leads qualificados [...] mensagens que reforcem que o tempo de ambos é valioso")

### 3.3. Otimizar conversão de seções

**Objetivo**: Identificar quais seções do site geram mais engajamento e cliques em CTA.

**Eventos-chave**:
- `CTA_click` com propriedade `cta_location`
- `section_view` (opcional; rastrear visibilidade de seções)

**Análise**:
- Qual CTA tem maior taxa de clique: hero, services, final?
- Usuários que veem seção de "processo" clicam mais em CTA?

(Fonte: inferido de foco em conversão em plan.md §1.2, §1.5)

### 3.4. Monitorar saúde das integrações

**Objetivo**: Detectar falhas em email e CRM para corrigir antes de perder leads.

**Eventos-chave**:
- `email_send_fail`
- `crm_sync_fail`

**Análise**:
- % de leads com `email_sent = false` → alertar se > 5%
- % de leads com `crm_synced = false` → alertar se > 5%

(Fonte: NFR-006 – "Observabilidade e logs"; plan.md §3.7 menciona "registro organizado")

---

## 4. Implementação técnica

### 4.1. Frontend (Next.js)

**Biblioteca sugerida**: `@vercel/analytics` (se deploy em Vercel) ou Google Analytics 4 (gtag.js) via `react-ga4` ou `next/script`.

**Exemplo de implementação (GA4)**:

```typescript
// lib/analytics.ts
export function trackEvent(eventName: string, properties: Record<string, any>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties);
  }
}

// components/CTAButton.tsx
import { trackEvent } from '@/lib/analytics';

export function CTAButton({ text, location }: { text: string; location: string }) {
  const handleClick = () => {
    trackEvent('CTA_click', {
      cta_location: location,
      cta_text: text,
      language: getCurrentLanguage()
    });
    // ... resto da lógica
  };
  
  return <button onClick={handleClick}>{text}</button>;
}
```

### 4.2. Backend (Nest.js)

**Server-side tracking** para eventos críticos (email, CRM) usando lib de analytics ou log estruturado.

**Exemplo com Winston (logs)**:

```typescript
// logger.service.ts
import { Logger } from '@nestjs/common';

export class AnalyticsLogger {
  private logger = new Logger('Analytics');
  
  trackEmailSent(leadId: string, success: boolean, error?: string) {
    const event = {
      event: success ? 'email_send_success' : 'email_send_fail',
      lead_id: leadId,
      timestamp: new Date().toISOString(),
      error_message: error || null
    };
    
    this.logger.log(JSON.stringify(event));
    
    // Opcional: enviar para GA4 via Measurement Protocol
    // ou para ferramenta de BI
  }
}
```

### 4.3. Pixel do Facebook/Meta

Adicionar Pixel para rastrear conversões de tráfego pago (se aplicável).

**Eventos do Pixel**:
- `PageView` (automático)
- `Lead` (disparado em `form_submit_success`)
- `CompleteRegistration` (disparado em `thank_you_page_view`)

(Fonte: plan.md §1.2 – "métricas configuradas (Analytics, Pixel)")

---

## 5. Ferramentas de analytics recomendadas

| Ferramenta | Uso | Prós | Contras |
|------------|-----|------|---------|
| **Google Analytics 4** | Tracking geral (page views, eventos de frontend) | Gratuito, poderoso, familiar | Curva de aprendizado em GA4 |
| **Facebook/Meta Pixel** | Tracking de conversões para tráfego pago | Essencial se rodar Facebook Ads | Apenas para Meta Ads |
| **Vercel Analytics** | Web Vitals + page views | Integração nativa com Vercel, simples | Limitado; não rastreia eventos customizados complexos |
| **Sentry** | Monitoramento de erros (frontend + backend) | Excelente para debugging | Não é ferramenta de analytics de negócio |
| **Custom logging (Winston/Pino)** | Logs estruturados no backend | Total controle; útil para debugging | Requer análise manual ou integração com BI |

**Recomendação para MVP**:
- **GA4** para frontend (eventos de usuário)
- **Winston + logs estruturados** para backend (integrações)
- **Meta Pixel** se houver budget para tráfego pago
- **Sentry** (opcional) se quiser monitoramento de erro robusto

---

## 6. Dashboards e relatórios

### 6.1. Métricas-chave para acompanhar

| Métrica | Fórmula | Frequência |
|---------|---------|------------|
| **Taxa de conversão de visitante → lead** | (`form_submit_success` / `page_view` únicos) × 100 | Semanal |
| **Taxa de conversão de lead → call agendada** | (`call_scheduled` / `form_submit_success`) × 100 | Semanal |
| **Taxa de conversão de call → proposta** | (`proposal_sent` / `call_completed`) × 100 | Mensal |
| **Taxa de conversão de proposta → fechamento** | (`proposal_accepted` / `proposal_sent`) × 100 | Mensal |
| **% de falhas em email** | (`email_send_fail` / total de submissões) × 100 | Diário |
| **% de falhas em CRM** | (`crm_sync_fail` / total de submissões) × 100 | Diário |
| **Distribuição de project_type** | Contagem por tipo | Semanal |
| **Distribuição de investment_range** | Contagem por faixa | Semanal |

### 6.2. Onde visualizar

- **GA4 Explorations**: criar relatórios customizados com eventos e propriedades.
- **Spreadsheet manual**: exportar dados do CRM semanalmente para análise.
- **Metabase/Redash** (opcional): conectar ao banco de dados Prisma para dashboards customizados.

---

**Próximos passos**: Especificação de conteúdo (copy) está em 08-content-spec.md. Componentes de UI estão em 09-ui-component-spec.md.
