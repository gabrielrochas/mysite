'use client'

import { useState } from 'react'

import { useTranslation } from '@/hooks/useTranslation'
import type { SupportedLanguage } from '@/lib/i18n'
import { Button } from './ui/button'

const languages: { code: SupportedLanguage; label: string }[] = [
	{ code: 'pt-BR', label: 'PT' },
	{ code: 'en', label: 'EN' },
	{ code: 'es', label: 'ES' },
]

export function LanguageSwitcher() {
	const { i18n } = useTranslation('common')
	const [currentLang, setCurrentLang] = useState<SupportedLanguage>(
		(i18n.language as SupportedLanguage) || 'pt-BR',
	)

	const handleLanguageChange = (lang: SupportedLanguage) => {
		setCurrentLang(lang)
		i18n.changeLanguage(lang)
		localStorage.setItem('preferred-language', lang)
	}

	return (
		<div className="flex items-center gap-2">
			{languages.map((lang) => (
				<Button
					variant="ghost"
					key={lang.code}
					onClick={() => handleLanguageChange(lang.code)}
					className={`px-2 py-1 font-medium text-sm transition-colors ${
						currentLang === lang.code
							? 'text-primary'
							: 'text-muted-foreground hover:text-foreground'
					}`}
					aria-label={`Switch to ${lang.label}`}
				>
					{lang.label}
				</Button>
			))}
		</div>
	)
}
