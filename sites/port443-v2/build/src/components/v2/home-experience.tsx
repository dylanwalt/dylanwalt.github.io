"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import {
  ArrowRight,
  Bot,
  ChevronDown,
  ExternalLink,
  Eye,
  Layers3,
  ShieldCheck,
} from "lucide-react"
import {
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"

import { Container } from "@/components/site/container"

/* ─── Brand Data ───────────────────────────────────────── */

const telemetryLines = [
  "[SYS]  Control attestation — PASS     PCI-DSS 4.0",
  "[NET]  Firewall policy drift — NONE   CIS L2",
  "[EDR]  Threat signal received         IOC:hash-a3f2",
  "[SIEM] Alert correlated — severity 3  MTTD: 0.4s",
  "[AUTO] Containment triggered          endpoint-44a",
  "[API]  OneView sync complete          17 controls",
  "[SOC]  Posture score: 94.2            +2.1 week",
  "[IAM]  Privileged access reviewed     NIST AC-6",
  "[VPN]  Lateral movement blocked       subnet-192",
  "[LOG]  Evidence chain sealed          ISO27001 A5",
  "[SYS]  Custom automation executed     use-case-07",
  "[NET]  BGP route anomaly              flagged: MEA",
  "[EDR]  Process injection — BLOCKED    endpoint-9c",
  "[SIEM] MTTR updated: 3.2 min          baseline: 41",
  "[API]  Vendor best-practice: aligned  CIS v8",
  "[SOC]  RAG status: GREEN              committee-rpt",
]

const services = [
  {
    code: "01",
    title: "Control Attestation",
    sub: "Continuous validation, zero manual compilation",
    description:
      "Automated validation against vendor best practice and frameworks including PCI-DSS, NIST CSF, ISO 27001, and CIS. Evidence-backed attestation extracted directly via API — no spreadsheets, no optimistic reporting.",
    icon: ShieldCheck,
    frameworks: ["PCI-DSS 4.0", "NIST CSF 2.0", "ISO 27001:2022", "CIS v8"],
  },
  {
    code: "02",
    title: "OneView",
    sub: "Single source of truth, independent and live",
    description:
      "An independent, governance-grade dashboard that pulls directly from source technologies via API. Eliminates manual reporting overhead, consolidates prioritized alerts, and trends your cyber security posture score with an intuitive RAG indicator — fully aligned with ISO/IEC 27001:2022 Annex A 5.35, NIST CSF, and CIS CSC.",
    icon: Eye,
    frameworks: ["RAG Posture Score", "MTTD Reduction", "MTTR Reduction", "Board Reporting"],
  },
  {
    code: "03",
    title: "Custom Automation",
    sub: "Identify → Scope → Build → Operate",
    description:
      "End-to-end SOC automation delivered as SaaS. Every engagement follows a proven lifecycle: identify the manual workflow to automate, scope the integration points, build against your existing toolset, and operate as a managed service. Frees analyst capacity for proactive threat hunting.",
    icon: Bot,
    frameworks: ["Use Case Design", "API Integration", "SaaS Operation", "SOC Optimisation"],
  },
  {
    code: "04",
    title: "Consulting",
    sub: "Exposure assessment and automation roadmap",
    description:
      "Assess your current exposure, identify the highest-value candidates for automation, and build a practical mitigation roadmap aligned to your risk register. Port443 has extensive experience bridging the gap between security engineering and executive risk governance.",
    icon: Layers3,
    frameworks: ["Risk Assessment", "Automation Roadmap", "Gap Analysis", "CISO Advisory"],
  },
]

const linkedInPosts = [
  {
    date: "May 2026",
    title: "OneView: Governance-grade visibility. No manual aggregation required.",
    excerpt:
      "API-first extraction directly from source technologies. Single source of truth aligned with ISO 27001:2022, NIST CSF, and CIS CSC.",
    href: "https://www.linkedin.com/company/port443-pty-ltd/posts/?feedView=all",
  },
  {
    date: "May 2023",
    title: "Five things boards need to know about Incident Response",
    excerpt:
      "Board-level IR essentials: what executives must understand before a breach occurs.",
    href: "https://ventureburn.com/2023/05/five-things-boards-need-to-know-about-incident-response-ir/",
  },
  {
    date: "May 2023",
    title: "Iziko, backed by RMB Ventures, invest in Port443",
    excerpt:
      "Strategic investment validates Port443's approach to automating cyber security across the MEA region.",
    href: "https://techfinancials.co.za/2023/05/15/iziko-backed-by-rmb-ventures-invest-in-port443-pty-ltd/",
  },
  {
    date: "Port443 Insight",
    title: "Introducing SOAR as a Service",
    excerpt:
      "How Port443 makes Security Orchestration, Automation, and Response accessible as a consumption-based managed service.",
    href: "https://www.port443.co.za/post/big-data-101-an-introduction-to-data-query-engines",
  },
]

/* ─── Root ────────────────────────────────────────────── */

export function HomeExperience() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip">
        <CinematicHero />
        <StatusRail />
        <ThreePillars />
        <ControlNarrative />
        <ServiceMatrix />
        <PostureProof />
        <RegionalPresence />
        <PlatformPortal />
        <InsightsFeed />
        <ContactStage />
        <SiteFooter />
      </div>
    </MotionConfig>
  )
}

