import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '✨ Nisa Fredlina, My Beloved Soulmate FR FR No Cap! 💖',
  description: 'Ini tuh buat kamu yang paling real, lover of my life, fr deh ga main-main! Yang bikin hari-hari jadi ngefly banget sumpah! 🦋💝',
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
