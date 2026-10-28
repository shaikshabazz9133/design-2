import type { Metadata } from "next";
import Image from "next/image";
import { StatBlobs } from "@/components/site/cards";
import { CtaBlock, Marquee } from "@/components/site/sections";
import { blobRadius, container, Heading, PageHero } from "@/components/site/ui";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "About the Studio",
  description: "Meet Casa Cobalto: a Lisbon studio of designers, colour obsessives and maker-wranglers making characterful interiors since 2014.",
};

const values = [
  { title: "Colour with a reason", text: "Every bold choice has a why behind it — light, mood, history or the client's own story.", tone: "bg-cobalt text-cream" },
  { title: "Made nearby", text: "We work with 46 Portuguese makers. Most of what we specify is made within 300 km of the studio.", tone: "bg-navy text-cream" },
  { title: "Reuse first", text: "Before we buy anything new we ask what can be restored, re-covered or rehomed.", tone: "bg-butter text-ink" },
  { title: "Fun is allowed", text: "Interiors are serious work. That doesn't mean they can't make you smile.", tone: "bg-paper text-ink" },
];
const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3"];

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="About us" title="Colour obsessives since 2014" accent={["obsessives"]} intro="We're a team of nine designers, architects and maker-wranglers in Príncipe Real — and we've never painted a room beige." tone="peach" />

      {/* Collage + story */}
      <section className={`${container} py-24 sm:py-32`}>
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="relative h-[28rem] sm:h-[36rem] lg:col-span-6">
            <ImageReveal className={`absolute left-0 top-0 h-[78%] w-[66%] overflow-hidden rounded-t-full bg-butter`}>
              <Image src={unsplash("1618219944342-824e40a13285")} alt="Sage-green room with a peach armchair and gold bar cart" fill preload sizes="(min-width: 1024px) 30vw, 66vw" className="object-cover" />
            </ImageReveal>
            <ImageReveal className={`absolute bottom-0 right-0 h-[52%] w-[50%] overflow-hidden ${blobRadius} border-[6px] border-cream bg-cobalt`} delay={0.2} direction="left">
              <Image src={unsplash("1615875605825-5eb9bb5d52ac")} alt="Open shelving with books, plants and prints" fill sizes="(min-width: 1024px) 24vw, 50vw" className="object-cover" />
            </ImageReveal>
            <span aria-hidden className="animate-float absolute right-[12%] top-[8%] h-16 w-16 rounded-full bg-navy" />
          </div>
          <div className="lg:col-span-6">
            <Heading eyebrow="Our story" title="It started in a garage in Graça" accent={["garage"]} />
            <div className="mt-8 space-y-5 font-sans text-lg leading-relaxed text-mute">
              <Reveal><p>Inês Carvalho spent ten years painting film sets before she painted her first client&apos;s living room — a deep, unapologetic terracotta. The neighbours asked who did it. Then their neighbours asked.</p></Reveal>
              <Reveal delay={0.1}><p>Twelve years later we&apos;re nine people, a showroom of maker pieces and our own range of clay paints. The approach hasn&apos;t changed: listen hard, use colour bravely and build with local hands.</p></Reveal>
            </div>
          </div>
        </div>
      </section>

      <Marquee tone="terracotta" words={["Azulejo blue", "colour", "craft", "curiosity", "café com leite", "& a lot of plants"]} />

      {/* Values */}
      <section className={`${container} py-24 sm:py-32`}>
        <Heading eyebrow="What we believe" title="Four house rules" accent={["house"]} />
        <Stagger as="ul" className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => (
            <StaggerItem as="li" key={v.title} className={`rounded-[2rem] p-8 transition-transform duration-500 hover:rotate-0 hover:scale-[1.02] ${v.tone} ${tilts[i]}`}>
              <span className="font-serif text-5xl font-light italic">{i + 1}.</span>
              <h3 className="mt-8 font-display text-2xl font-bold tracking-[-0.03em]">{v.title}</h3>
              <p className="mt-3 font-sans leading-relaxed opacity-85">{v.text}</p>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Team */}
      <section className="bg-paper py-24 sm:py-32">
        <div className={container}>
          <Heading eyebrow="The crew" title="Who you'll be working with" accent={["you'll"]} />
          <Stagger as="ul" className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {site.team.map((m, i) => (
              <StaggerItem as="li" key={m.name} className={`group bg-cream p-4 pb-6 shadow-[0_20px_50px_-25px_rgba(35,26,21,0.4)] transition-transform duration-500 hover:-translate-y-2 hover:rotate-0 ${tilts[(i + 1) % 4]}`}>
                <div className="relative aspect-square overflow-hidden bg-butter">
                  <Image src={m.image} alt={`Portrait of ${m.name}`} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw" className="object-cover saturate-[0.85] transition-all duration-700 group-hover:scale-105 group-hover:saturate-100" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold tracking-[-0.03em]">{m.name}</h3>
                <p className="font-serif italic text-cobalt">{m.role}</p>
                <p className="mt-3 font-sans text-sm leading-relaxed text-mute">{m.bio}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Timeline */}
      <section className={`${container} py-24 sm:py-32`}>
        <Heading eyebrow="Milestones" title="Twelve colourful years" accent={["colourful"]} />
        <ol className="mt-14 grid gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {site.milestones.map((m, i) => (
            <Reveal as="li" key={m.year} delay={i * 0.08} className="relative rounded-[2rem] border-2 border-ink/10 p-6">
              <span className="font-display text-3xl font-extrabold tracking-[-0.05em] text-cobalt">{m.year}</span>
              <h3 className="mt-4 font-display text-lg font-bold">{m.title}</h3>
              <p className="mt-2 font-sans text-sm leading-relaxed text-mute">{m.text}</p>
            </Reveal>
          ))}
        </ol>
        <div className="mt-20">
          <StatBlobs stats={site.stats} />
        </div>
      </section>

      <CtaBlock title="Come say olá at the studio" accent={["olá"]} />
    </>
  );
}
