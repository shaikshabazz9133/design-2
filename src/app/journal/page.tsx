import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JournalExplorer } from "@/components/site/JournalExplorer";
import { CtaBlock } from "@/components/site/sections";
import { Chip, container, PageHero } from "@/components/site/ui";
import { Reveal } from "@/components/motion/primitives";
import { site } from "@/lib/content/site";
import { formatDate, postCategories } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Journal",
  description: "Colour drenching, terracotta, vintage sourcing and more — ideas and how-tos from the Casa Cobalto studio.",
};

export default function JournalPage() {
  const featured = site.posts.find((p) => p.featured) ?? site.posts[0];
  const rest = site.posts.filter((p) => p !== featured);

  return (
    <>
      <PageHero eyebrow="Journal" title="Ideas, how-tos & strong opinions" accent={["strong", "opinions"]} intro="What we've learned from twelve years of painting, sourcing and making rooms people love." tone="forest" />

      <section className={`${container} py-16 sm:py-24`} aria-label="Featured article">
        <Reveal>
          <Link href={`${site.base}/journal/${featured.slug}`} className="group grid overflow-hidden rounded-[2.5rem] bg-butter lg:grid-cols-2">
            <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:min-h-[30rem]">
              <Image src={featured.image} alt={featured.imageAlt} fill loading="eager" sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition-transform duration-[1.2s] ease-luxe group-hover:scale-105" />
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-12 lg:p-16">
              <Chip className="self-start text-cobalt-deep">Featured · {featured.category}</Chip>
              <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.4rem)] font-extrabold leading-[0.98] tracking-[-0.04em]">{featured.title}</h2>
              <p className="mt-5 font-sans text-lg leading-relaxed text-mute">{featured.excerpt}</p>
              <p className="mt-8 font-sans text-sm font-semibold">
                {featured.author} · <time dateTime={featured.date}>{formatDate(featured.date)}</time> · {featured.readTime}
              </p>
              <span className="mt-6 inline-flex items-center gap-2 self-start rounded-full bg-ink px-5 py-3 font-sans text-sm font-bold text-cream transition-colors group-hover:bg-cobalt">Read the article →</span>
            </div>
          </Link>
        </Reveal>
      </section>

      <section className={`${container} pb-24 sm:pb-32`} aria-label="All articles">
        <JournalExplorer posts={rest} categories={postCategories(rest)} base={site.base} />
      </section>

      <CtaBlock />
    </>
  );
}
