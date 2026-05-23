import type { Metadata } from "next"
import { Geist_Mono, Space_Grotesk, Syne } from "next/font/google"
import "./globals.css"

const fontDisplay = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["700", "800"],
})

const fontSans = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
})

const fontMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Port443 | < AUTOMATING CYBER DEFENSE >",
  description:
    "Port443 automates cyber defense across the Middle East and Africa — control attestation, unified visibility, custom SOC automation, and security consulting.",
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
      <body className="min-h-full flex flex-col bg-[#030912] text-[#f0f8f4]">{children}</body>
    </html>
  )
}
