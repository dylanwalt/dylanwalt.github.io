import type { Metadata } from "next"

import { SourceRoute } from "@/components/lawnpro/source-route"

export const metadata: Metadata = { title: "Refunds and Returns" }

export default function RefundReturnsPage() {
  return (
    <SourceRoute
      eyebrow="Source utility route"
      title="Refunds and returns"
      description="A retained local path for the refund and returns page found in the LawnPro scrape."
    >
      <h2 className="display text-4xl font-black tracking-[-0.06em] text-forest">Confirm return terms with LawnPro.</h2>
      <p className="mt-5">
        This static rebuild intentionally does not transact. The current LawnPro
        returns route remains the authority when a real shop order is involved.
      </p>
    </SourceRoute>
  )
}
