"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Bug,
  Crosshair,
  Leaf,
  Scissors,
  ShieldCheck,
  ShoppingBasket,
  Sprout,
  SunMedium,
  Tractor,
} from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"

import { ContactPanel } from "@/components/lawnpro/contact-panel"
import { Container } from "@/components/lawnpro/frame"
import { MotionRoot, Reveal } from "@/components/lawnpro/motion"
import { ProductCard } from "@/components/lawnpro/cards"
import {
  catalogProducts,
  proofPoints,
  seasonalPrograms,
  sourceImages,
  treatments,
} from "@/lib/lawnpro"

const scanPoints = [
  { title: "Grass", detail: "Variety, density, colour" },
  { title: "Soil", detail: "Compaction, nutrition, moisture" },
  { title: "Pressure", detail: "Pests, weeds, disease" },
  { title: "Season", detail: "Winter and growth timing" },
]

const testimonials = [
  {
    quote:
      "Our rebuild keeps LawnPro's strongest proof close to the lawn itself: expertise that sees the problem before treatment.",
    name: "Treatment story",
  },
  {
    quote:
      "The source testimonials point to lawns transformed through attentive service, clear communication, and dependable follow-through.",
    name: "Homeowner confidence",
  },
]

export function HomeExperience() {
  return (
    <MotionRoot>
      <div className="overflow-x-clip">
        <HomeHero />
        <ProofRail />
        <TreatmentTheatre />
        <SeasonalOrbit />
        <ShopGlasshouse />
        <FranchiseTrail />
        <TestimonialCut />
        <ContactPanel />
      </div>
    </MotionRoot>
  )
}

function HomeHero() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const lawnShift = useTransform(scrollY, [0, 820], [0, reduceMotion ? 0 : 112])
  const tint = useTransform(scrollY, [0, 540], [1, 0.72])

  return (
    <section className="relative isolate min-h-[calc(100svh-78px)] overflow-hidden bg-forest-deep text-cream">
      <motion.div style={{ y: lawnShift }} className="absolute inset-0 -z-30">
        <Image
          src={sourceImages.panoramicHome}
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <motion.div
        style={{ opacity: tint }}
        className="absolute inset-0 -z-20 bg-[linear-gradient(100deg,rgba(5,19,8,.98)_0%,rgba(5,19,8,.84)_48%,rgba(5,19,8,.34)_100%)]"
      />
      <div className="blade-grid absolute inset-0 -z-10 opacity-60" />
      <div className="absolute bottom-0 left-0 right-0 -z-10 h-48 bg-gradient-to-t from-forest-deep to-transparent" />

      <Container className="grid min-h-[calc(100svh-78px)] items-end gap-10 pb-10 pt-16 lg:grid-cols-[minmax(0,1fr)_410px] lg:pb-16">
        <div className="max-w-5xl">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="eyebrow text-sun"
          >
            Lawn doctor · South Africa
          </motion.p>
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.72 }}
            className="display mt-5 text-balance text-6xl font-black leading-[.88] tracking-[-0.095em] sm:text-7xl md:text-[clamp(5.4rem,10vw,10.6rem)]"
          >
            LawnPro
          </motion.h1>
          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.62 }}
            className="mt-5 max-w-3xl text-pretty text-lg leading-8 text-cream/80 md:text-2xl md:leading-9"
          >
            Bring golf-course discipline home: analyse the lawn, treat the
            pressure underneath it, season the care plan, and keep the outdoor
            room alive from root to tip.
          </motion.p>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.26, duration: 0.54 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/contact" className="sun-button inline-flex min-h-14 items-center justify-center gap-2 px-6 font-black text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun">
              Request the free analysis
              <ArrowRight className="size-5" aria-hidden />
            </Link>
            <Link href="/services" className="inline-flex min-h-14 items-center justify-center border border-white/25 bg-white/12 px-6 font-extrabold text-white backdrop-blur transition hover:border-white hover:bg-white/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun">
              Explore treatments
            </Link>
            <Link href="/shop" className="inline-flex min-h-14 items-center justify-center gap-2 px-3 font-extrabold text-sun transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun">
              Shop essentials
              <ShoppingBasket className="size-4" aria-hidden />
            </Link>
          </motion.div>
        </div>

        <DiagnosticPanel reduceMotion={Boolean(reduceMotion)} />
      </Container>
    </section>
  )
}

