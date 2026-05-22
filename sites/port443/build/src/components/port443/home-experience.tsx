"use client"

import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Braces,
  CheckCircle2,
  Eye,
  Globe2,
  Layers3,
  Radar,
  ShieldCheck,
  Waypoints,
} from "lucide-react"
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion"

import { RequestDemoForm } from "@/components/port443/request-demo-form"
import { Container } from "@/components/site/container"
import { SiteFooter } from "@/components/site/site-footer"

const services = [
  {
    code: "01",
    title: "Compliance and Governance",
    description:
      "Automated validation against vendor best practice and frameworks such as PCI, NIST, and CIS.",
    icon: ShieldCheck,
  },
  {
    code: "02",
    title: "OneView",
    description:
      "A single view of critical security, cloud, and network control information across the estate.",
    icon: Eye,
  },
  {
    code: "03",
    title: "Community Defense",
    description:
      "Controls act in unison so indicators of compromise can trigger containment faster.",
    icon: Waypoints,
  },
  {
    code: "04",
    title: "Consulting",
    description:
      "Assess exposure, identify candidates for automation, and set a practical mitigation roadmap.",
    icon: Layers3,
  },
]

const proof = [
  {
    title: "Middle East and Africa",
    detail: "Enterprise market presence",
    icon: Globe2,
  },
  {
    title: "Cross-control automation",
    detail: "API-first integrations",
    icon: Braces,
  },
  {
    title: "Framework validation",
    detail: "PCI, NIST, CIS guidance",
    icon: ShieldCheck,
  },
]

const loop = [
  {
    title: "Collect signals",
    body: "Pull critical state from security, cloud, and network controls.",
  },
  {
    title: "Correlate risk",
    body: "Expose drift, indicators, and focused remediation priorities.",
  },
  {
    title: "Trigger containment",
    body: "Coordinate responses so controls do not operate in isolation.",
  },
]

const insights = [
  {
    date: "16 May 2023",
    title: "Five things boards need to know about Incident Response",
    href: "https://ventureburn.com/2023/05/five-things-boards-need-to-know-about-incident-response-ir/",
  },
  {
    date: "15 May 2023",
    title: "Iziko, backed by RMB Ventures, invest in Port443",
    href: "https://techfinancials.co.za/2023/05/15/iziko-backed-by-rmb-ventures-invest-in-port443-pty-ltd/",
  },
  {
    date: "Port443 insight",
    title: "Introducing SOAR as a service",
    href: "https://www.port443.co.za/post/big-data-101-an-introduction-to-data-query-engines",
  },
]

export function HomeExperience() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen overflow-x-clip bg-background text-foreground">
        <PortHero />
        <main>
          <ProofRail />
          <ControlLoop />
          <ServiceSequence />
          <RegionalStory />
          <InsightStrip />
          <ContactStage />
        </main>
        <SiteFooter />
      </div>
    </MotionConfig>
  )
}

function PortHero() {
  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 760], [0, reduceMotion ? 0 : 92])
  const veil = useTransform(scrollY, [0, 540], [1, 0.72])

  return (
    <section className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-[#061321] text-white">
      <motion.div className="absolute inset-0 -z-20" style={{ y }}>
        <Image
          src="/port443/hero-bg.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <motion.div
        className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(3,9,18,.98)_0%,rgba(3,9,18,.9)_43%,rgba(3,9,18,.38)_100%)]"
        style={{ opacity: veil }}
      />
      <div className="port-grid absolute inset-0 -z-10 opacity-45" />

      <HeroNav />
      <Container className="relative pb-10 pt-28 md:pb-14 md:pt-36">
        <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div className="max-w-4xl">
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#a8ffce]"
            >
              <span className="h-px w-10 bg-[#a8ffce]" />
              Cyber security automation and integration
            </motion.p>
            <motion.h1
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.72 }}
              className="mt-5 max-w-5xl text-balance text-6xl font-semibold tracking-normal sm:text-7xl md:text-8xl"
            >
              Port443
            </motion.h1>
            <motion.p
              initial={reduceMotion ? false : { opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.18, duration: 0.62 }}
              className="mt-5 max-w-2xl text-pretty text-lg leading-8 text-white/78 md:text-2xl md:leading-9"
            >
              A more coordinated security posture: validate controls, connect
              visibility, and turn threat signals into faster containment.
            </motion.p>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.28, duration: 0.52 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              <Link
                className="inline-flex h-12 items-center justify-center gap-2 border border-[#a8ffce] bg-[#a8ffce] px-5 text-sm font-semibold text-[#071018] transition hover:border-white hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071018]"
                href="/request-a-demo"
              >
                Request a demo
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center border border-white/30 bg-white/10 px-5 text-sm font-semibold text-white backdrop-blur transition hover:border-white hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#071018]"
                href="/services"
              >
                Explore services
              </Link>
            </motion.div>
          </div>
          <TelemetryRail reduceMotion={Boolean(reduceMotion)} />
        </div>
      </Container>
    </section>
  )
}

