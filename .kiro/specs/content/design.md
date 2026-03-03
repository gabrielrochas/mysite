# Design Document: Content

## Overview

Esta feature implementa todo o sistema de conteúdo do site institucional, incluindo copy otimizado para conversão, estrutura de internacionalização (i18n) para 3 idiomas (pt-BR, en, es), e diretrizes de tom de voz consultivo.

O design estabelece uma arquitetura de conteúdo baseada em namespaces JSON, facilitando manutenção e tradução, com foco em filtrar leads qualificados e transmitir autoridade técnica sem arrogância.

### Objetivos Principais

- Estabelecer tom de voz consultivo e profissional
- Criar copy otimizado para conversão de leads B2B qualificados
- Implementar sistema de i18n escalável para 3 idiomas
- Filtrar leads não qualificados através de conteúdo estratégico
- Manter consistência terminológica em todo o site

### Escopo

**Incluído:**
- Tom de voz e diretrizes de copy
- Conteúdo completo para todas as seções (Hero, Services, Use Cases, Process, FAQ, Form)
- Traduções para pt-BR, en, es
- Estrutura de arquivos JSON por namespace
- Mensagens de validação de formulário
- Conteúdo de prova social (testimonials, cases)
- Meta tags e conteúdo SEO

**Não Incluído:**
- Conteúdo de blog ou artigos educacionais
- Vídeos ou conteúdo multimídia
- Chatbot ou conteúdo de chat ao vivo
- Conteúdo de área autenticada
- Newsletter ou email marketing (apenas email transacional de confirmação)

## Architecture

### Estrutura de Diretórios

```
messages/
├── pt-BR/
│   ├── common.json           # Navegação, footer, botões genéricos
│   ├── hero.json             # Hero section
│   ├── services.json         # Seção de serviços
│   ├── use-cases.json        # Casos de uso
│   ├── process.json          # Processo de trabalho
│   ├── technologies.json     # Stack técnico
│   ├── testimonials.json     # Depoimentos
│   ├── faq.json              # FAQ
│   ├── form.json             # Formulário e validações
│   └── meta.json             # Meta tags e SEO
├── en/
│   └── [mesma estrutura]
└── es/
    └── [mesma estrutura]

lib/
└── i18n.ts                   # Configuração de i18n

types/
└── content.ts                # Tipos TypeScript para conteúdo
```

### Princípios de Organização

1. **Namespace por seção**: Cada seção do site tem seu próprio arquivo JSON
2. **Flat structure**: Máximo 2 níveis de aninhamento nos JSONs
3. **Snake_case para keys**: Consistência e facilidade de leitura
4. **Variações explícitas**: Múltiplas versões de copy marcadas como _v1, _v2 para A/B testing

## Tom de Voz e Diretrizes

### Princípio Central

> **"Não vendo páginas, vendo ativos digitais que geram receita e eficiência."**

### Características do Tom

**✅ Fazer:**
- Falar como consultor especializado, não vendedor
- Ser direto e objetivo
- Demonstrar competência técnica sem jargão excessivo
- Focar em resultados de negócio mensuráveis
- Usar exemplos concretos e específicos

**❌ Evitar:**
- "Faço sites por R$ X"
- "24 horas de entrega"
- Jargão técnico desnecessário ("arquitetura serverless com microservices...")
- Promessas genéricas ("seu negócio vai decolar")
- Múltiplos CTAs conflitantes na mesma seção
- Tom corporativo frio ou excessivamente formal

### Exemplos de Aplicação

| ❌ Evitar | ✅ Preferir |
|-----------|-------------|
| "Criamos sites incríveis" | "Sites rápidos que geram caixa" |
| "Tecnologia de ponta" | "React e Node.js para automatizar operações" |
| "Entre em contato" | "Aplicar para projeto" |
| "Saiba mais" | "Ver casos de uso" |
| "Somos especialistas" | "Eliminar planilhas confusas e processos manuais" |

## Content Structure

### 1. Hero Section

#### pt-BR

```json
{
  "headline_v1": "Aplicações web sob medida que transformam processos soltos em produtos digitais lucrativos",
  "headline_v2": "Desenvolvimento full-stack para empresas que precisam ir além de um site bonito",
  "subheadline_v1": "React e Node.js para pequenas empresas e startups que querem automatizar operações, captar leads e escalar com tecnologia moderna.",
  "subheadline_v2": "Sites rápidos para validar ofertas e aplicações customizadas para eliminar planilhas e processos manuais.",
  "cta_primary": "Aplicar para projeto",
  "cta_primary_alt": "Agendar diagnóstico estratégico",
  "cta_secondary": "Ver casos de uso"
}
```

