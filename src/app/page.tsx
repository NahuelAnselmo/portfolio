import {
  About,
  Contact,
  Experience,
  Hero,
  Projects,
  Skills,
} from "@/components/home-sections";

export default function Home() {
  return (
    <main id="contenido" tabIndex={-1}>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Contact />
    </main>
  );
}
