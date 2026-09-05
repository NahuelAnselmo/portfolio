import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nahuel Anselmo | Full Stack Web Developer",
  description: "Portfolio profesional de Nahuel Anselmo. Desarrollo web con Next.js, React, TypeScript y Tailwind CSS.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="es"><body>{children}</body></html>;
}
