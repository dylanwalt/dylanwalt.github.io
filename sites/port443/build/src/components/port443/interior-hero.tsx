import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/site/container"

type HeroAction = {
  href: string
  label: string
}

type HeroSignal = {
  label: string
  detail: string
}

type InteriorHeroProps = {
  eyebrow: string
  title: string
  description: string
  imageSrc: string
  primaryAction: HeroAction
  secondaryAction?: HeroAction
  signals: HeroSignal[]
}

export function InteriorHero({
  eyebrow,
  title,
  description,
  imageSrc,
  primaryAction,
  secondaryAction,
  signals,
}: InteriorHeroProps) {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10 bg-[#071018] text-white">
      <div className="absolute inset-0 -z-20">
        <Image
          src={imageSrc}
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-60"
        />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgba(4,10,18,.98)_0%,rgba(4,10,18,.88)_46%,rgba(4,10,18,.55)_100%)]" />
      <div className="port-grid absolute inset-0 -z-10 opacity-50" />

      <Container className="relative py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-end">
          <div className="max-w-4xl">
            <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8ffce]">
              <span className="h-px w-10 bg-[#a8ffce]" />
              {eyebrow}
            </p>
            <h1 className="mt-5 text-balance text-5xl font-semibold tracking-normal sm:text-6xl md:text-7xl">
              {title}
            </h1>
            <p className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-white/74 md:text-xl">
              {description}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={primaryAction.href}
                className="inline-flex h-12 items-center justify-center gap-2 border border-[#a8ffce] bg-[#a8ffce] px-5 text-sm font-semibold text-[#071018] transition hover:border-white hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071018]"
              >
                {primaryAction.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              {secondaryAction ? (
                <Link
                  href={secondaryAction.href}
                  className="inline-flex h-12 items-center justify-center border border-white/28 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071018]"
                >
                  {secondaryAction.label}
                </Link>
              ) : null}
            </div>
          </div>

          <aside
            className="border border-white/18 bg-black/20 p-5 shadow-[0_24px_90px_rgba(0,0,0,.28)] backdrop-blur md:p-6"
            aria-label={`${eyebrow} signals`}
          >
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/48">
              Port443 control plane
            </p>
            <div className="mt-5 border-y border-white/16">
              {signals.map((signal, index) => (
                <div
                  key={signal.label}
                  className="grid grid-cols-[42px_1fr] gap-3 border-b border-white/16 py-4 last:border-b-0"
                >
                  <span className="font-mono text-sm text-[#a8ffce]">
                    0{index + 1}
                  </span>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {signal.label}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-white/62">
                      {signal.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
