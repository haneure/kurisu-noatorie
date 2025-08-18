import fs from 'fs/promises'; // ✅ Use the promises API
import matter from 'gray-matter';
import path from 'path';

export type PostData = {
  metadata: PostMetadata
  content: string
}

export type PostMetadata = {
  title?: string
  summary?: string
  image?: string
  author?: string
  badges?: string[]
  publishedAt?: string
  slug: string
}

const fallbackLocale = 'en'

// const rootDirectory = path.join(process.cwd(), 'content', 'posts')
export async function getPostBySlug(
  slug: string,
  dir: string,
  locale: string
): Promise<PostData | null> {
  try {
    const rootDirectory = path.join(process.cwd(), 'content', dir)

    // const filePath = path.join(rootDirectory, `${slug}.mdx`)
    const localizedFile = path.join(rootDirectory, `${slug}.${locale}.mdx`)
    const fallbackFile = path.join(rootDirectory, `${slug}.${fallbackLocale}.mdx`)

    let fileContent: string

    try {
       fileContent = await fs.readFile(localizedFile, { encoding: 'utf-8' })
    } catch {
      try {
        fileContent = await fs.readFile(fallbackFile, { encoding: 'utf-8' })
        console.warn(`[i18n] Fallback to '${fallbackLocale}' for post: ${slug}`)
      } catch (err) {
        console.error(`❌ Post not found: ${slug}`, err)
        return null
      }
    }    
  const { data, content } = matter(fileContent)

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
  limit?: number,
  locale: string = 'en'  // default fallback locale
): Promise<PostMetadata[]> {
  const rootDirectory = path.join(process.cwd(), 'content', dir)
  const files = await fs.readdir(rootDirectory)

  // Only use base fallback `.en.mdx` files
  // const mdxFiles = files.filter(f => /\.en\.mdx$/.test(f))

  console.log("search mdx", locale)
  // const mdxFiles = files.filter(f => new RegExp(`\\.${locale}\\.mdx$`).test(f))

    // Files for the current locale, e.g. '*.ja.mdx' or '*.en.mdx'
  const localizedFiles = files.filter(f => new RegExp(`\\.${locale}\\.mdx$`).test(f))
  // Files for fallback locale (en)
  const fallbackFiles = files.filter(f => new RegExp(`\\.${fallbackLocale}\\.mdx$`).test(f))


  if (locale === fallbackLocale) {
    // If locale is fallback, just return fallback files metadata
    const posts = await Promise.all(fallbackFiles.map(file => getPostMetadata(file, dir)))

    posts.sort((a, b) =>
      new Date(b.publishedAt ?? '').getTime() - new Date(a.publishedAt ?? '').getTime()
    )
    return limit ? posts.slice(0, limit) : posts
  }

  // For other locales:
  // 1. Start with all localized files metadata
  const localizedPosts = await Promise.all(localizedFiles.map(file => getPostMetadata(file, dir)))

  // 2. From fallback files, filter out those that have localized version already
  const localizedSlugs = new Set(localizedPosts.map(post => post.slug))
  const fallbackOnlyFiles = fallbackFiles.filter(file => {
    const slug = file.replace(new RegExp(`\\.(${locale}|${fallbackLocale})\\.mdx$`), '')
    return !localizedSlugs.has(slug)
  })

  const fallbackOnlyPosts = await Promise.all(fallbackOnlyFiles.map(file => getPostMetadata(file, dir)))

  // Combine localized posts + fallback-only posts
  const allPosts = [...localizedPosts, ...fallbackOnlyPosts]

  // Sort all posts by published date descending
  allPosts.sort((a, b) =>
    new Date(b.publishedAt ?? '').getTime() - new Date(a.publishedAt ?? '').getTime()
  )

  return limit ? allPosts.slice(0, limit) : allPosts
}

export async function getPostMetadata(filepath: string, dir: string): Promise<PostMetadata> {
  const rootDirectory = path.join(process.cwd(), 'content', dir)
  const slug = filepath.replace(/\.([a-z]{2})\.mdx$/, '') // removes `.en.mdx`, `.ja.mdx`, etc.
  console.log("getPostMetadata", slug)
  const filePath = path.join(rootDirectory, filepath)
  const fileContent = await fs.readFile(filePath, { encoding: 'utf-8' })
  const { data } = matter(fileContent)

  return { ...data, slug } as PostMetadata
}
