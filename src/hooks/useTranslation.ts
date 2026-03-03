'use client'

import { useTranslation as useI18nTranslation } from 'react-i18next'

import type { Namespace } from '@/lib/i18n'

export function useTranslation(ns: Namespace) {
	return useI18nTranslation(ns)
}
