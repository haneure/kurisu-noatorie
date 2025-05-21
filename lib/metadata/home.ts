// app/metadata/home.ts (or lib/metadata/home.ts)

import type { Metadata } from 'next'

export const homePageMetadata: Metadata = {
  title: 'Home | Kurisu No Atorie',
  description:
    'Welcome to Kurisu No Atorie, a blog and portfolio featuring personal struggles, projects, and writings.',
  openGraph: {
    title: 'Kurisu No Atorie',
    description:
      'A blog and portfolio site featuring the work of Kurisu.',
    url: 'https://kurisu.noatorie.com',
    siteName: 'Kurisu No Atorie',
    images: [
      {
        url: 'https://kurisu.noatorie.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Kurisu No Atorie OG Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kurisu No Atorie',
    description:
      'A blog and portfolio site featuring the work of Kurisu.',
    images: ['https://kurisu.noatorie.com/twitter-image.png'],
  },
}
