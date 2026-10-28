import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/content/helpers";
import type { Post, Project, Service } from "@/lib/types";
import { Counter } from "@/components/motion/primitives";
import { blobRadius } from "./ui";

const shapes = ["rounded-[2rem]", "rounded-t-full rounded-b-[2rem]", blobRadius, "rounded-[2rem] rounded-tr-[8rem]"];

type ProjectCardProps = {
  project: Project;
  base: string;
  shape?: number;
  aspect?: string;
  tilt?: string;
  sizes?: string;
  eager?: boolean;
};

/** Artistic project card: shaped mask, slight tilt that straightens and lifts on hover. */
export function ProjectCard({ project, base, shape = 0, aspect = "aspect-[4/5]", tilt = "", sizes = "(min-width: 1024px) 40vw, 100vw", eager }: ProjectCardProps) {
  return (
    <Link href={`${base}/projects/${project.slug}`} className={`group block transition-transform duration-700 ease-luxe hover:-translate-y-2 hover:rotate-0 ${tilt}`}>
      <div className={`relative ${aspect} overflow-hidden bg-butter ${shapes[shape % shapes.length]}`}>
        <Image src={project.hero} alt={project.heroAlt} fill sizes={sizes} loading={eager ? "eager" : undefined} className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-110" />
        <span aria-hidden className="absolute bottom-4 right-4 grid h-14 w-14 translate-y-4 place-items-center rounded-full bg-cobalt text-cream opacity-0 transition-all duration-500 ease-luxe group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100">
          <ArrowUpRight size={22} strokeWidth={2.2} />
        </span>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink transition-colors group-hover:text-cobalt">{project.title}</h3>
        <span className="shrink-0 font-serif text-lg italic text-mute">{project.year}</span>
      </div>
      <p className="mt-1 flex flex-wrap items-center gap-2 font-sans text-sm text-mute">
        <span className="rounded-full bg-butter px-2.5 py-0.5 text-xs font-bold uppercase tracking-[0.08em] text-cobalt-deep">{project.category}</span>
        {project.location}
      </p>
    </Link>
  );
}

const serviceTones = [
  "bg-cobalt text-cream",
  "bg-navy text-cream",
  "bg-butter text-ink",
  "bg-tomato text-cream",
  "bg-paper text-ink",
  "bg-navy-soft text-cream",
  "bg-cobalt-deep text-cream",
];

/** Colour block that reveals its photo through an expanding circle on hover/focus. */
export function ServiceCard({ service, index, base, className, showImage }: { service: Service; index: number; base: string; className?: string; showImage?: boolean }) {
  const open = "[clip-path:circle(150%_at_100%_0%)]";
  return (
    <Link
      href={`${base}/services#${service.slug}`}
      className={`group relative isolate flex min-h-[19rem] flex-col overflow-hidden rounded-[2rem] p-7 sm:p-8 ${serviceTones[index % serviceTones.length]} ${className ?? ""}`}
    >
      <div className={`absolute inset-0 -z-10 transition-[clip-path] duration-[900ms] ease-luxe ${showImage ? open : "[clip-path:circle(0%_at_100%_0%)] group-hover:[clip-path:circle(150%_at_100%_0%)] group-focus-visible:[clip-path:circle(150%_at_100%_0%)]"}`}>
        <Image src={service.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
        <div className="absolute inset-0 bg-ink/55" />
      </div>
      <div className="flex items-start justify-between">
        <span className={`font-serif text-5xl font-light italic transition-colors duration-500 group-hover:text-cream ${showImage ? "text-cream" : ""}`}>{String(index + 1).padStart(2, "0")}</span>
        <span aria-hidden className="grid h-11 w-11 place-items-center rounded-full border-2 border-current transition-all duration-500 group-hover:rotate-45 group-hover:border-cream group-hover:bg-cream group-hover:text-ink">
          <ArrowUpRight size={18} strokeWidth={2.2} />
        </span>
      </div>
      <div className={`mt-auto pt-10 transition-colors duration-500 group-hover:text-cream ${showImage ? "text-cream" : ""}`}>
        <h3 className="font-display text-[1.7rem] font-bold leading-tight tracking-[-0.03em]">{service.title}</h3>
        <p className="mt-2 max-w-xs font-sans text-[15px] leading-relaxed opacity-85">{service.short}</p>
      </div>
    </Link>
  );
}

export function PostCard({ post, base, eager }: { post: Post; base: string; eager?: boolean }) {
  return (
    <Link href={`${base}/journal/${post.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-butter">
        <Image src={post.image} alt={post.imageAlt} fill loading={eager ? "eager" : undefined} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-110 group-hover:rotate-1" />
        <span className="absolute left-4 top-4 rounded-full bg-cream px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.1em] text-cobalt">{post.category}</span>
      </div>
      <p className="mt-5 font-sans text-sm text-mute">
        <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
      </p>
      <h3 className="mt-2 font-display text-[1.6rem] font-bold leading-[1.1] tracking-[-0.03em] text-ink">
        <span className="bg-[linear-gradient(var(--color-butter),var(--color-butter))] bg-[length:0%_40%] bg-[position:0_88%] bg-no-repeat transition-[background-size] duration-500 ease-luxe group-hover:bg-[length:100%_40%]">
          {post.title}
        </span>
      </h3>
      <p className="mt-3 font-sans text-[15px] leading-relaxed text-mute">{post.excerpt}</p>
    </Link>
  );
}

const statTones = ["bg-cobalt text-cream", "bg-navy text-cream", "bg-butter text-ink", "bg-tomato text-cream"];
const statShapes = [blobRadius, "rounded-full", "rounded-t-full rounded-b-[2rem]", "rounded-[2rem]"];

export function StatBlobs({ stats }: { stats: { value: number; suffix?: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
      {stats.map((s, i) => (
        <div key={s.label} className={`flex aspect-square flex-col items-center justify-center p-6 text-center transition-transform duration-500 hover:scale-[1.03] ${statTones[i % 4]} ${statShapes[i % 4]}`}>
          <dt className="order-last mt-2 font-sans text-sm font-semibold opacity-85">{s.label}</dt>
          <dd className="font-display text-[clamp(1.6rem,4.2vw,3.4rem)] font-extrabold leading-none tracking-[-0.05em]">
            <Counter value={s.value} suffix={s.suffix} />
          </dd>
        </div>
      ))}
    </dl>
  );
}
