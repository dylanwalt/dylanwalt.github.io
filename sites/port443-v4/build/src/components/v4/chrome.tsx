"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/site/container"
import { cn, withBasePath } from "@/lib/utils"

const VUEITALL_URL = "https://www.vueitall.com"
const LINKEDIN_URL = "https://www.linkedin.com/company/port443-pty-ltd"
const DEMO_MAILTO = "mailto:info@port443.co.za?subject=Request%20a%20demo"
const INFO_MAILTO = "mailto:info@port443.co.za"

export const navLinks = [
  { label: "OneView Platform", href: "/#oneview" },
  { label: "Attestation", href: "/#loop" },
  { label: "Frameworks", href: "/#frameworks" },
  { label: "Insights", href: "/#insights" },
  { label: "vueITall", href: VUEITALL_URL, external: true },
]

function isExternal(href: string) {
  return /^https?:\/\//.test(href) || href.startsWith("mailto:")
}

export function SiteNav({ floating = true }: { floating?: boolean }) {
  return (
    <header
      className={cn(
        "z-40",
        floating ? "absolute top-0 left-0 right-0 pt-6" : "border-b border-[var(--ink-3)] py-5",
      )}
    >
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <Image
            src="/port443-v4/logo-shield-white.svg"
            alt="Port443"
            width={28}
            height={28}
            priority
          />
          <span className="text-[15px] font-semibold tracking-tight">
            Port<span className="text-[var(--green)]">443</span>
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 text-[13px] text-[var(--muted-on-ink)]">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[var(--ivory)] transition-colors"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.label}
                href={link.href}
                className="hover:text-[var(--ivory)] transition-colors"
              >
                {link.label}
              </Link>
            ),
          )}
        </nav>
        <a
          href={DEMO_MAILTO}
          className="inline-flex items-center gap-2 bg-[var(--green)] text-[var(--ivory-2)] px-4 py-2 text-[13px] font-medium tracking-tight hover:opacity-90 transition-opacity rounded-[2px]"
        >
          Request a demo
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </Container>
    </header>
  )
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--ink-3)] bg-[var(--ink)] py-16">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3">
              <Image
                src="/port443-v4/logo-shield-white.svg"
                alt="Port443"
                width={28}
                height={28}
              />
              <span className="text-[16px] font-semibold tracking-tight">
                Port<span className="text-[var(--green)]">443</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-[13.5px] leading-[1.55] text-[var(--muted-on-ink)]">
              Automating cyber security. Continuous attestation, OneView
              posture, custom SOC automation, and security consulting.
            </p>
            <a
              href={DEMO_MAILTO}
              className="mt-6 inline-flex items-center gap-2 bg-[var(--green)] text-[var(--ivory-2)] px-4 py-2 text-[13px] font-medium tracking-tight rounded-[2px] hover:opacity-90 transition-opacity"
            >
              Request a demo
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <FooterColumn
            title="Platform"
            links={[
              { label: "OneView Platform", href: "/#oneview" },
              { label: "Attestation", href: "/#loop" },
              { label: "Frameworks", href: "/#frameworks" },
            ]}
          />
          <FooterColumn
            title="Services"
            links={[
              { label: "Control Attestation", href: "/services/" },
              { label: "Custom Automation", href: "/services/" },
              { label: "Consulting", href: "/services/" },
              { label: "All services", href: "/services/" },
            ]}
          />
          <FooterColumn
            title="Company"
            links={[
              { label: "About", href: "/about-us/" },
              { label: "Insights", href: "/#insights" },
              { label: "vueITall", href: VUEITALL_URL },
            ]}
          />
          <FooterColumn
            title="Connect"
            links={[
              { label: "LinkedIn", href: LINKEDIN_URL },
              { label: "Email", href: INFO_MAILTO },
            ]}
          />
        </div>
        <div className="mt-14 pt-7 border-t border-[var(--ink-3)] flex flex-wrap items-center justify-between gap-4 text-[12px] text-[var(--muted-on-ink)]">
          <span>© {new Date().getFullYear()} Port443 (Pty) Ltd.</span>
          <span className="mono">
            v4 · rebuilt from the website-rebuild-pro skill
          </span>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="lg:col-span-2">
      <div className="mono text-[11px] tracking-[0.2em] text-[var(--green)]">
        {title.toUpperCase()}
      </div>
      <ul className="mt-5 space-y-3 text-[13.5px]">
        {links.map((l) => {
          const external = isExternal(l.href)
          const resolved = external ? l.href : withBasePath(l.href)
          return (
            <li key={l.label}>
              <a
                className="text-[var(--muted-on-ink)] hover:text-[var(--ivory)]"
                href={resolved}
                {...(external && !l.href.startsWith("mailto:")
                  ? { target: "_blank", rel: "noreferrer" }
                  : {})}
              >
                {l.label}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
