import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Phone } from "lucide-react";
import { elmImages, elmNavigation } from "@/lib/elm";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 border border-white/45 bg-[#f4ede3]/82 px-4 py-3 shadow-[0_18px_80px_rgba(33,27,23,.12)] backdrop-blur-xl">
        <Link href="/" className="elm-focus flex items-center gap-3" aria-label="Elm Interiors home">
          <span className="grid h-11 w-11 place-items-center overflow-hidden bg-white/80">
            <Image src={elmImages.logo} alt="" width={44} height={44} className="h-9 w-9 object-contain" />
          </span>
          <span>
            <span className="elm-display block text-3xl font-semibold">elm.</span>
            <span className="block text-[10px] font-black uppercase tracking-[.28em] text-[#6e7158]">Interiors</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-extrabold uppercase tracking-[.18em] md:flex">
          {elmNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="elm-focus transition hover:text-[#b56a33]">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#contact"
          className="elm-focus inline-flex min-h-11 items-center gap-2 bg-[#211b17] px-4 text-sm font-black text-[#f4ede3] transition hover:bg-[#b56a33]"
        >
          Project <ArrowUpRight className="h-4 w-4" />
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-[#211b17]/10 px-5 py-12 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto]">
        <div>
          <p className="elm-display text-5xl">Elm Interiors</p>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#211b17]/65">
            Nature-led Pretoria interior design, decorating, rendering, and source-project storytelling rebuilt as a standalone experience.
          </p>
        </div>
        <div className="grid gap-3 text-sm font-bold">
          {elmNavigation.map((item) => (
            <Link key={item.href} href={item.href} className="elm-focus transition hover:text-[#b56a33]">
              {item.label}
            </Link>
          ))}
          <Link href="/privacy-policy" className="elm-focus transition hover:text-[#b56a33]">Privacy</Link>
        </div>
        <div className="grid content-start gap-3 text-sm">
          <a href="tel:+27721411818" className="elm-focus flex items-center gap-2 font-bold transition hover:text-[#b56a33]">
            <Phone className="h-4 w-4" /> +27 72 141 1818
          </a>
          <a href="mailto:info@elminteriors.co.za" className="elm-focus font-bold transition hover:text-[#b56a33]">
            info@elminteriors.co.za
          </a>
          <p className="flex items-center gap-2 text-[#211b17]/65"><MapPin className="h-4 w-4" /> Waterkloof, Pretoria</p>
        </div>
      </div>
    </footer>
  );
}
