"use client"

import Image from "next/image"
import Link from "next/link"
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Bot,
  Check,
  ChevronDown,
  Eye,
  Layers3,
  Minus,
  ShieldCheck,
} from "lucide-react"
import {
  MotionConfig,
  type MotionValue,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion"

import { Container } from "@/components/site/container"
import { SiteFooter, SiteNav } from "@/components/v4/chrome"
import { cn, withBasePath } from "@/lib/utils"

/* ─── Brand Data ──────────────────────────────────────────── */

const subnavLinks = [
  { label: "Platform", href: "#oneview" },
  { label: "Attestation", href: "#loop" },
  { label: "Frameworks", href: "#frameworks" },
  { label: "Insights", href: "#insights" },
  { label: "See OneView", href: "#oneview" },
]

const heroBadges = [
  "Live monitoring",
  "API-first integration",
  "Independent governance",
  "Best Practice frameworks",
  "Operational efficiency",
  "Automation",
  "Risk mitigation",
  "Multi-regional",
]

const proofItems = [
  {
    code: "01",
    label: "Automated attestation",
    value: "Thousands of controls across multiple clients and geographies",
  },
  {
    code: "02",
    label: "Visibility & observability",
    value: "Implemented within many clients and across multiple industries",
  },
  {
    code: "03",
    label: "All services",
    value:
      "Delivered SaaS, consumption-based, across any geography with a hyperscale presence",
  },
]

const highlights = [
  {
    eyebrow: "01 — ATTESTATION",
    title: "Continuous control validation",
    body:
      "Evidence pulled live from your security estate via API. No spreadsheets, no compiled snapshots, no optimistic reporting.",
    href: "/services/",
  },
  {
    eyebrow: "02 — ONEVIEW",
    title: "Consolidate security posture",
    body:
      "Cross-control observability with prioritised alerts, overall cyber-security posture analysis, and third-party independent governance.",
    href: "#oneview",
  },
  {
    eyebrow: "03 — AUTOMATION",
    title: "SOC automation as SaaS",
    body:
      "Identify → Scope → Build → Operate. Custom automation against your existing toolset, delivered as a managed service.",
    href: "/services/",
  },
  {
    eyebrow: "04 — CONSULTING",
    title: "Cyber Security Assessments",
    body:
      "Including information security policy and incident response policy definition and development.",
    href: "/services/",
  },
  {
    eyebrow: "05 — VUEITALL",
    title: "vueITall",
    body:
      "Automated Observability and Visibility — powered by Port443 (Pty) Ltd.",
    href: "https://www.port443.co.za/",
    external: true,
  },
]

const services = [
  {
    id: "attestation",
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
    id: "oneview",
    code: "02",
    title: "OneView",
    sub: "Single source of truth, independent and live.",
    body:
      "An independent, governance-grade dashboard that pulls directly from source technologies via API. Cross-control observability with prioritised alerts, overall cyber-security posture analysis, and third-party independent governance.",
    icon: Eye,
    capabilities: [
      "RAG posture score",
      "MTTD trend",
      "MTTR trend",
      "Board-ready reporting",
    ],
  },
  {
    id: "automation",
    code: "03",
    title: "Custom Automation",
    sub: "Identify → Scope → Build → Operate.",
    body:
      "End-to-end SOC automation delivered as SaaS. Every engagement follows a proven lifecycle: identify the manual workflow to automate, scope the integration points, build against your existing toolset, and operate as a managed service. Frees analyst capacity for proactive threat hunting.",
    icon: Bot,
    capabilities: [
      "Use-case design",
      "API integration",
      "SaaS operation",
      "SOC optimisation",
    ],
  },
  {
    id: "consulting",
    code: "04",
    title: "Consulting",
    sub: "Cyber Security Assessments.",
    body:
      "Cyber Security Assessments — including information security policy and incident response policy definition and development. Bridges security engineering and executive risk governance.",
    icon: Layers3,
    capabilities: [
      "Cyber security assessment",
      "Information security policy",
      "Incident response policy",
      "CISO advisory",
    ],
  },
] as const

type Service = (typeof services)[number]

const frameworks = [
  { name: "PCI-DSS", version: "4.0", scope: "Payment & cardholder data" },
  { name: "NIST CSF", version: "2.0", scope: "Cyber-security framework" },
  { name: "CIS Controls", version: "v8", scope: "Defence safeguards" },
  { name: "Vendor best-practice", version: "·", scope: "Per-control baselines" },
]

const loopStates = [
  {
    code: "01",
    title: "Analyzing",
    body:
      "Secure, non-intrusive baseline definition, outlining deviation from best practice.",
    rows: [
      { kind: "BASELINE", left: "Control set defined", right: "vendor best-practice" },
      { kind: "SCAN", left: "Configuration sampled", right: "API · read-only" },
      { kind: "DRIFT", left: "Deviation flagged", right: "score recorded" },
    ],
  },
  {
    code: "02",
    title: "Remediate",
    body:
      "Client to remediate against findings, maintaining independent governance.",
    rows: [
      { kind: "TICKET", left: "Finding handed off", right: "owner assigned" },
      { kind: "FIX", left: "Control reconfigured", right: "client-owned" },
      { kind: "GOV", left: "Third-party oversight", right: "independent" },
    ],
  },
  {
    code: "03",
    title: "Validate",
    body:
      "Validation of remediation as well as reduction in drift from best practices.",
    rows: [
      { kind: "RE-ATTEST", left: "Control re-checked", right: "delta computed" },
      { kind: "TREND", left: "Drift reduction", right: "trended over time" },
      { kind: "AUDIT", left: "Evidence chain sealed", right: "audit-ready" },
    ],
  },
] as const

const comparisonRows = [
  {
    label: "Continuous control attestation",
    p443: "yes",
    diy: "partial",
    mssp: "no",
  },
  {
    label: "Independent posture view",
    p443: "yes",
    diy: "partial",
    mssp: "partial",
  },
  {
    label: "Aligned with PCI · NIST · CIS · vendor best-practice",
    p443: "yes",
    diy: "depends",
    mssp: "partial",
  },
  {
    label: "Identify → Scope → Build → Operate",
    p443: "yes",
    diy: "no",
    mssp: "no",
  },
  {
    label: "API-first integration",
    p443: "yes",
    diy: "depends",
    mssp: "partial",
  },
  {
    label: "MEA operating context",
    p443: "yes",
    diy: "no",
    mssp: "no",
  },
  {
    label: "Delivered as SaaS",
    p443: "yes",
    diy: "no",
    mssp: "partial",
  },
] as const

const insights = [
  {
    date: "May 2026",
    title: "OneView: Governance-grade visibility. No manual aggregation required.",
    body:
      "API-first extraction directly from source technologies. Single source of truth aligned with NIST CSF, CIS CSC, and vendor best-practice baselines.",
    href: "https://www.linkedin.com/company/port443-pty-ltd/posts/?feedView=all",
    source: "LinkedIn",
  },
  {
    date: "May 2023",
    title: "Five things boards need to know about incident response",
    body:
      "Board-level IR essentials: what executives must understand before a breach occurs.",
    href: "https://ventureburn.com/2023/05/five-things-boards-need-to-know-about-incident-response-ir/",
    source: "Ventureburn",
  },
  {
    date: "Press",
    title: "Port443 — automating cyber defence across the Middle East and Africa",
    body:
      "Coverage of Port443's regional positioning and the broader automation thesis in enterprise cyber.",
    href: "https://www.techfinancials.co.za/",
    source: "TechFinancials",
  },
]

/* ─── Root ────────────────────────────────────────────────── */

export function HomeExperience() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col">
        <SiteNav />
        <StickySubnav />
        <main className="flex-1">
          <HeroSplit />
          <ProofRail />
          <HighlightsReel />
          <LoopNarrative />
          <OneViewBand />
          <FrameworksRail />
          <ComparisonStrip />
          <InsightsFeed />
          <ContactStage />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  )
}

