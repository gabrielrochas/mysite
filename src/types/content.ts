export interface TranslationFile {
	[key: string]: string | TranslationObject
}

export interface TranslationObject {
	[key: string]: string | string[] | TranslationObject
}

export interface HeroContent {
	headline_v1: string
	headline_v2: string
	subheadline_v1: string
	subheadline_v2: string
	cta_primary: string
	cta_primary_alt: string
	cta_secondary: string
}

export interface ServiceContent {
	title: string
	bullets: string[]
	cta: string
}

export interface UseCaseContent {
	title: string
	description: string
	triggers: string[]
}

export interface ProcessStep {
	title: string
	description: string
	duration: string
}

export interface FAQItem {
	question: string
	answer: string
}

export interface FormField {
	label: string
	placeholder?: string
	options?: string[]
	errors: {
		[key: string]: string
	}
}
