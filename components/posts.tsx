import { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

type PostsProps = {
  locale: string
  posts: PostMetadata[]
}

export default function Posts({
   locale, posts 
  }: PostsProps) {

  return (
    <ul className='flex flex-col gap-8'>
      {posts.map(post => (
        <li key={post.slug}>
          <Link
            href={`/${locale}/posts/${post.slug}`}
            className='group relative flex flex-col justify-between gap-x-4 gap-y-1 overflow-hidden rounded-sm p-6 sm:flex-row'
          >
            {post.image && (
              <div
                className='absolute inset-0 bg-cover bg-center opacity-90 blur-xs transition-transform duration-300 ease-in group-hover:scale-105'
                style={{ backgroundImage: `url(${post.image})` }}
              />
            )}
            <div className='relative z-10 max-w-lg'>
              <p className='text-lg font-bold'>{post.title}</p>
              <p className='mt-1 font-mono text-sm'>{post.summary}</p>
            </div>

            {/* Handle when minimizing, publishedAt and author text is clumped together vertically on the right  */}
            <div className='relative z-10 mt-2 flex justify-end sm:mt-0 sm:text-right'>
              <div className=''>
                {post.publishedAt && (
                  <p className='text-sm font-light'>
                    {formatDate(post.publishedAt, locale === 'ja' ? 'ja-JP' : 'en-US')}
                  </p>
                )}
                {post.author && (
                  <p className='text-xs font-light sm:text-right'>
                    {post.author}
                  </p>
                )}
              </div>
            </div>

            {/* Hover overlay */}
            <div className='bg-secondary/40 absolute inset-0 rounded-sm opacity-100 transition-all delay-100 duration-500 ease-out hover:opacity-0' />

            {/* Hover overlay */}
            <div className='bg-accent/20 absolute inset-0 rounded-sm opacity-0 transition-all delay-100 duration-500 ease-out group-hover:opacity-100' />
          </Link>
        </li>
      ))}
    </ul>
  )
}
