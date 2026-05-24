"use client"

import Link from "next/link"
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react"
import { ArrowRight, ArrowUpRight, Camera, Check, MapPin, Minus } from "lucide-react"
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
import { cn, withBasePath } from "@/lib/utils"

/* ─── Brand data ──────────────────────────────────────────── */

const flavours = [
  {
    id: "cranberry-raspberry",
    name: "Cranberry & Raspberry",
    short: "Cranberry · Raspberry",
    eyebrow: "01 · The classic",
    tasting: "Crisp cranberry, sun-ripened raspberry, dry finish.",
    moment: "First-pour. The fridge-shelf default.",
    fruits: ["Cranberry", "Raspberry"],
  },
  {
    id: "passion-fruit",
    name: "Passion Fruit",
    short: "Passion Fruit",
    eyebrow: "02 · The tropical",
    tasting: "Aromatic passion fruit, low-sweet, long finish.",
    moment: "Late afternoon, ice cubes, no plans.",
    fruits: ["Passion fruit"],
  },
  {
    id: "mango-orange",
    name: "Mango & Orange",
    short: "Mango · Orange",
    eyebrow: "03 · The sunset",
    tasting: "Lush mango, vibrant orange, a clean spirit edge.",
    moment: "Sundowner. Anywhere with a horizon.",
    fruits: ["Mango", "Orange"],
  },
  {
    id: "pineapple-coconut",
    name: "Pineapple & Coconut",
    short: "Pineapple · Coconut",
    eyebrow: "04 · The coastal",
    tasting: "Sweet pineapple, soft coconut, dry sparkle.",
    moment: "Pool. Stoop. The first hot weekend.",
    fruits: ["Pineapple", "Coconut"],
  },
  {
    id: "lime-lemon",
    name: "Lime & Lemon",
    short: "Lime · Lemon",
    eyebrow: "05 · The brace",
    tasting: "Sharp citrus zing, big sparkle, vodka-clean.",
    moment: "Braai. Heat. Anything with smoke and salt.",
    fruits: ["Lime", "Lemon"],
  },
] as const

type Flavour = (typeof flavours)[number]
type FlavourId = Flavour["id"]

const SPEC_RAIL = [
  { value: "5%", label: "ABV" },
  { value: "72", label: "Calories" },
  { value: "3g", label: "Sugar" },
  { value: "0", label: "Artificial flavours" },
  { value: "GF", label: "Gluten free" },
  { value: "ZA", label: "Brewed in" },
] as const

const COMPARE_ROWS = [
  { label: "Real fruit, not flavouring", south: "yes", seltzer: "partial", premixed: "no" },
  { label: "Premium vodka base", south: "yes", seltzer: "no", premixed: "yes" },
  { label: "Under 75 calories per can", south: "yes", seltzer: "yes", premixed: "no" },
  { label: "Under 5g sugar per can", south: "yes", seltzer: "yes", premixed: "no" },
  { label: "Gluten-free", south: "yes", seltzer: "yes", premixed: "partial" },
  { label: "South African", south: "yes", seltzer: "no", premixed: "depends" },
  { label: "Refreshment-first", south: "yes", seltzer: "yes", premixed: "no" },
] as const

const STOCKISTS = [
  { name: "Pick n Pay", note: "Liquor aisle · nationwide" },
  { name: "Spar", note: "Tops · nationwide" },
  { name: "Liquor City", note: "Selected stores" },
] as const

const IN_THE_WILD = [
  {
    eyebrow: "Instagram · @south_side_hard_soda",
    title: "In the fridge. On the stoop. On the move.",
    body:
      "Customer photography reposted in the feed — the actual moments South Side gets pulled into.",
    href: "https://www.instagram.com/south_side_hard_soda/",
    cta: "Follow on Instagram",
  },
  {
    eyebrow: "South Side · Store locator",
    title: "Find your nearest chilled shelf.",
    body:
      "South Side is stocked across Pick n Pay, Spar, and Liquor City. The locator on south-side.co.za returns the nearest stockist.",
    href: "https://www.south-side.co.za/storelocator",
    cta: "Open the locator",
  },
  {
    eyebrow: "South Side · Products",
    title: "Five flavours. One operating model.",
    body:
      "Browse all five South Side hard soda flavours on the main store. Single cans, multipacks, and seasonal drops listed.",
    href: "https://www.south-side.co.za/products",
    cta: "Browse the range",
  },
]

const STORE_LOCATOR = "https://www.south-side.co.za/storelocator"
const INSTAGRAM = "https://www.instagram.com/south_side_hard_soda/"
const PRODUCTS = "https://www.south-side.co.za/products"

/* ─── Root ────────────────────────────────────────────────── */

