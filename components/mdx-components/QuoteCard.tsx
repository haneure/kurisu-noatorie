import React from 'react'

export default function QuoteCard({
  quote,
  author
}: {
  quote: string
  author: string
}) {
  return (
    <div className="relative my-10 px-6 py-8 bg-muted/40 rounded-xl shadow-md border border-muted">
      <svg
        className="absolute top-4 left-4 h-8 w-8 text-muted-foreground/20"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M7.17 3H3v7.17c0 3.73 2.78 7.11 6.5 7.83V21h4v-2.17c0-3.73-2.78-7.11-6.5-7.83V3zm10 0h-4v7.17c0 3.73 2.78 7.11 6.5 7.83V21h4v-2.17c0-3.73-2.78-7.11-6.5-7.83V3z" />
      </svg>
      <blockquote className="text-lg font-medium leading-relaxed text-foreground/90">
        {quote.split('\n').map((line, i) => (
          <p key={i} className="mb-2 last:mb-0">
            {line}
          </p>
        ))}
      </blockquote>
      <figcaption className="mt-4 text-sm text-right italic text-muted-foreground">
        — {author}
      </figcaption>
    </div>
  )
}
