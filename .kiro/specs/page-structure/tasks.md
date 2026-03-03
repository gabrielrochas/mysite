# Implementation Plan: Page Structure

## Overview

Implementação da estrutura de páginas do site institucional usando Next.js 14+ (App Router), TypeScript, Tailwind CSS e shadcn/ui. O plano segue uma abordagem incremental, criando primeiro os componentes base, depois as páginas, e finalmente integrando tudo com estilos e testes.

## Tasks

- [x] 1. Setup inicial do projeto Next.js
  - Verificar/criar estrutura de diretórios (app/, components/, lib/)
  - Verificar/configurar Tailwind CSS e next/font
  - Verificar/instalar e configurar shadcn/ui se necessário
  - _Requirements: Stack técnico base_

- [x] 2. Implementar componentes de layout base
  - [x] 2.1 Criar componente Header
    - Implementar components/header.tsx com logo e navegação
    - Incluir estrutura semântica HTML5 (<header>, <nav>)
    - Adicionar suporte a acessibilidade (ARIA labels)
    - _Requirements: Componente Header_
  
  - [x] 2.2 Criar componente Navigation
    - Implementar components/navigation.tsx com links principais
    - Adicionar navegação responsiva (mobile menu)
    - Garantir navegação por teclado
    - _Requirements: Componente Navigation_
  
  - [x] 2.3 Criar componente Footer
    - Implementar components/footer.tsx com informações institucionais
    - Incluir links de redes sociais e informações de contato
    - Adicionar estrutura semântica (<footer>)
    - _Requirements: Componente Footer_

- [ ]* 2.4 Escrever testes unitários para componentes de layout
  - Testar renderização do Header
  - Testar navegação mobile
  - Testar links do Footer
  - _Requirements: Componentes Header, Navigation, Footer_

- [ ] 3. Implementar layout raiz da aplicação
  - [x] 3.1 Criar app/layout.tsx
    - Configurar RootLayout com HTML lang="pt-BR"
    - Integrar Header e Footer
    - Configurar fontes com next/font
    - Adicionar metadata base para SEO
    - _Requirements: Layout raiz, SEO_
  
  - [ ]* 3.2 Escrever teste de propriedade para layout raiz
    - **Property 1: Consistência de estrutura HTML**
    - Validar que toda página renderizada contém <html>, <head>, <body>
    - Validar que Header e Footer estão presentes em todas as páginas
    - _Requirements: Layout raiz_

- [x] 4. Checkpoint - Validar estrutura base
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 5. Implementar páginas da aplicação
  - [x] 5.1 Criar página principal (app/page.tsx)
    - Implementar seção Hero com título e CTA
    - Adicionar placeholder para seção Services
    - Adicionar placeholder para Lead Form
    - Configurar metadata específica da página
    - _Requirements: Página principal_
  
  - [x] 5.2 Criar página de obrigado (app/obrigado/page.tsx)
    - Implementar mensagem de confirmação
    - Adicionar link de retorno para home
    - Configurar metadata específica
    - _Requirements: Página de obrigado_

- [ ]* 5.3 Escrever testes para páginas
  - Testar renderização da página principal
  - Testar navegação para página de obrigado
  - Validar metadata de cada página
  - _Requirements: Páginas_

- [x] 6. Implementar estilos e responsividade
  - [x] 6.1 Aplicar estilos Tailwind CSS
    - Estilizar Header com design responsivo
    - Estilizar Navigation (desktop e mobile)
    - Estilizar Footer
    - Aplicar estilos nas páginas (Hero, placeholders)
    - _Requirements: Estilos Tailwind CSS_
  
  - [x] 6.2 Implementar responsividade completa
    - Testar breakpoints mobile (< 768px)
    - Testar breakpoints tablet (768px - 1024px)
    - Testar breakpoints desktop (> 1024px)
    - Ajustar menu mobile com hamburger
    - _Requirements: Responsividade_

- [ ]* 6.3 Escrever teste de propriedade para responsividade
  - **Property 2: Responsividade consistente**
  - Validar que componentes se adaptam a diferentes viewports
  - Validar que menu mobile funciona em telas pequenas
  - _Requirements: Responsividade_

- [ ] 7. Configurar SEO e metadata
  - [x] 7.1 Implementar metadata dinâmica
    - Configurar title, description, keywords
    - Adicionar Open Graph tags
    - Adicionar Twitter Card tags
    - Configurar favicon e app icons
    - _Requirements: Configuração de metadata para SEO_
  
  - [ ]* 7.2 Escrever teste de propriedade para SEO
    - **Property 3: Metadata completa**
    - Validar que todas as páginas têm title e description
    - Validar que Open Graph tags estão presentes
    - _Requirements: SEO_

- [ ] 8. Validação de acessibilidade
  - [x] 8.1 Implementar melhorias de acessibilidade
    - Adicionar ARIA labels onde necessário
    - Garantir contraste de cores adequado
    - Validar navegação por teclado
    - Adicionar skip links
    - _Requirements: Acessibilidade_
  
  - [ ]* 8.2 Escrever testes de acessibilidade
    - Testar navegação por teclado
    - Validar ARIA labels
    - Testar com screen reader (manual)
    - _Requirements: Acessibilidade_

- [x] 9. Integração e validação final
  - [ ] 9.1 Integrar todos os componentes
    - Verificar fluxo completo de navegação
    - Validar links internos
    - Testar transições entre páginas
    - _Requirements: Todos os componentes_
  
  - [ ]* 9.2 Escrever testes de integração
    - Testar navegação completa do site
    - Validar que todas as rotas funcionam
    - Testar comportamento em diferentes navegadores
    - _Requirements: Integração completa_

- [ ] 10. Checkpoint final - Validação completa
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marcadas com `*` são opcionais e podem ser puladas para MVP mais rápido
- Cada task referencia requisitos específicos para rastreabilidade
- Checkpoints garantem validação incremental
- Testes de propriedade validam propriedades universais de corretude
- Testes unitários validam exemplos específicos e casos extremos
- Foco em acessibilidade e SEO desde o início
- Responsividade é tratada como requisito fundamental, não opcional
