"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coffee, MapPinned, PawPrint, Stethoscope } from "lucide-react";
import { MotionConfig, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { farmImages, farmOffers } from "@/lib/farm";

const visitSignals = [
  { title: "Home Awaits Café", image: farmImages.cafe, icon: Coffee },
  { title: "On-site vet signal", image: farmImages.vet, icon: Stethoscope },
  { title: "Kids play area", image: farmImages.play, icon: PawPrint },
];

export function HomeExperience() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const mapShift = useTransform(scrollYProgress, [0, 0.25], [0, reduceMotion ? 0 : -54]);

  return (
    <MotionConfig reducedMotion="user">
      <section className="farm-fence relative isolate overflow-hidden bg-[#1d2716] px-5 pb-16 pt-40 text-[#fff3d6] md:px-8">
        <div className="absolute -left-24 top-28 h-72 w-72 rounded-full bg-[#bd5f2a]/30 blur-3xl" />
        <div className="absolute right-0 top-0 h-full w-[44rem] bg-[radial-gradient(circle,#8bb4bc55,transparent_65%)]" />
        <div className="relative mx-auto grid min-h-[calc(100vh-10rem)] max-w-7xl items-center gap-10 lg:grid-cols-[.88fr_1fr]">
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: reduceMotion ? 0 : 0.8 }}>
            <p className="inline-flex rounded-full border border-[#fff3d6]/25 bg-[#fff3d6]/12 px-4 py-2 text-xs font-black uppercase tracking-[.32em]">
              Local farm supply · Pretoria East
            </p>
            <h1 className="farm-display mt-7 text-[clamp(4.2rem,11vw,10rem)] font-black">Supplies with a farm day attached.</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-[#fff3d6]/80 md:text-2xl">
              The Farm Barn brings feed, pet products, farm essentials, café pauses, vet access, and family-country energy into one Shere stop.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href="/what-we-offer" className="farm-focus inline-flex min-h-14 items-center justify-center gap-2 rounded-full bg-[#f6b25d] px-6 font-black text-[#1d2716] transition hover:bg-[#fff3d6]">
                See the paddocks <ArrowRight className="h-5 w-5" />
              </Link>
              <Link href="/contact" className="farm-focus inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-[#fff3d6]/28 bg-[#fff3d6]/12 px-6 font-black backdrop-blur transition hover:bg-[#fff3d6]/22">
                <MapPinned className="h-5 w-5" /> Visit details
              </Link>
            </div>
          </motion.div>
          <motion.div style={{ y: mapShift }} className="relative min-h-[34rem] overflow-hidden rounded-[2.4rem] border-4 border-[#fff3d6]/22 bg-[#fff3d6] p-4 shadow-[0_30px_100px_rgba(0,0,0,.35)]">
            <Image src={farmImages.map} alt="Illustrated Farm Barn map" fill priority sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
            <div className="absolute inset-4 rounded-[1.7rem] border-2 border-[#1d2716]/15" />
            <div className="absolute bottom-6 left-6 right-6 grid gap-2 sm:grid-cols-3">
              {["Feed", "Café", "Animal care"].map((signal) => (
                <span key={signal} className="rounded-full border border-[#1d2716]/12 bg-[#fff3d6]/90 px-3 py-2 text-center text-xs font-black uppercase tracking-[.18em] text-[#1d2716] backdrop-blur">
                  {signal}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="overflow-hidden border-y border-[#1d2716]/10 bg-[#f6b25d] py-4 text-[#1d2716]">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-10 gap-y-2 px-5 text-xs font-black uppercase tracking-[.32em] md:justify-between">
          {["Animal feed", "Farm supplies", "Hay & lucerne", "Pet products", "Tack & riding", "Friendly service"].map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 lg:grid-cols-[.62fr_1fr]">
            <div>
              <p className="text-xs font-black uppercase tracking-[.34em] text-[#bd5f2a]">Supply paddock</p>
              <h2 className="farm-display mt-4 text-[clamp(3.2rem,7vw,7.5rem)] font-black">A shopping list that breathes.</h2>
            </div>
            <p className="max-w-2xl self-end text-lg leading-8 text-[#1d2716]/72">
              The source offer is practical first. These categories stay visible before the rebuild turns toward café, play, and the farm setting.
            </p>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {farmOffers.map((offer, index) => (
              <motion.article
                key={offer.title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: reduceMotion ? 0 : index * 0.07 }}
                className="group overflow-hidden rounded-[2rem] border-2 border-[#1d2716]/10 bg-[#fff3d6]/75"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image src={offer.image} alt="" fill sizes="(min-width: 1024px) 25vw, 50vw" className="object-cover transition duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="farm-display text-4xl font-black">{offer.title}</h3>
                  <p className="mt-3 leading-7 text-[#1d2716]/70">{offer.body}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#1d2716] px-5 py-20 text-[#fff3d6] md:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-[1fr_.92fr]">
          <div className="relative min-h-[30rem] overflow-hidden rounded-[2.5rem] border border-[#fff3d6]/18">
            <Image src={farmImages.cafePoster} alt="Home Awaits Café at The Farm Barn" fill sizes="(min-width: 1024px) 52vw, 100vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1d2716] via-transparent to-transparent" />
            <p className="farm-display absolute bottom-6 left-6 max-w-md text-5xl font-black">Pause between errands.</p>
          </div>
          <div className="grid gap-4">
            {visitSignals.map(({ title, image, icon: Icon }) => (
              <div key={title} className="grid grid-cols-[7rem_1fr] overflow-hidden rounded-[1.8rem] border border-[#fff3d6]/16 bg-[#fff3d6]/10">
                <div className="relative min-h-32">
                  <Image src={image} alt="" fill sizes="112px" className="object-cover" />
                </div>
                <div className="p-5">
                  <Icon className="h-5 w-5 text-[#f6b25d]" />
                  <h3 className="farm-display mt-3 text-4xl font-black">{title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-[2.6rem] border-2 border-[#1d2716]/12 bg-[#fff3d6]/78 p-7 md:p-12 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.34em] text-[#bd5f2a]">Contact</p>
            <h2 className="farm-display mt-4 text-[clamp(3.3rem,7vw,7rem)] font-black">Call before the next feed run.</h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-[#1d2716]/72">Plot 1, Graham Road, Shere, Pretoria. Weekdays from 8:00 and Saturdays from 9:00 on the source contact page.</p>
          </div>
          <div className="flex flex-col gap-3">
            <a href="tel:+27749222108" className="farm-focus inline-flex min-h-14 items-center justify-center rounded-full bg-[#bd5f2a] px-6 font-black text-[#fff3d6]">074 922 2108</a>
            <a href="mailto:info@thefarmbarn.co.za" className="farm-focus inline-flex min-h-14 items-center justify-center rounded-full border-2 border-[#1d2716]/14 px-6 font-black">Email the barn</a>
          </div>
        </div>
      </section>
    </MotionConfig>
  );
}
