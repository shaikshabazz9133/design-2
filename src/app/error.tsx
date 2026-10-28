"use client";

import Link from "next/link";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-5 pt-28 text-center">
      <span aria-hidden className="h-20 w-20 rounded-full bg-cobalt" />
      <h1 className="mt-8 font-display text-5xl font-extrabold tracking-[-0.04em] text-ink sm:text-6xl">
        Oops — a <span className="font-serif font-light italic text-cobalt">wobbly</span> moment.
      </h1>
      <p className="mt-5 font-sans text-lg text-mute">This page tripped over the rug. Give it another go, or head back home.</p>
      <div className="mt-9 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="min-h-12 rounded-full bg-cobalt px-6 font-sans font-bold text-cream transition-colors hover:bg-navy">Try again</button>
        <Link href="/" className="inline-flex min-h-12 items-center rounded-full border-2 border-ink px-6 font-sans font-bold transition-colors hover:bg-ink hover:text-cream">Back home</Link>
      </div>
    </section>
  );
}
