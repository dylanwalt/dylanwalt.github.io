"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/site/container"

export default function RequestDemoPage() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-[#030912] text-[#f0f8f4]">
      <header className="border-b border-[#a8ffce]/10 bg-[#030912] py-5">
        <Container className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/port443-v2/logo-shield-white.svg" alt="Port443" width={36} height={36} className="size-9" />
            <div className="leading-none">
              <div className="font-display text-sm font-bold uppercase tracking-[0.2em] text-white">Port443</div>
              <div className="font-mono text-[8px] tracking-[0.12em] text-[#a8ffce]/60">&lt; AUTOMATING CYBER DEFENSE &gt;</div>
            </div>
          </Link>
          <Link href="/" className="font-mono text-xs text-white/40 hover:text-white transition">← Home</Link>
        </Container>
      </header>

      <main className="flex flex-1 items-center py-16 md:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[1fr_520px] lg:gap-20 lg:items-start">
            {/* Left context */}
            <div>
              <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-[#a8ffce]">Get started</span>
              <h1 className="mt-4 font-display text-5xl font-extrabold leading-tight text-white md:text-6xl">
                Request a demo.
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/55">
                See how Port443 connects security automation, integration, and
                operational visibility for your estate. No commitment required.
              </p>

              <div className="mt-10 flex flex-col gap-8">
                {[
                  { title: "Control Attestation", body: "Automated framework and vendor best-practice validation — continuous, not quarterly." },
                  { title: "OneView", body: "Independent, live, governance-grade visibility across your entire security estate." },
                  { title: "Custom Automation", body: "SOC workflows automated end-to-end: Identify → Scope → Build → Operate." },
                  { title: "Consulting", body: "Exposure assessment and automation roadmap aligned to your risk register." },
                ].map((s) => (
                  <div key={s.title} className="flex gap-4">
                    <div className="size-1.5 mt-2 flex-shrink-0 rounded-full bg-[#a8ffce]" />
                    <div>
                      <div className="font-semibold text-white">{s.title}</div>
                      <p className="mt-1 text-sm leading-6 text-white/45">{s.body}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex flex-col gap-2">
                <a href="mailto:info@port443.co.za" className="font-mono text-sm text-[#a8ffce]/60 hover:text-[#a8ffce] transition">info@port443.co.za</a>
                <a href="tel:+27833263456" className="font-mono text-sm text-[#a8ffce]/60 hover:text-[#a8ffce] transition">+27 83 326 3456</a>
              </div>
            </div>

            {/* Form */}
            <div className="border border-[#a8ffce]/15 bg-[#061321] p-7 md:p-10">
              <h2 className="font-display text-2xl font-bold text-white">Request a demo</h2>
              <p className="mt-2 font-mono text-xs text-white/35">All fields required.</p>

              {sent ? (
                <div className="mt-10 flex flex-col items-center gap-5 py-10 text-center">
                  <div className="flex size-14 items-center justify-center border border-[#a8ffce] text-2xl text-[#a8ffce]">✓</div>
                  <p className="font-display text-xl font-bold text-white">Request received</p>
                  <p className="text-sm leading-6 text-white/50">The Port443 team will be in touch within one business day.</p>
                  <Link href="/" className="font-mono text-xs uppercase tracking-wider text-[#a8ffce]/60 hover:text-[#a8ffce] transition">
                    ← Return to home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-7 flex flex-col gap-4">
                  {[
                    { id: "name",    label: "Full name",    type: "text",  ph: "Jane Smith" },
                    { id: "email",   label: "Work email",   type: "email", ph: "jane@company.com" },
                    { id: "company", label: "Organisation", type: "text",  ph: "Acme Corp" },
                    { id: "phone",   label: "Phone",        type: "tel",   ph: "+27 xx xxx xxxx" },
                  ].map((f) => (
                    <div key={f.id} className="flex flex-col gap-1.5">
                      <label htmlFor={f.id} className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                        {f.label}
                      </label>
                      <input
                        id={f.id} type={f.type} required placeholder={f.ph}
                        className="border border-[#a8ffce]/15 bg-[#030912] px-3.5 py-2.5 font-mono text-sm text-white placeholder-white/20 outline-none transition focus:border-[#a8ffce]/50 focus:ring-1 focus:ring-[#a8ffce]/20"
                      />
                    </div>
                  ))}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                      Service interest
                    </label>
                    <select id="service" required
                      className="border border-[#a8ffce]/15 bg-[#030912] px-3.5 py-2.5 font-mono text-sm text-white outline-none transition focus:border-[#a8ffce]/50">
                      <option value="">Select a service</option>
                      <option value="control-attestation">Control Attestation</option>
                      <option value="oneview">OneView</option>
                      <option value="custom-automation">Custom Automation</option>
                      <option value="consulting">Consulting</option>
                      <option value="all">All services</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-[0.16em] text-white/45">
                      Brief description (optional)
                    </label>
                    <textarea id="message" rows={3} placeholder="Tell us about your environment or challenge..."
                      className="border border-[#a8ffce]/15 bg-[#030912] px-3.5 py-2.5 font-mono text-sm text-white placeholder-white/20 outline-none transition focus:border-[#a8ffce]/50 resize-none"
                    />
                  </div>
                  <button type="submit"
                    className="mt-2 flex items-center justify-center gap-2.5 bg-[#a8ffce] py-3.5 font-mono text-sm font-semibold uppercase tracking-wider text-[#030912] transition-all hover:bg-white hover:shadow-[0_0_28px_rgba(168,255,206,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a8ffce]"
                  >
                    Submit request <ArrowRight className="size-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </Container>
      </main>

      <footer className="border-t border-[#a8ffce]/10 bg-[#030912] py-8">
        <Container className="text-center">
          <span className="font-mono text-[10px] text-white/20">© {new Date().getFullYear()} Port443 (Pty) Ltd</span>
        </Container>
      </footer>
    </div>
  )
}
