import MDXContent from '@/components/mdx-content'
import { getPostBySlug, getPosts, PostData } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import { SUPPORTED_LOCALES, LOCALE_MAP, getAllLocaleAvailability } from '@/lib/metadata/i18n'
import { Metadata } from 'next'
import { getMessages } from 'next-intl/server'
import { createTranslator, useTranslations } from 'next-intl'

const SITE_URL = process.env.SITE_URL || 'https://kurisu.noatorie.com' // Fallback if not defined

export async function generateStaticParams() {
  const posts = await getPosts('posts')

  // For each locale and each post slug, generate params
  const params = []
  for (const locale of SUPPORTED_LOCALES) {
    for (const post of posts) {
      params.push({ locale: locale.code, slug: post.slug })
    }
  }
  return params
}

export async function generateMetadata({ params }: { params: Promise<{ locale:string, slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params
  const messages = await getMessages({ locale: locale })
  const t = await createTranslator({ locale: locale, messages })
  
  if (! getAllLocaleAvailability(locale)) {
    notFound()
  }
  
  const post: PostData | null = await getPostBySlug(slug, 'posts', locale)

  if (!post) {
    notFound()
  }

  const { metadata } = post
  const { title, summary, image, author, publishedAt } = metadata

    // Set locale code for metadata: map simple locale to proper IETF tag
  const localeCode = LOCALE_MAP[locale as keyof typeof LOCALE_MAP] ?? 'en-US'

  return {
    title: title,
    description: summary,
    openGraph: {
      title,
      description: summary,
      authors: author,
      url: `${SITE_URL}/posts/${slug}`,
      images: image,
      publishedTime: publishedAt,
      type: t('Metadata.type') as 'article',
      locale: localeCode,
      siteName: t('Metadata.siteName'),
    },
    alternates: {
      canonical: `${SITE_URL}/${locale}/posts/${slug}`,
      languages: {
        'en-US': `${SITE_URL}/en/posts/${slug}`,
        'ja-JP': `${SITE_URL}/ja/posts/${slug}`,
      },
    },
  }
}

export default async function Page({
  params
}: {
  params: Promise<{ locale: string, slug: string }>
}) {
  const { locale, slug } = await params

  if (! getAllLocaleAvailability(locale)) {
    notFound()
  }

  const posts: PostData | null = await getPostBySlug(slug, 'posts', locale)

  if (!posts) {
    notFound()
  }

  const { metadata, content } = posts
  const { title, image, author, publishedAt } = metadata

  return (
    <section className='pt-32 pb-24'>
      <div className='container mx-auto max-w-3xl px-4'>
        <Link
          href={`/${locale}/posts`}
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

        <main className='prose dark:prose-invert mt-8'>
          <MDXContent source={content} />
        </main>

        {/* Can also replace this with some comment box */}
        {/* <footer className='mt-16'>
                <NewsletterForm />>
            </footer> */}
      </div>
    </section>
  )
}
