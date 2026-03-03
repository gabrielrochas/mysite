'use client'

import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'

interface CTAButtonProps {
	children: React.ReactNode
	variant?: 'primary' | 'secondary' | 'outline'
	size?: 'sm' | 'default' | 'lg'
	location: 'hero' | 'services' | 'final' | 'header' | 'thank_you_page'
	loading?: boolean
	disabled?: boolean
	onClick?: () => void
	type?: 'button' | 'submit'
}

export function CTAButton({
	children,
	variant = 'primary',
	size = 'default',
	location,
	loading,
	disabled,
	onClick,
	type = 'button',
}: CTAButtonProps) {
	const handleClick = () => {
		// Track event
		if (typeof window !== 'undefined' && (window as any).gtag) {
			;(window as any).gtag('event', 'CTA_click', {
				cta_location: location,
				cta_text: typeof children === 'string' ? children : 'CTA',
			})
		}
		onClick?.()
	}

	const variantMap = {
		primary: 'default',
		secondary: 'secondary',
		outline: 'outline',
	} as const

	return (
		<Button
			type={type}
			variant={variantMap[variant]}
			size={size}
			onClick={handleClick}
			disabled={disabled || loading}
			aria-busy={loading}
		>
			{loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
			{children}
		</Button>
	)
}
