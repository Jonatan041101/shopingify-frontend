import './globals.css'
import { Quicksand } from 'next/font/google'
import '../css/main.css'
const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
})
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${quicksand.className} body`}>{children}</body>
    </html>
  )
}
