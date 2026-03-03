# Design Document: Page Structure

## Overview

Esta feature implementa a estrutura fundamental de páginas do site institucional usando Next.js 14+ com App Router. O design estabelece um sistema de layout reutilizável com componentes Header e Footer compartilhados, duas páginas principais (home e obrigado), e toda a infraestrutura necessária para navegação, SEO, responsividade e acessibilidade.

A arquitetura segue os padrões modernos do Next.js App Router, utilizando Server Components por padrão e Client Components apenas onde necessário (navegação interativa). O sistema é preparado para internacionalização futura através de uma estrutura de diretórios que facilita a adição de locales.

### Objetivos Principais

- Estabelecer a estrutura base de páginas do site institucional
- Implementar componentes de layout reutilizáveis (Header, Footer)
- Configurar metadata para SEO otimizado
- Garantir responsividade mobile-first
- Assegurar acessibilidade WCAG AA
- Preparar infraestrutura para i18n futura

### Escopo

**Incluído:**
- Layout raiz com configuração de fontes e metadata global
- Componente Header com logo e navegação
- Componente Footer com informações institucionais
- Página principal (/) com seções Hero, Services e Lead Form
- Página de confirmação (/obrigado)
- Sistema de navegação client-side
- Configuração de metadata por página
- Estilos responsivos com Tailwind CSS
- Atributos de acessibilidade

**Não Incluído:**
- Implementação completa de i18n (apenas preparação estrutural)
- Lógica de formulários (será tratada em feature separada)
- Integração com backend/API
- Animações complexas
- Temas dark/light mode

## Architecture

### Estrutura de Diretórios

```
app/
├── layout.tsx                 # Root layout com Header e Footer
├── page.tsx                   # Página principal (/)
├── obrigado/
│   └── page.tsx              # Página de confirmação
├── globals.css               # Estilos globais e Tailwind
└── fonts/                    # Arquivos de fontes (se necessário)

components/
├── layout/
│   ├── Header.tsx            # Componente Header
│   ├── Footer.tsx            # Componente Footer
│   └── Navigation.tsx        # Componente de navegação (client)
└── sections/
    ├── Hero.tsx              # Seção Hero da home
    ├── Services.tsx          # Seção Services da home
    └── LeadForm.tsx          # Formulário de contato (placeholder)

lib/
└── metadata.ts               # Helpers para metadata

types/
└── index.ts                  # Tipos TypeScript compartilhados
```

### Padrões de Componentes

**Server Components (padrão):**
- `app/layout.tsx` - Root layout
- `app/page.tsx` - Páginas
- `components/layout/Header.tsx` - Header
- `components/layout/Footer.tsx` - Footer
- `components/sections/*` - Seções de conteúdo

**Client Components (quando necessário):**
- `components/layout/Navigation.tsx` - Navegação interativa com estado ativo

### Fluxo de Renderização

1. Next.js renderiza o root layout (Server Component)
2. Layout carrega Header e Footer (Server Components)
3. Header inclui Navigation (Client Component para interatividade)
4. Página específica é renderizada no slot children
5. Metadata é gerada estaticamente ou dinamicamente por página

## Components and Interfaces

### Root Layout (`app/layout.tsx`)

```typescript
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: 'MyCompany - Soluções Empresariais',
    template: '%s | MyCompany'
  },
  description: 'Soluções empresariais inovadoras para transformar seu negócio',
  keywords: ['soluções empresariais', 'consultoria', 'tecnologia'],
  authors: [{ name: 'MyCompany' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    url: 'https://mycompany.com',
    siteName: 'MyCompany',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
```

### Header Component (`components/layout/Header.tsx`)

```typescript
import Link from 'next/link'
import Navigation from './Navigation'

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
            aria-label="MyCompany - Página inicial"
          >
            <span className="text-2xl font-bold text-primary">
              MyCompany
            </span>
          </Link>
          
          <Navigation />
        </div>
      </div>
    </header>
  )
}
```

### Navigation Component (`components/layout/Navigation.tsx`)

