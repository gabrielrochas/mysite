# 10 — Arquitetura Técnica

## 1. Visão geral da arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 14+)               │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐│
│  │   App Router    │  │  Componentes    │  │   i18n       ││
│  │   (SSR/SSG)     │  │  (shadcn/ui)    │  │  (next-intl) ││
│  └─────────────────┘  └─────────────────┘  └──────────────┘│
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │ React Hook Form │  │   Tailwind CSS  │                  │
│  │     + Zod       │  │                 │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                            │ HTTP (POST)
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        BACKEND (Nest.js)                    │
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐│
│  │  Controllers    │  │    Services     │  │   Prisma     ││
│  │  (API routes)   │  │  (business      │  │   (ORM)      ││
│  │                 │  │   logic)        │  │              ││
│  └─────────────────┘  └─────────────────┘  └──────────────┘│
│  ┌─────────────────┐  ┌─────────────────┐                  │
│  │  Email Service  │  │  CRM Service    │                  │
│  │  (Nodemailer)   │  │  (integração)   │                  │
│  └─────────────────┘  └─────────────────┘                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  BANCO DE DADOS (PostgreSQL)                │
│  ┌─────────────────┐                                        │
│  │  Tabela: Lead   │                                        │
│  │  Tabela: Event  │ (opcional; tracking de eventos)       │
│  └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

(Fonte: stack informado no prompt)

---

## 2. Frontend (Next.js)

### 2.1. Estrutura de pastas (App Router)

```
/app
  /(root)
    /page.tsx                 # Página principal (pt-BR)
    /obrigado
      /page.tsx               # Página de obrigado
    /layout.tsx               # Layout root (header, footer)
  /[locale]                   # Rotas i18n
    /page.tsx                 # Página principal (/en, /es)
    /obrigado
      /page.tsx               # Página de obrigado (/en, /es)
  /api                        # API routes (opcional; proxy para backend)
    /leads
      /route.ts               # POST handler (proxy para Nest.js)

/components
  /ui                         # shadcn/ui components (Button, Card, Accordion, etc.)
  /sections                   # Componentes de seção (SectionHero, ServiceCard, etc.)
  /form                       # FormStep, FormField, etc.
  /layout                     # Header, Footer, LanguageSwitcher

/lib
  /analytics.ts               # Helper para tracking de eventos
  /i18n.ts                    # Configuração de next-intl

/messages
  /pt-BR
    /common.json, /hero.json, /form.json, etc.
  /en
    [mesma estrutura]
  /es
    [mesma estrutura]

/styles
  /globals.css                # Tailwind imports + custom styles
```

### 2.2. Rotas e i18n

**Rotas principais**:
- `/` (pt-BR padrão)
- `/en` (inglês)
- `/es` (espanhol)
- `/obrigado` (pt-BR)
- `/en/obrigado` (inglês)
- `/es/obrigado` (espanhol)

**Middleware de i18n** (next-intl):
- Detecta idioma via cookie ou `Accept-Language` header
- Redireciona para rota correta (`/en`, `/es`)
- Persiste preferência em cookie

(Fonte: FR-016, NFR-008)

### 2.3. Geração de páginas (SSG vs SSR)

**Estratégia recomendada**:
- **SSG (Static Site Generation)** para páginas de conteúdo fixo (/, /en, /es) usando `generateStaticParams`
- **SSR (Server-Side Rendering)** para /obrigado se houver personalização dinâmica (ex.: nome do lead via query param)

**Benefício**: Performance máxima (SSG) com flexibilidade onde necessário (SSR).

(Fonte: NFR-001 – Performance)

### 2.4. Integração com backend

**Opção 1: API route como proxy** (recomendado para Vercel):
```typescript
// app/api/leads/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const response = await fetch(`${process.env.BACKEND_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  
  return NextResponse.json(await response.json(), { status: response.status });
}
```

**Opção 2: Fetch direto do componente** (se CORS configurado):
```typescript
// components/form/FormStep.tsx
const handleSubmit = async (data: FormData) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/leads`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  // ...
};
```

(Fonte: FR-002 – Backend de submissão)

