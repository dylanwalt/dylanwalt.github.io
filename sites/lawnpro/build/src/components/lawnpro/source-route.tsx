import type { ReactNode } from "react"
import Link from "next/link"
import { ArrowRight, FileText } from "lucide-react"

import { Container } from "@/components/lawnpro/frame"
import { PageHero } from "@/components/lawnpro/page-hero"
import { sourceImages } from "@/lib/lawnpro"

export function SourceRoute({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <>
      <PageHero
        eyebrow={eyebrow}
        title={title}
        description={description}
        image={sourceImages.panoramicGarden}
        primary={{ href: "/contact", label: "Contact LawnPro" }}
        secondary={{ href: "/shop", label: "Shop route" }}
      >
        <FileText className="size-8 text-moss" aria-hidden />
        <p className="mt-6 font-black leading-7 text-bark/70">
          This route preserves a source-site path for local review while live
          legal, cart, payment, and stock behavior remain with LawnPro.
        </p>
      </PageHero>
      <section className="bg-paper py-16 md:py-24">
        <Container className="max-w-5xl">
          <article className="border border-forest/12 bg-cream p-6 text-lg leading-8 text-bark/72 shadow-[0_24px_80px_rgba(31,52,22,.1)] md:p-10">
            {children}
            <Link href="/shop" className="sun-button mt-8 inline-flex min-h-12 items-center gap-2 px-5 font-black text-forest">
              Return to shop
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </article>
        </Container>
      </section>
    </>
  )
}
