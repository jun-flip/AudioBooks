import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AudioBooks - Слушайте книги в любое время',
  description: 'Откройте для себя мир аудиокниг. Слушайте любимые произведения во время прогулки, в дороге или перед сном.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
} 