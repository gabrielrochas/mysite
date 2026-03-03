import Link from 'next/link'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	title: 'Obrigado | Gabriel Rocha',
	description: 'Obrigado por entrar em contato. Responderei em breve!',
	alternates: {
		canonical: '/obrigado',
	},
	openGraph: {
		title: 'Obrigado | Gabriel Rocha',
		description: 'Obrigado por entrar em contato. Responderei em breve!',
		url: 'https://rochagabriel.com/obrigado',
	},
	twitter: {
		card: 'summary',
		title: 'Obrigado | Gabriel Rocha',
		description: 'Obrigado por entrar em contato. Responderei em breve!',
	},
	robots: {
		index: false,
		follow: true,
	},
}

export default function ThankYouPage() {
	return (
		<div className="flex min-h-[60vh] flex-col">
			<section className="container mx-auto px-4 py-12 sm:px-6 sm:py-16 md:py-24 lg:px-8 lg:py-32">
				<div className="flex flex-col items-center space-y-6 text-center sm:space-y-8">
					<div className="space-y-4">
						<h1 className="max-w-2xl px-4">Obrigado pelo contato!</h1>
						<p className="max-w-xl px-4 text-base text-tertiary sm:text-lg md:text-xl">
							Sua mensagem foi recebida com sucesso. Responderei o mais breve
							possível.
						</p>
					</div>
					<Link
						href="/"
						className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 font-medium text-primary-foreground text-sm transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:px-8 sm:text-base"
					>
						Voltar para Home
					</Link>
				</div>
			</section>
		</div>
	)
}
