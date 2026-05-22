import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { farmOffers, farmPages } from "@/lib/farm";

type FarmRouteProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return Object.keys(farmPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: FarmRouteProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: farmPages[slug]?.title ?? "The Farm Barn" };
}

export default async function FarmRoute({ params }: FarmRouteProps) {
  const { slug } = await params;
  const page = farmPages[slug];
  if (!page) notFound();

  return (
    <>
      <section className="farm-fence relative isolate overflow-hidden bg-[#1d2716] px-5 pb-16 pt-44 text-[#fff3d6] md:px-8">
        <div className="relative mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_.72fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[.36em] text-[#f6b25d]">{page.eyebrow}</p>
            <h1 className="farm-display mt-5 text-[clamp(3.8rem,9vw,9rem)] font-black">{page.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-[#fff3d6]/78 md:text-2xl">{page.lead}</p>
          </div>
          <div className="relative min-h-[25rem] overflow-hidden rounded-[2.2rem] border-2 border-[#fff3d6]/20">
            <Image src={page.image} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
        </div>
      </section>
      <section className="px-5 py-20 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 lg:grid-cols-2">
          {page.sections.map((section) => (
            <article key={section.title} className="rounded-[2rem] border-2 border-[#1d2716]/10 bg-[#fff3d6]/70 p-7">
              <h2 className="farm-display text-5xl font-black">{section.title}</h2>
              <p className="mt-4 text-lg leading-8 text-[#1d2716]/72">{section.body}</p>
              {section.items && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {section.items.map((item) => <span key={item} className="rounded-full bg-[#1d2716] px-4 py-2 text-sm font-black text-[#fff3d6]">{item}</span>)}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      {slug === "what-we-offer" && (
        <section className="px-5 pb-24 md:px-8">
          <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {farmOffers.map((offer) => (
              <article key={offer.title} className="overflow-hidden rounded-[1.8rem] bg-[#1d2716] text-[#fff3d6]">
                <div className="relative aspect-square"><Image src={offer.image} alt="" fill sizes="25vw" className="object-cover" /></div>
                <div className="p-5"><h2 className="farm-display text-4xl font-black">{offer.title}</h2><p className="mt-2 text-[#fff3d6]/70">{offer.body}</p></div>
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
}
