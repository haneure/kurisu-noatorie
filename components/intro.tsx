import Image from 'next/image'
import React from 'react'
// TODO:
//  Change to actual image kurisu.png later
import kurisu from '@/public/images/placeholder.png'
import { useTranslations } from 'next-intl'

export default function Intro() {
  const t = useTranslations('TabTitles')

  return (
    <section className='flex flex-col items-start gap-x-10 gap-y-4 pb-12 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='title mb-4 no-underline'>
          {t("home")}
        </h1>
        <h1 className='title mb-4 no-underline'>
          <span>Hey</span>, I&#39;m{' '}
          <span className='text-foreground'>Chris</span>.
        </h1>
        <p>
          {' '}
          {/* Add animation for Hey and My name, change the text from Chris - Kurisu - クリス randomly ( glitch animation / some other cool transition lol, just like in kobayashi san chi no maid dragon is cool if possible is better )  */}
          I&#39;m a software engineer based in Tangerang, Indonesia. I&#39;m
          always trying to learn new things because learning new things never
          bores me! Recently, I just start creating my own homelab. I also
          start making Indie Games using Godot.
        </p>
      </div>
      <div className='relative'>
        <Image
          className='flex-1 rounded-lg grayscale'
          src={kurisu}
          alt='Christian Halim'
          width={175}
          height={175}
          priority
        />
      </div>
    </section>
  )
}
