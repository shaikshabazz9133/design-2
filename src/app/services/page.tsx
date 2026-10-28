import type { Metadata } from "next";
import Image from "next/image";
import { Plus } from "lucide-react";
import { CtaBlock } from "@/components/site/sections";
import { blobRadius, Button, container, Heading, PageHero } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Services",
  description: "Homes, cafés, kitchens, bedrooms, living rooms, renovation and colour consults from Casa Cobalto in Lisbon.",
};

const masks = ["rounded-t-full rounded-b-[2rem]", blobRadius, "rounded-[2rem] rounded-tl-[9rem]", "rounded-full"];
const bands = ["bg-cream", "bg-paper"];

export default function ServicesPage() {
  return (
    <>
      <PageHero eyebrow="Services" title="Big projects, small rooms, bold ideas" accent={["bold", "ideas"]} intro="Whether it's a whole house or one stubborn corner, we bring the same curiosity — and the same little black book of makers." tone="forest">
        <nav aria-label="Jump to a service" className="flex max-w-xl flex-wrap gap-2">
          {site.services.map((s) => (
            <a key={s.slug} href={`#${s.slug}`} className="inline-flex min-h-10 items-center rounded-full border-2 border-cream/30 px-4 font-sans text-sm font-semibold text-cream transition-colors hover:border-butter hover:bg-butter hover:text-ink">
              {s.title}
            </a>
          ))}
        </nav>
      </PageHero>

      {site.services.map((s, i) => {
        const flip = i % 2 === 1;
        return (
          <section key={s.slug} id={s.slug} aria-labelledby={`${s.slug}-t`} className={`scroll-mt-24 py-20 sm:py-28 ${bands[i % 2]}`}>
            <div className={`${container} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
              <ImageReveal className={`relative aspect-square overflow-hidden bg-butter sm:aspect-[5/4] lg:col-span-6 ${masks[i % masks.length]} ${flip ? "lg:order-2" : ""}`} direction={flip ? "left" : "right"}>
                <Image src={s.image} alt={s.imageAlt} fill loading={i === 0 ? "eager" : undefined} sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
              </ImageReveal>
              <div className={`lg:col-span-6 ${flip ? "lg:order-1" : ""}`}>
                <Reveal>
                  <span className="inline-grid h-16 w-16 place-items-center rounded-full bg-cobalt font-serif text-2xl italic text-cream">{i + 1}</span>
                  <h2 id={`${s.slug}-t`} className="mt-6 font-display text-[clamp(2rem,4.5vw,3.5rem)] font-bold leading-[1] tracking-[-0.04em]">{s.title}</h2>
                  <p className="mt-5 max-w-lg font-sans text-lg leading-relaxed text-mute">{s.description}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {s.includes.map((inc, k) => (
                      <li key={inc} className="flex items-start gap-3 rounded-2xl bg-cream/70 p-4 font-sans text-[15px] font-medium shadow-[inset_0_0_0_2px_rgba(35,26,21,0.06)]">
                        <span aria-hidden className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${["bg-cobalt", "bg-navy", "bg-butter", "bg-tomato"][k % 4]}`} />
                        {inc}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-5">
                    <Button href="/contact">Let&apos;s talk</Button>
                    <p className="font-sans text-sm text-mute">Usually <span className="font-serif text-base italic text-cobalt">{s.timeline}</span></p>
                  </div>
                </Reveal>
              </div>
            </div>
          </section>
        );
      })}

      <section className={`${container} py-24 sm:py-32`} aria-labelledby="faq">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5" id="faq">
            <Heading eyebrow="FAQ" title="Questions we get over coffee" accent={["coffee"]} />
          </div>
          <div className="lg:col-span-7">
            <Accordion
              items={site.faqs}
              className="space-y-3"
              itemClassName="rounded-[1.75rem] bg-paper px-6 transition-colors data-[open]:bg-butter sm:px-8"
              buttonClassName="min-h-16 py-5"
              questionClassName="font-display text-xl font-bold tracking-[-0.02em]"
              panelClassName="pb-6 font-sans text-[17px] leading-relaxed text-mute"
              icon={<Plus size={20} strokeWidth={2.4} />}
              iconClassName="grid h-11 w-11 place-items-center rounded-full bg-ink text-cream transition-transform duration-500 ease-luxe"
              iconOpenClassName="rotate-[135deg] bg-cobalt"
            />
          </div>
        </div>
      </section>

      <CtaBlock />
    </>
  );
}
