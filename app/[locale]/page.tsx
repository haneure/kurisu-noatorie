import CurrentStruggle from '@/components/current-struggle'
import Intro from '@/components/intro'
import NewsletterForm from '@/components/newsletter-form'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import { homePageMetadata } from '@/lib/metadata/home'
import { Metadata } from 'next'
import { getMessages } from 'next-intl/server'
import React from 'react'

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const messages = await getMessages({locale})
  const title = messages.TabTitles?.home;
  return {
    title
  }
}

// export const metadata: Metadata = homePageMetadata

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto flex h-full max-w-3xl flex-col px-4'>
        <Intro />
        <CurrentStruggle />

        <RecentPosts locale={locale} />
        <RecentProjects locale={locale} />

        <NewsletterForm />
      </div>
    </section>
  )
}
