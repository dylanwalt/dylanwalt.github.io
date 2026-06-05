import type { Metadata } from "next"

import { HeroLab } from "@/components/v4/hero-lab"

export const metadata: Metadata = {
  title: "Hero Lab — Port443 V5",
  description:
    "Five Port443 hero directions inspired by leading security and product-marketing sites. Same copy, different layout, motion, and emotional temperature.",
}

export default function HeroLabPage() {
  return <HeroLab />
}
