import type { Metadata } from 'next'
import { Poppins, Gabarito } from 'next/font/google'
import Script from 'next/script'
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
      <head>
        <Script id="gtm-base" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-57GS8P56');
          `}
        </Script>
      </head>
      <body className={`${poppins.className} ${gabarito.variable} min-h-screen flex flex-col`}>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-57GS8P56"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
      </body>
    </html>
  )
}