export function HomeExperience() {
  const [active, setActive] = useState<FlavourId>("cranberry-raspberry")
  const current = flavours.find((f) => f.id === active) ?? flavours[0]

  return (
    <MotionConfig reducedMotion="user">
      <div data-flavour={active} className="min-h-screen flex flex-col">
        <SiteNav />
        <main className="flex-1">
          <HeroSwatch current={current} setActive={setActive} />
          <SpecRail />
          <FlavourReel current={current} setActive={setActive} />
          <FlavourBandLadder />
          <RecipePinned />
          <ComparisonStrip />
          <StockistLocator />
          <InTheWild />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  )
}

/* ─── Site Nav ────────────────────────────────────────────── */

function SiteNav() {
  return (
    <header className="absolute top-0 left-0 right-0 z-40 pt-6">
      <Container className="flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <SouthSideMark className="h-7 w-auto" />
          <span className="font-display text-[14px] font-semibold tracking-[-0.01em] sr-only md:not-sr-only">
            South Side
          </span>
        </Link>
        <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted-on-ink)]">
          <a href="#flavours" className="hover:text-[var(--cream)] transition-colors">
            Flavours
          </a>
          <a href="#recipe" className="hover:text-[var(--cream)] transition-colors">
            Recipe
          </a>
          <a href="#stockists" className="hover:text-[var(--cream)] transition-colors">
            Stockists
          </a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-[var(--cream)] transition-colors">
            Instagram
          </a>
        </nav>
        <a
          href={STORE_LOCATOR}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 bg-[var(--cream)] text-[var(--ink)] px-4 py-2 text-[12.5px] font-medium tracking-tight rounded-[2px] hover:bg-[var(--cream-2)] transition-colors"
        >
          Find a store
          <ArrowRight className="h-3.5 w-3.5" />
        </a>
      </Container>
    </header>
  )
}

function SouthSideMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 32" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} aria-hidden="true">
      <circle cx="16" cy="16" r="12" fill="var(--flavour)" />
      <path
        d="M11 16 L15 12 L21 18 L23 16"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <text
        x="34"
        y="21"
        fill="var(--cream)"
        fontFamily="var(--font-display)"
        fontSize="15"
        fontWeight={700}
        letterSpacing="-0.5"
      >
        S/S
      </text>
    </svg>
  )
}

/* ─── Hero Swatch ─────────────────────────────────────────── */

function HeroSwatch({
  current,
  setActive,
}: {
  current: Flavour
  setActive: (id: FlavourId) => void
}) {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative overflow-hidden pt-32 lg:pt-40 pb-24 lg:pb-32 transition-colors duration-500">
      <div className="absolute inset-0 hairline-grid opacity-60 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none transition-colors duration-500"
        style={{
          background:
            "radial-gradient(circle at 72% 30%, var(--flavour-soft) 0%, transparent 55%)",
        }}
      />
      <Container className="relative">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          <div className="lg:col-span-6">
            <Eyebrow tone="cream">Hard soda · South Africa</Eyebrow>
            <Reveal delay={0.05}>
              <h1 className="mt-7 font-display text-[clamp(2.75rem,7.2vw,6.5rem)] font-semibold leading-[0.96] tracking-[-0.025em]">
                Real fruit. Real vodka.
                <br />
                <span className="text-[var(--flavour)] transition-colors duration-500">
                  Real refreshment, in a can.
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.22}>
              <p className="mt-8 max-w-xl text-[17.5px] leading-[1.55] text-[var(--muted-on-ink)]">
                South Side is a premium hard soda from South Africa — premium
                vodka, sparkling spring water, real fruit. 5% ABV. 72 calories.
                3g of sugar. Made for the heat.
              </p>
            </Reveal>
            <Reveal delay={0.32}>
              <p
                key={current.id}
                className="mt-5 text-[15px] italic font-display text-[var(--cream)] transition-opacity"
              >
                <span className="text-[var(--flavour)] not-italic font-mono text-[11px] tracking-[0.2em] mr-2">
                  {current.eyebrow.split(" · ")[0]}
                </span>
                {current.tasting}
              </p>
            </Reveal>
            <Reveal delay={0.42}>
              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
                <PrimaryCTA href={STORE_LOCATOR} external>
                  Find a store
                </PrimaryCTA>
                <SecondaryCTA href="#flavours">Explore flavours</SecondaryCTA>
              </div>
            </Reveal>
            <Reveal delay={0.55}>
              <FlavourSwatchRow active={current.id} setActive={setActive} />
            </Reveal>
          </div>
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className={cn("relative", !reduceMotion && "can-breathe")}>
              <CanShape flavour={current} size={420} />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

