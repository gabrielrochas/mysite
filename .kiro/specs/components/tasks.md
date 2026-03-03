# Implementation Plan: UI Components

## Overview

Implementação da biblioteca completa de componentes UI para o site institucional. O plano segue uma abordagem incremental: componentes base (shadcn/ui), componentes de layout, componentes de conteúdo, componentes de formulário, e finalmente seções completas. Foco em acessibilidade, responsividade e integração com i18n desde o início.

## Tasks

- [x] 1. Setup de componentes base shadcn/ui
  - [x] 1.1 Instalar componentes shadcn/ui necessários
    - button, input, label, textarea, select
    - accordion, alert, card
    - _Requirements: shadcn/ui integration_
  
  - [x] 1.2 Configurar design tokens
    - Verificar/ajustar colors em globals.css
    - Verificar spacing e typography
    - _Requirements: Design Tokens_

- [x] 2. Componentes de layout
  - [x] 2.1 Header (já existe, precisa ajustes)
    - Adicionar CTAButton no header
    - Ajustar espaçamento e responsividade
    - _Requirements: Header Component_
  
  - [x] 2.2 Footer
    - Criar componente Footer com seções
    - Adicionar links rápidos e contato
    - Copyright dinâmico
    - _Requirements: Footer Component_
  
  - [x] 2.3 LanguageSwitcher (já implementado)
    - _Requirements: LanguageSwitcher Component_

- [x] 3. Componentes de formulário
  - [x] 3.1 CTAButton
    - Criar componente com variants (primary, secondary, outline)
    - Integrar tracking de eventos
    - Estados: default, hover, loading, disabled
    - _Requirements: CTAButton Component_
  
  - [x] 3.2 FormField
    - Criar wrapper para inputs com React Hook Form
    - Suportar text, email, tel, textarea, select
    - Integrar validação e mensagens de erro
    - _Requirements: FormField Component_
  
  - [ ] 3.3 FormStep
    - Criar container para formulário com progresso
    - Gerenciar loading state
    - Integrar tracking (form_start, form_submit)
    - _Requirements: FormStep Component_
  
  - [x] 3.4 AlertBanner
    - Criar componente para feedback (success, error, warning, info)
    - role="alert" para acessibilidade
    - _Requirements: AlertBanner Component_

- [x] 4. Componentes de conteúdo (cards)
  - [x] 4.1 ServiceCard
    - Criar card com título, bullets, CTA
    - Hover effect (elevation)
    - Ícone opcional
    - _Requirements: ServiceCard Component_
  
  - [x] 4.2 UseCaseCard
    - Similar ao ServiceCard, sem CTA
    - Lista de triggers
    - _Requirements: UseCaseCard Component_
  
  - [x] 4.3 TestimonialCard
    - Card com quote, nome, empresa, foto
    - Layout para carousel ou grid
    - _Requirements: TestimonialCard Component_

- [x] 5. Componentes de UI especializados
  - [x] 5.1 ProcessTimeline
    - Timeline vertical (mobile) / horizontal (desktop)
    - Números de etapa, título, descrição, duração
    - Usar <ol> semântico
    - _Requirements: ProcessTimeline Component_
  
  - [x] 5.2 TechnologyGrid
    - Grid responsivo de logos
    - Grayscale → color on hover (opcional)
    - _Requirements: TechnologyGrid Component_
  
  - [x] 5.3 SocialProofBar
    - Barra horizontal com números/logos/texto
    - Scrollável em mobile
    - _Requirements: SocialProofBar Component_
  
  - [x] 5.4 FAQAccordion
    - Wrapper para shadcn/ui Accordion
    - Integrar tracking (faq_item_click)
    - _Requirements: FAQAccordion Component_

- [x] 6. Seções completas
  - [x] 6.1 HeroSection (já criado exemplo)
    - Integrar com i18n
    - CTAs com scroll suave
    - _Requirements: HeroSection Component_
  
  - [x] 6.2 ServicesSection
    - Grid de ServiceCards
    - Título da seção
    - Integrar com i18n (services namespace)
    - _Requirements: Services section_
  
  - [x] 6.3 UseCasesSection
    - Grid de UseCaseCards
    - Integrar com i18n (use-cases namespace)
    - _Requirements: Use cases section_
  
  - [x] 6.4 ProcessSection
    - ProcessTimeline com dados de i18n
    - Integrar com i18n (process namespace)
    - _Requirements: Process section_
  
  - [x] 6.5 FAQSection
    - FAQAccordion com dados de i18n
    - Integrar com i18n (faq namespace)
    - _Requirements: FAQ section_

- [x] 7. Microinterações
  - [x] 7.1 Implementar hover effects
    - Cards: elevation on hover
    - Logos: grayscale → color
    - _Requirements: Microinteractions_
  
  - [x] 7.2 Configurar smooth scroll
    - scroll-behavior: smooth para âncoras
    - _Requirements: Smooth scroll_
  
  - [x] 7.3 Transições de accordion
    - Animação de altura (gerenciado por shadcn)
    - _Requirements: Accordion transitions_

- [ ]* 8. Testes de componentes
  - [ ]* 8.1 Testes unitários
    - Testar props e renderização
    - Testar event handlers
    - Testar estados (loading, error, disabled)
    - _Requirements: Unit tests_
  
  - [ ]* 8.2 Testes de acessibilidade
    - Navegação por teclado
    - ARIA attributes
    - Contraste de cores
    - _Requirements: Accessibility tests_
  
  - [ ]* 8.3 Testes visuais
    - Snapshots de componentes
    - Breakpoints responsivos
    - _Requirements: Visual regression tests_

- [x] 9. Integração na página principal
  - [x] 9.1 Atualizar app/page.tsx
    - Substituir placeholders por seções reais
    - HeroSection, ServicesSection, UseCasesSection, ProcessSection, FAQSection
    - _Requirements: Page integration_
  
  - [ ] 9.2 Atualizar Footer no layout
    - Substituir Footer placeholder por componente real
    - _Requirements: Footer integration_
  
  - [x] 9.3 Testar fluxo completo
    - Navegação entre seções
    - Troca de idioma
    - CTAs funcionando
    - _Requirements: End-to-end flow_

- [x] 10. Checkpoint final - Validação completa
  - Verificar acessibilidade em todos os componentes
  - Testar responsividade em múltiplos dispositivos
  - Validar integração com i18n

## Notes

- Tasks marcadas com `*` são opcionais para MVP mais rápido
- Usar shadcn/ui como base para componentes primitivos
- Todos os componentes devem ser client components ('use client') se usarem hooks
- Integrar tracking de eventos desde o início (não adicionar depois)
- Testar acessibilidade manualmente com teclado e screen reader
- Priorizar mobile-first em todos os componentes
- Manter consistência visual usando design tokens
- Documentar props TypeScript para cada componente

