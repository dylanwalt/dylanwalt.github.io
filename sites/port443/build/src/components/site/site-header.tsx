import Image from "next/image"
import Link from "next/link"

import { Container } from "@/components/site/container"

const nav = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <Image
            src="/port443/logo-shield-color.svg"
            alt="Port443"
            width={34}
            height={34}
            className="h-[34px] w-auto object-contain"
            priority
          />
          <div className="leading-none">
            <div className="font-semibold tracking-tight text-foreground">Port443</div>
            <div className="text-[9px] font-semibold tracking-[0.1em] text-[#0e6b54]">
              &lt; AUTOMATING CYBER DEFENSE &gt;
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/request-a-demo"
            className="inline-flex h-9 items-center justify-center rounded-lg bg-accent px-3 text-sm font-semibold text-accent-foreground shadow-sm transition-colors hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            Request a Demo
          </Link>
        </div>
      </Container>
    </header>
  )
}
