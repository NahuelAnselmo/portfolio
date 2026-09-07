// Vercel aporta el dominio estable de producción. Las previews y el entorno
// local conservan noindex salvo que se configure SITE_URL explícitamente.
const configuredUrl =
  process.env.SITE_URL ||
  (process.env.VERCEL_ENV === "production" &&
  process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined);

export const siteUrl = configuredUrl ? new URL(configuredUrl) : undefined;

if (siteUrl && !["https:", "http:"].includes(siteUrl.protocol)) {
  throw new Error("SITE_URL debe ser una URL HTTP o HTTPS absoluta.");
}
