'use client'

import { useState } from 'react'

import { useForm } from 'react-hook-form'

import { useTranslation } from '@/hooks/useTranslation'

import { AlertBanner } from '../form/alert-banner'
import { FormField } from '../form/form-field'
import { Button } from '../ui/button'

type FormData = {
	name: string
	email: string
	whatsapp: string
	company: string
	objective: string
	project_type: string
	budget_range: string
	urgency: string
	additional_info?: string
}

export function ContactSection() {
	const { t } = useTranslation('form')
	const [status, setStatus] = useState<
		'idle' | 'loading' | 'success' | 'error'
	>('idle')

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<FormData>()

	const onSubmit = async (data: FormData) => {
		setStatus('loading')

		try {
			const response = await fetch('/api/contact', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			})

			if (response.ok) {
				setStatus('success')
				reset()
				setTimeout(() => setStatus('idle'), 5000)
			} else {
				setStatus('error')
			}
		} catch {
			setStatus('error')
		}
	}

	const projectTypeOptions = t('fields.project_type.options', {
		returnObjects: true,
	})
	const budgetRangeOptions = t('fields.budget_range.options', {
		returnObjects: true,
	})
	const urgencyOptions = t('fields.urgency.options', { returnObjects: true })

	const projectTypes = Array.isArray(projectTypeOptions)
		? projectTypeOptions
		: []
	const budgetRanges = Array.isArray(budgetRangeOptions)
		? budgetRangeOptions
		: []
	const urgencies = Array.isArray(urgencyOptions) ? urgencyOptions : []

	return (
		<section id="contato" className="bg-muted/50 py-24">
			<div className="container mx-auto px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-2xl">
					<h2 className="mb-4 text-center font-bold text-3xl tracking-tight">
						{t('section_title')}
					</h2>
					<p className="mb-12 text-center text-muted-foreground">
						{t('section_subtitle')}
					</p>

					{status === 'success' && (
						<AlertBanner
							type="success"
							message={t('submit_message')}
							className="mb-6"
						/>
					)}

					{status === 'error' && (
						<AlertBanner
							type="error"
							message="Erro ao enviar formulário. Tente novamente."
							className="mb-6"
						/>
					)}

					<form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
						<FormField
							label={t('fields.name.label')}
							error={errors.name?.message}
						>
							<input
								{...register('name', {
									required: t('fields.name.errors.required'),
								})}
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder={t('fields.name.placeholder')}
							/>
						</FormField>

						<FormField
							label={t('fields.email.label')}
							error={errors.email?.message}
						>
							<input
								{...register('email', {
									required: t('fields.email.errors.required'),
									pattern: {
										value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
										message: t('fields.email.errors.invalid'),
									},
								})}
								type="email"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder={t('fields.email.placeholder')}
							/>
						</FormField>

						<FormField
							label={t('fields.whatsapp.label')}
							error={errors.whatsapp?.message}
						>
							<input
								{...register('whatsapp', {
									required: t('fields.whatsapp.errors.required'),
								})}
								type="tel"
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder={t('fields.whatsapp.placeholder')}
							/>
						</FormField>

						<FormField
							label={t('fields.company.label')}
							error={errors.company?.message}
						>
							<input
								{...register('company', {
									required: t('fields.company.errors.required'),
								})}
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:font-medium file:text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder={t('fields.company.placeholder')}
							/>
						</FormField>

						<FormField
							label={t('fields.objective.label')}
							error={errors.objective?.message}
						>
							<textarea
								{...register('objective', {
									required: t('fields.objective.errors.required'),
								})}
								rows={3}
								className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder={t('fields.objective.placeholder')}
							/>
						</FormField>

						<FormField
							label={t('fields.project_type.label')}
							error={errors.project_type?.message}
						>
							<select
								{...register('project_type', {
									required: t('fields.project_type.errors.required'),
								})}
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="">Selecione...</option>
								{projectTypes.map((option, i) => (
									<option key={`${i}-${option}`} value={option}>
										{option}
									</option>
								))}
							</select>
						</FormField>

						<FormField
							label={t('fields.budget_range.label')}
							error={errors.budget_range?.message}
						>
							<select
								{...register('budget_range', {
									required: t('fields.budget_range.errors.required'),
								})}
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="">Selecione...</option>
								{budgetRanges.map((option, i) => (
									<option key={`${i}-${option}`} value={option}>
										{option}
									</option>
								))}
							</select>
						</FormField>

						<FormField
							label={t('fields.urgency.label')}
							error={errors.urgency?.message}
						>
							<select
								{...register('urgency', { required: 'Selecione a urgência' })}
								className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
							>
								<option value="">Selecione...</option>
								{urgencies.map((option, i) => (
									<option key={`${i}-${option}`} value={option}>
										{option}
									</option>
								))}
							</select>
						</FormField>

						<FormField
							label={t('fields.additional_info.label')}
							error={errors.additional_info?.message}
						>
							<textarea
								{...register('additional_info')}
								rows={4}
								className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
								placeholder={t('fields.additional_info.placeholder')}
							/>
						</FormField>

						<Button
							type="submit"
							size="lg"
							className="w-full"
							disabled={status === 'loading'}
						>
							{status === 'loading' ? 'Enviando...' : t('submit_button')}
						</Button>
					</form>
				</div>
			</div>
		</section>
	)
}
