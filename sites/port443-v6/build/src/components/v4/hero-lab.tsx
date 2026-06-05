"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  Bot,
  ChartNetwork,
  Eye,
  Layers3,
  MapPinned,
  Sparkles,
  ShieldCheck,
  Workflow,
} from "lucide-react"
import {
  MotionConfig,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion"
import { useRef } from "react"

import { Container } from "@/components/site/container"
import { BRAND_MARK_LOGO_SRC } from "@/components/v4/chrome"
import { cn } from "@/lib/utils"

const heroBadges = [
  "Live evidence",
  "API-first integrations",
  "Independent governance",
  "Control attestation",
  "Board-ready reporting",
  "Automation",
  "Risk reduction",
  "MEA delivery",
]

const proofItems = [
  {
    code: "01",
    label: "Control attestation",
    value:
      "Evidence pulled live from source systems and mapped to the frameworks you already report against.",
  },
  {
    code: "02",
    label: "OneView posture",
    value:
      "A single operational view for drift, alerts, and governance — not another static dashboard.",
  },
  {
    code: "03",
    label: "SOC automation",
    value:
      "Identify → Scope → Build → Operate against the tools already in your estate.",
  },
  {
    code: "04",
    label: "Regional fit",
    value:
      "Built for Middle East and Africa operating realities, reporting pressure, and vendor mix.",
  },
] as const

const labSections = [
  {
    id: "linear",
    nav: "Linear",
    label: "Linear",
    title: "Editorial calm",
    note:
      "Large type, generous negative space, and a product surface that stays quiet enough for the message to carry.",
    tone: "dark",
  },
  {
    id: "wiz",
    nav: "Wiz",
    label: "Wiz",
    title: "Split trust field",
    note:
      "A light, airy split hero with the product surface offset to one side and trust evidence layered around it.",
    tone: "light",
  },
  {
    id: "tines",
    nav: "Tines",
    label: "Tines",
    title: "Workflow canvas",
    note:
      "The page behaves like the workflow it is selling: observe, remediate, and verify as visible states.",
    tone: "dark",
  },
  {
    id: "vanta",
    nav: "Vanta",
    label: "Vanta",
    title: "Trust architecture",
    note:
      "More boardroom than command-centre: evidence, compliance, and regional proof are the emotional anchor.",
    tone: "light",
  },
  {
    id: "cloudflare",
    nav: "Cloudflare",
    label: "Cloudflare",
    title: "Infrastructure density",
    note:
      "Technical, dense, and legible — a hero that feels like platform scale without becoming noisy.",
    tone: "dark",
  },
] as const

const baseHeroCopy = {
  eyebrow: "CYBER DEFENCE AUTOMATION — MEA",
  lead: "Security evidence, made operational.",
  body:
    "Control attestation, OneView posture, and custom SOC automation in one operating rhythm for teams that need proof, not promises.",
  primaryHref: "/request-a-demo/",
  secondaryHref: "/#oneview",
}

export function HeroLab() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--ink)] text-[var(--ivory)]">
        <LabHeader />
        <IntroBand />
        <LabRail />
        <main>
          <LinearSection />
          <WizSection />
          <TinesSection />
          <VantaSection />
          <CloudflareSection />
        </main>
        <ClosingBand />
      </div>
    </MotionConfig>
  )
}

function LabHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--ink-3)] bg-[rgba(10,14,22,0.86)] backdrop-blur-2xl">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/services/" className="flex items-center gap-3">
          <span className="inline-flex rounded-[10px] bg-white/98 px-1.5 py-1 shadow-[0_10px_28px_rgba(0,0,0,0.24)]">
            <Image
              src={BRAND_MARK_LOGO_SRC}
              alt="Port443"
              width={360}
              height={389}
              className="h-auto w-7"
              priority
            />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Port<span className="text-[var(--green)]">443</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-2 text-[12px] text-[var(--muted-on-ink)]">
          <span>Regional depth</span>
          <span className="h-1 w-1 rounded-full bg-[var(--green)]" />
          <span>Same copy, five visual registers</span>
        </div>
        <Link
          href="/request-a-demo/"
          className="inline-flex items-center gap-2 bg-[var(--green)] px-4 py-2 text-[13px] font-medium tracking-tight text-[var(--ivory-2)] transition-opacity hover:opacity-90 rounded-[2px]"
        >
          Request a demo
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </Container>
    </header>
  )
}

