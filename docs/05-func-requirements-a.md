# 05 — Requisitos Funcionais (Parte A)

## 1. FR-001: Formulário de captação de leads (frontend)

### 1.1. Descrição

Formulário estruturado em 1 ou 2 etapas para capturar leads qualificados, com validações em tempo real usando React Hook Form + Zod.

### 1.2. Campos

#### Etapa 1 (obrigatórios)

| Campo | Tipo | Validação Zod | Placeholder/Label | i18n key |
|-------|------|---------------|-------------------|----------|
| **Nome completo** | text | `z.string().min(3, "Nome deve ter pelo menos 3 caracteres")` | "Seu nome completo" | `form.name` |
| **Email** | email | `z.string().email("Email inválido").or(z.literal(""))` (obrigatório se WhatsApp vazio) | "seu@email.com" | `form.email` |
| **WhatsApp** | tel | `z.string().regex(/^\+55\s?\d{2}\s?9?\d{4}-?\d{4}$/, "WhatsApp inválido").or(z.literal(""))` (obrigatório se Email vazio) | "+55 61 99999-9999" | `form.whatsapp` |
| **Empresa** | text | `z.string().min(2, "Nome da empresa obrigatório")` | "Nome da sua empresa" | `form.company` |
| **Objetivo** | textarea | `z.string().min(10, "Descreva o objetivo com pelo menos 10 caracteres")` | "Qual o principal objetivo do projeto?" | `form.goal` |

#### Etapa 2 (obrigatórios + opcionais)

| Campo | Tipo | Validação Zod | Options/Placeholder | i18n key |
|-------|------|---------------|---------------------|----------|
| **Tipo de projeto** | select | `z.enum(["site-rapido", "aplicacao-sob-medida", "ainda-nao-sei"])` | "Site rápido", "Aplicação sob medida", "Ainda não sei" | `form.project_type` |
| **Faixa de investimento** | select | `z.enum(["ate-5k", "5k-15k", "15k-30k", "acima-30k", "discutir"])` | "até R$ 5k", "R$ 5k–15k", "R$ 15k–30k", "acima de R$ 30k", "Prefiro discutir" | `form.investment` |
| **Urgência** (opcional) | select | `z.enum(["2-semanas", "1-mes", "2-3-meses", "sem-pressa"]).nullable()` | "Preciso começar em até 2 semanas", "1 mês", "2–3 meses", "Sem pressa" | `form.urgency` |
| **Descrição adicional** (opcional) | textarea | `z.string().max(1000).nullable()` | "Conte mais sobre seu negócio e o problema que quer resolver (opcional)" | `form.description` |

### 1.3. Lógica condicional

- **Email ou WhatsApp obrigatório**: usar Zod refinement para validar que pelo menos um está preenchido.

```typescript
z.object({
  name: z.string().min(3),
  email: z.string().email().or(z.literal("")),
  whatsapp: z.string().regex(/^\+55\s?\d{2}\s?9?\d{4}-?\d{4}$/).or(z.literal("")),
  // ... outros campos
}).refine(data => data.email !== "" || data.whatsapp !== "", {
  message: "Preencha Email ou WhatsApp",
  path: ["email"]
});
```

### 1.4. UX do formulário

- **Validação em tempo real**: erros exibidos abaixo de cada campo ao perder foco (`onBlur`).
- **Indicadores de progresso** (se multistep): "Etapa 1 de 2" com barra de progresso.
- **Botões de ação**:
  - Etapa 1: "Continuar" (desabilitado se houver erros).
  - Etapa 2: "Enviar pedido" (desabilitado se houver erros ou enquanto enviando).
- **Estados de loading**: spinner no botão + texto "Enviando..." durante submissão.
- **Mensagem de próximos passos**: texto acima do botão "Enviar" (ex.: "Você receberá um email em até 24h com os próximos passos").

(Fonte: plan.md §3.5 – "Redução de fricção no formulário"; "Validação em tempo real no formulário")

