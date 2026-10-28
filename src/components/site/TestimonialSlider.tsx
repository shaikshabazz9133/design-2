"use client";

import { animate, motion, useMotionValue } from "motion/react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Testimonial } from "@/lib/types";
import { Stars } from "./ui";

const cardColours = ["bg-butter text-ink", "bg-paper text-ink", "bg-cobalt text-cream", "bg-navy-soft text-cream"];

/** Draggable card rail (mouse or touch) with buttons for keyboard users. */
export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const x = useMotionValue(0);
  const [bounds, setBounds] = useState({ left: 0, right: 0 });
  const [step, setStep] = useState(360);

  useEffect(() => {
    const measure = () => {
      const v = viewport.current;
      const t = track.current;
      if (!v || !t) return;
      setBounds({ left: Math.min(0, v.clientWidth - t.scrollWidth), right: 0 });
      const first = t.firstElementChild as HTMLElement | null;
      if (first) setStep(first.offsetWidth + 20);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const go = (dir: 1 | -1) => {
    const target = Math.max(bounds.left, Math.min(0, x.get() - dir * step));
    animate(x, target, { type: "spring", stiffness: 260, damping: 32 });
  };

  return (
    <div>
      <div className="mb-10 flex justify-end gap-3">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonials" className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream text-cream transition-colors hover:bg-cream hover:text-navy">
          <ArrowLeft size={18} strokeWidth={2.2} />
        </button>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonials" className="grid h-12 w-12 place-items-center rounded-full border-2 border-cream text-cream transition-colors hover:bg-cream hover:text-navy">
          <ArrowRight size={18} strokeWidth={2.2} />
        </button>
      </div>
      <div ref={viewport} className="cursor-grab overflow-hidden active:cursor-grabbing">
        <motion.ul ref={track} drag="x" dragConstraints={bounds} dragElastic={0.12} style={{ x }} className="flex w-max gap-5 pb-4" aria-label="Testimonials">
          {items.map((t, i) => (
            <li key={t.name} className={`flex w-[82vw] max-w-[24rem] shrink-0 select-none flex-col rounded-[2rem] p-8 ${cardColours[i % cardColours.length]} ${i % 2 ? "sm:mt-10" : ""}`}>
              <Stars count={t.rating} />
              <blockquote className="mt-6 font-serif text-[1.45rem] font-light leading-snug">“{t.quote}”</blockquote>
              <div className="mt-auto pt-8">
                <p className="font-display text-lg font-bold">{t.name}</p>
                <p className="font-sans text-sm opacity-75">{t.role} · {t.project}</p>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
      <p className="mt-4 font-sans text-sm text-cream/60" aria-hidden>Drag to explore →</p>
    </div>
  );
}