#### en

```json
{
  "headline_v1": "Custom web applications that turn scattered processes into profitable digital products",
  "headline_v2": "Full-stack development for businesses that need more than a pretty website",
  "subheadline_v1": "React and Node.js for small businesses and startups that want to automate operations, capture leads, and scale with modern technology.",
  "subheadline_v2": "Fast websites to validate offers and custom applications to eliminate spreadsheets and manual processes.",
  "cta_primary": "Apply for project",
  "cta_primary_alt": "Schedule strategic consultation",
  "cta_secondary": "See use cases"
}
```

#### es

```json
{
  "headline_v1": "Aplicaciones web a medida que transforman procesos dispersos en productos digitales rentables",
  "headline_v2": "Desarrollo full-stack para empresas que necesitan más que un sitio web bonito",
  "subheadline_v1": "React y Node.js para pequeñas empresas y startups que quieren automatizar operaciones, captar leads y escalar con tecnología moderna.",
  "subheadline_v2": "Sitios rápidos para validar ofertas y aplicaciones personalizadas para eliminar hojas de cálculo y procesos manuales.",
  "cta_primary": "Aplicar para proyecto",
  "cta_primary_alt": "Agendar consultoría estratégica",
  "cta_secondary": "Ver casos de uso"
}
```

### 2. Services Section

#### pt-BR

```json
{
  "section_title": "Serviços",
  "fast_sites": {
    "title": "Sites rápidos que geram caixa",
    "bullets": [
      "Escopo fechado: 1 página + obrigado, integrações básicas, sem surpresas",
      "Prazo curto: entrega em dias, não semanas, para você rodar campanha rápido",
      "Tracking configurado: Analytics e Pixel prontos, você acompanha resultados desde o dia 1",
      "Copy focada em conversão: não é 'institucional chato', é ferramenta de vendas"
    ],
    "cta": "Quero um site rápido"
  },
  "custom_apps": {
    "title": "Aplicações web sob medida",
    "bullets": [
      "Eliminar planilhas confusas e processos manuais que travam seu time",
      "Redução de erros: automatizar tarefas repetitivas e centralizar informações",
      "Visibilidade em tempo real: dashboards e relatórios para decisões mais rápidas",
      "Tecnologia moderna: React + Node.js, boas práticas, código manutenível"
    ],
    "cta": "Quero uma aplicação sob medida"
  }
}
```

### 3. Use Cases

#### pt-BR

```json
{
  "section_title": "Casos de uso",
  "small_business": {
    "title": "Pequenas empresas de serviços",
    "description": "Landing page para captar agendamentos, site institucional com formulário de contato, sistema simples de agendamento integrado ao Google Calendar.",
    "triggers": [
      "Captar clientes online via tráfego pago",
      "Validar oferta nova sem investir em algo complexo",
      "Presença digital profissional para transmitir credibilidade"
    ]
  },
  "startups": {
    "title": "Startups e empresas em crescimento",
    "description": "CRM interno customizado, dashboard de operação com métricas em tempo real, sistema de pedidos, portal de clientes com histórico de transações.",
    "triggers": [
      "Eliminar planilhas que não escalam",
      "Centralizar informação dispersa em WhatsApp, Notion e email",
      "Ter visibilidade de operação para tomar decisões rápidas"
    ]
  },
  "established_companies": {
    "title": "Empresas com operação estruturada",
    "description": "Dashboard para acompanhar produção, sistema de pedidos customizado, automação de fluxos entre ERP e outras ferramentas.",
    "triggers": [
      "Integrar sistemas que não conversam entre si",
      "Automatizar tarefas manuais que geram erro",
      "Ter controle em tempo real de processos críticos"
    ]
  }
}
```

### 4. Process Section

#### pt-BR

```json
{
  "section_title": "Processo de trabalho",
  "steps": [
    {
      "title": "Diagnóstico",
      "description": "Chamada de 30–45 min para entender seu negócio, processo atual e objetivo. Não é 'reunião de vendas', é conversa técnica para ver se faz sentido trabalharmos juntos.",
      "duration": "30-45 min"
    },
    {
      "title": "Proposta e escopo",
      "description": "Em até 3 dias, você recebe proposta estruturada com escopo claro, prazo realista e investimento detalhado. Sem surpresas no meio do caminho.",
      "duration": "3 dias"
    },
    {
      "title": "Kick-off",
      "description": "Alinhamento final de expectativas, definição de marcos de entrega e configuração de ferramentas de acompanhamento.",
      "duration": "1-2h"
    },
    {
      "title": "Desenvolvimento",
      "description": "Trabalho em sprints curtos (1–2 semanas) com entregas parciais para você acompanhar evolução e dar feedback.",
      "duration": "4-12 semanas"
    },
    {
      "title": "Entrega e testes",
      "description": "Revisão final, testes de qualidade, ajustes e publicação em produção.",
      "duration": "1 semana"
    },
    {
      "title": "Suporte inicial",
      "description": "30 dias de garantia para ajustes e dúvidas. Depois, planos de manutenção mensal disponíveis.",
      "duration": "30 dias"
    }
  ]
}
```