### 1.5. Prioridade e dependências

- **Prioridade**: Must (blocker para MVP).
- **Dependências**: FR-002 (backend de submissão), FR-004 (validação Zod server-side).
- **Impacto no stack**: Frontend only (Next.js + React Hook Form + Zod).

### 1.6. Origem

(Fonte: plan.md §3.5 – "Redução de fricção no formulário"; §3.7 – "Estratégia de captura de leads qualificados")

---

## 2. FR-002: Backend de submissão de formulário

### 2.1. Descrição

Endpoint POST `/api/leads` no backend Nest.js para receber dados do formulário, validar, salvar no banco de dados (Prisma) e disparar integrações (email, CRM).

### 2.2. Request body

```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "whatsapp": "+55 61 99999-9999",
  "company": "Empresa X",
  "goal": "Criar landing page para captar leads",
  "project_type": "site-rapido",
  "investment_range": "5k-15k",
  "urgency": "1-mes",
  "description": "Precisamos validar oferta nova",
  "language": "pt-BR"
}
```

### 2.3. Fluxo de processamento

1. **Validar request body** com Zod server-side (duplicar validações do frontend).
2. **Salvar lead no banco de dados** via Prisma:
   - Tabela `Lead` com colunas: `id`, `name`, `email`, `whatsapp`, `company`, `goal`, `project_type`, `investment_range`, `urgency`, `description`, `language`, `created_at`, `updated_at`, `crm_synced` (boolean), `email_sent` (boolean).
3. **Disparar envio de email** (FR-003).
4. **Registrar lead no CRM** (FR-005).
5. **Retornar resposta** ao frontend:
   - Sucesso: `{ "success": true, "lead_id": "uuid" }`
   - Erro: `{ "success": false, "error": "Mensagem de erro" }`

### 2.4. Tratamento de erros

| Erro | Status HTTP | Resposta |
|------|-------------|----------|
| **Validação falha** | 400 | `{ "success": false, "error": "Dados inválidos", "details": [...] }` |
| **Erro ao salvar no banco** | 500 | `{ "success": false, "error": "Erro ao processar pedido" }` |
| **Erro ao enviar email** | 200 (lead salvo) | Log interno; flag `email_sent = false`; tentar reenvio assíncrono |
| **Erro ao sincronizar CRM** | 200 (lead salvo) | Log interno; flag `crm_synced = false`; tentar resincronização assíncrono |

### 2.5. Prioridade e dependências

- **Prioridade**: Must (blocker para MVP).
- **Dependências**: FR-001 (formulário frontend), FR-003 (envio de email), FR-004 (validação Zod), FR-005 (integração CRM).
- **Impacto no stack**: Backend only (Nest.js + Prisma).

### 2.6. Origem

(Fonte: plan.md §3.6 – "Lead preenche formulário com dados básicos e faixa de investimento; Recebe email automático")

---

## 3. FR-003: Envio de email automático ao lead

### 3.1. Descrição

Após salvamento do lead no banco de dados, disparar email automático com agradecimento, próximos passos e link de Calendly.

### 3.2. Gatilho

Executado dentro do fluxo de FR-002, após `Lead` ser persistido no banco.

### 3.3. Conteúdo do email

**Assunto**: "Obrigado pelo interesse, [Nome]! Próximos passos"

**Corpo** (HTML):

