import { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

export default function Posts({ posts }: { posts: PostMetadata[] }) {
  return (
    <ul className='flex flex-col gap-8'>
      {posts.map(post => (
        <li key={post.slug}>
          <Link
            href={`/posts/${post.slug}`}
            className='group relative flex flex-col justify-between gap-x-4 gap-y-1 overflow-hidden rounded-sm p-4 sm:flex-row'
          >
            {post.image && (
              <div
                className='absolute inset-0 bg-cover bg-center opacity-30 blur-sm transition-transform duration-300 group-hover:scale-105'
                style={{ backgroundImage: `url(${post.image})` }}
              />
            )}
            <div className='relative z-10 max-w-lg'>
              <p className='text-lg font-semibold'>{post.title}</p>
              <p className='text-muted-foreground mt-1'>{post.summary}</p>
            </div>
            <div className='relative z-10 mt-2 sm:mt-0 sm:text-right'>
              <div className=''>
                {post.publishedAt && (
                  <p className='text-sm font-medium'>
                    {formatDate(post.publishedAt)}
                  </p>
                )}
                {post.author && <p className='text-xs'>{post.author}</p>}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
