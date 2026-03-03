interface SocialProofItem {
	text?: string
	icon?: React.ReactNode
	image?: string
}

interface SocialProofBarProps {
	type: 'numbers' | 'logos' | 'text'
	items: SocialProofItem[]
}

export function SocialProofBar({ type, items }: SocialProofBarProps) {
	return (
		<div className="flex items-center gap-8 overflow-x-auto py-4">
			{items.map((item, i) => (
				<div key={i} className="flex shrink-0 items-center gap-2">
					{item.icon && <div>{item.icon}</div>}
					{item.image && (
						<img src={item.image} alt="" className="h-8 object-contain" />
					)}
					{item.text && (
						<span
							className={
								type === 'numbers'
									? 'font-bold text-lg'
									: 'text-muted-foreground text-sm'
							}
						>
							{item.text}
						</span>
					)}
				</div>
			))}
		</div>
	)
}
