# 09 — Especificação de Componentes UI

## 1. Componentes de layout e navegação

### 1.1. Header (componente fixo)

**Props**:
```typescript
interface HeaderProps {
  currentLanguage: 'pt-BR' | 'en' | 'es';
  onLanguageChange: (lang: string) => void;
}
```

**Elementos**:
- Logo (link para home)
- Menu de navegação (links para âncoras: #servicos, #casos-de-uso, #processo, #faq)
- `<LanguageSwitcher>` (seletor de idioma)
- `<CTAButton variant="primary">` (botão destacado: "Aplicar para projeto")

**Estados**: Desktop vs mobile (hamburger menu em mobile)

**Acessibilidade**:
- Navegação por teclado (Tab, Enter)
- `aria-label` no botão de menu mobile
- Focus visível em todos os links

(Fonte: 04-info-architecture.md §4.1)

---

### 1.2. LanguageSwitcher

**Props**:
```typescript
interface LanguageSwitcherProps {
  currentLanguage: 'pt-BR' | 'en' | 'es';
  onLanguageChange: (lang: string) => void;
}
```

**Comportamento**:
- Dropdown ou botões com ícones de bandeiras (🇧🇷 🇺🇸 🇪🇸)
- Ao clicar, dispara evento `language_change` (tracking) e atualiza idioma (context/hook)
- Persiste preferência em localStorage

**Acessibilidade**:
- `aria-label="Selecionar idioma"`
- Navegação por teclado (Arrow keys se dropdown)

(Fonte: FR-015)

---

## 2. Componentes de conteúdo

### 2.1. SectionHero

**Props**:
```typescript
interface SectionHeroProps {
  headline: string;
  subheadline: string;
  ctaPrimary: { text: string; onClick: () => void };
  ctaSecondary?: { text: string; onClick: () => void };
  image?: string; // opcional
}
```

**Layout**: Flexbox/Grid responsivo; texto à esquerda, imagem/ilustração à direita (desktop); empilhado (mobile).

**Acessibilidade**: H1 único na página (headline)

(Fonte: 04-info-architecture.md §2.1)

---

### 2.2. SocialProofBar

**Props**:
```typescript
interface SocialProofBarProps {
  type: 'numbers' | 'logos' | 'text';
  items: Array<{ text?: string; icon?: ReactNode; image?: string }>;
}
```

**Layout**: Flex horizontal; scrollável em mobile se necessário.

**Exemplo de uso**:
```tsx
<SocialProofBar 
  type="numbers" 
  items={[
    { text: "12 projetos entregues em 2024" },
    { text: "95% dos clientes renovam manutenção" }
  ]} 
/>
```

(Fonte: FR-009)

---

### 2.3. ServiceCard

**Props**:
```typescript
interface ServiceCardProps {
  title: string;
  description: string;
  bullets: string[];
  cta: { text: string; onClick: () => void };
  icon?: ReactNode;
}
```

**Layout**: Card com padding generoso, bullets com checkmarks ou ícones.

**Estados**: Hover (leve elevação via shadow).

**Acessibilidade**: Bullets em `<ul>` semântico.

(Fonte: FR-007, 04-info-architecture.md §2.3)

---

### 2.4. UseCaseCard

**Props**:
```typescript
interface UseCaseCardProps {
  title: string;
  description: string;
  triggers: string[];
  icon?: ReactNode;
}
```

**Layout**: Similar ao ServiceCard, mas sem CTA; foco em conteúdo informativo.

(Fonte: FR-010)

---

### 2.5. ProcessTimeline

**Props**:
```typescript
interface ProcessTimelineProps {
  steps: Array<{
    title: string;
    description: string;
    duration?: string;
  }>;
}
```

**Layout**: Timeline vertical (mobile) ou horizontal (desktop) com números/ícones.

**Acessibilidade**: `<ol>` semântico para lista ordenada.

(Fonte: FR-011)

---

### 2.6. TechnologyGrid

**Props**:
```typescript
interface TechnologyGridProps {
  technologies: Array<{
    name: string;
    logo: string; // URL ou componente SVG
    category?: string;
  }>;
}
```

**Layout**: Grid responsivo (3 colunas desktop, 2 mobile); logos em grayscale com hover colorido (opcional).

(Fonte: FR-012)

---

### 2.7. TestimonialCard

**Props**:
```typescript
interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  problem: string;
  result: string;
  quote: string;
  photo?: string;
}
```

**Layout**: Card com foto pequena (se houver), quote em destaque, metadados abaixo.

**Estados**: parte de carrossel (swipe em mobile) ou grid (desktop).

(Fonte: FR-013)

---

### 2.8. FAQAccordion

**Props**:
```typescript
interface FAQAccordionProps {
  items: Array<{
    question: string;
    answer: string;
  }>;
}
```

**Comportamento**: Clicar expande/recolhe resposta (shadcn/ui Accordion).

**Tracking**: Disparar evento `faq_item_click` ao expandir pergunta.

**Acessibilidade**:
- `aria-expanded` gerenciado pelo Accordion do shadcn
- Navegação por teclado (Enter para expandir)

(Fonte: FR-014)

---

## 3. Componentes de formulário

### 3.1. FormStep (container)

**Props**:
```typescript
interface FormStepProps {
  step: number;
  totalSteps: number;
  onSubmit: (data: FormData) => Promise<void>;
  children: ReactNode;
}
```

**Comportamento**:
- Se multistep, exibir indicador de progresso ("Etapa 1 de 2")
- Gerenciar estado de loading durante submissão
- Disparar eventos de tracking (`form_start`, `form_submit_success/fail`)

**Acessibilidade**: `<form>` semântico com `onSubmit`.

(Fonte: FR-001)

---

### 3.2. FormField (wrapper para React Hook Form)

**Props**:
```typescript
interface FormFieldProps {
  name: string;
  label: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select';
  placeholder?: string;
  options?: Array<{ value: string; label: string }>; // para select
  required?: boolean;
  control: Control<any>; // React Hook Form
  error?: FieldError;
}
```

**Layout**:
- Label acima do input
- Input/textarea/select com estilo consistente (shadcn/ui)
- Mensagem de erro abaixo (se houver)

**Estados**: Default, focus, error, disabled.

**Acessibilidade**:
- `<label htmlFor>` associado ao input
- `aria-invalid` quando houver erro
- `aria-describedby` para mensagem de erro

(Fonte: FR-001, NFR-007)

---

### 3.3. CTAButton

**Props**:
```typescript
interface CTAButtonProps {
  text: string;
  variant: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick: () => void;
  location: 'hero' | 'services' | 'final' | 'header' | 'thank_you_page';
  loading?: boolean;
  disabled?: boolean;
}
```

**Comportamento**:
- Disparar evento `CTA_click` com propriedades `cta_location` e `cta_text`
- Exibir spinner se `loading = true`

**Estados**: Default, hover, active, loading, disabled.

**Acessibilidade**: Usar `<button>` semântico; `aria-busy` quando loading.

(Fonte: FR-007)

---

### 3.4. AlertBanner

**Props**:
```typescript
interface AlertBannerProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
}
```

**Uso**: Exibir feedback após submissão de formulário (sucesso ou erro).

**Layout**: Banner no topo da página ou abaixo do formulário, com ícone e botão de fechar.

**Acessibilidade**: `role="alert"` para anunciar ao leitor de tela.

(Fonte: inferido de boas práticas de UX)

---

## 4. Microinterações

### 4.1. Hover em cards

- **ServiceCard, UseCaseCard, TestimonialCard**: leve elevação (shadow aumenta) ao passar mouse.
- **TechnologyGrid logos**: grayscale → colorido ao passar mouse.

### 4.2. Transições suaves

- **Scroll suave**: usar `scroll-behavior: smooth` para links de âncora.
- **Accordion**: transição de altura ao expandir/recolher (gerenciado por shadcn).
- **Modal** (se aplicável): fade in/out com backdrop.

### 4.3. Skeletons (opcional para MVP)

- Exibir skeletons em vez de conteúdo vazio enquanto carrega dados (ex.: depoimentos de API).

(Fonte: inferido de "microinterações" em boas práticas de UX modernas)

---

## 5. Exemplos de uso

### 5.1. Hero com CTA

```tsx
<SectionHero
  headline={t('hero.headline_v1')}
  subheadline={t('hero.subheadline_v1')}
  ctaPrimary={{
    text: t('hero.cta_primary'),
    onClick: () => scrollToForm()
  }}
  ctaSecondary={{
    text: t('hero.cta_secondary'),
    onClick: () => scrollToSection('casos-de-uso')
  }}
/>
```

### 5.2. Formulário com validação

```tsx
<FormStep step={1} totalSteps={2} onSubmit={handleSubmit}>
  <FormField
    name="name"
    label={t('form.label_name')}
    type="text"
    placeholder={t('form.placeholder_name')}
    required
    control={control}
    error={errors.name}
  />
  <FormField
    name="email"
    label={t('form.label_email')}
    type="email"
    placeholder={t('form.placeholder_email')}
    required
    control={control}
    error={errors.email}
  />
  {/* ... outros campos */}
</FormStep>
```

### 5.3. FAQ accordion

```tsx
<FAQAccordion
  items={[
    {
      question: t('faq.question_price'),
      answer: t('faq.answer_price')
    },
    {
      question: t('faq.question_timeline'),
      answer: t('faq.answer_timeline')
    },
    // ...
  ]}
/>
```

---

## 6. Design tokens (Tailwind + shadcn)

### 6.1. Cores

Usar sistema de cores do shadcn/ui:
- `primary`: cor principal (ex.: teal, azul)
- `secondary`: cor secundária (cinza claro)
- `destructive`: cor de erro (vermelho)
- `muted`: cor de texto secundário

### 6.2. Espaçamento

Escala Tailwind padrão:
- `space-2` (0.5rem), `space-4` (1rem), `space-6` (1.5rem), `space-8` (2rem), `space-12` (3rem)

### 6.3. Tipografia

- Família: `-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`
- Tamanhos: `text-sm`, `text-base`, `text-lg`, `text-xl`, `text-2xl`, `text-3xl`, `text-4xl`
- Pesos: `font-normal` (400), `font-medium` (500), `font-semibold` (600)

### 6.4. Bordas e sombras

- `rounded-md` (0.375rem), `rounded-lg` (0.5rem)
- `shadow-sm`, `shadow-md`, `shadow-lg`

(Fonte: shadcn/ui design system + Tailwind CSS)

---

**Próximos passos**: Arquitetura técnica detalhada está em 10-technical-architecture.md. Backlog com histórias está em 11-backlog.md.
