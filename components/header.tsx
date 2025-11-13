'use client'

import { useClickOrDoubleClick } from '@/app/hooks/useClickOrDoubleClick'
import ThemeToggle from '@/components/theme-toggle'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,P
//   ContextMenuTrigger
// } from './ui/context-menu'
import LocaleSwitcher from './locale-switcher'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'

type HeaderProps = {
  locale: string
}

export default function Header({ locale }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [, setLocale] = useState<string>('')

  const NAV_ITEMS = [
    { href: `/${locale}/posts`, label: 'Posts' },
    { href: `/${locale}/projects`, label: 'Projects' },
    { href: `/${locale}/contact`, label: 'Contact' }
  ]

  useEffect(() => {
    const cookieLocale = document.cookie
      .split('; ')
      .find(row => row.startsWith('MYNEXTAPP_LOCALE='))
      ?.split('=')[1]

    if (cookieLocale) {
      setLocale(cookieLocale)
    } else {
      const browserLocale = navigator.language.slice(0, 2)
      setLocale(browserLocale)
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale}`

      // No need to refresh here, will be handled in LocaleSwitcher
      // router.refresh();
    }
  }, [router])

  const handleClick = useClickOrDoubleClick({
    singleClick: () => {
      // console.log('Single click')
      setOpen(true)
    },
    doubleClick: () => {
      // console.log('Double click')
      router.push(`/${locale}`)
    }
  })

  const handleLinkClick = () => {
    setOpen(false) // Close the dropdown menu
  }

  return (
    <header className='bg-accent/40 fixed inset-x-0 top-0 z-50 py-3 backdrop-blur-sm'>
      <nav className='container mx-auto flex max-w-3xl items-center justify-between px-4'>
        <div className='flex-none'>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger onClick={handleClick} asChild>
              <div
                role='button'
                onClick={handleClick} // Handle single click
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Image
                        src='/images/AR_Logo.png'
                        alt='Logo'
                        width={48}
                        height={48}
                        className='rounded-full transition-transform duration-300 hover:scale-105'
                      />
                    </TooltipTrigger>
                    <TooltipContent>
                      Click the logo to find more of my sites!
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <Link
                href={`/${locale}`}
                className='font-serif text-2xl font-bold'
                onClick={handleLinkClick}
              >
                {/* <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild> */}
                <DropdownMenuLabel className='text-center hover:underline hover:underline-offset-4'>
                  Back to Home
                </DropdownMenuLabel>
                {/* </TooltipTrigger>
                    <TooltipContent>
                      Double click to go back to the main page!
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
              </Link>
              <DropdownMenuSeparator />
              <Link href='https://vgen.co/noatorie/portfolio'>
                <DropdownMenuItem className='cursor-pointer'>
                  <Image
                    src='/images/cat.svg'
                    alt='cat'
                    width={24}
                    height={24}
                  ></Image>
                  {/* <img src='/images/cat.svg' alt='cat' className='h-4 w-4' /> */}
                  Art Portfolio
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <Link href='https://haneure-old.vercel.app/'>
                <DropdownMenuItem className='cursor-pointer'>
                  <Image
                    src='/images/cat.svg'
                    alt='cat'
                    width={24}
                    height={24}
                  ></Image>
                  {/* <img src='/images/cat.svg' alt='cat' className='h-4 w-4' /> */}
                  Old Portfolio
                </DropdownMenuItem>
              </Link>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* <ContextMenu>
            <ContextMenuTrigger></ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem onSelect={() => alert('Test clicked')}>
                <div className='flex items-center gap-2'>
                  <Image
                    src='/images/logo.png'
                    alt='Logo'
                    width={24}
                    height={24}
                    className='rounded-full'
                  />
                  Kurisu no Atorie
                </div>
              </ContextMenuItem>
              <ContextMenuItem onSelect={() => alert('Test2 clicked')}>
                Test2
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu> */}
        </div>

        {/* Center: Desktop Nav */}
        <div className='hidden flex-1 justify-center sm:flex'>
          <ul className='text-primary hidden items-center justify-center gap-6 font-mono sm:flex'>
            {NAV_ITEMS.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`transition-colors hover:underline hover:underline-offset-[4px] ${
                    pathname === item.href
                      ? 'text-foreground underline underline-offset-[4px]'
                      : 'text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className='flex items-center gap-2'>
          {/* Mobile Hamburger Menu */}
          <div className='flex items-center sm:hidden'>
            <DropdownMenu>
              <DropdownMenuTrigger className='transition-transform duration-200 ease-in-out hover:scale-110 focus:outline-none'>
                <Menu className='text-primary h-6 w-9' />
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {NAV_ITEMS.map(item => (
                  <DropdownMenuItem key={item.href} asChild>
                    <Link href={item.href}>{item.label}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className='flex-none'>
            <LocaleSwitcher currentLocale={locale} />
          </div>
          <div className='flex-none'>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  )
}
