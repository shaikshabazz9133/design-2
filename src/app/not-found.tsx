import { Blob, Button } from "@/components/site/ui";

export default function NotFound() {
  return (
    <section className="relative mx-auto flex min-h-[88vh] max-w-3xl flex-col items-center justify-center overflow-hidden px-5 pt-28 text-center">
      <Blob className="animate-float absolute left-1/2 top-1/3 -z-0 h-[22rem] w-[22rem] -translate-x-1/2 -translate-y-1/2 text-butter" />
      <p className="relative font-display text-[clamp(6rem,22vw,13rem)] font-extrabold leading-none tracking-[-0.06em] text-cobalt">4<span className="font-serif font-light italic text-navy">0</span>4</p>
      <h1 className="relative mt-2 font-display text-3xl font-bold tracking-[-0.03em] text-ink sm:text-4xl">This room is still a blank canvas.</h1>
      <p className="relative mt-4 max-w-md font-sans text-lg text-mute">The page you wanted has moved or never existed. Let&apos;s get you somewhere colourful.</p>
      <div className="relative mt-9 flex flex-wrap justify-center gap-3">
        <Button href="/">Back home</Button>
        <Button href="/projects" variant="outline">See our work</Button>
      </div>
    </section>
  );
}
