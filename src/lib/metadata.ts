import type { Metadata } from 'next'

interface MetaContent {
  title: string
  description: string
  keywords: string
  og_title: string
  og_description: string
  twitter_title: string
  twitter_description: string
}

export async function generateMetadata(lang: string = 'pt-BR'): Promise<Metadata> {
  // Dynamically import the meta content based on language
  const metaContent: MetaContent = await import(`@/messages/${lang}/meta.json`).then(
    (mod) => mod.default
  )

  return {
    title: metaContent.title,
    description: metaContent.description,
    keywords: metaContent.keywords,
    authors: [{ name: 'Gabriel Rocha', url: 'https://rochagabriel.com' }],
    creator: 'Gabriel Rocha',
    publisher: 'Gabriel Rocha',
    robots: 'index, follow',
    alternates: {
      canonical: '/',
      languages: {
        'pt-BR': '/',
        'en': '/',
        'es': '/',
      },
    },
    openGraph: {
      title: metaContent.og_title,
      description: metaContent.og_description,
      url: 'https://rochagabriel.com',
      siteName: 'Gabriel Rocha',
      images: [
        {
          url: '/og-image.png',
          width: 1200,
          height: 630,
          alt: 'Gabriel Rocha - Frontend Developer',
        },
      ],
      locale: lang,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: metaContent.twitter_title,
      description: metaContent.twitter_description,
      images: ['/og-image.png'],
    },
  }
}