---

## 3. Backend (Nest.js)

### 3.1. Estrutura de módulos

```
/src
  /main.ts                    # Entry point
  /app.module.ts              # Root module
  
  /leads
    /leads.module.ts          # Módulo de leads
    /leads.controller.ts      # Controller (POST /api/leads)
    /leads.service.ts         # Business logic
    /lead.schema.ts           # Schema Zod
    /lead.entity.ts           # Prisma model (gerado)
  
  /email
    /email.module.ts          # Módulo de email
    /email.service.ts         # Envio de email (Nodemailer)
  
  /crm
    /crm.module.ts            # Módulo de integração CRM
    /crm.service.ts           # Sincronização com CRM externo
  
  /prisma
    /prisma.module.ts         # Prisma client module
    /prisma.service.ts        # Prisma service
  
  /common
    /logger.service.ts        # Logger personalizado
    /analytics.service.ts     # Server-side tracking (opcional)
```

### 3.2. Módulo principal: Leads

**Controller** (`leads.controller.ts`):
```typescript
import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadSchema, LeadDto } from './lead.schema';

@Controller('api/leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}
  
  @Post()
  async create(@Body() body: unknown) {
    const parseResult = LeadSchema.safeParse(body);
    
    if (!parseResult.success) {
      throw new HttpException({
        success: false,
        error: 'Dados inválidos',
        details: parseResult.error.format()
      }, HttpStatus.BAD_REQUEST);
    }
    
    return await this.leadsService.create(parseResult.data);
  }
}
```

**Service** (`leads.service.ts`):
```typescript
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EmailService } from '../email/email.service';
import { CrmService } from '../crm/crm.service';
import { LeadDto } from './lead.schema';

@Injectable()
export class LeadsService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
    private crmService: CrmService
  ) {}
  
  async create(data: LeadDto) {
    // 1. Salvar lead no banco
    const lead = await this.prisma.lead.create({ data });
    
    // 2. Enviar email (fire-and-forget com try/catch)
    this.emailService.sendWelcomeEmail(lead).catch(err => {
      console.error('Erro ao enviar email:', err);
      // Atualizar flag email_sent = false
    });
    
    // 3. Sincronizar CRM (fire-and-forget)
    this.crmService.syncLead(lead).catch(err => {
      console.error('Erro ao sincronizar CRM:', err);
      // Atualizar flag crm_synced = false
    });
    
    return { success: true, lead_id: lead.id };
  }
}
```

(Fonte: FR-002, FR-003, FR-005)

### 3.3. Prisma: modelo de dados

**Schema** (`prisma/schema.prisma`):
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Lead {
  id                String   @id @default(uuid())
  name              String
  email             String?
  whatsapp          String?
  company           String
  goal              String
  project_type      String
  investment_range  String
  urgency           String?
  description       String?
  language          String   @default("pt-BR")
  email_sent        Boolean  @default(false)
  crm_synced        Boolean  @default(false)
  created_at        DateTime @default(now())
  updated_at        DateTime @updatedAt
}

