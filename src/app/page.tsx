import Image from "next/image";
import { PostCard, ProjectCard, ServiceCard, StatBlobs } from "@/components/site/cards";
import { Hero } from "@/components/site/Hero";
import { HorizontalProcess } from "@/components/site/HorizontalProcess";
import { ScrollHighlight } from "@/components/site/ScrollHighlight";
import { CtaBlock, Marquee } from "@/components/site/sections";
import { TestimonialSlider } from "@/components/site/TestimonialSlider";
import { blobRadius, Button, container, Heading } from "@/components/site/ui";
import { ImageReveal, Reveal } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { unsplash } from "@/lib/content/helpers";

const { base } = site;

export default function Design2Home() {
  const featured = site.projects.filter((p) => p.featured);
  const extra = site.projects.find((p) => !p.featured)!;
  const work = [...featured, extra];

  return (
    <>
      <Hero
        images={[
          { src: `${unsplash("1618220179428-22790b461013")}?crop=entropy`, alt: "Living room with an orange velvet armchair, gold console and plants" },
          { src: unsplash("1617806118233-18e1de247200"), alt: "Dining room with emerald velvet chairs" },
          { src: unsplash("1615873968403-89e068629265"), alt: "Teal wall with a gallery of framed prints" },
        ]}
      />

      <Marquee words={["Homes", "with heart", "Cafés", "& kitchens", "Colour consults", "made in Lisboa"]} />

      {/* Statement */}
      <section className={`${container} py-24 sm:py-36`}>
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-9">
            <ScrollHighlight
              text="We think beige is a missed opportunity. Our rooms are built from clay, colour and craft — with Portuguese makers, flea-market treasures and a very good reason for every bold choice."
              accent={["clay,", "colour", "craft"]}
            />
          </div>
          <Reveal className="flex flex-col justify-end gap-6 lg:col-span-3" delay={0.2}>
            <div className={`relative aspect-square w-40 overflow-hidden ${blobRadius} bg-butter sm:w-48`}>
              <Image src={unsplash("1616627561950-9f746e330187")} alt="Close-up of striped and rust-coloured linen cushions" fill sizes="12rem" className="object-cover" />
            </div>
            <Button href={`${base}/about`} variant="outline">Meet the studio</Button>
          </Reveal>
        </div>
      </section>

      {/* Work collage */}
      <section className="bg-paper py-24 sm:py-32" aria-labelledby="work">
        <div className={container}>
          <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <div id="work">
              <Heading eyebrow="Selected work" title="Spaces with character" accent={["character"]} size="lg" />
            </div>
            <Reveal>
              <Button href={`${base}/projects`} variant="forest">All projects</Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-14 sm:grid-cols-2 lg:mt-20 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-6">
            <Reveal className="lg:col-span-7" y={50}>
              <ProjectCard project={work[0]} base={base} shape={3} aspect="aspect-[5/4]" tilt="lg:-rotate-1" sizes="(min-width: 1024px) 55vw, 50vw" />
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-9 lg:mt-24" y={70} delay={0.1}>
              <ProjectCard project={work[1]} base={base} shape={1} aspect="aspect-[3/4]" tilt="lg:rotate-2" sizes="(min-width: 1024px) 32vw, 50vw" />
            </Reveal>
            <Reveal className="lg:col-span-4 lg:col-start-2 lg:-mt-10" y={60}>
              <ProjectCard project={work[2]} base={base} shape={2} aspect="aspect-square" tilt="lg:rotate-1" sizes="(min-width: 1024px) 32vw, 50vw" />
            </Reveal>
            <Reveal className="lg:col-span-6 lg:col-start-7 lg:mt-16" y={50} delay={0.1}>
              <ProjectCard project={work[3]} base={base} shape={0} aspect="aspect-[16/11]" tilt="lg:-rotate-2" sizes="(min-width: 1024px) 48vw, 50vw" />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services bento */}
      <section className={`${container} py-24 sm:py-32`} aria-labelledby="services">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7" id="services">
            <Heading eyebrow="What we do" title="Seven ways to make a room sing" accent={["sing"]} />
          </div>
          <Reveal className="lg:col-span-4 lg:col-start-9">
            <p className="font-sans text-lg leading-relaxed text-mute">From a two-hour colour consult to a whole house — hover a card to peek inside.</p>
          </Reveal>
        </div>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.services.map((s, i) => (
            <Reveal as="li" key={s.slug} delay={(i % 4) * 0.07} className={i === 0 ? "sm:col-span-2 lg:row-span-2" : i === 3 ? "lg:col-span-2" : ""}>
              <ServiceCard service={s} index={i} base={base} showImage={i === 0} className={i === 0 ? "h-full lg:min-h-[39rem]" : "h-full"} />
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Stats */}
      <section className={`${container} pb-24 sm:pb-32`} aria-label="Studio in numbers">
        <StatBlobs stats={site.stats} />
      </section>

      {/* Process */}
      <section className="bg-cream" aria-labelledby="process">
        <HorizontalProcess
          steps={site.process}
          heading={
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between" id="process">
              <Heading eyebrow="How we work" title="From coffee to keys" accent={["keys"]} />
              <Button href={`${base}/process`} variant="outline">The full process</Button>
            </div>
          }
        />
      </section>

      {/* Testimonials */}
      <section className="grain relative overflow-hidden bg-navy py-24 text-cream sm:py-32" aria-labelledby="kind">
        <div className={container}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div id="kind">
              <Heading eyebrow="Kind words" title="Happy rooms, happy people" accent={["happy", "people"]} light />
            </div>
          </div>
          <div className="mt-6">
            <TestimonialSlider items={site.testimonials} />
          </div>
        </div>
      </section>

      {/* Journal */}
      <section className={`${container} py-24 sm:py-32`} aria-labelledby="journal">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div id="journal">
            <Heading eyebrow="Journal" title="Notes on colour & craft" accent={["colour", "craft"]} />
          </div>
          <Reveal>
            <Button href={`${base}/journal`} variant="outline">Read the journal</Button>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {site.posts.slice(0, 3).map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1} y={40} className={i === 1 ? "lg:mt-16" : ""}>
              <PostCard post={p} base={base} />
            </Reveal>
          ))}
        </div>
      </section>

      <ImageReveal className="relative mx-5 h-[50vh] overflow-hidden rounded-[2.5rem] sm:mx-8 lg:mx-auto lg:max-w-[1336px]" direction="left">
        <Image src={unsplash("1618221469555-7f3ad97540d6")} alt="Bright living room with leather chairs, rug and potted plants" fill sizes="100vw" className="object-cover" />
      </ImageReveal>

      <CtaBlock />
    </>
  );
}
