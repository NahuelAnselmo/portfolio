import type { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `CV | ${portfolio.name}`,
  description: `Currículum de ${portfolio.name}, ${portfolio.role}.`,
};

const featuredProjects = portfolio.projects.filter(({ slug }) =>
  ["agenda-local", "portfolio-profesional", "gestor-de-tareas"].includes(slug),
);

export default function CvPage() {
  return (
    <main id="contenido" tabIndex={-1} className="cv-page">
      <div className="cv-actions" aria-label="Acciones del currículum">
        <Link className="text-link" href="/">
          <span aria-hidden="true">←</span>
          Volver al portfolio
        </Link>
        <a
          className="button button-primary"
          href="/nahuel-anselmo-cv.pdf"
          download
        >
          {portfolio.labels.downloadCv}
          <span aria-hidden="true">↓</span>
        </a>
      </div>

      <article className="cv-sheet">
        <header className="cv-header">
          <div>
            <p className="eyebrow">Currículum vitae</p>
            <h1>{portfolio.name}</h1>
            <p className="cv-role">{portfolio.role}</p>
          </div>
          <address className="cv-contact">
            {portfolio.contact.email && (
              <a href={`mailto:${portfolio.contact.email}`}>
                {portfolio.contact.email}
              </a>
            )}
            {portfolio.contact.links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
            <a href="https://nahuel-anselmo-portfolio.vercel.app">Portfolio</a>
          </address>
          <p className="cv-summary">
            Desarrollador Full Stack formado en RollingCode School. Construyo
            interfaces con React y Next.js, APIs con Node.js y Express, y
            modelos de datos con PostgreSQL, Prisma y MongoDB. Me enfoco en
            experiencias claras, código mantenible y reglas de negocio
            confiables.
          </p>
        </header>

        <div className="cv-layout">
          <div className="cv-main-column">
            <section aria-labelledby="cv-experience-title">
              <h2 id="cv-experience-title">Experiencia en proyectos</h2>
              <div className="cv-entry">
                <div className="cv-entry-heading">
                  <div>
                    <h3>Agenda Local</h3>
                    <p>Producto full stack · Proyecto propio</p>
                  </div>
                  <span>2026</span>
                </div>
                <ul>
                  <li>
                    Reserva pública y panel operativo por roles para
                    propietarios y profesionales.
                  </li>
                  <li>
                    API REST con Express, Prisma y PostgreSQL, con protección
                    ante turnos superpuestos y solicitudes duplicadas.
                  </li>
                  <li>
                    Demo desplegada en Vercel con Neon, sesiones HTTP-only,
                    controles de origen y datos ficticios restaurables.
                  </li>
                </ul>
                <a href="https://agenda-local-web.vercel.app">
                  agenda-local-web.vercel.app
                </a>
              </div>
              <div className="cv-entry">
                <div className="cv-entry-heading">
                  <div>
                    <h3>Aplicaciones web propias y colaborativas</h3>
                    <p>Portfolio, gestor de tareas y La Cervecería</p>
                  </div>
                  <span>2024 — 2026</span>
                </div>
                <ul>
                  <li>
                    Portfolio accesible y responsive con casos de estudio,
                    metadata social, tema claro/oscuro y pruebas E2E.
                  </li>
                  <li>
                    Gestor MERN con autenticación y operaciones CRUD limitadas a
                    cada usuario.
                  </li>
                  <li>
                    Participación en una aplicación grupal de pedidos para
                    gastronomía con React, Express y MongoDB.
                  </li>
                </ul>
              </div>
            </section>

            <section aria-labelledby="cv-projects-title">
              <h2 id="cv-projects-title">Proyectos seleccionados</h2>
              <div className="cv-project-list">
                {featuredProjects.map((project) => (
                  <article key={project.slug}>
                    <div>
                      <h3>{project.title}</h3>
                      <span>{project.scope}</span>
                    </div>
                    <p>{project.description}</p>
                    <p className="cv-tech">
                      {project.technologies.join(" · ")}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="cv-side-column">
            <section aria-labelledby="cv-skills-title">
              <h2 id="cv-skills-title">Tecnologías</h2>
              <ul className="cv-skill-list">
                {portfolio.skills.items.map((skill) => (
                  <li key={skill.name}>
                    <strong>{skill.name}</strong>
                    <span>{skill.category}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section aria-labelledby="cv-education-title">
              <h2 id="cv-education-title">Formación</h2>
              <div className="cv-side-entry">
                <h3>Desarrollo Web Full Stack</h3>
                <p>RollingCode School</p>
                <span>2024 — 2025</span>
              </div>
            </section>

            <section aria-labelledby="cv-practice-title">
              <h2 id="cv-practice-title">Prácticas</h2>
              <ul className="cv-plain-list">
                <li>Git y GitHub</li>
                <li>APIs REST y autenticación</li>
                <li>Diseño responsive</li>
                <li>Accesibilidad web</li>
                <li>Pruebas de navegador</li>
                <li>Scrum y Trello</li>
              </ul>
            </section>
          </aside>
        </div>
      </article>
    </main>
  );
}
