import type { Metadata } from 'next'
import { Poppins, Gabarito } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

const gabarito = Gabarito({ 
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-gabarito'
})

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
      <body className={`${poppins.className} ${gabarito.variable} min-h-screen flex flex-col`}>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}