import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";
import { Reveal, SplitText } from "@/components/motion/primitives";

export const container = "mx-auto w-full max-w-[1400px] px-5 sm:px-8";

/** Organic border-radius used for blob-shaped image masks. */
export const blobRadius = "rounded-[58%_42%_47%_53%/45%_55%_45%_55%]";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "terracotta" | "forest" | "cream" | "outline";
  className?: string;
};

const styles = {
  terracotta: "bg-cobalt text-cream hover:bg-navy",
  forest: "bg-navy text-cream hover:bg-cobalt",
  cream: "bg-cream text-ink hover:bg-butter",
  outline: "border-2 border-ink text-ink hover:bg-ink hover:text-cream",
};

const dot = {
  terracotta: "bg-cream text-cobalt",
  forest: "bg-cream text-navy",
  cream: "bg-ink text-cream",
  outline: "bg-ink text-cream group-hover:bg-cream group-hover:text-ink",
};

/** Pill button with an arrow disc that spins a quarter-turn on hover. */
export function Button({ href, children, variant = "terracotta", className }: ButtonProps) {
  return (
    <Link
      href={href}
      className={`group inline-flex min-h-12 items-center justify-between gap-4 rounded-full py-1.5 pl-6 pr-1.5 font-sans text-[15px] font-semibold transition-colors duration-300 ${styles[variant]} ${className ?? ""}`}
    >
      {children}
      <span aria-hidden className={`grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 ease-luxe group-hover:rotate-45 ${dot[variant]}`}>
        <ArrowUpRight size={17} strokeWidth={2.2} />
      </span>
    </Link>
  );
}

