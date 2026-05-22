import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import type { CatalogProduct, Treatment } from "@/lib/lawnpro"
import { productImage } from "@/lib/lawnpro"

export function TreatmentCard({ treatment }: { treatment: Treatment }) {
  return (
    <article className="group grid overflow-hidden border border-forest/12 bg-white shadow-[0_20px_80px_rgba(30,55,24,.08)] md:grid-cols-[230px_1fr]">
      <div className="relative min-h-56 overflow-hidden">
        <Image
          src={treatment.image.src}
          alt={treatment.image.alt}
          fill
          sizes="(min-width: 768px) 230px, 100vw"
          className="object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col justify-between p-6">
        <div>
          <p className="eyebrow text-moss">{treatment.signal}</p>
          <h3 className="display mt-3 text-3xl font-black tracking-[-0.06em] text-forest">
            {treatment.title}
          </h3>
          <p className="mt-4 leading-7 text-bark/74">{treatment.description}</p>
        </div>
        <Link
          href="/contact"
          className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-extrabold text-moss transition hover:text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
        >
          Add to analysis
          <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </article>
  )
}

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <Link
      href={`/product/${product.slug}`}
      className="group flex min-h-full flex-col overflow-hidden border border-forest/12 bg-white transition hover:-translate-y-1 hover:border-moss hover:shadow-[0_22px_70px_rgba(19,62,20,.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-forest"
    >
      <div className="relative isolate grid aspect-square place-items-center overflow-hidden bg-[#f6f1d6] p-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,.88),transparent_42%),linear-gradient(145deg,rgba(250,197,39,.22),transparent)]" />
        <Image
          src={productImage(product)}
          alt={product.title}
          fill
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 100vw"
          className="z-10 object-contain p-5 transition duration-500 group-hover:scale-[1.04]"
        />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-5">
        <h3 className="text-lg font-black leading-6 tracking-[-0.03em] text-forest">{product.title}</h3>
        <div className="flex items-end justify-between gap-3">
          <span className="text-base font-extrabold text-moss">{product.price}</span>
          <span className="inline-flex items-center gap-1 text-xs font-black uppercase tracking-[0.18em] text-bark/58">
            View
            <ArrowRight className="size-3" aria-hidden />
          </span>
        </div>
      </div>
    </Link>
  )
}
