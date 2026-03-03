import type { Metadata } from 'next'

import { FAQSection } from '@/components/sections/faq-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ProcessSection } from '@/components/sections/process-section'
import { ServicesSection } from '@/components/sections/services-section'
import { UseCasesSection } from '@/components/sections/use-cases-section'
import { ContactSection } from '@/components/sections/contact-section'

export const metadata: Metadata = {
	title: 'Gabriel Rocha | Frontend Developer - React, Next.js & TypeScript',
	description:
		'Frontend Developer especializado em React, Next.js e TypeScript. Soluções completas de desenvolvimento + hospedagem para empresas internacionais.',
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: 'Gabriel Rocha | Frontend Developer',
		description:
			'Frontend Developer especializado em React, Next.js e TypeScript. Soluções completas de desenvolvimento + hospedagem.',
		url: 'https://rochagabriel.com',
		images: [
			{
				url: '/og-image.png',
				width: 1200,
				height: 630,
				alt: 'Gabriel Rocha - Frontend Developer',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Gabriel Rocha | Frontend Developer',
		description:
			'Frontend Developer especializado em React, Next.js e TypeScript. Soluções completas de desenvolvimento + hospedagem.',
		images: ['/og-image.png'],
	},
}

export default function Home() {
	return (
		<div className="flex flex-col">
			<HeroSection />
			<ServicesSection />
			<UseCasesSection />
			<ProcessSection />
			<FAQSection />
			<ContactSection />
		</div>
	)
}
