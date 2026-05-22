import Image from "next/image";
import Link from "next/link";
import { MapPinned, PhoneCall } from "lucide-react";
import { farmImages, farmNavigation } from "@/lib/farm";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[1.6rem] border-2 border-[#1d2716]/12 bg-[#fbefcf]/88 px-4 py-3 shadow-[0_18px_64px_rgba(29,39,22,.15)] backdrop-blur-xl">
        <Link href="/" className="farm-focus flex items-center gap-3" aria-label="The Farm Barn home">
          <span className="grid h-14 w-20 place-items-center rounded-2xl bg-white/78">
            <Image src={farmImages.logo} alt="" width={120} height={60} className="h-auto w-16 object-contain" />
          </span>
          <span className="hidden sm:block">
            <span className="farm-display block text-2xl font-black">The Farm Barn</span>
            <span className="block text-[10px] font-black uppercase tracking-[.28em] text-[#536631]">Pretoria East</span>
          </span>
        </Link>
        <nav className="hidden gap-6 text-sm font-black uppercase tracking-[.18em] md:flex">
          {farmNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="farm-focus transition hover:text-[#bd5f2a]">{item.label}</Link>
          ))}
        </nav>
        <a href="tel:+27749222108" className="farm-focus inline-flex min-h-12 items-center gap-2 rounded-full bg-[#bd5f2a] px-4 font-black text-[#fff3d6] transition hover:bg-[#1d2716]">
          <PhoneCall className="h-4 w-4" /> Call
        </a>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-[#1d2716] px-5 py-12 text-[#fff3d6] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto]">
        <div>
          <p className="farm-display text-5xl">Visit the barn.</p>
          <p className="mt-3 max-w-md leading-7 text-[#fff3d6]/72">Farm supply, animal care categories, café, play, and visible practical contact details.</p>
        </div>
        <div className="grid content-start gap-3 font-bold">
          {farmNavigation.map((item) => <Link key={item.href} href={item.href} className="farm-focus transition hover:text-[#f6b25d]">{item.label}</Link>)}
        </div>
        <div className="grid content-start gap-3 text-sm font-bold">
          <a href="mailto:info@thefarmbarn.co.za" className="farm-focus transition hover:text-[#f6b25d]">info@thefarmbarn.co.za</a>
          <a href="tel:+27609675393" className="farm-focus transition hover:text-[#f6b25d]">060 967 5393</a>
          <p className="flex max-w-xs gap-2 text-[#fff3d6]/72"><MapPinned className="mt-0.5 h-4 w-4 shrink-0" /> Plot 1, Graham Road, Shere, Pretoria</p>
        </div>
      </div>
    </footer>
  );
}
