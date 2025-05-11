import Image from 'next/image'
import Link from 'next/link'

import { PostMetadata } from '@/lib/posts'
import { formatDate } from '@/lib/utils'
import { Badge } from './ui/badge'

export default function Projects({ projects }: { projects: PostMetadata[] }) {
  return (
    <ul className='grid grid-cols-1 gap-8 sm:grid-cols-2'>
      {projects.map(project => (
        <li key={project.slug}>
          <Link href={`/projects/${project.slug}`} className='block'>
            {/* 👇 Group only wraps the image now */}
            <div className='group bg-muted peer relative h-72 w-full overflow-hidden rounded-lg sm:h-60'>
              {project.image && (
                <Image
                  src={project.image}
                  alt={project.title || ''}
                  fill
                  className='rounded-lg object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105'
                />
              )}

              {/* Hover overlay inside group */}
              <div className='bg-foreground/10 absolute inset-0 rounded-lg opacity-0 transition-all delay-100 duration-500 ease-out group-hover:scale-105 group-hover:opacity-100' />

              {/* Hover text inside group */}
              <div className='absolute inset-x-0 bottom-0 translate-y-2 px-6 py-5 text-center opacity-0 transition-all delay-100 duration-500 group-hover:translate-y-1 group-hover:opacity-100'>
                <p className='text-primary-foreground text-xs font-light'>
                  <span className='bg-foreground/60 inline-block rounded-t-lg px-2 py-1'>
                    {formatDate(project.publishedAt ?? '')}
                  </span>
                </p>
                <h2 className='text-primary-foreground line-clamp-1 text-xl no-underline'>
                  <span className='bg-foreground/60 inline-block rounded-b-lg px-2 py-1'>
                    {project.title}
                  </span>
                </h2>
              </div>
            </div>
            {/* Static text under image */}
            <div className='mt-4 text-center transition-all duration-500 ease-in-out peer-hover:translate-y-[-2.5rem] peer-hover:opacity-0'>
              <h3 className='text-lg font-semibold'>{project.title}</h3>
              <p className='text-muted-foreground text-sm'>{project.summary}</p>
            </div>

            <div className='mt-4 flex justify-center gap-x-4 text-center opacity-0 transition-all duration-500 ease-in-out peer-hover:translate-y-[-2.5rem] peer-hover:opacity-100'>
              <Badge variant='secondary'>Badge Se</Badge>
              <Badge variant='destructive'>Badge Dest</Badge>
              <Badge variant='default'>Badge D</Badge>
              <Badge variant='noatorie'>Badge N</Badge>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
