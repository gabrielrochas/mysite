'use client'

import { useTranslation } from '@/hooks/useTranslation'

import { ServiceCard } from '../cards/service-card'

export function ServicesSection() {
	const { t } = useTranslation('services')

	const scrollToContact = () => {
		document.getElementById('contato')?.scrollIntoView({ behavior: 'smooth' })
	}

	// Parse bullets from translation
	const fastSitesBullets = t('fast_sites.bullets', { returnObjects: true })
	const customAppsBullets = t('custom_apps.bullets', { returnObjects: true })

	const services = [
		{
			title: t('fast_sites.title'),
			bullets: Array.isArray(fastSitesBullets) ? fastSitesBullets : [],
			cta: {
				text: t('fast_sites.cta'),
				onClick: scrollToContact,
			},
		},
		{
			title: t('custom_apps.title'),
			bullets: Array.isArray(customAppsBullets) ? customAppsBullets : [],
			cta: {
				text: t('custom_apps.cta'),
				onClick: scrollToContact,
			},
		},
	]

	return (
		<section id="servicos" className="bg-muted/50 py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<h2 className="mb-12 text-center font-bold text-3xl tracking-tight">
					{t('section_title')}
				</h2>
				<div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
					{services.map((service, i) => (
						<ServiceCard key={`${i}-${service.title}`} {...service} />
					))}
				</div>
			</div>
		</section>
	)
}
