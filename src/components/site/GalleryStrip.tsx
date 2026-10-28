"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Expand } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Lightbox } from "@/components/ui/Lightbox";

type Img = { src: string; alt: string };

/** Horizontal, draggable photo strip; click (without dragging) opens the lightbox. */
export function GalleryStrip({ images }: { images: Img[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLUListElement>(null);
  const [left, setLeft] = useState(0);
  const dragged = useRef(false);

  useEffect(() => {
    const measure = () => {
      if (viewport.current && track.current) setLeft(Math.min(0, viewport.current.clientWidth - track.current.scrollWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <>
      <div ref={viewport} className="cursor-grab overflow-hidden active:cursor-grabbing">
        <motion.ul
          ref={track}
          drag="x"
          dragConstraints={{ left, right: 0 }}
          dragElastic={0.1}
          onDragStart={() => (dragged.current = true)}
          onDragEnd={() => setTimeout(() => (dragged.current = false), 50)}
          className="flex w-max gap-5 pr-5 sm:gap-6"
        >
          {images.map((img, i) => (
            <li key={img.src} className={`relative shrink-0 ${i % 2 ? "h-[22rem] w-[17rem] sm:h-[30rem] sm:w-[24rem] sm:mt-14" : "h-[22rem] w-[19rem] sm:h-[32rem] sm:w-[34rem]"}`}>
              <button
                type="button"
                onClick={() => !dragged.current && setIndex(i)}
                aria-label={`Open image ${i + 1} of ${images.length}: ${img.alt}`}
                className={`group relative block h-full w-full overflow-hidden bg-butter ${i % 3 === 1 ? "rounded-t-full rounded-b-[2rem]" : "rounded-[2rem]"}`}
              >
                <Image src={img.src} alt={img.alt} fill draggable={false} sizes="(min-width: 640px) 34rem, 19rem" className="pointer-events-none object-cover transition-transform duration-700 group-hover:scale-105" />
                <span aria-hidden className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center rounded-full bg-cream text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Expand size={16} />
                </span>
              </button>
            </li>
          ))}
        </motion.ul>
      </div>
      <p className="mt-5 font-sans text-sm text-mute" aria-hidden>← Drag to explore · click to enlarge →</p>
      <Lightbox
        images={images}
        index={index}
        onChange={setIndex}
        backdropClassName="bg-navy/95 text-cream"
        controlClassName="bg-cream text-ink hover:bg-cobalt hover:text-cream"
        captionClassName="font-sans text-cream/80"
      />
    </>
  );
}
