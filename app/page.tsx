'use client'

import { redirect, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react';

export default function Home() {
    const router = useRouter()
    const [locale, setLocale] = useState<string>("");
  
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
      router.refresh();
    }
  }, [router])

  // console.log('going root')

  // redirect(`/${locale}`)
}
