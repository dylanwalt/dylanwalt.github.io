import Image from "next/image";
import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import { spiralImages, spiralNavigation } from "@/lib/spiral";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 rounded-[2rem] border border-[#103a93]/14 bg-[#fff4e8]/86 px-4 py-3 shadow-[0_20px_70px_rgba(6,30,98,.15)] backdrop-blur-xl">
        <Link href="/" className="hope-focus grid min-h-14 w-40 place-items-center overflow-hidden rounded-full bg-white/72 px-3" aria-label="Spiral of Hope home">
          <Image src={spiralImages.logo} alt="" width={250} height={56} className="h-auto w-full object-contain" />
        </Link>
        <nav className="hidden items-center gap-5 text-xs font-black uppercase tracking-[.24em] lg:flex">
          {spiralNavigation.map((item) => <Link key={item.href} href={item.href} className="hope-focus transition hover:text-[#e3604a]">{item.label}</Link>)}
        </nav>
        <Link href="/collections" className="hope-focus rounded-full bg-[#103a93] px-5 py-3 text-sm font-black text-[#fff4e8] transition hover:bg-[#e3604a]">
          Collections
        </Link>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="hope-pattern bg-[#061e62] px-5 py-12 text-[#fff4e8] md:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1fr_auto_auto]">
        <div>
          <p className="hope-display text-7xl font-bold">Spiral of Hope</p>
          <p className="mt-3 max-w-md leading-7 text-[#fff4e8]/72">Locally made table, kitchen, home, bag, and accessory collection storytelling.</p>
        </div>
        <div className="grid content-start gap-3 font-bold">
          {spiralNavigation.map((item) => <Link key={item.href} href={item.href} className="hope-focus transition hover:text-[#f4ba39]">{item.label}</Link>)}
          <Link href="/policies" className="hope-focus transition hover:text-[#f4ba39]">Policies</Link>
        </div>
        <div className="grid content-start gap-3 text-sm font-bold">
          <a href="mailto:info@spiralofhope.co.za" className="hope-focus flex items-center gap-2 transition hover:text-[#f4ba39]"><Mail className="h-4 w-4" /> info@spiralofhope.co.za</a>
          <a href="tel:+27128030643" className="hope-focus flex items-center gap-2 transition hover:text-[#f4ba39]"><Phone className="h-4 w-4" /> +27 12 803 0643</a>
        </div>
      </div>
    </footer>
  );
}
