"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, HandHeart, Palette, ShoppingBag } from "lucide-react";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { spiralCollections, spiralImages } from "@/lib/spiral";

const storySignals = [
  { icon: Palette, title: "Designed & printed" },
  { icon: HandHeart, title: "Made in South Africa" },
  { icon: ShoppingBag, title: "Decor to bags" },
];

export function HomeExperience() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const imageShift = useTransform(scrollYProgress, [0, 0.28], [0, reduceMotion ? 0 : 72]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="hope-pattern relative isolate min-h-screen overflow-hidden bg-[#061e62] px-5 pb-16 pt-40 text-[#fff4e8] md:px-8">
        <div className="hope-spiral pointer-events-none absolute -right-[12vw] top-[12vh] h-[min(72vw,58rem)] w-[min(72vw,58rem)] opacity-80" />
        <div className="absolute -left-40 top-0 h-[32rem] w-[32rem] rounded-full bg-[#e3604a]/32 blur-3xl" />
        <div className="relative mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-10 lg:grid-cols-[.92fr_1fr]">
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8 }}>
            <p className="inline-flex rounded-full border border-[#fff4e8]/25 bg-[#fff4e8]/12 px-4 py-2 text-xs font-black uppercase tracking-[.34em]">Pretoria craft · South African made</p>
            <h1 className="hope-display mt-8 text-[clamp(5.2rem,15vw,15rem)] font-bold">Pattern that turns hope into home.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#fff4e8]/80 md:text-2xl">
              Spiral of Hope spins printed fabric into table scenes, home décor, bags, accessories, and local maker opportunity.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/collections" className="hope-focus inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#f4ba39] px-6 font-black text-[#061e62] transition hover:bg-[#fff4e8]">
                Open collections <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/our-story" className="hope-focus inline-flex min-h-14 items-center justify-center rounded-full border border-[#fff4e8]/28 bg-[#fff4e8]/10 px-6 font-black backdrop-blur transition hover:bg-[#fff4e8]/20">
                Read the story
              </Link>
            </div>
          </motion.div>
          <motion.div style={{ y: imageShift }} className="relative min-h-[36rem] overflow-hidden rounded-[3rem] border-[10px] border-[#fff4e8]/14 shadow-[0_36px_120px_rgba(0,0,0,.36)]">
            <Image src={spiralImages.hero} alt="Blue Spiral of Hope table collection scene" fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061e62]/85 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 grid gap-2 sm:grid-cols-3">
              {storySignals.map(({ icon: Icon, title }) => (
                <span key={title} className="flex items-center gap-2 rounded-full bg-[#fff4e8]/88 px-3 py-2 text-xs font-black uppercase tracking-[.14em] text-[#061e62] backdrop-blur">
                  <Icon className="h-4 w-4" /> {title}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[#103a93]/12 bg-[#f4ba39] px-5 py-5 text-[#061e62] md:px-8">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-9 gap-y-2 text-xs font-black uppercase tracking-[.32em] md:justify-between">
          {["Table décor", "Home décor", "Printed fabric", "Bags", "Accessories", "Reseller route"].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[.7fr_1fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[.36em] text-[#e3604a]">The spiral</p>
            <h2 className="hope-display mt-5 text-[clamp(4.4rem,11vw,11rem)] font-bold text-[#103a93]">Pivot. Print. Stitch. Uplift.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="relative min-h-[25rem] overflow-hidden rounded-[2rem]">
              <Image src={spiralImages.makers} alt="Spiral of Hope maker process" fill sizes="(min-width: 768px) 35vw, 100vw" className="object-cover" />
            </div>
            <div className="self-end rounded-[2rem] bg-[#103a93] p-7 text-[#fff4e8]">
              <p className="text-lg leading-8 text-[#fff4e8]/82">
                The source story moves from a pandemic pivot to locally made collection work and Pretoria-area employment. The rebuild puts that maker current before the shopping chrome.
              </p>
              <Link href="/our-story" className="hope-focus mt-6 inline-flex items-center gap-2 font-black text-[#f4ba39]">Follow the story <ArrowRight className="h-4 w-4" /></Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#061e62] px-5 py-20 text-[#fff4e8] md:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.36em] text-[#f4ba39]">Collections</p>
          <h2 className="hope-display mt-4 text-[clamp(4.4rem,11vw,11rem)] font-bold">Fabric leaves the reel.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {spiralCollections.map((collection, index) => (
              <motion.article
                key={collection.href}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.06 }}
                className="group grid overflow-hidden rounded-[2.4rem] border border-[#fff4e8]/16 bg-[#fff4e8]/10 sm:grid-cols-[.85fr_1fr]"
              >
                <div className="relative min-h-[18rem]">
                  <Image src={collection.image} alt="" fill sizes="(min-width: 768px) 24vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="hope-display text-7xl font-bold">{collection.title}</h3>
                  <p className="mt-4 leading-7 text-[#fff4e8]/72">{collection.body}</p>
                  <Link href={collection.href} className="hope-focus mt-6 inline-flex items-center gap-2 font-black text-[#f4ba39]">
                    View <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden rounded-[3rem] border border-[#103a93]/14 bg-white/58 lg:grid-cols-[.9fr_1fr]">
          <div className="relative min-h-[30rem]">
            <Image src={spiralImages.bags} alt="Spiral of Hope bags and accessories" fill sizes="(min-width: 1024px) 44vw, 100vw" className="object-cover" />
          </div>
          <div className="p-7 md:p-12">
            <p className="text-xs font-black uppercase tracking-[.36em] text-[#e3604a]">Reseller and contact</p>
            <h2 className="hope-display mt-5 text-[clamp(4rem,9vw,9rem)] font-bold text-[#103a93]">Carry the pattern further.</h2>
            <p className="mt-5 text-lg leading-8 text-[#131d49]/72">Use the source contact paths for current collection availability and reseller terms.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/become-a-reseller" className="hope-focus inline-flex min-h-14 items-center justify-center rounded-full bg-[#103a93] px-6 font-black text-[#fff4e8]">Reseller route</Link>
              <a href="mailto:info@spiralofhope.co.za" className="hope-focus inline-flex min-h-14 items-center justify-center rounded-full border border-[#103a93]/20 px-6 font-black">Email makers</a>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
