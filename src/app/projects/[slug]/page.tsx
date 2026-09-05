import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolio } from "@/data/portfolio";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return portfolio.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return { title: `${project.title} | ${portfolio.name}`, description: project.description };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) notFound();

  return (
    <main id="contenido" tabIndex={-1} className="container section">
      <Link className="text-link" href="/#proyectos"><span aria-hidden="true">←</span>{portfolio.labels.back}</Link>
      <article className="mt-12 max-w-3xl">
        <div className="flex flex-wrap items-center gap-4"><p className="eyebrow">{project.category}</p><span className="status-badge">{project.status}</span></div>
        <h1 className="section-title">{project.title}</h1>
        <p className="mt-6 text-lg leading-relaxed text-muted">{project.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label={portfolio.labels.stack}>{project.technologies.map((technology) => <li className="badge" key={technology}>{technology}</li>)}</ul>
        <div className="mt-8 flex flex-wrap gap-4"><a className="button button-primary" href={project.repository}>{portfolio.labels.repository}<span aria-hidden="true">↗</span></a>{project.demo && <a className="button button-secondary" href={project.demo}>{portfolio.labels.demo}<span aria-hidden="true">↗</span></a>}</div>
        <div className="mt-16 space-y-10 border-t border-line pt-12">{project.caseStudy.map((section) => <section key={section.title}><h2 className="text-2xl font-semibold tracking-tight">{section.title}</h2><p className="mt-4 leading-relaxed text-muted">{section.body}</p></section>)}</div>
      </article>
    </main>
  );
}
