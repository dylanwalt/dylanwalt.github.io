import type { Metadata } from "next"

import { SourceRoute } from "@/components/lawnpro/source-route"

export const metadata: Metadata = { title: "Privacy Policy" }

export default function PrivacyPolicyPage() {
  return (
    <SourceRoute
      eyebrow="Source utility route"
      title="Privacy policy"
      description="A local summary route for the privacy page captured during the LawnPro rebuild."
    >
      <h2 className="display text-4xl font-black tracking-[-0.06em] text-forest">Privacy route retained.</h2>
      <p className="mt-5">
        The live policy governs how LawnPro handles data submitted through its
        own site. This local rebuild avoids collecting or transmitting form
        information and keeps the route visible for review.
      </p>
    </SourceRoute>
  )
}
