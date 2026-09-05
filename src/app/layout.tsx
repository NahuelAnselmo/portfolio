import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  title: `${portfolio.name} | ${portfolio.role}`,
  description: portfolio.description,
  metadataBase: siteUrl,
  authors: [{ name: portfolio.name }],
  robots: { index: Boolean(siteUrl), follow: Boolean(siteUrl) },
  openGraph: {
    type: "website",
    locale: "es_AR",
    siteName: portfolio.name,
    title: `${portfolio.name} | ${portfolio.role}`,
    description: portfolio.description,
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={portfolio.locale}>
      <body>
        <a className="skip-link" href="#contenido">
          {portfolio.labels.skip}
        </a>
        <SiteHeader />
        {children}
        <footer className="container site-footer">
          <span>
            © {new Date().getFullYear()} {portfolio.name}
          </span>
          <span>{portfolio.labels.footer}</span>
        </footer>
      </body>
    </html>
  );
}
