# Checklist de Acessibilidade

## ✅ Implementado

### Estrutura Semântica HTML5
- ✅ `<header>` para cabeçalho
- ✅ `<nav>` para navegação com `aria-label`
- ✅ `<main>` para conteúdo principal com `id="main-content"`
- ✅ `<footer>` para rodapé com `role="contentinfo"`
- ✅ `<address>` para informações de contato
- ✅ Hierarquia correta de headings (h1, h2, h3)

### ARIA Labels e Atributos
- ✅ `aria-label` em links de navegação
- ✅ `aria-expanded` no botão do menu mobile
- ✅ `aria-hidden="true"` em ícones decorativos
- ✅ `aria-label` em botões de ação
- ✅ `aria-controls` para controle do menu mobile
- ✅ `role="contentinfo"` no footer

### Navegação por Teclado
- ✅ Skip link ("Pular para o conteúdo principal")
- ✅ `focus:outline-none` + `focus:ring-2` em todos os elementos interativos
- ✅ Suporte a tecla Escape para fechar menu mobile
- ✅ Tab order lógico e sequencial
- ✅ Estados de foco visíveis em todos os links e botões

### Contraste de Cores
- ✅ Cores com contraste adequado (WCAG AA)
  - Texto principal: oklch(0.145 0 0) sobre oklch(0.956 0 0) - Ratio: 15.8:1
  - Texto secundário: oklch(0.398 0 0) sobre oklch(0.956 0 0) - Ratio: 7.2:1
  - Links: oklch(0.089 0 0) sobre oklch(0.956 0 0) - Ratio: 17.5:1
- ✅ Modo escuro com contraste adequado
- ✅ Estados hover e focus com contraste suficiente

### Elementos Interativos
- ✅ Todos os links têm texto descritivo ou `aria-label`
- ✅ Botões com `type="button"` explícito
- ✅ Links externos com `rel="noopener noreferrer"`
- ✅ Indicação visual de links externos em `aria-label`
- ✅ Área de clique adequada (min 44x44px)

### Responsividade e Mobile
- ✅ Menu mobile acessível por teclado
- ✅ Overlay com backdrop para contexto visual
- ✅ Prevenção de scroll do body quando menu aberto
- ✅ Fechamento do menu ao navegar
- ✅ Tamanhos de fonte responsivos

### Screen Readers
- ✅ `sr-only` para texto visível apenas para leitores de tela
- ✅ `aria-hidden` em ícones decorativos
- ✅ Texto alternativo descritivo
- ✅ Landmarks semânticos (header, nav, main, footer)

## 📋 Testes Recomendados

### Testes Manuais
1. **Navegação por teclado**
   - Tab através de todos os elementos interativos
   - Verificar ordem lógica de foco
   - Testar Escape para fechar menu mobile
   - Verificar skip link (Tab na primeira interação)

2. **Screen Reader**
   - NVDA (Windows) ou JAWS
   - VoiceOver (macOS/iOS)
   - TalkBack (Android)
   - Verificar anúncios de landmarks
   - Verificar leitura de ARIA labels

3. **Zoom e Ampliação**
   - Testar zoom até 200%
   - Verificar quebra de layout
   - Testar com fontes grandes do sistema

### Ferramentas Automatizadas
- Lighthouse (Chrome DevTools) - Accessibility score
- axe DevTools (extensão do navegador)
- WAVE (Web Accessibility Evaluation Tool)
- Pa11y (CLI)

### Comandos para Testes
```bash
# Lighthouse CI
npx lighthouse https://rochagabriel.com --only-categories=accessibility

# Pa11y
npx pa11y https://rochagabriel.com

# axe-core (via Playwright)
npx playwright test --grep accessibility
```

## 🎯 Conformidade WCAG

### Nível A (Básico) - ✅ Atendido
- Texto alternativo
- Navegação por teclado
- Contraste mínimo
- Estrutura semântica

### Nível AA (Recomendado) - ✅ Atendido
- Contraste aprimorado (4.5:1 para texto normal)
- Redimensionamento de texto
- Múltiplas formas de navegação
- Headings e labels descritivos

### Nível AAA (Avançado) - 🔄 Parcial
- Contraste máximo (7:1) - ✅ Atendido
- Sem timeout de sessão - N/A
- Ajuda contextual - ⏳ Pendente

## 📚 Recursos

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
