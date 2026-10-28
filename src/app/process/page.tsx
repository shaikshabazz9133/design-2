import type { Metadata } from "next";
import Image from "next/image";
import { Plus } from "lucide-react";
import { CtaBlock } from "@/components/site/sections";
import { container, Heading, PageHero } from "@/components/site/ui";
import { Accordion } from "@/components/ui/Accordion";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "How We Work",
  description: "From first coffee to final styling day: the six-step Casa Cobalto design process.",
};

const tones = [
  "bg-cobalt text-cream",
  "bg-butter text-ink",
  "bg-navy text-cream",
  "bg-paper text-ink",
  "bg-tomato text-cream",
  "bg-navy-soft text-cream",
];
const photos = ["1586023492125-27b2c045efd7", "1616046229478-9901c5536a45", "1618219944342-824e40a13285", "1616627561950-9f746e330187", "1538688525198-9b88f6f53126", "1618220179428-22790b461013"];

export default function ProcessPage() {
  return (
    <>
      <PageHero eyebrow="Our process" title="From first coffee to final cushion" accent={["coffee"]} intro="Six steps, a weekly photo diary and no nasty surprises. Here's exactly what happens after you say olá." tone="cream" />

      {/* Stacking cards: each step pins slightly lower than the last as you scroll. */}
      <ol className={`${container} pb-24 sm:pb-32`}>
        {site.process.map((step, i) => (
          <li key={step.title} className="sticky mb-8 lg:mb-16" style={{ top: `calc(6rem + ${i * 1.5}rem)` }}>
            <article className={`grid overflow-hidden rounded-[2.25rem] shadow-[0_-20px_60px_-30px_rgba(35,26,21,0.4)] md:grid-cols-2 ${tones[i]}`}>
              <div className="flex flex-col p-7 sm:p-10 lg:p-14">
                <div className="flex items-center gap-4">
                  <span className="font-serif text-6xl font-light italic leading-none sm:text-7xl">{i + 1}</span>
                  <span className="rounded-full border-2 border-current/30 px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.12em]">{step.duration}</span>
                </div>
                <h2 className="mt-8 font-display text-[clamp(2rem,4vw,3.25rem)] font-bold leading-none tracking-[-0.04em]">{step.title}</h2>
                <p className="mt-5 max-w-md font-sans text-lg leading-relaxed opacity-85">{step.description}</p>
                <ul className="mt-auto flex flex-wrap gap-2 pt-8">
                  {step.deliverables.map((d) => (
                    <li key={d} className="rounded-full bg-cream/20 px-4 py-2 font-sans text-sm font-semibold backdrop-blur-sm">{d}</li>
                  ))}
                </ul>
              </div>
              <div className="relative hidden min-h-[22rem] md:block">
                <Image src={unsplash(photos[i])} alt="" fill loading={i === 0 ? "eager" : undefined} sizes="50vw" className="object-cover" />
              </div>
            </article>
          </li>
        ))}
      </ol>

      <section className="bg-paper py-24 sm:py-32">
        <div className={`${container} grid gap-12 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <Heading eyebrow="Good to know" title="Fees, timings & the fine print" accent={["fine", "print"]} />
          </div>
          <div className="lg:col-span-7">
            <Accordion
              items={site.faqs}
              defaultOpen={1}
              className="space-y-3"
              itemClassName="rounded-[1.75rem] bg-cream px-6 transition-colors data-[open]:bg-butter sm:px-8"
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

      <CtaBlock title="Ready for step one?" accent={["one?"]} />
    </>
  );
}
