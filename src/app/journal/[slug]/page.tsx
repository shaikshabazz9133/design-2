import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft } from "lucide-react";
import { PostCard } from "@/components/site/cards";
import { CtaBlock } from "@/components/site/sections";
import { Blob, Chip, container, Heading } from "@/components/site/ui";
import { ImageReveal, Reveal, SplitText } from "@/components/motion/primitives";
import { ShareButton } from "@/components/ui/ShareButton";
import { site } from "@/lib/content/site";
import { findPost, formatDate, relatedPosts } from "@/lib/content/helpers";

export function generateStaticParams() {
  return site.posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(site, slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt, openGraph: { type: "article", publishedTime: post.date, authors: [post.author] } };
}

function Skeleton() {
  return (
    <div role="status" aria-label="Loading article" className="animate-pulse bg-butter px-5 pb-20 pt-40">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="h-8 w-32 rounded-full bg-cream/60" />
        <div className="h-28 rounded-3xl bg-cream/60" />
      </div>
    </div>
  );
}

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <Suspense fallback={<Skeleton />}>
      <ArticleContent params={params} />
    </Suspense>
  );
}

async function ArticleContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = findPost(site, slug);
  if (!post) notFound();
  const related = relatedPosts(site, post);

  return (
    <article>
      <header className="grain relative overflow-hidden bg-butter pb-40 pt-32 sm:pb-52 sm:pt-40">
        <Blob className="animate-float-slow absolute -right-24 top-10 h-96 w-96 text-cobalt/25" path={2} />
        <div className={`${container} relative`}>
          <Link href={`${site.base}/journal`} className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-cream px-4 font-sans text-sm font-bold hover:bg-ink hover:text-cream">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" aria-hidden /> Journal
          </Link>
          <div className="mx-auto mt-10 max-w-4xl">
            <Chip className="text-cobalt-deep">{post.category}</Chip>
            <h1 className="mt-6 font-display text-[clamp(2.4rem,6.4vw,5.5rem)] font-extrabold leading-[0.95] tracking-[-0.045em] text-ink">
              <SplitText text={post.title} immediate delay={0.3} stagger={0.04} />
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-6 font-sans text-base font-semibold text-mute">
                By {post.author} · <time dateTime={post.date}>{formatDate(post.date)}</time> · {post.readTime}
              </p>
            </Reveal>
          </div>
        </div>
      </header>

      <div className={`${container} -mt-28 sm:-mt-40`}>
        <ImageReveal className="relative mx-auto aspect-[16/10] max-w-5xl overflow-hidden rounded-[2.5rem] bg-cobalt shadow-[0_40px_80px_-40px_rgba(35,26,21,0.5)]" immediate delay={0.2}>
          <Image src={post.image} alt={post.imageAlt} fill preload sizes="(min-width: 1024px) 64rem, 100vw" className="object-cover" />
        </ImageReveal>
      </div>

      <div className={`${container} py-20 sm:py-24`}>
        <div className="mx-auto max-w-2xl font-sans">
          <Reveal>
            <p className="mb-10 font-serif text-[1.65rem] font-light italic leading-snug text-cobalt-deep">{post.excerpt}</p>
          </Reveal>
          {post.body.map((b, i) => {
            if (b.type === "p") return <Reveal key={i} y={14}><p className="mb-6 text-lg leading-[1.8] text-ink/85">{b.text}</p></Reveal>;
            if (b.type === "h2") return <Reveal key={i} y={14}><h2 className="mb-5 mt-14 font-display text-3xl font-bold tracking-[-0.03em]">{b.text}</h2></Reveal>;
            if (b.type === "quote")
              return (
                <Reveal key={i}>
                  <figure className="my-14 -rotate-1 rounded-[2rem] bg-cobalt p-8 text-cream sm:-mx-10 sm:p-12">
                    <blockquote className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-light italic leading-snug">“{b.text}”</blockquote>
                    {b.cite && <figcaption className="mt-5 font-sans text-sm font-bold text-butter">— {b.cite}</figcaption>}
                  </figure>
                </Reveal>
              );
            if (b.type === "list")
              return (
                <Reveal key={i} y={14}>
                  <ul className="mb-8 space-y-3">
                    {b.items.map((it, k) => (
                      <li key={it} className="flex gap-4 rounded-2xl bg-paper p-4 text-[17px] leading-relaxed">
                        <span aria-hidden className={`mt-2 h-3 w-3 shrink-0 rounded-full ${["bg-cobalt", "bg-navy", "bg-butter"][k % 3]}`} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              );
            return (
              <figure key={i} className="my-12">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem]">
                  <Image src={b.src} alt={b.alt} fill sizes="42rem" className="object-cover" />
                </div>
                {b.caption && <figcaption className="mt-3 text-sm text-mute">{b.caption}</figcaption>}
              </figure>
            );
          })}
          <div className="mt-14 flex flex-wrap items-center justify-between gap-5 rounded-full bg-paper py-2 pl-6 pr-2">
            <p className="text-sm text-mute">Written by <span className="font-bold text-ink">{post.author}</span></p>
            <ShareButton title={post.title} className="rounded-full bg-ink px-5 font-sans text-sm font-bold text-cream hover:bg-cobalt" />
          </div>
        </div>
      </div>

      <section className="bg-paper py-24 sm:py-32">
        <div className={container}>
          <Heading eyebrow="Keep reading" title="More from the journal" accent={["journal"]} />
          <div className="mt-14 grid gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            {related.map((p) => <PostCard key={p.slug} post={p} base={site.base} />)}
          </div>
        </div>
      </section>
      <CtaBlock />
    </article>
  );
}
