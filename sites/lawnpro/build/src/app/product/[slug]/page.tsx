import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight, BadgeInfo, PackageCheck, ScanSearch } from "lucide-react"

import { ProductCard } from "@/components/lawnpro/cards"
import { Container } from "@/components/lawnpro/frame"
import { Reveal } from "@/components/lawnpro/motion"
import { PageHero } from "@/components/lawnpro/page-hero"
import {
  catalogProducts,
  categoryTitle,
  findProduct,
  productImage,
  productsForCategory,
  sourceImages,
} from "@/lib/lawnpro"

type ProductPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return catalogProducts.map((product) => ({ slug: product.slug }))
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = findProduct(slug)

  return { title: product?.title ?? "Product" }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = findProduct(slug)

  if (!product) {
    notFound()
  }

  const category = categoryTitle(product.category)
  const related = productsForCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3)

  return (
    <>
      <PageHero
        eyebrow={category?.title ?? "LawnPro product"}
        title={product.title}
        description="A local product-detail rebuild for the current LawnPro catalog. Use the product signal with LawnPro's diagnostic service path when the lawn needs advice too."
        image={sourceImages.panoramicGarden}
        primary={{ href: "/contact", label: "Ask about this item" }}
        secondary={{ href: "/shop", label: "Back to shop" }}
      >
        <p className="eyebrow text-moss">Captured price</p>
        <p className="mt-6 text-5xl font-black tracking-[-0.08em]">{product.price}</p>
        <p className="mt-3 text-sm font-semibold leading-6 text-bark/60">
          Local review pricing from the source scrape. Confirm current stock and
          checkout with LawnPro.
        </p>
      </PageHero>

      <section className="seed-field py-16 md:py-24">
        <Container className="grid gap-8 lg:grid-cols-[minmax(340px,.74fr)_1fr] lg:items-start">
          <Reveal className="relative grid aspect-square place-items-center overflow-hidden border border-forest/12 bg-white p-8 shadow-[0_28px_100px_rgba(28,51,20,.14)]">
            <Image src={productImage(product)} alt={product.title} fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-contain p-8" />
          </Reveal>
          <Reveal className="border border-forest/12 bg-white/82 p-6 md:p-9">
            <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-black text-moss transition hover:text-forest">
              <ArrowLeft className="size-4" aria-hidden />
              All shop items
            </Link>
            <h2 className="display mt-6 text-4xl font-black tracking-[-0.07em] text-forest md:text-6xl">
              Product context
            </h2>
            <div className="mt-7 grid gap-4">
              {[
                {
                  icon: PackageCheck,
                  title: "Catalog route",
                  body: "This local product page preserves the browsable source path without simulating a live WooCommerce order.",
                },
                {
                  icon: ScanSearch,
                  title: "Lawn fit",
                  body: "If it relates to turf, pests, seeds, or seasonal presentation, place it alongside a free analysis enquiry.",
                },
                {
                  icon: BadgeInfo,
                  title: "Live details",
                  body: "Stock, delivery, sale terms, and final payment remain live-LawnPro decisions.",
                },
              ].map((item) => (
                <article key={item.title} className="grid gap-3 border-t border-forest/10 pt-4 sm:grid-cols-[34px_1fr]">
                  <item.icon className="mt-1 size-5 text-moss" aria-hidden />
                  <div>
                    <h3 className="font-black">{item.title}</h3>
                    <p className="mt-2 leading-7 text-bark/65">{item.body}</p>
                  </div>
                </article>
              ))}
            </div>
            {category ? (
              <Link href={`/product-category/${category.slug}`} className="sun-button mt-8 inline-flex min-h-12 items-center gap-2 px-5 font-black text-forest">
                More {category.title}
                <ArrowRight className="size-4" aria-hidden />
              </Link>
            ) : null}
          </Reveal>
        </Container>
      </section>

      {related.length ? (
        <section className="bg-paper py-20">
          <Container>
            <Reveal>
              <p className="eyebrow text-moss">Related paths</p>
              <h2 className="display mt-5 text-4xl font-black tracking-[-0.07em] md:text-6xl">
                Keep browsing {category?.title ?? "products"}.
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {related.map((item, index) => (
                <Reveal key={item.slug} delay={index * 0.05}>
                  <ProductCard product={item} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  )
}
