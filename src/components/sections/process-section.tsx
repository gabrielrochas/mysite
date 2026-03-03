'use client'

import { useTranslation } from '@/hooks/useTranslation'

import { ProcessTimeline } from '../ui/process-timeline'

export function ProcessSection() {
	const { t } = useTranslation('process')

	const stepsData = t('steps', { returnObjects: true })
	const steps = Array.isArray(stepsData) ? stepsData : []

	return (
		<section id="processo" className="bg-muted/50 py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="mb-12 text-center font-bold text-3xl tracking-tight">
					{t('section_title')}
				</h2>
				<div className="mx-auto max-w-3xl">
					<ProcessTimeline steps={steps} />
				</div>
			</div>
		</section>
	)
}
