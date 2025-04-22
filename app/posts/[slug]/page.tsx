import MDXContent from '@/components/mdx-content'
import { getPostBySlug, PostData } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'

export default async function Post({ params }: { params: { slug: string } }) {
  const { slug } = params
  const posts: PostData | null = await getPostBySlug(slug)

  if (!posts) {
    notFound()
  }

  const { metadata, content } = posts
  const { title, image, author, publishedAt } = metadata

  return (
    <section className='pt-32 pb-24'>
      <div className='container mx-auto max-w-3xl px-4'>
        <Link
          href='/posts'
          className='text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm font-light transition-colors'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to posts</span>
        </Link>

        {image && (
          <div className='relative mb-6 h-96 overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={title || ''}
              fill
              className='object-cover'
            />
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='text-muted-foreground mt-3 text-xs'>
            {author} / {formatDate(publishedAt ?? '')}
          </p>
        </header>

        <main className='prose dark:prose-invert mt-16'>
          <MDXContent source={content} />
        </main>

        {/* <footer className='mt-16'>
                <NewsletterForm />>
            </footer> */}
      </div>
    </section>
  )
}
