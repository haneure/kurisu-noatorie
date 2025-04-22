import Footer from '@/components/footer'
import Header from '@/components/header'
import Providers from '@/components/providers'
import { cn } from '@/lib/utils'
import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

// const geistSans = Geist({
//   variable: '--font-geist-sans',
//   subsets: ['latin']
// })

// const geistMono = Geist_Mono({
//   variable: '--font-geist-mono',
//   subsets: ['latin']
// })

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif'
})

export const metadata: Metadata = {
  title: 'Kurisu No Atorie',
  description: 'Kurisu No Atorie is a personal blog and portfolio website.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col font-sans antialiased',
          inter.variable,
          playfair.variable
        )}
      >
        <Providers>
          <Header />
          <main className='grow'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
