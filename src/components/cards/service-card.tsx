import { Check } from 'lucide-react'

import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'

import { CTAButton } from '../form/cta-button'

interface ServiceCardProps {
	title: string
	bullets: string[]
	cta: { text: string; onClick: () => void }
	icon?: React.ReactNode
}

export function ServiceCard({ title, bullets, cta, icon }: ServiceCardProps) {
	return (
		<Card className="transition-shadow hover:shadow-lg">
			<CardHeader>
				{icon && <div className="mb-4">{icon}</div>}
				<CardTitle className="text-2xl">{title}</CardTitle>
			</CardHeader>
			<CardContent>
				<ul className="space-y-3">
					{bullets.map((bullet, i) => (
						<li key={`${i}-${bullet}`} className="flex items-start gap-2">
							<Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
							<span className="text-sm">{bullet}</span>
						</li>
					))}
				</ul>
			</CardContent>
			<CardFooter>
				<CTAButton variant="outline" location="services" onClick={cta.onClick}>
					{cta.text}
				</CTAButton>
			</CardFooter>
		</Card>
	)
}
