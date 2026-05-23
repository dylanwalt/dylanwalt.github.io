"use client"

import Link from "next/link"
import { ArrowRight, Droplet, Leaf, MapPin, Sparkles, Star } from "lucide-react"
import { MotionConfig, motion, useReducedMotion } from "framer-motion"

import { Container } from "@/components/site/container"
import { SouthFooter } from "./site-footer"

const stats = [
  { value: "72", label: "Calories", icon: Star },
  { value: "3g", label: "Sugar", icon: Droplet },
  { value: "5%", label: "ABV", icon: Sparkles },
  { value: "Gluten free", label: "No gluten", icon: Leaf },
]

const flavours = [
  {
    name: "Cranberry & Raspberry",
    description:
      "Crisp cranberry and sun-ripened raspberry meet sparkling spring water and premium vodka.",
  },
  {
    name: "Passion Fruit",
    description:
      "Tropical passionfruit intensity balanced with sparkling spring water for exotic refreshment.",
  },
  {
    name: "Mango & Orange",
    description:
      "Lush mango and vibrant orange combine with fizzing spring water for pure summer in a can.",
  },
  {
    name: "Pineapple & Coconut",
    description:
      "A coastal escape in every sip — sweet pineapple and creamy coconut with a clean spirit finish.",
  },
  {
    name: "Lime & Lemon",
    description:
      "Sharp citrus zing and sparkling water deliver the boldest, most refreshing sip in the lineup.",
  },
]

const benefits = [
  {
    title: "Real fruit flavour",
    body: "No artificial flavours, no shortcuts. Every sip is bursting with authenticity.",
    icon: Leaf,
  },
  {
    title: "Premium vodka base",
    body: "Crafted with clean, refined spirit for perfectly balanced hard soda.",
    icon: Sparkles,
  },
  {
    title: "Made for the heat",
    body: "Chilled and ready across South Africa — light, bright and worry-free.",
    icon: MapPin,
  },
]

