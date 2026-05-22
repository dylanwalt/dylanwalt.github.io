import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { spiralCollections, spiralPages } from "@/lib/spiral";

type SpiralRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(spiralPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: SpiralRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: spiralPages[slug]?.title ?? "Spiral of Hope" };
}

export default async function SpiralRoute({ params }: SpiralRouteProps) {
  const { slug } = await params;
  const page = spiralPages[slug];
  if (!page) notFound();

  return (
    <>
      <section className="hope-pattern relative isolate overflow-hidden bg-[#061e62] px-5 pb-16 pt-44 text-[#fff4e8] md:px-8">
        <div className="hope-spiral pointer-events-none absolute -right-40 -top-24 h-[38rem] w-[38rem] opacity-50" />
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.7fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.36em] text-[#f4ba39]">{page.eyebrow}</p>
            <h1 className="hope-display mt-6 text-[clamp(4.8rem,12vw,12rem)] font-bold">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#fff4e8]/78 md:text-2xl">{page.lead}</p>
          </div>
          <div className="relative min-h-[27rem] overflow-hidden rounded-[2.5rem] border-8 border-[#fff4e8]/12">
            <Image src={page.image} alt="" fill sizes="(min-width: 1024px) 38vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[2.4rem] border border-[#103a93]/14 bg-white/58 p-7">
              <h2 className="hope-display text-7xl font-bold text-[#103a93]">{section.title}</h2>
              <p className="mt-4 text-lg leading-8 text-[#131d49]/72">{section.body}</p>
              {section.tags && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {section.tags.map((tag) => <span key={tag} className="rounded-full bg-[#103a93] px-4 py-2 text-sm font-black text-[#fff4e8]">{tag}</span>)}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      {slug === "collections" && (
        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
            {spiralCollections.map((collection) => (
              <Link key={collection.href} href={collection.href} className="hope-focus group relative min-h-[28rem] overflow-hidden rounded-[2.5rem] bg-[#061e62] text-[#fff4e8]">
                <Image src={collection.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-82 transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#061e62] via-transparent to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-7">
                  <span className="hope-display block text-8xl font-bold">{collection.title}</span>
                  <span className="mt-3 inline-flex items-center gap-2 font-black text-[#f4ba39]">Open <ArrowRight className="h-4 w-4" /></span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
