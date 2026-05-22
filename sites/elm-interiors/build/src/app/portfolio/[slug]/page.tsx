import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { elmImages, elmPortfolio } from "@/lib/elm";

type PortfolioProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return elmPortfolio.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PortfolioProps): Promise<Metadata> {
  const { slug } = await params;
  return { title: elmPortfolio.find((project) => project.slug === slug)?.title ?? "Portfolio" };
}

export default async function PortfolioProject({ params }: PortfolioProps) {
  const { slug } = await params;
  const project = elmPortfolio.find((item) => item.slug === slug);
  if (!project) notFound();
  const related = [project.image, elmImages.room, elmImages.decor, elmImages.space];

  return (
    <>
      <section className="relative isolate min-h-[88vh] overflow-hidden bg-[#211b17] px-5 pb-14 pt-40 text-[#f4ede3] md:px-8">
        <Image src={project.image} alt="" fill priority sizes="100vw" className="object-cover opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#211b17] via-[#211b17]/30 to-[#211b17]/62" />
        <div className="relative mx-auto flex min-h-[calc(88vh-13rem)] max-w-7xl flex-col justify-end">
          <Link href="/portfolio" className="elm-focus mb-auto inline-flex w-fit items-center gap-2 border border-white/30 bg-black/20 px-4 py-2 font-black backdrop-blur">
            <ArrowLeft className="h-4 w-4" /> Portfolio
          </Link>
          <p className="text-xs font-black uppercase tracking-[.4em] text-[#d8b18a]">Elm project</p>
          <h1 className="elm-display mt-4 text-[clamp(4rem,11vw,11rem)] font-semibold">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-xl leading-8 text-[#f4ede3]/78">{project.note}</p>
        </div>
      </section>
      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
          {related.map((image, index) => (
            <div key={`${image}-${index}`} className={`relative overflow-hidden bg-[#211b17] ${index === 0 ? "min-h-[34rem] md:col-span-2" : "min-h-[22rem]"}`}>
              <Image src={image} alt="" fill sizes="(min-width: 768px) 60vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
        <div className="mx-auto mt-10 flex max-w-7xl justify-end">
          <Link href="/#contact" className="elm-focus inline-flex min-h-14 items-center gap-2 bg-[#211b17] px-6 font-black text-[#f4ede3]">
            Bring a project <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
