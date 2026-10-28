import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Instrument_Sans, Instrument_Serif } from "next/font/google";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BackToTop, CursorFollower, ScrollProgress } from "@/components/motion/extras";
import { MotionRoot } from "@/components/motion/primitives";
import { Loader } from "@/components/site/Loader";
import { site } from "@/lib/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage" });
const instrumentSerif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-instrument-serif" });
const instrumentSans = Instrument_Sans({ subsets: ["latin"], variable: "--font-instrument-sans" });

export const metadata: Metadata = {
  title: {
    default: "Casa Cobalto — Colourful Interior Design Studio, Lisbon",
    template: "%s · Casa Cobalto",
  },
  description: site.brand.description,
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { email, phone, phoneHref, socials } = site.brand;
  return (
    <html lang="en" className={`${bricolage.variable} ${instrumentSerif.variable} ${instrumentSans.variable} antialiased`}>
      <body className="min-h-dvh bg-cream font-sans text-ink">
        <MotionRoot>
          <Loader />
          <ScrollProgress className="bg-tomato" />
          <CursorFollower className="bg-cobalt/25" activeClassName="bg-butter/60" />
          <Header brand={{ email, phone, phoneHref, socials }} />
          <main id="main">{children}</main>
          <Footer />
          <BackToTop className="bg-cobalt text-cream" ringClassName="stroke-butter" />
        </MotionRoot>
      </body>
    </html>
  );
}
