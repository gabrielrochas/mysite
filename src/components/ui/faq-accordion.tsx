'use client'

import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion'

interface FAQItem {
	question: string
	answer: string
}

interface FAQAccordionProps {
	items: FAQItem[]
}

export function FAQAccordion({ items }: FAQAccordionProps) {
	const handleItemClick = (question: string) => {
		if (typeof window !== 'undefined' && (window as any).gtag) {
			;(window as any).gtag('event', 'faq_item_click', {
				question,
			})
		}
	}

	return (
		<Accordion type="multiple" className="w-full">
			{items.map((item, i) => (
				<AccordionItem key={`${i}-${item.question}`} value={`item-${i}`}>
					<AccordionTrigger
						onClick={() => handleItemClick(item.question)}
						className="text-left font-sans"
					>
						{item.question}
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground">
						{item.answer}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)
}