export function HomeExperience() {
  const reduceMotion = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#071a2d] text-white">
        <header className="relative overflow-hidden pb-24 pt-8">
          <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(248,183,90,0.35),_transparent_35%),linear-gradient(180deg,_rgba(3,37,66,0.98),_rgba(7,26,45,0.92))]" />
          <div className="absolute inset-x-0 top-0 h-[420px] bg-[linear-gradient(180deg,rgba(7,26,45,0.85),rgba(7,26,45,0))]" />
          <Container className="relative z-10">
            <nav className="flex items-center justify-between py-4 text-sm uppercase tracking-[0.32em] text-white/70">
              <Link href="/" className="font-semibold tracking-[0.28em] text-white">
                SOUTH SIDE
              </Link>
              <div className="hidden items-center gap-8 md:flex">
                <a href="https://www.south-side.co.za/products" className="transition hover:text-amber-300">
                  Products
                </a>
                <a href="https://www.south-side.co.za/storelocator" className="transition hover:text-amber-300">
                  Store Locator
                </a>
                <a href="https://www.instagram.com/south_side_hard_soda/" className="transition hover:text-amber-300">
                  Instagram
                </a>
              </div>
            </nav>

            <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75 }}
                className="max-w-3xl"
              >
                <p className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.4em] text-amber-300">
                  <span className="h-px w-12 bg-amber-300" />
                  Premium Hard Soda
                </p>
                <h1 className="mt-6 text-5xl font-black tracking-[-0.03em] text-white sm:text-6xl lg:text-7xl">
                  South Africa’s original hard soda — perfected.
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">
                  Premium spirit coolers crafted for the heat. 72 calories and 3g of sugar because life is better when you worry less.
                </p>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Link
                    href="https://www.south-side.co.za/storelocator"
                    className="inline-flex items-center justify-center rounded-full bg-amber-300 px-6 py-3 text-sm font-semibold uppercase tracking-[0.19em] text-[#071a2c] transition hover:bg-amber-200"
                  >
                    Find a store
                    <ArrowRight className="ml-3 h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href="https://www.south-side.co.za/products"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold uppercase tracking-[0.19em] text-white transition hover:border-amber-300 hover:text-amber-300"
                  >
                    Explore flavours
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.75 }}
                className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[0_20px_120px_-60px_rgba(248,183,90,0.7)] backdrop-blur-xl"
              >
                <div className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.4em] text-amber-200/90">Made for South Africa</p>
                  <h2 className="text-3xl font-semibold uppercase tracking-[-0.04em] text-white">Available nationwide</h2>
                  <p className="text-sm leading-6 text-white/80">
                    Find South Side Hard Soda at leading retailers across South Africa. Chilled, ready and low-effort.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {stats.map((item) => (
                    <div key={item.label} className="rounded-3xl bg-[#07203f] p-5">
                      <div className="flex items-center gap-3 text-amber-200">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                        <span className="text-sm uppercase tracking-[0.22em] text-white/70">{item.label}</span>
                      </div>
                      <p className="mt-4 text-3xl font-black text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </Container>
        </header>

        <main>
          <section className="border-b border-white/10 py-20">
            <Container>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
              >
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Real ingredients, real impact</p>
                  <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">
                    Clean, honest soda with premium spirit and real fruit flavour.
                  </h2>
                  <p className="mt-6 max-w-2xl leading-8 text-white/75">
                    Sparkling spring water. Real fruit flavours. Premium vodka. That’s it. South Side keeps it clean, honest, and guilt-free in every can.
                  </p>
                </div>
                <div className="grid gap-4">
                  {benefits.map((item) => (
                    <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-[0_20px_80px_-70px_rgba(255,255,255,0.15)]">
                      <div className="flex items-center gap-3 text-amber-200">
                        <item.icon className="h-5 w-5" aria-hidden="true" />
                        <h3 className="text-lg font-semibold text-white">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-white/70">{item.body}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </Container>
          </section>

          <section className="py-20">
            <Container>
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-amber-300">The flavours</p>
                  <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Five signature soda blends, all guilt-free.</h2>
                </div>
                <Link
                  href="https://www.south-side.co.za/products"
                  className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.19em] text-amber-200 transition hover:text-white"
                >
                  View the full range
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {flavours.map((flavour) => (
                  <motion.article
                    key={flavour.name}
                    initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="group rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_80px_-70px_rgba(255,255,255,0.15)] transition hover:border-amber-300/60 hover:bg-white/10"
                  >
                    <div className="flex items-center gap-3 text-amber-200">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-lg font-bold text-white">•</span>
                      <h3 className="text-xl font-semibold text-white">{flavour.name}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-white/70">{flavour.description}</p>
                  </motion.article>
                ))}
              </div>
            </Container>
          </section>

          <section className="border-t border-white/10 bg-[#051123] py-20">
            <Container>
              <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                <div>
                  <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Ingredients & experience</p>
                  <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Hard soda that feels light, flavoursome, and ready for summer.</h2>
                  <p className="mt-6 max-w-2xl leading-8 text-white/70">
                    Sugar-light, low-carb and crafted around premium vodka. South Side is the perfect way to enjoy the moment without compromising on taste.
                  </p>
                </div>
                <div className="grid gap-4 rounded-[2rem] border border-white/10 bg-white/5 p-8 text-white/80">
                  <div className="rounded-3xl bg-white/5 p-6">
                    <p className="text-lg font-semibold text-white">Sparkling spring water</p>
                    <p className="mt-2 text-sm leading-6">Clean base with refreshing fizz and bright drinkability.</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-6">
                    <p className="text-lg font-semibold text-white">Real fruit flavours</p>
                    <p className="mt-2 text-sm leading-6">Pure fruit aroma and sweetness, without artificial aftertaste.</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-6">
                    <p className="text-lg font-semibold text-white">Premium vodka</p>
                    <p className="mt-2 text-sm leading-6">A refined spirit character keeps the blend smooth and crisp.</p>
                  </div>
                </div>
              </div>
            </Container>
          </section>

          <section className="py-20">
            <Container>
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 shadow-[0_20px_120px_-80px_rgba(248,183,90,0.35)] backdrop-blur-xl">
                <div className="grid gap-10 lg:grid-cols-[1fr_360px] lg:items-center">
                  <div>
                    <p className="text-sm uppercase tracking-[0.4em] text-amber-300">Find your next can</p>
                    <h2 className="mt-4 text-4xl font-semibold text-white sm:text-5xl">Available at hundreds of stockists nationwide.</h2>
                    <p className="mt-6 max-w-2xl leading-8 text-white/75">
                      South Side is stocked across major retailers in South Africa. Use the locator to find the nearest chilled shelf.
                    </p>
                  </div>
                  <div className="space-y-4 rounded-3xl border border-white/10 bg-[#071a2d] p-8">
                    <div className="rounded-3xl bg-white/5 p-6">
                      <p className="text-sm uppercase tracking-[0.32em] text-amber-200">Nearest stockist</p>
                      <p className="mt-4 text-3xl font-semibold text-white">Pick n Pay • Spar • Liquor City</p>
                    </div>
                    <a
                      href="https://www.south-side.co.za/storelocator"
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-amber-300/40 bg-amber-300/10 px-6 py-4 text-sm font-semibold uppercase tracking-[0.19em] text-amber-200 transition hover:bg-amber-300/20 hover:text-white"
                    >
                      Use the store locator
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </Container>
          </section>
        </main>

        <SouthFooter />
      </div>
    </MotionConfig>
  )
}