export function Chip({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 rounded-full border-2 border-current px-3.5 py-1 font-sans text-xs font-bold uppercase tracking-[0.12em] ${className ?? ""}`}>
      {children}
    </span>
  );
}

type HeadingProps = {
  eyebrow?: string;
  title: string;
  accent?: string[];
  intro?: string;
  light?: boolean;
  as?: "h1" | "h2";
  className?: string;
  size?: "md" | "lg";
};

/** Chunky Syne headline with accent words switched to Fraunces italic. */
export function Heading({ eyebrow, title, accent, intro, light, as: Tag = "h2", className, size = "md" }: HeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <Reveal y={10}>
          <Chip className={light ? "text-butter" : "text-cobalt"}>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
            {eyebrow}
          </Chip>
        </Reveal>
      )}
      <Tag
        className={`mt-6 font-display font-bold leading-[0.95] tracking-[-0.03em] ${
          size === "lg" ? "text-[clamp(2.75rem,7.5vw,6.75rem)]" : "text-[clamp(2.25rem,5.2vw,4.5rem)]"
        } ${light ? "text-cream" : "text-ink"}`}
      >
        <SplitText
          text={title}
          accentWords={accent}
          accentClassName={`font-serif font-light italic tracking-[-0.02em] ${light ? "text-butter" : "text-cobalt"}`}
          stagger={0.05}
        />
      </Tag>
      {intro && (
        <Reveal delay={0.15}>
          <p className={`mt-6 max-w-xl font-sans text-lg leading-relaxed ${light ? "text-cream/80" : "text-mute"}`}>{intro}</p>
        </Reveal>
      )}
    </div>
  );
}

export function Blob({ className, path = 0 }: { className?: string; path?: 0 | 1 | 2 }) {
  const paths = [
    "M44.7,-62.3C57.4,-52.9,67,-39.6,72.1,-24.6C77.2,-9.6,77.8,7.2,72.1,21.6C66.4,36,54.4,48,40.6,57.4C26.8,66.8,11.2,73.6,-4.6,79.9C-20.4,86.2,-40.8,92,-54.7,84.4C-68.6,76.8,-76,55.9,-79.7,35.7C-83.4,15.5,-83.4,-4,-77.1,-20.6C-70.8,-37.2,-58.2,-50.9,-43.8,-60C-29.4,-69.1,-14.7,-73.6,0.6,-74.4C15.9,-75.2,31.9,-71.6,44.7,-62.3Z",
    "M39.5,-51.9C52.6,-45.6,65.6,-35.5,71.5,-21.8C77.4,-8.1,76.2,9.2,69.4,23.4C62.6,37.6,50.3,48.7,36.5,57.6C22.7,66.5,7.4,73.2,-9.2,75.4C-25.8,77.6,-43.7,75.3,-55.4,65.4C-67.1,55.5,-72.6,38,-74.8,21.1C-77,4.2,-75.9,-12.1,-69.2,-25.6C-62.5,-39.1,-50.2,-49.8,-36.9,-56C-23.6,-62.2,-9.4,-63.9,2.7,-67.6C14.8,-71.3,26.4,-58.2,39.5,-51.9Z",
    "M54.1,-58.2C68.4,-45.7,77.3,-25.4,77.8,-5.4C78.3,14.6,70.4,34.3,56.6,48.7C42.8,63.1,23.1,72.2,1.9,70.2C-19.3,68.2,-42,55.1,-56.1,39.1C-70.2,23.1,-75.7,4.2,-71.9,-12.2C-68.1,-28.6,-55,-42.5,-40.3,-55C-25.6,-67.5,-9.3,-78.6,6.6,-81.9C22.5,-85.2,39.8,-70.7,54.1,-58.2Z",
  ];
  return (
    <svg aria-hidden viewBox="-100 -100 200 200" className={className}>
      <path d={paths[path]} fill="currentColor" />
    </svg>
  );
}

const tones = {
  peach: { bg: "bg-butter", text: "text-ink", blob: "text-cobalt/25", chip: "text-cobalt-deep", intro: "text-mute", accent: "text-cobalt-deep" },
  forest: { bg: "bg-navy", text: "text-cream", blob: "text-navy-soft", chip: "text-butter", intro: "text-cream/80", accent: "text-butter" },
  terracotta: { bg: "bg-cobalt", text: "text-cream", blob: "text-cobalt-deep", chip: "text-cream", intro: "text-cream/85", accent: "text-butter" },
  cream: { bg: "bg-cream", text: "text-ink", blob: "text-butter/60", chip: "text-cobalt", intro: "text-mute", accent: "text-cobalt" },
};

/** Coloured inner-page header with a drifting blob and an oversized headline. */
export function PageHero({
  eyebrow,
  title,
  accent,
  intro,
  tone = "peach",
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string[];
  intro: string;
  tone?: keyof typeof tones;
  children?: ReactNode;
}) {
  const t = tones[tone];
  return (
    <header className={`grain relative overflow-hidden ${t.bg} ${t.text}`}>
      <Blob className={`animate-float-slow absolute -right-24 -top-28 h-[26rem] w-[26rem] sm:h-[38rem] sm:w-[38rem] ${t.blob}`} path={1} />
      <div className={`${container} relative pb-16 pt-36 sm:pb-24 sm:pt-44`}>
        <Reveal y={10}>
          <Chip className={t.chip}>
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
            {eyebrow}
          </Chip>
        </Reveal>
        <h1 className="mt-7 max-w-5xl font-display text-[clamp(2.8rem,9vw,8rem)] font-extrabold leading-[0.9] tracking-[-0.04em]">
          <SplitText text={title} immediate delay={0.25} stagger={0.07} accentWords={accent} accentClassName={`font-serif font-light italic tracking-[-0.02em] ${t.accent}`} />
        </h1>
        <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.5}>
            <p className={`max-w-xl font-sans text-lg leading-relaxed sm:text-xl ${t.intro}`}>{intro}</p>
          </Reveal>
          {children}
        </div>
      </div>
      {/* Tiled "skirting" — a nod to the azulejo-clad façades of Lisbon. */}
      <div aria-hidden className="azulejo relative h-14 border-y-4 border-cobalt sm:h-16" />
    </header>
  );
}

export function Stars({ count, className }: { count: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className ?? ""}`} role="img" aria-label={`${count} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} aria-hidden width="14" height="14" viewBox="0 0 24 24" fill={i < count ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2.5l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.4l-5.9 3.2 1.3-6.6L2.5 9.4l6.6-.8z" />
        </svg>
      ))}
    </span>
  );
}