function FlavourSwatchRow({
  active,
  setActive,
}: {
  active: FlavourId
  setActive: (id: FlavourId) => void
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <div className="mt-12">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--muted-on-ink)]">
        Pick a flavour
      </div>
      <div
        ref={containerRef}
        role="radiogroup"
        aria-label="South Side flavour"
        className="mt-4 flex flex-wrap gap-1.5"
        onKeyDown={(e) => {
          if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return
          e.preventDefault()
          const idx = flavours.findIndex((f) => f.id === active)
          const delta = e.key === "ArrowRight" ? 1 : -1
          const next = flavours[(idx + delta + flavours.length) % flavours.length]
          setActive(next.id)
        }}
      >
        {flavours.map((f) => (
          <button
            key={f.id}
            type="button"
            role="radio"
            aria-checked={active === f.id}
            data-flavour={f.id}
            onClick={() => setActive(f.id)}
            className={cn(
              "group relative px-3.5 py-2 text-[12.5px] tracking-tight transition-all duration-200 border",
              active === f.id
                ? "border-[var(--flavour)] bg-[var(--flavour-soft)] text-[var(--cream)]"
                : "border-[var(--ink-3)] text-[var(--muted-on-ink)] hover:text-[var(--cream)] hover:border-[var(--ink-3)]",
            )}
          >
            <span className="inline-flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ background: getFlavourColor(f.id) }}
              />
              {f.short}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}

function getFlavourColor(id: FlavourId): string {
  switch (id) {
    case "cranberry-raspberry":
      return "#c8324d"
    case "passion-fruit":
      return "#f5a623"
    case "mango-orange":
      return "#ff7d3a"
    case "pineapple-coconut":
      return "#7fd1a4"
    case "lime-lemon":
      return "#cce652"
  }
}

/* ─── Can Shape (SVG primitive) ───────────────────────────── */

function CanShape({
  flavour,
  size = 320,
  fadeKey,
}: {
  flavour: Flavour
  size?: number
  fadeKey?: string
}) {
  const id = fadeKey ?? flavour.id
  const w = size
  const h = Math.round(size * 1.65)
  const cx = w / 2
  return (
    <svg
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      role="img"
      aria-label={`South Side ${flavour.name} can`}
    >
      <defs>
        <linearGradient id={`can-body-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--flavour-deep)" />
          <stop offset="20%" stopColor="var(--flavour)" />
          <stop offset="75%" stopColor="var(--flavour)" />
          <stop offset="100%" stopColor="var(--flavour-deep)" />
        </linearGradient>
        <linearGradient id={`can-shine-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="35%" stopColor="rgba(255,255,255,0.0)" />
          <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
          <stop offset="65%" stopColor="rgba(255,255,255,0.0)" />
        </linearGradient>
      </defs>

      {/* Floor shadow */}
      <ellipse
        cx={cx}
        cy={h - 14}
        rx={w * 0.32}
        ry={10}
        fill="rgba(0,0,0,0.35)"
      />

      {/* Can body */}
      <motion.rect
        key={flavour.id}
        initial={{ opacity: 0.35 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.22, 0.61, 0.36, 1] }}
        x={cx - w * 0.28}
        y={h * 0.07}
        width={w * 0.56}
        height={h * 0.86}
        rx={w * 0.04}
        fill={`url(#can-body-${id})`}
        style={{ transition: "fill 0.5s" }}
      />

      {/* Shine */}
      <rect
        x={cx - w * 0.28}
        y={h * 0.07}
        width={w * 0.56}
        height={h * 0.86}
        rx={w * 0.04}
        fill={`url(#can-shine-${id})`}
      />

      {/* Top rim */}
      <rect
        x={cx - w * 0.27}
        y={h * 0.06}
        width={w * 0.54}
        height={h * 0.022}
        rx={2}
        fill="var(--cream-3)"
      />
      <rect
        x={cx - w * 0.28}
        y={h * 0.082}
        width={w * 0.56}
        height={h * 0.012}
        fill="var(--ink-3)"
        opacity={0.35}
      />

      {/* Pull tab */}
      <ellipse
        cx={cx + w * 0.06}
        cy={h * 0.06}
        rx={w * 0.05}
        ry={3}
        fill="var(--cream-3)"
      />
      <circle cx={cx + w * 0.06} cy={h * 0.06} r={2.5} fill="var(--ink-3)" />

      {/* Brand label band */}
      <rect
        x={cx - w * 0.26}
        y={h * 0.18}
        width={w * 0.52}
        height={h * 0.08}
        fill="rgba(255,255,255,0.12)"
      />
      <text
        x={cx}
        y={h * 0.235}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={w * 0.075}
        fontWeight={700}
        letterSpacing="-0.5"
        fill="var(--flavour-label-tint)"
      >
        SOUTH SIDE
      </text>
      <text
        x={cx}
        y={h * 0.27}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={w * 0.028}
        letterSpacing="0.2em"
        fill="var(--flavour-label-tint)"
        opacity={0.7}
      >
        HARD SODA · 5% ABV
      </text>

      {/* Flavour name */}
      <foreignObject
        x={cx - w * 0.24}
        y={h * 0.36}
        width={w * 0.48}
        height={h * 0.32}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            textAlign: "center",
            color: "var(--flavour-label-tint)",
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: w * 0.058,
            letterSpacing: "-0.03em",
            lineHeight: 1.05,
            padding: "0 6%",
          }}
        >
          {flavour.name}
        </div>
      </foreignObject>

      {/* Spec band */}
      <rect
        x={cx - w * 0.26}
        y={h * 0.78}
        width={w * 0.52}
        height={h * 0.06}
        fill="rgba(0,0,0,0.18)"
      />
      <text
        x={cx}
        y={h * 0.815}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={w * 0.028}
        letterSpacing="0.18em"
        fill="var(--flavour-label-tint)"
      >
        72 CAL · 3g SUGAR · 330 ml
      </text>

      {/* Bottom rim */}
      <rect
        x={cx - w * 0.27}
        y={h * 0.92}
        width={w * 0.54}
        height={h * 0.018}
        rx={2}
        fill="var(--ink-3)"
      />
    </svg>
  )
}

