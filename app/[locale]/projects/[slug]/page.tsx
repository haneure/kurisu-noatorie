import Image from 'next/image'
import Link from 'next/link'

import MDXContent from '@/components/mdx-content'
import { getPostBySlug, getPosts } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { ArrowLeftIcon } from '@radix-ui/react-icons'
import { notFound } from 'next/navigation'
import { SUPPORTED_LOCALES } from '@/lib/metadata/i18n'

export async function generateStaticParams() {
  const projects = await getPosts('projects')
  const params = []
  for (const locale of SUPPORTED_LOCALES) {
    for (const project of projects) {
      params.push({ locale: locale.code, slug: project.slug })
    }
  }
  return params
}


export default async function Project({
  params
}: {
  params: Promise<{ locale: string, slug: string }>
}) {
  const { locale, slug } = await params
  const project = await getPostBySlug(slug, 'projects', locale)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project
  const { title, image, author, publishedAt } = metadata

  return (
    <section className='pt-32 pb-24'>
      <div className='container mx-auto max-w-3xl px-4'>
        <Link
          href='/projects'
          className='text-muted-foreground hover:text-foreground mb-8 inline-flex items-center gap-2 text-sm font-light transition-colors'
        >
          <ArrowLeftIcon className='h-5 w-5' />
          <span>Back to projects</span>
        </Link>

        {image && (
          <div className='relative mb-6 h-96 w-full overflow-hidden rounded-lg'>
            <Image
              src={image}
              alt={title || ''}
              className='object-cover'
              fill
            />
          </div>
        )}

        <header>
          <h1 className='title'>{title}</h1>
          <p className='text-muted-foreground mt-3 text-xs'>
            {author} / {formatDate(publishedAt ?? '', locale === 'ja' ? 'ja-JP' : 'en-US')}
          </p>
        </header>

        <main className='prose dark:prose-invert mt-8'>
          <MDXContent source={content} />
        </main>
      </div>
    </section>
  )
}
