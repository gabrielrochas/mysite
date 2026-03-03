# Requirements Document

## Introduction

Este documento especifica os requisitos de conteúdo para o site institucional, incluindo tom de voz, mensagens-chave, textos por seção e estrutura de internacionalização (i18n). O conteúdo é otimizado para conversão de leads qualificados B2B, posicionando o desenvolvedor como especialista em produtos digitais sob medida.

O objetivo é estabelecer diretrizes claras de conteúdo que transmitam autoridade, filtrem leads não qualificados e comuniquem valor de forma consultiva (não vendedora).

## Glossary

- **Content_System**: Sistema responsável por todo conteúdo textual do site, incluindo copy, labels, mensagens de erro e traduções
- **Tone_Of_Voice**: Tom consultivo, direto e profissional usado em todo o conteúdo
- **Value_Proposition**: Proposta de valor que diferencia o desenvolvedor de "quem faz site barato"
- **Lead_Qualifier**: Elementos de conteúdo que filtram leads não qualificados (faixa de investimento, urgência)
- **Translation_File**: Arquivo JSON contendo strings traduzidas por idioma (pt-BR, en, es)
- **Content_Namespace**: Agrupamento lógico de conteúdo (hero, services, form, faq)
- **CTA_Copy**: Texto de call-to-action otimizado para conversão
- **Error_Message**: Mensagem de validação de formulário
- **Social_Proof**: Elementos de prova social (depoimentos, casos de uso)

## Requirements

### Requirement 1: Tom de Voz Consultivo

**User Story:** Como visitante B2B, quero sentir que estou conversando com um consultor especializado, para que eu confie na capacidade técnica e estratégica do desenvolvedor

#### Acceptance Criteria

1. THE Content_System SHALL use consultive tone, not sales-focused language
2. THE Content_System SHALL avoid phrases like "faço sites por R$ X" or "24 horas de entrega"
3. THE Content_System SHALL use direct and objective language without unnecessary jargon
4. THE Content_System SHALL demonstrate confidence without arrogance
5. THE Content_System SHALL maintain professional tone without being rigid
6. THE Content_System SHALL focus on business results, not technical features
7. THE Content_System SHALL avoid multiple conflicting CTAs in the same section

### Requirement 2: Proposta de Valor Clara

**User Story:** Como visitante, quero entender rapidamente o que diferencia este desenvolvedor de outros, para que eu saiba se faz sentido continuar explorando o site

#### Acceptance Criteria

1. THE Content_System SHALL communicate core value proposition "Não vendo páginas, vendo ativos digitais que geram receita e eficiência"
2. THE Hero_Section SHALL present clear headline focusing on business transformation
3. THE Hero_Section SHALL include subheadline explaining target audience and benefits
4. THE Content_System SHALL differentiate between "Sites rápidos" and "Aplicações sob medida"
5. THE Content_System SHALL emphasize measurable results over technical implementation
6. THE Content_System SHALL position developer as product consultant, not "programmer"

### Requirement 3: Conteúdo Hero Section (pt-BR)

**User Story:** Como visitante brasileiro, quero ver uma mensagem impactante que explique o valor oferecido, para que eu decida rapidamente se este serviço atende minhas necessidades

#### Acceptance Criteria

1. THE Hero_Section SHALL display headline with maximum 120 characters
2. THE Hero_Section SHALL provide at least 2 headline variations for A/B testing
3. THE Hero_Section SHALL include subheadline with 150-200 characters
4. THE Hero_Section SHALL display primary CTA with action-oriented text
5. THE Hero_Section SHALL optionally display secondary CTA for lower-commitment action
6. THE headline SHALL mention "aplicações web sob medida" or "desenvolvimento full-stack"
7. THE subheadline SHALL mention target technologies (React, Node.js) and target audience

### Requirement 4: Conteúdo de Serviços (pt-BR)

**User Story:** Como visitante, quero entender os dois tipos de serviço oferecidos, para que eu identifique qual se aplica ao meu caso

#### Acceptance Criteria

1. THE Services_Section SHALL present "Sites rápidos" with clear headline
2. THE Services_Section SHALL present "Aplicações sob medida" with clear headline
3. EACH service SHALL include 4-6 value bullets focusing on business benefits
4. THE "Sites rápidos" bullets SHALL emphasize speed, clear scope, conversion focus
5. THE "Aplicações sob medida" bullets SHALL emphasize automation, error reduction, real-time visibility
6. EACH service SHALL include specific CTA button
7. THE Services_Section SHALL avoid technical jargon in bullets

### Requirement 5: Casos de Uso (pt-BR)

**User Story:** Como visitante, quero ver exemplos concretos de problemas resolvidos, para que eu visualize como o serviço se aplica ao meu negócio

#### Acceptance Criteria

1. THE Use_Cases_Section SHALL present at least 3 use case categories
2. EACH use case SHALL include title, description, and trigger points
3. THE Content_System SHALL include use cases for "Pequenas empresas de serviços"
4. THE Content_System SHALL include use cases for "Startups e scale-ups"
5. THE Content_System SHALL include use cases for "Empresas com sistema interno"
6. EACH use case description SHALL be 50-100 characters
7. EACH use case SHALL list 2-4 specific trigger points

