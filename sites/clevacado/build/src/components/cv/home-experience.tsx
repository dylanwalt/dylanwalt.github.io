"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useInView, useScroll, useTransform, MotionConfig } from "framer-motion"
import { Container } from "@/components/site/container"

/* ── Shared fade-reveal helper ─────────────────────────────────── */
function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ── Telemetry data feed (hero right panel) ────────────────────── */
const TELEMETRY_LINES = [
  "ACC_X:  +0.12g  ACC_Y: -0.08g  ACC_Z: +9.81g",
  "VIB:    14.3 Hz  ROT_Z:  +2.1°/s",
  "STAGE:  HARVEST  LOC: FIELD-07",
  "SHOCK:  0.34g    TEMP:  24.1°C",
  "ACC_X:  -0.55g  ACC_Y: +1.22g  ACC_Z: +9.63g",
  "VIB:    31.7 Hz  ROT_Z: -5.4°/s",
  "STAGE:  BINS     LOC: PACKHOUSE-A",
  "SHOCK:  1.87g    ALERT: THRESHOLD EXCEEDED",
  "ACC_X:  +0.03g  ACC_Y: +0.07g  ACC_Z: +9.79g",
  "VIB:    22.1 Hz  ROT_Z:  +0.3°/s",
  "STAGE:  SORTING  LOC: LINE-3",
  "SHOCK:  2.41g    RISK:  HIGH",
  "ACC_X:  -0.18g  ACC_Y: +0.11g  ACC_Z: +9.74g",
  "VIB:     9.8 Hz  ROT_Z:  -1.1°/s",
  "STAGE:  TRANSPORT LOC: ROUTE-12",
  "SHOCK:  0.61g    TEMP:  8.3°C",
  "ACC_X:  +0.02g  ACC_Y: -0.03g  ACC_Z: +9.80g",
  "VIB:     4.2 Hz  ROT_Z:  +0.0°/s",
  "STAGE:  REPORT   STATUS: DIAGNOSTIC COMPLETE",
  "BRUISE ORIGIN: SORTING LINE-3  CONFIDENCE: 94%",
]

function TelemetryPanel() {
  const doubled = [...TELEMETRY_LINES, ...TELEMETRY_LINES]
  return (
    <div className="relative h-72 md:h-96 overflow-hidden border border-[#2d6a4f]/40 bg-[#060e08]/80 font-mono text-[11px] leading-6 text-[#74c69d]">
      <div className="absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-[#060e08] to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#060e08] to-transparent z-10 pointer-events-none" />
      <div className="data-feed-inner px-4 py-2">
        {doubled.map((line, i) => (
          <div key={i} className="whitespace-nowrap">
            <span className="text-[#2d6a4f] mr-2 select-none">{String(i % TELEMETRY_LINES.length).padStart(3, "0")} &gt;</span>
            <span className={line.includes("ALERT") || line.includes("HIGH") || line.includes("BRUISE") ? "text-[#fbbf24]" : ""}>{line}</span>
          </div>
        ))}
      </div>
      <div className="absolute bottom-2 left-4 text-[#2d6a4f]">
        <span>_</span>
        <span className="cursor-blink">█</span>
      </div>
    </div>
  )
}

