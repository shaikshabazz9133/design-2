import type { Metadata } from "next";
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/site/ContactForm";
import { Marquee } from "@/components/site/sections";
import { Blob, container, Heading } from "@/components/site/ui";
import { Reveal, SplitText } from "@/components/motion/primitives";
import { directionsHref, MapEmbed } from "@/components/ui/MapEmbed";
import { site } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project or book a two-hour colour consult with Casa Cobalto in Príncipe Real, Lisbon.",
};

export default function ContactPage() {
  const { brand } = site;
  return (
    <>
      <section className="grain relative overflow-hidden bg-cream pb-20 pt-32 sm:pt-40">
        <Blob className="animate-float-slow absolute -left-32 top-32 h-[28rem] w-[28rem] text-butter/60" path={1} />
        <div className={`${container} relative grid gap-14 lg:grid-cols-12`}>
          <div className="lg:col-span-5">
            <h1 className="font-display text-[clamp(3.5rem,11vw,9rem)] font-extrabold leading-[0.85] tracking-[-0.06em] text-ink">
              <SplitText text="Say olá." immediate delay={0.3} accentWords={["olá."]} accentClassName="font-serif font-light italic text-cobalt" />
            </h1>
            <Reveal delay={0.5}>
              <p className="mt-8 max-w-md font-sans text-xl leading-relaxed text-mute">
                Tell us about your space — the good, the bad and the beige. We reply to every message within two working days.
              </p>
            </Reveal>
            <Reveal delay={0.6}>
              <ul className="mt-10 space-y-3">
                {[
                  { icon: Mail, label: brand.email, href: `mailto:${brand.email}` },
                  { icon: Phone, label: brand.phone, href: `tel:${brand.phoneHref}` },
                  { icon: MapPin, label: brand.address.slice(0, 2).join(", "), href: directionsHref(brand.map.lat, brand.map.lon) },
                ].map(({ icon: Icon, label, href }) => (
                  <li key={label}>
                    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noopener noreferrer" : undefined} className="group flex min-h-12 items-center gap-4 rounded-full bg-paper py-2 pl-2 pr-5 font-sans font-semibold transition-colors hover:bg-cobalt hover:text-cream">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-cobalt text-cream transition-colors group-hover:bg-cream group-hover:text-cobalt">
                        <Icon size={18} aria-hidden />
                      </span>
                      <span className="break-all">{label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <ContactForm email={brand.email} />
          </div>
        </div>
      </section>

      <Marquee tone="peach" words={["Colour consults", "from €290", "Whole homes", "Cafés & shops", "Kitchens", "Lisboa · Porto · beyond"]} />

      <section className={`${container} py-24 sm:py-32`} aria-labelledby="visit">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div id="visit">
              <Heading eyebrow="Visit" title="Come to the showroom" accent={["showroom"]} intro="Our Saturday showroom is full of maker pieces, paint samples and good coffee. Weekdays are by appointment." />
            </div>
            <Reveal delay={0.2}>
              <dl className="mt-10 space-y-2">
                {brand.hours.map((h) => (
                  <div key={h.days} className="flex items-center justify-between gap-4 rounded-2xl bg-paper px-5 py-4 font-sans">
                    <dt className="flex items-center gap-3 font-bold"><Clock size={16} className="text-cobalt" aria-hidden />{h.days}</dt>
                    <dd className="text-right text-mute">{h.time}</dd>
                  </div>
                ))}
              </dl>
              <a href={directionsHref(brand.map.lat, brand.map.lon)} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-sans font-bold text-cream hover:bg-cobalt">
                Get directions <ArrowUpRight size={18} aria-hidden />
              </a>
            </Reveal>
          </div>
          <Reveal className="relative min-h-[24rem] overflow-hidden rounded-[2.5rem] border-[6px] border-paper lg:col-span-7" delay={0.1}>
            <MapEmbed {...brand.map} className="absolute inset-0 sepia-[35%] saturate-[1.2]" />
          </Reveal>
        </div>
      </section>
    </>
  );
}
