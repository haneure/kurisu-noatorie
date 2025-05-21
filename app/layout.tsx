import { cn } from '@/lib/utils'
import { Zen_Kaku_Gothic_New, Zen_Maru_Gothic } from 'next/font/google'
import './globals.css'

const kakuGothic = Zen_Kaku_Gothic_New({
    weight: '700',
    subsets: ['latin'],
    variable: '--font-sans'
})

const gothic = Zen_Maru_Gothic({
    weight: '900',
    subsets: ['latin'],
    variable: '--font-serif'
})

export const metadata: Metadata = {
    title: 'Kurisu No Atorie',
    description: 'Welcome to Kurisu No Atorie, a blog and portfolio featuring personal struggles, projects, and writings.',
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
    return (
        <html suppressHydrationWarning>
        <body         
            className={cn(
                'flex min-h-screen flex-col font-sans antialiased',
                kakuGothic.variable,
                gothic.variable
            )}
        >
            {children}
        </body>
        </html>
    )
}