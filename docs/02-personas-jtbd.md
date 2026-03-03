# 02 — Personas e Jobs-to-be-Done

## 1. Persona A: Dono de Pequena Empresa de Serviços

### 1.1. Perfil

- **Nome fictício**: Carlos, 38 anos
- **Cargo**: Proprietário de clínica odontológica / escritório de contabilidade / agência de marketing local
- **Empresa**: 5–15 funcionários, faturamento anual de R$ 500k–2M
- **Idioma preferencial**: pt-BR (99% dos casos); en/es apenas se empresa tiver operação internacional ou atender clientes estrangeiros

### 1.2. Jobs-to-be-Done (JTBD)

**Quando** preciso divulgar meus serviços e captar novos clientes online,  
**quero** uma landing page ou site institucional simples, rápido e profissional,  
**para que** eu possa rodar campanhas de tráfego pago (Google Ads, Facebook Ads) e converter visitantes em agendamentos ou leads qualificados.

(Fonte: plan.md §1.2 – "Sites rápidos [...] landing pages e sites institucionais otimizados para conversão, usados para validar ofertas, rodar tráfego e gerar caixa rápido")

### 1.3. Dores e objeções

| Dor | Como o site responde |
|-----|----------------------|
| **"Não sei se vale a pena investir em site, pode não dar retorno"** | Seção de casos de uso mostra exemplos concretos de clínicas/empresas que aumentaram leads via landing page profissional |
| **"Já tentei fazer site barato e não funcionou"** | Processo transparente (diagnóstico → escopo → copy → design → implementação → acompanhamento) mostra método, não improviso |
| **"Não tenho tempo para ficar dando briefing e validando telas"** | Prazo curto e escopo fechado (1 página + obrigado, integrações básicas) reduz idas e vindas |
| **"Meu primo/sobrinho faz site de graça"** | Copy reforça: "não vendo páginas, vendo ativos digitais que geram receita" — foco em conversão, não em HTML bonito |

(Fonte: plan.md §1.2 – "não parecer um 'criador de site barato'"; §1.4 – "Como evitar competir apenas por preço")

### 1.4. Gatilhos de decisão

- Urgência: precisa de site para rodar campanha de marketing em poucas semanas.
- Validação: quer testar oferta nova ou reposicionar serviço existente.
- Autoridade: busca desenvolvedor que entenda de negócio, não só de código.

(Fonte: plan.md §3.7 – "perguntas de qualificação sutis: faixa de investimento, nível de urgência")

### 1.5. Observações de idioma

- **pt-BR** é o idioma principal para essa persona no contexto brasileiro.
- Se a empresa atende clientes de outros países (ex.: clínica de turismo médico, consultoria internacional), pode preferir versão **en** ou **es**.
- **Implicação de i18n**: Seletor de idioma deve estar visível no header, mas pt-BR deve ser padrão.

---

## 2. Persona B: Fundador de Startup / Scale-up

### 2.1. Perfil

- **Nome fictício**: Marina, 32 anos
- **Cargo**: Co-fundadora e COO (Chief Operating Officer)
- **Empresa**: Startup B2B SaaS ou marketplace com 10–30 funcionários, já tem produto validado mas processos internos ainda manuais (planilhas, Notion solto, WhatsApp)
- **Idioma preferencial**: pt-BR (maioria); **en** se startup operar no mercado americano/europeu ou buscar investimento estrangeiro

### 2.2. Jobs-to-be-Done (JTBD)

**Quando** minha operação cresce e planilhas/processos manuais começam a gerar gargalos e erros,  
**quero** um sistema interno customizado (CRM, dashboard, portal de clientes, automação de fluxos),  
**para que** eu possa centralizar informações, reduzir retrabalho e ter visibilidade em tempo real para tomar decisões melhores.

(Fonte: plan.md §1.3 – "Aplicações sob medida: eliminar planilhas confusas e processos manuais, criar portais de clientes, dashboards internos, sistemas de pedidos, CRMs específicos")

### 2.3. Dores e objeções

| Dor | Como o site responde |
|-----|----------------------|
| **"Não sei por onde começar, meu problema é complexo"** | Processo em fases bem explicado: discovery → escopo → protótipo → sprints → entrega → acompanhamento |
| **"Tenho medo de contratar e o sistema não fazer o que preciso"** | Seção de casos de uso mostra sistemas reais entregues (ex.: dashboard de operação, sistema de pedidos, automação) |
| **"Já gastei dinheiro com dev que prometeu e não entregou"** | Depoimentos contextualizados (tipo de negócio, problema, resultado) transmitem credibilidade |
| **"Preciso de algo rápido, mas não quero gambiarra"** | Copy reforça: tecnologia moderna (React, Node.js, boas práticas) + processo estruturado = entrega sólida e manutenível |

(Fonte: plan.md §1.3 – "eliminar planilhas confusas"; §2.6 – "Processo de trabalho: transmitir segurança e previsibilidade")

### 2.4. Gatilhos de decisão

- Crescimento: equipe cresceu e processos manuais não escalam.
- Erros operacionais: perda de informação, retrabalho, falta de visibilidade.
- Busca por especialista: precisa de alguém que entenda de produto digital, não apenas "programador".

