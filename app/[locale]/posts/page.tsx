import PostsWithSearch from '@/components/posts-with-search'
import { getPosts } from '@/lib/posts'
import React from 'react'

export default async function PostsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  console.log("PostsPage", locale)
  const posts = await getPosts('posts')

  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto max-w-3xl px-4'>
        <h1 className='title mb-12'>Posts</h1>

        <PostsWithSearch locale={locale} posts={posts} />
      </div>
    </section>
  )
}
