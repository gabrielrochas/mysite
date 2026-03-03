# Implementation Plan: Content

## Overview

Implementação do sistema de conteúdo e internacionalização (i18n) para o site institucional. O plano cobre criação de copy otimizado para conversão em pt-BR, traduções para en e es, estrutura de arquivos JSON por namespace, e integração com componentes existentes. Foco em tom consultivo, filtro de leads qualificados e manutenibilidade.

## Tasks

- [x] 1. Setup de estrutura i18n
  - [x] 1.1 Criar estrutura de diretórios messages/
    - Criar messages/{pt-BR,en,es}
    - Criar arquivos JSON por namespace em cada idioma
    - _Requirements: Estrutura de arquivos de tradução_
  
  - [x] 1.2 Criar tipos TypeScript para conteúdo
    - Implementar types/content.ts com interfaces
    - Definir tipos para HeroContent, ServiceContent, UseCaseContent, etc.
    - _Requirements: TypeScript types_
  
  - [x] 1.3 Configurar biblioteca i18n
    - Instalar i18next, react-i18next, i18next-resources-to-backend
    - Criar lib/i18n.ts com configuração
    - Definir idiomas suportados e namespaces
    - _Requirements: Configuração i18n_

- [x] 2. Escrever conteúdo pt-BR (idioma primário)
  - [x] 2.1 Hero section (messages/pt-BR/hero.json)
    - 2 variações de headline (max 120 chars)
    - 2 variações de subheadline (150-200 chars)
    - CTAs primário e secundário (max 30 chars)
    - _Requirements: Conteúdo Hero Section pt-BR_
  
  - [x] 2.2 Services section (messages/pt-BR/services.json)
    - Título da seção
    - Sites rápidos: título, 4-6 bullets, CTA
    - Aplicações sob medida: título, 4-6 bullets, CTA
    - _Requirements: Conteúdo de Serviços pt-BR_
  
  - [x] 2.3 Use Cases section (messages/pt-BR/use-cases.json)
    - 3 casos de uso: pequenas empresas, startups, empresas estruturadas
    - Cada caso: título, descrição (50-100 chars), 3-4 triggers
    - _Requirements: Casos de Uso pt-BR_
  
  - [x] 2.4 Process section (messages/pt-BR/process.json)
    - 6 etapas do processo
    - Cada etapa: título, descrição (80-120 chars), duração
    - _Requirements: Conteúdo de Processo pt-BR_
  
  - [x] 2.5 FAQ section (messages/pt-BR/faq.json)
    - 6+ perguntas estratégicas
    - Respostas (100-200 chars) em tom consultivo
    - Cobrir objeções: preço, prazo, pagamento, escopo, suporte
    - _Requirements: FAQ Estratégico pt-BR_
  
  - [x] 2.6 Form section (messages/pt-BR/form.json)
    - Labels, placeholders, mensagens de erro para todos os campos
    - Texto de submit e mensagem pós-envio
    - Texto de filtro de leads
    - _Requirements: Formulário de Contato pt-BR_
  
  - [x] 2.7 Common content (messages/pt-BR/common.json)
    - Navegação, footer, botões genéricos
    - Labels do language switcher
    - Conteúdo da página de obrigado
    - _Requirements: Conteúdo comum pt-BR_
  
  - [x] 2.8 Meta tags (messages/pt-BR/meta.json)
    - Títulos (max 60 chars), descrições (max 160 chars)
    - Keywords, Open Graph tags
    - _Requirements: Otimização para SEO_

- [x] 3. Checkpoint - Validar conteúdo pt-BR
  - Revisar tom de voz consultivo
  - Verificar limites de caracteres
  - Confirmar que FAQ aborda objeções principais

- [x] 4. Traduzir para inglês (en)
  - [x] 4.1 Traduzir hero.json mantendo tom e limites
  - [x] 4.2 Traduzir services.json
  - [x] 4.3 Traduzir use-cases.json
  - [x] 4.4 Traduzir process.json
  - [x] 4.5 Traduzir faq.json
  - [x] 4.6 Traduzir form.json
  - [x] 4.7 Traduzir common.json
  - [x] 4.8 Traduzir meta.json
  - _Requirements: Conteúdo Hero/Services/etc Section en_

