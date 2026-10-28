"use client";

import { AnimatePresence, motion } from "motion/react";
import { Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Post } from "@/lib/types";
import { PostCard } from "./cards";

export function JournalExplorer({ posts, categories, base }: { posts: Post[]; categories: string[]; base: string }) {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => (category === "All" || p.category === category) && (!q || `${p.title} ${p.excerpt} ${p.category}`.toLowerCase().includes(q)));
  }, [posts, category, query]);

  return (
    <>
      <div className="flex flex-col gap-5 rounded-[2rem] bg-paper p-4 sm:p-5 lg:flex-row lg:items-center lg:justify-between">
        <div role="group" aria-label="Filter by topic" className="flex flex-wrap gap-2">
          {["All", ...categories].map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={c === category}
              onClick={() => setCategory(c)}
              className={`min-h-11 rounded-full px-4 font-sans text-sm font-bold transition-colors ${c === category ? "bg-cobalt text-cream" : "bg-cream text-ink hover:bg-butter"}`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="relative lg:w-80">
          <label htmlFor="search" className="sr-only">Search the journal</label>
          <Search size={18} aria-hidden className="absolute left-4 top-1/2 -translate-y-1/2 text-mute" />
          <input
            id="search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search colour, kitchens…"
            className="h-12 w-full rounded-full border-2 border-transparent bg-cream pl-11 pr-11 font-sans text-[15px] text-ink placeholder:text-mute/60 focus:border-cobalt focus:outline-none"
          />
          {query && (
            <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full hover:bg-butter">
              <X size={16} aria-hidden />
            </button>
          )}
        </div>
      </div>
      <p className="sr-only" aria-live="polite">{results.length} articles found</p>

      <AnimatePresence mode="wait">
        {results.length === 0 ? (
          <motion.div key="empty" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="py-24 text-center">
            <span aria-hidden className="mx-auto block h-16 w-16 rounded-full bg-butter" />
            <p className="mt-6 font-display text-3xl font-bold tracking-[-0.03em]">No stories match “{query || category}”.</p>
            <p className="mt-3 font-sans text-mute">Try another word — or see everything we&apos;ve written.</p>
            <button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="mt-7 min-h-12 rounded-full bg-navy px-6 font-sans font-bold text-cream hover:bg-cobalt">
              Show all articles
            </button>
          </motion.div>
        ) : (
          <motion.ul key={`${category}-${query}`} className="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <motion.li key={p.slug} initial={{ opacity: 0, y: 30, rotate: i % 2 ? 1.5 : -1.5 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 0.6, delay: i * 0.07, ease: EASE_OUT }}>
                <PostCard post={p} base={base} />
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </>
  );
}
