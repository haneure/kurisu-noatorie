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
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const [testLocale, setLocale] = useState<string>("");

  const NAV_ITEMS = [
    { href: `/${locale}/posts`, label: 'Posts' },
    { href: `/${locale}/projects`, label: 'Projects' },
    { href: `/${locale}/contact`, label: 'Contact' },
    { href: `/${locale}/stats`, label: 'Status' },
  ]

  useEffect(() => {
    const cookieLocale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("MYNEXTAPP_LOCALE="))
    ?.split("=")[1];

    if(cookieLocale) {
      setLocale(cookieLocale)
    } else {
      const browserLocale = navigator.language.slice(0, 2);
      setLocale(browserLocale)
      document.cookie = `MYNEXTAPP_LOCALE=${browserLocale}`;
      
      // No need to refresh here, will be handled in LocaleSwitcher
      // router.refresh();
    }
  }, [router])

  const handleClick = useClickOrDoubleClick({
    singleClick: () => {
      console.log('Single click')
      setOpen(true)
    },
    doubleClick: () => {
      console.log('Double click')
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
                        src='/images/logo.png'
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
                <DropdownMenuLabel>Back to Noatorie&apos;s</DropdownMenuLabel>
                {/* </TooltipTrigger>
                    <TooltipContent>
                      Double click to go back to the main page!
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider> */}
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
                  Old portfolio
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
        <div className="hidden sm:flex flex-1 justify-center">
          <ul className="hidden sm:flex text-primary items-center justify-center gap-6 font-mono">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.href}
                className="hover:text-foreground transition-colors hover:underline hover:underline-offset-[4px]"
              >
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile Hamburger Menu */}
          <div className="sm:hidden flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none hover:scale-110 transition-transform duration-200 ease-in-out">
                <Menu className="w-9 h-6 text-primary" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {NAV_ITEMS.map((item) => (
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
