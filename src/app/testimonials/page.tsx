import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CtaBlock } from "@/components/site/sections";
import { blobRadius, container, PageHero, Stars } from "@/components/site/ui";
import { Stagger, StaggerItem } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Kind Words",
  description: "Homeowners, café owners and renters on what it's like to work with Casa Cobalto.",
};

const tones = ["bg-butter text-ink", "bg-navy text-cream", "bg-paper text-ink", "bg-cobalt text-cream", "bg-cream text-ink ring-2 ring-ink/10", "bg-tomato text-cream"];
const tilts = ["-rotate-2", "rotate-1", "rotate-2", "-rotate-1", "rotate-1", "-rotate-2"];

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="Kind words" title="Don't take our word for it" accent={["word"]} intro="We'd rather our clients did the talking. Here's what a few of them said once the paint had dried." tone="peach">
        <div className="flex items-center gap-4 rounded-full bg-cream px-5 py-3">
          <Stars count={5} className="text-cobalt" />
          <p className="font-sans text-sm font-bold">5.0 average · 140+ reviews</p>
        </div>
      </PageHero>

      <section className={`${container} py-24 sm:py-32`}>
        <Stagger as="ul" className="columns-1 gap-6 sm:columns-2 lg:columns-3" stagger={0.09}>
          {site.testimonials.map((t, i) => {
            const project = site.projects.find((p) => p.title === t.project);
            return (
              <StaggerItem as="li" key={t.name} className="mb-6 break-inside-avoid">
                <figure className={`rounded-[2rem] p-8 transition-transform duration-500 ease-luxe hover:rotate-0 hover:scale-[1.02] sm:p-9 ${tones[i % tones.length]} ${tilts[i % tilts.length]}`}>
                  {project && i % 2 === 0 && (
                    <div className={`relative mb-7 aspect-[4/3] overflow-hidden ${i % 4 === 0 ? "rounded-t-full rounded-b-2xl" : blobRadius}`}>
                      <Image src={project.hero} alt={project.heroAlt} fill sizes="(min-width: 1024px) 28vw, (min-width: 640px) 45vw, 90vw" className="object-cover" />
                    </div>
                  )}
                  <span aria-hidden className="block font-serif text-7xl leading-[0.6] opacity-60">“</span>
                  <blockquote className="mt-4 font-serif text-2xl font-light leading-snug">{t.quote}</blockquote>
                  <figcaption className="mt-8 flex items-center gap-3">
                    <span aria-hidden className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-current/15 font-display text-lg font-bold">
                      {t.name.charAt(0)}
                    </span>
                    <span>
                      <span className="block font-display font-bold">{t.name}</span>
                      <span className="block font-sans text-sm opacity-80">
                        {t.role} ·{" "}
                        {project ? <Link href={`${site.base}/projects/${project.slug}`} className="underline decoration-2 underline-offset-4 hover:opacity-100">{t.project}</Link> : t.project}
                      </span>
                    </span>
                  </figcaption>
                </figure>
              </StaggerItem>
            );
          })}
        </Stagger>
      </section>

      <CtaBlock title="Want a story like theirs?" accent={["theirs?"]} />
    </>
  );
}
