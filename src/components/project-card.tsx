import Link from "next/link";
import { portfolio, type Project } from "@/data/portfolio";
import { ProjectVisual } from "./project-visual";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article
      className="project-card"
      aria-labelledby={`project-${project.slug}`}
    >
      <div className="project-card-visual">
        <span className="project-index" aria-hidden="true">
          0{index + 1} /
        </span>
        <ProjectVisual project={project} />
      </div>
      <div className="project-card-content">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">{project.category}</p>
          <span className="status-badge">{project.status}</span>
        </div>
        <h3
          id={`project-${project.slug}`}
          className="mt-5 text-3xl font-semibold tracking-tight"
        >
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
        <p className="project-scope">{project.scope}</p>
        <ul
          className="project-highlights"
          aria-label={portfolio.labels.highlights}
        >
          {project.highlights.map((highlight) => (
            <li key={highlight}>
              <span aria-hidden="true">↳</span>
              {highlight}
            </li>
          ))}
        </ul>
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
        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
          <Link
            className="button button-primary"
            href={`/projects/${project.slug}`}
          >
            {portfolio.labels.viewProject}
            <span aria-hidden="true">↗</span>
          </Link>
          <a className="text-link text-muted" href={project.repository}>
            {portfolio.labels.repository}
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
