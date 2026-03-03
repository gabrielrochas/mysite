'use client'

import { useEffect } from 'react'

interface MetaContent {
  title: string
  description: string
  keywords: string
}

export function useMetadata(lang: string = 'pt-BR') {
  useEffect(() => {
    // Dynamically update meta tags when language changes
    const updateMetaTags = async () => {
      try {
        const metaContent: MetaContent = await import(`@/messages/${lang}/meta.json`).then(
          (mod) => mod.default
        )

        // Update title
        document.title = metaContent.title

        // Update description
        const descriptionMeta = document.querySelector('meta[name="description"]')
        if (descriptionMeta) {
          descriptionMeta.setAttribute('content', metaContent.description)
        }

        // Update OG tags
        const ogTitle = document.querySelector('meta[property="og:title"]')
        if (ogTitle) {
          ogTitle.setAttribute('content', metaContent.title)
        }

        const ogDescription = document.querySelector('meta[property="og:description"]')
        if (ogDescription) {
          ogDescription.setAttribute('content', metaContent.description)
        }

        // Update Twitter tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]')
        if (twitterTitle) {
          twitterTitle.setAttribute('content', metaContent.title)
        }

        const twitterDescription = document.querySelector('meta[name="twitter:description"]')
        if (twitterDescription) {
          twitterDescription.setAttribute('content', metaContent.description)
        }
      } catch (error) {
        console.error('Failed to update meta tags:', error)
      }
    }

    updateMetaTags()
  }, [lang])
}
