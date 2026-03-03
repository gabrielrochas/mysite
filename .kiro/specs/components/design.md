# Design Document: UI Components

## Overview

Esta feature implementa a biblioteca completa de componentes UI para o site institucional, incluindo componentes de layout (Header, Footer), conteúdo (Cards, Timeline, Grid), formulário (Fields, Buttons) e microinterações.

Os componentes são construídos com React, TypeScript, Tailwind CSS e shadcn/ui, seguindo padrões de composição, acessibilidade WCAG 2.1 AA e design responsivo mobile-first.

### Objetivos Principais

- Criar biblioteca de componentes reutilizáveis e tipados
- Garantir acessibilidade em todos os componentes
- Implementar design responsivo mobile-first
- Integrar tracking de eventos
- Manter consistência visual com design tokens

### Escopo

**Incluído:**
- 15 componentes principais (Header, Footer, Hero, Cards, Form, etc.)
- Props TypeScript para todos os componentes
- Integração com i18n
- Tracking de eventos
- Microinterações (hover, transitions)
- Testes de acessibilidade

**Não Incluído:**
- Animações complexas (Framer Motion)
- Componentes de admin/dashboard
- Gráficos ou visualizações de dados
- Chat ou componentes de tempo real

## Architecture

### Component Categories

```
components/
├── layout/
│   ├── header.tsx
│   ├── footer.tsx
│   └── language-switcher.tsx
├── sections/
│   ├── hero-section.tsx
│   ├── services-section.tsx
│   ├── use-cases-section.tsx
│   ├── process-section.tsx
│   └── faq-section.tsx
├── cards/
│   ├── service-card.tsx
│   ├── use-case-card.tsx
│   └── testimonial-card.tsx
├── form/
│   ├── form-step.tsx
│   ├── form-field.tsx
│   └── cta-button.tsx
└── ui/
    ├── alert-banner.tsx
    ├── social-proof-bar.tsx
    ├── technology-grid.tsx
    └── process-timeline.tsx
```

### Design Patterns

**Composition over Configuration:**
```tsx
// Prefer
<HeroSection>
  <HeroHeadline>{t('hero.headline')}</HeroHeadline>
  <HeroSubheadline>{t('hero.subheadline')}</HeroSubheadline>
  <HeroActions>
    <CTAButton variant="primary">{t('hero.cta')}</CTAButton>
  </HeroActions>
</HeroSection>

// Over
<HeroSection 
  headline={t('hero.headline')}
  subheadline={t('hero.subheadline')}
  ctaText={t('hero.cta')}
/>
```

**Controlled vs Uncontrolled:**
- Form components: Controlled via React Hook Form
- Accordion, Modals: Controlled via shadcn/ui state management

## Components

### 1. Layout Components

#### Header
```tsx
// components/layout/header.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { LanguageSwitcher } from './language-switcher'
import { CTAButton } from '../form/cta-button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="font-bold text-xl">
          Logo
        </Link>
        
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/#servicos">Serviços</Link>
          <Link href="/#casos-de-uso">Casos de uso</Link>
          <Link href="/#processo">Processo</Link>
          <Link href="/#faq">FAQ</Link>
          <LanguageSwitcher />
          <CTAButton variant="primary" location="header">
            Aplicar
          </CTAButton>
        </nav>

        <button 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {isMenuOpen && (
        <nav className="md:hidden border-t p-4">
          {/* Mobile menu items */}
        </nav>
      )}
    </header>
  )
}
```

### 2. Content Components

#### ServiceCard
```tsx
// components/cards/service-card.tsx
import { Check } from 'lucide-react'
import { CTAButton } from '../form/cta-button'

interface ServiceCardProps {
  title: string
  bullets: string[]
  cta: { text: string; onClick: () => void }
  icon?: React.ReactNode
}

export function ServiceCard({ title, bullets, cta, icon }: ServiceCardProps) {
  return (
    <div className="rounded-lg border p-6 transition-shadow hover:shadow-lg">
      {icon && <div className="mb-4">{icon}</div>}
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <ul className="space-y-2 mb-6">
        {bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2">
            <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>
      <CTAButton 
        variant="outline" 
        location="services"
        onClick={cta.onClick}
      >
        {cta.text}
      </CTAButton>
    </div>
  )
}
```

#### ProcessTimeline
```tsx
// components/ui/process-timeline.tsx
interface ProcessStep {
  title: string
  description: string
  duration?: string
}

interface ProcessTimelineProps {
  steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
  return (
    <ol className="space-y-8">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              {i + 1}
            </div>
            {i < steps.length - 1 && (
              <div className="w-px h-full bg-border mt-2" />
            )}
          </div>
          <div className="flex-1 pb-8">
            <h3 className="font-bold text-lg mb-2">{step.title}</h3>
            <p className="text-muted-foreground mb-1">{step.description}</p>
            {step.duration && (
              <span className="text-sm text-muted-foreground">
                Duração: {step.duration}
              </span>
            )}
          </div>
        </li>
      ))}
    </ol>
  )
}
```

