import type { Metadata } from "next"
import { CircleCheck, Mail, PhoneCall, ScanSearch } from "lucide-react"

import { ContactPanel } from "@/components/lawnpro/contact-panel"
import { PageHero } from "@/components/lawnpro/page-hero"
import { sourceImages } from "@/lib/lawnpro"

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact LawnPro for a free lawn analysis, treatment, product, seasonal, or franchise enquiry.",
}

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact LawnPro"
        title="Start with the lawn signal."
        description="Head-office details, treatment interest, product questions, seasonal maintenance, and franchise intent meet at the free-analysis path."
        image={sourceImages.panoramicHome}
        primary={{ href: "#analysis", label: "Open analysis form" }}
        secondary={{ href: "/services", label: "Review services" }}
      >
        <p className="eyebrow text-moss">Direct contact</p>
        <div className="mt-6 grid gap-4">
          <a href="tel:+27120023679" className="flex gap-3 border-b border-forest/10 pb-4 font-black transition hover:text-moss">
            <PhoneCall className="size-5 text-moss" aria-hidden />
            +27 12 002 3679
          </a>
          <a href="mailto:charl@lawnpro.co.za" className="flex gap-3 border-b border-forest/10 pb-4 font-black transition hover:text-moss">
            <Mail className="size-5 text-moss" aria-hidden />
            charl@lawnpro.co.za
          </a>
          <p className="flex gap-3 font-semibold leading-6 text-bark/64">
            <ScanSearch className="size-5 shrink-0 text-moss" aria-hidden />
            Name the symptom before you name the treatment.
          </p>
          <p className="flex gap-3 font-semibold leading-6 text-bark/64">
            <CircleCheck className="size-5 shrink-0 text-moss" aria-hidden />
            Product and franchise questions fit here too.
          </p>
        </div>
      </PageHero>
      <ContactPanel />
    </>
  )
}
