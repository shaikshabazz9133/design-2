"use client";

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";

function Word({ word, range, progress, accent }: { word: string; range: [number, number]; progress: MotionValue<number>; accent: boolean }) {
  const reduce = useReducedMotion();
  const opacity = useTransform(progress, range, reduce ? [1, 1] : [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "font-serif font-light italic text-cobalt" : undefined}>
      {word}{" "}
    </motion.span>
  );
}

/** A statement whose words light up one by one as it scrolls through the viewport. */
export function ScrollHighlight({ text, accent = [] }: { text: string; accent?: string[] }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 45%"] });
  const words = text.split(" ");
  const accents = accent.map((a) => a.toLowerCase());

  return (
    <p ref={ref} className="font-display text-[clamp(1.9rem,4.6vw,4.1rem)] font-bold leading-[1.08] tracking-[-0.035em] text-ink">
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {words.map((w, i) => (
          <Word
            key={i}
            word={w}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
            accent={accents.includes(w.replace(/[^\p{L}]/gu, "").toLowerCase())}
          />
        ))}
      </span>
    </p>
  );
}
