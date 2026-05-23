import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bot, CheckCircle2, Eye, Layers3, ShieldCheck } from "lucide-react"

import { Container } from "@/components/site/container"

export const metadata: Metadata = {
  title: "Services | Port443 — Automating Cyber Defense",
  description:
    "Control Attestation, OneView, Custom Automation, and Consulting — cyber security services that validate, visualise, and automate across the MEA estate.",
}

const services = [
  {
    code: "01",
    title: "Control Attestation",
    tagline: "Continuous, evidence-backed control validation",
    icon: ShieldCheck,
    description:
      "Automated validation against vendor best practice and regulatory/industry frameworks. Detects policy drift, misconfigurations, and compliance gaps — continuously, not on a quarterly spreadsheet cycle.",
    frameworks: [
      { name: "PCI-DSS 4.0", detail: "Regulatory-driven compliance of security control configurations" },
      { name: "NIST CSF 2.0", detail: "Industry framework validation for risk-based governance" },
      { name: "ISO 27001:2022", detail: "Vendor best-practice configuration and Annex A alignment" },
      { name: "CIS v8", detail: "Center for Internet Security critical security controls" },
    ],
  },
  {
    code: "02",
    title: "OneView",
    tagline: "Independent single source of truth — live, not historical",
    icon: Eye,
    description:
      "Data extracted via API directly from source technologies — no manual intervention, no reinterpretation. OneView eliminates manual reporting, delivers real-time alert consolidation, and trends your overall cyber security posture score with an intuitive RAG indicator.",
    frameworks: [
      { name: "Governance alignment", detail: "ISO/IEC 27001:2022 Annex A 5.35, NIST CSF, CIS CSC" },
      { name: "MTTD/MTTR reduction", detail: "Prioritised, correlated alerts replace siloed tool switching" },
      { name: "Posture score trending", detail: "RAG indicator for the Risk Register and Risk Committee" },
      { name: "Manual effort elimination", detail: "Automated pull, aggregation, and formatting of critical metrics" },
    ],
  },
  {
    code: "03",
    title: "Custom Automation",
    tagline: "End-to-end SOC automation — Identify → Scope → Build → Operate",
    icon: Bot,
    description:
      "Purpose-built automation delivered as SaaS. Designed to eliminate manual effort from high-frequency SOC activities. Every engagement follows a proven lifecycle.",
    frameworks: [
      { name: "01 — Identify", detail: "Define the use case and the SOC workflow targeted for automation" },
      { name: "02 — Scope", detail: "Map integration points, data sources, and boundaries" },
      { name: "03 — Build", detail: "Develop and test automation against your existing toolset" },
      { name: "04 — Operate", detail: "Run as a managed SaaS service with ongoing support" },
    ],
  },
  {
    code: "04",
    title: "Consulting",
    tagline: "Exposure assessment and practical automation roadmap",
    icon: Layers3,
    description:
      "Assess current exposure, identify the highest-value automation candidates, and build a practical mitigation roadmap aligned to your risk register. Port443 bridges the gap between security engineering and executive risk governance.",
    frameworks: [
      { name: "Risk assessment", detail: "Identify exposure across control estate and security tooling" },
      { name: "Automation roadmap", detail: "Prioritised candidates for automation based on ROI and risk" },
      { name: "Gap analysis", detail: "Framework and vendor best-practice gap identification" },
      { name: "CISO advisory", detail: "Board-ready risk communication and governance input" },
    ],
  },
]

export default function ServicesPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#030912] text-[#f0f8f4]">
      {/* Nav */}
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
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">Services</span>
              <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight text-white md:text-7xl">
                Security posture —<br />
                <span className="text-[#a8ffce]">made actionable.</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/60">
                Four integrated services that reduce manual effort, strengthen
                governance, and enable faster containment. All delivered as
                API-first managed services across the MEA estate.
              </p>
            </div>
          </Container>
        </section>

        {/* Service Sections */}
        {services.map((service, i) => {
          const Icon = service.icon
          const isDark = i % 2 === 0
          return (
            <section key={service.code} className={`border-b border-[#a8ffce]/10 py-20 md:py-24 ${isDark ? "bg-[#030912]" : "bg-[#061321]"}`}>
              <Container>
                <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <div className="flex size-10 items-center justify-center border border-[#a8ffce]/20 bg-[#a8ffce]/5">
                        <Icon className="size-5 text-[#a8ffce]" />
                      </div>
                      <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#a8ffce]">{service.code}</span>
                    </div>
                    <h2 className="font-display text-4xl font-extrabold text-white md:text-5xl">{service.title}</h2>
                    <p className="mt-2 font-mono text-xs tracking-[0.1em] text-[#a8ffce]/50">{service.tagline}</p>
                    <p className="mt-6 leading-7 text-white/60">{service.description}</p>
                    <Link
                      href="/request-a-demo"
                      className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#a8ffce] transition hover:text-white"
                    >
                      Request a demo for this service <ArrowRight className="size-3.5" />
                    </Link>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/25 mb-1">Capabilities</span>
                    {service.frameworks.map((fw) => (
                      <div key={fw.name} className="flex gap-4 border border-[#a8ffce]/10 bg-[#a8ffce]/3 p-4 transition hover:border-[#a8ffce]/25">
                        <CheckCircle2 className="mt-0.5 size-4 flex-shrink-0 text-[#a8ffce]" />
                        <div>
                          <div className="font-semibold text-white text-sm">{fw.name}</div>
                          <div className="mt-0.5 text-xs leading-5 text-white/45">{fw.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Container>
            </section>
          )
        })}

        {/* CTA */}
        <section className="bg-[#030912] py-20">
          <Container>
            <div className="border border-[#a8ffce]/15 bg-[#061321] p-8 md:p-12 text-center">
              <h2 className="font-display text-4xl font-extrabold text-white">Ready to automate your defense?</h2>
              <p className="mt-4 max-w-xl mx-auto text-white/55 leading-7">
                Port443 has extensive experience identifying automation candidates and building them as managed SaaS services.
              </p>
              <Link
                href="/request-a-demo"
                className="mt-8 inline-flex items-center gap-2.5 bg-[#a8ffce] px-7 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-[#030912] transition hover:bg-white"
              >
                Get started today <ArrowRight className="size-4" />
              </Link>
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
