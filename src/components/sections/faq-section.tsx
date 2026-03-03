'use client'

import { useTranslation } from '@/hooks/useTranslation'

import { FAQAccordion } from '../ui/faq-accordion'

export function FAQSection() {
	const { t } = useTranslation('faq')

	const questionsData = t('questions', { returnObjects: true })
	const questions = Array.isArray(questionsData) ? questionsData : []

	return (
		<section id="faq" className="py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="mb-12 text-center font-bold text-3xl tracking-tight">
					{t('section_title')}
				</h2>
				<div className="mx-auto max-w-3xl">
					<FAQAccordion items={questions} />
				</div>
			</div>
		</section>
	)
}
