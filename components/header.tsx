import ThemeToggle from '@/components/theme-toggle'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className='bg-accent/40 fixed inset-x-0 top-0 z-50 py-3 backdrop-blur-sm'>
      <nav className='container mx-auto flex max-w-3xl items-center justify-between px-4'>
        <div className='flex-none'>
          <Link href='/' className='font-serif text-2xl font-bold'>
            <Image
              src='/images/logo.png'
              alt='Logo'
              width={48}
              height={48}
              className='rounded-full'
            />
            {/* Noatorie */}
          </Link>
        </div>

        <ul className='text-primary flex flex-grow items-center justify-center gap-6 pr-4 font-mono sm:gap-10'>
          <li className='hover:text-foreground transition-colors hover:underline hover:underline-offset-[4px]'>
            <Link href='/posts'>Posts</Link>
          </li>
          <li className='hover:text-foreground transition-colors hover:underline hover:underline-offset-[4px]'>
            <Link href='/projects'>Projects</Link>
          </li>
          <li className='hover:text-foreground transition-colors hover:underline hover:underline-offset-[4px]'>
            <Link href='/other'>Other</Link>
          </li>
          <li className='hover:text-foreground transition-colors hover:underline hover:underline-offset-[4px]'>
            <Link href='/contact'>Contact</Link>
          </li>
        </ul>

        <div className='flex-none'>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  )
}