### 5. FAQ Section

#### pt-BR

```json
{
  "section_title": "Perguntas frequentes",
  "questions": [
    {
      "question": "Quanto custa?",
      "answer": "Sites rápidos têm escopo fechado e faixa de investimento previsível. Aplicações sob medida variam conforme complexidade — CRM simples é diferente de plataforma B2B. Após a call de diagnóstico, envio proposta com valor detalhado por etapa."
    },
    {
      "question": "Qual o prazo?",
      "answer": "Sites rápidos: até 10 dias úteis. Aplicações sob medida: entre 4 e 12 semanas, dependendo do escopo. Trabalho em sprints curtos (1–2 semanas) com entregas parciais para você acompanhar evolução."
    },
    {
      "question": "Como funciona o pagamento?",
      "answer": "Geralmente divido em 3 parcelas: 30% no início (para começar), 40% no meio (após primeira entrega), 30% na entrega final. Aceito PIX, boleto e transferência. Tudo documentado em contrato simples."
    },
    {
      "question": "E se eu não souber definir o que preciso?",
      "answer": "Normal! A call de diagnóstico serve justamente para isso. Você explica o problema, eu faço perguntas sobre seu processo e negócio, e juntos chegamos num escopo claro. Não espero que você chegue com 'especificação técnica pronta'."
    },
    {
      "question": "Vocês dão suporte após entrega?",
      "answer": "Sim. Todo projeto inclui 30 dias de garantia para ajustes e dúvidas. Depois, ofereço planos de manutenção mensal para correções, melhorias e atualizações."
    },
    {
      "question": "Por que não usar plataforma pronta?",
      "answer": "Plataformas prontas (Wix, WordPress, no-code) são ótimas para casos simples. Se você precisa de integrações específicas, regras de negócio customizadas ou algo que 'não existe pronto', código sob medida é mais eficiente e escalável. E você não fica refém de mensalidades de plugins."
    }
  ]
}
```

### 6. Form Section

#### pt-BR

```json
{
  "section_title": "Aplicar para projeto",
  "fields": {
    "name": {
      "label": "Seu nome completo",
      "placeholder": "João Silva",
      "errors": {
        "required": "Nome é obrigatório",
        "min_length": "Nome deve ter pelo menos 3 caracteres"
      }
    },
    "email": {
      "label": "Seu email",
      "placeholder": "joao@empresa.com",
      "errors": {
        "required": "Email é obrigatório",
        "invalid": "Email inválido"
      }
    },
    "whatsapp": {
      "label": "Seu WhatsApp",
      "placeholder": "+55 61 99999-9999",
      "errors": {
        "required": "WhatsApp é obrigatório",
        "invalid": "WhatsApp inválido"
      }
    },
    "company": {
      "label": "Nome da sua empresa",
      "placeholder": "Empresa X Ltda",
      "errors": {
        "required": "Nome da empresa é obrigatório"
      }
    },
    "objective": {
      "label": "Qual o principal objetivo do projeto?",
      "placeholder": "Ex.: Criar landing page para captar leads",
      "errors": {
        "required": "Objetivo é obrigatório",
        "min_length": "Descreva o objetivo com pelo menos 10 caracteres"
      }
    },
    "project_type": {
      "label": "Tipo de projeto",
      "options": [
        "Site rápido (landing page, institucional)",
        "Aplicação sob medida (CRM, dashboard, sistema)",
        "Ainda não sei"
      ],
      "errors": {
        "required": "Selecione o tipo de projeto"
      }
    },
    "budget_range": {
      "label": "Faixa de investimento que faz sentido para você",
      "options": [
        "Até R$ 5.000",
        "R$ 5.000 - R$ 15.000",
        "R$ 15.000 - R$ 30.000",
        "Acima de R$ 30.000",
        "Preciso entender melhor"
      ],
      "errors": {
        "required": "Selecione a faixa de investimento"
      }
    },
    "urgency": {
      "label": "Qual a urgência?",
      "options": [
        "Urgente (preciso em até 2 semanas)",
        "Médio prazo (1-2 meses)",
        "Longo prazo (3+ meses)",
        "Sem pressa, quero entender viabilidade"
      ]
    },
    "additional_info": {
      "label": "Conte mais sobre seu negócio e o problema (opcional)",
      "placeholder": ""
    }
  },
  "submit_button": "Enviar",
  "submit_message": "Você receberá um email em até 24 horas com os próximos passos e link para agendar uma chamada.",
  "filter_text": "Esse diagnóstico é para empresas que buscam resultado real, não apenas 'um site bonitinho'. Se você quer algo profissional e está disposto a investir de forma adequada, vamos conversar."
}
```

