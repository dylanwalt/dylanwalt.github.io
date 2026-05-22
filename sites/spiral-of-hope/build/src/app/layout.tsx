import type { Metadata } from "next";
import { Amatic_SC, Cabin } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/spiral/frame";
import "./globals.css";

const bodyFont = Cabin({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Amatic_SC({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Spiral of Hope | Textile Rebuild",
    template: "%s | Spiral of Hope",
  },
  description:
    "Spiral of Hope collection, maker story, reseller, contact, and policy routes rebuilt as a textile-led South African craft experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bodyFont.variable} ${displayFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