```typescript
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/', label: 'Início' },
  { href: '/#servicos', label: 'Serviços' },
  { href: '/#contato', label: 'Contato' },
]

export default function Navigation() {
  const pathname = usePathname()
  
  return (
    <nav aria-label="Navegação principal">
      <ul className="flex items-center space-x-6">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  isActive 
                    ? "text-primary" 
                    : "text-muted-foreground"
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
```

### Footer Component (`components/layout/Footer.tsx`)

```typescript
import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">MyCompany</h3>
            <p className="text-sm text-muted-foreground">
              Soluções empresariais inovadoras para transformar seu negócio.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link 
                  href="/#servicos" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link 
                  href="/#contato" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <address className="not-italic text-sm text-muted-foreground space-y-2">
              <p>Email: contato@mycompany.com</p>
              <p>Telefone: (11) 1234-5678</p>
            </address>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} MyCompany. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
```

### Home Page (`app/page.tsx`)

```typescript
import type { Metadata } from 'next'
import Hero from '@/components/sections/Hero'
import Services from '@/components/sections/Services'
import LeadForm from '@/components/sections/LeadForm'

export const metadata: Metadata = {
  title: 'Início',
  description: 'Transforme seu negócio com nossas soluções empresariais inovadoras',
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <LeadForm />
    </>
  )
}
```

### Thank You Page (`app/obrigado/page.tsx`)

```typescript
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Obrigado',
  description: 'Mensagem recebida com sucesso',
  robots: {
    index: false,
    follow: true,
  },
}

export default function ThankYouPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-4">
          Obrigado pelo contato!
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Recebemos sua mensagem e entraremos em contato em breve.
        </p>
        <Link 
          href="/"
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          Voltar para o início
        </Link>
      </div>
    </div>
  )
}
```

### Section Components (Placeholders)

```typescript
// components/sections/Hero.tsx
export default function Hero() {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-3xl">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Transforme seu negócio com soluções inovadoras
        </h1>
        <p className="text-xl text-muted-foreground mb-8">
          Ajudamos empresas a alcançar seus objetivos através de tecnologia e consultoria especializada.
        </p>
      </div>
    </section>
  )
}

// components/sections/Services.tsx
export default function Services() {
  return (
    <section id="servicos" className="bg-muted/50 py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">
          Nossos Serviços
        </h2>
        {/* Service cards will be implemented in future feature */}
      </div>
    </section>
  )
}

// components/sections/LeadForm.tsx
export default function LeadForm() {
  return (
    <section id="contato" className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight mb-8 text-center">
          Entre em Contato
        </h2>
        {/* Form implementation will be in separate feature */}
      </div>
    </section>
  )
}
```

## Data Models

### Navigation Item Type

```typescript
// types/index.ts
export interface NavItem {
  href: string
  label: string
  external?: boolean
}

export interface FooterSection {
  title: string
  links: NavItem[]
}

export interface ContactInfo {
  email: string
  phone: string
  address?: string
}
```

### Metadata Configuration

```typescript
// lib/metadata.ts
import type { Metadata } from 'next'

export const siteConfig = {
  name: 'MyCompany',
  description: 'Soluções empresariais inovadoras para transformar seu negócio',
  url: 'https://mycompany.com',
  ogImage: '/og-image.jpg',
  links: {
    twitter: 'https://twitter.com/mycompany',
    linkedin: 'https://linkedin.com/company/mycompany',
  },
}

export function constructMetadata({
  title = siteConfig.name,
  description = siteConfig.description,
  image = siteConfig.ogImage,
  noIndex = false,
}: {
  title?: string
  description?: string
  image?: string
  noIndex?: boolean
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [{ url: image }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    ...(noIndex && {
      robots: {
        index: false,
        follow: true,
      },
    }),
  }
}
```

### Tailwind Configuration

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
      },
    },
  },
  plugins: [],
}