function HeroNav() {
  return (
    <Container className="absolute inset-x-0 top-0 z-10 pt-6">
      <nav className="flex items-center justify-between border-b border-white/15 pb-5">
        <Link href="/" className="flex items-center gap-3" aria-label="Port443 home">
          <Image
            src="/port443/logo-white.png"
            alt=""
            width={46}
            height={46}
            className="size-11 object-contain"
          />
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-white">
            Port443
          </span>
        </Link>
        <div className="hidden items-center gap-7 text-sm text-white/72 md:flex">
          <Link className="transition hover:text-white" href="/about-us">
            About
          </Link>
          <Link className="transition hover:text-white" href="/services">
            Services
          </Link>
          <a className="transition hover:text-white" href="#contact">
            Contact
          </a>
        </div>
      </nav>
    </Container>
  )
}

function TelemetryRail({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.aside
      initial={reduceMotion ? false : { opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.24, duration: 0.7 }}
      className="hidden border-l border-white/18 pl-6 lg:block"
      aria-label="Security automation stages"
    >
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.16em] text-white/56">
        <span>Control fabric</span>
        <span className="text-[#a8ffce]">Live path</span>
      </div>
      <div className="mt-7 space-y-5">
        {loop.map((item, index) => (
          <div key={item.title} className="relative pl-8">
            <span className="absolute left-0 top-1.5 flex size-4 items-center justify-center">
              <motion.span
                animate={reduceMotion ? undefined : { scale: [1, 1.35, 1] }}
                transition={{
                  delay: index * 0.35,
                  duration: 2.2,
                  repeat: Number.POSITIVE_INFINITY,
                }}
                className="size-2 rounded-full bg-[#a8ffce]"
              />
            </span>
            {index < loop.length - 1 ? (
              <span className="absolute left-[7px] top-5 h-16 w-px bg-white/16" />
            ) : null}
            <div className="text-lg font-medium text-white">{item.title}</div>
            <p className="mt-1 text-sm leading-6 text-white/62">{item.body}</p>
          </div>
        ))}
      </div>
    </motion.aside>
  )
}

function ProofRail() {
  return (
    <section className="border-y border-border bg-[#f7faf6]">
      <Container className="grid gap-px bg-border md:grid-cols-3">
        {proof.map((item) => (
          <div
            key={item.title}
            className="flex min-h-28 items-center gap-4 bg-[#f7faf6] py-6 md:px-7"
          >
            <item.icon className="size-6 text-[#0e6b54]" aria-hidden="true" />
            <div>
              <div className="text-sm font-semibold text-foreground">{item.title}</div>
              <div className="mt-1 text-sm text-muted-foreground">{item.detail}</div>
            </div>
          </div>
        ))}
      </Container>
    </section>
  )
}

