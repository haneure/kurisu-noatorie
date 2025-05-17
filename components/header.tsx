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
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
// import {
//   ContextMenu,
//   ContextMenuContent,
//   ContextMenuItem,
//   ContextMenuTrigger
// } from './ui/context-menu'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from './ui/tooltip'

export default function Header() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleClick = useClickOrDoubleClick({
    singleClick: () => {
      console.log('Single click')
      setOpen(true)
    },
    doubleClick: () => {
      console.log('Double click')
      router.push('/')
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
                      Click the logo to access more sites!
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <Link
                href='/'
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
                  <Image src='/cat.svg' alt='cat' width={24} height={24}></Image>
                  {/* <img src='/cat.svg' alt='cat' className='h-4 w-4' /> */}
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
