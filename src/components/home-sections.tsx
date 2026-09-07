import Link from "next/link";
import { portfolio } from "@/data/portfolio";
import { SectionHeading } from "./section-heading";
import { ProjectCard } from "./project-card";

export function Hero() {
  const { hero } = portfolio;
  return (
    <section className="hero container" aria-labelledby="hero-title">
      <div className="hero-layout">
        <div className="hero-copy">
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1 id="hero-title" className="hero-title">
            {hero.title}
            <span>{hero.accent}</span>
          </h1>
          <p className="hero-description">{hero.body}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link className="button button-primary" href="#proyectos">
              {hero.primary}
              <span aria-hidden="true">↗</span>
            </Link>
            <Link className="button button-secondary" href="#contacto">
              {hero.secondary}
              <span aria-hidden="true">↗</span>
            </Link>
          </div>
          <p className="availability">
            <span className="status-dot" aria-hidden="true" />
            {hero.availability}
          </p>
        </div>
        <aside className="profile-panel" aria-label={hero.panelTitle}>
          <div className="panel-top">
            <span className="panel-monogram" aria-hidden="true">
              na.
            </span>
            <span className="eyebrow">{portfolio.role}</span>
          </div>
          <p className="panel-title">{hero.panelTitle}</p>
          <p className="text-sm leading-relaxed text-muted">
            {hero.panelDescription}
          </p>
          <ol className="capabilities">
            {hero.capabilities.map((item, index) => (
              <li key={item.title}>
                <span className="capability-index" aria-hidden="true">
                  0{index + 1}
                </span>
                <div>
                  <p className="font-semibold">{item.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted">
                    {item.detail}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
      <div className="hero-bottom">
        <span>{portfolio.role}</span>
        <span aria-hidden="true">{portfolio.labels.signature}</span>
      </div>
    </section>
  );
}

export function About() {
  const { about } = portfolio;
  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="section container"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          id="about-title"
          number="02"
          label={about.label}
          title={about.title}
        />
        <div className="space-y-5">
          <p className="text-xl leading-relaxed text-ink">{about.intro}</p>
          {about.paragraphs.map((text) => (
            <p key={text} className="text-muted leading-relaxed">
              {text}
            </p>
          ))}
        </div>
      </div>
      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {about.principles.map((principle, index) => (
          <div key={principle.title} className="principle">
            <span className="font-mono text-sm text-accent" aria-hidden="true">
              0{index + 1} /
            </span>
            <h3 className="mt-4 text-lg font-semibold">{principle.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {principle.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Skills() {
  const { skills } = portfolio;
  return (
    <section
      id="tecnologias"
      aria-labelledby="skills-title"
      className="section section-tinted"
    >
      <div className="container">
        <SectionHeading
          id="skills-title"
          number="03"
          label={skills.label}
          title={skills.title}
          intro={skills.intro}
        />
        <ul className="skills-grid mt-10">
          {skills.items.map((skill) => (
            <li key={skill.name} className="skill-card">
              <span className="skill-mark" aria-hidden="true">
                {skill.mark}
              </span>
              <p className="eyebrow mt-5 text-muted">{skill.category}</p>
              <h3 className="mt-2 text-xl font-semibold">{skill.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {skill.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Projects() {
  return (
    <section
      id="proyectos"
      aria-labelledby="projects-title"
      className="section container"
    >
      <SectionHeading
        id="projects-title"
        number="01"
        label={portfolio.projectsSection.label}
        title={portfolio.projectsSection.title}
        intro={portfolio.projectsSection.intro}
      />
      <div className="project-list mt-12">
        {portfolio.projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export function Experience() {
  const { experience } = portfolio;
  return (
    <section
      id="experiencia"
      aria-labelledby="experience-title"
      className="section container border-t border-line"
    >
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <SectionHeading
          id="experience-title"
          number="04"
          label={experience.label}
          title={experience.title}
          intro={experience.intro}
        />
        <div>
          {experience.items.length ? (
            <ol className="space-y-8">
              {experience.items.map((item) => (
                <li key={item.id} className="experience-item">
                  <p className="eyebrow">{item.period}</p>
                  <h3 className="mt-3 text-xl font-semibold">{item.role}</h3>
                  <p className="mt-1 text-accent">{item.organization}</p>
                  <p className="mt-4 leading-relaxed text-muted">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          ) : (
            <div className="experience-item">
              <span className="status-dot" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-semibold">
                {experience.emptyTitle}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">
                {experience.emptyBody}
              </p>
              <Link className="text-link mt-6" href="#proyectos">
                {portfolio.hero.primary}
                <span aria-hidden="true">↗</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const { contact } = portfolio;
  return (
    <section
      id="contacto"
      aria-labelledby="contact-title"
      className="contact-section"
    >
      <div className="container">
        <p className="eyebrow">
          <span aria-hidden="true">05 /</span> {contact.label}
        </p>
        <h2 id="contact-title" className="contact-title whitespace-pre-line">
          {contact.title}
        </h2>
        <p className="mt-6 max-w-xl leading-relaxed text-white/75">
          {contact.body}
        </p>
        {contact.email && (
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email}
            <span aria-hidden="true">↗</span>
          </a>
        )}
        <div className="mt-9 flex flex-wrap gap-4">
          {contact.email && (
            <a className="button button-light" href={`mailto:${contact.email}`}>
              {contact.emailLabel}
              <span aria-hidden="true">↗</span>
            </a>
          )}
          {contact.links.map((link) => (
            <a className="button button-light" href={link.href} key={link.href}>
              {link.label}
              <span aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <span className="contact-decoration" aria-hidden="true">
          ↗
        </span>
      </div>
    </section>
  );
}