function ControlLoop() {
  const reduceMotion = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden bg-[#071018] py-20 text-white md:py-28">
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[52vw] md:block">
        <Image
          src="/port443/hero-bg.jpg"
          alt=""
          fill
          sizes="52vw"
          className="object-cover opacity-45"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#071018_0%,rgba(7,16,24,.42)_100%)]" />
      </div>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,430px)_1fr]">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#a8ffce]">
            Operating loop
          </p>
          <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal md:text-5xl">
            Every control becomes part of the response.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/68">
            Port443 connects compliance, visibility, and response so security
            teams can focus on the decisions that change risk.
          </p>
        </Reveal>
        <div className="grid gap-0 border-y border-white/18">
          {loop.map((item, index) => (
            <motion.article
              key={item.title}
              initial={reduceMotion ? false : { opacity: 0, x: 28 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ delay: reduceMotion ? 0 : index * 0.1, duration: 0.52 }}
              className="grid gap-4 border-b border-white/18 py-7 last:border-b-0 sm:grid-cols-[90px_1fr]"
            >
              <div className="font-mono text-sm text-[#a8ffce]">0{index + 1}</div>
              <div>
                <h3 className="text-2xl font-medium tracking-normal">{item.title}</h3>
                <p className="mt-2 max-w-xl leading-7 text-white/64">{item.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  )
}

function ServiceSequence() {
  return (
    <section id="services" className="bg-background py-20 md:py-28">
      <Container>
        <Reveal className="grid gap-5 border-b border-border pb-10 md:grid-cols-[1fr_1fr] md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0e6b54]">
              Services
            </p>
            <h2 className="mt-4 text-balance text-4xl font-semibold tracking-normal md:text-5xl">
              Security posture becomes visible, testable, and actionable.
            </h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-muted-foreground md:justify-self-end">
            The source offering stays intact, but the path is clearer: validate
            controls, unify the estate, coordinate defense, and bring in focused
            consulting where it changes the result.
          </p>
        </Reveal>
        <div className="mt-4">
          {services.map((service, index) => (
            <Reveal key={service.title}>
              <article className="group grid gap-5 border-b border-border py-8 md:grid-cols-[110px_1fr_1fr] md:items-start">
                <div className="flex items-center gap-4 font-mono text-sm text-[#0e6b54]">
                  <service.icon className="size-5" aria-hidden="true" />
                  {service.code}
                </div>
                <h3 className="text-2xl font-semibold tracking-normal md:text-3xl">
                  {service.title}
                </h3>
                <div>
                  <p className="max-w-xl leading-7 text-muted-foreground">
                    {service.description}
                  </p>
                  {index < services.length - 1 ? null : (
                    <Link
                      href="/services"
                      className="mt-5 inline-flex items-center gap-2 font-semibold text-accent transition hover:text-foreground"
                    >
                      View service details
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}

function RegionalStory() {
  return (
    <section className="bg-[#eef4ea] py-5 md:py-8">
      <Container className="grid gap-0 overflow-hidden border border-border bg-background lg:grid-cols-[minmax(0,1fr)_minmax(380px,.78fr)]">
        <div className="relative min-h-[420px]">
          <Image
            src="/port443/about-1.jpg"
            alt="City skyline representing Port443 operations across the Middle East and Africa"
            fill
            sizes="(min-width: 1024px) 56vw, 100vw"
            className="object-cover"
          />
        </div>
        <Reveal className="flex flex-col justify-center px-6 py-12 md:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0e6b54]">
            About Port443
          </p>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-normal md:text-4xl">
            Built for enterprises facing threats that do not wait for manual
            workflows.
          </h2>
          <p className="mt-5 leading-7 text-muted-foreground">
            Port443 operates across the Middle East and Africa and augments
            security engineering teams with automations, dashboards, and
            compliance services.
          </p>
          <Link
            href="/about-us"
            className="mt-7 inline-flex items-center gap-2 self-start font-semibold text-accent transition hover:text-foreground"
          >
            Read about Port443
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </Container>
    </section>
  )
}

function InsightStrip() {
  return (
    <section className="bg-background py-20 md:py-24">
      <Container>
        <Reveal className="grid gap-5 md:grid-cols-[360px_1fr]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0e6b54]">
              Coverage and insight
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-normal">
              Security decisions need context.
            </h2>
          </div>
          <div className="border-t border-border">
            {insights.map((insight) => (
              <a
                key={insight.title}
                href={insight.href}
                target="_blank"
                rel="noreferrer"
                className="grid gap-2 border-b border-border py-6 transition hover:bg-muted/35 md:grid-cols-[150px_1fr_32px] md:items-center md:px-4"
              >
                <span className="text-sm text-muted-foreground">{insight.date}</span>
                <span className="text-xl font-medium tracking-normal">
                  {insight.title}
                </span>
                <ArrowRight className="size-4 text-accent" aria-hidden="true" />
              </a>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}

function ContactStage() {
  return (
    <section id="contact" className="border-y border-border bg-[#071018] py-20 text-white md:py-28">
      <Container className="grid gap-10 lg:grid-cols-[minmax(320px,.8fr)_1fr]">
        <Reveal>
          <Radar className="size-8 text-[#a8ffce]" aria-hidden="true" />
          <h2 className="mt-6 text-balance text-4xl font-semibold tracking-normal md:text-5xl">
            Put the next demo on the control path.
          </h2>
          <p className="mt-5 max-w-md text-lg leading-8 text-white/68">
            See how Port443 can connect security automation, integration, and
            operational visibility for your estate.
          </p>
          <div className="mt-8 space-y-3 text-white/72">
            <p className="flex items-center gap-3">
              <CheckCircle2 className="size-4 text-[#a8ffce]" aria-hidden="true" />
              Demo requests map to the service you select.
            </p>
            <p className="flex items-center gap-3">
              <CheckCircle2 className="size-4 text-[#a8ffce]" aria-hidden="true" />
              Contact details remain available after handoff.
            </p>
          </div>
        </Reveal>
        <Reveal className="border border-white/18 bg-white p-5 text-foreground shadow-[0_24px_90px_rgba(0,0,0,.28)] md:p-8">
          <h3 className="text-2xl font-semibold tracking-normal">Request a demo</h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            This local rebuild keeps the request path visible for review.
          </p>
          <RequestDemoForm className="mt-6" />
        </Reveal>
      </Container>
    </section>
  )
}

function Reveal({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.56 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
