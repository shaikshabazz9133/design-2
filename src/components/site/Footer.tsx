import Link from "next/link";
import { site } from "@/lib/content/site";
import { LetterReveal } from "@/components/motion/extras";
import { Reveal } from "@/components/motion/primitives";
import { Button, container } from "./ui";

const { brand, base } = site;

const cols = [
  {
    title: "Explore",
    links: [
      { href: `${base}/projects`, label: "Our work" },
      { href: `${base}/services`, label: "Services" },
      { href: `${base}/process`, label: "How we work" },
      { href: `${base}/journal`, label: "Journal" },
    ],
  },
  {
    title: "Studio",
    links: [
      { href: `${base}/about`, label: "About us" },
      { href: `${base}/testimonials`, label: "Kind words" },
      { href: `${base}/contact`, label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-cobalt text-cream">
      <div aria-hidden className="azulejo-light absolute inset-0" />
      <div className={`${container} relative pt-20 sm:pt-28`}>
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="font-display text-[clamp(2.25rem,5vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.04em]">
                Let&apos;s make something <span className="font-serif font-light italic text-butter">colourful.</span>
              </p>
            </Reveal>
            <Reveal delay={0.1} className="mt-8">
              <Button href={`${base}/contact`} variant="cream">Start a project</Button>
            </Reveal>
          </div>
          {cols.map((c) => (
            <nav key={c.title} aria-label={c.title} className="lg:col-span-2">
              <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-butter">{c.title}</p>
              <ul className="mt-5 space-y-2.5">
                {c.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="font-sans text-[15px] font-medium transition-colors hover:text-butter">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
          <div className="lg:col-span-2">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.16em] text-butter">Say olá</p>
            <address className="mt-5 space-y-2.5 font-sans text-[15px] not-italic">
              {brand.address.map((l) => <span key={l} className="block text-cream/85">{l}</span>)}
              <a href={`mailto:${brand.email}`} className="block break-all font-semibold hover:text-butter">{brand.email}</a>
              <a href={`tel:${brand.phoneHref}`} className="block hover:text-butter">{brand.phone}</a>
            </address>
          </div>
        </div>

        <p aria-hidden className="mt-20 select-none whitespace-nowrap font-display text-[clamp(2.75rem,12vw,11.5rem)] font-extrabold leading-[0.8] tracking-[-0.06em] text-cobalt-deep">
          <LetterReveal text="Casa " />
          <LetterReveal text="Cobalto" className="font-serif font-normal italic tracking-[-0.02em]" />
        </p>

        <div className="flex flex-col gap-4 border-t border-cream/20 py-7 font-sans text-sm text-cream/75 sm:flex-row sm:items-center sm:justify-between">
          <p>© {brand.founded}–2026 Casa Cobalto · Lisboa. Demonstration concept.</p>
          <ul className="flex gap-5">
            {brand.socials.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-cream">{s.label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
