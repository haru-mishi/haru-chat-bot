import type { Metadata } from 'next'
import { Fredoka, Nunito_Sans, JetBrains_Mono, Noto_Sans_Thai } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AppProvider } from '@/context/app-context'
import './globals.css'

const _fredoka = Fredoka({ subsets: ["latin"] });
const _nunitoSans = Nunito_Sans({ subsets: ["latin"] });
const _jetbrainsMono = JetBrains_Mono({ subsets: ["latin"] });
// The app serves real Thai chat content — Nunito Sans has no Thai glyphs, so this is a required fallback, not decoration.
const _notoSansThai = Noto_Sans_Thai({ subsets: ["thai"] });

export const metadata: Metadata = {
  title: 'Haru AI Hub',
  description: 'Comprehensive platform for managing and interacting with various AI models',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className="font-sans antialiased">
        <AppProvider>
          {children}
        </AppProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
