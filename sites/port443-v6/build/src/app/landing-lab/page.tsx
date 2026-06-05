import type { Metadata } from "next"

import { LandingLab } from "@/components/v4/landing-lab"

export const metadata: Metadata = {
  title: "Landing Lab — Port443 V6",
  description:
    "Three fuller Port443 landing-page concepts focused on stronger depth, richer color, tighter copy blocks, and more immersive cyber-security atmosphere.",
}

export default function LandingLabPage() {
  return <LandingLab />
}