function IntroBand() {
  return (
    <section className="border-b border-[var(--ink-3)] bg-[var(--ink-2)]">
      <Container className="py-8 lg:py-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <div className="mono text-[11px] tracking-[0.22em] uppercase text-[var(--muted-on-ink)]">
            Comparison lab
          </div>
          <h1 className="mt-4 max-w-3xl text-[clamp(2rem,4vw,3.4rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
            Five hero treatments.
            <span className="block text-[var(--green)]">One Port443 message.</span>
          </h1>
        </div>
        <p className="max-w-xl text-[15px] leading-[1.6] text-[var(--muted-on-ink)]">
          Inspired by Linear, Wiz, Tines, Vanta, and Cloudflare. The copy stays
          fixed; only layout, motion, density, and emotional temperature change.
        </p>
      </Container>
    </section>
  )
}

function LabRail() {
  return (
    <div className="sticky top-[73px] z-40 border-b border-[var(--ink-3)] bg-[rgba(10,14,22,0.72)] backdrop-blur-xl">
      <Container className="flex items-center gap-2 overflow-x-auto py-3">
        {labSections.map((section, index) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="inline-flex min-w-max items-center gap-2 rounded-full border border-[var(--ink-3)] bg-[var(--ink)] px-3 py-2 text-[12px] text-[var(--muted-on-ink)] transition-colors hover:text-[var(--ivory)]"
          >
            <span className="mono text-[10px] tracking-[0.2em] text-[var(--green)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            {section.nav}
          </a>
        ))}
      </Container>
    </div>
  )
}

function LinearSection() {
  return (
    <HeroSection
      id="linear"
      source="Linear"
      title="Editorial calm"
      note="The hero stays almost unnervingly quiet: oversized type, narrow copy, and a product surface that behaves like a strong footnote instead of a billboard."
    >
      <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <HeroCopy className="lg:pr-6" />
        <LinearSurface />
      </div>
    </HeroSection>
  )
}

function WizSection() {
  return (
    <HeroSection
      id="wiz"
      source="Wiz"
      title="Split trust field"
      tone="light"
      note="The product surface sits off-axis and the surrounding whitespace is doing real work. The result is airy, credible, and easy to read at a glance."
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <HeroCopy className="lg:order-1" />
        <WizSurface />
      </div>
    </HeroSection>
  )
}

function TinesSection() {
  return (
    <HeroSection
      id="tines"
      source="Tines"
      title="Workflow canvas"
      note="This version makes the page feel like a live orchestration surface. The hero still reads instantly, but the right side behaves like the product itself."
    >
      <div className="grid gap-6 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <HeroCopy className="lg:pr-6" />
        <TinesSurface />
      </div>
    </HeroSection>
  )
}

function VantaSection() {
  return (
    <HeroSection
      id="vanta"
      source="Vanta"
      title="Trust architecture"
      tone="light"
      note="The emotional tone shifts from product demo to governance proof. The surface is lighter, calmer, and more board-ready without losing energy."
    >
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <VantaSurface />
        <HeroCopy centered className="lg:pl-6" />
      </div>
    </HeroSection>
  )
}

function CloudflareSection() {
  return (
    <HeroSection
      id="cloudflare"
      source="Cloudflare"
      title="Infrastructure density"
      note="Denser than Linear, calmer than a command centre. It feels like platform scale, but the page still gives the eye a clean way in."
    >
      <div className="grid gap-6 lg:grid-cols-[1fr_1.02fr] lg:items-center">
        <HeroCopy className="lg:pr-6" />
        <CloudflareSurface />
      </div>
    </HeroSection>
  )
}