### Requirement 6: FAQ Estratégico (pt-BR)

**User Story:** Como visitante com objeções, quero ver respostas claras para minhas dúvidas, para que eu me sinta confortável em prosseguir com contato

#### Acceptance Criteria

1. THE FAQ_Section SHALL include at least 6 strategic questions
2. THE FAQ_Section SHALL address pricing objection with transparent explanation
3. THE FAQ_Section SHALL address timeline concerns with realistic estimates
4. THE FAQ_Section SHALL address payment terms clearly
5. THE FAQ_Section SHALL address "não sei definir o que preciso" concern
6. THE FAQ_Section SHALL address post-delivery support
7. THE FAQ_Section SHALL address "por que não usar plataforma pronta" question
8. EACH answer SHALL be 100-200 characters
9. EACH answer SHALL maintain consultive tone

### Requirement 7: Formulário de Contato (pt-BR)

**User Story:** Como visitante interessado, quero preencher um formulário claro, para que eu forneça as informações necessárias sem fricção

#### Acceptance Criteria

1. THE Form_Component SHALL include label for each field
2. THE Form_Component SHALL include placeholder for each field
3. THE Form_Component SHALL include error message for each validation rule
4. THE Form_Component SHALL include helper text explaining what happens after submission
5. THE label text SHALL be clear and concise (maximum 30 characters)
6. THE placeholder text SHALL provide realistic example
7. THE error messages SHALL be specific and actionable
8. THE Form_Component SHALL include fields: nome, email, whatsapp, empresa, objetivo, tipo_projeto, faixa_investimento, urgencia

### Requirement 8: Internacionalização (i18n)

**User Story:** Como visitante internacional, quero ver o conteúdo no meu idioma, para que eu entenda completamente a proposta de valor

#### Acceptance Criteria

1. THE Content_System SHALL support 3 languages: pt-BR, en, es
2. THE Content_System SHALL organize translations in JSON files by namespace
3. THE Content_System SHALL provide namespaces: common, hero, services, use-cases, process, faq, form
4. EACH translation file SHALL maintain consistent structure across languages
5. THE Content_System SHALL use pt-BR as default language
6. THE Content_System SHALL translate all user-facing strings
7. THE Content_System SHALL maintain tone of voice consistency across languages

### Requirement 9: Estrutura de Arquivos de Tradução

**User Story:** Como desenvolvedor, quero uma estrutura organizada de traduções, para que seja fácil manter e adicionar novos idiomas

#### Acceptance Criteria

1. THE Content_System SHALL organize translations in /messages directory
2. THE Content_System SHALL create subdirectories for each language (/messages/pt-BR, /messages/en, /messages/es)
3. EACH language directory SHALL contain identical set of namespace files
4. THE Content_System SHALL use JSON format for translation files
5. THE Content_System SHALL use snake_case for translation keys
6. THE Content_System SHALL group related strings in same namespace file
7. THE Content_System SHALL avoid deeply nested translation objects (maximum 2 levels)

### Requirement 10: Conteúdo Hero Section (en)

**User Story:** Como visitante de língua inglesa, quero ver mensagem impactante traduzida adequadamente, para que eu entenda a proposta de valor

#### Acceptance Criteria

1. THE Hero_Section SHALL provide English translation maintaining same message intent
2. THE English headline SHALL be maximum 120 characters
3. THE English subheadline SHALL be 150-200 characters
4. THE English CTA text SHALL be action-oriented and culturally appropriate
5. THE English content SHALL maintain consultive tone
6. THE English content SHALL avoid literal word-for-word translation

### Requirement 11: Conteúdo Hero Section (es)

**User Story:** Como visitante de língua espanhola, quero ver mensagem impactante traduzida adequadamente, para que eu entenda a proposta de valor

#### Acceptance Criteria

1. THE Hero_Section SHALL provide Spanish translation maintaining same message intent
2. THE Spanish headline SHALL be maximum 120 characters
3. THE Spanish subheadline SHALL be 150-200 characters
4. THE Spanish CTA text SHALL be action-oriented and culturally appropriate
5. THE Spanish content SHALL maintain consultive tone
6. THE Spanish content SHALL avoid literal word-for-word translation

### Requirement 12: CTA Copy Otimizado

**User Story:** Como visitante pronto para agir, quero ver CTAs claros e específicos, para que eu saiba exatamente o que acontece ao clicar

#### Acceptance Criteria

1. THE Content_System SHALL provide primary CTA text focused on application/consultation
2. THE Content_System SHALL provide secondary CTA text for lower-commitment action
3. THE primary CTA SHALL use verbs like "Aplicar", "Agendar", "Solicitar"
4. THE secondary CTA SHALL use verbs like "Ver", "Conhecer", "Explorar"
5. THE CTA text SHALL be maximum 30 characters
6. THE CTA text SHALL avoid generic phrases like "Clique aqui" or "Saiba mais"
7. THE Content_System SHALL provide CTA variations for different sections

