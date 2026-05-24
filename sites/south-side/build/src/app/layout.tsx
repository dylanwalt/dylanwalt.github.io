import type { Metadata } from "next"
import { Fraunces, JetBrains_Mono, Manrope } from "next/font/google"
import "./globals.css"

const fontDisplay = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
})

const fontSans = Manrope({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

const fontMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
})

export const metadata: Metadata = {
  title: "South Side — Premium hard soda from South Africa",
  description:
    "Vodka. Real fruit. Sparkling spring water. 5% ABV. 72 calories. Five flavours, made for the heat. Available at Pick n Pay, Spar, and Liquor City.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[var(--ink)] text-[var(--cream)]">
        {children}
      </body>
    </html>
  )
}
