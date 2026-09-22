import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

export const alt = `Casos de estudio de ${portfolio.name}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ProjectOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project =
    portfolio.projects.find((item) => item.slug === slug) ??
    portfolio.projects[0];

  return new ImageResponse(
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        overflow: "hidden",
        padding: "68px 72px",
        background: "#101713",
        color: "#eef3e9",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -260,
          right: -120,
          width: 760,
          height: 760,
          display: "flex",
          border: "2px solid #344c3b",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -100,
          right: 40,
          width: 440,
          height: 440,
          display: "flex",
          border: "1px solid #405d47",
          borderRadius: "50%",
        }}
      />
      <div
        style={{
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 38,
            fontWeight: 700,
            letterSpacing: -3,
            color: "#bade92",
          }}
        >
          na.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            color: "#bade92",
          }}
        >
          CASO DE ESTUDIO
        </div>
      </div>

      <div
        style={{
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 22,
          maxWidth: 960,
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 18,
            fontWeight: 700,
            letterSpacing: 3,
            color: "#aab8ab",
          }}
        >
          {project.category}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: project.title.length > 22 ? 68 : 82,
            fontWeight: 500,
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          {project.title}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 27,
            lineHeight: 1.35,
            color: "#bade92",
          }}
        >
          {project.focus}
        </div>
      </div>

      <div
        style={{
          zIndex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 24,
          paddingTop: 28,
          borderTop: "1px solid #344338",
        }}
      >
        <div style={{ display: "flex", gap: 12 }}>
          {project.technologies.slice(0, 5).map((technology) => (
            <div
              key={technology}
              style={{
                display: "flex",
                padding: "9px 14px",
                border: "1px solid #405146",
                borderRadius: 7,
                fontSize: 16,
                color: "#c8d2c8",
              }}
            >
              {technology}
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#aab8ab",
          }}
        >
          {portfolio.name} · {portfolio.role}
        </div>
      </div>
    </div>,
    size,
  );
}