### Requirement 13: Mensagens de Validação de Formulário

**User Story:** Como visitante preenchendo formulário, quero ver mensagens de erro claras, para que eu corrija problemas rapidamente

#### Acceptance Criteria

1. THE Form_Component SHALL display specific error message for each validation failure
2. THE error message SHALL indicate what is wrong and how to fix it
3. THE error message SHALL be maximum 60 characters
4. THE error message SHALL maintain professional tone without being harsh
5. THE Content_System SHALL provide error messages for: required field, invalid email, invalid phone, minimum length, maximum length
6. THE error messages SHALL be translated for all supported languages

### Requirement 14: Filtro de Leads no Conteúdo

**User Story:** Como desenvolvedor, quero que o conteúdo filtre leads não qualificados, para que eu receba apenas contatos sérios

#### Acceptance Criteria

1. THE Content_System SHALL include filter reinforcement text below final CTA
2. THE filter text SHALL mention "resultado real, não apenas 'um site bonitinho'"
3. THE filter text SHALL mention willingness to invest appropriately
4. THE filter text SHALL maintain respectful tone while being direct
5. THE filter text SHALL be maximum 150 characters
6. THE Form_Component SHALL include "faixa de investimento" field with clear options
7. THE Form_Component SHALL include "urgência" field to qualify timeline expectations

### Requirement 15: Conteúdo de Processo

**User Story:** Como visitante, quero entender o processo de trabalho, para que eu saiba o que esperar se contratar o serviço

#### Acceptance Criteria

1. THE Process_Section SHALL present at least 6 process steps
2. EACH step SHALL include title and description
3. THE step descriptions SHALL be 80-120 characters
4. THE Content_System SHALL include steps: Diagnóstico, Proposta, Kick-off, Desenvolvimento, Entrega, Suporte
5. THE step descriptions SHALL maintain consultive tone
6. THE step descriptions SHALL set realistic expectations
7. THE Process_Section SHALL emphasize transparency and no surprises

### Requirement 16: Prova Social

**User Story:** Como visitante cético, quero ver evidências de trabalhos anteriores, para que eu confie na capacidade do desenvolvedor

#### Acceptance Criteria

1. THE Content_System SHALL provide testimonial structure with: client name, company, project type, result
2. EACH testimonial SHALL be 100-200 characters
3. THE testimonials SHALL mention specific results, not generic praise
4. THE Content_System SHALL provide at least 3 testimonial examples
5. THE testimonials SHALL cover different use cases (site rápido, aplicação sob medida)
6. THE testimonials SHALL maintain authenticity and avoid exaggeration

### Requirement 17: Página de Obrigado

**User Story:** Como lead que enviou formulário, quero ver confirmação clara e próximos passos, para que eu saiba o que esperar

#### Acceptance Criteria

1. THE Thank_You_Page SHALL display confirmation message "Obrigado, recebemos seu contato"
2. THE Thank_You_Page SHALL display next steps "Você receberá email em até 24h"
3. THE Thank_You_Page SHALL include secondary CTA for WhatsApp contact
4. THE Thank_You_Page content SHALL be translated for all supported languages
5. THE confirmation message SHALL be maximum 60 characters
6. THE next steps message SHALL be maximum 100 characters

### Requirement 18: Consistência de Terminologia

**User Story:** Como visitante, quero ver terminologia consistente em todo o site, para que eu não fique confuso com termos diferentes para mesma coisa

#### Acceptance Criteria

1. THE Content_System SHALL use consistent terms for services: "Sites rápidos" and "Aplicações sob medida"
2. THE Content_System SHALL use consistent term for contact action: "Aplicar para projeto" or "Agendar diagnóstico"
3. THE Content_System SHALL use consistent technology names: "React", "Node.js", "Next.js"
4. THE Content_System SHALL maintain terminology consistency across all languages
5. THE Content_System SHALL create glossary of key terms for reference

### Requirement 19: Acessibilidade de Conteúdo

**User Story:** Como visitante com necessidades especiais, quero que o conteúdo seja acessível, para que eu possa entender a proposta usando tecnologias assistivas

#### Acceptance Criteria

1. THE Content_System SHALL provide descriptive alt text for all images
2. THE Content_System SHALL use clear and simple language (avoid complex jargon)
3. THE Content_System SHALL structure content with proper heading hierarchy
4. THE Content_System SHALL provide descriptive link text (avoid "clique aqui")
5. THE Form_Component SHALL associate labels with inputs properly
6. THE error messages SHALL be announced by screen readers

### Requirement 20: Otimização para SEO

**User Story:** Como proprietário do site, quero que o conteúdo seja otimizado para SEO, para que o site apareça em buscas relevantes

#### Acceptance Criteria

1. THE Content_System SHALL provide meta title for each page (maximum 60 characters)
2. THE Content_System SHALL provide meta description for each page (maximum 160 characters)
3. THE Content_System SHALL include target keywords naturally in headlines and body text
4. THE Content_System SHALL provide Open Graph titles and descriptions
5. THE Content_System SHALL translate meta tags for all supported languages
6. THE Content_System SHALL avoid keyword stuffing