export default config
```

### Global Styles

```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 221.2 83.2% 53.3%;
    --primary-foreground: 210 40% 98%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 221.2 83.2% 53.3%;
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```



## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Component Structure Rendering

*For any* page component (root layout, home page, thank you page), when rendered, the output SHALL contain the expected semantic HTML structure with all required child components in the correct order.

**Validates: Requirements 1.1, 2.1, 2.2, 5.1, 7.1**

### Property 2: Active Navigation Highlighting

*For any* valid pathname in the navigation menu, when the Navigation component is rendered with that pathname, the corresponding navigation item SHALL have active styling applied and all other items SHALL have inactive styling.

**Validates: Requirements 3.1, 7.3**

### Property 3: Client-Side Navigation Links

*For any* navigation link in the Header or Footer components, the link SHALL use Next.js Link component (not anchor tags) to enable client-side navigation.

**Validates: Requirements 3.2**

### Property 4: Dynamic Copyright Year

*For any* time the Footer component is rendered, the copyright text SHALL include the current year as returned by `new Date().getFullYear()`.

**Validates: Requirements 4.4**

### Property 5: Accessibility Attributes

*For any* interactive element (links, buttons, navigation), when rendered, the element SHALL include appropriate ARIA attributes (aria-label, aria-current, or role) based on its function and state.

**Validates: Requirements 7.2, 7.3**

### Property 6: Responsive Layout Classes

*For any* layout component (Header, Footer, sections), the component SHALL include responsive Tailwind classes (sm:, md:, lg:, xl:) for padding, spacing, or layout adjustments across different screen sizes.

**Validates: Requirements 8.1, 8.2**

### Property 7: TypeScript Type Safety

*For any* component file in the codebase, the file SHALL use .tsx extension and all props SHALL have explicit TypeScript type definitions (either inline or imported interfaces).

**Validates: Requirements 10.1**

## Error Handling

### Build-Time Errors

**Missing Required Props:**
- TypeScript will catch missing or incorrect props at build time
- All component props are strictly typed
- Next.js build will fail if type errors exist

**Invalid Metadata:**
- Next.js validates metadata structure at build time
- Type errors in metadata configuration will prevent build
- Missing required metadata fields will show TypeScript errors

**Font Loading Errors:**
- next/font will show warnings if font cannot be loaded
- Fallback fonts are automatically configured
- Build continues with system fonts if Google Fonts unavailable

### Runtime Errors

**Navigation Errors:**
- Invalid hrefs in Link components will show console warnings
- 404 page will be shown for non-existent routes
- Client-side navigation errors are caught by Next.js error boundary

**Rendering Errors:**
- Component errors are caught by React error boundaries
- Next.js shows error overlay in development
- Production shows generic error page

### Error Recovery

**Graceful Degradation:**
- If JavaScript fails to load, static HTML is still functional
- Navigation links work as standard anchor tags
- Content remains accessible

**Fallback Strategies:**
- Font loading failures fall back to system fonts
- Missing images show alt text
- Failed client components fall back to server-rendered content

## Testing Strategy

### Overview

This feature uses a dual testing approach combining unit tests for specific examples and edge cases with property-based tests for universal correctness guarantees.

### Unit Testing

**Framework:** Jest + React Testing Library

**Focus Areas:**
- Specific component rendering examples
- Metadata configuration examples
- Edge cases (empty navigation, missing props)
- Integration between layout and pages

**Example Unit Tests:**

```typescript
// __tests__/components/Header.test.tsx
describe('Header Component', () => {
  it('renders company logo linking to home', () => {
    render(<Header />)
    const logo = screen.getByLabelText(/página inicial/i)
    expect(logo).toHaveAttribute('href', '/')
  })
  
  it('renders with sticky positioning', () => {
    const { container } = render(<Header />)
    const header = container.querySelector('header')
    expect(header).toHaveClass('sticky')
  })
})

// __tests__/app/layout.test.tsx
describe('Root Layout', () => {
  it('sets Portuguese language on html element', () => {
    const { container } = render(
      <RootLayout><div>Test</div></RootLayout>
    )
    const html = container.querySelector('html')
    expect(html).toHaveAttribute('lang', 'pt-BR')
  })
})

