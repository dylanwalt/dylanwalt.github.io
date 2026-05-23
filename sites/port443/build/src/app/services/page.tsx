import type { Metadata } from "next"
import Link from "next/link"
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react"

import { InteriorHero } from "@/components/port443/interior-hero"
import { Container } from "@/components/site/container"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export const metadata: Metadata = {
  title: "Services | Port443",
  description:
    "Cyber security automations and integrations: Control Attestation, OneView, Custom Automation, and Consulting.",
}

const frameworks = [
  {
    title: "Regulatory Frameworks",
    description:
      "Regulatory-driven compliance of security control configurations (e.g. PCI, GDPR, POPIA).",
  },
  {
    title: "Industry Frameworks",
    description:
      "Validate against industry frameworks such as NIST, MITRE ATT&CK, and ISO27001.",
  },
  {
    title: "Vendor Best Practice",
    description:
      "Use vendor best-practice configuration guidance to maintain hardening over time.",
  },
]

const keyPoints = [
  "Attack vectors enable threat actors to exploit system vulnerabilities.",
  "Controls operating in isolation are less effective than controls operating in unison.",
  "Port443 integrates via API across multiple technologies and controls.",
  "State-aware controls can trigger containment and reduce lateral movement risk.",
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        <InteriorHero
          eyebrow="Services"
          title="Cyber security automations that move as one system."
          description="Port443 makes hardening continuous: validate controls, coordinate security technologies, and keep visibility close to the operational decisions that reduce exposure."
          imageSrc="/port443/hero-bg.jpg"
          primaryAction={{ href: "/request-a-demo", label: "Request a demo" }}
          secondaryAction={{ href: "/about-us", label: "About Port443" }}
          signals={[
            {
              label: "Validate",
              detail: "Framework and vendor best-practice checks surface control drift.",
            },
            {
              label: "Visualise",
              detail: "OneView correlates security, cloud, and network information.",
            },
            {
              label: "Contain",
              detail: "API-first controls respond together instead of in isolation.",
            },
          ]}
        />

        <section className="border-b border-border bg-background">
          <Container className="py-14 md:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-accent">
                Control Attestation
              </p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Automated validations against frameworks and best practices
              </h2>
              <p className="mt-4 text-muted-foreground">
                Many organisations invest heavily in controls that drift over time.
                Weekly validations help detect policy changes that can introduce
                vulnerabilities and provide remediation guidance.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {frameworks.map((framework) => (
                <div
                  key={framework.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
                      <ShieldCheck className="size-5" aria-hidden />
                    </div>
                    <div className="font-semibold">{framework.title}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {framework.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="border-b border-border bg-muted/30">
          <Container className="py-14 md:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-center">
              <div className="lg:col-span-5">
                <p className="text-sm font-semibold text-accent">OneView</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                  Integration and visualisation across the estate
                </h2>
                <p className="mt-4 text-muted-foreground">
                  Dashboards provide insight into threat vectors and metrics as an
                  affordable, consumption-based service to improve control and
                  overall posture.
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
                      <Sparkles className="size-5" aria-hidden />
                    </div>
                    <div className="text-lg font-semibold">Single-pane visibility</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Correlate critical information across security, cloud, and
                    network controls and use it to drive prioritisation.
                  </p>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b border-border bg-background">
          <Container className="py-14 md:py-20">
            <p className="text-sm font-semibold text-accent">Custom Automation</p>
            <h2 className="mt-2 max-w-3xl text-3xl font-semibold tracking-tight md:text-4xl">
              Purpose-built SOC automation — delivered end-to-end as SaaS
            </h2>
            <p className="mt-4 max-w-3xl text-muted-foreground">
              Designed to eliminate manual effort from high-frequency analyst tasks. Every
              automation engagement follows a structured lifecycle — from identifying the right
              use case through to ongoing managed operation — so your team can focus on proactive
              threat hunting and higher-value investigation work.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                <div className="text-lg font-semibold">Engagement lifecycle</div>
                <ol className="mt-4 space-y-4 text-sm text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-foreground">
                      01
                    </span>
                    <span><span className="font-semibold text-foreground">Identify.</span> Define the SOC workflow or use case targeted for automation and quantify the manual effort reduction opportunity.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-foreground">
                      02
                    </span>
                    <span><span className="font-semibold text-foreground">Scope.</span> Map integration points, data sources, control dependencies, and the boundaries of the automation.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-foreground">
                      03
                    </span>
                    <span><span className="font-semibold text-foreground">Build.</span> Develop, test, and validate the automation against your existing toolset and environment using API-first integrations.</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-0.5 inline-flex size-6 items-center justify-center rounded-full bg-muted font-mono text-xs font-semibold text-foreground">
                      04
                    </span>
                    <span><span className="font-semibold text-foreground">Operate.</span> Run the automation as a managed SaaS service with ongoing monitoring, support, and continuous refinement.</span>
                  </li>
                </ol>
              </div>

              <div className="rounded-2xl border border-border bg-card p-6 shadow-sm md:p-8">
                <div className="text-lg font-semibold">Key points</div>
                <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                  {keyPoints.map((keyPoint) => (
                    <li key={keyPoint} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 size-4 text-accent" aria-hidden />
                      <span>{keyPoint}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>

        <section className="bg-muted/30">
          <Container className="py-14 md:py-20">
            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm md:p-10">
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Ready to get started?
              </h2>
              <p className="mt-3 max-w-3xl text-muted-foreground">
                Port443 has extensive experience identifying candidates for
                automation and building these automations so they can be consumed
                as a service.
              </p>
              <div className="mt-6">
                <Link
                  href="/request-a-demo"
                  className="inline-flex h-10 items-center justify-center rounded-lg bg-accent px-4 text-sm font-semibold text-accent-foreground shadow-sm transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Get started now
                </Link>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