/* ── CinematicHero ─────────────────────────────────────────────── */
function CinematicHero() {
  const words = ["Where", "did", "the", "damage", "happen?"]

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden noise-overlay"
      style={{ backgroundColor: "#0d1a0f" }}
    >
      {/* Avocado skin texture gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 30%, #162b1b 0%, transparent 70%), radial-gradient(ellipse 50% 80% at 20% 80%, #1c3322 0%, transparent 60%)",
        }}
      />

      {/* Animated scan line */}
      <div className="scan-line" />

      {/* Nav */}
      <nav className="relative z-20 px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
            <ellipse cx="18" cy="20" rx="11" ry="14" stroke="#74c69d" strokeWidth="1.5" />
            <ellipse cx="18" cy="14" rx="5" ry="6" fill="#4a7c59" />
            <line x1="18" y1="8" x2="18" y2="2" stroke="#74c69d" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="18" cy="22" r="2.5" fill="#74c69d" />
          </svg>
          <div>
            <div className="font-display text-white font-semibold text-lg tracking-tight">ClevaCado</div>
            <div className="font-mono text-[9px] text-[#74c69d]/70 tracking-widest uppercase">Post-Harvest Diagnostics</div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm text-white/60 font-mono">
          <a href="#device" className="hover:text-[#74c69d] transition-colors">Device</a>
          <a href="#journey" className="hover:text-[#74c69d] transition-colors">Journey</a>
          <a href="#analytics" className="hover:text-[#74c69d] transition-colors">Analytics</a>
          <a
            href="mailto:dylanwalt10@gmail.com?subject=Pilot Request"
            className="border border-[#74c69d]/60 text-[#74c69d] px-4 py-1.5 hover:bg-[#74c69d]/10 transition-colors"
          >
            Request a Pilot
          </a>
        </div>
      </nav>

      {/* Hero content */}
      <div className="relative z-20 flex-1 flex items-center">
        <Container>
          <div className="grid md:grid-cols-2 gap-12 items-center py-16 md:py-24">
            {/* Left: headline + sub + CTA */}
            <div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-[#74c69d] text-xs tracking-[0.2em] uppercase mb-6"
              >
                Diagnostic Telemetry System — v2.4
              </motion.div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-[1.05] mb-6">
                {words.map((word, i) => (
                  <motion.span
                    key={word}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + i * 0.1, ease: "easeOut" }}
                    className="inline-block mr-[0.25em]"
                  >
                    {word}
                  </motion.span>
                ))}
              </h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
                className="text-white/60 text-lg leading-relaxed mb-8 max-w-md"
              >
                A single diagnostic device enters the avocado supply chain with the fruit — capturing 3-axis shock, vibration, and rotation data across every stage. When the bruise surfaces, you already know who caused it.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1, ease: "easeOut" }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="mailto:dylanwalt10@gmail.com?subject=Pilot Request"
                  className="inline-block bg-[#2d6a4f] text-white px-8 py-3.5 text-sm font-mono tracking-wider hover:bg-[#4a7c59] transition-colors"
                >
                  REQUEST A PILOT
                </a>
                <a
                  href="#device"
                  className="inline-block border border-white/20 text-white/70 px-8 py-3.5 text-sm font-mono tracking-wider hover:border-white/40 hover:text-white transition-colors"
                >
                  SEE THE DEVICE
                </a>
              </motion.div>
            </div>

            {/* Right: telemetry panel */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
              <div className="font-mono text-[10px] text-[#2d6a4f] mb-2 flex items-center gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#74c69d] pulse-dot" />
                LIVE TELEMETRY STREAM
              </div>
              <TelemetryPanel />
              <div className="mt-3 font-mono text-[10px] text-white/30 flex justify-between">
                <span>3-AXIS SHOCK + VIBRATION + ROTATION</span>
                <span>SAMPLING: 200Hz</span>
              </div>
            </motion.div>
          </div>
        </Container>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="relative z-20 pb-8 flex flex-col items-center gap-2"
      >
        <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase">Scroll to discover</div>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-10 bg-gradient-to-b from-[#74c69d]/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}

/* ── ProblemStatement ──────────────────────────────────────────── */
function ProblemStatement() {
  return (
    <section className="section-cream py-24 md:py-36 relative overflow-hidden">
      {/* Avocado cross-section texture */}
      <div
        className="absolute right-0 top-0 bottom-0 w-1/2 pointer-events-none opacity-5"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 80% 50%, #2d6a4f 0%, #4a7c59 40%, #1c3322 70%, transparent 100%)",
        }}
      />
      <Container>
        <div className="max-w-3xl">
          <Reveal>
            <div className="font-mono text-[11px] text-[#5c6b5a] tracking-[0.2em] uppercase mb-8">
              The Problem
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <blockquote className="font-display text-4xl md:text-5xl lg:text-6xl text-[#1c1c14] leading-[1.1] mb-10">
              "By the time the bruise shows, the data is gone."
            </blockquote>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  stat: "30–40%",
                  label: "Post-harvest loss",
                  desc: "Of global avocado production is lost to handling damage — invisible until it's too late.",
                },
                {
                  stat: "0",
                  label: "Stage accountability",
                  desc: "Without continuous telemetry, no one knows which handling stage caused the damage.",
                },
                {
                  stat: "Days",
                  label: "Until bruise surfaces",
                  desc: "By the time internal bruising becomes visible, the fruit has already failed the market.",
                },
              ].map((item, i) => (
                <Reveal key={item.label} delay={0.15 * i}>
                  <div className="border-l-2 border-[#2d6a4f] pl-5">
                    <div className="font-display text-4xl text-[#1c1c14] mb-1">{item.stat}</div>
                    <div className="font-mono text-xs text-[#5c6b5a] uppercase tracking-widest mb-2">{item.label}</div>
                    <div className="text-sm text-[#5c6b5a] leading-relaxed">{item.desc}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}

/* ── DeviceIntro ───────────────────────────────────────────────── */
function DeviceIntro() {
  return (
    <section id="device" className="section-dark py-24 md:py-36 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, #162b1b 0%, transparent 70%)",
        }}
      />
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Device diagram */}
          <Reveal>
            <div className="relative">
              <svg viewBox="0 0 360 360" className="w-full max-w-sm mx-auto" fill="none">
                {/* Outer casing */}
                <rect x="80" y="60" width="200" height="240" rx="20" stroke="#2d6a4f" strokeWidth="1.5" fill="#0d1a0f" />
                <rect x="88" y="68" width="184" height="224" rx="14" stroke="#1c3322" strokeWidth="1" fill="#060e08" />

                {/* Screen */}
                <rect x="100" y="80" width="160" height="90" fill="#0d1a0f" stroke="#2d6a4f" strokeWidth="1" />
                <text x="110" y="100" fontFamily="monospace" fontSize="9" fill="#74c69d">ACC_X: +0.12g</text>
                <text x="110" y="114" fontFamily="monospace" fontSize="9" fill="#74c69d">ACC_Y: -0.08g</text>
                <text x="110" y="128" fontFamily="monospace" fontSize="9" fill="#74c69d">VIB: 14.3 Hz</text>
                <text x="110" y="142" fontFamily="monospace" fontSize="9" fill="#fbbf24">SHOCK: 1.87g ⚠</text>
                <text x="110" y="156" fontFamily="monospace" fontSize="9" fill="#4a7c59">STAGE: BINS</text>

                {/* Accelerometer chip */}
                <rect x="120" y="190" width="50" height="50" fill="#1c3322" stroke="#2d6a4f" strokeWidth="1" />
                <text x="145" y="220" fontFamily="monospace" fontSize="7" fill="#74c69d" textAnchor="middle">3-AXIS</text>
                <text x="145" y="230" fontFamily="monospace" fontSize="7" fill="#74c69d" textAnchor="middle">ACCEL</text>

                {/* Vibration sensor */}
                <circle cx="215" cy="215" r="22" fill="#1c3322" stroke="#2d6a4f" strokeWidth="1" />
                <text x="215" y="219" fontFamily="monospace" fontSize="7" fill="#74c69d" textAnchor="middle">VIB</text>

                {/* Battery */}
                <rect x="108" y="256" width="144" height="24" rx="4" fill="#162b1b" stroke="#2d6a4f" strokeWidth="1" />
                <rect x="110" y="258" width="80" height="20" rx="2" fill="#2d6a4f" />
                <text x="180" y="272" fontFamily="monospace" fontSize="8" fill="#74c69d" textAnchor="middle">87% — 72h RUNTIME</text>

                {/* Connector */}
                <rect x="160" y="296" width="40" height="8" rx="2" fill="#162b1b" stroke="#2d6a4f" strokeWidth="1" />

                {/* Precision lines */}
                <line x1="80" y1="30" x2="140" y2="30" stroke="#2d6a4f" strokeWidth="0.5" />
                <line x1="140" y1="30" x2="140" y2="60" stroke="#2d6a4f" strokeWidth="0.5" />
                <text x="82" y="24" fontFamily="monospace" fontSize="8" fill="#4a7c59">ClevaCado D1</text>

                <line x1="280" y1="300" x2="320" y2="300" stroke="#2d6a4f" strokeWidth="0.5" />
                <text x="322" y="303" fontFamily="monospace" fontSize="7" fill="#4a7c59">IP67</text>
              </svg>
            </div>
          </Reveal>

          {/* Copy */}
          <div>
            <Reveal>
              <div className="font-mono text-[11px] text-[#74c69d]/60 tracking-[0.2em] uppercase mb-4">
                The ClevaCado Device
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
                One device.<br />The whole story.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/60 leading-relaxed mb-8">
                Compact enough to travel with the fruit from field to market. Rugged enough to withstand packhouse conditions. Precise enough to identify the exact handling event that caused invisible internal bruising.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="space-y-4">
                {[
                  { label: "3-Axis Accelerometer", value: "±16g, 200Hz sampling" },
                  { label: "Vibration Sensor", value: "1–500Hz frequency range" },
                  { label: "Gyroscope", value: "360° rotation tracking" },
                  { label: "Continuous logging", value: "72-hour runtime, IP67" },
                  { label: "Data export", value: "USB-C + wireless sync" },
                ].map((spec, i) => (
                  <Reveal key={spec.label} delay={0.1 * i}>
                    <div className="flex items-center justify-between border-b border-[#1c3322] pb-3">
                      <span className="font-mono text-xs text-white/50 uppercase tracking-wider">{spec.label}</span>
                      <span className="font-mono text-xs text-[#74c69d]">{spec.value}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ── ArchitectureLayers ────────────────────────────────────────── */
function ArchitectureLayers() {
  const layers = [
    {
      code: "L1",
      title: "3-Axis Shock Detection",
      desc: "Records acceleration in X, Y, and Z axes at 200Hz. Every drop, bump, and impact is captured with millisecond precision — timestamped and stage-tagged automatically.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <line x1="4" y1="20" x2="36" y2="20" stroke="#74c69d" strokeWidth="1.5" />
          <line x1="20" y1="4" x2="20" y2="36" stroke="#74c69d" strokeWidth="1.5" />
          <line x1="8" y1="8" x2="32" y2="32" stroke="#74c69d" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="20" cy="20" r="3" fill="#74c69d" />
        </svg>
      ),
    },
    {
      code: "L2",
      title: "Vibration Frequency Analysis",
      desc: "Continuous vibration profiling across 1–500Hz identifies equipment-specific signatures — conveyor belts, sorting rollers, forklift drives — linking damage to machinery.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <path d="M4 20 Q7 10 10 20 Q13 30 16 20 Q19 10 22 20 Q25 30 28 20 Q31 10 34 20 Q37 30 40 20" stroke="#74c69d" strokeWidth="1.5" fill="none" />
        </svg>
      ),
    },
    {
      code: "L3",
      title: "Rotation & Orientation",
      desc: "Full 360° gyroscopic tracking records every flip, roll, and tumble. Know when fruit was inverted during transfer and correlate orientation changes with impact events.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <circle cx="20" cy="20" r="12" stroke="#74c69d" strokeWidth="1.5" />
          <path d="M20 8 A12 12 0 0 1 32 20" stroke="#74c69d" strokeWidth="1.5" fill="none" />
          <polygon points="32,20 36,16 36,24" fill="#74c69d" />
        </svg>
      ),
    },
    {
      code: "L4",
      title: "Continuous Telemetry Logging",
      desc: "All sensor streams are logged continuously — no trigger threshold required. Every second of the journey is recorded, ensuring no handling event escapes the diagnostic record.",
      icon: (
        <svg viewBox="0 0 40 40" className="w-8 h-8" fill="none">
          <rect x="6" y="10" width="28" height="20" stroke="#74c69d" strokeWidth="1.5" />
          <line x1="6" y1="16" x2="34" y2="16" stroke="#74c69d" strokeWidth="0.5" />
          <line x1="6" y1="22" x2="34" y2="22" strokeWidth="0.5" stroke="#74c69d" />
          <line x1="12" y1="10" x2="12" y2="30" stroke="#74c69d" strokeWidth="0.5" />
          <circle cx="20" cy="25" r="2" fill="#74c69d" />
        </svg>
      ),
    },
  ]

  return (
    <section className="section-cream py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="font-mono text-[11px] text-[#5c6b5a] tracking-[0.2em] uppercase mb-3">Architecture</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl text-[#1c1c14] leading-tight mb-4 max-w-2xl">
            Four sensing layers. One diagnostic answer.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="text-[#5c6b5a] max-w-xl mb-16 leading-relaxed">
            The device stacks four independent sensing systems into a single instrument that attaches to — or travels alongside — every carton of avocados.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          {layers.map((layer, i) => (
            <Reveal key={layer.code} delay={0.1 * i}>
              <div className="border border-[#ddd0b8] p-6 bg-[#efe8d8]/40 hover:border-[#2d6a4f]/50 transition-colors group">
                <div className="flex items-start gap-4 mb-4">
                  <div className="font-mono text-xs text-[#5c6b5a] mt-1">{layer.code}</div>
                  <div className="text-[#2d6a4f] group-hover:text-[#4a7c59] transition-colors">{layer.icon}</div>
                </div>
                <h3 className="font-display text-xl text-[#1c1c14] mb-2">{layer.title}</h3>
                <p className="text-sm text-[#5c6b5a] leading-relaxed">{layer.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ── JourneyPipeline ───────────────────────────────────────────── */
const STAGES = [
  {
    num: "01",
    name: "Harvest",
    sub: "Field telemetry",
    desc: "Device is activated at the field. First telemetry baseline is established as fruit is picked and loaded.",
    icon: "🌿",
  },
  {
    num: "02",
    name: "Bins",
    sub: "Transfer telemetry",
    desc: "Bin loading and transfer from field to packhouse. Shock events from bin-to-bin stacking are logged.",
    icon: "📦",
  },
  {
    num: "03",
    name: "Sorting",
    sub: "Packhouse telemetry",
    desc: "The highest-risk stage. Sorting line vibration, impact from rollers and drops — all captured at 200Hz.",
    icon: "⚙️",
  },
  {
    num: "04",
    name: "Transport",
    sub: "Route telemetry",
    desc: "Cold-chain road and sea transport. Vibration from road surface, temperature logging, route duration.",
    icon: "🚛",
  },
  {
    num: "05",
    name: "Report",
    sub: "Diagnostic answer",
    desc: "Device syncs on arrival. Full telemetry is processed into a stage-by-stage damage report in minutes.",
    icon: "📊",
  },
]

function JourneyPipeline() {
  return (
    <section id="journey" className="section-mid py-24 md:py-36 relative overflow-hidden">
      <div
        className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2d6a4f] to-transparent"
      />
      <Container>
        <Reveal>
          <div className="font-mono text-[11px] text-[#74c69d]/60 tracking-[0.2em] uppercase mb-3">Supply Chain Journey</div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-16 max-w-2xl">
            Field to market. Every stage, instrumented.
          </h2>
        </Reveal>

        {/* Desktop: horizontal row */}
        <div className="hidden md:flex items-start gap-0 mb-8">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.num} delay={0.12 * i} className="flex-1">
              <div className="relative">
                {/* Connector line */}
                {i < STAGES.length - 1 && (
                  <div className="absolute top-6 left-1/2 right-0 h-px bg-gradient-to-r from-[#2d6a4f] to-[#2d6a4f]/40" />
                )}
                <div className="px-3 text-center">
                  <div className="relative inline-flex items-center justify-center w-12 h-12 border border-[#2d6a4f] bg-[#0d1a0f] mb-4 mx-auto">
                    <span className="font-mono text-[10px] text-[#74c69d]">{stage.num}</span>
                    {i < STAGES.length - 1 && (
                      <div className="absolute -right-px top-1/2 w-px h-8 bg-[#2d6a4f] -translate-y-1/2" />
                    )}
                  </div>
                  <div className="font-display text-lg text-white mb-1">{stage.name}</div>
                  <div className="font-mono text-[10px] text-[#74c69d]/60 uppercase tracking-wider mb-3">{stage.sub}</div>
                  <div className="text-xs text-white/40 leading-relaxed">{stage.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden space-y-0">
          {STAGES.map((stage, i) => (
            <Reveal key={stage.num} delay={0.1 * i}>
              <div className="flex gap-5 pb-8 relative">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 border border-[#2d6a4f] bg-[#0d1a0f] flex items-center justify-center flex-shrink-0">
                    <span className="font-mono text-[9px] text-[#74c69d]">{stage.num}</span>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="flex-1 w-px bg-[#2d6a4f]/40 mt-2" />
                  )}
                </div>
                <div className="pt-1 pb-6">
                  <div className="font-display text-lg text-white mb-0.5">{stage.name}</div>
                  <div className="font-mono text-[10px] text-[#74c69d]/60 uppercase tracking-wider mb-2">{stage.sub}</div>
                  <div className="text-sm text-white/50 leading-relaxed">{stage.desc}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ── AnalyticsDashboard ────────────────────────────────────────── */
const RISK_SCORES = [
  { label: "Harvesting", score: 24, note: "Low risk — gentle manual picking" },
  { label: "Bin handling", score: 46, note: "Moderate — bin stacking events" },
  { label: "Sorting line", score: 72, note: "Critical — primary damage source", alert: true },
  { label: "Packing", score: 41, note: "Moderate — manual intervention" },
  { label: "Cold storage", score: 29, note: "Low — controlled environment" },
  { label: "Transport", score: 53, note: "Moderate — road vibration" },
  { label: "Market arrival", score: 18, note: "Low — terminal handling" },
]

function RiskBar({ score, alert, delay }: { score: number; alert?: boolean; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (inView && !triggered) setTriggered(true)
  }, [inView, triggered])

  return (
    <div ref={ref} className="relative h-6 bg-[#0d1a0f]/60 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={triggered ? { width: `${score}%` } : { width: 0 }}
        transition={{ duration: 1.1, delay, ease: "easeOut" }}
        className="absolute inset-y-0 left-0"
        style={{ backgroundColor: alert ? "#d97706" : "#2d6a4f" }}
      />
      <div className="absolute inset-y-0 left-0 right-0 flex items-center px-2 justify-between">
        <motion.span
          initial={{ opacity: 0 }}
          animate={triggered ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 0.4 }}
          className={`font-mono text-xs ${alert ? "text-[#fbbf24]" : "text-[#74c69d]"}`}
        >
          {score}
        </motion.span>
        {alert && (
          <span className="font-mono text-[9px] text-[#fbbf24] tracking-widest">◆ HIGHEST RISK</span>
        )}
      </div>
    </div>
  )
}

function AnalyticsDashboard() {
  return (
    <section id="analytics" className="section-black py-24 md:py-36 relative">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 80%, #0d1a0f 0%, transparent 70%)",
        }}
      />
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div>
            <Reveal>
              <div className="font-mono text-[11px] text-[#74c69d]/60 tracking-[0.2em] uppercase mb-3">Diagnostic Report</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl text-white leading-tight mb-6">
                Risk scores, by stage.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-white/50 leading-relaxed mb-8">
                Every stage of the supply chain receives a risk score derived from shock, vibration, and rotation data. The sorting line consistently emerges as the highest-risk stage — the hidden culprit behind most invisible bruising.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="border border-[#1c3322] p-5 bg-[#0d1a0f]">
                <div className="font-mono text-[10px] text-[#2d6a4f] mb-4 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#74c69d] inline-block pulse-dot" />
                  REAL PILOT DATA — SAMPLE RUN
                </div>
                <div className="font-mono text-xs text-white/40 space-y-1">
                  <div>RUN ID: CLV-2024-047</div>
                  <div>ORIGIN: Western Cape, South Africa</div>
                  <div>DESTINATION: Rotterdam, Netherlands</div>
                  <div>DURATION: 22 days</div>
                  <div className="text-[#fbbf24] mt-3">DIAGNOSIS: Sorting line — Stage 3</div>
                  <div className="text-[#fbbf24]">CONFIDENCE: 94%</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Risk bar chart */}
          <div>
            <div className="font-mono text-[10px] text-white/30 uppercase tracking-widest mb-6 flex justify-between">
              <span>Stage</span>
              <span>Risk Score (0–100)</span>
            </div>
            <div className="space-y-3">
              {RISK_SCORES.map((item, i) => (
                <Reveal key={item.label} delay={0.08 * i}>
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-mono text-[11px] uppercase tracking-wider ${item.alert ? "text-[#fbbf24]" : "text-white/60"}`}>
                        {item.label}
                      </span>
                      <span className="font-mono text-[10px] text-white/25 hidden md:block">{item.note}</span>
                    </div>
                    <RiskBar score={item.score} alert={item.alert} delay={0.08 * i} />
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.7}>
              <div className="mt-8 flex items-start gap-3 border border-[#d97706]/30 p-4 bg-[#d97706]/5">
                <div className="w-2 h-2 bg-[#d97706] mt-1 flex-shrink-0" />
                <div>
                  <div className="font-mono text-[10px] text-[#fbbf24] uppercase tracking-widest mb-1">Finding</div>
                  <div className="text-sm text-white/60 leading-relaxed">
                    Sorting Line (Stage 3) accounts for over 60% of all detectable shock events across pilot runs. Roller speed and drop height are the primary mechanical contributors.
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ── PilotCTA ──────────────────────────────────────────────────── */
function PilotCTA() {
  return (
    <section className="section-cream py-24 md:py-36 relative overflow-hidden">
      <div
        className="absolute left-0 top-0 bottom-0 w-2 bg-[#2d6a4f]"
      />
      <Container>
        <div className="grid md:grid-cols-2 gap-16 items-start pl-8">
          <div>
            <Reveal>
              <div className="font-mono text-[11px] text-[#5c6b5a] tracking-[0.2em] uppercase mb-4">Pilot Program</div>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="font-display text-4xl md:text-5xl text-[#1c1c14] leading-tight mb-6">
                Join the first cohort of growers who know exactly where the damage happens.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-[#5c6b5a] leading-relaxed mb-8">
                We're placing ClevaCado devices with a limited number of packhouses and export operations in the Western Cape. Pilot participants receive full diagnostic reports, stage-by-stage risk analysis, and direct support from the development team.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <div className="space-y-3 mb-10">
                {[
                  "Device provided at no cost during pilot",
                  "Full telemetry for every run",
                  "Stage-by-stage risk report",
                  "Direct engineer support",
                  "Input on product roadmap",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-sm text-[#1c1c14]">
                    <div className="w-1.5 h-1.5 bg-[#2d6a4f] flex-shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="mailto:dylanwalt10@gmail.com?subject=Pilot Request"
                  className="inline-block bg-[#1c1c14] text-white px-8 py-4 text-sm font-mono tracking-wider hover:bg-[#2d6a4f] transition-colors"
                >
                  REQUEST A PILOT →
                </a>
                <a
                  href="tel:+27719290175"
                  className="inline-block border border-[#ddd0b8] text-[#1c1c14] px-8 py-4 text-sm font-mono tracking-wider hover:border-[#2d6a4f] transition-colors"
                >
                  +27 71 929 0175
                </a>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal delay={0.15}>
              <div className="border border-[#ddd0b8] p-8 bg-[#efe8d8]/30">
                <div className="font-mono text-[10px] text-[#5c6b5a] uppercase tracking-widest mb-6">Contact Details</div>
                <div className="space-y-6">
                  <div>
                    <div className="font-mono text-[10px] text-[#5c6b5a] uppercase mb-1">Email</div>
                    <a
                      href="mailto:dylanwalt10@gmail.com?subject=Pilot Request"
                      className="font-display text-lg text-[#2d6a4f] hover:text-[#4a7c59] transition-colors"
                    >
                      dylanwalt10@gmail.com
                    </a>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#5c6b5a] uppercase mb-1">Phone</div>
                    <a
                      href="tel:+27719290175"
                      className="font-display text-lg text-[#2d6a4f] hover:text-[#4a7c59] transition-colors"
                    >
                      +27 71 929 0175
                    </a>
                  </div>
                  <div>
                    <div className="font-mono text-[10px] text-[#5c6b5a] uppercase mb-1">Subject Line</div>
                    <div className="font-mono text-sm text-[#1c1c14]">Pilot Request</div>
                  </div>
                  <div className="border-t border-[#ddd0b8] pt-4">
                    <div className="font-mono text-[10px] text-[#5c6b5a] uppercase mb-2">Status</div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#2d6a4f] pulse-dot inline-block" />
                      <span className="font-mono text-xs text-[#2d6a4f]">ACTIVE DEVELOPMENT — PILOT AVAILABLE</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ── Footer ────────────────────────────────────────────────────── */
function SiteFooter() {
  return (
    <footer className="bg-[#060e08] border-t border-[#1c3322] py-12">
      <Container>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <svg width="28" height="28" viewBox="0 0 36 36" fill="none">
                <ellipse cx="18" cy="20" rx="11" ry="14" stroke="#2d6a4f" strokeWidth="1.5" />
                <ellipse cx="18" cy="14" rx="5" ry="6" fill="#1c3322" />
                <line x1="18" y1="8" x2="18" y2="2" stroke="#2d6a4f" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="18" cy="22" r="2.5" fill="#2d6a4f" />
              </svg>
              <span className="font-display text-white text-lg">ClevaCado</span>
            </div>
            <div className="font-mono text-[10px] text-white/30 tracking-widest uppercase">
              Post-Harvest Diagnostics
            </div>
          </div>

          <div className="font-mono text-[11px] text-white/25 space-y-1 text-right">
            <div>© {new Date().getFullYear()} ClevaCado. All rights reserved.</div>
            <div>
              <a
                href="mailto:dylanwalt10@gmail.com?subject=Pilot Request"
                className="text-[#2d6a4f] hover:text-[#74c69d] transition-colors"
              >
                dylanwalt10@gmail.com
              </a>
              {" · "}
              <a
                href="tel:+27719290175"
                className="text-[#2d6a4f] hover:text-[#74c69d] transition-colors"
              >
                +27 71 929 0175
              </a>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  )
}

/* ── HomeExperience (root export) ──────────────────────────────── */
export function HomeExperience() {
  return (
    <MotionConfig reducedMotion="user">
      <main>
        <CinematicHero />
        <ProblemStatement />
        <DeviceIntro />
        <ArchitectureLayers />
        <JourneyPipeline />
        <AnalyticsDashboard />
        <PilotCTA />
        <SiteFooter />
      </main>
    </MotionConfig>
  )
}
