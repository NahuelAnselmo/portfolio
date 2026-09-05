import type { MetadataRoute } from "next";
import { portfolio } from "@/data/portfolio";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    "/",
    ...portfolio.projects.map(({ slug }) => `/projects/${slug}`),
  ].map((path) => ({
    url: new URL(path, siteUrl).href,
  }));
}
