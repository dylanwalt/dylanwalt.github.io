import type { Metadata } from "next"

import { SourceRoute } from "@/components/lawnpro/source-route"

export const metadata: Metadata = { title: "Checkout" }

export default function CheckoutRoutePage() {
  return (
    <SourceRoute
      eyebrow="Source checkout route"
      title="Checkout"
      description="A local review route for the checkout path from the scraped LawnPro storefront."
    >
      <h2 className="display text-4xl font-black tracking-[-0.06em] text-forest">Payment stays out of this rebuild.</h2>
      <p className="mt-5">
        This project is a visual and route rebuild. A production ecommerce
        checkout requires the live store&apos;s payments, shipping, and order
        policies.
      </p>
    </SourceRoute>
  )
}