```html
<p>Olá, <strong>[Nome]</strong>!</p>

<p>Obrigado por preencher o formulário de projeto. Recebi suas informações e vou analisar com cuidado.</p>

<h3>Próximos passos:</h3>
<ol>
  <li>
    <strong>Agendamento de chamada (30–45 min)</strong>: 
    vamos conversar sobre seu negócio, entender o problema e ver se faz sentido trabalharmos juntos.
    <br><a href="https://calendly.com/seu-usuario/diagnostico">Agendar chamada agora</a>
  </li>
  <li>
    Se preferir, você pode me chamar diretamente no WhatsApp: 
    <a href="https://wa.me/5561999999999?text=Olá, preenchi o formulário no site">Clique aqui</a>
  </li>
  <li>
    Após a chamada, vou enviar uma proposta estruturada com escopo, prazo e investimento.
  </li>
</ol>

<p><strong>O que você pode esperar da nossa conversa:</strong></p>
<ul>
  <li>Diagnóstico do seu negócio e objetivo</li>
  <li>Alinhamento de expectativas</li>
  <li>Visão clara de como podemos resolver o problema</li>
</ul>

<p>Até breve,<br>
[Nome do desenvolvedor]</p>

<hr>
<p style="font-size: 12px; color: #666;">
  [Link do site] | [Link das redes sociais]
</p>
```

### 3.4. Variáveis dinâmicas

- `[Nome]`: `lead.name`
- `[Link de Calendly]`: configurável via variável de ambiente
- `[Link de WhatsApp]`: configurável via variável de ambiente

### 3.5. Provider de email

**Decisão pendente**: escolher entre:
- **Opção 1**: Serviço transacional (Resend, SendGrid, Amazon SES) — recomendado para produção.
- **Opção 2**: SMTP genérico (Gmail, Outlook) — aceitável para MVP, mas com limites de envio diário.

**Prós/Contras**:
| Opção | Prós | Contras |
|-------|------|---------|
| **Resend/SendGrid** | Deliverability alta, APIs simples, tracking de abertura/cliques | Custo (geralmente free tier suficiente para MVP) |
| **SMTP genérico** | Gratuito | Limites de envio (ex.: Gmail = 500/dia), risco de cair em spam |

### 3.6. Retry logic

Se envio falhar:
- **Tentar reenvio** 3x com backoff exponencial (1s, 5s, 15s).
- Se falhar definitivamente, marcar `email_sent = false` no banco e logar erro para inspeção manual.

### 3.7. Prioridade e dependências

- **Prioridade**: Must (blocker para MVP).
- **Dependências**: FR-002 (lead salvo no banco).
- **Impacto no stack**: Backend only (Nest.js + lib de email como Nodemailer ou SDK do provider).

### 3.8. Origem

(Fonte: plan.md §3.6 – "Recebe email automático agradecendo, explicando próximos passos e oferecendo link de Calendly")

---

## 4. FR-004: Validação server-side com Zod

### 4.1. Descrição

Duplicar todas validações do formulário (frontend) no backend para prevenir envio de dados inválidos via manipulação de request.

### 4.2. Schema Zod (backend)

```typescript
import { z } from 'zod';

export const LeadSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido").or(z.literal("")),
  whatsapp: z.string().regex(/^\+55\s?\d{2}\s?9?\d{4}-?\d{4}$/, "WhatsApp inválido").or(z.literal("")),
  company: z.string().min(2, "Nome da empresa obrigatório"),
  goal: z.string().min(10, "Descreva o objetivo com pelo menos 10 caracteres"),
  project_type: z.enum(["site-rapido", "aplicacao-sob-medida", "ainda-nao-sei"]),
  investment_range: z.enum(["ate-5k", "5k-15k", "15k-30k", "acima-30k", "discutir"]),
  urgency: z.enum(["2-semanas", "1-mes", "2-3-meses", "sem-pressa"]).nullable(),
  description: z.string().max(1000).nullable(),
  language: z.enum(["pt-BR", "en", "es"])
}).refine(data => data.email !== "" || data.whatsapp !== "", {
  message: "Preencha Email ou WhatsApp",
  path: ["email"]
});

export type LeadDto = z.infer<typeof LeadSchema>;
```

### 4.3. Uso no controller Nest.js

```typescript
import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { LeadSchema, LeadDto } from './lead.schema';

@Controller('api/leads')
export class LeadsController {
  @Post()
  async create(@Body() body: unknown) {
    const parseResult = LeadSchema.safeParse(body);
    
    if (!parseResult.success) {
      throw new HttpException({
        success: false,
        error: "Dados inválidos",
        details: parseResult.error.format()
      }, HttpStatus.BAD_REQUEST);
    }
    
    const leadData: LeadDto = parseResult.data;
    
    // Processar lead (salvar no banco, enviar email, CRM)
    // ...
  }
}
```

