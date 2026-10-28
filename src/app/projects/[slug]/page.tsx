import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { ProjectCard } from "@/components/site/cards";
import { GalleryStrip } from "@/components/site/GalleryStrip";
import { CtaBlock } from "@/components/site/sections";
import { Blob, Button, Chip, container, Heading } from "@/components/site/ui";
import { ImageReveal, Reveal, SplitText, Stagger, StaggerItem } from "@/components/motion/primitives";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { site } from "@/lib/content/site";
import { findProject, nextProject, relatedProjects } from "@/lib/content/helpers";

export function generateStaticParams() {
  return site.projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = findProject(site, slug);
  if (!p) return { title: "Project not found" };
  return { title: p.title, description: p.summary };
}

function Skeleton() {
  return (
    <div role="status" aria-label="Loading project" className="grid animate-pulse lg:min-h-[100svh] lg:grid-cols-2">
      <div className="flex flex-col justify-end gap-5 bg-butter px-8 pb-16 pt-40">
        <div className="h-6 w-40 rounded-full bg-cream/60" />
        <div className="h-24 w-4/5 rounded-3xl bg-cream/60" />
      </div>
      <div className="min-h-[50vh] bg-paper" />
    </div>
  );
}

export default function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = findProject(site, slug);
  if (!project) notFound();
  const next = nextProject(site, project);
  const related = relatedProjects(site, project, 3);
  const facts = [
    ["Where", project.location],
    ["When", String(project.year)],
    ["Size", project.area],
    ["Took", project.duration],
    ["For", project.client],
  ];

  return (
    <article>
      {/* Split hero */}
      <header className="grid lg:min-h-[100svh] lg:grid-cols-2">
        <div className="grain relative flex flex-col justify-end overflow-hidden bg-butter px-5 pb-14 pt-32 sm:px-10 lg:px-14 lg:pb-20">
          <Blob className="animate-float-slow absolute -left-24 -top-24 h-96 w-96 text-cobalt/20" />
          <Link href={`${site.base}/projects`} className="group relative mb-10 inline-flex min-h-11 items-center gap-2 self-start rounded-full bg-cream px-4 font-sans text-sm font-bold text-ink hover:bg-ink hover:text-cream">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden /> All work
          </Link>
          <Reveal y={10} className="relative">
            <Chip className="text-cobalt-deep">{project.category}</Chip>
          </Reveal>
          <h1 className="relative mt-6 break-words font-display text-[clamp(2.6rem,5.4vw,5.25rem)] font-extrabold leading-[0.9] tracking-[-0.05em] text-ink">
            <SplitText text={project.title} immediate delay={0.3} />
          </h1>
          <Reveal delay={0.5} className="relative">
            <p className="mt-6 max-w-lg font-serif text-2xl font-light italic leading-snug text-mute">{project.summary}</p>
          </Reveal>
        </div>
        <ImageReveal className="relative min-h-[60vh] bg-cobalt lg:min-h-0" immediate direction="left" delay={0.15}>
          <Image src={project.hero} alt={project.heroAlt} fill preload sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover" />
        </ImageReveal>
      </header>

      {/* Facts */}
      <section className="bg-navy py-8 text-cream">
        <Stagger as="ul" className={`${container} flex flex-wrap gap-3`} stagger={0.06}>
          {facts.map(([k, v]) => (
            <StaggerItem as="li" key={k} className="rounded-full border-2 border-cream/20 px-5 py-2.5 font-sans text-sm">
              <span className="mr-2 font-bold text-butter">{k}</span>
              {v}
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Story */}
      <section className={`${container} py-24 sm:py-32`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Heading eyebrow="The story" title="What they asked for" accent={["asked"]} />
            <Reveal delay={0.2}>
              <ul className="mt-8 flex flex-wrap gap-2">
                {project.services.map((s) => <li key={s} className="rounded-full bg-paper px-4 py-2 font-sans text-sm font-semibold">{s}</li>)}
              </ul>
            </Reveal>
          </div>
          <div className="space-y-6 font-sans text-lg leading-relaxed text-mute lg:col-span-7">
            {project.overview.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <p className={i === 0 ? "font-display text-2xl font-bold leading-snug tracking-[-0.02em] text-ink" : ""}>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
        <div className="mt-20 grid gap-5 md:grid-cols-2">
          <Reveal className="rounded-[2rem] bg-cobalt p-8 text-cream sm:p-10">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-butter">The big idea</p>
            <p className="mt-5 font-serif text-[1.65rem] font-light italic leading-snug">{project.concept}</p>
          </Reveal>
          <Reveal className="rounded-[2rem] bg-paper p-8 sm:p-10" delay={0.1}>
            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-cobalt">The tricky bit</p>
            <p className="mt-5 font-sans text-lg leading-relaxed text-mute">{project.challenge}</p>
          </Reveal>
        </div>
      </section>

      {/* Gallery */}
      <section className="overflow-hidden pb-24 pl-5 sm:pb-32 sm:pl-8 lg:pl-[max(2rem,calc((100vw-1400px)/2+2rem))]" aria-label="Project photos">
        <GalleryStrip images={[{ src: `${project.hero}?crop=entropy`, alt: project.heroAlt }, ...project.gallery]} />
      </section>

      {project.beforeAfter && (
        <section className={`${container} pb-24 sm:pb-32`}>
          <Heading eyebrow="Glow-up" title="Before & after" accent={["after"]} intro="Slide to compare — the same room, before and after we moved in with the paint." />
          <Reveal className="mt-12">
            <BeforeAfter
              {...project.beforeAfter}
              className="aspect-[4/3] rounded-[2rem] sm:aspect-[16/9]"
              labelClassName="rounded-full bg-cream px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.1em] text-ink"
              handleClassName="h-14 w-14 rounded-full bg-cobalt text-cream shadow-xl"
              lineClassName="bg-cream w-1"
            />
          </Reveal>
        </section>
      )}

      {/* Materials */}
      <section className="bg-paper py-24 sm:py-32">
        <div className={container}>
          <Heading eyebrow="Materials" title="The palette" accent={["palette"]} />
          <Stagger as="ul" className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
            {project.materials.map((m, i) => (
              <StaggerItem as="li" key={m.name} className="group text-center">
                <span aria-hidden className={`mx-auto block aspect-square w-full max-w-[11rem] shadow-[inset_0_-12px_30px_rgba(0,0,0,0.12)] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-6 ${["rounded-full", "rounded-t-full", "rounded-[2rem]", "rounded-full", "rounded-b-full"][i % 5]}`} style={{ background: m.swatch }} />
                <p className="mt-4 font-display text-base font-bold leading-tight">{m.name}</p>
                <p className="mt-1 font-sans text-sm text-mute">{m.note}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Related */}
      <section className={`${container} py-24 sm:py-32`}>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <Heading eyebrow="Keep looking" title="More rooms like this" accent={["like", "this"]} />
          <Button href={`${site.base}/projects/${next.slug}`} variant="forest">Next: {next.title}</Button>
        </div>
        <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p, i) => (
            <ProjectCard key={p.slug} project={p} base={site.base} shape={i + 1} aspect="aspect-[4/5]" sizes="(min-width: 1024px) 30vw, 50vw" />
          ))}
        </div>
      </section>

      <CtaBlock />
    </article>
  );
}
