import Intro from '@/components/intro'
import RecentPosts from '@/components/recent-posts'
import React from 'react'

export default function Home() {
  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto flex h-full max-w-3xl flex-col px-4'>
        <Intro />

        <RecentPosts />
      </div>
    </section>
  )
}