/* ─── Sticky Subnav (appears after the hero exits) ────────── */

function StickySubnav() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const sentinel = document.getElementById("hero-sentinel")
    if (!sentinel) return
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { rootMargin: "-1px 0px 0px 0px", threshold: 0 },
    )
    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : -64, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.32, ease: [0.22, 0.61, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 pointer-events-auto"
      aria-hidden={!visible}
    >
      <div className="border-b border-[var(--ink-3)] bg-[rgba(10,14,22,0.78)] backdrop-blur-md">
        <Container className="flex items-center justify-between h-14">
          <Link href="/" className="flex items-center gap-2 text-[14px] font-semibold tracking-tight">
            <Image
              src="/port443-v4/logo-shield-white.svg"
              alt=""
              width={22}
              height={22}
            />
            Port<span className="text-[var(--green)]">443</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-6 text-[12.5px] text-[var(--muted-on-ink)]">
            {subnavLinks.map((link) => (
              <a key={link.href} href={link.href} className="hover:text-[var(--ivory)]">
                {link.label}
              </a>
            ))}
          </nav>
          <PrimaryCTA href="#contact" small>
            Request a demo
          </PrimaryCTA>
        </Container>
      </div>
    </motion.div>
  )
}

/* ─── Hero Split ──────────────────────────────────────────── */

