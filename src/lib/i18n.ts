import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next/initReactI18next'

export const supportedLanguages = ['pt-BR', 'en', 'es'] as const
export type SupportedLanguage = typeof supportedLanguages[number]

export const defaultLanguage: SupportedLanguage = 'pt-BR'

export const namespaces = [
  'common',
  'hero',
  'services',
  'use-cases',
  'process',
  'technologies',
  'testimonials',
  'faq',
  'form',
  'meta'
] as const

export type Namespace = typeof namespaces[number]

export async function initI18n(lang: SupportedLanguage, ns: Namespace) {
  const i18nInstance = createInstance()
  await i18nInstance
    .use(initReactI18next)
    .use(
      resourcesToBackend(
        (language: string, namespace: string) =>
          import(`@/messages/${language}/${namespace}.json`)
      )
    )
    .init({
      lng: lang,
      fallbackLng: defaultLanguage,
      ns,
      defaultNS: 'common',
      supportedLngs: supportedLanguages,
    })
  return i18nInstance
}
