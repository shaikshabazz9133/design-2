"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { ProcessStep } from "@/lib/types";

const colours = ["bg-cobalt text-cream", "bg-butter text-ink", "bg-navy text-cream", "bg-paper text-ink", "bg-tomato text-cream", "bg-navy-soft text-cream"];
const tilts = ["-rotate-2", "rotate-1", "-rotate-1", "rotate-2", "-rotate-1", "rotate-1"];

function Card({ step, i }: { step: ProcessStep; i: number }) {
  return (
    <article className={`flex h-full flex-col rounded-[2rem] p-7 sm:p-9 ${colours[i % colours.length]}`}>
      <span className="font-serif text-7xl font-light italic leading-none opacity-80">{String(i + 1).padStart(2, "0")}</span>
      <p className="mt-6 font-sans text-xs font-bold uppercase tracking-[0.16em] opacity-70">{step.duration}</p>
      <h3 className="mt-2 font-display text-3xl font-bold tracking-[-0.03em]">{step.title}</h3>
      <p className="mt-4 font-sans text-[15px] leading-relaxed opacity-85">{step.description}</p>
      <ul className="mt-auto flex flex-wrap gap-2 pt-8">
        {step.deliverables.map((d) => (
          <li key={d} className="rounded-full border border-current/30 px-3 py-1 font-sans text-xs font-semibold">{d}</li>
        ))}
      </ul>
    </article>
  );
}

/**
 * Desktop: the section pins and the cards travel sideways as you scroll down.
 * Mobile, tablet and reduced motion: a plain vertical stack.
 */
export function HorizontalProcess({ steps, heading }: { steps: ProcessStep[]; heading: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const [distance, setDistance] = useState(0);
  const [wide, setWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const pinned = wide && !reduce;

  // Measure only once the horizontal track exists (it isn't rendered on small screens).
  useEffect(() => {
    if (!pinned) return;
    const measure = () => {
      const track = trackRef.current;
      if (track) setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 64));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned]);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);

  if (!pinned) {
    return (
      <div ref={ref} className="py-24 sm:py-32">
        <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8">{heading}</div>
        <ol className="mx-auto mt-14 grid w-full max-w-[1400px] gap-5 px-5 sm:grid-cols-2 sm:px-8">
          {steps.map((s, i) => (
            <motion.li
              key={s.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7 }}
            >
              <Card step={s} i={i} />
            </motion.li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div ref={ref} style={{ height: `calc(100vh + ${distance}px)` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="mx-auto w-full max-w-[1400px] px-8">{heading}</div>
        <motion.ol ref={trackRef} style={{ x }} className="mt-12 flex gap-6 pl-[max(2rem,calc((100vw-1400px)/2+2rem))] pr-8">
          {steps.map((s, i) => (
            <li key={s.title} className={`h-[25rem] w-[24rem] shrink-0 transition-transform duration-500 hover:rotate-0 ${tilts[i % tilts.length]}`}>
              <Card step={s} i={i} />
            </li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}
