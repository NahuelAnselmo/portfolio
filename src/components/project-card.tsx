import Link from "next/link";
import { portfolio, type Project } from "@/data/portfolio";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className="project-card">
      <div className="project-art" data-tone={project.tone} aria-hidden="true">
        <div className="project-poster">
          <span className="eyebrow">{project.category}</span>
          <span className="poster-symbol">
            {index === 0 ? "{ }" : index === 1 ? "&" : "↗"}
          </span>
          <strong>{project.title}</strong>
          <span className="poster-caption">
            {project.technologies.slice(0, 3).join(" / ")}
          </span>
        </div>
        <span className="project-art-index">0{index + 1}</span>
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
        <div className="flex flex-wrap items-center gap-3">
          <p className="eyebrow">{project.category}</p>
          <span className="status-badge">{project.status}</span>
        </div>
        <h3 className="mt-5 text-3xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-4 leading-relaxed text-muted">{project.description}</p>
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
          <Link className="text-link" href={`/projects/${project.slug}`}>
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
