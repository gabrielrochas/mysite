'use client'

import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from 'lucide-react'

import { Alert, AlertDescription } from '@/components/ui/alert'

interface AlertBannerProps {
	type: 'success' | 'error' | 'warning' | 'info'
	message: string
	onClose?: () => void
	className?: string
}

const iconMap = {
	success: CheckCircle2,
	error: AlertCircle,
	warning: AlertTriangle,
	info: Info,
}

const colorMap = {
	success: 'border-green-500 text-green-700',
	error: 'border-destructive text-destructive',
	warning: 'border-yellow-500 text-yellow-700',
	info: 'border-blue-500 text-blue-700',
}

export function AlertBanner({ type, message, onClose, className }: AlertBannerProps) {
	const Icon = iconMap[type]

	return (
		<Alert role="alert" className={`${colorMap[type]} ${className || ''}`}>
			<Icon className="h-4 w-4" />
			<AlertDescription className="flex items-center justify-between">
				<span>{message}</span>
				{onClose && (
					<button
						onClick={onClose}
						className="ml-4 hover:opacity-70"
						aria-label="Fechar"
					>
						<X className="h-4 w-4" />
					</button>
				)}
			</AlertDescription>
		</Alert>
	)
}
