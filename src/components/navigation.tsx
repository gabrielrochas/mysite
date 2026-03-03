'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import { Menu, X } from 'lucide-react'

interface NavItem {
	href: string
	label: string
}

const navItems: NavItem[] = [
	{ href: '/#sobre', label: 'Sobre' },
	{ href: '/#servicos', label: 'Serviços' },
	{ href: '/#portfolio', label: 'Portfolio' },
	{ href: '/#contato', label: 'Contato' },
]

export default function Navigation() {
	const [isOpen, setIsOpen] = useState(false)
	const _pathname = usePathname()

	// Close mobile menu when route changes
	useEffect(() => {
		setIsOpen(false)
	}, [])

	// Prevent body scroll when mobile menu is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [isOpen])

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (event.key === 'Escape' && isOpen) {
			setIsOpen(false)
		}
	}

	return (
		<>
			{/* Desktop Navigation */}
			<nav
				className="hidden md:flex md:items-center md:gap-6 lg:gap-8"
				aria-label="Navegação principal"
				onKeyDown={handleKeyDown}
			>
				{navItems.map((item) => (
					<Link
						key={item.href}
						href={item.href}
						className="rounded-sm font-medium text-sm transition-colors hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 lg:text-base"
					>
						{item.label}
					</Link>
				))}
			</nav>

			{/* Mobile Menu Button */}
			<button
				type="button"
				className="inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset md:hidden dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
				onClick={() => setIsOpen(!isOpen)}
				aria-expanded={isOpen}
				aria-label="Menu de navegação"
				aria-controls="mobile-menu"
			>
				<span className="sr-only">{isOpen ? 'Fechar menu' : 'Abrir menu'}</span>
				{isOpen ? (
					<X className="h-6 w-6" aria-hidden="true" />
				) : (
					<Menu className="h-6 w-6" aria-hidden="true" />
				)}
			</button>

			{/* Mobile Navigation Overlay */}
			{isOpen && (
				<>
					{/* Backdrop */}
					<div
						className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
						onClick={() => setIsOpen(false)}
						aria-hidden="true"
					/>

					{/* Mobile Menu */}
					<nav
						id="mobile-menu"
						className="fixed top-0 right-0 z-50 h-full w-64 transform bg-white shadow-2xl transition-transform duration-300 ease-in-out sm:w-72 md:hidden dark:bg-gray-900"
						aria-label="Navegação mobile"
						onKeyDown={handleKeyDown}
					>
						<div className="flex h-14 items-center justify-between border-border border-b px-4 sm:h-16">
							<span className="font-bold font-poiret text-xl">Menu</span>
							<button
								type="button"
								className="rounded-md p-2 text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:text-gray-300 dark:hover:bg-gray-800"
								onClick={() => setIsOpen(false)}
								aria-label="Fechar menu"
							>
								<X className="h-6 w-6" aria-hidden="true" />
							</button>
						</div>

						<div className="flex flex-col space-y-1 p-4">
							{navItems.map((item) => (
								<Link
									key={item.href}
									href={item.href}
									className="rounded-md px-3 py-2.5 font-medium text-base transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-primary dark:hover:bg-gray-800"
									onClick={() => setIsOpen(false)}
								>
									{item.label}
								</Link>
							))}
						</div>
					</nav>
				</>
			)}
		</>
	)
}
