import Image from 'next/image'
import React from 'react'
// TODO:
//  Change to actual image kurisu.png later
import kurisu from '@/public/images/noatorie.jpg'
// import { useTranslations } from 'next-intl'
import { useSafeTranslations } from '@/lib/metadata/i18n'

export default function Intro() {
  const { text } = useSafeTranslations('Intro')

  // const t = useTranslations('Intro')
  return (
    <section className='flex flex-col items-start gap-x-10 gap-y-4 pb-6 md:flex-row md:items-center'>
      <div className='mt-2 flex-1 md:mt-0'>
        <h1 className='title mb-4 no-underline'>{text('home')}</h1>
        <h1 className='title mb-4 no-underline'>
          <span>{text('intro')}</span>
          <span className='text-foreground'>{text('name')}</span>
        </h1>
        <p>
          {' '}
          {/* Add animation for Hey and My name, change the text from Chris - Kurisu - クリス randomly ( glitch animation / some other cool transition lol, just like in kobayashi san chi no maid dragon is cool if possible is better )  */}
          {/* I&#39;m a software engineer based in Tangerang, Indonesia. I&#39;m
          always trying to learn new things because learning new things never
          bores me! Recently, I just start creating my own homelab. I also
          start making Indie Games using Godot. */}
          {text('bio')}
        </p>
      </div>
      <div className='relative h-44 w-44 overflow-hidden rounded-full'>
        <Image
          className='border-foreground/10 shadow-foreground/10 hover:border-foreground/20 dark:border-foreground/20 dark:shadow-foreground/20 h-full w-full scale-105 border-4 border-solid object-cover shadow-lg transition-all duration-300 hover:scale-110'
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
