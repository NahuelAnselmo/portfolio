import { ImageResponse } from "next/og";
import { portfolio } from "@/data/portfolio";

export const alt = `${portfolio.name} — ${portfolio.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px",
        background: "#f8f9f5",
        color: "#202b26",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 38, color: "#286044" }}>na.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 86, letterSpacing: -4 }}>{portfolio.name}</div>
        <div style={{ fontSize: 40, color: "#286044" }}>{portfolio.role}</div>
      </div>
      <div style={{ fontSize: 24, color: "#5c6861" }}>
        {portfolio.labels.footer}
      </div>
    </div>,
    size,
  );
}
