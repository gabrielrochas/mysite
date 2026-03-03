interface Technology {
	name: string
	logo: string | React.ReactNode
	category?: string
}

interface TechnologyGridProps {
	technologies: Technology[]
}

export function TechnologyGrid({ technologies }: TechnologyGridProps) {
	return (
		<div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
			{technologies.map((tech, i) => (
				<div
					key={i}
					className="flex flex-col items-center justify-center rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
				>
					{typeof tech.logo === 'string' ? (
						<img
							src={tech.logo}
							alt={tech.name}
							className="h-12 w-12 object-contain grayscale transition-all hover:grayscale-0"
						/>
					) : (
						<div className="h-12 w-12">{tech.logo}</div>
					)}
					<p className="mt-3 text-center font-medium text-sm">{tech.name}</p>
					{tech.category && (
						<p className="text-muted-foreground text-xs">{tech.category}</p>
					)}
				</div>
			))}
		</div>
	)
}
