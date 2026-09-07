import { portfolio, type Project } from "@/data/portfolio";

export function ProjectVisual({ project }: { project: Project }) {
  return (
    <figure className="project-visual" data-tone={project.tone}>
      <figcaption className="eyebrow">{portfolio.labels.flow}</figcaption>
      <ol className="flow-nodes">
        {project.flow.map((step, index) => (
          <li key={step.name}>
            <span className="flow-number" aria-hidden="true">
              0{index + 1}
            </span>
            <div>
              <p className="flow-name">{step.name}</p>
              <p className="flow-detail">{step.detail}</p>
            </div>
            <span className="flow-indicator" aria-hidden="true">
              {index === project.flow.length - 1 ? "✓" : "↓"}
            </span>
          </li>
        ))}
      </ol>
      <p className="visual-caption">{project.focus}</p>
    </figure>
  );
}