function DiagnosticPanel({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.aside
      initial={reduceMotion ? false : { opacity: 0, x: 28 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.2, duration: 0.72 }}
      className="leaf-panel relative overflow-hidden p-5 text-forest shadow-[0_32px_120px_rgba(1,10,3,.42)] md:p-6"
      aria-label="Lawn analysis preview"
    >
      <div className="flex items-start justify-between gap-5">
        <div>
          <p className="eyebrow text-moss">Diagnostic sweep</p>
          <h2 className="display mt-4 text-4xl font-black tracking-[-0.07em]">
            14 points
          </h2>
        </div>
        <Crosshair className="size-9 text-moss" aria-hidden />
      </div>
      <p className="mt-3 max-w-xs leading-7 text-bark/68">
        The first conversion is expertise: read the lawn before deciding how to
        dress, feed, protect, colour, or re-seed it.
      </p>
      <div className="relative mt-6 overflow-hidden border-y border-forest/12">
        {!reduceMotion ? (
          <motion.span
            animate={{ x: ["-120%", "220%"] }}
            transition={{ duration: 3.2, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
            className="scan-line absolute inset-y-0 z-10 w-32"
          />
        ) : null}
        {scanPoints.map((point, index) => (
          <div key={point.title} className="grid grid-cols-[42px_1fr] gap-3 border-b border-forest/10 py-4 last:border-b-0">
            <span className="font-mono text-sm font-black text-moss">0{index + 1}</span>
            <div>
              <p className="font-black">{point.title}</p>
              <p className="mt-1 text-sm font-semibold text-bark/58">{point.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.aside>
  )
}

function ProofRail() {
  return (
    <section className="border-b border-forest/10 bg-sun text-forest">
      <Container className="grid divide-y divide-forest/15 md:grid-cols-4 md:divide-x md:divide-y-0">
        {proofPoints.map((point) => (
          <article key={point.title} className="py-6 md:px-6">
            <p className="display text-3xl font-black tracking-[-0.07em]">{point.value}</p>
            <h2 className="mt-2 text-sm font-black uppercase tracking-[0.16em]">{point.title}</h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-forest/68">{point.description}</p>
          </article>
        ))}
      </Container>
    </section>
  )
}

function TreatmentTheatre() {
  const stageTreatments = treatments.slice(0, 6)
  const icons = [Sprout, Scissors, ShieldCheck, Leaf, Bug, Tractor]

  return (
    <section className="soil-cut relative overflow-hidden py-20 text-cream md:py-28">
      <Container>
        <Reveal className="grid gap-6 border-b border-white/16 pb-10 lg:grid-cols-[.92fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-sun">Treatment theatre</p>
            <h2 className="display mt-5 text-balance text-5xl font-black leading-[.98] tracking-[-0.075em] md:text-7xl">
              Problems become a care path.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-cream/68 lg:justify-self-end">
            LawnPro does more than mow a green surface. The service route spans
            dressing, weed pressure, instant lawn, opening compact turf, pests,
            and seasonal presentation.
          </p>
        </Reveal>

        <div className="mt-5 divide-y divide-white/14">
          {stageTreatments.map((treatment, index) => {
            const Icon = icons[index]

            return (
              <Reveal key={treatment.slug} delay={index * 0.04}>
                <article className="group grid gap-5 py-7 md:grid-cols-[90px_minmax(0,.75fr)_minmax(320px,1fr)] md:items-center">
                  <div className="flex items-center gap-4 font-mono text-sm font-black text-sun">
                    <Icon className="size-5" aria-hidden />
                    0{index + 1}
                  </div>
                  <div>
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-cream/42">{treatment.signal}</p>
                    <h3 className="display mt-3 text-3xl font-black tracking-[-0.06em] md:text-4xl">
                      {treatment.title}
                    </h3>
                  </div>
                  <div className="grid gap-4 md:grid-cols-[1fr_170px] md:items-center">
                    <p className="leading-7 text-cream/65">{treatment.description}</p>
                    <div className="relative hidden h-28 overflow-hidden border border-white/14 md:block">
                      <Image
                        src={treatment.image.src}
                        alt={treatment.image.alt}
                        fill
                        sizes="170px"
                        className="object-cover transition duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </div>
        <Reveal className="mt-9">
          <Link href="/services" className="inline-flex min-h-12 items-center gap-2 border border-sun bg-sun px-5 font-black text-forest transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun">
            Enter all LawnPro services
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}

function SeasonalOrbit() {
  return (
    <section className="relative overflow-hidden bg-paper py-20 md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[minmax(380px,.78fr)_1fr]">
        <Reveal className="relative min-h-[620px] overflow-hidden border border-forest/12 shadow-[0_30px_100px_rgba(32,51,24,.18)]">
          <Image
            src={sourceImages.winterOffer}
            alt="LawnPro winter product offer image"
            fill
            sizes="(min-width: 1024px) 42vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-deep via-forest-deep/80 to-transparent p-6 pt-28 text-cream md:p-8">
            <p className="eyebrow text-sun">Winter route</p>
            <h3 className="display mt-4 text-4xl font-black tracking-[-0.07em]">
              Dormant does not mean ignored.
            </h3>
            <Link href="/seasonal-maintenance/winter" className="mt-5 inline-flex items-center gap-2 font-black text-sun transition hover:text-white">
              See the winter program
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-moss">Seasonal maintenance</p>
            <h2 className="display mt-5 text-balance text-5xl font-black leading-[.98] tracking-[-0.075em] text-forest md:text-7xl">
              A lawn is a calendar, not a one-off fix.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-bark/70">
              Keep feeding, composting, pest pressure, and winter protection in
              one care rhythm instead of waiting for the lawn to announce
              failure.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden border border-forest/12 bg-forest/12 sm:grid-cols-2">
            {seasonalPrograms.map((program, index) => (
              <Reveal key={program.title} delay={index * 0.05} className="group bg-cream">
                <article className="grid min-h-full grid-rows-[180px_1fr]">
                  <div className="relative overflow-hidden">
                    <Image src={program.image} alt="" fill sizes="(min-width: 640px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs font-black uppercase tracking-[0.22em] text-moss">{program.season}</p>
                    <h3 className="display mt-3 text-2xl font-black tracking-[-0.05em] text-forest">{program.title}</h3>
                    <p className="mt-3 text-sm font-semibold leading-6 text-bark/65">{program.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}

function ShopGlasshouse() {
  const featuredProducts = catalogProducts.filter((product) => product.image).slice(0, 4)

  return (
    <section className="seed-field border-y border-forest/10 py-20 md:py-28">
      <Container>
        <Reveal className="grid gap-6 lg:grid-cols-[.8fr_1fr] lg:items-end">
          <div>
            <p className="eyebrow text-moss">Products and shop</p>
            <h2 className="display mt-5 text-balance text-5xl font-black leading-[.98] tracking-[-0.075em] text-forest md:text-7xl">
              The care plan can leave with you.
            </h2>
          </div>
          <p className="max-w-2xl text-lg font-semibold leading-8 text-bark/68 lg:justify-self-end">
            Browse seeds, DIY products, accessories, lights, bundles, and
            seasonal garden finds surfaced from the current LawnPro shop.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <Reveal key={product.slug} delay={index * 0.06}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/products" className="sun-button inline-flex min-h-12 items-center justify-center gap-2 px-5 font-black text-forest">
            Explore LawnPro products
            <ArrowRight className="size-4" aria-hidden />
          </Link>
          <Link href="/shop" className="inline-flex min-h-12 items-center justify-center border border-forest/16 bg-white/72 px-5 font-black text-forest transition hover:bg-white">
            Browse the local shop route
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}

function FranchiseTrail() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <Container className="grid gap-0 overflow-hidden border border-forest/12 bg-forest-deep text-cream shadow-[0_30px_120px_rgba(29,50,21,.2)] lg:grid-cols-[minmax(0,1fr)_minmax(420px,.88fr)]">
        <div className="relative min-h-[440px]">
          <Image src={sourceImages.panoramicOasis} alt="A garden lawn scene" fill sizes="(min-width: 1024px) 54vw, 100vw" className="object-cover opacity-72" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,23,11,.18),rgba(7,23,11,.85))]" />
          <div className="absolute bottom-6 left-6 leaf-panel flex max-w-xs items-center gap-4 p-4 text-forest md:bottom-8 md:left-8">
            <Image src={sourceImages.franchiseTrailer} alt="" width={92} height={65} className="h-auto w-[92px]" />
            <p className="text-sm font-black leading-5">Trailer, stock path, training, territory.</p>
          </div>
        </div>
        <Reveal className="flex flex-col justify-center p-6 md:p-12">
          <p className="eyebrow text-sun">Franchise opportunity</p>
          <h2 className="display mt-5 text-balance text-5xl font-black leading-[.98] tracking-[-0.07em]">
            Own the outdoor service system.
          </h2>
          <p className="mt-5 text-lg leading-8 text-cream/68">
            The franchise route talks about training, equipment, marketing
            material, exclusive territory, supplier access, and the tested
            LawnPro model.
          </p>
          <Link href="/franchise" className="mt-7 inline-flex w-fit min-h-12 items-center gap-2 border border-sun bg-sun px-5 font-black text-forest transition hover:bg-cream">
            Open the franchise path
            <ArrowRight className="size-4" aria-hidden />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}

function TestimonialCut() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <Container>
        <Reveal className="max-w-3xl">
          <p className="eyebrow text-moss">Confidence proof</p>
          <h2 className="display mt-5 text-5xl font-black tracking-[-0.075em] text-forest">
            Expertise reads better when the lawn is the hero.
          </h2>
        </Reveal>
        <div className="mt-9 grid gap-5 lg:grid-cols-2">
          {testimonials.map((item, index) => (
            <Reveal key={item.name} delay={index * 0.08}>
              <blockquote className="min-h-full border-l-4 border-sun bg-cream p-6 shadow-[0_20px_70px_rgba(36,60,27,.08)] md:p-8">
                <p className="text-pretty text-2xl font-black leading-9 tracking-[-0.035em] text-forest">
                  “{item.quote}”
                </p>
                <footer className="mt-5 text-sm font-black uppercase tracking-[0.2em] text-moss">
                  {item.name}
                </footer>
              </blockquote>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex items-center gap-3 text-sm font-black uppercase tracking-[0.2em] text-bark/52">
          <SunMedium className="size-5 text-sun" aria-hidden />
          Designed around the source LawnPro treatment story.
        </Reveal>
      </Container>
    </section>
  )
}
