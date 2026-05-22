"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Layers3, MoveUpRight, ScanLine, Sprout } from "lucide-react";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { elmImages, elmPortfolio, elmServices } from "@/lib/elm";

const materialSignals = [
  { title: "Natural materials", icon: Sprout },
  { title: "3D clarity", icon: ScanLine },
  { title: "Tailored layers", icon: Layers3 },
];

export function HomeExperience() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const heroShift = useTransform(scrollYProgress, [0, 0.28], [0, reduceMotion ? 0 : 96]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="relative isolate min-h-screen overflow-hidden bg-[#211b17] text-[#f4ede3]">
        <motion.div className="absolute inset-0" style={{ y: heroShift }}>
          <Image src={elmImages.hero} alt="Warm Elm Interiors kitchen project" fill priority sizes="100vw" className="object-cover opacity-78" />
        </motion.div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(25,20,18,.94),rgba(25,20,18,.45)_55%,rgba(25,20,18,.76))]" />
        <div className="elm-grain absolute inset-0 opacity-35" />
        <div className="relative mx-auto grid min-h-screen max-w-7xl content-end gap-10 px-5 pb-16 pt-40 md:px-8 lg:grid-cols-[1.05fr_.65fr] lg:items-end">
          <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.9 }}>
            <p className="mb-6 inline-flex border border-[#f4ede3]/28 bg-[#f4ede3]/12 px-4 py-2 text-xs font-black uppercase tracking-[.34em]">
              Waterkloof interior studio
            </p>
            <h1 className="elm-display text-[clamp(4.2rem,13vw,12rem)] font-semibold">
              Rooms that
              <span className="elm-outline block">remember you.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-[#f4ede3]/82 md:text-2xl">
              Elm Interiors turns nature-led planning, bespoke cabinetry, decoration, and realistic staging into Pretoria spaces that feel warm before they feel styled.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/portfolio" className="elm-focus inline-flex min-h-14 items-center justify-center gap-2 bg-[#f4ede3] px-6 font-black text-[#211b17] transition hover:bg-[#d8b18a]">
                Walk the portfolio <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/treatments" className="elm-focus inline-flex min-h-14 items-center justify-center border border-[#f4ede3]/35 bg-[#f4ede3]/12 px-6 font-black backdrop-blur transition hover:bg-[#f4ede3]/22">
                Scope services
              </Link>
            </div>
          </motion.div>
          <motion.aside
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.2, duration: reduceMotion ? 0 : 0.9 }}
            className="border border-[#f4ede3]/25 bg-[#211b17]/52 p-5 backdrop-blur-md"
          >
            <p className="text-xs font-black uppercase tracking-[.35em] text-[#d8b18a]">Refined living sequence</p>
            <div className="mt-5 grid gap-4">
              {materialSignals.map(({ title, icon: Icon }, index) => (
                <div key={title} className="grid grid-cols-[auto_1fr_auto] items-center gap-4 border-b border-[#f4ede3]/15 pb-4">
                  <span className="grid h-11 w-11 place-items-center bg-[#f4ede3]/14"><Icon className="h-5 w-5" /></span>
                  <span className="font-bold">{title}</span>
                  <span className="elm-display text-4xl text-[#f4ede3]/38">0{index + 1}</span>
                </div>
              ))}
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="overflow-hidden px-5 py-8 md:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-5 border-y border-[#211b17]/12 py-6 text-xs font-black uppercase tracking-[.32em] md:grid-cols-[auto_1fr_auto]">
          <span>Pretoria · Interior design</span>
          <div className="elm-rule h-px" />
          <span>Space planning · Décor · 3D renders</span>
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-[.72fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.36em] text-[#b56a33]">Services</p>
              <h2 className="elm-display mt-4 text-[clamp(3rem,7vw,7rem)]">Plan the bones. Layer the feeling.</h2>
            </div>
            <div className="grid gap-4">
              {elmServices.map((service, index) => (
                <motion.article
                  key={service.title}
                  initial={{ opacity: 0, y: reduceMotion ? 0 : 26 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.08 }}
                  className="grid gap-4 border-t border-[#211b17]/16 py-6 md:grid-cols-[9rem_1fr]"
                >
                  <p className="text-xs font-black uppercase tracking-[.3em] text-[#6e7158]">{service.signal}</p>
                  <div>
                    <h3 className="elm-display text-4xl font-semibold md:text-5xl">{service.title}</h3>
                    <p className="mt-3 max-w-2xl leading-8 text-[#211b17]/72">{service.copy}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#211b17] px-5 py-20 text-[#f4ede3] md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[.36em] text-[#d8b18a]">Room index</p>
              <h2 className="elm-display mt-3 text-[clamp(3.1rem,8vw,8rem)]">Projects with material gravity.</h2>
            </div>
            <Link href="/portfolio" className="elm-focus inline-flex items-center gap-2 font-black text-[#d8b18a] transition hover:text-white">
              Open portfolio <MoveUpRight className="h-5 w-5" />
            </Link>
          </div>
          <div className="mt-10 grid auto-rows-[18rem] gap-4 md:grid-cols-2 lg:grid-cols-4">
            {elmPortfolio.map((project, index) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className={`elm-focus group relative isolate overflow-hidden ${index === 0 ? "lg:col-span-2 lg:row-span-2" : ""}`}>
                <Image src={project.image} alt="" fill sizes="(min-width: 1024px) 32vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#211b17] via-[#211b17]/16 to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-5">
                  <span className="elm-display block text-4xl font-semibold">{project.title}</span>
                  <span className="mt-2 block max-w-sm text-sm leading-6 text-[#f4ede3]/72">{project.note}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-[#211b17]/12 bg-[#eadfce] lg:grid-cols-[1fr_.92fr]">
          <div className="p-7 md:p-12">
            <p className="text-xs font-black uppercase tracking-[.36em] text-[#b56a33]">Start a room</p>
            <h2 className="elm-display mt-5 max-w-3xl text-[clamp(3rem,7vw,7rem)]">Tell Elm how you want to live in it.</h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#211b17]/70">
              Bring a new build, renovation, décor refresh, or rendering brief. The source studio receives project enquiries by phone and email.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="mailto:info@elminteriors.co.za" className="elm-focus inline-flex min-h-14 items-center justify-center bg-[#211b17] px-6 font-black text-[#f4ede3] transition hover:bg-[#b56a33]">
                Email project brief
              </a>
              <a href="tel:+27721411818" className="elm-focus inline-flex min-h-14 items-center justify-center border border-[#211b17]/20 px-6 font-black transition hover:bg-[#f4ede3]">
                +27 72 141 1818
              </a>
            </div>
          </div>
          <div className="relative min-h-[28rem]">
            <Image src={elmImages.decor} alt="Elm Interiors décor textures" fill sizes="(min-width: 1024px) 46vw, 100vw" className="object-cover" />
            <div className="absolute inset-5 flex items-end border border-white/44 p-5">
              <p className="max-w-xs bg-[#211b17]/78 p-4 text-sm font-bold leading-7 backdrop-blur">Waterkloof, Pretoria · Monday to Friday · 08:00 to 17:00</p>
            </div>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
