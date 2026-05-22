import type { Metadata } from "next"

import { SourceRoute } from "@/components/lawnpro/source-route"

export const metadata: Metadata = { title: "Cart" }

export default function CartRoutePage() {
  return (
    <SourceRoute
      eyebrow="Source checkout route"
      title="Cart"
      description="A local rebuild route preserving LawnPro's cart path without pretending to process orders."
    >
      <h2 className="display text-4xl font-black tracking-[-0.06em] text-forest">The local cart is intentionally static.</h2>
      <p className="mt-5">
        Browse the catalog here, then use the live LawnPro store for inventory,
        quantities, delivery, and payment behavior.
      </p>
    </SourceRoute>
  )
}
