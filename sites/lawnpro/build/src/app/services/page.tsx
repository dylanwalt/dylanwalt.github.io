import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, CircleDot, FlaskConical, ScanLine, Sprout } from "lucide-react"

import { TreatmentCard } from "@/components/lawnpro/cards"
import { ContactPanel } from "@/components/lawnpro/contact-panel"
import { Container } from "@/components/lawnpro/frame"
import { Reveal } from "@/components/lawnpro/motion"
import { PageHero } from "@/components/lawnpro/page-hero"
import { sourceImages, treatments } from "@/lib/lawnpro"

export const metadata: Metadata = {
  title: "Services",
  description: "LawnPro treatment paths for lawn dressing, lawn pressure, pests, compacted turf, winter colour, and diagnosis.",
}

const diagnosticStages = [
  {
    title: "Inspect",
    body: "Read the grass, weeds, insects, diseases, and environmental context before choosing treatment.",
    icon: ScanLine,
  },
  {
    title: "Prepare",
    body: "Open the turf where soil, compaction, dressing, or establishment needs a reset.",
    icon: Sprout,
  },
  {
    title: "Treat",
    body: "Direct pest, seasonal, product, or visual treatment at the problem actually present.",
    icon: FlaskConical,
  },
  {
    title: "Monitor",
    body: "Keep maintenance and timing in the plan instead of treating a lawn as a single visit.",
    icon: CircleDot,
  },
]

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="LawnPro services"
        title="Treat the lawn below the green surface."
        description="A better lawn is diagnostic work: dressing, weeds, establishment, compaction, pests, presentation, and seasonal conditions arranged around what the turf is telling you."
        image={sourceImages.services}
        primary={{ href: "/contact", label: "Start the analysis" }}
        secondary={{ href: "/seasonal-maintenance", label: "Seasonal care" }}
      >
        <p className="eyebrow text-moss">Treatment board</p>
        <div className="mt-5 grid gap-4">
          {["Lawn dressing", "Verticutting and spiking", "Mole crickets and termites", "Lawn paint or dye"].map((item, index) => (
            <div key={item} className="flex items-center justify-between gap-4 border-b border-forest/10 pb-3 text-sm font-black last:border-b-0 last:pb-0">
              <span className="font-mono text-moss">0{index + 1}</span>
              <span className="flex-1">{item}</span>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal className="grid gap-5 border-b border-forest/12 pb-9 lg:grid-cols-[.8fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-moss">Service catalogue</p>
              <h2 className="display mt-5 text-5xl font-black leading-[.98] tracking-[-0.075em] text-forest md:text-7xl">
                Eight ways the lawn asks for help.
              </h2>
            </div>
            <p className="max-w-2xl text-lg font-semibold leading-8 text-bark/68 lg:justify-self-end">
              These are source LawnPro treatment subjects restaged as a clearer
              clinic board. The free analysis decides which treatment actually
              belongs in a lawn plan.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-5 xl:grid-cols-2">
            {treatments.map((treatment, index) => (
              <Reveal key={treatment.slug} delay={index * 0.035}>
                <TreatmentCard treatment={treatment} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="soil-cut py-20 text-cream md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[.72fr_1fr]">
          <Reveal>
            <p className="eyebrow text-sun">Clinic sequence</p>
            <h2 className="display mt-5 text-5xl font-black leading-[.98] tracking-[-0.075em] md:text-6xl">
              One lawn. Four decisions.
            </h2>
            <p className="mt-5 max-w-md text-lg leading-8 text-cream/66">
              An immersive page still needs a clear process. These stages keep
              the LawnPro analysis central when a visitor arrives with symptoms.
            </p>
            <Link href="/products" className="mt-7 inline-flex items-center gap-2 font-black text-sun transition hover:text-white">
              See product paths
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          <div className="grid gap-px overflow-hidden border border-white/14 bg-white/14 md:grid-cols-2">
            {diagnosticStages.map((stage, index) => (
              <Reveal key={stage.title} delay={index * 0.05} className="bg-forest-deep/88 p-6 md:p-8">
                <stage.icon className="size-7 text-sun" aria-hidden />
                <p className="mt-8 font-mono text-xs font-black tracking-[0.24em] text-white/42">0{index + 1}</p>
                <h3 className="display mt-3 text-3xl font-black tracking-[-0.06em]">{stage.title}</h3>
                <p className="mt-4 leading-7 text-cream/62">{stage.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ContactPanel />
    </>
  )
}