function HeroSection({
  id,
  source,
  title,
  note,
  tone = "dark",
  children,
}: {
  id: string
  source: string
  title: string
  note: string
  tone?: "dark" | "light"
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-28 border-b border-border bg-background text-foreground",
        tone === "light" && "section-light",
      )}
    >
      <Container className="py-20 lg:py-28">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mono text-[11px] tracking-[0.22em] uppercase text-[var(--muted-foreground)]">
              {source}
            </div>
            <h2 className="mt-3 text-[clamp(2rem,4.2vw,4rem)] font-semibold leading-[0.98] tracking-[-0.03em]">
              {title}
            </h2>
          </div>
          <p className="max-w-xl text-[15px] leading-[1.6] text-[var(--muted-foreground)]">
            {note}
          </p>
        </div>
        <div className="mt-10">{children}</div>
      </Container>
    </section>
  )
}

function HeroCopy({
  centered = false,
  className,
}: {
  centered?: boolean
  className?: string
}) {
  const reduceMotion = useReducedMotion()

  return (
    <div className={cn(centered ? "mx-auto max-w-3xl text-center" : "max-w-2xl", className)}>
      <div className="inline-flex items-center gap-2 mono text-[11px] tracking-[0.22em] uppercase text-[var(--muted-foreground)]">
        <span className="h-px w-8 bg-[var(--green)]" />
        {baseHeroCopy.eyebrow}
      </div>
      <h3 className="mt-6 text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[0.96] tracking-[-0.03em]">
        Port443.
        <span className="mt-3 block text-[clamp(1.125rem,2.2vw,1.75rem)] font-medium leading-[1.3] tracking-[-0.015em] text-[var(--green)]">
          {baseHeroCopy.lead}
        </span>
      </h3>
      <p className="mt-7 max-w-xl text-[17px] leading-[1.55] text-[var(--muted-foreground)]">
        {baseHeroCopy.body}
      </p>
      <div className={cn("mt-9 flex flex-wrap items-center gap-4", centered && "justify-center")}>
        <Link
          href={baseHeroCopy.primaryHref}
          className="inline-flex items-center gap-2 bg-[var(--green)] px-5 py-3 text-[14px] font-medium tracking-tight text-[var(--ivory-2)] transition-opacity hover:opacity-90 rounded-[2px]"
        >
          Request a demo
          <ArrowRight className="h-4 w-4" />
        </Link>
        <Link
          href={baseHeroCopy.secondaryHref}
          className="inline-flex items-center gap-2 text-[14px] font-medium tracking-tight text-[var(--foreground)] transition-colors hover:text-[var(--green)]"
        >
          See OneView
          <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
      <div className={cn("mt-10 flex flex-wrap gap-2", centered && "justify-center")}>
        {heroBadges.map((badge, index) => (
          <BadgePill key={badge} label={badge} animate={index === 0 && !reduceMotion} />
        ))}
      </div>
    </div>
  )
}

function BadgePill({
  label,
  animate = false,
}: {
  label: string
  animate?: boolean
}) {
  return (
    <motion.span
      initial={false}
      animate={animate ? { y: [0, -2, 0] } : { y: 0 }}
      transition={animate ? { duration: 3.6, repeat: Number.POSITIVE_INFINITY } : undefined}
      className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
    >
      {label}
    </motion.span>
  )
}

