"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  ArrowUpRight,
  ChartColumn,
  Eye,
  Globe,
  Radar,
  ShieldCheck,
  Sparkles,
  Workflow,
} from "lucide-react"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"

import { Container } from "@/components/site/container"
import {
  BRAND_FULL_LOGO_SRC,
  BRAND_MARK_LOGO_SRC,
} from "@/components/v4/chrome"

const conceptLinks = [
  { id: "signal-field", code: "01", label: "Signal Field" },
  { id: "prism-stack", code: "02", label: "Prism Stack" },
  { id: "threat-atlas", code: "03", label: "Threat Atlas" },
] as const

const proofLabels = [
  "Control attestation",
  "OneView posture",
  "SOC automation",
  "MEA delivery",
] as const

export function LandingLab() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[var(--ink)] text-[var(--ivory)]">
        <LabHeader />
        <LabIntro />
        <ConceptRail />
        <main>
          <SignalFieldConcept />
          <PrismStackConcept />
          <ThreatAtlasConcept />
        </main>
        <LabFooter />
      </div>
    </MotionConfig>
  )
}

function LabHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[rgba(10,14,22,0.8)] backdrop-blur-2xl">
      <Container className="flex items-center justify-between gap-4 py-4">
        <Link href="/" className="inline-flex items-center gap-3">
          <span className="inline-flex rounded-[16px] bg-white/98 px-3 py-2 shadow-[0_16px_36px_rgba(0,0,0,0.22)]">
            <Image
              src={BRAND_FULL_LOGO_SRC}
              alt="Port443"
              width={960}
              height={610}
              className="h-auto w-[132px] md:w-[152px]"
              priority
            />
          </span>
        </Link>
        <div className="hidden lg:flex items-center gap-3 text-[12px] text-[var(--muted-on-ink)]">
          <span>Port443 v6</span>
          <span className="h-1 w-1 rounded-full bg-cyan-400" />
          <span>More color, less copy, deeper atmosphere</span>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="#threat-atlas"
            className="hidden sm:inline-flex items-center gap-2 text-[13px] text-[var(--muted-on-ink)] transition-colors hover:text-[var(--ivory)]"
          >
            Regional depth
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
          <Link
            href="/request-a-demo/"
            className="inline-flex items-center gap-2 rounded-[2px] bg-[var(--green)] px-4 py-2 text-[13px] font-medium tracking-tight text-[var(--ivory-2)] transition-opacity hover:opacity-90"
          >
            Request a demo
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </Container>
    </header>
  )
}

