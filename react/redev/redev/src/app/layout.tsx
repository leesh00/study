import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '회개하라!',
  description: '개발 인사이트 회고 아카이브',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body style={{ minHeight: '100vh', background: '#f5f8ff' }}>
        <Header />
        <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px' }}>
          {children}
        </div>
      </body>
    </html>
  )
}