### 7. Thank You Page

#### pt-BR

```json
{
  "title": "Obrigado pelo contato!",
  "confirmation": "Recebemos sua mensagem e entraremos em contato em breve.",
  "next_steps": "Você receberá um email em até 24 horas com os próximos passos.",
  "cta_whatsapp": "Chamar no WhatsApp",
  "cta_home": "Voltar para o início"
}
```

## Data Models

### Translation File Type

```typescript
// types/content.ts
export interface TranslationFile {
  [key: string]: string | TranslationObject
}

export interface TranslationObject {
  [key: string]: string | string[] | TranslationObject
}

export interface HeroContent {
  headline_v1: string
  headline_v2: string
  subheadline_v1: string
  subheadline_v2: string
  cta_primary: string
  cta_primary_alt: string
  cta_secondary: string
}

export interface ServiceContent {
  title: string
  bullets: string[]
  cta: string
}

export interface UseCaseContent {
  title: string
  description: string
  triggers: string[]
}

export interface ProcessStep {
  title: string
  description: string
  duration: string
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FormField {
  label: string
  placeholder?: string
  options?: string[]
  errors: {
    [key: string]: string
  }
}
```

### i18n Configuration

```typescript
// lib/i18n.ts
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

export const supportedLanguages = ['pt-BR', 'en', 'es'] as const
export type SupportedLanguage = typeof supportedLanguages[number]

export const defaultLanguage: SupportedLanguage = 'pt-BR'

export const namespaces = [
  'common',
  'hero',
  'services',
  'use-cases',
  'process',
  'technologies',
  'testimonials',
  'faq',
  'form',
  'meta'
] as const

export type Namespace = typeof namespaces[number]

export async function initI18n(lang: SupportedLanguage, ns: Namespace) {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/messages/${language}/${namespace}.json`)
      )
    )
    .init({
      lng: lang,
      fallbackLng: defaultLanguage,
      ns,
      defaultNS: 'common',
      supportedLngs: supportedLanguages,
    })
  return i18nInstance
}
```

## Implementation Notes

### Translation Strategy

**Ordem de prioridade:**
1. pt-BR (idioma principal, 100% completo)
2. en (segundo mais importante, para clientes internacionais)
3. es (terceiro, para América Latina)

**Processo de tradução:**
1. Escrever copy original em pt-BR
2. Traduzir para en mantendo tom consultivo
3. Traduzir para es mantendo tom consultivo
4. Revisar consistência terminológica entre idiomas

**Termos técnicos:**
- Manter em inglês quando universalmente reconhecidos: "React", "Node.js", "CRM", "dashboard", "API"
- Traduzir termos de negócio: "lead" → "lead" (pt-BR/en), "prospecto" (es)

### Content Maintenance

**Adição de novo conteúdo:**
1. Adicionar em pt-BR primeiro
2. Adicionar traduções en e es
3. Verificar consistência de keys em todos os arquivos
4. Testar em todas as línguas

**Modificação de conteúdo existente:**
1. Modificar em pt-BR
2. Atualizar traduções correspondentes
3. Verificar se mudança afeta tom de voz geral

### A/B Testing Strategy

**Variações de copy:**
- Headlines marcadas como _v1, _v2, etc.
- Implementar seleção de variação via feature flag ou query param
- Rastrear performance de cada variação via Analytics

**Elementos para testar:**
- Headlines do Hero
- CTAs primários
- Ordem de bullets em Services
- Perguntas do FAQ

### SEO Considerations

**Meta tags por página:**
```json
{
  "home": {
    "title": "Gabriel Rocha - Desenvolvimento Web Full-Stack | React & Node.js",
    "description": "Aplicações web sob medida e sites rápidos para empresas que precisam automatizar operações e captar leads. React, Node.js, Next.js.",
    "keywords": "desenvolvimento web, react, nodejs, aplicações sob medida, landing page"
  },
  "thank_you": {
    "title": "Obrigado | Gabriel Rocha",
    "description": "Mensagem recebida com sucesso",
    "robots": "noindex, follow"
  }
}
```

**Estrutura de headings:**
- H1: Headline principal (Hero)
- H2: Títulos de seção (Serviços, Casos de uso, Processo, FAQ)
- H3: Subtítulos dentro de seções (títulos de serviços, casos de uso)

### Accessibility

**Conteúdo acessível:**
- Usar linguagem clara e direta
- Evitar jargão excessivo
- Estruturar conteúdo com headings semânticos
- Fornecer labels descritivos para formulários
- Incluir alt text para imagens (quando aplicável)

**Mensagens de erro:**
- Específicas e acionáveis
- Anunciadas por screen readers
- Visualmente destacadas

## Correctness Properties

### Property 1: Translation Completeness

*For any* supported language (pt-BR, en, es), when a translation file is loaded, all keys present in the pt-BR version SHALL exist in the corresponding language file.

**Validates: Requirements 8.1, 8.4, 8.6**

### Property 2: Consistent Terminology

*For any* technical term (React, Node.js, CRM, dashboard), when used across different namespaces and languages, the term SHALL be consistent.

**Validates: Requirement 18.1, 18.2, 18.3, 18.4**

### Property 3: Character Limits

*For any* headline, CTA, or form label, when rendered, the text length SHALL not exceed the specified maximum character count.

**Validates: Requirements 3.1, 7.5, 12.5**

### Property 4: Error Message Specificity

*For any* form validation error, when displayed, the error message SHALL indicate both what is wrong and how to fix it.

**Validates: Requirements 13.1, 13.2, 13.4**

### Property 5: Tone Consistency

*For any* user-facing text, when evaluated against tone guidelines, the text SHALL maintain consultive tone without sales-focused language.

**Validates: Requirements 1.1, 1.2, 1.3, 1.5**

## Testing Strategy

### Unit Testing

**Translation file validation:**
```typescript
// __tests__/content/translations.test.ts
describe('Translation Completeness', () => {
  const languages = ['pt-BR', 'en', 'es']
  const namespaces = ['hero', 'services', 'form', 'faq']
  
  languages.forEach(lang => {
    namespaces.forEach(ns => {
      it(`${lang}/${ns}.json has all required keys`, async () => {
        const ptBR = await import(`@/messages/pt-BR/${ns}.json`)
        const translation = await import(`@/messages/${lang}/${ns}.json`)
        
        const ptBRKeys = Object.keys(flattenObject(ptBR))
        const translationKeys = Object.keys(flattenObject(translation))
        
        expect(translationKeys).toEqual(expect.arrayContaining(ptBRKeys))
      })
    })
  })
})
```

**Character limit validation:**
```typescript
describe('Character Limits', () => {
  it('hero headlines are under 120 characters', async () => {
    const hero = await import('@/messages/pt-BR/hero.json')
    
    expect(hero.headline_v1.length).toBeLessThanOrEqual(120)
    expect(hero.headline_v2.length).toBeLessThanOrEqual(120)
  })
  
  it('CTA text is under 30 characters', async () => {
    const hero = await import('@/messages/pt-BR/hero.json')
    
    expect(hero.cta_primary.length).toBeLessThanOrEqual(30)
    expect(hero.cta_secondary.length).toBeLessThanOrEqual(30)
  })
})
```

### Property-Based Testing

```typescript
/**
 * Feature: content, Property 1: Translation Completeness
 */
