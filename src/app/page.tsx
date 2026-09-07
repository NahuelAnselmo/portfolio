import {
  About,
  Contact,
  Experience,
  Hero,
  Projects,
  Skills,
} from "@/components/home-sections";
import type { Metadata } from "next";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  alternates: siteUrl ? { canonical: "/" } : undefined,
};

export default function Home() {
  return (
    <main id="contenido" tabIndex={-1}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: portfolio.name,
            jobTitle: portfolio.role,
            url: siteUrl?.href,
            sameAs: portfolio.contact.links.map(({ href }) => href),
          }).replace(/</g, "\\u003c"),
        }}
      />
      <Hero />
      <Projects />
      <About />
      <Skills />
      <Experience />
      <Contact />
    </main>
  );
}
