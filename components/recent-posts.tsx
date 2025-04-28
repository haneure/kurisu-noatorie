import Link from 'next/link'
import Posts from './posts'
import { getPosts } from '@/lib/posts'

export default async function RecentPosts() {
  const posts = await getPosts('posts', 4)

  return (
    <section className='pb-24'>
      <div>
        <h2 className='title mb-12'>Recent posts</h2>
        <Posts posts={posts} />

        <Link
          href='/posts'
          className='text-muted-foreground hover:text-foreground mt-8 inline-flex items-center gap-2 underline decoration-1 underline-offset-2 transition-colors'
        ></Link>
      </div>
    </section>
  )
}
