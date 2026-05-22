import type { Metadata } from "next"
import Link from "next/link"
import { Mail, MapPin, Phone } from "lucide-react"

import { InteriorHero } from "@/components/port443/interior-hero"
import { RequestDemoForm } from "@/components/port443/request-demo-form"
import { Container } from "@/components/site/container"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

export const metadata: Metadata = {
  title: "Request a Demo | Port443",
  description: "Contact Port443 to request a demo of our services.",
}

export default function RequestADemoPage() {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-background text-foreground">
      <SiteHeader />

      <main className="flex-1">
        <InteriorHero
          eyebrow="Request a demo"
          title="Bring your security estate into one control path."
          description="Start with the service conversation Port443 is built for: integration, automation, visibility, and practical remediation priorities."
          imageSrc="/port443/hero-bg.jpg"
          primaryAction={{ href: "#demo-request", label: "Start the request" }}
          secondaryAction={{ href: "/services", label: "Explore services" }}
          signals={[
            {
              label: "Automation fit",
              detail: "Map the controls and workflows that need orchestration.",
            },
            {
              label: "Visibility fit",
              detail: "Review the dashboards and signals your teams need first.",
            },
            {
              label: "Response fit",
              detail: "Focus on containment and remediation paths that reduce risk.",
            },
          ]}
        />

        <section id="demo-request" className="scroll-mt-24 bg-muted/30">
          <Container className="py-14 md:py-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-5">
                <p className="text-sm font-semibold text-accent">Contact</p>
                <h2 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl">
                  Talk to Port443
                </h2>
                <p className="mt-5 text-muted-foreground">
                  We are here to answer any questions you may have.
                </p>

                <div className="mt-8 space-y-4 text-sm text-muted-foreground">
                  <div className="flex gap-3">
                    <Phone className="mt-0.5 size-4 text-foreground" aria-hidden />
                    <a className="hover:text-foreground" href="tel:+27833263456">
                      +27 83 326 3456
                    </a>
                  </div>
                  <div className="flex gap-3">
                    <MapPin className="mt-0.5 size-4 text-foreground" aria-hidden />
                    <p>
                      Suite 6, 1st Floor, Building C, Monte Circle, 178 Monte Casino
                      Boulevard, Sandton, 2191, South Africa
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <Mail className="mt-0.5 size-4 text-foreground" aria-hidden />
                    <div className="space-y-1">
                      <a className="block hover:text-foreground" href="mailto:info@port443.co.za">
                        info@port443.co.za
                      </a>
                      <a
                        className="block hover:text-foreground"
                        href="mailto:support@port443.co.za"
                      >
                        support@port443.co.za
                      </a>
                    </div>
                  </div>
                </div>

                <p className="mt-10 text-sm text-muted-foreground">
                  Prefer browsing first?{" "}
                  <Link href="/services" className="font-medium text-foreground hover:underline">
                    Explore services
                  </Link>
                  .
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-2xl border border-border bg-background p-6 shadow-sm md:p-8">
                  <div className="text-lg font-semibold">Send us a message</div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    This is a local rebuild demo form (non-production).
                  </p>
                  <div className="mt-6">
                    <RequestDemoForm />
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
