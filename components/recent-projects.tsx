import Projects from '@/components/projects'
import { getPosts } from '@/lib/posts'
import { ArrowBigLeftDash } from 'lucide-react'
import Link from 'next/link'

export default async function RecentProjects() {
  const projects = await getPosts('projects', 4)

  return (
    <section className='pb-12'>
      <div>
        <h2 className='title bg-badge mb-6'>Recent projects</h2>
        <Projects projects={projects} />

        <Link
          href='/projects'
          className='text-muted-foreground hover:text-foreground inline-flex items-center gap-2 underline decoration-1 underline-offset-2 transition-colors'
        >
          <span className="flex items-center gap-1">
            <ArrowBigLeftDash size={16} className="text-muted-foreground" /> All projects
          </span>
        </Link>
      </div>
    </section>
  )
}
