import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ranna - Authentic Indian Cuisine',
  description: 'Discover authentic Indian cuisine with our interactive menu. Filter by spice level, dietary preferences, and more.',
  keywords: 'Indian food, curry, tandoori, vegetarian, vegan, restaurant menu',
  icons: {
    icon: '/img/Ranna_fav.png',
    shortcut: '/img/Ranna_fav.png',
    apple: '/img/Ranna_fav.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}