function LinearSurface() {
  const reduceMotion = useReducedMotion()
  const ring = useRef<HTMLDivElement>(null)
  const inView = useInView(ring, { once: true, margin: "-10% 0px" })
  const active = !!inView || !!reduceMotion

  return (
    <div
      ref={ring}
      className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 lg:p-7"
    >
      <div className="absolute inset-0 hairline-grid opacity-50 pointer-events-none" />
      <div className="relative flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
        <span className="inline-flex items-center gap-2">
          <BadgeCheck className="h-4 w-4 text-[var(--green)]" />
          Live evidence
        </span>
        <span className="mono">control loop</span>
      </div>

      <div className="relative mt-6 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
        <RingGauge animate={active} />
        <div className="space-y-4">
          <SurfaceMetric label="Framework alignment" value="4 frameworks aligned" />
          <SurfaceMetric label="Evidence status" value="Control chain intact" />
          <SurfaceMetric label="Coverage" value="Live mapping, not a static board" />
          <Sparkline animate={active} />
        </div>
      </div>

      <div className="relative mt-6 grid grid-cols-1 gap-px overflow-hidden rounded-[1.25rem] border border-[var(--border)] bg-[var(--border)]">
        {proofItems.map((item) => (
          <div key={item.code} className="bg-[var(--card)] px-4 py-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="mono text-[11px] tracking-[0.18em] text-[var(--green)]">
                  {item.code}
                </span>
                <span className="text-[13px] font-medium tracking-tight">
                  {item.label}
                </span>
              </div>
              <span className="text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]">
                proof
              </span>
            </div>
            <p className="mt-2 max-w-xl text-[13px] leading-[1.55] text-[var(--muted-foreground)]">
              {item.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

function WizSurface() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <motion.div
      ref={ref}
      initial={false}
      animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ duration: 0.7, ease: [0.22, 0.61, 0.36, 1] }}
      className="relative min-h-[560px] overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)]"
    >
      <Image
        src="/port443-v6/hero-bg.jpg"
        alt=""
        fill
        priority={false}
        className="object-cover object-center opacity-70"
        sizes="(min-width: 1024px) 45vw, 90vw"
      />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(135deg, rgba(247,246,242,0.94) 0%, rgba(247,246,242,0.62) 42%, rgba(247,246,242,0.18) 100%)",
        }}
      />
      <div className="absolute inset-0 p-6 lg:p-7">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          <span className="inline-flex items-center gap-2">
            <Eye className="h-4 w-4 text-[var(--green)]" />
            Product surface
          </span>
          <span className="mono">Wiz-inspired</span>
        </div>
        <div className="absolute right-6 top-6 rounded-full border border-[var(--border)] bg-[var(--background)]/82 px-3 py-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)] backdrop-blur-md">
          off-axis hero
        </div>
        <div className="relative mt-10 grid gap-4 md:grid-cols-2">
          {proofItems.slice(0, 2).map((item, index) => (
            <motion.div
              key={item.code}
              initial={false}
              animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="rounded-[1.25rem] border border-[var(--border)] bg-[rgba(255,255,255,0.72)] p-4 shadow-[0_1px_0_rgba(255,255,255,0.55)_inset] backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                <BadgeCheck className="h-4 w-4 text-[var(--green)]" />
                {item.label}
              </div>
              <p className="mt-3 text-[13px] leading-[1.55] text-[var(--foreground)]">
                {item.value}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-x-6 bottom-6 grid gap-3 md:grid-cols-2">
          {proofItems.slice(2).map((item, index) => (
            <motion.div
              key={item.code}
              initial={false}
              animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.6, delay: 0.16 + index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
              className="rounded-[1.1rem] border border-[var(--border)] bg-[rgba(255,255,255,0.84)] px-4 py-3 backdrop-blur-md"
            >
              <div className="mono text-[10px] tracking-[0.2em] text-[var(--green)]">
                {item.code}
              </div>
              <div className="mt-1 text-[13px] font-medium tracking-tight text-[var(--foreground)]">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

function TinesSurface() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 lg:p-7"
    >
      <div className="absolute inset-0 diagonal-rule opacity-15 pointer-events-none" />
      <div className="relative flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
        <span className="inline-flex items-center gap-2">
          <Workflow className="h-4 w-4 text-[var(--green)]" />
          Workflow canvas
        </span>
        <span className="mono">Tines-inspired</span>
      </div>

      <div className="relative mt-6 grid gap-4">
        {[
          {
            title: "Observe",
            body:
              "Establish the baseline from live systems and identify where control drift exists.",
            rows: [
              "Control set mapped",
              "Configuration sampled",
              "Deviation flagged",
            ],
          },
          {
            title: "Remediate",
            body:
              "Route findings to the right owner without losing the evidence trail or the governance context.",
            rows: ["Finding handed off", "Control updated", "Independent oversight"],
          },
          {
            title: "Verify",
            body:
              "Re-check the control, close the gap, and keep the board view current.",
            rows: ["Control re-checked", "Drift reduced", "Evidence chain sealed"],
          },
        ].map((step, index) => (
          <motion.div
            key={step.title}
            initial={false}
            animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
            className="relative pl-14"
          >
            <div className="absolute left-4 top-0 bottom-0 w-px bg-[linear-gradient(180deg,transparent,rgba(34,197,94,0.6),transparent)]" />
            <div className="absolute left-[0.9rem] top-5 flex h-7 w-7 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--background)] shadow-[0_0_0_6px_rgba(34,197,94,0.06)]">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--green)]" />
            </div>
            <div className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--background)]/86 p-4 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-[18px] font-semibold tracking-[-0.02em]">
                  {step.title}
                </h3>
                <span className="mono text-[10px] tracking-[0.2em] text-[var(--green)]">
                  0{index + 1}
                </span>
              </div>
              <p className="mt-2 text-[13.5px] leading-[1.55] text-[var(--muted-foreground)]">
                {step.body}
              </p>
              <div className="mt-4 grid gap-2">
                {step.rows.map((row) => (
                  <div
                    key={row}
                    className="flex items-center justify-between gap-4 rounded-[1rem] border border-[var(--border)] bg-[var(--card)] px-4 py-3 text-[12px] text-[var(--foreground)]"
                  >
                    <span className="inline-flex items-center gap-2">
                      <Bot className="h-4 w-4 text-[var(--green)]" />
                      {row}
                    </span>
                    <span className="mono text-[10px] tracking-[0.18em] text-[var(--muted-foreground)]">
                      live
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="relative mt-6 rounded-[1.25rem] border border-[var(--border)] bg-[var(--background)]/76 p-4">
        <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
          <span className="inline-flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-[var(--green)]" />
            Flow summary
          </span>
          <span className="mono">observe → remediate → verify</span>
        </div>
      </div>
    </div>
  )
}

function VantaSurface() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 lg:p-7"
    >
      <div className="absolute inset-0 hairline-grid opacity-35 pointer-events-none" />
      <div className="relative grid gap-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-stretch">
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]">
          <Image
            src="/port443-v6/about-1.jpg"
            alt=""
            fill
            className="object-cover object-center opacity-80"
            sizes="(min-width: 1024px) 30vw, 90vw"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background)]/92 via-[var(--background)]/28 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-between p-5 lg:p-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              <ShieldCheck className="h-4 w-4 text-[var(--green)]" />
              Trust image
            </div>
            <div className="grid gap-2">
              {[
                "MEA operating reality",
                "Evidence chain intact",
                "Board-ready reporting",
              ].map((label, index) => (
                <motion.div
                  key={label}
                  initial={false}
                  animate={inView || reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 12 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                  className="rounded-[1rem] border border-[var(--border)] bg-[rgba(255,255,255,0.74)] px-4 py-3 text-[12px] text-[var(--foreground)] backdrop-blur-md"
                >
                  {label}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4 content-start">
          <div className="grid gap-3 md:grid-cols-2">
            {[
              {
                icon: ShieldCheck,
                title: "Frameworks",
                body: "PCI-DSS 4.0, NIST CSF 2.0, CIS Controls v8, vendor best practice.",
              },
              {
                icon: Eye,
                title: "OneView",
                body: "A single operational view for drift, alerts, and governance.",
              },
              {
                icon: Bot,
                title: "Automation",
                body: "Identify → Scope → Build → Operate without changing the estate first.",
              },
              {
                icon: Layers3,
                title: "Consulting",
                body: "Assessments and policies that turn into operational decisions.",
              },
            ].map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={item.title}
                  initial={false}
                  animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
                  transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
                  className="rounded-[1.35rem] border border-[var(--border)] bg-[var(--background)] p-4"
                >
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                    <Icon className="h-4 w-4 text-[var(--green)]" />
                    {item.title}
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.55] text-[var(--foreground)]">
                    {item.body}
                  </p>
                </motion.div>
              )
            })}
          </div>

          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)] p-5">
            <div className="flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              <span className="inline-flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-[var(--green)]" />
                Regional proof
              </span>
              <span className="mono">Vanta-inspired</span>
            </div>
            <p className="mt-3 max-w-2xl text-[17px] leading-[1.55] text-[var(--foreground)]">
              The hero should feel like a board pack and an operations dashboard
              share the same language.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Evidence", "Governance", "Regional fit", "Clarity"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CloudflareSurface() {
  const reduceMotion = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-10% 0px" })
  const active = !!inView || !!reduceMotion

  return (
    <div
      ref={ref}
      className="relative overflow-hidden rounded-[2rem] border border-[var(--border)] bg-[var(--card)] p-6 lg:p-7"
    >
      <div className="absolute inset-0 hairline-grid opacity-28 pointer-events-none" />
      <div className="relative grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[1.35rem] border border-[var(--border)] bg-[var(--border)]">
            {[
              ["Control attestation", "Live evidence"],
              ["OneView", "Operational posture"],
              ["Automation", "SaaS + service blend"],
              ["Regional fit", "MEA delivery"],
            ].map(([title, body], index) => (
              <motion.div
                key={title}
                initial={false}
                animate={inView || reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 0.61, 0.36, 1] }}
                className="bg-[var(--background)] p-4"
              >
                <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  {title}
                </div>
                <div className="mt-2 text-[13px] font-medium tracking-tight text-[var(--foreground)]">
                  {body}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)] p-5">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
              <ChartNetwork className="h-4 w-4 text-[var(--green)]" />
              Platform scale
            </div>
            <p className="mt-3 text-[17px] leading-[1.55] text-[var(--foreground)]">
              Dense enough to feel serious, calm enough to read instantly.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["API-first", "Audit-ready", "Board-ready", "Regional"].map((label) => (
                <span
                  key={label}
                  className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
                >
                  {label}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="relative min-h-[420px] overflow-hidden rounded-[1.5rem] border border-[var(--border)] bg-[var(--background)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(34,197,94,0.18),transparent_38%),linear-gradient(180deg,rgba(10,14,22,0.04),transparent_55%)]" />
          <NetworkMesh animate={active} />
          <div className="absolute inset-x-5 bottom-5 flex flex-wrap gap-2">
            {["North", "South", "East", "West"].map((label) => (
              <span
                key={label}
                className="inline-flex items-center rounded-full border border-[var(--border)] bg-[var(--card)] px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-foreground)]"
              >
                {label}
              </span>
            ))}
          </div>
          <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--border)] bg-[var(--background)]/92 px-5 py-4 text-center backdrop-blur-md">
            <div className="mono text-[10px] tracking-[0.22em] text-[var(--green)]">
              Port443
            </div>
            <div className="mt-1 text-[13px] font-medium text-[var(--foreground)]">
              security evidence
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function RingGauge({ animate }: { animate: boolean }) {
  const circumference = 2 * Math.PI * 44
  const dashOffset = animate ? circumference * 0.08 : circumference

  return (
    <div className="flex flex-col items-center justify-center rounded-[1.4rem] border border-[var(--border)] bg-[var(--background)] p-4">
      <svg viewBox="0 0 120 120" className="h-28 w-28 -rotate-90" aria-hidden="true">
        <circle
          cx="60"
          cy="60"
          r="44"
          fill="none"
          stroke="rgba(255,255,255,0.08)"
          strokeWidth="10"
        />
        <motion.circle
          cx="60"
          cy="60"
          r="44"
          fill="none"
          stroke="var(--green)"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={false}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.4, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </svg>
      <div className="-mt-20 text-center">
        <div className="text-[38px] font-semibold tracking-[-0.04em]">92</div>
        <div className="mono text-[11px] tracking-[0.2em] text-[var(--muted-foreground)]">
          LIVE
        </div>
      </div>
    </div>
  )
}

function SurfaceMetric({
  label,
  value,
}: {
  label: string
  value: string
}) {
  return (
    <div className="rounded-[1.1rem] border border-[var(--border)] bg-[var(--background)] px-4 py-3">
      <div className="mono text-[10px] tracking-[0.2em] text-[var(--muted-foreground)]">
        {label}
      </div>
      <div className="mt-1 text-[13px] font-medium tracking-tight text-[var(--foreground)]">
        {value}
      </div>
    </div>
  )
}

function Sparkline({ animate }: { animate: boolean }) {
  return (
    <svg
      viewBox="0 0 280 62"
      className="h-16 w-full"
      aria-hidden="true"
    >
      <path
        d="M4 48 C 34 40, 52 44, 72 34 S 118 28, 140 22 S 184 8, 214 18 S 248 34, 276 10"
        fill="none"
        stroke="rgba(255,255,255,0.08)"
        strokeWidth="2"
      />
      <motion.path
        d="M4 48 C 34 40, 52 44, 72 34 S 118 28, 140 22 S 184 8, 214 18 S 248 34, 276 10"
        fill="none"
        stroke="var(--green)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={false}
        animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
        transition={{ duration: 1.5, ease: [0.22, 0.61, 0.36, 1] }}
      />
      {[
        [72, 34],
        [140, 22],
        [214, 18],
        [276, 10],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="var(--green)" />
      ))}
    </svg>
  )
}

function NetworkMesh({ animate }: { animate: boolean }) {
  const line = "rgba(34,197,94,0.55)"

  return (
    <svg
      viewBox="0 0 520 420"
      className="absolute inset-0 h-full w-full"
      aria-label="Network mesh"
      role="img"
    >
      <defs>
        <filter id="meshGlow">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#meshGlow)" stroke={line} strokeWidth="1.8" strokeLinecap="round">
        <motion.line
          x1="260"
          y1="210"
          x2="135"
          y2="110"
          initial={false}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 0.61, 0.36, 1] }}
        />
        <motion.line
          x1="260"
          y1="210"
          x2="380"
          y2="92"
          initial={false}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 0.61, 0.36, 1] }}
        />
        <motion.line
          x1="260"
          y1="210"
          x2="410"
          y2="250"
          initial={false}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.05, ease: [0.22, 0.61, 0.36, 1] }}
        />
        <motion.line
          x1="260"
          y1="210"
          x2="155"
          y2="308"
          initial={false}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1.15, ease: [0.22, 0.61, 0.36, 1] }}
        />
        <motion.line
          x1="260"
          y1="210"
          x2="260"
          y2="74"
          initial={false}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
        />
        <motion.line
          x1="260"
          y1="210"
          x2="260"
          y2="342"
          initial={false}
          animate={animate ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 1, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </g>

      <g>
        {[
          [135, 110],
          [380, 92],
          [410, 250],
          [155, 308],
          [260, 74],
          [260, 342],
        ].map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="9"
            fill="rgba(10,14,22,0.92)"
            stroke="rgba(34,197,94,0.72)"
            strokeWidth="2"
            initial={false}
            animate={animate ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0.45 }}
            transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 0.61, 0.36, 1] }}
          />
        ))}
        <motion.circle
          cx="260"
          cy="210"
          r="34"
          fill="rgba(255,255,255,0.04)"
          stroke="rgba(34,197,94,0.85)"
          strokeWidth="2"
          initial={false}
          animate={animate ? { scale: 1, opacity: 1 } : { scale: 0.95, opacity: 0.7 }}
          transition={{ duration: 0.75, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </g>
    </svg>
  )
}

function ClosingBand() {
  return (
    <section className="section-light bg-background text-foreground">
      <Container className="py-16 lg:py-20">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="mono text-[11px] tracking-[0.22em] uppercase text-[var(--muted-on-ivory)]">
              Next step
            </div>
            <h2 className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[0.98] tracking-[-0.03em] text-[var(--ink)]">
              Pick the strongest lane and I’ll turn it into the main homepage.
            </h2>
            <p className="mt-4 max-w-xl text-[15px] leading-[1.6] text-[var(--muted-on-ivory)]">
              The purpose of this lab is simple: keep the copy fixed, compare the
              hero attitudes, and then take the best one deeper.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 rounded-[2px] border border-[var(--ink-3)] bg-[var(--ivory-2)] px-5 py-3 text-[14px] font-medium tracking-tight text-[var(--ink)] transition-colors hover:bg-[var(--ivory)]"
            >
              Back to home
            </Link>
            <Link
              href="/request-a-demo/"
              className="inline-flex items-center gap-2 rounded-[2px] bg-[var(--green)] px-5 py-3 text-[14px] font-medium tracking-tight text-[var(--ivory-2)] transition-opacity hover:opacity-90"
            >
              Request a demo
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
