import CurrentStruggle from '@/components/current-struggle'
import Intro from '@/components/intro'
import NewsletterForm from '@/components/newsletter-form'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import { homePageMetadata } from '@/lib/metadata/home'
import React from 'react'

export const metadata: Metadata = homePageMetadata

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  console.log('Home', locale)

  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto flex h-full max-w-3xl flex-col px-4'>
        <Intro />
        <CurrentStruggle />

        <RecentPosts locale={locale} />
        <RecentProjects />

        <NewsletterForm />
      </div>
    </section>
  )
}
