import Image from 'next/image'
import React from 'react'
import clsx from 'clsx'

export default function ImageWithLabel({
  src,
  width,
  height,
  alt,
  label,
  href,
  rounded = 'md',
  className = ''
}: {
  src: string
  width: number
  height: number
  alt: string
  label: string
  href: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  className?: string
}) {
  return (
    <div className="text-center my-8">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={clsx(
          'mx-auto',
          {
            'rounded-none': rounded === 'none',
            'rounded-sm': rounded === 'sm',
            'rounded-md': rounded === 'md',
            'rounded-lg': rounded === 'lg',
            'rounded-xl': rounded === 'xl',
            'rounded-2xl': rounded === '2xl',
            'rounded-3xl': rounded === '3xl',
            'rounded-full': rounded === 'full'
          }
        ).concat(' ', className)}
      />
      <p className="mt-2 text-sm italic text-muted-foreground">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-hyperlink hover:underline dark:text-sky-400"
        >
          {label}
        </a>
      </p>
    </div>
  )
}
