'use client'

import Cookies from 'js-cookie'
import { usePathname, useRouter } from 'next/navigation'
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { SUPPORTED_LOCALES } from '@/lib/metadata/i18n'
import { useTransition } from 'react'

export default function LocaleSwitcher({ currentLocale }: { currentLocale: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const handleLocaleChange = (newLocale: string) => {
    Cookies.set('MYNEXTAPP_LOCALE', newLocale, { expires: 365 }) // store for 1 year

    startTransition(() => {
        router.push(`/${newLocale}`)
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="px-2 py-1 rounded-md hover:bg-muted hover:scale-120 transition-transform duration-200 ease-in-out">
        {SUPPORTED_LOCALES.find(l => l.code === currentLocale)?.flag}
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {SUPPORTED_LOCALES.map(locale => (
          <DropdownMenuItem
            key={locale.code}
            onClick={() => handleLocaleChange(locale.code)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span>{locale.flag}</span>
            <span>{locale.name}</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
