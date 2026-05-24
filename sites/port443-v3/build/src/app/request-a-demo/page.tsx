"use client"

import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/site/container"
import { SiteFooter, SiteNav } from "@/components/v3/chrome"
import { cn } from "@/lib/utils"

const services = [
  { id: "attestation", code: "01", title: "Control Attestation" },
  { id: "oneview", code: "02", title: "OneView" },
  { id: "automation", code: "03", title: "Custom Automation" },
  { id: "consulting", code: "04", title: "Consulting" },
] as const

export default function RequestDemoPage() {
  const [submitted, setSubmitted] = useState(false)
  const [serviceInterest, setServiceInterest] =
    useState<(typeof services)[number]["id"]>("attestation")

  return (
    <div className="min-h-screen flex flex-col">
      <SiteNav floating={false} />
      <main className="flex-1">
        <section className="py-20 lg:py-28">
          <Container>
            <div className="grid lg:grid-cols-12 gap-14">
              <div className="lg:col-span-6">
                <span className="inline-flex items-center gap-2 mono text-[11px] tracking-[0.22em] uppercase text-[var(--muted-on-ink)]">
                  <span className="h-px w-7 bg-[var(--blue)]" />
                  Request a demo
                </span>
                <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.025em]">
                  Bring your existing
                  <br />
                  <span className="text-[var(--blue)]">security estate.</span>
                  <br />
                  We&apos;ll show you OneView with it.
                </h1>
                <p className="mt-7 max-w-md text-[15.5px] leading-[1.6] text-[var(--muted-on-ink)]">
                  A 30-minute walk-through of OneView and one custom-automation
                  use case mapped to your environment. No spreadsheets requested.
                </p>
                <div className="mt-10 grid grid-cols-2 gap-6 max-w-md text-[13px]">
                  <div className="border-t border-[var(--ink-3)] pt-3">
                    <div className="mono text-[11px] tracking-[0.2em] text-[var(--blue)]">
                      EMAIL
                    </div>
                    <a
                      className="mt-1 block text-[var(--ivory)] hover:text-[var(--blue)]"
                      href="mailto:hello@port443.co.za"
                    >
                      hello@port443.co.za
                    </a>
                  </div>
                  <div className="border-t border-[var(--ink-3)] pt-3">
                    <div className="mono text-[11px] tracking-[0.2em] text-[var(--blue)]">
                      REGION
                    </div>
                    <div className="mt-1 text-[var(--muted-on-ink)]">
                      Middle East &amp; Africa
                    </div>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-6">
                <form
                  className="border border-[var(--ink-3)] bg-[var(--ink-2)] p-7 lg:p-9 rounded-[2px]"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setSubmitted(true)
                  }}
                >
                  {submitted ? (
                    <div className="py-10 text-center">
                      <div className="mono text-[11px] tracking-[0.2em] text-[var(--blue)]">
                        RECEIVED
                      </div>
                      <div className="mt-3 text-[20px] font-semibold tracking-[-0.02em]">
                        Thanks. We&apos;ll be in touch within one business day.
                      </div>
                      <p className="mt-3 text-[14px] text-[var(--muted-on-ink)]">
                        A Port443 engineer will reach out to schedule the OneView
                        walk-through.
                      </p>
                    </div>
                  ) : (
                    <>
                      <Field id="contact-name" label="Name" />
                      <Field id="contact-email" label="Work email" type="email" />
                      <Field id="contact-org" label="Organisation" />
                      <div className="mt-7">
                        <div className="mono text-[11px] tracking-[0.2em] text-[var(--muted-on-ink)]">
                          INTEREST
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-px bg-[var(--ink-3)]">
                          {services.map((s) => (
                            <label
                              key={s.id}
                              className={cn(
                                "px-4 py-3 text-[13px] cursor-pointer transition-colors",
                                serviceInterest === s.id
                                  ? "bg-[var(--ink)] text-[var(--ivory)]"
                                  : "bg-[var(--ink-2)] text-[var(--muted-on-ink)] hover:text-[var(--ivory)]",
                              )}
                            >
                              <input
                                type="radio"
                                name="service"
                                value={s.id}
                                checked={serviceInterest === s.id}
                                onChange={() => setServiceInterest(s.id)}
                                className="sr-only"
                              />
                              <span className="mono text-[10px] tracking-[0.2em] text-[var(--blue)] mr-2">
                                {s.code}
                              </span>
                              {s.title}
                            </label>
                          ))}
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-8 w-full inline-flex items-center justify-center gap-2 bg-[var(--blue)] text-[var(--ivory-2)] px-6 py-3.5 text-[14px] font-medium tracking-tight hover:opacity-90 transition-opacity"
                      >
                        Request a demo
                        <ArrowRight className="h-4 w-4" />
                      </button>
                      <p className="mt-4 text-[11.5px] text-[var(--muted-on-ink)] leading-[1.5]">
                        We use your details to schedule one OneView walk-through.
                        We do not enrol you in a sequence and we do not resell
                        contact information.
                      </p>
                    </>
                  )}
                </form>
              </div>
            </div>
          </Container>
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}

function Field({
  id,
  label,
  type = "text",
}: {
  id: string
  label: string
  type?: string
}) {
  return (
    <label htmlFor={id} className="block first:mt-0 mt-5">
      <span className="mono text-[11px] tracking-[0.2em] text-[var(--muted-on-ink)]">
        {label.toUpperCase()}
      </span>
      <input
        id={id}
        name={id}
        type={type}
        required
        className="mt-2 w-full bg-transparent border-b border-[var(--ink-3)] text-[15px] text-[var(--ivory)] py-2.5 focus:border-[var(--blue)] outline-none transition-colors"
      />
    </label>
  )
}