function HeroSplit() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 hairline-grid opacity-70 pointer-events-none" />
      <div className="absolute inset-x-0 top-0 h-px bg-[var(--ink-3)]" />
      <Container className="relative pt-32 lg:pt-40 pb-24 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-7">
            <Eyebrow>Automating Cyber Security</Eyebrow>
            <Reveal delay={0.05}>
              <h1 className="mt-6 text-[clamp(2.5rem,6.4vw,5.25rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
                Port443.{" "}
                <span className="block mt-3 text-[clamp(1.125rem,2.2vw,1.875rem)] font-medium leading-[1.3] tracking-[-0.01em] text-[var(--green)]">
                  Enhancing the security posture through observability,
                  visibility and automated attestation.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.32}>
              <p className="mt-7 max-w-xl text-[17px] leading-[1.55] text-[var(--muted-on-ink)]">
                Continuous control attestation. Unified posture in OneView.
                Custom SOC automation delivered as SaaS.
              </p>
            </Reveal>
            <Reveal delay={0.42}>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <PrimaryCTA href="#contact">Request a demo</PrimaryCTA>
              </div>
            </Reveal>
            <Reveal delay={0.55}>
              <div className="mt-12 flex flex-wrap items-center gap-x-5 gap-y-3 text-[11.5px] uppercase tracking-[0.18em] text-[var(--muted-on-ink)]">
                {heroBadges.map((label, i) => (
                  <span key={label} className="inline-flex items-center gap-2">
                    {i === 0 ? (
                      <LiveDot reduceMotion={reduceMotion} />
                    ) : (
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                    )}
                    {label}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
          <div className="lg:col-span-5">
            <Reveal delay={0.18} y={32}>
              <OneViewSurface />
            </Reveal>
          </div>
        </div>
      </Container>
      <div id="hero-sentinel" className="absolute bottom-0 left-0 h-px w-full" />
    </section>
  )
}

function LiveDot({ reduceMotion }: { reduceMotion: boolean | null }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {!reduceMotion && (
        <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--forest)] opacity-60 animate-ping" />
      )}
      <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--forest)]" />
    </span>
  )
}

/* ─── OneView Surface (composed from primitives) ──────────── */

function OneViewSurface({ large = false }: { large?: boolean }) {
  const wrapRef = useRef<HTMLDivElement>(null)
  const inView = useInView(wrapRef, { once: true, margin: "-15% 0px" })
  const reduceMotion = useReducedMotion()

  return (
    <div
      ref={wrapRef}
      className={cn(
        "relative border border-[var(--ink-3)] bg-[var(--ink-2)] rounded-[2px] overflow-hidden",
        large ? "p-7 md:p-9" : "p-5 md:p-6",
      )}
    >
      <div className="absolute inset-0 hairline-grid opacity-50 pointer-events-none" />
      <div className="relative flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--muted-on-ink)]">
        <span className="inline-flex items-center gap-2">
          <Image
            src="/port443-v4/logo-shield-color.svg"
            alt=""
            width={14}
            height={14}
          />
          OneView · Posture
        </span>
        <span className="mono">live</span>
      </div>
      <div className="relative mt-6 grid grid-cols-[auto_1fr] gap-6 items-center">
        <PostureRing target={94.2} active={inView} reduceMotion={!!reduceMotion} large={large} />
        <div>
          <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted-on-ink)]">
            Composite score
          </div>
          <div className={cn("mt-1 font-semibold tracking-[-0.02em]", large ? "text-5xl" : "text-3xl")}>
            <CountUp to={94.2} decimals={1} inView={inView} reduceMotion={!!reduceMotion} />
          </div>
          <div className="mt-1 text-[12px] text-[var(--muted-on-ink)] mono">
            +2.1 / week · MTTR 3.2m
          </div>
          <Sparkline active={inView} reduceMotion={!!reduceMotion} />
        </div>
      </div>
      <div className="relative mt-6 grid grid-cols-1 gap-px bg-[var(--ink-3)]">
        {frameworks.map((f, i) => (
          <FrameworkRow
            key={f.name}
            framework={f}
            delay={0.18 + i * 0.07}
            inView={inView}
          />
        ))}
      </div>
      <div className="relative mt-5 grid grid-cols-1 gap-1.5 text-[11.5px] mono text-[var(--muted-on-ink)]">
        <EvidenceRow tag="EDR" body="Threat signal received" right="IOC hash-a3f2" />
        <EvidenceRow tag="AUTO" body="Containment triggered" right="endpoint-44a" />
        <EvidenceRow tag="LOG" body="Evidence chain sealed" right="audit-ready" />
      </div>
    </div>
  )
}

function FrameworkRow({
  framework,
  delay,
  inView,
}: {
  framework: { name: string; version: string; scope: string }
  delay: number
  inView: boolean
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1], delay }}
      className="flex items-center justify-between bg-[var(--ink-2)] px-4 py-2.5"
    >
      <div className="flex items-center gap-3">
        <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[var(--forest)]" />
        <span className="text-[13px] font-medium tracking-tight">
          {framework.name}
          <span className="text-[var(--muted-on-ink)] mono"> {framework.version}</span>
        </span>
      </div>
      <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted-on-ink)]">
        Aligned
      </span>
    </motion.div>
  )
}

function EvidenceRow({
  tag,
  body,
  right,
}: {
  tag: string
  body: string
  right: string
}) {
  return (
    <div className="flex items-center justify-between gap-3 border-t border-[var(--ink-3)] pt-2">
      <span className="text-[var(--green)] mono w-12 shrink-0">[{tag}]</span>
      <span className="flex-1 truncate">{body}</span>
      <span className="shrink-0">{right}</span>
    </div>
  )
}

