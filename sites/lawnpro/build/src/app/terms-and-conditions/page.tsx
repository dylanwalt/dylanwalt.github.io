import type { Metadata } from "next"

import { SourceRoute } from "@/components/lawnpro/source-route"

export const metadata: Metadata = { title: "Terms and Conditions" }

export default function TermsPage() {
  return (
    <SourceRoute
      eyebrow="Source utility route"
      title="Terms and conditions"
      description="A retained source-store route for local review of the LawnPro shop rebuild."
    >
      <h2 className="display text-4xl font-black tracking-[-0.06em] text-forest">Live terms stay live.</h2>
      <p className="mt-5">
        Product prices, stock, checkout behavior, shipping, and legal terms can
        change. Use the live LawnPro storefront for the current purchasing
        contract.
      </p>
    </SourceRoute>
  )
}
