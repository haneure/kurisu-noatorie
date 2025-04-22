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
            className='flex flex-col justify-between gap-x-4 gap-y-1 sm:flex-row'
          >
            <div className='max-w-lg'>
              <p className='text-lg font-semibold'>{post.title}</p>
              <p className='text-muted-foreground mt-1 line-clamp-2'>
                {post.summary}
              </p>
            </div>

            <div className='mt-2 text-sm font-light sm:mt-0 sm:text-right'>
              {post.publishedAt && <p>{formatDate(post.publishedAt)}</p>}
              {post.author && <p>{post.author}</p>}{' '}
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