/* ─── Spec Rail ───────────────────────────────────────────── */

function SpecRail() {
  return (
    <section
      className="border-t border-b border-[var(--ink-3)] bg-[var(--ink)]"
      aria-label="Product spec"
    >
      <Container className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-[var(--ink-3)]">
        {SPEC_RAIL.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 0.05}
            className="bg-[var(--ink)] px-5 py-6"
          >
            <div className="font-display text-[28px] font-semibold tracking-tight">
              {s.value}
            </div>
            <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--muted-on-ink)]">
              {s.label}
            </div>
          </Reveal>
        ))}
      </Container>
    </section>
  )
}

/* ─── Flavour Reel ────────────────────────────────────────── */

function FlavourReel({
  current,
  setActive,
}: {
  current: Flavour
  setActive: (id: FlavourId) => void
}) {
  return (
    <section id="flavours" className="py-24 lg:py-32 border-b border-[var(--ink-3)]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="cream">The flavours</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
              Five hard sodas. One operating model.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-[var(--muted-on-ink)] max-w-md">
              Pick a card to load it into the hero. Each is real fruit + premium
              vodka + sparkling spring water — and nothing else.
            </p>
          </div>
        </div>
        <div className="mt-12 lg:mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-px bg-[var(--ink-3)]">
          {flavours.map((f, i) => (
            <button
              key={f.id}
              type="button"
              data-flavour={f.id}
              onClick={() => {
                setActive(f.id)
                const el = document.getElementById("hero")
                if (el) el.scrollIntoView({ behavior: "smooth" })
              }}
              className={cn(
                "group text-left bg-[var(--ink)] px-6 py-7 min-h-[280px] flex flex-col gap-5 transition-colors",
                current.id === f.id ? "bg-[var(--ink-2)]" : "hover:bg-[var(--ink-2)]",
              )}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <Reveal delay={i * 0.06}>
                <div className="flex items-center gap-3">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: getFlavourColor(f.id) }}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--muted-on-ink)]">
                    {f.eyebrow}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-[24px] font-semibold tracking-[-0.02em] leading-[1.1]">
                  {f.name}
                </h3>
                <p className="mt-3 text-[14px] leading-[1.55] text-[var(--muted-on-ink)]">
                  {f.tasting}
                </p>
                <div
                  className={cn(
                    "mt-auto inline-flex items-center gap-1.5 text-[12.5px] font-medium tracking-tight",
                    current.id === f.id ? "text-[var(--flavour)]" : "text-[var(--cream)]",
                  )}
                >
                  {current.id === f.id ? "Loaded in hero" : "Load in hero"}
                  <ArrowRight className="h-3.5 w-3.5" />
                </div>
              </Reveal>
            </button>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Flavour Band Ladder ─────────────────────────────────── */

function FlavourBandLadder() {
  return (
    <div>
      {flavours.map((f, i) => (
        <FlavourBand key={f.id} flavour={f} index={i} />
      ))}
    </div>
  )
}

function FlavourBand({ flavour, index }: { flavour: Flavour; index: number }) {
  const tone = index % 2 === 0 ? "dark" : "light"
  return (
    <section
      data-flavour={flavour.id}
      className={cn(
        "border-b transition-colors duration-500",
        tone === "dark"
          ? "bg-[var(--ink)] text-[var(--cream)] border-[var(--ink-3)]"
          : "section-light bg-[var(--cream)] text-[var(--ink)] border-[var(--cream-3)]",
      )}
    >
      <Container className="py-20 lg:py-28">
        <div
          className={cn(
            "grid lg:grid-cols-12 gap-12 items-center",
            index % 2 === 1 && "lg:[&>*:first-child]:order-2",
          )}
        >
          <div className="lg:col-span-7">
            <Eyebrow tone={tone === "dark" ? "cream" : "ink"}>{flavour.eyebrow}</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.8vw,4rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
              <span className="text-[var(--flavour)]">{flavour.name}.</span>
            </h2>
            <p
              className={cn(
                "mt-6 max-w-xl text-[17px] leading-[1.55]",
                tone === "dark" ? "text-[var(--muted-on-ink)]" : "text-[var(--muted-on-cream)]",
              )}
            >
              {flavour.tasting}
            </p>
            <div className="mt-9 grid sm:grid-cols-2 gap-px bg-[var(--ink-3)]/30">
              <div
                className={cn(
                  "p-5",
                  tone === "dark" ? "bg-[var(--ink)]" : "bg-[var(--cream)]",
                )}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--flavour)]">
                  The fruit
                </div>
                <div className="mt-3 text-[16px] font-semibold tracking-tight">
                  {flavour.fruits.join(" + ")}
                </div>
              </div>
              <div
                className={cn(
                  "p-5",
                  tone === "dark" ? "bg-[var(--ink)]" : "bg-[var(--cream)]",
                )}
              >
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--flavour)]">
                  The moment
                </div>
                <div className="mt-3 text-[16px] font-semibold tracking-tight">
                  {flavour.moment}
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <PrimaryCTA href={STORE_LOCATOR} external tone={tone}>
                Find a store
              </PrimaryCTA>
              <SecondaryCTA href={PRODUCTS} external tone={tone}>
                Browse the range
              </SecondaryCTA>
            </div>
          </div>
          <div className="lg:col-span-5 flex items-center justify-center">
            <Reveal y={28} delay={0.18}>
              <div className="can-breathe relative">
                <CanShape flavour={flavour} size={340} fadeKey={`band-${flavour.id}`} />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  )
}

