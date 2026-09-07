import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import { ProjectVisual } from "@/components/project-visual";

type ProjectPageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return portfolio.projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) notFound();
  return {
    title: `${project.title} | ${portfolio.name}`,
    description: project.description,
    alternates: siteUrl
      ? { canonical: `/projects/${project.slug}` }
      : undefined,
    openGraph: {
      type: "article",
      locale: "es_AR",
      siteName: portfolio.name,
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = portfolio.projects.find((item) => item.slug === slug);
  if (!project) notFound();

  const nextProject =
    portfolio.projects[
      (portfolio.projects.indexOf(project) + 1) % portfolio.projects.length
    ];
  return (
    <main id="contenido" tabIndex={-1} className="container section">
      <Link className="text-link" href="/#proyectos">
        <span aria-hidden="true">←</span>
        {portfolio.labels.back}
      </Link>
      <article>
        <div className="case-hero">
          <div>
            <div className="flex flex-wrap items-center gap-4">
              <p className="eyebrow">{project.category}</p>
              <span className="status-badge">{project.status}</span>
            </div>
            <h1 className="section-title">{project.title}</h1>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              {project.description}
            </p>
            <ul
              className="mt-6 flex flex-wrap gap-2"
              aria-label={portfolio.labels.stack}
            >
              {project.technologies.map((technology) => (
                <li className="badge" key={technology}>
                  {technology}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="button button-primary" href={project.repository}>
                {portfolio.labels.repository}
                <span aria-hidden="true">↗</span>
              </a>
              {project.backendRepository && (
                <a
                  className="button button-secondary"
                  href={project.backendRepository}
                >
                  {portfolio.labels.backend}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
              {project.demo && (
                <a className="button button-secondary" href={project.demo}>
                  {portfolio.labels.demo}
                  <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
          <ProjectVisual project={project} />
        </div>
        <dl className="case-facts">
          <div>
            <dt>{portfolio.labels.focus}</dt>
            <dd>{project.focus}</dd>
          </div>
          <div>
            <dt>{portfolio.labels.scope}</dt>
            <dd>{project.scope}</dd>
          </div>
        </dl>
        <div className="case-layout">
          <nav className="case-index" aria-label={portfolio.labels.caseIndex}>
            <p className="eyebrow mb-4">{portfolio.labels.caseIndex}</p>
            <ol>
              {project.caseStudy.map((section, index) => (
                <li key={section.title}>
                  <a href={`#seccion-${index + 1}`}>{section.title}</a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="case-story">
            {project.caseStudy.map((section, index) => (
              <section
                id={`seccion-${index + 1}`}
                aria-labelledby={`titulo-${index + 1}`}
                key={section.title}
              >
                <h2 id={`titulo-${index + 1}`}>{section.title}</h2>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </article>
      <div className="case-footer">
        {portfolio.contact.email && (
          <a
            className="button button-primary"
            href={`mailto:${portfolio.contact.email}?subject=${encodeURIComponent(project.title)}`}
          >
            {portfolio.labels.projectContact}
            <span aria-hidden="true">↗</span>
          </a>
        )}
        <Link className="text-link" href={`/projects/${nextProject.slug}`}>
          <span>
            {portfolio.labels.nextProject}: {nextProject.title}
          </span>
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
