"use client";

import Image from "next/image";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { useState, type PointerEvent, type ReactNode } from "react";
import { EASE_OUT, pageEntranceDelay, SplitText } from "@/components/motion/primitives";
import { Blob, blobRadius, Button, container } from "./ui";

type Img = { src: string; alt: string };

/** Moves a layer with the pointer by `depth` px, and with scroll by `scrollDepth` px. */
function Layer({
  px,
  py,
  depth,
  scrollDepth,
  className,
  children,
  delay,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
  depth: number;
  scrollDepth: number;
  className: string;
  children: ReactNode;
  delay: number;
}) {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const sy = useTransform(scrollY, [0, 800], [0, reduce ? 0 : scrollDepth]);
  const x = useTransform(px, (v) => (reduce ? 0 : v * depth));
  const yPointer = useTransform(py, (v) => (reduce ? 0 : v * depth));
  const y = useTransform([sy, yPointer] as MotionValue<number>[], ([a, b]) => (a as number) + (b as number));
  return (
    <motion.div style={{ x, y }} className={className}>
      <motion.div
        className="relative h-full w-full"
        initial={{ opacity: 0, scale: 0.85, rotate: -4 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 1.2, delay, ease: EASE_OUT }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export function Hero({ images }: { images: [Img, Img, Img] }) {
  const [base] = useState(pageEntranceDelay);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 18 });
  const py = useSpring(my, { stiffness: 60, damping: 18 });

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section onPointerMove={onMove} className="grain relative overflow-hidden bg-cream pb-20 pt-28 sm:pt-32 lg:min-h-[100svh] lg:pb-16">
      <Blob className="animate-float-slow absolute -left-40 top-24 h-[30rem] w-[30rem] text-butter/50" path={2} />

      <div className={`${container} relative grid items-center gap-14 lg:grid-cols-12 lg:gap-6`}>
        <div className="relative z-10 lg:col-span-6">
          <motion.p
            className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-[0.14em] text-cream"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: base + 0.5, ease: EASE_OUT }}
          >
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-butter" />
            Interior design studio · Lisboa
          </motion.p>
          <h1 className="mt-7 font-display text-[clamp(3.1rem,9.5vw,8.25rem)] font-extrabold leading-[0.86] tracking-[-0.055em] text-ink">
            <SplitText text="Rooms with a point of view." immediate delay={0.2} stagger={0.08} accentWords={["point", "of", "view."]} accentClassName="font-serif font-light italic tracking-[-0.03em] text-cobalt" />
          </h1>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: base + 1.2, ease: EASE_OUT }}>
            <p className="mt-8 max-w-md font-sans text-lg leading-relaxed text-mute sm:text-xl">
              We design colourful, crafted homes and cafés with Portuguese makers — spaces that look like the people who use them.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/projects">See our work</Button>
              <Button href="/contact" variant="outline">Book a colour consult</Button>
            </div>
          </motion.div>
        </div>

        {/* Layered collage */}
        <div className="relative h-[27rem] sm:h-[36rem] lg:col-span-6 lg:h-[44rem]">
          <motion.div
            aria-hidden
            className="azulejo absolute right-[4%] top-[4%] h-[78%] w-[70%] rounded-[2.5rem] border-4 border-cobalt"
            initial={{ opacity: 0, rotate: 6, scale: 0.92 }}
            animate={{ opacity: 1, rotate: 3, scale: 1 }}
            transition={{ duration: 1.2, delay: base + 0.15, ease: EASE_OUT }}
          />
          <Layer px={px} py={py} depth={-18} scrollDepth={-40} delay={base + 0.3} className="absolute left-[18%] top-0 h-[88%] w-[58%] sm:left-[20%]">
            <div className="relative h-full w-full overflow-hidden rounded-t-full bg-butter">
              <Image src={images[0].src} alt={images[0].alt} fill preload sizes="(min-width: 1024px) 28vw, 60vw" className="object-cover" />
            </div>
          </Layer>
          <Layer px={px} py={py} depth={30} scrollDepth={-110} delay={base + 0.55} className="absolute bottom-0 left-0 h-[44%] w-[40%]">
            <div className="relative h-full w-full overflow-hidden rounded-full border-[6px] border-cream bg-navy shadow-[0_30px_60px_-30px_rgba(35,26,21,0.5)]">
              <Image src={images[1].src} alt={images[1].alt} fill sizes="(min-width: 1024px) 18vw, 40vw" className="object-cover" />
            </div>
          </Layer>
          <Layer px={px} py={py} depth={42} scrollDepth={-170} delay={base + 0.75} className="absolute right-0 top-[10%] h-[34%] w-[34%]">
            <div className={`relative h-full w-full overflow-hidden ${blobRadius} border-[6px] border-cream bg-cobalt`}>
              <Image src={images[2].src} alt={images[2].alt} fill sizes="(min-width: 1024px) 16vw, 34vw" className="object-cover" />
            </div>
          </Layer>
          <motion.div
            aria-hidden
            className="absolute bottom-[14%] right-[4%] grid h-24 w-24 place-items-center rounded-full bg-tomato text-center font-display text-[11px] font-bold uppercase leading-tight tracking-[0.08em] text-cream sm:h-28 sm:w-28"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 14, delay: base + 1.3 }}
          >
            <span>
              Est.
              <span className="block font-serif text-2xl font-light normal-case italic">2014</span>
              Lisboa
            </span>
          </motion.div>
          <span aria-hidden className="animate-float absolute left-[8%] top-[12%] h-10 w-10 rounded-full bg-navy" />
          <span aria-hidden className="animate-float-slow absolute bottom-[38%] right-[30%] h-5 w-5 rounded-full bg-butter" />
        </div>
      </div>
    </section>
  );
}