(Fonte: plan.md §1.3 – "automatizam processos, centralizam operações e escalam o negócio")

### 2.5. Observações de idioma

- **pt-BR** para startups nacionais.
- **en** se startup buscar clientes ou investidores internacionais, ou se fundadores forem estrangeiros operando no Brasil.
- **Implicação de i18n**: Conteúdo técnico (casos de uso, tecnologias) deve ser traduzido com termos consistentes (ex.: "dashboard" = "painel" em pt-BR vs "dashboard" em en).

---

## 3. Persona C: Gestor de Operação em Pequena/Média Indústria

### 3.1. Perfil

- **Nome fictício**: Roberto, 45 anos
- **Cargo**: Gerente de operações ou TI
- **Empresa**: Pequena indústria, distribuidora, empresa de logística com 50–200 funcionários; já usa ERP genérico mas precisa de sistemas complementares
- **Idioma preferencial**: pt-BR (99%); raramente **es** se empresa tiver operação na América Latina

### 3.2. Jobs-to-be-Done (JTBD)

**Quando** o ERP não cobre fluxos específicos da minha operação (ex.: rastreamento de pedidos, portal para fornecedores, dashboard de produção),  
**quero** uma aplicação customizada que se integre ao sistema existente ou funcione de forma standalone,  
**para que** eu possa automatizar tarefas repetitivas, reduzir erros de digitação e ter controle em tempo real.

(Fonte: plan.md §1.3 – "CRMs específicos, dashboards internos, sistemas de pedidos"; §2.5 – "Empresas com sistema interno: dashboard para operação, sistema de pedidos, automação de fluxos")

### 3.3. Dores e objeções

| Dor | Como o site responde |
|-----|----------------------|
| **"Já temos ERP, por que precisamos de outra coisa?"** | Casos de uso explicam que aplicações sob medida complementam ERPs, resolvendo gaps específicos |
| **"Desenvolvedor vai prometer e atrasar 6 meses"** | Processo com sprints curtos e entregáveis incrementais mostra que há acompanhamento constante |
| **"Tenho receio de segurança e integrações"** | Seção de tecnologias menciona boas práticas de segurança, REST APIs, integrações padronizadas |
| **"Preciso de suporte pós-entrega"** | Processo inclui "acompanhamento inicial / suporte" após entrega |

(Fonte: plan.md §1.6 – "Stack moderna [...] com menção a padrões (REST, boas práticas de segurança, integrações)"; §2.6 – "Acompanhamento inicial / suporte")

### 3.4. Gatilhos de decisão

- Crescimento operacional: volume de pedidos/produção aumentou, sistema manual não dá conta.
- Custo de erro: erros de digitação ou falta de rastreamento geram prejuízo.
- Pressão por eficiência: direção exige redução de custos operacionais via automação.

(Fonte: plan.md §1.5 – "transformar ideia/processo em produto digital que gera receita ou eficiência")

### 3.5. Observações de idioma

- **pt-BR** dominante.
- **es** apenas se indústria tiver filial ou clientes na América Latina hispânica (raro, mas possível).
- **Implicação de i18n**: Terminologia técnica (ex.: "ERP", "API", "dashboard") é similar em pt-BR/en/es, facilitando tradução.

---

## 4. Síntese de idioma por persona

| Persona | Idioma primário | Idiomas secundários | Implicações para i18n |
|---------|-----------------|---------------------|------------------------|
| **Dono de pequena empresa** | pt-BR | en/es (raros) | pt-BR deve ser padrão; seletor de idioma visível mas não intrusivo |
| **Fundador de startup** | pt-BR | en (comum se internacionalização ou investidor estrangeiro) | Conteúdo técnico (casos de uso, tecnologias) deve ser traduzido com consistência |
| **Gestor de operação** | pt-BR | es (raro) | Terminologia técnica é padronizada; tradução simples |

**Conclusão**: pt-BR é idioma dominante. en é segundo mais relevante (startups internacionais, clientes estrangeiros). es é terciário (América Latina). Seletor de idioma no header é suficiente; detecção automática via navegador pode ser opcional.

(Fonte: inferido de contexto brasileiro do plan.md + menção a "pequenas empresas", "startups", "indústrias" sem indicação de mercado internacional massivo)

---

## 5. Mapping de personas para ofertas

| Persona | Oferta mais provável | Oferta secundária |
|---------|----------------------|-------------------|
| **Dono de pequena empresa** | Site rápido (landing page, site institucional) | Aplicação sob medida (ex.: sistema de agendamento simples) |
| **Fundador de startup** | Aplicação sob medida (CRM, dashboard, portal) | Site rápido (landing page para validar oferta nova) |
| **Gestor de operação** | Aplicação sob medida (sistema de pedidos, automação) | Raramente site rápido (a não ser que precise de portal externo para clientes/fornecedores) |

(Fonte: plan.md §1.3 – "sites rápidos são a porta de entrada [...] ao validarem sua oferta, naturalmente enxergam a necessidade de um sistema mais robusto")

---

**Próximos passos**: Jornadas detalhadas de cada persona estão em 03-user-journeys.md. Requisitos funcionais do formulário (campos de qualificação) estão em 05-functional-requirements.md.
