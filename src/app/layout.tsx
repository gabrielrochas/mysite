import { Lato, Poiret_One } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'

const poiretOne = Poiret_One({
	variable: '--font-poiret-one',
	subsets: ['latin'],
	weight: ['400'],
})

const lato = Lato({
	variable: '--font-lato',
	subsets: ['latin'],
	weight: ['400', '700', '900'],
})

export const metadata: Metadata = {
	title: 'Gabriel Rocha | Frontend Developer - React, Next.js & TypeScript',
	description: 'Frontend Developer especializado em React, Next.js e TypeScript. Soluções completas de desenvolvimento + hospedagem para empresas internacionais.',
	keywords: [
		'Frontend Developer',
		'React Developer',
		'Next.js',
		'TypeScript',
		'Tailwind CSS',
		'Web Development',
		'Portfolio',
		'Gabriel Rocha',
	],
	authors: [{ name: 'Gabriel Rocha', url: 'https://rochagabriel.com' }],
	creator: 'Gabriel Rocha',
	publisher: 'Gabriel Rocha',
	metadataBase: new URL('https://rochagabriel.com'),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		type: 'website',
		locale: 'pt_BR',
		url: 'https://rochagabriel.com',
		siteName: 'Gabriel Rocha Portfolio',
		title: 'Gabriel Rocha | Frontend Developer',
		description: 'Frontend Developer especializado em React, Next.js e TypeScript. Soluções completas de desenvolvimento + hospedagem.',
	},
	twitter: {
		card: 'summary_large_image',
		creator: '@gabrielrochas',
		title: 'Gabriel Rocha | Frontend Developer',
		description: 'Frontend Developer especializado em React, Next.js e TypeScript.',
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
	verification: {
		google: 'your-google-verification-code',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR">
			<body className={`${lato.variable} ${poiretOne.variable} antialiased`}>
				{children}
			</body>
		</html>
	)
}
