import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import React, { JSX } from 'react'
import { highlight } from 'sugar-high'

import Counter from './mdx-components/counter'
import GiscusMdx from './mdx-components/giscus-mdx'
import ImageWithLabel from './mdx-components/image-with-label'
import Link from 'next/link'
import ImageOnly from './mdx-components/image-only'
import QuoteCard from './mdx-components/QuoteCard'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Code({ children, ...props }: any) {
  const codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

const components = {
  code: Code,
  Counter,
  GiscusMdx,
  ImageWithLabel,
  Link,
  ImageOnly,
  QuoteCard
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components || {}) }}
    />
  )
}
