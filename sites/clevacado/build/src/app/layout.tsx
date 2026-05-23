import type { Metadata } from "next"
import { Fraunces, DM_Sans, DM_Mono } from "next/font/google"
import "./globals.css"

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ClevaCado — Post-Harvest Avocado Diagnostics",
  description:
    "Precision telemetry that travels with your fruit. Identify invisible bruising damage across every handling stage before it costs you.",
  openGraph: {
    title: "ClevaCado — Post-Harvest Avocado Diagnostics",
    description:
      "Precision telemetry that travels with your fruit. Identify invisible bruising damage across every handling stage before it costs you.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${dmSans.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
