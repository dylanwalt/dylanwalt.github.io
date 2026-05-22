"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { AnimatedHero } from "@/components/ui/animated-hero-section-1"

export function HomeHero() {
  const router = useRouter()

  return (
    <AnimatedHero
      backgroundImageUrl="/port443/hero-bg.jpg"
      logo={
        <div className="flex items-center gap-2">
          <Image
            src="/port443/logo-white.png"
            alt="Port443"
            width={30}
            height={30}
            priority
          />
          <span className="font-semibold text-primary-foreground">Port443</span>
        </div>
      }
      navLinks={[
        { label: "About", href: "#about" },
        { label: "Services", href: "#services" },
        { label: "Insights", href: "#insights" },
        { label: "Contact", href: "#contact" },
      ]}
      topRightAction={
        <Button
          onClick={() => router.push("/request-a-demo")}
          className="bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground hover:bg-white/20"
        >
          Request a Demo
        </Button>
      }
      title="Cyber security automation that improves visibility and response"
      description="Specialists in cyber security software development, automation and integration — helping enterprise teams validate controls, correlate risk, and contain threats faster."
      ctaButton={{
        text: "Request a Demo",
        onClick: () => router.push("/request-a-demo"),
      }}
      secondaryCta={{
        text: "Explore Services",
        onClick: () => router.push("/services"),
      }}
    />
  )
}

