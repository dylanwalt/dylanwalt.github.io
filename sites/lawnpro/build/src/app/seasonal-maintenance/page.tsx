import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Bug, Flower2, Layers3, Snowflake } from "lucide-react"

import { ContactPanel } from "@/components/lawnpro/contact-panel"
import { Container } from "@/components/lawnpro/frame"
import { Reveal } from "@/components/lawnpro/motion"
import { PageHero } from "@/components/lawnpro/page-hero"
import { seasonalPrograms, sourceImages } from "@/lib/lawnpro"

export const metadata: Metadata = {
  title: "Seasonal Maintenance",
  description: "Seasonal LawnPro maintenance for pests, lawn and garden fertiliser, composting, and winter preparation.",
}

const seasonalSignals = [
  { title: "Mole crickets", icon: Bug, copy: "Source maintenance content names them as a major lawn-owner headache." },
  { title: "Termites", icon: Layers3, copy: "Hidden damage earns a dedicated maintenance and pest response path." },
  { title: "Fertiliser", icon: Flower2, copy: "Seasonal nutrition connects lawn and garden decisions." },
  { title: "Winter", icon: Snowflake, copy: "Preparation can protect the spring story before growth returns." },
]

export default function SeasonalMaintenancePage() {
  return (
    <>
      <PageHero
        eyebrow="Seasonal maintenance"
        title="Let the lawn move with the season."
        description="Pests, feeding, composting, monitoring, winter care, and the next growth window belong in one rhythm."
        image={sourceImages.seasonal}
        primary={{ href: "/seasonal-maintenance/winter", label: "Winter program" }}
        secondary={{ href: "/contact", label: "Ask for analysis" }}
      >
        <p className="eyebrow text-moss">Season scan</p>
        <div className="mt-5 space-y-4">
          {seasonalSignals.map((signal) => (
            <div key={signal.title} className="flex gap-3">
              <signal.icon className="mt-0.5 size-5 shrink-0 text-moss" aria-hidden />
              <div>
                <p className="font-black">{signal.title}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-bark/58">{signal.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal className="max-w-4xl">
            <p className="eyebrow text-moss">Maintenance circuit</p>
            <h2 className="display mt-5 text-balance text-5xl font-black tracking-[-0.075em] text-forest md:text-7xl">
              Time exposes the lawn problems a photo cannot.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-px overflow-hidden border border-forest/12 bg-forest/12 md:grid-cols-2">
            {seasonalPrograms.map((program, index) => (
              <Reveal key={program.title} delay={index * 0.05} className="group bg-cream">
                <article className="grid min-h-full md:grid-cols-[220px_1fr]">
                  <div className="relative min-h-64 overflow-hidden">
                    <Image
                      src={program.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 220px, 100vw"
                      className="object-cover transition duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <p className="eyebrow text-moss">{program.season}</p>
                    <h3 className="display mt-5 text-3xl font-black tracking-[-0.06em]">{program.title}</h3>
                    <p className="mt-4 leading-7 text-bark/68">{program.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="seed-field py-16 md:py-20">
        <Container className="grid overflow-hidden border border-forest/12 bg-white lg:grid-cols-[1fr_.9fr]">
          <div className="p-6 md:p-10">
            <p className="eyebrow text-moss">Deep route</p>
            <h2 className="display mt-5 text-4xl font-black tracking-[-0.07em] text-forest md:text-6xl">
              Winter has its own playbook.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-bark/68">
              LawnPro&apos;s winter page spotlights conditioning, targeted pests,
              weed management, disease protection, monitoring, a time-bound
              offer, and included winter products.
            </p>
            <Link href="/seasonal-maintenance/winter" className="sun-button mt-7 inline-flex min-h-12 items-center gap-2 px-5 font-black text-forest">
              Open winter care
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="relative min-h-[380px]">
            <Image src={sourceImages.winterWhy} alt="Winter lawn care asset" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
          </div>
        </Container>
      </section>

      <ContactPanel />
    </>
  )
}