### 3. Form Components

#### FormField
```tsx
// components/form/form-field.tsx
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import type { Control, FieldError } from 'react-hook-form'
import { Controller } from 'react-hook-form'

interface FormFieldProps {
  name: string
  label: string
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select'
  placeholder?: string
  options?: Array<{ value: string; label: string }>
  required?: boolean
  control: Control<any>
  error?: FieldError
}

export function FormField({
  name,
  label,
  type,
  placeholder,
  options,
  required,
  control,
  error
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={name}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          if (type === 'textarea') {
            return (
              <Textarea
                id={name}
                placeholder={placeholder}
                aria-invalid={!!error}
                aria-describedby={error ? `${name}-error` : undefined}
                {...field}
              />
            )
          }
          
          if (type === 'select' && options) {
            return (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger id={name}>
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options.map(opt => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )
          }
          
          return (
            <Input
              id={name}
              type={type}
              placeholder={placeholder}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
              {...field}
            />
          )
        }}
      />
      
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error.message}
        </p>
      )}
    </div>
  )
}
```

#### CTAButton
```tsx
// components/form/cta-button.tsx
'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface CTAButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  location: 'hero' | 'services' | 'final' | 'header' | 'thank_you_page'
  loading?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function CTAButton({
  children,
  variant = 'primary',
  size = 'md',
  location,
  loading,
  disabled,
  onClick
}: CTAButtonProps) {
  const handleClick = () => {
    trackEvent('CTA_click', {
      cta_location: location,
      cta_text: typeof children === 'string' ? children : 'CTA'
    })
    onClick?.()
  }

  const variantMap = {
    primary: 'default',
    secondary: 'secondary',
    outline: 'outline'
  }

  return (
    <Button
      variant={variantMap[variant] as any}
      size={size}
      onClick={handleClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </Button>
  )
}
```

### 4. Section Components

#### HeroSection
```tsx
// components/sections/hero-section.tsx
'use client'

import { useTranslation } from '@/hooks/useTranslation'
import { CTAButton } from '../form/cta-button'

export function HeroSection() {
  const { t } = useTranslation('hero')

  const scrollToContact = () => {
    document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToUseCases = () => {
    document.getElementById('casos-de-uso')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="container mx-auto px-4 py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          {t('headline_v1')}
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          {t('subheadline_v1')}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <CTAButton variant="primary" location="hero" onClick={scrollToContact}>
            {t('cta_primary')}
          </CTAButton>
          <CTAButton variant="outline" location="hero" onClick={scrollToUseCases}>
            {t('cta_secondary')}
          </CTAButton>
        </div>
      </div>
    </section>
  )
}
```

## Design Tokens

### Colors (shadcn/ui)
```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  --secondary: 210 40% 96.1%;
  --secondary-foreground: 222.2 47.4% 11.2%;
  --muted: 210 40% 96.1%;
  --muted-foreground: 215.4 16.3% 46.9%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 210 40% 98%;
  --border: 214.3 31.8% 91.4%;
}
```

### Spacing Scale
- `space-2` = 0.5rem (8px)
- `space-4` = 1rem (16px)
- `space-6` = 1.5rem (24px)
- `space-8` = 2rem (32px)
- `space-12` = 3rem (48px)

### Typography
- Headings: `font-bold` (700)
- Body: `font-normal` (400)
- Emphasis: `font-medium` (500)

## Accessibility

### Keyboard Navigation
- All interactive elements: Tab, Enter, Space
- Accordion: Arrow keys (optional)
- Modals: Escape to close

### ARIA Attributes
- `aria-label` for icon buttons
- `aria-expanded` for accordion
- `aria-invalid` for form errors
- `aria-describedby` for error messages
- `role="alert"` for notifications

### Focus Management
- Visible focus ring on all interactive elements
- Focus trap in modals
- Skip to content link

## Testing Strategy

### Unit Tests
- Props validation
- Event handlers
- Conditional rendering
- Error states

### Accessibility Tests
- Keyboard navigation
- Screen reader compatibility
- Color contrast
- Focus indicators

### Visual Regression Tests
- Component snapshots
- Responsive breakpoints
- Hover states

## Implementation Notes

### shadcn/ui Integration
- Use shadcn/ui primitives for base components
- Customize with Tailwind classes
- Maintain consistent styling

### Performance
- Lazy load heavy components
- Optimize images with next/image
- Code split by route

### Browser Support
- Modern browsers (last 2 versions)
- Progressive enhancement
- Graceful degradation

---

**Próximos passos**: Tasks de implementação estão em tasks.md.
