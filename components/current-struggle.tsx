'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

export default function CurrentStruggle() {
  const { resolvedTheme } = useTheme()
  const [giscusTheme, setGiscusTheme] = useState('light')
  const pathname = usePathname();
  const locale = pathname.split('/')[1] || 'en'; // fallback to 'en'

  useEffect(() => {
      // Use resolvedTheme because "theme" can be "system"
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
                <span className="text-indigo-600 dark:text-indigo-300 font-bold">Current struggle</span>
            </h1>
            <p>
                {' '}
                {/* Add animation for Hey and My name, change the text from Chris - Kurisu - クリス randomly ( glitch animation / some other cool transition lol, just like in kobayashi san chi no maid dragon is cool if possible is better )  */}
                I'm still unable to figure out how to serve my <strong>WebSocket (Socket.IO) server through a Cloudflared tunnel</strong>. I've tried bypassing wsRule and adding policies for my application, but no luck so far. I'll try again later.
            </p>
            <ul className='font-bold mt-1'>
                <li>・Bypassed wsRule</li>
                <li>・Added policies for my applications</li>
            </ul>
            <h1 className='title mb-4 mt-4 no-underline'>
                <span className="text-indigo-600 dark:text-indigo-300 font-bold">Updates</span>
            </h1>
            <p>
              I tried hosting the WebSocket directly on my Raspberry Pi, but had no luck. Since it's using HTTP, my website (which uses HTTPS) can't connect to it. The website is hosted via a Cloudflared Tunnel (HTTPS). I tried securing the WebSocket with SSL certificates using Certbot, but it seems to require a static external IP so Certbot can access it—despite the fact that I've added DNS records pointing to my WebSocket's IP.
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
          <h2 className='subtitle text-center text-indigo-600 dark:text-indigo-300'>If you have some advice / discussion, feel free to drop it here:</h2>
        </div>

        <div>
          <Giscus 
              id="comments"
              repo="haneure/kurisu-noatorie"
              repoId="R_kgDOOd4kpg"
              category="Announcements"
              categoryId="DIC_kwDOOd4kps4CqXVB"
              mapping="specific"
              term="current-struggles"
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
      {/* <div className='relative'>
        <Image
          className='flex-1 rounded-lg grayscale'
          src={kurisu}
          alt='Christian Halim'
          width={175}
          height={175}
          priority
        />
      </div> */}
    </section>
  )
}
