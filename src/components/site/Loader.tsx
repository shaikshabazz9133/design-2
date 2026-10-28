"use client";

import { motion } from "motion/react";
import { RouteLoader } from "@/components/motion/extras";
import { EASE_OUT } from "@/components/motion/primitives";

const draw = (delay: number) => ({
  initial: { pathLength: 0, opacity: 0 },
  animate: { pathLength: 1, opacity: 1 },
  transition: { duration: 0.9, delay, ease: EASE_OUT },
});

/** Cobalt panel: an azulejo tile draws itself, then three dots bounce in rhythm. */
export function Loader() {
  return (
    <RouteLoader className="grid place-items-center overflow-hidden bg-cobalt text-cream" enter={{ y: "100%" }} exit={{ y: "-100%" }}>
      <div aria-hidden className="azulejo-light absolute inset-0" />
      <div className="relative flex flex-col items-center">
        <motion.svg
          aria-hidden
          viewBox="0 0 88 88"
          className="h-28 w-28 sm:h-36 sm:w-36"
          initial={{ rotate: -45, scale: 0.8 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ duration: 1, ease: EASE_OUT }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <motion.path d="M44 9 79 44 44 79 9 44Z" {...draw(0)} />
            <motion.circle cx="44" cy="44" r="15" {...draw(0.15)} />
            {[
              "M0 24A24 24 0 0 0 24 0",
              "M64 0A24 24 0 0 0 88 24",
              "M88 64A24 24 0 0 0 64 88",
              "M24 88A24 24 0 0 0 0 64",
            ].map((d, i) => (
              <motion.path key={d} d={d} className="text-butter" stroke="currentColor" {...draw(0.25 + i * 0.08)} />
            ))}
          </g>
          <motion.circle
            cx="44"
            cy="44"
            r="6"
            className="fill-tomato"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.6 }}
            style={{ transformOrigin: "44px 44px" }}
          />
        </motion.svg>
        <motion.p
          className="mt-6 font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: EASE_OUT }}
        >
          Casa <span className="font-serif font-normal italic text-butter">Cobalto</span>
        </motion.p>
        <div aria-hidden className="mt-5 flex gap-2">
          {["bg-butter", "bg-tomato", "bg-cream"].map((c, i) => (
            <motion.span
              key={c}
              className={`block h-2.5 w-2.5 rounded-full ${c}`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
            />
          ))}
        </div>
      </div>
    </RouteLoader>
  );
}
