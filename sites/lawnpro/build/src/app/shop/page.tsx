import type { Metadata } from "next"
import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"

import { ProductCard } from "@/components/lawnpro/cards"
import { Container } from "@/components/lawnpro/frame"
import { Reveal } from "@/components/lawnpro/motion"
import { PageHero } from "@/components/lawnpro/page-hero"
import { catalogProducts, categories, sourceImages } from "@/lib/lawnpro"

export const metadata: Metadata = {
  title: "Shop",
  description: "Browsable local rebuild of the current LawnPro shop catalog and product categories.",
}

export default function ShopPage() {
  return (
    <>
      <PageHero
        eyebrow="LawnPro shop"
        title="A storefront for the outdoor room."
        description="The local catalog keeps current source shop paths browsable: seeds, DIY lawn support, accessories, garden lighting, combos, and seasonal finds."
        image={sourceImages.panoramicGarden}
        primary={{ href: "#catalog", label: "Browse catalog" }}
        secondary={{ href: "/products", label: "Product guide" }}
      >
        <ShoppingBag className="size-8 text-moss" aria-hidden />
        <p className="mt-6 text-3xl font-black tracking-[-0.05em]">{catalogProducts.length} source product paths</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-bark/60">
          Prices are staged from the May 2026 scrape for local review. Live
          stock and checkout stay with LawnPro.
        </p>
      </PageHero>

      <section className="seed-field border-b border-forest/10 py-12">
        <Container className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category, index) => (
            <Reveal key={category.slug} delay={index * 0.035}>
              <Link
                href={`/product-category/${category.slug}`}
                className="group block min-h-full border border-forest/12 bg-white/78 p-5 transition hover:border-moss hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
              >
                <p className="font-mono text-xs font-black uppercase tracking-[0.24em] text-moss">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="display mt-5 text-2xl font-black tracking-[-0.055em]">{category.title}</h2>
                <p className="mt-3 text-sm font-semibold leading-6 text-bark/62">{category.description}</p>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-moss transition group-hover:text-forest">
                  Open
                  <ArrowRight className="size-4" aria-hidden />
                </span>
              </Link>
            </Reveal>
          ))}
        </Container>
      </section>

      <section id="catalog" className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal className="max-w-4xl">
            <p className="eyebrow text-moss">Catalog</p>
            <h2 className="display mt-5 text-balance text-5xl font-black tracking-[-0.075em] md:text-7xl">
              Shop routes, not a dead product grid.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {catalogProducts.map((product, index) => (
              <Reveal key={product.slug} delay={(index % 8) * 0.025}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
