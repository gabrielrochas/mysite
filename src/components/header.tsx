'use client'

import Link from 'next/link'
import { useState } from 'react'

import { Menu, X } from 'lucide-react'

import { CTAButton } from './form/cta-button'
import { LanguageSwitcher } from './language-switcher'

export function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	return (
		<header className="sticky top-0 z-50 w-full border-border border-b bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/60 dark:bg-gray-900/95 dark:supports-backdrop-filter:bg-gray-900/60">
			<div className="container mx-auto flex h-14 items-center justify-between px-4 sm:h-16 sm:px-6 lg:px-8">
				{/* Logo */}
				<Link
					href="/"
					className="flex items-center space-x-2 rounded-sm font-bold font-poiret text-xl transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 sm:text-2xl"
					aria-label="Página inicial"
				>
					<span>Gabriel Rocha</span>
				</Link>

				{/* Desktop Navigation */}
				<div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
					<nav
						className="flex items-center gap-6 lg:gap-8"
						aria-label="Navegação principal"
					>
						<Link
							href="/#sobre"
							className="rounded-sm font-medium text-sm transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:text-base"
						>
							Sobre
						</Link>
						<Link
							href="/#servicos"
							className="rounded-sm font-medium text-sm transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:text-base"
						>
							Serviços
						</Link>
						<Link
							href="/#portfolio"
							className="rounded-sm font-medium text-sm transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:text-base"
						>
							Portfolio
						</Link>

						<Link
							href="/#contato"
							className="rounded-sm font-medium text-sm transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:text-base"
						>
							Contato
						</Link>
					</nav>
					<LanguageSwitcher />
					<CTAButton
						variant="primary"
						size="sm"
						location="header"
						onClick={() =>
							document
								.getElementById('contato')
								?.scrollIntoView({ behavior: 'smooth' })
						}
					>
						Aplicar
					</CTAButton>
				</div>

				{/* Mobile Menu Button */}
				<button
					type="button"
					className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset md:hidden dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
					onClick={toggleMenu}
					aria-expanded={isMenuOpen}
					aria-label="Menu de navegação"
				>
					<span className="sr-only">
						{isMenuOpen ? 'Fechar menu' : 'Abrir menu'}
					</span>
					{isMenuOpen ? (
						<X className="h-6 w-6" aria-hidden="true" />
					) : (
						<Menu className="h-6 w-6" aria-hidden="true" />
					)}
				</button>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<nav
					className="border-border border-t bg-white px-4 py-4 md:hidden dark:bg-gray-900"
					aria-label="Navegação mobile"
				>
					<div className="flex flex-col space-y-1">
						<Link
							href="/#sobre"
							className="rounded-md px-3 py-2.5 font-medium text-base transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:hover:bg-gray-800"
							onClick={() => setIsMenuOpen(false)}
						>
							Sobre
						</Link>
						<Link
							href="/#servicos"
							className="rounded-md px-3 py-2.5 font-medium text-base transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:hover:bg-gray-800"
							onClick={() => setIsMenuOpen(false)}
						>
							Serviços
						</Link>
						<Link
							href="/#portfolio"
							className="rounded-md px-3 py-2.5 font-medium text-base transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:hover:bg-gray-800"
							onClick={() => setIsMenuOpen(false)}
						>
							Portfolio
						</Link>
						<Link
							href="/#contato"
							className="rounded-md px-3 py-2.5 font-medium text-base transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:hover:bg-gray-800"
							onClick={() => setIsMenuOpen(false)}
						>
							Contato
						</Link>
						<div className="mt-3 border-border border-t pt-3">
							<LanguageSwitcher />
						</div>
					</div>
				</nav>
			)}
		</header>
	)
}