function LabIntro() {
  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(14,165,233,0.18),transparent_34%),radial-gradient(circle_at_80%_12%,rgba(250,204,21,0.16),transparent_22%),radial-gradient(circle_at_50%_100%,rgba(34,197,94,0.18),transparent_36%)]" />
      <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:96px_96px]" />
      <Container className="relative py-16 lg:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="mono text-[11px] uppercase tracking-[0.24em] text-cyan-300">
              Security operations, sharpened
            </div>
            <h1 className="mt-5 max-w-4xl text-[clamp(2.6rem,6vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.04em]">
              Three visual temperatures,
              <span className="block text-white/72">one sharper Port443 presence.</span>
            </h1>
          </div>
          <div className="grid gap-4">
            <p className="max-w-xl text-[15px] leading-[1.65] text-[var(--muted-on-ink)]">
              Port443 now opens with stronger depth, faster visual proof, and a
              more immersive sense of operational control across every scroll beat.
            </p>
            <div className="flex flex-wrap gap-2">
              {["More temperature shifts", "Tighter copy blocks", "Stronger visual layers", "Less brochure energy"].map(
                (label) => (
                  <span
                    key={label}
                    className="inline-flex items-center rounded-full border border-white/12 bg-white/6 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-white/72"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function ConceptRail() {
  return (
    <div className="sticky top-[81px] z-40 border-b border-white/10 bg-[rgba(10,14,22,0.72)] backdrop-blur-xl">
      <Container className="flex items-center gap-2 overflow-x-auto py-3">
        {conceptLinks.map((link) => (
          <a
            key={link.id}
            href={`#${link.id}`}
            className="inline-flex min-w-max items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-2 text-[12px] text-white/72 transition-colors hover:text-white"
          >
            <span className="mono text-[10px] tracking-[0.18em] text-cyan-300">
              {link.code}
            </span>
            {link.label}
          </a>
        ))}
      </Container>
    </div>
  )
}

function SignalFieldConcept() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="signal-field"
      className="scroll-mt-28 border-b border-white/10 bg-[#06111f] text-white"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_24%,rgba(14,165,233,0.22),transparent_26%),radial-gradient(circle_at_84%_14%,rgba(34,197,94,0.16),transparent_20%),linear-gradient(180deg,#07111e_0%,#081a2b_55%,#08131f_100%)]" />
        <div className="absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:84px_84px]" />
        <Container className="relative py-20 lg:py-28">
          <ConceptHeader
            code="01"
            title="Signal Field"
            description="Sharper, colder, and more operational. This direction compresses the story, adds cyan and amber energy, and makes the product surface feel alive instead of parked."
            chips={["Wiz split hero", "Material-style brevity", "More color depth"]}
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div className="max-w-2xl">
              <EyebrowLine tone="cyan">Operational security, not brochure security</EyebrowLine>
              <h2 className="mt-6 text-[clamp(3rem,6.8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                See drift.
                <span className="block text-cyan-300">Close it fast.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-[1.65] text-white/72">
                A landing page with less explanation and more immediate signal:
                posture, evidence, flow, and region are all visible in the first
                screen.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryLabCta href="/request-a-demo/" accent="cyan">
                  Request a demo
                </PrimaryLabCta>
                <SecondaryLabCta href="#signal-field-depth">
                  Explore the flow
                </SecondaryLabCta>
              </div>
              <div className="mt-10 flex flex-wrap gap-2">
                {proofLabels.map((label, index) => (
                  <ChipPill
                    key={label}
                    label={label}
                    accent={index === 0 ? "cyan" : index === 1 ? "green" : "amber"}
                    animate={!reduceMotion && index === 0}
                  />
                ))}
              </div>
            </div>
            <SignalFieldSurface />
          </div>
        </Container>
      </div>

      <div id="signal-field-depth" className="border-t border-white/10 bg-[#081928]">
        <Container className="py-14 lg:py-16">
          <div className="grid gap-px overflow-hidden rounded-[24px] border border-white/10 bg-white/10 lg:grid-cols-3">
            <SignalPanel
              icon={Eye}
              title="Observe in one frame"
              body="Board posture, live evidence, and operational state are visible without scrolling through a brochure stack."
              accent="cyan"
            />
            <SignalPanel
              icon={Workflow}
              title="Route the next action"
              body="The page leans into sequence: identify, respond, verify. Less exposition, more obvious next step."
              accent="amber"
            />
            <SignalPanel
              icon={ShieldCheck}
              title="Show proof early"
              body="Frameworks, coverage, and audit-readiness surface above the fold instead of being buried later."
              accent="green"
            />
          </div>
        </Container>
      </div>
    </section>
  )
}

function SignalFieldSurface() {
  const reduceMotion = useReducedMotion()

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-cyan-400/20 bg-[#08111a]/92 p-6 shadow-[0_40px_100px_rgba(3,105,161,0.26)]">
      <motion.div
        className="absolute -top-10 right-12 h-40 w-40 rounded-full bg-cyan-400/14 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, 18, 0], x: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-8 left-10 h-28 w-28 rounded-full bg-amber-300/14 blur-3xl"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="relative flex items-center justify-between gap-4 text-[11px] uppercase tracking-[0.18em] text-white/56">
        <span className="inline-flex items-center gap-2">
          <span className="inline-flex rounded-[8px] bg-white/96 p-1">
            <Image
              src={BRAND_MARK_LOGO_SRC}
              alt=""
              width={360}
              height={389}
              className="h-auto w-[14px]"
            />
          </span>
          Signal field
        </span>
        <span className="mono text-cyan-300">live posture</span>
      </div>

      <div className="relative mt-6 grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
        <div className="rounded-[22px] border border-white/10 bg-[#07141f] p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/48">
                Security posture
              </div>
              <div className="mt-2 text-[40px] font-semibold tracking-[-0.04em]">
                92<span className="text-cyan-300">%</span>
              </div>
            </div>
            <div className="rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-cyan-200">
              evidence sealed
            </div>
          </div>
          <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
            <motion.div
              className="h-full rounded-full bg-[linear-gradient(90deg,#22d3ee,#38bdf8,#22c55e)]"
              animate={reduceMotion ? { width: "82%" } : { width: ["68%", "82%", "78%"] }}
              transition={{
                duration: 5.4,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "mirror",
                ease: "easeInOut",
              }}
            />
          </div>
          <div className="mt-6 grid gap-3">
            {[
              ["PCI-DSS 4.0", "attestation active", "cyan"],
              ["NIST CSF 2.0", "delta mapped", "green"],
              ["CIS v8", "control chain intact", "amber"],
            ].map(([name, state, tone]) => (
              <div
                key={name}
                className="flex items-center justify-between rounded-[18px] border border-white/8 bg-white/4 px-4 py-3"
              >
                <span className="text-[13px] font-medium tracking-tight">{name}</span>
                <span
                  className={[
                    "rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em]",
                    tone === "cyan" && "bg-cyan-300/10 text-cyan-200",
                    tone === "green" && "bg-emerald-300/10 text-emerald-200",
                    tone === "amber" && "bg-amber-300/10 text-amber-200",
                  ].join(" ")}
                >
                  {state}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-[22px] border border-white/10 bg-white/4 p-5">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-white/52">
              <Radar className="h-4 w-4 text-cyan-300" />
              Hot path
            </div>
            <div className="mt-4 grid gap-3">
              {["Observe", "Remediate", "Verify"].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-[16px] border border-white/8 bg-[#08111a] px-4 py-3"
                >
                  <span className="mono text-[10px] tracking-[0.18em] text-cyan-300">
                    0{index + 1}
                  </span>
                  <span className="text-[13px] font-medium">{step}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[22px] border border-white/10 bg-white/4 p-5">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/48">
              Why it is stronger
            </div>
            <p className="mt-3 text-[14px] leading-[1.6] text-white/70">
              Shorter copy, colder palette, more active surface, and a better
              balance between calm trust and machine-speed energy.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

function PrismStackConcept() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="prism-stack"
      className="scroll-mt-28 border-b border-[#d6dde8] bg-[#eef4fb] text-[#06101a]"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_18%,rgba(56,189,248,0.18),transparent_22%),radial-gradient(circle_at_86%_18%,rgba(245,158,11,0.18),transparent_18%),linear-gradient(180deg,#eef4fb_0%,#e5eef8_52%,#f8fbfe_100%)]" />
        <Container className="relative py-20 lg:py-28">
          <ConceptHeader
            code="02"
            title="Prism Stack"
            description="Lighter, more executive, and more premium. This direction uses layered color panes and stronger depth so the page feels less monochrome and less defensive."
            chips={["Executive trust", "Light-mode depth", "Fewer words per beat"]}
            dark={false}
          />
          <div className="mt-12 grid gap-10 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
            <div className="max-w-2xl">
              <EyebrowLine tone="blue" dark={false}>
                More boardroom, less brochure
              </EyebrowLine>
              <h2 className="mt-6 text-[clamp(3rem,6.4vw,5.8rem)] font-semibold leading-[0.92] tracking-[-0.05em] text-[#07121e]">
                Security clarity
                <span className="block text-[#0f6bde]">with more depth.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-[1.65] text-[#445468]">
                The message is still Port443, but the landing page behaves more
                like a premium platform brand: shorter claims, richer glass depth,
                stronger light-dark temperature changes, cleaner hierarchy.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryLabCta href="/request-a-demo/" accent="blue" light>
                  Request a demo
                </PrimaryLabCta>
                <SecondaryLabCta href="#prism-stack-depth" dark={false}>
                  See section rhythm
                </SecondaryLabCta>
              </div>
            </div>
            <PrismSurface animate={!reduceMotion} />
          </div>
        </Container>
      </div>

      <div id="prism-stack-depth" className="border-t border-[#d6dde8] bg-white">
        <Container className="py-14 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <div className="overflow-hidden rounded-[28px] border border-[#dde6f0] bg-[#07121d] text-white">
              <div className="grid gap-6 p-6 lg:grid-cols-[0.88fr_1.12fr] lg:items-center">
                <div>
                  <div className="text-[11px] uppercase tracking-[0.18em] text-cyan-300">
                    Temperature shift
                  </div>
                  <h3 className="mt-4 text-[32px] font-semibold leading-[1.02] tracking-[-0.04em]">
                    Dark middle bands
                    <span className="block text-white/68">make the page feel deeper.</span>
                  </h3>
                </div>
                <div className="grid gap-3">
                  {["Hero: pale, precise, premium", "Middle: dark, analytical, confident", "Close: bright, decisive, calm"].map(
                    (row) => (
                      <div
                        key={row}
                        className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 text-[13px] text-white/72"
                      >
                        {row}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
            <div className="rounded-[28px] border border-[#dde6f0] bg-[#f7fbff] p-6">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#50708f]">
                <Sparkles className="h-4 w-4 text-[#0f6bde]" />
                Why it works
              </div>
              <div className="mt-5 grid gap-4">
                <BenefitRow
                  title="Less word count"
                  body="Each section carries one promise and one surface, not multiple paragraphs explaining the same point."
                  dark={false}
                />
                <BenefitRow
                  title="More color vocabulary"
                  body="Cobalt, cyan, amber, green, and near-black create more emotional range without losing seriousness."
                  dark={false}
                />
                <BenefitRow
                  title="More premium depth"
                  body="Layered panes, soft perspective, and material shifts make the site feel more authored."
                  dark={false}
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

function PrismSurface({ animate }: { animate: boolean }) {
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-[32px] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.85),rgba(240,246,251,0.98))] p-6 shadow-[0_38px_90px_rgba(15,107,222,0.18)]">
      <motion.div
        className="absolute -top-6 right-8 h-44 w-44 rounded-full bg-cyan-300/28 blur-3xl"
        animate={animate ? { x: [0, -10, 0], y: [0, 14, 0] } : undefined}
        transition={{ duration: 5.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-10 h-36 w-36 rounded-full bg-amber-300/22 blur-3xl"
        animate={animate ? { y: [0, -16, 0] } : undefined}
        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />

      <div className="relative flex items-center justify-between gap-3">
        <div className="inline-flex rounded-[14px] bg-white px-3 py-2 shadow-[0_14px_30px_rgba(0,0,0,0.08)]">
          <Image
            src={BRAND_FULL_LOGO_SRC}
            alt="Port443"
            width={960}
            height={610}
            className="h-auto w-[138px]"
          />
        </div>
        <div className="rounded-full border border-[#cdd9e8] bg-white/70 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[#58718b]">
          premium platform look
        </div>
      </div>

      <div className="relative mt-8 grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="grid gap-4">
          <div className="rounded-[24px] border border-[#d9e4ef] bg-white/84 p-5 shadow-[0_18px_36px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#5a7087]">
              Control attestation
            </div>
            <div className="mt-3 text-[34px] font-semibold tracking-[-0.04em] text-[#07121e]">
              One evidence chain.
            </div>
            <p className="mt-3 max-w-sm text-[14px] leading-[1.6] text-[#4d6278]">
              Readable enough for the board. Detailed enough for the SOC.
            </p>
          </div>
          <div className="rounded-[24px] border border-[#d9e4ef] bg-[linear-gradient(180deg,#0b1623,#102437)] p-5 text-white shadow-[0_24px_50px_rgba(2,6,23,0.22)]">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-cyan-300">
              <ChartColumn className="h-4 w-4" />
              OneView
            </div>
            <div className="mt-4 grid gap-3">
              {[
                "Posture aligned",
                "Drift visible",
                "Ownership clear",
                "Reporting ready",
              ].map((label) => (
                <div
                  key={label}
                  className="rounded-[16px] border border-white/10 bg-white/6 px-4 py-3 text-[13px] text-white/78"
                >
                  {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="relative overflow-hidden rounded-[26px] border border-[#d9e4ef] bg-white/86 p-5 shadow-[0_18px_36px_rgba(15,23,42,0.06)]">
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.10),transparent_42%,rgba(245,158,11,0.10))]" />
            <div className="relative flex items-start justify-between gap-4">
              <div>
                <div className="text-[11px] uppercase tracking-[0.18em] text-[#58708a]">
                  Regional depth
                </div>
                <div className="mt-2 text-[26px] font-semibold leading-[1.02] tracking-[-0.04em] text-[#07121e]">
                  MEA context stays
                  <span className="block text-[#0f6bde]">in the first story.</span>
                </div>
              </div>
              <div className="rounded-full bg-[#0f6bde]/10 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-[#0f6bde]">
                not generic
              </div>
            </div>
            <div className="relative mt-6 overflow-hidden rounded-[20px] border border-[#d9e4ef]">
              <Image
                src="/port443-v6/about-1.jpg"
                alt=""
                width={245129}
                height={1600}
                className="h-[220px] w-full object-cover"
              />
            </div>
          </div>
          <div className="rounded-[26px] border border-[#d9e4ef] bg-white/84 p-5 shadow-[0_18px_36px_rgba(15,23,42,0.06)]">
            <div className="text-[11px] uppercase tracking-[0.18em] text-[#58708a]">
              Copy stance
            </div>
            <div className="mt-3 grid gap-3">
              <PrismCopyLine label="Short claim" tone="blue" />
              <PrismCopyLine label="One proof row" tone="cyan" />
              <PrismCopyLine label="One action per band" tone="amber" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ThreatAtlasConcept() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="threat-atlas"
      className="scroll-mt-28 border-b border-white/10 bg-[#070b14] text-white"
    >
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_18%,rgba(59,130,246,0.20),transparent_22%),radial-gradient(circle_at_20%_26%,rgba(217,70,239,0.12),transparent_18%),radial-gradient(circle_at_84%_22%,rgba(250,204,21,0.12),transparent_20%),linear-gradient(180deg,#070b14_0%,#091222_55%,#090d16_100%)]" />
        <Container className="relative py-20 lg:py-28">
          <ConceptHeader
            code="03"
            title="Threat Atlas"
            description="The most cinematic option. Bigger atmosphere, bigger spatial depth, more world-scale feeling. Still readable, but more memorable than standard cyber B2B pages."
            chips={["Cloudflare density", "Datadog platform feel", "More cinematic"]}
          />
          <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div className="max-w-2xl">
              <EyebrowLine tone="violet">A wider, more memorable first impression</EyebrowLine>
              <h2 className="mt-6 text-[clamp(3rem,6.8vw,6rem)] font-semibold leading-[0.9] tracking-[-0.05em]">
                Security posture
                <span className="block text-[#93c5fd]">with planetary scale.</span>
              </h2>
              <p className="mt-6 max-w-lg text-[16px] leading-[1.65] text-white/70">
                This direction feels less like a services page and more like an
                operating cloud. The hero is bigger, the surfaces are more spatial,
                and the palette stretches beyond dark green into blue, violet, and gold.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <PrimaryLabCta href="/request-a-demo/" accent="blue">
                  Request a demo
                </PrimaryLabCta>
                <SecondaryLabCta href="#threat-atlas-depth">
                  See the architecture
                </SecondaryLabCta>
              </div>
            </div>
            <ThreatAtlasSurface animate={!reduceMotion} />
          </div>
        </Container>
      </div>

      <div id="threat-atlas-depth" className="border-t border-white/10 bg-[#08111c]">
        <Container className="py-14 lg:py-16">
          <div className="grid gap-6 lg:grid-cols-3">
            <BenefitRow
              title="Bigger emotional range"
              body="The page stops feeling like two-color cyber SaaS and starts feeling like a high-scale security platform."
            />
            <BenefitRow
              title="Clearer hierarchy"
              body="Each band has stronger contrast and more visual temperature change, so the page earns more scroll momentum."
            />
            <BenefitRow
              title="Less boring density"
              body="Information is still present, but it is staged into atlas, platform, and command layers instead of one long tone."
            />
          </div>
        </Container>
      </div>
    </section>
  )
}

function ThreatAtlasSurface({ animate }: { animate: boolean }) {
  return (
    <div className="relative min-h-[560px] overflow-hidden rounded-[32px] border border-white/10 bg-[#08101b] p-6 shadow-[0_46px_120px_rgba(15,23,42,0.34)]">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_32%,rgba(255,255,255,0.02))]" />
      <motion.div
        className="absolute left-1/2 top-[16%] h-44 w-44 -translate-x-1/2 rounded-full bg-blue-400/14 blur-3xl"
        animate={animate ? { scale: [1, 1.12, 1], opacity: [0.48, 0.72, 0.48] } : undefined}
        transition={{ duration: 5.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <div className="relative flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-white/62">
          <Globe className="h-4 w-4 text-blue-300" />
          Threat atlas
        </div>
        <div className="inline-flex rounded-[10px] bg-white/96 px-2 py-1.5">
          <Image
            src={BRAND_MARK_LOGO_SRC}
            alt=""
            width={360}
            height={389}
            className="h-auto w-6"
          />
        </div>
      </div>

      <div className="relative mt-8 h-[360px] overflow-hidden rounded-[26px] border border-white/10 bg-[radial-gradient(circle_at_center,rgba(96,165,250,0.10),transparent_38%),linear-gradient(180deg,rgba(9,15,27,0.62),rgba(9,13,22,0.94))]">
        <AtlasGrid animate={animate} />
        <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-300/20 bg-[#0a1220]/90 px-5 py-4 text-center backdrop-blur-md">
          <div className="mono text-[10px] tracking-[0.2em] text-blue-300">
            PORT443
          </div>
          <div className="mt-1 text-[13px] font-medium">security evidence</div>
        </div>
        <div className="absolute inset-x-5 bottom-5 grid gap-3 md:grid-cols-3">
          {[
            ["Observe", "signals aligned"],
            ["Remediate", "owners in flow"],
            ["Verify", "evidence sealed"],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-[18px] border border-white/10 bg-white/6 px-4 py-3 backdrop-blur-sm"
            >
              <div className="text-[11px] uppercase tracking-[0.18em] text-white/54">
                {title}
              </div>
              <div className="mt-1 text-[13px] font-medium text-white/82">{body}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mt-5 grid gap-px overflow-hidden rounded-[22px] border border-white/10 bg-white/10 lg:grid-cols-4">
        {[
          ["Cobalt scale", "Platform gravity"],
          ["Violet edge", "Memorable atmosphere"],
          ["Amber cues", "Human warmth"],
          ["Green CTA", "Brand continuity"],
        ].map(([title, body]) => (
          <div key={title} className="bg-[#0a1320] px-4 py-4">
            <div className="text-[11px] uppercase tracking-[0.18em] text-white/50">
              {title}
            </div>
            <div className="mt-2 text-[13px] text-white/76">{body}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AtlasGrid({ animate }: { animate: boolean }) {
  const nodes = [
    [88, 66],
    [168, 108],
    [242, 72],
    [332, 122],
    [412, 88],
    [468, 158],
    [126, 212],
    [224, 184],
    [318, 228],
    [422, 216],
    [160, 292],
    [260, 306],
    [370, 286],
  ] as const

  const lines = [
    [88, 66, 168, 108],
    [168, 108, 242, 72],
    [242, 72, 332, 122],
    [332, 122, 412, 88],
    [412, 88, 468, 158],
    [168, 108, 224, 184],
    [224, 184, 318, 228],
    [318, 228, 422, 216],
    [126, 212, 224, 184],
    [126, 212, 160, 292],
    [160, 292, 260, 306],
    [260, 306, 370, 286],
    [318, 228, 370, 286],
  ] as const

  return (
    <svg viewBox="0 0 520 360" className="absolute inset-0 h-full w-full" aria-hidden="true">
      <defs>
        <filter id="atlasGlow">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <g filter="url(#atlasGlow)">
        {lines.map(([x1, y1, x2, y2], index) => (
          <motion.line
            key={`${x1}-${y1}-${x2}-${y2}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="rgba(96,165,250,0.56)"
            strokeWidth="1.8"
            initial={false}
            animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.72 }}
            transition={{ duration: 0.7 + index * 0.04, ease: "easeOut" }}
          />
        ))}
        {nodes.map(([cx, cy], index) => (
          <motion.circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4.5"
            fill={index % 3 === 0 ? "#f59e0b" : index % 2 === 0 ? "#c084fc" : "#60a5fa"}
            initial={false}
            animate={animate ? { scale: [1, 1.18, 1], opacity: [0.8, 1, 0.8] } : undefined}
            transition={{
              duration: 3.2 + index * 0.1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </g>
    </svg>
  )
}

function ConceptHeader({
  code,
  title,
  description,
  chips,
  dark = true,
}: {
  code: string
  title: string
  description: string
  chips: string[]
  dark?: boolean
}) {
  return (
    <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
      <div>
        <div
          className={[
            "mono text-[11px] uppercase tracking-[0.22em]",
            dark ? "text-white/48" : "text-[#607a94]",
          ].join(" ")}
        >
          {code} / Concept
        </div>
        <h2
          className={[
            "mt-4 text-[clamp(2rem,4vw,3.6rem)] font-semibold leading-[0.96] tracking-[-0.04em]",
            dark ? "text-white" : "text-[#07121e]",
          ].join(" ")}
        >
          {title}
        </h2>
      </div>
      <div className="grid gap-4">
        <p className={dark ? "text-[15px] leading-[1.65] text-white/68" : "text-[15px] leading-[1.65] text-[#4b5f74]"}>
          {description}
        </p>
        <div className="flex flex-wrap gap-2">
          {chips.map((chip) => (
            <span
              key={chip}
              className={[
                "inline-flex items-center rounded-full px-3 py-2 text-[11px] uppercase tracking-[0.16em]",
                dark
                  ? "border border-white/10 bg-white/4 text-white/68"
                  : "border border-[#d6e0eb] bg-white/72 text-[#5a7188]",
              ].join(" ")}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

function EyebrowLine({
  children,
  tone,
  dark = true,
}: {
  children: React.ReactNode
  tone: "cyan" | "blue" | "violet"
  dark?: boolean
}) {
  const toneClass =
    tone === "cyan"
      ? "bg-cyan-300"
      : tone === "blue"
        ? "bg-[#0f6bde]"
        : "bg-violet-300"

  return (
    <div
      className={[
        "inline-flex items-center gap-2 mono text-[11px] uppercase tracking-[0.22em]",
        dark ? "text-white/56" : "text-[#5b7288]",
      ].join(" ")}
    >
      <span className={`h-px w-8 ${toneClass}`} />
      {children}
    </div>
  )
}

function PrimaryLabCta({
  href,
  children,
  accent,
  light = false,
}: {
  href: string
  children: React.ReactNode
  accent: "cyan" | "green" | "amber" | "blue"
  light?: boolean
}) {
  const className =
    accent === "cyan"
      ? "bg-cyan-400 text-slate-950"
      : accent === "amber"
        ? "bg-amber-300 text-slate-950"
        : accent === "blue"
          ? light
            ? "bg-[#0f6bde] text-white"
            : "bg-blue-400 text-slate-950"
          : "bg-[var(--green)] text-[var(--ivory-2)]"

  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-[2px] px-5 py-3 text-[14px] font-medium tracking-tight transition-opacity hover:opacity-90 ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </Link>
  )
}

function SecondaryLabCta({
  href,
  children,
  dark = true,
}: {
  href: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <a
      href={href}
      className={[
        "inline-flex items-center gap-2 text-[14px] font-medium tracking-tight transition-colors",
        dark ? "text-white/76 hover:text-white" : "text-[#20354d] hover:text-[#0f6bde]",
      ].join(" ")}
    >
      {children}
      <ArrowUpRight className="h-4 w-4" />
    </a>
  )
}

function ChipPill({
  label,
  accent,
  animate = false,
}: {
  label: string
  accent: "cyan" | "green" | "amber"
  animate?: boolean
}) {
  const bg =
    accent === "cyan"
      ? "border-cyan-300/18 bg-cyan-300/8 text-cyan-100"
      : accent === "green"
        ? "border-emerald-300/18 bg-emerald-300/8 text-emerald-100"
        : "border-amber-300/18 bg-amber-300/8 text-amber-100"

  return (
    <motion.span
      className={`inline-flex items-center rounded-full border px-3 py-2 text-[11px] uppercase tracking-[0.16em] ${bg}`}
      animate={animate ? { y: [0, -2, 0] } : undefined}
      transition={animate ? { duration: 3.8, repeat: Number.POSITIVE_INFINITY } : undefined}
    >
      {label}
    </motion.span>
  )
}

function SignalPanel({
  icon: Icon,
  title,
  body,
  accent,
}: {
  icon: typeof Eye
  title: string
  body: string
  accent: "cyan" | "amber" | "green"
}) {
  const iconClass =
    accent === "cyan"
      ? "text-cyan-300"
      : accent === "amber"
        ? "text-amber-300"
        : "text-emerald-300"

  return (
    <div className="bg-[#0c1d2d] p-6">
      <div className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] ${iconClass}`}>
        <Icon className="h-4 w-4" />
        {title}
      </div>
      <p className="mt-4 max-w-sm text-[14px] leading-[1.65] text-white/72">{body}</p>
    </div>
  )
}

function BenefitRow({
  title,
  body,
  dark = true,
}: {
  title: string
  body: string
  dark?: boolean
}) {
  return (
    <div
      className={[
        "rounded-[24px] border p-5",
        dark
          ? "border-white/10 bg-white/4"
          : "border-[#d9e4ef] bg-white/80",
      ].join(" ")}
    >
      <div
        className={[
          "text-[12px] uppercase tracking-[0.18em]",
          dark ? "text-white/50" : "text-[#5c7288]",
        ].join(" ")}
      >
        {title}
      </div>
      <p
        className={[
          "mt-3 text-[14px] leading-[1.65]",
          dark ? "text-white/72" : "text-[#4c6176]",
        ].join(" ")}
      >
        {body}
      </p>
    </div>
  )
}

function PrismCopyLine({
  label,
  tone,
}: {
  label: string
  tone: "blue" | "cyan" | "amber"
}) {
  const toneClass =
    tone === "blue"
      ? "bg-[#0f6bde]/10 text-[#0f6bde]"
      : tone === "cyan"
        ? "bg-cyan-400/10 text-cyan-700"
        : "bg-amber-300/18 text-amber-700"

  return (
    <div className="flex items-center justify-between rounded-[16px] border border-[#d9e4ef] bg-white px-4 py-3">
      <span className="text-[13px] font-medium tracking-tight text-[#07121e]">{label}</span>
      <span className={`rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] ${toneClass}`}>
        active
      </span>
    </div>
  )
}

function LabFooter() {
  return (
    <section className="border-t border-white/10 bg-[#06101a]">
      <Container className="py-14 lg:py-16">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <div className="mono text-[11px] uppercase tracking-[0.22em] text-white/44">
              Next move
            </div>
            <h2 className="mt-4 text-[clamp(2rem,4vw,3.2rem)] font-semibold leading-[0.96] tracking-[-0.04em]">
              A higher-depth Port443 landing page, built to feel faster, clearer, and more immersive.
            </h2>
            <p className="mt-4 text-[15px] leading-[1.65] text-white/66">
              V6 keeps the richer color temperature, shorter copy blocks, and stronger product presence from the landing exploration.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/services/"
              className="inline-flex items-center gap-2 rounded-[2px] border border-white/12 bg-white/4 px-5 py-3 text-[14px] font-medium tracking-tight text-white/84 transition-colors hover:bg-white/8"
            >
              Explore services
            </Link>
            <Link
              href="/request-a-demo/"
              className="inline-flex items-center gap-2 rounded-[2px] border border-cyan-300/20 bg-cyan-300/8 px-5 py-3 text-[14px] font-medium tracking-tight text-cyan-100 transition-colors hover:bg-cyan-300/12"
            >
              Request a demo
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
