"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { EASE_OUT } from "@/components/motion/primitives";
import type { Project } from "@/lib/types";
import { ProjectCard } from "./cards";

const aspects = ["aspect-[4/5]", "aspect-square", "aspect-[3/4]", "aspect-[5/4]", "aspect-[4/5]", "aspect-[1/1]"];

/** Pill filters with a springy active background and a masonry-style grid. */
export function ProjectsExplorer({ projects, categories, base }: { projects: Project[]; categories: string[]; base: string }) {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <>
      <div role="group" aria-label="Filter projects" className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {["All", ...categories].map((c) => {
          const active = c === filter;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c)}
              className={`relative min-h-12 shrink-0 rounded-full border-2 px-5 font-sans text-sm font-bold transition-colors duration-300 ${
                active ? "border-navy text-cream" : "border-ink/15 text-ink hover:border-cobalt hover:text-cobalt"
              }`}
            >
              {active && <motion.span layoutId="filter-pill" className="absolute inset-0 -z-0 rounded-full bg-navy" transition={{ type: "spring", stiffness: 400, damping: 32 }} />}
              <span className="relative">{c}</span>
            </button>
          );
        })}
      </div>
      <p className="mt-5 font-sans text-sm text-mute" aria-live="polite">
        {shown.length} {shown.length === 1 ? "project" : "projects"}
        {filter !== "All" && <> in <span className="font-serif italic text-cobalt">{filter}</span></>}
      </p>

      {shown.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-3xl font-bold">Nothing here yet.</p>
          <button type="button" onClick={() => setFilter("All")} className="mt-6 min-h-12 rounded-full bg-cobalt px-6 font-bold text-cream">Show everything</button>
        </div>
      ) : (
        <motion.ul layout className="mt-12 columns-1 gap-8 sm:columns-2 lg:columns-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.li
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.55, delay: i * 0.06, ease: EASE_OUT }}
                className="mb-12 break-inside-avoid"
              >
                <ProjectCard
                  project={p}
                  base={base}
                  shape={projects.indexOf(p)}
                  aspect={aspects[projects.indexOf(p) % aspects.length]}
                  eager={i < 2}
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </>
  );
}
