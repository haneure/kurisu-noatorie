import Projects from '@/components/projects'
import { getPosts } from '@/lib/posts'

export default async function ProjectsPage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const projects = await getPosts('projects', undefined, locale)

  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto max-w-3xl px-4'>
        <h1 className='title mb-12'>Projects</h1>

        <Projects locale={locale} projects={projects} />
      </div>
    </section>
  )
}
