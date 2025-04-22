'use client'

import Intro from '@/components/intro'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import React from 'react'

export default function Home() {
  const content = `
    # This is a markdown heading
  `
  const [mdxContent, setMdxContent] = React.useState(null)

  React.useEffect(() => {
    const loadMDX = async () => {
      const mdxSource = await serialize(content) // Serialize the markdown
      setMdxContent(mdxSource)
    }

    loadMDX()
  }, [])

  if (!mdxContent) return <div>Loading...</div>

  return (
    <section className='pt-40 pb-24'>
      <div className='container mx-auto flex h-full max-w-3xl flex-col px-4'>
        <Intro />
        <MDXRemote {...mdxContent} />
      </div>
    </section>
  )
}
