import { Quote } from 'lucide-react'

import { Card, CardContent } from '@/components/ui/card'

interface TestimonialCardProps {
	name: string
	role: string
	company: string
	quote: string
	photo?: string
}

export function TestimonialCard({
	name,
	role,
	company,
	quote,
	photo,
}: TestimonialCardProps) {
	return (
		<Card className="transition-shadow hover:shadow-lg">
			<CardContent className="pt-6">
				<Quote className="mb-4 h-8 w-8 text-primary" />
				<blockquote className="mb-6 text-lg">"{quote}"</blockquote>
				<div className="flex items-center gap-3">
					{photo && (
						<img
							src={photo}
							alt={name}
							className="h-12 w-12 rounded-full object-cover"
						/>
					)}
					<div>
						<p className="font-medium">{name}</p>
						<p className="text-muted-foreground text-sm">
							{role} • {company}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	)
}
