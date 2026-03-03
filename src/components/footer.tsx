'use client'

import Link from 'next/link'
import { useTranslation } from '@/hooks/useTranslation'

export function Footer() {
  const { t } = useTranslation('common')
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 font-bold text-lg">Gabriel Rocha</h3>
            <p className="text-muted-foreground text-sm">
              {t('footer.company_description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-bold text-lg">{t('footer.quick_links')}</h3>
            <nav className="flex flex-col space-y-2">
              <Link href="#servicos" className="text-muted-foreground text-sm hover:text-foreground">
                {t('nav.services')}
              </Link>
              <Link href="#casos-de-uso" className="text-muted-foreground text-sm hover:text-foreground">
                {t('nav.use_cases')}
              </Link>
              <Link href="#processo" className="text-muted-foreground text-sm hover:text-foreground">
                {t('nav.process')}
              </Link>
              <Link href="#faq" className="text-muted-foreground text-sm hover:text-foreground">
                {t('nav.faq')}
              </Link>
              <Link href="#contato" className="text-muted-foreground text-sm hover:text-foreground">
                {t('nav.contact')}
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 font-bold text-lg">{t('footer.contact_title')}</h3>
            <div className="flex flex-col space-y-2 text-muted-foreground text-sm">
              <a href={`mailto:${t('footer.email')}`} className="hover:text-foreground">
                {t('footer.email')}
              </a>
              <a href={`tel:${t('footer.phone')}`} className="hover:text-foreground">
                {t('footer.phone')}
              </a>
              <div className="flex gap-4 pt-2">
                <a 
                  href="https://linkedin.com/in/gabrielrochaas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                  aria-label="LinkedIn"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/gabrielrochas" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-foreground"
                  aria-label="GitHub"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t pt-8 text-center text-muted-foreground text-sm">
          <p>© {currentYear} Gabriel Rocha. {t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  )
}