### 4.4. Prioridade e dependências

- **Prioridade**: Must (blocker para MVP).
- **Dependências**: FR-002 (backend de submissão).
- **Impacto no stack**: Backend only (Nest.js + Zod).

### 4.5. Origem

(Fonte: plan.md §1.6 – "boas práticas de segurança"; inferido de requisito de validação robusta)

---

## 5. FR-005: Integração com CRM

### 5.1. Descrição

Registrar lead automaticamente em CRM externo após salvamento no banco de dados.

### 5.2. Decisão pendente: escolha do CRM

| Opção | API disponível | Campos mínimos suportados | Prós | Contras |
|-------|----------------|---------------------------|------|---------|
| **HubSpot** | Sim (REST API) | Nome, email, telefone, empresa, custom properties | Poderoso, automações nativas, free tier generoso | Configuração inicial pode ser complexa |
| **Pipedrive** | Sim (REST API) | Nome, email, telefone, empresa, custom fields | Interface simples, foco em vendas | Free tier limitado |
| **Notion Database** | Sim (Notion API) | Qualquer propriedade customizada | Flexibilidade total, grátis | Não é CRM nativo; requer estrutura manual |
| **Webhook genérico** | N/A | Depende do destino | Integração com Zapier/Make/n8n | Depende de ferramenta externa |

**Recomendação para MVP**: HubSpot (free tier) ou Notion Database (se orçamento zero).

### 5.3. Campos mínimos a sincronizar

- `name` (texto)
- `email` (email)
- `whatsapp` (telefone)
- `company` (texto)
- `project_type` (select/dropdown)
- `investment_range` (select/dropdown)
- `urgency` (select/dropdown)
- `goal` (texto longo)
- `description` (texto longo; opcional)
- `language` (select/dropdown)
- `created_at` (data/hora)

### 5.4. Fluxo de sincronização

1. **Após salvar lead no banco**, chamar função `syncLeadToCRM(lead)`.
2. **Autenticar com CRM** (API key ou OAuth).
3. **Mapear dados** do formato interno para formato do CRM.
4. **Fazer POST** para endpoint de criação de contato/lead.
5. **Atualizar flag `crm_synced = true`** no banco.
6. **Se falhar**, marcar `crm_synced = false` e logar erro; tentar resincronização em job assíncrono (ex.: Bull queue).

### 5.5. Exemplo de integração HubSpot

```typescript
import axios from 'axios';

async function syncLeadToHubSpot(lead: Lead) {
  const hubspotApiKey = process.env.HUBSPOT_API_KEY;
  
  const payload = {
    properties: {
      firstname: lead.name.split(' ')[0],
      lastname: lead.name.split(' ').slice(1).join(' '),
      email: lead.email,
      phone: lead.whatsapp,
      company: lead.company,
      project_type: lead.project_type,
      investment_range: lead.investment_range,
      urgency: lead.urgency,
      goal: lead.goal,
      description: lead.description,
      language: lead.language
    }
  };
  
  try {
    const response = await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      payload,
      { headers: { 'Authorization': `Bearer ${hubspotApiKey}` } }
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao sincronizar com HubSpot:', error);
    throw error;
  }
}
```

### 5.6. Prioridade e dependências

- **Prioridade**: Must (blocker para MVP).
- **Dependências**: FR-002 (lead salvo no banco).
- **Impacto no stack**: Backend only (Nest.js + axios ou SDK do CRM).

### 5.7. Origem

(Fonte: plan.md §3.7 – "Estratégia de captura de leads qualificados"; inferido de necessidade de "registro organizado" mencionado em §3.8)

---

*Continua em 05-functional-requirements-parte-b.md*
