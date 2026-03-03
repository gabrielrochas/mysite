interface ProcessStep {
	title: string
	description: string
	duration?: string
}

interface ProcessTimelineProps {
	steps: ProcessStep[]
}

export function ProcessTimeline({ steps }: ProcessTimelineProps) {
	return (
		<ol className="space-y-8">
			{steps.map((step, i) => (
				<li key={`${i}-${step.title}`} className="flex gap-4">
					<div className="flex flex-col items-center">
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
							{i + 1}
						</div>
						{i < steps.length - 1 && (
							<div className="mt-2 h-full min-h-15 w-px bg-border" />
						)}
					</div>
					<div className="flex-1 pb-8">
						<h3 className="mb-2 font-bold text-lg">{step.title}</h3>
						<p className="mb-1 text-muted-foreground">{step.description}</p>
						{step.duration && (
							<span className="text-muted-foreground text-sm">
								Duração: {step.duration}
							</span>
						)}
					</div>
				</li>
			))}
		</ol>
	)
}
