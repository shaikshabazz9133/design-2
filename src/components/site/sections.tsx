import { Reveal, SplitText } from "@/components/motion/primitives";
import { Blob, Button, container } from "./ui";

/** Scrolling band of words. Pauses on hover; stops for reduced motion (global CSS). */
export function Marquee({ words, tone = "forest" }: { words: string[]; tone?: "forest" | "terracotta" | "peach" }) {
  const styles = {
    forest: "bg-navy text-cream",
    terracotta: "bg-cobalt text-cream",
    peach: "bg-butter text-ink",
  }[tone];
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-8 pr-8">
      {words.map((w, i) => (
        <li key={i} className="flex items-center gap-8 whitespace-nowrap">
          <span className={i % 2 ? "font-serif font-light italic" : ""}>{w}</span>
          <span aria-hidden className="inline-block h-3 w-3 rounded-full bg-current opacity-60" />
        </li>
      ))}
    </ul>
  );
  return (
    <div className={`group overflow-hidden py-5 sm:py-7 ${styles}`}>
      <div className="flex w-max animate-marquee font-display text-[clamp(1.6rem,3.5vw,2.8rem)] font-bold tracking-[-0.03em] group-hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}

export function CtaBlock({ title = "Got a room that needs a story?", accent = ["story?"] }: { title?: string; accent?: string[] }) {
  return (
    <section className={`${container} py-20 sm:py-28`}>
      <div className="grain relative overflow-hidden rounded-[2.5rem] bg-navy px-6 py-20 text-cream sm:px-14 sm:py-28">
        <div aria-hidden className="azulejo-light absolute inset-0" />
        <Blob className="animate-float-slow absolute -right-20 -top-24 h-80 w-80 text-cobalt sm:h-[28rem] sm:w-[28rem]" />
        <Blob className="animate-float absolute -bottom-24 left-1/3 h-56 w-56 text-butter/80" path={2} />
        <div className="relative max-w-3xl">
          <h2 className="font-display text-[clamp(2.5rem,7vw,6rem)] font-extrabold leading-[0.9] tracking-[-0.05em]">
            <SplitText text={title} accentWords={accent} accentClassName="font-serif font-light italic text-butter" />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-7 max-w-lg font-sans text-lg text-cream/80">
              Tell us about your space over coffee (ours or yours). We reply to every message within two working days.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="cream">Start a project</Button>
              <Button href="/services#consultation" variant="terracotta">Book a 2-hour consult</Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
