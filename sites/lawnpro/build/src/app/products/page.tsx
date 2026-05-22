import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Droplets, PackageOpen, Shovel, Sprout } from "lucide-react"

import { ProductCard } from "@/components/lawnpro/cards"
import { ContactPanel } from "@/components/lawnpro/contact-panel"
import { Container } from "@/components/lawnpro/frame"
import { Reveal } from "@/components/lawnpro/motion"
import { PageHero } from "@/components/lawnpro/page-hero"
import { catalogProducts, seedFamilies, sourceImages } from "@/lib/lawnpro"

export const metadata: Metadata = {
  title: "Products",
  description: "LawnPro product path for seedlings, lawn seeds, DIY lawn care products, frost guard blankets, and the shop.",
}

const productPillars = [
  {
    title: "Seedlings",
    copy: "Start with site assessment and a lawn variety path ready for planting.",
    icon: Sprout,
  },
  {
    title: "Seeds",
    copy: "Move through lawn seed families, spreader combos, and shade or all-year needs.",
    icon: PackageOpen,
  },
  {
    title: "DIY control",
    copy: "Pest, ant, frost, paint, and seasonal product paths support the service story.",
    icon: Shovel,
  },
  {
    title: "Garden living",
    copy: "Accessories, watering, grow bags, and lighting extend the outdoor room.",
    icon: Droplets,
  },
]

export default function ProductsPage() {
  const seedShop = catalogProducts.filter((product) => product.category === "seeds").slice(0, 6)

  return (
    <>
      <PageHero
        eyebrow="LawnPro products"
        title="Take the lawn clinic into the garden."
        description="Lawn seedlings, lawn seed families, DIY products, frost protection, ant care, accessories, and shop paths sit next to the treatment expertise."
        image={sourceImages.seedlings}
        primary={{ href: "/shop", label: "Browse shop" }}
        secondary={{ href: "/contact", label: "Ask what fits" }}
      >
        <p className="eyebrow text-moss">Product route</p>
        <div className="mt-5 grid gap-3">
          {productPillars.map((pillar) => (
            <div key={pillar.title} className="flex gap-3 border-b border-forest/10 pb-3 last:border-b-0 last:pb-0">
              <pillar.icon className="mt-0.5 size-5 shrink-0 text-moss" aria-hidden />
              <div>
                <p className="font-black">{pillar.title}</p>
                <p className="mt-1 text-sm font-semibold leading-6 text-bark/58">{pillar.copy}</p>
              </div>
            </div>
          ))}
        </div>
      </PageHero>

      <section className="seed-field py-20 md:py-28">
        <Container className="grid gap-10 lg:grid-cols-[.72fr_1fr]">
          <Reveal>
            <p className="eyebrow text-moss">Lawn seed atlas</p>
            <h2 className="display mt-5 text-5xl font-black leading-[.98] tracking-[-0.075em] md:text-7xl">
              Choose the turf future before it germinates.
            </h2>
            <p className="mt-5 max-w-lg text-lg font-semibold leading-8 text-bark/68">
              The source products route gives seed mixes their own visual
              sequence. This rebuild turns that gallery into an inspectable
              seed field.
            </p>
          </Reveal>
          <div className="grid gap-px overflow-hidden border border-forest/12 bg-forest/12 sm:grid-cols-2 xl:grid-cols-3">
            {seedFamilies.map((family, index) => (
              <Reveal key={family.title} delay={index * 0.045} className="group bg-white">
                <article>
                  <div className="relative aspect-[1.16] overflow-hidden">
                    <Image src={family.image} alt="" fill sizes="(min-width: 1280px) 20vw, (min-width: 640px) 34vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="display p-5 text-2xl font-black tracking-[-0.055em] text-forest">{family.title}</h3>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal className="grid gap-6 lg:grid-cols-[.86fr_1fr] lg:items-end">
            <div>
              <p className="eyebrow text-moss">Seed shop</p>
              <h2 className="display mt-5 text-5xl font-black tracking-[-0.075em] md:text-6xl">
                Current seed items surface here.
              </h2>
            </div>
            <Link href="/product-category/seeds" className="inline-flex w-fit items-center gap-2 font-black text-moss transition hover:text-forest lg:justify-self-end">
              View seed category
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {seedShop.map((product, index) => (
              <Reveal key={product.slug} delay={index * 0.04}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="soil-cut py-16 text-cream md:py-20">
        <Container className="grid items-center gap-8 lg:grid-cols-[360px_1fr]">
          <Reveal className="relative min-h-72 overflow-hidden border border-white/14">
            <Image src={sourceImages.frostGuard} alt="Frost guard blankets" fill sizes="360px" className="object-cover" />
          </Reveal>
          <Reveal>
            <p className="eyebrow text-sun">DIY support</p>
            <h2 className="display mt-5 text-balance text-4xl font-black tracking-[-0.07em] md:text-6xl">
              Seed is only one garden decision.
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-cream/68">
              Browse frost guard blankets, ant solutions, pest products, tools,
              grow bags, garden lighting, and care accessories without losing the
              service path.
            </p>
            <Link href="/shop" className="mt-7 inline-flex min-h-12 items-center gap-2 border border-sun bg-sun px-5 font-black text-forest transition hover:bg-cream">
              Enter the shop
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </Container>
      </section>

      <ContactPanel />
    </>
  )
}
