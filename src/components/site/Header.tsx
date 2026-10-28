"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { EASE_OUT } from "@/components/motion/primitives";
import { isActivePath, useMobileMenu, useScrollHeader } from "@/components/ui/hooks";
import type { Brand } from "@/lib/types";
import { container } from "./ui";

const base = "";
const links = [
  { href: `${base}/projects`, label: "Work" },
  { href: `${base}/services`, label: "Services" },
  { href: `${base}/about`, label: "Studio" },
  { href: `${base}/process`, label: "Process" },
  { href: `${base}/testimonials`, label: "Kind words" },
  { href: `${base}/journal`, label: "Journal" },
];
const mobileLinks = [{ href: "/", label: "Home" }, ...links, { href: `${base}/contact`, label: "Contact" }];

export function Header({ brand }: { brand: Pick<Brand, "email" | "phone" | "phoneHref" | "socials"> }) {
  const { open, setOpen, toggle, pathname } = useMobileMenu();
  const { scrolled, hidden } = useScrollHeader();

  return (
    <>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-ink px-5 py-3 font-sans text-sm font-semibold text-cream transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-luxe ${hidden && !open ? "-translate-y-[120%]" : "translate-y-0"}`}
      >
        <div className={`${container} pt-3 sm:pt-4`}>
          <div
            className={`flex h-16 items-center justify-between gap-4 rounded-full pl-5 pr-2 transition-all duration-500 sm:h-[4.25rem] ${
              scrolled || open ? "bg-paper/95 shadow-[0_10px_40px_-18px_rgba(35,26,21,0.35)] backdrop-blur" : "bg-transparent"
            }`}
          >
            <Link href="/" className="group flex items-center gap-2.5 text-ink" aria-label="Casa Cobalto — home">
              <span aria-hidden className="relative grid h-8 w-8 place-items-center">
                <span className="absolute inset-0 rounded-full bg-cobalt transition-transform duration-500 group-hover:scale-90" />
                <span className="absolute bottom-0 right-0 h-4 w-4 rounded-tl-full bg-navy transition-transform duration-500 group-hover:-translate-y-1" />
              </span>
              <span className="font-display text-xl font-extrabold tracking-[-0.04em]">
                Casa <span className="font-serif text-[1.35rem] font-normal italic tracking-normal text-cobalt">Cobalto</span>
              </span>
            </Link>

            <nav aria-label="Primary" className="hidden lg:block">
              <ul className="flex items-center gap-1 rounded-full bg-cream/70 p-1">
                {links.map((l) => {
                  const active = isActivePath(pathname, l.href);
                  return (
                    <li key={l.href} className="relative">
                      <Link
                        href={l.href}
                        aria-current={active ? "page" : undefined}
                        className={`relative z-10 block rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors duration-300 ${
                          active ? "text-cream" : "text-ink hover:text-cobalt"
                        }`}
                      >
                        {active && (
                          <motion.span
                            layoutId="nav-pill"
                            className="absolute inset-0 -z-10 rounded-full bg-navy"
                            transition={{ type: "spring", stiffness: 380, damping: 32 }}
                          />
                        )}
                        {l.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href={`${base}/contact`}
                className="group hidden min-h-12 items-center gap-2 rounded-full bg-cobalt px-5 font-sans text-sm font-bold text-cream transition-colors hover:bg-navy sm:inline-flex"
              >
                Let&apos;s talk
                <ArrowUpRight size={16} strokeWidth={2.4} className="transition-transform duration-300 group-hover:rotate-45" aria-hidden />
              </Link>
              <button
                type="button"
                onClick={toggle}
                aria-expanded={open}
                aria-controls="mobile-menu"
                aria-label={open ? "Close menu" : "Open menu"}
                className="relative grid h-12 w-12 place-items-center rounded-full bg-ink text-cream lg:hidden"
              >
                <span aria-hidden className="relative block h-3.5 w-5">
                  <span className={`absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
                  <span className={`absolute left-0 top-1.5 h-0.5 w-full rounded bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`} />
                  <span className={`absolute left-0 h-0.5 w-full rounded bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              aria-hidden
              className="fixed inset-0 z-40 bg-ink/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              aria-label="Site menu"
              className="grain fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col overflow-hidden bg-cobalt pt-24 text-cream lg:hidden"
              initial={{ x: "100%", borderTopLeftRadius: "50%", borderBottomLeftRadius: "50%" }}
              animate={{ x: 0, borderTopLeftRadius: "0%", borderBottomLeftRadius: "0%" }}
              exit={{ x: "100%", borderTopLeftRadius: "50%", borderBottomLeftRadius: "50%" }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <svg aria-hidden viewBox="-100 -100 200 200" className="animate-float-slow absolute -bottom-24 -right-20 h-80 w-80 text-cobalt-deep">
                <circle r="80" fill="currentColor" />
              </svg>
              <nav aria-label="Mobile" className="relative flex-1 overflow-y-auto px-6 sm:px-8">
                <ul>
                  {mobileLinks.map((l, i) => {
                    const active = isActivePath(pathname, l.href);
                    return (
                      <motion.li
                        key={l.href}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.045, duration: 0.5, ease: EASE_OUT }}
                      >
                        <Link
                          href={l.href}
                          onNavigate={() => setOpen(false)}
                          aria-current={active ? "page" : undefined}
                          className="group flex items-center gap-3 py-1.5 font-display text-[clamp(2rem,9vw,2.75rem)] font-extrabold leading-tight tracking-[-0.03em]"
                        >
                          <span className={`transition-transform duration-300 group-hover:translate-x-2 ${active ? "font-serif font-light italic text-butter" : ""}`}>{l.label}</span>
                          {active && <span aria-hidden className="h-3 w-3 rounded-full bg-butter" />}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
              <motion.div
                className="relative space-y-1 px-6 pb-8 pt-6 font-sans text-sm sm:px-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <a href={`mailto:${brand.email}`} className="block font-bold underline decoration-butter decoration-2 underline-offset-4">{brand.email}</a>
                <a href={`tel:${brand.phoneHref}`} className="block text-cream/80">{brand.phone}</a>
                <ul className="flex gap-4 pt-3 text-cream/80">
                  {brand.socials.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-cream">{s.label}</a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
