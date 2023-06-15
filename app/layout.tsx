import NavBar from './components/navbar/NavBar'
import './globals.css'
import { Playfair_Display } from 'next/font/google'

const playfair = Playfair_Display({ subsets: ['latin'] })

export const metadata = {
  title: 'Chartify',
  description: 'Webapp for viewing your spotify statistics',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className={`${playfair.className} bg-no-repeat bg-cover bg-gradient-to-tl from-[#eb7f7b] to-[#3023ae] text-white min-h-full`} lang="en">
      <body className='h-full'>
        <NavBar />
        {children}  
      </body>
    </html>
  )
}
