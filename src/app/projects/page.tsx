import type { Metadata } from "next";
import { ProjectsExplorer } from "@/components/site/ProjectsExplorer";
import { CtaBlock } from "@/components/site/sections";
import { container, PageHero } from "@/components/site/ui";
import { site } from "@/lib/content/site";
import { projectCategories } from "@/lib/content/helpers";

export const metadata: Metadata = {
  title: "Our Work",
  description: "Colourful homes, cafés, kitchens and bedrooms designed by Casa Cobalto across Lisbon, Porto and Cascais.",
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero eyebrow="Our work" title="Rooms we can't stop talking about" accent={["can't", "stop"]} intro="Homes, cafés and studios across Portugal — each one built around a story, a colour and a handful of local makers." tone="terracotta" />
      <section className={`${container} py-16 sm:py-24`}>
        <ProjectsExplorer projects={site.projects} categories={projectCategories(site.projects)} base={site.base} />
      </section>
      <CtaBlock title="Your room could be next" accent={["next"]} />
    </>
  );
}
