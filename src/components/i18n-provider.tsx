'use client'

import { useEffect, useState } from 'react'

import i18next from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { I18nextProvider, initReactI18next } from 'react-i18next'

import type { SupportedLanguage } from '@/lib/i18n'
import { useMetadata } from '@/hooks/useMetadata'

interface I18nProviderProps {
	children: React.ReactNode
	lang?: SupportedLanguage
}

function MetadataUpdater({ lang }: { lang: SupportedLanguage }) {
	useMetadata(lang)
	return null
}

export function I18nProvider({ children, lang = 'pt-BR' }: I18nProviderProps) {
	const [i18n, setI18n] = useState<typeof i18next | null>(null)
	const [currentLang, setCurrentLang] = useState<SupportedLanguage>(lang)

	useEffect(() => {
		const storedLang =
			(localStorage.getItem('preferred-language') as SupportedLanguage) || lang
		setCurrentLang(storedLang)

		const instance = i18next.createInstance()
		instance
			.use(initReactI18next)
			.use(
				resourcesToBackend(
					(language: string, namespace: string) =>
						import(`@/messages/${language}/${namespace}.json`),
				),
			)
			.init({
				lng: storedLang,
				fallbackLng: 'pt-BR',
				ns: [
					'common',
					'hero',
					'services',
					'use-cases',
					'process',
					'faq',
					'form',
					'meta',
				],
				defaultNS: 'common',
				supportedLngs: ['pt-BR', 'en', 'es'],
				interpolation: {
					escapeValue: false,
				},
			})
			.then(() => {
				setI18n(instance)
				// Listen for language changes
				instance.on('languageChanged', (lng) => {
					setCurrentLang(lng as SupportedLanguage)
					localStorage.setItem('preferred-language', lng)
				})
			})
	}, [lang])

	if (!i18n) return <>{children}</>

	return (
		<I18nextProvider i18n={i18n}>
			<MetadataUpdater lang={currentLang} />
			{children}
		</I18nextProvider>
	)
}
