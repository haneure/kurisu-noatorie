import Image from 'next/image'
import React from 'react'

export default function CurrentStruggle() {
  return (
    <section className='flex flex-col items-start gap-x-10 gap-y-4 pb-12 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <div className='mb-2'>
            <h1 className='title mb-4 no-underline'>
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
