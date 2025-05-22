import { getPosts } from '@/lib/posts'
import Link from 'next/link'
import Posts from './posts'

type RecentPostsProps = {
  locale: string
}

export default async function RecentPosts({ locale }: RecentPostsProps) {
  const posts = await getPosts('posts', 4)

  return (
    <section className='pb-12'>
      <div>
        <h2 className='title mb-6'>Recent posts</h2>
        <Posts locale={locale} posts={posts} />

        <Link
          href= {`/${locale}/posts`}
          className='text-muted-foreground hover:text-foreground mt-8 inline-flex items-center gap-2 underline decoration-1 underline-offset-2 transition-colors'
        ></Link>
      </div>
    </section>
  )
}
