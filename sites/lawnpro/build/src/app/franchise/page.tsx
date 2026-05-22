import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, BadgeCheck, Map, Megaphone, PackageCheck, TentTree, Tractor } from "lucide-react"

import { ContactPanel } from "@/components/lawnpro/contact-panel"
import { Container } from "@/components/lawnpro/frame"
import { Reveal } from "@/components/lawnpro/motion"
import { PageHero } from "@/components/lawnpro/page-hero"
import { sourceImages } from "@/lib/lawnpro"

export const metadata: Metadata = {
  title: "Franchise",
  description: "LawnPro franchise opportunity route for owner-operators interested in territory, training, systems, and service support.",
}

const franchiseKit = [
  {
    icon: Tractor,
    title: "Equipment path",
    copy: "Source content calls out a trailer, equipment, and the practical tools of service.",
  },
  {
    icon: Map,
    title: "Exclusive territory",
    copy: "The franchise pitch frames a territory rather than a generic garden side hustle.",
  },
  {
    icon: Megaphone,
    title: "Marketing material",
    copy: "Systems, suppliers, and marketing support keep the business start concrete.",
  },
  {
    icon: BadgeCheck,
    title: "Training",
    copy: "Learn the LawnPro treatment process before selling the outdoor result.",
  },
]

const franchiseAnswers = [
  "Be your own boss with a lawn-focused service model.",
  "Use a system the source says has been tried and tested since 1992.",
  "Sell expertise, products, treatment cadence, and visible outdoor outcomes.",
  "Keep customer support and franchisor relationships in the operating loop.",
]

export default function FranchisePage() {
  return (
    <>
      <PageHero
        eyebrow="LawnPro franchise"
        title="Build the service trail behind the lawn."
        description="The franchise route is its own conversion path: territory, training, equipment, marketing material, supplier access, and a lawn-care system built for owner-operators."
        image={sourceImages.panoramicOasis}
        primary={{ href: "/contact", label: "Start franchise enquiry" }}
        secondary={{ href: "/services", label: "See services" }}
      >
        <p className="eyebrow text-moss">Source milestones</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="border border-forest/10 bg-white/65 p-4">
            <p className="display text-4xl font-black tracking-[-0.08em]">1992</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-bark/58">
              tested model claim
            </p>
          </div>
          <div className="border border-forest/10 bg-white/65 p-4">
            <p className="display text-4xl font-black tracking-[-0.08em]">2001</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-bark/58">
              franchising start
            </p>
          </div>
        </div>
      </PageHero>

      <section className="seed-field py-20 md:py-28">
        <Container className="grid gap-8 lg:grid-cols-[.75fr_1fr]">
          <Reveal>
            <p className="eyebrow text-moss">What is in it for me?</p>
            <h2 className="display mt-5 text-5xl font-black leading-[.98] tracking-[-0.075em] md:text-7xl">
              The offer should feel like a business, not a brochure.
            </h2>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-8 text-bark/68">
              LawnPro&apos;s source page asks direct franchise questions. The
              rebuild answers with enough operational substance to keep that
              enquiry honest.
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden border border-forest/12 bg-forest/12 sm:grid-cols-2">
            {franchiseKit.map((item, index) => (
              <Reveal key={item.title} delay={index * 0.05} className="bg-white p-6 md:p-8">
                <item.icon className="size-7 text-moss" aria-hidden />
                <h3 className="display mt-8 text-3xl font-black tracking-[-0.06em]">{item.title}</h3>
                <p className="mt-4 leading-7 text-bark/66">{item.copy}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="soil-cut py-20 text-cream md:py-28">
        <Container className="grid gap-0 overflow-hidden border border-white/14 lg:grid-cols-[1fr_.85fr]">
          <div className="relative min-h-[460px]">
            <Image src={sourceImages.panoramicHome} alt="Residential lawn" fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover opacity-76" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-forest-deep/74" />
            <div className="leaf-panel absolute bottom-6 left-6 max-w-sm p-5 text-forest md:bottom-8 md:left-8">
              <Image src={sourceImages.franchiseTrailer} alt="LawnPro franchise trailer graphic" width={210} height={120} className="h-auto w-[180px]" />
              <p className="mt-4 font-black leading-6">Trailer-level pragmatism, lawn-level aspiration.</p>
            </div>
          </div>
          <Reveal className="p-6 md:p-10">
            <p className="eyebrow text-sun">Operating promise</p>
            <h2 className="display mt-5 text-4xl font-black tracking-[-0.07em] md:text-6xl">
              Everything points back to a cared-for lawn.
            </h2>
            <div className="mt-7 space-y-4">
              {franchiseAnswers.map((answer) => (
                <p key={answer} className="flex gap-3 border-t border-white/14 pt-4 leading-7 text-cream/68">
                  <PackageCheck className="mt-1 size-5 shrink-0 text-sun" aria-hidden />
                  {answer}
                </p>
              ))}
            </div>
            <Link href="/contact" className="mt-8 inline-flex min-h-12 items-center gap-2 border border-sun bg-sun px-5 font-black text-forest transition hover:bg-cream">
              Move to the enquiry
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </Container>
      </section>

      <section className="bg-paper py-16 md:py-20">
        <Container className="flex flex-col gap-5 border-l-4 border-sun bg-cream p-6 shadow-[0_24px_80px_rgba(29,50,20,.1)] md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <p className="eyebrow text-moss">Who are we?</p>
            <h2 className="display mt-4 text-4xl font-black tracking-[-0.07em]">
              Lawn care expertise can be a territory.
            </h2>
          </div>
          <TentTree className="hidden size-16 text-moss md:block" aria-hidden />
        </Container>
      </section>

      <ContactPanel />
    </>
  )
}
