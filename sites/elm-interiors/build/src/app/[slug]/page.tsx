import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { elmImages, elmPages, elmPortfolio, elmServices } from "@/lib/elm";

type ElmRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(elmPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ElmRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: elmPages[slug]?.title ?? "Elm Interiors" };
}

export default async function ElmRoute({ params }: ElmRouteProps) {
  const { slug } = await params;
  const page = elmPages[slug];
  if (!page) notFound();
  const portfolioPage = slug === "portfolio";
  const servicesPage = slug === "treatments";

  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#211b17] px-5 pb-20 pt-44 text-[#f4ede3] md:px-8">
        <Image src={slug === "about" ? elmImages.space : elmImages.hero} alt="" fill sizes="100vw" className="object-cover opacity-32" />
        <div className="absolute inset-0 bg-[linear-gradient(105deg,rgba(33,27,23,.98),rgba(33,27,23,.68))]" />
        <div className="elm-grain absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-7xl">
          <p className="text-xs font-black uppercase tracking-[.4em] text-[#d8b18a]">{page.eyebrow}</p>
          <h1 className="elm-display mt-5 max-w-6xl text-[clamp(3.6rem,9vw,9rem)] font-semibold">{page.title}</h1>
          <p className="mt-7 max-w-3xl text-lg leading-8 text-[#f4ede3]/78 md:text-2xl">{page.lead}</p>
        </div>
      </section>
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.56fr_1fr]">
          <aside className="h-fit border-y border-[#211b17]/14 py-6 text-sm font-black uppercase tracking-[.28em] text-[#6e7158]">
            Rooted in nature, designed for daily life.
          </aside>
          <div className="grid gap-6">
            {page.sections.map((section) => (
              <article key={section.title} className="border-b border-[#211b17]/12 pb-8">
                <h2 className="elm-display text-5xl font-semibold md:text-6xl">{section.title}</h2>
                <p className="mt-4 max-w-3xl text-lg leading-9 text-[#211b17]/72">{section.body}</p>
                {section.bullets && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {section.bullets.map((bullet) => (
                      <span key={bullet} className="border border-[#211b17]/14 bg-white/56 px-4 py-2 text-sm font-bold">{bullet}</span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      </section>
      {servicesPage && (
        <section className="bg-[#eadfce] px-5 py-16 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-3">
            {elmServices.map((service) => (
              <article key={service.title} className="border border-[#211b17]/12 bg-[#f4ede3]/65 p-6">
                <p className="text-xs font-black uppercase tracking-[.3em] text-[#b56a33]">{service.signal}</p>
                <h2 className="elm-display mt-4 text-5xl font-semibold">{service.title}</h2>
                <p className="mt-4 leading-8 text-[#211b17]/72">{service.copy}</p>
              </article>
            ))}
          </div>
        </section>
      )}
      {portfolioPage && (
        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-2">
            {elmPortfolio.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="elm-focus group relative min-h-[28rem] overflow-hidden bg-[#211b17] text-[#f4ede3]">
                <Image src={project.image} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover opacity-82 transition duration-700 group-hover:scale-105" />
                <span className="absolute inset-0 bg-gradient-to-t from-[#211b17] to-transparent" />
                <span className="absolute inset-x-0 bottom-0 p-7">
                  <span className="elm-display text-6xl font-semibold">{project.title}</span>
                  <span className="mt-3 flex items-center gap-2 font-black text-[#d8b18a]">View space <ArrowRight className="h-4 w-4" /></span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