// Opcional: tabela de eventos de tracking
model Event {
  id          String   @id @default(uuid())
  event_name  String
  properties  Json
  lead_id     String?
  created_at  DateTime @default(now())
}
```

**Comandos Prisma**:
```bash
npx prisma migrate dev --name init   # Criar migration
npx prisma generate                  # Gerar Prisma Client
npx prisma studio                    # Visualizar dados (dev)
```

(Fonte: FR-002, stack informado no prompt)

---

## 4. Integrações

### 4.1. Email automático

**Provider**: Resend (recomendado) ou SMTP genérico.

**Exemplo com Nodemailer** (`email.service.ts`):
```typescript
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
  
  async sendWelcomeEmail(lead: Lead) {
    const calendlyLink = process.env.CALENDLY_URL;
    const whatsappLink = `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=Olá, preenchi o formulário no site`;
    
    await this.transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: lead.email,
      subject: `Obrigado pelo interesse, ${lead.name.split(' ')[0]}! Próximos passos`,
      html: `
        <p>Olá, <strong>${lead.name}</strong>!</p>
        <p>Obrigado por preencher o formulário de projeto...</p>
        <h3>Próximos passos:</h3>
        <ol>
          <li><a href="${calendlyLink}">Agendar chamada agora</a></li>
          <li><a href="${whatsappLink}">Chamar no WhatsApp</a></li>
        </ol>
      `
    });
  }
}
```

(Fonte: FR-003)

### 4.2. CRM (HubSpot exemplo)

**Exemplo** (`crm.service.ts`):
```typescript
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class CrmService {
  async syncLead(lead: Lead) {
    const hubspotApiKey = process.env.HUBSPOT_API_KEY;
    
    const payload = {
      properties: {
        firstname: lead.name.split(' ')[0],
        lastname: lead.name.split(' ').slice(1).join(' '),
        email: lead.email,
        phone: lead.whatsapp,
        company: lead.company,
        project_type: lead.project_type,
        investment_range: lead.investment_range
      }
    };
    
    await axios.post(
      'https://api.hubapi.com/crm/v3/objects/contacts',
      payload,
      { headers: { 'Authorization': `Bearer ${hubspotApiKey}` } }
    );
  }
}
```

(Fonte: FR-005)

---

## 5. Autenticação (better-auth)

### 5.1. Status atual

**Decisão pendente**: Área autenticada não é necessária para MVP do site institucional (site é público; formulário é aberto).

**Uso futuro**: Se houver necessidade de portal de clientes (acompanhamento de projetos, histórico, etc.), implementar better-auth com:
- Provedores: email/senha, Google OAuth
- Sessões: JWT ou cookies seguros
- Proteção de rotas: middleware do Next.js

(Fonte: 01-scope.md §3.1 – "Fora de escopo")

---

## 6. Qualidade/DevX

### 6.1. Biome.js

**Configuração** (`.biome.json`):
```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space",
    "indentWidth": 2
  },
  "linter": {
    "enabled": true,
    "rules": {
      "recommended": true
    }
  }
}
```

**Scripts** (`package.json`):
```json
{
  "scripts": {
    "lint": "biome check .",
    "format": "biome format --write ."
  }
}
```

### 6.2. Lefthook

**Configuração** (`.lefthook.yml`):
```yaml
pre-commit:
  commands:
    lint:
      run: npm run lint
    format:
      run: npm run format

pre-push:
  commands:
    type-check:
      run: npm run type-check
```

(Fonte: stack informado no prompt – NFR-010)

---

## 7. Deploy e ambientes

### 7.1. Frontend (Next.js)

**Recomendação**: Vercel (integração nativa com Next.js).

**Alternativas**: Netlify, AWS Amplify, self-hosted (Docker + Nginx).

**Variáveis de ambiente**:
- `NEXT_PUBLIC_BACKEND_URL` (URL do backend Nest.js)
- `NEXT_PUBLIC_CALENDLY_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_GA_ID` (Google Analytics)

### 7.2. Backend (Nest.js)

**Recomendação**: Railway, Render, Fly.io (PaaS com suporte a Node.js).

**Alternativas**: AWS EC2, DigitalOcean Droplet, Docker + VPS.

**Variáveis de ambiente**:
- `DATABASE_URL` (PostgreSQL connection string)
- `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`
- `HUBSPOT_API_KEY` (ou CRM escolhido)
- `CALENDLY_URL`, `WHATSAPP_NUMBER`, `EMAIL_FROM`

### 7.3. Banco de dados (PostgreSQL)

**Recomendação**: Neon, Supabase (managed PostgreSQL).

**Alternativas**: AWS RDS, Heroku Postgres, self-hosted.

---

## 8. Observabilidade

### 8.1. Logs estruturados (Winston)

**Exemplo de configuração**:
```typescript
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';

WinstonModule.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});
```

### 8.2. Monitoramento de erro (Sentry, opcional)

**Frontend**:
```typescript
// app/layout.tsx
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

**Backend**:
```typescript
// main.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});
```

(Fonte: NFR-006 – Observabilidade)

---

**Próximos passos**: Backlog com épicos e histórias está em 11-backlog.md.
