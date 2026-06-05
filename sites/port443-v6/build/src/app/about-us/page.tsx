import { ArrowRight } from "lucide-react"

import { Container } from "@/components/site/container"
import { SiteFooter, SiteNav } from "@/components/v4/chrome"

export const metadata = {
  title: "About — Port443 V6",
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
              Engineers building{" "}
              <span className="text-[var(--green)]">security evidence systems.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-[17px] leading-[1.55] text-[var(--muted-on-ink)]">
              Port443 was built by security engineers who got tired of compiling
              evidence by spreadsheet and reading optimistic reports off
              dashboards that did not talk to anything. We build the operating
              system we wanted: continuous attestation, a single posture view,
              and SOC automation delivered as SaaS.
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
                  title: "API first",
                  body: "Evidence is extracted from source systems directly. If it can be integrated, it can be attested.",
                },
                {
                  code: "03",
                  title: "Proof over promises",
                  body: "Every workflow is designed to produce evidence, reduce manual effort, and hold up under audit pressure.",
                },
              ].map((item) => (
                <div key={item.code} className="bg-[var(--ink-2)] p-7">
                  <div className="mono text-[11px] tracking-[0.2em] text-[var(--green)]">
                    {item.code}
                  </div>
                  <h2 className="mt-5 text-[24px] font-semibold tracking-[-0.02em]">
                    {item.title}
                  </h2>
                  <p className="mt-3 text-[14px] leading-[1.65] text-[var(--muted-on-ink)]">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>

        <section className="py-20 lg:py-24">
          <Container className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10">
            <div>
              <div className="mono text-[11px] tracking-[0.22em] uppercase text-[var(--green)]">
                Operating model
              </div>
              <h2 className="mt-5 text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
                Observe. Remediate. Validate.
              </h2>
              <p className="mt-5 max-w-xl text-[16px] leading-[1.65] text-[var(--muted-on-ink)]">
                Port443 is designed around a control loop, not a dashboard. We
                observe posture, route the right remediation path, and validate
                the result with machine-readable evidence.
              </p>
              <a
                href="mailto:info@port443.co.za?subject=Request%20a%20demo"
                className="mt-8 inline-flex items-center gap-2 bg-[var(--green)] px-4 py-2 text-[13px] font-medium tracking-tight text-[var(--ivory-2)] rounded-[2px] hover:opacity-90 transition-opacity"
              >
                Request a demo
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
            <div className="grid gap-px bg-[var(--ivory-3)]">
              {[
                [
                  "Control attestation",
                  "Continuous validation against frameworks and vendor best practice.",
                ],
                [
                  "OneView posture",
                  "Independent visibility that shows drift, evidence, and governance posture in one frame.",
                ],
                [
                  "Custom automation",
                  "Security workflows implemented around the way each client actually operates.",
                ],
                [
                  "Consulting",
                  "Assessment, governance, and policy definition anchored in operational delivery.",
                ],
              ].map(([title, body]) => (
                <div key={title} className="bg-[var(--ivory)] p-6">
                  <h3 className="text-[20px] font-semibold tracking-[-0.02em] text-[var(--ink)]">
                    {title}
                  </h3>
                  <p className="mt-3 max-w-xl text-[14px] leading-[1.65] text-[var(--muted-on-ivory)]">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