/* ─── Navigation ──────────────────────────────────────── */

function HeroNav() {
  return (
    <div className="absolute inset-x-0 top-0 z-20">
      <Container className="flex items-center justify-between border-b border-[#a8ffce]/10 py-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Port443 home">
          <Image
            src="/port443-v2/logo-shield-white.svg"
            alt=""
            width={40}
            height={40}
            className="size-10 object-contain"
          />
          <div className="leading-none">
            <div className="font-display text-sm font-bold uppercase tracking-[0.22em] text-white">
              Port443
            </div>
            <div className="mt-0.5 font-mono text-[8px] tracking-[0.14em] text-[#a8ffce]">
              &lt; AUTOMATING CYBER DEFENSE &gt;
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          {[
            { label: "About", href: "/about-us" },
            { label: "Services", href: "/services" },
            { label: "Contact", href: "#contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-colors hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/request-a-demo"
          className="hidden items-center gap-2 border border-[#a8ffce] bg-[#a8ffce] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#030912] transition-all hover:bg-white hover:border-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8ffce] md:inline-flex"
        >
          Request a demo
          <ArrowRight className="size-3.5" />
        </Link>
      </Container>
    </div>
  )
}

/* ─── Cinematic Hero ──────────────────────────────────── */

function HeroFade({
  delay,
  children,
  className,
}: {
  delay: number
  children: React.ReactNode
  className?: string
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CinematicHero() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-[#030912]">
      {/* Backgrounds */}
      <div className="absolute inset-0 hex-grid opacity-60" />
      <div className="absolute inset-0 scan-lines" />
      <div className="absolute inset-y-0 right-0 w-[48%] opacity-[0.18] md:opacity-25">
        <Image
          src="/port443-v2/hero-bg.jpg"
          alt=""
          fill
          sizes="48vw"
          className="object-cover object-left"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#030912] via-[#030912]/60 to-transparent" />
      </div>

      <HeroNav />

      <div className="relative z-10 flex flex-1 items-center">
        <Container className="grid gap-12 py-28 md:py-36 lg:grid-cols-[1fr_480px] lg:items-center">
          {/* Left: Headline */}
          <div>
            {/* Live status */}
            <HeroFade delay={0.05}>
              <div className="mb-8 inline-flex items-center gap-2.5 border border-[#a8ffce]/20 bg-[#a8ffce]/5 px-3.5 py-1.5">
                <span className="relative flex size-2">
                  <span className="status-ping absolute inline-flex size-full rounded-full bg-[#22c55e] opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-[#22c55e]" />
                </span>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-[#a8ffce]">
                  Live — Active Monitoring
                </span>
              </div>
            </HeroFade>

            {/* H1 */}
            <HeroFade delay={0.15}>
              <h1 className="font-display text-6xl font-extrabold leading-[0.94] tracking-tight text-white sm:text-7xl md:text-8xl lg:text-9xl">
                <span className="block">Port</span>
                <span className="block text-glow text-[#a8ffce]">443</span>
              </h1>
            </HeroFade>

            <HeroFade delay={0.25}>
              <p className="mt-8 max-w-xl text-lg leading-8 text-white/65 md:text-xl">
                Automating cyber defense across the Middle East and Africa —
                validate controls, unify visibility, and trigger containment
                faster than any manual workflow allows.
              </p>
            </HeroFade>

            {/* CTAs */}
            <HeroFade delay={0.35} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/request-a-demo"
                className="inline-flex items-center justify-center gap-2.5 bg-[#a8ffce] px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-[#030912] transition-all hover:bg-white hover:shadow-[0_0_32px_rgba(168,255,206,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8ffce]"
              >
                Request a demo
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2.5 border border-white/20 px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm transition-all hover:border-[#a8ffce]/50 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8ffce]"
              >
                Explore services
              </Link>
            </HeroFade>

            {/* Scroll cue */}
            <HeroFade delay={0.48} className="mt-16 flex items-center gap-3">
              <ChevronDown className="size-4 text-[#a8ffce]/60 pulse-dot" />
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                Scroll to explore
              </span>
            </HeroFade>
          </div>

          {/* Right: Radar + Telemetry */}
          <motion.div
            initial={{ opacity: 0, x: reduceMotion ? 0 : 32 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
            className="hidden lg:block"
          >
            <RadarScene />
          </motion.div>
        </Container>
      </div>
    </section>
  )
}

/* ─── Radar Scene ─────────────────────────────────────── */

function RadarScene() {
  return (
    <div className="relative flex flex-col gap-4">
      {/* Radar */}
      <div className="relative mx-auto size-72">
        <svg viewBox="0 0 280 280" className="absolute inset-0 size-full" aria-hidden="true">
          {/* Concentric rings */}
          {[120, 90, 60, 30].map((r, i) => (
            <circle key={r} cx={140} cy={140} r={r} fill="none"
              stroke="rgba(168,255,206,0.10)" strokeWidth={1}
              opacity={1 - i * 0.15} />
          ))}
          {/* Cross-hairs */}
          <line x1={140} y1={20} x2={140} y2={260} stroke="rgba(168,255,206,0.06)" strokeWidth={1} />
          <line x1={20} y1={140} x2={260} y2={140} stroke="rgba(168,255,206,0.06)" strokeWidth={1} />

          {/* Rotating scan sweep */}
          <g className="radar-scan" style={{ transformOrigin: "140px 140px" }}>
            <path
              d="M140 140 L140 20 A120 120 0 0 1 255 175 Z"
              fill="url(#radarGrad)"
              opacity={0.35}
            />
          </g>

          {/* Pulse rings */}
          {[60, 90, 120].map((r, i) => (
            <circle key={`p${r}`} cx={140} cy={140} r={r} fill="none"
              stroke="rgba(168,255,206,0.18)" strokeWidth={1.5}
              className="pulse-ring"
              style={{ animationDelay: `${i * 0.8}s` }} />
          ))}

          {/* Threat blips */}
          {[
            { cx: 175, cy: 88, d: "0s"  },
            { cx: 98,  cy: 170, d: "0.6s" },
            { cx: 200, cy: 168, d: "1.2s" },
            { cx: 120, cy: 102, d: "1.9s" },
          ].map((b) => (
            <circle key={`${b.cx}${b.cy}`} cx={b.cx} cy={b.cy} r={3.5}
              fill="#a8ffce" className="pulse-dot"
              style={{ animationDelay: b.d }} />
          ))}

          {/* Center dot */}
          <circle cx={140} cy={140} r={4} fill="#a8ffce" />

          <defs>
            <radialGradient id="radarGrad" cx="100%" cy="0%" r="100%">
              <stop offset="0%"   stopColor="#a8ffce" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#a8ffce" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Radar label */}
        <div className="absolute bottom-0 left-0 right-0 text-center">
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-[#a8ffce]/50">
            Threat surface — MEA
          </span>
        </div>
      </div>

      {/* Telemetry Feed */}
      <TelemetryFeed />
    </div>
  )
}

/* ─── Telemetry Feed ──────────────────────────────────── */

function TelemetryFeed() {
  const doubled = [...telemetryLines, ...telemetryLines]

  return (
    <div className="relative h-40 overflow-hidden border border-[#a8ffce]/10 bg-[#030912]/80 backdrop-blur">
      <div className="absolute left-0 right-0 top-0 z-10 h-6 bg-gradient-to-b from-[#030912] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 z-10 h-6 bg-gradient-to-t from-[#030912] to-transparent" />
      <div className="px-4 py-2">
        <div className="flex items-center justify-between border-b border-[#a8ffce]/10 pb-1.5 mb-2">
          <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#a8ffce]/50">Telemetry feed</span>
          <span className="flex items-center gap-1.5">
            <span className="size-1.5 rounded-full bg-[#22c55e] pulse-dot" />
            <span className="font-mono text-[9px] text-[#22c55e]">LIVE</span>
          </span>
        </div>
        <div className="telemetry-track space-y-1.5">
          {doubled.map((line, i) => (
            <div key={i} className="font-mono text-[10px] text-[#a8ffce]/55 leading-4">
              {line}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ─── Status Rail ─────────────────────────────────────── */

function StatusRail() {
  const items = [
    "SYSTEM ACTIVE",
    "< AUTOMATING CYBER DEFENSE >",
    "MIDDLE EAST & AFRICA",
    "API-FIRST INTEGRATIONS",
    "CONTROL ATTESTATION LIVE",
    "ONEVIEW POSTURE TRACKING",
    "CUSTOM SOC AUTOMATION",
    "VUEITALL POWERED BY PORT443",
  ]
  const doubled = [...items, ...items]

  return (
    <div className="overflow-hidden border-y border-[#a8ffce]/15 bg-[#030912] py-3">
      <div className="ticker-track flex gap-12 whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a8ffce]/70">
            <span className="size-1.5 rounded-full bg-[#22c55e] flex-shrink-0 pulse-dot" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

/* ─── Three Pillars (animated counters) ──────────────── */

function ThreePillars() {
  return (
    <section className="bg-[#061321] py-20 md:py-28">
      <Container>
        <Reveal>
          <div className="mb-14 grid gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">
              Coverage
            </span>
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
              Built for the enterprise security teams that cannot afford to wait.
            </h2>
          </div>
        </Reveal>

        <div className="grid gap-px bg-[#a8ffce]/10 md:grid-cols-3">
          {[
            { stat: "MEA", label: "Middle East & Africa", detail: "Enterprise market presence with deep regional context and existing customer deployments.", icon: "🌍" },
            { stat: "17+", label: "Security controls integrated", detail: "API-first integrations spanning EDR, SIEM, firewall, IAM, cloud, and network tooling.", icon: "⚡" },
            { stat: "5", label: "Governance frameworks", detail: "PCI-DSS, NIST CSF, ISO 27001, CIS v8, and MITRE ATT&CK — automated, not manual.", icon: "🛡️" },
          ].map((pillar) => (
            <Reveal key={pillar.label}>
              <div className="group flex flex-col gap-5 bg-[#061321] p-8 md:p-10 transition-colors hover:bg-[#0a1e2e]">
                <div className="text-3xl" aria-hidden="true">{pillar.icon}</div>
                <div className="font-display text-5xl font-extrabold text-[#a8ffce] md:text-6xl">
                  {pillar.stat}
                </div>
                <div className="font-semibold text-white">{pillar.label}</div>
                <p className="text-sm leading-6 text-white/55">{pillar.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Control Narrative ───────────────────────────────── */

function ControlNarrative() {
  const steps = [
    {
      num: "01",
      title: "Collect signals",
      body: "Pull critical state from security, cloud, and network controls via API — no manual exports, no reinterpretation. The data is authoritative because it comes directly from the source.",
      detail: "EDR • SIEM • Firewall • IAM • Cloud • Network",
    },
    {
      num: "02",
      title: "Correlate risk",
      body: "Expose drift, indicators of compromise, and focused remediation priorities across the estate in a single governance-grade view. Reduce MTTD from hours to seconds.",
      detail: "OneView • Posture Score • RAG Indicator • MTTD",
    },
    {
      num: "03",
      title: "Trigger containment",
      body: "Coordinate responses so controls don't operate in isolation. When one control detects an IOC, others respond automatically — lateral movement blocked, privileged access restricted, evidence secured.",
      detail: "MTTR Reduction • Automation • SOAR-as-a-Service",
    },
  ]

  return (
    <section className="bg-[#030912] py-20 md:py-32">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[380px_1fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">
              Operating Loop
            </span>
            <h2 className="mt-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-white md:text-5xl">
              Every control<br />becomes part of the<br />
              <span className="text-[#a8ffce]">response.</span>
            </h2>
            <p className="mt-6 text-white/58 leading-7">
              Port443 connects compliance, visibility, and response so security
              teams can focus on the decisions that change risk — not the
              administration around them.
            </p>
            <div className="mt-8">
              <Link
                href="/request-a-demo"
                className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#a8ffce] transition hover:text-white"
              >
                See it in action <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </Reveal>

          <div className="flex flex-col gap-0">
            {steps.map((step, i) => (
              <Reveal key={step.num}>
                <div className="group relative border-b border-[#a8ffce]/10 py-10 pl-8 transition-all hover:bg-[#a8ffce]/3 last:border-b-0">
                  {/* Vertical accent line */}
                  <div className="absolute left-0 top-0 bottom-0 w-[2px] origin-top scale-y-0 bg-[#a8ffce] transition-transform duration-500 group-hover:scale-y-100" />

                  <div className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">
                    STEP {step.num}
                  </div>
                  <h3 className="mt-3 font-display text-3xl font-bold text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 max-w-lg text-white/62 leading-7">{step.body}</p>
                  <div className="mt-4 font-mono text-[10px] tracking-[0.12em] text-[#a8ffce]/50">
                    {step.detail}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─── Service Matrix ──────────────────────────────────── */

function ServiceMatrix() {
  return (
    <section id="services" className="bg-[#030912]">
      {/* Section header */}
      <div className="border-y border-[#a8ffce]/10 bg-[#061321] py-16">
        <Container>
          <Reveal className="grid gap-6 md:grid-cols-[1fr_1fr] md:items-end">
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">
                Services
              </span>
              <h2 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-white md:text-5xl">
                Security posture —<br />visible, testable, actionable.
              </h2>
            </div>
            <p className="text-white/58 leading-7 md:max-w-md md:justify-self-end">
              Four integrated services that reduce manual effort, strengthen
              governance, and enable faster containment across your estate.
            </p>
          </Reveal>
        </Container>
      </div>

      {/* Services */}
      {services.map((service, i) => (
        <ServiceBlock key={service.code} service={service} flipped={i % 2 === 1} />
      ))}
    </section>
  )
}

function ServiceBlock({
  service,
  flipped,
}: {
  service: (typeof services)[0]
  flipped: boolean
}) {
  const Icon = service.icon

  return (
    <Reveal>
      <div className={`border-b border-[#a8ffce]/10 ${flipped ? "bg-[#061321]" : "bg-[#030912]"}`}>
        <Container className="py-16 md:py-20">
          <div className={`grid gap-10 md:grid-cols-2 md:items-start ${flipped ? "md:[direction:rtl]" : ""}`}>
            {/* Text side */}
            <div className={flipped ? "[direction:ltr]" : ""}>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center border border-[#a8ffce]/20 bg-[#a8ffce]/5">
                  <Icon className="size-5 text-[#a8ffce]" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs font-semibold uppercase tracking-[0.16em] text-[#a8ffce]">
                  {service.code}
                </span>
              </div>
              <h3 className="mt-5 font-display text-3xl font-extrabold text-white md:text-4xl">
                {service.title}
              </h3>
              <p className="mt-2 font-mono text-xs tracking-[0.1em] text-[#a8ffce]/60">
                {service.sub}
              </p>
              <p className="mt-5 leading-7 text-white/60">{service.description}</p>
              <Link
                href="/request-a-demo"
                className="mt-7 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#a8ffce] transition hover:text-white"
              >
                Request a demo for this service
                <ArrowRight className="size-3.5" />
              </Link>
            </div>

            {/* Framework tags side */}
            <div className={`flex flex-col gap-3 ${flipped ? "[direction:ltr]" : ""}`}>
              <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/30">
                Capabilities
              </span>
              <div className="grid grid-cols-2 gap-3">
                {service.frameworks.map((fw) => (
                  <div
                    key={fw}
                    className="flex items-center gap-2 border border-[#a8ffce]/10 bg-[#a8ffce]/3 p-3"
                  >
                    <span className="size-1.5 flex-shrink-0 rounded-full bg-[#22c55e] pulse-dot" />
                    <span className="font-mono text-xs text-white/70">{fw}</span>
                  </div>
                ))}
              </div>

              {/* Decorative circuit accent */}
              <div className="mt-4 h-px w-full bg-gradient-to-r from-[#a8ffce]/20 via-[#a8ffce]/5 to-transparent" />
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
                &lt;&lt; port443 — {service.code} &gt;&gt;
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Reveal>
  )
}

/* ─── Posture Proof (OneView Benefits) ───────────────── */

function PostureProof() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.4 })

  const benefits = [
    {
      num: "01",
      title: "Independent single source of truth",
      body: "Data extracted via API directly from source technologies — no manual intervention, no reinterpretation. Aligns with ISO/IEC 27001:2022 Annex A 5.35, NIST CSF, and CIS CSC governance requirements.",
    },
    {
      num: "02",
      title: "Elimination of manual reporting",
      body: "The dashboard automatically pulls, aggregates, and formats critical metrics into live views. Frees analyst hours for proactive threat hunting instead of administrative compilation.",
    },
    {
      num: "03",
      title: "Real-time alert consolidation",
      body: "Prioritized, correlated alerts in one pane. Mean-time-to-detect (MTTD) and mean-time-to-respond (MTTR) drop significantly versus switching between siloed tools.",
    },
    {
      num: "04",
      title: "Overall cyber security posture score",
      body: "Aggregated individual scores provide an 'Overall Cyber Security Posture' trended over time with an intuitive RAG indicator. Critical input for the Risk Register and Risk Committee.",
    },
    {
      num: "05",
      title: "Proactive risk avoidance",
      body: "Highlights trends, compliance gaps, and high-risk areas instantly — enabling preventive action rather than reactive response. Early visibility prevents escalation.",
    },
  ]

  return (
    <section className="section-light bg-[#f0f8f4] py-20 md:py-28">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[380px_1fr] lg:gap-20">
          {/* Posture Score Ring */}
          <Reveal className="flex flex-col items-center gap-6">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#0e6b54]">
              OneView — Benefits
            </span>
            <div ref={ref} className="relative size-64">
              <svg viewBox="0 0 120 120" className="size-full -rotate-90" aria-hidden="true">
                <circle cx={60} cy={60} r={54} fill="none" stroke="#c8ddd5" strokeWidth={6} />
                <circle
                  cx={60} cy={60} r={54} fill="none"
                  stroke="#0e6b54" strokeWidth={6}
                  strokeLinecap="round"
                  className="posture-ring-fill"
                  style={{
                    strokeDashoffset: isInView ? 31 : 339.3,
                    transition: "stroke-dashoffset 2s cubic-bezier(0.4,0,0.2,1) 0.3s",
                  }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-display text-5xl font-extrabold text-[#030912]">
                  {isInView ? "91%" : "—"}
                </span>
                <span className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-[#0e6b54]">
                  Posture score
                </span>
              </div>
            </div>
            <div className="grid w-full grid-cols-3 gap-2 text-center">
              {[
                { v: "GREEN", l: "RAG Status" },
                { v: "↓74%", l: "MTTD" },
                { v: "↓68%", l: "MTTR" },
              ].map((m) => (
                <div key={m.l} className="border border-[#c8ddd5] bg-white p-3">
                  <div className="font-display text-lg font-bold text-[#030912]">{m.v}</div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#3c5258]">{m.l}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Benefits list */}
          <div className="flex flex-col gap-0">
            <h2 className="mb-10 font-display text-4xl font-extrabold tracking-tight text-[#030912] md:text-5xl">
              Why OneView<br />
              <span className="text-[#0e6b54]">changes everything.</span>
            </h2>
            {benefits.map((b) => (
              <Reveal key={b.num}>
                <div className="group flex gap-5 border-b border-[#c8ddd5] py-6 last:border-b-0 transition-colors hover:bg-[#e2f0ea] hover:px-4">
                  <span className="font-mono text-xs font-semibold text-[#0e6b54] mt-0.5 flex-shrink-0">{b.num}</span>
                  <div>
                    <div className="font-semibold text-[#030912]">{b.title}</div>
                    <p className="mt-1.5 text-sm leading-6 text-[#3c5258]">{b.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─── Regional Presence ───────────────────────────────── */

function RegionalPresence() {
  return (
    <section className="bg-[#061321] py-8 md:py-10">
      <Container>
        <div className="grid overflow-hidden border border-[#a8ffce]/10 lg:grid-cols-[1fr_.8fr]">
          <div className="relative min-h-[380px]">
            <Image
              src="/port443-v2/about-1.jpg"
              alt="Enterprise operations across the Middle East and Africa"
              fill
              sizes="(min-width: 1024px) 56vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#061321]/60" />
          </div>
          <Reveal className="flex flex-col justify-center px-8 py-14 md:px-12">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">
              About Port443
            </span>
            <h2 className="mt-4 font-display text-3xl font-extrabold leading-tight text-white md:text-4xl">
              Built for enterprises facing threats that don&apos;t wait for manual workflows.
            </h2>
            <p className="mt-5 leading-7 text-white/58">
              Port443 operates across the Middle East and Africa, augmenting
              security engineering teams with automations, dashboards, and
              compliance services that integrate directly with the controls
              already deployed.
            </p>
            <Link
              href="/about-us"
              className="mt-8 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#a8ffce] transition hover:text-white"
            >
              About Port443 <ArrowRight className="size-3.5" />
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ─── Platform Portal (VueItAll) ─────────────────────── */

function PlatformPortal() {
  return (
    <section className="relative overflow-hidden bg-[#030912] py-20 md:py-24">
      <div className="absolute inset-0 hex-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#a8ffce]/3 to-transparent" />
      <Container className="relative z-10">
        <Reveal>
          <div className="border border-[#a8ffce]/20 bg-[#030912] p-8 md:p-12 lg:p-16">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a8ffce]/60">
                  Platform SaaS — Powered by Port443
                </span>
                <h2 className="mt-4 font-display text-4xl font-extrabold text-white md:text-5xl">
                  VueItAll
                </h2>
                <p className="mt-4 max-w-xl leading-7 text-white/60">
                  A dedicated security visibility platform built on the same
                  API-first automation engine that underpins Port443&apos;s managed
                  services. Aggregate, correlate, and present your entire
                  security estate in one place — without the manual overhead.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {["Single Pane of Glass", "API-First", "Consumption-Based", "Real-Time RAG"].map((t) => (
                    <span key={t} className="border border-[#a8ffce]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-[#a8ffce]/60">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href="https://www.vueitall.com/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex shrink-0 items-center gap-2.5 border border-[#a8ffce] bg-[#a8ffce] px-6 py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-[#030912] transition-all hover:bg-white hover:border-white hover:shadow-[0_0_32px_rgba(168,255,206,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8ffce]"
              >
                Visit VueItAll
                <ExternalLink className="size-4" />
              </a>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

/* ─── Insights / LinkedIn Feed ────────────────────────── */

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function InsightsFeed() {
  return (
    <section className="bg-[#061321] py-20 md:py-24">
      <Container>
        <Reveal className="mb-12 flex flex-col gap-4 border-b border-[#a8ffce]/10 pb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">
              <LinkedinIcon className="size-3.5" />
              LinkedIn
            </span>
            <h2 className="mt-3 font-display text-4xl font-extrabold text-white">
              Latest from Port443.
            </h2>
          </div>
          <a
            href="https://www.linkedin.com/company/port443-pty-ltd/posts/?feedView=all"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[#a8ffce]/70 transition hover:text-[#a8ffce]"
          >
            View all posts <ExternalLink className="size-3" />
          </a>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {linkedInPosts.map((post) => (
            <Reveal key={post.title}>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full flex-col gap-4 border border-[#a8ffce]/10 bg-[#030912] p-6 transition-all hover:border-[#a8ffce]/30 hover:bg-[#0a1e2e] md:p-8"
              >
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-white/30">
                  {post.date}
                </span>
                <h3 className="flex-1 font-display text-xl font-bold leading-snug text-white group-hover:text-[#a8ffce] transition-colors">
                  {post.title}
                </h3>
                <p className="text-sm leading-6 text-white/50">{post.excerpt}</p>
                <span className="flex items-center gap-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[#a8ffce]/60 group-hover:text-[#a8ffce] transition-colors">
                  Read more <ArrowRight className="size-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-8 text-center">
          <a
            href="https://www.linkedin.com/company/port443-pty-ltd/posts/?feedView=all"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2.5 border border-[#a8ffce]/20 px-6 py-3 font-mono text-xs font-semibold uppercase tracking-wider text-[#a8ffce]/70 transition hover:border-[#a8ffce] hover:text-[#a8ffce] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8ffce]"
          >
            <LinkedinIcon className="size-3.5" />
            Follow Port443 on LinkedIn
          </a>
        </Reveal>
      </Container>
    </section>
  )
}

/* ─── Contact Stage ───────────────────────────────────── */

function ContactStage() {
  return (
    <section id="contact" className="relative overflow-hidden bg-[#030912] py-20 md:py-28">
      <div className="absolute inset-0 hex-grid opacity-30" />
      <Container className="relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1fr_520px] lg:gap-16">
          <Reveal className="flex flex-col justify-center">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">
              Get started
            </span>
            <h2 className="mt-4 font-display text-5xl font-extrabold leading-tight text-white md:text-6xl">
              Put the next demo<br />
              <span className="text-[#a8ffce]">on the control path.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-8 text-white/60">
              See how Port443 connects security automation, integration, and
              operational visibility for your estate.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Demo requests map to the specific service you select.",
                "No commitment — see the automation in your environment.",
                "MEA enterprise teams respond within one business day.",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <span className="mt-1 size-1.5 flex-shrink-0 rounded-full bg-[#22c55e] pulse-dot" />
                  <span className="text-sm leading-6 text-white/65">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-2">
              <a href="mailto:info@port443.co.za" className="font-mono text-sm text-[#a8ffce]/70 hover:text-[#a8ffce] transition">
                info@port443.co.za
              </a>
              <a href="tel:+27833263456" className="font-mono text-sm text-[#a8ffce]/70 hover:text-[#a8ffce] transition">
                +27 83 326 3456
              </a>
            </div>
          </Reveal>

          <Reveal>
            <DemoForm />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

function DemoForm() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="border border-[#a8ffce]/15 bg-[#061321] p-7 md:p-10">
      <h3 className="font-display text-2xl font-bold text-white">Request a demo</h3>
      <p className="mt-2 font-mono text-xs text-white/40">
        All fields required — we don&apos;t share your information.
      </p>

      {sent ? (
        <div className="mt-8 flex flex-col items-center gap-4 py-8 text-center">
          <span className="size-12 flex items-center justify-center border border-[#a8ffce] text-[#a8ffce]">
            ✓
          </span>
          <p className="font-display text-xl font-bold text-white">Request received</p>
          <p className="text-sm text-white/55">The Port443 team will be in touch within one business day.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
          {[
            { id: "name",    label: "Full name",     type: "text",  ph: "Jane Smith" },
            { id: "email",   label: "Work email",    type: "email", ph: "jane@company.com" },
            { id: "company", label: "Organisation",  type: "text",  ph: "Acme Corp" },
            { id: "phone",   label: "Phone number",  type: "tel",   ph: "+27 xx xxx xxxx" },
          ].map((f) => (
            <div key={f.id} className="flex flex-col gap-1.5">
              <label htmlFor={f.id} className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
                {f.label}
              </label>
              <input
                id={f.id}
                type={f.type}
                required
                placeholder={f.ph}
                className="border border-[#a8ffce]/15 bg-[#030912] px-3.5 py-2.5 font-mono text-sm text-white placeholder-white/20 outline-none transition focus:border-[#a8ffce]/50 focus:ring-1 focus:ring-[#a8ffce]/30"
              />
            </div>
          ))}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="service" className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">
              Service interest
            </label>
            <select
              id="service"
              required
              className="border border-[#a8ffce]/15 bg-[#030912] px-3.5 py-2.5 font-mono text-sm text-white outline-none transition focus:border-[#a8ffce]/50 focus:ring-1 focus:ring-[#a8ffce]/30"
            >
              <option value="">Select a service</option>
              <option value="control-attestation">Control Attestation</option>
              <option value="oneview">OneView</option>
              <option value="custom-automation">Custom Automation</option>
              <option value="consulting">Consulting</option>
              <option value="all">All services</option>
            </select>
          </div>
          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2.5 bg-[#a8ffce] py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-[#030912] transition-all hover:bg-white hover:shadow-[0_0_28px_rgba(168,255,206,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8ffce]"
          >
            Submit request
            <ArrowRight className="size-4" />
          </button>
        </form>
      )}
    </div>
  )
}

/* ─── Site Footer ─────────────────────────────────────── */

function SiteFooter() {
  return (
    <footer className="border-t border-[#a8ffce]/10 bg-[#030912] py-12">
      <Container>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3">
              <Image
                src="/port443-v2/logo-shield-color.svg"
                alt="Port443"
                width={36}
                height={36}
                className="size-9 object-contain"
              />
              <div className="leading-none">
                <div className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">
                  Port443
                </div>
                <div className="mt-0.5 font-mono text-[8px] tracking-[0.12em] text-[#a8ffce]/60">
                  &lt; AUTOMATING CYBER DEFENSE &gt;
                </div>
              </div>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-6 text-white/45">
              Specialists in cyber security software development, automation and
              integration across the Middle East and Africa.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:col-span-7">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#a8ffce]/50">Links</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {[
                  { label: "About Us", href: "/about-us" },
                  { label: "Services", href: "/services" },
                  { label: "Request a Demo", href: "/request-a-demo" },
                  { label: "VueItAll", href: "https://www.vueitall.com/", external: true },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-white/45 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#a8ffce]/50">Contact</div>
              <ul className="mt-4 space-y-2.5 text-sm text-white/45">
                <li><a href="mailto:info@port443.co.za" className="hover:text-white transition">info@port443.co.za</a></li>
                <li><a href="tel:+27833263456" className="hover:text-white transition">+27 83 326 3456</a></li>
                <li>
                  <a href="https://www.linkedin.com/company/port443-pty-ltd/" target="_blank" rel="noreferrer" className="hover:text-white transition">
                    LinkedIn
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#a8ffce]/50">Address</div>
              <p className="mt-4 text-sm leading-6 text-white/40">
                Suite 5 &amp; 6, Block C<br />
                Monte Circle Office Park<br />
                178 Montecasino Blvd<br />
                Sandton, Johannesburg
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-[#a8ffce]/8 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="font-mono text-[10px] text-white/25">
            © {new Date().getFullYear()} Port443 (Pty) Ltd — All rights reserved
          </div>
          <div className="font-mono text-[10px] text-white/20">
            v2 rebuild — powered by Port443
          </div>
        </div>
      </Container>
    </footer>
  )
}

/* ─── Shared: Reveal animation ────────────────────────── */

function Reveal({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