/* ─── Recipe Pinned (signature scroll interaction) ────────── */

function RecipePinned() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  })
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.5 })
  const stateProgress = useTransform(progress, (v) => Math.min(2, Math.max(0, v * 3 - 0.1)))
  const [active, setActive] = useState(0)

  useEffect(() => {
    const unsub = stateProgress.on("change", (v) => {
      const idx = Math.round(v)
      if (idx !== active) setActive(Math.min(2, Math.max(0, idx)))
    })
    return unsub
  }, [stateProgress, active])

  const RECIPE = [
    {
      code: "01",
      title: "Sparkling spring water",
      body:
        "South African spring water with bright sparkle. The base — clean, pH-neutral, no compromises on mineral character.",
      detail: "1 of 3 · Filled, chilled, carbonated.",
    },
    {
      code: "02",
      title: "Real fruit",
      body:
        "Cold-pressed real fruit — never artificial flavouring. The fruit decides the colour; the colour decides the band.",
      detail: "2 of 3 · One or two fruits per flavour, that's it.",
    },
    {
      code: "03",
      title: "Premium vodka",
      body:
        "A clean, refined vodka base. Drier than a flavoured spirit, smoother than a malt seltzer.",
      detail: "3 of 3 · 5% ABV · sealed and shipped.",
    },
  ] as const

  if (reduceMotion) {
    return (
      <section id="recipe" className="section-light bg-[var(--cream)] text-[var(--ink)] py-24 lg:py-32 border-b border-[var(--cream-3)]">
        <Container>
          <Eyebrow tone="ink">How it's made</Eyebrow>
          <h2 className="mt-6 max-w-4xl font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
            Three ingredients. In this exact order.
          </h2>
          <div className="mt-14 grid lg:grid-cols-3 gap-px bg-[var(--cream-3)]">
            {RECIPE.map((s) => (
              <div key={s.code} className="bg-[var(--cream)] p-7">
                <RecipeState state={s} highlighted />
              </div>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  return (
    <div
      id="recipe"
      ref={containerRef}
      className="section-light bg-[var(--cream)] text-[var(--ink)] relative h-[300vh] border-b border-[var(--cream-3)]"
    >
      <div className="sticky top-0 h-screen flex items-center overflow-hidden">
        <Container className="relative w-full">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <Eyebrow tone="ink">How it's made</Eyebrow>
              <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
                Three ingredients.
                <br />
                In this exact order.
              </h2>
              <div className="mt-10 flex gap-2.5">
                {RECIPE.map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-px transition-all duration-500",
                      i === active ? "bg-[var(--flavour)] w-12" : "bg-[var(--cream-3)] w-6",
                    )}
                  />
                ))}
              </div>
              <div className="mt-8 min-h-[200px]">
                {RECIPE.map((s, i) => (
                  <motion.div
                    key={s.code}
                    initial={false}
                    animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 8 }}
                    transition={{ duration: 0.4, ease: [0.22, 0.61, 0.36, 1] }}
                    style={{ position: i === active ? "relative" : "absolute" }}
                    aria-hidden={i !== active}
                  >
                    <RecipeState state={s} />
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-6 flex items-center justify-center">
              <RecipeDiagram active={active} progress={progress} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}

function RecipeState({
  state,
  highlighted = false,
}: {
  state: { code: string; title: string; body: string; detail: string }
  highlighted?: boolean
}) {
  return (
    <div>
      <div className={cn("font-mono text-[11px] uppercase tracking-[0.22em]", highlighted ? "text-[var(--flavour-deep)]" : "text-[var(--flavour-deep)]")}>
        {state.code} · INGREDIENT
      </div>
      <h3 className="mt-4 font-display text-[28px] font-semibold tracking-[-0.02em]">
        {state.title}
      </h3>
      <p className="mt-3 max-w-md text-[15px] leading-[1.55] text-[var(--muted-on-cream)]">
        {state.body}
      </p>
      <p className="mt-5 font-mono text-[11.5px] uppercase tracking-[0.2em] text-[var(--muted-on-cream)]">
        {state.detail}
      </p>
    </div>
  )
}

function RecipeDiagram({
  active,
  progress,
}: {
  active: number
  progress: MotionValue<number>
}) {
  const waterFill = useTransform(progress, [0, 0.33], [0, 1])
  const fruitFill = useTransform(progress, [0.33, 0.66], [0, 1])
  const vodkaFill = useTransform(progress, [0.66, 1], [0, 1])

  const waterHeight = useTransform(waterFill, (v) => 60 * v)
  const fruitHeight = useTransform(fruitFill, (v) => 60 * v)
  const vodkaHeight = useTransform(vodkaFill, (v) => 60 * v)
  const waterY = useTransform(waterHeight, (h) => 380 - h)
  const fruitY = useTransform(fruitHeight, (h) => 320 - h)
  const vodkaY = useTransform(vodkaHeight, (h) => 260 - h)

  return (
    <svg viewBox="0 0 360 480" className="w-full max-w-[380px]">
      {/* Glass silhouette */}
      <rect x="120" y="120" width="120" height="260" rx="10" fill="rgba(0,0,0,0.04)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="120" y="120" width="120" height="6" fill="var(--ink)" opacity={0.08} />

      {/* Water layer */}
      <motion.rect
        x="124"
        y={waterY}
        width="112"
        height={waterHeight}
        fill="#bcd6e0"
      />
      {/* Fruit layer */}
      <motion.rect
        x="124"
        y={fruitY}
        width="112"
        height={fruitHeight}
        fill="var(--flavour)"
        opacity={0.85}
      />
      {/* Vodka layer */}
      <motion.rect
        x="124"
        y={vodkaY}
        width="112"
        height={vodkaHeight}
        fill="rgba(255,255,255,0.55)"
      />

      {/* Labels */}
      <g fontFamily="var(--font-mono)" fontSize="11" fill="var(--muted-on-cream)" letterSpacing="0.2em">
        <line x1="248" y1="370" x2="288" y2="370" stroke="var(--ink)" strokeOpacity="0.3" />
        <text x="296" y="374" className={cn(active === 0 ? "font-semibold" : "")} fill={active === 0 ? "var(--flavour-deep)" : "var(--muted-on-cream)"}>WATER</text>

        <line x1="248" y1="310" x2="288" y2="310" stroke="var(--ink)" strokeOpacity="0.3" />
        <text x="296" y="314" fill={active === 1 ? "var(--flavour-deep)" : "var(--muted-on-cream)"}>FRUIT</text>

        <line x1="248" y1="250" x2="288" y2="250" stroke="var(--ink)" strokeOpacity="0.3" />
        <text x="296" y="254" fill={active === 2 ? "var(--flavour-deep)" : "var(--muted-on-cream)"}>VODKA</text>
      </g>

      {/* Lemon / wedge garnish */}
      {active === 2 && (
        <motion.g
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <circle cx="200" cy="115" r="14" fill="var(--flavour)" />
          <circle cx="200" cy="115" r="9" fill="var(--cream)" opacity="0.4" />
        </motion.g>
      )}
    </svg>
  )
}

/* ─── Comparison Strip ────────────────────────────────────── */

function ComparisonStrip() {
  const cell = (v: string) => {
    if (v === "yes")
      return (
        <span className="inline-flex items-center gap-2 text-[var(--flavour)]">
          <Check className="h-3.5 w-3.5" /> Yes
        </span>
      )
    if (v === "no")
      return (
        <span className="inline-flex items-center gap-2 text-[var(--muted-on-ink)]">
          <Minus className="h-3.5 w-3.5" /> No
        </span>
      )
    return (
      <span className="inline-flex items-center gap-2 text-[var(--muted-on-ink)]">
        {v[0].toUpperCase() + v.slice(1)}
      </span>
    )
  }

  const cols = [
    { id: "south", label: "South Side", emphasis: true },
    { id: "seltzer", label: "Mass hard seltzer", emphasis: false },
    { id: "premixed", label: "Premixed cocktail", emphasis: false },
  ] as const

  return (
    <section className="py-24 lg:py-32 border-b border-[var(--ink-3)]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="cream">Why South Side</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
              South Side vs. the alternatives.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-[var(--muted-on-ink)] max-w-md">
              Honest comparison. We say "partial" when something is partial.
              We say "depends" when it depends on the brand.
            </p>
          </div>
        </div>
        <div className="mt-12 border border-[var(--ink-3)] overflow-x-auto">
          <table className="w-full text-[14px] min-w-[640px]">
            <thead>
              <tr className="bg-[var(--ink-2)]">
                <th className="text-left p-5 font-medium text-[var(--muted-on-ink)] font-mono text-[11px] tracking-[0.18em]">
                  Capability
                </th>
                {cols.map((c) => (
                  <th
                    key={c.id}
                    className={cn(
                      "text-left p-5 font-medium font-mono text-[11px] tracking-[0.18em]",
                      c.emphasis ? "text-[var(--flavour)]" : "text-[var(--muted-on-ink)]",
                    )}
                  >
                    {c.label.toUpperCase()}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-t border-[var(--ink-3)]",
                    i % 2 === 1 && "bg-[var(--ink-2)]/40",
                  )}
                >
                  <td className="p-5 text-[var(--cream)]">{row.label}</td>
                  <td className="p-5">{cell(row.south)}</td>
                  <td className="p-5">{cell(row.seltzer)}</td>
                  <td className="p-5">{cell(row.premixed)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}

/* ─── Stockist Locator ────────────────────────────────────── */

function StockistLocator() {
  return (
    <section
      id="stockists"
      className="section-light bg-[var(--cream)] text-[var(--ink)] border-b border-[var(--cream-3)] py-24 lg:py-32"
    >
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="ink">Find your nearest can</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
              Pick n Pay. Spar. Liquor City.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-[15px] text-[var(--muted-on-cream)] max-w-md">
              South Side is stocked in chilled aisles at major retailers across
              South Africa. The locator on south-side.co.za returns the
              closest store to you.
            </p>
          </div>
        </div>
        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-[var(--cream-3)]">
          {STOCKISTS.map((s, i) => (
            <Reveal
              key={s.name}
              delay={i * 0.08}
              className="bg-[var(--cream)] p-7 lg:p-8 min-h-[200px] flex flex-col gap-4"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--flavour-deep)]">
                0{i + 1} · STOCKIST
              </div>
              <div className="font-display text-[26px] font-semibold tracking-[-0.025em]">
                {s.name}
              </div>
              <div className="text-[13px] text-[var(--muted-on-cream)] mt-auto">
                {s.note}
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-12 flex items-center gap-6">
          <MagneticCTA href={STORE_LOCATOR}>
            <MapPin className="h-4 w-4" />
            Open the locator
            <ArrowRight className="h-4 w-4" />
          </MagneticCTA>
          <SecondaryCTA href={PRODUCTS} external tone="light">
            Browse the range
          </SecondaryCTA>
        </div>
      </Container>
    </section>
  )
}

function MagneticCTA({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduceMotion = useReducedMotion()
  const [offset, setOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  function handleMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduceMotion) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / rect.width
    const dy = (e.clientY - cy) / rect.height
    setOffset({ x: dx * 8, y: dy * 6 })
  }

  function handleLeave() {
    setOffset({ x: 0, y: 0 })
  }

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition: offset.x === 0 ? "transform 0.4s cubic-bezier(0.22, 0.61, 0.36, 1)" : "transform 0.08s linear",
      }}
      className="inline-flex items-center gap-2 bg-[var(--ink)] text-[var(--cream)] px-6 py-3.5 text-[14.5px] font-medium tracking-tight rounded-[2px] hover:bg-[var(--ink-2)]"
    >
      {children}
    </a>
  )
}

/* ─── In The Wild ─────────────────────────────────────────── */

function InTheWild() {
  return (
    <section className="py-24 lg:py-32 border-b border-[var(--ink-3)]">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <Eyebrow tone="cream">In the wild</Eyebrow>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-semibold leading-[1.02] tracking-[-0.025em]">
              What we wrote. Where to find us.
            </h2>
          </div>
          <div className="lg:col-span-5 lg:text-right">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-[14px] text-[var(--cream)] hover:text-[var(--flavour)] transition-colors"
            >
              <Camera className="h-4 w-4" />
              @south_side_hard_soda
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-px bg-[var(--ink-3)]">
          {IN_THE_WILD.map((card, i) => (
            <Reveal
              key={card.title}
              delay={i * 0.08}
              className="bg-[var(--ink)] p-7 lg:p-8 flex flex-col gap-5 min-h-[300px] group"
            >
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--flavour)]">
                {card.eyebrow}
              </div>
              <h3 className="font-display text-[20px] font-semibold tracking-[-0.02em] leading-[1.2]">
                {card.title}
              </h3>
              <p className="text-[13.5px] text-[var(--muted-on-ink)] leading-[1.55]">
                {card.body}
              </p>
              <a
                href={card.href}
                target="_blank"
                rel="noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-[13px] text-[var(--cream)] group-hover:text-[var(--flavour)]"
              >
                {card.cta}
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

/* ─── Site Footer ─────────────────────────────────────────── */

function SiteFooter() {
  return (
    <footer className="border-t border-[var(--ink-3)] bg-[var(--ink)] py-16">
      <Container>
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3">
              <SouthSideMark className="h-8 w-auto" />
              <span className="font-display text-[17px] font-semibold tracking-[-0.01em]">
                South Side
              </span>
            </div>
            <p className="mt-5 max-w-md text-[13.5px] leading-[1.55] text-[var(--muted-on-ink)]">
              A premium hard soda from South Africa. Real fruit. Real vodka.
              Real refreshment, in a can. 5% ABV · 72 calories · 3g sugar ·
              gluten-free.
            </p>
            <div className="mt-7">
              <a
                href={STORE_LOCATOR}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[var(--cream)] text-[var(--ink)] px-5 py-2.5 text-[13px] font-medium tracking-tight rounded-[2px]"
              >
                Find a store
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
          <FooterColumn
            title="Shop"
            links={[
              { label: "All flavours", href: PRODUCTS },
              { label: "Store locator", href: STORE_LOCATOR },
            ]}
          />
          <FooterColumn
            title="Explore"
            links={[
              { label: "Flavours", href: "#flavours" },
              { label: "Recipe", href: "#recipe" },
              { label: "Stockists", href: "#stockists" },
            ]}
          />
          <FooterColumn
            title="Connect"
            links={[
              { label: "Instagram", href: INSTAGRAM },
              { label: "south-side.co.za", href: "https://www.south-side.co.za/" },
            ]}
          />
        </div>
        <div className="mt-14 pt-7 border-t border-[var(--ink-3)] flex flex-wrap items-center justify-between gap-4 text-[12px] text-[var(--muted-on-ink)]">
          <span>© {new Date().getFullYear()} South Side Hard Soda. Drink responsibly. 18+.</span>
          <span className="font-mono">
            v2 · rebuilt from the website-rebuild-pro skill
          </span>
        </div>
      </Container>
    </footer>
  )
}

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: { label: string; href: string }[]
}) {
  return (
    <div className="lg:col-span-2">
      <div className="font-mono text-[11px] tracking-[0.2em] text-[var(--flavour)]">
        {title.toUpperCase()}
      </div>
      <ul className="mt-5 space-y-3 text-[13.5px]">
        {links.map((l) => {
          const external = /^https?:/.test(l.href)
          const isHash = l.href.startsWith("#")
          const finalHref = external || isHash ? l.href : withBasePath(l.href)
          return (
            <li key={l.label}>
              <a
                className="text-[var(--muted-on-ink)] hover:text-[var(--cream)] inline-flex items-center gap-1.5"
                href={finalHref}
                {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {l.label}
                {external && <ArrowUpRight className="h-3 w-3" />}
              </a>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/* ─── Shared primitives ───────────────────────────────────── */

function Eyebrow({
  children,
  tone = "cream",
}: {
  children: React.ReactNode
  tone?: "cream" | "ink"
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase",
        tone === "cream" ? "text-[var(--muted-on-ink)]" : "text-[var(--muted-on-cream)]",
      )}
    >
      <span className="h-px w-8 bg-[var(--flavour)]" />
      {children}
    </span>
  )
}

function PrimaryCTA({
  href,
  children,
  external = false,
  tone = "dark",
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  tone?: "dark" | "light"
}) {
  const resolved = external || href.startsWith("#") ? href : withBasePath(href)
  return (
    <a
      href={resolved}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 text-[14.5px] font-medium tracking-tight rounded-[2px] transition-colors",
        tone === "dark"
          ? "bg-[var(--cream)] text-[var(--ink)] hover:bg-[var(--cream-2)]"
          : "bg-[var(--ink)] text-[var(--cream)] hover:bg-[var(--ink-2)]",
      )}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  )
}

function SecondaryCTA({
  href,
  children,
  external = false,
  tone = "dark",
}: {
  href: string
  children: React.ReactNode
  external?: boolean
  tone?: "dark" | "light"
}) {
  const resolved = external || href.startsWith("#") ? href : withBasePath(href)
  return (
    <a
      href={resolved}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={cn(
        "inline-flex items-center gap-1.5 text-[14px] font-medium tracking-tight transition-colors",
        tone === "dark"
          ? "text-[var(--cream)] hover:text-[var(--flavour)]"
          : "text-[var(--ink)] hover:text-[var(--flavour-deep)]",
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

/* ─── Unused but kept for parity with port443-v3 ──────────── */
export const _flavours = flavours
export type { Flavour, FlavourId }
