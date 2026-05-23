import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/site/container"

export const metadata: Metadata = {
  title: "About Port443 | Automating Cyber Defense across MEA",
  description:
    "Port443 builds cyber security software, automation and integrations for enterprise customers across the Middle East and Africa.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#030912] text-[#f0f8f4]">
      <header className="border-b border-[#a8ffce]/10 bg-[#030912] py-5">
        <Container className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/port443-v2/logo-shield-white.svg" alt="Port443" width={36} height={36} className="size-9" />
            <div className="leading-none">
              <div className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">Port443</div>
              <div className="font-mono text-[8px] tracking-[0.12em] text-[#a8ffce]/60">&lt; AUTOMATING CYBER DEFENSE &gt;</div>
            </div>
          </Link>
          <Link href="/request-a-demo" className="border border-[#a8ffce] bg-[#a8ffce] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#030912] transition hover:bg-white hover:border-white">
            Request a demo
          </Link>
        </Container>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className="border-b border-[#a8ffce]/10 bg-[#061321] py-20 md:py-28">
          <Container>
            <div className="max-w-3xl">
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">About</span>
              <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight text-white md:text-7xl">
                Built for<br />
                <span className="text-[#a8ffce]">enterprise teams</span><br />
                that cannot wait.
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/60">
                Port443 specialises in cyber security software development,
                automation and integration for enterprise customers across the
                Middle East and Africa. We augment security engineering teams
                with automations, dashboards, and compliance services.
              </p>
            </div>
          </Container>
        </section>

        {/* Image + story */}
        <section className="border-b border-[#a8ffce]/10 bg-[#030912]">
          <Container className="py-6">
            <div className="grid overflow-hidden border border-[#a8ffce]/10 lg:grid-cols-[1fr_.9fr]">
              <div className="relative min-h-[400px]">
                <Image
                  src="/port443-v2/about-1.jpg"
                  alt="Port443 enterprise operations"
                  fill
                  sizes="(min-width: 1024px) 56vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#030912]/50" />
              </div>
              <div className="flex flex-col justify-center px-8 py-14 md:px-12">
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">Our stance</span>
                <h2 className="mt-4 font-display text-3xl font-extrabold text-white md:text-4xl">
                  Security automation is not a luxury. It is an operational necessity.
                </h2>
                <p className="mt-5 leading-7 text-white/58">
                  Threats don&apos;t wait for manual workflows to catch up.
                  Port443 was founded on the principle that the controls an
                  organisation has deployed should work together — not in
                  isolation — and that the data they produce should be
                  authoritative, not reinterpreted.
                </p>
                <p className="mt-4 leading-7 text-white/45">
                  We operate across the Middle East and Africa with enterprise
                  customers who face real, sophisticated, persistent threats.
                  Our services are built for that reality.
                </p>
              </div>
            </div>
          </Container>
        </section>

        {/* Values */}
        <section className="border-b border-[#a8ffce]/10 bg-[#061321] py-20 md:py-24">
          <Container>
            <h2 className="mb-12 font-display text-4xl font-extrabold text-white">How we work.</h2>
            <div className="grid gap-px bg-[#a8ffce]/10 md:grid-cols-2 lg:grid-cols-3">
              {[
                { title: "API-first", body: "We integrate directly with source technologies. Data is authoritative because it comes from the system of record — not from a manual export or a third-party summary." },
                { title: "Evidence-backed", body: "Every control attestation is traceable. Governance boards and audit committees receive objective data, not interpretations that optimise optics." },
                { title: "Automation over administration", body: "Analyst time is valuable. We build automation that eliminates the administrative overhead around high-frequency SOC activities so teams can focus on what changes risk." },
                { title: "Managed operations", body: "We operate what we build. Every custom automation and every OneView dashboard is supported, monitored, and refined as part of the managed service." },
                { title: "Regional depth", body: "Operating across the Middle East and Africa requires local context, regulatory awareness, and established relationships. Port443 brings all three." },
                { title: "Framework alignment", body: "Every service is designed with ISO 27001, NIST CSF, PCI-DSS, and CIS in mind. Governance is not a bolt-on — it is built into the architecture." },
              ].map((v) => (
                <div key={v.title} className="flex flex-col gap-3 bg-[#061321] p-8 transition hover:bg-[#0a1e2e]">
                  <div className="size-1.5 rounded-full bg-[#a8ffce]" />
                  <h3 className="font-display text-xl font-bold text-white">{v.title}</h3>
                  <p className="text-sm leading-6 text-white/50">{v.body}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        {/* Press */}
        <section className="bg-[#030912] py-20">
          <Container>
            <h2 className="mb-8 font-display text-3xl font-extrabold text-white">Coverage.</h2>
            <div className="flex flex-col gap-0">
              {[
                { date: "May 2023", title: "Iziko, backed by RMB Ventures, invest in Port443", href: "https://techfinancials.co.za/2023/05/15/iziko-backed-by-rmb-ventures-invest-in-port443-pty-ltd/" },
                { date: "May 2023", title: "Five things boards need to know about Incident Response", href: "https://ventureburn.com/2023/05/five-things-boards-need-to-know-about-incident-response-ir/" },
              ].map((item) => (
                <a key={item.title} href={item.href} target="_blank" rel="noreferrer"
                  className="group flex items-center gap-5 border-b border-[#a8ffce]/10 py-6 transition hover:bg-[#061321] hover:px-4">
                  <span className="font-mono text-xs text-white/30 flex-shrink-0">{item.date}</span>
                  <span className="flex-1 font-semibold text-white group-hover:text-[#a8ffce] transition-colors">{item.title}</span>
                  <ArrowRight className="size-4 text-[#a8ffce]/40 group-hover:text-[#a8ffce] flex-shrink-0 transition" />
                </a>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <footer className="border-t border-[#a8ffce]/10 bg-[#030912] py-8">
        <Container className="flex flex-col gap-2 text-center md:flex-row md:justify-between">
          <span className="font-mono text-[10px] text-white/25">© {new Date().getFullYear()} Port443 (Pty) Ltd</span>
          <Link href="/" className="font-mono text-[10px] text-white/25 hover:text-white/50">← Back to home</Link>
        </Container>
      </footer>
    </div>
  )
}
