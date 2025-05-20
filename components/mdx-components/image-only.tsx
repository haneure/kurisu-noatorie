import Image from 'next/image'

export default function ImageOnly({
  src,
  width,
  height,
  alt,
  href,
  rounded = 'md',
  className = ''
}: {
  src: string
  width: number
  height: number
  alt: string
  href?: string
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  className?: string
}) {
  const roundedMap = {
    none: 'rounded-none',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    '2xl': 'rounded-2xl',
    full: 'rounded-full'
  }

  const img = (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={`inline-block align-middle ${roundedMap[rounded]} ${className}`}
    />
  )

  return href ? (
    <a href={href} target="_blank" rel="noopener noreferrer">
      {img}
    </a>
  ) : (
    img
  )
}