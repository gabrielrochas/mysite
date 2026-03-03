import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface UseCaseCardProps {
	title: string
	description: string
	triggers: string[]
	icon?: React.ReactNode
}

export function UseCaseCard({
	title,
	description,
	triggers,
	icon,
}: UseCaseCardProps) {
	return (
		<Card className="transition-shadow hover:shadow-lg">
			<CardHeader>
				{icon && <div className="mb-4">{icon}</div>}
				<CardTitle className="text-xl">{title}</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<p className="text-muted-foreground text-sm">{description}</p>
				<div>
					<p className="mb-2 font-medium text-sm">Quando usar:</p>
					<ul className="space-y-2">
						{triggers.map((trigger, i) => (
							<li
								key={`${i}-${trigger}`}
								className="flex items-start gap-2 text-muted-foreground text-sm"
							>
								<span className="text-primary">•</span>
								<span>{trigger}</span>
							</li>
						))}
					</ul>
				</div>
			</CardContent>
		</Card>
	)
}
