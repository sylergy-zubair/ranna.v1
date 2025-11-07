import type { Metadata } from 'next'
import { Poppins, Gabarito } from 'next/font/google'
import './globals.css'
import ConditionalLayout from '@/components/ConditionalLayout'
import { CookieConsentProvider } from '@/context/CookieConsentContext'
import CookieBanner from '@/components/cookies/CookieBanner'
import GtmLoader from '@/components/cookies/GtmLoader'

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
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
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
        <CookieConsentProvider>
          <GtmLoader />
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
          <CookieBanner />
        </CookieConsentProvider>
      </body>
    </html>
  )
}