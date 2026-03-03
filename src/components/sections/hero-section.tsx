'use client'

import Link from 'next/link'

import { useTranslation } from '@/hooks/useTranslation'
import { Button } from '../ui/button'

export function HeroSection() {
	const { t } = useTranslation('hero')

	return (
		<section className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
			<div className="max-w-3xl">
				<h1 className="mb-6 font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
					{t('headline_v1')}
				</h1>
				<p className="mb-8 text-muted-foreground text-xl">
					{t('subheadline_v1')}
				</p>
				<div className="flex flex-col gap-4 sm:flex-row">
					<Button asChild size="lg">
						<Link href="/#contato">{t('cta_primary')}</Link>
					</Button>
					<Button asChild variant="outline" size="lg">
						<Link href="/#casos-de-uso">{t('cta_secondary')}</Link>
					</Button>
				</div>
			</div>
		</section>
	)
}
