import type { Metadata } from 'next'
import { Italiana, Raleway, Montserrat } from 'next/font/google'
import './globals.css'

const italiana = Italiana({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-italiana',
  display: 'swap',
})

const raleway = Raleway({
  subsets: ['latin'],
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  weight: ['400', '500', '600'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Olivia Sinclair | California Real Estate',
  description: 'Your Next Move Starts Here — Olivia Sinclair, California Real Estate Agent',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${italiana.variable} ${raleway.variable} ${montserrat.variable} font-raleway text-off-black antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
