import { Lato, Poiret_One } from 'next/font/google'

import type { Metadata } from 'next'
import './globals.css'

import { Footer } from '@/components/footer'
import { Header } from '@/components/header'
import { I18nProvider } from '@/components/i18n-provider'

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
	description:
		'Frontend Developer especializado em React, Next.js e TypeScript. Soluções completas de desenvolvimento + hospedagem para empresas internacionais.',
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
		description:
			'Frontend Developer especializado em React, Next.js e TypeScript. Soluções completas de desenvolvimento + hospedagem.',
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
		creator: '@gabrielrochas',
		title: 'Gabriel Rocha | Frontend Developer',
		description:
			'Frontend Developer especializado em React, Next.js e TypeScript.',
		images: ['/og-image.png'],
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
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="pt-BR" className="scroll-smooth">
			<head>
				<script
					// biome-ignore lint/security/noDangerouslySetInnerHtml: needed
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-MHJBB3ZS');`,
					}}
				/>
			</head>
			<body className={`${lato.variable} ${poiretOne.variable} antialiased`}>
				<noscript>
					<iframe
						title="google tab manager"
						src="https://www.googletagmanager.com/ns.html?id=GTM-MHJBB3ZS"
						height="0"
						width="0"
						style={{ display: 'none', visibility: 'hidden' }}
					/>
				</noscript>
				<I18nProvider>
					<a
						href="#main-content"
						className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
					>
						Pular para o conteúdo principal
					</a>
					<Header />
					<main id="main-content">{children}</main>
					<Footer />
				</I18nProvider>
			</body>
		</html>
	)
}
