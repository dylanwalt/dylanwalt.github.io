import Link from "next/link"
import { ArrowRight, Bot, Eye, Layers3, ShieldCheck } from "lucide-react"

import { Container } from "@/components/site/container"
import { SiteFooter, SiteNav } from "@/components/v3/chrome"

export const metadata = {
  title: "Services — Port443",
  description:
    "Control Attestation, OneView, Custom Automation, and Consulting. The four services Port443 delivers, against one operating model.",
}

const services = [
  {
    code: "01",
    title: "Control Attestation",
    sub: "Continuous validation, no manual compilation.",
    body:
      "Automated validation against vendor best practice and frameworks including PCI-DSS, NIST CSF, ISO 27001, and CIS. Evidence-backed attestation extracted directly via API — no spreadsheets, no optimistic reporting.",
    icon: ShieldCheck,
    capabilities: [
      "PCI-DSS 4.0 aligned",
      "NIST CSF 2.0 aligned",
      "ISO 27001:2022 aligned",
      "CIS v8 aligned",
    ],
  },
  {
    code: "02",
    title: "OneView",
    sub: "Single source of truth, independent and live.",
    body:
      "An independent, governance-grade dashboard that pulls directly from source technologies via API. Consolidates prioritised alerts and trends posture against the frameworks you already report against.",
    icon: Eye,
    capabilities: [
      "RAG posture score",
      "MTTD trend",
      "MTTR trend",
      "Board-ready reporting",
    ],
  },
  {
    code: "03",
    title: "Custom Automation",
    sub: "Identify → Scope → Build → Operate.",
    body:
      "SOC automation delivered as SaaS. We identify the manual workflow to automate, scope the integration points, build against your existing toolset, and operate it as a managed service.",
    icon: Bot,
    capabilities: [
      "Use-case design",
      "API integration",
      "SaaS operation",
      "SOC optimisation",
    ],
  },
  {
    code: "04",
    title: "Consulting",
    sub: "Exposure assessment and automation roadmap.",
    body:
      "We assess your current exposure, identify the highest-value candidates for automation, and build a practical mitigation roadmap aligned to your risk register.",
    icon: Layers3,
    capabilities: [
      "Risk assessment",
      "Automation roadmap",
      "Gap analysis",
      "CISO advisory",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav floating={false} />
      <main className="flex-1">
        <section className="py-20 lg:py-28 border-b border-[var(--ink-3)]">
          <Container>
            <span className="inline-flex items-center gap-2 mono text-[11px] tracking-[0.22em] uppercase text-[var(--muted-on-ink)]">
              <span className="h-px w-7 bg-[var(--blue)]" />
              Services
            </span>
            <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.025em] max-w-4xl">
              Four services. One{" "}
              <span className="text-[var(--blue)]">operating model.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-[1.55] text-[var(--muted-on-ink)]">
              Every engagement follows the same lifecycle: Identify → Scope →
              Build → Operate. The scope changes; the discipline doesn't.
            </p>
          </Container>
        </section>
        <section className="border-b border-[var(--ink-3)]">
          <Container className="grid gap-px bg-[var(--ink-3)]">
            {services.map((s, i) => {
              const Icon = s.icon
              return (
                <div
                  key={s.code}
                  className="bg-[var(--ink)] py-16 lg:py-20 grid lg:grid-cols-12 gap-10"
                >
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-3 mono text-[11px] tracking-[0.2em] text-[var(--blue)]">
                      <Icon className="h-4 w-4" />
                      {s.code} · {s.title.toUpperCase()}
                    </div>
                    <h2 className="mt-5 text-[clamp(1.75rem,3.5vw,2.75rem)] font-semibold tracking-[-0.025em] leading-[1.05]">
                      {s.title}.
                    </h2>
                    <p className="mt-3 text-[16px] text-[var(--muted-on-ink)]">
                      {s.sub}
                    </p>
                  </div>
                  <div className="lg:col-span-7">
                    <p className="text-[15.5px] leading-[1.6] text-[var(--ivory)]">
                      {s.body}
                    </p>
                    <div className="mt-8 grid grid-cols-2 gap-px bg-[var(--ink-3)]">
                      {s.capabilities.map((c) => (
                        <div
                          key={c}
                          className="bg-[var(--ink)] px-4 py-4 text-[12.5px] mono text-[var(--muted-on-ink)]"
                        >
                          {c}
                        </div>
                      ))}
                    </div>
                    <div className="mt-8">
                      <Link
                        href="/request-a-demo/"
                        className="inline-flex items-center gap-2 text-[14px] font-medium text-[var(--ivory)] hover:text-[var(--blue)] transition-colors"
                      >
                        Talk to us about {s.title}
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                  {i < services.length - 1 ? null : null}
                </div>
              )
            })}
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
