import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Amiri, Cairo } from 'next/font/google'
import './globals.css'

const amiri = Amiri({
  weight: ['400', '700'],
  subsets: ['arabic'],
  variable: '--font-amiri',
})

const cairo = Cairo({
  subsets: ['arabic', 'latin'],
  variable: '--font-cairo',
})

export const metadata: Metadata = {
  title: 'متجر نور — الجمال الفاخر',
  description: 'منتجات العناية بالبشرة والجمال الفاخر، مختارة بعناية من متجر نور.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { CartProvider } from '@/components/cart-provider'
import GlobalLayout from '@/components/global-layout'

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)
  const isAuthenticated = !!session?.user
  const isAdmin = (session?.user as any)?.role === 'admin'

  return (
    <html lang="ar" dir="rtl">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body className={`${amiri.variable} ${cairo.variable} antialiased`}>
        <CartProvider>
          <GlobalLayout isAuthenticated={isAuthenticated} isAdmin={isAdmin}>
            {children}
          </GlobalLayout>
        </CartProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