describe('Property: Translation Completeness', () => {
  it('all languages have same keys for any namespace', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(...namespaces),
        async (namespace) => {
          const ptBR = await import(`@/messages/pt-BR/${namespace}.json`)
          const en = await import(`@/messages/en/${namespace}.json`)
          const es = await import(`@/messages/es/${namespace}.json`)
          
          const ptBRKeys = Object.keys(flattenObject(ptBR)).sort()
          const enKeys = Object.keys(flattenObject(en)).sort()
          const esKeys = Object.keys(flattenObject(es)).sort()
          
          expect(enKeys).toEqual(ptBRKeys)
          expect(esKeys).toEqual(ptBRKeys)
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

### Manual QA Checklist

- [ ] Ler todo o conteúdo em voz alta para verificar naturalidade
- [ ] Verificar consistência de tom em todas as seções
- [ ] Testar formulário com mensagens de erro em todos os idiomas
- [ ] Verificar que CTAs são claros e acionáveis
- [ ] Confirmar que FAQ responde objeções principais
- [ ] Validar que conteúdo filtra leads não qualificados
- [ ] Revisar meta tags para SEO
- [ ] Verificar acessibilidade de labels e mensagens de erro

---

**Próximos passos**: Implementação de componentes UI que consomem este conteúdo está em 09-ui-component-spec.md.
