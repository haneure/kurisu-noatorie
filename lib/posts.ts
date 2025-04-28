import PostData from '@/app/posts/[slug]/post'
import fs from 'fs'
import matter from 'gray-matter'
import path from 'path'

export type PostData = {
  metadata: PostMetadata
  content: string
}

export type PostMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  publishedAt?: string
  slug: string
}

// const rootDirectory = path.join(process.cwd(), 'content', 'posts')
export async function getPostBySlug(
  slug: string,
  dir: string
): Promise<PostData | null> {
  try {
    const rootDirectory = path.join(process.cwd(), 'content', dir)
    const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(filePath, { encoding: 'utf-8' })
    const { data, content } = matter(fileContents)

    const postData: PostData = {
      metadata: { ...data, slug },
      content: content
    }

    return postData
  } catch (error) {
    console.error('Error reading file:', error)
    return null
  }
}

export async function getPosts(
  dir: string,
  limit?: number
): Promise<PostMetadata[]> {
  const rootDirectory = path.join(process.cwd(), 'content', dir)
  const files = fs.readdirSync(rootDirectory)
  console.log('Files:', files)

  const posts = files
    .map(file => getPostMetadata(file, dir))
    .sort((a, b) => {
      if (new Date(a.publishedAt ?? '') < new Date(b.publishedAt ?? '')) {
        return 1
      } else {
        return -1
      }
    })

  if (limit) {
    return posts.slice(0, limit)
  }

  return posts
}

export function getPostMetadata(filepath: string, dir: string): PostMetadata {
  const rootDirectory = path.join(process.cwd(), 'content', dir)
  const slug = filepath.replace(/\.mdx$/, '')
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' })
  const { data } = matter(fileContent)

  return { ...data, slug } as PostMetadata
}
