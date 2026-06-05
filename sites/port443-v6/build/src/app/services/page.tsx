import { ArrowRight, Bot, Eye, Layers3, ShieldCheck } from "lucide-react"

import { Container } from "@/components/site/container"
import { SiteFooter, SiteNav } from "@/components/v4/chrome"

export const metadata = {
  title: "Services — Port443 V6",
  description:
    "Control Attestation, OneView, Custom Automation, and Consulting. The four capabilities Port443 delivers against one operating model.",
}

const services = [
  {
    code: "01",
    title: "Control Attestation",
    sub: "Continuous validation, no manual compilation.",
    body:
      "Automated validation against vendor best practice and frameworks including PCI-DSS, NIST CSF, and CIS. Evidence-backed attestation extracted directly via API — no spreadsheets, no optimistic reporting.",
    icon: ShieldCheck,
    capabilities: [
      "PCI-DSS 4.0 aligned",
      "NIST CSF 2.0 aligned",
      "CIS v8 aligned",
      "Vendor best-practice aligned",
    ],
  },
  {
    code: "02",
    title: "OneView",
    sub: "Read posture in context.",
    body:
      "An independent, governance-grade dashboard that pulls directly from source technologies via API. It keeps alerts, drift, and evidence in a single frame so the next action is obvious.",
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
    sub: "Security workflows that actually ship.",
    body:
      "We design and implement bespoke automations across the SOC and governance stack, removing repetitive analyst work and tightening response paths.",
    icon: Bot,
    capabilities: [
      "API-first integrations",
      "Detection workflow design",
      "Remediation workflow design",
      "Evidence capture by default",
    ],
  },
  {
    code: "04",
    title: "Consulting",
    sub: "Roadmaps anchored in operating reality.",
    body:
      "Security assessments, governance design, information security policy definition, and incident response policy development — grounded in how the controls will actually be run.",
    icon: Layers3,
    capabilities: [
      "Gap assessments",
      "Governance operating model",
      "Information security policy development",
      "Incident response policy development",
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav floating={false} />
      <main className="flex-1">
        <section className="border-b border-[var(--ink-3)] py-24 lg:py-32">
          <Container>
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 mono text-[11px] tracking-[0.22em] uppercase text-[var(--muted-on-ink)]">
                <span className="h-px w-7 bg-[var(--green)]" />
                Core services
              </span>
              <h1 className="mt-6 text-[clamp(2.6rem,6vw,4.8rem)] font-semibold leading-[0.96] tracking-[-0.03em]">
                Four capabilities, one operating model.
              </h1>
              <p className="mt-7 text-[17px] leading-[1.6] text-[var(--muted-on-ink)]">
                Port443 combines control attestation, OneView posture,
                automation, and consulting into one evidence-led security system.
              </p>
            </div>
          </Container>
        </section>

        <section className="py-16 lg:py-20">
          <Container className="grid gap-px bg-[var(--ink-3)]">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <article
                  key={service.code}
                  className="grid gap-8 bg-[var(--ink)] p-8 lg:grid-cols-[0.9fr_1.1fr]"
                >
                  <div>
                    <div className="mono text-[11px] tracking-[0.22em] text-[var(--green)]">
                      {service.code}
                    </div>
                    <div className="mt-5 flex items-center gap-3">
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ink-3)] bg-[var(--ink-2)] text-[var(--green)]">
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <h2 className="text-[28px] font-semibold tracking-[-0.025em]">
                          {service.title}
                        </h2>
                        <p className="mt-1 text-[14px] text-[var(--muted-on-ink)]">
                          {service.sub}
                        </p>
                      </div>
                    </div>
                    <p className="mt-6 max-w-xl text-[15px] leading-[1.7] text-[var(--muted-on-ink)]">
                      {service.body}
                    </p>
                    <a
                      href="mailto:info@port443.co.za?subject=Request%20a%20demo"
                      className="mt-7 inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-[var(--ivory)] hover:text-[var(--green)]"
                    >
                      Request a demo
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {service.capabilities.map((capability) => (
                      <div
                        key={capability}
                        className="rounded-[22px] border border-[var(--ink-3)] bg-[var(--ink-2)] p-5 text-[14px] leading-[1.55] text-[var(--ivory)]"
                      >
                        {capability}
                      </div>
                    ))}
                  </div>
                </article>
              )
            })}
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
