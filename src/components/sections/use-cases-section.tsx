'use client'

import { useTranslation } from '@/hooks/useTranslation'

import { UseCaseCard } from '../cards/use-case-card'

export function UseCasesSection() {
	const { t } = useTranslation('use-cases')

	const smallBusinessTriggers = t('small_business.triggers', { returnObjects: true })
	const startupsTriggers = t('startups.triggers', { returnObjects: true })
	const establishedTriggers = t('established_companies.triggers', { returnObjects: true })

	const useCases = [
		{
			title: t('small_business.title'),
			description: t('small_business.description'),
			triggers: Array.isArray(smallBusinessTriggers)
				? smallBusinessTriggers
				: [],
		},
		{
			title: t('startups.title'),
			description: t('startups.description'),
			triggers: Array.isArray(startupsTriggers) ? startupsTriggers : [],
		},
		{
			title: t('established_companies.title'),
			description: t('established_companies.description'),
			triggers: Array.isArray(establishedTriggers) ? establishedTriggers : [],
		},
	]

	return (
		<section id="casos-de-uso" className="py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="mb-12 text-center font-bold text-3xl tracking-tight">
					{t('section_title')}
				</h2>
				<div className="grid gap-8 md:grid-cols-3">
					{useCases.map((useCase, i) => (
						<UseCaseCard key={`${i}-${useCase.title}`} {...useCase} />
					))}
				</div>
			</div>
		</section>
	)
}
