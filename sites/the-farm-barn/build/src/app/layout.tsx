import type { Metadata } from "next";
import { Fraunces, Nunito_Sans } from "next/font/google";
import { SiteFooter, SiteHeader } from "@/components/farm/frame";
import "./globals.css";

const bodyFont = Nunito_Sans({
  variable: "--font-body",
  subsets: ["latin"],
});

const displayFont = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["SOFT", "WONK"],
});

export const metadata: Metadata = {
  title: {
    default: "The Farm Barn | Pretoria East Rebuild",
    template: "%s | The Farm Barn",
  },
  description:
    "The Farm Barn local farm supply, animal care, café, visit, and Pretoria East contact experience rebuilt as a standalone route.",
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
