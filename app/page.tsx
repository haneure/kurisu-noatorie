import CurrentStruggle from '@/components/current-struggle'
import Intro from '@/components/intro'
import NewsletterForm from '@/components/newsletter-form'
import RecentPosts from '@/components/recent-posts'
import RecentProjects from '@/components/recent-projects'
import React from 'react'

export default function Home() {
  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto flex h-full max-w-3xl flex-col px-4'>
        <Intro />
        <CurrentStruggle />

        <RecentPosts />
        <RecentProjects />

        <NewsletterForm />
      </div>
    </section>
  )
}
