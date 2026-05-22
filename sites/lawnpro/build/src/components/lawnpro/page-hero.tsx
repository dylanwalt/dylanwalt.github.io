import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Container } from "@/components/lawnpro/frame"

type HeroLink = {
  href: string
  label: string
}

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  primary,
  secondary,
  children,
}: {
  eyebrow: string
  title: string
  description: string
  image: string
  primary: HeroLink
  secondary?: HeroLink
  children?: ReactNode
}) {
  return (
    <section className="relative isolate overflow-hidden bg-forest-deep text-cream">
      <div className="absolute inset-0 -z-20">
        <Image src={image} alt="" fill sizes="100vw" className="object-cover opacity-55" />
      </div>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(105deg,rgba(8,25,11,.98)_5%,rgba(8,25,11,.88)_48%,rgba(8,25,11,.44)_100%)]" />
      <div className="blade-grid absolute inset-0 -z-10 opacity-45" />
      <Container className="grid min-h-[600px] items-end gap-8 pb-14 pt-16 lg:grid-cols-[minmax(0,1fr)_390px] lg:pb-20">
        <div className="max-w-4xl">
          <p className="eyebrow text-sun">{eyebrow}</p>
          <h1 className="display mt-5 max-w-5xl text-balance text-5xl font-black leading-[.94] tracking-[-0.075em] sm:text-6xl md:text-8xl">
            {title}
          </h1>
          <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-cream/76 md:text-xl">
            {description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href={primary.href}
              className="sun-button inline-flex min-h-12 items-center justify-center gap-2 px-5 font-extrabold text-forest focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun"
            >
              {primary.label}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            {secondary ? (
              <Link
                href={secondary.href}
                className="inline-flex min-h-12 items-center justify-center border border-white/25 bg-white/12 px-5 font-bold text-white backdrop-blur transition hover:border-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sun"
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
        {children ? <div className="leaf-panel self-end p-5 md:p-6">{children}</div> : null}
      </Container>
    </section>
  )
}