- [x] 5. Traduzir para espanhol (es)
  - [x] 5.1 Traduzir hero.json mantendo tom e limites
  - [x] 5.2 Traduzir services.json
  - [x] 5.3 Traduzir use-cases.json
  - [x] 5.4 Traduzir process.json
  - [x] 5.5 Traduzir faq.json
  - [x] 5.6 Traduzir form.json
  - [x] 5.7 Traduzir common.json
  - [x] 5.8 Traduzir meta.json
  - _Requirements: Conteúdo Hero/Services/etc Section es_

- [ ]* 6. Testes de conteúdo
  - [ ]* 6.1 Criar testes de completude de traduções
    - Validar que todos os idiomas têm mesmas keys
    - Verificar estrutura flat (max 2 níveis)
    - _Requirements: Estrutura de arquivos de tradução_
  
  - [ ]* 6.2 Criar testes de limites de caracteres
    - Headlines < 120 chars
    - CTAs < 30 chars
    - Labels < 30 chars
    - Mensagens de erro < 60 chars
    - _Requirements: Character limits_
  
  - [ ]* 6.3 Criar testes de tom de voz
    - Verificar ausência de frases proibidas
    - Validar presença de keywords consultivas
    - _Requirements: Tom de Voz Consultivo_
  
  - [ ]* 6.4 Escrever testes de propriedade
    - **Property 1: Translation Completeness**
    - **Property 2: Consistent Terminology**
    - **Property 3: Character Limits**
    - _Requirements: Internacionalização_
  
  - [ ]* 6.5 QA manual
    - Ler conteúdo em voz alta em cada idioma
    - Verificar consistência de tom
    - Validar que conteúdo filtra leads não qualificados

- [x] 7. Integração com componentes
  - [x] 7.1 Criar hook useTranslation tipado
    - Wrapper em hooks/useTranslation.ts
    - _Requirements: i18n configuration_
  
  - [x] 7.2 Criar componente LanguageSwitcher
    - Dropdown ou ícones de bandeira
    - Persistir seleção em localStorage
    - _Requirements: Seletor de idioma_
  
  - [x] 7.3 Atualizar componentes de página
    - Hero, Services, UseCases, Process, FAQ
    - Carregar conteúdo de arquivos de tradução
    - _Requirements: Integração com componentes_
  
  - [x] 7.4 Atualizar componente de formulário
    - Labels, placeholders, mensagens de erro
    - Usar traduções baseadas no idioma atual
    - _Requirements: Formulário traduzido_
  
  - [x] 7.5 Atualizar meta tags
    - Carregar de translation files por idioma
    - _Requirements: Meta tags traduzidas_

- [ ] 8. Documentação
  - [ ] 8.1 Criar guia de estilo de conteúdo
    - Tom de voz, frases proibidas, limites de caracteres
    - _Requirements: Tom de voz_
  
  - [ ] 8.2 Criar guia de manutenção de conteúdo
    - Como adicionar/modificar conteúdo
    - Como adicionar novo idioma
    - _Requirements: Manutenção_
  
  - [ ] 8.3 Criar glossário de terminologia
    - Termos técnicos e traduções
    - Termos de negócio consistentes
    - _Requirements: Consistência de Terminologia_

- [ ] 9. Checkpoint final - Validação completa
  - Verificar que todos os idiomas funcionam
  - Validar que conteúdo mantém tom consultivo
  - Confirmar que filtro de leads está presente

## Notes

- Tasks marcadas com `*` são opcionais para MVP mais rápido
- pt-BR é idioma primário e deve ser 100% completo antes de traduções
- Fases 4 e 5 (traduções en/es) podem ser feitas em paralelo
- Considerar tradutor profissional para en/es se orçamento permitir
- Limites de caracteres podem exigir ajustes de copy durante tradução
- Tone validation é crítico - conteúdo deve filtrar leads não qualificados
- Integração (fase 7) pode revelar necessidade de conteúdo adicional
- Glossário de terminologia facilita consistência entre idiomas


