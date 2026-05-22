import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react"

import { sourceImages } from "@/lib/lawnpro"

export function Container({
  children,
  className = "",
}: {
  children: ReactNode
  className?: string
}) {
  return <div className={`mx-auto w-full max-w-[1280px] px-5 md:px-8 ${className}`}>{children}</div>
}

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Seasonal", href: "/seasonal-maintenance" },
  { label: "Products", href: "/products" },
  { label: "Shop", href: "/shop" },
  { label: "Franchise", href: "/franchise" },
]

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-forest/10 bg-cream/86 backdrop-blur-xl">
      <Container className="flex min-h-[78px] items-center justify-between gap-4">
        <Link href="/" aria-label="LawnPro home" className="group relative inline-flex max-w-[188px] overflow-hidden shadow-[0_14px_50px_rgba(22,52,21,.12)] md:max-w-[224px]">
          <Image
            src={sourceImages.logo}
            alt="LawnPro"
            width={355}
            height={70}
            preload
            className="h-auto w-full transition duration-300 group-hover:scale-[1.02]"
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex" aria-label="Main navigation">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-semibold tracking-[-0.01em] text-forest/72 transition hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/shop"
            className="hidden min-h-11 items-center border border-forest/15 bg-white/75 px-4 text-sm font-bold text-forest transition hover:border-forest hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest sm:inline-flex"
          >
            Shop
          </Link>
          <Link
            href="/contact"
            className="sun-button inline-flex min-h-11 items-center gap-2 px-4 text-sm font-extrabold text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
          >
            Free analysis
            <ArrowUpRight className="size-4" aria-hidden />
          </Link>
        </div>
      </Container>
      <Container className="border-t border-forest/8 py-2 xl:hidden">
        <nav className="flex gap-4 overflow-x-auto pb-1 text-xs font-black uppercase tracking-[0.16em] text-forest/62" aria-label="Mobile navigation">
          {navLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 py-1 transition hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-deep text-[#f9f4dc]">
      <div className="grass-glow absolute inset-0 opacity-55" />
      <Container className="relative grid gap-10 py-14 lg:grid-cols-[1.08fr_.75fr_.85fr]">
        <div>
          <Image
            src={sourceImages.logo}
            alt="LawnPro"
            width={328}
            height={65}
            className="h-auto w-full max-w-[260px]"
          />
          <p className="mt-5 max-w-md text-base leading-7 text-[#f9f4dc]/70">
            A local rebuild of LawnPro&apos;s treatment, seasonal care, product,
            and franchise paths. The lawn doctor story stays diagnostic from
            root to tip.
          </p>
        </div>

        <div>
          <p className="eyebrow text-sun">Paths</p>
          <div className="mt-5 grid gap-3 text-sm font-semibold">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="w-fit text-[#f9f4dc]/78 transition hover:text-sun">
                {item.label}
              </Link>
            ))}
            <Link href="/privacy-policy" className="w-fit text-[#f9f4dc]/78 transition hover:text-sun">
              Privacy policy
            </Link>
          </div>
        </div>

        <address className="not-italic">
          <p className="eyebrow text-sun">Head office</p>
          <div className="mt-5 space-y-4 text-sm leading-6 text-[#f9f4dc]/76">
            <a href="tel:+27120023679" className="flex gap-3 transition hover:text-sun">
              <Phone className="mt-1 size-4 shrink-0" aria-hidden />
              +27 12 002 3679
            </a>
            <a href="mailto:charl@lawnpro.co.za" className="flex gap-3 transition hover:text-sun">
              <Mail className="mt-1 size-4 shrink-0" aria-hidden />
              charl@lawnpro.co.za
            </a>
            <p className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0" aria-hidden />
              29 Leslie Street, Murrayfield, Pretoria, South Africa
            </p>
          </div>
        </address>
      </Container>
      <Container className="relative border-t border-white/12 py-5 text-xs font-semibold uppercase tracking-[0.2em] text-white/42">
        LawnPro concept rebuild · local review build
      </Container>
    </footer>
  )
}
