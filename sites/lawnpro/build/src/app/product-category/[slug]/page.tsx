import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, ArrowRight } from "lucide-react"

import { ProductCard } from "@/components/lawnpro/cards"
import { Container } from "@/components/lawnpro/frame"
import { Reveal } from "@/components/lawnpro/motion"
import { PageHero } from "@/components/lawnpro/page-hero"
import { categories, categoryTitle, productsForCategory, sourceImages } from "@/lib/lawnpro"

type CategoryPageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }))
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = categoryTitle(slug)

  return { title: category?.title ?? "Shop Category" }
}

export default async function ProductCategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = categoryTitle(slug)

  if (!category) {
    notFound()
  }

  const products = productsForCategory(category.slug)

  return (
    <>
      <PageHero
        eyebrow="Shop category"
        title={category.title}
        description={category.description}
        image={sourceImages.products}
        primary={{ href: "/shop", label: "All shop items" }}
        secondary={{ href: "/contact", label: "Ask LawnPro" }}
      >
        <p className="eyebrow text-moss">Category yield</p>
        <p className="mt-6 text-5xl font-black tracking-[-0.08em]">{products.length}</p>
        <p className="mt-2 font-bold text-bark/62">Catalog paths in this rebuild.</p>
      </PageHero>

      <section className="bg-paper py-20 md:py-28">
        <Container>
          <Reveal className="flex flex-col gap-5 border-b border-forest/12 pb-8 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link href="/shop" className="inline-flex items-center gap-2 text-sm font-black text-moss transition hover:text-forest">
                <ArrowLeft className="size-4" aria-hidden />
                Back to shop
              </Link>
              <h2 className="display mt-5 text-5xl font-black tracking-[-0.075em]">Browse {category.title}</h2>
            </div>
            <Link href="/products" className="inline-flex items-center gap-2 font-black text-moss transition hover:text-forest">
              Product guidance
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
          {products.length ? (
            <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product, index) => (
                <Reveal key={product.slug} delay={(index % 8) * 0.035}>
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-9 border border-forest/12 bg-cream p-8 text-lg font-bold text-bark/68">
              This source category exists but the current captured product list
              does not expose active local items here yet.
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