// __tests__/app/obrigado/page.test.tsx
describe('Thank You Page', () => {
  it('includes noindex in metadata', () => {
    expect(metadata.robots).toEqual({
      index: false,
      follow: true,
    })
  })
  
  it('displays confirmation message and home link', () => {
    render(<ThankYouPage />)
    expect(screen.getByText(/obrigado/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /voltar/i }))
      .toHaveAttribute('href', '/')
  })
})
```

### Property-Based Testing

**Framework:** fast-check (JavaScript property-based testing library)

**Configuration:**
- Minimum 100 iterations per property test
- Each test references its design document property
- Tests use generators for random valid inputs

**Property Test Examples:**

```typescript
// __tests__/properties/navigation.property.test.ts
import fc from 'fast-check'

/**
 * Feature: page-structure, Property 2: Active Navigation Highlighting
 * For any valid pathname in the navigation menu, when the Navigation 
 * component is rendered with that pathname, the corresponding navigation 
 * item SHALL have active styling applied.
 */
describe('Property: Active Navigation Highlighting', () => {
  it('highlights the correct navigation item for any pathname', () => {
    fc.assert(
      fc.property(
        fc.constantFrom('/', '/#servicos', '/#contato'),
        (pathname) => {
          // Mock usePathname to return the test pathname
          jest.spyOn(require('next/navigation'), 'usePathname')
            .mockReturnValue(pathname)
          
          const { container } = render(<Navigation />)
          const links = container.querySelectorAll('a')
          
          // Find the link matching the pathname
          const activeLink = Array.from(links).find(
            link => link.getAttribute('href') === pathname
          )
          
          // Active link should have primary color
          expect(activeLink).toHaveClass('text-primary')
          
          // Other links should have muted color
          const otherLinks = Array.from(links).filter(
            link => link.getAttribute('href') !== pathname
          )
          otherLinks.forEach(link => {
            expect(link).toHaveClass('text-muted-foreground')
          })
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Feature: page-structure, Property 3: Client-Side Navigation Links
 * For any navigation link, the link SHALL use Next.js Link component.
 */
describe('Property: Client-Side Navigation Links', () => {
  it('uses Next.js Link for all navigation links', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(Header, Footer, Navigation),
        (Component) => {
          const { container } = render(<Component />)
          const links = container.querySelectorAll('a')
          
          // All links should have Next.js Link data attributes
          links.forEach(link => {
            // Next.js Link adds specific attributes
            expect(link).not.toHaveAttribute('target', '_self')
            // Should not have onclick for page navigation
            const href = link.getAttribute('href')
            if (href?.startsWith('/') || href?.startsWith('#')) {
              expect(link.onclick).toBeNull()
            }
          })
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Feature: page-structure, Property 4: Dynamic Copyright Year
 * For any time the Footer is rendered, copyright SHALL include current year.
 */
describe('Property: Dynamic Copyright Year', () => {
  it('always displays current year in copyright', () => {
    fc.assert(
      fc.property(
        fc.date({ min: new Date('2020-01-01'), max: new Date('2030-12-31') }),
        (testDate) => {
          // Mock Date to return test date
          jest.spyOn(global, 'Date').mockImplementation(() => testDate)
          
          const { container } = render(<Footer />)
          const copyrightText = container.textContent
          
          const expectedYear = testDate.getFullYear().toString()
          expect(copyrightText).toContain(expectedYear)
          
          jest.restoreAllMocks()
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Feature: page-structure, Property 5: Accessibility Attributes
 * For any interactive element, appropriate ARIA attributes SHALL be present.
 */
describe('Property: Accessibility Attributes', () => {
  it('includes ARIA attributes on all interactive elements', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(Header, Footer, Navigation),
        (Component) => {
          const { container } = render(<Component />)
          
          // Check all links have accessible names
          const links = container.querySelectorAll('a')
          links.forEach(link => {
            // Should have either aria-label or text content
            const hasAriaLabel = link.hasAttribute('aria-label')
            const hasTextContent = link.textContent.trim().length > 0
            expect(hasAriaLabel || hasTextContent).toBe(true)
          })
          
          // Check navigation has aria-label
          const nav = container.querySelector('nav')
          if (nav) {
            expect(nav).toHaveAttribute('aria-label')
          }
        }
      ),
      { numRuns: 100 }
    )
  })
})

/**
 * Feature: page-structure, Property 6: Responsive Layout Classes
 * For any layout component, responsive Tailwind classes SHALL be present.
 */
describe('Property: Responsive Layout Classes', () => {
  it('includes responsive classes in all layout components', () => {
    fc.assert(
      fc.property(
        fc.constantFrom(Header, Footer, Hero, Services, LeadForm),
        (Component) => {
          const { container } = render(<Component />)
          const html = container.innerHTML
          
          // Should contain at least one responsive class
          const hasResponsiveClasses = 
            /\b(sm:|md:|lg:|xl:|2xl:)/.test(html)
          
          expect(hasResponsiveClasses).toBe(true)
        }
      ),
      { numRuns: 100 }
    )
  })
})
```

### Testing Balance

- Unit tests focus on specific examples and edge cases (metadata config, specific content)
- Property tests verify universal behaviors (navigation state, accessibility, responsiveness)
- Integration tests verify page composition and layout structure
- Visual regression tests (future) will verify responsive design across breakpoints

### Test Coverage Goals

- 100% coverage of component rendering logic
- All correctness properties implemented as property-based tests
- All metadata configurations tested with unit tests
- All accessibility requirements verified

### Continuous Integration

- Tests run on every commit
- Build fails if any test fails
- Type checking runs before tests
- Linting enforces code quality standards

## Implementation Notes

### Next.js App Router Specifics

**Server Components by Default:**
- All components are Server Components unless marked with 'use client'
- Only Navigation component needs client directive for usePathname hook
- Server Components improve performance and SEO

**Metadata API:**
- Use static metadata export for pages with fixed metadata
- Use generateMetadata function for dynamic metadata (future features)
- Metadata is automatically merged from layout to page

**Font Optimization:**
- next/font automatically optimizes font loading
- Fonts are self-hosted for better performance
- Font files are included in build output

### Tailwind CSS Best Practices

**Mobile-First Approach:**
- Base styles apply to mobile
- Use sm:, md:, lg: for larger screens
- Test on mobile devices first

**Utility Classes:**
- Prefer utility classes over custom CSS
- Use @apply sparingly in globals.css
- Keep component styles co-located

**Design Tokens:**
- Use CSS variables for colors
- Defined in globals.css :root
- Allows future theme switching

### Accessibility Considerations

**Semantic HTML:**
- Use header, nav, main, footer, section elements
- Proper heading hierarchy (h1 → h2 → h3)
- Use address element for contact info

**ARIA Attributes:**
- aria-label for navigation landmarks
- aria-current for active page indication
- aria-label for logo link

**Keyboard Navigation:**
- All interactive elements are keyboard accessible
- Focus styles are visible
- Tab order is logical

### Preparation for i18n

**Directory Structure:**
- Current structure supports future [lang] dynamic segment
- Content is separated from components
- Strings can be extracted to translation files

**Future Migration Path:**
```
app/
├── [lang]/
│   ├── layout.tsx
│   ├── page.tsx
│   └── obrigado/
│       └── page.tsx
└── layout.tsx (root)
```

**Translation Strategy:**
- Use next-intl or similar library
- Extract all strings to JSON files
- Use translation keys in components

### Performance Considerations

**Code Splitting:**
- Next.js automatically code-splits by route
- Client components are separate bundles
- Lazy load heavy components if needed

**Image Optimization:**
- Use next/image for all images (future)
- Automatic responsive images
- WebP format with fallbacks

**Caching:**
- Static pages are cached at CDN
- Server Components reduce client bundle
- Metadata is generated at build time

### Development Workflow

**Component Development:**
1. Create component in appropriate directory
2. Define TypeScript interfaces
3. Implement with Tailwind classes
4. Add accessibility attributes
5. Write unit tests
6. Write property tests if applicable

**Testing Workflow:**
1. Run tests in watch mode during development
2. Fix any failing tests before commit
3. Ensure 100% coverage for new components
4. Run full test suite before push

**Code Review Checklist:**
- TypeScript types are properly defined
- Accessibility attributes are present
- Responsive classes are included
- Tests cover all requirements
- No console errors or warnings

