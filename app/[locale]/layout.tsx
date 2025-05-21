import { CatChatProvider } from '@/components/cats/cat-chat-provider'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Providers from '@/components/providers'
import type { Metadata } from 'next'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin']
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin']
// })

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  console.log('LocaleLayout', locale)

  return (
    <div>
      <Providers>
        <Header locale={locale} />
        <main className='grow'>
          <CatChatProvider>{children}</CatChatProvider>
        </main>
        <Footer />
      </Providers>
    </div>
  )
}