function PostureRing({
  target,
  active,
  reduceMotion,
  large,
}: {
  target: number
  active: boolean
  reduceMotion: boolean
  large: boolean
}) {
  const size = large ? 132 : 92
  const stroke = large ? 9 : 7
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const offset = c * (1 - target / 100)
  const final = useMemo(() => offset, [offset])

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="var(--ink-3)"
        strokeWidth={stroke}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="var(--green)"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        initial={{ strokeDashoffset: reduceMotion ? final : c }}
        animate={{ strokeDashoffset: active ? final : c }}
        transition={{ duration: reduceMotion ? 0 : 1.4, ease: [0.22, 0.61, 0.36, 1] }}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x={size / 2}
        y={size / 2 + 4}
        textAnchor="middle"
        className="mono"
        fill="var(--ivory)"
        fontSize={large ? 18 : 13}
        fontWeight={600}
      >
        {target.toFixed(1)}
      </text>
    </svg>
  )
}

function CountUp({
  to,
  decimals = 0,
  inView,
  reduceMotion,
}: {
  to: number
  decimals?: number
  inView: boolean
  reduceMotion: boolean
}) {
  const [value, setValue] = useState(reduceMotion ? to : 0)

  useEffect(() => {
    if (reduceMotion || !inView) {
      setValue(to)
      return
    }
    const startTime = performance.now()
    const duration = 1400
    let raf = 0
    const tick = (now: number) => {
      const t = Math.min(1, (now - startTime) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setValue(eased * to)
      if (t < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, reduceMotion, to])

  return <span className="mono">{value.toFixed(decimals)}</span>
}

function Sparkline({
  active,
  reduceMotion,
}: {
  active: boolean
  reduceMotion: boolean
}) {
  const points = useMemo(
    () => [12, 14, 13, 17, 16, 19, 22, 21, 24, 27, 26, 29, 31, 30, 33],
    [],
  )
  const w = 220
  const h = 36
  const max = Math.max(...points)
  const min = Math.min(...points)
  const path = points
    .map((p, i) => {
      const x = (i / (points.length - 1)) * w
      const y = h - ((p - min) / (max - min)) * (h - 4) - 2
      return `${i === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`
    })
    .join(" ")
  return (
    <svg
      viewBox={`0 0 ${w} ${h}`}
      className="mt-2 block w-full max-w-[220px] h-9"
      role="img"
      aria-label="MTTR trend"
    >
      <motion.path
        d={path}
        stroke="var(--green)"
        strokeWidth={1.5}
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }}
        animate={
          active
            ? { pathLength: 1, opacity: 1 }
            : { pathLength: reduceMotion ? 1 : 0, opacity: reduceMotion ? 1 : 0 }
        }
        transition={{ duration: reduceMotion ? 0 : 1.6, ease: [0.22, 0.61, 0.36, 1] }}
      />
    </svg>
  )
}

/* ─── Proof Rail ──────────────────────────────────────────── */

function ProofRail() {
  return (
    <section className="border-t border-b border-[var(--ink-3)] bg-[var(--ink)]">
      <Container className="py-9 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-8">
        {proofItems.map((item) => (
          <div key={item.code} className="flex items-start gap-4">
            <span className="mono text-[11px] tracking-[0.2em] text-[var(--green)] mt-1 shrink-0">
              {item.code}
            </span>
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted-on-ink)]">
                {item.label}
              </div>
              <div className="mt-2 text-[15px] font-medium leading-[1.45] tracking-[-0.005em] text-[var(--ivory)]">
                {item.value}
              </div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

/* ─── Highlights Reel ─────────────────────────────────────── */

function HighlightsReel() {
  return (
    <section className="py-24 lg:py-32 border-b border-[var(--ink-3)]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-12">
            <Eyebrow>Core services</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-[-0.025em] leading-[1.02]">
              Core services.
            </h2>
          </div>
        </div>
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--ink-3)]">
          {highlights.map((h, i) => (
            <Reveal
              key={h.eyebrow}
              delay={i * 0.07}
              className="bg-[var(--ink)] p-6 lg:p-7 flex flex-col gap-5 min-h-[260px] group"
            >
              <div className="mono text-[11px] tracking-[0.18em] text-[var(--green)]">
                {h.eyebrow}
              </div>
              <h3 className="text-[20px] font-semibold tracking-[-0.02em] leading-[1.15]">
                {h.title}
              </h3>
              <p className="text-[14px] leading-[1.55] text-[var(--muted-on-ink)]">
                {h.body}
              </p>
              <a
                href={"external" in h && h.external ? h.href : withBasePath(h.href)}
                {...("external" in h && h.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="mt-auto inline-flex items-center gap-1.5 text-[13px] text-[var(--ivory)] group-hover:text-[var(--green)] transition-colors"
              >
                {"external" in h && h.external ? "Visit vueITall" : "Read more"}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Loop Narrative (scroll-pinned signature) ────────────── */

function LoopNarrative() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.5 })

  const stateProgress = useTransform(progress, (v) => Math.min(2, Math.max(0, v * 3 - 0.1)))
  const [active, setActive] = useState(0)
  useEffect(() => {
    const unsub = stateProgress.on("change", (v) => {
      const idx = Math.round(v)
      if (idx !== active) setActive(Math.min(2, Math.max(0, idx)))
    })
    return unsub
  }, [stateProgress, active])

  if (reduceMotion) {
    return (
      <section id="loop" className="py-24 lg:py-32 border-b border-[var(--ink-3)]">
        <Container>
          <Eyebrow>Attestation</Eyebrow>
          <h2 className="mt-5 max-w-4xl text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-[-0.025em] leading-[1.02]">
            Attestation — automated.
          </h2>
          <div className="mt-12 grid lg:grid-cols-3 gap-px bg-[var(--ink-3)]">
            {loopStates.map((s) => (
              <div key={s.code} className="bg-[var(--ink)] p-7">
                <LoopState state={s} highlighted />
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <div id="loop" ref={containerRef} className="relative h-[300vh] border-b border-[var(--ink-3)]">
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0 hairline-grid opacity-50 pointer-events-none" />
        <Container className="relative w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Eyebrow>Attestation</Eyebrow>
              <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-[-0.025em] leading-[1.02]">
                Attestation — automated.
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-[1.55] text-[var(--muted-on-ink)]">
                Three steps, repeated continuously. Analyze the baseline.
                Remediate against findings. Validate the result. Independent
                governance throughout.
              </p>
              <div className="mt-10 flex gap-2.5">
                {loopStates.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-px transition-all duration-500",
                      i === active ? "bg-[var(--green)] w-12" : "bg-[var(--ink-3)] w-6",
                    )}
                  />
                ))}
              </div>
              <div className="mt-8 min-h-[160px]">
                {loopStates.map((s, i) => (
                  <motion.div
                    key={s.code}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 8 }}
                    transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                    style={{ position: i === active ? "relative" : "absolute" }}
                    aria-hidden={i !== active}
                  >
                    <LoopState state={s} />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 flex items-center justify-center">
              <LoopDiagram active={active} progress={progress} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

function LoopState({
  state,
  highlighted = false,
}: {
  state: (typeof loopStates)[number]
  highlighted?: boolean
}) {
  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-3 mono text-[11px] tracking-[0.2em]",
          highlighted ? "text-[var(--green)]" : "text-[var(--green)]",
        )}
      >
        {state.code} · {state.title.toUpperCase()}
      </div>
      <h3 className="mt-3 text-[24px] font-semibold tracking-[-0.02em]">{state.title}</h3>
      <p className="mt-3 max-w-md text-[14px] leading-[1.55] text-[var(--muted-on-ink)]">
        {state.body}
      </p>
      <div className="mt-5 grid gap-1.5 text-[11.5px] mono text-[var(--muted-on-ink)]">
        {state.rows.map((r, i) => (
          <div
            key={i}
            className="flex items-center justify-between gap-3 border-t border-[var(--ink-3)] pt-2"
          >
            <span className="text-[var(--green)] w-14 shrink-0">[{r.kind}]</span>
            <span className="flex-1 truncate">{r.left}</span>
            <span className="shrink-0">{r.right}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LoopDiagram({
  active,
  progress,
}: {
  active: number
  progress: MotionValue<number>
}) {
  const fillA = useTransform(progress, [0, 0.33], [0, 1])
  const fillB = useTransform(progress, [0.33, 0.66], [0, 1])
  const fillC = useTransform(progress, [0.66, 1], [0, 1])
  return (
    <svg viewBox="0 0 380 380" className="w-full max-w-[420px]">
      <defs>
        <linearGradient id="ringA" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--green)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="var(--green)" stopOpacity="0.35" />
        </linearGradient>
      </defs>

      <circle cx="190" cy="190" r="170" stroke="var(--ink-3)" strokeWidth="1" fill="none" />
      <circle cx="190" cy="190" r="130" stroke="var(--ink-3)" strokeWidth="1" fill="none" />
      <circle cx="190" cy="190" r="90" stroke="var(--ink-3)" strokeWidth="1" fill="none" />

      <DiagramArc cx={190} cy={190} r={150} startAngle={-90} sweep={120} fill={fillA} />
      <DiagramArc cx={190} cy={190} r={150} startAngle={30} sweep={120} fill={fillB} />
      <DiagramArc cx={190} cy={190} r={150} startAngle={150} sweep={120} fill={fillC} />

      <DiagramNode cx={190} cy={40} label="Analyzing" active={active >= 0} />
      <DiagramNode cx={320} cy={260} label="Remediate" active={active >= 1} />
      <DiagramNode cx={60} cy={260} label="Validate" active={active >= 2} />

      <line x1="190" y1="40" x2="320" y2="260" stroke="var(--ink-3)" strokeWidth="1" />
      <line x1="320" y1="260" x2="60" y2="260" stroke="var(--ink-3)" strokeWidth="1" />
      <line x1="60" y1="260" x2="190" y2="40" stroke="var(--ink-3)" strokeWidth="1" />

      <circle cx="190" cy="190" r="52" fill="var(--ink-2)" stroke="var(--ink-3)" />
      <text
        x="190"
        y="186"
        textAnchor="middle"
        fontSize="10"
        className="mono"
        letterSpacing="0.16em"
        fill="var(--green)"
      >
        AUTOMATED
      </text>
      <text
        x="190"
        y="202"
        textAnchor="middle"
        fontSize="11"
        className="mono"
        letterSpacing="0.16em"
        fill="var(--ivory)"
      >
        ATTESTATION
      </text>
    </svg>
  )
}

function DiagramArc({
  cx,
  cy,
  r,
  startAngle,
  sweep,
  fill,
}: {
  cx: number
  cy: number
  r: number
  startAngle: number
  sweep: number
  fill: MotionValue<number>
}) {
  const toRad = (a: number) => ((a - 90) * Math.PI) / 180
  const x1 = cx + r * Math.cos(toRad(startAngle))
  const y1 = cy + r * Math.sin(toRad(startAngle))
  const end = startAngle + sweep
  const x2 = cx + r * Math.cos(toRad(end))
  const y2 = cy + r * Math.sin(toRad(end))
  const large = sweep > 180 ? 1 : 0
  const d = `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="url(#ringA)"
      strokeWidth={3}
      strokeLinecap="round"
      style={{ pathLength: fill }}
    />
  )
}

function DiagramNode({
  cx,
  cy,
  label,
  active,
}: {
  cx: number
  cy: number
  label: string
  active: boolean
}) {
  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={active ? 11 : 7}
        fill={active ? "var(--green)" : "var(--ink-2)"}
        stroke={active ? "var(--green)" : "var(--ink-3)"}
        strokeWidth={1.5}
        style={{ transition: "all 0.35s cubic-bezier(0.22, 0.61, 0.36, 1)" }}
      />
      <text
        x={cx}
        y={cy + 28}
        textAnchor="middle"
        fontSize="11"
        className="mono"
        fill={active ? "var(--ivory)" : "var(--muted-on-ink)"}
      >
        {label.toUpperCase()}
      </text>
    </g>
  )
}

/* ─── OneView Band (light section) ────────────────────────── */

function OneViewBand() {
  return (
    <section
      id="oneview"
      className="section-light bg-[var(--ivory)] text-[var(--ink)] py-24 lg:py-32 border-b border-[var(--ivory-3)]"
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
            <Eyebrow tone="dark">OneView</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-[-0.025em] leading-[1.02]">
              One independent posture view. Governance-grade. Live.
            </h2>
            <p className="mt-6 max-w-md text-[16px] leading-[1.55] text-[var(--muted-on-ivory)]">
              OneView pulls evidence directly from your security estate via API,
              consolidates prioritised alerts, and trends your posture against
              the frameworks you actually report against.
            </p>
            <ul className="mt-10 grid gap-3 text-[14px]">
              {[
                "RAG posture score — trended weekly",
                "MTTD and MTTR reduction, sourced from controls",
                "Board-ready reporting with third-party independent governance",
                "Single consolidated pane of glass highlighting all critical metrics and alerts",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--green)]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-10 flex gap-6 items-center">
              <PrimaryCTA href="#contact">Request a demo</PrimaryCTA>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="bg-[var(--ink)] text-[var(--ivory)] rounded-[2px] p-6 lg:p-7 border border-[var(--ink-3)] shadow-[0_30px_60px_-30px_rgba(10,14,22,0.45)]">
              <OneViewSurface large />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─── Frameworks Rail ─────────────────────────────────────── */

function FrameworksRail() {
  return (
    <section id="frameworks" className="py-20 lg:py-24 border-b border-[var(--ink-3)]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-6">
            <Eyebrow>Frameworks</Eyebrow>
            <h2 className="mt-5 text-[clamp(1.5rem,3vw,2.5rem)] font-semibold tracking-[-0.025em] leading-[1.05]">
              Aligned with the frameworks your auditors already ask about.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:text-right">
            <p className="text-[14px] text-[var(--muted-on-ink)] max-w-md lg:ml-auto">
              Port443 maps controls and evidence against four widely-used
              frameworks. We do not invent compliance — we make existing posture
              legible.
            </p>
          </div>
        </div>
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--ink-3)]">
          {frameworks.map((f, i) => (
            <Reveal
              key={f.name}
              delay={i * 0.06}
              className="bg-[var(--ink)] p-7 flex flex-col gap-3 min-h-[180px]"
            >
              <div className="mono text-[11px] tracking-[0.18em] text-[var(--green)]">
                0{i + 1}
              </div>
              <div className="text-[22px] font-semibold tracking-[-0.025em]">
                {f.name}
                <span className="text-[var(--muted-on-ink)] mono"> {f.version}</span>
              </div>
              <div className="text-[13px] text-[var(--muted-on-ink)] mt-auto">
                {f.scope}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Comparison Strip ────────────────────────────────────── */

function ComparisonStrip() {
  const cols = [
    { id: "p443", label: "Port443", emphasis: true },
    { id: "diy", label: "Build in-house", emphasis: false },
    { id: "mssp", label: "Generic MSSP", emphasis: false },
  ] as const

  const cell = (state: string) => {
    if (state === "yes")
      return (
        <span className="inline-flex items-center gap-2 text-[var(--green)]">
          <Check className="h-3.5 w-3.5" /> Yes
        </span>
      )
    if (state === "no")
      return (
        <span className="inline-flex items-center gap-2 text-[var(--muted-on-ink)]">
          <Minus className="h-3.5 w-3.5" /> No
        </span>
      )
    return (
      <span className="inline-flex items-center gap-2 text-[var(--muted-on-ink)]">
        <Activity className="h-3.5 w-3.5" /> {state[0].toUpperCase() + state.slice(1)}
      </span>
    )
  }

  return (
    <section className="py-24 lg:py-32 border-b border-[var(--ink-3)]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Compare</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-[-0.025em] leading-[1.02]">
              Port443 vs. the obvious alternatives.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-[var(--muted-on-ink)] max-w-md">
              Honest comparison. We say "partial" when something is partial. We
              say "depends" when it depends on a decision the buyer hasn't made yet.
            </p>
          </div>
        </div>
        <div className="mt-12 lg:mt-14 border border-[var(--ink-3)] overflow-x-auto">
          <table className="w-full text-[14px] min-w-[640px]">
            <thead>
              <tr className="bg-[var(--ink-2)]">
                <th className="text-left p-5 font-medium text-[var(--muted-on-ink)] mono text-[11px] tracking-[0.18em]">
                  Capability
                </th>
                {cols.map((c) => (
                  <th
                    key={c.id}
                    className={cn(
                      "text-left p-5 font-medium mono text-[11px] tracking-[0.18em]",
                      c.emphasis ? "text-[var(--green)]" : "text-[var(--muted-on-ink)]",
                    )}
                  >
                    {c.label.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, i) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-t border-[var(--ink-3)]",
                    i % 2 === 1 && "bg-[var(--ink-2)]/40",
                  )}
                >
                  <td className="p-5 text-[var(--ivory)]">{row.label}</td>
                  <td className="p-5">{cell(row.p443)}</td>
                  <td className="p-5">{cell(row.diy)}</td>
                  <td className="p-5">{cell(row.mssp)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-10 flex items-center gap-6">
          <PrimaryCTA href="#contact">Request a demo</PrimaryCTA>
        </div>
      </Container>
    </section>
  )
}

/* ─── Insights Feed ───────────────────────────────────────── */

function InsightsFeed() {
  return (
    <section id="insights" className="py-24 lg:py-32 border-b border-[var(--ink-3)]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow>Insights & press</Eyebrow>
            <h2 className="mt-5 text-[clamp(2rem,4.5vw,3.75rem)] font-semibold tracking-[-0.025em] leading-[1.02]">
              What we wrote. What was written about us.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <a
              href="https://www.linkedin.com/company/port443-pty-ltd/posts/?feedView=all"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-[14px] text-[var(--ivory)] hover:text-[var(--green)]"
            >
              All updates on LinkedIn
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-[var(--ink-3)]">
          {insights.map((post, i) => (
            <Reveal
              key={post.title}
              delay={i * 0.07}
              className="bg-[var(--ink)] p-7 flex flex-col gap-5 min-h-[280px] group"
            >
              <div className="flex items-center justify-between text-[11px] mono uppercase tracking-[0.2em] text-[var(--muted-on-ink)]">
                <span>{post.date}</span>
                <span className="text-[var(--green)]">{post.source}</span>
              </div>
              <h3 className="text-[18.5px] leading-[1.25] font-semibold tracking-[-0.02em]">
                {post.title}
              </h3>
              <p className="text-[13.5px] text-[var(--muted-on-ink)] leading-[1.55]">
                {post.body}
              </p>
              <a
                href={post.href}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-[13px] text-[var(--ivory)] group-hover:text-[var(--green)]"
              >
                Read
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Contact Stage ───────────────────────────────────────── */

function ContactStage() {
  const [submitted, setSubmitted] = useState(false)
  const [serviceInterest, setServiceInterest] = useState<Service["id"]>("attestation")

  return (
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 hairline-grid opacity-50 pointer-events-none" />
      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-14">
          <div className="lg:col-span-6">
            <Eyebrow>Request a demo</Eyebrow>
            <h2 className="mt-5 text-[clamp(2.25rem,5vw,4rem)] font-semibold tracking-[-0.025em] leading-[1]">
              Bring your existing
              <br />
              <span className="text-[var(--green)]">security estate.</span>
              <br />
              We'll show you OneView with it.
            </h2>
            <p className="mt-7 max-w-md text-[15.5px] leading-[1.6] text-[var(--muted-on-ink)]">
              A 30-minute walk-through of OneView and one custom-automation
              use case mapped to your environment. No spreadsheets requested.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6 max-w-md text-[13px]">
              <div className="border-t border-[var(--ink-3)] pt-3">
                <div className="mono text-[11px] tracking-[0.2em] text-[var(--green)]">EMAIL</div>
                <a className="mt-1 block text-[var(--ivory)] hover:text-[var(--green)]" href="mailto:hello@port443.co.za">
                  hello@port443.co.za
                </a>
              </div>
              <div className="border-t border-[var(--ink-3)] pt-3">
                <div className="mono text-[11px] tracking-[0.2em] text-[var(--green)]">REGION</div>
                <div className="mt-1 text-[var(--muted-on-ink)]">Middle East &amp; Africa</div>
              </div>
            </div>
          </div>
          <div className="lg:col-span-6">
            <form
              className="border border-[var(--ink-3)] bg-[var(--ink-2)] p-7 lg:p-9 rounded-[2px]"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              {submitted ? (
                <div className="py-10 text-center">
                  <div className="mono text-[11px] tracking-[0.2em] text-[var(--green)]">RECEIVED</div>
                  <div className="mt-3 text-[20px] font-semibold tracking-[-0.02em]">
                    Thanks. We'll be in touch within one business day.
                  </div>
                  <p className="mt-3 text-[14px] text-[var(--muted-on-ink)]">
                    A Port443 engineer will reach out to schedule the OneView
                    walk-through.
                  </p>
                </div>
              ) : (
                <>
                  <Field id="contact-name" label="Name" />
                  <Field id="contact-email" label="Work email" type="email" />
                  <Field id="contact-org" label="Organisation" />
                  <div className="mt-7">
                    <div className="mono text-[11px] tracking-[0.2em] text-[var(--muted-on-ink)]">
                      INTEREST
                    </div>
                    <div className="mt-3 grid grid-cols-2 gap-px bg-[var(--ink-3)]">
                      {services.map((s) => (
                        <label
                          key={s.id}
                          className={cn(
                            "bg-[var(--ink-2)] px-4 py-3 text-[13px] cursor-pointer transition-colors",
                            serviceInterest === s.id
                              ? "bg-[var(--ink)] text-[var(--ivory)]"
                              : "text-[var(--muted-on-ink)] hover:text-[var(--ivory)]",
                          )}
                        >
                          <input
                            type="radio"
                            name="service"
                            value={s.id}
                            checked={serviceInterest === s.id}
                            onChange={() => setServiceInterest(s.id)}
                            className="sr-only"
                          />
                          <span className="mono text-[10px] tracking-[0.2em] text-[var(--green)] mr-2">
                            {s.code}
                          </span>
                          {s.title}
                        </label>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-[var(--green)] text-[var(--ivory-2)] px-6 py-3.5 text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity"
                  >
                    Request a demo
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <p className="mt-4 text-[11.5px] text-[var(--muted-on-ink)] leading-[1.5]">
                    We use your details to schedule one OneView walk-through. We
                    do not enrol you in a sequence and we do not resell contact
                    information.
                  </p>
                </>
              )}
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

function Field({
  id,
  label,
  type = "text",
}: {
  id: string
  label: string
  type?: string
}) {
  return (
    <label htmlFor={id} className="block first:mt-0 mt-5">
      <span className="mono text-[11px] tracking-[0.2em] text-[var(--muted-on-ink)]">
        {label.toUpperCase()}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-2 w-full bg-transparent border-b border-[var(--ink-3)] text-[15px] text-[var(--ivory)] py-2.5 focus:border-[var(--green)] outline-none transition-colors"
      />
    </label>
  )
}

/* ─── Shared primitives ───────────────────────────────────── */

function Eyebrow({
  children,
  tone = "dark-bg",
}: {
  children: React.ReactNode
  tone?: "dark-bg" | "dark"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 mono text-[11px] tracking-[0.22em] uppercase",
        tone === "dark" ? "text-[var(--muted-on-ivory)]" : "text-[var(--muted-on-ink)]",
      )}
    >
      <span
        className={cn(
          "h-px w-7",
          tone === "dark" ? "bg-[var(--ink)]" : "bg-[var(--green)]",
        )}
      />
      {children}
    </span>
  )
}

function PrimaryCTA({
  href,
  children,
  small = false,
}: {
  href: string
  children: React.ReactNode
  small?: boolean
}) {
  return (
    <a
      href={withBasePath(href)}
      className={cn(
        "inline-flex items-center gap-2 bg-[var(--green)] text-[var(--ivory-2)] font-medium tracking-tight hover:opacity-90 transition-opacity rounded-[2px]",
        small ? "px-4 py-2 text-[13px]" : "px-6 py-3 text-[14.5px]",
      )}
    >
      {children}
      <ArrowRight className={cn(small ? "h-3.5 w-3.5" : "h-4 w-4")} />
    </a>
  )
}

function SecondaryCTA({
  href,
  children,
  tone = "light",
}: {
  href: string
  children: React.ReactNode
  tone?: "light" | "dark"
}) {
  return (
    <a
      href={withBasePath(href)}
      className={cn(
        "inline-flex items-center gap-1.5 text-[14px] font-medium tracking-tight transition-colors",
        tone === "dark"
          ? "text-[var(--ink)] hover:text-[var(--green)]"
          : "text-[var(--ivory)] hover:text-[var(--green)]",
      )}
    >
      {children}
      <ArrowRight className="h-3.5 w-3.5" />
    </a>
  )
}

/* ─── Reveal — staged entrance ────────────────────────────── */

type RevealProps = {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
  style?: CSSProperties
}

function Reveal({ children, delay = 0, y = 18, className, style }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: reduceMotion ? 0 : y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: reduceMotion ? 0 : y }}
      transition={{ duration: 0.55, ease: [0.22, 0.61, 0.36, 1], delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─── Scroll affordance (currently unused; kept for parity) ─ */
export function ScrollCue() {
  return (
    <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-[var(--muted-on-ink)]">
      Scroll
      <ChevronDown className="h-3.5 w-3.5" />
    </span>
  )
}
