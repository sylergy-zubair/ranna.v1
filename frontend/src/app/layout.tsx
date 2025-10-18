import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ranna - Authentic Indian Cuisine',
  description: 'Discover authentic Indian cuisine with our interactive menu. Filter by spice level, dietary preferences, and more.',
  keywords: 'Indian food, curry, tandoori, vegetarian, vegan, restaurant menu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}