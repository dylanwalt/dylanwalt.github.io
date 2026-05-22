import type { Metadata } from "next"
import Image from "next/image"
import { BadgePercent, CalendarClock, ShieldPlus, Snowflake } from "lucide-react"

import { ContactPanel } from "@/components/lawnpro/contact-panel"
import { Container } from "@/components/lawnpro/frame"
import { Reveal } from "@/components/lawnpro/motion"
import { PageHero } from "@/components/lawnpro/page-hero"
import { sourceImages } from "@/lib/lawnpro"

export const metadata: Metadata = {
  title: "Winter Seasonal Program",
  description: "Winter-specific LawnPro seasonal care path for conditioning, protection, monitoring, and the current winter offer.",
}

const winterServices = [
  "Winter-strength fertiliser program",
  "Soil conditioning",
  "Targeted pest control",
  "Weed management",
  "Disease protection",
  "Ongoing monitoring plans",
]

export default function WinterProgramPage() {
  return (
    <>
      <PageHero
        eyebrow="Winter seasonal program"
        title="Spring winners are made in winter."
        description="The current source winter route ties fertilisers, soil conditioning, targeted pests, weeds, disease protection, monitoring, and a limited offer into one dormant-season decision."
        image={sourceImages.winterOffer}
        primary={{ href: "/contact", label: "Claim a winter enquiry" }}
        secondary={{ href: "/seasonal-maintenance", label: "All seasonal care" }}
      >
        <div className="flex gap-3">
          <Snowflake className="size-7 text-moss" aria-hidden />
          <div>
            <p className="eyebrow text-moss">Limited seasonal signal</p>
            <p className="mt-4 text-3xl font-black tracking-[-0.05em]">
              10% discount + 3 products
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-bark/60">
              Staged from the source offer route. Confirm live availability with
              LawnPro.
            </p>
          </div>
        </div>
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[.82fr_1fr]">
          <Reveal>
            <p className="eyebrow text-moss">Why it matters</p>
            <h2 className="display mt-5 text-5xl font-black leading-[.98] tracking-[-0.075em] md:text-7xl">
              Dormancy is still a treatment window.
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-bark/68">
              Winter content pushes the visitor away from neglect: protect the
              soil and surface now so spring starts stronger.
            </p>
          </Reveal>
          <Reveal className="relative min-h-[520px] overflow-hidden border border-forest/12 shadow-[0_30px_100px_rgba(30,54,19,.16)]">
            <Image src={sourceImages.winterWhy} alt="Winter lawn under seasonal care" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
          </Reveal>
        </Container>
      </section>

      <section className="soil-cut py-20 text-cream md:py-28">
        <Container>
          <Reveal className="grid gap-5 border-b border-white/14 pb-9 lg:grid-cols-[.78fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-sun">Winter-specific</p>
              <h2 className="display mt-5 text-5xl font-black tracking-[-0.075em] md:text-6xl">
                The maintenance board tightens up.
              </h2>
            </div>
            <p className="max-w-xl text-lg leading-8 text-cream/64 lg:justify-self-end">
              The winter route stays explicit in this rebuild so the offer is
              not buried inside generic seasonal copy.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-px overflow-hidden border border-white/14 bg-white/14 md:grid-cols-2 xl:grid-cols-3">
            {winterServices.map((item, index) => (
              <Reveal key={item} delay={index * 0.04} className="bg-forest-deep/92 p-6 md:p-8">
                <p className="font-mono text-sm font-black text-sun">0{index + 1}</p>
                <h3 className="mt-8 text-2xl font-black tracking-[-0.04em]">{item}</h3>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="seed-field py-16 md:py-20">
        <Container className="grid gap-5 md:grid-cols-3">
          {[
            { icon: ShieldPlus, title: "Protection", text: "Target pests, weeds, and disease before visible rebound." },
            { icon: CalendarClock, title: "Timing", text: "Use dormant-season monitoring as part of the care plan." },
            { icon: BadgePercent, title: "Offer", text: "Confirm the current limited slot and winter products with LawnPro." },
          ].map((item, index) => (
            <Reveal key={item.title} delay={index * 0.06} className="border border-forest/12 bg-white p-6 shadow-[0_20px_70px_rgba(33,56,24,.1)] md:p-8">
              <item.icon className="size-7 text-moss" aria-hidden />
              <h3 className="display mt-7 text-3xl font-black tracking-[-0.06em]">{item.title}</h3>
              <p className="mt-4 leading-7 text-bark/66">{item.text}</p>
            </Reveal>
          ))}
        </Container>
      </section>

      <ContactPanel />
    </>
  )
}
