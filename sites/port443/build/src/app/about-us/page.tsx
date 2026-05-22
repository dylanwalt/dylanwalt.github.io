import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import {
  Eye,
  Layers,
  Lightbulb,
  ShieldCheck,
  Timer,
  Workflow,
} from "lucide-react"

import { InteriorHero } from "@/components/port443/interior-hero"
import { Container } from "@/components/site/container"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export const metadata: Metadata = {
  title: "About Us | Port443",
  description:
    "We believe security should be readily accessible, affordable, and ahead of the ever-evolving threat landscape.",
}

const benefits = [
  {
    title: "Integrations",
    description:
      "Inherent integrations across multiple controls and mainstream security technologies.",
    icon: Workflow,
  },
  {
    title: "Cost Savings",
    description:
      'Automation and orchestration reduce manual effort and avoid operational "finger trouble".',
    icon: Layers,
  },
  {
    title: "Increased Proactivity",
    description:
      "Compliance validations against best practices improve proactive remediation and response.",
    icon: Timer,
  },
  {
    title: "Focused Vulnerabilities",
    description:
      "Prioritize critical remediation work so engineers focus first on what matters most.",
    icon: ShieldCheck,
  },
  {
    title: "ITSM and CRMs",
    description: "Integrate into ITSM and CRM platforms to streamline execution.",
    icon: Lightbulb,
  },
  {
    title: "Visibility",
    description: "Visibility of maturity across multiple technologies and controls.",
    icon: Eye,
  },
]

export default function AboutUsPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        <InteriorHero
          eyebrow="About Port443"
          title="Security should stay ahead of the threat path."
          description="Port443 augments security engineering teams with integrations, automations, dashboards, and automated compliance services built around the technologies clients already use."
          imageSrc="/port443/about-1.jpg"
          primaryAction={{ href: "/services", label: "Explore services" }}
          secondaryAction={{ href: "/request-a-demo", label: "Request a demo" }}
          signals={[
            {
              label: "Accessible security",
              detail: "Managed and consumptive services make control improvement practical.",
            },
            {
              label: "Automation depth",
              detail: "API integrations reduce drift across controls, vendors, and workflows.",
            },
            {
              label: "No set-and-forget",
              detail: "OneView turns operational visibility into focused remediation.",
            },
          ]}
        />

        <section className="border-b border-border bg-[#eef4ea]">
          <Container className="grid gap-6 py-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,.82fr)] lg:items-stretch">
            <div className="grid gap-4 bg-background p-6 shadow-sm md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                Security engineering support
              </p>
              <p className="text-lg leading-8 text-muted-foreground">
                We specialise in the integration and development of automations
                across multiple security controls and vendors, based on the
                technologies clients have already invested in.
              </p>
              <p className="text-lg leading-8 text-muted-foreground">
                Efficiency, speed, and visibility improve when teams move from
                manual handoffs to dashboards, compliance services, and repeatable
                automation.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative min-h-72 overflow-hidden border border-border bg-background shadow-sm">
                <Image
                  src="/port443/about-2.jpg"
                  alt="Port443 team and operations"
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-72 overflow-hidden border border-border bg-background shadow-sm">
                <Image
                  src="/port443/about-1.jpg"
                  alt="Port443 cybersecurity operations"
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </section>

        <section className="border-b border-border bg-background">
          <Container className="py-14 md:py-20">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-accent">Benefits</p>
              <h2 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
                Benefits of the Port443 platform
              </h2>
              <p className="mt-4 text-muted-foreground">
                Integrations and automation that help teams move from manual
                workflows to consistent, measurable outcomes.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="rounded-2xl border border-border bg-card p-6 shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-10 place-items-center rounded-xl bg-muted text-foreground">
                      <benefit.icon className="size-5" aria-hidden />
                    </div>
                    <div className="font-semibold">{benefit.title}</div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              ))}
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
