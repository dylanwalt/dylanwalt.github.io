import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/site/container"
import { SiteFooter, SiteNav } from "@/components/v4/chrome"

export const metadata = {
  title: "About — Port443",
  description:
    "Port443 builds and operates cyber-defence automation for enterprises across the Middle East and Africa.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav floating={false} />
      <main className="flex-1">
        <section className="py-24 lg:py-32 border-b border-[var(--ink-3)]">
          <Container>
            <span className="inline-flex items-center gap-2 mono text-[11px] tracking-[0.22em] uppercase text-[var(--muted-on-ink)]">
              <span className="h-px w-7 bg-[var(--green)]" />
              About Port443
            </span>
            <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.025em] max-w-4xl">
              Engineers who happen to do{" "}
              <span className="text-[var(--green)]">cyber security.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-[1.55] text-[var(--muted-on-ink)]">
              Port443 was built by security engineers who got tired of compiling
              evidence by spreadsheet and reading optimistic reports off
              dashboards that didn't talk to anything. We build the operating
              system we wanted: continuous attestation, one independent posture
              view, and SOC automation delivered as SaaS.
            </p>
            <div className="mt-12 grid md:grid-cols-3 gap-px bg-[var(--ink-3)]">
              {[
                {
                  code: "01",
                  title: "Built in MEA",
                  body: "Engineered and operated across the Middle East and Africa. Regional context shapes the product, not the marketing.",
                },
                {
                  code: "02",
                  title: "API-first",
                  body: "We integrate against the security estate you already have. We never replace what's already working.",
                },
                {
                  code: "03",
                  title: "Evidence-honest",
                  body: "When something is partial, we say partial. When something is automated, we show the evidence chain.",
                },
              ].map((card) => (
                <div key={card.code} className="bg-[var(--ink)] p-7 lg:p-8 min-h-[220px]">
                  <div className="mono text-[11px] tracking-[0.2em] text-[var(--green)]">
                    {card.code}
                  </div>
                  <h2 className="mt-4 text-[20px] font-semibold tracking-[-0.02em]">
                    {card.title}
                  </h2>
                  <p className="mt-3 text-[13.5px] leading-[1.55] text-[var(--muted-on-ink)]">
                    {card.body}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-12">
              <Link
                href="/request-a-demo/"
                className="inline-flex items-center gap-2 bg-[var(--green)] text-[var(--ivory-2)] px-6 py-3 text-[14.5px] font-medium tracking-tight hover:opacity-90 transition-opacity rounded-[2px]"
              >
                Request a demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
