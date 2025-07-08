'use client'

import { useSafeTranslations } from '@/lib/metadata/i18n'
import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function CurrentStruggle() {
  const {text, rich} = useSafeTranslations('CurrentStruggle');
  const { resolvedTheme } = useTheme()
  const [giscusTheme, setGiscusTheme] = useState('light')
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en'; // fallback to 'en'

  useEffect(() => {
      if (resolvedTheme === 'dark') {
      setGiscusTheme('dark')
      } else {
      setGiscusTheme('light')
      }
  }, [resolvedTheme])
  
  return (
    <section className='flex flex-col items-start gap-x-10 gap-y-4 pb-12 md:flex-row md:items-center'>
      <div className='flex-1 md:mt-0'>
        <div className='mb-2'>
            <h1 className='title mb-4 mt-4 no-underline'>
                <span className="text-indigo-600 dark:text-indigo-300 font-bold">{text('currentStruggle')}</span>
            </h1>
            <p>
              {rich('currentStruggleContent', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}
            </p>
            {rich('currentStruggleList', {
              ul: (chunks) => <ul className="font-bold mt-1">{chunks}</ul>,
              li: (chunks) => <li>・{chunks}</li>
            })}
            <h1 className='title mb-4 mt-4 no-underline'>
                <span className="text-indigo-600 dark:text-indigo-300 font-bold">{text('update')}</span>
            </h1>
            <p>
              {rich('updateContent', {
                strong: (chunks) => <strong>{chunks}</strong>
              })}            
            </p>
        </div>

        <div>
            <h1 className='title mb-4 no-underline'>
            <span className='text-foreground'>References:</span>
            </h1>
            <ul>
                <li>
                    <a 
                        href="https://lmei88.medium.com/websocket-with-cloudflare-tunnel-reversed-proxy-to-self-hosted-ubuntu-server-95625475c610"
                        className='text-muted-foreground hover:text-foreground inline-flex items-center gap-2 underline decoration-1 underline-offset-2 transition-colors'
                    >
                        ・Websocket with Cloudflare Tunnel Reversed Proxy to Self-hosted Ubuntu Server
                    </a>
                </li>
            </ul>
        </div>

        <div className='mb-4 mt-4'>
          <h2 className='subtitle text-center text-indigo-600 dark:text-indigo-300'>
            {text('discussion')}
          </h2>
        </div>

        <div>
          <Giscus 
              id="comments"
              repo="haneure/kurisu-noatorie"
              repoId="R_kgDOOd4kpg"
              category="Announcements"
              categoryId="DIC_kwDOOd4kps4CqXVB"
              mapping="specific"
              term="current-struggle"
              strict="0"
              reactionsEnabled="1"
              emitMetadata="0"
              inputPosition="top"
              theme={giscusTheme}
              lang={locale}
              loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
